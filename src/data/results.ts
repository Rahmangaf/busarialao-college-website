// The editable figures live in src/content-data/results.json (edited through /admin or by hand).
// All figures are [DRAFT]. An empty value means the magazine gives no figure. Never fill these in.
// The magazine does not define "general percentage passed" for WASSCE and NECO [CONFIRM].
import data from '../content-data/results.json';

export interface YearResult {
  year: number;
  wassce: number | null;
  neco: number | null;
  /** Names are published only with consent [CONFIRM]. */
  bestStudent: string | null;
  universityAdmission: number | null;
}

type RawResult = {
  year: number;
  wassce?: number | null;
  neco?: number | null;
  bestStudent?: string | null;
  universityAdmission?: number | null;
};

export const results: YearResult[] = (data.items as RawResult[]).map((r) => ({
  year: r.year,
  wassce: r.wassce ?? null,
  neco: r.neco ?? null,
  bestStudent: r.bestStudent || null,
  universityAdmission: r.universityAdmission ?? null,
}));

/** The most recent year that has a WASSCE figure. Year selector default and the Home numbers band. */
export function latestResult(): YearResult {
  const withData = results.filter((r) => r.wassce !== null);
  return withData[withData.length - 1];
}

/** 95.48 -> "95.5%" (one decimal, trailing ".0" dropped). */
export function formatPercent(value: number, decimals = 1): string {
  return `${Number(value.toFixed(decimals))}%`;
}
