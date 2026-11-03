import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Store,
  Sparkles,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square
} from 'lucide-react';
import {
  SEASONAL_ALERTS,
  COMMERCIAL_PATTERNS,
  SeasonalAlert,
  CommercialPattern,
  isNewYearSpecialPeriod
} from '../data/holidayData';
import { getDualTimeData, DualTimeState } from '../services/timeService';

interface JapanScheduleRadarWidgetProps {
  initialExpandedAlertId?: string;
}

interface SurvivalCheckItem {
  id: string;
  label: string;
  description: string;
}

const SURVIVAL_CHECKLIST: SurvivalCheckItem[] = [
  {
    id: 'check-cash',
    label: 'Efectivo retirado en yenes',
    description: 'Bancos cerrados del 29 Dic al 3 Ene. Llevad efectivo o usad cajeros 7-Eleven.'
  },
  {
    id: 'check-dinner',
    label: 'Cena Nochevieja & Provisiones Konbini',
    description: 'Muchos restaurantes cierran el 31 Dic noche. Reservad o comprad en konbini.'
  },
  {
    id: 'check-schedules',
    label: 'Horarios de Museos y Trenes revisados',
    description: 'Grandes almacenes cierran a las 18:00 el 31 Dic y todo el 1 Ene. Trenes con horario festivo.'
  },
  {
    id: 'check-hatsumode',
    label: 'Santuario localizado para Hatsumode',
    description: 'Visita de Año Nuevo (1-3 Ene). Id al amanecer o al atardecer para evitar aglomeraciones.'
  }
];

const CHECKLIST_STORAGE_KEY = 'japan_shogatsu_survival_checklist';

