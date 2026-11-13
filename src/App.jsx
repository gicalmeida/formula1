import { useState, useEffect, useMemo } from 'react';
import { Info } from 'lucide-react';
import Boot from './components/layout/Boot';
import Header from './components/layout/Header';
import TabNav from './components/layout/TabNav';
import TabOverview from './features/overview/TabOverview';
import TabTyres from './features/tyres/TabTyres';
import TabTelemetry from './features/telemetry/TabTelemetry';
import TabStrategy from './features/strategy/TabStrategy';
import { loadSession } from './api/openf1';
import { buildView } from './data/buildView';
import { SESSION_KEY } from './config/constants';

const SCREENS = {
  overview: TabOverview,
  tyres: TabTyres,
  telemetry: TabTelemetry,
  strategy: TabStrategy,
};

export default function App() {
  const [db, setDb] = useState(null);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    let alive = true;
    (async () => {
      const data = await loadSession(SESSION_KEY);
      await new Promise((r) => setTimeout(r, 1500)); // tempo da animação de boot
      if (alive) setDb(data);
    })();
    return () => { alive = false; };
  }, []);

  const view = useMemo(() => (db ? buildView(db) : null), [db]);

  if (!view) return <Boot />;

  const Screen = SCREENS[tab];
  return (
    <div className="pw">
      <Header session={view.session} />
      <TabNav tab={tab} onChange={setTab} />
      <main key={tab}>
        <Screen view={view} />
      </main>
      <div className="foot mono">
        <Info size={12} style={{ verticalAlign: -2 }} /> Dados ilustrativos gerados no formato da OpenF1 API.
        
      </div>
    </div>
  );
}
