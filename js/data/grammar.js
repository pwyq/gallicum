// Grammar topics for B1. Each question: q (use ___ for the blank), c (choices), a (index of answer), why.
window.GRAMMAR = [
  {
    id: "pc-imp",
    title: "Passé composé ou imparfait ?",
    level: "A2",
    explain: `
      <p><b>Imparfait</b> → background, description, states, habits, actions in progress.<br>
      <i>Il faisait beau. Quand j'étais petit, je jouais au foot tous les jours.</i></p>
      <p><b>Passé composé</b> → completed events, a sequence of actions, an event that interrupts.<br>
      <i>Je suis arrivé, j'ai ouvert la porte et j'ai vu…</i></p>
      <p>Classic pairing: <i>Je <b>regardais</b> la télé quand le téléphone <b>a sonné</b>.</i><br>
      Trigger words: <i>soudain, tout à coup, un jour, hier</i> → PC · <i>souvent, d'habitude, chaque été, avant</i> → imparfait.</p>`,
    questions: [
      { q: "Quand j'étais enfant, nous ___ en vacances en Bretagne chaque été.", c: ["allions", "sommes allés", "irons"], a: 0, why: "« chaque été » = habitude dans le passé → imparfait." },
      { q: "Hier, j'___ mes clés dans le métro.", c: ["perdais", "ai perdu"], a: 1, why: "Événement unique et terminé → passé composé." },
      { q: "Il ___ beau et les oiseaux chantaient.", c: ["faisait", "a fait"], a: 0, why: "Description du décor → imparfait." },
      { q: "Je regardais la télé quand le téléphone ___.", c: ["sonnait", "a sonné"], a: 1, why: "Action qui interrompt une action en cours → passé composé." },
      { q: "Elle ___ trois ans à Berlin, puis elle est rentrée en France.", c: ["vivait", "a vécu"], a: 1, why: "Durée limitée et terminée (trois ans) → passé composé." },
      { q: "Avant, il ___ beaucoup, mais maintenant il ne fume plus.", c: ["fumait", "a fumé"], a: 0, why: "« Avant » + habitude passée → imparfait." },
      { q: "Soudain, quelqu'un ___ à la porte.", c: ["frappait", "a frappé"], a: 1, why: "« Soudain » introduit un événement ponctuel → passé composé." },
      { q: "Ce matin, nous ___ à 7 h, puis nous avons pris le petit-déjeuner.", c: ["nous levions", "nous sommes levés"], a: 1, why: "Succession d'actions (puis…) → passé composé." },
      { q: "Quand je suis arrivé à la fête, tout le monde ___.", c: ["dansait", "a dansé"], a: 0, why: "Action en cours au moment de mon arrivée → imparfait." },
      { q: "Ils ___ fatigués, alors ils sont rentrés tôt.", c: ["étaient", "ont été"], a: 0, why: "État / cause en arrière-plan → imparfait." },
    ],
  },
  {
    id: "cod-coi",
    title: "Pronoms COD et COI (le, la, lui, leur)",
    level: "A2",
    explain: `
      <p><b>COD</b> (verbe + quelqu'un/quelque chose, sans préposition) → <b>me, te, le, la, l', nous, vous, les</b>.<br>
      <b>COI</b> (verbe + <b>à</b> + personne) → <b>me, te, lui, nous, vous, leur</b>.</p>
      <p>Position: before the conjugated verb (<i>je le vois</i>), before the auxiliary in the passé composé (<i>je l'ai vu</i>), before the infinitive (<i>je vais le voir</i>).</p>
      <p>Watch out: <i>aider, attendre, écouter, regarder</i> take a COD; <i>téléphoner à, parler à, demander à, répondre à</i> take a COI.</p>`,
    questions: [
      { q: "Tu connais Marie ? — Oui, je ___ connais bien.", c: ["la", "lui", "le"], a: 0, why: "connaître quelqu'un → COD féminin → la." },
      { q: "Tu as téléphoné à tes parents ? — Oui, je ___ ai téléphoné hier.", c: ["les", "leur", "lui"], a: 1, why: "téléphoner à + personnes (pluriel) → leur." },
      { q: "Tu as vu ce film ? — Non, je ne ___ ai pas vu.", c: ["l'", "lui", "le"], a: 0, why: "voir quelque chose → COD ; devant une voyelle : l'." },
      { q: "J'écris à mon frère. → Je ___ écris.", c: ["le", "lui", "l'"], a: 1, why: "écrire à quelqu'un → COI singulier → lui." },
      { q: "Ces chaussures ? Je vais ___ acheter.", c: ["les", "leur", "lui"], a: 0, why: "acheter quelque chose → COD pluriel ; devant l'infinitif." },
      { q: "Tu parles à ta voisine ? — Oui, je ___ parle souvent.", c: ["la", "lui", "y"], a: 1, why: "parler à quelqu'un → COI → lui (masculin ET féminin)." },
      { q: "Il aide ses amis. → Il ___ aide.", c: ["leur", "les", "lui"], a: 1, why: "Piège ! aider quelqu'un (sans « à ») → COD → les." },
      { q: "Elle demande l'heure au serveur. → Elle ___ demande l'heure.", c: ["le", "lui", "leur"], a: 1, why: "demander quelque chose à quelqu'un → COI singulier → lui." },
      { q: "Tu attends le bus ? — Oui, je ___ attends.", c: ["l'", "lui", "y"], a: 0, why: "attendre quelque chose (sans préposition) → COD → l'." },
      { q: "Les fleurs, je ___ ai offertes à ma mère.", c: ["les", "leur", "en"], a: 0, why: "offrir quelque chose → COD les (et accord : offertes)." },
    ],
  },
  {
    id: "y-en",
    title: "Les pronoms y et en",
    level: "B1",
    explain: `
      <p><b>y</b> replaces <b>à + thing/idea</b> or a <b>place</b> (à, en, chez, dans…): <i>Je vais à Paris → J'y vais. Je pense à mon examen → J'y pense.</i></p>
      <p><b>en</b> replaces <b>de + thing</b>, a partitive (du, de la, des) or a quantity (keep the number): <i>Je veux du café → J'en veux. J'ai deux frères → J'en ai deux. Je reviens de Rome → J'en reviens.</i></p>
      <p>For <b>people</b> after <i>penser à / s'intéresser à</i> use <b>à + pronom tonique</b>: <i>Je pense à elle.</i> After <i>parler de</i>: <i>Je parle de lui.</i></p>`,
    questions: [
      { q: "Tu vas à la piscine ? — Oui, j'___ vais demain.", c: ["y", "en"], a: 0, why: "aller à + lieu → y." },
      { q: "Tu veux du café ? — Oui, j'___ veux bien.", c: ["y", "en"], a: 1, why: "Partitif (du café) → en." },
      { q: "Combien de frères as-tu ? — J'___ ai deux.", c: ["y", "en"], a: 1, why: "Quantité → en + le nombre." },
      { q: "Tu penses à ton examen ? — Oui, j'___ pense tout le temps.", c: ["y", "en", "lui"], a: 0, why: "penser à + chose → y." },
      { q: "Tu penses à ta sœur ? — Oui, je pense ___.", c: ["à elle", "y", "lui"], a: 0, why: "penser à + personne → à + pronom tonique (à elle)." },
      { q: "Il revient de Rome ? — Oui, il ___ revient.", c: ["y", "en"], a: 1, why: "venir/revenir de + lieu → en." },
      { q: "Vous avez besoin de ce livre ? — Non, je n'___ ai pas besoin.", c: ["y", "en"], a: 1, why: "avoir besoin de + chose → en." },
      { q: "Elle s'intéresse à la politique ? — Oui, elle s'___ intéresse beaucoup.", c: ["y", "en"], a: 0, why: "s'intéresser à + chose → y." },
      { q: "Il y a des œufs dans le frigo ? — Non, il n'y ___ a plus.", c: ["y", "en"], a: 1, why: "des œufs (quantité indéfinie) → en." },
      { q: "Tu as parlé de ton projet ? — Oui, j'___ ai parlé à mon chef.", c: ["y", "en"], a: 1, why: "parler de + chose → en." },
    ],
  },
  {
    id: "relatifs",
    title: "Pronoms relatifs : qui, que, dont, où",
    level: "B1",
    explain: `
      <p><b>qui</b> = subject of the relative clause: <i>La femme <b>qui</b> habite à côté…</i></p>
      <p><b>que</b> = direct object: <i>Le film <b>que</b> j'ai vu…</i> (the clause already has a subject)</p>
      <p><b>dont</b> replaces <b>de + …</b>: <i>parler de, avoir besoin de, être fier de, se souvenir de</i> → <i>le livre <b>dont</b> je parle</i>.</p>
      <p><b>où</b> = place <i>or time</i>: <i>la ville <b>où</b> je suis né, le jour <b>où</b> on s'est rencontrés</i>.</p>
      <p><b>ce qui / ce que</b> = "what": <i>Ce qui m'énerve… Ce que j'aime…</i></p>`,
    questions: [
      { q: "C'est le livre ___ je t'ai parlé.", c: ["que", "dont", "qui"], a: 1, why: "parler de quelque chose → dont." },
      { q: "La femme ___ habite à côté est médecin.", c: ["qui", "que", "dont"], a: 0, why: "« la femme » est sujet de « habite » → qui." },
      { q: "Le film ___ nous avons vu était génial.", c: ["qui", "que", "où"], a: 1, why: "COD de « avons vu » (sujet : nous) → que." },
      { q: "C'est la ville ___ je suis né.", c: ["où", "que", "dont"], a: 0, why: "Lieu → où." },
      { q: "Je me souviens du jour ___ nous nous sommes rencontrés.", c: ["où", "que", "quand"], a: 0, why: "Après un nom de temps (le jour, l'année…) → où." },
      { q: "Voici l'ami ___ je t'ai présenté hier.", c: ["qui", "que", "dont"], a: 1, why: "présenter quelqu'un → COD → que." },
      { q: "C'est un projet ___ je suis très fier.", c: ["que", "dont", "où"], a: 1, why: "être fier de → dont." },
      { q: "Le restaurant ___ est au coin de la rue est fermé.", c: ["qui", "que", "où"], a: 0, why: "Sujet de « est » → qui." },
      { q: "C'est l'outil ___ j'ai besoin.", c: ["que", "dont", "qui"], a: 1, why: "avoir besoin de → dont." },
      { q: "Ce ___ j'aime, c'est voyager.", c: ["que", "qui", "dont"], a: 0, why: "« j'aime » a déjà un sujet → ce que." },
      { q: "Ce ___ m'énerve, c'est le bruit.", c: ["qui", "que", "dont"], a: 0, why: "Sujet de « m'énerve » → ce qui." },
    ],
  },
  {
    id: "subjonctif",
    title: "Subjonctif ou indicatif ?",
    level: "B1",
    explain: `
      <p><b>Subjonctif</b> after: necessity (<i>il faut que</i>), wish/will (<i>vouloir que, aimer que</i>), emotion (<i>être content que, avoir peur que</i>), doubt/possibility (<i>douter que, il est possible que, ne pas penser que</i>), and conjunctions <i>bien que, pour que, avant que, à condition que</i>.</p>
      <p><b>Indicatif</b> after: certainty or opinion in the affirmative (<i>je pense que, je crois que, je suis sûr que, il est certain que</i>), <i>espérer que</i>, <i>après que</i>, <i>parce que</i>.</p>
      <p>Same subject in both parts? Use the infinitive: <i>Je veux partir</i> (not <i>que je parte</i>).</p>`,
    questions: [
      { q: "Il faut que tu ___ tes devoirs.", c: ["fais", "fasses", "feras"], a: 1, why: "il faut que + subjonctif." },
      { q: "Je pense qu'il ___ raison.", c: ["a", "ait"], a: 0, why: "penser que (affirmatif) = opinion certaine → indicatif." },
      { q: "Je ne pense pas qu'il ___ raison.", c: ["a", "ait"], a: 1, why: "penser à la forme négative = doute → subjonctif." },
      { q: "Je veux que vous ___ à l'heure.", c: ["êtes", "soyez", "serez"], a: 1, why: "vouloir que + subjonctif." },
      { q: "Je suis sûr qu'elle ___ demain.", c: ["viendra", "vienne"], a: 0, why: "être sûr que = certitude → indicatif." },
      { q: "Bien qu'il ___ malade, il est allé travailler.", c: ["était", "soit"], a: 1, why: "bien que + subjonctif, toujours." },
      { q: "Je suis content que tu ___ là.", c: ["es", "sois"], a: 1, why: "Sentiment (être content que) → subjonctif." },
      { q: "Après qu'il ___ parti, on a commencé à manger.", c: ["est", "soit"], a: 0, why: "Selon la norme, après que + indicatif (on entend souvent le subjonctif, mais c'est une faute)." },
      { q: "Avant que tu ___, je dois te dire quelque chose.", c: ["pars", "partes"], a: 1, why: "avant que + subjonctif." },
      { q: "J'espère que tu ___ bien.", c: ["vas", "ailles"], a: 0, why: "Piège ! espérer que + indicatif." },
      { q: "Il est possible qu'il ___ ce soir.", c: ["pleut", "pleuve"], a: 1, why: "Possibilité → subjonctif." },
    ],
  },
  {
    id: "accord-pp",
    title: "L'accord du participe passé",
    level: "B1",
    explain: `
      <p><b>With être</b> → agrees with the subject: <i>Elle est allé<b>e</b>. Ils sont arrivé<b>s</b>.</i></p>
      <p><b>With avoir</b> → no agreement with the subject, but agrees with a <b>COD placed before</b> the verb (<i>la, les, que…</i>): <i>Les photos ? Je les ai pri<b>ses</b>. La lettre que j'ai écri<b>te</b>.</i></p>
      <p><b>Reflexive verbs</b> agree with the reflexive pronoun when it is the COD: <i>Elles se sont levé<b>es</b></i>. But not when the COD comes after (<i>Elle s'est lavé les mains</i>) or when the pronoun is indirect (<i>Elles se sont parlé</i> — parler <b>à</b>).</p>`,
    questions: [
      { q: "Elle est ___ au cinéma.", c: ["allé", "allée", "allés"], a: 1, why: "Auxiliaire être → accord avec le sujet (féminin singulier)." },
      { q: "Marie et Julie se sont ___ tôt.", c: ["levé", "levées", "levés"], a: 1, why: "se lever : « se » est COD → accord féminin pluriel." },
      { q: "Elles ont ___ un gâteau.", c: ["mangé", "mangées"], a: 0, why: "Avoir + COD placé après → pas d'accord." },
      { q: "La lettre que j'ai ___ est sur la table.", c: ["écrit", "écrite"], a: 1, why: "COD « que » (= la lettre) placé avant → accord." },
      { q: "Les photos ? Je les ai ___.", c: ["pris", "prises"], a: 1, why: "COD « les » (= les photos) placé avant → accord féminin pluriel." },
      { q: "Ils sont ___ en retard.", c: ["arrivé", "arrivés"], a: 1, why: "Auxiliaire être → accord avec « ils »." },
      { q: "Elle s'est ___ les mains.", c: ["lavé", "lavée"], a: 0, why: "Le COD (les mains) est après le verbe → pas d'accord." },
      { q: "Quelles robes as-tu ___ ?", c: ["acheté", "achetées"], a: 1, why: "COD « quelles robes » placé avant → accord." },
      { q: "Ma sœur est ___ en 1995.", c: ["né", "née"], a: 1, why: "naître se conjugue avec être → accord." },
      { q: "Elles se sont ___ au téléphone.", c: ["parlé", "parlées"], a: 0, why: "parler à quelqu'un : « se » est COI → pas d'accord." },
    ],
  },
  {
    id: "si-futur",
    title: "Futur, conditionnel et phrases avec « si »",
    level: "B1",
    explain: `
      <p><b>Si + présent → futur</b> (real possibility): <i>S'il pleut, je resterai chez moi.</i></p>
      <p><b>Si + imparfait → conditionnel présent</b> (hypothesis): <i>Si j'avais le temps, je voyagerais.</i></p>
      <p><b>Si + plus-que-parfait → conditionnel passé</b> (regret about the past): <i>Si j'avais su, je serais venu.</i></p>
      <p>Never put the future or conditional right after <i>si</i>. But after <i>quand, dès que, lorsque</i> referring to the future → <b>futur</b>: <i>Quand je serai grand…</i></p>
      <p>The conditional also softens requests (<i>je voudrais</i>) and expresses reproach (<i>tu aurais dû</i>).</p>`,
    questions: [
      { q: "Si tu viens, on ___ au restaurant.", c: ["ira", "irait", "allait"], a: 0, why: "si + présent → futur." },
      { q: "Si j'avais de l'argent, je ___ le tour du monde.", c: ["ferai", "ferais", "fais"], a: 1, why: "si + imparfait → conditionnel." },
      { q: "S'il ___ demain, nous resterons à la maison.", c: ["pleut", "pleuvra", "pleuvrait"], a: 0, why: "Jamais de futur après « si » → présent." },
      { q: "Si nous ___ plus de temps, nous apprendrions le piano.", c: ["avons", "avions", "aurions"], a: 1, why: "conditionnel dans la principale → si + imparfait." },
      { q: "Quand je ___ grand, je serai pilote.", c: ["suis", "serai"], a: 1, why: "quand + action future → futur (différent de « si »)." },
      { q: "Demain, je ___ mes parents.", c: ["verrai", "verrais"], a: 0, why: "Action future certaine → futur (-ai)." },
      { q: "Je ___ un café, s'il vous plaît.", c: ["voudrais", "voudrai"], a: 0, why: "Politesse → conditionnel (-ais)." },
      { q: "Tu ___ dû me le dire !", c: ["aurais", "auras"], a: 0, why: "Reproche → conditionnel passé (aurais dû)." },
      { q: "Si j'avais su, je ___ venu.", c: ["serais", "suis", "serai"], a: 0, why: "si + plus-que-parfait → conditionnel passé." },
      { q: "Dès qu'il ___, on partira.", c: ["arrive", "arrivera"], a: 1, why: "dès que + action future → futur." },
    ],
  },
  {
    id: "connecteurs",
    title: "Les connecteurs logiques",
    level: "B1",
    explain: `
      <p><b>Cause</b>: parce que, puisque (cause known to both), comme (at the start), grâce à (+ positive), à cause de (+ negative).</p>
      <p><b>Conséquence</b>: donc, alors, c'est pourquoi, par conséquent.</p>
      <p><b>Opposition / concession</b>: mais, pourtant, cependant, en revanche, alors que, tandis que, bien que (+ subj.), malgré (+ nom).</p>
      <p><b>But</b>: pour / afin de (+ infinitif), pour que / afin que (+ subjonctif).</p>
      <p>These are what DELF B1 examiners look for in your writing!</p>`,
    questions: [
      { q: "Il pleut, ___ on reste à la maison.", c: ["donc", "pourtant", "alors que"], a: 0, why: "Conséquence → donc." },
      { q: "Il est riche, ___ il n'est pas heureux.", c: ["donc", "pourtant", "puisque"], a: 1, why: "Opposition inattendue → pourtant." },
      { q: "___ tu es là, aide-moi un peu !", c: ["Puisque", "Bien que", "Pourtant"], a: 0, why: "Cause évidente → puisque." },
      { q: "Elle a réussi ___ son travail.", c: ["grâce à", "à cause de", "malgré"], a: 0, why: "Cause positive → grâce à." },
      { q: "Le match a été annulé ___ la pluie.", c: ["grâce à", "à cause de", "afin de"], a: 1, why: "Cause négative → à cause de." },
      { q: "Je travaille le soir ___ payer mes études.", c: ["afin de", "afin que", "bien que"], a: 0, why: "But + infinitif → afin de." },
      { q: "___ il fasse froid, il sort en t-shirt.", c: ["Bien qu'", "Puisqu'", "Parce qu'"], a: 0, why: "Concession + subjonctif (fasse) → bien que." },
      { q: "Mon frère adore le sport ___ moi, je préfère lire.", c: ["tandis que", "donc", "grâce à"], a: 0, why: "Opposition entre deux personnes → tandis que." },
      { q: "Il est venu ___ sa maladie.", c: ["malgré", "bien que", "grâce à"], a: 0, why: "Concession + nom → malgré." },
      { q: "___ de te plaindre, fais quelque chose !", c: ["Au lieu", "À cause", "Afin"], a: 0, why: "au lieu de + infinitif = instead of." },
    ],
  },
  {
    id: "negation",
    title: "La négation",
    level: "A2",
    explain: `
      <p><b>ne … pas</b> (not), <b>ne … plus</b> (no longer), <b>ne … jamais</b> (never), <b>ne … rien</b> (nothing), <b>ne … personne</b> (nobody), <b>ne … aucun(e)</b> (no, not any), <b>ne … ni … ni</b> (neither…nor), <b>ne … que</b> (only).</p>
      <p>In the passé composé, <i>pas, plus, jamais, rien</i> go before the participle, but <b>personne</b> goes after: <i>Je n'ai rien vu. Je n'ai vu personne.</i></p>
      <p>As subject: <i><b>Personne n'</b>est venu. <b>Rien ne</b> marche.</i> With an infinitive, both parts go before: <i>Je préfère <b>ne pas</b> sortir.</i></p>`,
    questions: [
      { q: "Il n'y a ___ dans la salle : elle est vide.", c: ["personne", "jamais", "plus"], a: 0, why: "Aucune personne → ne … personne." },
      { q: "Je ne fume ___ : j'ai arrêté l'année dernière.", c: ["plus", "jamais", "rien"], a: 0, why: "Changement (avant oui, maintenant non) → ne … plus." },
      { q: "Elle n'a ___ mangé depuis ce matin.", c: ["rien", "personne", "aucun"], a: 0, why: "Aucune chose → ne … rien (avant le participe)." },
      { q: "___ n'est venu à la réunion.", c: ["Personne", "Rien", "Aucun"], a: 0, why: "Personne comme sujet → Personne n'est venu." },
      { q: "Je n'ai ___ idée.", c: ["aucune", "aucun", "rien"], a: 0, why: "« idée » est féminin → aucune." },
      { q: "Il ne boit ni vin ___ bière.", c: ["ni", "ou", "et"], a: 0, why: "ne … ni … ni." },
      { q: "Quelle phrase est correcte ?", c: ["Je n'ai vu personne.", "Je n'ai personne vu.", "Je n'ai pas vu personne."], a: 0, why: "« personne » se place après le participe, et jamais avec « pas »." },
      { q: "Il parle seulement français. → Il ne parle ___ français.", c: ["que", "plus", "rien"], a: 0, why: "ne … que = seulement." },
      { q: "Tu n'es ___ allé en Chine ? — Non, jamais.", c: ["jamais", "rien", "personne"], a: 0, why: "ne … jamais = never." },
      { q: "Je préfère ___ sortir ce soir.", c: ["ne pas", "pas ne", "ne"], a: 0, why: "Avec un infinitif, « ne pas » se place avant." },
    ],
  },
  {
    id: "comparaison",
    title: "Comparatif et superlatif",
    level: "A2",
    explain: `
      <p><b>plus / moins / aussi + adjectif + que</b>: <i>Il est plus grand que moi.</i> With nouns: <b>plus de / moins de / autant de + nom + que</b>. With verbs: <b>plus / moins / autant</b>.</p>
      <p>Irregular: <b>bon → meilleur</b> (adjective), <b>bien → mieux</b> (adverb), <b>mauvais → pire</b> (or plus mauvais).</p>
      <p>Superlative: <b>le/la/les plus …</b> + <b>de</b>: <i>la plus grande ville <b>de</b> France.</i></p>`,
    questions: [
      { q: "Ce gâteau est ___ que l'autre.", c: ["meilleur", "mieux", "plus bon"], a: 0, why: "Comparatif de « bon » (adjectif) → meilleur." },
      { q: "Elle chante ___ que moi.", c: ["mieux", "meilleur", "plus bien"], a: 0, why: "Comparatif de « bien » (adverbe, modifie un verbe) → mieux." },
      { q: "C'est le ___ restaurant de la ville.", c: ["meilleur", "mieux", "plus bon"], a: 0, why: "Superlatif de « bon » → le meilleur." },
      { q: "Paris est ___ grande ville de France.", c: ["la plus", "le plus", "plus"], a: 0, why: "Superlatif, accord avec « ville » (féminin) → la plus." },
      { q: "J'ai ___ livres que toi.", c: ["plus de", "plus des", "plus"], a: 0, why: "Comparaison avec un nom → plus de." },
      { q: "Il est aussi grand ___ son père.", c: ["que", "comme", "de"], a: 0, why: "aussi … que." },
      { q: "C'est la ___ idée de toutes !", c: ["pire", "plus pire", "mauvaise"], a: 0, why: "Superlatif de « mauvais » → la pire (jamais « plus pire »)." },
      { q: "Il gagne ___ argent que moi.", c: ["autant d'", "aussi", "autant"], a: 0, why: "Égalité avec un nom → autant de (d' devant voyelle)." },
    ],
  },
];

// Build the full course in teaching order (A1 → A2 → B1) from all grammar files.
(function () {
  const all = [...window.GRAMMAR_A1, ...window.GRAMMAR_A2, ...window.GRAMMAR_B1, ...window.GRAMMAR];
  const ORDER = [
    // A1
    "genre-articles", "present-er", "present-irr", "questions", "adjectifs", "possessifs", "prepositions-lieu",
    // A2
    "quantites", "toniques", "futur-proche", "pc-formation", "imparfait", "pc-imp", "pronominaux", "imperatif",
    "negation", "cod-coi", "comparaison", "temps",
    // B1
    "y-en", "relatifs", "doubles-pronoms", "si-futur", "subjonctif", "accord-pp", "pqp-indirect", "passif",
    "gerondif", "pronoms-poss-dem", "connecteurs",
  ];
  const byId = new Map(all.map((t) => [t.id, t]));
  window.GRAMMAR = ORDER.map((id) => byId.get(id)).concat(all.filter((t) => !ORDER.includes(t.id)));
  window.GRAMMAR_LEVELS = ["A1", "A2", "B1"];
})();
