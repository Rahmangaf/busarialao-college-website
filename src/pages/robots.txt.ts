import type { APIRoute } from 'astro';
import { siteConfig } from '../../site.config.mjs';

// robots.txt follows the single flag in site.config.mjs.
// No Sitemap line until the domain is decided (`site` is unset in astro.config.mjs).
export const GET: APIRoute = () => {
  const body = siteConfig.developmentNoindex
    ? '# Development: the site is not public yet. Do not crawl or index.\nUser-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
