// Inpaint the "AI生成 WORKBUDDY" watermark (bottom-right) from 6 newly generated CNC turning renders.
// Same algorithm as scripts/strip-watermark.mjs — for each pixel inside the watermark cover region,
// replace it with the pixel from the SAME y but at x = SAMPLE_X (just left of the watermark).
// Uses real image pixels with the correct contact-shadow gradient, blends seamlessly.
import sharp from 'sharp';
import { join } from 'path';

const dir = 'F:/V7/public/images/parts';

const mapping = [
  { src: 'Professional_industrial_produc_2026-08-22T03-03-43.png', dst: 'cnc-turning-stepped-shaft-4140-render-01.png',      label: 'stepped shaft'      },
  { src: 'Brass_precision_turned_bushing_2026-08-22T03-05-08.png', dst: 'cnc-turning-precision-bushing-c360-render-01.png', label: 'precision bushing'  },
  { src: 'Professional_industrial_produc_2026-08-22T03-04-18.png', dst: 'cnc-turning-flange-6061-render-01.png',             label: 'flange'             },
  { src: 'Stainless_steel_precision_turn_2026-08-22T03-05-35.png', dst: 'cnc-turning-threaded-collar-303-render-01.png',     label: 'threaded collar'    },
  { src: 'Professional_industrial_produc_2026-08-22T03-04-17.png', dst: 'cnc-turning-pump-shaft-316l-render-01.png',         label: 'pump shaft'         },
  { src: 'Collection_of_small_precision__2026-08-22T03-06-02.png', dst: 'cnc-turning-parts-collection-render-01.png',         label: 'parts collection'   },
];

// Cover region (watermark area) in the 1216x832 output
const Y0 = 724, Y1 = 832;
const X0 = 976, X1 = 1216;
const SAMPLE_X = 950;
const FEATHER = 24;

for (const { src, dst, label } of mapping) {
  const srcPath = join(dir, src);
  const dstPath = join(dir, dst);

  const { data, info } = await sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;

  for (let y = Y0; y < Y1; y++) {
    const sampleIdx = (y * W + SAMPLE_X) * C;
    const sr = data[sampleIdx], sg = data[sampleIdx + 1], sb = data[sampleIdx + 2];

    for (let x = X0; x < X1; x++) {
      const dstIdx = (y * W + x) * C;
      let r = sr, g = sg, b = sb;

      if (x - X0 < FEATHER) {
        const t = (x - X0) / FEATHER;
        r = Math.round(data[dstIdx]     * (1 - t) + r * t);
        g = Math.round(data[dstIdx + 1] * (1 - t) + g * t);
        b = Math.round(data[dstIdx + 2] * (1 - t) + b * t);
      }

      data[dstIdx]     = r;
      data[dstIdx + 1] = g;
      data[dstIdx + 2] = b;
    }
  }

  await sharp(data, { raw: { width: W, height: H, channels: C } })
    .png({ compressionLevel: 9 })
    .toFile(dstPath);

  console.log(`[${label}] inpainted → ${dst}  (${W}x${H})`);
}
console.log('done');