import React, { useState, useEffect } from 'react';
import { useWa2 } from '../../state/Wa2Context';
import { MapPin, Hotel, Calendar, Wifi, WifiOff, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { waState } = useWa2();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Countdown logic
  const now = new Date();
  const targetDate = new Date(`${waState.tripStartDate}T00:00:00`);
  const selectedDateObj = new Date(`${waState.selectedDate}T00:00:00`);

  const diffTime = targetDate.getTime() - now.getTime();
  const daysUntilDeparture = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isTripActive = now >= targetDate || selectedDateObj >= targetDate;

  // Day number in Japan calculation if trip is active
  let currentTripDay = 1;
  if (isTripActive) {
    const startObj = targetDate.getTime();
    const currentRefObj = selectedDateObj > targetDate ? selectedDateObj.getTime() : now.getTime();
    const dayDiff = Math.floor((currentRefObj - startObj) / (1000 * 60 * 60 * 24));
    currentTripDay = Math.max(1, dayDiff + 1);
  }

  // Active city & accommodation lookup for selected date
  const activeCity = waState.cities.find(c => {
    return waState.selectedDate >= c.start_date && waState.selectedDate <= c.end_date;
  }) || waState.cities[0];

  const activeAccommodation = waState.accommodations.find(a => a.city_id === activeCity?.id);

  // Today's activities
  const todayItems = waState.itineraryItems.filter(i => i.date === waState.selectedDate);
  const doneCount = todayItems.filter(i => i.status === 'done').length;

  return (
    <header className="bg-gradient-to-b from-rose-50 via-red-50/30 to-white border-b border-rose-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-md mx-auto px-4 pt-3 pb-2">
        {/* Top bar with logo and connection badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🏯</span>
            <div>
              <h1 className="text-xl font-black text-rose-600 tracking-tight flex items-center gap-1">
                Wa 2.0 <span className="text-[10px] bg-rose-600 text-white font-extrabold px-1.5 py-0.5 rounded-full uppercase">PWA</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-bold">Asistente de Viaje a Japón</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full border ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              <span>{isOnline ? 'Sincronizado' : 'Offline'}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Trip Countdown Banner */}
        <div className="mt-2.5 bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white rounded-2xl p-3 shadow-md border border-rose-400/50 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-6xl font-black select-none pointer-events-none">
            🇯🇵
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
                {isTripActive ? '¡En Japón!' : 'Cuenta atrás para el Viaje'}
              </span>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-1.5">
                {isTripActive ? (
                  <>⛩️ Día {currentTripDay} en Japón</>
                ) : (
                  <>✈️ {daysUntilDeparture > 0 ? `${daysUntilDeparture} días` : '¡Hoy salimos!'} para Japón</>
                )}
              </h2>
              <p className="text-[11px] text-rose-100 font-medium">
                Salida: 20 de Diciembre, 2026 • {activeCity ? activeCity.name : 'Tokio'}
              </p>
            </div>

            <div className="text-right bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/20 flex-shrink-0">
              <span className="text-[9px] block text-rose-100 font-bold uppercase">Progreso Hoy</span>
              <strong className="text-base font-black text-white">
                {doneCount}/{todayItems.length}
              </strong>
            </div>
          </div>
        </div>

        {/* Quick Current Day Summary Sub-banner */}
        <div className="mt-2 flex items-center justify-between text-xs bg-white border border-rose-100 p-2 rounded-xl shadow-xs gap-2">
          <div className="flex items-center gap-1.5 text-slate-700 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            <span className="font-bold truncate">{activeCity?.name || 'Tokio'}</span>
          </div>

          {activeAccommodation && (
            <div className="flex items-center gap-1.5 text-slate-600 truncate border-l border-slate-100 pl-2">
              <Hotel className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span className="font-semibold text-[11px] truncate">{activeAccommodation.name}</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-[10px] text-rose-600 bg-rose-50 font-black px-2 py-0.5 rounded-md flex-shrink-0">
            <Calendar className="w-3 h-3" />
            <span>{waState.selectedDate.split('-').slice(1).join('/')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
