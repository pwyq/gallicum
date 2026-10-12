// Dictation: listen (browser French voice), type, get a word-by-word correction.
Views.dictee = function (root) {
  const { $, esc, norm, stripAccents, speak, bump, save, accentBar } = FB;
  const state = FB.state;
  const S = state.settings;

  const tokens = (s) => s.replace(/[’]/g, "'").split(/\s+/)
    .map((w) => w.replace(/^[«"(\-–—]+|[.,!?;:»")\-–—]+$/g, ""))
    .filter(Boolean);
  const key = (w) => stripAccents(w.toLowerCase());

  // Word-level diff via LCS (accent-insensitive match, then flag accent differences).
  function diff(expected, typed) {
    const a = tokens(expected), b = tokens(typed);
    const m = a.length, n = b.length;
    const L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--)
      L[i][j] = key(a[i]) === key(b[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const ops = [];
    let i = 0, j = 0;
    while (i < m || j < n) {
      if (i < m && j < n && key(a[i]) === key(b[j])) {
        ops.push({ t: a[i].toLowerCase() === b[j].toLowerCase() ? "ok" : "accent", exp: a[i], got: b[j] }); i++; j++;
      } else if (j < n && (i === m || L[i][j + 1] >= L[i + 1][j])) { ops.push({ t: "extra", got: b[j] }); j++; }
      else { ops.push({ t: "missing", exp: a[i] }); i++; }
    }
    const ok = ops.filter((o) => o.t === "ok").length, acc = ops.filter((o) => o.t === "accent").length;
    return { ops, score: m ? (ok + acc * 0.5) / m : 0 };
  }

  function pickSentence(lastIdx) {
    const pool = window.DICTATIONS.map((d, i) => ({ ...d, i }))
      .filter((d) => (S.dictLevel === "all" || d.level === S.dictLevel) && d.i !== lastIdx);
    // Prefer sentences never done, then the lowest best score.
    const scoreOf = (d) => (state.dictation[d.i] ? state.dictation[d.i].best : -1) + Math.random() * 0.3;
    return pool.sort((x, y) => scoreOf(x) - scoreOf(y))[0];
  }

  function show(lastIdx) {
    const d = pickSentence(lastIdx);
    root.innerHTML = `
      <h1>Dictée</h1>
      <div id="voice-note" hidden><div class="notice">Aucune voix française détectée. Sous Windows : <b>Paramètres → Heure et langue → Voix</b> (ou Langue → ajouter Français) pour installer une voix, puis rechargez la page. Edge propose aussi des voix « Online (Natural) » de très bonne qualité.</div></div>
      <section class="card">
        <div class="row wrap between">
          <div class="row">
            <button class="btn primary" id="play">▶ Écouter <small>Ctrl+Espace</small></button>
            <button class="btn" id="slow">🐢 Lentement</button>
          </div>
          <label>Niveau
            <select id="level">
              ${["all", "A2", "B1"].map((l) => `<option value="${l}" ${S.dictLevel === l ? "selected" : ""}>${l === "all" ? "Tous" : l}</option>`).join("")}
            </select>
          </label>
        </div>
        <textarea id="ans" rows="3" placeholder="Écrivez ce que vous entendez…" spellcheck="false" autocapitalize="off"></textarea>
        ${accentBar("ans")}
        <div class="row"><button class="btn primary" id="check">Vérifier <small>Ctrl+Entrée</small></button> <button class="btn" id="skip">Passer</button></div>
        <div id="fb"></div>
      </section>
      <p class="muted small">Conseil : écoutez une fois en entier, puis réécoutez autant de fois que nécessaire. Faites attention aux accords (-e, -s) et aux homophones (a/à, et/est, ses/ces).</p>`;

    const play = (rate) => speak(d.text, rate);
    $("#play").onclick = () => play();
    $("#slow").onclick = () => play(Math.max(0.5, S.rate - 0.3));
    $("#level").onchange = (e) => { S.dictLevel = e.target.value; save(); show(); };
    $("#skip").onclick = () => show(d.i);
    const ans = $("#ans");
    ans.focus();
    setTimeout(() => play(), 300);
    // Voices load asynchronously in some browsers, so check after a moment.
    setTimeout(() => {
      const note = $("#voice-note");
      if (note) note.hidden = "speechSynthesis" in window && FB.loadVoices().length > 0;
    }, 1200);

    let checked = false;
    function verify() {
      if (checked) return show(d.i);
      checked = true;
      const { ops, score } = diff(d.text, ans.value);
      const rec = (state.dictation[d.i] ||= { best: 0, tries: 0 });
      rec.tries++; rec.best = Math.max(rec.best, score);
      bump("dict");
      ans.disabled = true;
      const html = ops.map((o) => {
        if (o.t === "ok") return `<span class="w ok">${esc(o.exp)}</span>`;
        if (o.t === "accent") return `<span class="w accent" title="Vous avez écrit : ${esc(o.got)}">${esc(o.exp)}</span>`;
        if (o.t === "missing") return `<span class="w missing" title="Mot manquant ou mal orthographié">${esc(o.exp)}</span>`;
        return `<del class="w extra" title="En trop / erreur">${esc(o.got)}</del>`;
      }).join(" ");
      const exact = norm(ans.value) === norm(d.text);
      $("#fb").innerHTML = `
        <h3>${exact ? "Parfait ! 🎉" : `Score : ${Math.round(score * 100)}%`}</h3>
        <p class="diff">${html}</p>
        <p class="example">${esc(d.text)} <button class="icon" id="again">🔊</button></p>
        <p class="legend small"><span class="w ok">correct</span> <span class="w accent">accent</span> <span class="w missing">manquant</span> <del class="w extra">en trop</del></p>
        <button class="btn primary" id="next">Suivante <small>Ctrl+Entrée</small></button>`;
      $("#again").onclick = () => play();
      $("#next").onclick = () => show(d.i);
      $("#check").disabled = true;
    }
    $("#check").onclick = verify;
    App.onKey = (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); verify(); }
      else if (e.key === " " && e.ctrlKey) { e.preventDefault(); play(); }
    };
  }

  show();
};
