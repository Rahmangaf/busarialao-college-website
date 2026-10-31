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
  hero: {
    title: 'Join Busarialao College',
    lead: 'Entry is at JSS1, with places at SS1 and mid-session where space allows. Here is everything you need, in order. [SAMPLE] [CONFIRM levels and entry points]',
  },
  keyDates: [
    { date: 'Now', event: 'Forms on sale' },
    { date: '6 Mar 2027', event: 'Forms close' },
    { date: entranceExamDate.replace('March', 'Mar'), event: 'Entrance exam, on campus' },
    { date: 'Apr 2027', event: 'Admission list published' },
  ],
  steps: [
    { title: 'Buy the form', text: 'Online or at the admissions office. [SAMPLE]', link: { label: 'Start the form (opens soon)', href: '/apply/' } },
    { title: 'Pay the application fee', text: `${applicationFee}, into the school's official account only. [SAMPLE]` },
    { title: 'Sit the entrance exam', text: `${entranceExamDate}, on campus. [SAMPLE]` },
    { title: 'Attend an interview', text: 'With a parent or guardian. [SAMPLE]' },
    { title: 'Check the admission list', text: 'Published on the applicant portal and at school. [SAMPLE]' },
    { title: 'Pay the acceptance fee', text: '₦50,000 to secure the place. [SAMPLE]' },
    { title: 'Resume', text: 'Start of term on the published resumption date. [SAMPLE]' },
  ],
  stepsNote: 'About six weeks from form to first day. [SAMPLE]',
  eligibility: [
    'JSS1 entrants aged 10 to 12 by 30 September. [SAMPLE]',
    'SS1 and mid-session entry where space allows, with a transfer certificate. [SAMPLE]',
  ],
  documents: [
    'Last report card',
    'Birth certificate',
    'Two passport photographs',
    'Transfer certificate (SS1 and mid-session entry)',
  ],
  documentsNote: 'List [SAMPLE].',
  exam: {
    heading: 'Four papers, on campus [SAMPLE]',
    text: `Held at the school campus on ${entranceExamDate}. [SAMPLE]`,
    subjects: ['Mathematics', 'English', 'Basic Science', 'Social Studies'],
    subjectsNote: 'Subjects [SAMPLE]. Missed the date? See the FAQ below.',
    samplePapersLabel: 'Sample papers (PDF)',
    samplePapersUrl: null as string | null,
  },
  scholarship: {
    heading: 'For able students from partner public schools',
    figure: '4',
    figureLabel: 'full scholarships awarded each year [DRAFT]',
    points: [
      "Introduced in 2018: the college accredited 80 public schools across the state's 16 local government areas to take part. [DRAFT]",
      'An entrance exam is held each year; four learners receive full scholarships annually. [DRAFT]',
      'Aimed at able, less-privileged students with a strong interest in science. [DRAFT]',
    ],
    note: 'Eligibility details and how to apply are not given in the magazine. [CONFIRM]',
  },
  faq: [
    {
      q: 'Can I apply mid-session?',
      a: 'Yes, where space allows. Bring a transfer certificate and the last report card. [SAMPLE]',
    },
    { q: 'What if my child misses the exam date?', a: 'Not yet written. [CONFIRM]' },
    { q: 'Are siblings discounted?', a: 'Yes, 10% off tuition from the second child. See Fees & Payment. [SAMPLE]' },
  ],
  /** Highlighted panel in the Admissions mega-menu. */
  megaFeature: {
    eyebrow: 'Entrance exam',
    heading: `${entranceExamDate} [SAMPLE]`,
    text: 'Held on campus. Forms close 6 March. [SAMPLE]',
  },
} as const;
