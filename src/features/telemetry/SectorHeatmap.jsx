import { ChevronRight, Timer } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import { clamp } from '../../utils/math';
import { SECTOR_NAMES } from './channels';

export default function SectorHeatmap({ view, a, b }) {
  const dA = view.byNum[a];
  const dB = view.byNum[b];

  const secs = [1, 2, 3].map((s, i) => {
    const ta = view.best[a][`duration_sector_${s}`];
    const tb = view.best[b][`duration_sector_${s}`];
    return { id: `S${s}`, ta, tb, delta: ta - tb, best: view.bestSectors[i] };
  });

  return (
    <Panel title="Heatmap de setores" icon={Timer}
      right={(
        <span className="chip mono">
          <i className="dot" style={{ background: '#a855f7' }} />melhor do grid
        </span>
      )}>
      <div className="grid" style={{ gap: 10 }}>
        {secs.map((s, i) => {
          const aWins = s.delta < 0;
          const gap = Math.abs(s.delta);
          const heat = clamp(gap / 0.35, 0.1, 1);
          const pA = Math.abs(s.ta - s.best) < 0.0005;
          const pB = Math.abs(s.tb - s.best) < 0.0005;
          const winC = aWins ? 'rgba(57,255,20,' : 'rgba(255,45,70,';
          const loseC = aWins ? 'rgba(255,45,70,' : 'rgba(57,255,20,';
          return (
            <div key={s.id} className="sector" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="glow" style={{
                background: `linear-gradient(90deg, ${winC}${0.18 * heat}), transparent 55%), linear-gradient(270deg, ${loseC}${0.18 * heat}), transparent 55%)`,
              }} />
              <div className="nm mono">{s.id} · {SECTOR_NAMES[i]}</div>
              <div className="cmp mono" style={{ position: 'relative' }}>
                <span className={pA ? 'purple' : aWins ? 'win' : 'lose'}>{dA.name_acronym} {s.ta.toFixed(3)}</span>
                <span className={pB ? 'purple' : !aWins ? 'win' : 'lose'}>{s.tb.toFixed(3)} {dB.name_acronym}</span>
              </div>
              <div className="delta mono" style={{ position: 'relative' }}>
                <ChevronRight size={11} style={{ verticalAlign: -1 }} />{' '}
                {aWins ? dA.name_acronym : dB.name_acronym} mais rápido por {gap.toFixed(3)}s
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
