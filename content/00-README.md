# Content folder: Busarialao College website

This folder is the source of truth for all website content. Claude Code should read it before writing any page copy or data file (`src/data/*`).

## Status tags

| Tag | Meaning |
|---|---|
| **[DRAFT]** | Taken from the school's draft 20th Anniversary magazine. Real source, but the magazine is not final, so every item still needs school confirmation before launch. |
| **[SAMPLE]** | Invented for the design mockup (fees, dates, phone numbers, names, testimonials). Must be replaced with real information before launch. |
| **[CONFIRM]** | Inconsistent or unclear in the source. Do not publish until the school resolves it (see `08-open-questions.md`). |

Nothing in this folder is verified yet. Never remove a tag in code or copy without the school's confirmation.

## Files

| File | Feeds these pages |
|---|---|
| `01-school-profile.md` | About, footer, Home |
| `02-academics.md` | Academics, Results (competitions) |
| `03-results.md` | Results, Home (numbers band) |
| `04-boarding-and-student-life.md` | Boarding & Student Life |
| `05-admissions-and-fees.md` | Admissions, Fees & Payment |
| `06-news-calendar-contact.md` | News & Calendar, Contact |
| `07-homepage-and-shared-copy.md` | Home, top bar, header, navigation, footer, CTAs |
| `08-open-questions.md` | Gaps and inconsistencies to resolve with the school |

## Source rules

1. The magazine (`BUSARI_ALAO_MAGAZINE_123156.docx`) is a draft and may change. When a newer version arrives, update these files first, then the code.
2. Do not invent school facts, statistics, testimonials, facilities or policies. If a page needs content that does not exist here, flag it.
3. Write for a parent reading on a phone: short sentences, plain English, British/Nigerian spelling, naira as ₦180,000.
4. Use the name **Busarialao College** (as on the logo). The magazine also uses "BusariAlao" and "Busari Alao Science College"; see open questions.
5. Dates and numbers that change over time (such as "years since founding") must be computed in code from a stored year, never typed as a fixed number.
