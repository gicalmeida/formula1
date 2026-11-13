export default function Metric({ icon: Icon, label, value, unit, sub, acc, delay = 0, children }) {
  return (
    <div className="metric" style={{ '--acc': acc, animationDelay: `${delay}ms` }}>
      <div className="lbl">
        <Icon size={14} />
        {label}
      </div>
      <div className="val mono" style={children ? { display: 'flex', alignItems: 'center', gap: 10 } : undefined}>
        {value}
        <small>{unit}</small>
        {children}
      </div>
      <div className="sub mono">{sub}</div>
    </div>
  );
}
