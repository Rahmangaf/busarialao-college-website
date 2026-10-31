import { defineConfig } from 'astro/config';
import launchGuard from './integrations/launch-guard.mjs';

// Static site. `site` is deliberately unset until the domain is decided.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [launchGuard()],
});
