import { Flag, CloudRain, Wind, Thermometer, ShieldAlert } from 'lucide-react';
import { SC_LAPS, PIT_LOSS, TOTAL_LAPS } from '../../config/constants';

// Alertas estratégicos de engenharia, com janelas de volta (from–to)
export function buildAlerts(first, last) {
  const plSC = (PIT_LOSS * 0.45).toFixed(1);
  return [
    {
      from: SC_LAPS[0] - 3, to: SC_LAPS[2] + 1, lvl: 'warn', icon: Flag,
      title: 'Janela de pit sob Safety Car',
      text: `SC simulado nas voltas ${SC_LAPS[0]}–${SC_LAPS[2]}. Pit loss cai de ${PIT_LOSS}s para ~${plSC}s. Box aberto para quem tem pneus com mais de 20 voltas.`,
    },
    {
      from: 44, to: 58, lvl: 'danger', icon: CloudRain,
      title: 'Risco de aquaplanagem · Curva do Sol',
      text: 'Água acumula na saída da Curva do Sol e na descida para a Reta Oposta. Preparar Intermediário e mapa de motor para pista molhada.',
    },
    {
      from: 46, to: 58, lvl: 'warn', icon: Wind,
      title: 'Rajadas na Reta Oposta',
      text: 'Vento de través acima de 5 m/s reduz a estabilidade em DRS aberto. Ajustar a asa traseira e alertar os pilotos.',
    },
    {
      from: 1, to: TOTAL_LAPS, lvl: 'info', icon: Thermometer,
      title: 'Queda de temperatura da pista',
      text: `Pista de ${first.track_temperature}°C para ${last.track_temperature}°C ao longo da corrida (−${(first.track_temperature - last.track_temperature).toFixed(1)}°C). Menos degradação térmica, mais graining nos macios.`,
    },
    {
      from: 52, to: 62, lvl: 'danger', icon: ShieldAlert,
      title: 'Junção alagada · saída do pit',
      text: 'Poças na Junção e na entrada da reta dos boxes. Risco de perda de tração na saída do pit lane com pneus frios.',
    },
  ];
}
