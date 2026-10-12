// Writing practice: DELF B1-style prompts, word counter, self-check list, journal.
Views.ecrire = function (root, [entryId]) {
  const { $, $$, esc, save, today, dateKey } = FB;
  const state = FB.state;
  const count = (t) => (t.trim().match(/[\p{L}\d]+(?:['’-][\p{L}\d]+)*/gu) || []).length;
  const CHECKLIST = [
    "Accords sujet–verbe (ils parlent, nous allons…)",
    "Accords des adjectifs et participes (-e, -s)",
    "Temps du passé : imparfait (décor) / passé composé (événements)",
    "Au moins 3 connecteurs (cependant, donc, en revanche…)",
    "Accents (é, è, à, ç…)",
    "Pas de répétition : varier le vocabulaire",
  ];

  function list() {
    App.onKey = null;
    const journal = [...state.journal].sort((a, b) => b.date.localeCompare(a.date));
    root.innerHTML = `
      <h1>Écrire</h1>
      <p class="muted">Production écrite type DELF B1 : 160 à 180 mots. Écrire régulièrement, c'est ce qui fait passer de A2 à B1.</p>
      <div class="topics">
        <a class="card topic" href="#/ecrire/new-free"><span class="tag">libre</span><h3>Écriture libre</h3><p class="muted small">Journal, réflexions, ce que vous voulez.</p></a>
        ${window.PROMPTS.map((p, i) => `
          <a class="card topic" href="#/ecrire/new-${i}"><span class="tag">${esc(p.focus)}</span><h3>${esc(p.title)}</h3><p class="muted small">${esc(p.task)}</p></a>`).join("")}
      </div>
      <h2>Mon journal</h2>
      ${journal.length ? `<ul class="journal">${journal.map((e) => `
        <li><a href="#/ecrire/${e.id}"><b>${esc(e.title)}</b></a> <span class="muted small">${e.date} · ${count(e.text)} mots</span></li>`).join("")}</ul>`
      : `<p class="muted">Aucun texte pour l'instant.</p>`}`;
  }

  function editor(entry, prompt) {
    root.innerHTML = `
      <p><a href="#/ecrire">← Retour</a></p>
      <h1>${esc(entry.title)}</h1>
      ${prompt ? `<section class="card explain">
        <p><b>Sujet :</b> ${esc(prompt.task)}</p>
        <p><b>Objectif grammatical :</b> ${esc(prompt.focus)}</p>
        <p><b>Mots utiles :</b> ${prompt.words.map((w) => `<span class="chip">${esc(w)}</span>`).join(" ")}</p>
      </section>` : ""}
      <section class="card">
        <textarea id="txt" rows="14" placeholder="Écrivez ici…" spellcheck="false">${esc(entry.text)}</textarea>
        ${FB.accentBar("txt")}
        <div class="row between wrap">
          <span id="wc" class="muted"></span>
          <div class="row wrap">
            <button class="btn" id="copy" title="Copie votre texte avec une consigne de correction, à coller dans Claude ou un autre assistant">📋 Copier pour correction</button>
            ${entry.saved ? `<button class="btn danger" id="del">Supprimer</button>` : ""}
            <button class="btn primary" id="save">Enregistrer <small>Ctrl+S</small></button>
          </div>
        </div>
        <p id="msg" class="small"></p>
      </section>
      <section class="card">
        <h3>Relecture</h3>
        <div class="checks">${CHECKLIST.map((c) => `<label class="check"><input type="checkbox"> ${esc(c)}</label>`).join("")}</div>
      </section>`;

    const txt = $("#txt");
    const wc = () => {
      const n = count(txt.value);
      $("#wc").innerHTML = `<b class="${n >= 160 && n <= 200 ? "ok" : ""}">${n}</b> mots <span class="small">(objectif DELF B1 : 160–180)</span>`;
    };
    txt.oninput = wc;
    wc();
    txt.focus();

    const startWords = count(entry.text);
    let credited = startWords;
    function doSave() {
      entry.text = txt.value;
      if (!entry.saved) { entry.saved = true; state.journal.push(entry); }
      const n = count(entry.text);
      if (n > credited) { today().words += n - credited; credited = n; }
      save();
      $("#msg").textContent = "Enregistré ✓";
      setTimeout(() => { const m = $("#msg"); if (m) m.textContent = ""; }, 2000);
      if (!$("#del")) history.replaceState(null, "", "#/ecrire/" + entry.id);
    }
    $("#save").onclick = doSave;
    App.onKey = (e) => { if (e.key === "s" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); doSave(); } };

    $("#copy").onclick = async () => {
      const text = `Tu es professeur de français. Corrige ce texte écrit par un apprenant de niveau A2–B1.
1) Donne la version corrigée.
2) Liste chaque erreur avec une courte explication (en anglais si besoin), classée par type : grammaire, vocabulaire, orthographe.
3) Propose 3 expressions plus naturelles ou de niveau B1–B2 que j'aurais pu utiliser.
${prompt ? `\nSujet : ${prompt.task}\n` : ""}
Mon texte :
"""
${txt.value}
"""`;
      try { await navigator.clipboard.writeText(text); $("#msg").textContent = "Copié ! Collez-le dans Claude pour une correction détaillée."; }
      catch { $("#msg").textContent = "Impossible de copier automatiquement."; }
    };

    const del = $("#del");
    if (del) del.onclick = () => {
      if (!confirm("Supprimer ce texte ?")) return;
      state.journal = state.journal.filter((e) => e.id !== entry.id);
      save();
      App.go("ecrire");
    };
  }

  if (!entryId) return list();
  if (entryId.startsWith("new-")) {
    const which = entryId.slice(4);
    const prompt = which === "free" ? null : window.PROMPTS[+which];
    const entry = { id: "j" + Date.now(), date: dateKey(), title: prompt ? prompt.title : "Écriture libre", promptIdx: prompt ? +which : null, text: "", saved: false };
    return editor(entry, prompt);
  }
  const entry = state.journal.find((e) => e.id === entryId);
  if (!entry) return list();
  entry.saved = true;
  editor(entry, entry.promptIdx != null ? window.PROMPTS[entry.promptIdx] : null);
};
