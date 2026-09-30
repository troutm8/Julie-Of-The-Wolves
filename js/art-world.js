// Backgrounds: the tundra under the midnight sun, skies, the seal-camp shore.
(function (JW) {
  'use strict';
  const { smooth, poly, path, g, el, f, shade, tint, INK } = JW;

  const SKIES = {
    // "A yellow disk in a lime-green sky": early evening, when the wolves wake.
    lime: { top: '#a9d27e', mid: '#d4e89a', low: '#f1f2bd', sun: '#ffd84a', far: '#8ea58f', land: '#b0a55a', land2: '#9a8f47', heave: '#9aa052', line: '#7d7a3b' },
    day: { top: '#7fb9e0', mid: '#b9dcef', low: '#e6f3f2', sun: '#fff1a8', far: '#93a9a6', land: '#a9a25e', land2: '#8f8a4a', heave: '#9ba455', line: '#7a773f' },
    gold: { top: '#8aa6c8', mid: '#f0c27a', low: '#f9dd99', sun: '#ffd35a', far: '#a08a8a', land: '#b39655', land2: '#957a42', heave: '#a0934f', line: '#7d6a3a' },
    dusk: { top: '#4a4f86', mid: '#b5739a', low: '#f2b27d', sun: '#ffb45a', far: '#6e5f7a', land: '#8c7a58', land2: '#6e6048', heave: '#7d7a55', line: '#5a4f3c' },
    grey: { top: '#9fa9b0', mid: '#c4cacb', low: '#dfe1dc', sun: null, far: '#8e9794', land: '#a29d6c', land2: '#878356', heave: '#949a61', line: '#6f6d49' },
    night: { top: '#0d1433', mid: '#1f2d5c', low: '#3a4f7e', sun: null, far: '#2d3a58', land: '#3d4a4a', land2: '#2c3636', heave: '#44524d', line: '#27302e', stars: true },
    sunset: { top: '#3d4f8a', mid: '#e0897a', low: '#fbc774', sun: '#ff9e45', far: '#6d5a78', land: '#8a7650', land2: '#6b5a3e', heave: '#7e7650', line: '#584a33' },
    memory: { top: '#e8c98d', mid: '#f3dcaa', low: '#f8ead0', sun: '#fff4d0', far: '#b8a58a', land: '#c9b287', land2: '#b39c73', heave: '#bfa878', line: '#9a8563' }
  };
  JW.SKIES = SKIES;

  function sky(w, h, P, hz, o) {
    const id = JW.uid('sk');
    const grad = el('linearGradient', { id, x1: 0, y1: 0, x2: 0, y2: 1 },
      el('stop', { offset: 0, 'stop-color': P.top }) + el('stop', { offset: 0.55, 'stop-color': P.mid }) + el('stop', { offset: 1, 'stop-color': P.low }));
    let s = el('defs', {}, grad) + el('rect', { x: -5, y: -5, width: w + 10, height: hz + 10, fill: `url(#${id})` });
    o = o || {};
    if (o.aurora) {
      const rnd = JW.rng('aurora' + w);
      for (let i = 0; i < 3; i++) {
        const y0 = hz * (0.18 + i * 0.12);
        const pts = [];
        for (let x = -40; x <= w + 40; x += w / 6) pts.push([x, y0 + Math.sin(x / w * 5 + i) * hz * 0.08 + rnd() * 10]);
        const top = pts.map((p) => [p[0], p[1] - hz * (0.1 + 0.05 * i)]).reverse();
        s += path(smooth(pts.concat(top), true, 0.8), i === 1 ? '#7fe0a8' : '#5fd6b9', 0, { opacity: 0.28 - i * 0.05 });
      }
    }
    if (P.stars || o.stars) {
      const rnd = JW.rng('stars' + w + 'x' + h);
      const n = Math.round(w * hz / 2600);
      for (let i = 0; i < n; i++) {
        const x = rnd() * w, y = rnd() * hz * 0.95, r = 0.8 + rnd() * 1.8;
        s += el('circle', { cx: x, cy: y, r, fill: '#fdf6d8', opacity: 0.6 + rnd() * 0.4 });
      }
      if (o.northStar) {
        const [x, y] = [o.northStar[0] * w, o.northStar[1] * h];
        s += path(`M${f(x)} ${f(y - 14)}L${f(x + 3)} ${f(y - 3)}L${f(x + 14)} ${f(y)}L${f(x + 3)} ${f(y + 3)}L${f(x)} ${f(y + 14)}L${f(x - 3)} ${f(y + 3)}L${f(x - 14)} ${f(y)}L${f(x - 3)} ${f(y - 3)}Z`, '#fff6c4', 1.2);
      }
    }
    if (o.moon) {
      const [x, y, r] = [o.moon[0] * w, o.moon[1] * h, (o.moon[2] || 0.04) * w];
      s += el('circle', { cx: x, cy: y, r, fill: '#f6efd2', stroke: INK, 'stroke-width': 2.2 });
      s += el('circle', { cx: x + r * 0.35, cy: y - r * 0.2, r: r * 0.85, fill: P.top });
    }
    return s;
  }

  function sun(x, y, r, P, lw, rays) {
    let s = '';
    if (!P.sun) return s;
    s += el('circle', { cx: x, cy: y, r: r * 1.6, fill: tint(P.sun, 0.55), opacity: 0.55 });
    if (rays !== false) {
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 + 0.2;
        s += path(`M${f(x + Math.cos(a) * r * 1.3)} ${f(y + Math.sin(a) * r * 1.3)}L${f(x + Math.cos(a) * r * 1.75)} ${f(y + Math.sin(a) * r * 1.75)}`, 'none', lw * 0.6, { stroke: shade(P.sun, 0.35) });
      }
    }
    s += el('circle', { cx: x, cy: y, r: r, fill: P.sun, stroke: INK, 'stroke-width': lw * 0.8 });
    return s;
  }

  function cloud(x, y, s, lw, color) {
    const pts = [[-40, 0], [-34, -10], [-18, -16], [-6, -24], [12, -22], [24, -12], [40, -10], [48, 0]].map((p) => [x + p[0] * s, y + p[1] * s]);
    return path(smooth(pts, true, 0.9), color || '#fbf8ea', lw * 0.7);
  }

  function tuft(x, y, s, color, lw) {
    const d = `M${f(x - 6 * s)} ${f(y - 9 * s)}Q${f(x - 2 * s)} ${f(y - 3 * s)} ${f(x)} ${f(y)}M${f(x)} ${f(y - 12 * s)}L${f(x)} ${f(y)}M${f(x + 6 * s)} ${f(y - 9 * s)}Q${f(x + 2 * s)} ${f(y - 3 * s)} ${f(x)} ${f(y)}`;
    return path(d, 'none', lw, { stroke: color });
  }

  function cotton(x, y, s, lw) {
    return path(`M${f(x)} ${f(y)}Q${f(x + 2 * s)} ${f(y - 10 * s)} ${f(x + 1 * s)} ${f(y - 18 * s)}`, 'none', lw * 0.7, { stroke: '#5e5a2c' }) +
      el('circle', { cx: x + 1 * s, cy: y - 21 * s, r: 3.6 * s, fill: '#fffdf4', stroke: INK, 'stroke-width': lw * 0.55 });
  }

  function heave(w, h, H, P, lw, rnd) {
    const x = H.x * w, y = H.y * h, W = H.w * w, T = H.h * h;
    const color = H.color || P.heave;
    const pts = [[x - W / 2, y + 30], [x - W / 2, y], [x - W * 0.36, y - T * 0.55], [x - W * 0.12, y - T * 0.97], [x + W * 0.12, y - T], [x + W * 0.36, y - T * 0.56], [x + W / 2, y], [x + W / 2, y + 30]];
    const d = smooth(pts.slice(1, 7), false, 1);
    let s = '';
    const clip = JW.uid('hv');
    const shape = d + `L${f(x + W / 2)} ${f(y + T * 0.3 + 40)}L${f(x - W / 2)} ${f(y + T * 0.3 + 40)}Z`;
    s += el('clipPath', { id: clip }, path(shape, '#000'));
    s += path(shape, color, 0);
    // Shade the far side, light the near side
    s += g(el('ellipse', { cx: x + W * 0.32, cy: y, rx: W * 0.34, ry: T * 1.1, fill: shade(color, 0.16) }) +
      el('ellipse', { cx: x - W * 0.12, cy: y - T * 0.8, rx: W * 0.12, ry: T * 0.09, fill: tint(color, 0.12) }), { 'clip-path': `url(#${clip})` });
    s += path(d, 'none', lw);
    if (H.den) {
      const dx = x + W * (H.den.x || 0.12), dy = y - T * (H.den.y || 0.25), dr = W * (H.den.r || 0.07);
      s += el('ellipse', { cx: dx, cy: dy + dr * 0.2, rx: dr * 1.7, ry: dr * 0.55, fill: tint(color, 0.1), stroke: INK, 'stroke-width': lw * 0.6 });
      s += el('ellipse', { cx: dx, cy: dy - dr * 0.25, rx: dr, ry: dr * 0.72, fill: '#2a2018', stroke: INK, 'stroke-width': lw * 0.8 });
    }
    const n = H.tufts == null ? Math.round(W / 40) : H.tufts;
    for (let i = 0; i < n; i++) {
      const t = 0.08 + rnd() * 0.84;
      const tx = x - W / 2 + t * W;
      const u = Math.abs(t - 0.5) * 2;
      const ty = y - T * (1 - u * u) * 0.98 + 2;
      s += tuft(tx, ty, (H.ts || 1) * (0.7 + rnd() * 0.6) * Math.max(0.5, W / 400), shade(color, 0.4), lw * 0.55);
    }
    return s;
  }

  // Frost-cracked tundra polygons, compressed toward the horizon.
  function polygons(w, h, hz, bottom, color, lw, rnd) {
    let s = '';
    const rows = 9;
    let prev = null;
    for (let i = 1; i <= rows; i++) {
      const t = i / rows;
      const y = hz + (bottom - hz) * t * t;
      const cell = 30 + t * t * 260;
      const pts = [];
      for (let x = -20; x <= w + 40; x += cell * (0.7 + rnd() * 0.5)) pts.push([x, y + (rnd() - 0.5) * cell * 0.12]);
      s += path(smooth(pts, false, 0.6), 'none', lw * (0.35 + t * 0.5), { stroke: color, opacity: 0.8 });
      if (prev) {
        for (let j = 0; j < pts.length; j += 1) {
          if (rnd() < 0.35) continue;
          const x = pts[j][0] + (rnd() - 0.5) * cell * 0.3;
          s += path(`M${f(x)} ${f(prev)}L${f(x + (x - w / 2) * 0.08 * t)} ${f(pts[j][1])}`, 'none', lw * (0.35 + t * 0.5), { stroke: color, opacity: 0.7 });
        }
      }
      prev = y;
    }
    return s;
  }

  function tundra(w, h, o, lw, seed) {
    const P = Object.assign({}, SKIES[o.sky || 'lime'], o.palette || {});
    const rnd = JW.rng(seed + 'tundra');
    const hz = (o.hz == null ? 0.42 : o.hz) * h;
    let s = sky(w, h, P, hz, o);
    if (o.sunPath) {
      const sp = o.sunPath;
      s += path(`M${f(sp.x0 * w)} ${f(sp.y * h)}Q${f(w * 0.5)} ${f((sp.y - sp.lift) * h)} ${f(sp.x1 * w)} ${f(sp.y * h)}`, 'none', lw * 0.7, { stroke: shade(P.sun || '#fff', 0.35), 'stroke-dasharray': '4 9' });
    }
    if (o.sun !== false && P.sun) {
      const sn = o.sun || [0.78, 0.2];
      s += sun(sn[0] * w, sn[1] * h, (sn[2] || 0.045) * Math.max(w, h * 0.8), P, lw, o.rays);
    }
    (o.clouds || []).forEach((c) => { s += cloud(c[0] * w, c[1] * h, c[2] || 1, lw, P.cloud); });
    // Distant low hills on the horizon line
    const far = [];
    for (let x = -20; x <= w + 40; x += 40) far.push([x, hz - (o.flat ? 0 : (Math.sin(x / (w * 0.13) + rnd()) * 0.5 + 0.5) * h * 0.018)]);
    s += path(smooth(far, false) + `L${w + 40} ${f(hz + 4)}L-20 ${f(hz + 4)}Z`, P.far, lw * 0.5);
    // Ground
    s += el('rect', { x: -5, y: hz, width: w + 10, height: h - hz + 5, fill: P.land });
    const gid = JW.uid('gr');
    s += el('defs', {}, el('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 }, el('stop', { offset: 0, 'stop-color': P.land, 'stop-opacity': 0 }) + el('stop', { offset: 1, 'stop-color': P.land2 })));
    s += el('rect', { x: -5, y: hz, width: w + 10, height: h - hz + 5, fill: `url(#${gid})` });
    s += path(`M-5 ${f(hz)}L${w + 5} ${f(hz)}`, 'none', lw * 0.7);
    if (o.polygons !== false) s += polygons(w, h, hz, h * 1.05, P.line, lw, rnd);
    (o.ponds || []).forEach((p) => {
      s += el('ellipse', { cx: p.x * w, cy: p.y * h, rx: p.w * w / 2, ry: p.h * h / 2, fill: P.mid, stroke: INK, 'stroke-width': lw * 0.6 });
      s += path(`M${f(p.x * w - p.w * w * 0.25)} ${f(p.y * h)}l${f(p.w * w * 0.2)} 0`, 'none', lw * 0.5, { stroke: '#fff' });
    });
    // Scattered tufts and cotton grass on the flat ground
    const nt = o.tufts == null ? 14 : o.tufts;
    for (let i = 0; i < nt; i++) {
      const t = rnd();
      const y = hz + (h - hz) * (0.1 + t * t * 0.9);
      const sc = 0.4 + t * t * 2.2;
      s += tuft(rnd() * w, y, sc, P.line, lw * 0.5);
    }
    const nc = o.cotton || 0;
    for (let i = 0; i < nc; i++) {
      const t = 0.3 + rnd() * 0.7;
      s += cotton(rnd() * w, hz + (h - hz) * t, 0.6 + t * 1.2, lw);
    }
    (o.heaves || []).forEach((H) => { s += heave(w, h, H, P, lw, rnd); });
    if (o.fg) {
      const F = Object.assign({ x: 0.5, w: 1.6, h: 0.3, y: 1.02, tufts: 10, ts: 1.6 }, o.fg);
      s += heave(w, h, F, P, lw * 1.1, rnd);
      for (let i = 0; i < (F.cotton || 0); i++) s += cotton(F.x * w - F.w * w * 0.3 + rnd() * F.w * w * 0.6, F.y * h - F.h * h * (0.5 + rnd() * 0.4), 1.4 + rnd(), lw);
    }
    return s;
  }

  function skyOnly(w, h, o, lw, seed) {
    const P = Object.assign({}, SKIES[o.sky || 'lime'], o.palette || {});
    let s = sky(w, h, P, h, o);
    if (o.sunPath) {
      const sp = o.sunPath;
      s += path(`M${f(sp.x0 * w)} ${f(sp.y * h)}Q${f(w * 0.5)} ${f((sp.y - sp.lift * 2) * h)} ${f(sp.x1 * w)} ${f(sp.y * h)}`, 'none', lw * 0.9, { stroke: shade(P.sun || '#fff', 0.4), 'stroke-dasharray': '3 10' });
      (sp.suns || []).forEach((t) => {
        const x = sp.x0 + (sp.x1 - sp.x0) * t;
        const y = sp.y - sp.lift * 2 * 2 * t * (1 - t);
        s += sun(x * w, y * h, 0.03 * w, P, lw, false);
      });
    }
    if (o.sun && P.sun) s += sun(o.sun[0] * w, o.sun[1] * h, (o.sun[2] || 0.06) * w, P, lw, o.rays);
    (o.clouds || []).forEach((c) => { s += cloud(c[0] * w, c[1] * h, c[2] || 1, lw); });
    return s;
  }

  function plain(w, h, o) {
    return el('rect', { x: -5, y: -5, width: w + 10, height: h + 10, fill: o.color || '#f4ecd8' });
  }

  // Comic "burst" background for big moments.
  function burst(w, h, o, lw, seed) {
    const rnd = JW.rng(seed + 'b');
    const c = [(o.cx == null ? 0.5 : o.cx) * w, (o.cy == null ? 0.5 : o.cy) * h];
    let s = el('rect', { x: -5, y: -5, width: w + 10, height: h + 10, fill: o.color || '#f7d86a' });
    const R = Math.hypot(w, h);
    for (let i = 0; i < 44; i++) {
      const a = (i / 44) * Math.PI * 2, da = 0.035 + rnd() * 0.03;
      s += path(poly([c, [c[0] + Math.cos(a - da) * R, c[1] + Math.sin(a - da) * R], [c[0] + Math.cos(a + da) * R, c[1] + Math.sin(a + da) * R]]), o.ray || '#fbe9a6', 0);
    }
    return s;
  }

  // The seal-camp shore on the Bering Sea, for memories of Kapugen.
  function shore(w, h, o, lw, seed) {
    const P = Object.assign({}, SKIES[o.sky || 'memory']);
    const rnd = JW.rng(seed + 'shore');
    const hz = (o.hz || 0.45) * h;
    let s = sky(w, h, P, hz);
    if (o.sun !== false) s += sun(w * (o.sunX || 0.2), hz - h * 0.12, w * 0.04, P, lw, false);
    (o.clouds || []).forEach((c) => { s += cloud(c[0] * w, c[1] * h, c[2] || 1, lw); });
    // Sea
    const sea = o.sea || '#7fa3a8';
    s += el('rect', { x: -5, y: hz, width: w + 10, height: h * 0.2, fill: sea });
    for (let i = 0; i < 9; i++) {
      const y = hz + h * 0.02 + (i % 3) * h * 0.05 + rnd() * h * 0.02, x = rnd() * w;
      s += path(`M${f(x)} ${f(y)}q${f(8)} ${f(-5)} ${f(16)} 0q${f(8)} ${f(-5)} ${f(16)} 0`, 'none', lw * 0.5, { stroke: tint(sea, 0.5) });
    }
    s += path(`M-5 ${f(hz)}L${w + 5} ${f(hz)}`, 'none', lw * 0.6);
    // Beach
    const beachY = hz + h * 0.18;
    const beach = [];
    for (let x = -20; x <= w + 40; x += 50) beach.push([x, beachY + Math.sin(x / 70) * 6]);
    s += path(smooth(beach, false) + `L${w + 40} ${h + 5}L-20 ${h + 5}Z`, o.sand || '#b8a78c', lw);
    s += path(smooth(beach.map((p) => [p[0] + 20, p[1] + 6]), false), 'none', lw * 0.5, { stroke: '#f3eee0' });
    for (let i = 0; i < 16; i++) {
      const x = rnd() * w, y = beachY + 20 + rnd() * (h - beachY);
      s += el('ellipse', { cx: x, cy: y, rx: 2 + rnd() * 4, ry: 1.5 + rnd() * 2, fill: shade(o.sand || '#b8a78c', 0.25) });
    }
    return s;
  }

  JW.art.scenes = { tundra, sky: skyOnly, plain, burst, shore };
  JW.art.bits = { heave, tuft, cotton, cloud, sun };
})(window.JW);
