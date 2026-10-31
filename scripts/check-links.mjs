// Checks every internal link in the built site (dist/): the page exists and, for links with a
// #fragment, the target page has an element with that id. Run `npm run build:draft` first.
// External links (http, https, mailto, tel) are not fetched.
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(full);
      return entry.name.endsWith('.html') ? [full] : [];
    }),
  );
  return nested.flat();
}

const exists = (file) => stat(file).then(() => true, () => false);

async function resolveTarget(pathname) {
  const clean = decodeURIComponent(pathname);
  const direct = path.join(dist, clean);
  if (clean.endsWith('/')) return (await exists(path.join(direct, 'index.html'))) ? path.join(direct, 'index.html') : null;
  if (await exists(direct)) return direct;
  return null;
}

const pages = await htmlFiles(dist);
const idCache = new Map();
const ids = async (file) => {
  if (!idCache.has(file)) {
    const html = await readFile(file, 'utf8');
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
};

const broken = [];
let checked = 0;
for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const from = '/' + path.relative(dist, file).split(path.sep).join('/').replace(/index\.html$/, '');
  for (const match of html.matchAll(/\shref="([^"]*)"/g)) {
    const href = match[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    const url = new URL(href, `http://site${from}`);
    checked += 1;
    const target = await resolveTarget(url.pathname);
    if (!target) {
      broken.push(`${from}  ->  ${href}  (page not found)`);
    } else if (url.hash && url.hash.length > 1 && target.endsWith('.html')) {
      if (!(await ids(target)).has(decodeURIComponent(url.hash.slice(1)))) {
        broken.push(`${from}  ->  ${href}  (no element with id "${url.hash.slice(1)}")`);
      }
    }
  }
}

console.log(`Checked ${checked} internal links in ${pages.length} pages.`);
if (broken.length) {
  console.error(`\n${broken.length} broken link(s):`);
  for (const line of [...new Set(broken)].sort()) console.error(`  ${line}`);
  process.exit(1);
}
console.log('No broken internal links.');
