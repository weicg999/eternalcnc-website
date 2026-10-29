// Multi-color vectorization: 鑫永恒 Chinese logo (green/blue/red shapes + black text).
// Per-color coverage fields -> trace -> fit -> one SVG with per-class fills.
// Source: E:\鑫永恒\鑫永恒精密资料\商标LOGO\鑫永恒.png (640x270 RGBA) — original untouched.
import zlib from 'node:zlib';
import fs from 'node:fs';

// ---------- PNG decoder (8-bit RGB/RGBA, non-interlaced) ----------
function decodePNG(buf) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!buf.subarray(0, 8).equals(sig)) throw new Error('not a PNG');
  let pos = 8, width = 0, height = 0, colorType = 0, idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos), type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); colorType = data[9]; if (data[12] !== 0) throw new Error('interlaced unsupported'); }
    else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : (() => { throw new Error('colorType ' + colorType); })();
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * bpp, out = Buffer.alloc(width * height * bpp), prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const f = raw[y * (stride + 1)], line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = out.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0, b = prev[x], c = x >= bpp ? prev[x - bpp] : 0;
      let v = line[x];
      if (f === 1) v = (v + a) & 255; else if (f === 2) v = (v + b) & 255;
      else if (f === 3) v = (v + ((a + b) >> 1)) & 255;
      else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255; }
      cur[x] = v;
    }
    prev.set(cur);
  }
  return { width, height, bpp, data: out };
}

