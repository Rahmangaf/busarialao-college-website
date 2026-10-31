// Source: content/07-homepage-and-shared-copy.md (Navigation) and the Home Minimal design.
// Sub-pages from the nav (Leadership, Scholarships, Entrance exam, Eligibility) are sections
// on their parent pages, so they link to anchors.
import { admissions } from './admissions';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  /** Matches the `section` prop on BaseLayout, used to mark the current page. */
  key: string;
  label: string;
  href: string;
  children?: NavLink[];
}

export const mainNav: NavGroup[] = [
  {
    key: 'about',
    label: 'About',
    href: '/about/',
    children: [
      { label: 'Our story', href: '/about/#story' },
      { label: 'Vision and values', href: '/about/#vision' },
      { label: "Principal's welcome", href: '/about/#welcome' },
      { label: 'Leadership', href: '/about/#leadership' },
    ],
  },
  {
    key: 'academics',
    label: 'Academics',
    href: '/academics/',
    children: [
      { label: 'Curriculum', href: '/academics/#curriculum' },
      { label: 'Laboratories', href: '/academics/#laboratories' },
      { label: 'Science fair and competitions', href: '/academics/#competitions' },
      { label: 'Vocational training', href: '/academics/#vocational' },
      { label: 'Results', href: '/results/' },
    ],
  },
  {
    key: 'admissions',
    label: 'Admissions',
    href: '/admissions/',
    children: [
      { label: 'How to apply', href: '/admissions/#how-to-apply' },
      { label: 'Eligibility and documents', href: '/admissions/#eligibility' },
      { label: 'Entrance exam', href: '/admissions/#entrance-exam' },
      { label: 'Fees and payment', href: '/fees/' },
      { label: 'Scholarships', href: '/admissions/#scholarships' },
      { label: 'FAQ', href: '/admissions/#faq' },
    ],
  },
  {
    key: 'boarding',
    label: 'Boarding & Student Life',
    href: '/boarding/',
    children: [
      { label: 'Boarding', href: '/boarding/#boarding' },
      { label: 'Clubs', href: '/boarding/#clubs' },
      { label: 'Sports', href: '/boarding/#sports' },
      { label: 'Excursions', href: '/boarding/#excursions' },
    ],
  },
  {
    key: 'news',
    label: 'News & Calendar',
    href: '/news/',
    children: [
      { label: 'News', href: '/news/' },
      { label: 'Term dates', href: '/news/#term-dates' },
    ],
  },
  { key: 'contact', label: 'Contact', href: '/contact/' },
];

export interface MegaLink extends NavLink {
  hint: string;
}

/** Admissions mega-menu, from the design. Three columns plus a highlighted panel. */
export const admissionsMega = {
  columns: [
    {
      title: 'Apply',
      links: [
        { label: 'How to apply', hint: 'Seven steps from form to resumption', href: '/admissions/#how-to-apply' },
        { label: 'Entrance exam', hint: 'Subjects, date and sample papers', href: '/admissions/#entrance-exam' },
        { label: 'Eligibility & documents', hint: 'What to bring', href: '/admissions/#eligibility' },
      ],
    },
    {
      title: 'Costs',
      links: [
        { label: 'Fees & payment', hint: 'Per term, day and boarding', href: '/fees/' },
        { label: 'Scholarships', hint: 'Four full awards each year [DRAFT]', href: '/admissions/#scholarships' },
        { label: 'Pay fees online', hint: 'Official account only', href: '/fees/#pay' },
      ],
    },
    {
      title: 'Visit',
      links: [
        { label: 'Book a tour', hint: 'Mon–Fri, 9am–2pm [SAMPLE]', href: '/contact/?interest=tour' },
        { label: 'Admissions FAQ', hint: 'Mid-session entry, siblings', href: '/admissions/#faq' },
        { label: 'Applicant portal', hint: 'Track your application', href: '/portals/#applicant' },
      ],
    },
  ] as { title: string; links: MegaLink[] }[],
  feature: admissions.megaFeature,
};

/** Top bar, right-hand side. Phone numbers are [SAMPLE], so "Call" goes to the Contact page. */
export const utilityLinks: NavLink[] = [
  { label: 'Call', href: '/contact/#phone' },
  { label: 'WhatsApp', href: '' }, // filled from whatsappHref() in the component
  { label: 'Portals', href: '/portals/' },
  { label: 'Pay Fees', href: '/fees/#pay' },
];

/** Where the primary calls to action go. No application form exists yet (see /apply/). */
export const cta = {
  apply: '/admissions/#how-to-apply',
  tour: '/contact/?interest=tour',
  applyForm: '/apply/',
  results: '/results/',
};

export const footerLinks: NavLink[] = [
  { label: 'Admissions', href: '/admissions/' },
  { label: 'Fees & Payment', href: '/fees/' },
  { label: 'Results', href: '/results/' },
  { label: 'Term dates', href: '/news/#term-dates' },
];
