// Optimize equipment/ images for the Eternal CNC Astro site.
//   - Equipment CARDS: resize + centre-crop to 800x600 (4:3) then WebP q82.
//   - Equipment GALLERY: resize + centre-crop to 800x800 (1:1) then WebP q82.
//   - Original jpg/png are KEPT (env safe-delete shim blocks overwrite of
//     public/ files); they become dormant fallbacks after we rewrite refs.
//   - Reference rewrite is SCOPED to .astro files that reference /images/equipment/
//     paths so we don't accidentally touch other images (logos, og, parts, ...).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dir = path.join(root, 'public/images/equipment');

const sharp = (await import('sharp')).default;

// --- CARDS: 12 台设备列表卡，4:3 居中裁切 → 800x600 webp ---
const cardJpg = fs.readdirSync(dir)
  .filter(n => /\.(jpe?g|png)$/i.test(n))
  .filter(n => /^cnc-machine-/.test(n) || n === 'equipment-taikan-tv856s-hero.jpg');

let made = 0, errors = 0;
for (const name of cardJpg) {
  const src = path.join(dir, name);
  const out = src.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    const buf = await sharp(src)
      .resize(800, 600, { fit: 'cover', position: 'attention' })
      .webp({ quality: 82 })
      .toBuffer();
    fs.writeFileSync(out, buf);
    const s = fs.statSync(src).size;
    console.log(`CARD  ${name.padEnd(60)} -> ${path.basename(out)}  ${(s/1024).toFixed(0)}KB -> ${(buf.length/1024).toFixed(0)}KB`);
    made++;
  } catch (e) {
    console.error(`SKIP  ${name}: ${e.message}`);
    errors++;
  }
}

// --- GALLERY: 车间画廊 1:1 居中裁切 → 800x800 webp ---
const galleryDir = path.join(dir, 'gallery');
const galleryFiles = fs.existsSync(galleryDir)
  ? fs.readdirSync(galleryDir).filter(n => /\.(jpe?g|png)$/i.test(n) && !/\.webp$/i.test(n))
  : [];

for (const name of galleryFiles) {
  const src = path.join(galleryDir, name);
  const out = src.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    const buf = await sharp(src)
      .resize(800, 800, { fit: 'cover', position: 'attention' })
      .webp({ quality: 82 })
      .toBuffer();
    fs.writeFileSync(out, buf);
    const s = fs.statSync(src).size;
    console.log(`GALL  ${name.padEnd(40)} -> ${path.basename(out)}  ${(s/1024).toFixed(0)}KB -> ${(buf.length/1024).toFixed(0)}KB`);
    made++;
  } catch (e) {
    console.error(`SKIP  ${name}: ${e.message}`);
    errors++;
  }
}

console.log(`\n[1/2] Image generation done. generated=${made} errors=${errors}`);

// --- Reference rewrite: scoped to .astro files mentioning /images/equipment/ ---
const pageRoots = [path.join(root, 'src/pages')];
const refRe = /(\/images\/equipment\/[^"'\s)]+?)\.(jpe?g|png)/gi;
let rewrote = 0, totalRefs = 0;
for (const base of pageRoots) {
  (function walk(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (/\.astro$/.test(ent.name)) {
        const txt = fs.readFileSync(p, 'utf8');
        // only files that actually reference equipment images
        if (!/\/images\/equipment\//.test(txt)) continue;
        let n = 0;
        const next = txt.replace(refRe, (m, p1, p2) => { n++; totalRefs++; return `${p1}.webp`; });
        if (n) {
          try {
            fs.writeFileSync(p, next);
            rewrote++;
            console.log(`REWRITE ${path.relative(root, p)} (${n} ref${n>1?'s':''})`);
          } catch (e) {
            console.error(`REWRITE-FAIL ${path.relative(root, p)}: ${e.message}`);
          }
        }
      }
    }
  })(base);
}
console.log(`\n[2/2] Reference rewrite done. files=${rewrote} refs=${totalRefs}`);