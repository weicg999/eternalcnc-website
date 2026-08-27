const { chromium } = require('C:/Users/Administrator/node_modules/playwright-core');

const EXEC = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = 'http://localhost:8099/';

(async () => {
  const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

  // ---- 第一次加载：模拟“客户A”（写入身份 X） ----
  await page.goto(BASE, { waitUntil: 'networkidle' }).catch(()=>{});
  await page.waitForTimeout(2500);
  const uidA = await page.evaluate(() => {
    let u = JSON.parse(localStorage.getItem('eternalcnc_coze_uid') || 'null');
    if (!u) return null;
    return u.id;
  });
  const activeA = await page.evaluate(() => localStorage.getItem('eternalcnc_coze_active'));

  // 打开聊天，看是否初始化、有无报错
  const fab = await page.$('#coze-custom-fab');
  let chatOpened = false;
  if (fab) {
    await fab.click().catch(()=>{});
    await page.waitForTimeout(3000);
    chatOpened = await page.evaluate(() => !!document.querySelector('[class*="coze-chat-sdk"]'));
  }

  // ---- 模拟“换客户”：把身份改成 Y，重载（同浏览器，不同 ID） ----
  await page.evaluate(() => {
    const y = 'visitor-B-' + Date.now().toString(16);
    localStorage.setItem('eternalcnc_coze_uid', JSON.stringify({ id: y, ts: Date.now() }));
  });
  await page.reload({ waitUntil: 'networkidle' }).catch(()=>{});
  await page.waitForTimeout(2500);
  const uidB = await page.evaluate(() => {
    const u = JSON.parse(localStorage.getItem('eternalcnc_coze_uid') || 'null');
    return u ? u.id : null;
  });
  const activeB = await page.evaluate(() => localStorage.getItem('eternalcnc_coze_active'));
  const clearedFlag = await page.evaluate(() => window.__coze_cleared || null);

  await browser.close();

  console.log(JSON.stringify({
    uidA, activeA,
    chatOpened,
    uidB, activeB,
    activeMatchesUidB: activeB === uidB,
    errors: errors.slice(0, 10)
  }, null, 2));
})();
