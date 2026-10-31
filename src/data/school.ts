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

const numberWords = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
];
const tensWords = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty'];

/** "Twenty-one" for 21: headline copy that stays in step with yearsSinceFounding(). */
export function yearsSinceFoundingInWords(now: Date = new Date()): string {
  const n = yearsSinceFounding(now);
  if (n < 20) return numberWords[n];
  const tens = tensWords[Math.floor(n / 10)];
  return n % 10 === 0 ? tens : `${tens}-${numberWords[n % 10].toLowerCase()}`;
}

export const home = {
  title: 'Nurturing Scientific Minds, Inspiring the Future.',
  subline: `A science-focused day and boarding school in Ilorin, since ${school.foundedYear}.`,
} as const;
