// Browse all words, see their review status, add your own.
Views.lexique = function (root) {
  const { $, esc, save, dayNum, speak } = FB;
  const state = FB.state;
  let q = "", theme = "all";

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
        <div class="row wrap">
          <input id="q" placeholder="Rechercher…" value="${esc(q)}">
          <select id="theme"><option value="all">Tous les thèmes (${words.length})</option>
            ${themes.map((t) => `<option ${t === theme ? "selected" : ""}>${esc(t)}</option>`).join("")}</select>
        </div>
        <table class="lex">
          <thead><tr><th>Français</th><th>English</th><th>Thème</th><th>Révision</th><th></th></tr></thead>
          <tbody>${rows.map((w) => `
            <tr>
              <td><button class="icon" data-say="${esc(w.fr)}">🔊</button> <b>${esc(w.fr)}</b>${w.ex ? `<div class="muted small">${esc(w.ex)}</div>` : ""}</td>
              <td>${esc(w.en)}</td>
              <td class="small">${esc(w.theme)}</td>
              <td class="small">${status(w)}</td>
              <td>${w.theme === "Mes mots" ? `<button class="icon" data-del="${esc(w.id)}" title="Supprimer">🗑</button>` : ""}</td>
            </tr>`).join("")}</tbody>
        </table>
        ${rows.length ? "" : `<p class="muted">Aucun résultat.</p>`}
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