// ---------- PNG encode helpers ----------
const CRC_TABLE = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(b) { let c = 0xffffffff; for (const x of b) c = CRC_TABLE[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, d) { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(type), d]); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, cr]); }
function encodePNG(rgba, w, h) {
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

// ---------- marching squares (fixed: iso nudge, degenerate skip, continuity walk, dedupe) ----------
function traceLoops(cov, W, H) {
  const iso = 0.5 + 1e-6;
  const segs = new Map();
  const P = (x, y) => x.toFixed(3) + ',' + y.toFixed(3);
  function interp(ax, ay, av, bx, by, bv) {
    const t = (iso - av) / (bv - av || 1e-12);
    return [ax + (bx - ax) * t, ay + (by - ay) * t];
  }
  for (let y = 0; y < H - 1; y++) for (let x = 0; x < W - 1; x++) {
    const tl = cov[y * W + x], tr = cov[y * W + x + 1], br = cov[(y + 1) * W + x + 1], bl = cov[(y + 1) * W + x];
    const idx = (tl > iso ? 8 : 0) | (tr > iso ? 4 : 0) | (br > iso ? 2 : 0) | (bl > iso ? 1 : 0);
    if (idx === 0 || idx === 15) continue;
    const T = () => interp(x, y, tl, x + 1, y, tr), R = () => interp(x + 1, y, tr, x + 1, y + 1, br);
    const B = () => interp(x, y + 1, bl, x + 1, y + 1, br), L = () => interp(x, y, tl, x, y + 1, bl);
    let pairs;
    if (idx === 5 || idx === 10) {
      const center = (tl + tr + br + bl) / 4, c = center > iso;
      if (idx === 5) pairs = c ? [[L(), T()], [R(), B()]] : [[L(), B()], [R(), T()]];
      else pairs = c ? [[L(), B()], [R(), T()]] : [[L(), T()], [R(), B()]];
    } else {
      const table = { 1: [[L(), B()]], 2: [[B(), R()]], 3: [[L(), R()]], 4: [[T(), R()]], 6: [[T(), B()]], 7: [[T(), L()]], 8: [[T(), L()]], 9: [[T(), B()]], 11: [[T(), R()]], 12: [[R(), L()]], 13: [[B(), R()]], 14: [[L(), B()]] };
      pairs = table[idx];
    }
    for (const [a, b] of pairs) {
      if (Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9) continue;
      const ka = P(a[0], a[1]), kb = P(b[0], b[1]);
      segs.set(ka + '|' + kb, [a, b]);
      segs.set(kb + '|' + ka, [b, a]);
    }
  }
  const outgoing = new Map();
  for (const [key, [a, b]] of segs) {
    const sk = P(a[0], a[1]);
    if (!outgoing.has(sk)) outgoing.set(sk, []);
    outgoing.get(sk).push({ endKey: P(b[0], b[1]), segKey: key, end: b });
  }
  const rawLoops = [];
  const used = new Set();
  for (const key of segs.keys()) {
    if (used.has(key)) continue;
    const [a0, b0] = segs.get(key);
    const startKey = P(a0[0], a0[1]);
    const loop = [a0];
    used.add(key);
    let curEnd = b0, prevPt = a0, prevKey = startKey;
    for (let step = 0; step < 4e6; step++) {
      if (P(curEnd[0], curEnd[1]) === startKey) break;
      const revKey = P(curEnd[0], curEnd[1]) + '|' + prevKey;
      const inDx = curEnd[0] - prevPt[0], inDy = curEnd[1] - prevPt[1];
      const inLen = Math.hypot(inDx, inDy) || 1;
      let best = null, bestScore = -Infinity;
      for (const c of outgoing.get(P(curEnd[0], curEnd[1])) || []) {
        if (c.segKey === revKey || used.has(c.segKey)) continue;
        const odx = c.end[0] - curEnd[0], ody = c.end[1] - curEnd[1];
        const score = (inDx * odx + inDy * ody) / (inLen * (Math.hypot(odx, ody) || 1));
        if (score > bestScore) { bestScore = score; best = c; }
      }
      if (!best) break;
      used.add(best.segKey);
      loop.push(curEnd);
      prevPt = curEnd; prevKey = P(curEnd[0], curEnd[1]);
      curEnd = best.end;
    }
    if (loop.length >= 4) rawLoops.push(loop);
  }
  const loops = [], seen = new Set();
  for (const l of rawLoops) {
    let ax0 = 1e9, ay0 = 1e9, ax1 = -1e9, ay1 = -1e9;
    for (const p of l) { ax0 = Math.min(ax0, p[0]); ay0 = Math.min(ay0, p[1]); ax1 = Math.max(ax1, p[0]); ay1 = Math.max(ay1, p[1]); }
    const sig = [ax0, ay0, ax1, ay1, Math.abs(shoelace(l))].map((v) => v.toFixed(1)).join(',');
    if (seen.has(sig)) continue;
    seen.add(sig);
    loops.push(l);
  }
  return loops;
}
const shoelace = (l) => { let s = 0; for (let i = 0; i < l.length; i++) { const a = l[i], b = l[(i + 1) % l.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; };

// ---------- resample / simplify / Schneider fitting ----------
function resample(loop, spacing) {
  const pts = [];
  let acc = 0;
  for (let i = 0; i < loop.length; i++) {
    const a = loop[i], b = loop[(i + 1) % loop.length];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
    let t = spacing - acc;
    while (t <= len) { pts.push([a[0] + dx * (t / len), a[1] + dy * (t / len)]); t += spacing; }
    acc = len - (t - spacing);
  }
  return pts.length ? pts : loop;
}
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const addTk = (p, t, k) => [p[0] + t[0] * k, p[1] + t[1] * k];
const scale = (v, k) => [v[0] * k, v[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const norm = (v) => { const l = Math.hypot(v[0], v[1]) || 1e-12; return [v[0] / l, v[1] / l]; };
function perpDist(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
  if (L < 1e-9) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  return Math.abs((p[0] - a[0]) * dy - (p[1] - a[1]) * dx) / L;
}
function chordParams(pts) {
  const u = [0];
  for (let i = 1; i < pts.length; i++) u.push(u[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = u[u.length - 1] || 1;
  return u.map((v) => v / total);
}
function bezPt(b, t) { const mt = 1 - t; return [mt ** 3 * b[0][0] + 3 * mt * mt * t * b[1][0] + 3 * mt * t * t * b[2][0] + t ** 3 * b[3][0], mt ** 3 * b[0][1] + 3 * mt * mt * t * b[1][1] + 3 * mt * t * t * b[2][1] + t ** 3 * b[3][1]]; }
function qPrime(b, t) { const mt = 1 - t; return [3 * mt * mt * (b[1][0] - b[0][0]) + 6 * mt * t * (b[2][0] - b[1][0]) + 3 * t * t * (b[3][0] - b[2][0]), 3 * mt * mt * (b[1][1] - b[0][1]) + 6 * mt * t * (b[2][1] - b[1][1]) + 3 * t * t * (b[3][1] - b[2][1])]; }
function qPrimePrime(b, t) { const mt = 1 - t; return [6 * mt * (b[2][0] - 2 * b[1][0] + b[0][0]) + 6 * t * (b[3][0] - 2 * b[2][0] + b[1][0]), 6 * mt * (b[2][1] - 2 * b[1][1] + b[0][1]) + 6 * t * (b[3][1] - 2 * b[2][1] + b[1][1])]; }
function generateBezier(points, u, leftTan, rightTan) {
  const n = points.length - 1;
  let C = [0, 0, 0, 0], X = [0, 0];
  for (let i = 0; i <= n; i++) {
    const mt = 1 - u[i], t = u[i], p = points[i];
    const b0 = mt * mt * mt, b1 = 3 * mt * mt * t, b2 = 3 * mt * t * t, b3 = t * t * t;
    const a0 = [b1 * leftTan[0], b1 * leftTan[1]], a1 = [b2 * rightTan[0], b2 * rightTan[1]];
    C[0] += dot(a0, a0); C[1] += dot(a0, a1); C[2] += dot(a0, a1); C[3] += dot(a1, a1);
    const r = sub(p, [b0 * points[0][0] + b3 * points[n][0], b0 * points[0][1] + b3 * points[n][1]]);
    X[0] += dot(a0, r); X[1] += dot(a1, r);
  }
  const det = C[0] * C[3] - C[2] * C[1];
  let alphaL = 0, alphaR = 0;
  if (Math.abs(det) > 1e-12) { alphaL = (X[0] * C[3] - X[1] * C[2]) / det; alphaR = (C[0] * X[1] - C[1] * X[0]) / det; }
  const segLen = Math.hypot(points[n][0] - points[0][0], points[n][1] - points[0][1]);
  if (alphaL < 1e-6 || alphaR < 1e-6 || alphaL > segLen * 3 || alphaR > segLen * 3) { alphaL = alphaR = segLen / 3; }
  return [points[0], addTk(points[0], leftTan, alphaL), addTk(points[n], rightTan, -alphaR), points[n]];
}
function maxError(points, bez, u) {
  let max = 0, split = Math.floor(points.length / 2);
  for (let i = 1; i < points.length - 1; i++) {
    const d = sub(bezPt(bez, u[i]), points[i]);
    const e = d[0] * d[0] + d[1] * d[1];
    if (e > max) { max = e; split = i; }
  }
  return [Math.sqrt(max), split];
}
function reparameterize(points, u, bez) { return points.map((p, i) => newtonRoot(bez, p, u[i])); }
function newtonRoot(bez, p, u) {
  const d = sub(bezPt(bez, u), p);
  const qp = qPrime(bez, u), qpp = qPrimePrime(bez, u);
  const num = d[0] * qp[0] + d[1] * qp[1];
  const den = qp[0] * qp[0] + qp[1] * qp[1] + d[0] * qpp[0] + d[1] * qpp[1];
  if (Math.abs(den) < 1e-12) return u;
  return Math.min(1, Math.max(0, u - num / den));
}
function fitCubic(points, leftTan, rightTan, error, out) {
  if (points.length === 2) {
    const dist = Math.hypot(points[1][0] - points[0][0], points[1][1] - points[0][1]) / 3;
    out.push([points[0], addTk(points[0], leftTan, dist), addTk(points[1], rightTan, -dist), points[1]]);
    return;
  }
  let u = chordParams(points);
  let bez = generateBezier(points, u, leftTan, rightTan);
  let [maxErr, split] = maxError(points, bez, u);
  if (maxErr < error) { out.push(bez); return; }
  if (maxErr < error * 4) {
    for (let i = 0; i < 20; i++) {
      u = reparameterize(points, u, bez);
      [maxErr, split] = maxError(points, bez, u);
      if (maxErr < error) { out.push(bez); return; }
    }
  }
  const centerTangent = norm(sub(points[split - 1], points[split + 1]));
  fitCubic(points.slice(0, split + 1), leftTan, centerTangent, error, out);
  fitCubic(points.slice(split), scale(centerTangent, -1), rightTan, error, out);
}
function loopToPath(loop, spacing, eps, fitErr) {
  const pts = resample(loop, spacing);
  const k = 2, corners = [];
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[(i - k + pts.length) % pts.length], p1 = pts[i], p2 = pts[(i + k) % pts.length];
    const turn = Math.acos(Math.min(1, Math.max(-1, dot(norm(sub(p1, p0)), norm(sub(p2, p1))))));
    if (turn > 0.6) corners.push(i);
  }
  const merged = [];
  for (const c of corners) if (!merged.length || c - merged[merged.length - 1] > 4) merged.push(c);
  const cmds = [];
  if (merged.length < 2) {
    const n = pts.length, q = Math.max(1, Math.floor(n / 4)), segs = [];
    for (let s = 0; s < 4; s++) {
      const i0 = (s * q) % n, i1 = ((s + 1) * q) % n;
      const run = [];
      for (let j = i0; j !== i1; j = (j + 1) % n) run.push(pts[j]);
      run.push(pts[i1]);
      const tIn = norm(sub(pts[(i0 + 2) % n], pts[(i0 - 2 + n) % n]));
      const tOut = norm(sub(pts[(i1 + 2) % n], pts[(i1 - 2 + n) % n]));
      fitCubic(run, tIn, tOut, fitErr, segs);
    }
    return { start: pts[0], cmds: [{ type: 'C', segs }] };
  }
  const outCmds = [];
  for (let ci = 0; ci < merged.length; ci++) {
    const i0 = merged[ci], i1 = merged[(ci + 1) % merged.length];
    const run = [];
    for (let j = i0; j !== i1; j = (j + 1) % pts.length) run.push(pts[j]);
    run.push(pts[i1]);
    let maxD = 0;
    for (const p of run) maxD = Math.max(maxD, perpDist(p, run[0], run[run.length - 1]));
    if (maxD < 0.8 || run.length < 4) outCmds.push({ type: 'L', end: run[run.length - 1] });
    else {
      const tIn = norm(sub(run[1], run[0]));
      const tOut = norm(sub(run[run.length - 1], run[run.length - 2]));
      const segs = [];
      fitCubic(run, tIn, tOut, fitErr, segs);
      outCmds.push({ type: 'C', segs });
    }
  }
  return { start: pts[merged[0]], cmds: outCmds };
}

// ---------- main: multi-color pipeline ----------
const img = decodePNG(fs.readFileSync('E:/鑫永恒/鑫永恒精密资料/商标LOGO/鑫永恒2.png'));
const { width: W, height: H, bpp, data } = img;
const classes = {
  green: { cov: new Float32Array(W * H), acc: [0, 0, 0], n: 0 },
  blue: { cov: new Float32Array(W * H), acc: [0, 0, 0], n: 0 },
  red: { cov: new Float32Array(W * H), acc: [0, 0, 0], n: 0 },
  black: { cov: new Float32Array(W * H), acc: [0, 0, 0], n: 0 },
};
for (let p = 0, i = 0; p < W * H; p++, i += bpp) {
  const a = bpp === 4 ? data[i + 3] / 255 : 1;
  if (a < 0.04) continue;
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const setC = (c, v) => { c.cov[p] = v; if (v > 0.5) { c.acc[0] += r; c.acc[1] += g; c.acc[2] += b; c.n++; } };
  setC(classes.green, Math.min(1, Math.max(0, (g - Math.max(r, b)) / 50)) * a);
  setC(classes.blue, Math.min(1, Math.max(0, (b - Math.max(r, g)) / 90)) * a);
  setC(classes.red, Math.min(1, Math.max(0, (r - Math.max(g, b)) / 170)) * a);
  if (mx - mn < 70) setC(classes.black, Math.min(1, Math.max(0, (170 - (r + g + b) / 3) / 110)) * a);
}

// pass 1: trace + filter per class, collect loops, compute global bbox
const classLoops = [];
let ux0 = 1e9, uy0 = 1e9, ux1 = -1e9, uy1 = -1e9;
for (const [name, cls] of Object.entries(classes)) {
  if (!cls.n) { console.log(name + ': empty'); continue; }
  const fill = cls.acc.map((v) => Math.round(v / cls.n));
  let loops = traceLoops(cls.cov, W, H).filter((l) => Math.abs(shoelace(l)) > 20);
  if (!loops.length) { console.log(name + ': no loops'); continue; }
  const areas = loops.map((l) => Math.abs(shoelace(l)));
  const maxA = Math.max(...areas);
  loops = loops.filter((_, i2) => areas[i2] >= maxA * 0.005);
  for (const l of loops) for (const p of l) { ux0 = Math.min(ux0, p[0]); uy0 = Math.min(uy0, p[1]); ux1 = Math.max(ux1, p[0]); uy1 = Math.max(uy1, p[1]); }
  classLoops.push({ name, fill, loops });
  console.log(name + ': loops=' + loops.length);
}
const pad = 3;
ux0 -= pad; uy0 -= pad; ux1 += pad; uy1 += pad;
const target = 1000, s = target / (ux1 - ux0);
const T = (p) => [(p[0] - ux0) * s, (p[1] - uy0) * s];
const vw = (ux1 - ux0) * s, vh = (uy1 - uy0) * s;

// pass 2: transform loops into viewBox space, then fit curves there
const body = classLoops.map(({ name, fill, loops }) => {
  let d = '', segCount = 0;
  for (const loop of loops) {
    const tLoop = loop.map(T);
    const { start, cmds } = loopToPath(tLoop, 1.5, 1.5, 1.2);
    d += `M${start[0].toFixed(1)} ${start[1].toFixed(1)}`;
    for (const c of cmds) {
      if (c.type === 'L') d += `L${c.end[0].toFixed(1)} ${c.end[1].toFixed(1)}`;
      else for (const b of c.segs) { d += `C${b[1][0].toFixed(1)} ${b[1][1].toFixed(1)} ${b[2][0].toFixed(1)} ${b[2][1].toFixed(1)} ${b[3][0].toFixed(1)} ${b[3][1].toFixed(1)}`; segCount++; }
    }
    d += 'Z';
  }
  console.log(name + ': segs=' + segCount);
  return `<path fill="#${fill.map((v) => v.toString(16).padStart(2, '0')).join('')}" d="${d}"/>`;
}).join('\n');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw.toFixed(1)} ${vh.toFixed(1)}" fill-rule="evenodd">\n${body}\n</svg>\n`;
fs.writeFileSync('E:/鑫永恒网站资料/英文LOGO/矢量化/xyh-logo.svg', svg);
console.log('SVG written:', Math.round(svg.length / 1024) + 'KB, viewBox 0 0 ' + vw.toFixed(0) + ' ' + vh.toFixed(0));

// ---------- verification render (per-class scanline, transformed loops) ----------
function renderCheck(outW) {
  const outH = Math.round((outW * vh) / vw);
  const SS = 3;
  const rs = outW / vw; // SVG units -> output pixels
  const img2 = Buffer.alloc(outW * outH * 3);
  for (const { fill, loops } of classLoops) {
    const tLoops = loops.map((l) => l.map(T));
    for (let sy = 0; sy < outH * SS; sy++) {
      const y = (sy + 0.5) / SS;
      const xs = [];
      for (const pl of tLoops) for (let i = 0; i < pl.length; i++) {
        const a = pl[i], b = pl[(i + 1) % pl.length];
        if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
      }
      xs.sort((m, n) => m - n);
      const py = Math.floor(y);
      if (py < 0 || py >= outH) continue;
      for (let s2 = 0; s2 + 1 < xs.length; s2 += 2) {
        const xa = Math.max(0, xs[s2]), xb = Math.min(outW, xs[s2 + 1]);
        for (let px = Math.floor(xa); px < Math.min(outW, Math.ceil(xb)); px++) {
          if (px + 1 > xa && px < xb) { const o = (py * outW + px) * 3; img2[o] = fill[0]; img2[o + 1] = fill[1]; img2[o + 2] = fill[2]; }
        }
      }
    }
  }
  const raw = Buffer.alloc((outW * 3 + 1) * outH);
  for (let y = 0; y < outH; y++) { raw[y * (outW * 3 + 1)] = 0; img2.copy(raw, y * (outW * 3 + 1) + 1, y * outW * 3, (y + 1) * outW * 3); }
  fs.writeFileSync('F:/V7/.check-xyh.png', Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', (() => { const h = Buffer.alloc(13); h.writeUInt32BE(outW, 0); h.writeUInt32BE(outH, 4); h[8] = 8; h[9] = 2; return h; })()), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]));
  console.log('check render written');
}
renderCheck(1000);
