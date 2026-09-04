const { chromium } = require('playwright-core');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = 'http://localhost:4325/';
const DAY = 86400000;

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args:['--no-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERROR: '+e.message));

  // 准备：先访问一次拿到 localStorage 作用域
  await page.goto(BASE, { waitUntil: 'networkidle' }).catch(()=>{});
  await sleep(1500);

  async function openAndInspect(label, uidSetup) {
    // 设置 localStorage 后重载
    await page.evaluate((setup) => {
      if (setup === 'clear') { localStorage.removeItem('eternalcnc_coze_uid'); localStorage.removeItem('SLARDARbot_studio_sdk'); }
      else if (setup === 'old3d') { localStorage.setItem('eternalcnc_coze_uid', JSON.stringify({ id:'old-'+Date.now(), ts: Date.now() - 3*86400000 })); }
      else if (setup === 'old30m') { localStorage.setItem('eternalcnc_coze_uid', JSON.stringify({ id:'recent-'+Date.now(), ts: Date.now() - 30*60000 })); }
    }, uidSetup);
    await page.reload({ waitUntil: 'networkidle' }).catch(()=>{});
    await sleep(2000);
    // 点浮球
    const fab = await page.$('#coze-custom-fab');
    let fabVisible = false;
    if (fab) {
      const disp = await fab.evaluate(el => getComputedStyle(el).display);
      fabVisible = disp !== 'none';
      await fab.click().catch(e=>errors.push('click fab: '+e.message));
    }
    await sleep(3500); // 等聊天窗 + 弹窗
    const modal = await page.$('#eternalcnc-hist-modal');
    const newBtn = await page.$('#coze-newchat-fab');
    const hint = await page.$('#eternalcnc-chat-hint');
    const sdkStore = await page.evaluate(() => localStorage.getItem('SLARDARbot_studio_sdk') ? 'present' : 'absent');
    const uidStore = await page.evaluate(() => localStorage.getItem('eternalcnc_coze_uid'));
    console.log(`\n[${label}]`);
    console.log('  fab visible      :', fabVisible);
    console.log('  history modal    :', modal ? 'SHOWN' : 'none');
    console.log('  new-chat button  :', newBtn ? 'present' : 'MISSING');
    console.log('  footer hint      :', hint ? 'present' : 'MISSING');
    console.log('  SDK store        :', sdkStore);
    console.log('  uid store        :', uidStore);
    return { modal: !!modal, newBtn: !!newBtn, hint: !!hint };
  }

  const r1 = await openAndInspect('CASE fresh (clear)', 'clear');
  const r2 = await openAndInspect('CASE 3-day-old -> popup', 'old3d');
  // 在弹窗里点“继续”确认可关
  if (r2.modal) {
    const cont = await page.$('#hist-continue');
    if (cont) { await cont.click().catch(()=>{}); await sleep(500); }
  }
  const r3 = await openAndInspect('CASE 30-min-old -> silent', 'old30m');

  // 点“新对话”按钮看是否报错
  const nb = await page.$('#coze-newchat-fab');
  if (nb) { await nb.click().catch(e=>errors.push('newchat click: '+e.message)); await sleep(1500); }

  console.log('\n=== CONSOLE ERRORS ('+errors.length+') ===');
  errors.slice(0,15).forEach(e=>console.log('  - '+e));

  await browser.close();
})().catch(e=>{ console.error('FATAL', e); process.exit(1); });
