// Grammar course — A2 lessons (more A2 topics live in grammar.js: pc-imp, cod-coi, negation, comparaison).
window.GRAMMAR_A2 = [
  {
    id: "quantites",
    title: "Les quantités",
    level: "A2",
    explain: `
      <p>After an expression of quantity, use <b>de / d'</b> + noun, <b>without article</b>:</p>
      <p><i>beaucoup <b>de</b> livres · un peu <b>d'</b>eau · trop <b>de</b> sucre · assez <b>de</b> temps · plus / moins <b>de</b> travail · combien <b>de</b> personnes ?</i><br>
      <i>un kilo <b>de</b> pommes · une bouteille <b>de</b> vin · un verre <b>d'</b>eau · une tranche <b>de</b> jambon · un paquet <b>de</b> pâtes</i></p>
      <p>Same after a negation: <i>Je n'ai pas <b>de</b> temps.</i></p>
      <p><b>Exceptions</b> that keep the article: <b>la plupart des</b> gens, <b>bien des</b> fois.</p>
      <p>No quantity word? Use the partitive or indefinite article: <i>Je mange <b>des</b> légumes. Je bois <b>du</b> lait.</i></p>`,
    questions: [
      { q: "Il y a beaucoup ___ monde.", c: ["de", "du", "des"], a: 0, why: "beaucoup + de (sans article)." },
      { q: "Je voudrais un kilo ___ tomates.", c: ["de", "des"], a: 0, why: "Quantité précise + de." },
      { q: "Tu as assez ___ argent ?", c: ["d'", "de l'"], a: 0, why: "assez + d' devant une voyelle." },
      { q: "Elle boit trop ___ café.", c: ["de", "du"], a: 0, why: "trop + de." },
      { q: "La plupart ___ étudiants sont présents.", c: ["des", "de"], a: 0, why: "Exception : la plupart des." },
      { q: "Je n'ai pas ___ temps.", c: ["de", "du"], a: 0, why: "Négation → de." },
      { q: "Il mange ___ légumes tous les jours.", c: ["des", "de"], a: 0, why: "Pas d'expression de quantité → article indéfini des." },
      { q: "Un peu ___ lait ?", c: ["de", "du"], a: 0, why: "un peu + de." },
      { q: "Combien ___ frères as-tu ?", c: ["de", "des"], a: 0, why: "combien + de." },
    ],
  },
  {
    id: "toniques",
    title: "Les pronoms toniques (moi, toi, lui…)",
    level: "A2",
    explain: `
      <table>
        <tr><td>je → <b>moi</b></td><td>tu → <b>toi</b></td><td>il → <b>lui</b></td><td>elle → <b>elle</b></td></tr>
        <tr><td>nous → <b>nous</b></td><td>vous → <b>vous</b></td><td>ils → <b>eux</b></td><td>elles → <b>elles</b></td></tr>
      </table>
      <p>Use them:</p>
      <p>• after a <b>preposition</b>: <i>avec moi, pour elle, chez eux, sans toi</i><br>
      • for <b>emphasis</b>: <i><b>Moi</b>, je préfère le thé.</i><br>
      • after <b>c'est</b>: <i>C'est <b>lui</b> !</i><br>
      • in <b>comparisons</b>: <i>plus grand que <b>toi</b></i><br>
      • in <b>short answers</b>: <i>Moi aussi. Moi non plus. Et toi ?</i></p>
      <p><b>aussi</b> agrees with a positive sentence, <b>non plus</b> with a negative one: <i>Je n'aime pas ça. — Moi <b>non plus</b>.</i></p>`,
    questions: [
      { q: "Tu viens avec ___ ?", c: ["moi", "me", "je"], a: 0, why: "Après une préposition → pronom tonique." },
      { q: "___, je préfère le thé.", c: ["Moi", "Je", "Me"], a: 0, why: "Mise en relief → moi." },
      { q: "C'est ___ qui a gagné ? — Oui, c'est Paul.", c: ["lui", "il", "le"], a: 0, why: "c'est + pronom tonique." },
      { q: "Elle est plus grande qu'___ (ils).", c: ["eux", "ils", "leur"], a: 0, why: "ils → eux." },
      { q: "J'adore le jazz. — ___ aussi !", c: ["Moi", "Je", "Me"], a: 0, why: "Réponse courte → moi aussi." },
      { q: "Je n'aime pas les épinards. — Moi ___ !", c: ["non plus", "aussi", "pas"], a: 0, why: "Accord avec une phrase négative → non plus." },
      { q: "Ce cadeau est pour ___ (elle).", c: ["elle", "la", "lui"], a: 0, why: "pour + pronom tonique féminin → elle." },
      { q: "On dîne chez ___ (nous) ce soir ?", t: ["nous"], why: "chez + pronom tonique." },
    ],
  },
  {
    id: "futur-proche",
    title: "Futur proche et passé récent",
    level: "A2",
    explain: `
      <p><b>Futur proche</b> = <b>aller</b> (présent) + infinitif → "going to": <i>Je <b>vais partir</b>. Il <b>va pleuvoir</b>.</i></p>
      <p><b>Passé récent</b> = <b>venir de</b> (présent) + infinitif → "have just": <i>Je <b>viens de manger</b>. Elle <b>vient d'arriver</b>.</i></p>
      <p><b>Negation</b> goes around the conjugated verb: <i>Je <b>ne</b> vais <b>pas</b> sortir.</i><br>
      <b>Pronouns</b> go before the infinitive: <i>Je vais <b>le</b> faire. Je viens de <b>lui</b> parler.</i></p>`,
    questions: [
      { q: "Attention, tu ___ tomber !", c: ["vas", "viens de"], a: 0, why: "Action imminente → futur proche." },
      { q: "Je ___ manger, je n'ai plus faim.", c: ["viens de", "vais"], a: 0, why: "Action qui vient de se terminer → passé récent." },
      { q: "Demain, nous ___ visiter le musée.", c: ["allons", "venons de"], a: 0, why: "Demain → futur proche." },
      { q: "Elles ___ arriver : elles sont encore dans le train. (futur proche)", t: ["vont"], why: "aller : elles vont." },
      { q: "Il ___ partir, tu l'as manqué de peu. (passé récent)", t: ["vient de"], why: "venir de : il vient de." },
      { q: "Quelle phrase est correcte ?", c: ["Je ne vais pas sortir.", "Je ne vais sortir pas.", "Je vais pas ne sortir."], a: 0, why: "ne … pas autour du verbe conjugué (aller)." },
      { q: "Tu vas appeler Marie ? — Oui, je vais ___.", c: ["l'appeler", "la appeler", "appeler la"], a: 0, why: "Pronom devant l'infinitif, élidé devant la voyelle." },
      { q: "Nous ___ de rentrer de vacances.", c: ["venons", "allons"], a: 0, why: "venir de → nous venons de." },
    ],
  },
  {
    id: "pc-formation",
    title: "Le passé composé : formation",
    level: "A2",
    explain: `
      <p><b>avoir / être</b> (présent) + <b>participe passé</b>: <i>J'<b>ai mangé</b>. Elle <b>est partie</b>.</i></p>
      <p><b>Regular participles</b>: -er → <b>é</b> (parlé) · -ir → <b>i</b> (fini) · -re → <b>u</b> (vendu).</p>
      <p><b>Irregular</b>: être → été · avoir → eu · faire → fait · prendre → pris · mettre → mis · dire → dit · écrire → écrit · voir → vu · lire → lu · boire → bu · pouvoir → pu · vouloir → voulu · devoir → dû · savoir → su · venir → venu · ouvrir → ouvert · naître → né · mourir → mort · vivre → vécu · connaître → connu · recevoir → reçu · croire → cru.</p>
      <p><b>With être</b> (movement / change of state — "DR & MRS VANDERTRAMP"): devenir, revenir, monter, rester, sortir, venir, aller, naître, descendre, entrer, rentrer, tomber, retourner, arriver, mourir, partir — <b>and all reflexive verbs</b>. The participle <b>agrees</b> with the subject: <i>Elles sont arrivé<b>es</b>.</i></p>
      <p>Monter, descendre, sortir, rentrer, passer + a direct object → <b>avoir</b>: <i>J'<b>ai</b> sorti la poubelle.</i></p>
      <p><b>Negation</b> around the auxiliary: <i>Je <b>n'</b>ai <b>pas</b> compris.</i></p>`,
    questions: [
      { q: "Hier, j'___ (manger) une pizza.", t: ["ai mangé"], why: "avoir + mangé." },
      { q: "Elle ___ (aller) à Rome.", t: ["est allée"], why: "aller → être + accord (allée)." },
      { q: "Nous ___ (prendre) le train.", t: ["avons pris"], why: "prendre → pris." },
      { q: "Ils ___ (venir) avec nous.", t: ["sont venus"], why: "venir → être + accord (venus)." },
      { q: "Tu ___ (voir) ce film ?", t: ["as vu"], why: "voir → vu." },
      { q: "J'___ (faire) mes devoirs.", t: ["ai fait"], why: "faire → fait." },
      { q: "Elles ___ (naître) en 2000.", t: ["sont nées"], why: "naître → être + né + es." },
      { q: "Vous ___ (boire) du vin ?", t: ["avez bu"], why: "boire → bu." },
      { q: "Il ___ (mettre) son manteau.", t: ["a mis"], why: "mettre → mis." },
      { q: "Je ___ sorti la poubelle.", c: ["ai", "suis"], a: 0, why: "sortir + COD (la poubelle) → avoir." },
      { q: "Quelle phrase est correcte ?", c: ["Je n'ai pas compris.", "Je n'ai compris pas.", "Je ne pas ai compris."], a: 0, why: "ne … pas autour de l'auxiliaire." },
    ],
  },
  {
    id: "imparfait",
    title: "L'imparfait : formation",
    level: "A2",
    explain: `
      <p>Take the <b>nous</b> form of the présent, remove <b>-ons</b>, add: <b>-ais, -ais, -ait, -ions, -iez, -aient</b>.</p>
      <table>
        <tr><td>parler → nous parl<s>ons</s></td><td>je parl<b>ais</b></td></tr>
        <tr><td>finir → nous finiss<s>ons</s></td><td>je finiss<b>ais</b></td></tr>
        <tr><td>faire → nous fais<s>ons</s></td><td>je fais<b>ais</b></td></tr>
        <tr><td>prendre → nous pren<s>ons</s></td><td>je pren<b>ais</b></td></tr>
      </table>
      <p>Only one exception: <b>être → ét-</b> (j'étais, nous étions).<br>
      Spelling: je mang<b>e</b>ais / nous mangions · je commen<b>ç</b>ais / nous commencions.</p>
      <p><b>Use</b>: descriptions, background, habits and actions in progress in the past (see <a href="#/grammaire/pc-imp">Passé composé ou imparfait ?</a>). Also suggestions: <i>Si on <b>allait</b> au cinéma ?</i></p>`,
    questions: [
      { q: "Quand j'étais petit, je ___ (jouer) au foot.", t: ["jouais"], why: "jou- + ais." },
      { q: "Nous ___ (habiter) à Lyon.", t: ["habitions"], why: "habit- + ions." },
      { q: "Il ___ (faire) froid.", t: ["faisait"], why: "nous faisons → fais- + ait." },
      { q: "Vous ___ (être) fatigués.", t: ["étiez"], why: "être → ét- + iez." },
      { q: "Ils ___ (avoir) un chien.", t: ["avaient"], why: "nous avons → av- + aient." },
      { q: "Je ___ (manger) beaucoup de bonbons.", t: ["mangeais"], why: "On garde le e : mangeais." },
      { q: "Tu ___ (finir) tard ?", t: ["finissais"], why: "nous finissons → finiss- + ais." },
      { q: "Elle ___ (prendre) le bus tous les jours.", t: ["prenait"], why: "nous prenons → pren- + ait." },
      { q: "Nous ___ (commencer) à 8 heures.", t: ["commencions"], why: "Devant i, pas de ç : commencions." },
      { q: "Si on ___ au restaurant ce soir ?", c: ["allait", "va", "irait"], a: 0, why: "Suggestion : si + imparfait." },
    ],
  },
  {
    id: "pronominaux",
    title: "Les verbes pronominaux",
    level: "A2",
    explain: `
      <p>The pronoun matches the subject: je <b>me</b> lève, tu <b>te</b> lèves, il <b>se</b> lève, nous <b>nous</b> levons, vous <b>vous</b> levez, ils <b>se</b> lèvent. Before a vowel: m', t', s'.</p>
      <p><b>Routine</b>: se réveiller, se lever, se laver, s'habiller, se coucher. <b>Reciprocal</b>: <i>Ils s'aiment. On se téléphone.</i> <b>Idiomatic</b>: s'appeler, se souvenir de, se rendre compte, s'amuser, s'ennuyer, se dépêcher.</p>
      <p><b>Negation</b>: <i>Je <b>ne me</b> lève <b>pas</b>.</i><br>
      <b>Passé composé</b>: always <b>être</b>: <i>Elle <b>s'est</b> levé<b>e</b>.</i><br>
      <b>With an infinitive</b>, the pronoun still matches the subject: <i>Je vais <b>me</b> coucher. Tu dois <b>te</b> reposer.</i><br>
      <b>Imperative</b>: <i>Lève-<b>toi</b> ! Dépêchons-<b>nous</b> !</i> — negative: <i>Ne <b>te</b> lève pas !</i></p>`,
    questions: [
      { q: "Je ___ lève à 7 heures.", c: ["me", "se", "te"], a: 0, why: "je → me." },
      { q: "Nous ___ promenons au parc.", c: ["nous", "se"], a: 0, why: "nous → nous." },
      { q: "Comment tu ___ appelles ?", c: ["t'", "s'", "m'"], a: 0, why: "tu → te → t' devant une voyelle." },
      { q: "Hier, elle ___ couchée tard.", c: ["s'est", "s'a", "a"], a: 0, why: "Pronominal → être au passé composé." },
      { q: "Ils ___ (se marier) l'année dernière.", t: ["se sont mariés"], why: "se + être + participe accordé." },
      { q: "Je vais ___ coucher.", c: ["me", "se"], a: 0, why: "Le pronom correspond au sujet (je → me)." },
      { q: "___ ! Tu vas être en retard.", c: ["Dépêche-toi", "Te dépêche", "Dépêche-te"], a: 0, why: "Impératif affirmatif : verbe-toi." },
      { q: "Je ne ___ souviens pas.", c: ["me", "se"], a: 0, why: "je → me." },
      { q: "Nous ___ sommes rencontrés à Paris.", c: ["nous", "se"], a: 0, why: "nous → nous." },
      { q: "Ne ___ inquiète pas !", c: ["t'", "toi", "s'"], a: 0, why: "Impératif négatif : le pronom reste avant (te → t')." },
    ],
  },
  {
    id: "imperatif",
    title: "L'impératif",
    level: "A2",
    explain: `
      <p>Use the <b>tu, nous, vous</b> forms of the présent, without the subject: <i>Finis ! Partons ! Venez !</i></p>
      <p><b>-er verbs</b> (and aller) drop the <b>-s</b> with tu: <i>Parle ! Mange ! Va !</i> — but keep it before <i>y / en</i>: <i>Va<b>s</b>-y ! Mange<b>s</b>-en !</i></p>
      <p><b>Irregular</b>: être → sois, soyons, soyez · avoir → aie, ayons, ayez · savoir → sache, sachons, sachez · vouloir → veuillez (very polite).</p>
      <p><b>Pronouns</b>: affirmative → <b>after</b> the verb with hyphens, me/te → <b>moi/toi</b>: <i>Regarde-<b>moi</b>. Donne-<b>le-moi</b>.</i> Negative → <b>before</b>, normal order: <i>Ne <b>me</b> regarde pas. Ne <b>me le</b> donne pas.</i></p>`,
    questions: [
      { q: "___ ! (regarder, tu)", t: ["regarde"], why: "-er : pas de s à l'impératif avec tu." },
      { q: "___ la porte, s'il te plaît. (fermer, tu)", t: ["ferme"], why: "-er : ferme." },
      { q: "___ sages, les enfants ! (être, vous)", t: ["soyez"], why: "être → soyez." },
      { q: "___ au cinéma ce soir ! (aller, nous)", t: ["allons"], why: "nous allons → allons !" },
      { q: "N'___ pas peur ! (avoir, tu)", t: ["aie"], why: "avoir → aie." },
      { q: "___ patient ! (être, tu)", t: ["sois"], why: "être → sois." },
      { q: "Tu veux du gâteau ? ___ !", c: ["Prends-en", "Prend-en", "En prends"], a: 0, why: "prendre (tu) → prends ; pronom après le verbe." },
      { q: "___ ! (aller + y, tu)", c: ["Vas-y", "Va-y", "Y va"], a: 0, why: "On garde le s devant y : vas-y." },
      { q: "Ce livre ? ___ !", c: ["Donne-le-moi", "Donne-moi-le", "Me le donne"], a: 0, why: "Impératif affirmatif : COD avant moi." },
      { q: "Ne ___ pas !", c: ["t'inquiète", "inquiète-toi"], a: 0, why: "Impératif négatif : pronom avant le verbe." },
    ],
  },
  {
    id: "temps",
    title: "Exprimer le temps : depuis, il y a, pendant, dans, en",
    level: "A2",
    explain: `
      <table>
        <tr><td><b>il y a</b> + durée</td><td>ago (finished)</td><td><i>Je suis arrivé <b>il y a</b> deux ans.</i></td></tr>
        <tr><td><b>depuis</b></td><td>since / for (still true)</td><td><i>J'habite ici <b>depuis</b> deux ans / depuis 2024.</i></td></tr>
        <tr><td><b>pendant</b></td><td>during / for (a closed period)</td><td><i>J'ai dormi <b>pendant</b> huit heures.</i></td></tr>
        <tr><td><b>dans</b> + durée</td><td>in (future)</td><td><i>Je pars <b>dans</b> dix minutes.</i></td></tr>
        <tr><td><b>en</b> + durée</td><td>in (time taken)</td><td><i>J'ai fini <b>en</b> une heure.</i></td></tr>
      </table>
      <p><b>depuis</b> + présent is a classic English-speaker trap: <i>I have lived here for 2 years</i> = <i>J'<b>habite</b> ici depuis 2 ans</i> (présent!).</p>
      <p><b>Dates</b>: <b>en</b> mai, <b>en</b> 2020, <b>en</b> été / automne / hiver — but <b>au</b> printemps. <b>Le</b> lundi = every Monday; lundi = this Monday.</p>`,
    questions: [
      { q: "J'apprends le français ___ trois ans.", c: ["depuis", "il y a", "dans"], a: 0, why: "Action qui continue → depuis + présent." },
      { q: "Je suis arrivé à Paris ___ trois ans.", c: ["il y a", "depuis", "dans"], a: 0, why: "Moment passé → il y a." },
      { q: "Le train part ___ dix minutes.", c: ["dans", "il y a", "en"], a: 0, why: "Futur → dans." },
      { q: "Il a plu ___ toute la journée.", c: ["pendant", "depuis", "dans"], a: 0, why: "Durée fermée dans le passé → pendant." },
      { q: "J'ai lu ce livre ___ deux jours (il m'a fallu deux jours).", c: ["en", "dans", "depuis"], a: 0, why: "Temps nécessaire → en." },
      { q: "Mon anniversaire est ___ juillet.", c: ["en", "au", "dans"], a: 0, why: "en + mois." },
      { q: "Nous partons ___ printemps.", c: ["au", "en"], a: 0, why: "Exception : au printemps." },
      { q: "Elle travaille ici ___ 2019.", c: ["depuis", "il y a", "pendant"], a: 0, why: "Point de départ, situation actuelle → depuis." },
    ],
  },
];
