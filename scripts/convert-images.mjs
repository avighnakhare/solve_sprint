/**
 * Convert downloaded Pexels originals to responsive WebP at multiple widths.
 * Run: node scripts/convert-images.mjs
 */
import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { join, basename, extname } from "path";

const SOURCE_DIR = "design-sources/originals";
const OUTPUT_DIR = "public/images/editorial";
const WIDTHS = [640, 960, 1280, 1600];
const QUALITY = 82;

async function convert() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const files = await readdir(SOURCE_DIR);
  const images = files.filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

  for (const file of images) {
    const name = basename(file, extname(file));
    const src = join(SOURCE_DIR, file);
    const meta = await sharp(src).metadata();
    console.log(`\n${file}: ${meta.width}x${meta.height}`);

    for (const w of WIDTHS) {
      if (meta.width && w > meta.width) {
        console.log(`  skip ${w}w (source is ${meta.width}px)`);
        continue;
      }
      const out = join(OUTPUT_DIR, `${name}-${w}w.webp`);
      await sharp(src).resize(w).webp({ quality: QUALITY }).toFile(out);
      console.log(`  → ${out}`);
    }

    // Also create a default (largest that fits)
    const defaultW = Math.min(1280, meta.width || 1280);
    const defaultOut = join(OUTPUT_DIR, `${name}.webp`);
    await sharp(src).resize(defaultW).webp({ quality: QUALITY }).toFile(defaultOut);
    console.log(`  → ${defaultOut} (default)`);
  }

  console.log("\n✓ All images converted.");
}

convert().catch(console.error);
