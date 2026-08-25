// Add/refresh product-showcase section on all 5 industry pages (zh + en).
// For pages missing the section: insert before CTA (after Quality section).
// For energy pages (which already have the section): only rewrite the 4 image srcs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

const data = {
  medical: {
    title_zh: '医疗器械零件展示', title_en: 'Medical Device Components Showcase',
    sub_zh: '来自车间现场的医疗级零件——诊断设备、手术器械、监护仪支架。',
    sub_en: 'Real factory photos of medical-grade parts — diagnostic equipment, surgical instruments, monitor mounts.',
    items: [
      ['cnc-medical-diagnostic-housing-01', '诊断设备铝外壳CNC加工', 'CNC machined aluminum diagnostic housing'],
      ['cnc-medical-surgical-instrument-02', '不锈钢手术器械零件', 'Stainless steel surgical instrument parts'],
      ['cnc-medical-monitor-mount-arm-03', '监护仪支架CNC加工', 'Patient monitor mounting arm'],
      ['cnc-medical-lab-fixture-tray-04', '医疗夹具与样品托盘', 'Medical lab fixture and sample tray'],
    ],
  },
  electronics: {
    title_zh: '电子通信零件展示', title_en: 'Electronics & Telecom Components Showcase',
    sub_zh: '精密电子零件——散热器、屏蔽壳体、射频连接器。',
    sub_en: 'Precision electronic components — heat sinks, shielded enclosures, RF connectors.',
    items: [
      ['cnc-electronics-aluminum-heat-sink-01', 'CNC加工铝散热器', 'CNC machined aluminum heat sink'],
      ['cnc-electronics-rf-shielded-enclosure-02', '通信设备铝屏蔽壳体', 'Telecom equipment RF shielded enclosure'],
      ['cnc-electronics-rf-connector-03', '精密射频连接器', 'Precision RF connector'],
      ['cnc-electronics-pcb-mount-bracket-04', 'PCB安装支架治具', 'PCB mounting bracket fixture'],
    ],
  },
  aerospace: {
    title_zh: '航空航天零件展示', title_en: 'Aerospace Components Showcase',
    sub_zh: '高可靠性航空零件——卫星结构、舵机壳体、涡轮叶片。',
    sub_en: 'High-reliability aerospace parts — satellite structure, servo housings, turbine blades.',
    items: [
      ['cnc-aerospace-satellite-bracket-01', '卫星结构铝件CNC加工', 'CNC machined aluminum satellite bracket'],
      ['cnc-aerospace-servo-actuator-housing-02', '舵机壳体精密加工', 'Precision servo actuator housing'],
      ['cnc-aerospace-turbine-blade-03', '涡轮叶片精密加工', 'Aerospace turbine blade machining'],
      ['cnc-aerospace-antenna-housing-04', '天线外壳CNC加工', 'Antenna housing CNC machined'],
    ],
  },
  energy: {
    title_zh: '能源装备零件展示', title_en: 'Energy Equipment Components Showcase',
    sub_zh: '清洁能源装备零件——光伏支架、风电齿轮箱、电池外壳。',
    sub_en: 'Clean energy equipment parts — solar mounting, wind gearbox housings, battery enclosures.',
    items: [
      ['cnc-energy-solar-mount-bracket-01', '太阳能光伏支架连接件', 'Solar PV mounting bracket clamp'],
      ['cnc-energy-wind-gearbox-housing-02', '风电齿轮箱壳体加工', 'Wind turbine gearbox housing'],
      ['cnc-energy-battery-enclosure-03', '储能电池铝合金外壳', 'Battery pack aluminum enclosure'],
      ['cnc-energy-pipe-flange-fitting-04', '油气管路法兰接头', 'Oil & gas pipe flange fitting'],
    ],
  },
  'automation-equipment': {
    title_zh: '自动化设备零件展示', title_en: 'Automation Equipment Components Showcase',
    sub_zh: '自动化设备核心零件——直线模组、减速器壳体、夹爪。',
    sub_en: 'Automation equipment core parts — linear modules, reducer housings, grippers.',
    items: [
      ['cnc-automation-linear-slide-rail-01', '直线模组滑轨CNC加工', 'Linear motion slide rail and carriage'],
      ['cnc-automation-harmonic-reducer-housing-02', '谐波/RV减速器壳体', 'Harmonic/RV reducer gearbox housing'],
      ['cnc-automation-pneumatic-gripper-03', '气动夹爪铝件CNC加工', 'Pneumatic gripper finger'],
      ['cnc-automation-chain-link-04', '传送带链节精密加工', 'Conveyor chain link and sprocket'],
    ],
  },
};

