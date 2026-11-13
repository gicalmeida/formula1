export const fmtLap = (s) => {
  if (s == null || Number.isNaN(s)) return '--:--.---';
  const m = Math.floor(s / 60);
  return `${m}:${(s - m * 60).toFixed(3).padStart(6, '0')}`;
};

export const compass = (deg) =>
  ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'][Math.round(deg / 45) % 8];
