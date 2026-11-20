// The editable text for the v1 site shell (header, mobile menu, footer) lives in
// src/content-data/site.json (edited through /admin or by hand).
// {foundedYear} is filled from the stored founding year, {year} from the build date.
import data from '../content-data/site.json';
import { fillSchool } from './school';

const year = String(new Date().getFullYear());
const filled = fillSchool(data);

export const site = {
  ...filled,
  footer: {
    ...filled.footer,
    legal: { ...filled.footer.legal, copyright: filled.footer.legal.copyright.replaceAll('{year}', year) },
  },
};

export type SiteLink = { label: string; href: string };
