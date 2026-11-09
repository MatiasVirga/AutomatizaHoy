/**
 * Prepara la carpeta dist/ con SOLO los archivos que se publican.
 *
 *   node scripts/build.mjs
 *
 * Lo que queda afuera: docs/, brand/, README, CHANGELOG y este mismo script.
 * Después, en Netlify, se arrastra la carpeta dist/ (o se configura como publish dir).
 */
import { cpSync, mkdirSync, rmSync, statSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const FILES = ["index.html", "404.html", "robots.txt", "sitemap.xml", "_headers", "_redirects"];
const DIRS = ["assets"];

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

for (const file of FILES) cpSync(join(ROOT, file), join(DIST, file));
for (const dir of DIRS) cpSync(join(ROOT, dir), join(DIST, dir), { recursive: true });

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });

const files = walk(DIST);
const total = files.reduce((acc, f) => acc + statSync(f).size, 0);

console.log(`dist/ listo · ${files.length} archivos · ${(total / 1024 / 1024).toFixed(2)} MB`);
for (const f of files) {
  const rel = f.slice(DIST.length + 1).replace(/\\/g, "/");
  console.log(`  ${(statSync(f).size / 1024).toFixed(1).padStart(7)} KB  ${rel}`);
}
