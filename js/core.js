// Core helpers: storage, dates, answer checking, speech, spaced repetition.
(function () {
  // ---------- DOM & strings ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  // ---------- Dates (local days) ----------
  const pad = (n) => String(n).padStart(2, "0");
  const dateKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const dayNum = (d = new Date()) => Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);

  // ---------- Storage ----------
  const KEY = "francais-b1-state-v1";
  const defaults = () => ({
    version: 1,
    settings: { newPerDay: 15, autoPlay: true, rate: 0.95, voice: "", tenses: ["present", "pc", "imparfait", "futur"], verbGroup: "all", dictLevel: "all" },
    cards: {},      // id -> { due, interval, ease, reps, lapses }
    custom: [],     // user-added words
    conj: {},       // "inf|tense" -> { ok, ko }
    grammar: {},    // topicId -> { ok, ko, best }
    dictation: {},  // index -> { best, tries }
    journal: [],    // { id, date, title, text }
    daily: {},      // "YYYY-MM-DD" -> { cards, newCards, conj, grammar, dict, words }
  });

  let state;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      const saved = raw ? JSON.parse(raw) : {};
      const d = defaults();
      state = { ...d, ...saved, settings: { ...d.settings, ...(saved.settings || {}) } };
    } catch (e) {
      console.error("Could not read saved progress", e);
      state = defaults();
    }
    return state;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { console.error("Could not save progress", e); }
  }
  function today() {
    const k = dateKey();
    if (!state.daily[k]) state.daily[k] = { cards: 0, newCards: 0, conj: 0, grammar: 0, dict: 0, words: 0 };
    return state.daily[k];
  }
  function bump(field, n = 1) { today()[field] += n; save(); }

  function streak() {
    let n = 0;
    const d = new Date();
    const active = (k) => { const x = state.daily[k]; return x && (x.cards + x.conj + x.grammar + x.dict + x.words) > 0; };
    if (!active(dateKey(d))) d.setDate(d.getDate() - 1); // today not started yet: streak still alive
    while (active(dateKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  // ---------- Answer checking ----------
  const norm = (s) => String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, " ").replace(/\s*'\s*/g, "'").trim().replace(/[.!?;:,]+$/, "").trim();
  const stripAccents = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe").replace(/æ/g, "ae");
  // Returns "ok" | "accent" (right letters, wrong/missing accents) | "wrong"
  function check(input, accepted) {
    const a = norm(input);
    if (!a) return "wrong";
    const list = (Array.isArray(accepted) ? accepted : [accepted]).map(norm);
    if (list.includes(a)) return "ok";
    if (list.some((x) => stripAccents(x) === stripAccents(a))) return "accent";
    return "wrong";
  }

  // ---------- Speech ----------
  let voices = [];
  function loadVoices() {
    if (!("speechSynthesis" in window)) return [];
    voices = speechSynthesis.getVoices().filter((v) => v.lang && v.lang.toLowerCase().startsWith("fr"));
    return voices;
  }
  if ("speechSynthesis" in window) {
    loadVoices();
    speechSynthesis.addEventListener?.("voiceschanged", loadVoices);
  }
  function pickVoice() {
    if (!voices.length) loadVoices();
    return voices.find((v) => v.name === state.settings.voice)
      || voices.find((v) => v.lang === "fr-FR" && /natural|online/i.test(v.name))
      || voices.find((v) => v.lang === "fr-FR")
      || voices[0];
  }
  function speak(text, rate) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = rate || state.settings.rate;
    speechSynthesis.speak(u);
  }

  // ---------- Accent buttons ----------
  const ACCENTS = ["é", "è", "ê", "ë", "à", "â", "ç", "î", "ï", "ô", "û", "ù", "œ"];
  function accentBar(targetId) {
    return `<div class="accents" data-for="${targetId}">${ACCENTS.map((c) => `<button type="button" tabindex="-1">${c}</button>`).join("")}</div>`;
  }
  // One delegated listener for every accent bar on the page.
  document.addEventListener("mousedown", (e) => {
    const btn = e.target.closest(".accents button");
    if (!btn) return;
    e.preventDefault(); // keep focus in the input
    const input = document.getElementById(btn.parentElement.dataset.for);
    if (!input || input.disabled) return;
    const ch = e.shiftKey ? btn.textContent.toUpperCase() : btn.textContent;
    const { selectionStart: s, selectionEnd: t, value } = input;
    input.value = value.slice(0, s) + ch + value.slice(t);
    input.selectionStart = input.selectionEnd = s + ch.length;
    input.focus();
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });

  // ---------- Spaced repetition (SM-2 variant) ----------
  // grade: 0 = à revoir, 1 = difficile, 2 = bien, 3 = facile
  function review(card, grade) {
    const c = card ? { ...card } : { due: dayNum(), interval: 0, ease: 2.5, reps: 0, lapses: 0 };
    if (grade === 0) {
      c.lapses++; c.reps = 0; c.interval = 0; c.ease = Math.max(1.3, c.ease - 0.2);
    } else {
      if (grade === 1) { c.interval = Math.max(1, Math.round(c.interval * 1.2)); c.ease = Math.max(1.3, c.ease - 0.15); }
      else {
        const next = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.interval * c.ease);
        c.interval = grade === 3 ? Math.round(next * 1.3) + 1 : next;
        if (grade === 3) c.ease += 0.15;
      }
      c.reps++;
    }
    c.due = dayNum() + c.interval;
    return c;
  }

  function allWords() {
    const builtIn = window.VOCAB.map(([fr, en, ex, theme]) => ({ id: fr, fr, en, ex, theme }));
    return builtIn.concat(state.custom.map((w) => ({ ...w, theme: "Mes mots" })));
  }

  window.FB = { $, $$, esc, shuffle, dateKey, dayNum, load, save, today, bump, streak, check, norm, stripAccents,
    speak, loadVoices, accentBar, review, allWords, get state() { return state; }, set state(s) { state = s; save(); }, defaults };
})();
