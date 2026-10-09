import React, { useEffect, useMemo } from 'react';
import { GoshuinStamp } from '../hooks/useGoshuinPassport';
import { X, Award, Sparkles, BookOpen, CheckCircle2, Lock } from 'lucide-react';

export interface FeaturedBadge {
  id: string;
  name: string;
  icon: string;
  stage: string;
  description: string;
  isUnlocked: (completedIds: string[]) => boolean;
}

export const FEATURED_BADGES: FeaturedBadge[] = [
  {
    id: 'fuji-badge',
    name: 'Sello del Fuji',
    icon: '⛩️',
    stage: 'Etapa 2 • Mt. Fuji',
    description: 'Santuario Kawaguchi Asama O Parque Arakurayama Sengen.',
    isUnlocked: (ids) => ids.includes('act-8-1') || ids.includes('act-9-5')
  },
  {
    id: 'shirakawa-badge',
    name: 'Sello de Nieve',
    icon: '❄️',
    stage: 'Etapa 2 • Shirakawa-go',
    description: 'Aldea Gassho Village (Shirakawa-go).',
    isUnlocked: (ids) => ids.includes('act-11-4')
  },
  {
    id: 'fushimi-badge',
    name: 'Sello del Zorro Sagrado',
    icon: '🦊',
    stage: 'Etapa 3 • Kioto Sur',
    description: 'Santuario Fushimi Inari-taisha.',
    isUnlocked: (ids) => ids.includes('act-13-2')
  },
  {
    id: 'nara-badge',
    name: 'Sello Ciervo de Nara',
    icon: '🦌',
    stage: 'Etapa 3 • Nara',
    description: 'Parque de Nara y ciervos sagrados.',
    isUnlocked: (ids) => ids.includes('act-16-7')
  },
  {
    id: 'nijo-badge',
    name: 'Sello Ninja Nijō',
    icon: '🗡️',
    stage: 'Etapa 3 • Castillo Nijō',
    description: 'Castillo Nijō y suelos de ruiseñor.',
    isUnlocked: (ids) => ids.includes('act-16-14')
  },
  {
    id: 'nintendo-badge',
    name: 'Sello Super Nintendo',
    icon: '🍄',
    stage: 'Etapa 4 • Universal Studios',
    description: 'Universal Studios Japan y Super Nintendo World.',
    isUnlocked: (ids) => ids.includes('act-20-1')
  }
];

interface GoshuinPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stamps?: GoshuinStamp[];
  completedActivityIds?: string[];
}

export const GoshuinPassportModal: React.FC<GoshuinPassportModalProps> = ({
  isOpen,
  onClose,
  stamps = [],
  completedActivityIds = []
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Compute derived unlocked badges
  const unlockedBadges = useMemo(() => {
    return FEATURED_BADGES.filter((badge) => badge.isUnlocked(completedActivityIds));
  }, [completedActivityIds]);

  // Combine derived badge stamps with explicit learn stamps
  const combinedStampsList = useMemo(() => {
    const list: GoshuinStamp[] = [...stamps];

    FEATURED_BADGES.forEach((b) => {
      if (b.isUnlocked(completedActivityIds)) {
        const derivedId = `derived-${b.id}`;
        if (!list.some((s) => s.id === derivedId || s.title.toLowerCase() === b.name.toLowerCase())) {
          list.unshift({
            id: derivedId,
            title: b.name,
            subtitle: b.description,
            stampedAt: 'Sello Derivado de Itinerario',
            icon: b.icon,
            stageName: b.stage
          });
        }
      }
    });

    return list;
  }, [stamps, completedActivityIds]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#FFFDF9] dark:bg-slate-900 border-4 border-rose-600/60 rounded-3xl p-5 sm:p-6 max-w-2xl w-full shadow-2xl relative overflow-hidden text-slate-900 dark:text-slate-100 space-y-5 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-dashed border-rose-300 dark:border-slate-700 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950 px-3 py-1 rounded-full border border-rose-300 flex items-center gap-1.5 w-fit">
              <Award className="w-3.5 h-3.5" />
              御朱印帳 • Pasaporte Kawaii de Sellos
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              GOSHUIN STAMP ALBUM (御朱印)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">
              Estado derivado automático: Completa las actividades asociadas en el itinerario para desbloquear los sellos.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center shrink-0 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
            aria-label="Cerrar pasaporte"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Counter Badge */}
        <div className="bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-600 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-200" />
            <span className="text-xs font-black uppercase tracking-wider">
              Total de Sellos en Pasaporte:
            </span>
          </div>
          <span className="bg-white text-rose-700 font-black text-sm px-3.5 py-0.5 rounded-full shadow-xs">
            {combinedStampsList.length} Sellos 💮
          </span>
        </div>

        {/* Featured Badges Grid (Section 4 Gamification) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Álbum de Sellos Principales (Desbloqueo Derivado)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {FEATURED_BADGES.map((badge) => {
              const unlocked = badge.isUnlocked(completedActivityIds);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                    unlocked
                      ? 'bg-rose-50/90 dark:bg-slate-800/90 border-rose-500 shadow-sm'
                      : 'bg-slate-100/70 dark:bg-slate-850/40 border-slate-300 dark:border-slate-700 opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <div className="w-10 h-10 rounded-full border-2 border-rose-500 bg-white dark:bg-slate-900 flex items-center justify-center text-lg shrink-0 shadow-xs">
                      {badge.icon}
                    </div>
                    {unlocked ? (
                      <span className="text-[9px] font-black uppercase bg-emerald-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        DESBLOQUEADO
                      </span>
                    ) : (
                      <span className="text-[9px] font-black uppercase bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        BLOQUEADO
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      {badge.name}
                    </h4>
                    <span className="text-[9px] font-bold text-rose-600 dark:text-rose-400 block">
                      {badge.stage}
                    </span>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stamps History Log */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-3">
            Historial de Sellos Estampados ({combinedStampsList.length})
          </h3>

          {combinedStampsList.length === 0 ? (
            <div className="text-center py-8 bg-rose-50/50 dark:bg-slate-800/40 rounded-3xl border-2 border-dashed border-rose-200 dark:border-slate-700 p-6 space-y-2">
              <span className="text-4xl block animate-bounce">💮</span>
              <h3 className="text-sm font-black text-slate-700 dark:text-slate-300">
                ¡Tu Pasaporte Goshuin está esperando su primer sello!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">
                Marca como completados los hitos del itinerario para desbloquear automáticamente tus sellos Goshuin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {combinedStampsList.map((s) => (
                <div
                  key={s.id}
                  className="bg-white dark:bg-slate-850 border-2 border-rose-200 dark:border-slate-700 p-3 rounded-2xl relative overflow-hidden shadow-sm flex items-center gap-3"
                >
                  {/* Traditional Red Ink Goshuin Seal Circle */}
                  <div className="w-12 h-12 rounded-full border-4 border-rose-600 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/60 flex flex-col items-center justify-center shrink-0 shadow-inner transform -rotate-6">
                    <span className="text-base leading-none">{s.icon || '💮'}</span>
                    <span className="text-[7px] font-black uppercase text-rose-700 dark:text-rose-300 mt-0.5 tracking-tighter">
                      奉納
                    </span>
                  </div>

                  <div className="space-y-0.5 overflow-hidden">
                    <span className="text-[9px] font-black uppercase text-rose-500 block truncate">
                      {s.stageName}
                    </span>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                      {s.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>{s.stampedAt}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] font-bold text-slate-400">
            ¡Sigue explorando el itinerario para completar los sellos Goshuin de todo Japón!
          </p>
        </div>
      </div>
    </div>
  );
};
