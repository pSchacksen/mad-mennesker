// Tjekker at alle stier til designpakken og fotos, som koden refererer til, findes.
// Kør efter `npm run build`: npm run check:assets
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "out");
if (!existsSync(out)) throw new Error("Kør `npm run build` først.");
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = path.join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(out);
const refs = new Set();
for (const f of files.filter((f) => /\.(html|css|js)$/.test(f))) {
  for (const m of readFileSync(f, "utf8").matchAll(/\/(?:brand|images|og)\/[A-Za-z0-9_\-/.]+\.(?:svg|png|webp|avif|jpg)/g)) refs.add(m[0]);
}
const missing = [...refs].filter((r) => !existsSync(path.join(out, r)));
console.log(`${refs.size} unikke billedreferencer fundet.`);
if (missing.length) { console.error("Mangler:\n" + missing.join("\n")); process.exit(1); }
console.log("Alle refererede assets findes.");
