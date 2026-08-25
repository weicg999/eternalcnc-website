import fs from 'fs';

// ---------- 通用工具 ----------
function imgBlock(src, alt) {
  return `        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="${src}" alt="${alt}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>`;
}

function gallerySection(title, sub, imgs) {
  const blocks = imgs.map(([src, alt]) => imgBlock(src, alt)).join('\n');
  return `  <!-- 产品图库 -->
  <section style="background-color: var(--page-bg); padding: 80px 0;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <span class="red-line mx-auto"></span>
        <h2 class="text-3xl font-bold" style="color: var(--brand-dark);">${title}</h2>
        <p class="mt-4 text-lg" style="color: var(--text-muted);">${sub}</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
${blocks}
      </div>
    </div>
  </section>

`;
}

// ---------- 1. 五个 case 子页 gallery ----------
const caseGalleries = [
  {
    file: 'src/pages/zh/cases/5-axis/index.astro',
    title: '五轴加工图库',
    sub: '五轴加工实拍与复杂零件案例。',
    imgs: [
      ['/images/equipment/gallery/cnc-5axis-machine-01.webp', '五轴CNC加工中心特写'],
      ['/images/equipment/gallery/cnc-5axis-machine-03.webp', '五轴主轴加工中'],
      ['/images/equipment/gallery/cnc-5axis-machine-05.webp', '五轴摇篮工作台'],
      ['/images/parts/cnc-machined-aluminum-valve-elbow-fitting-01.webp', '五轴加工复杂铝件'],
      ['/images/parts/cnc-machined-aluminum-automation-manifold-block-02.webp', '五轴铣削铝组件'],
      ['/images/equipment/gallery/cnc-machine-closeup-11.webp', '五轴CNC加工特写'],
    ],
  },
  {
    file: 'src/pages/zh/cases/electronics/index.astro',
    title: '电子零件图库',
    sub: '电子行业精密CNC加工零件实拍。',
    imgs: [
      ['/images/parts/cnc-machined-aluminum-automation-manifold-block-01.webp', '精密铝歧管块'],
      ['/images/parts/cnc-machined-aluminum-automation-manifold-block-02.webp', '精密铝组件'],
      ['/images/parts/cnc-machined-aluminum-bicycle-frame-link-pair-01.webp', '铝合金连杆件'],
      ['/images/parts/cnc-machined-aluminum-coolant-pump-body-01.webp', '冷却泵体'],
      ['/images/parts/cnc-machined-aluminum-coolant-pump-housing-pair-01.webp', '冷却泵壳体'],
      ['/images/parts/cnc-machined-aluminum-coolant-pump-impeller-cover-01.webp', '冷却泵叶轮盖'],
    ],
  },
  {
    file: 'src/pages/zh/cases/mass-production/index.astro',
    title: '批量生产图库',
    sub: '批量生产零件的加工实拍与成品。',
    imgs: [
      ['/images/parts/cnc-machined-aluminum-motor-end-cover-01.webp', '电机端盖'],
      ['/images/parts/cnc-machined-aluminum-motor-housing-01.webp', '电机壳体'],
      ['/images/parts/cnc-machined-aluminum-motor-mount-bracket-01.webp', '电机安装支架'],
      ['/images/parts/cnc-machined-aluminum-sandblasted-anodized-linkage-01.webp', '喷砂阳极氧化连杆'],
      ['/images/parts/微信图片_20260808142011_62_331_副本.webp', '量产铝件实拍'],
      ['/images/parts/微信图片_20260808143427_75_331_副本.webp', '批量加工零件'],
    ],
  },
  {
    file: 'src/pages/zh/cases/prototype/index.astro',
    title: '原型打样图库',
    sub: '快速打样零件的加工实拍。',
    imgs: [
      ['/images/parts/cnc-machined-aluminum-bicycle-stem-01.webp', '铝合金自行车把立'],
      ['/images/parts/cnc-machined-aluminum-coolant-pump-housing-01.webp', '冷却泵壳体'],
      ['/images/parts/cnc-machined-aluminum-coolant-pump-housing-set-01.webp', '冷却泵壳体组'],
      ['/images/parts/cnc-machined-aluminum-valve-tee-fitting-01.webp', '铝阀三通接头'],
      ['/images/parts/cnc-machining-5axis-milling-aluminum-cylinder-coolant-01.webp', '五轴铣削铝缸体'],
      ['/images/parts/微信图片_20260808140425_59_331_副本.webp', '原型铝件实拍'],
    ],
  },
  {
    file: 'src/pages/zh/cases/turning/index.astro',
    title: '车削加工图库',
    sub: '车削加工零件实拍与成品展示。',
    imgs: [
      ['/images/parts/cnc-machined-aluminum-motor-flange-01.webp', '电机法兰'],
      ['/images/parts/cnc-machined-aluminum-motor-housing-02.webp', '电机壳体'],
      ['/images/parts/cnc-machined-aluminum-precision-parts-collection-01.webp', '精密铝件集锦'],
      ['/images/parts/cnc-machined-aluminum-sandblasted-anodized-y-bracket-01.webp', '喷砂阳极氧化Y型支架'],
      ['/images/parts/cnc-machining-flat-aluminum-electrode-coolant-spray-01.webp', '平面铝电极加工'],
      ['/images/parts/cnc-machining-vertical-machining-center-large-aluminum-housing-01.webp', '大型铝壳体加工'],
    ],
  },
];

