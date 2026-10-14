// Grammar course A1 → B1: lessons (notes + quiz), placement tests per level, printable notes.
Views.grammaire = function (root, [topicId]) {
  const { $, $$, esc, shuffle, bump, save, check, accentBar } = FB;
  const state = FB.state;
  const LEVELS = window.GRAMMAR_LEVELS;
  const TEST_SIZE = 20;

  const blank = (q) => esc(q).replace("___", '<span class="blank">_____</span>');
  const answerOf = (q) => (q.t ? q.t[0] : q.c[q.a]);
  // "autant d'" + " argent" → "autant d'argent"
  const filled = (q) => {
    const a = answerOf(q);
    return esc(q.q).replace(a.endsWith("'") ? /___ ?/ : "___", `<b>${esc(a)}</b>`);
  };
  const best = (g) => (state.grammar[g.id] ? state.grammar[g.id].best : null);
  const nextLesson = () => window.GRAMMAR.find((g) => (best(g) ?? 0) < 0.8);

  // ---------- Course overview ----------
  function index() {
    App.onKey = null;
    const next = nextLesson();
    root.innerHTML = `
      <h1>Grammaire</h1>
      <p class="muted">Un cours complet de A1 à B1 : chaque leçon a une fiche (règles, tableaux, exemples) et des exercices. Une leçon est « acquise » à 80 %.</p>
      <section class="card">
        <div class="row wrap between">
          <div>
            ${next ? `<div class="muted small">Prochaine leçon</div><a class="lead" href="#/grammaire/${next.id}"><b>${esc(next.title)}</b></a> <span class="tag">${next.level}</span>`
              : `<b>Bravo, tout le cours est acquis ! 🎉</b>`}
          </div>
          <a class="btn" href="#/grammaire/fiches">📄 Toutes les fiches</a>
        </div>
        <hr>
        <div class="muted small">Pas sûr de ce que vous avez oublié ? Faites un test de niveau (${TEST_SIZE} questions mélangées) :</div>
        <div class="row wrap">${LEVELS.map((l) => `<a class="btn" href="#/grammaire/test-${l}">Test ${l}</a>`).join("")}</div>
      </section>
      ${LEVELS.map((l) => {
        const topics = window.GRAMMAR.filter((g) => g.level === l);
        const done = topics.filter((g) => (best(g) ?? 0) >= 0.8).length;
        return `
          <h2 class="level-head">${l} <span class="muted small">${done} / ${topics.length} leçons acquises</span></h2>
          <div class="topics">${topics.map((g) => {
            const b = best(g);
            const pct = b != null ? Math.round(b * 100) : null;
            const n = window.GRAMMAR.indexOf(g) + 1;
            return `<a class="card topic ${g === next ? "next" : ""}" href="#/grammaire/${g.id}">
              <div class="row between"><span class="muted small">Leçon ${n}</span>${pct != null ? `<b class="${pct >= 80 ? "ok" : pct >= 50 ? "accent" : "wrong"}">${pct}%</b>` : '<span class="muted small">à faire</span>'}</div>
              <h3>${esc(g.title)}</h3>
              <div class="track"><div style="width:${pct || 0}%"></div></div>
            </a>`;
          }).join("")}</div>`;
      }).join("")}`;
  }

  // ---------- All notes (printable) ----------
  function sheets() {
    App.onKey = null;
    root.innerHTML = `
      <p class="no-print"><a href="#/grammaire">← Grammaire</a></p>
      <div class="row between"><h1>Fiches de grammaire A1 → B1</h1><button class="btn no-print" id="print">🖨 Imprimer / PDF</button></div>
      <nav class="toc card">${LEVELS.map((l) => `<div><b>${l}</b><ol start="${window.GRAMMAR.findIndex((g) => g.level === l) + 1}">${window.GRAMMAR.filter((g) => g.level === l)
        .map((g) => `<li><a href="#/grammaire/${g.id}">${esc(g.title)}</a></li>`).join("")}</ol></div>`).join("")}</nav>
      ${window.GRAMMAR.map((g, i) => `
        <section class="card explain sheet">
          <h2>${i + 1}. ${esc(g.title)} <span class="tag">${g.level}</span></h2>
          ${g.explain}
          <p class="example small">Ex. : ${g.questions.slice(0, 2).map(filled).join(" · ")}</p>
        </section>`).join("")}`;
    $("#print").onclick = () => window.print();
  }

  // ---------- Lesson page ----------
  function lesson(topic) {
    App.onKey = null;
    const i = window.GRAMMAR.indexOf(topic);
    const prev = window.GRAMMAR[i - 1], next = window.GRAMMAR[i + 1];
    root.innerHTML = `
      <p><a href="#/grammaire">← Grammaire</a></p>
      <div class="muted small">Leçon ${i + 1} · ${topic.level}</div>
      <h1>${esc(topic.title)}</h1>
      <section class="card explain">${topic.explain}</section>
      <button class="btn primary" id="start">Exercices (${topic.questions.length}) <small>Entrée</small></button>
      <div class="row between lesson-nav">
        ${prev ? `<a href="#/grammaire/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a href="#/grammaire/${next.id}">${esc(next.title)} →</a>` : "<span></span>"}
      </div>`;
    const start = () => quiz(shuffle(topic.questions).map((q) => ({ q, topic })), { title: topic.title, back: () => lesson(topic), topic });
    $("#start").onclick = start;
    App.onKey = (e) => { if (e.key === "Enter") { e.preventDefault(); start(); } };
  }

  // ---------- Placement test ----------
  function levelTest(level) {
    const topics = window.GRAMMAR.filter((g) => g.level === level);
    // Spread questions across every lesson of the level.
    const perTopic = Math.max(1, Math.ceil(TEST_SIZE / topics.length));
    const items = shuffle(topics.flatMap((t) => shuffle(t.questions).slice(0, perTopic).map((q) => ({ q, topic: t })))).slice(0, TEST_SIZE);
    quiz(items, { title: `Test de niveau ${level}`, back: index, level });
  }

  // ---------- Quiz (lesson or test) ----------
  function quiz(items, opts) {
    let n = 0, score = 0;
    const wrong = [];

    function ask() {
      if (n === items.length) return done();
      const { q, topic } = items[n];
      const typed = !!q.t;
      const choices = typed ? [] : shuffle(q.c.map((text, i) => ({ text, right: i === q.a })));
      root.innerHTML = `
        <p><a href="#/grammaire${opts.topic ? "/" + opts.topic.id : ""}">← ${esc(opts.title)}</a></p>
        <div class="progress"><div style="width:${(n / items.length) * 100}%"></div></div>
        <section class="card flash">
          <div class="meta">${opts.level ? `<span class="tag">${esc(topic.title)}</span>` : ""}<span class="muted small">${n + 1} / ${items.length}</span></div>
          <p class="question">${blank(q.q)}</p>
          ${typed ? `
            <form id="f" class="answer-form" autocomplete="off">
              <input id="ans" placeholder="Votre réponse…" autocapitalize="off" spellcheck="false">
              <button class="btn primary">Vérifier</button>
            </form>
            ${accentBar("ans")}`
          : `<div class="choices">${choices.map((c, i) => `<button class="btn choice" data-i="${i}"><small>${i + 1}</small> ${esc(c.text)}</button>`).join("")}</div>`}
          <p><button class="btn ghost" id="idk">🤷 Je ne sais pas <small>Échap</small></button></p>
          <div id="fb"></div>
        </section>`;

      let answered = false;
      // result: "ok" | "accent" | "wrong" | "idk"; given = what the learner answered (null for "je ne sais pas")
      function feedback(result, given) {
        answered = true;
        $("#idk").remove();
        if (result === "ok") score++;
        else if (result === "accent") score += 0.5;
        if (result !== "ok") wrong.push({ q, topic, given, result });
        const s = (state.grammar[topic.id] ||= { ok: 0, ko: 0, best: 0 });
        if (result === "ok") s.ok++; else s.ko++;
        bump("grammar");
        const head = { ok: "✓ Correct !", accent: "≈ Presque — attention aux accents.", wrong: "✗ Non.", idk: "💡 Voici la réponse." }[result];
        $("#fb").innerHTML = `
          <p class="${result}">${head} ${esc(q.why)}</p>
          ${q.q.includes("___") ? `<p class="example">${filled(q)}</p>` : typed ? `<p class="example">Réponse : <b>${esc(answerOf(q))}</b></p>` : ""}
          <button class="btn primary" id="next">Suivant <small>Entrée</small></button>`;
        $("#next").onclick = () => { n++; ask(); };
        setTimeout(() => (App.onKey = (e) => { if (e.key === "Enter") { e.preventDefault(); n++; ask(); } }), 0);
      }

      if (typed) {
        const input = $("#ans");
        input.focus();
        App.onKey = null;
        $("#f").onsubmit = (e) => {
          e.preventDefault();
          if (answered) return;
          const r = check(input.value, q.t);
          input.disabled = true;
          input.classList.add(r);
          feedback(r, input.value.trim() || null);
        };
        $("#idk").onclick = () => { if (answered) return; input.disabled = true; feedback("idk", null); };
        App.onKey = (e) => { if (e.key === "Escape" && !answered) { e.preventDefault(); $("#idk").click(); } };
      } else {
        const reveal = (picked) => $$(".choice").forEach((b, j) => {
          b.disabled = true;
          if (choices[j].right) b.classList.add("ok");
          else if (j === picked) b.classList.add("wrong");
        });
        const choose = (i) => {
          if (answered || !choices[i]) return;
          reveal(i);
          feedback(choices[i].right ? "ok" : "wrong", choices[i].text);
        };
        $$(".choice").forEach((b) => (b.onclick = () => choose(+b.dataset.i)));
        $("#idk").onclick = () => { if (answered) return; reveal(-1); feedback("idk", null); };
        App.onKey = (e) => {
          if (e.key === "Escape") { e.preventDefault(); $("#idk")?.click(); return; }
          const k = +e.key;
          if (k >= 1 && k <= choices.length) choose(k - 1);
        };
      }
    }

    function done() {
      App.onKey = null;
      const pct = score / items.length;
      if (opts.topic && !opts.retry) {
        const s = state.grammar[opts.topic.id];
        s.best = Math.max(s.best, pct);
      }
      save();
      // For a placement test, list the lessons where mistakes were made.
      const weakTopics = [...new Set(wrong.map((w) => w.topic))];
      root.innerHTML = `
        <p><a href="#/grammaire">← Grammaire</a></p>
        <section class="card center">
          <h2>${esc(opts.title)}</h2>
          <p class="lead">${score} / ${items.length} ${pct >= 0.8 ? "🌟" : pct >= 0.5 ? "💪" : "📚"}</p>
          ${opts.level && weakTopics.length ? `<div class="left"><h3>Leçons à revoir</h3><ul>${weakTopics.map((t) =>
            `<li><a href="#/grammaire/${t.id}">${esc(t.title)}</a></li>`).join("")}</ul></div>` : ""}
          ${wrong.length ? `<div class="left"><h3>Explications (${wrong.length})</h3>${wrong.map(({ q, topic, given, result }) => `
            <div class="correction">
              <p class="question-small">${filled(q)}</p>
              <p class="small">${result === "idk" ? `<span class="muted">Vous ne saviez pas.</span>`
                : `Votre réponse : <s class="wrong">${esc(given || "—")}</s>${result === "accent" ? ' <span class="accent">(accents)</span>' : ""}`}
                · Bonne réponse : <b class="ok">${esc(answerOf(q))}</b></p>
              <p class="small">💡 ${esc(q.why)}</p>
              ${opts.level ? `<p class="small"><a href="#/grammaire/${topic.id}">Revoir la leçon « ${esc(topic.title)} »</a></p>` : ""}
            </div>`).join("")}</div>` : ""}
          ${wrong.length ? `<button class="btn primary" id="retry">Refaire mes erreurs (${wrong.length})</button>` : ""}
          <button class="btn ${wrong.length ? "" : "primary"}" id="again">Recommencer</button> <button class="btn" id="back">${opts.topic ? "Relire la leçon" : "Retour au cours"}</button>
          ${opts.topic && pct >= 0.8 && window.GRAMMAR[window.GRAMMAR.indexOf(opts.topic) + 1]
            ? `<a class="btn" href="#/grammaire/${window.GRAMMAR[window.GRAMMAR.indexOf(opts.topic) + 1].id}">Leçon suivante →</a>` : ""}
        </section>`;
      $("#again").onclick = () => (opts.level ? levelTest(opts.level) : quiz(shuffle(items), opts));
      if ($("#retry")) $("#retry").onclick = () => quiz(shuffle(wrong.map(({ q, topic }) => ({ q, topic }))), { ...opts, title: opts.title + " — erreurs", retry: true });
      $("#back").onclick = opts.back;
    }

    ask();
  }

  // ---------- Routing ----------
  if (topicId === "fiches") return sheets();
  if (topicId && topicId.startsWith("test-") && LEVELS.includes(topicId.slice(5))) return levelTest(topicId.slice(5));
  const topic = window.GRAMMAR.find((g) => g.id === topicId);
  if (topic) return lesson(topic);
  index();
};
