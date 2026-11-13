import {
  ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from 'recharts';
import { Zap } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import { TIP, AX } from '../../components/charts/chartTheme';
import { TRACK_LEN } from '../../config/constants';
import { CH, CORNERS } from './channels';

export default function TelemetryChart({ data, on, onToggle, nameA, nameB }) {
  return (
    <Panel title="Telemetria integrada · volta rápida" icon={Zap}
      right={(
        <div className="row">
          {CH.map((c) => (
            <span key={c.key} className={`chip btn mono ${on[c.key] ? 'on' : ''}`}
              style={on[c.key] ? { color: c.color, borderColor: c.color } : null}
              onClick={() => onToggle(c.key)}>
              <i className="dot" style={{ background: c.color }} />{c.label}
            </span>
          ))}
        </div>
      )}>
      <div style={{ height: 420 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ left: -6, right: -4, top: 14 }}>
            <CartesianGrid stroke="#1f212b" strokeDasharray="3 3" />
            <XAxis dataKey="dist" type="number" domain={[0, TRACK_LEN]}
              ticks={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000]} unit="m" {...AX} />
            <YAxis yAxisId="spd" domain={[0, 350]} {...AX} />
            <YAxis yAxisId="pct" orientation="right" domain={[0, 100]} unit="%" {...AX} />
            <YAxis yAxisId="gear" hide domain={[0, 8]} />
            <Tooltip {...TIP} labelFormatter={(v) => `${v} m`}
              formatter={(v, n) => (n.includes('DRS') ? [v > 0 ? 'ON' : 'OFF', n] : [v, n])} />
            {CORNERS.map(([x, t]) => (
              <ReferenceLine key={t} yAxisId="spd" x={x} stroke="#2e3140" strokeDasharray="2 4"
                label={{ value: t, fill: '#5d6174', fontSize: 9, position: 'insideTop' }} />
            ))}
            <ReferenceLine yAxisId="spd" x={1500} stroke="#38bdf8" strokeOpacity={0.5}
              label={{ value: 'S1|S2', fill: '#38bdf8', fontSize: 10, position: 'insideBottomRight' }} />
            <ReferenceLine yAxisId="spd" x={3050} stroke="#ffd21f" strokeOpacity={0.5}
              label={{ value: 'S2|S3', fill: '#ffd21f', fontSize: 10, position: 'insideBottomRight' }} />
            {CH.filter((c) => on[c.key]).flatMap((c) => ['A', 'B'].map((w) => (
              <Line key={`${w}_${c.key}`} yAxisId={c.axis} dataKey={`${w}_${c.key}`}
                name={`${w === 'A' ? nameA : nameB} · ${c.label}`}
                stroke={c.color} strokeWidth={w === 'A' ? 1.8 : 1.4}
                strokeDasharray={w === 'B' ? '5 3' : undefined}
                dot={false} type={c.step ? 'stepAfter' : 'monotone'} animationDuration={900} />
            )))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="note" style={{ marginTop: 6 }}>
        Eixo esquerdo: km/h · eixo direito: acelerador/freio/DRS (%) · marchas 1–8 em escala própria.
      </div>
    </Panel>
  );
}
