import { useState, useMemo } from 'react';
import SimulatorControls from './SimulatorControls';
import PitWindowCards from './PitWindowCards';
import MarginChart from './MarginChart';
import SafetyCarMatrix from './SafetyCarMatrix';
import { buildCurves, BUFFER, DEFAULT_PARAMS } from './simulate';
import { clamp } from '../../utils/math';

export default function TabStrategy({ view }) {
  const [chase, setChase] = useState(view.acr.NOR);
  const [lead, setLead] = useState(view.acr.PIA);
  const [S, setS] = useState(DEFAULT_PARAMS);
  const set = (k) => (v) => setS((s) => ({ ...s, [k]: v }));

  const curves = useMemo(() => buildCurves(S), [S]);
  const under = curves.find((r) => r.under >= BUFFER);
  const over = curves.find((r) => r.over >= BUFFER);
  const bestMargin = Math.max(...curves.map((r) => r.under));
  const adv = Math.abs(S.newDelta) + S.deg * S.age;
  const payback = S.pitLoss / adv;

  // Puxa a idade real do pneu do perseguidor na volta escolhida
  const syncAge = () => {
    const l = view.lapsBy[chase].find((x) => x.lap_number === S.lap);
    if (l) set('age')(clamp(l.tyre_age, 0, 40));
  };

  return (
    <div className="view">
      <div className="grid g-main">
        <SimulatorControls view={view} chase={chase} lead={lead} onChase={setChase} onLead={setLead}
          S={S} set={set} onSyncAge={syncAge} />
        <div className="grid" style={{ alignContent: 'start' }}>
          <PitWindowCards chaseName={view.byNum[chase].name_acronym} leadName={view.byNum[lead].name_acronym}
            S={S} under={under} over={over} bestMargin={bestMargin} payback={payback} adv={adv} />
        </div>
      </div>
      <div className="spacer" />
      <div className="grid g-2">
        <MarginChart curves={curves} under={under} />
        <SafetyCarMatrix pitLoss={S.pitLoss} />
      </div>
    </div>
  );
}
