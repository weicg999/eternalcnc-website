import sharp from 'sharp';
import fs from 'fs';
const path = 'public/images/industries/automotive';
for (const f of fs.readdirSync(path).filter(f => f.endsWith('.png'))) {
  const m = await sharp(`${path}/${f}`).metadata();
  console.log(f, `${m.width}x${m.height}`);
}
