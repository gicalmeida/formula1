// Canais da telemetria integrada
export const CH = [
  { key: 'speed', label: 'Velocidade', color: '#39ff14', axis: 'spd' },
  { key: 'throttle', label: 'Acelerador', color: '#ff8a1f', axis: 'pct' },
  { key: 'brake', label: 'Freio', color: '#ff2d46', axis: 'pct' },
  { key: 'gear', label: 'Marcha', color: '#38bdf8', axis: 'gear', step: true },
  { key: 'drs', label: 'DRS', color: '#a855f7', axis: 'pct', step: true },
];

export const PRESETS = [['VER', 'NOR'], ['LEC', 'HAM'], ['RUS', 'ANT'], ['PIA', 'NOR']];

// Referências de curvas (distância em metros)
export const CORNERS = [[720, 'Senna S'], [1150, 'Sol'], [2150, 'Lago'], [3000, 'Pinheirinho'], [3950, 'Junção']];

export const SECTOR_NAMES = ['Senna S → Reta Oposta', 'Lago → Pinheirinho', 'Bico de Pato → Junção'];
