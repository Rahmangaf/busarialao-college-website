# Busarialao College website

Marketing and admissions site for Busarialao College, a science-focused day and boarding secondary school in Ilorin, Kwara State. Parents on phones are the main audience. Nothing on the site is verified yet: all content is a draft until the school confirms it.

## Stack

- **Astro**, static output (`output: 'static'`), TypeScript. No React, no Tailwind, no shadcn/ui.
- **The design system's own CSS and tokens.** `src/styles/tokens.css` and `src/styles/bundle.css` are the design system from the approved design handoff (class prefix `bc-`). Site-specific layout goes in `src/styles/site.css` (shared chrome) and per-page files such as `src/styles/home.css`. Do not add a CSS framework.
- **Inter, self-hosted** through `@fontsource-variable/inter` (family name "Inter Variable"). No Google Fonts request.
- **Client-side JavaScript stays minimal.** Small scripts or islands only where needed: the mega-menu, accordions, results year selector, news filter and form validation. The mobile menu is a native `popover` and the accordions are native `<details>`, so they need no script. Prefer HTML and CSS first.
- **Images**: originals stay in `assets/`. `npm run images` writes WebP masters to `src/assets/photos`; Astro's `<Image>` builds the responsive sizes. Use the `Media` component, never a bare `<img>` for photographs.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:4321. The launch guard does not run. |
| `npm run build` | Production build **with the launch guard on**. Fails while any `[SAMPLE]`, `[DRAFT]` or `[CONFIRM]` tag is in the built pages, or while `developmentNoindex` is still on. |
| `npm run build:draft` | Production build with the guard off (`LAUNCH_GUARD=off`). Use this while the site is still being built. |
| `npm run check` | `astro check` (types and Astro diagnostics). |
| `npm run check:links` | Checks every internal link and `#fragment` in `dist/` (run `build:draft` first). |
| `npm run check:contrast` | Checks that white text stays at 4.5:1 or better on every Home hero slide and on the closing section, at eight widths. Run it after changing an overlay strength, a focus point or a hero photo. |
| `npm run images` | Regenerate the WebP masters from `assets/generated-photos`. |
| `npm run logos` | Regenerate `public/logo/*.svg` from `assets/logo/busarialao-logo-clean.svg`. |
| `npm run favicons` | Regenerate the favicon set in `public/` from the logo emblem. |

## Layout

- `content/` is the source of truth for all copy. Read it before writing page copy or data. `content/00-README.md` has the tag rules; `content/08-open-questions.md` lists what the school must confirm.
- `src/data/` holds typed data (`school`, `contact`, `admissions`, `results`, `nav`) and `sample-content-register.ts`, the list of every generated photo, its alt text and where it is used.
- `design-system/` is an untouched copy of the handoff CSS and tokens (the v4 "structural alignment pass"), for diffing when the design changes. The site loads the copies in `src/styles/` (identical except the Google Fonts `@import` is removed).
- `src/styles/site-tokens.css` holds the site's own tokens that sit on top of the design system: the overlay colour and strengths (hero and closing section), the hero height, text width and top offset. Change them there, not in a page.
- `design-references/` has desktop screenshots of the approved design. The full design (desktop, mobile and states) is the Claude design handoff canvas.
- `site.config.mjs` holds the central `developmentNoindex` flag (see Launch checklist).
- `integrations/launch-guard.mjs` is the build check described above.
- `src/pages/` has one file per page; shared page structure is `PageHero` and `CtaBand` in `src/components/`, styled by `src/styles/pages.css` and `page-sections.css`.
- Home is `src/pages/index.astro` with `HeroCarousel`, `PhotoFill` (a photo that fills its parent) and `Tag` (a small label on its own line) in `src/components/`, styled by `src/styles/home.css`. Its copy is `src/content-data/home.json`, read through `src/data/home.ts`.

## Content rules

1. **Tags.** `[DRAFT]` (from the draft magazine), `[SAMPLE]` (invented for the mockup) and `[CONFIRM]` (unclear in the source) stay in the copy until the school confirms the item. Never remove a tag without that confirmation. Tags are literal text in the data and templates, so the launch guard can find them.
2. Do not invent school facts, statistics, testimonials, facilities or policies. If a page needs content that does not exist, flag it.
3. Write plain, short sentences. British/Nigerian spelling. Naira as ₦180,000. Verbs first on buttons.
4. Use the name **Busarialao College** (the spelling is itself `[CONFIRM]`).
5. Anything that changes over time (such as years since founding) is computed from a stored year, never typed.
6. Every photograph is a generated sample with a visible `[SAMPLE] Generated photo` tag and an entry in the sample-content register. Hide a section rather than fill it with flat placeholder boxes.

## Decisions

