import { Activity } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import DriverSelect from '../../components/ui/DriverSelect';
import { fmtLap } from '../../utils/format';
import { PRESETS } from './channels';

export default function DriverPicker({ view, a, b, onChangeA, onChangeB }) {
  const dA = view.byNum[a];
  const dB = view.byNum[b];
  return (
    <Panel title="Seletor de pilotos · comparação lado a lado" icon={Activity}
      right={(
        <div className="row">
          {PRESETS.map(([x, y]) => (
            <span key={x + y}
              className={`chip btn mono ${dA.name_acronym === x && dB.name_acronym === y ? 'on' : ''}`}
              onClick={() => { onChangeA(view.acr[x]); onChangeB(view.acr[y]); }}>
              {x} vs {y}
            </span>
          ))}
        </div>
      )}>
      <div className="row" style={{ gap: 16 }}>
        <div className="row">
          <span className="dbar" style={{ background: `#${dA.team_colour}` }} />
          <DriverSelect value={a} onChange={onChangeA} drivers={view.drivers} />
          <span className="mono" style={{ color: '#39ff14' }}>{fmtLap(view.best[a].lap_duration)}</span>
        </div>
        <span className="mono" style={{ color: '#8a8fa3' }}>VS</span>
        <div className="row">
          <span className="dbar" style={{ background: `#${dB.team_colour}` }} />
          <DriverSelect value={b} onChange={onChangeB} drivers={view.drivers} />
          <span className="mono" style={{ color: '#39ff14' }}>{fmtLap(view.best[b].lap_duration)}</span>
        </div>
      </div>
      <div className="note" style={{ marginTop: 8 }}>
        Melhor volta limpa de cada piloto · A = linha contínua · B = linha tracejada.
      </div>
    </Panel>
  );
}
