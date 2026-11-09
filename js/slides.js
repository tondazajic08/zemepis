/* Obsah a ovládání prezentace. */
(function () {
  const A = Atlas, F = A.F;
  const isUS = id => id.startsWith("US_"), isCA = id => id.startsWith("CA_");
  const all = (pred, c) => Object.fromEntries(GEO.regions.filter(r => pred(r.id)).map(r => [r.id, c]));
  const set = (ids, c, o) => { ids.forEach(i => o[i] = c); return o; };
  const us = l => l.map(x => "US_" + x), ca = l => l.map(x => "CA_" + x);

  const border = [{ pts: F.borderMain, c: "border" }, { pts: F.borderAlaska, c: "border" }];

  const carScheme = `<svg viewBox="0 0 640 590" role="img" aria-label="Schéma propojení automobilového průmyslu USA, Kanady a Mexika" style="width:100%;height:100%">
  <defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#f2c14e"/></marker></defs>
  <g font-family="Segoe UI,system-ui,sans-serif" text-anchor="middle">
    <rect x="170" y="10" width="300" height="118" rx="14" fill="#5fd3a6"/><text x="320" y="50" font-size="30" font-weight="700" fill="#071730">Kanada</text><text x="320" y="82" font-size="21" fill="#071730">Ontario: montáž vozů</text><text x="320" y="110" font-size="21" fill="#071730">hliník, ocel, energie</text>
    <rect x="170" y="232" width="300" height="118" rx="14" fill="#7cc4f5"/><text x="320" y="272" font-size="30" font-weight="700" fill="#071730">USA</text><text x="320" y="304" font-size="21" fill="#071730">Michigan: vývoj, motory</text><text x="320" y="332" font-size="21" fill="#071730">převodovky, montáž</text>
    <rect x="170" y="454" width="300" height="118" rx="14" fill="#f2c14e"/><text x="320" y="494" font-size="30" font-weight="700" fill="#071730">Mexiko</text><text x="320" y="526" font-size="21" fill="#071730">kabeláž, součástky</text><text x="320" y="554" font-size="21" fill="#071730">montáž vozů</text>
    <g stroke="#f2c14e" stroke-width="5" fill="none" marker-end="url(#ar)"><path d="M280 132V226"/><path d="M360 228V134"/><path d="M280 354V448"/><path d="M360 450V356"/></g>
    <text x="110" y="172" font-size="20" fill="#fff">díly</text><text x="110" y="198" font-size="20" fill="#fff">a suroviny</text>
    <text x="110" y="394" font-size="20" fill="#fff">díly</text><text x="110" y="420" font-size="20" fill="#fff">a hotová auta</text>
    <text x="540" y="172" font-size="44" font-weight="700" fill="#f2c14e">75 %</text><text x="540" y="202" font-size="19" fill="#fff">hodnoty auta</text><text x="540" y="228" font-size="19" fill="#fff">ze S. Ameriky</text>
    <text x="540" y="394" font-size="19" fill="#fff">Díl může přejít</text><text x="540" y="420" font-size="19" fill="#fff">hranici i několikrát.</text>
  </g></svg>`;

  const SL = [
    { k: "USA", t: "Spojené státy americké (USA)", b: ["Federativní prezidentská republika tvořená 50 státy.", "Hlavní město Washington, D.C., největší město New York.", "Významná světová politická, hospodářská a vojenská velmoc.", "Prezident je hlavou státu i vlády.", "Dvoukomorový Kongres – Senát a Sněmovna reprezentantů.", "Angličtina je dominantním jazykem, na federální úrovni není stanovena jako úřední.", "Americký dolar (USD) – jedna z nejvýznamnějších světových měn.", "Člen OSN, NATO, G7 a G20."],
      map: { view: "usi", ak: 1, title: "Politická mapa USA", fills: all(isUS, "c1"), dim: isCA, fs: .95, markers: [{ at: [-77.04, 38.9], t: "Washington, D.C.", c: "c2", big: 1, pos: "l" }, { at: [-74, 40.7], t: "New York", pos: "r" }], texts: [{ at: [-152, 64.5], t: "Aljaška", c: "t-dark", ak: 1, s: .85 }, { at: [-157, 23.2], t: "Havaj", s: .85 }], cap: "Politická mapa: 48 souvislých států, Aljaška a Havaj ve výřezech." } },
    { k: "USA · příroda", t: "Přírodní podmínky USA", b: ["Západ: Kordillery, Skalnaté hory, Kaskádové pohoří, Sierra Nevada.", "Východ: Apalačské pohoří – starší a nižší horský systém.", "Střed: Centrální nížiny a Velké planiny – významná zemědělská oblast.", "Aljaška: nejvyšší hora Severní Ameriky Denali.", "Havaj: sopečné souostroví v Tichém oceánu.", "Podnebí od polárního na Aljašce po subtropické na jihu Floridy.", "Časté přírodní katastrofy – hurikány, tornáda, zemětřesení a lesní požáry.", "Významné přírodní oblasti: Grand Canyon, Yellowstone, Yosemitský národní park."],
      map: { view: "usi", ak: 1, title: "Fyzickogeografická mapa USA", dim: isCA, fs: .82, lines: [{ pts: F.rockies, c: "range" }, { pts: F.cascades, c: "range" }, { pts: F.sierra, c: "range" }, { pts: F.appalachiansUS, c: "range" }, { pts: F.mississippi, c: "river" }], texts: [{ at: [-105.5, 47], t: "Skalnaté hory", c: "t-range" }, { at: [-73, 37], t: "Apalače", c: "t-range" }, { at: [-101, 41.5], t: "Velké planiny" }, { at: [-92, 36.2], t: "Centrální nížiny", s: .88 }], markers: [{ at: [-151, 63.07], t: "Denali", c: "c2", pos: "t", ak: 1 }, { at: [-112.1, 36.1], t: "Grand Canyon", c: "c3", pos: "b" }, { at: [-110.6, 44.5], c: "c3", t: "Yellowstone", pos: "l" }, { at: [-119.5, 37.8], c: "c3", t: "Yosemite", pos: "l" }], legend: [["c4", "horská pásma"], ["c1", "řeka Mississippi"], ["c3", "přírodní oblasti"]] } },
    { k: "USA · obyvatelstvo", t: "Obyvatelstvo a osídlení USA", b: ["Multikulturní společnost vzniklá především přistěhovalectvím.", "Významné skupiny obyvatel: běloši, Afroameričané, Hispánci a Asiaté.", "Původní obyvatelé – indiáni a Inuité (především Aljaška).", "Vysoká urbanizace – většina obyvatel žije ve městech.", "Nejhustší osídlení na severovýchodě a pobřeží.", "Megalopolis BosWash: souvislá urbanizovaná oblast od Bostonu přes New York a Filadelfii až po Washington.", "Významné aglomerace: New York, Los Angeles, Chicago, Houston.", "Vysoká životní úroveň, ale také výrazné sociální a ekonomické rozdíly."],
      map: { view: "lower", title: "Osídlení USA a megalopolis BosWash", dim: id => !A.isLower48(id), fs: .92, fills: set(us(["MA", "RI", "CT", "NY", "NJ", "PA", "DE", "MD", "DC"]), "c1", {}), lines: [{ pts: [[-71.06, 42.36], [-74, 40.7], [-75.16, 39.95], [-77.04, 38.9]], c: "mega" }], markers: [{ at: [-71.06, 42.36], t: "Boston", pos: "t" }, { at: [-74, 40.7], t: "New York", big: 1, pos: "r" }, { at: [-75.16, 39.95], t: "Filadelfie", pos: "r" }, { at: [-77.04, 38.9], t: "Washington", pos: "b" }, { at: [-118.24, 34.05], t: "Los Angeles", big: 1, pos: "r" }, { at: [-87.63, 41.88], t: "Chicago", big: 1, pos: "t" }, { at: [-95.37, 29.76], t: "Houston", big: 1, pos: "t" }], legend: [["c1", "severovýchod"], ["c2", "BosWash"]] } },
    { k: "USA · ekonomika", t: "Hospodářství USA", b: ["Největší ekonomika světa podle nominálního HDP.", "Dominantní terciární a kvartérní sektor – finance, obchod, služby, výzkum a technologie.", "Průmysl: automobilový (Detroit), letecký, chemický, elektrotechnický a zbrojní.", "Silicon Valley: centrum informačních technologií a inovací v Kalifornii.", "Wall Street: světové centrum finančnictví v New Yorku.", "Zemědělství: vysoce mechanizované, velkovýrobní a specializované.", "Corn Belt – kukuřice a sója, Wheat Belt – pšenice, Cotton Belt – bavlna.", "Těžba ropy, zemního plynu, uhlí a nerostných surovin.", "Významný vývozce technologií, letadel, zemědělských produktů a služeb."],
      map: { view: "lower", title: "Hospodářské oblasti USA a zemědělské pásy", dim: id => !A.isLower48(id), fs: .88, fills: set(us(["MS", "AL", "GA", "AR", "LA", "SC", "TX"]), "c4", set(us(["KS", "ND", "OK", "MT", "SD"]), "c3", set(us(["IA", "IL", "IN", "NE", "OH", "MN"]), "c2", {}))), markers: [{ at: [-83.05, 42.33], t: "Detroit", pos: "t" }, { at: [-122, 37.4], t: "Silicon Valley", pos: "r" }, { at: [-74, 40.7], t: "Wall Street", pos: "b" }], legend: [["c2", "Corn Belt"], ["c3", "Wheat Belt"], ["c4", "Cotton Belt"]] } },
    { k: "Kanada", t: "Kanada", b: ["Federativní stát – 10 provincií a 3 teritoria.", "Parlamentní demokracie a konstituční monarchie.", "Hlavní město Ottawa, největší město Toronto.", "Hlavou státu je britský panovník, zastupovaný generálním guvernérem.", "Vládu vede premiér.", "Oficiální jazyky: angličtina a francouzština.", "Francouzsky mluvící obyvatelstvo se soustřeďuje především v provincii Québec.", "Člen Commonwealthu, NATO, OSN, G7 a G20.", "Vysoká životní úroveň a rozvinutý sociální systém."],
      map: { view: "canada", title: "Provincie a teritoria Kanady", dim: isUS, fs: .8, fills: set(ca(["YT", "NT", "NU"]), "c5", all(isCA, "c1")), texts: [{ at: [-135.5, 63.5], t: "Yukon", c: "t-dark", s: .75 }, { at: [-119, 64.5], t: "Sev.-záp. teritoria", c: "t-dark", s: .75 }, { at: [-95, 66], t: "Nunavut", c: "t-dark" }, { at: [-125, 54], t: "Brit. Kolumbie", c: "t-dark", s: .75 }, { at: [-114.5, 55], t: "Alberta", c: "t-dark", s: .75 }, { at: [-105.8, 54.5], t: "Saskatch.", c: "t-dark", s: .72 }, { at: [-97.5, 55], t: "Manitoba", c: "t-dark", s: .75 }, { at: [-86, 50.5], t: "Ontario", c: "t-dark" }, { at: [-72.5, 52], t: "Québec", c: "t-dark" }, { at: [-61, 53.7], t: "Newfoundl. a L.", c: "t-dark", s: .68 }], markers: [{ at: [-75.7, 45.42], t: "Ottawa", c: "c2", big: 1, pos: "r" }, { at: [-79.38, 43.65], t: "Toronto", pos: "b" }], legend: [["c1", "provincie"], ["c5", "teritoria"]] } },
    { k: "Kanada · příroda", t: "Přírodní podmínky Kanady", b: ["Kanadský štít: rozsáhlá oblast starých hornin, bohatá na nerostné suroviny.", "Západ: Kordillery a Skalnaté hory.", "Východ: Apalačské pohoří.", "Sever: tundra, permafrost a arktické oblasti.", "Rozsáhlé jehličnaté lesy – tajga.", "Velké množství sladkovodních jezer.", "Velká jezera – společná s USA.", "Významné řeky: Mackenzie, sv. Vavřince a Yukon.", "Podnebí od mírného na jihu po polární na severu.", "Většina obyvatel žije v jižním pásu při hranici s USA."],
      compact: 1, map: { view: "canada", title: "Fyzickogeografická mapa Kanady", dim: isUS, fs: .8, areas: [F.shield], lines: [{ pts: F.rockies.slice(0, 4), c: "range" }, { pts: F.appalachiansCA, c: "range" }, { pts: F.mackenzie, c: "river" }, { pts: F.stlawrence, c: "river" }, { pts: F.yukon, c: "river" }], texts: [{ at: [-87, 50.8], t: "Kanadský štít", c: "t-dark" }, { at: [-128, 53], t: "Skalnaté hory", c: "t-range", s: .85 }, { at: [-124, 66.8], t: "Mackenzie", s: .8 }, { at: [-136, 64.7], t: "Yukon", s: .8 }, { at: [-63, 45.2], t: "Apalače", c: "t-range", s: .85 }, { at: [-68.5, 48.2], t: "sv. Vavřinec", s: .75 }, { at: [-85, 42.2], t: "Velká jezera", s: .8 }], legend: [["c2", "Kanadský štít (schematicky)"], ["c4", "hory"], ["c1", "řeky"]] } },
    { k: "Kanada · společnost a ekonomika", t: "Obyvatelstvo a hospodářství Kanady", wide: 1, g: [["Obyvatelstvo", ["Nízká hustota zalidnění.", "Převážná část obyvatel žije na jihu země.", "Multikulturní společnost – významné přistěhovalectví.", "Anglicky a francouzsky mluvící obyvatelstvo.", "Původní obyvatelé – First Nations, Inuité a Métis."]], ["Hospodářství", ["Významná těžba nerostných surovin – nikl, uran, zlato, železná ruda.", "Ropa a zemní plyn – především provincie Alberta.", "Ropné písky – významný zdroj ropy.", "Lesnictví, dřevozpracující a papírenský průmysl.", "Vodní elektrárny – významný zdroj elektrické energie.", "Zemědělství – pšenice, řepka a chov skotu.", "Významný automobilový a letecký průmysl."]]],
      map: { view: "canada", title: "Přírodní zdroje Kanady", dim: isUS, fs: 1.05, markers: [{ at: [-111.4, 57.2], t: "ropa", c: "c4", big: 1, pos: "t" }, { at: [-114, 51], t: "plyn", c: "c4", pos: "l" }, { at: [-105, 58.2], t: "uran", c: "c5", pos: "r" }, { at: [-81, 46.5], t: "nikl", c: "c3", pos: "b" }, { at: [-81.3, 48.8], t: "zlato", c: "c2", pos: "l" }, { at: [-66.9, 52.9], t: "železo", c: "c3", pos: "r" }, { at: [-76, 53.8], t: "voda", c: "c1", big: 1, pos: "t" }], legend: [["c4", "ropa, plyn"], ["c3", "kovy"], ["c2", "zlato"], ["c5", "uran"], ["c1", "vodní energie"]] } },
    { k: "Srovnání", t: "Hlavní hospodářské oblasti USA a Kanady", wide: 1, g: [["USA", ["Severovýchod – finančnictví, obchod, průmysl.", "Velká jezera – automobilový a strojírenský průmysl.", "Kalifornie – informační technologie, filmový průmysl, zemědělství.", "Texas – ropa, zemní plyn, petrochemie a energetika.", "Středozápad – intenzivní zemědělství."]], ["Kanada", ["Ontario a Québec – průmyslové a ekonomické centrum.", "Alberta – těžba ropy a zemního plynu.", "Britská Kolumbie – lesnictví, těžba a obchod s Asií.", "Prérie – obilnářství a chov skotu.", "Québec – hydroenergetika a průmysl."]]],
      map: { view: "south", title: "Hlavní hospodářské oblasti USA a Kanady", fs: .95, fills: set(ca(["BC"]), "c3", set(ca(["AB"]), "c4", set(ca(["SK", "MB"]), "c2", set(ca(["ON", "QC"]), "c1", set(us(["TX"]), "c4", set(us(["CA"]), "c5", set(us(["IA", "NE", "KS", "MO"]), "c2", set(us(["MI", "OH", "IN", "IL", "WI"]), "c3", set(us(["NY", "NJ", "PA", "MA", "CT", "RI"]), "c1", {}))))))))), legend: [["c1", "finance, průmysl"], ["c3", "strojírenství, lesnictví"], ["c5", "technologie"], ["c4", "ropa, plyn"], ["c2", "zemědělství"]] } },
    { k: "Vztahy", t: "Vzájemné vztahy USA a Kanady", b: ["Společná hranice – jedna z nejdelších na světě.", "Velmi úzké hospodářské a politické vztahy.", "USA jsou nejvýznamnějším obchodním partnerem Kanady.", "Kanada je významným dodavatelem ropy, zemního plynu, elektřiny a nerostných surovin.", "Propojený automobilový průmysl – výroba a montáž v obou zemích.", "Společná obrana vzdušného prostoru prostřednictvím NORAD.", "Spolupráce v NATO a dalších mezinárodních organizacích.", "Společné využívání příhraniční infrastruktury a dopravních koridorů."],
      map: { view: "all", title: "Společná hranice USA a Kanady", fs: .82, fills: Object.assign(all(isUS, "c1"), all(isCA, "c3")), lines: border, markers: [{ at: [-83.05, 42.33], t: "Detroit–Windsor", c: "c2", pos: "b" }, { at: [-104.8, 38.8], t: "NORAD", c: "c2", pos: "r" }], cap: "Bílá linie: společná hranice dlouhá 8 891 km, včetně Aljašky." } },
    { k: "Dohoda", t: "NAFTA", sub: "North American Free Trade Agreement", b: ["Severoamerická dohoda o volném obchodu.", "Vstoupila v platnost 1. ledna 1994.", "Členské státy: USA, Kanada a Mexiko.", "Odstraňování cel a obchodních překážek.", "Podpora volného obchodu a zahraničních investic.", "Propojení průmyslové výroby mezi třemi státy.", "Významná především pro automobilový průmysl, zemědělství a energetiku.", "Vytvoření jedné z největších zón volného obchodu na světě."],
      map: { view: "nafta", title: "Členské státy NAFTA a USMCA", fs: .95, fills: Object.assign(all(isUS, "c1"), all(isCA, "c3")), ctxFill: { MX: "c3" }, inset: false, texts: [{ at: [-104, 60], t: "Kanada", c: "t-dark", s: 1.2 }, { at: [-98, 40], t: "USA", c: "t-dark", s: 1.2 }, { at: [-102.5, 24], t: "Mexiko", c: "t-dark", s: 1 }] } },
    { k: "Dopady", t: "Význam a důsledky NAFTA", full: 1, g: [["Pozitiva", ["Výrazný nárůst vzájemného obchodu.", "Rozšíření exportu a importu.", "Příliv zahraničních investic.", "Nižší náklady na výrobu a dopravu.", "Propojení dodavatelských řetězců.", "Vznik nových pracovních příležitostí v některých odvětvích."], "good"], ["Negativa", ["Přesouvání výroby do Mexika kvůli nižším mzdám.", "Zánik některých pracovních míst v USA a Kanadě.", "Nerovnoměrné rozdělení ekonomických výhod.", "Větší závislost ekonomik na vzájemném obchodu.", "Negativní dopady některých forem intenzivní výroby na životní prostředí."], "bad"]] },
    { k: "Současnost", t: "USMCA a současnost", b: ["USMCA – United States-Mexico-Canada Agreement.", "Nástupce původní dohody NAFTA.", "Platnost od 1. července 2020.", "Členové: USA, Kanada a Mexiko.", "Přísnější pravidla původu automobilových součástek.", "Požadavek na vyšší podíl výroby v Severní Americe.", "Posílení ochrany pracovních práv a životního prostředí.", "Nová pravidla pro digitální obchod.", "V roce 2026 probíhá první společné přezkoumání dohody."], svg: carScheme, cap: "Automobilový průmysl: jeden vůz vzniká ve všech třech státech." }
  ];
  window.SLIDES = SL;

  const stage = document.getElementById("stage");
  if (!stage) return;
  const bold = s => {
    const e = A.esc(s), m = e.match(/^([^:–]{2,26}): (.*)$/);
    return m ? `<b>${m[1]}:</b> ${m[2]}` : e;
  };
  const ul = l => "<ul>" + l.map(x => `<li>${bold(x)}</li>`).join("") + "</ul>";
  let i = 0;
  const parse = () => { const n = parseInt(location.hash.slice(1), 10); return n >= 1 && n <= SL.length ? n - 1 : 0; };

  function render() {
    const s = SL[i];
    const text = s.g ? `<div class="groups">${s.g.map(g => `<div class="${g[2] || ""}"><h3>${g[0]}</h3>${ul(g[1])}</div>`).join("")}</div>` : `<div>${s.sub ? `<p class="sub">${s.sub}</p>` : ""}${ul(s.b)}</div>`;
    const vis = s.map || s.svg ? `<div class="vis"><div id="vm" style="flex:1;min-height:0;display:flex;flex-direction:column"></div>${(s.map && s.map.cap) || s.cap ? `<div class="cap">${(s.map && s.map.cap) || s.cap}</div>` : ""}</div>` : "";
    stage.innerHTML = `<section class="slide" aria-live="polite"><div class="kick">${s.k}</div><h2>${s.t}</h2><div class="body ${s.wide ? "wide" : ""} ${s.full ? "full" : ""}">${text}${vis}</div></section>`;
    const vm = document.getElementById("vm");
    if (s.map) A.draw(vm, Object.assign({}, s.map, { fs: (s.map.fs || 1) * 1.28 })); else if (s.svg) vm.innerHTML = s.svg;
    document.getElementById("cnt").textContent = (i + 1) + " / " + SL.length;
    document.getElementById("barf").style.width = ((i + 1) / SL.length * 100) + "%";
    document.getElementById("prev").disabled = i === 0;
    document.getElementById("next").disabled = i === SL.length - 1;
    document.title = s.t + " | USA & Canada";
    if (location.hash !== "#" + (i + 1)) history.replaceState(null, "", "#" + (i + 1));
  }
  function go(n) { n = Math.max(0, Math.min(SL.length - 1, n)); if (n !== i) { i = n; render(); } }
  function fit() {
    const vp = document.getElementById("vp");
    if (innerWidth <= 900) { stage.style.transform = ""; stage.style.margin = ""; return; }
    const k = Math.min(vp.clientWidth / 1600, vp.clientHeight / 900);
    stage.style.margin = "-450px 0 0 -800px";
    stage.style.transform = `scale(${k})`;
  }
  document.getElementById("prev").onclick = () => go(i - 1);
  document.getElementById("next").onclick = () => go(i + 1);
  function fs() { const d = document.getElementById("deck"); if (document.fullscreenElement) document.exitFullscreen(); else if (d.requestFullscreen) d.requestFullscreen(); }
  document.getElementById("full").onclick = fs;
  addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(i + 1); }
    else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(i - 1); }
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(SL.length - 1);
    else if (e.key.toLowerCase() === "f") fs();
  });
  let tx = null;
  stage.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", e => { if (tx === null) return; const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 60) go(i + (d < 0 ? 1 : -1)); tx = null; });
  addEventListener("hashchange", () => go(parse()));
  addEventListener("resize", fit);
  document.addEventListener("fullscreenchange", () => setTimeout(fit, 60));
  i = parse(); render(); fit();
})();
