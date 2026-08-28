const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });
  const page = await browser.newPage();
  const logs = [];
  page.on('console', msg => logs.push(`${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => logs.push(`PAGEERROR: ${err.message}`));

  await page.goto('https://www.eternalcnc.com/contact/get-a-quote', { waitUntil: 'networkidle' });

  // Step 1: upload a dummy file
  const fileInput = await page.locator('#file-input');
  await fileInput.setInputFiles({
    name: 'test-part.step',
    mimeType: 'application/step',
    buffer: Buffer.from('// dummy step content')
  });
  await page.click('#quote-form-element button[type="button"]:has-text("Next")').catch(() => {});

  // Use next button by selector since text may vary
  const nextBtn = await page.locator('#quote-form-element button:has-text("Next")');
  if (await nextBtn.isVisible().catch(() => false)) await nextBtn.click();

  // Step 2: select material and quantity
  const nextBtn2 = await page.locator('#quote-form-element button:has-text("Next")');
  if (await nextBtn2.isVisible().catch(() => false)) await nextBtn2.click();

  // Step 3: fill contact info
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');

  // Click submit
  await page.click('#quote-form-element button[type="submit"]').catch(() => {});
  await page.waitForTimeout(1500);

  // Check DOM
  const successVisible = await page.locator('#qf-success').isVisible().catch(() => false);
  const actionsVisible = await page.locator('#qf-mailto-actions').isVisible().catch(() => false);
  const linkHref = await page.locator('#qf-mailto-link').getAttribute('href').catch(() => 'null');
  const bodyValue = await page.locator('#qf-mail-body').inputValue().catch(() => 'null');

  console.log('=== DOM STATE ===');
  console.log('qf-success visible:', successVisible);
  console.log('qf-mailto-actions visible:', actionsVisible);
  console.log('mailto link href starts with:', linkHref.slice(0, 60));
  console.log('mail body length:', bodyValue.length);
  console.log('=== LOGS ===');
  logs.forEach(l => console.log(l));

  await browser.close();
})();
