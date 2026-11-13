import { Gauge } from 'lucide-react';
import Led from '../ui/Led';
import { TOTAL_LAPS, TRACK_LEN, PIT_LOSS } from '../../config/constants';

export default function Header({ session }) {
  return (
    <header className="top">
      <div className="brand">
        <div className="logo"><Gauge size={22} /></div>
        <div>
          <h1>PIT WALL · STRATEGY</h1>
          <small>GP de São Paulo 2025 · Autódromo José Carlos Pace</small>
        </div>
      </div>
      <div className="meta mono">
        <span><Led c="green" /> REPLAY <b>2025-11-09</b></span>
        <span>session_key <b>{session.session_key}</b></span>
        <span>voltas <b>{TOTAL_LAPS}</b></span>
        <span>pista <b>{(TRACK_LEN / 1000).toFixed(3)} km</b></span>
        <span>pit loss <b>{PIT_LOSS}s</b></span>
      </div>
    </header>
  );
}
