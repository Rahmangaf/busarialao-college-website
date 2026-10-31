// Source: content/06-news-calendar-contact.md. All news is [SAMPLE]; do not publish invented news as real.
import type { PhotoId } from './sample-content-register';

export const newsCategories = ['Events', 'Academics', 'Admissions'] as const;
export type NewsCategory = (typeof newsCategories)[number];

export interface NewsItem {
  slug: string;
  /** ISO date. */
  date: string;
  category: NewsCategory;
  title: string;
  summary: string;
  /** Only items with a registered sample photo show one. No flat placeholder boxes. */
  photo?: PhotoId;
  focus?: string;
  /** Show as the large featured story. */
  featured?: boolean;
  body: string[];
  /** Section heading inside the article body (design: "What students built"). */
  bodyHeading?: { before: number; text: string };
}

export const news: NewsItem[] = [
  {
    slug: 'science-fair-2026',
    date: '2026-09-28',
    category: 'Academics',
    title: 'Science Fair 2026 [SAMPLE]',
    summary:
      'SS2 students presented water-purification and solar-drying projects to parents and visiting judges. [SAMPLE]',
    photo: 'biology-lab',
    focus: '50% 30%',
    featured: true,
    body: [
      "[SAMPLE article text] This year's science fair filled the school hall with projects built across the term in our Physics, Chemistry and Biology laboratories.",
      'Teams worked in groups of four, each guided by a science teacher, and presented their findings to parents, fellow students and a panel of judges.',
      'Projects ranged from simple water filters made from local materials to a solar dryer for preserving farm produce. Each team explained its method, results and what it would change next time.',
      'Winning teams will represent the school at the next state science competition. [SAMPLE]',
    ],
    bodyHeading: { before: 2, text: 'What students built' },
  },
  {
    slug: 'anniversary-celebration',
    date: '2026-10-12',
    category: 'Events',
    title: '20th Anniversary Celebration [SAMPLE]',
    summary: 'Alumni, parents and staff marked twenty years. [SAMPLE]',
    body: ['[SAMPLE article text] Alumni, parents and staff marked twenty years. The full story will be supplied by the school.'],
  },
  {
    slug: 'scholarship-entrance-exam',
    date: '2026-09-15',
    category: 'Admissions',
    title: 'Scholarship Entrance Exam Open [SAMPLE]',
    summary: 'Registration is open for partner public schools. [DRAFT]',
    photo: 'exam-session',
    focus: '55% 40%',
    body: [
      '[SAMPLE article text] Registration is open for partner public schools. Eligibility details and how to apply have not been supplied. [CONFIRM]',
    ],
  },
  {
    slug: 'new-session-begins',
    date: '2026-09-02',
    category: 'Events',
    title: 'New session begins [SAMPLE]',
    summary: 'Welcome to our new JSS1 students. [SAMPLE]',
    body: ['[SAMPLE article text] Welcome to our new JSS1 students. The full story will be supplied by the school.'],
  },
];

export function formatNewsDate(iso: string, style: 'short' | 'long' = 'short'): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Featured story first, then the rest newest first. */
export function sortedNews(): NewsItem[] {
  const rest = news.filter((n) => !n.featured).sort((a, b) => b.date.localeCompare(a.date));
  return [...news.filter((n) => n.featured), ...rest];
}
