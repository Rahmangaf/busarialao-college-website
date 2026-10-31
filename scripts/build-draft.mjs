// `npm run build:draft` builds with the launch guard switched off, so a build
// can finish while [SAMPLE], [DRAFT] and [CONFIRM] tags are still on the site.
// Works the same on Windows and POSIX shells; `npm run build` keeps the guard on.
import { spawnSync } from 'node:child_process';

const result = spawnSync('npx', ['astro', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, LAUNCH_GUARD: 'off' },
});
process.exit(result.status ?? 1);
