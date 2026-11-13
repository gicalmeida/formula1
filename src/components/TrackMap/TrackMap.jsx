import {
  TRACK_D, SECTORS, DRS_ZONES, RAIN_ZONES, LABELS, SECTOR_LABELS,
} from './trackGeometry';

export default function TrackMap({ prob }) {
  const op = 0.25 + (prob / 100) * 0.75;
  return (
    <svg viewBox="0 0 600 410" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <radialGradient id="rain">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity=".75" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <pattern id="gridp" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#1c1e27" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="600" height="410" fill="url(#gridp)" />
      <path d={TRACK_D} fill="none" stroke="#262833" strokeWidth="19" strokeLinejoin="round" />
      <path d={TRACK_D} fill="none" stroke="#0b0c10" strokeWidth="14" strokeLinejoin="round" />

      {SECTORS.map((s) => (
        <path key={s.id} className="track-draw" d={s.d} fill="none" stroke={s.color}
          strokeWidth="3" strokeOpacity=".9" strokeLinecap="round" />
      ))}

      {DRS_ZONES.map((z) => (
        <g key={z.id}>
          <path d={z.d} fill="none" stroke="#39ff14" strokeWidth="9" strokeOpacity=".22"
            strokeLinecap="round" filter="url(#glow)" />
          <text x={z.lx} y={z.ly} fill="#39ff14" fontSize="10" fontFamily="Fira Code, monospace" textAnchor="middle">{z.id}</text>
        </g>
      ))}

      {RAIN_ZONES.map((p, i) => (
        <g key={i} style={{ opacity: op, transition: 'opacity .5s' }}>
          <circle className="rainzone" cx={p[0]} cy={p[1]} r="34" fill="url(#rain)" />
          <text x={p[0]} y={p[1] + (i ? 30 : -22)} textAnchor="middle" fill="#7dd3fc"
            fontSize="10" fontFamily="Fira Code, monospace">☂ {Math.round(prob)}%</text>
        </g>
      ))}

      <rect x="516" y="289" width="4" height="24" fill="#fff" transform="rotate(-8 518 301)" />
      <text x="548" y="294" fill="#e6e8ef" fontSize="10" fontFamily="Fira Code, monospace" textAnchor="middle">S/F</text>

      {LABELS.map(([t, x, y, a]) => (
        <text key={t} x={x} y={y} textAnchor={a} fill="#8a8fa3" fontSize="10"
          fontFamily="Rajdhani, sans-serif" letterSpacing=".05em">{t}</text>
      ))}
      {SECTOR_LABELS.map(([t, x, y, c]) => (
        <text key={t} x={x} y={y} fill={c} fontSize="13" fontWeight="700" fontFamily="Fira Code, monospace">{t}</text>
      ))}

      <circle r="5" fill="#39ff14" filter="url(#glow)">
        <animateMotion dur="9s" repeatCount="indefinite" path={TRACK_D} />
      </circle>
      <circle r="4" fill="#ff8a1f" filter="url(#glow)">
        <animateMotion dur="9s" begin="-0.9s" repeatCount="indefinite" path={TRACK_D} />
      </circle>
    </svg>
  );
}
