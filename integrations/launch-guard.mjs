// Launch guard. Runs only on `astro build` (the hook below never fires in `astro dev`).
//
// Launch checklist, enforced when the guard is on (the default for `npm run build`):
//   1. No [SAMPLE], [DRAFT] or [CONFIRM] tag is left in the built pages.
//   2. `developmentNoindex` in site.config.mjs has been switched off.
//
// Exposure protection, enforced on EVERY build, even with the guard off:
//   - while `developmentNoindex` is true, every page must carry a noindex meta tag and
//     robots.txt must disallow everything;
//   - when it is false, no page may still say noindex and robots.txt must allow crawling;
//   - `developmentNoindex: false` together with LAUNCH_GUARD=off is refused outright, so the
//     site can never be made indexable by a build that skipped the launch checks.
//
// Switch the checklist off with LAUNCH_GUARD=off, or use `npm run build:draft`.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteConfig } from '../site.config.mjs';

const TAG = /\[(?:SAMPLE|DRAFT|CONFIRM)\b[^\]]*\]/gi;
const NOINDEX_META = /<meta\s+name="robots"\s+content="[^"]*noindex/i;
const MAX_EXAMPLES_PER_FILE = 3;

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(full);
      return entry.name.endsWith('.html') ? [full] : [];
    }),
  );
  return nested.flat();
}

export default function launchGuard() {
  return {
    name: 'launch-guard',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const guardOff = process.env.LAUNCH_GUARD === 'off';
        const noindexOn = siteConfig.developmentNoindex === true;
        const outDir = fileURLToPath(dir);
        const failures = [];
        const checklist = [];

        // --- Exposure protection: always on ---
        if (!noindexOn && guardOff) {
          failures.push(
            'developmentNoindex is false but the launch guard is off. Refusing to build pages that search engines may index without the launch checks.',
          );
        }

        const files = (await htmlFiles(outDir)).sort();
        const pages = await Promise.all(
          files.map(async (file) => ({
            name: path.relative(outDir, file).split(path.sep).join('/'),
            html: await readFile(file, 'utf8'),
          })),
        );
        let robots = '';
        try {
          robots = await readFile(path.join(outDir, 'robots.txt'), 'utf8');
        } catch {
          failures.push('robots.txt was not generated.');
        }
        const robotsBlocksAll = /^\s*Disallow:\s*\/\s*$/m.test(robots);

        if (noindexOn) {
          const missing = pages.filter((p) => !NOINDEX_META.test(p.html)).map((p) => p.name);
          if (missing.length) failures.push(`Pages missing the noindex meta tag while developmentNoindex is on: ${missing.join(', ')}`);
          if (!robotsBlocksAll) failures.push('robots.txt does not disallow crawlers while developmentNoindex is on.');
        } else {
          const stuck = pages.filter((p) => NOINDEX_META.test(p.html)).map((p) => p.name);
          if (stuck.length) failures.push(`Pages still say noindex although developmentNoindex is off: ${stuck.join(', ')}`);
          if (robotsBlocksAll) failures.push('robots.txt still disallows crawlers although developmentNoindex is off.');
        }

        // --- Launch checklist: only when the guard is on ---
        if (guardOff) {
          logger.warn('Launch guard is OFF: the launch checklist (tags, development noindex flag) is not enforced. Exposure protection still runs.');
        } else {
          const findings = [];
          let total = 0;
          for (const page of pages) {
            const matches = page.html.match(TAG) ?? [];
            if (matches.length === 0) continue;
            total += matches.length;
            findings.push({ page: page.name, count: matches.length, examples: [...new Set(matches)].slice(0, MAX_EXAMPLES_PER_FILE) });
          }
          checklist.push(
            total === 0
              ? '[ok]   No [SAMPLE], [DRAFT] or [CONFIRM] tags in the built pages.'
              : `[FAIL] ${total} unresolved tag(s) in ${findings.length} page(s).`,
          );
          checklist.push(
            noindexOn
              ? '[FAIL] developmentNoindex is still on in site.config.mjs (switch it off at launch).'
              : '[ok]   developmentNoindex is off.',
          );
          if (total > 0) {
            failures.push(`${total} unresolved tag(s) in ${findings.length} page(s) (listed in the checklist above).`);
            checklist.push(...findings.map((f) => `         ${f.page}  ${f.count}  e.g. ${f.examples.join('  ')}`));
          }
          if (noindexOn) failures.push('developmentNoindex is still on in site.config.mjs (switch it off at launch).');
          logger.info(`Launch checklist:\n${checklist.join('\n')}`);
        }

        if (failures.length) {
          throw new Error(
            [
              'Launch guard failed:',
              ...failures.map((f) => `  - ${f}`),
              guardOff ? '' : 'To keep building a draft, run `npm run build:draft` (LAUNCH_GUARD=off).',
            ]
              .filter(Boolean)
              .join('\n'),
          );
        }
      },
    },
  };
}
