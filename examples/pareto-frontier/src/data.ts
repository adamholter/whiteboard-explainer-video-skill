export type Datum = {
  id: string;
  label: string;
  intelligence: number;
  coding: number;
  agentic: number;
  tokensK: number;
  timeMinutes: number;
  cost: number;
};

// Public benchmark snapshot used for the original explainer. Replace this
// fixture with current, cited data before making new factual claims.
export const DATA: Datum[] = [
  {id: 'fable', label: 'Fable 5', intelligence: 60, coding: 76.5, agentic: 52.8, tokensK: 33, timeMinutes: 5.3, cost: 2.75},
  {id: 'sol-max', label: 'Sol · max', intelligence: 59, coding: 77.4, agentic: 54, tokensK: 15, timeMinutes: 3.8, cost: 1.04},
  {id: 'sol-xhigh', label: 'Sol · xhigh', intelligence: 58, coding: 78.3, agentic: 51.8, tokensK: 10, timeMinutes: 2.5, cost: 0.68},
  {id: 'sol-high', label: 'Sol · high', intelligence: 56, coding: 77.2, agentic: 48.5, tokensK: 7, timeMinutes: 1.7, cost: 0.45},
  {id: 'grok', label: 'Grok 4.5', intelligence: 54, coding: 72.4, agentic: 45.7, tokensK: 14, timeMinutes: 2.1, cost: 0.31},
  {id: 'muse', label: 'Muse Spark', intelligence: 51, coding: 71.3, agentic: 37.5, tokensK: 22, timeMinutes: 3, cost: 0.26},
  {id: 'sol-low', label: 'Sol · low', intelligence: 49, coding: 69.7, agentic: 40, tokensK: 3, timeMinutes: 0.7, cost: 0.2},
  {id: 'terra', label: 'Terra', intelligence: 46, coding: 64.7, agentic: 37, tokensK: 4, timeMinutes: 0.6, cost: 0.13},
  {id: 'deepseek-pro', label: 'DeepSeek Pro', intelligence: 44, coding: 59.4, agentic: 36.4, tokensK: 37, timeMinutes: 9.2, cost: 0.04},
  {id: 'mimo', label: 'MiMo', intelligence: 42, coding: 60.2, agentic: 29.1, tokensK: 20, timeMinutes: 5.5, cost: 0.03},
  {id: 'deepseek-flash', label: 'DeepSeek Flash', intelligence: 40, coding: 56.2, agentic: 31.1, tokensK: 45, timeMinutes: 6.6, cost: 0.02},
];

type Metric = keyof Omit<Datum, 'id' | 'label'>;
export type Objectives = {maximize: Metric[]; minimize: Metric[]};

export const dominates = (a: Datum, b: Datum, objectives: Objectives) => {
  const noWorse = objectives.maximize.every((m) => a[m] >= b[m]) &&
    objectives.minimize.every((m) => a[m] <= b[m]);
  const strictlyBetter = objectives.maximize.some((m) => a[m] > b[m]) ||
    objectives.minimize.some((m) => a[m] < b[m]);
  return noWorse && strictlyBetter;
};

export const frontier = (objectives: Objectives) => new Set(
  DATA.filter((candidate) => !DATA.some((other) => other.id !== candidate.id && dominates(other, candidate, objectives)))
    .map((item) => item.id),
);

export const INTELLIGENCE_COST = frontier({maximize: ['intelligence'], minimize: ['cost']});
export const ALL_SIX = frontier({maximize: ['intelligence', 'coding', 'agentic'], minimize: ['tokensK', 'timeMinutes', 'cost']});
