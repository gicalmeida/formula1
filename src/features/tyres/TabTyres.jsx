import { useState, useMemo } from 'react';
import StintTable from './StintTable';
import DegradationChart from './DegradationChart';
import StintSummary from './StintSummary';
import { slopeOf } from '../../utils/math';

export default function TabTyres({ view }) {
  const [sel, setSel] = useState(4);
  const driver = view.byNum[sel];
  const stints = view.stintsBy[sel];
  const laps = view.lapsBy[sel];
  const pits = view.pitsBy[sel];

  // Uma série de tempo por stint (cor do composto) + aderência por volta
  const data = useMemo(
    () => laps.map((l) => {
      const row = { lap: l.lap_number, grip: l.grip };
      row[`t${l.stint_number - 1}`] = l.clean ? l.lap_duration : null;
      return row;
    }),
    [laps],
  );

  const stats = useMemo(
    () => stints.map((s) => {
      const pts = laps
        .filter((l) => l.stint_number === s.stint_number && l.clean)
        .map((l) => [l.tyre_age, l.lap_duration + 0.032 * (l.lap_number - 1)]);
      const g = laps.filter((l) => l.stint_number === s.stint_number);
      return { ...s, n: s.lap_end - s.lap_start + 1, deg: slopeOf(pts), gripEnd: g[g.length - 1].grip };
    }),
    [stints, laps],
  );

  const times = laps.filter((l) => l.clean).map((l) => l.lap_duration);
  const yMin = Math.floor(Math.min(...times) - 0.3);
  const yMax = Math.ceil(Math.max(...times) + 0.3);

  return (
    <div className="view">
      <div className="grid g-main">
        <StintTable view={view} selected={sel} onSelect={setSel} />
        <div className="grid" style={{ alignContent: 'start' }}>
          <DegradationChart driver={driver} stints={stints} pits={pits} data={data} yMin={yMin} yMax={yMax} />
          <StintSummary stats={stats} />
        </div>
      </div>
    </div>
  );
}
