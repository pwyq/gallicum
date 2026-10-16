// Settings, voice selection, backup / restore.
Views.reglages = function (root) {
  const { $, esc, save, speak } = FB;
  const state = FB.state;
  const S = state.settings;

  // Hard words: list them and copy them as a brief for Claude, which writes the aids into js/data/memory-aids.js.
  function hardSection() {
    const hard = FB.hardWords().sort((a, b) => (state.cards[b.id]?.lapses || 0) - (state.cards[a.id]?.lapses || 0));
    const missing = hard.filter((w) => !FB.aidFor(w));
    return `
      <section class="card">
        <h2>🧠 Mots difficiles</h2>
        <p class="muted small">Un mot devient difficile après ${FB.HARD_LAPSES} oublis, ou quand vous le marquez pendant la révision. Copiez la liste des mots sans aide-mémoire et collez-la à Claude Code : il les ajoutera dans <code>js/data/memory-aids.js</code>.</p>
        ${hard.length ? `
          <ol class="hard-list">${hard.map((w) => `
            <li><b>${esc(w.fr)}</b> — ${esc(String(w.en || "").replace(/<[^>]*>/g, " ").slice(0, 80))}
              <span class="muted small">· ${state.cards[w.id]?.lapses || 0} oubli(s)${FB.aidFor(w) ? " · ✓ aide-mémoire" : ""}</span>
              ${state.flagged[w.id] ? `<button class="icon" data-unflag="${esc(w.id)}" title="Ne plus marquer comme difficile">✕</button>` : ""}</li>`).join("")}
          </ol>
          <div class="row wrap">
            <button class="btn" id="copy-hard" ${missing.length ? "" : "disabled"}>📋 Copier ${missing.length > 1 ? `les ${missing.length} mots` : `${missing.length} mot`} sans aide-mémoire</button>
            <button class="btn" id="copy-all-hard">Copier tout (${hard.length})</button>
          </div>
          <p id="hard-msg" class="small"></p>`
          : `<p class="muted">Aucun mot difficile pour l'instant.</p>`}
      </section>`;
  }

  function hardBrief(words) {
    const flat = (s) => String(s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return [
      `Ajoute des aide-mémoire pour ces mots difficiles dans js/data/memory-aids.js (format décrit en tête du fichier). Vérifie les étymologies ; si une origine est incertaine, dis-le ou utilise plutôt un moyen mnémotechnique.`,
      `Format : français | anglais | exemple | thème | oublis`,
      ...words.map((w) => `- ${w.fr} | ${flat(w.en)} | ${flat(w.ex)} | ${w.theme} | ${state.cards[w.id]?.lapses || 0}`),
    ].join("\n");
  }

  async function copyHard(words) {
    const text = hardBrief(words);
    try { await navigator.clipboard.writeText(text); $("#hard-msg").textContent = `Copié (${words.length} mot${words.length > 1 ? "s" : ""}). Collez-le dans Claude Code.`; }
    catch { $("#hard-msg").innerHTML = `<textarea class="hard-out" rows="8" readonly>${esc(text)}</textarea>`; }
  }

  function render() {
    const voices = FB.loadVoices();
    root.innerHTML = `
      <h1>Réglages</h1>
      <section class="card form">
        <label>Nouvelles cartes par jour
          <input type="number" id="new" min="0" max="100" value="${S.newPerDay}">
        </label>
        <label class="check"><input type="checkbox" id="auto" ${S.autoPlay ? "checked" : ""}> Lecture automatique des cartes de vocabulaire</label>
        <label>Vitesse de lecture : <b id="rate-v">${S.rate.toFixed(2)}</b>
          <input type="range" id="rate" min="0.5" max="1.3" step="0.05" value="${S.rate}">
        </label>
        <label>Voix
          <select id="voice">
            <option value="">Automatique</option>
            ${voices.map((v) => `<option value="${esc(v.name)}" ${v.name === S.voice ? "selected" : ""}>${esc(v.name)} (${v.lang})</option>`).join("")}
          </select>
        </label>
        ${voices.length ? "" : `<p class="notice small">Aucune voix française trouvée. Installez-en une dans Windows (Paramètres → Heure et langue → Voix), ou utilisez Microsoft Edge qui inclut des voix « Natural ».</p>`}
        <p><button class="btn" id="test">🔊 Tester : « Bonjour, comment ça va ? »</button></p>
      </section>
      ${hardSection()}
      <section class="card">
        <h2>Sauvegarde</h2>
        <p class="muted small">Votre progression est enregistrée dans ce navigateur uniquement. Exportez-la de temps en temps (ou pour changer d'ordinateur / de navigateur).</p>
        <div class="row wrap">
          <button class="btn" id="export">⬇ Exporter (.json)</button>
          <label class="btn">⬆ Importer <input type="file" id="import" accept="application/json,.json" hidden></label>
          <button class="btn danger" id="reset">Tout réinitialiser</button>
        </div>
        <p id="msg" class="small"></p>
      </section>`;

    $("#new").onchange = (e) => { S.newPerDay = Math.max(0, Math.min(100, +e.target.value || 0)); save(); };
    $("#auto").onchange = (e) => { S.autoPlay = e.target.checked; save(); };
    $("#rate").oninput = (e) => { S.rate = +e.target.value; $("#rate-v").textContent = S.rate.toFixed(2); save(); };
    $("#voice").onchange = (e) => { S.voice = e.target.value; save(); speak("Bonjour !"); };
    $("#test").onclick = () => speak("Bonjour, comment ça va ?");
    if ($("#copy-hard")) {
      $("#copy-hard").onclick = () => copyHard(FB.hardWords().filter((w) => !FB.aidFor(w)));
      $("#copy-all-hard").onclick = () => copyHard(FB.hardWords());
    }
    root.querySelectorAll("[data-unflag]").forEach((b) => (b.onclick = () => { delete state.flagged[b.dataset.unflag]; save(); render(); }));

    $("#export").onclick = () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `gallicum-progression-${FB.dateKey()}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    };
    $("#import").onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (!data || typeof data !== "object" || !data.cards || !data.settings) throw new Error("format");
        if (!confirm("Remplacer votre progression actuelle par ce fichier ?")) return;
        FB.state = { ...FB.defaults(), ...data, settings: { ...FB.defaults().settings, ...data.settings } };
        location.reload();
      } catch {
        $("#msg").textContent = "Fichier invalide.";
      }
    };
    $("#reset").onclick = () => {
      if (!confirm("Effacer toute votre progression ? (Exportez d'abord si vous voulez la garder.)")) return;
      FB.state = FB.defaults();
      location.reload();
    };
  }

  render();
  // Voices may arrive late on first load.
  if ("speechSynthesis" in window && !FB.loadVoices().length) setTimeout(() => location.hash.includes("reglages") && render(), 1000);
};
