#!/usr/bin/env node
// 每周 SEO 自动巡检（无第三方依赖，Node 20+）
// 检查：robots.txt 是否屏蔽 AI 检索爬虫 / sitemap 规模与 www 污染 / 抽查页面健康 / llms.txt 可达
// 输出：报告追加到 docs/seo-audit-reports.md，状态存 docs/.seo-audit-state.json，控制台打印摘要
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://eternalcnc.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPORT = path.join(ROOT, 'docs', 'seo-audit-reports.md');
const STATE = path.join(ROOT, 'docs', '.seo-audit-state.json');

// GEO 必须放行的“检索/引用类”爬虫：任何一个被 Disallow 都算 GEO 受阻
const GEO_CRAWLERS = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'Claude-Web', 'anthropic-ai', 'CCBot', 'PerplexityBot', 'Perplexity-User'];
// 只记录、不算失败的项
const INFO_CRAWLERS = ['Google-Extended', 'Baiduspider', 'Bytespider'];

const SAMPLE_PAGES = ['/', '/capabilities/tolerance/', '/zh/', '/ru/', '/knowledge/faq/'];

const timeout = (ms) => {
  const c = new AbortController();
  setTimeout(() => c.abort(), ms);
  return c.signal;
};

async function get(url, { asText = true } = {}) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: timeout(25000), redirect: 'follow' });
  const body = asText ? await res.text() : '';
  return { status: res.status, finalUrl: res.url, body };
}

function blockedGroups(robotsTxt) {
  const blocked = [];
  const sections = robotsTxt.split(/(?=User-agent:)/i);
  for (const s of sections) {
    const agents = [...s.matchAll(/User-agent:\s*(.+)/gi)].map((m) => m[1].trim());
    const dis = /Disallow:\s*\/\s*$/im.test(s);
    if (dis) blocked.push(...agents);
  }
  return blocked;
}

async function main() {
  const now = new Date();
  const stamp = `${now.toISOString().slice(0, 19).replace('T', ' ')} UTC`;
  const lines = [];
  const alarms = [];
  let geoBlocked = false;

  // 1) robots.txt
  let robotsNote = '';
  try {
    const { body } = await get(`${SITE}/robots.txt`);
    const blocked = blockedGroups(body);
    const geoHits = GEO_CRAWLERS.filter((c) => blocked.some((b) => b.toLowerCase() === c.toLowerCase()));
    const infoHits = INFO_CRAWLERS.filter((c) => blocked.some((b) => b.toLowerCase() === c.toLowerCase()));
    geoBlocked = geoHits.length > 0;
    robotsNote = geoBlocked
      ? `❌ GEO 受阻：${geoHits.join(', ')} 被 robots.txt 屏蔽（去 Cloudflare 后台检查 AI Bot 设置）`
      : `✅ AI 检索爬虫未屏蔽${infoHits.length ? `（仅训练类/其他被屏：${infoHits.join(', ')}，属预期）` : ''}`;
    if (geoBlocked) alarms.push(robotsNote);
  } catch (e) {
    robotsNote = `❌ robots.txt 拉取失败：${e.message}`;
    alarms.push(robotsNote);
  }

  // 2) sitemap
  let sitemapCount = 0;
  let wwwCount = 0;
  let sitemapNote = '';
  try {
    const idx = await get(`${SITE}/sitemap.xml`);
    const first = idx.body.match(/<loc>([^<]+)<\/loc>/)?.[1] || `${SITE}/sitemap-0.xml`;
    const sm = await get(first);
    const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    sitemapCount = locs.length;
    wwwCount = locs.filter((u) => u.includes('www.eternalcnc')).length;
    sitemapNote = wwwCount > 0 ? `❌ sitemap ${sitemapCount} 条，其中含 www 域名 ${wwwCount} 条（污染！）` : `✅ sitemap ${sitemapCount} 条，0 条 www 污染`;
    if (wwwCount > 0) alarms.push(sitemapNote);
  } catch (e) {
    sitemapNote = `❌ sitemap 拉取失败：${e.message}`;
    alarms.push(sitemapNote);
  }

  // 3) 抽查页面
  const pageNotes = [];
  for (const p of SAMPLE_PAGES) {
    try {
      const { status, body } = await get(`${SITE}${p}`);
      const title = body.match(/<title>([^<]*)<\/title>/)?.[1]?.slice(0, 80) || '(无 title)';
      const canonicalBad = /rel="canonical"\s+href="[^"]*www\./.test(body) ? 'canonical指向www!' : '';
      const ok = status === 200 && !canonicalBad && !title.includes('(无');
      pageNotes.push(`${ok ? '✅' : '⚠️'} ${p} [${status}] ${title}${canonicalBad ? ' ' + canonicalBad : ''}`);
      if (!ok) alarms.push(`页面异常：${p} [${status}]`);
    } catch (e) {
      pageNotes.push(`❌ ${p} 拉取失败：${e.message}`);
      alarms.push(`页面拉取失败：${p}`);
    }
  }

  // 4) llms.txt
  let llmsNote = '';
  try {
    const { status } = await get(`${SITE}/llms.txt`);
    llmsNote = status === 200 ? '✅ llms.txt 可达' : `⚠️ llms.txt 状态 ${status}`;
  } catch (e) {
    llmsNote = `❌ llms.txt 拉取失败：${e.message}`;
  }

  // 5) 与上次状态对比
  let deltaNote = '';
  let prevState = null;
  try {
    prevState = JSON.parse(fs.readFileSync(STATE, 'utf8'));
  } catch {}
  if (prevState) {
    const d = sitemapCount - (prevState.sitemapCount || 0);
    deltaNote = `上次 ${prevState.stamp}：sitemap ${prevState.sitemapCount} 条 → 本次 ${sitemapCount} 条（${d >= 0 ? '+' : ''}${d}）`;
    if (prevState.sitemapCount && sitemapCount < prevState.sitemapCount * 0.9) {
      alarms.push(`⚠️ sitemap 条数比上周骤降 ${Math.round((1 - sitemapCount / prevState.sitemapCount) * 100)}%`);
    }
    if (!prevState.geoBlocked && geoBlocked) alarms.push('⚠️ robots 本周新出现了 AI 爬虫屏蔽（Cloudflare 设置可能被改动）');
  } else {
    deltaNote = '（首次基线，无对比）';
  }

  // 输出
  lines.push(`\n## ${stamp}\n`);
  lines.push(`- ${robotsNote}`);
  lines.push(`- ${sitemapNote}${deltaNote ? `｜${deltaNote}` : ''}`);
  lines.push(`- ${llmsNote}`);
  lines.push(`- 抽查页面：`);
  pageNotes.forEach((n) => lines.push(`  - ${n}`));
  if (alarms.length) {
    lines.push(`\n**🔴 告警 ${alarms.length} 条**`);
    alarms.forEach((a) => lines.push(`- ${a}`));
  } else {
    lines.push(`\n**🟢 本周无告警**`);
  }
  fs.appendFileSync(REPORT, lines.join('\n') + '\n', 'utf8');
  fs.writeFileSync(STATE, JSON.stringify({ stamp, sitemapCount, geoBlocked }, null, 2), 'utf8');

  console.log(`=== SEO 巡检 ${stamp} ===`);
  lines.forEach((l) => console.log(l));
  console.log(`\n报告已追加：${REPORT}`);
}

main().catch((e) => {
  console.error('巡检脚本自身出错：', e);
  process.exit(1);
});
