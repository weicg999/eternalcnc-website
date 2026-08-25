import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const UPLOADS = path.join(ROOT, '_uploads');
const OUT_BASE = path.join(ROOT, 'public');

const RETINA = 2;          // 输出 2x 用于 retina 清晰
const WEBP_QUALITY = 85;   // 用户选定
const TRIM = 25;           // 去背景阈值，白底零件图精准框住主体

// 每个 _uploads 分类 -> 输出位置 / 尺寸[显示w,显示h] / SEO base / alt 模板
// subTag 取自分类下的第一级英文子目录（如 cooling-parts），否则 'aluminum'
const CONFIG = {
  parts:      { target: 'images/parts', size: [800, 600],  base: 'cnc-precision-machined', alt: (s) => `Precision CNC machined ${s}` },
  machines:   { target: 'images/equipment/gallery', size: [800, 800], base: 'cnc-machine', alt: (s) => `CNC machining center ${s}` },
  process:    { target: 'images/equipment/gallery', size: [1280, 720], base: 'cnc-machining-process', alt: (s) => `CNC machining process ${s}` },
  industries: { target: 'images/industries', size: [1200, 800], base: 'industry-application', alt: (s) => `CNC machined component for ${s}`,
               fixed: { medical: 'medical', robotics: 'robotics', aerospace: 'aerospace', energy: 'energy' } },
  about:      { target: 'images/about', size: [1200, 720], base: 'factory-team', alt: (s) => `Eternal CNC ${s}` },
  others:     { target: 'images/others', size: [800, 600], base: 'cnc-related', alt: (s) => `CNC related ${s}` },
};

const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.bmp']);
const slug = (s) => String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'general';

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

// rel 形如 parts/aluminum/cooling-parts/冷却零件/x.jpg -> subTag = cooling-parts
function subTagOf(rel) {
  const segs = rel.split(path.sep);
  const rest = segs.slice(2).filter((s) => !/^\..*$|\.[a-z0-9]+$/i.test(s)); // 去掉文件名段
  return rest[0] ? slug(rest[0]) : 'aluminum';
}

(async () => {
  const manifest = [];
  for (const cat of Object.keys(CONFIG)) {
    const dir = path.join(UPLOADS, cat);
    const files = walk(dir).filter((f) => IMG_EXT.has(path.extname(f).toLowerCase()));
    const counters = {};
    for (const f of files) {
      const rel = path.relative(UPLOADS, f);
      const sub = subTagOf(rel);
      counters[sub] = (counters[sub] || 0) + 1;
      const n = String(counters[sub]).padStart(2, '0');
      const cfg = CONFIG[cat];
      let name;
      if (cat === 'industries' && cfg.fixed && cfg.fixed[sub]) name = cfg.fixed[sub] + '.webp';
      else name = `${cfg.base}-${sub}-${n}.webp`;
      const outDir = path.join(OUT_BASE, cfg.target);
      fs.mkdirSync(outDir, { recursive: true });
      const [w, h] = cfg.size;
      await sharp(f)
        .trim({ threshold: TRIM })
        .resize(w * RETINA, h * RETINA, { fit: 'cover', position: 'centre' })
        .sharpen()
        .webp({ quality: WEBP_QUALITY })
        .toFile(path.join(outDir, name));
      manifest.push({ cat, sub, src: '/' + cfg.target + '/' + name, alt: cfg.alt(sub), width: w, height: h });
      console.log('✓', name);
    }
  }
  fs.mkdirSync(path.join(ROOT, 'src', 'data'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'src', 'data', 'parts-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('\nTOTAL', manifest.length);
})().catch((e) => { console.error(e); process.exit(1); });
