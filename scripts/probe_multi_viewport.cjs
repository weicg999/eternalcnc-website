const { chromium } = require('C:/Users/Administrator/node_modules/playwright-core');
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function checkViewport(vw, vh) {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const context = await browser.newContext({ viewport: { width: vw, height: vh } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://localhost:8077/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  try { await page.locator('#coze-custom-fab').click({ force: true }); } catch (e) {}
  await page.waitForTimeout(3000);
  const info = await page.evaluate(() => {
    const el = document.querySelector('.coze-chat-sdk:not([class*="coze-chat-sdk-semi"])');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), hasRoot: el.classList.contains('eternalcnc-chat-root'), vw: window.innerWidth };
  });
  await browser.close();
  if (!info) return { vw, vh, full: false, note: 'no container' };
  const full = Math.abs(info.x) < 2 && Math.abs(info.y) < 2 && Math.abs(info.w - vw) < 2;
  return { vw, vh, full, rect: `x=${info.x} y=${info.y} w=${info.w} h=${info.h}`, hasRoot: info.hasRoot };
}

(async () => {
  for (const [w, h] of [[390,844],[430,932],[768,1024],[820,1180],[1024,768],[1280,800]]) {
    const r = await checkViewport(w, h);
    const expectFull = w <= 820;
    const ok = r.full === expectFull;
    console.log(`${ok ? '✅' : '❌'} 视口 ${w}x${h} -> ${r.full ? '全屏' : '小窗'} ${r.rect || ''} ${r.hasRoot ? '[root✓]' : '[root✗]'} ${expectFull ? '(期望全屏)' : '(期望小窗)'}`);
  }
})();
