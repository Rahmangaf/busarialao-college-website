// Launch guard: fails a production build while any [SAMPLE], [DRAFT] or [CONFIRM]
// tag is still present in the built pages.
//
// - Runs only on `astro build` (the hook below never fires in `astro dev`).
// - Switch it off with LAUNCH_GUARD=off, or use `npm run build:draft`.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TAG = /\[(?:SAMPLE|DRAFT|CONFIRM)\b[^\]]*\]/gi;
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
        if (process.env.LAUNCH_GUARD === 'off') {
          logger.warn('Launch guard is OFF: [SAMPLE], [DRAFT] and [CONFIRM] tags are not being checked.');
          return;
        }

        const outDir = fileURLToPath(dir);
        const findings = [];
        let total = 0;

        for (const file of (await htmlFiles(outDir)).sort()) {
          const html = await readFile(file, 'utf8');
          const matches = html.match(TAG) ?? [];
          if (matches.length === 0) continue;
          total += matches.length;
          findings.push({
            page: path.relative(outDir, file).split(path.sep).join('/'),
            count: matches.length,
            examples: [...new Set(matches)].slice(0, MAX_EXAMPLES_PER_FILE),
          });
        }

        if (total === 0) {
          logger.info('Launch guard: no [SAMPLE], [DRAFT] or [CONFIRM] tags found.');
          return;
        }

        const lines = findings.map((f) => `  ${f.page}  ${f.count}  e.g. ${f.examples.join('  ')}`);
        throw new Error(
          [
            `Launch guard: ${total} unresolved tag(s) in ${findings.length} page(s).`,
            'Resolve them with the school, or build a draft with `npm run build:draft` (LAUNCH_GUARD=off).',
            ...lines,
          ].join('\n'),
        );
      },
    },
  };
}
