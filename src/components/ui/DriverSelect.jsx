export default function DriverSelect({ value, onChange, drivers }) {
  return (
    <select className="select" value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {drivers.map((d) => (
        <option key={d.driver_number} value={d.driver_number}>
          {d.name_acronym} · #{d.driver_number} · {d.team_name}
        </option>
      ))}
    </select>
  );
}
