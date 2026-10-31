// The editable copy lives in src/content-data/calendar.json (edited through /admin or by hand).
// All term dates are [SAMPLE] until the school confirms them.
import data from '../content-data/calendar.json';

export const calendar = {
  ...data,
  /** The calendar PDF does not exist yet. */
  pdfUrl: (data.pdfUrl || null) as string | null,
};
