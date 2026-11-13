import {
  ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ReferenceArea,
} from 'recharts';
import { Gauge } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import Led from '../../components/ui/Led';
import { TIP, AX } from '../../components/charts/chartTheme';
import { COMPOUNDS } from '../../config/compounds';
import { TOTAL_LAPS, SC_LAPS } from '../../config/constants';
import { fmtLap } from '../../utils/format';

export default function DegradationChart({ driver, stints, pits, data, yMin, yMax }) {
  return (
    <Panel title={`Degradação · ${driver.name_acronym}`} icon={Gauge}
      right={(
        <span className="chip mono" style={{ color: `#${driver.team_colour}` }}>
          <Led c="green" />{driver.full_name}
        </span>
      )}>
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ left: -6, right: 2, top: 8 }}>
            <defs>
              <linearGradient id="gg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#39ff14" stopOpacity=".28" />
                <stop offset="100%" stopColor="#39ff14" stopOpacity=".01" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1f212b" strokeDasharray="3 3" />
            <XAxis dataKey="lap" type="number" domain={[1, TOTAL_LAPS]} tickCount={8} {...AX} />
            <YAxis yAxisId="t" domain={[yMin, yMax]} {...AX} tickFormatter={(v) => v.toFixed(0)} />
            <YAxis yAxisId="g" orientation="right" domain={[45, 100]} unit="%" {...AX} />
            <Tooltip {...TIP}
              formatter={(v, n) => (n.includes('Aderência') ? [`${v}%`, n] : [v == null ? '-' : fmtLap(v), n])} />
            <ReferenceArea yAxisId="t" x1={SC_LAPS[0]} x2={SC_LAPS[2]} fill="#ffd21f" fillOpacity={0.1} />
            <Area yAxisId="g" type="monotone" dataKey="grip" name="Aderência (%)" stroke="#39ff14"
              strokeWidth={1.6} fill="url(#gg)" animationDuration={1000} />
            {stints.map((s, i) => (
              <Line key={s.stint_number} yAxisId="t" dataKey={`t${i}`}
                name={`Stint ${s.stint_number} · ${COMPOUNDS[s.compound].label}`}
                stroke={COMPOUNDS[s.compound].color} strokeWidth={2.2} dot={{ r: 1.6 }}
                connectNulls={false} animationDuration={1000} />
            ))}
            {pits.map((p) => (
              <ReferenceLine key={p.lap_number} yAxisId="t" x={p.lap_number} stroke="#a855f7"
                strokeDasharray="3 3" label={{ value: 'BOX', fill: '#a855f7', fontSize: 10, position: 'top' }} />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="note" style={{ marginTop: 8 }}>
        Voltas de SC, largada e pit in/out ocultas. Linha verde: aderência estimada do pneu.
      </div>
    </Panel>
  );
}
