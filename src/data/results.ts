// The editable figures live in src/content-data/results.json (edited through /admin or by hand).
// Source: the 20th anniversary brochure (content/03-results.md). The school chose "general percentage
// passed" as the headline measure for WASSCE and NECO; no credits definition is added.
// An empty value with a note (2026: NECO "Awaiting", admission "In view") is shown as that note.
// An empty value without a note means no figure exists. Never fill these in.
// Names of individual students are not published, so none are stored here.
import data from '../content-data/results.json';

export interface YearResult {
  year: number;
  candidates: number | null;
  wassce: number | null;
  neco: number | null;
  necoNote: string | null;
  universityAdmission: number | null;
  universityAdmissionNote: string | null;
}

type RawResult = {
  year: number;
  candidates?: number | null;
  wassce?: number | null;
  neco?: number | null;
  necoNote?: string | null;
  universityAdmission?: number | null;
  universityAdmissionNote?: string | null;
};

export const results: YearResult[] = (data.items as RawResult[]).map((r) => ({
  year: r.year,
  candidates: r.candidates ?? null,
  wassce: r.wassce ?? null,
  neco: r.neco ?? null,
  necoNote: r.necoNote || null,
  universityAdmission: r.universityAdmission ?? null,
  universityAdmissionNote: r.universityAdmissionNote || null,
}));

/**
 * The most recent year with every figure: WASSCE, NECO and university admission. This is the year
 * the selector opens on and the Home numbers band features. A partial year (2026 today) is shown
 * with its notes, but never presented as the latest complete result.
 */
export function latestResult(): YearResult {
  const complete = results.filter((r) => r.wassce !== null && r.neco !== null && r.universityAdmission !== null);
  return complete[complete.length - 1];
}

/** 95.48 -> "95.5%" (one decimal, trailing ".0" dropped). */
export function formatPercent(value: number, decimals = 1): string {
  return `${Number(value.toFixed(decimals))}%`;
}
