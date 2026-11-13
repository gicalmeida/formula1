import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
} from 'recharts';
import { Zap } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import { TIP, AX } from '../../components/charts/chartTheme';
import { BUFFER } from './simulate';

export default function MarginChart({ curves, under }) {
  return (
    <Panel title="Margem de posição vs. volta de pit" icon={Zap}
      right={<span className="chip mono">margem &gt; 0 = passa o rival</span>}>
      <div style={{ height: 270 }}>
        <ResponsiveContainer>
          <LineChart data={curves} margin={{ left: -6, right: 8, top: 8 }}>
            <CartesianGrid stroke="#1f212b" strokeDasharray="3 3" />
            <XAxis dataKey="lap" type="number" domain={['dataMin', 'dataMax']} tickCount={8} {...AX} />
            <YAxis unit="s" {...AX} />
            <Tooltip {...TIP} formatter={(v) => [`${v.toFixed(2)}s`]} labelFormatter={(v) => `Pit na volta ${v}`} />
            <ReferenceLine y={0} stroke="#5d6174" />
            <ReferenceLine y={BUFFER} stroke="#39ff14" strokeDasharray="4 3" strokeOpacity={0.6} />
            {under && (
              <ReferenceLine x={under.lap} stroke="#39ff14" strokeOpacity={0.5}
                label={{ value: 'JANELA', fill: '#39ff14', fontSize: 10, position: 'top' }} />
            )}
            <Line type="monotone" dataKey="under" name="Undercut" stroke="#39ff14" strokeWidth={2.4}
              dot={false} animationDuration={700} />
            <Line type="monotone" dataKey="over" name="Overcut" stroke="#ff8a1f" strokeWidth={2}
              strokeDasharray="5 3" dot={false} animationDuration={700} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="note" style={{ marginTop: 6 }}>
        Modelo: ambos pagam o pit loss uma vez. A margem vem do pneu novo contra o pneu velho do rival durante as voltas de reação.
      </div>
    </Panel>
  );
}
