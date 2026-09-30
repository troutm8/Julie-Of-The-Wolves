// Other animals of the tundra: caribou (more to come: the golden plover, sled dogs).
(function (JW) {
  'use strict';
  const { dir, add, rot, xf, smooth, poly, limb, spiky, path, g, el, f, shade, tint, INK } = JW;

  const CARIBOU_POSES = {
    stand: { tilt: 0, fn: [2, 0], ff: [-4, -2], hn: [18, -28, 4], hf: [24, -22, 6], neck: 120, head: -18 },
    graze: { tilt: 4, fn: [6, 2], ff: [-2, -2], hn: [18, -28, 4], hf: [24, -22, 6], neck: 40, head: -70 },
    alert: { tilt: -3, fn: [0, -2], ff: [-6, -4], hn: [18, -28, 4], hf: [24, -22, 6], neck: 140, head: -8 },
    run: { tilt: -3, fn: [70, 95], ff: [40, 10], hn: [-35, -75, -80], hf: [-12, -60, -40], neck: 105, head: -25 },
    trot: { tilt: 0, fn: [30, 20], ff: [-25, -60], hn: [6, -50, -20], hf: [36, -12, 14], neck: 112, head: -22 }
  };

  function antler(base, k, lw, side) {
    // Main beam sweeping back then up and forward, with a few tines.
    const s0 = side ? 0.86 : 1;
    const P = (x, y) => [base[0] + x * k * s0, base[1] + y * k * s0];
    const beam = `M${f(P(0, 0)[0])} ${f(P(0, 0)[1])}C${f(P(-26, -10)[0])} ${f(P(-26, -10)[1])} ${f(P(-30, -52)[0])} ${f(P(-30, -52)[1])} ${f(P(-10, -78)[0])} ${f(P(-10, -78)[1])}C${f(P(2, -92)[0])} ${f(P(2, -92)[1])} ${f(P(14, -94)[0])} ${f(P(14, -94)[1])} ${f(P(22, -90)[0])} ${f(P(22, -90)[1])}`;
    const tines = [
      [[-22, -40], [-2, -52]], [[-16, -66], [4, -70]], [[-2, -86], [2, -104]], [[-4, -10], [14, -20]], [[14, -20], [22, -16]]
    ].map((t) => `M${f(P(t[0][0], t[0][1])[0])} ${f(P(t[0][0], t[0][1])[1])}L${f(P(t[1][0], t[1][1])[0])} ${f(P(t[1][0], t[1][1])[1])}`).join('');
    const d = beam + tines;
    const col = side ? '#b9a88a' : '#e3d6b8';
    return path(d, 'none', lw * 3.2, { stroke: INK }) + path(d, 'none', lw * 1.6, { stroke: col });
  }

  function caribou(def) {
    return {
      draw: function (spec, lw) {
        const o = Object.assign({ base: '#7b5b3e', dark: '#4a3526', light: '#e8dfca', legs: '#5a4230' }, def, spec.opts || {});
        const pose = Object.assign({}, CARIBOU_POSES[spec.pose] || CARIBOU_POSES.stand, spec.tweak || {});
        const k = (o.size || 1) * (spec.size || 1);
        const M = [0, -92 * k];
        const B = (pts) => xf(pts.map((p) => [p[0] * k, p[1] * k]), M, pose.tilt, 1);
        const Bp = (p) => B([p])[0];
        const contacts = [];
        const leg = (top, angles, lens, far, widths) => {
          let p = top; const pts = [top];
          angles.forEach((a, i) => { p = add(p, dir(a, lens[i] * k)); pts.push(p); });
          const c = far ? shade(o.legs, 0.3) : o.legs;
          let s = '';
          for (let i = pts.length - 2; i >= 0; i--) s += path(limb(pts[i], pts[i + 1], widths[i] * k, widths[i + 1] * k), i === 0 ? (far ? shade(o.base, 0.3) : o.base) : c, lw);
          const end = pts[pts.length - 1];
          // Hoof and white "sock" band above it
          s += path(JW.band(add(end, [0, -9 * k]), add(end, [0, -4 * k]), 9 * k), far ? '#bdb4a0' : o.light, lw * 0.6);
          s += path(poly([[end[0] - 5 * k, end[1] - 4 * k], [end[0] + 7 * k, end[1] - 4 * k], [end[0] + 8 * k, end[1] + 2 * k], [end[0] - 5 * k, end[1] + 2 * k]]), '#241a14', lw * 0.8);
          contacts.push(add(end, [0, 2 * k]));
          return s;
        };
        const front = (a, far) => leg(Bp([52, 8]), a, [44, 44], far, [15, 9, 7]);
        const hind = (a, far) => leg(Bp([-56, 4]), a, [36, 38, 32], far, [30, 10, 7, 6]);
        let s = '';
        s += hind(pose.hf, true) + front(pose.ff, true);
        // Stubby tail
        const tp = Bp([-78, -10]);
        s += el('ellipse', { cx: tp[0] - 4 * k, cy: tp[1] + 2 * k, rx: 7 * k, ry: 10 * k, fill: o.light, stroke: INK, 'stroke-width': lw * 0.8 });
        const body = B([[-70, -18], [-30, -24], [20, -28], [52, -34], [74, -20], [80, 6], [62, 24], [20, 22], [-30, 20], [-64, 18], [-80, 0], [-78, -12]]);
        const bd = smooth(body, true, 0.95);
        const cl = JW.uid('cb');
        s += el('clipPath', { id: cl }, path(bd, '#000'));
        s += path(bd, o.base, lw);
        let m = path(smooth(B([[-60, 12], [-20, 10], [30, 12], [70, 10], [72, 30], [-60, 30]]), true), tint(o.base, 0.35), 0);
        m += path(smooth(B([[-80, -6], [-66, -14], [-62, 4], [-72, 14]]), true), o.light, 0);
        s += g(m, { 'clip-path': `url(#${cl})` }) + path(bd, 'none', lw);
        s += hind(pose.hn, false);
        // Neck with a pale mane
        const nb = Bp([60, -18]);
        const P = add(nb, dir(pose.neck, 50 * k));
        s += path(limb(nb, P, 44 * k, 24 * k), o.base, lw);
        // Pale mane hanging under the neck
        const nv = [P[0] - nb[0], P[1] - nb[1]], nl = Math.hypot(nv[0], nv[1]) || 1;
        const nn = [nv[1] / nl, -nv[0] / nl];
        const side = nn[1] > 0 ? 1 : -1;
        const m0 = add(JW.lerp(nb, P, 0.15), [nn[0] * side * 14 * k, nn[1] * side * 14 * k]);
        const m1 = add(JW.lerp(nb, P, 0.85), [nn[0] * side * 9 * k, nn[1] * side * 9 * k]);
        const hang = JW.furStrip([m1, JW.lerp(m1, m0, 0.5), m0], 12 * k * -side, JW.rng('mane'));
        s += path(poly(hang.concat([add(m0, [-nn[0] * side * 10 * k, -nn[1] * side * 10 * k]), add(m1, [-nn[0] * side * 8 * k, -nn[1] * side * 8 * k])])), o.light, lw * 0.7);
        s += front(pose.fn, false);
        // Head
        const hk = k * 1.3;
        const hd = (pts) => pts.map((p) => add(rot([p[0] * hk, p[1] * hk], -pose.head), P));
        const headPts = hd([[-10, -8], [2, -14], [20, -12], [40, -8], [50, -2], [50, 8], [40, 12], [18, 12], [-2, 10], [-12, 4]]);
        // Far antler, head, near antler
        s += antler(hd([[-4, -12]])[0], k * 0.62, lw, true);
        s += path(smooth(headPts, true, 0.9), o.base, lw);
        s += path(smooth(hd([[30, 4], [48, 2], [50, 8], [40, 12], [26, 10]]), true), '#3a2a1f', lw * 0.6);
        const eye = hd([[16, -4]])[0];
        s += el('circle', { cx: eye[0], cy: eye[1], r: 2.2 * hk, fill: INK });
        const ear = hd([[-4, -10], [-14, -22], [2, -12]]);
        s += path(poly(ear), o.base, lw * 0.8);
        s += antler(hd([[0, -12]])[0], k * 0.62, lw, false);
        let maxY = -1e9; contacts.forEach((p) => { if (p[1] > maxY) maxY = p[1]; });
        const dy = -maxY;
        return { svg: g(s, { transform: `translate(0 ${f(dy)})` }), anchors: { head: [P[0], P[1] + dy - 60 * k], body: [0, M[1] + dy] } };
      }
    };
  }
  JW.art.characters.caribou = caribou({});
  JW.art.characters.caribouCow = caribou({ base: '#8a6a4a', size: 0.9 });

  // ---------- Props for camp life ----------
  const Pp = JW.art.props;
  Pp.meat = (o, lw) => ({
    svg: path(smooth([[-16, 0], [-18, -10], [-6, -16], [10, -14], [18, -6], [14, 0]], true, 0.9), '#a8413a', lw) +
      path('M-10 -8 Q0 -12 10 -8', 'none', lw * 0.5, { stroke: '#f0d6c0' })
  });
  Pp.meatPile = (o, lw) => ({
    svg: [[-14, 0], [8, -2], [-2, -10]].map((p) => path(smooth([[p[0] - 12, p[1]], [p[0] - 12, p[1] - 8], [p[0], p[1] - 12], [p[0] + 12, p[1] - 8], [p[0] + 12, p[1]]], true, 0.9), '#a8413a', lw)).join('')
  });
  Pp.ulu = (o, lw) => ({
    svg: path('M-14 -4 Q0 10 14 -4 L10 -8 L-10 -8 Z', '#c9d0d6', lw) +
      path(poly([[-4, -8], [-4, -16], [4, -16], [4, -8]]), '#6b4a2e', lw * 0.8) +
      path('M-8 -20 L8 -20 L8 -15 L-8 -15 Z', '#8a6a4a', lw * 0.8)
  });
  Pp.sod = (o, lw) => ({
    svg: path(poly([[-20, 0], [-20, -14], [20, -14], [20, 0]]), '#6e5a3c', lw) +
      path('M-20 -14 L20 -14', 'none', lw * 1.4, { stroke: '#8f9a4a' }) +
      [-14, -6, 4, 12].map((x) => path(`M${x} -14 l-2 -6 M${x} -14 l3 -5`, 'none', lw * 0.5, { stroke: '#6e7a33' })).join('')
  });
  // Miyax's house of sod blocks, dug into the frost heave.
  Pp.sodHouse = (o, lw) => {
    let s = path(smooth([[-120, 0], [-110, -60], [-60, -92], [20, -96], [90, -70], [120, 0]], true, 0.9), '#7a6440', lw);
    const rnd = JW.rng('sodhouse');
    for (let r = 0; r < 4; r++) {
      const y = -14 - r * 20;
      for (let x = -104 + (r % 2) * 16; x < 100 - r * 10; x += 34) {
        const ww = 30 + rnd() * 4;
        if (Math.abs(x) > 110 - r * 18) continue;
        s += path(`M${f(x)} ${f(y)}h${f(ww)}`, 'none', lw * 0.45, { stroke: '#4d3e28' });
        s += path(`M${f(x)} ${f(y)}v20`, 'none', lw * 0.45, { stroke: '#4d3e28' });
      }
    }
    // Grassy roof
    s += path(smooth([[-112, -56], [-60, -94], [20, -98], [92, -68], [70, -80], [0, -104], [-70, -98]], true, 0.8), '#8f9a4a', lw * 0.9);
    for (let i = 0; i < 9; i++) s += JW.art.bits.tuft(-80 + i * 20, -92 + Math.abs(i - 4) * 5, 1, '#5e6a2a', lw * 0.5);
    // Door
    s += path('M-26 0 L-26 -38 Q0 -58 26 -38 L26 0 Z', '#2a2018', lw);
    if (o.skin !== false) s += path('M-26 -38 Q0 -58 26 -38 L22 -10 Q0 -20 -24 -12 Z', '#c3a57b', lw * 0.8);
    return { svg: s };
  };
  // A rack of meat strips drying in the wind.
  Pp.dryRack = (o, lw) => {
    let s = path('M-60 0 L-50 -80 M60 0 L50 -80 M-56 -76 L56 -76', 'none', lw * 1.4, { stroke: '#7a6246' });
    s = path('M-60 0 L-50 -80 M60 0 L50 -80 M-56 -76 L56 -76', 'none', lw * 2.6) + s;
    for (let i = 0; i < 7; i++) {
      const x = -42 + i * 14;
      s += path(`M${x} -76 q-3 18 1 ${36 + (i % 3) * 6} l6 0 q-2 -18 2 ${-(36 + (i % 3) * 6)} Z`, '#8e3a30', lw * 0.7);
    }
    return { svg: s };
  };
  // What is left after the wolves have eaten: antlers and a hide.
  Pp.antlers = (o, lw) => ({
    svg: path(smooth([[-50, 0], [-40, -12], [20, -14], [48, -4], [40, 0]], true, 0.8), '#8a6a4a', lw) +
      antler([-10, -8], 0.8, lw, false) + antler([2, -8], 0.72, lw, true)
  });
  Pp.hide = (o, lw) => ({
    svg: path(smooth([[-60, 0], [-70, -20], [-30, -30], [30, -28], [70, -18], [60, 0]], true, 0.8), '#8a6a4a', lw) +
      path(smooth([[-40, -6], [-44, -18], [30, -20], [40, -8]], true), '#e8dfca', 0)
  });
  Pp.dust = (o, lw) => {
    const rnd = JW.rng('dust' + (o.seed || ''));
    let s = '';
    for (let i = 0; i < 14; i++) {
      const x = (rnd() - 0.5) * 220, y = -rnd() * 90 - 10, r = 18 + rnd() * 26;
      s += el('circle', { cx: x, cy: y, r, fill: i % 3 ? '#d8c8a2' : '#c9b58a', stroke: INK, 'stroke-width': lw * 0.8 });
    }
    return { svg: s };
  };
  Pp.fire = (o, lw) => ({
    svg: path('M-16 0 L16 -6 M-16 -6 L16 0', 'none', lw * 2.2, { stroke: '#5a4230' }) +
      path('M-12 -4 Q-14 -24 -2 -34 Q-4 -22 4 -18 Q6 -30 12 -34 Q16 -16 10 -4 Z', '#f2a531', lw * 0.8) +
      path('M-4 -6 Q-6 -16 0 -22 Q2 -14 6 -12 Q8 -8 4 -6 Z', '#fbe37a', 0)
  });
})(window.JW);
