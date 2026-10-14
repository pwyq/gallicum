// Flashcards with spaced repetition. Two modes: recognise (FR → EN) and produce (EN → FR, typed).
(function () {
  const { $, esc, dayNum, today, speak, check, review, save, bump, accentBar } = FB;
  let state;
  const GRADES = [["À revoir", "again"], ["Difficile", "hard"], ["Bien", "good"], ["Facile", "easy"]];

  // "le/la colocataire" → colocataire, le colocataire, la colocataire… ; "déçu(e)" → déçu, déçue ; "fier / fière" → both
  function acceptedFr(fr) {
    const out = new Set();
    for (const part of fr.split(/\s+\/\s+/)) {
      const variants = /\(e\)/.test(part) ? [part.replace(/\(e\)/g, ""), part.replace(/\(e\)/g, "e")] : [part];
      for (const v of variants) {
        out.add(v);
        const bare = v.replace(/^(le\/la|un\/une|le|la|les|l'|un|une|des)\s*/i, "");
        out.add(bare);
        if (/^le\/la /i.test(v)) { out.add("le " + bare); out.add("la " + bare); }
      }
    }
    return [...out];
  }

  const label = (n) => (n <= 0 ? "maint." : n === 1 ? "1 j" : n < 30 ? `${n} j` : n < 365 ? `${Math.round(n / 30)} mois` : `${(n / 365).toFixed(1)} an`);

  function buildQueue(theme) {
    const now = dayNum();
    const words = FB.allWords().filter((w) => theme === "all" || w.theme === theme);
    const due = words.filter((w) => state.cards[w.id] && state.cards[w.id].due <= now)
      .sort((a, b) => state.cards[a.id].due - state.cards[b.id].due);
    const newLeft = Math.max(0, state.settings.newPerDay - today().newCards);
    const fresh = words.filter((w) => !state.cards[w.id]).slice(0, newLeft);
    return { due, fresh, queue: FB.shuffle(due).concat(fresh) };
  }

  Views.vocabulaire = function (root) {
    state = FB.state;
    let mode = sessionStorage.getItem("vocab-mode") || "recognize";
    let theme = sessionStorage.getItem("vocab-theme") || "all";
    const themes = [...new Set(FB.allWords().map((w) => w.theme))];

    function lobby() {
      App.onKey = null;
      const { due, fresh } = buildQueue(theme);
      root.innerHTML = `
        <h1>Vocabulaire</h1>
        <section class="card">
          <div class="row wrap">
            <label>Mode
              <select id="mode">
                <option value="recognize" ${mode === "recognize" ? "selected" : ""}>Reconnaître (FR → EN)</option>
                <option value="produce" ${mode === "produce" ? "selected" : ""}>Produire (EN → FR, à taper)</option>
              </select>
            </label>
            <label>Thème
              <select id="theme">
                <option value="all">Tous les thèmes</option>
                ${themes.map((t) => `<option ${t === theme ? "selected" : ""}>${esc(t)}</option>`).join("")}
              </select>
            </label>
          </div>
          <p class="lead"><b>${due.length}</b> carte${due.length > 1 ? "s" : ""} à revoir · <b>${fresh.length}</b> nouvelle${fresh.length > 1 ? "s" : ""}</p>
          ${due.length + fresh.length
            ? `<button class="btn primary" id="start">Commencer</button>`
            : `<p class="muted">Tout est à jour pour aujourd'hui 🎉 Revenez demain, ou augmentez le nombre de nouvelles cartes dans les Réglages.</p>`}
          <p class="muted small">Astuce : le mode « Produire » est plus difficile mais bien plus efficace pour parler. Alternez !</p>
        </section>`;
      $("#mode").onchange = (e) => { mode = e.target.value; sessionStorage.setItem("vocab-mode", mode); };
      $("#theme").onchange = (e) => { theme = e.target.value; sessionStorage.setItem("vocab-theme", theme); lobby(); };
      const start = $("#start");
      if (start) start.onclick = () => run(buildQueue(theme).queue);
    }

    function run(queue) {
      let done = 0, again = 0;
      const total = queue.length;
      const seenNew = new Set();

      function finish() {
        App.onKey = null;
        root.innerHTML = `
          <h1>Vocabulaire</h1>
          <section class="card center">
            <h2>Bravo ! 🎉</h2>
            <p class="lead">${done} révision${done > 1 ? "s" : ""} · ${again} à revoir pendant la séance</p>
            <button class="btn" id="back">Retour</button> <a class="btn primary" href="#/accueil">Accueil</a>
          </section>`;
        $("#back").onclick = lobby;
      }

      function next() {
        if (!queue.length) return finish();
        const w = queue[0];
        const card = state.cards[w.id];
        const isNew = !card;
        const previews = [0, 1, 2, 3].map((g) => label(review(card, g).interval));

        root.innerHTML = `
          <div class="progress"><div style="width:${Math.round((done / (total + again || 1)) * 100)}%"></div></div>
          <section class="card flash">
            <div class="meta">${isNew ? '<span class="tag new">nouveau</span>' : ""}<span class="tag">${esc(w.theme)}</span><span class="muted small">${queue.length} restante${queue.length > 1 ? "s" : ""}</span></div>
            <div id="front"></div>
            <div id="back" hidden></div>
            <div id="actions"></div>
          </section>`;

        const front = $("#front"), back = $("#back"), actions = $("#actions");
        const backHtml = `
          <div class="answer"><b>${esc(w.fr)}</b> <button class="icon" id="say">🔊</button></div>
          ${w.back ? `<div class="rich">${w.back}</div>` : `<div class="en">${esc(w.en)}</div>`}
          ${w.ex ? `<p class="example">« ${esc(w.ex)} » <button class="icon" id="say-ex">🔊</button></p>` : ""}`;

        const gradeButtons = (suggest) => `
          <div class="grades">${GRADES.map(([t, cls], g) => `
            <button class="btn grade ${cls} ${g === suggest ? "suggest" : ""}" data-g="${g}"><span>${t}</span><small>${previews[g]} · ${g + 1}</small></button>`).join("")}
          </div>`;

        function showBack(suggest) {
          back.hidden = false;
          back.innerHTML = backHtml;
          actions.innerHTML = gradeButtons(suggest);
          $("#say").onclick = () => speak(w.fr);
          if ($("#say-ex")) $("#say-ex").onclick = () => speak(w.ex);
          actions.querySelectorAll("[data-g]").forEach((b) => (b.onclick = () => grade(+b.dataset.g)));
          App.onKey = (e) => {
            if (e.target.tagName === "INPUT" && e.key !== "Enter") return;
            if (["1", "2", "3", "4"].includes(e.key)) grade(+e.key - 1);
            else if (e.key === "Enter" && suggest != null) { e.preventDefault(); grade(suggest); }
          };
        }

        function grade(g) {
          App.onKey = null;
          state.cards[w.id] = review(card, g);
          if (isNew && !seenNew.has(w.id)) { seenNew.add(w.id); today().newCards++; }
          bump("cards");
          queue.shift();
          if (g === 0) { queue.push(w); again++; } else done++;
          save();
          next();
        }

        // Imported Anki cards carry a full definition rather than a short translation, so they are always shown FR → EN.
        if (mode === "recognize" || w.back) {
          front.innerHTML = `<div class="prompt-word">${esc(w.fr)} <button class="icon" id="say-front">🔊</button></div>`;
          $("#say-front").onclick = () => speak(w.fr);
          actions.innerHTML = `<button class="btn primary wide" id="flip">Voir la réponse <small>Espace</small></button>`;
          const flip = () => { front.hidden = true; showBack(null); if (state.settings.autoPlay && w.ex) speak(w.ex); };
          $("#flip").onclick = flip;
          App.onKey = (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } };
          if (state.settings.autoPlay) speak(w.fr);
        } else {
          front.innerHTML = `
            <div class="prompt-en">${esc(w.en)}</div>
            <form id="f" class="answer-form" autocomplete="off">
              <input id="ans" placeholder="En français…" autocapitalize="off" spellcheck="false">
              <button class="btn primary">Vérifier</button>
            </form>
            ${accentBar("ans")}
            <div id="fb"></div>`;
          const input = $("#ans");
          input.focus();
          $("#f").onsubmit = (e) => {
            e.preventDefault();
            if (input.disabled) return;
            const r = input.value.trim() ? check(input.value, acceptedFr(w.fr)) : "wrong";
            input.disabled = true;
            input.classList.add(r);
            $("#fb").innerHTML = { ok: `<p class="ok">✓ Correct !</p>`, accent: `<p class="accent">≈ Presque — attention aux accents.</p>`, wrong: `<p class="wrong">✗ ${input.value.trim() ? "Pas tout à fait." : "Réponse :"}</p>` }[r];
            showBack({ ok: 2, accent: 1, wrong: 0 }[r]);
            if (state.settings.autoPlay) speak(w.ex ? `${w.fr}. ${w.ex}` : w.fr);
          };
        }
      }
      next();
    }

    lobby();
  };
})();
