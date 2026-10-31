// Derives the web logos from assets/logo/busarialao-logo-clean.svg.
// - logo.svg:       original artwork without the embedded C2PA metadata blob
//                   and without the white background rectangle.
// - logo-white.svg: footer version for the navy ground. The wordmark becomes
//                   white and the red tagline becomes a pale blue; the blue
//                   circles and the emblem are untouched.
// The original file is never modified.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'assets', 'logo', 'busarialao-logo-clean.svg');
const outDir = path.join(root, 'public', 'logo');

const svg = await readFile(source, 'utf8');

const base = svg
  .replace(/<metadata>[\s\S]*?<\/metadata>\s*/, '')
  .replace(/\s+xmlns:c2pa="[^"]*"/, '')
  .replace(/<rect width="553" height="287" fill="#fff"\/>\s*/, '')
  // fixed pixel size comes from the <img> attributes, not the file
  .replace(/\s+width="1106"\s+height="574"/, '');

const WORDMARK = '#2a1f7a';
const TAGLINE = '#b3202a';
for (const colour of [WORDMARK, TAGLINE]) {
  if (!base.includes(`fill="${colour}"`)) throw new Error(`Expected ${colour} in the logo source`);
}

const white = base
  .replace(`fill="${WORDMARK}"`, 'fill="#ffffff"')
  .replace(`fill="${TAGLINE}"`, 'fill="#d6eaf8"');

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'logo.svg'), base);
await writeFile(path.join(outDir, 'logo-white.svg'), white);
console.log(`logo.svg ${(base.length / 1024).toFixed(1)} KB, logo-white.svg ${(white.length / 1024).toFixed(1)} KB`);
