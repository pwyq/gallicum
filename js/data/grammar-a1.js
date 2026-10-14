// Grammar course — A1 lessons. Questions: multiple choice (c + a) or typed (t = accepted answers).
window.GRAMMAR_A1 = [
  {
    id: "genre-articles",
    title: "Le genre et les articles",
    level: "A1",
    explain: `
      <p>Every French noun is <b>masculine</b> or <b>feminine</b>. Learn each noun <i>with</i> its article.</p>
      <table>
        <tr><th></th><th>masculin</th><th>féminin</th><th>pluriel</th></tr>
        <tr><td><b>défini</b> (the)</td><td>le / l'</td><td>la / l'</td><td>les</td></tr>
        <tr><td><b>indéfini</b> (a, some)</td><td>un</td><td>une</td><td>des</td></tr>
        <tr><td><b>partitif</b> (some, uncountable)</td><td>du / de l'</td><td>de la / de l'</td><td>des</td></tr>
      </table>
      <p><b>Défini</b>: something specific, or things in general after <i>aimer, adorer, préférer, détester</i>: <i>J'aime <b>le</b> café.</i><br>
      <b>Indéfini</b>: one countable thing: <i>Je mange <b>une</b> pomme.</i><br>
      <b>Partitif</b>: an amount of something uncountable: <i>Je bois <b>du</b> café, <b>de l'</b>eau.</i></p>
      <p><b>After a negation</b>, un / une / des / du / de la → <b>de (d')</b>: <i>Je n'ai pas <b>de</b> voiture.</i> Exception: after <i>être</i> → <i>Ce n'est pas <b>un</b> problème.</i></p>
      <p><b>Contractions</b>: à + le = <b>au</b>, à + les = <b>aux</b>, de + le = <b>du</b>, de + les = <b>des</b> (à la, à l', de la, de l' don't change).</p>
      <p><b>Gender hints</b>: ‑tion, ‑sion, ‑té, ‑ure, ‑ette, ‑ence are usually <b>feminine</b>; ‑ment, ‑age, ‑eau, ‑isme are usually <b>masculine</b>. Watch out: <i>la plage, la page, l'image (f.), l'eau (f.)</i>.</p>`,
    questions: [
      { q: "J'aime ___ chocolat.", c: ["le", "du", "un"], a: 0, why: "aimer / adorer / détester + article défini (sens général)." },
      { q: "Je voudrais ___ eau, s'il vous plaît.", c: ["de l'", "de la", "du"], a: 0, why: "Partitif devant une voyelle → de l'." },
      { q: "Il n'a pas ___ frères.", c: ["de", "des", "les"], a: 0, why: "Négation → de." },
      { q: "Nous allons ___ cinéma.", c: ["au", "à le", "du"], a: 0, why: "à + le = au." },
      { q: "C'est le livre ___ professeur.", c: ["du", "de le", "de la"], a: 0, why: "de + le = du." },
      { q: "Ce n'est pas ___ problème.", c: ["un", "de", "du"], a: 0, why: "Après « être », l'article ne change pas à la négation." },
      { q: "___ situation est compliquée.", c: ["La", "Le"], a: 0, why: "Les noms en -tion sont féminins." },
      { q: "Le matin, je mange ___ pain.", c: ["du", "le", "un"], a: 0, why: "Une quantité de pain (indéterminée) → partitif." },
      { q: "Je parle ___ enfants. (à + les)", t: ["aux"], why: "à + les = aux." },
      { q: "Je reviens ___ marché. (de + le)", t: ["du"], why: "de + le = du." },
    ],
  },
  {
    id: "present-er",
    title: "Le présent : être, avoir et les verbes en -er",
    level: "A1",
    explain: `
      <p><b>Pronoms sujets</b>: je (j'), tu, il / elle / on, nous, vous, ils / elles. <i>On</i> = "we" in everyday speech, conjugated like <i>il</i>: <i>On <b>va</b> au cinéma ?</i></p>
      <table>
        <tr><th>être</th><th>avoir</th><th>parler (-er)</th></tr>
        <tr><td>je suis</td><td>j'ai</td><td>je parl<b>e</b></td></tr>
        <tr><td>tu es</td><td>tu as</td><td>tu parl<b>es</b></td></tr>
        <tr><td>il est</td><td>il a</td><td>il parl<b>e</b></td></tr>
        <tr><td>nous sommes</td><td>nous avons</td><td>nous parl<b>ons</b></td></tr>
        <tr><td>vous êtes</td><td>vous avez</td><td>vous parl<b>ez</b></td></tr>
        <tr><td>ils sont</td><td>ils ont</td><td>ils parl<b>ent</b></td></tr>
      </table>
      <p>The endings -e, -es, -ent are <b>silent</b>: <i>je parle, tu parles, ils parlent</i> sound the same.</p>
      <p><b>Spelling changes</b>: manger → nous mang<b>e</b>ons · commencer → nous commen<b>ç</b>ons · acheter → j'ach<b>è</b>te · appeler → j'appe<b>ll</b>e · préférer → je préf<b>è</b>re (but nous préférons).</p>
      <p>The présent is used for <b>now</b>, <b>habits</b>, the <b>near future</b> (<i>Je pars demain</i>) and with <b>depuis</b> for something still going on: <i>J'habite ici <b>depuis</b> trois ans</i> (I have lived here for three years).</p>`,
    questions: [
      { q: "Nous ___ (être) étudiants.", t: ["sommes"], why: "être : nous sommes." },
      { q: "Ils ___ (avoir) deux enfants.", t: ["ont"], why: "avoir : ils ont." },
      { q: "Tu ___ (parler) français ?", t: ["parles"], why: "-er : tu → -es." },
      { q: "Vous ___ (habiter) où ?", t: ["habitez"], why: "-er : vous → -ez." },
      { q: "Nous ___ (manger) à midi.", t: ["mangeons"], why: "manger : on garde le e devant -ons (mangeons)." },
      { q: "Elle ___ (acheter) du pain.", t: ["achète"], why: "acheter : e → è quand la terminaison est muette." },
      { q: "On ___ (regarder) un film ce soir ?", t: ["regarde"], why: "« on » se conjugue comme « il »." },
      { q: "Ils ___ (aimer) le sport.", t: ["aiment"], why: "-er : ils → -ent (muet)." },
      { q: "Nous ___ (commencer) à 9 heures.", t: ["commençons"], why: "commencer : c → ç devant o." },
      { q: "J'habite à Lyon ___ cinq ans.", c: ["depuis", "pendant", "il y a"], a: 0, why: "Action qui continue aujourd'hui → présent + depuis." },
    ],
  },
  {
    id: "present-irr",
    title: "Le présent : les verbes irréguliers essentiels",
    level: "A1",
    explain: `
      <table>
        <tr><th>aller</th><th>faire</th><th>venir</th><th>prendre</th></tr>
        <tr><td>je vais</td><td>je fais</td><td>je viens</td><td>je prends</td></tr>
        <tr><td>tu vas</td><td>tu fais</td><td>tu viens</td><td>tu prends</td></tr>
        <tr><td>il va</td><td>il fait</td><td>il vient</td><td>il prend</td></tr>
        <tr><td>nous allons</td><td>nous faisons</td><td>nous venons</td><td>nous prenons</td></tr>
        <tr><td>vous allez</td><td>vous <b>faites</b></td><td>vous venez</td><td>vous prenez</td></tr>
        <tr><td>ils vont</td><td>ils font</td><td>ils viennent</td><td>ils prennent</td></tr>
      </table>
      <table>
        <tr><th>pouvoir</th><th>vouloir</th><th>devoir</th><th>savoir</th></tr>
        <tr><td>je peux</td><td>je veux</td><td>je dois</td><td>je sais</td></tr>
        <tr><td>tu peux</td><td>tu veux</td><td>tu dois</td><td>tu sais</td></tr>
        <tr><td>il peut</td><td>il veut</td><td>il doit</td><td>il sait</td></tr>
        <tr><td>nous pouvons</td><td>nous voulons</td><td>nous devons</td><td>nous savons</td></tr>
        <tr><td>vous pouvez</td><td>vous voulez</td><td>vous devez</td><td>vous savez</td></tr>
        <tr><td>ils peuvent</td><td>ils veulent</td><td>ils doivent</td><td>ils savent</td></tr>
      </table>
      <p><b>pouvoir, vouloir, devoir, savoir + infinitif</b>: <i>Je <b>dois partir</b>. Tu <b>sais nager</b> ?</i></p>
      <p><b>Two kinds of -ir verbs</b>: <i>finir</i> → je finis, nous fin<b>iss</b>ons, ils fin<b>iss</b>ent (also choisir, réussir) · <i>partir</i> → je pars, nous partons, ils partent (also sortir, dormir).</p>
      <p>Only three verbs end in <b>-es</b> with vous: vous <b>êtes</b>, vous <b>faites</b>, vous <b>dites</b>. More verbs in <a href="#/conjugaison/tableaux">Conjugaison → Tableaux</a>.</p>`,
    questions: [
      { q: "Je ___ (aller) au travail en bus.", t: ["vais"], why: "aller : je vais." },
      { q: "Qu'est-ce que vous ___ (faire) ce week-end ?", t: ["faites"], why: "faire : vous faites (pas « faisez » !)." },
      { q: "Ils ___ (venir) de Montréal.", t: ["viennent"], why: "venir : ils viennent." },
      { q: "Nous ___ (prendre) le métro.", t: ["prenons"], why: "prendre : nous prenons (un seul n)." },
      { q: "Tu ___ (pouvoir) m'aider ?", t: ["peux"], why: "pouvoir : tu peux." },
      { q: "Elles ___ (vouloir) partir.", t: ["veulent"], why: "vouloir : elles veulent." },
      { q: "Je ___ (devoir) travailler demain.", t: ["dois"], why: "devoir : je dois." },
      { q: "Vous ___ (dire) la vérité ?", t: ["dites"], why: "dire : vous dites." },
      { q: "Ils ___ (finir) à 18 heures.", t: ["finissent"], why: "finir : ils finissent (-iss-)." },
      { q: "Elle ___ (partir) demain.", t: ["part"], why: "partir : elle part (pas de -iss-)." },
      { q: "Je ne ___ (savoir) pas.", t: ["sais"], why: "savoir : je sais." },
    ],
  },
  {
    id: "questions",
    title: "Poser des questions",
    level: "A1",
    explain: `
      <p><b>Three ways</b> to ask a yes/no question, from casual to formal:</p>
      <table>
        <tr><td>intonation</td><td><i>Tu viens ?</i></td><td>spoken, very common</td></tr>
        <tr><td>est-ce que</td><td><i>Est-ce que tu viens ?</i></td><td>neutral, always correct</td></tr>
        <tr><td>inversion</td><td><i>Viens-tu ?</i></td><td>formal / written</td></tr>
      </table>
      <p>Inversion with il/elle/on after a vowel: add <b>-t-</b> → <i>Parle-<b>t</b>-il anglais ? A-<b>t</b>-elle faim ?</i></p>
      <p><b>Question words</b>: qui (who), que / qu'est-ce que (what, object), qu'est-ce qui (what, subject), quoi (what, after a preposition or at the end: <i>Tu fais quoi ?</i>), où, quand, comment, pourquoi, combien (de).</p>
      <p><b>Quel</b> agrees with the noun: <i>quel jour, quelle heure, quels films, quelles villes</i>.</p>`,
    questions: [
      { q: "___ heure est-il ?", c: ["Quelle", "Quel", "Quelles"], a: 0, why: "« heure » est féminin singulier → quelle." },
      { q: "___ tu fais ce soir ?", c: ["Qu'est-ce que", "Qu'est-ce qui", "Quel"], a: 0, why: "« tu » est le sujet ; on demande l'objet → qu'est-ce que." },
      { q: "___ se passe ?", c: ["Qu'est-ce qui", "Qu'est-ce que", "Que"], a: 0, why: "Pas d'autre sujet → qu'est-ce qui." },
      { q: "___ coûte ce livre ?", c: ["Combien", "Comment", "Quand"], a: 0, why: "Prix → combien." },
      { q: "Tu habites ___ ?", c: ["où", "quand", "qui"], a: 0, why: "Lieu → où." },
      { q: "___ tu ne viens pas ? — Parce que je suis malade.", c: ["Pourquoi", "Comment", "Quand"], a: 0, why: "Réponse « parce que » → pourquoi." },
      { q: "Quelle question est correcte ?", c: ["Parle-t-il anglais ?", "Parle-il anglais ?", "Il parle-t-il anglais ?"], a: 0, why: "Inversion : verbe en voyelle + il → -t-." },
      { q: "___ sont tes films préférés ?", c: ["Quels", "Quelles", "Quel"], a: 0, why: "« films » : masculin pluriel → quels." },
      { q: "Avec ___ tu pars en vacances ?", c: ["qui", "que", "quoi"], a: 0, why: "Une personne après une préposition → qui." },
      { q: "Tu penses à ___ ?", c: ["quoi", "que", "qu'est-ce que"], a: 0, why: "Une chose après une préposition → quoi." },
    ],
  },
  {
    id: "adjectifs",
    title: "Les adjectifs : accord et place",
    level: "A1",
    explain: `
      <p>Adjectives agree in <b>gender</b> and <b>number</b>: <i>petit, petit<b>e</b>, petit<b>s</b>, petit<b>es</b></i>. Ending in -e already? No change: <i>rouge, rouge</i>.</p>
      <table>
        <tr><th>masculin</th><th>féminin</th><th>exemple</th></tr>
        <tr><td>-eux</td><td>-euse</td><td>heureux → heureuse</td></tr>
        <tr><td>-if</td><td>-ive</td><td>sportif → sportive</td></tr>
        <tr><td>-er</td><td>-ère</td><td>cher → chère</td></tr>
        <tr><td>-en / -on</td><td>-enne / -onne</td><td>italien → italienne, bon → bonne</td></tr>
        <tr><td>-el</td><td>-elle</td><td>naturel → naturelle</td></tr>
      </table>
      <p><b>Irregular</b>: beau → belle, nouveau → nouvelle, vieux → vieille, blanc → blanche, long → longue, gentil → gentille, frais → fraîche.<br>
      Before a masculine noun starting with a vowel: <b>bel</b> appartement, <b>nouvel</b> ami, <b>vieil</b> homme.</p>
      <p><b>Place</b>: most adjectives go <b>after</b> the noun (<i>un chat noir</i>). Short common ones go <b>before</b> — think <b>BAGS</b>: <b>B</b>eauty (beau, joli), <b>A</b>ge (jeune, vieux, nouveau), <b>G</b>oodness (bon, mauvais), <b>S</b>ize (grand, petit, gros).</p>
      <p>Written French: <b>des</b> + adjective + noun → <b>de</b>: <i>de beaux arbres</i>.</p>`,
    questions: [
      { q: "Elle est très ___ (sérieux).", t: ["sérieuse"], why: "-eux → -euse." },
      { q: "Une ___ (nouveau) voiture.", t: ["nouvelle"], why: "nouveau → nouvelle." },
      { q: "Un ___ (vieux) homme.", t: ["vieil"], why: "Devant un nom masculin qui commence par une voyelle ou un h muet : vieil." },
      { q: "Les fleurs sont ___ (blanc).", t: ["blanches"], why: "blanc → blanche → blanches." },
      { q: "Ma sœur est très ___ (actif).", t: ["active"], why: "-if → -ive." },
      { q: "Une étudiante ___ (canadien).", t: ["canadienne"], why: "-ien → -ienne." },
      { q: "Quelle phrase est correcte ?", c: ["un petit chat noir", "un chat petit noir", "un noir petit chat"], a: 0, why: "petit (taille) avant, noir (couleur) après." },
      { q: "Un ___ appartement.", c: ["bel", "beau", "belle"], a: 0, why: "beau → bel devant un nom masculin à voyelle." },
      { q: "Ce sont ___ beaux enfants.", c: ["de", "des"], a: 0, why: "des + adjectif placé avant le nom → de (à l'écrit)." },
      { q: "Des chemises ___ (gris).", t: ["grises"], why: "Féminin pluriel : gris → grises." },
    ],
  },
  {
    id: "possessifs",
    title: "Possessifs et démonstratifs",
    level: "A1",
    explain: `
      <table>
        <tr><th></th><th>masc.</th><th>fém.</th><th>pluriel</th></tr>
        <tr><td>je</td><td>mon</td><td>ma</td><td>mes</td></tr>
        <tr><td>tu</td><td>ton</td><td>ta</td><td>tes</td></tr>
        <tr><td>il / elle</td><td>son</td><td>sa</td><td>ses</td></tr>
        <tr><td>nous</td><td colspan="2">notre</td><td>nos</td></tr>
        <tr><td>vous</td><td colspan="2">votre</td><td>vos</td></tr>
        <tr><td>ils / elles</td><td colspan="2">leur</td><td>leurs</td></tr>
      </table>
      <p>The possessive agrees with the <b>thing owned</b>, not the owner: <i><b>sa</b> mère</i> = his OR her mother; <i><b>son</b> frère</i> = his OR her brother.</p>
      <p>Before a feminine noun starting with a vowel, ma/ta/sa → <b>mon/ton/son</b>: <i>mon amie, son école</i>.</p>
      <p><b>Démonstratifs</b> (this / that / these): <b>ce</b> livre, <b>cet</b> homme / <b>cet</b> ami (masc. + vowel or h), <b>cette</b> femme, <b>ces</b> livres. Add <b>-ci / -là</b> to contrast: <i>ce livre-ci, ce livre-là</i>.</p>`,
    questions: [
      { q: "C'est ___ amie Julie.", c: ["mon", "ma"], a: 0, why: "Nom féminin commençant par une voyelle → mon." },
      { q: "Paul aime ___ mère.", c: ["sa", "son"], a: 0, why: "« mère » est féminin → sa (même si Paul est un homme)." },
      { q: "Marie adore ___ frère.", c: ["son", "sa"], a: 0, why: "« frère » est masculin → son." },
      { q: "Ils visitent ___ grands-parents.", c: ["leurs", "leur", "ses"], a: 0, why: "Plusieurs possesseurs, objet pluriel → leurs." },
      { q: "Nous aimons ___ quartier.", c: ["notre", "nos"], a: 0, why: "Un seul quartier → notre." },
      { q: "Vous avez ___ passeports ?", c: ["vos", "votre"], a: 0, why: "Pluriel → vos." },
      { q: "___ hôtel est très cher.", c: ["Cet", "Ce", "Cette"], a: 0, why: "Masculin + h muet → cet." },
      { q: "___ année, je vais apprendre le piano.", c: ["Cette", "Cet", "Ce"], a: 0, why: "« année » est féminin → cette." },
      { q: "___ garçon est mon cousin.", c: ["Ce", "Cet"], a: 0, why: "Masculin + consonne → ce." },
      { q: "___ fleurs sont belles.", c: ["Ces", "Cettes", "Cet"], a: 0, why: "Pluriel → ces (« cettes » n'existe pas)." },
    ],
  },
  {
    id: "prepositions-lieu",
    title: "Prépositions de lieu : villes et pays",
    level: "A1",
    explain: `
      <table>
        <tr><th></th><th>to / in</th><th>from</th></tr>
        <tr><td>city</td><td><b>à</b> Paris</td><td><b>de</b> Paris</td></tr>
        <tr><td>feminine country (most end in -e)</td><td><b>en</b> France, en Chine</td><td><b>de</b> France, d'Italie</td></tr>
        <tr><td>masculine country</td><td><b>au</b> Canada, au Japon</td><td><b>du</b> Canada</td></tr>
        <tr><td>plural country</td><td><b>aux</b> États-Unis</td><td><b>des</b> États-Unis</td></tr>
      </table>
      <p>Masculine countries starting with a vowel use <b>en</b>: <i>en Iran, en Israël</i>. Exceptions ending in -e but masculine: <i>au Mexique, au Cambodge</i>. Continents: <i>en Europe, en Asie</i>.</p>
      <p><b>chez</b> + person: <i>chez moi, chez Paul, chez le médecin</i>.</p>
      <p><b>Position</b>: sur (on), sous (under), dans (in), devant (in front of), derrière (behind), entre (between), à côté <b>de</b> (next to), en face <b>de</b> (opposite), près <b>de</b> (near), loin <b>de</b> (far from) → remember the contractions: <i>à côté <b>du</b> parc</i>.</p>`,
    questions: [
      { q: "J'habite ___ Canada.", c: ["au", "en", "à"], a: 0, why: "Pays masculin → au." },
      { q: "Elle part ___ Italie.", c: ["en", "au", "à"], a: 0, why: "Pays féminin → en." },
      { q: "Nous sommes ___ Tokyo.", c: ["à", "en", "au"], a: 0, why: "Ville → à." },
      { q: "Ils voyagent ___ États-Unis.", c: ["aux", "au", "en"], a: 0, why: "Pays pluriel → aux." },
      { q: "Il habite ___ Mexique.", c: ["au", "en"], a: 0, why: "Exception : le Mexique est masculin → au." },
      { q: "Il vient ___ Japon.", c: ["du", "de", "des"], a: 0, why: "venir de + le Japon → du." },
      { q: "Elle revient ___ Espagne.", c: ["d'", "de la", "du"], a: 0, why: "Pays féminin → de / d'." },
      { q: "Je vais ___ médecin.", c: ["chez le", "au", "à le"], a: 0, why: "Chez une personne → chez." },
      { q: "La pharmacie est en face ___ la gare.", c: ["de", "à", "du"], a: 0, why: "en face de + la gare." },
      { q: "Le café est à côté ___ parc. (de + le)", t: ["du"], why: "à côté de + le parc → du." },
    ],
  },
];
