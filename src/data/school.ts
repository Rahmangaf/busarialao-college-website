// Source: content/01-school-profile.md and content/07-homepage-and-shared-copy.md.
// Tags ([DRAFT], [SAMPLE], [CONFIRM]) stay in the strings until the school confirms them.

export const school = {
  name: 'Busarialao College', // [CONFIRM] official spelling, see content/08-open-questions.md
  tagline: '…educating to inspire',
  foundedYear: 2005,
  location: 'Irewolede, Ilorin, Kwara State',
  streetAddress: '[SAMPLE street address]',
  accreditation: 'CAC registered · Approved by the State Ministry of Education [CONFIRM wording]',
} as const;

/** Whole years since founding, computed from the stored year (never typed as a fixed number). */
export function yearsSinceFounding(now: Date = new Date()): number {
  return now.getFullYear() - school.foundedYear;
}

export const home = {
  title: 'Nurturing Scientific Minds, Inspiring the Future.',
  subline: `A science-focused day and boarding school in Ilorin, since ${school.foundedYear}.`,
} as const;
