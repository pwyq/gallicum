// Grammar course — B1 lessons (more B1 topics live in grammar.js: y-en, relatifs, subjonctif, accord-pp, si-futur, connecteurs).
window.GRAMMAR_B1 = [
  {
    id: "doubles-pronoms",
    title: "Les doubles pronoms (je le lui donne)",
    level: "B1",
    explain: `
      <p>When a verb has two object pronouns, they follow this order, before the verb:</p>
      <table>
        <tr><td><b>me, te, se, nous, vous</b></td><td>→</td><td><b>le, la, les</b></td><td>→</td><td><b>lui, leur</b></td><td>→</td><td><b>y</b></td><td>→</td><td><b>en</b></td></tr>
      </table>
      <p><i>Il <b>me le</b> donne. Je <b>le lui</b> donne. Je <b>les leur</b> envoie. Il <b>y en</b> a. Elle <b>m'en</b> parle.</i></p>
      <p>Passé composé: before the auxiliary, and the participle agrees with a preceding le/la/les: <i>Les photos ? Je <b>les leur</b> ai envoyé<b>es</b>.</i><br>
      With an infinitive: before the infinitive: <i>Je vais <b>te la</b> montrer.</i></p>
      <p><b>Imperative affirmative</b>: after the verb, COD first: <i>Donne-<b>le-moi</b> ! Envoie-<b>les-leur</b> !</i> Negative: normal order: <i>Ne <b>le lui</b> dis pas !</i></p>`,
    questions: [
      { q: "Tu me prêtes ton stylo ? — Oui, je ___ prête.", c: ["te le", "le te", "te lui"], a: 0, why: "te avant le." },
      { q: "Tu donnes le livre à Paul ? — Oui, je ___ donne.", c: ["le lui", "lui le", "le leur"], a: 0, why: "le avant lui." },
      { q: "Il y a du pain ? — Oui, il ___ a.", c: ["y en", "en y"], a: 0, why: "y avant en." },
      { q: "Tu as envoyé les photos à tes parents ? — Oui, je ___ ai envoyées.", c: ["les leur", "leur les", "les lui"], a: 0, why: "les avant leur ; « parents » pluriel → leur." },
      { q: "Elle t'a parlé de son projet ? — Oui, elle ___ a parlé.", c: ["m'en", "en m'", "me l'"], a: 0, why: "parler de → en ; me avant en." },
      { q: "Les clés ? Donne-___ !", c: ["les-moi", "moi-les", "me-les"], a: 0, why: "Impératif affirmatif : COD puis moi." },
      { q: "Tu peux me montrer la photo ? — Je vais ___ montrer.", c: ["te la", "la te"], a: 0, why: "te avant la, devant l'infinitif." },
      { q: "Ne ___ dis pas ! (le secret, à ta sœur)", c: ["le lui", "lui le"], a: 0, why: "Impératif négatif : ordre normal (le lui)." },
    ],
  },
  {
    id: "pqp-indirect",
    title: "Plus-que-parfait et discours indirect",
    level: "B1",
    explain: `
      <p><b>Plus-que-parfait</b> = avoir / être à l'<b>imparfait</b> + participe passé: <i>j'<b>avais fini</b>, elle <b>était partie</b></i>. It's the "past of the past": <i>Quand je suis arrivé, le film <b>avait</b> déjà <b>commencé</b>.</i></p>
      <p><b>Discours indirect</b> (reported speech): if the reporting verb is in the present (<i>il dit que</i>), keep the tenses. If it's in the past (<i>il a dit que</i>), shift them:</p>
      <table>
        <tr><th>discours direct</th><th>→ indirect (passé)</th></tr>
        <tr><td>présent « Je suis malade »</td><td>imparfait : qu'il <b>était</b> malade</td></tr>
        <tr><td>passé composé « J'ai fini »</td><td>plus-que-parfait : qu'il <b>avait fini</b></td></tr>
        <tr><td>futur « Je viendrai »</td><td>conditionnel : qu'il <b>viendrait</b></td></tr>
        <tr><td>impératif « Partez ! »</td><td><b>de</b> + infinitif : de partir</td></tr>
      </table>
      <p><b>Questions</b>: est-ce que / yes-no → <b>si</b> · qu'est-ce que → <b>ce que</b> · qu'est-ce qui → <b>ce qui</b> · où, quand, comment… stay.</p>
      <p><b>Time words</b>: aujourd'hui → ce jour-là · demain → <b>le lendemain</b> · hier → <b>la veille</b> · la semaine prochaine → la semaine suivante.</p>`,
    questions: [
      { q: "Quand je suis arrivé, le film ___ déjà commencé.", c: ["avait", "a", "était"], a: 0, why: "Action antérieure à une autre action passée → plus-que-parfait." },
      { q: "Elle était fatiguée parce qu'elle ___ mal dormi.", c: ["avait", "a", "aurait"], a: 0, why: "Cause antérieure → plus-que-parfait." },
      { q: "Nous ___ (finir) avant midi. (plus-que-parfait)", t: ["avions fini"], why: "avoir à l'imparfait + fini." },
      { q: "Il a dit : « Je suis malade. » → Il a dit qu'il ___ malade.", c: ["était", "est", "sera"], a: 0, why: "présent → imparfait." },
      { q: "Elle m'a dit : « J'ai perdu mes clés. » → Elle m'a dit qu'elle ___ ses clés.", c: ["avait perdu", "a perdu", "perdait"], a: 0, why: "passé composé → plus-que-parfait." },
      { q: "Il a dit : « Je viendrai. » → Il a dit qu'il ___.", c: ["viendrait", "viendra", "venait"], a: 0, why: "futur → conditionnel." },
      { q: "Elle me demande : « Est-ce que tu viens ? » → Elle me demande ___ je viens.", c: ["si", "que", "ce que"], a: 0, why: "Question oui/non → si." },
      { q: "Il m'a demandé : « Qu'est-ce que tu fais ? » → Il m'a demandé ___ je faisais.", c: ["ce que", "qu'est-ce que", "que"], a: 0, why: "qu'est-ce que → ce que." },
      { q: "Le prof nous dit : « Fermez vos livres ! » → Le prof nous dit ___ fermer nos livres.", c: ["de", "que", "à"], a: 0, why: "impératif → de + infinitif." },
      { q: "Il a dit : « Je partirai demain. » → Il a dit qu'il partirait ___.", c: ["le lendemain", "demain", "la veille"], a: 0, why: "demain → le lendemain." },
    ],
  },
  {
    id: "passif",
    title: "La voix passive",
    level: "B1",
    explain: `
      <p><b>être</b> (in the tense of the active verb) + <b>participe passé</b> (agrees with the subject) + <b>par</b> + agent.</p>
      <table>
        <tr><td>Le chat <b>mange</b> la souris.</td><td>La souris <b>est mangée</b> par le chat.</td></tr>
        <tr><td>Le chat <b>a mangé</b> la souris.</td><td>La souris <b>a été mangée</b> par le chat.</td></tr>
        <tr><td>Le chat <b>mangera</b> la souris.</td><td>La souris <b>sera mangée</b> par le chat.</td></tr>
      </table>
      <p><b>de</b> instead of par with feelings and states: <i>Il est aimé <b>de</b> tous. La table est couverte <b>de</b> livres.</i></p>
      <p>French uses the passive less than English. Often <b>on</b> is more natural: <i>On m'a volé mon vélo</i> (My bike was stolen).</p>`,
    questions: [
      { q: "La souris est mangée ___ le chat.", c: ["par", "de", "à"], a: 0, why: "Agent d'une action → par." },
      { q: "Ce professeur est aimé ___ tous ses élèves.", c: ["de", "à"], a: 0, why: "Sentiment → de (par est aussi possible)." },
      { q: "Le pont ___ construit en 1900.", c: ["a été", "est été", "était été"], a: 0, why: "Passé composé passif : a été + participe." },
      { q: "La lettre sera ___ demain.", c: ["envoyée", "envoyé", "envoyer"], a: 0, why: "Accord avec « la lettre »." },
      { q: "Actif → passif : « Le chef prépare le repas. »", c: ["Le repas est préparé par le chef.", "Le repas a préparé le chef.", "Le repas est préparer par le chef."], a: 0, why: "être au présent + participe passé." },
      { q: "Ma voiture a été ___ (voler).", t: ["volée"], why: "Accord avec « ma voiture » (féminin)." },
      { q: "Les résultats ___ publiés la semaine prochaine.", c: ["seront", "sont", "étaient"], a: 0, why: "Futur → seront." },
      { q: "Phrase équivalente avec « on » : « Le musée est fermé le lundi. »", c: ["On ferme le musée le lundi.", "On est fermé le musée le lundi.", "On a fermé par le musée le lundi."], a: 0, why: "on + verbe actif." },
    ],
  },
  {
    id: "gerondif",
    title: "Le gérondif et le participe présent",
    level: "B1",
    explain: `
      <p><b>Participe présent</b>: nous form of the présent − <b>ons</b> + <b>ant</b>: parlons → parl<b>ant</b>, finissons → finiss<b>ant</b>, faisons → fais<b>ant</b>. Irregular: <b>étant</b>, <b>ayant</b>, <b>sachant</b>.</p>
      <p><b>Gérondif</b> = <b>en</b> + participe présent. The subject is the same as the main verb. It expresses:</p>
      <p>• <b>simultaneity</b>: <i>Je chante <b>en cuisinant</b>.</i><br>
      • <b>manner / means</b>: <i>J'ai appris le français <b>en regardant</b> des séries.</i><br>
      • <b>condition</b>: <i><b>En partant</b> maintenant, tu arriveras à l'heure.</i><br>
      • <b>tout en</b> = contrast: <i><b>Tout en</b> étant fatigué, il a fini.</i></p>
      <p>The <b>participe présent</b> alone (mostly written) replaces <i>qui</i> + verb or gives a cause: <i>Les personnes <b>ayant</b> un billet… <b>Étant</b> malade, il est resté chez lui.</i></p>`,
    questions: [
      { q: "Il écoute de la musique ___ (travailler).", t: ["en travaillant"], why: "en + participe présent." },
      { q: "J'ai appris le français ___ (regarder) des films.", t: ["en regardant"], why: "Moyen → gérondif." },
      { q: "Ne parle pas ___ (manger) !", t: ["en mangeant"], why: "mangeons → mangeant." },
      { q: "Participe présent de « savoir » :", c: ["sachant", "savant", "savoyant"], a: 0, why: "Irrégulier : sachant." },
      { q: "Participe présent de « faire » :", c: ["faisant", "fasant", "faitant"], a: 0, why: "nous faisons → faisant." },
      { q: "___ malade, il est resté à la maison.", c: ["Étant", "En étant", "Été"], a: 0, why: "Cause → participe présent seul." },
      { q: "Je l'ai rencontré ___ sortant du métro.", c: ["en", "à", "par"], a: 0, why: "Gérondif : en + participe présent." },
      { q: "___ en étant fatigué, il a fini son travail.", c: ["Tout", "Même", "Bien"], a: 0, why: "tout en = opposition." },
    ],
  },
  {
    id: "pronoms-poss-dem",
    title: "Pronoms possessifs et démonstratifs",
    level: "B1",
    explain: `
      <table>
        <tr><th></th><th>masc. sing.</th><th>fém. sing.</th><th>masc. pl.</th><th>fém. pl.</th></tr>
        <tr><td>à moi</td><td>le mien</td><td>la mienne</td><td>les miens</td><td>les miennes</td></tr>
        <tr><td>à toi</td><td>le tien</td><td>la tienne</td><td>les tiens</td><td>les tiennes</td></tr>
        <tr><td>à lui / elle</td><td>le sien</td><td>la sienne</td><td>les siens</td><td>les siennes</td></tr>
        <tr><td>à nous</td><td>le nôtre</td><td>la nôtre</td><td colspan="2">les nôtres</td></tr>
        <tr><td>à vous</td><td>le vôtre</td><td>la vôtre</td><td colspan="2">les vôtres</td></tr>
        <tr><td>à eux / elles</td><td>le leur</td><td>la leur</td><td colspan="2">les leurs</td></tr>
      </table>
      <p>They agree with the <b>thing</b>: <i>Ta voiture est rouge, <b>la mienne</b> est bleue.</i></p>
      <p><b>Démonstratifs</b>: <b>celui</b> (m.), <b>celle</b> (f.), <b>ceux</b> (m. pl.), <b>celles</b> (f. pl.). Never alone — followed by <b>-ci / -là</b>, <b>qui / que / dont</b> or <b>de</b>: <i>Je préfère <b>celui-ci</b>. <b>Celle que</b> tu portais. <b>Ceux de</b> Paul.</i></p>`,
    questions: [
      { q: "Ce n'est pas ton stylo, c'est ___. (à moi)", c: ["le mien", "la mienne", "mon"], a: 0, why: "« stylo » masculin → le mien." },
      { q: "Ta voiture est rouge ; ___ est bleue. (à moi)", c: ["la mienne", "le mien", "ma"], a: 0, why: "« voiture » féminin → la mienne." },
      { q: "Mes parents habitent à Lyon. Et ___ ? (à toi)", c: ["les tiens", "tes", "le tien"], a: 0, why: "« parents » masculin pluriel → les tiens." },
      { q: "Notre maison est petite, mais ___ est grande. (à eux)", c: ["la leur", "leurs", "la leurs"], a: 0, why: "Une maison → la leur." },
      { q: "Quel gâteau veux-tu ? — ___ au chocolat.", c: ["Celui", "Celle", "Ce"], a: 0, why: "« gâteau » masculin → celui." },
      { q: "Je préfère cette robe à ___ que tu portais hier.", c: ["celle", "celui", "cette"], a: 0, why: "« robe » féminin → celle." },
      { q: "Ces chaussures-ci ou ___ ?", c: ["celles-là", "ceux-là", "ces-là"], a: 0, why: "« chaussures » féminin pluriel → celles-là." },
      { q: "Ce sont les livres de Marie ? — Non, ce sont ___ de Paul.", c: ["ceux", "celles", "ces"], a: 0, why: "« livres » masculin pluriel → ceux." },
    ],
  },
];
