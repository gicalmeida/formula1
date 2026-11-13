import {
  ResponsiveContainer, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from 'recharts';
import { Gauge } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import { TIP, AX } from '../../components/charts/chartTheme';
import { TRACK_LEN } from '../../config/constants';

export default function SpeedDeltaChart({ data, nameA, nameB }) {
  return (
    <Panel title="Delta de velocidade" icon={Gauge}
      right={<span className="chip mono">{nameA} − {nameB} (km/h)</span>}>
      <div style={{ height: 200 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ left: -6, right: 4 }}>
            <defs>
              <linearGradient id="gd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#39ff14" stopOpacity=".5" />
                <stop offset="100%" stopColor="#39ff14" stopOpacity=".05" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1f212b" strokeDasharray="3 3" />
            <XAxis dataKey="dist" type="number" domain={[0, TRACK_LEN]} tickCount={9} {...AX} />
            <YAxis {...AX} />
            <Tooltip {...TIP} labelFormatter={(v) => `${v} m`} />
            <ReferenceLine y={0} stroke="#5d6174" />
            <Area type="monotone" dataKey="delta" name="Δ km/h" stroke="#39ff14" fill="url(#gd)" animationDuration={900} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
