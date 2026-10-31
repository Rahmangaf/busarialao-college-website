// The editable stories live in src/content-data/news.json (edited through /admin or by hand).
// All news is [SAMPLE]; do not publish invented news as real.
import data from '../content-data/news.json';
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

export const news = data.items as unknown as NewsItem[];

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
