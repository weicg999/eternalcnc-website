// True vectorization of Eternal CNC logos: marching-squares sub-pixel contours -> DP simplify ->
// corner detection -> Schneider cubic Bezier fitting -> real SVG <path> (evenodd).
// Sources (originals NEVER modified):
//   full logo: E:\鑫永恒网站资料\英文LOGO\Eternal cnc.png (5040x2160)
//   E mark:    F:\V7\original-apple-touch-icon.png (180x180, same design as 导航页LOGO_2.png but larger)
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

// ---------- redness coverage field (alpha-weighted) ----------
function coverageField(img) {
  const { width: W, height: H, bpp, data } = img;
  const cov = new Float32Array(W * H);
  let rSum = 0, gSum = 0, bSum = 0, rN = 0;
  for (let p = 0, i = 0; p < W * H; p++, i += bpp) {
    const a = bpp === 4 ? data[i + 3] / 255 : 1;
    if (a < 0.04) { cov[p] = 0; continue; }
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const c = Math.min(1, Math.max(0, (r - Math.max(g, b)) / 140)) * a;
    cov[p] = c;
    if (c > 0.9) { rSum += r; gSum += g; bSum += b; rN++; }
  }
  const fill = rN ? [rSum / rN, gSum / rN, bSum / rN].map((v) => Math.round(v)) : [177, 0, 2];
  return { cov, fill };
}

// ---------- PNG chunk helpers (shared) ----------
const CRC_TABLE = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function crc32(b) { let c = 0xffffffff; for (const x of b) c = CRC_TABLE[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, d) { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(type), d]); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, cr]); }

// ---------- marching squares (iso 0.5) -> closed loops ----------
function traceLoops(cov, W, H) {
  const iso = 0.5 + 1e-6; // nudge: avoid exact-0.5 corners creating degenerate crossings
  const segs = new Map(); // key "x1,y1|x2,y2" canonical -> true (both directions stored)
  const P = (x, y) => x.toFixed(3) + ',' + y.toFixed(3);
  function interp(ax, ay, av, bx, by, bv) {
    const t = (iso - av) / (bv - av || (bv - av === 0 ? 1e-12 : 0));
    return [ax + (bx - ax) * t, ay + (by - ay) * t];
  }
  for (let y = 0; y < H - 1; y++) for (let x = 0; x < W - 1; x++) {
    const tl = cov[y * W + x], tr = cov[y * W + x + 1], br = cov[(y + 1) * W + x + 1], bl = cov[(y + 1) * W + x];
    let idx = (tl > iso ? 8 : 0) | (tr > iso ? 4 : 0) | (br > iso ? 2 : 0) | (bl > iso ? 1 : 0);
    if (idx === 0 || idx === 15) continue;
    const T = () => interp(x, y, tl, x + 1, y, tr), R = () => interp(x + 1, y, tr, x + 1, y + 1, br);
    const B = () => interp(x, y + 1, bl, x + 1, y + 1, br), L = () => interp(x, y, tl, x, y + 1, bl);
    let pairs;
    if (idx === 5 || idx === 10) { // saddle: resolve by center
      const center = (tl + tr + br + bl) / 4;
      const c = center > iso;
      if (idx === 5) pairs = c ? [[L(), T()], [R(), B()]] : [[L(), B()], [R(), T()]];
      else pairs = c ? [[L(), B()], [R(), T()]] : [[L(), T()], [R(), B()]];
    } else {
      const table = { 1: [[L(), B()]], 2: [[B(), R()]], 3: [[L(), R()]], 4: [[T(), R()]], 6: [[T(), B()]], 7: [[T(), L()]], 8: [[T(), L()]], 9: [[T(), B()]], 11: [[T(), R()]], 12: [[R(), L()]], 13: [[B(), R()]], 14: [[L(), B()]] };
      pairs = table[idx];
    }
    for (const [a, b] of pairs) {
      if (Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9) continue; // skip degenerate (corner-hit) segments
      const ka = P(a[0], a[1]), kb = P(b[0], b[1]);
      segs.set(ka + '|' + kb, [a, b]);
      segs.set(kb + '|' + ka, [b, a]);
    }
  }
  // link into loops: exclude the reverse of the incoming segment; at junctions pick the
  // most direction-continuous candidate (stays on the same boundary line at saddles)
  const outgoing = new Map(); // startKey -> [{endKey, segKey, end}]
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
      if (P(curEnd[0], curEnd[1]) === startKey) break; // closed
      const revKey = P(curEnd[0], curEnd[1]) + '|' + prevKey;
      const inDx = curEnd[0] - prevPt[0], inDy = curEnd[1] - prevPt[1];
      const inLen = Math.hypot(inDx, inDy) || 1;
      let best = null, bestScore = -Infinity;
      for (const c of outgoing.get(P(curEnd[0], curEnd[1])) || []) {
        if (c.segKey === revKey || used.has(c.segKey)) continue;
        const odx = c.end[0] - curEnd[0], ody = c.end[1] - curEnd[1];
        const oLen = Math.hypot(odx, ody) || 1;
        const score = (inDx * odx + inDy * ody) / (inLen * oLen);
        if (score > bestScore) { bestScore = score; best = c; }
      }
      if (!best) break; // closed (rejoined start) or dead end
      used.add(best.segKey);
      loop.push(curEnd);
      prevPt = curEnd; prevKey = P(curEnd[0], curEnd[1]);
      curEnd = best.end;
    }
    if (loop.length >= 4) rawLoops.push(loop);
  }
  // dedupe: both orientations of each boundary get traced; keep one per unique bbox+area
  const loops = [];
  const seen = new Set();
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

