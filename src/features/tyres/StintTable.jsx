import { Layers } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import { COMPOUNDS } from '../../config/compounds';

function CompoundLegend() {
  return (
    <div className="legend" style={{ fontSize: 12 }}>
      {Object.entries(COMPOUNDS).map(([k, c]) => (
        <span key={k}><i style={{ background: c.color }} />{c.label}</span>
      ))}
    </div>
  );
}

function StintBar({ stints }) {
  return (
    <div className="stintbar">
      {stints.map((s, i) => {
        const c = COMPOUNDS[s.compound];
        const n = s.lap_end - s.lap_start + 1;
        return (
          <div key={s.stint_number} className="stint"
            title={`Stint ${s.stint_number}: ${c.label} · ${n} voltas`}
            style={{ flex: n, background: c.color, color: c.text, animationDelay: `${i * 140}ms` }}>
            <b>{c.letter}</b><span>{n}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function StintTable({ view, selected, onSelect }) {
  return (
    <Panel title="Grid · estratégia de stints" icon={Layers} right={<CompoundLegend />}>
      <div className="scroll">
        <table className="tbl">
          <thead>
            <tr><th>P</th><th>Piloto</th><th>Equipe</th><th>Grid</th><th>Stints</th><th>Box</th></tr>
          </thead>
          <tbody>
            {view.drivers.map((dr) => {
              const gridColor = dr.grid > dr.position ? '#39ff14' : dr.grid < dr.position ? '#ff7183' : '#8a8fa3';
              return (
                <tr key={dr.driver_number} className={dr.driver_number === selected ? 'sel' : ''}
                  onClick={() => onSelect(dr.driver_number)}>
                  <td className="mono">{String(dr.position).padStart(2, '0')}</td>
                  <td>
                    <span className="dbar" style={{ background: `#${dr.team_colour}` }} />
                    <b className="mono">{dr.name_acronym}</b>{' '}
                    <span style={{ color: '#8a8fa3', fontSize: 13 }}>{dr.full_name}</span>
                  </td>
                  <td style={{ color: '#8a8fa3', fontSize: 13 }}>{dr.team_name}</td>
                  <td className="mono" style={{ color: gridColor }}>P{dr.grid}</td>
                  <td><StintBar stints={view.stintsBy[dr.driver_number]} /></td>
                  <td className="mono">{view.pitsBy[dr.driver_number].length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
