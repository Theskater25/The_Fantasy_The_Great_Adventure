/* Validate all local asset references declared by the game and all SVG files. */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["story-data.js", "translations.js"]) vm.runInContext(readFileSync(file, "utf8"), sandbox, { filename: file });
const content = sandbox.window.TF_CONTENT;
const enemies = [...content.basicEnemies, ...content.bosses, ...content.treasureBosses, ...content.nordicBosses];
const app = readFileSync("app.js", "utf8");
const refs = [...app.matchAll(/assets\/enemies\/([\w-]+\.svg)/g)].map((m) => m[1]);
for (const enemy of enemies) if (enemy.asset) refs.push(enemy.asset.split("/").at(-1));
const unique = [...new Set(refs)];
const missing = unique.filter((name) => !statSync(join("assets/enemies", name), { throwIfNoEntry: false }));
const svgFiles = readdirSync("assets/enemies").filter((name) => name.endsWith(".svg"));
const badSvg = [];
for (const name of svgFiles) {
  const text = readFileSync(join("assets/enemies", name), "utf8");
  const root = text.match(/<svg\b[^>]*>/)?.[0] || "";
  const viewBox = root.match(/viewBox="([^"]+)"/)?.[1];
  if (!/^\s*<svg\b/.test(text) || !/<\/svg>\s*$/.test(text) || !viewBox) badSvg.push(name);
}
console.log(`portrait references: ${unique.length}; missing files: ${missing.length}`);
if (missing.length) console.log("missing:", missing.join(", "));
console.log(`SVG files: ${svgFiles.length}; malformed root/viewBox: ${badSvg.length}`);
if (badSvg.length) console.log("malformed:", badSvg.join(", "));
if (missing.length || badSvg.length) process.exitCode = 1;