let log = [];
for (const c of caseGalleries) {
  const txt = fs.readFileSync(c.file, 'utf8');
  const anchor = '  <!-- Case Cards -->';
  const idx = txt.indexOf(anchor);
  if (idx === -1) { log.push(`❌ ${c.file}: 未找到锚点 Case Cards`); continue; }
  const section = gallerySection(c.title, c.sub, c.imgs);
  const updated = txt.slice(0, idx) + section + txt.slice(idx);
  fs.writeFileSync(c.file, updated);
  log.push(`✅ ${c.file} → 插入「${c.title}」`);
}

// ---------- 2. tolerance：插入检测设备 section ----------
{
  const file = 'src/pages/zh/capabilities/tolerance/index.astro';
  let txt = fs.readFileSync(file, 'utf8');
  const qualitySection = `  <!-- 检测设备 -->
  <section style="background-color: var(--page-bg); padding: 80px 0;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <span class="red-line mx-auto"></span>
        <h2 class="text-3xl font-bold" style="color: var(--brand-dark);">检测设备</h2>
        <p class="mt-4 text-lg" style="color: var(--text-muted);">可靠的精密测量设备，为每一件产品保驾护航。</p>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="rounded-industrial overflow-hidden">
          <img src="/images/quality/cnc-quality-cmm-coordinate-measuring-machine-01.webp" alt="三坐标测量机（CMM）精密检测" class="w-full h-64 object-cover" loading="lazy" width="600" height="256" />
        </div>
        <div class="rounded-industrial overflow-hidden">
          <img src="/images/quality/cnc-quality-micrometer-inspection-02.webp" alt="精密千分尺测量" class="w-full h-64 object-cover" loading="lazy" width="600" height="256" />
        </div>
        <div class="rounded-industrial overflow-hidden">
          <img src="/images/quality/cnc-quality-inspecting-machined-part-03.webp" alt="精密测量仪器与检测" class="w-full h-64 object-cover" loading="lazy" width="600" height="256" />
        </div>
      </div>
    </div>
  </section>

`;
  const anchor = '  <!-- CTA -->';
  const idx = txt.indexOf(anchor);
  if (idx === -1) { log.push(`❌ ${file}: 未找到 CTA 锚点`); }
  else { fs.writeFileSync(file, txt.slice(0, idx) + qualitySection + txt.slice(idx)); log.push(`✅ ${file} → 插入「检测设备」3张`); }
}

// ---------- 3. quality-inspection：插入检测实景 showcase ----------
{
  const file = 'src/pages/zh/services/quality-inspection.astro';
  let txt = fs.readFileSync(file, 'utf8');
  const showcase = `  <!-- 检测实景 -->
  <section style="background-color: var(--card-white); padding: 80px 0;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-sm font-semibold uppercase tracking-wider mb-2" style="color: var(--brand-red);">检测实景</p>
      <h2 class="text-3xl font-bold mb-4" style="color: var(--brand-dark);">质检现场一览</h2>
      <p class="mb-12 max-w-2xl" style="color: var(--text-muted);">
        来自我们质检实验室的真实检测场景——精密零件的测量与把关。
      </p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div class="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style="border-color: var(--border-color);">
          <img src="/images/cases/robotics/cnc-robotics-precision-motion-control-component-04.webp" alt="微型精密零件质检" width="400" height="300" loading="lazy" class="w-full h-48 object-cover" />
          <div class="p-3"><p class="text-xs font-medium" style="color: var(--brand-dark);">微型零件检测</p></div>
        </div>
        <div class="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style="border-color: var(--border-color);">
          <img src="/images/cases/automotive/cnc-automotive-precision-parts-batch-03.webp" alt="TESA测量设备精密测量" width="400" height="300" loading="lazy" class="w-full h-48 object-cover" />
          <div class="p-3"><p class="text-xs font-medium" style="color: var(--brand-dark);">TESA测量</p></div>
        </div>
        <div class="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style="border-color: var(--border-color);">
          <img src="/images/cases/screws-batch/cnc-machined-screw-batch-showcase.webp" alt="成品CNC加工零件细节" width="400" height="300" loading="lazy" class="w-full h-48 object-cover" />
          <div class="p-3"><p class="text-xs font-medium" style="color: var(--brand-dark);">成品零件细节</p></div>
        </div>
        <div class="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style="border-color: var(--border-color);">
          <img src="/images/cases/screws-batch/cnc-machined-screw-batch-showcase.webp" alt="批量CNC加工螺杆质检" width="400" height="300" loading="lazy" class="w-full h-48 object-cover" />
          <div class="p-3"><p class="text-xs font-medium" style="color: var(--brand-dark);">螺杆批量质检</p></div>
        </div>
      </div>
    </div>
  </section>

`;
  const anchor = '  <!-- CTA -->';
  const idx = txt.indexOf(anchor);
  if (idx === -1) { log.push(`❌ ${file}: 未找到 CTA 锚点`); }
  else { fs.writeFileSync(file, txt.slice(0, idx) + showcase + txt.slice(idx)); log.push(`✅ ${file} → 插入「检测实景」4张`); }
}

