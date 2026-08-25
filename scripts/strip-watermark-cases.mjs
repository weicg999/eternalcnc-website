import sharp from 'sharp';
import fs from 'fs';

// 源图 -> 目标 webp（按正确分类归档，命名不重复）
const jobs = [
  // electronics (3)
  { src: 'F:/V7/generated-images/cases/electronics/Compact_aluminum_7075_RF_enclo_2026-08-22T05-19-17.png',
    dst: 'F:/V7/public/images/cases/electronics/cnc-electronics-rf-enclosure-7075-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/robotics/Precision_aluminum_pin_fin_hea_2026-08-22T05-25-08.png',
    dst: 'F:/V7/public/images/cases/electronics/cnc-electronics-heatsink-7075-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/robotics/Micro_brass_coaxial_connector__2026-08-22T05-25-08.png',
    dst: 'F:/V7/public/images/cases/electronics/cnc-electronics-coaxial-connector-brass-render-01.webp' },
  // robotics (3)
  { src: 'F:/V7/generated-images/cases/robotics/Anodized_robot_rotary_joint_3D_2026-08-22T05-25-08.png',
    dst: 'F:/V7/public/images/cases/robotics/cnc-robotics-rotary-joint-aluminum-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/robotics/Hardened_steel_harmonic_reduce_2026-08-22T05-25-08.png',
    dst: 'F:/V7/public/images/cases/robotics/cnc-robotics-harmonic-reducer-steel-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/robotics/Lightweight_robotic_arm_bracke_2026-08-22T05-25-09.png',
    dst: 'F:/V7/public/images/cases/robotics/cnc-robotics-arm-bracket-aluminum-render-01.webp' },
  // cnc (3)
  { src: 'F:/V7/generated-images/cases/cnc/Stainless_steel_precision_flan_2026-08-22T05-25-50.png',
    dst: 'F:/V7/public/images/cases/cnc/cnc-general-flange-stainless-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/cnc/Aluminum_custom_machined_brack_2026-08-22T05-25-51.png',
    dst: 'F:/V7/public/images/cases/cnc/cnc-general-bracket-aluminum-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/cnc/Brass_valve_body_3D_product_re_2026-08-22T05-25-50.png',
    dst: 'F:/V7/public/images/cases/cnc/cnc-general-valve-body-brass-render-01.webp' },
  // 5-axis (3)
  { src: 'F:/V7/generated-images/cases/5-axis/Titanium_impeller_3D_product_r_2026-08-22T05-26-11.png',
    dst: 'F:/V7/public/images/cases/5-axis/cnc-5axis-impeller-titanium-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/5-axis/Aluminum_turbo_compressor_hous_2026-08-22T05-26-11.png',
    dst: 'F:/V7/public/images/cases/5-axis/cnc-5axis-turbo-housing-aluminum-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/5-axis/Complex_5_axis_aerospace_brack_2026-08-22T05-26-11.png',
    dst: 'F:/V7/public/images/cases/5-axis/cnc-5axis-aerospace-bracket-aluminum-render-01.webp' },
  // prototype (3)
  { src: 'F:/V7/generated-images/cases/prototype/Rapid_prototype_aluminum_part__2026-08-22T05-26-31.png',
    dst: 'F:/V7/public/images/cases/prototype/cnc-prototype-aluminum-part-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/prototype/Engineering_plastic_prototype__2026-08-22T05-26-31.png',
    dst: 'F:/V7/public/images/cases/prototype/cnc-prototype-peek-part-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/prototype/Small_batch_machining_fixture__2026-08-22T05-26-31.png',
    dst: 'F:/V7/public/images/cases/prototype/cnc-prototype-fixture-aluminum-render-01.webp' },
  // mass-production (3)
  { src: 'F:/V7/generated-images/cases/mass-production/Mass_production_turned_steel_p_2026-08-22T05-26-50.png',
    dst: 'F:/V7/public/images/cases/mass-production/cnc-massprod-steel-pin-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/mass-production/High_volume_aluminum_housing_3_2026-08-22T05-26-50.png',
    dst: 'F:/V7/public/images/cases/mass-production/cnc-massprod-aluminum-housing-render-01.webp' },
  { src: 'F:/V7/generated-images/cases/mass-production/Automated_production_bracket_3_2026-08-22T05-26-50.png',
    dst: 'F:/V7/public/images/cases/mass-production/cnc-massprod-bracket-aluminum-render-01.webp' },
];

const FEATHER = 26;

async function process(job) {
  const { width, height, channels } = await sharp(job.src).metadata();
  const raw = await sharp(job.src).raw().toBuffer();
  const X1 = width;
  const X0 = width - 260;
  const Y1 = height;
  const Y0 = height - 130;
  const SAMPLE_X = X0 - FEATHER;

  const px = (x, y) => {
    const i = (y * width + x) * channels;
    return [raw[i], raw[i + 1], raw[i + 2]];
  };
  const setPx = (x, y, rgb) => {
    const i = (y * width + x) * channels;
    raw[i] = rgb[0]; raw[i + 1] = rgb[1]; raw[i + 2] = rgb[2];
  };

  for (let y = Y0; y < Y1; y++) {
    const s = px(SAMPLE_X, y);
    for (let x = X0; x < X1; x++) {
      if (x < X0 + FEATHER) {
        const t = (x - X0) / FEATHER;
        const o = px(x, y);
        setPx(x, y, [
          Math.round(o[0] + (s[0] - o[0]) * t),
          Math.round(o[1] + (s[1] - o[1]) * t),
          Math.round(o[2] + (s[2] - o[2]) * t),
        ]);
      } else {
        setPx(x, y, s);
      }
    }
  }

  await sharp(raw, { raw: { width, height, channels } })
    .webp({ quality: 90 })
    .toFile(job.dst);
  console.log('OK', job.dst);
}

for (const job of jobs) {
  if (!fs.existsSync(job.src)) { console.error('MISSING SRC', job.src); continue; }
  await process(job);
}
console.log('DONE', jobs.length, 'images');
