const { chromium } = require('C:/Users/Administrator/node_modules/playwright-core');
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function collectConversation(userLabel, clearStorage) {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const convIds = [];
  page.on('console', m => {
    const text = m.text();
    const match = text.match(/conversation_id:\s*([a-zA-Z0-9_-]+)/);
    if (match && !convIds.includes(match[1])) convIds.push(match[1]);
  });

  await page.goto('http://localhost:8077/', { waitUntil: 'networkidle' });
  if (clearStorage) {
    await page.evaluate(() => {
      localStorage.removeItem('eternalcnc_coze_uid');
      localStorage.removeItem('eternalcnc_coze_active');
      // also remove coze sdk storage if any
      Object.keys(localStorage).forEach(k => { if (k.toLowerCase().includes('coze') || k.toLowerCase().includes('slardar')) localStorage.removeItem(k); });
    });
    await page.reload({ waitUntil: 'networkidle' });
  }

  const uid = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('eternalcnc_coze_uid') || 'null'); } catch (e) { return null; }
  });

  await page.waitForTimeout(1500);
  await page.locator('#coze-custom-fab').click({ force: true });
  await page.waitForTimeout(3000);

  await browser.close();
  return { userLabel, uid, convIds };
}

(async () => {
  console.log('=== User A (fresh) ===');
  const a = await collectConversation('A', true);
  console.log(JSON.stringify(a, null, 2));

  console.log('=== User B (fresh, different uid) ===');
  const b = await collectConversation('B', true);
  console.log(JSON.stringify(b, null, 2));

  const isolated = a.convIds.length && b.convIds.length && a.convIds[0] !== b.convIds[0];
  console.log('\n=== RESULT ===');
  console.log('A conversation_id:', a.convIds[0] || 'NONE');
  console.log('B conversation_id:', b.convIds[0] || 'NONE');
  console.log('Isolated (different):', isolated ? 'YES ✅' : 'NO ❌');
})();
