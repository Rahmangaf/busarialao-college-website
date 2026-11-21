// Copy for /preview/admissions-v1/ lives in src/content-data/admissions-v1.json (edited in /admin).
// {examDate} and {applicationFee} are filled from the existing admissions data, so the exam date and
// the form fee are still stored once.
import data from '../content-data/admissions-v1.json';
import { fill } from './admissions';

export const admissionsV1 = fill(data);
