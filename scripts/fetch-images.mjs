// Lädt die Original-Bilder einmalig vom Squarespace-CDN nach public/images.
// Danach die Bilder committen – nach Kündigung von Squarespace ist das CDN weg.
//
//   npm run fetch-images          → lädt fehlende Bilder (Fehler brechen ab)
//   npm run fetch-images -- --force → lädt alle neu
//   (prebuild ruft es mit --soft auf: fehlende Bilder werden versucht, Fehler nur gewarnt)

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CDN = 'https://images.squarespace-cdn.com/content/v1/66644b174f8ed75d8ab8c960/';
const W = '?format=2500w';

const images = {
  'home.jpg': '3fab8fb4-38d9-4612-8bb8-a47819789e97/home.jpg',
  'philosophie.jpg': '191c088f-c074-46f1-8306-8be426de8666/Philosophie.jpg',
  'ueber-mich.jpg': '8952bb6f-3733-4946-acad-a5811fd80eb7/U%CC%88ber-mich.jpg',
  'angebot.jpg': '113414c3-e4d6-4421-9b39-dab1e484ee4a/Angebot.jpg',
  'familienberatung.jpg': '38e8bf08-4f15-421a-838c-ad48f2114596/Systemische-Beratung.jpg',
  'therapie.jpg': '9e8c65b4-5e63-4a2b-971d-c7a3af4a94e0/Psychotherapie.jpg',
  'coaching.jpg': '687b189e-0119-4a5d-a8df-76f62b87b32d/Coaching.jpg',
  'mentale-gesundheit.jpg': '646f14ec-f2c5-4da3-a94a-a07c5206acd2/Mentale-Gesundheit.jpg',
  'konditionen.jpg': '8efd47a8-ed8d-4433-bca6-6c376180db6c/Konditionen.jpg',
  'kontakt.jpg': '3e05a2f5-94e3-4a05-afe6-c6259cd6d7e9/Kontakt.jpg',
  'vp-01.jpg': '1728552300582-701M96LPVXV82FAL5QNC/vp_1.jpg',
  'vp-02.jpg': '1728546359462-Z44OEW8TUN7V0X97TPPW/DTS_Tone_Chris_Abatzis_Photos_ID5647.jpg',
  'vp-03.jpg': '1728924859157-QOI8VMV75EDLVU9YXMBQ/non-perfomance.jpg',
  'vp-04.jpg': '1728925077726-CR855CGAWDEE6IHZKCO1/vp_04.jpeg',
};
const extra = {
  'favicon.ico': CDN + '55eb9547-6fdd-44cd-958a-5e25c18733d9/favicon.ico?format=100w',
};

const soft = process.argv.includes('--soft');
const force = process.argv.includes('--force');
const outDir = join(process.cwd(), 'public', 'images');
mkdirSync(outDir, { recursive: true });

const jobs = [
  ...Object.entries(images).map(([name, path]) => [join(outDir, name), CDN + path + W]),
  ...Object.entries(extra).map(([name, url]) => [join(process.cwd(), 'public', name), url]),
];

let failed = 0;
for (const [file, url] of jobs) {
  if (existsSync(file) && !force) continue;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    console.log('✓', file.replace(process.cwd() + '/', ''));
  } catch (e) {
    failed++;
    console.warn('✗', file.replace(process.cwd() + '/', ''), '–', e.message);
  }
}
if (failed && !soft) process.exit(1);
