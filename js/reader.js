// The reader: page and panel navigation, chapters menu, glossary, saved place.
(function (JW) {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const book = JW.book;
  const KEY = 'jotw.place.v1';

  // Flatten the book into a list of pages.
  const pages = [{ script: book.cover, label: 'Cover', chapter: 0 }];
  book.chapters.forEach((ch) => {
    const list = book.pagesByChapter[ch.n];
    ch.ready = !!list;
    if (!list) return;
    ch.start = pages.length;
    list.forEach((p, i) => pages.push({ script: p, chapter: ch.n, number: i + 1, label: `Chapter ${ch.n}, page ${i + 1}` }));
  });

  const state = { page: 0, panel: 0, mode: 'page', spread: false };
  const cache = new Map();
  function rendered(i) {
    if (!cache.has(i)) {
      const pg = pages[i];
      const r = JW.renderPage(pg.script, { seed: 'pg' + i, number: pg.number, label: pg.label });
      cache.set(i, r);
    }
    return cache.get(i);
  }

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s && s.page < pages.length) { state.page = s.page; state.panel = s.panel || 0; }
      if (s && s.mode) state.mode = s.mode;
      else if (window.innerWidth < 640) state.mode = 'panel';
    } catch (e) { /* storage unavailable: start at the cover */ }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ page: state.page, panel: state.panel, mode: state.mode })); } catch (e) { /* ignore */ }
  }

  const stage = $('stage');
  function spreadFor(i) {
    // Cover alone, then pairs (1,2), (3,4)...
    if (i === 0) return [0];
    const a = i % 2 === 1 ? i : i - 1;
    return a + 1 < pages.length ? [a, a + 1] : [a];
  }

  function useSpread() {
    const r = stage.getBoundingClientRect();
    return state.mode === 'page' && r.width / Math.max(1, r.height) > 1.25;
  }

  let animFrame = null;
  function setViewBox(svg, vb, animate) {
    const cur = (svg.getAttribute('viewBox') || '0 0 1000 1500').split(/\s+/).map(Number);
    cancelAnimationFrame(animFrame);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animate || reduce) { svg.setAttribute('viewBox', vb.join(' ')); return; }
    const t0 = performance.now(), D = 380;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3);
      svg.setAttribute('viewBox', cur.map((c, i) => (c + (vb[i] - c) * e).toFixed(1)).join(' '));
      if (k < 1) animFrame = requestAnimationFrame(step);
    };
    animFrame = requestAnimationFrame(step);
  }

  function panelBox(i, p) {
    const R = rendered(i).rects[p];
    if (!R) return [0, 0, 1000, 1500];
    const pad = 14;
    return [R.x - pad, R.y - pad, R.w + pad * 2, R.h + pad * 2];
  }

  let shown = [];
  function draw(animate) {
    const spread = useSpread();
    const ids = state.mode === 'panel' ? [state.page] : spread ? spreadFor(state.page) : [state.page];
    const same = ids.join() === shown.join();
    if (!same) {
      stage.innerHTML = '';
      ids.forEach((i) => {
        const d = document.createElement('div');
        d.className = 'sheet';
        d.innerHTML = rendered(i).svg;
        stage.appendChild(d);
      });
      shown = ids;
    }
    stage.classList.toggle('panel-mode', state.mode === 'panel');
    const svg = stage.querySelector('svg');
    if (state.mode === 'panel') {
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      const box = panelBox(state.page, state.panel);
      setViewBox(svg, box, animate && same);
      // Shade everything outside the current panel.
      let mask = svg.querySelector('.focus-mask');
      if (!mask) {
        mask = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        mask.setAttribute('class', 'focus-mask');
        mask.setAttribute('fill-rule', 'evenodd');
        svg.appendChild(mask);
      }
      mask.setAttribute('d', `M-3000 -3000H4000V4500H-3000Z M${box[0]} ${box[1]}h${box[2]}v${box[3]}h${-box[2]}Z`);
    } else {
      stage.querySelectorAll('.focus-mask').forEach((m) => m.remove());
      stage.querySelectorAll('svg').forEach((s) => s.setAttribute('viewBox', '0 0 1000 1500'));
    }
    updateChrome(ids);
    save();
  }

  function updateChrome(ids) {
    const pg = pages[state.page];
    const ch = book.chapters.find((c) => c.n === pg.chapter);
    let where;
    if (!ch) where = '<strong>Cover</strong>';
    else {
      const pgs = ids.map((i) => pages[i].number).filter(Boolean);
      where = `<strong>Chapter ${ch.n}: ${ch.title}</strong>Page ${pgs.join('–')} of ${book.pagesByChapter[ch.n].length}`;
      if (state.mode === 'panel') where += ` · panel ${state.panel + 1}`;
    }
    $('where').innerHTML = where;
    $('prev').disabled = state.page === 0 && state.panel === 0;
    const lastPage = pages.length - 1;
    const atEnd = state.mode === 'panel'
      ? state.page === lastPage && state.panel >= pages[lastPage].script.panels.length - 1
      : ids.includes(lastPage);
    $('next').disabled = atEnd;
    $('progress').style.width = ((state.page + 1) / pages.length * 100).toFixed(1) + '%';
    $('modePage').setAttribute('aria-pressed', String(state.mode === 'page'));
    $('modePanel').setAttribute('aria-pressed', String(state.mode === 'panel'));
  }

  function next() {
    if (state.mode === 'panel') {
      const n = pages[state.page].script.panels.length;
      if (state.panel < n - 1) { state.panel++; draw(true); return; }
      if (state.page < pages.length - 1) { state.page++; state.panel = 0; draw(false); }
      return;
    }
    const ids = shown.length ? shown : [state.page];
    const last = Math.max(...ids);
    if (last < pages.length - 1) { state.page = last + 1; state.panel = 0; draw(false); }
  }
  function prev() {
    if (state.mode === 'panel') {
      if (state.panel > 0) { state.panel--; draw(true); return; }
      if (state.page > 0) { state.page--; state.panel = pages[state.page].script.panels.length - 1; draw(false); }
      return;
    }
    const first = Math.min(...(shown.length ? shown : [state.page]));
    if (first > 0) { state.page = useSpread() ? spreadFor(first - 1)[0] : first - 1; state.panel = 0; draw(false); }
  }
  function goPage(i) { state.page = i; state.panel = 0; closeMenu(); draw(false); }

  // ----- Controls -----
  $('next').addEventListener('click', next);
  $('prev').addEventListener('click', prev);
  $('modePage').addEventListener('click', () => { state.mode = 'page'; shown = []; draw(false); });
  $('modePanel').addEventListener('click', () => { state.mode = 'panel'; shown = []; draw(false); });
  document.addEventListener('keydown', (e) => {
    if (!$('drawer').hidden) { if (e.key === 'Escape') closeMenu(); return; }
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'Escape') hidePop();
  });
  // Swipe and tap-to-turn
  let touch = null;
  stage.addEventListener('pointerdown', (e) => { touch = { x: e.clientX, y: e.clientY, t: Date.now() }; });
  stage.addEventListener('pointerup', (e) => {
    if (!touch) return;
    const dx = e.clientX - touch.x, dy = e.clientY - touch.y;
    const t = touch; touch = null;
    const gl = e.target.closest && e.target.closest('.gl');
    if (gl) { showPop(gl); return; }
    hidePop();
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) { dx < 0 ? next() : prev(); return; }
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && Date.now() - t.t < 400) {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      if (x > 0.72) next(); else if (x < 0.28) prev();
    }
  });
  let rt = null;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { shown = []; draw(false); }, 120); });

  // ----- Glossary pop-up -----
  const pop = $('pop');
  function showPop(node) {
    const key = node.getAttribute('data-word');
    const g = book.glossary[key];
    if (!g) return;
    pop.innerHTML = `<b>${g.word}</b><span>${g.def}</span>`;
    pop.hidden = false;
    const r = node.getBoundingClientRect();
    const pw = pop.offsetWidth, ph = pop.offsetHeight;
    let x = Math.min(window.innerWidth - pw - 16, Math.max(16, r.left + r.width / 2 - pw / 2));
    let y = r.bottom + 10;
    if (y + ph > window.innerHeight - 16) y = r.top - ph - 10;
    pop.style.left = x + 'px'; pop.style.top = Math.max(16, y) + 'px';
  }
  function hidePop() { pop.hidden = true; }

  // ----- Chapters drawer -----
  function buildMenu() {
    let html = '';
    book.parts.forEach((p) => {
      html += `<h3>Part ${['One', 'Two', 'Three'][p.n - 1]}: ${p.title}</h3><ul class="chapters">`;
      book.chapters.filter((c) => c.part === p.n).forEach((c) => {
        html += `<li><button data-ch="${c.n}" ${c.ready ? '' : 'disabled'}><span class="num">${c.n}</span><span class="name">${c.title}</span><span class="state">${c.ready ? book.pagesByChapter[c.n].length + ' pages' : 'Coming soon'}</span></button></li>`;
      });
      html += '</ul>';
    });
    $('chapterList').innerHTML = html;
    $('chapterList').querySelectorAll('button[data-ch]').forEach((b) => {
      b.addEventListener('click', () => { const ch = book.chapters.find((c) => c.n === +b.dataset.ch); goPage(ch.start); });
    });
    const gl = Object.values(book.glossary).sort((a, b) => a.word.localeCompare(b.word));
    $('glossary').innerHTML = gl.map((g) => `<dt>${g.word}</dt><dd>${g.def}</dd>`).join('');
  }
  let lastFocus = null;
  function openMenu() { lastFocus = document.activeElement; $('drawer').hidden = false; $('closeMenu').focus(); }
  function closeMenu() { $('drawer').hidden = true; if (lastFocus) lastFocus.focus(); }
  $('openMenu').addEventListener('click', openMenu);
  $('closeMenu').addEventListener('click', closeMenu);
  $('drawer').addEventListener('click', (e) => { if (e.target === $('drawer')) closeMenu(); });

  // ----- Start once the lettering fonts are ready (so balloons are measured right) -----
  function start() {
    load();
    buildMenu();
    draw(false);
  }
  const fontsReady = document.fonts && document.fonts.load
    ? Promise.all([
      document.fonts.load('700 25px "Comic Neue"'),
      document.fonts.load('italic 700 25px "Comic Neue"'),
      document.fonts.load('40px "Bangers"')
    ]).catch(() => null)
    : Promise.resolve();
  let started = false;
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 2500))]).then(() => { started = true; start(); });
  // If the fonts arrive after we started, re-measure the lettering.
  fontsReady.then(() => {
    if (!started) return;
    cache.clear(); shown = []; draw(false);
  });
  JW.reader = { state, pages, goPage, draw };
})(window.JW);
