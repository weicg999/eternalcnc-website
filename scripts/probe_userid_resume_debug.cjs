const { chromium } = require('C:/Users/Administrator/node_modules/playwright-core');
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const context = await browser.newContext();

  async function openPage(label) {
    const page = await context.newPage();
    const convIds = [];
    page.on('console', m => {
      const text = m.text();
      const match = text.match(/conversation_id:\s*([a-zA-Z0-9_-]+)/);
      if (match && !convIds.includes(match[1])) convIds.push(match[1]);
    });
    await page.goto('http://localhost:8099/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const store = await page.evaluate(() => ({
      uid: localStorage.getItem('eternalcnc_coze_uid'),
      active: localStorage.getItem('eternalcnc_coze_active')
    }));
    console.log(`[${label}] store:`, store);
    await page.locator('#coze-custom-fab').click({ force: true });
    await page.waitForTimeout(3500);
    const afterStore = await page.evaluate(() => ({
      uid: localStorage.getItem('eternalcnc_coze_uid'),
      active: localStorage.getItem('eternalcnc_coze_active')
    }));
    console.log(`[${label}] afterStore:`, afterStore);
    return { page, convIds };
  }

  const first = await openPage('first');
  console.log('First conv:', first.convIds);
  await first.page.close();

  const second = await openPage('second');
  console.log('Second conv:', second.convIds);
  await second.page.close();

  await browser.close();
})();
