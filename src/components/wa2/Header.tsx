import React, { useState, useEffect } from 'react';
import { useWa2 } from '../../state/Wa2Context';
import {
  MapPin,
  Hotel,
  Calendar,
  Wifi,
  WifiOff,
  CloudSun,
  CloudRain,
  Sun,
  Snowflake,
  Moon,
  Lock,
  Unlock,
  KeyRound
} from 'lucide-react';

interface WeatherData {
  temp: number;
  weatherCode: number;
  description: string;
}

export const Header: React.FC = () => {
  const { waState, toggleDarkMode, authenticatePin } = useWa2();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [inputPin, setInputPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

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

  let currentTripDay = 1;
  if (isTripActive) {
    const startObj = targetDate.getTime();
    const currentRefObj = selectedDateObj > targetDate ? selectedDateObj.getTime() : now.getTime();
    const dayDiff = Math.floor((currentRefObj - startObj) / (1000 * 60 * 60 * 24));
    currentTripDay = Math.max(1, dayDiff + 1);
  }

  // Active accommodation crossing selectedDate with stay segments (Disney, Tokyo 1, Kawaguchiko, Takayama, Kyoto, Osaka, Tokyo 2, Flight)
  const activeAccommodation = waState.accommodations.find(a => {
    if (a.start_date && a.end_date) {
      return waState.selectedDate >= a.start_date && waState.selectedDate <= a.end_date;
    }
    return false;
  }) || waState.accommodations[0];

  const activeCity = waState.cities.find(c => {
    return waState.selectedDate >= c.start_date && waState.selectedDate <= c.end_date;
  }) || waState.cities[0];

  // Today's activities
  const todayItems = waState.itineraryItems.filter(i => i.date === waState.selectedDate);
  const doneCount = todayItems.filter(i => i.status === 'done').length;

  // Open-Meteo Weather Fetching for Active City
  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      if (!activeCity || !activeCity.lat || !activeCity.lng) return;
      setWeatherLoading(true);

      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${activeCity.lat}&longitude=${activeCity.lng}&current_weather=true`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const code = data.current_weather?.weathercode || 0;
          const temp = Math.round(data.current_weather?.temperature || 12);

          let desc = 'Despejado';
          if (code >= 1 && code <= 3) desc = 'Nublado';
          else if (code >= 45 && code <= 48) desc = 'Niebla';
          else if (code >= 51 && code <= 67) desc = 'Lluvia';
          else if (code >= 71) desc = 'Nieve';

          if (isMounted) {
            setWeather({ temp, weatherCode: code, description: desc });
          }
        }
      } catch (e) {
        console.warn('Open-Meteo offline fallback active:', e);
        if (isMounted) {
          // Offline fallback default weather
          setWeather({ temp: 12, weatherCode: 1, description: 'Despejado' });
        }
      } finally {
        if (isMounted) setWeatherLoading(false);
      }
    };

    fetchWeather();
    return () => {
      isMounted = false;
    };
  }, [activeCity]);

  const getWeatherIcon = (code: number) => {
    if (code >= 51 && code <= 67) return <CloudRain className="w-3.5 h-3.5 text-blue-500" />;
    if (code >= 71) return <Snowflake className="w-3.5 h-3.5 text-sky-400" />;
    if (code >= 1 && code <= 3) return <CloudSun className="w-3.5 h-3.5 text-amber-500" />;
    return <Sun className="w-3.5 h-3.5 text-amber-400" />;
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticatePin(inputPin)) {
      setShowPinModal(false);
      setInputPin('');
      setPinError('');
    } else {
      setPinError('PIN incorrecto. Prueba "2026".');
    }
  };

  return (
    <header className="bg-gradient-to-b from-rose-50 via-red-50/30 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border-b border-rose-100 dark:border-slate-700 shadow-sm sticky top-0 z-40 transition-colors">
      <div className="max-w-md mx-auto px-4 pt-3 pb-2">
        {/* Top bar with logo, weather widget, dark mode & PIN indicator */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce select-none">🏯</span>
            <div>
              <h1 className="text-xl font-black text-rose-600 dark:text-rose-400 tracking-tight flex items-center gap-1">
                Wa 2.0 <span className="text-[10px] bg-rose-600 text-white font-extrabold px-1.5 py-0.5 rounded-full uppercase">PWA</span>
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Asistente de Viaje a Japón</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Live Weather Widget */}
            {weather && (
              <div className="flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full bg-amber-50 dark:bg-slate-800 text-slate-700 dark:text-amber-300 border border-amber-200 dark:border-slate-700">
                {getWeatherIcon(weather.weatherCode)}
                <span>{weather.temp}°C</span>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-200 transition-colors"
              title="Cambiar Modo Oscuro"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>

            {/* PIN Access Indicator */}
            <button
              onClick={() => setShowPinModal(true)}
              className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full border transition-all ${
                waState.isAuthenticated
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800'
              }`}
              title="Acceso Compartido por PIN"
            >
              {waState.isAuthenticated ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              <span>{waState.isAuthenticated ? 'Grupo' : 'PIN'}</span>
            </button>

            {/* Online Status */}
            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full border ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
            }`}>
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            </div>
          </div>
        </div>

        {/* Dynamic Accommodation & Flight Timeline Banner */}
        <div className="mt-2.5 bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white rounded-2xl p-3 shadow-md border border-rose-400/50 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-6xl font-black select-none pointer-events-none">
            🏯
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block">
                  {activeAccommodation?.segment ? `Tramo: ${activeAccommodation.segment}` : 'Viaje a Japón'}
                </span>
                {waState.selectedDate === "2027-01-14" && (
                  <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full">
                    ✈️ Llegada Málaga 14 Ene
                  </span>
                )}
              </div>
              <h2 className="text-base font-black tracking-tight flex items-center gap-1.5">
                🏨 {activeAccommodation?.name || 'Hotel Gracery Shinjuku'}
              </h2>
              <p className="text-[11px] text-rose-100 font-medium truncate max-w-[240px]">
                {activeAccommodation?.address}
              </p>
            </div>

            <div className="text-right bg-white/10 backdrop-blur-sm p-2 rounded-xl border border-white/20 flex-shrink-0">
              <span className="text-[9px] block text-rose-100 font-bold uppercase">Check-in</span>
              <strong className="text-sm font-black text-white">
                {activeAccommodation?.check_in_time || '15:00'}
              </strong>
            </div>
          </div>
        </div>

        {/* Quick Current Day Summary Sub-banner */}
        <div className="mt-2 flex items-center justify-between text-xs bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-700 p-2 rounded-xl shadow-xs gap-2">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            <span className="font-bold truncate">{activeCity?.name || 'Tokio'}</span>
          </div>

          {activeAccommodation && (
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 truncate border-l border-slate-100 dark:border-slate-700 pl-2">
              <Hotel className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span className="font-semibold text-[11px] truncate">{activeAccommodation.name}</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-[10px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 font-black px-2 py-0.5 rounded-md flex-shrink-0 border border-rose-100 dark:border-rose-900">
            <Calendar className="w-3 h-3" />
            <span>{waState.selectedDate.split('-').slice(1).join('/')}</span>
          </div>
        </div>
      </div>

      {/* PIN Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border-4 border-rose-400 rounded-3xl p-5 shadow-2xl max-w-sm w-full relative space-y-3">
            <button
              onClick={() => setShowPinModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold bg-slate-100 dark:bg-slate-700 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="text-center">
              <KeyRound className="w-8 h-8 text-rose-500 mx-auto mb-1" />
              <h3 className="text-base font-black text-slate-800 dark:text-white uppercase">Acceso Compartido de Grupo</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                Introduce el PIN de 4 dígitos para sincronizar con el grupo de viaje
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-3">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="PIN del grupo (Ej: 2026)"
                  value={inputPin}
                  onChange={e => setInputPin(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-black py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-rose-500 text-slate-800 dark:text-white"
                />
                {pinError && (
                  <p className="text-xs text-rose-500 font-bold mt-1 text-center">{pinError}</p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs uppercase"
                >
                  Verificar PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
