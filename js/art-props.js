// Props: things Miyax carries and things she remembers. Origin is bottom centre.
(function (JW) {
  'use strict';
  const { smooth, poly, path, g, el, f, shade, tint, INK } = JW;
  const P = JW.art.props;

  P.pot = (o, lw) => ({
    svg: path(poly([[-14, -20], [14, -20], [12, -2], [-12, -2]]), '#8a9096', lw) +
      el('ellipse', { cx: 0, cy: -20, rx: 14, ry: 4, fill: o.empty === false ? '#7a4a2a' : '#3c3f44', stroke: INK, 'stroke-width': lw * 0.8 }) +
      path('M-14 -17 Q-24 -30 -8 -34 M14 -17 Q24 -30 8 -34', 'none', lw * 0.7) +
      path('M-9 -12 L-9 -6', 'none', lw * 0.5, { stroke: '#d5d9dc' })
  });

  P.pack = (o, lw) => ({
    svg: path(smooth([[-20, 0], [-24, -30], [-14, -46], [14, -46], [24, -30], [20, 0]], true, 0.8), '#7d6450', lw) +
      path(smooth([[-16, -30], [0, -36], [16, -30], [14, -16], [-14, -16]], true, 0.8), '#6a5242', lw * 0.8) +
      path('M-10 -46 Q0 -60 10 -46', 'none', lw)
  });

  P.lemming = (o, lw) => ({
    svg: path(smooth([[-14, 0], [-16, -8], [-6, -14], [8, -13], [15, -6], [14, 0]], true, 0.9), '#9a6f45', lw) +
      path(smooth([[-10, -9], [-2, -13], [8, -12], [4, -8]], true), '#c9a172', 0) +
      el('circle', { cx: 9, cy: -8, r: 1.6, fill: INK }) + el('circle', { cx: 15, cy: -4, r: 1.4, fill: '#d98b8b' }) +
      el('circle', { cx: 2, cy: -13, r: 3, fill: '#8a6340', stroke: INK, 'stroke-width': lw * 0.6 })
  });

  // Amy's letter: a sheet with a few handwritten lines.
  P.letter = (o, lw) => {
    const w = 150, h = 190;
    let s = path(poly([[-w / 2, 0], [-w / 2, -h], [w / 2, -h], [w / 2, 0]]), '#fbf7ea', lw, { transform: `rotate(${o.rot || -4})` });
    const lines = o.lines || [];
    lines.forEach((t, i) => {
      s += el('text', { x: -w / 2 + 12, y: -h + 28 + i * 19, 'font-family': "'Comic Neue', 'Comic Sans MS', cursive", 'font-style': 'italic', 'font-weight': 700, 'font-size': 14, fill: '#2d3b8c', transform: `rotate(${o.rot || -4})` }, JW.esc(t));
    });
    for (let i = lines.length; i < 8; i++) {
      const y = -h + 28 + i * 19;
      s += path(`M${-w / 2 + 12} ${y}q20 -4 40 0t40 0t40 -2`, 'none', lw * 0.45, { stroke: '#2d3b8c', transform: `rotate(${o.rot || -4})` });
    }
    return { svg: s };
  };

  // A photo of the Golden Gate Bridge, sent by Amy.
  P.photo = (o, lw) => {
    const w = 170, h = 130;
    const clip = JW.uid('ph');
    let img = '';
    img += el('rect', { x: -w / 2 + 8, y: -h + 8, width: w - 16, height: h - 30, fill: '#9fcbe6' });
    img += path(smooth([[-w / 2, -48], [-40, -66], [0, -58], [40, -72], [w / 2, -52], [w / 2, -40], [-w / 2, -40]], true), '#7aa06a', 0);
    img += el('rect', { x: -w / 2 + 8, y: -48, width: w - 16, height: 26, fill: '#3f7aa8' });
    const tower = (x) => path(poly([[x - 4, -40], [x - 3, -104], [x + 3, -104], [x + 4, -40]]), '#d4512f', lw * 0.5) + path(`M${x - 3} -92 L${x + 3} -92 M${x - 3} -78 L${x + 3} -78`, 'none', lw * 0.4);
    img += path('M-90 -58 Q-40 -60 -34 -104 Q0 -62 34 -104 Q40 -60 90 -58', 'none', lw * 0.6, { stroke: '#d4512f' });
    img += tower(-34) + tower(34);
    img += path('M-90 -56 L90 -56', 'none', lw * 0.9, { stroke: '#d4512f' });
    let s = el('g', { transform: `rotate(${o.rot || 5})` },
      path(poly([[-w / 2, 0], [-w / 2, -h], [w / 2, -h], [w / 2, 0]]), '#fffef8', lw) +
      el('clipPath', { id: clip }, el('rect', { x: -w / 2 + 8, y: -h + 8, width: w - 16, height: h - 30 })) +
      g(img, { 'clip-path': `url(#${clip})` }) +
      el('rect', { x: -w / 2 + 8, y: -h + 8, width: w - 16, height: h - 30, fill: 'none', stroke: INK, 'stroke-width': lw * 0.5 }) +
      el('text', { x: 0, y: -8, 'text-anchor': 'middle', 'font-family': "'Comic Neue', 'Comic Sans MS', cursive", 'font-style': 'italic', 'font-weight': 700, 'font-size': 12, fill: '#2d3b8c' }, 'San Francisco!'));
    return { svg: s };
  };

  // Low houses on the horizon (Barrow as she left it).
  P.houses = (o, lw) => {
    let s = '';
    const rnd = JW.rng('houses');
    for (let i = 0; i < 9; i++) {
      const x = -160 + i * 38 + rnd() * 12, hw = 14 + rnd() * 10, hh = 12 + rnd() * 10;
      const c = ['#c9b79c', '#9fb2b8', '#c98f73', '#d9d1bd'][i % 4];
      s += path(poly([[x - hw, 0], [x - hw, -hh], [x, -hh - 8], [x + hw, -hh], [x + hw, 0]]), c, lw * 0.6);
      s += el('rect', { x: x - 3, y: -hh * 0.6, width: 5, height: 5, fill: '#fdf1b8', stroke: INK, 'stroke-width': lw * 0.3 });
    }
    for (let i = 0; i < 4; i++) {
      const x = -180 + i * 110;
      s += path(`M${x} 0L${x} -48M${x - 8} -42L${x + 8} -42`, 'none', lw * 0.5);
    }
    s += path('M-180 -44 Q-125 -36 -70 -44 Q-15 -36 40 -44 Q95 -36 150 -44', 'none', lw * 0.3);
    return { svg: s };
  };

  // Canvas tent at seal camp.
  P.tent = (o, lw) => ({
    svg: path(poly([[-70, 0], [0, -90], [70, 0]]), '#e6dcc3', lw) +
      path(poly([[-12, 0], [0, -40], [12, 0]]), '#4a3b2e', lw * 0.8) +
      path('M0 -90 L-6 -104 M0 -90 L8 -102', 'none', lw * 0.8) +
      path('M-35 -45 L-30 0 M35 -45 L30 0', 'none', lw * 0.4, { stroke: '#b3a687' })
  });

  P.kayak = (o, lw) => ({
    svg: path(smooth([[-90, -6], [-40, -14], [40, -14], [95, -8], [60, 0], [-60, 0]], true, 0.8), '#b89b6c', lw) +
      el('ellipse', { cx: 0, cy: -13, rx: 12, ry: 3, fill: '#3c2e22', stroke: INK, 'stroke-width': lw * 0.6 })
  });

  P.driftwood = (o, lw) => ({
    svg: path(smooth([[-60, 0], [-58, -8], [40, -12], [62, -6], [58, 0]], true, 0.9), '#a59077', lw) +
      path('M-40 -5 L20 -8 M30 -10 L40 -18', 'none', lw * 0.5)
  });

  // A lone jaeger or plover for the sky.
  P.bird = (o, lw) => ({ svg: path('M-10 0 Q-5 -6 0 0 Q5 -6 10 0', 'none', lw) });

  // Motion / emphasis lines around a point.
  P.shake = (o, lw) => {
    let s = '';
    for (let i = 0; i < 3; i++) s += path(`M${-8 + i * 8} -6 l-4 -10`, 'none', lw * 0.7);
    return { svg: s };
  };
})(window.JW);
