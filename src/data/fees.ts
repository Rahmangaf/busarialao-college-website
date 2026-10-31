// The editable copy lives in src/content-data/fees.json (edited through /admin or by hand).
// The magazine has no fee details: everything is [SAMPLE] until the school confirms it.
import data from '../content-data/fees.json';

export const fees = {
  ...data,
  /** The fee schedule PDF does not exist yet. */
  pdfUrl: (data.pdfUrl || null) as string | null,
};
