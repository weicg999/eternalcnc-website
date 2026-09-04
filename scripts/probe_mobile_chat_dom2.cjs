const { chromium } = require('C:/Users/Administrator/node_modules/playwright-core');
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' });
  const page = await context.newPage();
  await page.goto('http://localhost:8077/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.locator('#coze-custom-fab').click({ force: true });
  await page.waitForTimeout(2500);

  const container = await page.evaluate(() => {
    const el = document.querySelector('.coze-chat-sdk:not([class*="coze-chat-sdk-semi"])');
    if (!el) return null;
    return {
      tag: el.tagName,
      id: el.id,
      className: el.className,
      isBodyChild: el.parentElement === document.body,
      parentTag: el.parentElement ? el.parentElement.tagName : null,
      parentClass: el.parentElement ? el.parentElement.className : null,
      rect: JSON.parse(JSON.stringify(el.getBoundingClientRect())),
      computed: {
        position: window.getComputedStyle(el).position,
        width: window.getComputedStyle(el).width,
        height: window.getComputedStyle(el).height,
        top: window.getComputedStyle(el).top,
        right: window.getComputedStyle(el).right,
        bottom: window.getComputedStyle(el).bottom,
        left: window.getComputedStyle(el).left,
        transform: window.getComputedStyle(el).transform,
        borderRadius: window.getComputedStyle(el).borderRadius
      }
    };
  });

  console.log(JSON.stringify(container, null, 2));
  await browser.close();
})();
