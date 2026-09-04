const { chromium } = require('playwright-core');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const logs = [];
  page.on('console', m => logs.push(`[console.${m.type()}] ${m.text()}`));
  page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));

  await page.goto('http://localhost:4325/', { waitUntil: 'networkidle', timeout: 30000 }).catch(e => logs.push('goto err: ' + e.message));

  // wait for fab
  await page.waitForSelector('#coze-custom-fab', { timeout: 15000 }).catch(e => logs.push('fab wait: ' + e.message));
  await page.waitForTimeout(3000);

  // Click fab to open chat
  await page.click('#coze-custom-fab').catch(e => logs.push('click fab: ' + e.message));
  await page.waitForTimeout(6000); // let chat open + bot greeting

  // Dump all images anywhere in document (incl. SDK injected DOM)
  const imgs = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('img').forEach((img, i) => {
      out.push({
        idx: i,
        src: img.getAttribute('src'),
        cls: img.className,
        w: img.width,
        h: img.height,
        alt: img.getAttribute('alt'),
        // nearest container class for context
        parentCls: img.parentElement ? img.parentElement.className : '',
      });
    });
    return out;
  });

  console.log('=== IMAGES IN DOM ===');
  console.log(JSON.stringify(imgs, null, 2));

  console.log('=== CONSOLE LOGS ===');
  console.log(logs.join('\n'));

  await page.screenshot({ path: 'F:/V7/scripts/coze-chat-probe.png', fullPage: false });
  console.log('screenshot saved');

  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
