// Browse all words, see their review status, add your own.
Views.lexique = function (root) {
  const { $, esc, save, dayNum, speak } = FB;
  const state = FB.state;
  let q = "", theme = "all";
  const MAX_ROWS = 300;

  function status(w) {
    const c = state.cards[w.id];
    if (!c) return `<span class="muted">nouveau</span>`;
    const d = c.due - dayNum();
    if (d <= 0) return `<span class="accent">à revoir</span>`;
    return `<span class="${c.interval >= 21 ? "ok" : ""}">dans ${d} j</span>`;
  }

  function render() {
    const words = FB.allWords();
    const themes = [...new Set(words.map((w) => w.theme))];
    const decks = Object.entries(state.custom.reduce((m, w) => (w.deck ? ((m[w.deck] = (m[w.deck] || 0) + 1), m) : m), {}));
    const k = FB.stripAccents(q.toLowerCase());
    const rows = words.filter((w) => (theme === "all" || w.theme === theme)
      && (!k || FB.stripAccents((w.fr + " " + w.en).toLowerCase()).includes(k)));

    root.innerHTML = `
      <h1>Lexique</h1>
      <section class="card">
        <h2>Ajouter un mot</h2>
        <p class="muted small">Notez les mots rencontrés dans vos lectures, séries, conversations… Ils rejoignent vos révisions.</p>
        <form id="add" class="add-form" autocomplete="off">
          <input id="fr" placeholder="Français (ex. la pénurie)" required>
          <input id="en" placeholder="Traduction (ex. shortage)" required>
          <input id="ex" placeholder="Exemple (facultatif)">
          <button class="btn primary">Ajouter</button>
        </form>
        ${FB.accentBar("fr")}
        <p id="msg" class="small"></p>
      </section>
      <section class="card">
        <h2>Importer depuis Anki</h2>
        <p class="muted small">Dans Anki : <b>Fichier → Exporter…</b>, format <b>Notes en texte brut (.txt)</b>. La 1re colonne doit être le français, la 2e la traduction / définition. Réimporter le même fichier met les cartes à jour sans perdre la progression.</p>
        <div class="row wrap">
          <label class="check"><input type="checkbox" id="known"> J'ai déjà étudié ces cartes (les étaler en révisions sur 30 jours au lieu de « nouvelles »)</label>
        </div>
        <p><label class="btn">⬆ Choisir le fichier .txt <input type="file" id="anki" accept=".txt,text/plain" hidden></label></p>
        <p id="anki-msg" class="small"></p>
        ${decks.length ? `<ul class="decks">${decks.map(([d, n]) => `<li><b>${esc(d)}</b> · ${n} cartes <button class="btn danger small-btn" data-deck="${esc(d)}">Supprimer le paquet</button></li>`).join("")}</ul>` : ""}
      </section>
      <section class="card">
        <div class="row wrap">
          <input id="q" placeholder="Rechercher…" value="${esc(q)}">
          <select id="theme"><option value="all">Tous les thèmes (${words.length})</option>
            ${themes.map((t) => `<option ${t === theme ? "selected" : ""}>${esc(t)}</option>`).join("")}</select>
        </div>
        <table class="lex">
          <thead><tr><th>Français</th><th>English</th><th>Thème</th><th>Révision</th><th></th></tr></thead>
          <tbody>${rows.slice(0, MAX_ROWS).map((w) => `
            <tr>
              <td><button class="icon" data-say="${esc(w.fr)}">🔊</button> <b>${esc(w.fr)}</b>${w.ex ? `<div class="muted small">${esc(w.ex)}</div>` : ""}</td>
              <td>${esc(w.en)}</td>
              <td class="small">${esc(w.theme)}</td>
              <td class="small">${status(w)}</td>
              <td>${w.custom ? `<button class="icon" data-del="${esc(w.id)}" title="Supprimer">🗑</button>` : ""}</td>
            </tr>`).join("")}</tbody>
        </table>
        ${rows.length ? "" : `<p class="muted">Aucun résultat.</p>`}
        ${rows.length > MAX_ROWS ? `<p class="muted small">${MAX_ROWS} premiers résultats sur ${rows.length} — affinez la recherche.</p>` : ""}
      </section>`;

    $("#add").onsubmit = (e) => {
      e.preventDefault();
      const fr = $("#fr").value.trim(), en = $("#en").value.trim(), ex = $("#ex").value.trim();
      if (FB.allWords().some((w) => w.fr.toLowerCase() === fr.toLowerCase())) { $("#msg").textContent = "Ce mot existe déjà."; return; }
      state.custom.push({ id: "c" + Date.now(), fr, en, ex });
      save();
      render();
      $("#msg").textContent = `« ${fr} » ajouté ✓`;
      $("#fr").focus();
    };
    const qi = $("#q");
    qi.oninput = () => { q = qi.value; render(); const n = $("#q"); n.focus(); n.selectionStart = n.selectionEnd = n.value.length; };
    $("#theme").onchange = (e) => { theme = e.target.value; render(); };
    root.querySelectorAll("[data-say]").forEach((b) => (b.onclick = () => speak(b.dataset.say)));
    $("#anki").onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const backup = JSON.stringify({ custom: state.custom, cards: state.cards });
      try {
        const notes = Anki.parse(await file.text(), file.name);
        if (!notes.length) throw new Error("empty");
        const r = Anki.importNotes(notes, { known: $("#known").checked });
        if (!save()) {
          Object.assign(state, JSON.parse(backup));
          $("#anki-msg").textContent = "Pas assez d'espace de stockage dans le navigateur pour ce paquet.";
          return;
        }
        theme = notes[0].deck;
        render();
        $("#anki-msg").innerHTML = `<span class="ok">✓ ${r.added} ajoutées</span>${r.updated ? ` · ${r.updated} mises à jour` : ""}${r.skipped ? ` · ${r.skipped} ignorées (déjà dans le vocabulaire intégré)` : ""}`;
      } catch (err) {
        console.error(err);
        $("#anki-msg").textContent = "Impossible de lire ce fichier. Exportez-le depuis Anki au format « Notes en texte brut (.txt) ».";
      }
    };
    root.querySelectorAll("[data-deck]").forEach((b) => (b.onclick = () => {
      const d = b.dataset.deck;
      if (!confirm(`Supprimer le paquet « ${d} » et sa progression ?`)) return;
      for (const w of state.custom) if (w.deck === d) delete state.cards[w.id];
      state.custom = state.custom.filter((w) => w.deck !== d);
      if (theme === d) theme = "all";
      save();
      render();
    }));
    root.querySelectorAll("[data-del]").forEach((b) => (b.onclick = () => {
      if (!confirm("Supprimer ce mot ?")) return;
      state.custom = state.custom.filter((w) => w.id !== b.dataset.del);
      delete state.cards[b.dataset.del];
      save();
      render();
    }));
  }

  render();
};
