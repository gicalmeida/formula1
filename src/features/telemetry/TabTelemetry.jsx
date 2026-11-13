import { useState, useMemo } from 'react';
import DriverPicker from './DriverPicker';
import TelemetryChart from './TelemetryChart';
import SpeedDeltaChart from './SpeedDeltaChart';
import SectorHeatmap from './SectorHeatmap';

export default function TabTelemetry({ view }) {
  const [a, setA] = useState(view.acr.VER);
  const [b, setB] = useState(view.acr.NOR);
  const [on, setOn] = useState({ speed: true, throttle: true, brake: true, gear: false, drs: true });
  const dA = view.byNum[a];
  const dB = view.byNum[b];

  // Junta os dois pilotos pelo índice (mesma grade de distância)
  const data = useMemo(() => {
    const A = view.carBy[a];
    const B = view.carBy[b];
    return A.map((p, i) => {
      const q = B[i];
      return {
        dist: Math.round(p.distance),
        A_speed: p.speed, B_speed: q.speed,
        A_throttle: p.throttle, B_throttle: q.throttle,
        A_brake: p.brake, B_brake: q.brake,
        A_gear: p.n_gear, B_gear: q.n_gear,
        A_drs: p.drs >= 10 ? 100 : 0, B_drs: q.drs >= 10 ? 100 : 0,
        delta: p.speed - q.speed,
      };
    });
  }, [view, a, b]);

  const toggle = (key) => setOn((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="view">
      <DriverPicker view={view} a={a} b={b} onChangeA={setA} onChangeB={setB} />
      <div className="spacer" />
      <TelemetryChart data={data} on={on} onToggle={toggle} nameA={dA.name_acronym} nameB={dB.name_acronym} />
      <div className="spacer" />
      <div className="grid g-main">
        <SpeedDeltaChart data={data} nameA={dA.name_acronym} nameB={dB.name_acronym} />
        <SectorHeatmap view={view} a={a} b={b} />
      </div>
    </div>
  );
}
