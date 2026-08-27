const { chromium } = require('C:/Users/Administrator/node_modules/playwright-core');
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const context = await browser.newContext();

  async function openPage() {
    const page = await context.newPage();
    const convIds = [];
    page.on('console', m => {
      const text = m.text();
      const match = text.match(/conversation_id:\s*([a-zA-Z0-9_-]+)/);
      if (match && !convIds.includes(match[1])) convIds.push(match[1]);
    });
    await page.goto('http://localhost:8099/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const uid = await page.evaluate(() => {
      try { return JSON.parse(localStorage.getItem('eternalcnc_coze_uid') || 'null'); } catch (e) { return null; }
    });
    await page.locator('#coze-custom-fab').click({ force: true });
    await page.waitForTimeout(3000);
    return { page, uid, convIds };
  }

  const first = await openPage();
  console.log('First visit uid:', first.uid?.id);
  console.log('First visit conv:', first.convIds[0]);
  await first.page.close();

  const second = await openPage();
  console.log('Second visit uid:', second.uid?.id);
  console.log('Second visit conv:', second.convIds[0]);
  await second.page.close();

  const resumed = first.convIds[0] === second.convIds[0];
  console.log('\nSame conversation resumed:', resumed ? 'YES ✅' : 'NO ❌');

  await browser.close();
})();