// ---------- 4. cases/index：补 3 张图 ----------
{
  const file = 'src/pages/zh/cases/index.astro';
  let txt = fs.readFileSync(file, 'utf8');
  const add1 = `<div class="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style="border-color: var(--border-color);">
          <img src="/images/cases/automotive/cnc-automotive-aluminum-housing-multi-angle-02.webp" alt="铝合金壳体多角度CNC加工" width="400" height="300" loading="lazy" class="w-full h-48 object-cover" />
          <div class="p-3"><p class="text-xs font-medium" style="color: var(--brand-dark);">壳体多角度加工</p></div>
        </div>`;
  const add2 = `<div class="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style="border-color: var(--border-color);">
          <img src="/images/cases/energy/cnc-energy-wind-gearbox-housing-02.webp" alt="风电齿轮箱壳体CNC加工" width="400" height="300" loading="lazy" class="w-full h-48 object-cover" />
          <div class="p-3"><p class="text-xs font-medium" style="color: var(--brand-dark);">风电齿轮箱壳体</p></div>
        </div>`;
  const add3 = `<div class="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style="border-color: var(--border-color);">
          <img src="/images/cases/robotics/cnc-robotics-precision-motion-control-component-04.webp" alt="微型精密零件质检" width="400" height="300" loading="lazy" class="w-full h-48 object-cover" />
          <div class="p-3"><p class="text-xs font-medium" style="color: var(--brand-dark);">精密运动控制组件</p></div>
        </div>`;

  // 锚点：在每张图块的 </div> 后插入，用 img src 定位
  const anchors = [
    ['/images/cases/automotive/cnc-automotive-complex-aluminum-housing-01.webp', add1],
    ['/images/cases/energy/cnc-energy-battery-enclosure-03.webp', add2],
    ['/images/process/cnc-machining-milling-process-worm-shaft-coolant-01.webp', add3],
  ];
  let ok = true;
  for (const [src, add] of anchors) {
    // 找到包含该 src 的整行 img，在它所在的 div 闭合后插入
    const lines = txt.split('\n');
    let done = false;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(src)) {
        // 该 img 行属于 <div class="group..."> 内部，下一行是 </div>，再下一行可能还有 </div>？
        // 结构: div.group > img + div.p3 > p ... 然后 </div> 闭合 p3 外层 div
        let j = i + 1;
        while (j < lines.length && !lines[j].includes('</div>')) j++;
        // j 是第一个 </div>（闭合 p-3 div）
        // 再找一个 </div> 闭合 group div
        let k = j + 1;
        while (k < lines.length && !lines[k].includes('</div>')) k++;
        lines.splice(k + 1, 0, add);
        done = true;
        break;
      }
    }
    if (!done) { ok = false; log.push(`❌ ${file}: 未找到锚点 ${src}`); }
    txt = lines.join('\n');
  }
  if (ok) { fs.writeFileSync(file, txt); log.push(`✅ ${file} → 补 3 张图`); }
}

// ---------- 5. equipment：补 closeup-09 ----------
{
  const file = 'src/pages/zh/capabilities/equipment/index.astro';
  let txt = fs.readFileSync(file, 'utf8');
  const add = `        <div class="rounded-industrial overflow-hidden aspect-square">
          <img src="/images/equipment/gallery/cnc-machine-closeup-09.webp" alt="台群T-V1270S立式加工中心正面" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="400" />
        </div>`;
  const anchor = '/images/equipment/gallery/cnc-workshop-taikan-vertical-machining-center-lineup-01.webp';
  const lines = txt.split('\n');
  let done = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(anchor)) {
      let j = i + 1;
      while (j < lines.length && !lines[j].includes('</div>')) j++;
      lines.splice(j + 1, 0, add);
      done = true;
      break;
    }
  }
  if (!done) log.push(`❌ ${file}: 未找到 taikan lineup 锚点`);
  else { fs.writeFileSync(file, lines.join('\n')); log.push(`✅ ${file} → 补 closeup-09`); }
}

console.log(log.join('\n'));
