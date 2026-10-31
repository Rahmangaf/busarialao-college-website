// Source: content/05-admissions-and-fees.md and content/07-homepage-and-shared-copy.md.
// The magazine has no admissions details: everything here is [SAMPLE] unless marked.

const entranceExamDate = '20 March 2027';
const applicationFee = '₦10,000';

export const admissions = {
  session: '2027/2028',
  entranceExamDate,
  applicationFee,
  /** Top bar message. */
  announcement: `Admissions open · Entrance exam ${entranceExamDate} [SAMPLE]`,
  /** Three-step summary on Home. Keep consistent with the seven steps on the Admissions page. */
  joinSummary: [
    {
      title: 'Apply',
      text: `Buy the form online or at the school and pay the ${applicationFee} fee. [SAMPLE]`,
    },
    {
      title: 'Sit the entrance exam',
      text: `On campus, ${entranceExamDate}. Maths, English, Basic Science, Social Studies. [SAMPLE]`,
    },
    {
      title: 'Receive your offer',
      text: 'After a short interview, the admission list is published.',
    },
  ],
  /** Highlighted panel in the Admissions mega-menu. */
  megaFeature: {
    eyebrow: 'Entrance exam',
    heading: `${entranceExamDate} [SAMPLE]`,
    text: 'Held on campus. Forms close 6 March. [SAMPLE]',
  },
} as const;
