import {
  SESSION_KEY, MEETING_KEY, TOTAL_LAPS, PIT_LOSS, SC_LAPS, RAIN_LAPS, BASE_LAP,
} from '../config/constants';
import { GRID } from '../config/grid';
import { STRATS, DEG, OFFS, WEAR } from '../config/compounds';
import { clamp, mulberry } from '../utils/math';
import { genTelemetry } from './telemetry';

// Mock no formato dos endpoints da OpenF1:
// sessions, drivers, weather, laps, stints, pit, car_data
function buildMock() {
  const sessions = [{
    session_key: SESSION_KEY, meeting_key: MEETING_KEY, session_name: 'Race', session_type: 'Race',
    country_name: 'Brazil', circuit_short_name: 'Interlagos', location: 'São Paulo',
    date_start: '2025-11-09T17:00:00+00:00', date_end: '2025-11-09T19:00:00+00:00', year: 2025,
  }];

  const drivers = GRID.map(([n, acr, name, team, color, grid, pos, rating, strat]) => ({
    session_key: SESSION_KEY, driver_number: n, name_acronym: acr, full_name: name,
    team_name: team, team_colour: color, grid, position: pos, rating, strat,
  }));

  const stints = [];
  const pit = [];
  const laps = [];

  drivers.forEach((d) => {
    const r = mulberry(100 + d.driver_number);
    let lapCursor = 1;
    const list = STRATS[d.strat].map(([compound, n], idx) => {
      const s = {
        session_key: SESSION_KEY, driver_number: d.driver_number, stint_number: idx + 1,
        compound, lap_start: lapCursor, lap_end: lapCursor + n - 1, tyre_age_at_start: 0,
      };
      lapCursor += n;
      return s;
    });
    stints.push(...list);

    list.slice(0, -1).forEach((s) => {
      pit.push({
        session_key: SESSION_KEY, driver_number: d.driver_number, lap_number: s.lap_end,
        pit_duration: +(PIT_LOSS + (r() - 0.5) * 1.2).toFixed(1),
        date: new Date(Date.UTC(2025, 10, 9, 17, 0, 0) + s.lap_end * 80000).toISOString(),
      });
    });

    for (let lap = 1; lap <= TOTAL_LAPS; lap++) {
      const st = list.find((s) => lap >= s.lap_start && lap <= s.lap_end);
      const age = lap - st.lap_start;
      const rain = lap >= RAIN_LAPS[0] && lap <= RAIN_LAPS[1];
      const isSC = SC_LAPS.includes(lap);
      const pitIn = lap === st.lap_end && st.lap_end < TOTAL_LAPS;
      const pitOut = lap === st.lap_start && st.stint_number > 1;

      let off = OFFS[st.compound];
      if (st.compound === 'INTERMEDIATE' && rain) off = 0.9;
      let t = BASE_LAP + d.rating + off + DEG[st.compound] * age - 0.032 * (lap - 1) + (r() - 0.5) * 0.3;
      if (rain && ['SOFT', 'MEDIUM', 'HARD'].includes(st.compound)) t += 1.3;

      let phase = 'GREEN';
      if (lap === 1) { t += 7; phase = 'START'; }
      if (pitIn) { t += 7.5; phase = 'PIT_IN'; }
      if (pitOut) { t += 13.5; phase = 'PIT_OUT'; }
      if (isSC) { t += 27; phase = 'SC'; }

      const s1 = t * 0.258 * (1 + (r() - 0.5) * 0.01);
      const s2 = t * 0.418 * (1 + (r() - 0.5) * 0.01);
      laps.push({
        session_key: SESSION_KEY, driver_number: d.driver_number, lap_number: lap,
        lap_duration: +t.toFixed(3),
        duration_sector_1: +s1.toFixed(3),
        duration_sector_2: +s2.toFixed(3),
        duration_sector_3: +(t - s1 - s2).toFixed(3),
        is_pit_out_lap: pitOut,
        compound: st.compound, tyre_age: age, stint_number: st.stint_number,
        grip: +clamp(100 - WEAR[st.compound] * Math.pow(age + 1, 1.15) + (r() - 0.5) * 0.6, 45, 100).toFixed(1),
        clean: phase === 'GREEN', phase,
      });
    }
  });

  const weather = Array.from({ length: TOTAL_LAPS }, (_, i) => {
    const lap = i + 1;
    const r = mulberry(500 + lap);
    const prob = Math.round(clamp(
      10 + 52 * Math.exp(-Math.pow((lap - 52) / 8, 2)) + 14 * Math.exp(-Math.pow((lap - 18) / 6, 2)) + (r() - 0.5) * 4,
      2, 96,
    ));
    const rainfall = lap >= RAIN_LAPS[0] && lap <= RAIN_LAPS[1] ? 1 : 0;
    return {
      session_key: SESSION_KEY, meeting_key: MEETING_KEY, lap_number: lap,
      date: new Date(Date.UTC(2025, 10, 9, 17, 0, 0) + (lap - 1) * 80000).toISOString(),
      air_temperature: +(29.2 - lap * 0.05 + (r() - 0.5) * 0.3).toFixed(1),
      track_temperature: +(47.5 - lap * 0.14 - (rainfall ? 3.5 : 0) - (prob > 45 ? 1.5 : 0) + (r() - 0.5) * 0.6).toFixed(1),
      humidity: +clamp(52 + lap * 0.28 + prob * 0.1 + (r() - 0.5) * 1.5, 0, 100).toFixed(0),
      pressure: +(921.6 + (r() - 0.5) * 0.5).toFixed(1),
      rainfall,
      wind_speed: +(2.4 + 1.6 * Math.sin(lap / 7) + (lap >= 46 && lap <= 58 ? 2.6 : 0) + (r() - 0.5) * 0.5).toFixed(1), // m/s
      wind_direction: Math.round((140 + lap * 1.1 + (r() - 0.5) * 8) % 360),
      rain_probability: prob, // campo extra do mock (modelo)
    };
  });

  const car_data = drivers.flatMap((d) => genTelemetry(d.driver_number, d.rating));
  return { sessions, drivers, stints, pit, laps, weather, car_data };
}

export const MOCK = buildMock();
