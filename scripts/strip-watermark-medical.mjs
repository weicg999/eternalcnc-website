import sharp from 'sharp';
import { join } from 'path';

const dir = 'F:/V7/generated-images/cases/medical';

const mapping = [
  { src: 'Medical_monitor_enclosure_3D_p_2026-08-22T04-18-45.png', dst: 'cnc-medical-monitor-enclosure-6061-render-01.webp', label: 'monitor enclosure' },
  { src: 'Stainless_steel_surgical_fixtu_2026-08-22T04-19-15.png', dst: 'cnc-medical-surgical-fixture-stainless-316l-render-01.webp', label: 'surgical fixture stainless' },
  { src: 'Titanium_diagnostic_probe_comp_2026-08-22T04-19-15.png', dst: 'cnc-medical-diagnostic-probe-titanium-render-01.webp', label: 'diagnostic probe titanium' },
  { src: 'PEEK_biocompatible_surgical_fi_2026-08-22T04-19-15.png', dst: 'cnc-medical-surgical-fixture-peek-render-01.webp', label: 'surgical fixture peek' },
  { src: 'Stainless_steel_diagnostic_pro_2026-08-22T04-19-15.png', dst: 'cnc-medical-diagnostic-probe-stainless-316l-render-01.webp', label: 'diagnostic probe stainless' },
  { src: 'Medical_instrument_shell_housi_2026-08-22T04-19-15.png', dst: 'cnc-medical-instrument-shell-6061-render-01.webp', label: 'instrument shell' },
];

const Y0 = 724, Y1 = 832;
const X0 = 976, X1 = 1216;
const SAMPLE_X = 950;
const FEATHER = 24;

for (const { src, dst, label } of mapping) {
  const srcPath = join(dir, src);
  const dstPath = join('F:/V7/public/images/cases/medical', dst);

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
