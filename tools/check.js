// Renders every page of the book headlessly and reports errors and layout warnings.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const msgs = [];
  p.on('console', m => { if (m.type() !== 'log') msgs.push(m.type() + ': ' + m.text()); });
  p.on('pageerror', e => msgs.push('pageerror: ' + e.message));
  await p.goto('file://' + process.cwd() + '/index.html');
  await p.waitForSelector('.sheet svg', { timeout: 8000 });
  const n = await p.evaluate(() => {
    const R = JW.reader; let count = 0;
    R.pages.forEach((pg, i) => { JW.renderPage(pg.script, { seed: 'pg' + i, number: pg.number, label: pg.label }); count++; });
    return count;
  });
  console.log('pages rendered:', n);
  msgs.forEach((m) => console.log(m));
  await b.close();
})();
