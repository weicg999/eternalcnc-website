// Apply the traced vector E to the favicon set: real-vector favicon.svg + PNGs/ICO rendered
// FROM THE VECTOR (dense traced loops), not from any raster source.
// Inputs: F:/V7/.trace-mark.json (written by vectorize-logo.mjs), public/images/logo/vector/e-mark.svg
import zlib from 'node:zlib';
import fs from 'node:fs';

const trace = JSON.parse(fs.readFileSync('F:/V7/.trace-mark.json', 'utf8'));
const [vx0, vy0, vw, vh] = trace.viewBox;
const FILL = trace.fill; // auto-sampled from the user's original icon

// ---- PNG encoder ----
const CRC_TABLE = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(b) { let c = 0xffffffff; for (const x of b) c = CRC_TABLE[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, d) { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(type), d]); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, cr]); }
function encodePNG(rgba, size) {
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

// ---- even-odd scanline rasterizer with 4x supersampling (from traced loops) ----
function render(size, whiteBg) {
  const scale = (size * 0.78) / Math.max(vw, vh); // letter fills ~78% of canvas
  const ox = (size - vw * scale) / 2 - vx0 * scale;
  const oy = (size - vh * scale) / 2 - vy0 * scale;
  const SS = 4;
  const cov = new Float32Array(size * size);
  const edges = trace.loops.map((l) => l.map(([x, y]) => [x * scale + ox, y * scale + oy]));
  for (let sy = 0; sy < size * SS; sy++) {
    const y = (sy + 0.5) / SS;
    const xs = [];
    for (const pl of edges) {
      for (let i = 0; i < pl.length; i++) {
        const a = pl[i], b = pl[(i + 1) % pl.length];
        if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
      }
    }
    xs.sort((m, n) => m - n);
    const py = Math.floor(y);
    for (let s = 0; s + 1 < xs.length; s += 2) {
      const xa = Math.max(0, xs[s]), xb = Math.min(size, xs[s + 1]);
      for (let px = Math.floor(xa); px < Math.min(size, Math.ceil(xb)); px++) {
        const ov = Math.min(px + 1, xb) - Math.max(px, xa);
        if (ov > 0) cov[py * size + px] += ov / SS; // horizontal fraction, weighted by sub-row
      }
    }
  }
  const out = Buffer.alloc(size * size * 4);
  for (let p = 0; p < size * size; p++) {
    const a = Math.min(1, cov[p]);
    const o = p * 4;
    if (whiteBg) {
      out[o] = Math.round(FILL[0] * a + 255 * (1 - a));
      out[o + 1] = Math.round(FILL[1] * a + 255 * (1 - a));
      out[o + 2] = Math.round(FILL[2] * a + 255 * (1 - a));
      out[o + 3] = 255;
    } else {
      out[o] = FILL[0]; out[o + 1] = FILL[1]; out[o + 2] = FILL[2]; out[o + 3] = Math.round(a * 255);
    }
  }
  return out;
}

const png32 = encodePNG(render(32, false), 32);
fs.writeFileSync('F:/V7/public/favicon-32x32.png', png32);
fs.writeFileSync('F:/V7/public/images/logo/favicon.png', png32);
fs.writeFileSync('F:/V7/public/apple-touch-icon.png', encodePNG(render(180, true), 180));

const entries = [[16, encodePNG(render(16, false), 16)], [32, png32], [48, encodePNG(render(48, false), 48)]];
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(entries.length, 4);
let offset = 6 + entries.length * 16;
const dir = Buffer.alloc(entries.length * 16);
entries.forEach(([s, png], i) => { const e = dir.subarray(i * 16, i * 16 + 16); e[0] = s; e[1] = s; e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(png.length, 8); e.writeUInt32LE(offset, 12); offset += png.length; });
fs.writeFileSync('F:/V7/public/favicon.ico', Buffer.concat([header, dir, ...entries.map(([, p]) => p)]));

// ---- favicon.svg: the REAL vector path (square canvas) ----
const esvg = fs.readFileSync('F:/V7/public/images/logo/vector/e-mark.svg', 'utf8');
const d = esvg.match(/d="([^"]+)"/)[1];
const fill = esvg.match(/fill="(#[0-9a-f]{6})"/)[1];
const side = Math.max(vw, vh);
const padX = (side - vw) / 2, padY = (side - vh) / 2;
fs.writeFileSync('F:/V7/public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${(-padX).toFixed(1)} ${(-padY).toFixed(1)} ${side.toFixed(1)} ${side.toFixed(1)}" fill="${fill}" fill-rule="evenodd">\n<path d="${d}"/>\n</svg>\n`);
console.log('favicon set generated from vector:', { vw, vh, fill });
