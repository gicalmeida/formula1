import { ShieldAlert } from 'lucide-react';
import Panel from '../../components/ui/Panel';

const ROWS = [
  { k: 'new', label: 'Pneu novo (≤ 8v)' },
  { k: 'mid', label: 'Pneu médio (9–20v)' },
  { k: 'old', label: 'Pneu gasto (> 20v)' },
];
const COLS = [
  { k: 'sc', label: 'Safety Car' },
  { k: 'vsc', label: 'VSC' },
  { k: 'rain', label: 'SC + chuva' },
];

// Decisão rápida por idade de pneu x cenário; usa o pit loss atual do simulador
function decide(row, col, pitLoss) {
  const plSC = pitLoss * 0.45;
  const plVSC = pitLoss * 0.65;
  if (col === 'sc') {
    if (row === 'new') return { t: 'stay', a: 'STAY OUT', n: `Box custa ${plSC.toFixed(1)}s e joga fora pneu com vida útil.` };
    if (row === 'mid') return { t: 'go', a: 'BOX', n: `Economiza ${(pitLoss - plSC).toFixed(1)}s vs. pit em bandeira verde.` };
    return { t: 'go', a: 'BOX! (double stack se 2 carros)', n: `Pit por ${plSC.toFixed(1)}s. Pneu gasto, prioridade total.` };
  }
  if (col === 'vsc') {
    if (row === 'new') return { t: 'stay', a: 'STAY OUT', n: `Ganho de só ${(pitLoss - plVSC).toFixed(1)}s não compensa.` };
    if (row === 'mid') return { t: 'warn', a: 'BOX SE GAP OK', n: `Só se o gap p/ o carro de trás > ${(plVSC + 2).toFixed(1)}s.` };
    return { t: 'go', a: 'BOX', n: `Pit por ${plVSC.toFixed(1)}s com pneu no limite.` };
  }
  if (row === 'new') return { t: 'warn', a: 'AVALIAR INTER', n: 'Ver radar. Se a água ficar na Junção, trocar sem hesitar.' };
  return { t: 'go', a: 'BOX → INTER', n: `Pit sob SC por ${plSC.toFixed(1)}s e troca para pista molhada.` };
}

export default function SafetyCarMatrix({ pitLoss }) {
  return (
    <Panel title="Matriz de decisão · SC / VSC" icon={ShieldAlert}
      right={(
        <span className="chip mono">
          SC ≈ {(pitLoss * 0.45).toFixed(1)}s · VSC ≈ {(pitLoss * 0.65).toFixed(1)}s
        </span>
      )}>
      <table className="mx">
        <thead>
          <tr><th />{COLS.map((c) => <th key={c.k}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.k}>
              <td className="rowh">{r.label}</td>
              {COLS.map((c) => {
                const x = decide(r.k, c.k, pitLoss);
                return (
                  <td key={c.k} className={x.t}>
                    <b className="mono">{x.a}</b>
                    {x.n}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note" style={{ marginTop: 6 }}>
        Pit sob SC/VSC calculado como fração do pit loss atual: reage ao slider.
      </div>
    </Panel>
  );
}
