// People: a posable rig with a sealskin parka, hood, mukluks and a comic face.
(function (JW) {
  'use strict';
  const { dir, add, sub, rot, xf, smooth, poly, limb, spiky, path, g, el, f, shade, tint, INK } = JW;

  // ---------- Poses ----------
  // Side view angles are absolute: 0 = down, 90 = forward, 180 = up, -90 = backward.
  // arms/legs: n = near side, f = far side, each [upper, lower].
  const POSES = {
    stand: { torso: 180, head: 180, arms: { n: [8, 14], f: [-8, -2] }, legs: { n: [3, 0], f: [-3, -1] } },
    standLook: { torso: 182, head: 172, arms: { n: [6, 12], f: [-8, -2] }, legs: { n: [4, 0], f: [-4, -1] } },
    hoodBack: { torso: 180, head: 168, arms: { n: [150, 222], f: [-8, -2] }, legs: { n: [3, 0], f: [-3, -1] } },
    walk: { torso: 175, head: 178, arms: { n: [-22, -8], f: [24, 40] }, legs: { n: [24, 4], f: [-20, -40] } },
    run: { torso: 160, head: 165, arms: { n: [-40, 20], f: [45, 115] }, legs: { n: [60, -5], f: [-30, -95] } },
    wave: { torso: 184, head: 170, arms: { n: [155, 170], f: [140, 165] }, legs: { n: [8, 0], f: [-6, -2] } },
    point: { torso: 180, head: 178, arms: { n: [95, 100], f: [-8, -2] }, legs: { n: [5, 0], f: [-4, -1] } },
    crouch: { torso: 150, head: 172, arms: { n: [40, 95], f: [20, 70] }, legs: { n: [80, -15], f: [70, -20] } },
    kneel: { torso: 176, head: 176, arms: { n: [40, 100], f: [25, 80] }, legs: { n: [80, 0], f: [5, -90] } },
    crawl: { torso: 100, head: 128, arms: { n: [8, 10], f: [-6, -4] }, legs: { n: [12, -88], f: [-8, -92] } },
    prone: { torso: 86, head: 140, arms: { n: [4, 150], f: [-6, 140] }, legs: { n: [-88, -95], f: [-92, -100] } },
    proneLow: { torso: 90, head: 108, arms: { n: [2, 100], f: [-6, 95] }, legs: { n: [-88, -95], f: [-92, -100] } },
    sit: { torso: 172, head: 176, arms: { n: [45, 110], f: [35, 100] }, legs: { n: [102, 10], f: [96, 6] } },
    // Front view: arms/legs l/r, angles measured outward from straight down.
    front: { view: 'front', torso: 180, head: 180, arms: { l: [10, 6], r: [10, 6] }, legs: { l: [3, 0], r: [3, 0] } },
    frontLook: { view: 'front', torso: 180, head: 186, arms: { l: [14, 30], r: [8, 4] }, legs: { l: [6, 0], r: [6, 0] } },
    frontWave: { view: 'front', torso: 180, head: 176, arms: { l: [150, 165], r: [150, 170] }, legs: { l: [7, 0], r: [7, 0] } },
    frontShrug: { view: 'front', torso: 180, head: 186, arms: { l: [40, 100], r: [40, 100] }, legs: { l: [6, 0], r: [6, 0] } },
    sleep: { special: 'sleep' }
  };
  JW.humanPoses = POSES;

  // ---------- Faces ----------
  const EXPR = {
    neutral: { eyes: 'open', brow: 0, mouth: 'soft' },
    happy: { eyes: 'open', brow: 4, mouth: 'smile', blush: true },
    joy: { eyes: 'happy', brow: 6, mouth: 'grin', blush: true },
    worried: { eyes: 'open', brow: 18, mouth: 'flat' },
    sad: { eyes: 'down', brow: 20, mouth: 'frown' },
    scared: { eyes: 'wide', brow: 24, mouth: 'open', sweat: true },
    surprised: { eyes: 'wide', brow: 6, browY: -2.5, mouth: 'o' },
    determined: { eyes: 'open', brow: -16, mouth: 'flat' },
    tired: { eyes: 'half', brow: 12, mouth: 'frown' },
    thinking: { eyes: 'up', brow: 10, mouth: 'side' },
    sleep: { eyes: 'closed', brow: 0, mouth: 'soft' },
    calling: { eyes: 'open', brow: 12, mouth: 'open' },
    hopeful: { eyes: 'wide', brow: 14, mouth: 'smile' },
    warm: { eyes: 'happy', brow: 4, mouth: 'smile' },
    serious: { eyes: 'open', brow: -6, mouth: 'flat' }
  };
  JW.humanExpressions = EXPR;

  function drawFace(o, E, sx, lw) {
    // Face frame: head centre at 0,0, upright. sx: 0 front, ~0.5 three-quarter to the right.
    let s = '';
    const R = o.headR;
    const fx = sx * 2.2 * R / 15;
    const k = R / 15;
    const P = (x, y) => [f(x * k + fx), f(y * k)];
    const lwD = lw * 0.62;
    // Eyes
    const eyes = [{ x: -5.2 + sx * 3.2, sc: sx > 0.2 ? 0.86 : 1 }, { x: 5.2 + sx * 3.2, sc: 1 }];
    eyes.forEach((e) => {
      const [x, y] = P(e.x, 1);
      const w = 2.1 * k * e.sc, h = 2.8 * k;
      if (E.eyes === 'closed') {
        s += path(`M${x - w * 1.3} ${y}Q${x} ${y + h} ${x + w * 1.3} ${y}`, 'none', lwD);
      } else if (E.eyes === 'happy') {
        s += path(`M${x - w * 1.3} ${y + h * 0.4}Q${x} ${y - h * 0.9} ${x + w * 1.3} ${y + h * 0.4}`, 'none', lwD);
      } else if (E.eyes === 'wide') {
        s += el('ellipse', { cx: x, cy: y, rx: w * 1.45, ry: h * 1.3, fill: '#fffaf0', stroke: INK, 'stroke-width': lwD * 0.8 });
        s += el('circle', { cx: x + sx * k, cy: y, r: w * 0.85, fill: INK });
      } else {
        const oy = E.eyes === 'up' ? -1.2 * k : E.eyes === 'down' ? 1 * k : 0;
        s += el('ellipse', { cx: x + sx * 0.6 * k, cy: y + oy, rx: w, ry: E.eyes === 'half' ? h * 0.6 : h, fill: INK });
        s += el('circle', { cx: x + sx * 0.6 * k + w * 0.35, cy: y + oy - h * 0.35, r: w * 0.32, fill: '#fff' });
        // Lash / lid line
        const ly = E.eyes === 'half' ? y - h * 0.1 : y - h * 0.9;
        s += path(`M${x - w * 1.5} ${ly + h * 0.35}Q${x} ${ly - h * 0.35} ${x + w * 1.6} ${ly + h * 0.2}`, 'none', lwD);
      }
      // Brows: inner end rises with positive brow values.
      const inner = e.x < sx * 3.2 ? 1 : -1; // +1 when this is the left eye (inner end is to the right)
      const by = (-5.8 + (E.browY || 0)) * k;
      const t = (E.brow || 0) * 0.09 * k;
      const bx1 = x - 2.6 * k * e.sc, bx2 = x + 2.6 * k * e.sc;
      const y1 = y + by + (inner > 0 ? 0 : -t) * 1, y2 = y + by + (inner > 0 ? -t : 0);
      s += path(`M${f(bx1)} ${f(y1)}L${f(bx2)} ${f(y2)}`, 'none', lwD * 1.3);
    });
    // Nose
    const [nx, ny] = P(1.5 + sx * 5.5, 6);
    s += path(`M${nx} ${ny - 2.2 * k}Q${nx + 1.4 * k * (sx > 0 ? 1 : 0.4)} ${ny} ${nx - 0.6 * k} ${ny + 0.8 * k}`, 'none', lwD * 0.9);
    // Mouth
    const [mx, my] = P(sx * 3.6, 10.2);
    const m = (d) => path(d, 'none', lwD);
    const q = k;
    switch (E.mouth) {
      case 'smile': s += m(`M${mx - 4.2 * q} ${my - 0.8 * q}Q${mx} ${my + 3.4 * q} ${mx + 4.2 * q} ${my - 0.8 * q}`); break;
      case 'grin': s += path(`M${mx - 4.6 * q} ${my - 1.2 * q}Q${mx} ${my + 6 * q} ${mx + 4.6 * q} ${my - 1.2 * q}Z`, '#7a2a24', lwD); break;
      case 'frown': s += m(`M${mx - 3.6 * q} ${my + 1.4 * q}Q${mx} ${my - 1.6 * q} ${mx + 3.6 * q} ${my + 1.4 * q}`); break;
      case 'flat': s += m(`M${mx - 3.2 * q} ${my}L${mx + 3.2 * q} ${my + 0.2 * q}`); break;
      case 'open': s += el('ellipse', { cx: mx, cy: my + 0.5 * q, rx: 2.8 * q, ry: 3.2 * q, fill: '#5a1f1b', stroke: INK, 'stroke-width': lwD }); break;
      case 'o': s += el('ellipse', { cx: mx, cy: my + 0.5 * q, rx: 1.8 * q, ry: 2.3 * q, fill: '#5a1f1b', stroke: INK, 'stroke-width': lwD }); break;
      case 'side': s += m(`M${mx - 3 * q} ${my + 0.6 * q}Q${mx + 1 * q} ${my - 0.2 * q} ${mx + 3.8 * q} ${my - 1.2 * q}`); break;
      default: s += m(`M${mx - 2.8 * q} ${my}Q${mx} ${my + 1.3 * q} ${mx + 2.8 * q} ${my}`);
    }
    if (E.blush) {
      const [cx, cy] = P(5.5 + sx * 3.2, 6.5);
      s += el('ellipse', { cx: cx + 1.5 * k, cy: cy, rx: 2.6 * k, ry: 1.4 * k, fill: '#d9735f', opacity: 0.55 });
    }
    if (E.sweat) {
      const [cx, cy] = P(-10 + sx * 2, -6);
      s += path(`M${cx} ${cy - 3 * k}Q${cx + 2.4 * k} ${cy + 1.5 * k} ${cx} ${cy + 2 * k}Q${cx - 2.4 * k} ${cy + 1.5 * k} ${cx} ${cy - 3 * k}Z`, '#bfe3f2', lwD * 0.8);
    }
    if (o.tears) {
      const [cx, cy] = P(6 + sx * 3.2, 5);
      s += path(`M${cx} ${cy}q${1.2 * k} ${4 * k} 0 ${5 * k}q${-1.2 * k} ${-1 * k} 0 ${-5 * k}Z`, '#bfe3f2', lwD * 0.8);
    }
    return s;
  }

  function drawHead(o, c, headA, sx, expr, lw, rnd, hood) {
    const R = o.headR, k = R / 15;
    let back = '', front = '';
    const E = Object.assign({}, EXPR[expr] || EXPR.neutral);
    const fx = sx * 2.2 * k;
    if (hood === 'up') {
      back += path(spiky(-1.5 * k, 0, 25 * k, 26 * k, 24, 3.6 * k, rnd), o.ruff, lw);
      back += path(spiky(-1.5 * k, 0, 21 * k, 22 * k, 16, 3 * k, rnd, 0.2), o.ruffDark, 0);
      back += el('ellipse', { cx: fx * 0.6, cy: 0, rx: 17.5 * k, ry: 19 * k, fill: shade(o.parka, 0.45), stroke: INK, 'stroke-width': lw * 0.6 });
    } else {
      // Hair mass behind the face.
      if (o.hair === 'long') {
        back += path(smooth([[-14 * k, -8 * k], [-8 * k, -16 * k], [3 * k, -17 * k], [12 * k, -11 * k], [13 * k, -3 * k], [2 * k, 6 * k], [-5 * k, 17 * k], [-13 * k, 20 * k], [-17 * k, 8 * k]], true), o.hairColor, lw);
      } else {
        back += path(smooth([[-14 * k, -4 * k], [-9 * k, -15 * k], [3 * k, -17 * k], [14 * k, -9 * k], [14 * k, 2 * k], [-2 * k, 4 * k], [-14 * k, 6 * k]], true), o.hairColor, lw);
      }
      // Ear on the far-from-viewer side is hidden; show the near ear when turned.
      if (sx > 0.1) back += el('ellipse', { cx: -9 * k + fx, cy: 2 * k, rx: 3 * k, ry: 4 * k, fill: o.skin, stroke: INK, 'stroke-width': lw * 0.7 });
    }
    // Face shape
    front += el('ellipse', { cx: fx, cy: 1 * k, rx: 12.5 * k * o.faceW, ry: 14 * k, fill: o.skin, stroke: INK, 'stroke-width': lw * 0.85 });
    // Cheek shading on the far side
    front += path(`M${f(fx - 10 * k * o.faceW)} ${f(4 * k)}Q${f(fx - 9 * k)} ${f(12 * k)} ${f(fx - 2 * k)} ${f(14.5 * k)}Q${f(fx - 7 * k)} ${f(9 * k)} ${f(fx - 10 * k * o.faceW)} ${f(4 * k)}Z`, shade(o.skin, 0.18), 0);
    // Bangs
    if (o.bangs) {
      front += path(smooth([[fx - 12.5 * k, 0], [fx - 11 * k, -9 * k], [fx - 2 * k, -14.5 * k], [fx + 9 * k, -12 * k], [fx + 12.8 * k, -2 * k], [fx + 8 * k, -6.5 * k], [fx + 3 * k, -5 * k], [fx - 2 * k, -7 * k], [fx - 7 * k, -5 * k], [fx - 10 * k, -3 * k]], true, 0.8), o.hairColor, lw * 0.8);
    } else {
      front += path(smooth([[fx - 12 * k, -3 * k], [fx - 8 * k, -12.5 * k], [fx + 2 * k, -14.5 * k], [fx + 11 * k, -9 * k], [fx + 12.5 * k, -3 * k], [fx + 6 * k, -8 * k], [fx - 5 * k, -8.5 * k]], true, 0.8), o.hairColor, lw * 0.8);
    }
    front += drawFace(o, E, sx, lw);
    const t = `translate(${f(c[0])} ${f(c[1])}) rotate(${f(180 - headA)})`;
    return { back: g(back, { transform: t }), front: g(front, { transform: t }) };
  }

  function parkaPts(o, view) {
    const k = o.k;
    const P = (pts) => pts.map((p) => [p[0] * k, p[1] * k]);
    if (view === 'front') {
      return P([[-15, -48], [0, -51], [15, -48], [19, -30], [20, -5], [24, 16], [0, 18], [-24, 16], [-20, -5], [-19, -30]]);
    }
    return P([[-11, -50], [4, -51], [13, -47], [17, -30], [18, -6], [21, 15], [0, 17], [-21, 15], [-17, -6], [-15, -34]]);
  }

  function human(def) {
    return {
      draw: function (spec, lw) {
        const o = Object.assign({ headR: 15, faceW: 1, bangs: true, hair: 'long', hood: 'down', k: 1 }, def, spec.opts || {});
        const k = o.k * (spec.size || 1);
        const hk = (o.headK || 1) * (spec.size || 1);
        o.k = k;
        o.headR = 15 * hk;
        const rnd = JW.rng(spec.seed || def.name);
        const pose = Object.assign({}, POSES[spec.pose] || POSES.stand, spec.tweak || {});
        const hood = spec.hood || o.hood;
        const expr = spec.expr || 'neutral';
        if (pose.special === 'sleep') return drawSleep(o, spec, lw, rnd, expr);
        const view = pose.view || 'side';
        const L = { thigh: 31 * k, shin: 29 * k, torso: 46 * k, up: 23 * k, fore: 21 * k, foot: 11 * k };
        const H = [0, 0];
        const T = pose.torso;
        const S = add(H, dir(T, L.torso));
        const headA = pose.head + (spec.headTilt || 0);
        const headC = add(add(S, dir(T, 4 * k)), dir(headA, o.headR + 3 * k));
        const tf = (pts) => pts.map((p) => add(rot(p, 180 - T), H));
        const parka = tf(parkaPts(o, view));
        const side = view === 'side';
        const limbsOut = [];
        const contacts = [];
        const armW = [11 * k, 9 * k], legW = [13 * k, 10.5 * k];

        // Build limbs.
        const arms = [], legs = [];
        const mk = (base, a, lens, sign) => {
          const aa = [a[0] * sign, a[1] * sign];
          const j1 = add(base, dir(aa[0], lens[0]));
          const j2 = add(j1, dir(aa[1], lens[1]));
          return { base, j1, j2, a: aa };
        };
        if (side) {
          const sh = add(S, dir(T + 180, 5 * k));
          arms.push(Object.assign(mk(sh, pose.arms.f, [L.up, L.fore], 1), { far: true }));
          arms.push(Object.assign(mk(sh, pose.arms.n, [L.up, L.fore], 1), { far: false }));
          legs.push(Object.assign(mk(add(H, dir(T - 90, 2 * k)), pose.legs.f, [L.thigh, L.shin], 1), { far: true }));
          legs.push(Object.assign(mk(add(H, dir(T + 90, 2 * k)), pose.legs.n, [L.thigh, L.shin], 1), { far: false }));
        } else {
          const sw = 15 * k, hw = 8 * k;
          arms.push(Object.assign(mk(add(S, [-sw, 4 * k]), pose.arms.l, [L.up, L.fore], -1), { far: false, left: true }));
          arms.push(Object.assign(mk(add(S, [sw, 4 * k]), pose.arms.r, [L.up, L.fore], 1), { far: false }));
          legs.push(Object.assign(mk(add(H, [-hw, 0]), pose.legs.l, [L.thigh, L.shin], -1), { far: false, left: true }));
          legs.push(Object.assign(mk(add(H, [hw, 0]), pose.legs.r, [L.thigh, L.shin], 1), { far: false }));
        }

        const drawLeg = (lg) => {
          const pants = lg.far ? shade(o.pants, 0.25) : o.pants;
          const boot = lg.far ? shade(o.boots, 0.25) : o.boots;
          let s = path(limb(lg.base, lg.j1, legW[0], legW[1]), pants, lw);
          // Mukluk covers the shin.
          const bootTop = JW.lerp(lg.j1, lg.j2, 0.12);
          let toe, heel;
          if (side) {
            toe = add(lg.j2, dir(lg.a[1] + 90, L.foot));
            heel = add(lg.j2, dir(lg.a[1] - 90, 4 * k));
          } else {
            toe = add(lg.j2, dir(lg.a[1] + (lg.left ? -1 : 1) * 25, 5 * k));
            heel = lg.j2;
          }
          s += path(limb(bootTop, lg.j2, legW[1] + 1.5 * k, legW[1] + 2 * k), boot, lw);
          // Foot
          const sole = add(lg.j2, dir(lg.a[1], 5 * k));
          if (side) {
            s += path(smooth([heel, add(heel, dir(lg.a[1], 5 * k)), add(toe, dir(lg.a[1], 5 * k)), add(toe, dir(lg.a[1] + 90, 3 * k)), add(toe, dir(lg.a[1] + 180, 2 * k)), add(lg.j2, dir(lg.a[1] + 180, 3 * k))], true, 0.7), boot, lw);
          } else {
            s += el('ellipse', { cx: sole[0] + (toe[0] - lg.j2[0]) * 0.5, cy: sole[1] - 1 * k, rx: 7.5 * k, ry: 5 * k, fill: boot, stroke: INK, 'stroke-width': lw });
          }
          // Trim band at the top of the boot
          const tb = JW.lerp(lg.j1, lg.j2, 0.3);
          s += path(JW.band(JW.lerp(lg.j1, lg.j2, 0.1), tb, legW[1] + 4 * k), lg.far ? shade(o.bootTrim, 0.25) : o.bootTrim, lw * 0.8);
          contacts.push(add(toe, dir(lg.a[1], 4 * k)), add(heel, dir(lg.a[1], 5 * k)), add(lg.j1, dir(lg.a[0] + 180 * 0, 5 * k)), add(lg.j2, dir(lg.a[1] + 180, 5 * k)));
          contacts.push(add(lg.j1, [0, 6 * k]));
          return s;
        };
        const drawArm = (am) => {
          const c = am.far ? shade(o.parka, 0.25) : o.parka;
          let s = path(limb(am.base, am.j1, armW[0], armW[1]), c, lw);
          s += path(limb(am.j1, am.j2, armW[1], armW[1] - 0.5 * k), c, lw);
          const cuff = JW.lerp(am.j1, am.j2, 0.72);
          s += path(JW.band(cuff, JW.lerp(am.j1, am.j2, 1.02), armW[1] + 3 * k), am.far ? shade(o.trim, 0.25) : o.trim, lw * 0.8);
          const hand = add(am.j2, dir(am.a[1], 4 * k));
          s += el('ellipse', { cx: hand[0], cy: hand[1], rx: 4.6 * k, ry: 5.2 * k, fill: am.far ? shade(o.hands, 0.2) : o.hands, stroke: INK, 'stroke-width': lw * 0.9, transform: `rotate(${f(-am.a[1])} ${f(hand[0])} ${f(hand[1])})` });
          contacts.push(add(hand, [0, 5 * k]), add(am.j1, [0, 5 * k]));
          am.hand = hand;
          return s;
        };

        const sx = side ? 0.55 : 0;
        const head = drawHead(o, headC, headA, sx, expr, lw, rnd, hood);
        let s = '';
        // Hood lying down behind the neck
        if (hood !== 'up') {
          const hb = add(add(S, dir(T, 1 * k)), side ? [-9 * k, 0] : [0, -2 * k]);
          s += path(spiky(hb[0], hb[1] + 2 * k, (side ? 13 : 21) * k, 8 * k, 14, 3 * k, rnd), o.ruff, lw);
        }
        if (side) {
          s += drawArm(arms[0]);
          s += drawLeg(legs[0]);
          s += drawLeg(legs[1]);
          s += path(smooth(parka, true, 0.9), o.parka, lw);
          s += parkaDetail(o, tf, view, lw, rnd);
          s += head.back + head.front;
          s += drawArm(arms[1]);
        } else {
          s += drawLeg(legs[0]) + drawLeg(legs[1]);
          s += head.back;
          s += path(smooth(parka, true, 0.9), o.parka, lw);
          s += parkaDetail(o, tf, view, lw, rnd);
          s += head.front;
          s += drawArm(arms[0]) + drawArm(arms[1]);
        }
        // Held prop
        if (spec.hold && JW.art.props[spec.hold]) {
          const hand = arms[side ? 1 : 1].hand;
          s += g(JW.art.props[spec.hold]({}, lw).svg, { transform: `translate(${f(hand[0])} ${f(hand[1])}) scale(${f(k)})` });
        }
        // Ground contact
        parka.forEach((p) => contacts.push(p));
        contacts.push(add(headC, [0, o.headR]));
        let maxY = -1e9;
        contacts.forEach((p) => { if (p[1] > maxY) maxY = p[1]; });
        const dy = -maxY;
        return {
          svg: g(s, { transform: `translate(0 ${f(dy)})` }),
          anchors: {
            head: [headC[0], headC[1] + dy - o.headR * 1.1],
            face: [headC[0], headC[1] + dy],
            hand: arms[1].hand ? [arms[1].hand[0], arms[1].hand[1] + dy] : null
          }
        };
      }
    };
  }

  function parkaDetail(o, tf, view, lw, rnd) {
    const k = o.k;
    let s = '';
    // Sealskin spots
    if (o.spots) {
      const r2 = JW.rng(o.name + 'spots');
      for (let i = 0; i < 9; i++) {
        const p = tf([[(r2() - 0.5) * 26 * k, (-44 + r2() * 46) * k]])[0];
        s += el('ellipse', { cx: p[0], cy: p[1], rx: (1.4 + r2() * 1.6) * k, ry: (1 + r2()) * k, fill: shade(o.parka, 0.35) });
      }
    }
    // Front seam / shading line
    if (view === 'side') {
      s += path(smooth(tf([[-14 * k, -30 * k], [-16 * k, -8 * k], [-19 * k, 8 * k]]), false), 'none', lw * 0.5);
    } else {
      s += path(poly(tf([[0, -44 * k], [0, 6 * k]]), false), 'none', lw * 0.5);
    }
    // Decorated hem band: cream band with a row of squares.
    const w0 = view === 'front' ? 23.5 : 20.5, top = 6, bot = 16;
    const band = tf([[-w0 * k + 1 * k, top * k], [w0 * k - 1 * k, top * k], [w0 * k + 0.5 * k, bot * k], [-w0 * k - 0.5 * k, bot * k]]);
    s += path(poly(band), o.trim, lw * 0.8);
    const n = view === 'front' ? 9 : 7;
    for (let i = 0; i < n; i++) {
      const x = (-w0 + 3 + i * ((2 * w0 - 6) / (n - 1))) * k;
      const sq = tf([[x - 1.7 * k, (top + 3) * k], [x + 1.7 * k, (top + 3) * k], [x + 1.7 * k, (top + 6.6) * k], [x - 1.7 * k, (top + 6.6) * k]]);
      s += path(poly(sq), i % 2 ? o.band[1] : o.band[0], 0);
    }
    return s;
  }

  function drawSleep(o, spec, lw, rnd, expr) {
    const k = o.k;
    let s = '';
    const bag = [[-80 * k, -6 * k], [-70 * k, -26 * k], [-20 * k, -34 * k], [30 * k, -34 * k], [55 * k, -28 * k], [62 * k, -10 * k], [50 * k, 0], [-60 * k, 0]];
    s += path(smooth(bag, true, 0.9), o.sleepSkin || '#b89a72', lw);
    // Fur texture strokes
    for (let i = 0; i < 12; i++) {
      const x = (-65 + i * 10) * k, y = (-24 + (i % 3) * 6) * k;
      s += path(`M${f(x)} ${f(y)}q${f(3 * k)} ${f(-2 * k)} ${f(6 * k)} 0`, 'none', lw * 0.45);
    }
    const head = drawHead(o, [62 * k, -16 * k], 95, 0.55, expr === 'neutral' ? 'sleep' : expr, lw, rnd, spec.hood || 'down');
    s += head.back + head.front;
    // Fur edge of the opening
    s += path(poly(JW.furStrip([[50 * k, -38 * k], [48 * k, -18 * k], [52 * k, 0]], 5 * k, rnd)), o.ruff, lw * 0.8);
    return { svg: s, anchors: { head: [62 * k, -34 * k], face: [62 * k, -16 * k] } };
  }

  // ---------- Cast ----------
  const miyax = {
    name: 'miyax', skin: '#b98459', hairColor: '#1c1512', parka: '#86705c', ruff: '#dccaa4', ruffDark: '#8d7556',
    trim: '#efe2c4', band: ['#b3352b', '#1c1512'], pants: '#3d3a48', boots: '#6b4f38', bootTrim: '#efe2c4',
    hands: '#b98459', spots: true, hair: 'long', bangs: true, sleepSkin: '#c3a57b'
  };
  JW.art.characters.miyax = human(miyax);
  JW.art.characters.miyaxKid = human(Object.assign({}, miyax, { name: 'miyaxKid', k: 0.6, headK: 0.8 }));
  JW.art.characters.kapugen = human({
    name: 'kapugen', skin: '#a8744c', hairColor: '#17110e', parka: '#a88462', ruff: '#e3d3b0', ruffDark: '#7e6647',
    trim: '#2f2622', band: ['#e9dcc0', '#b3352b'], pants: '#2e2b33', boots: '#523b2a', bootTrim: '#2f2622',
    hands: '#a8744c', spots: false, hair: 'short', bangs: false, k: 1.2, headK: 1.12, faceW: 1.08
  });
})(window.JW);
