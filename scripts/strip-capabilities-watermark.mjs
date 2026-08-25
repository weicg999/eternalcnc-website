// Strip AI watermark from 1024x1024 capability renders and output webp.
import sharp from 'sharp';
import { join } from 'path';

const srcDir = 'F:/V7/generated-images/capabilities';
const dstDir = 'F:/V7/public/images/capabilities';

const mapping = [
  { src: 'Aluminum_manifold_block_3D_pro_2026-08-22T04-07-06.png', dst: 'capability-aluminum-manifold-render-01.webp', label: 'aluminum manifold' },
  { src: 'Stainless_steel_machined_brack_2026-08-22T04-07-07.png', dst: 'capability-stainless-bracket-render-01.webp', label: 'stainless bracket' },
  { src: 'Brass_cylindrical_connector_3D_2026-08-22T04-07-07.png', dst: 'capability-brass-connector-render-01.webp', label: 'brass connector' },
  { src: 'Titanium_aerospace_structural__2026-08-22T04-07-07.png', dst: 'capability-titanium-bracket-render-01.webp', label: 'titanium bracket' },
  { src: 'Medical_device_component_3D_pr_2026-08-22T04-07-06.png', dst: 'capability-medical-component-render-01.webp', label: 'medical component' },
  { src: 'Automotive_aluminum_sensor_hou_2026-08-22T04-07-06.png', dst: 'capability-sensor-housing-render-01.webp', label: 'sensor housing' },
];

// Watermark region for 1024x1024 outputs (bottom-right corner)
const Y0 = 900, Y1 = 1024;
const X0 = 800, X1 = 1024;
const SAMPLE_X = 780;
const FEATHER = 24;

for (const { src, dst, label } of mapping) {
  const srcPath = join(srcDir, src);
  const dstPath = join(dstDir, dst);

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
    .webp({ quality: 90 })
    .toFile(dstPath);

  console.log(`[${label}] inpainted -> ${dst} (${W}x${H})`);
}
console.log('done');
