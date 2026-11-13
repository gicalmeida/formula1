import { useState, useMemo } from 'react';
import { Radio, Flag } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import Led from '../../components/ui/Led';
import TrackMap from '../../components/TrackMap/TrackMap';
import WeatherMetrics from './WeatherMetrics';
import WeatherChart from './WeatherChart';
import AlertsPanel from './AlertsPanel';
import { buildAlerts } from './alerts';
import { TOTAL_LAPS } from '../../config/constants';

export default function TabOverview({ view }) {
  const [lap, setLap] = useState(40);
  const w = view.weather[lap - 1];
  const first = view.weather[0];
  const last = view.weather[TOTAL_LAPS - 1];

  const chartData = useMemo(
    () => view.weather.map((x) => ({
      lap: x.lap_number, track: x.track_temperature, air: x.air_temperature, prob: x.rain_probability,
    })),
    [view],
  );
  const alerts = useMemo(() => buildAlerts(first, last), [first, last]);

  return (
    <div className="view">
      <Panel title="Telemetria de pista · scrub da corrida" icon={Radio}
        right={(
          <span className="chip mono">
            <Led c="green" />VOLTA {String(lap).padStart(2, '0')}/{TOTAL_LAPS} · {w.date.slice(11, 19)}Z
          </span>
        )}>
        <input className="range" type="range" min={1} max={TOTAL_LAPS} value={lap}
          onChange={(e) => setLap(Number(e.target.value))} />
      </Panel>

      <WeatherMetrics w={w} first={first} />

      <div className="grid g-main">
        <div className="grid" style={{ alignContent: 'start' }}>
          <WeatherChart data={chartData} lap={lap} />
          <Panel title="Radar · Autódromo José Carlos Pace" icon={Flag}
            right={(
              <div className="legend mono" style={{ fontSize: 11 }}>
                <span><i style={{ background: '#ff2d46' }} />S1</span>
                <span><i style={{ background: '#38bdf8' }} />S2</span>
                <span><i style={{ background: '#ffd21f' }} />S3</span>
                <span><i style={{ background: '#39ff14' }} />DRS</span>
                <span><i style={{ background: '#38bdf8', opacity: 0.5 }} />Chuva</span>
              </div>
            )}>
            <TrackMap prob={w.rain_probability} />
          </Panel>
        </div>
        <AlertsPanel alerts={alerts} lap={lap} />
      </div>
    </div>
  );
}
