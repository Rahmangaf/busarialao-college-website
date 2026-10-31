// Source: content/03-results.md (magazine section 2.4). All figures are [DRAFT].
// null = the magazine gives no figure. Never fill these in.
// The magazine does not define "general percentage passed" for WASSCE and NECO [CONFIRM].

export interface YearResult {
  year: number;
  wassce: number | null;
  neco: number | null;
  /** Names are published only with consent [CONFIRM]. */
  bestStudent: string | null;
  universityAdmission: number | null;
}

export const results: YearResult[] = [
  { year: 2009, wassce: null, neco: null, bestStudent: null, universityAdmission: 95 },
  { year: 2010, wassce: 91.81, neco: 54.75, bestStudent: 'Adua Kauthar Adenike', universityAdmission: 100 },
  { year: 2011, wassce: 76.89, neco: null, bestStudent: 'Abdulgafar Abdulbasit Tobi', universityAdmission: 100 },
  { year: 2012, wassce: 82.84, neco: 71.36, bestStudent: 'Abdulrasheed Sodiq A.', universityAdmission: 98 },
  { year: 2013, wassce: 80.09, neco: 86.1, bestStudent: 'Jimoh Abdulgafar Tobi', universityAdmission: 100 },
  { year: 2014, wassce: null, neco: null, bestStudent: 'Alli Hannat', universityAdmission: 100 },
  { year: 2015, wassce: null, neco: null, bestStudent: 'Salah M. Mardhyah', universityAdmission: 95 },
  { year: 2016, wassce: null, neco: null, bestStudent: 'Abiodun O. Promise', universityAdmission: 100 },
  { year: 2017, wassce: 85.5, neco: 90.35, bestStudent: 'Abdulwahab Faridah O.', universityAdmission: 95 },
  { year: 2018, wassce: 78.44, neco: 93.37, bestStudent: 'Busari Habeebat', universityAdmission: 100 },
  { year: 2019, wassce: 67.39, neco: 93.7, bestStudent: 'Muhammed Musa Ndako', universityAdmission: 96 },
  { year: 2020, wassce: 73.71, neco: 94.93, bestStudent: 'Olufadi Ammar', universityAdmission: 100 },
  { year: 2021, wassce: 74.73, neco: 92.26, bestStudent: 'Giwa Ameerah Temitope', universityAdmission: 100 },
  { year: 2022, wassce: 98.95, neco: 83.94, bestStudent: 'Yusuf Amidah', universityAdmission: 98 },
  { year: 2023, wassce: 83.64, neco: 94.79, bestStudent: 'Umar Zakari Aisha', universityAdmission: 100 },
  { year: 2024, wassce: 95.55, neco: 88.78, bestStudent: 'Olaoye Sultan', universityAdmission: 100 },
  { year: 2025, wassce: 95.48, neco: 74.29, bestStudent: 'Mustapha Amina', universityAdmission: 90 },
];

/** The most recent year that has a WASSCE figure. Year selector default and the Home numbers band. */
export function latestResult(): YearResult {
  const withData = results.filter((r) => r.wassce !== null);
  return withData[withData.length - 1];
}

/** 95.48 -> "95.5%" (one decimal, trailing ".0" dropped). */
export function formatPercent(value: number, decimals = 1): string {
  return `${Number(value.toFixed(decimals))}%`;
}
