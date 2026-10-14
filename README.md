# Gallicum

*Gallicum*, Latin for "the French thing".

A small local app for practising French from A2 up to B1. It has no dependencies, needs no build step and no server, and makes no network calls.

## Lancer l'app

Double-click `index.html`. It works best in **Microsoft Edge**, whose French "Natural" voices are excellent for dictation, or in Chrome.

If you'd rather run it from a local server:

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

> Progress is saved in the browser's `localStorage`, separately for each browser and for `file://` vs `localhost`. Use **Réglages → Exporter** to back it up or move it.

## What's inside

| Section | What it trains |
| --- | --- |
| **Vocabulaire** | ~160 B1 words and expressions (connectors, faux amis, idioms…) with spaced repetition. *Reconnaître* = FR→EN self-graded, *Produire* = EN→FR typed. |
| **Conjugaison** | 7 tenses × ~50 verbs. Questions are weighted toward the verb/tense pairs you get wrong. The *Tableaux* tab shows full reference tables. |
| **Grammaire** | A full course from A1 to B1: 30 lessons, each with notes (rules, tables, examples) and exercises (multiple choice plus typed answers), about 290 in total. Includes a placement test per level and a printable page of all the notes. |
| **Dictée** | Listen to a sentence and type it, then get a word-by-word correction (accents, agreements, missing words). |
| **Écrire** | DELF B1-style prompts with a word counter, a proofreading checklist and a journal. *Copier pour correction* copies your text with a correction prompt you can paste into Claude. |
| **Lexique** | Search every word, see when it's due, and add your own words (they join your reviews). You can also **import an Anki deck**: in Anki, *File → Export… → Notes in Plain Text (.txt)*. |

Keyboard: `Entrée` checks/continues, `Espace` flips a card, `1–4` grades a card or picks a quiz answer, `Ctrl+Entrée` checks a dictation.

## Adding content

All content is plain JS in `js/data/`:

- `vocab.js`: `[français, english, exemple, thème]`
- `verbs.js`: present tense + participle (+ irregular future/subjunctive stems); other tenses are derived
- `grammar-a1.js`, `grammar-a2.js`, `grammar-b1.js`, `grammar.js`: lessons (notes + questions); the course order is set at the end of `grammar.js`
- `texts.js`: dictation sentences and writing prompts

## Suggested routine (20–30 min/day)

1. Vocabulaire: clear the due cards (5–10 min)
2. One of: Conjugaison, a grammar quiz, or 3 dictations (10 min)
3. 2–3 times a week: one writing prompt, then get it corrected

## License

[MIT](LICENSE)
