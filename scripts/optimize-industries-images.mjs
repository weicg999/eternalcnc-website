// Convert industries PNGs to 800x600 WebP (4:3 to match card display 400x240
// with object-cover). Idempotent — skip if .webp already exists.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dir = path.join(root, 'public/images/industries');
const sharp = (await import('sharp')).default;

const pngs = fs.readdirSync(dir).filter(n => /\.png$/i.test(n) && !/\.webp$/i.test(n));
let made = 0, errors = 0;
for (const name of pngs) {
  const src = path.join(dir, name);
  const out = src.replace(/\.png$/i, '.webp');
  try {
    const buf = await sharp(src).resize(800, 600, { fit: 'cover', position: 'attention' }).webp({ quality: 85 }).toBuffer();
    fs.writeFileSync(out, buf);
    const s = fs.statSync(src).size;
    console.log(`${name.padEnd(60)} -> ${path.basename(out)}  ${(s/1024).toFixed(0)}KB -> ${(buf.length/1024).toFixed(0)}KB`);
    made++;
  } catch (e) {
    console.error(`SKIP ${name}: ${e.message}`);
    errors++;
  }
}
console.log(`\nDone. generated=${made} errors=${errors}`);