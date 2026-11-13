import { Timer } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import { BUFFER } from './simulate';

export default function PitWindowCards({ chaseName, leadName, S, under, over, bestMargin, payback, adv }) {
  return (
    <Panel title="Janela de pit" icon={Timer}>
      <div className="grid" style={{ gap: 10 }}>
        <div className="kpi">
          <div className="k">Undercut ({chaseName} → {leadName})</div>
          <div className="v mono" style={{ color: under ? '#39ff14' : '#ff7183' }}>
            {under ? `VOLTA ${under.lap}` : 'SEM JANELA'}
          </div>
          <div className="n mono">
            {under
              ? `+${under.p} voltas a partir de V${S.lap} · margem ${under.under.toFixed(2)}s (mín. ${BUFFER}s)`
              : `Melhor margem em 18 voltas: ${bestMargin.toFixed(2)}s`}
          </div>
        </div>
        <div className="kpi">
          <div className="k">Overcut</div>
          <div className="v mono" style={{ color: over ? '#ff8a1f' : '#8a8fa3' }}>
            {over ? `VOLTA ${over.lap}` : 'INVIÁVEL'}
          </div>
          <div className="n">
            {over
              ? `Margem ${over.over.toFixed(2)}s. Degradação baixa favorece ficar na pista.`
              : 'Degradação alta e tráfego baixo punem quem fica na pista de pneus velhos.'}
          </div>
        </div>
        <div className="kpi">
          <div className="k">Payback do pit stop</div>
          <div className="v mono">
            {payback.toFixed(1)} <span style={{ fontSize: 13, color: '#8a8fa3' }}>voltas</span>
          </div>
          <div className="n mono">
            Ganho médio de {adv.toFixed(2)} s/v com pneu novo vs. {S.age}v de uso.
          </div>
        </div>
      </div>
    </Panel>
  );
}
