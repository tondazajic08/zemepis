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
  function menu() {
    history.replaceState(null, "", location.pathname);
    app.innerHTML = `<div class="cards">${Object.entries(KINDS).map(([k, v]) => `<button class="card" style="text-align:left;cursor:pointer;font:inherit;color:inherit" data-k="${k}"><h3>${v.n}</h3><p>${v.d}</p></button>`).join("")}</div>`;
    app.querySelectorAll("[data-k]").forEach(b => b.onclick = () => start(b.dataset.k));
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
    document.getElementById("again").onclick = () => start(st.k);
    document.getElementById("back").onclick = menu;
    scrollTo({ top: 0 });
  }
  window.__quiz = { KINDS, start };
  const h = location.hash.slice(1);
  if (KINDS[h]) start(h); else menu();
})();
