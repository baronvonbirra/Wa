import React from 'react';
import { Calendar, MapPin, ShoppingBag, Calculator, GraduationCap } from 'lucide-react';

export type Wa2Tab = 'itinerary' | 'places' | 'wishlist' | 'tools' | 'walearn';

interface BottomNavProps {
  activeTab: Wa2Tab;
  setActiveTab: (tab: Wa2Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'itinerary' as Wa2Tab, label: 'Itinerario', icon: Calendar },
    { id: 'places' as Wa2Tab, label: 'Sitios', icon: MapPin },
    { id: 'wishlist' as Wa2Tab, label: 'Wishlist', icon: ShoppingBag },
    { id: 'tools' as Wa2Tab, label: 'Herramientas', icon: Calculator },
    { id: 'walearn' as Wa2Tab, label: 'Wa Learn', icon: GraduationCap },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-rose-100 shadow-[0_-4px_20px_rgba(225,29,72,0.1)] px-2 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-rose-500 text-white shadow-md scale-105'
                  : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50 active:scale-95'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className={`text-[11px] font-bold mt-1 ${isActive ? 'font-black' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
