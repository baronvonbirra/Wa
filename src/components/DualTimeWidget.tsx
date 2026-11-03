import React, { useState, useEffect } from 'react';
import { Clock, Sun, Moon, PhoneCall, Sparkles, Sliders, Info, Zap } from 'lucide-react';
import { getDualTimeData, projectHours, DualTimeState } from '../services/timeService';

export const DualTimeWidget: React.FC = () => {
  const [timeState, setTimeState] = useState<DualTimeState>(() => getDualTimeData());
  const [sliderJpHour, setSliderJpHour] = useState<number>(() => {
    return new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour12: false, hour: 'numeric' })
      ? parseInt(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour12: false, hour: 'numeric' }), 10)
      : 12;
  });

  // Ticking interval every 1 second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeState(getDualTimeData());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { spain, japan, diffHours, callingSuitability, callingSuitabilityLabel, callingSuitabilityReason } = timeState;

  // Slider projected values
  const projected = projectHours(sliderJpHour, diffHours);

  // Key routines comparison matrix
  const routineMoments = [
    {
      label: 'Desayuno Japón / Madrugada España',
      jpTime: '08:00',
      spTime: `${(8 - diffHours + 24) % 24}:00 (Noche)`,
      desc: 'En Japón desayunas onigiri o buffet de hotel; en España casi todos duermen.'
    },
    {
      label: 'Almuerzo Japón / Despertar España',
      jpTime: '13:00',
      spTime: `${(13 - diffHours + 24) % 24}:00 (Mañana)`,
      desc: 'Momento de ramen o tonkatsu; España recién empieza la jornada escolar/laboral.'
    },
    {
      label: 'Tarde en Tokio / Mediodía en España (¡Llamadas!)',
      jpTime: '19:00',
      spTime: `${(19 - diffHours + 24) % 24}:00 (Mediodía)`,
      desc: 'Paseando por Shibuya o cenando; tus familiares en España están comiendo. ¡Mejor momento para videollamada!'
    },
    {
      label: 'Noche en Japón / Tarde en España',
      jpTime: '23:00',
      spTime: `${(23 - diffHours + 24) % 24}:00 (Tarde)`,
      desc: 'A descansar tras caminar 20.000 pasos; España aún tiene toda la tarde por delante.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Dual Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card Spain */}
        <div className={`p-5 rounded-3xl border-2 transition-all relative overflow-hidden shadow-lg ${
          spain.isDaytime
            ? 'bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10 dark:from-amber-950/40 dark:via-orange-950/20 dark:to-rose-950/30 border-amber-300 dark:border-amber-700/60'
            : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border-indigo-700/60 shadow-indigo-950/50'
        }`}>
          {/* Subtle Ambient Glow */}
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇪🇸</span>
              <div>
                <h3 className={`text-sm font-black tracking-wide uppercase ${spain.isDaytime ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                  España (Madrid)
                </h3>
                <span className={`text-[10px] font-bold ${spain.isDaytime ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300'}`}>
                  {spain.timeZoneAbbr} • UTC+1 / +2
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-white/90 dark:bg-slate-800/90 shadow-xs border border-slate-200 dark:border-slate-700">
              {spain.isDaytime ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                  <span className="text-amber-700 dark:text-amber-300">Día</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-indigo-600 dark:text-indigo-300">Noche</span>
                </>
              )}
            </div>
          </div>

          {/* Time Display */}
          <div className="my-4 flex flex-col items-center justify-center text-center">
            <div className={`text-4xl sm:text-5xl font-black tracking-tight font-mono ${spain.isDaytime ? 'text-slate-900 dark:text-white' : 'text-amber-100'}`}>
              {spain.timeStr}
            </div>
            <div className={`text-xs font-bold mt-2 ${spain.isDaytime ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300'}`}>
              📅 {spain.dateStr}
            </div>
          </div>

          {/* Footer Period & Activity Badge */}
          <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className={`font-extrabold px-2.5 py-0.5 rounded-lg border w-fit ${
              spain.isDaytime
                ? 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 border-amber-200 dark:border-amber-900'
                : 'text-amber-200 bg-amber-950/60 border-amber-700/60'
            }`}>
              {spain.periodLabel}
            </span>
            <span className={`text-[11px] font-semibold ${spain.isDaytime ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300'}`}>
              {spain.activityStatus}
            </span>
          </div>
        </div>

        {/* Card Japan */}
        <div className={`p-5 rounded-3xl border-2 transition-all relative overflow-hidden shadow-lg ${
          japan.isDaytime
            ? 'bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-amber-500/10 dark:from-rose-950/40 dark:via-pink-950/20 dark:to-amber-950/30 border-rose-300 dark:border-rose-700/60 text-slate-900 dark:text-white'
            : 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border-purple-500/60 shadow-purple-950/50'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇯🇵</span>
              <div>
                <h3 className={`text-sm font-black tracking-wide uppercase ${japan.isDaytime ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                  Japón (Tokio / Kioto)
                </h3>
                <span className={`text-[10px] font-bold ${japan.isDaytime ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300'}`}>
                  {japan.timeZoneAbbr} • UTC+9 (+{diffHours}h vs España)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black bg-white/90 dark:bg-slate-800/90 shadow-xs border border-slate-200 dark:border-slate-700">
              {japan.isDaytime ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
                  <span className="text-rose-700 dark:text-rose-300">Día</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-purple-600 dark:text-purple-300">Noche</span>
                </>
              )}
            </div>
          </div>

          {/* Time Display */}
          <div className="my-4 flex flex-col items-center justify-center text-center">
            <div className={`text-4xl sm:text-5xl font-black tracking-tight font-mono ${japan.isDaytime ? 'text-slate-900 dark:text-white' : 'text-purple-100'}`}>
              {japan.timeStr}
            </div>
            <div className={`flex items-center gap-2 text-xs font-bold mt-2 ${japan.isDaytime ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300'}`}>
              <span>📅 {japan.dateStr}</span>
              {japan.kanjiDateStr && (
                <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-md font-black border border-rose-400/40 text-[11px]">
                  {japan.kanjiDateStr}
                </span>
              )}
            </div>
          </div>

          {/* Footer Period & Activity Badge */}
          <div className="pt-3 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className={`font-extrabold px-2.5 py-0.5 rounded-lg border w-fit ${
              japan.isDaytime
                ? 'text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 border-rose-200 dark:border-rose-900'
                : 'text-purple-200 bg-purple-900/60 border-purple-700/60'
            }`}>
              {japan.periodLabel}
            </span>
            <span className={`text-[11px] font-semibold ${japan.isDaytime ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300'}`}>
              {japan.activityStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Calling Suitability Banner */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-xs ${
        callingSuitability === 'great'
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
          : callingSuitability === 'acceptable'
          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100'
          : 'bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl shrink-0 ${
            callingSuitability === 'great'
              ? 'bg-emerald-600 text-white'
              : callingSuitability === 'acceptable'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-600 text-white'
          }`}>
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider">
                {callingSuitabilityLabel}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {callingSuitabilityReason}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex flex-col text-right shrink-0">
          <span className="text-[10px] font-black uppercase text-slate-400">Diferencia horaria</span>
          <span className="text-sm font-black text-rose-600 dark:text-rose-400">+{diffHours}h en Tokio</span>
        </div>
      </div>

      {/* Interactive Time Slider Converter */}
      <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-rose-500" />
            <h2 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider">
              Simulador Horario: «¿Qué hora será en España si en Japón son las...?»
            </h2>
          </div>
          <button
            onClick={() => setSliderJpHour(japan.hours)}
            className="text-[11px] font-black text-rose-600 dark:text-rose-400 hover:underline px-2 py-1 bg-rose-50 dark:bg-rose-950/60 rounded-lg border border-rose-200 dark:border-rose-900"
          >
            Volver a la hora actual
          </button>
        </div>

        <div className="space-y-4">
          {/* Slider input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>00:00 (Medianoche)</span>
              <span>12:00 (Mediodía)</span>
              <span>23:00 (Noche)</span>
            </div>
            <input
              type="range"
              min="0"
              max="23"
              step="1"
              value={sliderJpHour}
              onChange={(e) => setSliderJpHour(parseInt(e.target.value, 10))}
              className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
          </div>

          {/* Interactive Result Comparison Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-md">
              <span className="text-[10px] font-black uppercase text-rose-400 tracking-wider mb-1">
                🇯🇵 Si en Japón son las:
              </span>
              <span className="text-3xl font-black font-mono text-white">
                {projected.japanFormatted}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 font-semibold">
                {sliderJpHour >= 6 && sliderJpHour < 18 ? '☀️ Horario diurno' : '🌙 Horario nocturno'}
              </span>
            </div>

            <div className="bg-rose-600 text-white p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-md shadow-rose-900/20">
              <span className="text-[10px] font-black uppercase text-rose-200 tracking-wider mb-1">
                🇪🇸 En España serán las:
              </span>
              <span className="text-3xl font-black font-mono text-white">
                {projected.spainFormatted}
              </span>
              <span className="text-[11px] text-rose-200 mt-1 font-bold">
                {projected.dayRelativeLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Routine Synchronisation Matrix */}
      <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
          <Clock className="w-4 h-4 text-amber-500" />
          <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Sincronización del Día a Día: Japón vs. España
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {routineMoments.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 p-3.5 rounded-2xl space-y-1.5 hover:border-amber-400 dark:hover:border-amber-600 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-800 dark:text-slate-200">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold">
                <span className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-lg border border-rose-200 dark:border-rose-900">
                  🇯🇵 {item.jpTime}
                </span>
                <span className="text-slate-400">➔</span>
                <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-900">
                  🇪🇸 {item.spTime}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Practical Travel Tips for 8h Time Difference */}
      <section className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-black text-rose-700 dark:text-rose-300">
          <Zap className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Consejos para Dominar la Diferencia Horaria (+8 Horas)</span>
        </div>
        <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300 list-disc list-inside">
          <li>
            <strong>Ventana dorada para llamar a casa:</strong> De 18:30 a 22:30 hora de Japón (serán entre las 10:30 y 14:30 en España). Coincide con tu descanso tras turistear y sus horas activas.
          </li>
          <li>
            <strong>Primeras 48h con Jet Lag:</strong> Te despertarás sobre las 04:00 o 05:00 de la mañana. ¡Aprovéchalo! Visita santuarios al amanecer (como Fushimi Inari o Senso-ji) antes de que lleguen multitudes.
          </li>
          <li>
            <strong>Último metro en Tokio/Kioto:</strong> Los metros dejan de operar entre las 23:30 y las 00:30. No hay metro nocturno 24 horas. Si estás cenando tarde, vigila la hora.
          </li>
          <li>
            <strong>Horarios comerciales:</strong> Las tiendas y grandes almacenes suelen abrir a las 10:00 u 11:00 y cierran a las 20:00 o 21:00. Los Konbinis (7-Eleven, Lawson, FamilyMart) nunca cierran.
          </li>
        </ul>
      </section>
    </div>
  );
};
