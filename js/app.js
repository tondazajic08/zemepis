/* Společná navigace a patička. */
(function () {
  const links = [["index.html", "Úvod"], ["mapa.html", "Mapa"], ["rozsirene.html", "Rozšířené informace"], ["kvizy.html", "Kvízy"], ["maturita.html", "Maturita"]];
  const here = location.pathname.split("/").pop() || "index.html";
  const h = document.getElementById("top");
  if (h) h.innerHTML = '<nav aria-label="Hlavní navigace"><a class="brand" href="index.html">USA <span>&amp;</span> Canada</a>' +
    links.slice(1).map(l => `<a class="l" href="${l[0]}"${l[0] === here ? ' aria-current="page"' : ""}>${l[1]}</a>`).join("") + "</nav>";
  const f = document.getElementById("foot");
  if (f) f.innerHTML = '<div class="wrap">Vzdělávací web k maturitě ze zeměpisu. Mapové podklady: <a href="https://www.naturalearthdata.com/">Natural Earth</a> (volné dílo). Fotografie: Wikimedia Commons, autor a licence jsou uvedeny u každého snímku na stránce Mapa.</div>';
})();
window.shuffle = function (a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
