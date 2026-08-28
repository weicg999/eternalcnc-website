// 无头验证：浮球→面板→流式渲染→两访客隔离→移动端全屏
const { chromium } = require('C:/Users/Administrator/node_modules/playwright-core');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = 'http://localhost:8100/';

function assert(cond, msg) {
  if (!cond) throw new Error('ASSERT FAIL: ' + msg);
  console.log('  ✓ ' + msg);
}

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });

  console.log('[1] Context A: 浮球 + 面板 + 流式');
  const ctxA = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pA = await ctxA.newPage();
  const errs = [];
  pA.on('pageerror', (e) => errs.push(String(e)));
  await pA.goto(BASE, { waitUntil: 'networkidle' });
  await pA.waitForSelector('#ec-fab', { timeout: 10000 });
  assert(true, '浮球 #ec-fab 存在');
  await pA.click('#ec-fab');
  await pA.waitForSelector('#ec-panel:not(.ec-hidden)', { timeout: 5000 });
  assert(true, '点击浮球后面板出现');

  await pA.fill('#ec-input', 'Hello bot');
  await pA.click('#ec-send');
  await pA.waitForSelector('.ec-msg.bot', { timeout: 8000 });
  // 等待流式结束（typing 类消失）
  await pA.waitForFunction(() => {
    const b = document.querySelector('.ec-msg.bot:last-child');
    return b && !b.classList.contains('ec-typing') && b.textContent.length > 5;
  }, { timeout: 15000 });
  const botText = await pA.$eval('.ec-msg.bot:last-child', (el) => el.textContent);
  assert(botText.indexOf('Hello from mock bot') === 0, 'bot 流式回复渲染完成: ' + botText);
  assert(errs.length === 0, '无 JS 报错 (' + errs.join('; ') + ')');

  const stateA = await pA.evaluate(() => JSON.parse(localStorage.getItem('eternalcnc_coze_state')));
  assert(stateA && /^visitor-/.test(stateA.user), 'stateA.user 为独立标识: ' + stateA.user);
  assert(stateA && stateA.conversation_id && stateA.conversation_id.indexOf('mock-conv-') === 0, 'stateA.conversation_id 已建: ' + stateA.conversation_id);

  console.log('[2] Context B: 隔离（不同访客）');
  const ctxB = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pB = await ctxB.newPage();
  await pB.goto(BASE, { waitUntil: 'networkidle' });
  const stateB = await pB.evaluate(() => JSON.parse(localStorage.getItem('eternalcnc_coze_state') || 'null'));
  assert(stateB && stateB.user && stateB.user !== stateA.user, 'B 与 A 的 user 不同 → 隔离生效 (A=' + stateA.user + ' B=' + stateB.user + ')');

  console.log('[3] 移动端全屏 (375x800)');
  const mctx = await browser.newContext({ viewport: { width: 375, height: 800 }, isMobile: true, hasTouch: true });
  const mp = await mctx.newPage();
  await mp.goto(BASE, { waitUntil: 'networkidle' });
  await mp.click('#ec-fab');
  await mp.waitForSelector('#ec-panel:not(.ec-hidden)');
  const box = await mp.evaluate(() => {
    const r = document.getElementById('ec-panel').getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height), left: Math.round(r.left), top: Math.round(r.top) };
  });
  assert(box.w >= 370 && box.left <= 1, '移动端面板占满宽: ' + JSON.stringify(box));
  assert(box.h >= 790 && box.top <= 1, '移动端面板占满高: ' + JSON.stringify(box));

  console.log('\\nALL CHECKS PASSED');
  await browser.close();
  process.exit(0);
})().catch((e) => {
  console.error('VERIFY FAIL:', e.message);
  process.exit(1);
});
