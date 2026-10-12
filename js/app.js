// Router + shared view helpers. Each view lives in js/views/*.js and registers itself in Views.
(function () {
  const { $, $$ } = FB;
  window.Views = window.Views || {};

  const ROUTES = [
    ["accueil", "Accueil"],
    ["vocabulaire", "Vocabulaire"],
    ["conjugaison", "Conjugaison"],
    ["grammaire", "Grammaire"],
    ["dictee", "Dictée"],
    ["ecrire", "Écrire"],
    ["lexique", "Lexique"],
    ["reglages", "Réglages"],
  ];

  // Views set App.onKey to handle keyboard shortcuts; it is cleared on every navigation.
  window.App = { onKey: null, go: (r) => { location.hash = "#/" + r; } };

  document.addEventListener("keydown", (e) => {
    if (App.onKey) App.onKey(e);
  });

  function route() {
    const [name, ...rest] = location.hash.replace(/^#\/?/, "").split("/");
    const key = ROUTES.some(([r]) => r === name) ? name : "accueil";
    App.onKey = null;
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    $$("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.route === key));
    const root = $("#app");
    root.innerHTML = "";
    Views[key](root, rest.map(decodeURIComponent));
    window.scrollTo(0, 0);
  }

  function init() {
    FB.load();
    $("#nav").innerHTML = ROUTES.map(([r, label]) => `<a href="#/${r}" data-route="${r}">${label}</a>`).join("");
    window.addEventListener("hashchange", route);
    route();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
