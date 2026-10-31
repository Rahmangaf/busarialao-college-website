// Converts the original generated photos in assets/generated-photos into WebP
// masters in src/assets/photos. The originals are never modified or removed.
// Astro's <Image> then builds the responsive sizes from these masters.
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const from = path.join(root, 'assets', 'generated-photos');
const to = path.join(root, 'src', 'assets', 'photos');

const MAX_WIDTH = 1600;
const QUALITY = 78;

// original file name -> output slug (keep in step with src/data/sample-content-register.ts)
const photos = {
  'Collaborative Chemistry Lab Experiment.png': 'chemistry-lab',
  'Students Walking Together on Campus.png': 'students-walking',
  'Gemini-generated dormitory image (blue bunk beds, cream walls).jfif': 'dormitory',
  'Bright School Courtyard Under Blue Skies.png': 'courtyard',
  'Professional Portrait in an Office.png': 'principal-portrait',
  'Hands-On Biology Lab Lesson.png': 'biology-lab',
  'Collaborative Learning in the Computer Lab.png': 'computer-lab',
  'Schoolyard Soccer Showdown.png': 'football',
  'Focused Classroom Exam Session.png': 'exam-session',
};

await mkdir(to, { recursive: true });

for (const [file, slug] of Object.entries(photos)) {
  const input = path.join(from, file);
  const output = path.join(to, `${slug}.webp`);
  await sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(output);
  const [before, after] = await Promise.all([stat(input), stat(output)]);
  console.log(`${slug}.webp  ${(before.size / 1024).toFixed(0)} KB -> ${(after.size / 1024).toFixed(0)} KB`);
}
