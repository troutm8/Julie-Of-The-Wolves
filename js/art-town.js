// Villages, towns and indoor rooms for Part Two, plus the props that go with them.
(function (JW) {
  'use strict';
  const { smooth, poly, path, g, el, f, shade, tint, INK } = JW;
  const S = JW.art.scenes;
  const P = JW.art.props;
  const B = JW.art.bits;

  // ---------- Buildings ----------
  function house(x, y, w, h, o, lw) {
    const c = o.color || '#c9b79c', roof = o.roof || shade(c, 0.45);
    let s = '';
    if (o.stilts) {
      for (let i = 0; i < 4; i++) s += path(`M${f(x - w / 2 + 4 + i * (w - 8) / 3)} ${f(y)}l0 ${f(-h * 0.14)}`, 'none', lw * 0.8);
    }
    const base = o.stilts ? y - h * 0.14 : y;
    s += path(poly([[x - w / 2, base], [x - w / 2, base - h * 0.62], [x + w / 2, base - h * 0.62], [x + w / 2, base]]), c, lw);
    // Siding lines
    for (let i = 1; i < 4; i++) s += path(`M${f(x - w / 2)} ${f(base - h * 0.62 * i / 4)}h${f(w)}`, 'none', lw * 0.3, { stroke: shade(c, 0.3) });
    s += path(poly([[x - w / 2 - w * 0.06, base - h * 0.6], [x, base - h], [x + w / 2 + w * 0.06, base - h * 0.6]]), roof, lw);
    if (o.snowRoof) s += path(poly([[x - w / 2 - w * 0.06, base - h * 0.6], [x, base - h], [x + w / 2 + w * 0.06, base - h * 0.6], [x + w / 2, base - h * 0.66], [x, base - h * 0.93], [x - w / 2, base - h * 0.66]]), '#f4f6f8', lw * 0.6);
    if (o.door !== false) s += path(poly([[x - w * 0.34, base], [x - w * 0.34, base - h * 0.42], [x - w * 0.16, base - h * 0.42], [x - w * 0.16, base]]), shade(c, 0.5), lw * 0.7);
    s += el('rect', { x: x + w * 0.04, y: base - h * 0.46, width: w * 0.28, height: h * 0.2, fill: o.lit ? '#fbe7a1' : '#a8c6d6', stroke: INK, 'stroke-width': lw * 0.7 });
    s += path(`M${f(x + w * 0.18)} ${f(base - h * 0.46)}v${f(h * 0.2)}`, 'none', lw * 0.5);
    if (o.chimney) {
      s += el('rect', { x: x + w * 0.18, y: base - h * 1.02, width: w * 0.08, height: h * 0.2, fill: '#7a6a5a', stroke: INK, 'stroke-width': lw * 0.6 });
      s += path(`M${f(x + w * 0.22)} ${f(base - h * 1.04)}q${f(-8)} -12 0 -22q8 -10 0 -20`, 'none', lw * 0.8, { stroke: '#d8d8d8' });
    }
    return s;
  }
  function church(x, y, w, h, lw, snow) {
    let s = house(x, y, w, h * 0.7, { color: '#f0ece0', roof: '#6d4a3a', door: false, snowRoof: snow }, lw);
    s += path(poly([[x - w * 0.12, y - h * 0.5], [x - w * 0.12, y - h * 0.95], [x + w * 0.12, y - h * 0.95], [x + w * 0.12, y - h * 0.5]]), '#f0ece0', lw);
    s += path(poly([[x - w * 0.16, y - h * 0.95], [x, y - h * 1.2], [x + w * 0.16, y - h * 0.95]]), '#6d4a3a', lw);
    s += path(`M${f(x)} ${f(y - h * 1.2)}v${f(-h * 0.14)}M${f(x - h * 0.05)} ${f(y - h * 1.29)}h${f(h * 0.1)}`, 'none', lw * 0.9);
    s += path(poly([[x - w * 0.08, y], [x - w * 0.08, y - h * 0.28], [x + w * 0.08, y - h * 0.28], [x + w * 0.08, y]]), '#6d4a3a', lw * 0.7);
    return s;
  }
  function school(x, y, w, h, lw, snow) {
    let s = path(poly([[x - w / 2, y], [x - w / 2, y - h * 0.6], [x + w / 2, y - h * 0.6], [x + w / 2, y]]), '#c9803a', lw);
    s += path(poly([[x - w / 2 - 6, y - h * 0.6], [x - w / 2 + 10, y - h * 0.78], [x + w / 2 - 10, y - h * 0.78], [x + w / 2 + 6, y - h * 0.6]]), snow ? '#f4f6f8' : '#5a4a3e', lw);
    for (let i = 0; i < 4; i++) s += el('rect', { x: x - w * 0.4 + i * w * 0.22, y: y - h * 0.46, width: w * 0.14, height: h * 0.18, fill: '#fbe7a1', stroke: INK, 'stroke-width': lw * 0.6 });
    // Flagpole
    s += path(`M${f(x + w / 2 + 20)} ${f(y)}V${f(y - h * 1.1)}`, 'none', lw * 0.8);
    s += path(poly([[x + w / 2 + 20, y - h * 1.1], [x + w / 2 + 52, y - h * 1.04], [x + w / 2 + 20, y - h * 0.96]]), '#b3352b', lw * 0.6);
    s += el('text', { x, y: y - h * 0.64, 'text-anchor': 'middle', 'font-family': "'Bangers', Impact, sans-serif", 'font-size': h * 0.1, fill: '#fbf6ea' }, 'SCHOOL');
    return s;
  }

  // A row of houses along the ground line, with optional church and school.
  function village(w, h, o, lw, seed) {
    const hz = (o.hz || 0.55) * h;
    const snow = !!o.snow;
    let s = S.tundra(w, h, Object.assign({ polygons: false, tufts: snow ? 0 : 6, flat: true, sun: o.sun === undefined ? false : o.sun },
      o, snow ? { palette: { land: '#eef1f4', land2: '#cfd8e0', far: '#9fb0c0', line: '#b8c4ce' } } : {}), lw, seed);
    if (o.sea !== false) {
      s += el('rect', { x: -5, y: hz - h * 0.035, width: w + 10, height: h * 0.035, fill: snow ? '#dfe8ef' : '#6f9aa8' });
      s += path(`M-5 ${f(hz - h * 0.035)}h${w + 10}`, 'none', lw * 0.5);
    }
    const rnd = JW.rng(seed + 'vil');
    const colors = o.colors || ['#c9b79c', '#9fb2b8', '#c98f73', '#d9d1bd', '#b8c98f', '#d9a95a'];
    const n = o.houses || 6;
    const row = hz + h * (o.row || 0.12);
    const items = [];
    for (let i = 0; i < n; i++) items.push({ x: (i + 0.5) / n * w + (rnd() - 0.5) * w * 0.05, kind: 'house' });
    if (o.church != null) items.push({ x: o.church * w, kind: 'church' });
    if (o.school != null) items.push({ x: o.school * w, kind: 'school' });
    items.sort((a, b) => (a.kind === 'house' ? 0 : 1) - (b.kind === 'house' ? 0 : 1));
    const scale = (o.hs || 1) * h * 0.16;
    items.forEach((it, i) => {
      if (it.kind === 'church') s += church(it.x, row, scale * 1.2, scale * 1.4, lw, snow);
      else if (it.kind === 'school') s += school(it.x, row + 4, scale * 2.6, scale * 1.3, lw, snow);
      else {
        const skip = (o.church != null && Math.abs(it.x - o.church * w) < scale) || (o.school != null && Math.abs(it.x - o.school * w) < scale * 2);
        if (!skip) s += house(it.x, row - rnd() * 6, scale * (0.9 + rnd() * 0.4), scale * (0.9 + rnd() * 0.3), { color: colors[i % colors.length], stilts: true, snowRoof: snow, chimney: rnd() < 0.4, lit: o.lit }, lw);
      }
    });
    if (o.poles) {
      for (let i = 0; i < 4; i++) {
        const x = (i + 0.3) / 4 * w;
        s += path(`M${f(x)} ${f(row + 10)}V${f(row - scale * 1.5)}M${f(x - 12)} ${f(row - scale * 1.4)}h24`, 'none', lw * 0.7);
      }
      s += path(Array.from({ length: 3 }, (_, i) => `M${f((i + 0.3) / 4 * w)} ${f(row - scale * 1.38)}Q${f((i + 0.8) / 4 * w)} ${f(row - scale * 1.2)} ${f((i + 1.3) / 4 * w)} ${f(row - scale * 1.38)}`).join(''), 'none', lw * 0.4);
    }
    if (o.dome) {
      const dx = o.dome * w, dy = hz;
      s += path(`M${f(dx - h * 0.06)} ${f(dy)}A${f(h * 0.06)} ${f(h * 0.06)} 0 0 1 ${f(dx + h * 0.06)} ${f(dy)}Z`, '#f2f2ee', lw * 0.7);
    }
    if (snow) {
      for (let i = 0; i < (o.flakes || 0); i++) s += el('circle', { cx: rnd() * w, cy: rnd() * h, r: 1.5 + rnd() * 2.5, fill: '#fff', opacity: 0.85 });
    }
    return s;
  }

  // Indoors: a wall, a floor and a few furnishings.
  function room(w, h, o, lw, seed) {
    const wall = o.wall || '#d9c9a8', floor = o.floor || '#8a6a4a';
    const fy = (o.floorY || 0.72) * h;
    let s = el('rect', { x: -5, y: -5, width: w + 10, height: fy + 5, fill: wall });
    s += el('rect', { x: -5, y: fy, width: w + 10, height: h - fy + 5, fill: floor });
    s += path(`M-5 ${f(fy)}H${w + 5}`, 'none', lw);
    for (let i = 1; i < 6; i++) s += path(`M${f(i * w / 6 + (fy - h) * 0.3)} ${f(h)}L${f(i * w / 6)} ${f(fy)}`, 'none', lw * 0.35, { stroke: shade(floor, 0.3) });
    // Wainscot
    s += path(`M-5 ${f(fy - h * 0.18)}H${w + 5}`, 'none', lw * 0.5, { stroke: shade(wall, 0.3) });
    (o.items || []).forEach((it) => {
      const x = it.x * w, y = (it.y || 0.3) * h, sc = (it.s || 1) * h / 400;
      if (it.t === 'window') {
        const ww = 110 * sc, hh = 90 * sc;
        s += el('rect', { x: x - ww / 2, y, width: ww, height: hh, fill: it.sky || '#b9d4e3', stroke: INK, 'stroke-width': lw });
        if (it.snow) s += el('rect', { x: x - ww / 2, y: y + hh * 0.7, width: ww, height: hh * 0.3, fill: '#f4f6f8' });
        if (it.night) for (let i = 0; i < 6; i++) s += el('circle', { cx: x - ww / 2 + (i * 37 % ww), cy: y + (i * 23 % (hh * 0.6)) + 6, r: 1.6, fill: '#fff' });
        s += path(`M${f(x)} ${f(y)}v${f(hh)}M${f(x - ww / 2)} ${f(y + hh / 2)}h${f(ww)}`, 'none', lw * 0.7);
        s += path(`M${f(x - ww / 2 - 8 * sc)} ${f(y + hh)}h${f(ww + 16 * sc)}`, 'none', lw * 1.4);
      } else if (it.t === 'table') {
        const tw = 180 * sc, th = 60 * sc, ty = it.y ? y : fy - th;
        s += path(poly([[x - tw / 2, ty], [x + tw / 2, ty], [x + tw / 2, ty + 8 * sc], [x - tw / 2, ty + 8 * sc]]), '#7a5a3a', lw * 0.8);
        s += path(`M${f(x - tw / 2 + 10 * sc)} ${f(ty + 8 * sc)}V${f(ty + th)}M${f(x + tw / 2 - 10 * sc)} ${f(ty + 8 * sc)}V${f(ty + th)}`, 'none', lw * 1.2);
      } else if (it.t === 'stove') {
        const sw = 70 * sc, sh = 80 * sc;
        s += el('rect', { x: x - sw / 2, y: fy - sh, width: sw, height: sh, fill: '#3a3a40', stroke: INK, 'stroke-width': lw });
        s += el('rect', { x: x - sw * 0.25, y: fy - sh * 0.6, width: sw * 0.5, height: sh * 0.3, fill: '#f2a531', stroke: INK, 'stroke-width': lw * 0.6 });
        s += path(`M${f(x + sw * 0.2)} ${f(fy - sh)}V${f(-5)}`, 'none', lw * 2.6) + path(`M${f(x + sw * 0.2)} ${f(fy - sh)}V${f(-5)}`, 'none', lw * 1.4, { stroke: '#55555c' });
      } else if (it.t === 'frame') {
        s += el('rect', { x: x - 28 * sc, y, width: 56 * sc, height: 44 * sc, fill: it.color || '#9fcbe6', stroke: INK, 'stroke-width': lw * 0.8 });
      } else if (it.t === 'shelf') {
        s += path(`M${f(x - 70 * sc)} ${f(y)}h${f(140 * sc)}`, 'none', lw * 1.6);
        for (let i = 0; i < 5; i++) s += el('rect', { x: x - 60 * sc + i * 24 * sc, y: y - (22 + (i % 2) * 6) * sc, width: 18 * sc, height: (22 + (i % 2) * 6) * sc, fill: ['#b3352b', '#2d6e8a', '#f2d24b', '#5f7f55', '#7a5ea8'][i], stroke: INK, 'stroke-width': lw * 0.5 });
      } else if (it.t === 'bed') {
        const bw = 220 * sc, bh = 50 * sc;
        s += el('rect', { x: x - bw / 2, y: fy - bh, width: bw, height: bh, fill: it.color || '#b3503a', stroke: INK, 'stroke-width': lw });
        s += el('rect', { x: x - bw / 2 + 8 * sc, y: fy - bh - 14 * sc, width: 50 * sc, height: 18 * sc, rx: 6 * sc, fill: '#f3ece0', stroke: INK, 'stroke-width': lw * 0.7 });
      } else if (it.t === 'door') {
        s += el('rect', { x: x - 45 * sc, y: fy - 190 * sc, width: 90 * sc, height: 190 * sc, fill: '#6d4a3a', stroke: INK, 'stroke-width': lw });
        s += el('circle', { cx: x + 30 * sc, cy: fy - 95 * sc, r: 5 * sc, fill: '#e3c35a', stroke: INK, 'stroke-width': lw * 0.5 });
      } else if (it.t === 'board') {
        const bw = 260 * sc, bh = 120 * sc;
        s += el('rect', { x: x - bw / 2, y, width: bw, height: bh, fill: '#2f4a3a', stroke: '#7a5a3a', 'stroke-width': lw * 2.2 });
        s += el('text', { x: x - bw / 2 + 16 * sc, y: y + 44 * sc, 'font-family': "'Comic Neue', 'Comic Sans MS', cursive", 'font-weight': 700, 'font-size': 34 * sc, fill: '#f3f1e6' }, JW.esc(it.text || 'A  B  C'));
        if (it.text2) s += el('text', { x: x - bw / 2 + 16 * sc, y: y + 90 * sc, 'font-family': "'Comic Neue', 'Comic Sans MS', cursive", 'font-weight': 700, 'font-size': 30 * sc, fill: '#f3f1e6' }, JW.esc(it.text2));
      } else if (it.t === 'desk') {
        const dw = 90 * sc, dy = fy + (it.dy || 0.1) * h;
        s += path(poly([[x - dw / 2, dy - 50 * sc], [x + dw / 2, dy - 50 * sc], [x + dw / 2 + 8 * sc, dy - 42 * sc], [x - dw / 2 + 8 * sc, dy - 42 * sc]]), '#b88a5a', lw * 0.8);
        s += path(`M${f(x - dw / 2 + 6 * sc)} ${f(dy - 42 * sc)}V${f(dy)}M${f(x + dw / 2)} ${f(dy - 42 * sc)}V${f(dy)}`, 'none', lw);
      } else if (it.t === 'flag') {
        s += el('rect', { x, y, width: 60 * sc, height: 38 * sc, fill: '#f3ece0', stroke: INK, 'stroke-width': lw * 0.6 });
        for (let i = 0; i < 4; i++) s += el('rect', { x, y: y + i * 9.5 * sc + 1, width: 60 * sc, height: 4.5 * sc, fill: '#b3352b' });
        s += el('rect', { x, y, width: 24 * sc, height: 19 * sc, fill: '#2d4a8a', stroke: INK, 'stroke-width': lw * 0.4 });
      } else if (it.t === 'radio') {
        s += el('rect', { x: x - 40 * sc, y, width: 80 * sc, height: 50 * sc, rx: 6 * sc, fill: '#8a5a3a', stroke: INK, 'stroke-width': lw * 0.8 });
        s += el('circle', { cx: x - 15 * sc, cy: y + 25 * sc, r: 14 * sc, fill: '#d9c7a0', stroke: INK, 'stroke-width': lw * 0.5 });
        s += el('circle', { cx: x + 22 * sc, cy: y + 18 * sc, r: 5 * sc, fill: '#3a3a3a' });
        s += path(`M${f(x + 10 * sc)} ${f(y)}l${f(20 * sc)} ${f(-40 * sc)}`, 'none', lw * 0.6);
      } else if (it.t === 'bulb') {
        s += path(`M${f(x)} -5V${f(y)}`, 'none', lw * 0.6);
        s += el('circle', { cx: x, cy: y + 10 * sc, r: 12 * sc, fill: '#fff4b0', stroke: INK, 'stroke-width': lw * 0.6 });
        s += el('circle', { cx: x, cy: y + 10 * sc, r: 40 * sc, fill: '#fff4b0', opacity: 0.25 });
      } else if (it.t === 'photoPlane') {
        s += el('rect', { x: x - 34 * sc, y, width: 68 * sc, height: 46 * sc, fill: '#f7f1de', stroke: INK, 'stroke-width': lw * 0.7 });
        s += el('rect', { x: x - 28 * sc, y: y + 5 * sc, width: 56 * sc, height: 32 * sc, fill: '#b9d4e3' });
        s += g(P.plane({}, lw * 2.4).svg, { transform: `translate(${f(x + 4 * sc)} ${f(y + 32 * sc)}) scale(${f(0.2 * sc)})` });
      } else if (it.t === 'parkas') {
        for (let i = 0; i < 3; i++) {
          const px = x + i * 70 * sc;
          s += path(`M${f(px)} ${f(y)}l${f(-28 * sc)} ${f(20 * sc)}l${f(8 * sc)} ${f(70 * sc)}h${f(40 * sc)}l${f(8 * sc)} ${f(-70 * sc)}Z`, ['#a88462', '#e9dcc0', '#86705c'][i], lw * 0.8);
          s += path(`M${f(px - 20 * sc)} ${f(y + 80 * sc)}h${f(40 * sc)}`, 'none', lw * 1.8, { stroke: '#b3352b' });
        }
      }
    });
    if (o.lamp) {
      const id = JW.uid('lamp');
      s += el('defs', {}, el('radialGradient', { id, cx: o.lamp[0], cy: o.lamp[1], r: 0.7 }, el('stop', { offset: 0, 'stop-color': '#ffe7a0', 'stop-opacity': 0.5 }) + el('stop', { offset: 1, 'stop-color': '#2a1a10', 'stop-opacity': 0.4 })));
      s += el('rect', { x: -5, y: -5, width: w + 10, height: h + 10, fill: `url(#${id})` });
    }
    return s;
  }

  // Inside a canvas tent at seal camp, lit by a seal-oil lamp.
  function tent(w, h, o, lw) {
    let s = el('rect', { x: -5, y: -5, width: w + 10, height: h + 10, fill: '#5a4232' });
    s += path(poly([[-5, h * 0.8], [w * 0.5, -h * 0.25], [w + 5, h * 0.8], [w + 5, h + 5], [-5, h + 5]]), '#d9c7a0', 0);
    s += path(`M-5 ${f(h * 0.8)}L${f(w * 0.5)} ${f(-h * 0.25)}L${f(w + 5)} ${f(h * 0.8)}`, 'none', lw);
    for (let i = 1; i < 5; i++) s += path(`M${f(w * 0.5)} ${f(-h * 0.25)}L${f(i * w / 5)} ${f(h * 0.8)}`, 'none', lw * 0.35, { stroke: '#b3a07a' });
    s += el('rect', { x: -5, y: h * 0.8, width: w + 10, height: h * 0.25, fill: '#8a6a4a' });
    s += path(`M-5 ${f(h * 0.8)}H${w + 5}`, 'none', lw);
    // Furs on the floor
    s += path(smooth([[w * 0.05, h * 0.86], [w * 0.4, h * 0.82], [w * 0.7, h * 0.86], [w * 0.95, h * 0.84], [w * 0.9, h * 0.98], [w * 0.1, h * 0.98]], true, 0.8), '#c3a57b', lw * 0.8);
    const id = JW.uid('tl');
    s += el('defs', {}, el('radialGradient', { id, cx: o.lampX || 0.5, cy: 0.8, r: 0.8 }, el('stop', { offset: 0, 'stop-color': '#ffd98a', 'stop-opacity': 0.55 }) + el('stop', { offset: 1, 'stop-color': '#1a0f08', 'stop-opacity': 0.55 })));
    s += el('rect', { x: -5, y: -5, width: w + 10, height: h + 10, fill: `url(#${id})` });
    return s;
  }

  // Winter sea ice by the shore.
  function ice(w, h, o, lw, seed) {
    const P = Object.assign({}, JW.SKIES[o.sky || 'grey']);
    const hz = (o.hz || 0.45) * h;
    const rnd = JW.rng(seed + 'ice');
    let s = S.sky(w, hz, Object.assign({}, o, { sun: o.sun }), lw, seed);
    s += el('rect', { x: -5, y: hz, width: w + 10, height: h - hz + 5, fill: '#eef3f7' });
    // Pressure ridges
    for (let i = 0; i < 3; i++) {
      const y = hz + (h - hz) * (0.1 + i * 0.22);
      const pts = [];
      for (let x = -20; x <= w + 40; x += 40 + rnd() * 30) pts.push([x, y - rnd() * (8 + i * 10)]);
      s += path(poly(pts.concat([[w + 40, y + 6], [-20, y + 6]])), '#dbe6ee', lw * (0.5 + i * 0.2));
    }
    s += path(`M-5 ${f(hz)}H${w + 5}`, 'none', lw * 0.6);
    if (o.openWater) {
      const [x, y, rx] = [o.openWater[0] * w, o.openWater[1] * h, o.openWater[2] * w];
      s += el('ellipse', { cx: x, cy: y, rx, ry: rx * 0.28, fill: '#3f6f88', stroke: INK, 'stroke-width': lw });
    }
    return s;
  }

  // Miyax's dream of San Francisco.
  function city(w, h, o, lw, seed) {
    let s = S.sky(w, h, { sky: 'day', clouds: [[0.2, 0.15, 0.9], [0.75, 0.1, 0.7]] }, lw, seed);
    const hz = h * 0.5;
    s += el('rect', { x: -5, y: hz, width: w + 10, height: h * 0.12, fill: '#3f7aa8' });
    // Golden Gate Bridge in the distance
    const bx0 = w * 0.05, bx1 = w * 0.6, by = hz + 4;
    [0.2, 0.45].forEach((t) => {
      const x = bx0 + (bx1 - bx0) * t;
      s += path(poly([[x - 5, by], [x - 4, by - h * 0.2], [x + 4, by - h * 0.2], [x + 5, by]]), '#d4512f', lw * 0.6);
    });
    s += path(`M${f(bx0)} ${f(by - h * 0.05)}Q${f(bx0 + (bx1 - bx0) * 0.2)} ${f(by - h * 0.06)} ${f(bx0 + (bx1 - bx0) * 0.2)} ${f(by - h * 0.2)}Q${f(bx0 + (bx1 - bx0) * 0.33)} ${f(by - h * 0.05)} ${f(bx0 + (bx1 - bx0) * 0.45)} ${f(by - h * 0.2)}Q${f(bx0 + (bx1 - bx0) * 0.5)} ${f(by - h * 0.06)} ${f(bx1)} ${f(by - h * 0.05)}`, 'none', lw * 0.6, { stroke: '#d4512f' });
    s += path(`M${f(bx0)} ${f(by - h * 0.04)}H${f(bx1)}`, 'none', lw * 1.2, { stroke: '#d4512f' });
    // Hills of painted houses
    const hill = [[-10, h * 0.66], [w * 0.3, h * 0.58], [w * 0.7, h * 0.62], [w + 10, h * 0.55], [w + 10, h + 5], [-10, h + 5]];
    s += path(smooth(hill, true, 0.6), '#9ab57a', lw);
    const rnd = JW.rng(seed + 'city');
    const cols = ['#e8a0a8', '#f2d24b', '#9fcbe6', '#b8e0b0', '#f0b27a', '#c9a8e0'];
    for (let i = 0; i < 9; i++) {
      const x = w * (0.06 + i * 0.11), y = h * (0.66 + Math.sin(i) * 0.02) + 10;
      s += house(x, y + 40, w * 0.1, h * 0.16, { color: cols[i % cols.length], roof: shade(cols[i % cols.length], 0.4), door: true }, lw * 0.8);
      void rnd;
    }
    s += el('rect', { x: -5, y: h * 0.84, width: w + 10, height: h * 0.2, fill: '#8d8a86' });
    s += path(`M-5 ${f(h * 0.9)}H${w + 5}M-5 ${f(h * 0.93)}H${w + 5}`, 'none', lw * 0.8, { stroke: '#4a4846' });
    return s;
  }

  S.village = village;
  S.room = room;
  S.tent = tent;
  S.ice = ice;
  S.city = city;

  // ---------- Props ----------
  P.plane = (o, lw) => {
    const c = o.color || '#d9d4c4', stripe = o.stripe || '#b3352b';
    let s = '';
    s += path(smooth([[-120, -30], [-60, -44], [40, -46], [80, -40], [96, -30], [80, -18], [-40, -18], [-120, -24]], true, 0.8), c, lw);
    s += path('M-120 -28 L-150 -62 L-128 -62 L-96 -34 Z', c, lw);
    s += path('M-128 -28 L-150 -26 L-146 -20 L-110 -22 Z', c, lw);
    s += path('M-110 -30 H70', 'none', lw * 2.2, { stroke: stripe });
    s += el('rect', { x: -10, y: -58, width: 100, height: 10, rx: 4, fill: c, stroke: INK, 'stroke-width': lw });
    s += path('M10 -44 L30 -58 M40 -44 L60 -58', 'none', lw * 0.8);
    s += el('rect', { x: 40, y: -42, width: 30, height: 14, fill: '#a8c6d6', stroke: INK, 'stroke-width': lw * 0.7 });
    s += el('rect', { x: 0, y: -40, width: 26, height: 12, fill: '#a8c6d6', stroke: INK, 'stroke-width': lw * 0.7 });
    s += el('ellipse', { cx: 100, cy: -31, rx: 4, ry: 26, fill: o.spin ? '#bfbfbf' : '#555', opacity: o.spin ? 0.5 : 1, stroke: INK, 'stroke-width': lw * 0.6 });
    s += path('M30 -18 L20 -2 M50 -18 L60 -2', 'none', lw);
    s += el('circle', { cx: 20, cy: 0, r: 7, fill: '#2a2a2a', stroke: INK, 'stroke-width': lw * 0.6 });
    s += el('circle', { cx: 60, cy: 0, r: 7, fill: '#2a2a2a', stroke: INK, 'stroke-width': lw * 0.6 });
    return { svg: s };
  };
  P.seal = (o, lw) => ({
    svg: path(smooth([[-50, 0], [-58, -8], [-40, -14], [0, -22], [30, -22], [48, -14], [50, -4], [30, 0]], true, 0.9), '#7d8791', lw) +
      path('M-50 -4 L-66 -14 L-62 0 Z', '#6d7780', lw * 0.8) +
      el('circle', { cx: 38, cy: -14, r: 2.4, fill: INK }) +
      [[-20, -14], [0, -18], [14, -10], [-30, -8]].map((p) => el('ellipse', { cx: p[0], cy: p[1], rx: 4, ry: 2.5, fill: '#5a636b' })).join('') +
      path('M44 -9 l8 -2 M44 -7 l8 2', 'none', lw * 0.4)
  });
  // A seal bladder, blown up and painted, for the Bladder Feast.
  P.bladder = (o, lw) => ({
    svg: path(smooth([[0, 0], [-16, -12], [-18, -34], [0, -46], [18, -34], [16, -12]], true, 0.9), '#e9d9a8', lw) +
      path('M-12 -24 Q0 -30 12 -24 M-10 -32 Q0 -38 10 -32', 'none', lw * 0.8, { stroke: '#b3352b' }) +
      path('M0 0 L0 8', 'none', lw)
  });
  P.harpoon = (o, lw) => ({
    svg: path('M0 0 L120 -40', 'none', lw * 2.4) + path('M0 0 L120 -40', 'none', lw * 1.2, { stroke: '#a88462' }) +
      path('M118 -46 L136 -46 L122 -36 Z', '#d0d5da', lw * 0.8)
  });
  // Dance fans: woven rings trimmed with feathers.
  P.fan = (o, lw) => {
    let s = el('circle', { cx: 0, cy: -8, r: 10, fill: '#c9a872', stroke: INK, 'stroke-width': lw * 0.8 });
    for (let i = 0; i < 9; i++) {
      const a = (-160 + i * 40) * Math.PI / 180;
      s += path(`M${f(Math.cos(a) * 10)} ${f(-8 + Math.sin(a) * 10)}L${f(Math.cos(a) * 26)} ${f(-8 + Math.sin(a) * 26)}`, 'none', lw * 1.6, { stroke: INK }) +
        path(`M${f(Math.cos(a) * 10)} ${f(-8 + Math.sin(a) * 10)}L${f(Math.cos(a) * 25)} ${f(-8 + Math.sin(a) * 25)}`, 'none', lw * 0.9, { stroke: '#f6f2e8' });
    }
    return { svg: s };
  };
  // Seal-oil lamp (qulliq) with a row of little flames.
  P.lamp = (o, lw) => ({
    svg: path('M-30 0 Q-32 -14 -26 -16 L26 -16 Q32 -14 30 0 Z', '#8e9092', lw) +
      [-18, -9, 0, 9, 18].map((x) => path(`M${x - 3} -16 Q${x} -30 ${x + 3} -16 Z`, '#f2a531', lw * 0.5)).join('')
  });
  P.cableCar = (o, lw) => ({
    svg: el('rect', { x: -60, y: -60, width: 120, height: 48, rx: 6, fill: '#b3352b', stroke: INK, 'stroke-width': lw }) +
      el('rect', { x: -66, y: -66, width: 132, height: 10, rx: 3, fill: '#f2d24b', stroke: INK, 'stroke-width': lw * 0.8 }) +
      [-48, -24, 0, 24].map((x) => el('rect', { x, y: -52, width: 18, height: 16, fill: '#fbe7a1', stroke: INK, 'stroke-width': lw * 0.6 })).join('') +
      el('circle', { cx: -34, cy: -8, r: 8, fill: '#2a2a2a', stroke: INK, 'stroke-width': lw * 0.6 }) +
      el('circle', { cx: 34, cy: -8, r: 8, fill: '#2a2a2a', stroke: INK, 'stroke-width': lw * 0.6 })
  });
  P.envelope = (o, lw) => ({
    svg: path(poly([[-40, 0], [-40, -50], [40, -50], [40, 0]]), '#f7f1de', lw) + path('M-40 -50 L0 -22 L40 -50', 'none', lw * 0.8) +
      el('rect', { x: 20, y: -46, width: 14, height: 16, fill: '#b3352b', stroke: INK, 'stroke-width': lw * 0.4 })
  });
  P.bag = (o, lw) => ({
    svg: path(smooth([[-26, 0], [-30, -30], [-18, -40], [18, -40], [30, -30], [26, 0]], true, 0.8), '#7d6450', lw) + path('M-10 -40 Q0 -54 10 -40', 'none', lw)
  });
})(window.JW);
