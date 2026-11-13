import { Wrench } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import { COMPOUNDS } from '../../config/compounds';

export default function StintSummary({ stats }) {
  return (
    <Panel title="Resumo de stints" icon={Wrench}>
      <div className="grid" style={{ gap: 8 }}>
        {stats.map((s) => {
          const c = COMPOUNDS[s.compound];
          return (
            <div key={s.stint_number} className="kpi" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="mono" style={{
                width: 30, height: 30, borderRadius: '50%', background: c.color, color: c.text,
                display: 'grid', placeItems: 'center', fontWeight: 700, flex: 'none',
              }}>{c.letter}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>Stint {s.stint_number} · {c.label} · {s.n} voltas</div>
                <div className="note mono">
                  V{s.lap_start}–V{s.lap_end} · deg {s.deg >= 0 ? '+' : ''}{s.deg.toFixed(3)} s/v · grip final {s.gripEnd}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="note" style={{ marginTop: 8 }}>
        Deg corrigida pelo ganho de combustível (≈0,032 s/volta). Clique em outro piloto na tabela.
      </div>
    </Panel>
  );
}
