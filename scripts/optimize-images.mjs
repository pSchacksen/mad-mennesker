// Genererer web-optimerede, responsive billeder.
//
//  - Fotos:     assets-src/photos/*.{jpg,png,webp} (originaler, bevares uændret)  ->  public/images/photos/<navn>-<bredde>.{avif,webp,jpg}
//  - Teksturer: public/brand/mad-og-mennesker/backgrounds/textures/*.webp -> <navn>-1280.webp
//  - Metadata:  src/content/generated/photos.json (dimensioner, bredder, blur-placeholder)
//
// Kør med: npm run images   (resultatet er committet, så build kræver det ikke)
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const SRC = path.join(root, "assets-src/photos");
const OUT = path.join(root, "public/images/photos");
const TEX = path.join(root, "public/brand/mad-og-mennesker/backgrounds/textures");
const META = path.join(root, "src/content/generated/photos.json");
const WIDTHS = [480, 828, 1280];
// Billeder bliver aldrig skaleret op: største bredde er kildens egen.

const exists = async (f) => stat(f).then(() => true, () => false);

await mkdir(OUT, { recursive: true });
await mkdir(path.dirname(META), { recursive: true });

const meta = {};
for (const file of (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()) {
  const name = file.replace(/\.[^.]+$/, "");
  const input = sharp(path.join(SRC, file));
  const { width, height } = await input.metadata();
  const widths = WIDTHS.filter((w) => w < width * 0.9).concat(width).filter((w, i, a) => a.indexOf(w) === i);
  for (const w of widths) {
    if (await exists(path.join(OUT, `${name}-${w}.jpg`))) continue;
    const base = sharp(path.join(SRC, file)).resize({ width: w });
    await base.clone().avif({ quality: 55, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await base.clone().webp({ quality: 78 }).toFile(path.join(OUT, `${name}-${w}.webp`));
    await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(OUT, `${name}-${w}.jpg`));
  }
  const lqip = await sharp(path.join(SRC, file)).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
  meta[name] = { width, height, widths, blur: `data:image/webp;base64,${lqip.toString("base64")}` };
  console.log(`foto  ${name}  ${width}x${height}  ->  ${widths.join(", ")}`);
}
await writeFile(META, JSON.stringify(meta, null, 2) + "\n");

for (const file of (await readdir(TEX)).filter((f) => /^[a-z-]+\.webp$/.test(f))) {
  const name = file.replace(/\.webp$/, "");
  if (await exists(path.join(TEX, `${name}-1280.webp`))) continue;
  await sharp(path.join(TEX, file)).resize({ width: 1280 }).webp({ quality: 72 }).toFile(path.join(TEX, `${name}-1280.webp`));
  console.log(`tekstur  ${name}-1280.webp`);
}

// Open Graph-billeder (1200×630) til deling på sociale medier.
const OG = path.join(root, "public/og");
await mkdir(OG, { recursive: true });
for (const [name, position] of [["facade", "centre"], ["dining", "centre"], ["bar", "centre"], ["private-corner", "centre"]]) {
  await sharp(path.join(SRC, `${name}.jpg`))
    .resize({ width: 1200, height: 630, fit: "cover", position })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OG, `${name}.jpg`));
  console.log(`og  ${name}.jpg`);
}
