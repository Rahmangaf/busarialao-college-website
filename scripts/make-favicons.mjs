// Derives the favicons from the emblem (the flask-and-book mark inside the circle) in
// assets/logo/busarialao-logo-clean.svg. The wordmark and tagline are left out.
// The original file is never modified.
//
// Output in public/: favicon.svg, favicon.ico (16, 32, 48), favicon-16x16.png,
// favicon-32x32.png, apple-touch-icon.png (180), icon-192.png, icon-512.png.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'assets', 'logo', 'busarialao-logo-clean.svg');
const outDir = path.join(root, 'public');

const svg = await readFile(source, 'utf8');

// The emblem is the white disc (cx 308, cy 112, r 78) through the end of the <g> that holds the flask and book,
// which comes right before the wordmark <path>.
const start = svg.indexOf('<circle cx="308" cy="112" r="78"');
const end = svg.indexOf('<path fill="#2a1f7a"');
if (start === -1 || end === -1) throw new Error('Could not find the emblem in the logo source');
const emblem = svg.slice(start, end).trim();

// Square canvas centred on the emblem: 176 units, with a sky-blue disc behind the white one so the
// icon carries the logo's blue instead of floating as a white disc on a white tab.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="220 24 176 176" width="176" height="176">
<circle cx="308" cy="112" r="88" fill="#1b92d9"/>
${emblem}
</svg>
`;

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, 'favicon.svg'), favicon);

const png = (size, background) =>
  sharp(Buffer.from(favicon), { density: (72 * size * 2) / 176 })
    .resize(size, size)
    .flatten(background ? { background } : false)
    .png()
    .toBuffer();

const out = {
  'favicon-16x16.png': await png(16),
  'favicon-32x32.png': await png(32),
  'apple-touch-icon.png': await png(180, '#ffffff'),
  'icon-192.png': await png(192),
  'icon-512.png': await png(512),
};
for (const [name, buffer] of Object.entries(out)) await writeFile(path.join(outDir, name), buffer);

// favicon.ico with PNG-compressed 16, 32 and 48 px images.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((size) => png(size)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((image, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(sizes[i], 0);
  entry.writeUInt8(sizes[i], 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(image.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += image.length;
  return entry;
});
await writeFile(path.join(outDir, 'favicon.ico'), Buffer.concat([header, ...entries, ...images]));

console.log('favicon.svg, favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, icon-192.png, icon-512.png');
