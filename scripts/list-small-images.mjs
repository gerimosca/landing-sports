#!/usr/bin/env node
/**
 * Scan /public/images and list source JPGs by width buckets, so you can
 * identify which ones are too small to render sharply on retina mobile.
 */
import { readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const all = [];

function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.toLowerCase().endsWith('.jpg') || e.name.toLowerCase().endsWith('.jpeg') || e.name.toLowerCase().endsWith('.png')) {
      all.push(p);
    }
  }
}

walk(ROOT);

const rows = [];
for (const file of all) {
  try {
    const m = await sharp(file).metadata();
    rows.push({ file, w: m.width ?? 0, h: m.height ?? 0 });
  } catch {
    /* skip unreadable */
  }
}

const norm = (p) => p.replace(/\\/g, '/');

const lt500 = rows.filter((r) => r.w < 500);
const lt800 = rows.filter((r) => r.w >= 500 && r.w < 800);
const lt1024 = rows.filter((r) => r.w >= 800 && r.w < 1024);

const fmt = (arr) =>
  arr
    .sort((a, b) => a.file.localeCompare(b.file))
    .map((r) => `  ${norm(r.file)}  (${r.w}x${r.h})`)
    .join('\n');

console.log('═════════════════════════════════════════════════════════════════');
console.log(' Imágenes < 500px de ancho (CRÍTICAS — pixelarán en mobile retina)');
console.log('═════════════════════════════════════════════════════════════════');
console.log(`Total: ${lt500.length}\n`);
console.log(fmt(lt500));
console.log('');

console.log('═════════════════════════════════════════════════════════════════');
console.log(' Imágenes 500–799px (BLANDAS en mobile retina con DPR 2)');
console.log('═════════════════════════════════════════════════════════════════');
console.log(`Total: ${lt800.length}\n`);
console.log(fmt(lt800));
console.log('');

console.log('═════════════════════════════════════════════════════════════════');
console.log(' Imágenes 800–1023px (ACEPTABLES, solo zoom extremo se nota)');
console.log('═════════════════════════════════════════════════════════════════');
console.log(`Total: ${lt1024.length}\n`);

const csv = ['file,width,height,bucket'];
for (const r of [...lt500, ...lt800, ...lt1024]) {
  const bucket = r.w < 500 ? 'critical' : r.w < 800 ? 'soft' : 'acceptable';
  csv.push(`${norm(r.file)},${r.w},${r.h},${bucket}`);
}
writeFileSync('low-res-images.csv', csv.join('\n'), 'utf8');
console.log('CSV guardado en: low-res-images.csv');