const template = (slug, lang) => {
  const d = data[slug];
  const isZh = lang === 'zh';
  const t = isZh ? d.title_zh : d.title_en;
  const s = isZh ? d.sub_zh : d.sub_en;
  const items = d.items.map(([file, altZh, altEn]) => {
    const alt = isZh ? altZh : altEn;
    const label = isZh ? altZh : altEn;
    return `
        <div class="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style="border-color: var(--border-color);">
          <img src="/images/cases/${slug}/${file}.webp" alt="${alt}" width="400" height="300" loading="lazy" class="w-full h-48 object-cover" />
          <div class="p-3"><p class="text-xs font-medium" style="color: var(--brand-dark);">${label}</p></div>
        </div>`;
  }).join('');
  return `

<!-- 产品展示 -->
<section style="background-color: var(--card-white); padding: 80px 0;">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="text-sm font-semibold uppercase tracking-wider mb-2" style="color: var(--brand-red);">${isZh ? '产品展示' : 'Product Showcase'}</p>
    <h2 class="text-3xl font-bold mb-4" style="color: var(--brand-dark);">${t}</h2>
    <p class="mb-12 max-w-2xl" style="color: var(--text-muted);">${s}</p>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${items}
    </div>
  </div>
</section>
`;
};

// Pages where the section must be INSERTED (no existing showcase)
const toInsert = ['medical', 'electronics', 'aerospace', 'automation-equipment'];
// Pages where the section already EXISTS, only src rewrite needed
const toRewrite = ['energy'];

const pageLangs = [
  { lang: 'zh', base: 'src/pages/zh/industries' },
  { lang: 'en', base: 'src/pages/industries' },
];

let totalChanges = 0;

for (const { lang, base } of pageLangs) {
  for (const slug of Object.keys(data)) {
    const file = path.join(root, base, slug, 'index.astro');
    let src = fs.readFileSync(file, 'utf8');

    if (toInsert.includes(slug)) {
      // Find CTA section and insert the showcase just before it
      const marker = '<!-- CTA -->';
      if (!src.includes(marker)) { console.error(`SKIP ${slug}: no CTA marker`); continue; }
      const section = template(slug, lang);
      src = src.replace(marker, section + '\n  ' + marker);
      console.log(`INSERT  ${lang}/${slug}`);
    } else if (toRewrite.includes(slug)) {
      // Replace 4 image src jpg -> webp
      for (const [file2] of data[slug].items) {
        const oldSrc = `/images/cases/${slug === 'energy' ? 'energy' : slug}/${file2.replace(/^cnc-/, '')}.jpg`;
        // For energy, the existing refs may not be the same names. Just match by .jpg paths in the section.
      }
      // Simpler: replace jpg -> webp in the showcase block specifically
      const re = /\/images\/cases\/[a-z\-\/]+\.jpg/g;
      const before = (src.match(re) || []).length;
      src = src.replace(re, m => m.replace('.jpg', '.webp'));
      const after = (src.match(re) || []).length;
      console.log(`REWRITE ${lang}/${slug}  jpg->webp (${before} -> ${after})`);
    }

    fs.writeFileSync(file, src);
    totalChanges++;
  }
}

console.log(`\nDone. files touched: ${totalChanges}`);