// Dashboard: streak, today's work, weak spots, recent activity.
Views.accueil = function (root) {
  const { esc, state, dayNum, dateKey, streak, today, speak } = FB;
  const words = FB.allWords();
  const now = dayNum();
  const due = words.filter((w) => state.cards[w.id] && state.cards[w.id].due <= now).length;
  const unseen = words.filter((w) => !state.cards[w.id]).length;
  const newLeft = Math.max(0, Math.min(unseen, state.settings.newPerDay - today().newCards));
  const learned = words.filter((w) => state.cards[w.id] && state.cards[w.id].interval >= 21).length;
  const t = today();

  // Word of the day: stable for the whole day.
  const wotd = window.VOCAB[now % window.VOCAB.length];

  // Weakest verb/tense pairs (at least 2 attempts).
  const weak = Object.entries(state.conj)
    .filter(([, s]) => s.ok + s.ko >= 2 && s.ko > 0)
    .map(([k, s]) => ({ k, rate: s.ok / (s.ok + s.ko), s }))
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 5);

  // Last 14 days of activity.
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const x = state.daily[dateKey(d)];
    const total = x ? x.cards + x.conj + x.grammar + x.dict * 3 + Math.round(x.words / 20) : 0;
    days.push({ label: d.toLocaleDateString("fr-FR", { weekday: "narrow" }), total });
  }
  const max = Math.max(10, ...days.map((d) => d.total));

  root.innerHTML = `
    <section class="hero">
      <div>
        <h1>Bonjour ! 👋</h1>
        <p class="muted">Un peu chaque jour, c'est le secret. Objectif : B1 et au-delà.</p>
      </div>
      <div class="streak" title="Jours consécutifs">🔥 <b>${streak()}</b> <span>jour${streak() > 1 ? "s" : ""}</span></div>
    </section>

    <section class="grid3">
      <a class="tile primary" href="#/vocabulaire">
        <div class="big">${due + newLeft}</div>
        <div>cartes aujourd'hui</div>
        <div class="muted small">${due} à revoir · ${newLeft} nouvelles</div>
      </a>
      <a class="tile" href="#/conjugaison"><div class="big">${t.conj}</div><div>verbes conjugués</div><div class="muted small">aujourd'hui</div></a>
      <a class="tile" href="#/grammaire"><div class="big">${t.grammar}</div><div>questions de grammaire</div><div class="muted small">aujourd'hui</div></a>
      <a class="tile" href="#/dictee"><div class="big">${t.dict}</div><div>dictées</div><div class="muted small">aujourd'hui</div></a>
      <a class="tile" href="#/ecrire"><div class="big">${t.words}</div><div>mots écrits</div><div class="muted small">aujourd'hui</div></a>
      <a class="tile" href="#/lexique"><div class="big">${learned}<span class="muted small"> / ${words.length}</span></div><div>mots bien ancrés</div><div class="muted small">intervalle ≥ 3 semaines</div></a>
    </section>

    <section class="card">
      <h2>Mot du jour</h2>
      <p class="wotd"><b>${esc(wotd[0])}</b> <button class="icon" id="wotd-say" title="Écouter">🔊</button> — ${esc(wotd[1])}</p>
      <p class="example">« ${esc(wotd[2])} »</p>
    </section>

    <div class="two-col">
      <section class="card">
        <h2>Activité (14 jours)</h2>
        <div class="bars">${days.map((d) => `<div class="bar" title="${d.total}"><span style="height:${Math.round((d.total / max) * 100)}%"></span><em>${d.label}</em></div>`).join("")}</div>
      </section>
      <section class="card">
        <h2>Grammaire</h2>
        ${window.GRAMMAR.map((g) => {
          const s = state.grammar[g.id];
          const pct = s ? Math.round(s.best * 100) : 0;
          return `<a class="meter" href="#/grammaire/${g.id}"><span>${esc(g.title)}</span><div class="track"><div style="width:${pct}%"></div></div><b>${s ? pct + "%" : "–"}</b></a>`;
        }).join("")}
      </section>
    </div>

    <section class="card">
      <h2>Points faibles en conjugaison</h2>
      ${weak.length ? `<ul class="weak">${weak.map(({ k, s }) => {
        const [inf, tense] = k.split("|");
        return `<li><b>${esc(inf)}</b> · ${Conj.TENSES[tense]} <span class="muted">(${s.ok} ✓ / ${s.ko} ✗)</span></li>`;
      }).join("")}</ul><p class="muted small">Le mode Exercice vous les reposera plus souvent.</p>`
      : `<p class="muted">Rien à signaler pour l'instant — faites quelques exercices de conjugaison.</p>`}
    </section>`;

  FB.$("#wotd-say").onclick = () => speak(wotd[0] + ". " + wotd[2]);
};
