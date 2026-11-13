import { TABS } from '../../config/tabs';

export default function TabNav({ tab, onChange }) {
  return (
    <nav className="tabs">
      {TABS.map((t) => {
        const Icon = t.icon;
        return (
          <button key={t.id} className={`tab ${tab === t.id ? 'on' : ''}`} onClick={() => onChange(t.id)}>
            <Icon size={16} />
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}
