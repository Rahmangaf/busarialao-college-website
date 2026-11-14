// Checks that white text stays readable (WCAG AA, 4.5:1) on every Home hero slide and on the
// closing section, at several screen widths.
//
// How: it takes each photo's WebP master, crops it the way the page does (object-fit: cover with the
// focus point from src/content-data/home.json), lays the navy overlay on it using the strengths in
// src/styles/site-tokens.css, and finds the brightest background in the area the text can occupy.
// The text area is a little larger than the real text, so the check errs on the cautious side.
//
// Run it after changing an overlay strength, a focus point or a photo:  npm run check:contrast
// Keep the gradient maths below in step with .hero-scrim and .home-closing::before in home.css.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tokensCss = readFileSync(path.join(root, 'src/styles/site-tokens.css'), 'utf8');
const home = JSON.parse(readFileSync(path.join(root, 'src/content-data/home.json'), 'utf8'));

const token = (name) => {
  const match = tokensCss.match(new RegExp(`--${name}:\\s*([0-9.]+)`));
  if (!match) throw new Error(`Token --${name} not found in site-tokens.css`);
  return Number(match[1]);
};
const navy = tokensCss.match(/--overlay-navy:\s*(\d+)\s+(\d+)\s+(\d+)/).slice(1).map(Number);
const copyWidth = Number(tokensCss.match(/--hero-copy-width:\s*(\d+)px/)[1]);
const copyTop = Number(tokensCss.match(/--hero-copy-top:\s*(\d+)px/)[1]);
const heroHeight = Number(tokensCss.match(/--hero-height:\s*(\d+)px/)[1]);
const heroHeightMobile = Number(tokensCss.match(/--hero-height-mobile:\s*(\d+)px/)[1]);

const t = {
  strong: token('hero-overlay-strong'),
  medium: token('hero-overlay-medium'),
  soft: token('hero-overlay-soft'),
  fade: token('hero-overlay-fade'),
  mMid: token('hero-overlay-mobile-mid'),
  mStrong: token('hero-overlay-mobile-strong'),
  mBase: token('hero-overlay-mobile-base'),
  closing: token('closing-overlay'),
};

const percent = (value, list) => {
  const sorted = [...list].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * value))];
};
const channel = (v) => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (r, g, b) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const contrastWithWhite = (lum) => 1.05 / (lum + 0.05);
const lerp = (a, b, f) => a + (b - a) * f;
const interpolate = (stops, x) => {
  if (x <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    if (x <= stops[i][0]) return lerp(stops[i - 1][1], stops[i][1], (x - stops[i - 1][0]) / (stops[i][0] - stops[i - 1][0] || 1));
  }
  return stops[stops.length - 1][1];
};

const cache = new Map();
async function load(photo) {
  if (!cache.has(photo)) {
    const { data, info } = await sharp(path.join(root, 'src/assets/photos', `${photo}.webp`))
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    cache.set(photo, { data, width: info.width, height: info.height });
  }
  return cache.get(photo);
}

/** Brightest background (99.5th percentile) behind a text area, after the overlay. */
async function worstLuminance({ photo, focus, width, height, area, alphaAt }) {
  const img = await load(photo);
  const scale = Math.max(width / img.width, height / img.height);
  const [fx, fy] = focus.split(/\s+/).map((v) => parseFloat(v) / 100);
  const offsetX = (width - img.width * scale) * fx;
  const offsetY = (height - img.height * scale) * fy;
  const lums = [];
  for (let y = Math.max(0, area.y0); y < Math.min(height, area.y1); y += 2) {
    for (let x = Math.max(0, area.x0); x < Math.min(width, area.x1); x += 2) {
      const sx = Math.min(img.width - 1, Math.max(0, Math.floor((x - offsetX) / scale)));
      const sy = Math.min(img.height - 1, Math.max(0, Math.floor((y - offsetY) / scale)));
      const i = (sy * img.width + sx) * 3;
      const a = alphaAt(x, y);
      lums.push(
        luminance(
          img.data[i] * (1 - a) + navy[0] * a,
          img.data[i + 1] * (1 - a) + navy[1] * a,
          img.data[i + 2] * (1 - a) + navy[2] * a,
        ),
      );
    }
  }
  return percent(0.995, lums);
}

const widths = [360, 414, 600, 768, 1024, 1280, 1440, 1920];
const rows = [];
let failures = 0;
const check = (label, lum, min = 4.5, note = '') => {
  const ratio = contrastWithWhite(lum);
  const ok = ratio >= min;
  if (!ok) failures++;
  rows.push(`${ok ? 'ok  ' : 'FAIL'}  ${label.padEnd(46)} ${ratio.toFixed(2)}:1 (needs ${min}:1)${note}`);
};

// ---- Hero slides ----
for (const [index, slide] of home.hero.slides.entries()) {
  for (const width of widths) {
    const mobile = width < 600;
    const height = mobile ? heroHeightMobile : heroHeight;
    const edge = mobile ? 20 : Math.max(32, (width - 1200) / 2);
    let area;
    let alphaAt;
    if (mobile) {
      // Text is anchored 84px above the bottom; it is about 320px tall.
      area = { x0: edge, x1: width - edge, y0: height - 84 - 330, y1: height - 84 };
      const stops = [[0.12, 0], [0.32, t.mMid], [0.5, t.mStrong], [1, t.mBase]];
      alphaAt = (x, y) => interpolate(stops, y / height);
    } else {
      const top = width >= 960 ? copyTop : 64;
      const textWidth = Math.min(copyWidth, width - 2 * edge);
      area = { x0: edge, x1: edge + textWidth, y0: top, y1: top + 380 };
      const textEnd = edge + copyWidth;
      const stops = [
        [0, t.strong],
        [textEnd * 0.64, t.medium],
        [textEnd, t.soft],
        [textEnd + width * 0.084, t.fade],
        [textEnd + width * 0.25, 0],
      ];
      alphaAt = (x) => interpolate(stops, x);
    }
    const focus = mobile ? slide.focusMobile : slide.focusDesktop;
    const lum = await worstLuminance({ photo: slide.photo, focus, width, height, area, alphaAt });
    check(`hero slide ${index + 1} (${slide.photo}) at ${width}px`, lum);
  }
}

// ---- Closing section: the whole section is treated as text area ----
const closingHeights = { 360: 821, 414: 800, 600: 700, 768: 653, 1024: 719, 1280: 695, 1440: 695, 1920: 695 };
for (const width of widths) {
  const height = closingHeights[width];
  const focus = width < 600 ? home.closing.focusMobile : home.closing.focus;
  const lum = await worstLuminance({
    photo: home.closing.photo,
    focus,
    width,
    height,
    area: { x0: 0, x1: width, y0: 0, y1: height },
    alphaAt: () => t.closing,
  });
  check(`closing section (${home.closing.photo}) at ${width}px`, lum);
}

console.log(rows.join('\n'));
console.log(failures ? `\n${failures} check(s) below AA. Raise the overlay strength or move the focus point.` : '\nAll text on photos meets AA (4.5:1).');
process.exit(failures ? 1 : 0);