- Breakpoints: 600px and 960px (design tokens) for page layout. The site chrome (top bar, full navigation, mega-menu) starts at **1100px**; below that the header is the mobile header, because six nav labels, the logo and Apply Now do not fit on one line any narrower. Tablet (check at 768px) has no separate design.
- Home Minimal is the design reference for every inner page: one slim top bar, no eyebrow labels, at most one navy section per page, circle motif on Home only, no flat placeholder boxes (a section without a real photo has none). **Home itself is now "Home Fuller – Full Hero"** (full-bleed hero carousel). Its numbers band is the one navy section; the closing section is a photo under a navy overlay.
- **Container line.** Everything sits on one line, `--edge` (the distance from the viewport edge to the 1200px container, 20px on phones). The top bar, header, footer, sections and the hero text, controls and photo label all use it. Do not give a component its own side padding.
- **Home hero.** Slides, buttons and photos come from `home.json`. The text column is 560px wide, in the same place on every slide (the slides share grid rows, so the buttons stay level). The hero is 620px tall (600px on phones, capped to leave the headline and main button above the fold). Autoplay is off by default (`hero.autoplay.enabled`); when on it is slow, pauses on hover, focus and touch, stops after one loop and never runs under reduced motion. Only the first photo is preloaded and eager.
- **Tags on pages.** A tag is written `SAMPLE`, `DRAFT` or `CONFIRM` in `home.json` and shown as the literal `[SAMPLE]` etc. on its own line under the heading (`Tag` component). Tags inside a sentence stay in the sentence. The brackets are part of the text so the launch guard can find them.
- Invented achievement claims from the mockup (JAMB 312, top-five candidate grades, teacher ratio, testimonials) are not built. Structural placeholders (fees, dates, hours, phone numbers) are built and tagged `[SAMPLE]`.
- "Apply Now" and "Start your application" link to the Admissions page's application steps (`/admissions/#how-to-apply`). `/apply/` is a simple "Applications open soon" page for the form itself.
- "Book a Tour" links to `/contact/?interest=tour`, which preselects "Book a tour" as the level of interest.
- Portals link to one "Portal links coming soon" page (`/portals/`) listing Parent, Student, Staff and Applicant, tagged `[SAMPLE]`.
- Nav sub-pages (Leadership, Scholarships, Entrance exam, Eligibility) are sections on their parent page, not separate pages.
- The contact form validates, then hands off to WhatsApp through one `submitEnquiry` function. No storage, no email, and no success state unless it actually sent.
- Until the school supplies a WhatsApp number (`contact.whatsappNumber`), WhatsApp links go to the Contact page rather than a made-up number.
- Contact map and Boarding gallery are hidden until real assets exist. Keep an "Open in Google Maps" link.
- Payment confirmed is a static design state only, clearly marked "payment not yet connected".

## Launch checklist

`npm run build` (guard on) must pass before launch. It checks:

1. No `[SAMPLE]`, `[DRAFT]` or `[CONFIRM]` tag is left in any built page.
2. `developmentNoindex` in `site.config.mjs` is switched off. While it is on, every page has a `noindex` meta tag and `/robots.txt` disallows everything.
3. Exposure protection (every build, even with the guard off): the noindex tag and robots.txt must match the flag, and `developmentNoindex: false` with `LAUNCH_GUARD=off` is refused.

Also before launch: set `contact.whatsappNumber`, replace every generated photo (see the sample-content register), add the real domain as `site` in `astro.config.mjs`, and add a sitemap.

## Not decided yet

Payments (provider and webhook), enquiry delivery beyond WhatsApp, hosting and domain. Do not choose a provider or add a webhook. `site` is deliberately unset in `astro.config.mjs` until the domain is known.

## Phasing

1. Foundation, data layer, Home, About, Contact (with its sent state), then stop for review at 1440px and 360px.
2. Remaining pages: Admissions, Fees, Results, Academics, Boarding, News, plus the Apply, Portals and Privacy placeholders.

Commit after each phase.


## Editable content and the admin panel

- **Copy and data live in `src/content-data/*.json`.** The files in `src/data/*.ts` are thin wrappers that import the JSON and keep the same exports, so pages did not change. Computed logic (years since founding, `whatsappHref`, `telHref`, date formatting, sorting) stays in the `.ts` files. Edit text in the JSON or through the admin panel, not in the wrappers.
- **Placeholders in the JSON.** `admissions.json` stores the exam date and fee once; other text uses `{examDate}`, `{examDateShort}` and `{applicationFee}`, filled in by `src/data/admissions.ts`. `school.json` uses `{foundedYear}`. Leave these in place.
- **Admin panel (Decap CMS).** Run `npm run dev` and, in a second terminal, `npm run cms`, then open `/admin/`. It is served by `integrations/dev-admin.mjs` in the dev server only, so it is not in the built site and the launch guard is unaffected. The editor's fields are defined in `cms/config.js`. The `backend` there is a placeholder: hosting and the live login are not decided.
- **When you add or rename a field in a JSON file, add it to `cms/config.js` too**, then run `node cms/check-config.mjs`. A field the editor does not know about can be lost the next time someone saves in the admin.
- The editor reorders JSON keys when it saves. That is cosmetic. To see real changes only, compare parsed values, not lines.
- Photos are not editable in the admin yet. They come from `sample-content-register.ts` and `npm run images`.
- The tag rule still applies in the admin: keep `[SAMPLE]`, `[DRAFT]` and `[CONFIRM]` until the school confirms the item.