(function () {
  const esc = Atlas.esc, c = document.getElementById("content"), tabs = document.getElementById("tabs"), tip = document.getElementById("tip");
  const ids = GEO.regions.map(r => r.id);
  const name = id => (window.BLIND_NAMES && BLIND_NAMES[id] ? BLIND_NAMES[id][0] : id);
  const fmt = (v, d) => v.toLocaleString("cs-CZ", { maximumFractionDigits: d === undefined ? 1 : d });
  const group = m => { const f = {}; for (const k in m) m[k].split(" ").forEach(s => { f[(s.length === 2 ? "US_" : "") + s] = k; }); return f; };

  /* ---------- tematické mapy ---------- */
  const dens = id => { const s = REGION_STATS[id]; return s && s.pop && s.area ? s.pop / s.area : null; };
  const MAPS = {
    hustota: {
      t: "Hustota zalidnění", p: "Obyvatel na km² podle sčítání (USA 2020, Kanada 2021). Washington, D.C. má přes 4 000 obyvatel na km², na mapě je jen nepatrná ploška mezi Marylandem a Virginií.",
      fills: () => Object.fromEntries(ids.map(id => { const d = dens(id); return [id, d == null ? "" : d < 2 ? "s1" : d < 20 ? "s2" : d < 50 ? "s3" : d < 150 ? "s4" : "s5"]; })),
      legend: [["s1", "pod 2"], ["s2", "2–20"], ["s3", "20–50"], ["s4", "50–150"], ["s5", "nad 150"]],
      hover: id => { const d = dens(id); return d == null ? "" : fmt(d) + " obyv./km²"; }
    },
    podnebi: {
      t: "Podnebí", p: "Zjednodušeně: u každé jednotky je jen převládající typ podnebí. Ve velkých státech a provinciích se podnebí uvnitř výrazně liší, například na západě Texasu je sucho a na severu Québecu subarktické podnebí.",
      fills: () => group({ c5: "AK CA_YT CA_NT CA_NU CA_NL", c1: "ME NH VT MA RI CT NY PA NJ OH MI IN IL WI MN IA ND SD NE CA_ON CA_QC CA_NB CA_NS CA_PE CA_MB CA_SK CA_AB", c4: "MT WY CO UT NV AZ NM ID", c2: "WA OR CA CA_BC", c3: "DE MD DC VA WV KY TN NC SC GA AL MS LA AR MO OK TX KS FL HI" }),
      legend: [["c5", "polární a subarktické"], ["c1", "vlhké kontinentální"], ["c4", "suché a horské"], ["c2", "pacifické (oceánské, středomořské)"], ["c3", "vlhké subtropické, tropické (Havaj, jih Floridy)"]]
    },
    zemedelstvi: {
      t: "Zemědělské oblasti", p: "Tradiční zemědělské pásy. Dnes jsou méně vyhraněné, mapa ukazuje státy, kde je daná výroba nejvýraznější. Kanadské prérie pěstují hlavně pšenici a řepku.",
      fills: () => group({ c2: "IA IL IN NE OH", c1: "KS ND OK MT SD CA_SK CA_AB CA_MB", c4: "TX GA MS AR AL", c3: "WI MN NY VT", c5: "WY NM" }),
      legend: [["c2", "Corn Belt (kukuřice, sója)"], ["c1", "Wheat Belt (pšenice)"], ["c4", "Cotton Belt (bavlna)"], ["c3", "Dairy Belt (mléko)"], ["c5", "pastevectví skotu"]]
    },
    suroviny: {
      t: "Suroviny a energie", p: "Hlavní ložiska a velké vodní elektrárny. Ropa a plyn se v USA těží i v dalších státech.",
      markers: [
        [-102.5, 31.8, "c4", "Permská pánev", "r"], [-103, 48, "c4", "Bakken", "t"], [-148.4, 70.2, "c4", "Prudhoe Bay", "r"], [-111.4, 57, "c4", "ropné písky Athabasca", "l"], [-90, 27.6, "c4", "Mexický záliv", "b"],
        [-105.5, 44, "c5", "uhlí Powder River", "r"], [-81.5, 37.8, "c5", "uhlí Apalače", "r"],
        [-92.5, 47.5, "c2", "železo Mesabi", "b"], [-110.8, 33.2, "c2", "měď Arizona", "r"], [-116.1, 40.7, "c2", "zlato Nevada", "l"], [-81, 46.5, "c2", "nikl Sudbury", "r"],
        [-106.6, 52.1, "", "potaš Saskatchewan", "l"], [-105, 58, "", "uran Athabasca", "r"], [-110.6, 64.7, "", "diamanty", "r"],
        [-77.5, 53.8, "c3", "James Bay", "r"], [-64, 53.5, "c3", "Churchill Falls", "r"], [-119, 48, "c3", "Grand Coulee", "l"], [-114.7, 36, "c3", "Hooverova přehrada", "l"]
      ],
      legend: [["c4", "ropa a plyn"], ["c5", "uhlí"], ["c2", "kovy"], ["", "ostatní suroviny"], ["c3", "vodní elektrárny"]]
    },
    relief: {
      t: "Povrch a řeky", p: "Hlavní pohoří (oranžově), řeky (modře) a Kanadský štít (žlutě vyznačený).",
      lines: () => ["rockies", "cascades", "sierra", "appalachiansUS", "appalachiansCA"].map(k => ({ c: "range", pts: Atlas.F[k] })).concat(["mississippi", "stlawrence", "mackenzie", "yukon"].map(k => ({ c: "river", pts: Atlas.F[k] }))),
      areas: () => [Atlas.F.shield],
      texts: [[-114, 45.5, "Kordillery", "t-range"], [-76.5, 37.5, "Apalače", "t-range"], [-104.5, 43, "Velké planiny"], [-87, 42.5, "Centrální nížiny"], [-117, 39.5, "Velká pánev"], [-103, 62.5, "Kanadský štít", "t-dark"], [-86, 58.5, "Hudsonův záliv"], [-93, 33, "Mississippi"], [-122.5, 64.5, "Mackenzie"]]
    }
  };
  function maps(sel) {
    sel = MAPS[sel] ? sel : "hustota";
    c.innerHTML = `<div class="filters light">${Object.entries(MAPS).map(([k, m]) => `<button data-m="${k}" aria-pressed="${k === sel}">${m.t}</button>`).join("")}</div><h2 class="grouph">${MAPS[sel].t}</h2><p>${MAPS[sel].p}</p><div class="tmap" id="tm"></div>`;
    const m = MAPS[sel], el = document.getElementById("tm");
    Atlas.draw(el, {
      view: "all", fills: m.fills ? m.fills() : null, legend: m.legend, lines: m.lines && m.lines(), areas: m.areas && m.areas(), hit: true, names: Object.fromEntries(ids.map(i => [i, name(i)])),
      markers: (m.markers || []).map(x => ({ at: [x[0], x[1]], c: x[2], t: x[3], pos: x[4] })), texts: (m.texts || []).map(x => ({ at: [x[0], x[1]], t: x[2], c: x[3] || "", s: .9 })), title: m.t
    });
    el.addEventListener("mousemove", e => { const id = e.target.dataset && e.target.dataset.id; if (!id) return hide(); show(e, `<b>${esc(name(id))}</b>${m.hover && m.hover(id) ? "<br>" + m.hover(id) : ""}`); });
    el.addEventListener("mouseleave", hide);
    c.querySelector(".filters").onclick = e => { if (e.target.dataset.m) { maps(e.target.dataset.m); history.replaceState(null, "", "#mapy-" + e.target.dataset.m); } };
  }

  /* ---------- časová osa ---------- */
  const AREA = { US: ["USA", "tUS"], CA: ["Kanada", "tCA"], NA: ["NAFTA a obchod", "tNA"] };
  function timeline() {
    const on = { US: true, CA: true, NA: true };
    c.innerHTML = `<div class="filters light" id="tf">${Object.entries(AREA).map(([k, a]) => `<button data-a="${k}" aria-pressed="true"><i class="dot ${a[1]}"></i>${a[0]}</button>`).join("")}</div><p class="muted">Klikni na událost pro vysvětlení. Filtrem nahoře vybereš, co chceš vidět.</p><ol class="tl" id="tl"></ol>`;
    const paint = () => { document.getElementById("tl").innerHTML = TIMELINE.filter(e => on[e[2]]).sort((a, b) => a[0] - b[0]).map(e => `<li class="${AREA[e[2]][1]}"><details><summary><span class="yr">${esc(e[1])}</span><span class="ar">${AREA[e[2]][0]}</span>${esc(e[3])}</summary><div>${esc(e[4])}</div></details></li>`).join(""); };
    document.getElementById("tf").onclick = e => { const b = e.target.closest("button"); if (!b) return; on[b.dataset.a] = !on[b.dataset.a]; b.setAttribute("aria-pressed", on[b.dataset.a]); paint(); };
    paint();
  }

  /* ---------- grafy ---------- */
  const NS = "http://www.w3.org/2000/svg";
  function show(e, h) { tip.innerHTML = h; tip.hidden = false; const x = Math.min(e.clientX + 14, innerWidth - tip.offsetWidth - 8); tip.style.left = x + "px"; tip.style.top = (e.clientY + 14) + "px"; }
  function hide() { tip.hidden = true; }
  const nice = v => { const p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p; };
  function tableOf(head, rows) { return `<details class="data"><summary>Zobrazit data v tabulce</summary><div class="tblw"><table><tr>${head.map(h => `<th>${esc(h)}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(v => `<td>${typeof v === "number" ? fmt(v) : esc(v)}</td>`).join("")}</tr>`).join("")}</table></div></details>`; }

  function line(el, o) {
    const W = 640, H = 300, L = 46, Rr = 92, T = 14, B = 30, xs = o.series.flatMap(s => s.pts.map(p => p[0])), x0 = Math.min(...xs), x1 = Math.max(...xs);
    const ymax = nice(Math.max(...o.series.flatMap(s => s.pts.map(p => p[1]))) * 1.05) , step = ymax / 4;
    const X = x => L + (x - x0) / (x1 - x0) * (W - L - Rr), Y = y => T + (1 - y / ymax) * (H - T - B);
    let s = `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="${esc(o.title)}">`;
    for (let v = 0; v <= ymax + 1e-9; v += step) s += `<line class="grid" x1="${L}" x2="${W - Rr}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ax" x="${L - 6}" y="${Y(v) + 4}" text-anchor="end">${fmt(v, 0)}</text>`;
    o.ticks.forEach(t => { s += `<text class="ax" x="${X(t)}" y="${H - 8}" text-anchor="middle">${t}</text>`; });
    o.series.forEach(se => {
      s += `<path class="ln" style="stroke:${se.color}" d="M${se.pts.map(p => X(p[0]).toFixed(1) + "," + Y(p[1]).toFixed(1)).join("L")}"/>`;
      const lp = se.pts[se.pts.length - 1]; s += `<text class="lab" x="${X(lp[0]) + 8}" y="${Y(lp[1]) + 4}">${esc(se.name)}</text>`;
      if (se.dots) se.pts.forEach(p => { s += `<circle class="dt" style="fill:${se.color}" cx="${X(p[0])}" cy="${Y(p[1])}" r="4"/>`; });
    });
    s += `<line class="cross" id="cr" y1="${T}" y2="${H - B}" visibility="hidden"/><rect x="${L}" y="${T}" width="${W - L - Rr}" height="${H - T - B}" fill="transparent" class="hitarea"/></svg>`;
    el.innerHTML = s;
    const svg = el.querySelector("svg"), cr = svg.querySelector("#cr"), all = [...new Set(xs)].sort((a, b) => a - b);
    svg.querySelector(".hitarea").addEventListener("mousemove", e => {
      const r = svg.getBoundingClientRect(), vx = (e.clientX - r.left) / r.width * W, xv = x0 + (vx - L) / (W - L - Rr) * (x1 - x0);
      const n = all.reduce((a, b) => Math.abs(b - xv) < Math.abs(a - xv) ? b : a);
      cr.setAttribute("x1", X(n)); cr.setAttribute("x2", X(n)); cr.setAttribute("visibility", "visible");
      show(e, `<b>${n}</b>` + o.series.map(se => { const p = se.pts.find(q => q[0] === n); return p ? `<br><i class="sw" style="background:${se.color}"></i>${esc(se.name)}: ${fmt(p[1])} ${o.unit}` : ""; }).join(""));
    });
    svg.querySelector(".hitarea").addEventListener("mouseleave", () => { cr.setAttribute("visibility", "hidden"); hide(); });
  }

  function bars(el, o) {
    const rowH = 30, W = 640, L = 170, Rr = 70, H = o.rows.length * rowH + 10, max = Math.max(...o.rows.map(r => r[1]));
    let s = `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="${esc(o.title)}">`;
    o.rows.forEach((r, i) => {
      const y = 5 + i * rowH, w = Math.max(2, r[1] / max * (W - L - Rr));
      s += `<g class="bar" data-i="${i}"><rect x="0" y="${y}" width="${W}" height="${rowH}" fill="transparent"/><text class="ax" x="${L - 8}" y="${y + 19}" text-anchor="end">${esc(r[0])}</text><path style="fill:${r[2] || o.color}" d="M${L},${y + 5}h${w - 4}a4,4 0 0 1 4,4v${rowH - 18}a4,4 0 0 1 -4,4h${-(w - 4)}z"/><text class="lab" x="${L + w + 6}" y="${y + 19}">${fmt(r[1], o.dec)}</text></g>`;
    });
    el.innerHTML = s + "</svg>";
    el.querySelectorAll(".bar").forEach(g => { const r = o.rows[g.dataset.i]; g.onmousemove = e => show(e, `<b>${esc(r[0])}</b><br>${fmt(r[1], 2)} ${o.unit}`); g.onmouseleave = hide; });
  }

  function stack(el, o) {
    const W = 640, L = 80, Rr = 10, rowH = 46, H = o.rows.length * rowH + 10;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="${esc(o.title)}">`;
    o.rows.forEach((r, i) => {
      const y = 5 + i * rowH; let x = L;
      s += `<text class="ax" x="${L - 8}" y="${y + 24}" text-anchor="end">${esc(r[0])}</text>`;
      r[1].forEach((v, j) => { const w = v / 100 * (W - L - Rr); s += `<rect class="seg" data-r="${i}" data-j="${j}" x="${x}" y="${y + 6}" width="${Math.max(0, w - 2)}" height="${rowH - 14}" rx="3" style="fill:${o.colors[j]}"/>`; if (w > 44) s += `<text class="in" x="${x + w / 2}" y="${y + 28}" text-anchor="middle">${fmt(v)} %</text>`; x += w; });
    });
    el.innerHTML = s + "</svg>" + `<div class="clegend">${o.keys.map((k, j) => `<span><i class="sw" style="background:${o.colors[j]}"></i>${esc(k)}</span>`).join("")}</div>`;
    el.querySelectorAll(".seg").forEach(g => { g.onmousemove = e => show(e, `<b>${esc(o.rows[g.dataset.r][0])}</b><br>${esc(o.keys[g.dataset.j])}: ${fmt(o.rows[g.dataset.r][1][g.dataset.j])} %`); g.onmouseleave = hide; });
  }

  const COL = { us: "#1f5fa8", ca: "#c8571f", mx: "#2f8a5a", grey: "#a9b8c8" };
  const US_POP = [[1790, 3.93], [1800, 5.31], [1810, 7.24], [1820, 9.64], [1830, 12.87], [1840, 17.07], [1850, 23.19], [1860, 31.44], [1870, 38.56], [1880, 50.19], [1890, 62.98], [1900, 76.21], [1910, 92.23], [1920, 106.02], [1930, 123.2], [1940, 132.16], [1950, 151.33], [1960, 179.32], [1970, 203.21], [1980, 226.55], [1990, 248.71], [2000, 281.42], [2010, 308.75], [2020, 331.45]];
  const CA_POP = [[1871, 3.69], [1881, 4.32], [1891, 4.83], [1901, 5.37], [1911, 7.21], [1921, 8.79], [1931, 10.38], [1941, 11.51], [1951, 14.01], [1961, 18.24], [1971, 21.57], [1981, 24.34], [1991, 27.3], [2001, 30.01], [2011, 33.48], [2021, 36.99]];
  const TRADE = [[1993, 211.6, 81.5], [2000, 409.7, 247.2], [2010, 526.9, 393.7], [2020, 526.2, 536.0], [2025, 715.5, 871.6]];
  function charts() {
    const top = ids.filter(id => REGION_STATS[id]).map(id => [name(id), REGION_STATS[id].pop / 1e6, id.startsWith("US_") ? COL.us : COL.ca]).sort((a, b) => b[1] - a[1]).slice(0, 12);
    c.innerHTML = `
<section class="chartbox"><h2>Vývoj počtu obyvatel USA</h2><p class="muted">Milionů obyvatel podle sčítání lidu (U.S. Census Bureau).</p><div id="g1"></div>${tableOf(["Rok", "mil. obyvatel"], US_POP)}</section>
<section class="chartbox"><h2>Vývoj počtu obyvatel Kanady</h2><p class="muted">Milionů obyvatel podle sčítání lidu (Statistics Canada). Od roku 1951 včetně Newfoundlandu.</p><div id="g2"></div>${tableOf(["Rok", "mil. obyvatel"], CA_POP)}</section>
<section class="chartbox"><h2>Obchod USA se sousedy</h2><p class="muted">Vývoz a dovoz zboží dohromady v miliardách USD (U.S. Census Bureau). Po vstupu NAFTA v roce 1994 obchod rychle rostl, od roku 2023 je Mexiko největším obchodním partnerem USA.</p><div id="g3"></div>${tableOf(["Rok", "s Kanadou", "s Mexikem"], TRADE)}</section>
<section class="chartbox"><h2>Nejlidnatější státy a provincie</h2><p class="muted">Milionů obyvatel (USA sčítání 2020, Kanada 2021). <i class="sw" style="background:${COL.us}"></i>USA <i class="sw" style="background:${COL.ca}"></i>Kanada</p><div id="g4"></div>${tableOf(["Jednotka", "mil. obyvatel"], top.map(r => [r[0], r[1]]))}</section>
<section class="chartbox"><h2>HDP na obyvatele (2025)</h2><p class="muted">USD, World Bank.</p><div id="g5"></div></section>
<section class="chartbox"><h2>Struktura hospodářství</h2><p class="muted">Podíl sektorů na HDP v %, poslední dostupný rok (World Bank). Zbytek do 100 % tvoří hlavně daně z produktů.</p><div id="g6"></div></section>`;
    line(document.getElementById("g1"), { title: "Obyvatelé USA", unit: "mil.", ticks: [1800, 1850, 1900, 1950, 2000], series: [{ name: "USA", color: COL.us, pts: US_POP }] });
    line(document.getElementById("g2"), { title: "Obyvatelé Kanady", unit: "mil.", ticks: [1880, 1920, 1960, 2000], series: [{ name: "Kanada", color: COL.ca, pts: CA_POP }] });
    line(document.getElementById("g3"), { title: "Obchod USA", unit: "mld. USD", ticks: [1993, 2000, 2010, 2020, 2025], series: [{ name: "s Kanadou", color: COL.ca, dots: true, pts: TRADE.map(r => [r[0], r[1]]) }, { name: "s Mexikem", color: COL.mx, dots: true, pts: TRADE.map(r => [r[0], r[2]]) }] });
    bars(document.getElementById("g4"), { title: "Nejlidnatější jednotky", unit: "mil. obyvatel", rows: top, dec: 1 });
    bars(document.getElementById("g5"), { title: "HDP na obyvatele", unit: "USD", dec: 0, rows: [["USA", 90027, COL.us], ["Kanada", 55698, COL.ca], ["Mexiko", 13889, COL.mx]] });
    stack(document.getElementById("g6"), { title: "Struktura HDP", keys: ["služby", "průmysl", "zemědělství", "ostatní"], colors: ["#1f5fa8", "#c8571f", "#2f8a5a", COL.grey], rows: [["USA", [76.3, 17.6, 0.9, 5.2]], ["Kanada", [64.1, 27.4, 1.9, 6.6]], ["Mexiko", [58.9, 30.6, 3.9, 6.6]]] });
  }

  const TABS = { mapy: ["Tematické mapy", maps], osa: ["Časová osa", timeline], grafy: ["Grafy", charts] };
  tabs.innerHTML = Object.entries(TABS).map(([k, v]) => `<button role="tab" data-t="${k}">${v[0]}</button>`).join("");
  function open(h) {
    const [k, sub] = h.split("-"), key = TABS[k] ? k : "mapy";
    tabs.querySelectorAll("button").forEach(b => b.setAttribute("aria-selected", b.dataset.t === key));
    hide(); TABS[key][1](sub); history.replaceState(null, "", "#" + (sub ? h : key));
  }
  tabs.onclick = e => { if (e.target.dataset.t) open(e.target.dataset.t); };
  open(location.hash.slice(1));
})();