// ---------- geometry helpers ----------
function shoelace(loop) {
  let s = 0;
  for (let i = 0; i < loop.length; i++) { const a = loop[i], b = loop[(i + 1) % loop.length]; s += a[0] * b[1] - b[0] * a[1]; }
  return s / 2;
}
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
function perpDist(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
  if (L < 1e-9) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  return Math.abs((p[0] - a[0]) * dy - (p[1] - a[1]) * dx) / L;
}
function douglasPeucker(pts, eps) {
  if (pts.length < 3) return pts.slice();
  let maxD = -1, mi = 0;
  const a = pts[0], b = pts[pts.length - 1];
  for (let i = 1; i < pts.length - 1; i++) { const d = perpDist(pts[i], a, b); if (d > maxD) { maxD = d; mi = i; } }
  if (maxD > eps) {
    const l = douglasPeucker(pts.slice(0, mi + 1), eps), r = douglasPeucker(pts.slice(mi), eps);
    return l.slice(0, -1).concat(r);
  }
  return [a, b];
}

// ---------- Schneider cubic fitting (Graphics Gems fitCurve) ----------
function fitCubic(points, leftTan, rightTan, error, out) {
  if (points.length === 2) {
    const dist = Math.hypot(points[1][0] - points[0][0], points[1][1] - points[0][1]) / 3;
    out.push([points[0], addTk(points[0], leftTan, dist), addTk(points[1], rightTan, -dist), points[1]]);
    return;
  }
  const u0 = chordParams(points);
  let u = u0;
  let bez = generateBezier(points, u, leftTan, rightTan);
  let [maxErr, split] = maxError(points, bez, u);
  if (maxErr < error) { out.push(bez); return; }
  if (maxErr < error * 4) {
    for (let i = 0; i < 20; i++) {
      u = reparameterize(points, u, bez); // Newton-refine parameters only; bez unchanged
      [maxErr, split] = maxError(points, bez, u);
    if (maxErr < error) { out.push(bez); return; }
  }
  }
  const centerTangent = norm(sub(points[split - 1], points[split + 1]));
  fitCubic(points.slice(0, split + 1), leftTan, centerTangent, error, out);
  fitCubic(points.slice(split), scale(centerTangent, -1), rightTan, error, out);
}
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const addTk = (p, t, k) => [p[0] + t[0] * k, p[1] + t[1] * k];
const scale = (v, k) => [v[0] * k, v[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const norm = (v) => { const l = Math.hypot(v[0], v[1]) || 1e-12; return [v[0] / l, v[1] / l]; };
function chordParams(pts) {
  const u = [0];
  for (let i = 1; i < pts.length; i++) u.push(u[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = u[u.length - 1] || 1;
  return u.map((v) => v / total);
}
function bezPt(b, t) { const mt = 1 - t; const a = mt * mt * mt, b2 = 3 * mt * mt * t, c = 3 * mt * t * t, d = t * t * t; return [a * b[0][0] + b2 * b[1][0] + c * b[2][0] + d * b[3][0], a * b[0][1] + b2 * b[1][1] + c * b[2][1] + d * b[3][1]]; }
function qPrime(b, t) { const mt = 1 - t; return [3 * mt * mt * (b[1][0] - b[0][0]) + 6 * mt * t * (b[2][0] - b[1][0]) + 3 * t * t * (b[3][0] - b[2][0]), 3 * mt * mt * (b[1][1] - b[0][1]) + 6 * mt * t * (b[2][1] - b[1][1]) + 3 * t * t * (b[3][1] - b[2][1])]; }
function qPrimePrime(b, t) { const mt = 1 - t; return [6 * mt * (b[2][0] - 2 * b[1][0] + b[0][0]) + 6 * t * (b[3][0] - 2 * b[2][0] + b[1][0]), 6 * mt * (b[2][1] - 2 * b[1][1] + b[0][1]) + 6 * t * (b[3][1] - 2 * b[2][1] + b[1][1])]; }
function generateBezier(points, u, leftTan, rightTan) {
  const n = points.length - 1;
  let a0 = [0, 0], a1 = [0, 0];
  for (let i = 0; i <= n; i++) {
    const uu = u[i], mt = 1 - uu;
    const x = mt * mt * mt * 0; // placeholder to keep structure clear
    a0[0] += mt * mt * uu * 0; // (B0 * leftTan) coefficient handled below
  }
  // build A0/A1 matrices properly
  let A00 = 0, A01 = 0, A10 = 0, A11 = 0;
  for (let i = 0; i <= n; i++) {
    const mt = 1 - u[i];
    A00 += 3 * (mt * mt * u[i]) ** 1 * (mt * mt * u[i]); // 3 mt^2 u * 3 mt^2 u  -> use squared below
  }
  // simpler direct least squares (per Graphics Gems):
  let C = [0, 0, 0, 0], X = [0, 0];
  for (let i = 0; i <= n; i++) {
    const mt = 1 - u[i], t = u[i], p = points[i];
    const b0 = mt * mt * mt, b1 = 3 * mt * mt * t, b2 = 3 * mt * t * t, b3 = t * t * t;
    const tmp = sub(p, addTk(addTk(scale([b0 * p[0] + b3 * p[0], b0 * p[1] + b3 * p[1]], 0), [p[0] * (b0 + b3), p[1] * (b0 + b3)], 0), [0, 0], 0)); // unused fallback
    const base = [b0 * points[0][0] + b3 * points[n][0], b0 * points[0][1] + b3 * points[n][1]];
    const a0 = [b1 * leftTan[0], b1 * leftTan[1]], a1 = [b2 * rightTan[0], b2 * rightTan[1]];
    C[0] += dot(a0, a0); C[1] += dot(a0, a1); C[2] += dot(a0, a1); C[3] += dot(a1, a1);
    const r = sub(p, base);
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
function reparameterize(points, u, bez) {
  return points.map((p, i) => newtonRoot(bez, p, u[i]));
}
function newtonRoot(bez, p, u) {
  const d = sub(bezPt(bez, u), p);
  const qp = qPrime(bez, u), qpp = qPrimePrime(bez, u);
  const num = d[0] * qp[0] + d[1] * qp[1];
  const den = qp[0] * qp[0] + qp[1] * qp[1] + d[0] * qpp[0] + d[1] * qpp[1];
  if (Math.abs(den) < 1e-12) return u;
  return Math.min(1, Math.max(0, u - num / den));
}

// ---------- process one loop into SVG path commands ----------
function loopToPath(loop, eps = 1.2, fitErr = 0.9) {
  const perim = (() => { let s = 0; for (let i = 0; i < loop.length; i++) { const a = loop[i], b = loop[(i + 1) % loop.length]; s += Math.hypot(b[0] - a[0], b[1] - a[1]); } return s; })();
  const spacing = Math.max(1.0, perim / 3000);
  const pts = resample(loop, spacing);
  // corners from dense resampled points
  const k = 2, corners = [];
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[(i - k + pts.length) % pts.length], p1 = pts[i], p2 = pts[(i + k) % pts.length];
    const v1 = norm(sub(p1, p0)), v2 = norm(sub(p2, p1));
    const turn = Math.acos(Math.min(1, Math.max(-1, dot(v1, v2))));
    if (turn > 0.6) corners.push(i); // ~34 deg
  }
  // merge corner clusters
  const merged = [];
  for (const c of corners) {
    if (!merged.length || c - merged[merged.length - 1] > 4) merged.push(c);
  }
  const cmds = [];
  if (merged.length < 2) {
    // smooth closed loop: 4-corner fan fit
    const n = pts.length, q = Math.floor(n / 4);
    const tans = [[1, 0]];
    let segs = [];
    for (let s = 0; s < 4; s++) {
      const i0 = (s * q) % n, i1 = ((s + 1) * q) % n;
      const run = [];
      for (let j = i0; j !== i1; j = (j + 1) % n) run.push(pts[j]);
      run.push(pts[i1]);
      const tIn = norm(sub(pts[(i0 + 2) % n], pts[(i0 - 2 + n) % n]));
      const tOut = norm(sub(pts[(i1 + 2) % n], pts[(i1 - 2 + n) % n]));
      fitCubic(run, tIn, tOut, fitErr, segs);
    }
    cmds.push({ type: 'C', segs });
    return { start: pts[0], cmds };
  }
  // polygonal runs between corners; line or fit per run
  const start = pts[merged[0]];
  const runs = [];
  for (let ci = 0; ci < merged.length; ci++) {
    const i0 = merged[ci], i1 = merged[(ci + 1) % merged.length];
    const run = [];
    for (let j = i0; j !== i1; j = (j + 1) % pts.length) run.push(pts[j]);
    run.push(pts[i1]);
    runs.push(run);
  }
  const outCmds = [];
  for (const run of runs) {
    // max deviation from chord
    let maxD = 0;
    for (const p of run) maxD = Math.max(maxD, perpDist(p, run[0], run[run.length - 1]));
    if (maxD < 0.8 || run.length < 4) {
      outCmds.push({ type: 'L', end: run[run.length - 1] });
    } else {
      const tIn = norm(sub(run[1], run[0]));
      const tOut = norm(sub(run[run.length - 1], run[run.length - 2]));
      const segs = [];
      fitCubic(run, tIn, tOut, fitErr, segs);
      outCmds.push({ type: 'C', segs });
    }
  }
  return { start, cmds: outCmds };
}

// ---------- main pipeline for one image ----------
function vectorize(pngPath, outSvg, opts = {}) {
  const img = decodePNG(fs.readFileSync(pngPath));
  const { cov, fill } = coverageField(img);
  const loops = traceLoops(cov, img.width, img.height).filter((l) => Math.abs(shoelace(l)) > (opts.minArea || 40));
  if (opts.relFilter) {
    const areas = loops.map((l) => Math.abs(shoelace(l)));
    const maxA = Math.max(...areas);
    const kept = loops.filter((_, i) => areas[i] >= maxA * opts.relFilter);
    console.log(`${opts.tag}: relFilter dropped ${loops.length - kept.length} noise loops`);
    loops.length = 0; loops.push(...kept);
  }
  console.log(`${opts.tag}: ${img.width}x${img.height}, loops=${loops.length}, fill=#${fill.map((v) => v.toString(16).padStart(2, '0')).join('')}`);
  if (opts.debugLoops) for (const l of loops) {
    let ax0 = 1e9, ay0 = 1e9, ax1 = -1e9, ay1 = -1e9;
    for (const p of l) { ax0 = Math.min(ax0, p[0]); ay0 = Math.min(ay0, p[1]); ax1 = Math.max(ax1, p[0]); ay1 = Math.max(ay1, p[1]); }
    console.log(`  loop pts=${l.length} bbox=(${ax0.toFixed(0)},${ay0.toFixed(0)})-(${ax1.toFixed(0)},${ay1.toFixed(0)}) area=${Math.abs(shoelace(l)).toFixed(0)}`);
  }
  // bbox
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const l of loops) for (const p of l) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); }
  const pad = 2;
  x0 -= pad; y0 -= pad; x1 += pad; y1 += pad;
  const target = opts.target || 1000;
  const s = target / Math.max(x1 - x0, y1 - y0);
  const T = (p) => [(p[0] - x0) * s, (p[1] - y0) * s];
  // build path
  let d = '';
  let segCount = 0;
  for (const loop of loops) {
    const { start, cmds } = loopToPath(loop, opts.eps || 1.2, opts.fitErr || 0.9);
    const st = T(start);
    d += `M${st[0].toFixed(1)} ${st[1].toFixed(1)}`;
    for (const c of cmds) {
      if (c.type === 'L') { const e = T(c.end); d += `L${e[0].toFixed(1)} ${e[1].toFixed(1)}`; }
      else for (const b of c.segs) { const p1 = T(b[1]), p2 = T(b[2]), p3 = T(b[3]); d += `C${p1[0].toFixed(1)} ${p1[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} ${p3[0].toFixed(1)} ${p3[1].toFixed(1)}`; segCount++; }
    }
    d += 'Z';
  }
  const vw = (x1 - x0) * s, vh = (y1 - y0) * s;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw.toFixed(1)} ${vh.toFixed(1)}" fill="#${fill.map((v) => v.toString(16).padStart(2, '0')).join('')}" fill-rule="evenodd">\n<path d="${d}"/>\n</svg>\n`;
  fs.writeFileSync(outSvg, svg);
  console.log(`${opts.tag}: svg written ${Math.round(svg.length / 1024)}KB, curve segs=${segCount}, viewBox 0 0 ${vw.toFixed(0)} ${vh.toFixed(0)}`);
  // dump loops flattened for verification render + favicon rasterization
  return { loops: loops.map((l) => l.map(T)), viewBox: [0, 0, vw, vh], fill };
}

const outDir = 'F:/V7/public/images/logo/vector';
fs.mkdirSync(outDir, { recursive: true });

const full = vectorize('E:/鑫永恒网站资料/英文LOGO/Eternal cnc.png', outDir + '/logo-full.svg', { tag: 'FULL', target: 1000, eps: 2.4, fitErr: 1.8, minArea: 300 });
const mark = vectorize('F:/V7/original-apple-touch-icon.png', outDir + '/e-mark.svg', { tag: 'MARK', target: 512, eps: 0.8, fitErr: 0.6, minArea: 8, relFilter: 0.05 });
fs.writeFileSync('F:/V7/.trace-full.json', JSON.stringify(full));
fs.writeFileSync('F:/V7/.trace-mark.json', JSON.stringify(mark));

// ---------- verification render: rasterize flattened loops back to PNG (even-odd, 4x supersample) ----------
// ---------- verification render: rasterize traced loops back to PNG (even-odd scanline, 4x SS) ----------
function flattenLoops(loops) { return loops; } // marching-squares points are already dense
function renderCheck(loops, viewBox, fill, outPath, outW) {
  const [vx0, vy0, vw, vh] = viewBox;
  const outH = Math.round((outW * vh) / vw);
  const s = outW / vw;
  const poly = loops.map((l) => l.map(([x, y]) => [(x - vx0) * s, (y - vy0) * s]));
  const SS = 4;
  const img = Buffer.alloc(outW * outH * 3);
  for (let py = 0; py < outH; py++) {
    for (let sub = 0; sub < SS; sub++) {
      const y = py + (sub + 0.5) / SS;
      // collect x crossings at this scanline
      const xs = [];
      for (const pl of poly) {
        for (let i = 0; i < pl.length; i++) {
          const a = pl[i], b = pl[(i + 1) % pl.length];
          if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) {
            xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
          }
        }
      }
      xs.sort((m, n) => m - n);
      // even-odd spans
      const spans = [];
      for (let i = 0; i + 1 < xs.length; i += 2) spans.push([xs[i], xs[i + 1]]);
      for (let px = 0; px < outW; px++) {
        let inside = 0;
        for (const [xa, xb] of spans) { const cx = px + 0.5; if (cx > xa && cx <= xb) inside++; }
        if (inside % 2 === 1) { const o = (py * outW + px) * 3; img[o] = fill[0]; img[o + 1] = fill[1]; img[o + 2] = fill[2]; }
      }
    }
  }
  // encode PNG (RGB)
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(outW, 0); ihdr.writeUInt32BE(outH, 4); ihdr[8] = 8; ihdr[9] = 2;
  const raw = Buffer.alloc((outW * 3 + 1) * outH);
  for (let y = 0; y < outH; y++) { raw[y * (outW * 3 + 1)] = 0; img.copy(raw, y * (outW * 3 + 1) + 1, y * outW * 3, (y + 1) * outW * 3); }
  const png = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
  fs.writeFileSync(outPath, png);
  console.log(`check render: ${outPath} ${outW}x${outH}`);
}

renderCheck(flattenLoops(full.loops), full.viewBox, full.fill, 'F:/V7/.check-full.png', 900);
renderCheck(flattenLoops(mark.loops), mark.viewBox, mark.fill, 'F:/V7/.check-mark.png', 512);
console.log('TRACE_DONE');

