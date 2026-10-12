// Conjugation drill (weighted toward your mistakes) + reference tables.
Views.conjugaison = function (root, [tab]) {
  const { $, $$, esc, check, bump, save, speak, accentBar } = FB;
  const state = FB.state;
  const S = state.settings;
  const ROUNDS = 15;

  const fullForm = (inf, tense, i, form) => {
    const p = Conj.pronoun(tense, i, form);
    return p.endsWith("'") ? p + form : p + " " + form;
  };

  function verbPool() {
    return window.VERBS.filter((v) => S.verbGroup === "all" || v.group === S.verbGroup);
  }

  // Pick a verb/tense pair, weighted toward pairs you get wrong; unseen pairs get a small boost.
  function pick(last) {
    const items = [];
    for (const v of verbPool()) for (const t of S.tenses) {
      const s = state.conj[`${v.inf}|${t}`];
      const w = s ? (s.ko + 1) / (s.ok + 1) + 0.15 : 1.2;
      if (`${v.inf}|${t}` !== last) items.push([v, t, w]);
    }
    let r = Math.random() * items.reduce((a, x) => a + x[2], 0);
    for (const [v, t, w] of items) { if ((r -= w) <= 0) return [v, t]; }
    return items[items.length - 1];
  }

  function table(v, tense, highlight) {
    const forms = Conj.forms(v, tense);
    return `<table class="conj"><caption>${Conj.TENSES[tense]}</caption>${forms.map((f, i) =>
      `<tr class="${i === highlight ? "hl" : ""}"><td>${esc(fullForm(v.inf, tense, i, f))}</td></tr>`).join("")}</table>`;
  }

  function shell(inner) {
    root.innerHTML = `
      <h1>Conjugaison</h1>
      <div class="tabs">
        <a href="#/conjugaison" class="${tab !== "tableaux" ? "active" : ""}">Exercice</a>
        <a href="#/conjugaison/tableaux" class="${tab === "tableaux" ? "active" : ""}">Tableaux</a>
      </div>
      ${inner}`;
  }

  // ---------- Reference tables ----------
  if (tab === "tableaux") {
    const sel = sessionStorage.getItem("conj-table") || "être";
    shell(`
      <section class="card">
        <label>Verbe
          <select id="verb">${window.VERBS.map((v) => `<option value="${esc(v.inf)}" ${v.inf === sel ? "selected" : ""}>${esc(v.inf)} — ${esc(v.en)}</option>`).join("")}</select>
        </label>
        <div id="tables" class="tables"></div>
      </section>`);
    const draw = () => {
      const v = Conj.find($("#verb").value);
      sessionStorage.setItem("conj-table", v.inf);
      $("#tables").innerHTML = Object.keys(Conj.TENSES).map((t) => table(v, t)).join("")
        + `<p class="muted small full">Auxiliaire : <b>${v.aux === "e" ? "être" : "avoir"}</b> · participe passé : <b>${esc(v.pp)}</b></p>`;
    };
    $("#verb").onchange = draw;
    draw();
    return;
  }

  // ---------- Drill ----------
  function settings() {
    App.onKey = null;
    shell(`
      <section class="card">
        <h2>Temps à travailler</h2>
        <div class="checks">${Object.entries(Conj.TENSES).map(([k, label]) =>
          `<label class="check"><input type="checkbox" value="${k}" ${S.tenses.includes(k) ? "checked" : ""}> ${label}</label>`).join("")}</div>
        <label>Verbes
          <select id="group">
            <option value="all" ${S.verbGroup === "all" ? "selected" : ""}>Tous (${window.VERBS.length})</option>
            <option value="irr" ${S.verbGroup === "irr" ? "selected" : ""}>Irréguliers</option>
            <option value="reg" ${S.verbGroup === "reg" ? "selected" : ""}>Réguliers</option>
          </select>
        </label>
        <p><button class="btn primary" id="start">Commencer (${ROUNDS} questions)</button></p>
        <p class="muted small">Tapez seulement la forme du verbe (ex. pour « nous ___ » au passé composé : <i>avons parlé</i>). Avec être, l'accord est accepté (allé, allée, allés…).</p>
      </section>`);
    $$(".checks input").forEach((c) => (c.onchange = () => {
      S.tenses = $$(".checks input").filter((x) => x.checked).map((x) => x.value);
      save();
      $("#start").disabled = !S.tenses.length;
    }));
    $("#group").onchange = (e) => { S.verbGroup = e.target.value; save(); };
    $("#start").onclick = () => S.tenses.length && drill();
  }

  function drill() {
    let n = 0, score = 0, last = null;
    const misses = [];

    function ask() {
      if (n === ROUNDS) return summary();
      const [v, tense] = pick(last);
      last = `${v.inf}|${tense}`;
      const i = Math.floor(Math.random() * 6);
      const forms = Conj.forms(v, tense);
      const pro = Conj.pronoun(tense, i, Conj.accepted(v, tense, i)[0]);

      shell(`
        <div class="progress"><div style="width:${(n / ROUNDS) * 100}%"></div></div>
        <section class="card flash">
          <div class="meta"><span class="tag">${Conj.TENSES[tense]}</span><span class="muted small">${n + 1} / ${ROUNDS}</span></div>
          <div class="prompt-word">${esc(v.inf)} <span class="muted">— ${esc(v.en)}</span></div>
          <form id="f" class="answer-form" autocomplete="off">
            <span class="pronoun">${esc(pro)}</span>
            <input id="ans" autocapitalize="off" spellcheck="false" placeholder="…">
            <button class="btn primary">Vérifier</button>
          </form>
          ${accentBar("ans")}
          <div id="fb"></div>
        </section>`);
      const input = $("#ans");
      input.focus();

      $("#f").onsubmit = (e) => {
        e.preventDefault();
        if (input.disabled) return;
        const r = check(input.value, Conj.accepted(v, tense, i));
        input.disabled = true;
        input.classList.add(r);
        const key = `${v.inf}|${tense}`;
        const s = (state.conj[key] ||= { ok: 0, ko: 0 });
        if (r === "ok") { s.ok++; score++; } else { s.ko++; misses.push(fullForm(v.inf, tense, i, forms[i]) + ` (${v.inf}, ${Conj.TENSES[tense].toLowerCase()})`); }
        if (r === "accent") score += 0.5;
        bump("conj");
        n++;
        const answer = fullForm(v.inf, tense, i, forms[i]);
        $("#fb").innerHTML = `
          ${{ ok: `<p class="ok">✓ Correct !</p>`, accent: `<p class="accent">≈ Presque : attention aux accents → <b>${esc(answer)}</b></p>`, wrong: `<p class="wrong">✗ La bonne réponse : <b>${esc(answer)}</b></p>` }[r]}
          ${table(v, tense, i)}
          <button class="btn primary" id="next">Suivant <small>Entrée</small></button>`;
        speak(answer.replace("(e)s", "s").replace("(e)", "").replace("il/elle", "il").replace("ils/elles", "ils"));
        $("#next").onclick = ask;
        setTimeout(() => (App.onKey = (ev) => { if (ev.key === "Enter") { ev.preventDefault(); ask(); } }), 0);
      };
      App.onKey = null;
    }

    function summary() {
      App.onKey = null;
      save();
      shell(`
        <section class="card center">
          <h2>${score >= ROUNDS * 0.8 ? "Excellent ! 🌟" : score >= ROUNDS * 0.5 ? "Pas mal ! 💪" : "Continuez ! 📚"}</h2>
          <p class="lead">${score} / ${ROUNDS}</p>
          ${misses.length ? `<div class="left"><h3>À retenir</h3><ul>${misses.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></div>` : ""}
          <button class="btn primary" id="again">Recommencer</button> <button class="btn" id="opts">Changer les options</button>
        </section>`);
      $("#again").onclick = drill;
      $("#opts").onclick = settings;
    }

    ask();
  }

  settings();
};
