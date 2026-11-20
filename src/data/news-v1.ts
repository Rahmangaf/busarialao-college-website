// Copy for /preview/news-v1/ lives in src/content-data/news-v1.json (edited in /admin).
// The news items are a collection: one JSON file per post in src/content-data/news-v1/, edited in /admin
// under "News posts (v1)". Add a file (or a post in the admin) and it appears on the page.
// {years}, {yearsInWords} come from the founding year; {examDate} from the existing admissions data.
import data from '../content-data/news-v1.json';
import { fill } from './admissions';
import { site } from './site';
import { fillSchool } from './school';

export interface NewsPost {
  title: string;
  label: string;
  category: string;
  order: number;
  photo: string;
  focus?: string;
  alt?: string;
  href?: string;
}

const files = import.meta.glob<NewsPost>('../content-data/news-v1/*.json', { eager: true, import: 'default' });

/** Posts in the order set by each post's "order" number (lowest first). */
export const newsPosts: NewsPost[] = Object.values(files).sort((a, b) => a.order - b.order);

export const newsV1 = fill(fillSchool(data));
export const newsWhatsappHref = site.footer.contact.whatsappHref;
export const newsVisit = {
  ...newsV1.visit,
  whatsapp: { label: newsV1.visit.whatsapp.label, href: newsWhatsappHref },
};

/** Filter chips appear only from this many posts. */
export const FILTER_MIN_POSTS = 6;
/** One full row of the desktop grid. Below this many posts the dashed "coming soon" card fills the gap. */
export const GRID_ROW = 4;
