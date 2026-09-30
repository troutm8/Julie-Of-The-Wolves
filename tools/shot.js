// usage: node tools/shot.js <url-relative-to-repo> <out.png> [width] [height]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const [,, rel, out, w, h] = process.argv;
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const b = await chromium.launch({ proxy, args: ['--ignore-certificate-errors'] });
  const p = await b.newPage({ viewport: { width: +(w||1200), height: +(h||900) } });
  p.on('console', m => console.log('console:', m.text()));
  p.on('pageerror', e => console.log('pageerror:', e.message));
  await p.goto('file://' + process.cwd() + '/' + rel);
  try { await p.waitForFunction(() => document.title === 'done' || !document.querySelector('#out') , null, { timeout: 8000 }); } catch (e) {}
  await p.waitForTimeout(600);
  await p.screenshot({ path: out, fullPage: true });
  await b.close();
})();