export const JapanScheduleRadarWidget: React.FC<JapanScheduleRadarWidgetProps> = ({
  initialExpandedAlertId
}) => {
  const [dualTime, setDualTime] = useState<DualTimeState>(() => getDualTimeData());
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(
    initialExpandedAlertId || 'alert-admin-closure'
  );
  const [expandedPatternId, setExpandedPatternId] = useState<string | null>('cp-depato');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('all');

  // Survival checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleCheckItem = (id: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Fallback
      }
      return updated;
    });
  };

  const completedChecksCount = Object.values(checkedItems).filter(Boolean).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setDualTime(getDualTimeData());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isCurrentDateInNewYear = isNewYearSpecialPeriod();

  // Key trip dates with holiday/schedule implications
  const tripKeyDates = [
    { label: 'Todos', value: 'all' },
    { label: '29 Dic - 3 Ene (Cierre Admin)', value: 'closure' },
    { label: '31 Dic (Nochevieja)', value: '2026-12-31' },
    { label: '1 Ene (Gantan / Hatsumode)', value: '2027-01-01' },
    { label: '2 Ene (Reapertura Fukubukuro)', value: '2027-01-02' },
    { label: '11 Ene (Seijin no Hi)', value: '2027-01-11' }
  ];

  const filteredAlerts: SeasonalAlert[] = SEASONAL_ALERTS.filter((alert) => {
    if (selectedDateFilter === 'all') return true;
    if (selectedDateFilter === 'closure') {
      return (
        alert.id === 'alert-admin-closure' ||
        alert.id === 'alert-gantan-new-year' ||
        alert.id === 'alert-hatsumode-crowds'
      );
    }
    return selectedDateFilter >= alert.startDate && selectedDateFilter <= alert.endDate;
  });

  return (
    <div className="space-y-6">
      {/* 2. Visual Box specified in PRD Section 2 */}
      <section className="bg-white dark:bg-slate-800 border-2 border-rose-300 dark:border-rose-900 rounded-3xl p-5 shadow-lg space-y-5 overflow-hidden relative">
        {/* Radar Title Bar */}
        <div className="bg-slate-900 text-white -m-5 p-4 mb-4 flex items-center justify-between border-b border-rose-500/30">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl animate-pulse">⏰</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block">
                Radar Temporal de Japón
              </span>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                HORARIOS Y FESTIVOS (INVIERNO & SHŌGATSU)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-800 text-[10px] font-black text-rose-300">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            <span>En vivo</span>
          </div>
        </div>

        {/* Dual Time Summary Bar (Spain CET vs Japan JST) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Spain */}
          <div className="bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇪🇸</span>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block leading-tight">
                  España (CET)
                </span>
                <span className="text-sm font-mono font-black text-slate-900 dark:text-white">
                  {dualTime.spain.timeStr} ({dualTime.spain.dayName})
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-900">
                {dualTime.spain.periodLabel}
              </span>
            </div>
          </div>

          {/* Japan */}
          <div className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇯🇵</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400 block leading-tight">
                    Japón (JST)
                  </span>
                  <span className="text-[9px] font-bold text-rose-500 bg-white/80 dark:bg-slate-900 px-1.5 py-0.2 rounded-sm border border-rose-200">
                    ⏱️ Desfase: +{dualTime.diffHours}h
                  </span>
                </div>
                <span className="text-sm font-mono font-black text-slate-900 dark:text-white">
                  {dualTime.japan.timeStr} ({dualTime.japan.dayName})
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded-md border border-rose-300 dark:border-rose-800">
                {dualTime.japan.periodLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Quick PRD Summary Badge Card */}
        <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-purple-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 p-4 rounded-2xl border border-amber-200 dark:border-rose-900 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-black text-slate-800 dark:text-slate-100">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Guía Rápida de Supervivencia en Temporada Invernal</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
            <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
              <strong className="text-rose-600 dark:text-rose-400 block mb-0.5">🏦 29 Dic - 3 Ene:</strong>
              Oficinas y bancos cerrados. Usad cajeros de Konbinis.
            </div>
            <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
              <strong className="text-rose-600 dark:text-rose-400 block mb-0.5">🛍️ 1 de Enero (Gantan):</strong>
              Cierre masivo de grandes almacenes. Reabren el día 2 con Fukubukuro.
            </div>
            <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
              <strong className="text-rose-600 dark:text-rose-400 block mb-0.5">⛩️ 1 al 3 de Enero:</strong>
              Multitudes masivas en templos (Hatsumode). ¡Madrugar o atardecer!
            </div>
          </div>
        </div>

        {/* Contextual Warning if currently in New Year window */}
        {isCurrentDateInNewYear && (
          <div className="bg-rose-600 text-white p-3.5 rounded-2xl flex items-center gap-3 shadow-md">
            <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 animate-bounce" />
            <div className="text-xs">
              <strong className="font-black block text-amber-200">
                ⚠️ Período Crítico de Año Nuevo Activo en Japón (29 Dic - 3 Ene)
              </strong>
              <span>
                Comercios con horarios especiales o cerrados. Verificad aperturas antes de desplazaros y confiad en los Konbinis 24/7.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Idea 3: Mini-checklist interactivo de supervivencia de Fin de Año */}
      <section className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 dark:from-slate-850 dark:via-slate-800 dark:to-slate-850 border-2 border-rose-200 dark:border-rose-900/60 rounded-3xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎒</span>
            <div>
              <h3 className="text-xs font-black uppercase text-slate-800 dark:text-slate-100 tracking-wider">
                Checklist Familiar de Fin de Año (Shōgatsu)
              </h3>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                4 comprobaciones clave para evitar imprevistos
              </p>
            </div>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-600 text-white">
            {completedChecksCount} / {SURVIVAL_CHECKLIST.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SURVIVAL_CHECKLIST.map((item) => {
            const isDone = !!checkedItems[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleCheckItem(item.id)}
                className={`text-left p-3 rounded-2xl border transition-all flex items-start gap-2.5 min-h-[48px] active:scale-98 ${
                  isDone
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 opacity-90'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                }`}
              >
                <div className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400">
                  {isDone ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <div
                    className={`text-xs font-black ${
                      isDone
                        ? 'text-emerald-800 dark:text-emerald-300 line-through'
                        : 'text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Interactive Filter Pills for Date Tracking */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Alertas de Cierre Estacional (Diciembre - Enero)
            </h3>
          </div>
          <span className="text-[10px] font-bold text-slate-400">
            {filteredAlerts.length} de {SEASONAL_ALERTS.length} alertas
          </span>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {tripKeyDates.map((item) => (
            <button
              key={item.value}
              onClick={() => setSelectedDateFilter(item.value)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-black shrink-0 whitespace-nowrap min-h-[36px] transition-all active:scale-95 ${
                selectedDateFilter === item.value
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Seasonal Alerts Cards */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const isExpanded = expandedAlertId === alert.id;

            return (
              <article
                key={alert.id}
                className={`bg-white dark:bg-slate-800 border-2 rounded-3xl p-4 transition-all shadow-xs ${
                  alert.level === 'critical'
                    ? 'border-rose-400 dark:border-rose-900/80 hover:border-rose-500'
                    : alert.level === 'warning'
                    ? 'border-amber-400 dark:border-amber-900/80 hover:border-amber-500'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {/* Header row click to expand/collapse */}
                <button
                  onClick={() => setExpandedAlertId(isExpanded ? null : alert.id)}
                  className="w-full text-left flex items-start justify-between gap-3 min-h-[44px]"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                        {alert.dateRange}
                      </span>
                      <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                        {alert.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 dark:text-white pt-0.5">
                      {alert.title}
                    </h4>
                  </div>

                  <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Summary snippet */}
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {alert.summary}
                </p>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700 space-y-3 animate-in fade-in duration-200 text-xs">
                    {/* Closed vs Open columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Closed */}
                      {alert.closedItems.length > 0 && (
                        <div className="bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 p-3 rounded-2xl space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 dark:text-rose-300">
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                            <span>¿Qué CIERRA?</span>
                          </div>
                          <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                            {alert.closedItems.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-rose-500 font-black">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Open */}
                      {alert.openItems.length > 0 && (
                        <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 p-3 rounded-2xl space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-300">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>¿Qué SÍ ABRE?</span>
                          </div>
                          <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                            {alert.openItems.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-500 font-black">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Family Tips */}
                    {alert.tips.length > 0 && (
                      <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 p-3 rounded-2xl space-y-1 text-[11px]">
                        <span className="font-black text-amber-800 dark:text-amber-300 flex items-center gap-1">
                          💡 Consejos para la Familia:
                        </span>
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside">
                          {alert.tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* PRD Section 3: Commercial Patterns in Winter */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Horarios Comerciales Típicos en Invierno
          </h3>
        </div>

        <div className="space-y-3">
          {COMMERCIAL_PATTERNS.map((pattern) => {
            const isPatternExpanded = expandedPatternId === pattern.id;

            return (
              <article
                key={pattern.id}
                className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-4 shadow-xs space-y-2.5 transition-all hover:border-amber-400"
              >
                <button
                  onClick={() => setExpandedPatternId(isPatternExpanded ? null : pattern.id)}
                  className="w-full text-left flex items-start justify-between gap-3 min-h-[44px]"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl p-2 rounded-2xl bg-slate-100 dark:bg-slate-700 shrink-0">
                      {pattern.icon}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">
                          {pattern.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded-lg border border-rose-200 dark:border-rose-900 inline-block mt-1">
                        ⏰ Horario habitual: {pattern.typicalHours}
                      </span>
                    </div>
                  </div>

                  <div className="p-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 shrink-0">
                    {isPatternExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {pattern.description}
                </p>

                {isPatternExpanded && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-2.5 text-xs animate-in fade-in duration-200">
                    {pattern.winterException && (
                      <div className="bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 p-2.5 rounded-xl text-[11px] text-slate-800 dark:text-rose-200">
                        <strong className="text-rose-700 dark:text-rose-300 block mb-0.5">
                          ❄️ Excepción de Invierno / Fin de Año:
                        </strong>
                        {pattern.winterException}
                      </div>
                    )}

                    <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-[11px]">
                      <span className="font-black text-slate-700 dark:text-slate-300 block">
                        💡 Consejos prácticos de compra & consumo:
                      </span>
                      <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                        {pattern.tips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
