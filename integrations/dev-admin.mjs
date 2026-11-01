// Serves the content editor (Decap CMS) at /admin/ while `npm run dev` is running.
// It only exists in the dev server: `npm run build` does not include it, so nothing is
// published and the launch guard is not affected. Hosting and login are still undecided.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const page = { file: 'cms/index.html', type: 'text/html; charset=utf-8' };
const routes = {
  '/admin/': page,
  '/admin/index.html': page,
  '/admin/config.js': { file: 'cms/config.js', type: 'text/javascript; charset=utf-8' },
  '/admin/decap-cms.js': {
    file: 'node_modules/decap-cms/dist/decap-cms.js',
    type: 'text/javascript; charset=utf-8',
  },
};

export default function devAdmin() {
  return {
    name: 'dev-admin',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || '').split('?')[0];
          if (url === '/admin') {
            res.statusCode = 301;
            res.setHeader('Location', '/admin/');
            res.end();
            return;
          }
          const route = routes[url];
          if (!route) return next();
          const file = path.resolve(process.cwd(), route.file);
          if (!existsSync(file)) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(`Missing ${route.file}. Run: npm install --save-dev decap-cms decap-server`);
            return;
          }
          res.setHeader('Content-Type', route.type);
          res.setHeader('X-Robots-Tag', 'noindex');
          res.setHeader('Cache-Control', 'no-store');
          res.end(readFileSync(file));
        });
      },
    },
  };
}
