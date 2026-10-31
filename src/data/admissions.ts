// The editable copy lives in src/content-data/admissions.json (edited through /admin or by hand).
// Everything here is [SAMPLE] unless marked. Tags stay in the text until the school confirms the item.
//
// The exam date and application fee are stored once, at the top of the JSON. Anywhere else the text
// uses {examDate}, {examDateShort} or {applicationFee}, and those are filled in here.
import data from '../content-data/admissions.json';

const examDate = data.entranceExamDate;
const examDateShort = examDate.replace('March', 'Mar');
const applicationFee = data.applicationFee;

function fill<T>(value: T): T {
  if (typeof value === 'string') {
    return value
      .replaceAll('{examDateShort}', examDateShort)
      .replaceAll('{examDate}', examDate)
      .replaceAll('{applicationFee}', applicationFee) as T;
  }
  if (Array.isArray(value)) return value.map(fill) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, fill(item)])) as T;
  }
  return value;
}

const filled = fill(data);

export const admissions = {
  ...filled,
  exam: {
    ...filled.exam,
    samplePapersUrl: (data.exam.samplePapersUrl || null) as string | null,
  },
};
