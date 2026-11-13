// Geometria vetorial (aproximada) do circuito de Interlagos, sentido anti-horário
export const TP = [
  [520, 300], [430, 310], [350, 318], [310, 330], [280, 318], [290, 292], [330, 270], [360, 235], [330, 205],
  [270, 185], [200, 170], [130, 160], [85, 150], [60, 175], [85, 200], [130, 215], [170, 240], [150, 265],
  [190, 290], [240, 300], [250, 330], [290, 355], [380, 360], [450, 345], [500, 330],
];

const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

const closedPath = (p) => {
  const n = p.length;
  let d = `M ${mid(p[n - 1], p[0]).join(' ')}`;
  for (let i = 0; i < n; i++) d += ` Q ${p[i].join(' ')} ${mid(p[i], p[(i + 1) % n]).join(' ')}`;
  return `${d} Z`;
};

const openPath = (p) => {
  let d = `M ${mid(p[0], p[1]).join(' ')}`;
  for (let i = 1; i < p.length - 1; i++) d += ` Q ${p[i].join(' ')} ${mid(p[i], p[i + 1]).join(' ')}`;
  return d;
};

export const TRACK_D = closedPath(TP);

export const SECTORS = [
  { id: 'S1', color: '#ff2d46', d: openPath(TP.slice(0, 10)) },
  { id: 'S2', color: '#38bdf8', d: openPath(TP.slice(9, 19)) },
  { id: 'S3', color: '#ffd21f', d: openPath([...TP.slice(18), TP[0], TP[1]]) },
];

export const DRS_ZONES = [
  { id: 'DRS 1', d: openPath(TP.slice(8, 14)), lx: 205, ly: 140 },
  { id: 'DRS 2', d: openPath([TP[23], TP[24], TP[0], TP[1], TP[2], TP[3]]), lx: 440, ly: 292 },
];

// Zonas com risco de chuva: Reta Oposta e Junção
export const RAIN_ZONES = [TP[10], TP[23]];

export const LABELS = [
  ['Senna S', 322, 312, 'start'], ['Curva do Sol', 372, 226, 'start'], ['Reta Oposta', 205, 158, 'middle'],
  ['Descida do Lago', 28, 138, 'start'], ['Ferradura', 22, 214, 'start'], ['Pinheirinho', 92, 286, 'start'],
  ['Bico de Pato', 172, 334, 'start'], ['Mergulho', 330, 384, 'start'], ['Junção', 452, 370, 'start'],
];

export const SECTOR_LABELS = [
  ['S1', 345, 196, '#ff2d46'],
  ['S2', 104, 190, '#38bdf8'],
  ['S3', 398, 346, '#ffd21f'],
];
