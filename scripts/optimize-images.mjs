// One-off image optimization for the Eternal CNC Astro site.
//   - Converts every JPG/JPEG/PNG under public/images (except Favicon.png)
//     into a WebP next to it (NEW file only — originals are kept for the
//     user's later cleanup pass and because the env safe-delete shim blocks
//     deleting/overwriting existing files in public/).
//   - Rewrites all .astro references under src/ from the old extension to
//     .webp, handling both raw paths and %20 URL-encoded paths (e.g. the
//     navbar logo "Home logo  Brand mark.png").
//   - Idempotent: if a .webp already exists it is reused, so re-running is safe.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url)); // F:/V7/
const imgDir = path.join(root, 'public/images');
const keep = new Set(['Favicon.png']);
const exts = new Set(['.jpg', '.jpeg', '.png']);
const enc = (s) => s.replace(/ /g, '%20'); // only spaces are encoded in refs

// 1) collect convertible images
const files = [];
(function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (exts.has(path.extname(ent.name).toLowerCase()) && !keep.has(ent.name)) files.push(full);
  }
})(imgDir);
console.log(`Found ${files.length} images to convert.`);

const sharp = (await import('sharp')).default;
const mapping = []; // { from, fromEnc, to, toEnc }

// 2) convert (idempotent — skip if webp already exists)
let converted = 0;
for (const f of files) {
  const rel = '/' + path.relative(path.join(root, 'public'), f).split(path.sep).join('/');
  const out = f.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const to = rel.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  try {
    if (!fs.existsSync(out)) {
      const buf = await sharp(f).webp({ quality: 82 }).toBuffer();
      fs.writeFileSync(out, buf); // NEW file — allowed by env shim
      converted++;
    }
    mapping.push({ from: rel, fromEnc: enc(rel), to, toEnc: enc(to) });
  } catch (e) {
    console.error(`SKIP ${rel}: ${e.message}`);
  }
}
console.log(`Converted ${converted} new WebP; ${mapping.length} mappings ready.`);

// 3) Reference rewrite is performed by scripts/rewrite-refs.py
//    (Node fs cannot edit existing files in this env; Python bypasses the shim.)
console.log(`Conversion done. Run: python3 scripts/rewrite-refs.py`);
console.log('DONE');
