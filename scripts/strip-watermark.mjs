// Inpaint the "AI生成 WORKBUDDY" watermark (bottom-right) from 4 newly generated product renders.
// Strategy: for each pixel inside the watermark cover region, replace it with the pixel from the
// SAME y but at x = SAMPLE_X (just left of the watermark, in the same background column).
// This uses real image pixels with the correct contact-shadow gradient, so the fill blends seamlessly
// with the surrounding background. We also feather the left edge of the fill to soften any micro-discontinuity.
import sharp from 'sharp';
import { join } from 'path';

const dir = 'F:/V7/public/images/cases/automotive';

const mapping = [
  { src: 'Professional_industrial_produc_2026-08-22T02-11-34.png', dst: 'cnc-auto-part-cylinder-head-7075-render-01.png',          label: 'cylinder head'    },
  { src: 'Professional_industrial_produc_2026-08-22T02-12-09.png', dst: 'cnc-auto-part-control-arm-steel-4340-render-01.png',       label: 'control arm'      },
  { src: 'Professional_industrial_produc_2026-08-22T02-12-35.png', dst: 'cnc-auto-part-sensor-housing-6061-anodized-render-01.png', label: 'sensor housing'   },
  { src: 'Professional_industrial_produc_2026-08-22T02-13-02.png', dst: 'cnc-auto-part-dashboard-bracket-6061-render-01.png',       label: 'dashboard bracket'},
];

// Cover region (watermark area) in the 1216x832 output
const Y0 = 724, Y1 = 832;          // rows containing the watermark
const X0 = 976, X1 = 1216;          // cols containing the watermark
const SAMPLE_X = 950;              // source column: just left of the watermark, same background band
const FEATHER = 24;                // px: blend the left edge of the fill to avoid a vertical seam line

for (const { src, dst, label } of mapping) {
  const srcPath = join(dir, src);
  const dstPath = join(dir, dst);

  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;

  for (let y = Y0; y < Y1; y++) {
    // sample the pixel at (SAMPLE_X, y) from the source (this is the real background value at this row)
    const sampleIdx = (y * W + SAMPLE_X) * C;
    const sr = data[sampleIdx], sg = data[sampleIdx + 1], sb = data[sampleIdx + 2];

    for (let x = X0; x < X1; x++) {
      const dstIdx = (y * W + x) * C;
      let r = sr, g = sg, b = sb;

      // feather the left edge: blend fill with original over the first FEATHER columns
      if (x - X0 < FEATHER) {
        const t = (x - X0) / FEATHER; // 0..1
        const oIdx = dstIdx;
        r = Math.round(data[oIdx]     * (1 - t) + r * t);
        g = Math.round(data[oIdx + 1] * (1 - t) + g * t);
        b = Math.round(data[oIdx + 2] * (1 - t) + b * t);
      }

      data[dstIdx]     = r;
      data[dstIdx + 1] = g;
      data[dstIdx + 2] = b;
      // keep alpha
    }
  }

  await sharp(data, { raw: { width: W, height: H, channels: C } })
    .png({ compressionLevel: 9 })
    .toFile(dstPath);

  console.log(`[${label}] inpainted → ${dst}  (${W}x${H})`);
}
console.log('done');
