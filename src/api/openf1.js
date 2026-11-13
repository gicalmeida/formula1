import { OPENF1, USE_LIVE_API } from '../config/constants';
import { MOCK } from '../data/mockData';

export async function openf1(endpoint, params = {}) {
  if (USE_LIVE_API) {
    try {
      const qs = new URLSearchParams(params).toString();
      const res = await fetch(`${OPENF1}/${endpoint}?${qs}`);
      if (res.ok) return await res.json();
    } catch (e) {
    }
  }
  const rows = MOCK[endpoint] || [];
  return rows.filter((row) =>
    Object.entries(params).every(([k, v]) => row[k] === undefined || row[k] === v));
}

const ENDPOINTS = ['sessions', 'drivers', 'weather', 'laps', 'stints', 'pit', 'car_data'];

export async function loadSession(sessionKey) {
  const p = { session_key: sessionKey };
  const [sessions, drivers, weather, laps, stints, pit, car_data] = await Promise.all(
    ENDPOINTS.map((e) => openf1(e, p)),
  );
  return { sessions, drivers, weather, laps, stints, pit, car_data };
}
