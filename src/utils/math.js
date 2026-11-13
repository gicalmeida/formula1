export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// PRNG determinístico (os dados mock são sempre os mesmos)
export const mulberry = (a) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Inclinação da regressão linear para pares [x, y]
export const slopeOf = (pts) => {
  const n = pts.length;
  if (n < 3) return 0;
  const mx = pts.reduce((a, p) => a + p[0], 0) / n;
  const my = pts.reduce((a, p) => a + p[1], 0) / n;
  let num = 0;
  let den = 0;
  pts.forEach(([x, y]) => {
    num += (x - mx) * (y - my);
    den += (x - mx) * (x - mx);
  });
  return den ? num / den : 0;
};
