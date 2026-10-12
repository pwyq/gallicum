// Conjugation engine — derives every tense from the data in data/verbs.js.
(function () {
  const PRON = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];
  const TENSES = {
    present: "Présent",
    pc: "Passé composé",
    imparfait: "Imparfait",
    pqp: "Plus-que-parfait",
    futur: "Futur simple",
    cond: "Conditionnel présent",
    subj: "Subjonctif présent",
  };
  const IMP = ["ais", "ais", "ait", "ions", "iez", "aient"];
  const FUT = ["ai", "as", "a", "ons", "ez", "ont"];
  const SUBJ = ["e", "es", "e", "ions", "iez", "ent"];

  const find = (inf) => window.VERBS.find((v) => v.inf === inf);
  // mange + ions → mangions, commenç + ions → commencions
  const soften = (stem, ending) => (ending[0] === "i" ? stem.replace(/ge$/, "g").replace(/ç$/, "c") : stem);
  const impStem = (v) => (v.inf === "être" ? "ét" : v.pres[3].replace(/ons$/, ""));
  const futStem = (v) => v.fut || (v.inf.endsWith("re") ? v.inf.slice(0, -1) : v.inf);

  function simple(v, tense) {
    switch (tense) {
      case "present": return v.pres;
      case "imparfait": return IMP.map((e) => soften(impStem(v), e) + e);
      case "futur": return FUT.map((e) => futStem(v) + e);
      case "cond": return IMP.map((e) => futStem(v) + e);
      case "subj": {
        if (v.subj) return v.subj;
        const stem = v.pres[5].replace(/ent$/, "");
        const imp = simple(v, "imparfait");
        return SUBJ.map((e, i) => (i === 3 || i === 4 ? imp[i] : stem + e));
      }
    }
  }

  // Compound tenses: returns { aux, pp } per person.
  function compound(v, tense, i) {
    const auxVerb = find(v.aux === "e" ? "être" : "avoir");
    const aux = (tense === "pc" ? auxVerb.pres : simple(auxVerb, "imparfait"))[i];
    return { aux, pp: v.pp };
  }

  // Display forms (without pronoun), e.g. "suis allé(e)".
  function forms(v, tense) {
    if (tense === "pc" || tense === "pqp") {
      return PRON.map((_, i) => {
        const { aux, pp } = compound(v, tense, i);
        return v.aux === "e" ? `${aux} ${pp}${i < 3 ? "(e)" : "(e)s"}` : `${aux} ${pp}`;
      });
    }
    return simple(v, tense);
  }

  // All accepted answers for one person.
  function accepted(v, tense, i) {
    if (tense === "pc" || tense === "pqp") {
      const { aux, pp } = compound(v, tense, i);
      if (v.aux !== "e") return [`${aux} ${pp}`];
      return ["", "e", "s", "es"].map((x) => `${aux} ${pp}${x}`); // vous can be singular, so be lenient
    }
    return [simple(v, tense)[i]];
  }

  const vowel = (s) => /^[aeiouyhéèêàâîôû]/i.test(s);
  function pronoun(tense, i, form) {
    if (tense === "subj") {
      if (i === 0) return vowel(form) ? "que j'" : "que je";
      if (i === 2) return "qu'il/elle";
      if (i === 5) return "qu'ils/elles";
      return "que " + PRON[i];
    }
    if (i === 0 && vowel(form)) return "j'";
    return PRON[i];
  }

  window.Conj = { PRON, TENSES, find, forms, accepted, pronoun };
})();
