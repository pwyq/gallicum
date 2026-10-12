// Grammar topics: short explanation + multiple-choice quiz with explanations.
Views.grammaire = function (root, [topicId]) {
  const { $, $$, esc, shuffle, bump, save } = FB;
  const state = FB.state;
  const topic = window.GRAMMAR.find((g) => g.id === topicId);

  const blank = (q) => esc(q).replace("___", '<span class="blank">_____</span>');

  if (!topic) {
    root.innerHTML = `
      <h1>Grammaire</h1>
      <p class="muted">Les points clés du niveau B1. Lisez l'explication, puis faites le quiz.</p>
      <div class="topics">${window.GRAMMAR.map((g) => {
        const s = state.grammar[g.id];
        const pct = s ? Math.round(s.best * 100) : null;
        return `<a class="card topic" href="#/grammaire/${g.id}">
          <div class="row between"><span class="tag">${g.level}</span>${pct != null ? `<b class="${pct >= 80 ? "ok" : pct >= 50 ? "accent" : "wrong"}">${pct}%</b>` : '<span class="muted small">pas encore fait</span>'}</div>
          <h3>${esc(g.title)}</h3>
          <div class="track"><div style="width:${pct || 0}%"></div></div>
        </a>`;
      }).join("")}</div>`;
    return;
  }

  function intro() {
    App.onKey = null;
    root.innerHTML = `
      <p><a href="#/grammaire">← Tous les thèmes</a></p>
      <h1>${esc(topic.title)}</h1>
      <section class="card explain">${topic.explain}</section>
      <button class="btn primary" id="start">Commencer le quiz (${topic.questions.length} questions)</button>`;
    $("#start").onclick = quiz;
    App.onKey = (e) => { if (e.key === "Enter") { e.preventDefault(); quiz(); } };
  }

  function quiz() {
    const qs = shuffle(topic.questions);
    let n = 0, score = 0;
    const wrong = [];

    function ask() {
      if (n === qs.length) return done();
      const q = qs[n];
      const choices = shuffle(q.c.map((text, i) => ({ text, right: i === q.a })));
      root.innerHTML = `
        <p><a href="#/grammaire/${topic.id}">← ${esc(topic.title)}</a></p>
        <div class="progress"><div style="width:${(n / qs.length) * 100}%"></div></div>
        <section class="card flash">
          <div class="meta"><span class="muted small">${n + 1} / ${qs.length}</span></div>
          <p class="question">${blank(q.q)}</p>
          <div class="choices">${choices.map((c, i) => `<button class="btn choice" data-i="${i}"><small>${i + 1}</small> ${esc(c.text)}</button>`).join("")}</div>
          <div id="fb"></div>
        </section>`;

      let answered = false;
      function choose(i) {
        if (answered || !choices[i]) return;
        answered = true;
        const ok = choices[i].right;
        if (ok) score++; else wrong.push(q);
        bump("grammar");
        $$(".choice").forEach((b, j) => {
          b.disabled = true;
          if (choices[j].right) b.classList.add("ok");
          else if (j === i) b.classList.add("wrong");
        });
        const filled = esc(q.q).replace("___", `<b>${esc(choices.find((c) => c.right).text)}</b>`);
        $("#fb").innerHTML = `
          <p class="${ok ? "ok" : "wrong"}">${ok ? "✓ Correct !" : "✗ Non."} ${esc(q.why)}</p>
          ${q.q.includes("___") ? `<p class="example">${filled}</p>` : ""}
          <button class="btn primary" id="next">Suivant <small>Entrée</small></button>`;
        $("#next").onclick = () => { n++; ask(); };
        App.onKey = (e) => { if (e.key === "Enter") { e.preventDefault(); n++; ask(); } };
      }
      $$(".choice").forEach((b) => (b.onclick = () => choose(+b.dataset.i)));
      App.onKey = (e) => { const k = +e.key; if (k >= 1 && k <= choices.length) choose(k - 1); };
    }

    function done() {
      App.onKey = null;
      const pct = score / qs.length;
      const s = (state.grammar[topic.id] ||= { ok: 0, ko: 0, best: 0 });
      s.ok += score; s.ko += qs.length - score; s.best = Math.max(s.best, pct);
      save();
      root.innerHTML = `
        <p><a href="#/grammaire">← Tous les thèmes</a></p>
        <section class="card center">
          <h2>${esc(topic.title)}</h2>
          <p class="lead">${score} / ${qs.length} ${pct >= 0.8 ? "🌟" : pct >= 0.5 ? "💪" : "📚"}</p>
          ${wrong.length ? `<div class="left"><h3>À revoir</h3><ul>${wrong.map((q) =>
            `<li>${esc(q.q).replace("___", `<b>${esc(q.c[q.a])}</b>`)} <span class="muted small">— ${esc(q.why)}</span></li>`).join("")}</ul></div>` : ""}
          <button class="btn primary" id="again">Recommencer</button> <button class="btn" id="rule">Relire la règle</button>
        </section>`;
      $("#again").onclick = quiz;
      $("#rule").onclick = intro;
    }

    ask();
  }

  intro();
};
