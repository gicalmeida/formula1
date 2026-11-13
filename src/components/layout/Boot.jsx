import Led from '../ui/Led';
import { SESSION_KEY } from '../../config/constants';

const LINES = ['GET /sessions', 'GET /drivers', 'GET /weather', 'GET /laps', 'GET /stints', 'GET /pit', 'GET /car_data'];

export default function Boot() {
  return (
    <div className="boot">
      <div className="box">
        <div className="row" style={{ justifyContent: 'center', marginBottom: 6 }}>
          <Led c="green" />
          <b className="mono" style={{ letterSpacing: '.12em' }}>PIT WALL · SYNC OPENF1</b>
        </div>
        <div className="bar"><i /></div>
        <ul style={{ margin: 0, padding: 0 }}>
          {LINES.map((l, i) => (
            <li key={l} className="mono" style={{ animationDelay: `${i * 150}ms` }}>
              &gt; {l}?session_key={SESSION_KEY} ... OK
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
