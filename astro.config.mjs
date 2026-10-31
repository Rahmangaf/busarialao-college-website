import { defineConfig } from 'astro/config';
import launchGuard from './integrations/launch-guard.mjs';
import devAdmin from './integrations/dev-admin.mjs';

// Static site. `site` is deliberately unset until the domain is decided.
// devAdmin() serves the /admin editor in `npm run dev` only. It adds nothing to the built site.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [launchGuard(), devAdmin()],
});
