import { BASE_LAP, PIT_LOSS } from '../../config/constants';

export const BUFFER = 0.3; // margem mínima (s) para considerar a janela viável

export const DEFAULT_PARAMS = {
  lap: 22, age: 12, ageDiff: 0, gap: 1.8, newDelta: -1.2, deg: 0.08,
  pitLoss: PIT_LOSS, react: 1, traffic: 0.8,
};

/**
 * Tempo acumulado de dois carros (C = perseguidor, R = rival) a partir da volta atual.
 * Pneu velho: base + deg * idade. Pneu novo: base + newDelta + deg * voltas de uso.
 * `mover` é quem para primeiro e sofre a penalidade de tráfego na saída.
 */
export function simulate(P, pitC, pitR, mover) {
  const H = Math.max(pitC, pitR) + 4;
  const car = (pit, penalty, a0) => {
    let t = 0;
    for (let i = 0; i < H; i++) {
      if (i < pit) t += P.base + P.deg * (a0 + i);
      else if (i === pit) t += P.base + P.deg * (a0 + i) + P.pitLoss + penalty;
      else t += P.base + P.newDelta + P.deg * (i - pit - 1);
    }
    return t;
  };
  return [
    car(pitC, mover === 'C' ? P.traffic : 0, P.age),
    car(pitR, mover === 'R' ? P.traffic : 0, P.age + P.ageDiff),
  ];
}

/** Margem de posição (s) para cada volta candidata de pit; > 0 significa que passa o rival. */
export function buildCurves(S) {
  const P = { base: BASE_LAP, ...S };
  const rows = [];
  for (let p = 0; p <= 18; p++) {
    const [tc, tr] = simulate(P, p, p + S.react, 'C'); // undercut
    const [tc2, tr2] = simulate(P, p + S.react, p, 'R'); // overcut
    rows.push({
      p,
      lap: S.lap + p,
      under: -(S.gap + (tc - tr)),
      over: -(S.gap + (tc2 - tr2)),
    });
  }
  return rows;
}
