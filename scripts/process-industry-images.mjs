import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Inpaint AI watermark from 1216x832 renders and convert to webp.
const Y0 = 724, Y1 = 832;
const X0 = 976, X1 = 1216;
const SAMPLE_X = 950;
const FEATHER = 24;

const industries = {
  automotive: {
    dir: 'public/images/industries/automotive',
    names: [
      'process-automotive-aluminum-housing-render-01',
      'process-automotive-housing-side-view-render-02',
      'process-automotive-parts-batch-render-03',
      'process-automotive-cast-part-render-04',
    ]
  },
  medical: {
    dir: 'public/images/industries/medical',
    names: [
      'process-medical-diagnostic-housing-render-01',
      'process-medical-surgical-instrument-render-02',
      'process-medical-monitor-mount-render-03',
      'process-medical-fixture-tray-render-04',
    ]
  },
  electronics: {
    dir: 'public/images/industries/electronics',
    names: [
      'process-electronics-heat-sink-render-01',
      'process-electronics-shield-enclosure-render-02',
      'process-electronics-rf-connector-render-03',
      'process-electronics-pcb-bracket-render-04',
    ]
  },
  robotics: {
    dir: 'public/images/industries/robotics',
    names: [
      'process-robotics-custom-bracket-render-01',
      'process-robotics-mounting-bracket-render-02',
      'process-robotics-structural-component-render-03',
      'process-robotics-precision-component-render-04',
    ]
  },
  aerospace: {
    dir: 'public/images/industries/aerospace',
    names: [
      'process-aerospace-satellite-bracket-render-01',
      'process-aerospace-servo-housing-render-02',
      'process-aerospace-turbine-blade-render-03',
      'process-aerospace-antenna-housing-render-04',
    ]
  },
  energy: {
    dir: 'public/images/industries/energy',
    names: [
      'process-energy-mechanical-connector-render-01',
      'process-energy-complex-cavity-render-02',
      'process-energy-aluminum-enclosure-render-03',
      'process-energy-complex-part-render-04',
    ]
  },
  'automation-equipment': {
    dir: 'public/images/industries/automation-equipment',
    names: [
      'process-automation-linear-slide-render-01',
      'process-automation-reducer-housing-render-02',
      'process-automation-pneumatic-gripper-render-03',
      'process-automation-chain-link-render-04',
    ]
  },
};

const target = process.argv[2];
const keys = target ? [target] : Object.keys(industries);

for (const key of keys) {
  const cfg = industries[key];
  if (!cfg) { console.error(`Unknown industry: ${key}`); continue; }
  const files = fs.readdirSync(cfg.dir)
    .filter(f => f.endsWith('.png'))
    .sort();
  if (files.length !== cfg.names.length) {
    console.warn(`[${key}] found ${files.length} pngs, expected ${cfg.names.length}`);
  }
  for (let i = 0; i < Math.min(files.length, cfg.names.length); i++) {
    const src = path.join(cfg.dir, files[i]);
    const dst = path.join(cfg.dir, cfg.names[i] + '.webp');
    const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, C = info.channels;
    if (W !== 1216 || H !== 832) {
      console.warn(`[${key}] ${files[i]} size ${W}x${H}, expected 1216x832`);
    }
    for (let y = Y0; y < Math.min(Y1, H); y++) {
      const sampleIdx = (y * W + SAMPLE_X) * C;
      const sr = data[sampleIdx], sg = data[sampleIdx + 1], sb = data[sampleIdx + 2];
      for (let x = X0; x < Math.min(X1, W); x++) {
        const dstIdx = (y * W + x) * C;
        let r = sr, g = sg, b = sb;
        if (x - X0 < FEATHER) {
          const t = (x - X0) / FEATHER;
          r = Math.round(data[dstIdx] * (1 - t) + r * t);
          g = Math.round(data[dstIdx + 1] * (1 - t) + g * t);
          b = Math.round(data[dstIdx + 2] * (1 - t) + b * t);
        }
        data[dstIdx] = r;
        data[dstIdx + 1] = g;
        data[dstIdx + 2] = b;
      }
    }
    await sharp(data, { raw: { width: W, height: H, channels: C } })
      .webp({ quality: 90 })
      .toFile(dst);
    // source png retained; remove manually after verification if needed
    console.log(`[${key}] ${files[i]} -> ${cfg.names[i]}.webp`);
  }
}
console.log('done');
