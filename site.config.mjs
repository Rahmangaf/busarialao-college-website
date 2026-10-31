// Central site configuration. Plain .mjs so both the Astro pages and the build-time
// launch guard (integrations/launch-guard.mjs) read the same values.

export const siteConfig = {
  /**
   * DEVELOPMENT SETTING. While true, every page carries a noindex meta tag and
   * /robots.txt disallows all crawlers, so unfinished pages cannot be indexed.
   *
   * Switch to false ONLY at launch. The launch guard enforces this:
   *   - `npm run build` (guard on) fails while this is still true, because it is a launch-checklist item;
   *   - a build with this set to false and the guard switched off also fails, so the site can
   *     never be made indexable by a build that skipped the launch checks.
   */
  developmentNoindex: true,
};
