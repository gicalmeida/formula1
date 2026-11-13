// Compostos Pirelli, cores oficiais e parâmetros do modelo de desgaste
export const COMPOUNDS = {
  SOFT: { label: 'Macio', color: '#ff3b3b', text: '#fff', letter: 'S' },
  MEDIUM: { label: 'Médio', color: '#ffd21f', text: '#111', letter: 'M' },
  HARD: { label: 'Duro', color: '#f2f2f2', text: '#111', letter: 'H' },
  INTERMEDIATE: { label: 'Intermediário', color: '#2ee66b', text: '#06210f', letter: 'I' },
  WET: { label: 'Chuva', color: '#2f8bff', text: '#fff', letter: 'W' },
};

export const DEG = { SOFT: 0.11, MEDIUM: 0.075, HARD: 0.05, INTERMEDIATE: 0.09, WET: 0.1 };
export const OFFS = { SOFT: -0.55, MEDIUM: 0, HARD: 0.45, INTERMEDIATE: 3.4, WET: 7 };
export const WEAR = { SOFT: 0.55, MEDIUM: 0.38, HARD: 0.27, INTERMEDIATE: 0.5, WET: 0.5 };

// Estratégias de stints: [composto, nº de voltas]
export const STRATS = {
  A: [['MEDIUM', 22], ['HARD', 49]],
  B: [['SOFT', 14], ['MEDIUM', 27], ['HARD', 30]],
  C: [['HARD', 28], ['MEDIUM', 43]],
  D: [['MEDIUM', 18], ['HARD', 26], ['MEDIUM', 27]],
  E: [['HARD', 28], ['MEDIUM', 21], ['INTERMEDIATE', 8], ['MEDIUM', 14]],
};
