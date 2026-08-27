const { chromium } = require('C:/Users/Administrator/node_modules/playwright-core');
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  page.on('console', m => console.log('CONSOLE:', m.text()));
  page.on('pageerror', e => console.log('PAGEERROR:', e.message));

  await page.goto('http://localhost:8099/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // click custom fab to open chat
  await page.locator('#coze-custom-fab').click({ force: true });
  await page.waitForTimeout(2500);

  // inspect all fixed/absolute positioned elements that look like chat container
  const info = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    const candidates = all.filter(el => {
      const style = window.getComputedStyle(el);
      return (style.position === 'fixed' || style.position === 'absolute') &&
             (el.className && typeof el.className === 'string' && el.className.includes('coze-chat-sdk'));
    }).map(el => ({
      tag: el.tagName,
      id: el.id,
      className: el.className,
      rect: el.getBoundingClientRect ? JSON.parse(JSON.stringify(el.getBoundingClientRect())) : null,
      computed: {
        position: window.getComputedStyle(el).position,
        width: window.getComputedStyle(el).width,
        height: window.getComputedStyle(el).height,
        top: window.getComputedStyle(el).top,
        right: window.getComputedStyle(el).right,
        bottom: window.getComputedStyle(el).bottom,
        left: window.getComputedStyle(el).left,
        maxWidth: window.getComputedStyle(el).maxWidth,
        borderRadius: window.getComputedStyle(el).borderRadius,
        zIndex: window.getComputedStyle(el).zIndex
      },
      childrenCount: el.children.length,
      firstChildClass: el.children[0] ? el.children[0].className : null
    }));
    return candidates;
  });

  console.log('=== chat window candidates ===');
  console.log(JSON.stringify(info, null, 2));

  // also dump direct children of body that contain coze
  const bodyKids = await page.evaluate(() => {
    return Array.from(document.body.children)
      .filter(el => (el.className || '').toString().includes('coze'))
      .map(el => ({
        tag: el.tagName,
        id: el.id,
        className: el.className.toString(),
        childCount: el.children.length
      }));
  });
  console.log('=== body children with coze ===');
  console.log(JSON.stringify(bodyKids, null, 2));

  await browser.close();
})();
