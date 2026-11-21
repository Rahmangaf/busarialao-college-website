// Copy for /preview/about-v1/ lives in src/content-data/about-v1.json (edited in /admin).
// {foundedYear}, {years} and {yearsInWords} are filled from the stored founding year, never typed.
import data from '../content-data/about-v1.json';
import { fillSchool } from './school';

export const aboutV1 = fillSchool(data);
