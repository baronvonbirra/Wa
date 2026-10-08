import React, { useState, useEffect } from 'react';
import { Timer, Calendar, Clock } from 'lucide-react';

export const CountdownWidget: React.FC = () => {
  const targetDate = new Date('2026-12-20T00:00:00');

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
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
    return (
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-md mb-4 border border-emerald-500/30">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-200" />
          <span className="text-xs font-black uppercase tracking-wider">¡El viaje ha comenzado! ✈️🇯🇵</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-rose-950/90 via-slate-900 to-slate-900 border-2 border-rose-500/30 text-white p-3.5 rounded-2xl shadow-lg mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Timer className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 block">
            Cuenta Atrás hasta el Viaje
          </span>
          <span className="text-xs font-bold text-slate-300">
            20 de Diciembre de 2026
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 self-center sm:self-auto">
        <div className="bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[48px]">
          <span className="text-sm font-black text-amber-400 block leading-tight">{timeLeft.days}</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase">Días</span>
        </div>
        <span className="text-xs font-black text-rose-400">:</span>
        <div className="bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[44px]">
          <span className="text-sm font-black text-white block leading-tight">{timeLeft.hours}</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase">Horas</span>
        </div>
        <span className="text-xs font-black text-rose-400">:</span>
        <div className="bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[44px]">
          <span className="text-sm font-black text-white block leading-tight">{timeLeft.minutes}</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase">Min</span>
        </div>
        <span className="text-xs font-black text-rose-400">:</span>
        <div className="bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[44px]">
          <span className="text-sm font-black text-rose-400 block leading-tight">{timeLeft.seconds}</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase">Seg</span>
        </div>
      </div>
    </div>
  );
};
