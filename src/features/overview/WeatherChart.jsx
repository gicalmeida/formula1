import {
  ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ReferenceArea,
} from 'recharts';
import { Thermometer } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import { TIP, AX } from '../../components/charts/chartTheme';
import { SESSION_KEY, TOTAL_LAPS, SC_LAPS } from '../../config/constants';

export default function WeatherChart({ data, lap }) {
  return (
    <Panel title="Temperatura da pista vs. probabilidade de chuva" icon={Thermometer}
      right={<span className="chip mono">weather · session_key {SESSION_KEY}</span>}>
      <div style={{ height: 290 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ left: -8, right: 4, top: 8 }}>
            <defs>
              <linearGradient id="gp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity=".55" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity=".02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1f212b" strokeDasharray="3 3" />
            <XAxis dataKey="lap" type="number" domain={[1, TOTAL_LAPS]} tickCount={8} {...AX} />
            <YAxis yAxisId="t" domain={[28, 50]} unit="°" {...AX} />
            <YAxis yAxisId="p" orientation="right" domain={[0, 100]} unit="%" {...AX} />
            <Tooltip {...TIP} />
            <ReferenceArea yAxisId="t" x1={SC_LAPS[0]} x2={SC_LAPS[2]} fill="#ffd21f" fillOpacity={0.12}
              label={{ value: 'SC', fill: '#ffd21f', fontSize: 10 }} />
            <Area yAxisId="p" type="monotone" dataKey="prob" name="Prob. chuva (%)" stroke="#a855f7"
              fill="url(#gp)" strokeWidth={2} animationDuration={1200} />
            <Line yAxisId="t" type="monotone" dataKey="track" name="Pista (°C)" stroke="#ff8a1f"
              dot={false} strokeWidth={2.2} animationDuration={1200} />
            <Line yAxisId="t" type="monotone" dataKey="air" name="Ar (°C)" stroke="#38bdf8"
              dot={false} strokeWidth={1.4} strokeDasharray="4 3" animationDuration={1200} />
            <ReferenceLine yAxisId="t" x={lap} stroke="#39ff14" strokeDasharray="4 3" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
