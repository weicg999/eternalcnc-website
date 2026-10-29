// Extract the EXACT E letterform from the original boxed icon, recolor red on transparent.
// v2 algorithm: locate red box -> erode -> inside the box, letter = non-red pixels (G-channel coverage),
// background white removed by flood-filling NON-RED pixels from the region border (letter is interior, not reached).
import zlib from 'node:zlib';
import fs from 'node:fs';

const RED = [177, 0, 2];

function decodePNG(buf) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!buf.subarray(0, 8).equals(sig)) throw new Error('not a PNG');
  let pos = 8, width = 0, height = 0, colorType = 0, idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos), type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); colorType = data[9]; if (data[12] !== 0) throw new Error('interlaced PNG unsupported'); }
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : (() => { throw new Error('colorType ' + colorType + ' unsupported'); })();
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * bpp;
  const out = Buffer.alloc(width * height * bpp);
  const prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const f = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = out.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0, b = prev[x], c = x >= bpp ? prev[x - bpp] : 0;
      let v = line[x];
      if (f === 1) v = (v + a) & 255;
      else if (f === 2) v = (v + b) & 255;
      else if (f === 3) v = (v + ((a + b) >> 1)) & 255;
      else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255; }
      cur[x] = v;
    }
    prev.set(cur);
  }
  return { width, height, bpp, data: out };
}

const img = decodePNG(fs.readFileSync('F:/V7/original-apple-touch-icon.png'));
const { width: W, height: H, bpp, data } = img;
const idx = (x, y) => (y * W + x) * bpp;
const isRed = (x, y) => { const i = idx(x, y); return data[i] > 140 && data[i + 1] < 60 && data[i + 2] < 60; };

// 1) red box bbox
let bx0 = W, by0 = H, bx1 = -1, by1 = -1;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (isRed(x, y)) {
  if (x < bx0) bx0 = x; if (x > bx1) bx1 = x; if (y < by0) by0 = y; if (y > by1) by1 = y;
}
console.log(`box bbox (${bx0},${by0})-(${bx1},${by1})`);
// 2) erode 3px -> working region
const E = 3;
const rx0 = bx0 + E, ry0 = by0 + E, rx1 = bx1 - E, ry1 = by1 - E;
// 3) flood non-red from region border -> background (outside rounded box); letter interior untouched
const bg = new Uint8Array(W * H);
const stack = [];
for (let x = rx0; x <= rx1; x++) { stack.push(x, ry0, x, ry1); }
for (let y = ry0; y <= ry1; y++) { stack.push(rx0, y, rx1, y); }
while (stack.length) {
  const y = stack.pop(), x = stack.pop();
  if (x < rx0 || y < ry0 || x > rx1 || y > ry1) continue;
  const p = y * W + x;
  if (bg[p] || isRed(x, y)) continue;
  bg[p] = 1;
  stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
}
// 4) letter coverage inside region: non-red, non-bg -> G channel; red -> 0
const cov = new Float32Array(W * H);
let lx0 = W, ly0 = H, lx1 = -1, ly1 = -1;
for (let y = ry0; y <= ry1; y++) for (let x = rx0; x <= rx1; x++) {
  const p = y * W + x;
  let c = 0;
  if (!bg[p] && !isRed(x, y)) { const i = idx(x, y); c = Math.min(1, Math.max(0, (data[i + 1] - 10) / 235)); }
  cov[p] = c;
  if (c > 0.5) { if (x < lx0) lx0 = x; if (x > lx1) lx1 = x; if (y < ly0) ly0 = y; if (y > ly1) ly1 = y; }
}
const bw = lx1 - lx0 + 1, bh = ly1 - ly0 + 1;
const solid = (() => { let s = 0; for (let y = ly0; y <= ly1; y++) for (let x = lx0; x <= lx1; x++) if (cov[y * W + x] > 0.5) s++; return s / (bw * bh); })();
console.log(`letter bbox ${bw}x${bh} at (${lx0},${ly0}), fill ratio ${(solid * 100).toFixed(0)}%`);

// ---------- PNG encoder ----------
const CRC_TABLE = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(b) { let c = 0xffffffff; for (const x of b) c = CRC_TABLE[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, d) { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(type), d]); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, cr]); }
function encodePNG(rgba, size) {
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

function render(size, whiteBg) {
  const letter = size * 0.75;
  const scale = letter / Math.max(bw, bh);
  const dw = Math.max(1, Math.round(bw * scale)), dh = Math.max(1, Math.round(bh * scale));
  const ox = Math.round((size - dw) / 2), oy = Math.round((size - dh) / 2);
  const acc = new Float32Array(dw * dh), cnt = new Float32Array(dw * dh);
  for (let y = ly0; y <= ly1; y++) for (let x = lx0; x <= lx1; x++) {
    const dx = Math.min(dw - 1, Math.floor((x - lx0) * scale)), dy = Math.min(dh - 1, Math.floor((y - ly0) * scale));
    acc[dy * dw + dx] += cov[y * W + x]; cnt[dy * dw + dx]++;
  }
  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let a = 0;
    if (x >= ox && x < ox + dw && y >= oy && y < oy + dh) { const p = (y - oy) * dw + (x - ox); if (cnt[p]) a = acc[p] / cnt[p]; }
    const o = (y * size + x) * 4;
    if (whiteBg) { for (let k = 0; k < 3; k++) out[o + k] = Math.round(RED[k] * a + 255 * (1 - a)); out[o + 3] = 255; }
    else { out[o] = RED[0]; out[o + 1] = RED[1]; out[o + 2] = RED[2]; out[o + 3] = Math.round(a * 255); }
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

const png64 = encodePNG(render(64, false), 64);
fs.writeFileSync('F:/V7/public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><image width="32" height="32" href="data:image/png;base64,${png64.toString('base64')}"/></svg>\n`);
console.log('done');
