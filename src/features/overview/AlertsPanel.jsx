import { AlertTriangle } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import Led from '../../components/ui/Led';

const LEVEL_COLOR = { danger: '#ff2d46', warn: '#ff8a1f', info: '#38bdf8' };
const LEVEL_LED = { danger: 'red', warn: 'orange', info: 'cyan' };

export default function AlertsPanel({ alerts, lap }) {
  const activeCount = alerts.filter((a) => lap >= a.from && lap <= a.to).length;
  return (
    <Panel title="Alertas de engenharia" icon={AlertTriangle}
      right={<span className="chip mono"><Led c="red" />{activeCount} ATIVOS</span>}>
      {alerts.map((a, i) => {
        const active = lap >= a.from && lap <= a.to;
        const past = lap > a.to;
        const Icon = a.icon;
        const led = active ? LEVEL_LED[a.lvl] : past ? 'gray' : 'purple';
        return (
          <div key={a.title} className={`alert ${active ? 'active' : ''} ${past ? 'past' : ''} ${a.lvl}`}
            style={{ animationDelay: `${i * 70}ms` }}>
            <Icon size={20} color={LEVEL_COLOR[a.lvl]} style={{ flex: 'none', marginTop: 2 }} />
            <div>
              <h4>{a.title}</h4>
              <p>{a.text}</p>
              <div className="st mono">
                <Led c={led} pulse={active} />
                {active ? 'ATIVO' : past ? 'ENCERRADO' : 'PREVISTO'} · V{a.from}–V{a.to}
              </div>
            </div>
          </div>
        );
      })}
    </Panel>
  );
}
