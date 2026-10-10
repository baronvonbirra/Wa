import React, { useState, useMemo } from 'react';
import { TRIP_DATA, ACCOMMODATIONS_MAP } from '../data/tripData';
import { useTripState } from '../hooks/useTripState';
import { useGoshuinPassport } from '../hooks/useGoshuinPassport';
import { JapaneseAddressModal } from './JapaneseAddressModal';
import { CountdownWidget } from './CountdownWidget';
import { WeatherWidget } from './WeatherWidget';
import { AprenderModal } from './AprenderModal';
import { MascotsWidget } from './MascotsWidget';
import { SakuraConfetti } from './SakuraConfetti';
import { GoshuinPassportModal, FEATURED_BADGES } from './GoshuinPassportModal';
import { Accommodation, DayItinerary, Activity, LearnInfo } from '../types/itinerary';
import {
  Search,
  CheckCircle2,
  Circle,
  MapPin,
  Building,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Filter,
  ShoppingBag,
  UtensilsCrossed,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Award,
  Database,
  HardDrive
} from 'lucide-react';

function getActivityLearnInfo(act: Activity, dayTitle: string): LearnInfo {
  if (act.learnInfo) return act.learnInfo;

  const typeLabels: Record<string, string> = {
    transit: 'Transporte y Traslado',
    sights: 'Hito Turístico y Cultural',
    shopping: 'Zona Comercial y Compras',
    food: 'Gastronomía Local',
    theme_park: 'Parque Temático',
    culture: 'Patrimonio e Historia',
    hotel: 'Check-in & Alojamiento'
  };

  const catName = typeLabels[act.type || 'sights'] || 'Actividad Destacada';

  return {
    title: act.title,
    subtitle: `${catName} • ${dayTitle}`,
    summary: `Hito clave planificado en ${act.title}. Una parada especial para disfrutar en familia de la cultura, historia y ambiente de Japón.`,
    pills: [
      {
        label: 'Dato Histórico / Contexto',
        text: `Ubicado en el itinerario de ${dayTitle}. Este espacio refleja la armonía entre tradición y modernidad característica de las ciudades japonesas.`,
        type: 'historical'
      },
      {
        label: 'Curiosidad Cultural',
        text: 'En espacios públicos de Japón se premia la tranquilidad y el orden. Recordad hablar en tono pausado y mantener limpias las áreas comunes.',
        type: 'cultural'
      },
      {
        label: 'Dato Práctico / Divertido',
        text: `Podéis consultar la localización exacta en tiempo real usando el botón de Google Maps situado junto a esta tarjeta.`,
        type: 'funFact'
      }
    ]
  };
}

