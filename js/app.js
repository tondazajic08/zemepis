/* Společná navigace a patička. */
(function () {
  const links = [["index.html", "Úvod"], ["mapa.html", "Mapa"], ["rozsirene.html", "Rozšířené informace"], ["prehled.html", "Mapy a grafy"], ["kvizy.html", "Kvízy"], ["maturita.html", "Maturita"], ["prezentace.html", "Prezentace"], ["novinky.html", "Novinky"]];
  const here = location.pathname.split("/").pop() || "index.html";
  const h = document.getElementById("top");
  if (h) {
    h.innerHTML = '<nav aria-label="Hlavní navigace"><a class="brand" href="index.html">USA <span>&amp;</span> Canada</a>' +
      '<button class="menu" type="button" aria-expanded="false" aria-controls="navlinks"><span></span>Menu</button><div class="links" id="navlinks">' +
      links.slice(1).map(l => `<a class="l" href="${l[0]}"${l[0] === here ? ' aria-current="page"' : ""}>${l[1]}</a>`).join("") + "</div></nav>";
    const b = h.querySelector(".menu"), nav = h.querySelector("nav");
    b.onclick = () => { const o = nav.classList.toggle("open"); b.setAttribute("aria-expanded", o); };
    document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")) { nav.classList.remove("open"); b.setAttribute("aria-expanded", "false"); b.focus(); } });
  }
  const f = document.getElementById("foot");
  if (f) f.innerHTML = '<div class="wrap foot"><div><b>USA &amp; Canada</b><br>Vzdělávací web k maturitě ze zeměpisu.</div><div>Mapové podklady: <a href="https://www.naturalearthdata.com/">Natural Earth</a> (volné dílo). Statistiky: U.S. Census Bureau, Statistics Canada, World Bank. Fotografie: Wikimedia Commons, autor a licence jsou uvedeny u každého snímku na stránce Mapa.</div></div>';
})();
window.shuffle = function (a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
