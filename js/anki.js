// Import Anki "Notes in Plain Text (.txt)" exports into the user's own words.
(function () {
  // Tab/CSV parser that understands Anki's quoting ("" inside quoted fields, newlines allowed).
  function parseRows(text, sep) {
    const rows = [];
    let row = [], field = "", i = 0, quoted = false;
    while (i < text.length) {
      const c = text[i];
      if (quoted) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
          quoted = false; i++; continue;
        }
        field += c; i++; continue;
      }
      if (c === '"' && field === "") { quoted = true; i++; continue; }
      if (c === sep) { row.push(field); field = ""; i++; continue; }
      if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field); field = "";
        if (row.some((f) => f !== "")) rows.push(row);
        row = []; i++; continue;
      }
      field += c; i++;
    }
    row.push(field);
    if (row.some((f) => f !== "")) rows.push(row);
    return rows;
  }

  const SEPARATORS = { tab: "\t", comma: ",", semicolon: ";", pipe: "|", space: " ", colon: ":" };

  // Keep only simple formatting tags, without attributes. Everything else is unwrapped or dropped,
  // so the result is safe to render with innerHTML.
  const KEEP = new Set(["B", "STRONG", "I", "EM", "BR", "DIV", "P", "UL", "OL", "LI", "SUB", "SUP"]);
  const DROP = new Set(["IMG", "SCRIPT", "STYLE", "AUDIO", "VIDEO", "IFRAME", "OBJECT", "svg", "SVG"]);
  function cleanHtml(src) {
    const doc = new DOMParser().parseFromString(src, "text/html");
    const walk = (node) => {
      let out = "";
      for (const n of node.childNodes) {
        if (n.nodeType === 3) out += FB.esc(n.nodeValue.replace(/ /g, " ").replace(/\[sound:[^\]]*\]/g, ""));
        else if (n.nodeType === 1 && !DROP.has(n.tagName)) {
          const inner = walk(n);
          if (n.tagName === "BR") out += "<br>";
          else if (KEEP.has(n.tagName)) out += `<${n.tagName.toLowerCase()}>${inner}</${n.tagName.toLowerCase()}>`;
          else out += inner;
        }
      }
      return out;
    };
    let html = walk(doc.body);
    // Remove empty blocks and runs of blank lines left behind by the cleanup.
    for (let k = 0; k < 3; k++) html = html.replace(/<(div|p|b|strong|i|em|li)>\s*<\/\1>/g, "");
    return html.replace(/(<br>\s*){3,}/g, "<br><br>").trim();
  }
  const plain = (src) => {
    // Space out block boundaries so "verb<div>1." doesn't become "verb1.".
    const doc = new DOMParser().parseFromString(src.replace(/<\/?(br|div|p|li|ul|ol)\b[^>]*>/gi, " $&"), "text/html");
    return (doc.body.textContent || "").replace(/ /g, " ").replace(/\[sound:[^\]]*\]/g, "").replace(/\s+/g, " ").trim();
  };

  // Returns { notes: [{ guid, front, back, deck, tags }], deck }
  function parse(text, fileName) {
    const meta = { separator: "\t", html: true, cols: {} };
    const body = [];
    for (const line of text.replace(/^﻿/, "").split(/\r?\n/)) {
      const m = line.match(/^#([a-z ]+):(.*)$/i);
      if (m && body.length === 0) {
        const [k, v] = [m[1].trim().toLowerCase(), m[2].trim()];
        if (k === "separator") meta.separator = SEPARATORS[v.toLowerCase()] || v;
        else if (k === "html") meta.html = v === "true";
        else if (k.endsWith(" column")) meta.cols[k.replace(" column", "")] = +v - 1;
        continue;
      }
      body.push(line);
    }
    const metaCols = new Set(Object.values(meta.cols));
    const fallbackDeck = (fileName || "Anki").replace(/\.[^.]+$/, "").replace(/-\d{8,}$/, "");
    const notes = [];
    for (const r of parseRows(body.join("\n"), meta.separator)) {
      const fields = r.filter((_, i) => !metaCols.has(i));
      if (fields.length < 2) continue;
      const front = plain(fields[0]);
      if (!front) continue;
      const backSrc = meta.html ? fields[1] : FB.esc(fields[1]).replace(/\n/g, "<br>");
      notes.push({
        guid: meta.cols.guid != null ? r[meta.cols.guid] : null,
        front,
        back: cleanHtml(backSrc),
        gloss: plain(backSrc),
        deck: (meta.cols.deck != null && r[meta.cols.deck]) ? r[meta.cols.deck].split("::").pop() : fallbackDeck,
      });
    }
    return notes;
  }

  // Merge parsed notes into state.custom. Re-importing the same export updates cards and keeps progress.
  function importNotes(notes, { known = false } = {}) {
    const state = FB.state;
    const builtIn = new Set(window.VOCAB.map(([fr]) => FB.norm(fr)));
    const byId = new Map(state.custom.map((w) => [w.id, w]));
    const short = (s) => (s.length > 90 ? s.slice(0, 88).trimEnd() + "…" : s);
    let added = 0, updated = 0, skipped = 0;
    for (const n of notes) {
      const id = "anki:" + (n.guid || n.deck + ":" + n.front);
      const entry = { id, fr: n.front, en: short(n.gloss), ex: "", back: n.back, deck: n.deck };
      if (byId.has(id)) { Object.assign(byId.get(id), entry); updated++; continue; }
      if (builtIn.has(FB.norm(n.front))) { skipped++; continue; }
      state.custom.push(entry);
      byId.set(id, entry);
      if (known && !state.cards[id]) {
        // Already studied in Anki: start as a review card, spread over the next month.
        state.cards[id] = { due: FB.dayNum() + 1 + Math.floor(Math.random() * 30), interval: 7, ease: 2.5, reps: 2, lapses: 0 };
      }
      added++;
    }
    return { added, updated, skipped };
  }

  window.Anki = { parse, importNotes };
})();