export const ItineraryModule: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(0);
  const [activeDayDate, setActiveDayDate] = useState<string>(TRIP_DATA.stages[0].days[0].date);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterState, setFilterState] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);

  // Modal Learn state
  const [selectedLearnInfo, setSelectedLearnInfo] = useState<LearnInfo | null>(null);

  // Goshuin Passport hook & modal state
  const { stamps, addStamp } = useGoshuinPassport();
  const [isGoshuinModalOpen, setIsGoshuinModalOpen] = useState<boolean>(false);

  // Sakura confetti trigger state & mode
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [confettiMode, setConfettiMode] = useState<'normal' | 'dayCleared'>('normal');

  // Expandable cards state for Shops and Restaurants
  const [showShops, setShowShops] = useState<boolean>(true);
  const [showRestaurants, setShowRestaurants] = useState<boolean>(true);

  const { completed, toggleActivity, isActivityCompleted, syncError, isSupabaseConfigured } = useTripState();

  const currentStage = useMemo(() => {
    return TRIP_DATA.stages.find((s) => s.stage_id === activeStageId) || TRIP_DATA.stages[0];
  }, [activeStageId]);

  const currentDay: DayItinerary = useMemo(() => {
    const foundInStage = currentStage.days.find((d) => d.date === activeDayDate);
    if (foundInStage) return foundInStage;
    return currentStage.days[0];
  }, [currentStage, activeDayDate]);

  const isCurrentDayCleared = useMemo(() => {
    if (!currentDay || currentDay.activities.length === 0) return false;
    return currentDay.activities.every((act) => completed.includes(act.id));
  }, [currentDay, completed]);

  const handleToggleActivity = (actId: string) => {
    const wasCompleted = isActivityCompleted(actId);
    toggleActivity(actId);
    if (!wasCompleted) {
      const willCompleteDay = currentDay.activities.length > 0 &&
        currentDay.activities.every((act) => act.id === actId || completed.includes(act.id));

      if (willCompleteDay) {
        setConfettiMode('dayCleared');
      } else {
        setConfettiMode('normal');
      }
      setShowConfetti(true);
    }
  };

  const handleOpenLearnModal = (info: LearnInfo, stageName?: string) => {
    setSelectedLearnInfo(info);
    // Stamp Goshuin seal automatically!
    addStamp(info.title, info.subtitle, '💮', stageName || 'Japón 2026-2027');
  };

  const allDays = useMemo(() => {
    return TRIP_DATA.stages.flatMap((s) => s.days);
  }, []);

  const currentDayGlobalIndex = useMemo(() => {
    return allDays.findIndex((d) => d.date === currentDay.date);
  }, [allDays, currentDay]);

  const totalTripActivities = useMemo(() => {
    return allDays.reduce((acc, day) => acc + day.activities.length, 0);
  }, [allDays]);

  const completedTripActivities = useMemo(() => {
    return allDays.reduce((acc, day) => {
      const doneInDay = day.activities.filter((act) => completed.includes(act.id)).length;
      return acc + doneInDay;
    }, 0);
  }, [allDays, completed]);

  const totalStageActivities = useMemo(() => {
    return currentStage.days.reduce((acc, day) => acc + day.activities.length, 0);
  }, [currentStage]);

  const completedStageActivities = useMemo(() => {
    return currentStage.days.reduce((acc, day) => {
      const doneInDay = day.activities.filter((act) => completed.includes(act.id)).length;
      return acc + doneInDay;
    }, 0);
  }, [currentStage, completed]);

  const globalPercentage = Math.round((completedTripActivities / (totalTripActivities || 1)) * 100);
  const stagePercentage = Math.round((completedStageActivities / (totalStageActivities || 1)) * 100);

  const handleSelectStage = (stageId: number) => {
    setActiveStageId(stageId);
    const stageObj = TRIP_DATA.stages.find((s) => s.stage_id === stageId);
    if (stageObj && stageObj.days.length > 0) {
      setActiveDayDate(stageObj.days[0].date);
    }
  };

  const handlePrevDay = () => {
    if (currentDayGlobalIndex > 0) {
      const prevDayObj = allDays[currentDayGlobalIndex - 1];
      const parentStage = TRIP_DATA.stages.find((s) => s.days.some((d) => d.date === prevDayObj.date));
      if (parentStage) {
        setActiveStageId(parentStage.stage_id);
      }
      setActiveDayDate(prevDayObj.date);
    }
  };

  const handleNextDay = () => {
    if (currentDayGlobalIndex < allDays.length - 1) {
      const nextDayObj = allDays[currentDayGlobalIndex + 1];
      const parentStage = TRIP_DATA.stages.find((s) => s.days.some((d) => d.date === nextDayObj.date));
      if (parentStage) {
        setActiveStageId(parentStage.stage_id);
      }
      setActiveDayDate(nextDayObj.date);
    }
  };

  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const query = searchQuery.toLowerCase().trim();
    const results: { day: DayItinerary; stageName: string; matchedActivities: typeof currentDay.activities }[] = [];

    TRIP_DATA.stages.forEach((stage) => {
      stage.days.forEach((day) => {
        const matchesDayTitle = day.title.toLowerCase().includes(query);
        const matchedActs = day.activities.filter((act) => {
          const isDone = completed.includes(act.id);
          if (filterState === 'pending' && isDone) return false;
          if (filterState === 'completed' && !isDone) return false;
          return act.title.toLowerCase().includes(query) || matchesDayTitle;
        });

        if (matchedActs.length > 0) {
          results.push({
            day,
            stageName: stage.name,
            matchedActivities: matchedActs
          });
        }
      });
    });

    return results;
  }, [isSearching, searchQuery, completed, filterState]);

  const currentAccommodation = ACCOMMODATIONS_MAP[currentDay.accommodationId];

  const currentDayFilteredActivities = useMemo(() => {
    return currentDay.activities.filter((act) => {
      const isDone = isActivityCompleted(act.id);
      if (filterState === 'pending' && isDone) return false;
      if (filterState === 'completed' && !isDone) return false;
      return true;
    });
  }, [currentDay, filterState, isActivityCompleted]);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-4 pb-28 font-sans text-slate-800 dark:text-slate-100">
      {/* Sakura Petals & Candy Confetti Effect */}
      <SakuraConfetti trigger={showConfetti} mode={confettiMode} onComplete={() => setShowConfetti(false)} />

      {/* Dynamic Countdown / Active Trip Banner Widget */}
      <CountdownWidget />

      {/* Travel Mascot Guides Widget */}
      <MascotsWidget />

      {/* Top Trip Summary & Progress Header */}
      <section className="bg-slate-900 text-white p-5 rounded-3xl mb-6 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇯🇵</span>
              <h1 className="text-xl font-black text-rose-400 tracking-tight">{TRIP_DATA.title}</h1>
            </div>
            <p className="text-xs font-bold text-slate-400 mt-1">
              20 Diciembre 2026 — 13 Enero 2027 • 25 Días de Aventura
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsGoshuinModalOpen(true)}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-black transition-all active:scale-95"
              title="Abrir Pasaporte Kawaii de Sellos Goshuin"
            >
              <Award className="w-4 h-4 text-rose-400" />
              <span>
                Goshuin (
                {
                  FEATURED_BADGES.filter((b) => b.isUnlocked(completed)).length +
                    stamps.filter(
                      (s) => !FEATURED_BADGES.some((b) => b.name.toLowerCase() === s.title.toLowerCase())
                    ).length
                }
                ) 💮
              </span>
            </button>

            <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-2xl flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-amber-300">{globalPercentage}% Completado</span>
            </div>

            {isSupabaseConfigured ? (
              <div className="bg-emerald-950/80 border border-emerald-500/40 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-black text-emerald-300" title="Sincronizado con Supabase BD">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>BD Sincronizada</span>
              </div>
            ) : (
              <div className="bg-amber-950/80 border border-amber-500/40 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-black text-amber-300" title="Almacenamiento en LocalStorage (Sin BD configurada)">
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                <span>Modo Local</span>
              </div>
            )}
          </div>
        </div>

        {/* Dual Progress Bars */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-1">
              <span>Progreso Global del Viaje</span>
              <span>{completedTripActivities} / {totalTripActivities} actividades</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${globalPercentage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-1">
              <span>Etapa Activa: {currentStage.name}</span>
              <span>{completedStageActivities} / {totalStageActivities} ({stagePercentage}%)</span>
            </div>
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${stagePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Search & Filter Controls */}
      <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 mb-6 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar templo, restaurante, ciudad o actividad en todo el itinerario..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-rose-500 rounded-xl text-xs font-medium focus:outline-hidden transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* State Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Estado:
          </span>
          <button
            onClick={() => setFilterState('all')}
            className={`px-3 py-1 rounded-xl text-[11px] font-black shrink-0 min-h-[36px] transition-all ${
              filterState === 'all'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
            }`}
          >
            Todas ({totalTripActivities})
          </button>
          <button
            onClick={() => setFilterState('pending')}
            className={`px-3 py-1 rounded-xl text-[11px] font-black shrink-0 min-h-[36px] transition-all ${
              filterState === 'pending'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
            }`}
          >
            Pendientes ({totalTripActivities - completedTripActivities})
          </button>
          <button
            onClick={() => setFilterState('completed')}
            className={`px-3 py-1 rounded-xl text-[11px] font-black shrink-0 min-h-[36px] transition-all ${
              filterState === 'completed'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
            }`}
          >
            Completadas ({completedTripActivities})
          </button>
        </div>
      </section>

      {/* Contextual Weather Widget */}
      {!isSearching && currentDay.location && currentDay.location !== 'Málaga / Vuelo' && (
        <WeatherWidget locationKey={currentDay.location} />
      )}

      {/* Main Content Area: Search Mode vs. Normal Stage & Day View */}
      {isSearching ? (
        /* Search Mode View */
        <main className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-sm font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Resultados de Búsqueda ({searchResults.reduce((acc, r) => acc + r.matchedActivities.length, 0)})
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              Volver al itinerario
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-3xl text-center">
              <span className="text-4xl block mb-2">🔍</span>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                No se encontraron actividades que coincidan con &quot;{searchQuery}&quot;.
              </p>
            </div>
          ) : (
            searchResults.map(({ day, stageName, matchedActivities }) => (
              <div
                key={day.date}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 block">{stageName}</span>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">{day.title}</h3>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveDayDate(day.date);
                      const pStage = TRIP_DATA.stages.find((s) => s.days.some((d) => d.date === day.date));
                      if (pStage) setActiveStageId(pStage.stage_id);
                    }}
                    className="text-[11px] font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 px-2.5 py-1 rounded-xl hover:bg-rose-100 transition-all"
                  >
                    Ver Día {day.dayIndex} ({day.shortDate})
                  </button>
                </div>

                <div className="space-y-2">
                  {matchedActivities.map((act) => {
                    const isDone = isActivityCompleted(act.id);
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      act.locationQuery
                    )}`;

                    return (
                      <div
                        key={act.id}
                        className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60"
                      >
                        <button
                          onClick={() => handleToggleActivity(act.id)}
                          className="flex items-center gap-3 text-left min-h-[44px] flex-grow active:scale-98 transition-all"
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                          )}
                          <span
                            className={`text-xs font-bold ${
                              isDone
                                ? 'line-through text-slate-400 dark:text-slate-500'
                                : 'text-slate-800 dark:text-slate-100'
                            }`}
                          >
                            {act.title}
                          </span>
                        </button>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleOpenLearnModal(getActivityLearnInfo(act, day.title), stageName)}
                            className="px-2.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 hover:bg-amber-200 font-extrabold text-[10px] flex items-center gap-1 border border-amber-200 dark:border-amber-900 active:scale-95 transition-all"
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            <span>Aprender</span>
                          </button>

                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 hover:scale-105 transition-all"
                            title="Abrir en Google Maps"
                          >
                            <MapPin className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </main>
      ) : (
        /* Normal Itinerary View */
        <main className="space-y-5">
          {/* Stage Selector Horizontal Scrollable Bar */}
          <nav className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin">
            {TRIP_DATA.stages.map((stage) => {
              const isSelected = stage.stage_id === activeStageId;
              return (
                <button
                  key={stage.stage_id}
                  onClick={() => handleSelectStage(stage.stage_id)}
                  className={`px-4 py-2.5 rounded-2xl whitespace-nowrap text-xs font-black transition-all flex flex-col items-start min-h-[48px] justify-center ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-900/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{stage.subtitle}: {stage.name}</span>
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-rose-200' : 'text-slate-400'}`}>
                    {stage.dateRange}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Sub-bar Horizontal Day Selector */}
          <div className="bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto scrollbar-thin border border-slate-200 dark:border-slate-700">
            {currentStage.days.map((day) => {
              const isSelectedDay = day.date === currentDay.date;
              return (
                <button
                  key={day.date}
                  onClick={() => setActiveDayDate(day.date)}
                  className={`px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap shrink-0 min-h-[44px] transition-all flex items-center gap-1.5 ${
                    isSelectedDay
                      ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-xs border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="text-[10px] opacity-70">
                    {day.dayIndex === 0 ? 'Día 0' : `Día ${day.dayIndex}`}
                  </span>
                  <span>{day.shortDate}</span>
                </button>
              );
            })}
          </div>

          {/* Day Card Header & Accommodation */}
          <article className={`bg-white dark:bg-slate-800 border-2 ${isCurrentDayCleared ? 'border-pink-400 shadow-md shadow-pink-200/50 dark:shadow-none' : 'border-slate-200 dark:border-slate-700'} rounded-3xl p-5 shadow-xs space-y-4 transition-all`}>
            {/* 2.3.B Day Cleared Floating Banner */}
            {isCurrentDayCleared && (
              <div className="bg-gradient-to-r from-pink-300 via-purple-300 via-yellow-200 via-emerald-200 to-sky-300 text-slate-900 font-black text-xs px-4 py-2.5 rounded-2xl flex items-center justify-center gap-2 shadow-sm animate-bounce border-2 border-pink-400/60 text-center">
                <span>✨ ¡DÍA COMPLETADO! SUGOI! 🌟</span>
              </div>
            )}

            {/* Cabecera del Día */}
            <div className={`border-b border-slate-100 dark:border-slate-700 pb-4 ${isCurrentDayCleared ? 'bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-sky-50/80 dark:from-pink-950/30 dark:to-purple-950/30 p-3 rounded-2xl border-2 border-pink-300/50' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                  {currentDay.dayIndex === 0 ? 'Etapa 0 • Día Especial' : `Día ${currentDay.dayIndex} de ${TRIP_DATA.totalDays - 1}`}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {currentDay.formattedDate}
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                {currentDay.title}
              </h2>
            </div>

            {/* Accommodation Card */}
            {currentAccommodation && (
              <div className="bg-amber-50/80 dark:bg-slate-850 border-2 border-amber-200/80 dark:border-amber-800/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-300 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    Alojamiento de esta noche
                  </span>
                  <h3 className="text-sm font-black text-slate-900 dark:text-amber-100">
                    {currentAccommodation.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {currentAccommodation.nearestStation}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedAccommodation(currentAccommodation)}
                  className="min-h-[48px] px-4 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all shrink-0"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Ver dirección en japonés</span>
                </button>
              </div>
            )}

            {/* Listado de Actividades / Puntos de Interés */}
            <div>
              <h3 className="text-xs uppercase font-black tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Ruta y Paradas ({currentDayFilteredActivities.length})</span>
                <span className="text-[10px] font-normal lowercase">Toque para marcar o aprender</span>
              </h3>

              {currentDayFilteredActivities.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-400">
                    No hay actividades con el filtro actual ({filterState}).
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {currentDayFilteredActivities.map((act) => {
                    const isDone = isActivityCompleted(act.id);
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      act.locationQuery
                    )}`;

                    return (
                      <div
                        key={act.id}
                        className="py-3 flex items-center justify-between gap-2 group hover:bg-slate-50/80 dark:hover:bg-slate-700/30 px-2 rounded-xl transition-all"
                      >
                        {/* Interactive Activity Row: Checkbox + Title */}
                        <div className="flex items-center gap-3 flex-grow min-h-[48px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleActivity(act.id);
                            }}
                            className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shrink-0 active:scale-90"
                            aria-label={`Marcar ${act.title} como ${isDone ? 'pendiente' : 'completada'}`}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                            ) : (
                              <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 group-hover:text-rose-500 transition-colors" />
                            )}
                          </button>

                          <button
                            onClick={() => handleOpenLearnModal(getActivityLearnInfo(act, currentDay.title), currentStage.name)}
                            className="text-left flex-grow active:scale-98 transition-all"
                          >
                            <span
                              className={`text-sm font-black leading-snug cursor-pointer ${
                                isDone
                                  ? 'line-through text-slate-400 dark:text-slate-500'
                                  : 'text-slate-800 dark:text-slate-100 hover:text-rose-600 dark:hover:text-rose-400'
                              }`}
                            >
                              {act.title}
                            </span>
                          </button>
                        </div>

                        {/* Actions: Learn Modal + Google Maps */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleOpenLearnModal(getActivityLearnInfo(act, currentDay.title), currentStage.name)}
                            className="min-h-[44px] px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/80 hover:bg-amber-100 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center gap-1 border border-amber-200 dark:border-amber-900 active:scale-95 transition-all"
                            title={`Aprender sobre ${act.title}`}
                          >
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span className="hidden sm:inline">¡Aprender!</span>
                          </button>

                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 hover:bg-rose-600 hover:text-white transition-all shrink-0 border border-rose-200/60 dark:border-rose-900 active:scale-95"
                            title="Abrir mapa en Google Maps"
                            aria-label={`Abrir mapa de ${act.title}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </article>

          {/* Integrated Daily Block: Shops & Recommended Commercial Places */}
          {currentDay.shops && currentDay.shops.length > 0 && (
            <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-xs space-y-3">
              <button
                onClick={() => setShowShops((prev) => !prev)}
                className="w-full flex items-center justify-between text-left min-h-[44px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-900">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      Tiendas Recomendadas del Día ({currentDay.shops.length})
                    </h3>
                    <p className="text-[11px] font-bold text-slate-400">
                      Comercios y tiendas clave de la zona visitada hoy
                    </p>
                  </div>
                </div>

                {showShops ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {showShops && (
                <div className="divide-y divide-slate-100 dark:divide-slate-700/60 pt-2 space-y-2">
                  {currentDay.shops.map((shop) => {
                    const shopMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      shop.locationQuery
                    )}`;

                    return (
                      <div
                        key={shop.id}
                        className="pt-2 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900 dark:text-white">
                              {shop.name}
                            </span>
                            <span className="text-[10px] font-black uppercase bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-900">
                              {shop.category}
                            </span>
                          </div>
                          {shop.note && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                              {shop.note}
                            </p>
                          )}
                        </div>

                        <a
                          href={shopMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 hover:bg-purple-600 hover:text-white transition-all shrink-0 border border-purple-200/60 dark:border-purple-900 active:scale-95"
                          title="Abrir tienda en Google Maps"
                          aria-label={`Abrir mapa de ${shop.name}`}
                        >
                          <MapPin className="w-4 h-4" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* Integrated Daily Block: Restaurants & Gastronomy Points */}
          {currentDay.restaurants && currentDay.restaurants.length > 0 && (
            <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-xs space-y-3">
              <button
                onClick={() => setShowRestaurants((prev) => !prev)}
                className="w-full flex items-center justify-between text-left min-h-[44px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-900">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">
                      Restaurantes & Gastronomía del Día ({currentDay.restaurants.length})
                    </h3>
                    <p className="text-[11px] font-bold text-slate-400">
                      Especialidades gastronómicas y locales recomendados de la fecha
                    </p>
                  </div>
                </div>

                {showRestaurants ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {showRestaurants && (
                <div className="divide-y divide-slate-100 dark:divide-slate-700/60 pt-2 space-y-2">
                  {currentDay.restaurants.map((rest) => {
                    const restMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      rest.locationQuery
                    )}`;

                    return (
                      <div
                        key={rest.id}
                        className="pt-2 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-900 dark:text-white">
                              {rest.name}
                            </span>
                            <span className="text-[10px] font-black uppercase bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900">
                              {rest.specialty}
                            </span>
                          </div>
                          {rest.recommendation && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                              💡 {rest.recommendation}
                            </p>
                          )}
                        </div>

                        <a
                          href={restMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 hover:bg-amber-600 hover:text-white transition-all shrink-0 border border-amber-200/60 dark:border-amber-900 active:scale-95"
                          title="Abrir restaurante en Google Maps"
                          aria-label={`Abrir mapa de ${rest.name}`}
                        >
                          <MapPin className="w-4 h-4" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}
        </main>
      )}

      {/* Sticky Bottom Day Paginator Bar */}
      <nav className="fixed bottom-16 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={handlePrevDay}
            disabled={currentDayGlobalIndex === 0}
            className="min-h-[48px] px-4 py-2 rounded-2xl font-black text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Día Anterior</span>
          </button>

          <div className="text-center">
            <span className="text-[10px] font-black uppercase text-slate-400 block">
              Navegación
            </span>
            <span className="text-xs font-black text-rose-600 dark:text-rose-400">
              {currentDay.dayIndex === 0 ? 'Etapa 0' : `Día ${currentDay.dayIndex} / ${TRIP_DATA.totalDays - 1}`} ({currentDay.shortDate})
            </span>
          </div>

          <button
            onClick={handleNextDay}
            disabled={currentDayGlobalIndex === allDays.length - 1}
            className="min-h-[48px] px-4 py-2 rounded-2xl font-black text-xs bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 transition-all active:scale-95 shadow-md shadow-rose-900/20"
          >
            <span>Día Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Interactive Aprender Modal */}
      <AprenderModal
        isOpen={Boolean(selectedLearnInfo)}
        onClose={() => setSelectedLearnInfo(null)}
        learnInfo={selectedLearnInfo}
      />

      {/* Goshuin Passport Digital Seal Booklet Modal */}
      <GoshuinPassportModal
        isOpen={isGoshuinModalOpen}
        onClose={() => setIsGoshuinModalOpen(false)}
        stamps={stamps}
        completedActivityIds={completed}
      />

      {/* Japanese Address Modal */}
      <JapaneseAddressModal
        accommodation={selectedAccommodation}
        onClose={() => setSelectedAccommodation(null)}
      />

      {/* Sync Error Toast Notification */}
      {syncError && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-rose-300 border border-rose-500/50 px-4 py-2.5 rounded-2xl text-xs font-black shadow-2xl animate-in fade-in duration-200">
          ⚠️ {syncError}
        </div>
      )}
    </div>
  );
};
