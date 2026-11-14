# Content folder: Busarialao College website

**Source of truth: the 20th Anniversary magazine PDF (`busarialao_brochure_arranged.pdf`, 120 pages).** It replaces the earlier draft document (`BUSARI_ALAO_MAGAZINE_123156.docx`). Where the two disagree, this folder follows the PDF. The differences are listed in `09-brochure-vs-draft-changes.md`.

Claude Code should read this folder before writing any page copy or data file.

## Tags

| Tag | Meaning |
|---|---|
| *(no tag)* | Taken from the PDF. Treated as the school's official statement. |
| **[SAMPLE]** | Invented for the design mockup (fees, dates, phone numbers, testimonials, exam logistics). Must be replaced before launch. |
| **[CONFIRM]** | Unclear, contradictory or a claim that needs proof. Do not publish until the school resolves it (see `08-open-questions.md`). |

Decision made when updating: facts taken from the PDF no longer carry **[DRAFT]**, because the PDF is now the source of truth. Reverse this if the school says the PDF is still unfinished.

Page references like "PDF p.21" mean the page number in the PDF file (printed page numbers are 2 lower).

## Files

| File | Feeds these pages |
|---|---|
| `01-school-profile.md` | About, footer, Home |
| `02-academics.md` | Academics |
| `03-results.md` | Results, Home numbers band |
| `04-boarding-and-student-life.md` | Boarding & Student Life |
| `05-admissions-and-fees.md` | Admissions, Fees & Payment |
| `06-news-calendar-contact.md` | News & Calendar, Contact |
| `07-homepage-and-shared-copy.md` | Home, top bar, navigation, footer |
| `08-open-questions.md` | Gaps and inconsistencies to resolve with the school |
| `09-brochure-vs-draft-changes.md` | What changed when the PDF replaced the draft |
| `10-celebrating-20-years.md` | The Celebrating 20 Years page and hero slide |

## Rules

1. Do not invent school facts, statistics, testimonials, facilities or policies. If a page needs content that is not here, flag it.
2. Write for a parent on a phone: short sentences, plain English, Nigerian/British spelling, naira as ₦180,000.
3. The school name is **Busarialao College**. The PDF also uses "Busari Alao College" and "Busarialao Science College" in places: see open questions.
4. Numbers that change over time (such as "years since founding") must be computed in code from a stored year (**2006**), never typed.
5. The PDF contains names and photos of students, alumni and dignitaries, and lists of graduates and current learners. Do not publish names or faces of people on the website without their consent (parents' consent for minors).
6. Do not commit the 100 MB PDF to the repository. Keep it in shared storage and extract only what is needed.
