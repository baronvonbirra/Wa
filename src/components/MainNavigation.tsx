import React from 'react';
import { Calendar, CheckSquare, Luggage, Calculator, Building2 } from 'lucide-react';

export type MainTab = 'itinerary' | 'todo' | 'packing' | 'tools' | 'guide';

interface MainNavigationProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: MainTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'itinerary', label: 'Itinerario', icon: Calendar },
    { id: 'todo', label: 'Pre-Viaje', icon: CheckSquare },
    { id: 'packing', label: 'Equipaje', icon: Luggage },
    { id: 'tools', label: 'Herramientas', icon: Calculator },
    { id: 'guide', label: 'Alojamientos', icon: Building2 }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 text-slate-300 shadow-2xl md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 flex items-center justify-around md:justify-between h-16">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xl">🇯🇵</span>
          <span className="font-black text-white tracking-wider text-sm uppercase">Japón 2026/2027</span>
          <span className="bg-rose-500/20 text-rose-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-rose-500/30">
            Offline PWA
          </span>
        </div>

        <div className="flex items-center justify-around w-full md:w-auto md:gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col md:flex-row items-center justify-center min-w-[56px] sm:min-w-[64px] min-h-[48px] px-2 sm:px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-95 ${
                  isActive
                    ? 'bg-rose-600 text-white font-black shadow-lg shadow-rose-900/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-bold'
                }`}
                aria-label={item.label}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] sm:text-[11px] md:text-xs mt-0.5 md:mt-0 md:ml-1.5 font-bold tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
