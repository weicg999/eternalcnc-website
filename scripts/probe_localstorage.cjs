const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--no-sandbox']
  });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  const logs = [];
  page.on('console', m => logs.push('CONSOLE: ' + m.text()));
  page.on('pageerror', e => logs.push('PAGEERROR: ' + e.message));

  await page.goto('https://www.eternalcnc.com/', { waitUntil: 'networkidle', timeout: 30000 });
  // 等待 SDK 加载
  await page.waitForTimeout(4000);

  // 点击浮球打开聊天
  const fab = await page.$('#coze-custom-fab');
  if (fab) {
    await fab.click();
    await page.waitForTimeout(5000);
  } else {
    logs.push('NO FAB FOUND');
  }

  // 尝试发一条消息
  try {
    const input = await page.$('textarea, input[type="text"]');
    if (input) {
      await input.fill('hello test message');
      await page.waitForTimeout(500);
      // 按 Enter 发送
      await input.press('Enter');
      await page.waitForTimeout(4000);
      logs.push('SENT MESSAGE');
    }
  } catch (e) {
    logs.push('SEND ERR: ' + e.message);
  }

  // dump localStorage
  const ls = await page.evaluate(() => {
    const out = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      let v = localStorage.getItem(k);
      if (v && v.length > 200) v = v.slice(0, 200) + '...[truncated]';
      out[k] = v;
    }
    return out;
  });

  console.log('=== LOCALSTORAGE KEYS (' + Object.keys(ls).length + ') ===');
  console.log(JSON.stringify(ls, null, 2));
  console.log('=== LOGS ===');
  console.log(logs.join('\n'));

  await browser.close();
})();
