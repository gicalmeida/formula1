export default function Slider({ label, value, min, max, step, unit, onChange, hint }) {
  const decimals = step < 0.1 ? 2 : step < 1 ? 1 : 0;
  return (
    <div className="slider">
      <div className="slider-top">
        <span>{label}</span>
        <b className="mono">{Number(value).toFixed(decimals)}{unit}</b>
      </div>
      <input
        className="range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      {hint && <small>{hint}</small>}
    </div>
  );
}
