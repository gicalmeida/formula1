// Indexa os dados brutos da API por piloto para consulta rápida nos componentes
export function buildView(db) {
  const drivers = [...db.drivers].sort((a, b) => a.position - b.position);
  const byNum = {};
  const lapsBy = {};
  const stintsBy = {};
  const pitsBy = {};
  const carBy = {};
  const best = {};

  drivers.forEach((d) => {
    byNum[d.driver_number] = d;
    lapsBy[d.driver_number] = [];
    stintsBy[d.driver_number] = [];
    pitsBy[d.driver_number] = [];
    carBy[d.driver_number] = [];
  });

  db.laps.forEach((l) => lapsBy[l.driver_number].push(l));
  db.stints.forEach((s) => stintsBy[s.driver_number].push(s));
  db.pit.forEach((p) => pitsBy[p.driver_number].push(p));
  db.car_data.forEach((c) => carBy[c.driver_number].push(c));

  drivers.forEach((d) => {
    best[d.driver_number] = lapsBy[d.driver_number]
      .filter((l) => l.clean)
      .reduce((a, b) => (a && a.lap_duration < b.lap_duration ? a : b), null);
  });

  const bestSectors = [1, 2, 3].map((s) =>
    Math.min(...drivers.map((d) => best[d.driver_number][`duration_sector_${s}`])));

  const acr = {};
  drivers.forEach((d) => { acr[d.name_acronym] = d.driver_number; });

  return {
    drivers, byNum, lapsBy, stintsBy, pitsBy, carBy, best, bestSectors, acr,
    weather: db.weather, session: db.sessions[0],
  };
}
