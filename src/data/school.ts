// The editable details live in src/content-data/school.json (edited through /admin or by hand).
// Tags ([DRAFT], [SAMPLE], [CONFIRM]) stay in the strings until the school confirms them.
import data from '../content-data/school.json';

export const school = data.school;

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
  title: data.home.title,
  subline: data.home.subline.replace('{foundedYear}', String(school.foundedYear)),
};
