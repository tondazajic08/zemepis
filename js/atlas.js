/* Vykreslování map ze společných dat (Natural Earth, Lambertova projekce). */
window.Atlas = (function () {
  const G = window.GEO, p = G.p, R = Math.PI / 180, q = Math.PI / 4;
  const n = Math.log(Math.cos(p.p1 * R) / Math.cos(p.p2 * R)) / Math.log(Math.tan(q + p.p2 * R / 2) / Math.tan(q + p.p1 * R / 2));
  const F = Math.cos(p.p1 * R) * Math.pow(Math.tan(q + p.p1 * R / 2), n) / n;
  const rho0 = F / Math.pow(Math.tan(q + p.lat0 * R / 2), n);

  function project(lon, lat) {
    if (lon > 0) lon -= 360;
    const rho = F / Math.pow(Math.tan(q + lat * R / 2), n), t = n * (lon - p.lon0) * R;
    let x = p.ox + p.S * rho * Math.sin(t), y = p.oy - p.S * (rho0 - rho * Math.cos(t));
    if (lon < -150 && lat < 30) { x += G.hi[0]; y += G.hi[1]; }
    return [x, y];
  }

  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const isLower48 = id => id.startsWith("US_") && id !== "US_AK" && id !== "US_HI";

  function box(pred, extra) {
    let a = [1e9, 1e9, -1e9, -1e9];
    G.regions.filter(r => pred(r.id)).forEach(r => {
      a = [Math.min(a[0], r.b[0]), Math.min(a[1], r.b[1]), Math.max(a[2], r.b[2]), Math.max(a[3], r.b[3])];
    });
    (extra || []).forEach(ll => {
      const c = project(ll[0], ll[1]);
      a = [Math.min(a[0], c[0]), Math.min(a[1], c[1]), Math.max(a[2], c[0]), Math.max(a[3], c[1])];
    });
    return a;
  }

  const views = {
    all: () => box(() => true),
    us: () => box(id => id.startsWith("US_")),
    lower: () => box(isLower48, [[-64, 40]]),
    usi: () => box(id => isLower48(id) || id === "US_HI", [[-100, 21.5], [-64, 40]]),
    canada: () => box(id => id.startsWith("CA_")),
    south: () => box(isLower48, [[-125, 58], [-60, 58], [-55, 47]]),
    nafta: () => box(() => true, [[-98, 14.5], [-118, 15]]),
    hero: () => box(() => true, [[-90, 7], [-30, 60], [-40, 83]])
  };

  function linePath(pts, close) {
    return "M" + pts.map(c => project(c[0], c[1]).map(v => v.toFixed(1)).join(",")).join(" ") + (close ? "z" : "");
  }

  function graticule() {
    let s = "";
    for (let la = 10; la <= 80; la += 10) {
      const a = []; for (let lo = -180; lo <= -20; lo += 4) a.push([lo, la]);
      s += `<path class="sea-line" d="${graticulePath(a)}"/>`;
    }
    for (let lo = -180; lo <= -20; lo += 10) {
      const a = []; for (let la = 0; la <= 84; la += 4) a.push([lo, la]);
      s += `<path class="sea-line" d="${graticulePath(a)}"/>`;
    }
    return s;
  }
  function graticulePath(pts) { return "M" + pts.map(c => { const lon = c[0]; const rho = F / Math.pow(Math.tan(q + c[1] * R / 2), n), t = n * (lon - p.lon0) * R; return (p.ox + p.S * rho * Math.sin(t)).toFixed(1) + "," + (p.oy - p.S * (rho0 - rho * Math.cos(t))).toFixed(1); }).join(" "); }

  /* o: view, pad, fs, fills{id:cls}, dim(id)->bool, ctxFill{code:cls}, areas, lines, markers, texts, hit, grid, legend, title */
  function draw(el, o) {
    o = o || {};
    const raw = typeof o.view === "string" ? views[o.view]() : (o.view || views.all());
    const w0 = raw[2] - raw[0], h0 = raw[3] - raw[1], pad = (o.pad === undefined ? 0.025 : o.pad) * Math.max(w0, h0);
    const v = [raw[0] - pad, raw[1] - pad, w0 + 2 * pad, h0 + 2 * pad];
    const fs = (o.fs || 1) * Math.max(v[2], v[3] * 1.05) / 38;
    let s = `<svg viewBox="${v.map(x => x.toFixed(1)).join(" ")}" role="img" aria-label="${esc(o.title || "Mapa")}" preserveAspectRatio="xMidYMid meet">`;
    if (o.grid !== false) s += graticule();
    for (const c in G.ctx) s += `<path class="ct ${(o.ctxFill && o.ctxFill[c]) || ""}" d="${G.ctx[c].d}"/>`;
    let akf = null, akHtml = "";
    if (o.ak) {
      const r = G.regions.find(x => x.id === "US_AK"), cx = (r.b[0] + r.b[2]) / 2, cy = (r.b[1] + r.b[3]) / 2, T = project(-106, 25.8), k = 0.3;
      akf = c => [T[0] + k * (c[0] - cx), T[1] + k * (c[1] - cy)];
      const hw = (r.b[2] - r.b[0]) * k / 2 * 1.06, hh = (r.b[3] - r.b[1]) * k / 2 * 1.08;
      akHtml = `<rect class="inset solid" x="${T[0] - hw}" y="${T[1] - hh}" width="${2 * hw}" height="${2 * hh}" rx="3"/><g transform="translate(${T[0]} ${T[1]}) scale(${k}) translate(${-cx} ${-cy})">`;
    }
    G.regions.forEach(r => {
      if (o.ak && r.id === "US_AK") { akHtml += `<path class="rg ${(o.fills && o.fills[r.id]) || ""}" d="${r.d}"/></g>`; return; }
      let c = "rg " + ((o.fills && o.fills[r.id]) || "");
      if (o.dim && o.dim(r.id)) c += " dim";
      if (o.hit) c += " hit";
      const a = o.hit ? ` data-id="${r.id}" tabindex="0" role="button" aria-label="${esc((o.names && o.names[r.id]) || r.n)}"` : "";
      s += `<path class="${c}" d="${r.d}"${a}/>`;
    });
    s += akHtml;
    const hi = G.regions.find(r => r.id === "US_HI");
    if (hi && hi.b[0] > v[0] && hi.b[2] < v[0] + v[2] && hi.b[3] < v[1] + v[3] && o.inset !== false) {
      const m = (hi.b[2] - hi.b[0]) * 0.1;
      s += `<rect class="inset" x="${hi.b[0] - m}" y="${hi.b[1] - m}" width="${hi.b[2] - hi.b[0] + 2 * m}" height="${hi.b[3] - hi.b[1] + 2 * m}" rx="3"/>`;
    }
    (o.areas || []).forEach(a => { s += `<path class="area" d="${linePath(a, true)}"/>`; });
    (o.lines || []).forEach(l => { s += `<path class="ln ${l.c}" d="${linePath(l.pts)}"/>`; });
    s += `<g stroke-width="${(fs * 0.26).toFixed(2)}" font-size="${fs.toFixed(2)}">`;
    (o.markers || []).forEach(m => {
      let c = project(m.at[0], m.at[1]); if (m.ak && akf) c = akf(c);
      const r = fs * (m.big ? 0.48 : 0.34);
      s += `<circle class="mk ${m.c || ""}" cx="${c[0].toFixed(1)}" cy="${c[1].toFixed(1)}" r="${r.toFixed(2)}"/>`;
      if (m.t) {
        const pos = m.pos || "r", g = r + fs * 0.25;
        const dx = pos === "r" ? g : pos === "l" ? -g : 0, dy = pos === "t" ? -g : pos === "b" ? g + fs * 0.7 : fs * 0.34;
        const an = pos === "r" ? "start" : pos === "l" ? "end" : "middle";
        s += `<text x="${(c[0] + dx).toFixed(1)}" y="${(c[1] + dy).toFixed(1)}" text-anchor="${an}">${esc(m.t)}</text>`;
      }
    });
    (o.texts || []).forEach(t => {
      let c = project(t.at[0], t.at[1]); if (t.ak && akf) c = akf(c);
      const k = t.s || 1;
      s += `<text class="${t.c || ""}" x="${c[0].toFixed(1)}" y="${c[1].toFixed(1)}" font-size="${(fs * k).toFixed(2)}" text-anchor="middle">${esc(t.t)}</text>`;
    });
    s += "</g></svg>";
    if (o.legend) s += '<div class="legend">' + o.legend.map(l => `<span class="${l[0]}"><i></i>${esc(l[1])}</span>`).join("") + "</div>";
    el.classList.add("atlas");
    el.innerHTML = s;
  }

  const F_ = {
    rockies: [[-125.5, 57], [-120, 53], [-115.5, 50.3], [-113.5, 48.5], [-111, 46], [-109.5, 43.5], [-106.5, 40], [-105.5, 37], [-106, 34]],
    cascades: [[-121.5, 49], [-121.7, 46], [-122, 43], [-121.5, 41]],
    sierra: [[-121, 40], [-119.5, 38], [-118.3, 36]],
    appalachiansUS: [[-69, 46], [-73, 43.5], [-77, 41], [-80, 38], [-83, 35.5], [-85.5, 34]],
    appalachiansCA: [[-71, 46.2], [-66.5, 47.5], [-65, 46.5], [-60.5, 46.5]],
    mackenzie: [[-117, 61.5], [-122, 63], [-127, 65.5], [-134, 68.5]],
    stlawrence: [[-76.5, 44.2], [-73.5, 45.5], [-71, 46.8], [-67, 49.3], [-64, 49.5]],
    yukon: [[-135, 60.7], [-139, 64], [-141, 65], [-152, 65.5], [-163, 62.5]],
    mississippi: [[-95, 47.2], [-91.5, 44], [-90.2, 38.7], [-90, 35], [-91, 32], [-90, 29.2]],
    shield: [[-115, 67.5], [-115, 62], [-110, 58], [-102, 54.5], [-97, 51], [-92, 48.5], [-85, 46.7], [-80, 45], [-76, 44.5], [-72, 46.8], [-66, 50], [-58, 52], [-60, 57], [-64, 60], [-70, 62], [-78, 62.3], [-77, 56], [-79, 52], [-82, 52.7], [-85, 55.3], [-92, 57], [-94.5, 59], [-93, 63], [-88, 67], [-95, 68.5], [-105, 68]],
    borderMain: [[-123.3, 49], [-95.15, 49], [-95.15, 49.4], [-94.6, 48.7], [-93, 48.6], [-90, 48.1], [-88.4, 48.3], [-84.9, 46.9], [-84.5, 46.5], [-83.5, 46], [-82.5, 45.3], [-82.4, 43], [-83.1, 42.2], [-82.5, 41.7], [-81, 42.2], [-79, 42.85], [-79.05, 43.25], [-79.2, 43.45], [-76.8, 43.63], [-76.3, 44.2], [-75, 45], [-71.5, 45], [-70.3, 45.9], [-69.2, 47.45], [-67.8, 47.1], [-67.8, 45.7], [-67, 44.8]],
    borderAlaska: [[-141, 69.6], [-141, 60.3], [-139, 60], [-137.5, 59], [-133.5, 58.4], [-131, 56], [-130, 54.7]]
  };

  return { project, draw, views, box, isLower48, F: F_, esc };
})();
