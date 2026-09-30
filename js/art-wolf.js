// Wolves: a posable side-view rig plus a front-facing portrait for close-ups.
(function (JW) {
  'use strict';
  const { dir, add, rot, xf, smooth, poly, limb, spiky, path, g, el, f, shade, tint, INK } = JW;

  // Absolute limb angles: 0 = straight down, 90 = forward, -90 = backward.
  // Front legs [upper, lower]; hind legs [thigh, shin, foot].
  const POSES = {
    stand: { tilt: 0, fn: [2, 0], ff: [-4, -3], hn: [20, -30, 3], hf: [26, -24, 6], neck: 125, head: 0, tail: -18, tailBend: -8 },
    standTall: { tilt: -3, fn: [0, -2], ff: [-6, -4], hn: [18, -32, 2], hf: [24, -26, 5], neck: 148, head: 10, tail: -135, tailBend: -20 },
    lookBack: { tilt: 0, fn: [2, 0], ff: [-4, -3], hn: [20, -30, 3], hf: [26, -24, 6], neck: 150, head: 10, tail: -40, flipHead: true },
    walk: { tilt: 0, fn: [22, 6], ff: [-18, -12], hn: [30, -18, 12], hf: [4, -48, -6], neck: 112, head: -8, tail: -40 },
    trot: { tilt: 0, fn: [32, 14], ff: [-28, -60], hn: [6, -52, -22], hf: [40, -14, 18], neck: 105, head: -6, tail: -75 },
    run: { tilt: -4, fn: [72, 84], ff: [46, 22], hn: [-40, -72, -84], hf: [-18, -62, -52], neck: 98, head: -10, tail: -98, ears: 'back' },
    sniff: { tilt: 4, fn: [8, 4], ff: [-2, -2], hn: [20, -30, 3], hf: [26, -24, 6], neck: 55, head: -35, tail: -30 },
    lie: { tilt: 0, fn: [55, 90], ff: [48, 88], hn: [96, -80, 92], hf: [100, -78, 94], neck: 138, head: 0, tail: -88, tailBend: 30 },
    sleep: { tilt: 0, fn: [55, 90], ff: [48, 88], hn: [96, -80, 92], hf: [100, -78, 94], neck: 62, head: -12, tail: -80, tailBend: 60, eye: 'closed', ears: 'back' },
    sit: { tilt: -42, fn: [-2, -4], ff: [4, 2], hn: [62, -108, 90], hf: [58, -112, 88], neck: 150, head: 4, tail: -88, tailBend: 30 },
    howl: { tilt: -42, fn: [-2, -4], ff: [4, 2], hn: [62, -108, 90], hf: [58, -112, 88], neck: 168, head: 58, tail: -88, tailBend: 30, mouth: 'howl', eye: 'closed', ears: 'back' },
    playbow: { tilt: 26, fn: [82, 90], ff: [76, 88], hn: [16, -30, 4], hf: [22, -24, 6], neck: 100, head: 14, tail: -145, mouth: 'pant' },
    crouch: { tilt: 4, fn: [58, -18], ff: [50, -25], hn: [62, -48, 24], hf: [66, -44, 26], neck: 108, head: 26, tail: 20, tailBend: 30, ears: 'back', mouth: 'lick' },
    cower: { tilt: 6, fn: [48, -26], ff: [40, -30], hn: [64, -50, 22], hf: [70, -44, 24], neck: 72, head: -12, tail: 20, tailBend: 40, ears: 'flat' },
    pounce: { tilt: -32, fn: [118, 150], ff: [100, 130], hn: [28, -22, 12], hf: [34, -16, 16], neck: 130, head: 0, tail: -120, mouth: 'pant' },
    glare: { tilt: 3, fn: [6, 2], ff: [-6, -4], hn: [18, -34, 2], hf: [24, -28, 4], neck: 100, head: -6, tail: -95, tailBend: 0, eye: 'wide', hackles: true },
    feed: { tilt: 6, fn: [10, 4], ff: [2, 0], hn: [20, -30, 3], hf: [26, -24, 6], neck: 70, head: -30, tail: -40, mouth: 'open' },
    greet: { tilt: 0, fn: [2, 0], ff: [-4, -3], hn: [20, -30, 3], hf: [26, -24, 6], neck: 115, head: -4, tail: -70, ears: 'back', mouth: 'pant' },
    headDown: { tilt: 2, fn: [4, 0], ff: [-4, -3], hn: [20, -30, 3], hf: [26, -24, 6], neck: 85, head: -18, tail: -100 },
    faceFront: { special: 'front' }
  };
  JW.wolfPoses = POSES;

  function tailShape(base, a, bend, len, w, rnd) {
    const m = add(base, dir(a, len * 0.5));
    const t = add(m, dir(a + bend, len * 0.55));
    const c = [base, m, t];
    const L = [], R = [];
    const widths = [w * 0.7, w, w * 0.2];
    for (let i = 0; i < 3; i++) {
      const p = c[i], q = c[Math.min(2, i + 1)], pr = c[Math.max(0, i - 1)];
      const v = [q[0] - pr[0], q[1] - pr[1]], n = Math.hypot(v[0], v[1]) || 1;
      const nn = [-v[1] / n * widths[i] / 2, v[0] / n * widths[i] / 2];
      L.push(add(p, nn)); R.unshift([p[0] - nn[0], p[1] - nn[1]]);
    }
    // Add some fur tufts along the outer edge
    const tip = add(t, dir(a + bend, w * 0.3));
    return { outline: [...L, tip, ...R], tipStart: JW.lerp(m, t, 0.35), mid: m, tip: t };
  }

  function wolf(def) {
    return {
      draw: function (spec, lw) {
        const o = Object.assign({ size: 1, headK: 1, legK: 1, lean: 1, fluff: 1 }, def, spec.opts || {});
        const pose = Object.assign({ ears: 'up', mouth: 'closed', eye: 'open', tailBend: -12 }, POSES[spec.pose] || POSES.stand, spec.tweak || {});
        if (spec.ears) pose.ears = spec.ears;
        if (spec.mouth) pose.mouth = spec.mouth;
        if (spec.eye) pose.eye = spec.eye;
        const rnd = JW.rng(spec.seed || o.name);
        if (pose.special === 'front') return drawFront(o, spec, lw, rnd);
        const k = o.size * (spec.size || 1);
        const hk = k * o.headK * 1.22;
        const lk = k * o.legK;
        const tilt = pose.tilt;
        const M = [0, -64 * k];
        const B = (pts) => xf(pts.map((p) => [p[0] * k * 0.84, p[1] * k * 1.12 * o.lean]), M, tilt, 1);
        const Bp = (p) => B([p])[0];
        const bodyPts = [[-50, -20], [-22, -25], [8, -26], [36, -30], [56, -18], [61, 2], [50, 22], [26, 20], [-6, 13], [-28, 15], [-52, 12], [-61, -4]];
        const body = B(bodyPts);
        const contacts = body.slice(6, 11);

        const C = {
          base: o.base, dark: o.dark, light: o.light,
          fbase: shade(o.base, 0.28), flight: shade(o.light, 0.28),
          leg: JW.mix(o.base, o.light, 0.4)
        };
        C.fleg = shade(C.leg, 0.28);
        const legPts = (top, angles, lens) => {
          const pts = [top];
          let p = top;
          angles.forEach((a, i) => { p = add(p, dir(a, lens[i] * lk)); pts.push(p); });
          return pts;
        };
        const drawPaw = (end, a, fill) => {
          const fwd = add(end, [5 * lk, 0]);
          contacts.push(add(end, [0, 4.5 * lk]));
          return el('ellipse', { cx: fwd[0] - 1 * lk, cy: end[1] + 1 * lk, rx: 8 * lk, ry: 4.6 * lk, fill: fill, stroke: INK, 'stroke-width': lw });
        };
        const frontLeg = (angles, far) => {
          const top = Bp([36, 6]);
          const pts = legPts(top, angles, [33, 30]);
          const fill = far ? C.fbase : C.base;
          let s = path(limb(pts[1], pts[2], 11 * lk, 9 * lk), far ? C.fleg : C.leg, lw);
          s += drawPaw(pts[2], angles[1], far ? C.fleg : C.leg);
          s += path(limb(JW.lerp(pts[0], pts[1], -0.1), pts[1], 17 * lk, 11 * lk), fill, lw);
          return s;
        };
        const hindLeg = (angles, far) => {
          const top = Bp([-40, 2]);
          const pts = legPts(top, angles, [26, 26, 21]);
          const fill = far ? C.fbase : C.base;
          let s = path(limb(pts[2], pts[3], 9 * lk, 8 * lk), far ? C.fleg : C.leg, lw);
          s += drawPaw(pts[3], angles[2], far ? C.fleg : C.leg);
          s += path(limb(pts[1], pts[2], 12.5 * lk, 9 * lk), fill, lw);
          // Haunch: a teardrop that starts inside the body
          const hp = JW.lerp(pts[0], pts[1], -0.35);
          s += path(limb(hp, pts[1], 36 * lk, 14 * lk), fill, lw);
          return s;
        };

        // Neck and head placement
        const neckBase = Bp([42, -6]);
        const P = add(neckBase, dir(pose.neck, 24 * k));
        let s = '';
        // Far legs
        s += hindLeg(pose.hf, true) + frontLeg(pose.ff, true);
        // Tail (behind body)
        const tb = Bp([-58, -14]);
        const tl = tailShape(tb, pose.tail, pose.tailBend, 54 * k * o.tailK, 22 * k * o.fluff, rnd);
        const tailOut = smooth(tl.outline, true, 0.9);
        const clipT = JW.uid('tc');
        s += el('clipPath', { id: clipT }, path(tailOut, '#000'));
        s += path(tailOut, C.base, lw);
        s += g(el('circle', { cx: tl.tip[0], cy: tl.tip[1], r: 18 * k, fill: C.dark }), { 'clip-path': `url(#${clipT})` });
        s += path(tailOut, 'none', lw);
        // Body with markings
        const bodyD = smooth(body, true, 0.95);
        const clipB = JW.uid('bc');
        s += el('clipPath', { id: clipB }, path(bodyD, '#000'));
        s += path(bodyD, C.base, lw);
        let marks = '';
        marks += path(smooth(B([[-58, -26], [-10, -34], [40, -40], [48, -16], [20, -14], [-10, -12], [-40, -9], [-66, -10]]), true), C.dark, 0);
        marks += path(smooth(B([[-30, 13], [0, 9], [30, 13], [52, 10], [56, 26], [20, 28], [-20, 22]]), true), C.light, 0);
        // Fur hatching on the back
        for (let i = 0; i < 6; i++) {
          const p = Bp([-42 + i * 14, -12 + (i % 2) * 3]);
          marks += path(`M${f(p[0])} ${f(p[1])}l${f(4 * k)} ${f(-3 * k)}l${f(3 * k)} ${f(3 * k)}`, 'none', lw * 0.45);
        }
        s += g(marks, { 'clip-path': `url(#${clipB})` });
        s += path(bodyD, 'none', lw);
        // Raised hackles along the neck and shoulders
        if (pose.hackles) {
          const hk2 = B([[0, -26], [14, -30], [26, -34], [38, -34], [48, -28]]);
          s += path(poly(JW.furStrip(hk2, -8 * k, rnd).concat([Bp([44, -22]), Bp([0, -22])])), C.dark, lw * 0.8);
        }
        // Near hind leg over the body
        s += hindLeg(pose.hn, false);
        // Neck
        const nb2 = Bp([50, 6]);
        // Chest ruff, then a thick furry neck
        const cr = Bp([54, 2]);
        s += path(spiky(cr[0], cr[1], 15 * k * o.fluff, 20 * k, 9, 5 * k, rnd, 0.3), C.light, lw);
        s += path(limb(JW.lerp(neckBase, nb2, 0.3), P, 38 * k, 28 * k), C.base, lw);
        const cr2 = JW.lerp(cr, P, 0.45);
        s += path(spiky(cr2[0], cr2[1] + 4 * k, 11 * k * o.fluff, 12 * k, 7, 4 * k, rnd, 1.1), C.light, 0);
        // Near front leg
        s += frontLeg(pose.fn, false);
        // Head
        const head = drawHead(o, C, pose, hk, lw, rnd);
        const flip = pose.flipHead ? -1 : 1;
        s += g(head, { transform: `translate(${f(P[0])} ${f(P[1])}) scale(${flip} 1) rotate(${f(-pose.head)})` });
        const nose = add(P, rot([46 * hk * flip, -2 * hk], -pose.head * flip));

        let maxY = -1e9;
        contacts.forEach((p) => { if (p[1] > maxY) maxY = p[1]; });
        const dy = -maxY;
        return {
          svg: g(s, { transform: `translate(0 ${f(dy)})` }),
          anchors: { tail: [tl.mid[0], tl.mid[1] + dy], head: [P[0] + 10 * hk, P[1] + dy - 26 * hk], face: [P[0] + 14 * hk, P[1] + dy - 4 * hk], nose: [nose[0], nose[1] + dy], body: [0, -60 * k + dy] }
        };
      }
    };
  }

  function drawHead(o, C, pose, k, lw, rnd) {
    const S = (pts) => pts.map((p) => [p[0] * k, p[1] * k]);
    const snout = (o.snout || 1) * 0.86;
    const sn = (pts) => pts.map((p) => [p[0] > 18 ? 18 + (p[0] - 18) * snout : p[0], p[1]]);
    let s = '';
    const earTip = { up: [1, -34], back: [-15, -25], flat: [-20, -14] }[pose.ears] || [1, -34];
    const eb = o.earK || 1;
    // Far ear
    s += path(poly(S([[-6, -12], [2, -15], [earTip[0] - 5, earTip[1] * eb + 2]])), C.dark, lw);
    // Cheek fur
    s += path(spiky(-7 * k, 5 * k, 11 * k * o.fluff, 10 * k, 9, 4 * k, rnd, 0.4), C.light, lw);
    // Lower jaw
    const mouthA = { closed: 0, pant: 14, lick: 10, open: 22, howl: 30, snarl: 12 }[pose.mouth] || 0;
    const jaw = sn([[6, 6], [30, 6], [42, 6], [41, 10], [30, 13], [10, 14]]);
    if (mouthA) {
      const pivot = [8 * k, 6 * k];
      const jw = S(jaw).map((p) => rot(p, mouthA, pivot));
      const inner = S(sn([[8, 6], [40, 3]])).concat([jw[2], jw[1]]);
      s += path(poly(inner), '#6b1f22', lw * 0.7);
      s += path(smooth(jw, true, 0.8), C.light, lw);
      if (pose.mouth === 'pant' || pose.mouth === 'lick') {
        const tp = JW.lerp(jw[1], jw[2], 0.5);
        s += path(`M${f(tp[0] - 7 * k)} ${f(tp[1] - 1 * k)}q${f(8 * k)} ${f(-1 * k)} ${f(10 * k)} ${f(5 * k)}q${f(-6 * k)} ${f(4 * k)} ${f(-10 * k)} ${f(-2 * k)}Z`, '#d9677a', lw * 0.7);
      }
    }
    // Skull
    const skull = sn([[-14, 0], [-12, -12], [-2, -19], [10, -18], [19, -12], [30, -8], [42, -5], [47.5, -1.5], [46, 3], [40, 5.5], [24, 7], [10, 10], [-2, 14], [-12, 10]]);
    const clipH = JW.uid('hc');
    const skullD = smooth(S(skull), true, 0.9);
    s += el('clipPath', { id: clipH }, path(skullD, '#000'));
    s += path(skullD, C.base, lw);
    let m = '';
    // Pale muzzle and cheek; dark forehead mask
    m += path(smooth(S(sn([[16, 2], [30, -1], [48, 0], [46, 10], [20, 12], [6, 12], [-4, 8]])), true), C.light, 0);
    m += path(smooth(S([[-14, -10], [0, -22], [14, -16], [20, -10], [12, -12], [4, -6], [-6, -2]]), true), C.dark, 0);
    if (!mouthA) {
      m += path(smooth(S(sn([[8, 7], [30, 6], [42, 6], [40, 12], [10, 14]])), true), C.light, 0);
    }
    s += g(m, { 'clip-path': `url(#${clipH})` });
    s += path(skullD, 'none', lw);
    // Mouth line
    if (!mouthA) s += path(smooth(S(sn([[16, 5.5], [30, 5.5], [41, 4.5]])), false), 'none', lw * 0.6);
    // Nose
    const np = S(sn([[46, -1.5]]))[0];
    s += el('ellipse', { cx: np[0], cy: np[1], rx: 4.4 * k, ry: 3.3 * k, fill: INK });
    s += el('circle', { cx: np[0] + 0.8 * k, cy: np[1] - 1.2 * k, r: 1 * k, fill: '#fff', opacity: 0.6 });
    // Eye
    const ex = 21, ey = -8;
    if (pose.eye === 'closed') {
      s += path(`M${f((ex - 4) * k)} ${f(ey * k)}Q${f(ex * k)} ${f((ey + 2.5) * k)} ${f((ex + 4) * k)} ${f((ey - 0.5) * k)}`, 'none', lw * 0.8);
    } else {
      const wide = pose.eye === 'wide' ? 1.35 : 1;
      s += path(`M${f((ex - 4.2) * k)} ${f(ey * k)}Q${f(ex * k)} ${f((ey - 4 * wide) * k)} ${f((ex + 4.6) * k)} ${f((ey - 0.6) * k)}Q${f(ex * k)} ${f((ey + 2.4 * wide) * k)} ${f((ex - 4.2) * k)} ${f(ey * k)}Z`, o.eye, lw * 0.7);
      s += el('circle', { cx: (ex + 0.8) * k, cy: (ey - 0.6) * k, r: 1.5 * k * wide, fill: INK });
      s += path(`M${f((ex - 5) * k)} ${f((ey - 3.5) * k)}Q${f(ex * k)} ${f((ey - 6.5) * k)} ${f((ex + 5.5) * k)} ${f((ey - 3) * k)}`, 'none', lw * 0.7);
    }
    // Near ear
    s += path(poly(S([[0, -13], [10, -15], [earTip[0], earTip[1] * eb]])), C.base, lw);
    s += path(poly(S([[3, -15], [8, -15.8], [earTip[0] * 0.8 + 1.5, earTip[1] * eb * 0.72 - 2]])), JW.mix(C.dark, '#c98d8d', 0.35), 0);
    return s;
  }

  function drawFront(o, spec, lw, rnd) {
    const k = o.size * (spec.size || 1) * o.headK;
    const S = (pts, dx, dy) => pts.map((p) => [(p[0] + (dx || 0)) * k, (p[1] + (dy || 0)) * k]);
    const C = { base: o.base, dark: o.dark, light: o.light };
    let s = '';
    // Shoulders and chest
    s += path(smooth(S([[-60, 0], [-52, -40], [-30, -66], [30, -66], [52, -40], [60, 0]]), true), C.base, lw);
    s += path(spiky(0, -44 * k, 34 * k * o.fluff, 42 * k, 14, 7 * k, rnd), C.light, lw);
    // Ears (behind skull)
    [-1, 1].forEach((sd) => {
      const tip = spec.ears === 'back' ? [sd * 44, -126] : [sd * 30, -150];
      s += path(poly(S([[sd * 8, -116], [sd * 30, -106], tip])), C.base, lw);
      s += path(poly(S([[sd * 13, -114], [sd * 26, -108], [tip[0] * 0.9, tip[1] * 0.93]])), tint(C.light, 0.15), 0);
    });
    // Cheek ruffs
    [-1, 1].forEach((sd) => { s += path(spiky(sd * 26 * k, -84 * k, 16 * k * o.fluff, 20 * k, 8, 6 * k, rnd, sd), C.light, lw); });
    // Skull
    const skull = S([[-30, -94], [-27, -112], [-14, -121], [0, -122], [14, -121], [27, -112], [30, -94], [24, -78], [12, -66], [0, -60], [-12, -66], [-24, -78]]);
    const clip = JW.uid('fc');
    const sd = smooth(skull, true, 0.9);
    s += el('clipPath', { id: clip }, path(sd, '#000'));
    s += path(sd, C.base, lw);
    let m = '';
    m += path(smooth(S([[-24, -112], [0, -104], [24, -112], [20, -124], [0, -130], [-20, -124]]), true), C.dark, 0);
    m += path(smooth(S([[-7, -104], [0, -94], [7, -104], [3, -116], [-3, -116]]), true), C.dark, 0);
    m += path(smooth(S([[-16, -82], [-9, -94], [9, -94], [16, -82], [12, -66], [0, -60], [-12, -66]]), true), C.light, 0);
    m += path(smooth(S([[-30, -92], [-20, -88], [-18, -78], [-26, -80]]), true), C.light, 0);
    m += path(smooth(S([[30, -92], [20, -88], [18, -78], [26, -80]]), true), C.light, 0);
    s += g(m, { 'clip-path': `url(#${clip})` });
    s += path(sd, 'none', lw);
    // Muzzle bridge lines
    s += path(`M${f(-7 * k)} ${f(-94 * k)}Q${f(-9 * k)} ${f(-84 * k)} ${f(-8 * k)} ${f(-80 * k)}`, 'none', lw * 0.5);
    s += path(`M${f(7 * k)} ${f(-94 * k)}Q${f(9 * k)} ${f(-84 * k)} ${f(8 * k)} ${f(-80 * k)}`, 'none', lw * 0.5);
    // Eyes
    [-1, 1].forEach((sd) => {
      const ex = sd * 13.5, ey = -97;
      if (spec.eye === 'closed') {
        s += path(`M${f((ex - 5) * k)} ${f(ey * k)}Q${f(ex * k)} ${f((ey + 3) * k)} ${f((ex + 5) * k)} ${f(ey * k)}`, 'none', lw * 0.8);
        return;
      }
      const d = `M${f((ex - sd * 6) * k)} ${f((ey + 1) * k)}Q${f(ex * k)} ${f((ey - 6) * k)} ${f((ex + sd * 6.5) * k)} ${f((ey - 2.5) * k)}Q${f(ex * k)} ${f((ey + 4) * k)} ${f((ex - sd * 6) * k)} ${f((ey + 1) * k)}Z`;
      s += path(d, o.eye, lw * 0.8);
      s += el('circle', { cx: ex * k, cy: (ey - 0.5) * k, r: 2.2 * k, fill: INK });
      s += el('circle', { cx: (ex + 1) * k, cy: (ey - 1.8) * k, r: 0.8 * k, fill: '#fff' });
      s += path(`M${f((ex - sd * 7) * k)} ${f((ey - 5) * k)}Q${f(ex * k)} ${f((ey - 9) * k)} ${f((ex + sd * 7) * k)} ${f((ey - 5.5) * k)}`, 'none', lw * 0.8);
    });
    // Nose and mouth
    s += path(smooth(S([[-7, -81], [0, -83], [7, -81], [4, -75], [0, -73], [-4, -75]]), true, 0.8), INK, lw * 0.5);
    s += el('circle', { cx: -2 * k, cy: -80 * k, r: 1.3 * k, fill: '#fff', opacity: 0.6 });
    s += path(`M0 ${f(-73 * k)}L0 ${f(-68 * k)}M${f(-8 * k)} ${f(-66 * k)}Q${f(-4 * k)} ${f(-65 * k)} 0 ${f(-68 * k)}Q${f(4 * k)} ${f(-65 * k)} ${f(8 * k)} ${f(-66 * k)}`, 'none', lw * 0.6);
    return { svg: s, anchors: { head: [0, -150 * k], face: [0, -96 * k], nose: [0, -78 * k] } };
  }

  const W = (d) => wolf(Object.assign({ tailK: 1, eye: '#e3a526' }, d));
  JW.art.characters.amaroq = W({ name: 'amaroq', base: '#8d949c', dark: '#2e2c33', light: '#dfe2e2', size: 1.12 });
  JW.art.characters.silver = W({ name: 'silver', base: '#b9c0c6', dark: '#7d8791', light: '#f2f1ea', size: 0.98 });
  JW.art.characters.nails = W({ name: 'nails', base: '#8c7a66', dark: '#4a3e34', light: '#d9cdb8', size: 1.02 });
  JW.art.characters.jello = W({ name: 'jello', base: '#a8977b', dark: '#6d5f4b', light: '#dcd1bb', size: 0.96, lean: 0.86, fluff: 0.8, eye: '#c9b245' });
  // Sled dogs share the wolf rig, with a tail that curls up over the back.
  JW.art.characters.husky = W({ name: 'husky', base: '#8f969e', dark: '#3a3a42', light: '#f2f1ea', size: 0.82, eye: '#8fc3e0', tailK: 0.8 });
  JW.art.characters.husky2 = W({ name: 'husky2', base: '#b0845a', dark: '#5a3f2a', light: '#f2e8d8', size: 0.8, eye: '#c98a2a', tailK: 0.8 });
  const pup = { headK: 1.28, legK: 1.05, fluff: 1.2, tailK: 0.75, snout: 0.72, earK: 1.1 };
  JW.art.characters.kapu = W(Object.assign({ name: 'kapu', base: '#4c4a52', dark: '#1f1d24', light: '#c8c6c0', size: 0.66 }, pup));
  JW.art.characters.sister = W(Object.assign({ name: 'sister', base: '#b3aca0', dark: '#6f6860', light: '#efeae0', size: 0.6 }, pup));
  JW.art.characters.zing = W(Object.assign({ name: 'zing', base: '#8d8478', dark: '#4e473f', light: '#ddd6c8', size: 0.58 }, pup));
  JW.art.characters.zat = W(Object.assign({ name: 'zat', base: '#6f6a66', dark: '#34302e', light: '#d3cec6', size: 0.58 }, pup));
})(window.JW);
