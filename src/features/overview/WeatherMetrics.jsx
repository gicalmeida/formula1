import { Thermometer, Cloud, Droplets, Wind, Navigation } from 'lucide-react';
import Metric from '../../components/ui/Metric';
import { compass } from '../../utils/format';

export default function WeatherMetrics({ w, first }) {
  return (
    <div className="grid g-4" style={{ margin: '14px 0' }}>
      <Metric icon={Thermometer} label="Pista" value={w.track_temperature.toFixed(1)} unit="°C"
        sub={`Δ ${(w.track_temperature - first.track_temperature).toFixed(1)}°C vs largada`} acc="#ff8a1f" />
      <Metric icon={Cloud} label="Ar" value={w.air_temperature.toFixed(1)} unit="°C"
        sub={`Pressão ${w.pressure} mbar`} acc="#38bdf8" delay={60} />
      <Metric icon={Droplets} label="Umidade" value={w.humidity} unit="%"
        sub={w.rainfall ? 'CHUVA NA PISTA' : `Prob. chuva ${w.rain_probability}%`} acc="#a855f7" delay={120} />
      <Metric icon={Wind} label="Vento" value={w.wind_speed.toFixed(1)} unit="m/s"
        sub={`${(w.wind_speed * 3.6).toFixed(0)} km/h · ${w.wind_direction}° ${compass(w.wind_direction)}`}
        acc="#39ff14" delay={180}>
        <Navigation size={22} color="#39ff14"
          style={{ transform: `rotate(${w.wind_direction + 180}deg)`, transition: 'transform .5s' }} />
      </Metric>
    </div>
  );
}
