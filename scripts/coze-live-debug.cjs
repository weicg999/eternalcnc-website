// 无头浏览器调试线上 Coze 聊天组件「闪现即隐藏」问题
// 方法论：① 扫 position:fixed ② force 点击 ③ console+pageerror+requestfailed+response 四路监听
const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const logs = [];
  page.on('console', m => logs.push('[console:' + m.type() + '] ' + m.text()));
  page.on('pageerror', e => logs.push('[pageerror] ' + e.message));
  page.on('requestfailed', r => logs.push('[requestfailed] ' + r.url() + ' ' + (r.failure() ? r.failure().errorText : '')));
  page.on('response', async r => {
    const url = r.url();
    if (/coze|chat-token/.test(url)) {
      let body = '';
      try { body = (await r.text()).slice(0, 200); } catch (e) { body = '<body unreadable>'; }
      logs.push('[response:' + r.status() + '] ' + url.slice(0, 120) + ' :: ' + body.replace(/\s+/g, ' '));
    }
  });

  await page.goto('https://www.eternalcnc.com/', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(6000); // 等 SDK 加载 + bootstrap

  // ① 扫 position:fixed 元素（找 cookie banner / z-index 冲突）
  const fixed = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('body *').forEach(el => {
      const s = getComputedStyle(el);
      if (s.position === 'fixed' && s.display !== 'none' && el.offsetWidth > 20) {
        const r = el.getBoundingClientRect();
        out.push({ id: el.id, cls: String(el.className).slice(0, 60), z: s.zIndex, w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) });
      }
    });
    return out;
  });
  console.log('=== FIXED ELEMENTS (load +6s) ===');
  fixed.forEach(f => console.log(JSON.stringify(f)));

  // ② FAB 当前状态
  const fabState = await page.evaluate(() => {
    const fab = document.getElementById('coze-custom-fab');
    if (!fab) return { err: 'FAB NOT FOUND' };
    const s = getComputedStyle(fab);
    const r = fab.getBoundingClientRect();
    return { display: s.display, visibility: s.visibility, opacity: s.opacity, w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) };
  });
  console.log('=== FAB STATE ===', JSON.stringify(fabState));

  // ③ force 点击 FAB，随后 10 秒内每秒采样聊天窗开合状态
  try {
    await page.click('#coze-custom-fab', { force: true });
    logs.push('[click] fab clicked');
  } catch (e) { logs.push('[click] FAILED: ' + e.message); }

  for (let i = 0; i < 10; i++) {
    await page.waitForTimeout(1000);
    const st = await page.evaluate(() => {
      const els = [];
      document.querySelectorAll('[class*="coze-chat-sdk"]').forEach(el => {
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (r.width > 60 && r.height > 60) {
          els.push({ cls: String(el.className).slice(0, 50), display: s.display, w: Math.round(r.width), h: Math.round(r.height) });
        }
      });
      const fab = document.getElementById('coze-custom-fab');
      return {
        fabDisplay: fab ? getComputedStyle(fab).display : 'GONE',
        visibleChatEls: els,
      };
    });
    console.log('t+' + (i + 1) + 's:', JSON.stringify(st));
    if (i === 3) await page.screenshot({ path: 'F:/V7/scripts/coze-debug-t4.png' });
  }
  await page.screenshot({ path: 'F:/V7/scripts/coze-debug-final.png' });

  // ④ 尝试在聊天窗里找输入框并发一句测试
  const typed = await page.evaluate(() => {
    const ta = document.querySelector('[class*="coze-chat-sdk"] textarea, [class*="chat"] textarea');
    return ta ? 'FOUND textarea' : 'NO textarea';
  });
  console.log('=== INPUT ===', typed);

  console.log('=== LOGS ===');
  logs.forEach(l => console.log(String(l).slice(0, 260)));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
