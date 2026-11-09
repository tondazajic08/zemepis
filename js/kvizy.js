(function () {
  const Q = window.QUIZ, app = document.getElementById("app"), esc = Atlas.esc;
  const pick = (a, n) => shuffle(a).slice(0, n);
  const fromList = (l, cat) => l.map(q => ({ text: q[0], correct: q[1][0], options: q[1], ex: q[2], cat }));
  function fromMap(m) {
    const wrong = pick(Q.pools[m.pool].filter(x => x !== m.a), 3);
    const text = m.t === "region" ? "Která oblast je na mapě zvýrazněná?" : m.t === "point" ? "Které město je na mapě označené?" : "Který přírodní útvar je na mapě zvýrazněný?";
    return { text, correct: m.a, options: [m.a].concat(wrong), ex: m.ex, map: m, cat: "Poznávačka" };
  }
  const KINDS = {
    usa: { n: "USA", d: "Geografie, politika a hospodářství", get: () => fromList(Q.usa, "USA") },
    kanada: { n: "Kanada", d: "Provincie, města a přírodní podmínky", get: () => fromList(Q.kanada, "Kanada") },
    nafta: { n: "NAFTA", d: "Historie a ekonomické vztahy", get: () => fromList(Q.nafta, "NAFTA") },
    map: { n: "Poznávačka", d: "Určování měst, oblastí a přírodních útvarů na mapě", get: () => pick(Q.map, 15).map(fromMap) },
    mat: { n: "Maturitní test", d: "20 otázek ze všech kapitol, pokaždé jiný výběr", get: () => pick(fromList(Q.usa, "USA"), 6).concat(pick(fromList(Q.kanada, "Kanada"), 6), pick(fromList(Q.nafta, "NAFTA"), 5), pick(Q.map, 3).map(fromMap)) }
  };
  const BLIND = {
    us_r: { n: "USA: státy", d: "Najdi na slepé mapě všech 50 států", c: "US", m: "region" },
    us_c: { n: "USA: hlavní města", d: "Ke hlavnímu městu najdi správný stát", c: "US", m: "capital" },
    us_p: { n: "USA: města a příroda", d: "Klikni na bod na slepé mapě", c: "US", m: "point" },
    ca_r: { n: "Kanada: provincie a teritoria", d: "Najdi všech 13 jednotek", c: "CA", m: "region" },
    ca_c: { n: "Kanada: hlavní města", d: "Ke hlavnímu městu najdi provincii", c: "CA", m: "capital" },
    ca_p: { n: "Kanada: města a příroda", d: "Klikni na bod na slepé mapě", c: "CA", m: "point" }
  };
  function blind(k) {
    const b = BLIND[k], isC = id => id.startsWith(b.c + "_") && id !== "US_DC", N = window.BLIND_NAMES;
    let items;
    if (b.m === "point") items = Q.points[b.c].map(p => ({ id: p[0], label: p[0], at: p[1] }));
    else items = GEO.regions.filter(r => isC(r.id)).map(r => ({ id: r.id, label: b.m === "capital" ? N[r.id][1] : N[r.id][0], reg: N[r.id][0] }));
    items = shuffle(items);
    app.innerHTML = `<div class="blind"><div class="bprompt"><span>${b.m === "capital" ? "Ve kterém státě nebo provincii je hlavní město" : "Klikni na"}<br><strong id="bq"></strong></span><span id="bs"></span><button class="btn ghost" id="bx" style="padding:6px 14px">Přeskočit</button></div><div class="bmap" id="bm"></div><div class="bfb" id="bf" aria-live="polite"></div><div class="rownext"><button class="btn ghost" id="bb">Jiný kvíz</button></div></div>`;
    const el = document.getElementById("bm"), us = b.c === "US", pts = b.m === "point";
    Atlas.draw(el, { view: us ? "usi" : "canada", ak: us, hit: !pts, grid: false, inset: true, title: "Slepá mapa", dim: id => !id.startsWith(b.c + "_"), fs: 1, names: {} });
    const svg = el.querySelector("svg"), NS = "http://www.w3.org/2000/svg";
    el.querySelectorAll(".rg.hit").forEach(p => { p.removeAttribute("aria-label"); if (!isC(p.dataset.id)) { p.classList.remove("hit"); p.removeAttribute("data-id"); p.removeAttribute("tabindex"); p.style.pointerEvents = "none"; } });
    const vb = svg.viewBox.baseVal, r = Math.max(vb.width, vb.height) / 90;
    if (pts) items.forEach(it => { const c = Atlas.project(it.at[0], it.at[1]), o = document.createElementNS(NS, "circle"); o.setAttribute("cx", c[0]); o.setAttribute("cy", c[1]); o.setAttribute("r", r); o.setAttribute("class", "pt"); o.setAttribute("data-pt", it.id); o.setAttribute("tabindex", "0"); svg.appendChild(o); });
    const find = id => el.querySelector(pts ? `[data-pt="${CSS.escape(id)}"]` : `[data-id="${id}"]`);
    let i = 0, score = 0, lock = false; const wrong = [];
    const fb = document.getElementById("bf");
    function ask() { document.getElementById("bq").textContent = items[i].label; document.getElementById("bs").textContent = `${i + 1} / ${items.length} · Body: ${score}`; }
    function adv() { lock = false; fb.textContent = ""; fb.className = "bfb"; i++; if (i >= items.length) finish(); else ask(); }
    function finish() { result({ k: null, blindKey: k, qs: items, score, wrong }); }
    function clickOn(id) {
      if (lock) return; lock = true;
      const it = items[i], t = find(it.id), ok = id === it.id;
      if (ok) { score++; t.classList.add("ok"); fb.textContent = "Správně"; fb.className = "bfb good"; }
      else { const w = find(id); if (w) { w.classList.add("no"); setTimeout(() => w.classList.remove("no"), 1300); } t.classList.add("show"); const nm = pts ? it.label : it.reg; fb.textContent = "Špatně, správně je to zvýrazněné: " + nm; fb.className = "bfb bad"; wrong.push({ q: it.label, your: pts ? id : N[id][0], right: pts ? it.label : it.reg, ex: "Zapamatuj si polohu na mapě." }); setTimeout(() => { t.classList.remove("show"); t.classList.add("no-mark"); }, 1300); }
      setTimeout(adv, ok ? 550 : 1450);
    }
    el.addEventListener("click", e => { const id = e.target.dataset && (e.target.dataset.id || e.target.dataset.pt); if (id) clickOn(id); });
    el.addEventListener("keydown", e => { if (e.key !== "Enter" && e.key !== " ") return; const id = e.target.dataset.id || e.target.dataset.pt; if (id) { e.preventDefault(); clickOn(id); } });
    document.getElementById("bx").onclick = () => { if (lock) return; const it = items[i]; wrong.push({ q: it.label, your: "přeskočeno", right: pts ? it.label : it.reg, ex: "Otázka byla přeskočena." }); const t = find(it.id); t.classList.add("show"); lock = true; setTimeout(() => { t.classList.remove("show"); adv(); }, 900); };
    document.getElementById("bb").onclick = menu;
    ask(); document.querySelector(".blind").scrollIntoView({ block: "start" });
  }
  window.__blind = { BLIND, blind };
  function menu() {
    history.replaceState(null, "", location.pathname);
    const card = (a, k, v) => `<button class="card" style="text-align:left;cursor:pointer;font:inherit;color:inherit" ${a}="${k}"><h3>${v.n}</h3><p>${v.d}</p></button>`;
    app.innerHTML = `<h2 class="grouph">Slepá mapa</h2><div class="cards">${Object.entries(BLIND).map(([k, v]) => card("data-b", k, v)).join("")}</div><h2 class="grouph">Otázky A/B/C/D</h2><div class="cards">${Object.entries(KINDS).map(([k, v]) => card("data-k", k, v)).join("")}</div>`;
    app.querySelectorAll("[data-k]").forEach(b => b.onclick = () => start(b.dataset.k));
    app.querySelectorAll("[data-b]").forEach(b => b.onclick = () => blind(b.dataset.b));
  }
  function start(k) {
    const qs = shuffle(KINDS[k].get()).map(q => Object.assign({}, q, { options: shuffle(q.options) }));
    const st = { k, qs, i: 0, score: 0, wrong: [] };
    show(st); scrollTo({ top: 0 });
  }
  function drawMap(el, m) {
    const o = { view: m.view || (m.id && m.id.startsWith("CA_") ? "canada" : m.t === "region" ? "us" : "all"), grid: false, title: "Mapa k otázce", inset: false, fs: 1 };
    if (m.t === "region") o.fills = { [m.id]: "c2" };
    if (m.t === "point") o.markers = [{ at: m.at, c: "c2", big: 1 }];
    if (m.t === "line") o.lines = [{ pts: Atlas.F[m.key], c: m.c }];
    Atlas.draw(el, o);
  }
  function show(st) {
    const q = st.qs[st.i], L = "ABCD";
    app.innerHTML = `<div class="quizbox"><div class="qhead"><span>${KINDS[st.k].n} · otázka ${st.i + 1} z ${st.qs.length}</span><span>Body: ${st.score}</span></div><div class="qbar"><i style="width:${st.i / st.qs.length * 100}%"></i></div><h2 class="q">${esc(q.text)}</h2>${q.map ? '<div class="qmap" id="qm"></div>' : ""}<div class="opts">${q.options.map((o, i) => `<button class="opt" data-o="${esc(o)}"><b>${L[i]}</b><span>${esc(o)}</span></button>`).join("")}</div><div id="fb"></div></div>`;
    if (q.map) drawMap(document.getElementById("qm"), q.map);
    const btns = [...app.querySelectorAll(".opt")];
    btns.forEach(b => b.onclick = () => {
      const chosen = q.options[btns.indexOf(b)], ok = chosen === q.correct;
      btns.forEach((x, i) => { x.disabled = true; if (q.options[i] === q.correct) x.classList.add("right"); });
      if (!ok) { b.classList.add("wrong"); st.wrong.push({ q: q.text, your: chosen, right: q.correct, ex: q.ex }); } else st.score++;
      const last = st.i === st.qs.length - 1;
      document.getElementById("fb").innerHTML = `<div class="expl"><b>${ok ? "Správně" : "Špatně, správná odpověď je: " + esc(q.correct)}</b>${esc(q.ex)}</div><div class="rownext"><button class="btn dark" id="nx">${last ? "Zobrazit výsledek" : "Další otázka"}</button></div>`;
      document.querySelector(".qhead span:last-child").textContent = "Body: " + st.score;
      const nx = document.getElementById("nx"); nx.focus({ preventScroll: true });
      nx.onclick = () => { if (last) result(st); else { st.i++; show(st); } };
    });
  }
  function result(st) {
    const pct = Math.round(st.score / st.qs.length * 100);
    const v = pct >= 85 ? "Výborně, látku máš pevně v hlavě." : pct >= 65 ? "Dobrý základ. Zopakuj si otázky níže." : "Projdi si ještě rozšířené informace a kartičky, pak to zkus znovu.";
    app.innerHTML = `<div class="quizbox"><div class="result"><div class="pct">${pct} %</div><p>${st.score} z ${st.qs.length} bodů. ${v}</p><div class="rownext" style="justify-content:center"><button class="btn dark" id="again">Zkusit znovu</button><button class="btn ghost" id="back">Jiný kvíz</button></div></div>${st.wrong.length ? `<div class="review"><h2 style="font-size:26px;margin-bottom:12px">K zopakování</h2>${st.wrong.map(w => `<div class="card"><b>${esc(w.q)}</b><p>Tvá odpověď: ${esc(w.your)}<br>Správně: <b>${esc(w.right)}</b><br>${esc(w.ex)}</p></div>`).join("")}</div>` : ""}</div>`;
    document.getElementById("again").onclick = () => st.blindKey ? blind(st.blindKey) : start(st.k);
    document.getElementById("back").onclick = menu;
    scrollTo({ top: 0 });
  }
  window.__quiz = { KINDS, start };
  const h = location.hash.slice(1);
  if (KINDS[h]) start(h); else if (BLIND[h]) blind(h); else menu();
})();
