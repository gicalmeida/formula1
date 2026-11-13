import { SESSION_KEY, TRACK_LEN } from '../config/constants';
import { clamp, mulberry } from '../utils/math';

// Perfil de velocidade ao longo da volta: [distância (m), km/h]
const KNOTS = [
  [0, 298], [450, 325], [720, 92], [850, 140], [1000, 118], [1150, 200], [1300, 215],
  [1600, 318], [1900, 325], [2150, 82], [2400, 150], [2600, 120], [2750, 160],
  [3000, 90], [3150, 130], [3350, 75], [3550, 180], [3750, 230], [3950, 130],
  [4150, 250], [4309, 298],
];

const profile = (d) => {
  for (let i = 0; i < KNOTS.length - 1; i++) {
    const [d0, v0] = KNOTS[i];
    const [d1, v1] = KNOTS[i + 1];
    if (d <= d1) {
      const t = clamp((d - d0) / (d1 - d0), 0, 1);
      return v0 + (v1 - v0) * ((1 - Math.cos(Math.PI * t)) / 2);
    }
  }
  return KNOTS[KNOTS.length - 1][1];
};

// Gera registros no formato do endpoint /car_data da OpenF1
export function genTelemetry(n, rating) {
  const r = mulberry(7000 + n);
  const skill = clamp(1 - rating * 1.6, -1, 1);
  const N = 240;
  const step = TRACK_LEN / (N - 1);
  const shift = skill * 14;
  const sp = Array.from(
    { length: N },
    (_, i) => profile(i * step + shift) * (1 + skill * 0.0035) + (r() - 0.5) * 1.2,
  );

  let thr = [];
  let brk = [];
  for (let i = 0; i < N; i++) {
    const slope = (sp[Math.min(i + 1, N - 1)] - sp[Math.max(i - 1, 0)]) / (2 * step);
    let b = 0;
    let t;
    if (slope < -0.1) b = clamp(-slope * 320 - 8, 0, 100) * (0.92 + r() * 0.12);
    if (b > 0) t = 0;
    else if (slope > 0.04) t = 100;
    else if (slope > -0.05) t = sp[i] > 250 ? 100 : 48 + r() * 6;
    else t = 0;
    thr.push(t);
    brk.push(clamp(b, 0, 100));
  }
  const smooth = (a) => a.map((v, i) => (a[Math.max(0, i - 1)] + v + a[Math.min(N - 1, i + 1)]) / 3);
  thr = smooth(thr);
  brk = smooth(brk);

  const t0 = Date.UTC(2025, 10, 9, 18, 30, 0);
  return sp.map((speed, i) => {
    const d = i * step;
    const gear = clamp(1 + Math.floor(speed / 37), 1, 8);
    const drsZone = (d >= 1500 && d <= 2050) || (d >= 120 && d <= 700);
    return {
      session_key: SESSION_KEY,
      driver_number: n,
      date: new Date(t0 + i * 290).toISOString(),
      distance: d, // campo extra do mock
      speed: Math.round(speed),
      rpm: Math.round(7000 + ((speed % 37) / 37) * 5000),
      n_gear: gear,
      throttle: Math.round(thr[i]),
      brake: Math.round(brk[i]),
      drs: drsZone && thr[i] >= 95 && brk[i] < 2 ? 12 : 0,
    };
  });
}
