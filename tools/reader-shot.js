const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const [,, out, w, h, clicks, mode] = process.argv;
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const b = await chromium.launch({ proxy, args: ['--ignore-certificate-errors'] });
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  p.on('pageerror', e => console.log('pageerror:', e.message));
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('console:', m.text()); });
  await p.goto('file://' + process.cwd() + '/index.html');
  await p.waitForSelector('.sheet svg', { timeout: 8000 });
  if (mode) await p.click(mode === 'panel' ? '#modePanel' : '#modePage');
  for (let i = 0; i < +(clicks || 0); i++) { await p.click('#next'); await p.waitForTimeout(450); }
  await p.waitForTimeout(500);
  await p.screenshot({ path: out });
  await b.close();
})();
