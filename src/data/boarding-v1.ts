// Copy for /preview/boarding-v1/ lives in src/content-data/boarding-v1.json (edited in /admin).
// The gallery only shows when gallery.enabled is true; keep it false until real photos exist.
import data from '../content-data/boarding-v1.json';
import { fillSchool } from './school';

export const boardingV1 = fillSchool(data);
