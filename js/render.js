// Turns a page script into an SVG comic page: panel layout, art, lettering.
(function (JW) {
  'use strict';
  const { smooth, poly, path, g, el, f, esc, shade, tint, INK } = JW;

  const PAGE = { w: 1000, h: 1500, m: 38, gutter: 20, bottom: 58 };
  JW.PAGE = PAGE;

  const FONT = {
    say: { family: "'Comic Neue', 'Comic Sans MS', 'Chalkboard SE', cursive", weight: 700, size: 25, lh: 27 },
    cap: { family: "'Comic Neue', 'Comic Sans MS', 'Chalkboard SE', cursive", weight: 700, size: 23, lh: 26 },
    cue: { family: "'Comic Neue', 'Comic Sans MS', 'Chalkboard SE', cursive", weight: 700, size: 20, lh: 22 },
    sfx: { family: "'Bangers', 'Impact', 'Arial Black', sans-serif", weight: 400 }
  };
  JW.FONT = FONT;

  // ---------- Text measuring and wrapping ----------
  let ctx = null;
  function measure(text, st, italic) {
    if (!ctx) ctx = document.createElement('canvas').getContext('2d');
    ctx.font = `${italic ? 'italic ' : ''}${st.weight} ${st.size}px ${st.family}`;
    return ctx.measureText(text).width * 1.04;
  }
  // Words can be marked: [[word]] = glossary term, *word* = emphasis.
  function tokenize(text) {
    const out = [];
    const re = /\[\[([^\]]+)\]\]|\*([^*]+)\*|(\S+)|(\s+)/g;
    let m;
    while ((m = re.exec(text))) {
      const glue = out.length > 0 && !out[out.length - 1].sp;
      const n0 = out.length;
      if (m[1]) m[1].split(/(\s+)/).forEach((p) => out.push(/^\s+$/.test(p) ? { sp: true } : { t: p, gl: m[1] }));
      else if (m[2]) m[2].split(/(\s+)/).forEach((p) => out.push(/^\s+$/.test(p) ? { sp: true } : { t: p, em: true }));
      else if (m[3]) {
        // A plain word can still contain a marker later on, e.g. "(see [[ulu]])"; keep it simple.
        out.push({ t: m[3] });
      } else out.push({ sp: true });
      // Text glued to the previous token (like punctuation after [[word]]) gets no space.
      if (glue && out[n0] && !out[n0].sp) out[n0].glue = true;
    }
    return out;
  }
  function wrap(text, st, maxW, upper) {
    const toks = tokenize(upper ? text.toUpperCase() : text);
    const sp = measure(' ', st);
    const lines = [];
    let line = [], w = 0;
    toks.forEach((tk) => {
      if (tk.sp) return;
      const ww = measure(tk.t, st, tk.em);
      const gap = line.length && !tk.glue ? sp : 0;
      if (line.length && !tk.glue && w + gap + ww > maxW) { lines.push({ words: line, w }); line = []; w = 0; }
      w += (line.length && !tk.glue ? sp : 0) + ww;
      line.push(Object.assign({ w: ww }, tk));
    });
    if (line.length) lines.push({ words: line, w });
    return { lines, w: Math.max(0, ...lines.map((l) => l.w)), h: lines.length * st.lh, sp };
  }
  // Lines are laid out by the browser (centred with text-anchor), so small
  // differences between measured and real font widths never break spacing.
  function textBlock(wr, cx, top, st, color, anchor) {
    let s = '';
    wr.lines.forEach((ln, i) => {
      const y = top + st.lh * (i + 0.78);
      let inner = '';
      ln.words.forEach((wd, j) => {
        if (j > 0 && !wd.glue) inner += ' ';
        const style = wd.em ? 'font-style:italic' : null;
        inner += (wd.gl || wd.em)
          ? el('tspan', { class: wd.gl ? 'gl' : null, 'data-word': wd.gl ? wd.gl.toLowerCase() : null, style }, esc(wd.t))
          : esc(wd.t);
      });
      s += el('text', { x: f(cx), y: f(y), 'text-anchor': anchor === 'start' ? 'start' : 'middle', 'font-family': st.family, 'font-weight': st.weight, 'font-size': st.size, fill: color || INK }, inner);
    });
    return s;
  }

  // ---------- Balloons ----------
  function tailPath(cx, cy, rx, ry, tip, width) {
    const a = Math.atan2((tip[1] - cy) / ry, (tip[0] - cx) / rx);
    const da = width / Math.max(rx, ry);
    const p1 = [cx + Math.cos(a - da) * rx * 0.97, cy + Math.sin(a - da) * ry * 0.97];
    const p2 = [cx + Math.cos(a + da) * rx * 0.97, cy + Math.sin(a + da) * ry * 0.97];
    const mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    const bend = [(mid[0] + tip[0]) / 2 + (tip[1] - mid[1]) * 0.12, (mid[1] + tip[1]) / 2 - (tip[0] - mid[0]) * 0.12];
    return { d: `M${f(p1[0])} ${f(p1[1])}Q${f(bend[0])} ${f(bend[1])} ${f(tip[0])} ${f(tip[1])}Q${f(bend[0])} ${f(bend[1])} ${f(p2[0])} ${f(p2[1])}`, p1, p2 };
  }

  function tipFor(T, cx, cy, anchors, pw, ph) {
    let target = null;
    if (Array.isArray(T.tail)) target = [T.tail[0] * pw, T.tail[1] * ph];
    else if (T.who && anchors[T.who]) target = anchors[T.who][T.at2 || 'face'] || anchors[T.who].head;
    if (!target) return null;
    const v = [target[0] - cx, target[1] - cy], L = Math.hypot(v[0], v[1]) || 1;
    const stop = T.tail ? 0 : Math.min(L * 0.3, 60);
    const len = Math.min(L - stop, T.tailMax || 220);
    return [cx + v[0] / L * len, cy + v[1] / L * len];
  }

  function balloon(T, pw, ph, anchors, lw) {
    const kind = T.t;
    const st = FONT.say;
    const maxW = (T.w || 0.42) * pw;
    const wr = wrap(T.text, st, Math.max(120, maxW), true);
    const cx = T.at[0] * pw, cy = T.at[1] * ph;
    const rx = wr.w / 2 * 1.18 + 20, ry = wr.h / 2 * 1.3 + 14;
    let s = '';
    const tip = tipFor(T, cx, cy, anchors, pw, ph);
    const fill = T.fill || '#fffdf6';
    if (kind === 'think') {
      const bumps = Math.max(9, Math.round((rx + ry) / 16));
      let b = '';
      for (let i = 0; i < bumps; i++) {
        const a = (i / bumps) * Math.PI * 2;
        b += el('circle', { cx: cx + Math.cos(a) * rx * 0.94, cy: cy + Math.sin(a) * ry * 0.92, r: Math.min(rx, ry) * 0.36, fill, stroke: INK, 'stroke-width': lw });
      }
      s += b + el('ellipse', { cx, cy, rx: rx * 0.97, ry: ry * 0.95, fill });
      if (tip) {
        // Bubbles trail from just outside the cloud toward the thinker.
        const a = Math.atan2((tip[1] - cy) / ry, (tip[0] - cx) / rx);
        const e = [cx + Math.cos(a) * rx * 1.28, cy + Math.sin(a) * ry * 1.3];
        const v = [tip[0] - e[0], tip[1] - e[1]], L = Math.hypot(v[0], v[1]) || 1;
        const span = Math.max(30, Math.min(L, 90));
        for (let i = 0; i < 3; i++) {
          const d = 6 + i * span / 3;
          s += el('circle', { cx: e[0] + v[0] / L * d, cy: e[1] + v[1] / L * d, r: 10 - i * 3, fill, stroke: INK, 'stroke-width': lw * 0.8 });
        }
      }
    } else if (kind === 'shout') {
      const pts = [];
      const n = 22;
      for (let i = 0; i < n * 2; i++) {
        const a = (i / (n * 2)) * Math.PI * 2;
        const r = i % 2 ? 1.0 : 1.22;
        pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]);
      }
      if (tip) s += path(tailPath(cx, cy, rx, ry, tip, 18).d + 'Z', fill, lw);
      s += path(poly(pts), fill, lw);
    } else {
      const dash = kind === 'whisper' ? '10 7' : null;
      const ell = el('ellipse', { cx, cy, rx, ry, fill, stroke: INK, 'stroke-width': lw, 'stroke-dasharray': dash });
      if (tip) {
        const tp = tailPath(cx, cy, rx, ry, tip, 16);
        s += ell + path(tp.d, fill, lw, { 'stroke-dasharray': dash }) + path(tp.d, fill, 0);
      } else s += ell;
    }
    s += textBlock(wr, cx, cy - wr.h / 2, st, T.color);
    return s;
  }

  function caption(T, pw, ph, lw) {
    const st = FONT.cap;
    const pad = 12;
    const maxW = (T.w || 0.9) * pw - pad * 2;
    const wr = wrap(T.text, st, maxW, true);
    const bw = wr.w + pad * 2, bh = wr.h + pad * 1.6;
    let x, y;
    const at = T.at || 'tl';
    const inset = -2;
    if (Array.isArray(at)) { x = at[0] * pw - (T.center ? bw / 2 : 0); y = at[1] * ph; }
    else {
      x = at.includes('l') ? inset : at.includes('r') ? pw - bw - inset : (pw - bw) / 2;
      y = at.includes('t') ? inset : ph - bh - inset;
    }
    const fill = T.fill || '#f8e08e';
    return el('rect', { x, y, width: bw, height: bh, fill, stroke: INK, 'stroke-width': lw * 0.9 }) +
      textBlock(wr, x + bw / 2, y + pad * 0.8, st, T.color);
  }

  function cue(T, pw, ph, anchors, lw) {
    const st = FONT.cue;
    const wr = wrap(T.text, st, (T.w || 0.32) * pw, true);
    const cx = T.at[0] * pw, cy = T.at[1] * ph;
    const bw = wr.w + 30, bh = wr.h + 14;
    let s = '';
    let target = null;
    if (T.who && anchors[T.who]) target = anchors[T.who][T.part || 'body'] || anchors[T.who].head;
    if (Array.isArray(T.tail)) target = [T.tail[0] * pw, T.tail[1] * ph];
    if (target) {
      s += path(`M${f(cx)} ${f(cy)}L${f(target[0])} ${f(target[1])}`, 'none', lw * 0.7, { 'stroke-dasharray': '2 6' });
      s += el('circle', { cx: target[0], cy: target[1], r: 5, fill: '#2f6f8f', stroke: INK, 'stroke-width': lw * 0.5 });
    }
    s += el('rect', { x: cx - bw / 2, y: cy - bh / 2, width: bw, height: bh, rx: bh / 2, fill: '#d6eef2', stroke: '#2f6f8f', 'stroke-width': lw * 0.9 });
    // Paw print marker
    const px = cx - bw / 2 + 2, py = cy - bh / 2 + 2;
    s += el('circle', { cx: px, cy: py, r: 11, fill: '#2f6f8f', stroke: INK, 'stroke-width': lw * 0.5 });
    s += el('ellipse', { cx: px, cy: py + 2.5, rx: 4, ry: 3.2, fill: '#fff' });
    [-4, -1.3, 1.3, 4].forEach((dx, i) => { s += el('circle', { cx: px + dx, cy: py - 2.5 - (i === 1 || i === 2 ? 1.6 : 0), r: 1.5, fill: '#fff' }); });
    s += textBlock(wr, cx + 6, cy - wr.h / 2, st, '#18485c');
    return s;
  }

  function sfx(T, pw, ph, lw) {
    const size = T.size || 60;
    const x = T.at[0] * pw, y = T.at[1] * ph;
    const common = { x, y, 'text-anchor': 'middle', 'font-family': FONT.sfx.family, 'font-size': size, 'letter-spacing': 2, transform: `rotate(${T.rot || -6} ${f(x)} ${f(y)})` };
    return el('text', Object.assign({}, common, { fill: 'none', stroke: INK, 'stroke-width': size * 0.16, 'stroke-linejoin': 'round' }), esc(T.text)) +
      el('text', Object.assign({}, common, { fill: T.color || '#f2c230' }), esc(T.text));
  }

  function title(T, pw, ph, lw) {
    const x = T.at[0] * pw, y = T.at[1] * ph;
    let s = '';
    const size = T.size || 110;
    const lines = T.text.split('\n');
    lines.forEach((ln, i) => {
      const yy = y + i * size * 0.92;
      const common = { x, y: yy, 'text-anchor': T.anchor || 'middle', 'font-family': FONT.sfx.family, 'font-size': size, 'letter-spacing': 3 };
      s += el('text', Object.assign({}, common, { fill: INK, transform: `translate(6 6)` }), esc(ln));
      s += el('text', Object.assign({}, common, { fill: 'none', stroke: INK, 'stroke-width': size * 0.12, 'stroke-linejoin': 'round' }), esc(ln));
      s += el('text', Object.assign({}, common, { fill: T.color || '#f7f1dc' }), esc(ln));
    });
    let yy = y + (lines.length - 1) * size * 0.92 + size * 0.2;
    (T.sub || []).forEach((sb) => {
      const st = { family: FONT.sfx.family, weight: 400, size: sb.size || 34 };
      yy += st.size * 1.25;
      const w = measure(sb.text, st) + sb.text.length * 2 + 40;
      const bx = T.anchor === 'start' ? x - 10 : x - w / 2;
      s += el('rect', { x: bx, y: yy - st.size * 0.95, width: w, height: st.size * 1.25, fill: sb.fill || INK, stroke: INK, 'stroke-width': lw });
      s += el('text', { x: bx + w / 2, y: yy, 'text-anchor': 'middle', 'font-family': st.family, 'font-size': st.size, 'letter-spacing': 2, fill: sb.color || '#f8e08e' }, esc(sb.text));
    });
    return s;
  }

  // ---------- Panels ----------
  const lwAt = (s) => Math.max(1.3, Math.min(5.5, 3 * Math.pow(s, 0.42)));

  function drawPanelArt(P, pw, ph, seed) {
    const lw = 3;
    let s = '';
    const bg = P.bg || { scene: 'plain' };
    const scene = JW.art.scenes[bg.scene || 'plain'];
    s += scene(pw, ph, bg, lw * 0.9, seed);
    const anchors = {};
    const items = [];
    (P.props || []).forEach((it) => items.push(Object.assign({ kind: 'prop' }, it)));
    (P.cast || []).forEach((it) => items.push(Object.assign({ kind: 'cast' }, it)));
    // Draw far things first (smaller y = further away) unless z is given.
    items.sort((a, b) => (a.z != null ? a.z : a.y) - (b.z != null ? b.z : b.y));
    items.forEach((it) => {
      const sc = it.s || 1;
      let x = it.x * pw, y = it.y * ph;
      const flip = it.flip ? -1 : 1;
      const lwl = (it.lw || lwAt(sc)) / sc;
      let r;
      if (it.kind === 'prop') {
        const fn = JW.art.props[it.p];
        if (!fn) return;
        r = fn(it, lwl);
      } else {
        const ch = JW.art.characters[it.c];
        if (!ch) { console.warn('Unknown character', it.c); return; }
        r = ch.draw(Object.assign({ seed: it.c + seed }, it), lwl);
      }
      // fit: [anchorName, fx, fy] places that anchor at a spot in the panel (for close-ups).
      if (it.fit && r.anchors && r.anchors[it.fit[0]]) {
        const p = r.anchors[it.fit[0]];
        x = it.fit[1] * pw - p[0] * sc * flip;
        y = it.fit[2] * ph - p[1] * sc;
      }
      const tr = `translate(${f(x)} ${f(y)}) rotate(${it.rot || 0}) scale(${f(sc * flip)} ${f(sc)})`;
      s += g(r.svg, { transform: tr, opacity: it.opacity });
      if (it.id && r.anchors) {
        const a = {};
        for (const k in r.anchors) {
          const p = r.anchors[k];
          if (p) a[k] = [x + p[0] * sc * flip, y + p[1] * sc];
        }
        anchors[it.id] = a;
      }
    });
    if (P.fx) s += panelFx(P.fx, pw, ph, lw);
    return { svg: s, anchors };
  }

  function panelFx(fx, pw, ph, lw) {
    let s = '';
    (Array.isArray(fx) ? fx : [fx]).forEach((e) => {
      if (e.type === 'vignette') {
        const id = JW.uid('vg');
        s += el('defs', {}, el('radialGradient', { id, cx: 0.5, cy: 0.5, r: 0.75 }, el('stop', { offset: 0.55, 'stop-color': e.color || '#000', 'stop-opacity': 0 }) + el('stop', { offset: 1, 'stop-color': e.color || '#000', 'stop-opacity': e.o || 0.45 })));
        s += el('rect', { x: 0, y: 0, width: pw, height: ph, fill: `url(#${id})` });
      } else if (e.type === 'speed') {
        const rnd = JW.rng('sp' + pw);
        const c = [(e.cx || 0.5) * pw, (e.cy || 0.5) * ph];
        for (let i = 0; i < (e.n || 40); i++) {
          const a = rnd() * Math.PI * 2, r0 = (e.r || 0.35) * Math.max(pw, ph), r1 = Math.max(pw, ph);
          s += path(`M${f(c[0] + Math.cos(a) * r0)} ${f(c[1] + Math.sin(a) * r0)}L${f(c[0] + Math.cos(a) * r1)} ${f(c[1] + Math.sin(a) * r1)}`, 'none', 1.2 + rnd() * 2, { stroke: e.color || INK, opacity: 0.6 });
        }
      } else if (e.type === 'tint') {
        s += el('rect', { x: 0, y: 0, width: pw, height: ph, fill: e.color, opacity: e.o || 0.25 });
      } else if (e.type === 'lines') {
        // Little emphasis strokes near a point, e.g. trembling hands
        const x = e.x * pw, y = e.y * ph;
        for (let i = 0; i < 3; i++) {
          const a = (-60 + i * 30) * Math.PI / 180, r = e.r || 30;
          s += path(`M${f(x + Math.sin(a) * r)} ${f(y - Math.cos(a) * r)}L${f(x + Math.sin(a) * r * 1.6)} ${f(y - Math.cos(a) * r * 1.6)}`, 'none', lw);
        }
      }
    });
    return s;
  }

  function layoutRects(page) {
    const W = PAGE.w - PAGE.m * 2, H = PAGE.h - PAGE.m - PAGE.bottom;
    const rows = page.rows || defaultRows(page.panels.length);
    const total = rows.reduce((a, r) => a + r[0], 0);
    const Hn = H - PAGE.gutter * (rows.length - 1);
    const rects = [];
    let y = PAGE.m;
    rows.forEach((r) => {
      const rh = Hn * r[0] / total;
      const cols = r.slice(1);
      const ct = cols.reduce((a, c) => a + c, 0);
      const Wn = W - PAGE.gutter * (cols.length - 1);
      let x = PAGE.m;
      cols.forEach((c) => {
        const cw = Wn * c / ct;
        rects.push({ x, y, w: cw, h: rh });
        x += cw + PAGE.gutter;
      });
      y += rh + PAGE.gutter;
    });
    return rects;
  }
  function defaultRows(n) {
    return { 1: [[1, 1]], 2: [[1, 1], [1, 1]], 3: [[1, 1], [1, 1, 1]], 4: [[1, 1, 1], [1, 1, 1]], 5: [[1, 1, 1], [1, 1], [1, 1, 1]], 6: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] }[n] || [[1, 1]];
  }

  JW.renderPage = function (page, meta) {
    const rects = layoutRects(page);
    const seed = meta.seed || 'p';
    let defs = el('filter', { id: 'memoryTone', 'color-interpolation-filters': 'sRGB' },
      el('feColorMatrix', { type: 'matrix', values: '0.62 0.32 0.1 0 0.04  0.5 0.42 0.08 0 0.03  0.36 0.32 0.2 0 0.02  0 0 0 1 0' }));
    let panels = '', letters = '', borders = '';
    const out = [];
    page.panels.forEach((P, i) => {
      const R = P.rect ? Object.assign({}, rects[i], P.rect) : rects[i];
      out.push(R);
      if (!R) return;
      const pseed = seed + '-' + i;
      const art = drawPanelArt(P, R.w, R.h, pseed);
      const cid = JW.uid('pc');
      const round = P.style === 'memory' ? 26 : 0;
      defs += el('clipPath', { id: cid }, el('rect', { x: 0, y: 0, width: R.w, height: R.h, rx: round }));
      let inner = art.svg;
      if (P.style === 'memory') inner = g(inner, { filter: 'url(#memoryTone)' });
      panels += g(g(inner, { 'clip-path': `url(#${cid})` }), { transform: `translate(${f(R.x)} ${f(R.y)})`, 'data-panel': i });
      if (P.border !== false) {
        if (P.style === 'memory') {
          borders += el('rect', { x: R.x, y: R.y, width: R.w, height: R.h, rx: round, fill: 'none', stroke: INK, 'stroke-width': 5 });
          borders += el('rect', { x: R.x + 7, y: R.y + 7, width: R.w - 14, height: R.h - 14, rx: round - 6, fill: 'none', stroke: '#fbf6e6', 'stroke-width': 2.5, 'stroke-dasharray': '14 8' });
        } else {
          borders += el('rect', { x: R.x, y: R.y, width: R.w, height: R.h, fill: 'none', stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' });
        }
      }
      let lt = '';
      (P.text || []).forEach((T) => {
        if (T.t === 'cap') lt += caption(T, R.w, R.h, 3);
        else if (T.t === 'cue') lt += cue(T, R.w, R.h, art.anchors, 3);
        else if (T.t === 'sfx') lt += sfx(T, R.w, R.h, 3);
        else if (T.t === 'title') lt += title(T, R.w, R.h, 3);
        else lt += balloon(T, R.w, R.h, art.anchors, 3);
      });
      letters += g(lt, { transform: `translate(${f(R.x)} ${f(R.y)})` });
    });
    let foot = '';
    if (meta.number != null) {
      foot = el('text', { x: PAGE.w / 2, y: PAGE.h - 22, 'text-anchor': 'middle', 'font-family': FONT.sfx.family, 'font-size': 24, fill: '#6b6255', 'letter-spacing': 2 }, esc(String(meta.number)));
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PAGE.w} ${PAGE.h}" class="page-svg" role="img" aria-label="${esc(meta.label || 'Comic page')}">` +
      el('defs', {}, defs) +
      el('rect', { x: 0, y: 0, width: PAGE.w, height: PAGE.h, fill: page.paper || '#fbf6ea' }) +
      panels + borders + letters + foot + '</svg>';
    return { svg, rects: out };
  };
})(window.JW);
