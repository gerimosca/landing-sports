#!/usr/bin/env node
/**
 * Optimize images in /public/images for static serving on Vercel free tier.
 *
 * For every JPG/JPEG/PNG file under /public/images it generates 3 WebP variants:
 *   - <name>-400.webp   (mobile / thumbnails)
 *   - <name>-800.webp   (tablet / desktop card grid)
 *   - <name>-1200.webp  (lightbox / full-screen)
 *
 * Idempotent: skips files whose 3 variants already exist and are newer than the source.
 *
 * Usage:
 *   node scripts/optimize-images.mjs              # Process all
 *   node scripts/optimize-images.mjs --force      # Re-generate even if cached
 *   node scripts/optimize-images.mjs --quality=82 # Override default quality
 *   node scripts/optimize-images.mjs --root=public/other
 */

import { readdir, stat, mkdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const QUALITY = parseInt(
  args.find((a) => a.startsWith('--quality='))?.split('=')[1] ?? '78',
  10
);
const ROOT_FLAG = args.find((a) => a.startsWith('--root='));
const ROOT = path.resolve(
  ROOT_FLAG ? ROOT_FLAG.split('=')[1] : 'public/images'
);

const SIZES = [400, 800, 1200];
const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png']);

const CONCURRENCY = Math.max(2, Math.min(os.cpus().length, 8));

const stats = {
  scanned: 0,
  processed: 0,
  skipped: 0,
  failed: 0,
  bytesSourceTotal: 0,
  bytesWebpTotal: 0,
};

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}

function variantsFor(sourcePath) {
  const ext = path.extname(sourcePath);
  const base = sourcePath.slice(0, -ext.length);
  return SIZES.map((width) => ({
    width,
    outPath: `${base}-${width}.webp`,
  }));
}

function isUpToDate(sourcePath, variants) {
  if (FORCE) return false;
  let sourceMtime;
  try {
    sourceMtime = statSync(sourcePath).mtimeMs;
  } catch {
    return false;
  }
  return variants.every(({ outPath }) => {
    if (!existsSync(outPath)) return false;
    try {
      return statSync(outPath).mtimeMs >= sourceMtime;
    } catch {
      return false;
    }
  });
}

async function processOne(sourcePath) {
  stats.scanned++;
  const variants = variantsFor(sourcePath);

  if (isUpToDate(sourcePath, variants)) {
    stats.skipped++;
    return;
  }

  const sourceSize = (await stat(sourcePath)).size;
  stats.bytesSourceTotal += sourceSize;

  let pipeline;
  try {
    pipeline = sharp(sourcePath, { failOn: 'truncated' });
    const metadata = await pipeline.metadata();

    await Promise.all(
      variants.map(async ({ width, outPath }) => {
        const targetWidth = Math.min(width, metadata.width ?? width);
        const buffer = await sharp(sourcePath)
          .rotate()
          .resize({
            width: targetWidth,
            withoutEnlargement: true,
            fit: 'inside',
          })
          .webp({
            quality: QUALITY,
            effort: 5,
          })
          .toBuffer();

        await sharp(buffer).toFile(outPath);
        stats.bytesWebpTotal += buffer.byteLength;
      })
    );

    stats.processed++;
    const rel = path.relative(process.cwd(), sourcePath);
    process.stdout.write(`  ✓ ${rel}\n`);
  } catch (err) {
    stats.failed++;
    const rel = path.relative(process.cwd(), sourcePath);
    process.stderr.write(`  ✗ ${rel} — ${err.message}\n`);
  }
}

async function pool(items, worker, concurrency) {
  const queue = items.slice();
  const runners = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const item = queue.shift();
      await worker(item);
    }
  });
  await Promise.all(runners);
}

async function main() {
  if (!existsSync(ROOT)) {
    console.error(`Source directory not found: ${ROOT}`);
    process.exit(2);
  }

  console.log(`Optimizing images in: ${path.relative(process.cwd(), ROOT)}`);
  console.log(`Quality: ${QUALITY}  Sizes: ${SIZES.join('w, ')}w  Concurrency: ${CONCURRENCY}`);
  if (FORCE) console.log('--force: re-generating all variants');
  console.log('');

  const sourceFiles = [];
  for await (const file of walk(ROOT)) {
    const ext = path.extname(file).toLowerCase();
    if (!SOURCE_EXTS.has(ext)) continue;
    if (file.match(/-(?:400|800|1200)\.webp$/)) continue;
    sourceFiles.push(file);
  }

  console.log(`Found ${sourceFiles.length} source images.\n`);
  if (sourceFiles.length === 0) return;

  const t0 = Date.now();
  await pool(sourceFiles, processOne, CONCURRENCY);
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

  const mbSource = (stats.bytesSourceTotal / 1024 / 1024).toFixed(1);
  const mbWebp = (stats.bytesWebpTotal / 1024 / 1024).toFixed(1);
  const savings =
    stats.bytesSourceTotal > 0
      ? (((stats.bytesSourceTotal - stats.bytesWebpTotal) / stats.bytesSourceTotal) * 100).toFixed(1)
      : '0.0';

  console.log('');
  console.log('─────────────────────────────────────────');
  console.log(`Scanned:    ${stats.scanned}`);
  console.log(`Processed:  ${stats.processed}`);
  console.log(`Skipped:    ${stats.skipped} (already up-to-date)`);
  if (stats.failed > 0) console.log(`Failed:     ${stats.failed}`);
  console.log('');
  if (stats.processed > 0) {
    console.log(`Source total:  ${mbSource} MB`);
    console.log(`WebP total:    ${mbWebp} MB (3 variants per image)`);
    console.log(`Savings:       ${savings}% per image avg`);
  }
  console.log(`Elapsed:       ${elapsed}s`);
  console.log('─────────────────────────────────────────');

  if (stats.failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
