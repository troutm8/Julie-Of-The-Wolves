// Core helpers shared by the art kit, lettering and reader.
window.JW = window.JW || {};
(function (JW) {
  'use strict';

  JW.INK = '#17110e';

  // Round to one decimal to keep SVG strings short.
  const f = (n) => Math.round(n * 10) / 10;
  JW.f = f;

  // Deterministic random numbers so a panel always draws the same way.
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  JW.rng = function (seed) {
    let s = (typeof seed === 'number' ? seed : hash(String(seed))) >>> 0 || 7;
    return function () {
      s ^= s << 13; s >>>= 0;
      s ^= s >>> 17;
      s ^= s << 5; s >>>= 0;
      return s / 4294967296;
    };
  };

  let uid = 0;
  JW.uid = (p) => (p || 'u') + (++uid).toString(36);

  // Angles: 0 points down, 90 points forward (+x), 180 points up, -90 backward.
  const R = Math.PI / 180;
  JW.dir = (a, len) => [Math.sin(a * R) * (len || 1), Math.cos(a * R) * (len || 1)];
  JW.add = (p, q) => [p[0] + q[0], p[1] + q[1]];
  JW.sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
  JW.lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  JW.len = (v) => Math.hypot(v[0], v[1]);
  // Rotate a point by deg (SVG sense: positive is clockwise on screen).
  JW.rot = (p, deg, c) => {
    c = c || [0, 0];
    const a = deg * R, x = p[0] - c[0], y = p[1] - c[1];
    return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)];
  };
  // Map points from a local frame (origin o, rotated deg, scaled s) into the parent.
  JW.xf = (pts, o, deg, s) => pts.map((p) => JW.add(JW.rot([p[0] * (s || 1), p[1] * (s || 1)], deg || 0), o));

  // Smooth path through points (Catmull-Rom converted to cubic Bezier).
  JW.smooth = function (pts, closed, k) {
    k = k == null ? 1 : k;
    const n = pts.length;
    if (n < 2) return '';
    const P = (i) => closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))];
    let d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    const last = closed ? n : n - 1;
    for (let i = 0; i < last; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6 * k, p1[1] + (p2[1] - p0[1]) / 6 * k];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6 * k, p2[1] - (p3[1] - p1[1]) / 6 * k];
      d += 'C' + f(c1[0]) + ' ' + f(c1[1]) + ' ' + f(c2[0]) + ' ' + f(c2[1]) + ' ' + f(p2[0]) + ' ' + f(p2[1]);
    }
    return d + (closed ? 'Z' : '');
  };

  JW.poly = (pts, closed) => 'M' + pts.map((p) => f(p[0]) + ' ' + f(p[1])).join('L') + (closed === false ? '' : 'Z');

  // A limb: a tapered capsule from p1 (width w1) to p2 (width w2).
  JW.limb = function (p1, p2, w1, w2) {
    const v = JW.sub(p2, p1), L = JW.len(v) || 0.001;
    const u = [v[0] / L, v[1] / L], n = [-u[1], u[0]];
    const pts = [];
    for (let i = 0; i <= 8; i++) {
      const t = (i / 8) * Math.PI, c = Math.cos(t), s = Math.sin(t);
      pts.push([p2[0] + (n[0] * c + u[0] * s) * w2 / 2, p2[1] + (n[1] * c + u[1] * s) * w2 / 2]);
    }
    for (let i = 0; i <= 8; i++) {
      const t = (i / 8) * Math.PI, c = Math.cos(t), s = Math.sin(t);
      pts.push([p1[0] - (n[0] * c + u[0] * s) * w1 / 2, p1[1] - (n[1] * c + u[1] * s) * w1 / 2]);
    }
    return JW.poly(pts);
  };

  // A straight band (no round caps) from p1 to p2, used for trims.
  JW.band = function (p1, p2, w) {
    const v = JW.sub(p2, p1), L = JW.len(v) || 0.001, n = [-v[1] / L * w / 2, v[0] / L * w / 2];
    return JW.poly([JW.add(p1, n), JW.add(p2, n), JW.sub(p2, n), JW.sub(p1, n)]);
  };

  // Fur: a closed ring of spikes around an ellipse.
  JW.spiky = function (cx, cy, rx, ry, spikes, depth, rnd, rot) {
    const pts = [];
    rot = rot || 0;
    for (let i = 0; i < spikes * 2; i++) {
      const a = (i / (spikes * 2)) * Math.PI * 2 + rot;
      const out = i % 2 === 0;
      const j = rnd ? (rnd() - 0.5) * depth * 0.5 : 0;
      const r = out ? 1 : 1 - depth / Math.max(rx, ry);
      pts.push([cx + Math.cos(a) * (rx * r + (out ? j : 0)), cy + Math.sin(a) * (ry * r + (out ? j : 0))]);
    }
    return JW.poly(pts);
  };

  // Jagged fur edge along an open polyline (returns a closed shape bulging to one side).
  JW.furStrip = function (pts, depth, rnd) {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const v = JW.sub(b, a), L = JW.len(v) || 1, n = [v[1] / L, -v[0] / L];
      const m = JW.lerp(a, b, 0.5), d = depth * (0.7 + (rnd ? rnd() * 0.6 : 0.3));
      out.push(a, [m[0] + n[0] * d, m[1] + n[1] * d]);
    }
    out.push(pts[pts.length - 1]);
    return out;
  };

  // Tiny SVG element builder.
  JW.el = function (tag, attrs, inner) {
    let s = '<' + tag;
    for (const k in attrs) {
      const v = attrs[k];
      if (v === undefined || v === null || v === false) continue;
      s += ' ' + k + '="' + (typeof v === 'number' ? f(v) : String(v).replace(/"/g, '&quot;')) + '"';
    }
    return inner == null ? s + '/>' : s + '>' + inner + '</' + tag + '>';
  };
  JW.path = (d, fill, sw, extra) => JW.el('path', Object.assign({ d: d, fill: fill || 'none', stroke: sw ? JW.INK : null, 'stroke-width': sw || null, 'stroke-linejoin': sw ? 'round' : null, 'stroke-linecap': sw ? 'round' : null }, extra || {}));
  JW.g = (inner, attrs) => JW.el('g', attrs || {}, inner);
  JW.esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Colour helpers.
  JW.mix = function (a, b, t) {
    const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    const ch = (p, s) => (p >> s) & 255;
    const c = (s) => Math.round(ch(pa, s) + (ch(pb, s) - ch(pa, s)) * t);
    return '#' + ((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1);
  };
  JW.shade = (c, t) => JW.mix(c, '#1a1320', t);
  JW.tint = (c, t) => JW.mix(c, '#fff8e8', t);

  // Registry for characters, scenes and props.
  JW.art = { characters: {}, scenes: {}, props: {} };
})(window.JW);
