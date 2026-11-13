import { Cpu, Timer } from 'lucide-react';
import Panel from '../../components/ui/Panel';
import Led from '../../components/ui/Led';
import Slider from '../../components/ui/Slider';
import DriverSelect from '../../components/ui/DriverSelect';

export default function SimulatorControls({ view, chase, lead, onChase, onLead, S, set, onSyncAge }) {
  return (
    <Panel title="Simulador de undercut / overcut" icon={Cpu}
      right={<span className="chip mono"><Led c="green" />MODELO ATIVO</span>}>
      <div className="row" style={{ marginBottom: 14 }}>
        <DriverSelect value={chase} onChange={onChase} drivers={view.drivers} />
        <span className="mono" style={{ color: '#8a8fa3' }}>atrás de</span>
        <DriverSelect value={lead} onChange={onLead} drivers={view.drivers} />
      </div>
      <div className="grid g-2" style={{ columnGap: 24 }}>
        <div>
          <Slider label="Delta de tempo por pneu novo" value={S.newDelta} min={-2.5} max={-0.2} step={0.1}
            unit=" s/v" onChange={set('newDelta')} hint="Ganho do pneu novo em relação ao rendimento base" />
          <Slider label="Taxa de degradação" value={S.deg} min={0.01} max={0.2} step={0.01}
            unit=" s/v" onChange={set('deg')} hint="Perda de ritmo por volta de uso" />
          <Slider label="Perda no pit lane de Interlagos" value={S.pitLoss} min={18} max={26} step={0.1}
            unit=" s" onChange={set('pitLoss')} hint="Padrão: 21,5 s (entrada → saída)" />
          <Slider label="Tráfego na saída (quem para primeiro)" value={S.traffic} min={0} max={4} step={0.1}
            unit=" s" onChange={set('traffic')} />
        </div>
        <div>
          <Slider label="Volta atual" value={S.lap} min={8} max={50} step={1} unit="" onChange={set('lap')} />
          <Slider label="Idade do pneu (perseguidor)" value={S.age} min={0} max={35} step={1}
            unit=" v" onChange={set('age')} hint="Use o botão abaixo para puxar do stint real" />
          <Slider label="Gap para o carro da frente" value={S.gap} min={0.3} max={5} step={0.1}
            unit=" s" onChange={set('gap')} />
          <Slider label="Reação do rival (voltas depois)" value={S.react} min={1} max={4} step={1}
            unit=" v" onChange={set('react')} />
          <Slider label="Idade pneu rival − seu pneu" value={S.ageDiff} min={-6} max={6} step={1}
            unit=" v" onChange={set('ageDiff')} />
          <span className="chip btn mono" onClick={onSyncAge}>
            <Timer size={12} />Sincronizar idade com stint de {view.byNum[chase].name_acronym}
          </span>
        </div>
      </div>
    </Panel>
  );
}
