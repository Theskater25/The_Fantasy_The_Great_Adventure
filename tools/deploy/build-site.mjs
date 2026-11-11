import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const repository = fileURLToPath(new URL('../../', import.meta.url));
const source = path.join(repository, 'game');
const output = path.join(repository, 'dist');
const allowedRoot = new Set(['index.html', 'manifest.webmanifest', 'service-worker.js']);
const allowedFolders = new Set(['js', 'css', 'assets', 'audio']);
const extensions = new Set(['.js', '.css', '.png', '.svg', '.mp3', '.json']);
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    assert.ok(!entry.isSymbolicLink(), `Unexpected link: ${file}`);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
function allowed(relative) {
  const parts = relative.split(path.sep);
  return allowedRoot.has(relative) || relative === path.join('translations', 'catalog.js') ||
    (allowedFolders.has(parts[0]) && extensions.has(path.extname(relative)));
}
// Idempotent copying; refuse unexpected stale output instead of deleting anything.
const files = walk(source).filter(file => allowed(path.relative(source, file)));
const expected = new Set(files.map(file => path.relative(source, file)));
if (fs.existsSync(output)) {
  assert.ok(!fs.lstatSync(output).isSymbolicLink(), 'dist must be a real directory');
  for (const file of walk(output)) assert.ok(expected.has(path.relative(output, file)), `Stale output: ${file}`);
}
for (const file of files) {
  const target = path.join(output, path.relative(source, file));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(file, target);
}
const requireAsset = (base, reference) => {
  if (/^(?:data:|https?:|#)/.test(reference)) return;
  const target = path.resolve(base, reference.split(/[?#]/)[0]);
  assert.ok(target === output || target.startsWith(output + path.sep), `Reference outside site: ${reference}`);
  assert.ok(fs.existsSync(target), `Missing site resource: ${reference}`);
};
const html = fs.readFileSync(path.join(output, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) requireAsset(output, match[1]);
for (const file of walk(path.join(output, 'css'))) {
  const css = fs.readFileSync(file, 'utf8');
  for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) requireAsset(path.dirname(file), match[1]);
}
const manifest = JSON.parse(fs.readFileSync(path.join(output, 'manifest.webmanifest'), 'utf8'));
for (const icon of manifest.icons) requireAsset(output, icon.src);
const worker = fs.readFileSync(path.join(output, 'service-worker.js'), 'utf8');
const shell = worker.match(/const APP_SHELL = (\[[\s\S]*?\]);/)?.[1];
assert.ok(shell, 'Missing service worker precache');
for (const match of shell.matchAll(/"([^"]+)"/g)) requireAsset(output, match[1]);
const bytes = files.reduce((sum, file) => sum + fs.statSync(file).size, 0);
console.log(JSON.stringify({ site: 'dist/', files: files.length, bytes, excluded: ['docs', 'tests', 'tools', 'archive', '.git', 'translation sources'] }, null, 2));
