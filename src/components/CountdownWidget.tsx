import React, { useState, useEffect } from 'react';
import { Timer, Calendar, Compass } from 'lucide-react';
import { TRIP_DATA } from '../data/tripData';

function getActiveBannerMessage(now: Date): string {
  // Format current date as YYYY-MM-DD in Europe/Madrid (CET)
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const dateStr = formatter.format(now);

  // Exact examples & overrides:
  if (dateStr === '2026-12-20') {
    return '¡Despegue! En rumbo hacia el País del Sol Naciente';
  }
  if (dateStr === '2027-01-01') {
    return '¡Feliz Año Nuevo 2027! Día 12: Takayama';
  }

  // Find day in TRIP_DATA
  for (const stage of TRIP_DATA.stages) {
    for (const day of stage.days) {
      if (day.date === dateStr) {
        if (dateStr === '2026-12-21') {
          return '¡Bienvenidos a Japón! Día 1: Tokio & Disney Resort';
        }
        if (dateStr === '2026-12-22') {
          return '¡Bienvenidos a Japón! Día 2: Tokyo Disneyland';
        }
        if (dateStr === '2026-12-28') {
          return '¡Bienvenidos a Japón! Día 8: Monte Fuji & Kawaguchiko';
        }
        if (dateStr === '2027-01-07') {
          return '¡Bienvenidos a Japón! Día 18: Osaka';
        }
        return `¡Bienvenidos a Japón! Día ${day.dayIndex}: ${day.location || day.title}`;
      }
    }
  }

  if (dateStr > '2027-01-13') {
    return '¡Gracias por acompañarnos! El viaje a Japón 2026-2027 ha concluido.';
  }

  return '¡Bienvenidos a Japón!';
}

export const CountdownWidget: React.FC = () => {
  // Target date: 20 de Diciembre de 2026 a las 13:00:00 CET (Salida Málaga AGP)
  const targetDate = new Date('2026-12-20T13:00:00+01:00');

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, now };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
      now
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isPast) {
    const bannerText = getActiveBannerMessage(timeLeft.now);

    return (
      <div className="bg-gradient-to-r from-rose-600 via-amber-600 to-emerald-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg mb-4 border border-rose-500/30">
        <div className="flex items-center gap-2.5">
          <Compass className="w-6 h-6 text-amber-200 animate-spin-slow shrink-0" />
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 block">
              Estado Activo del Viaje 🌸
            </span>
            <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
              {bannerText}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-r from-rose-950/90 via-slate-900 to-slate-900 border-2 border-rose-500/30 text-white p-3.5 rounded-2xl shadow-lg mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden">
      {/* 2.1 Ambient Anime Floating Clouds with Blinking Eyes in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        {/* Floating Cloud 1 */}
        <div className="absolute top-1 left-8 flex items-center gap-0.5 animate-cloud-1">
          <span className="text-xl">☁️</span>
          <span className="text-[9px] font-black -ml-4 mt-1 animate-cloud-eye">● ●</span>
        </div>
        {/* Floating Cloud 2 */}
        <div className="absolute bottom-1 right-12 flex items-center gap-0.5 animate-cloud-2">
          <span className="text-2xl">☁️</span>
          <span className="text-[10px] font-black -ml-5 mt-1 animate-cloud-eye">◕ ◕</span>
        </div>
      </div>

      {/* 2.1 Floating Kawaii Airplane Crossing Every 30s with Sparkle/Heart Trail */}
      <div className="absolute top-1 left-0 w-full pointer-events-none z-10 overflow-hidden">
        <div className="inline-flex items-center gap-1 animate-airplane whitespace-nowrap text-xs">
          <span className="text-rose-300 drop-shadow-xs">✨💖✨</span>
          <span className="text-base transform rotate-12">✈️</span>
        </div>
      </div>

      {/* Content Header Info */}
      <div className="flex items-center gap-2.5 z-10 relative">
        <Timer className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 block">
            Cuenta Atrás hasta el Despegue (Málaga AGP)
          </span>
          <span className="text-xs font-bold text-slate-300">
            20 Dic 2026 • 13:00 CET
          </span>
        </div>
      </div>

      {/* Timer Digits with 4-Point Sparkles */}
      <div className="flex items-center gap-2 self-center sm:self-auto z-10 relative">
        <div className="flex items-center gap-1.5">
          {/* Days */}
          <div className="relative bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[44px]">
            <span className="absolute -top-1.5 -right-1.5 text-[10px] animate-sparkle-1 pointer-events-none">✨</span>
            <span className="text-sm font-black text-amber-400 block leading-tight">{timeLeft.days}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Días</span>
          </div>

          <span className="text-xs font-black text-rose-400">:</span>

          {/* Hours */}
          <div className="relative bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[40px]">
            <span className="text-sm font-black text-white block leading-tight">{timeLeft.hours}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Horas</span>
          </div>

          <span className="text-xs font-black text-rose-400">:</span>

          {/* Minutes */}
          <div className="relative bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[40px]">
            <span className="absolute -bottom-1 -left-1 text-[10px] animate-sparkle-2 pointer-events-none">✨</span>
            <span className="text-sm font-black text-white block leading-tight">{timeLeft.minutes}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Min</span>
          </div>

          <span className="text-xs font-black text-rose-400">:</span>

          {/* Seconds */}
          <div className="relative bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[40px]">
            <span className="text-sm font-black text-rose-400 block leading-tight">{timeLeft.seconds}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">Seg</span>
          </div>
        </div>
      </div>
    </div>
  );
};
