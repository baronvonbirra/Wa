import React, { useEffect } from 'react';
import { GoshuinStamp } from '../hooks/useGoshuinPassport';
import { X, Award, Sparkles, BookOpen, CheckCircle2, Lock } from 'lucide-react';

interface GoshuinPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stamps: GoshuinStamp[];
}

interface FeaturedBadge {
  id: string;
  name: string;
  icon: string;
  stage: string;
  description: string;
  targetTitles: string[]; // Match keywords in stamp title or id
}

const FEATURED_BADGES: FeaturedBadge[] = [
  {
    id: 'fuji-badge',
    name: 'Mt. Fuji Badge',
    icon: '⛩️',
    stage: 'Etapa 2 • Mt. Fuji',
    description: 'Explora el Tenku no Torii o la Pagoda Chureito con vistas al Fuji.',
    targetTitles: ['tenku no torii', 'pagoda chureito', 'arakurayama sengen', 'santuario kawaguchi asama']
  },
  {
    id: 'shirakawa-badge',
    name: 'Shirakawa Snow',
    icon: '❄️',
    stage: 'Etapa 2 • Shirakawa-go',
    description: 'Descubre las casas de paja Gassho-zukuri entre la nieve.',
    targetTitles: ['shirakawa-go', 'gassho village', 'casa wada', 'casa nagase']
  },
  {
    id: 'fushimi-badge',
    name: 'Fushimi Fox Stamp',
    icon: '🦊',
    stage: 'Etapa 3 • Kioto Sur',
    description: 'Recorre el túnel de los mil Torii y halla los zorros Kitsune.',
    targetTitles: ['fushimi inari-taisha', 'fushimi inari', 'kitsune']
  },
  {
    id: 'nara-badge',
    name: 'Nara Deer Master',
    icon: '🦌',
    stage: 'Etapa 3 • Nara',
    description: 'Interactúa con los ciervos sika y visita el Gran Buda de Todai-ji.',
    targetTitles: ['parque de nara', 'ciervos sagrados', 'tōdai-ji', 'todai-ji', 'gran buda']
  },
  {
    id: 'golden-badge',
    name: 'Golden Pavilion',
    icon: '🌟',
    stage: 'Etapa 3 • Arashiyama',
    description: 'Contempla los reflejos dorados del templo zen Kinkaku-ji.',
    targetTitles: ['pabellón dorado', 'kinkaku-ji', 'kinkakuji']
  },
  {
    id: 'nijo-badge',
    name: 'Nightingale Floor',
    icon: '🗡️',
    stage: 'Etapa 3 • Castillo Nijō',
    description: 'Aprende el secreto ninja de los Suelos de Ruiseñor cantantes.',
    targetTitles: ['castillo nijō', 'castillo nijo', 'suelos de ruiseñor']
  }
];

export const GoshuinPassportModal: React.FC<GoshuinPassportModalProps> = ({ isOpen, onClose, stamps }) => {
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

  if (!isOpen) return null;

  const isBadgeUnlocked = (badge: FeaturedBadge) => {
    return stamps.some((s) => {
      const lowerTitle = s.title.toLowerCase();
      const lowerSub = (s.subtitle || '').toLowerCase();
      const lowerId = s.id.toLowerCase();

      return badge.targetTitles.some(
        (target) =>
          lowerTitle.includes(target) || lowerSub.includes(target) || lowerId.includes(target)
      );
    });
  };

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
              Desbloquea sellos coleccionables explorando los hitos educativos del viaje.
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
            {stamps.length} Sellos 💮
          </span>
        </div>

        {/* Featured Badges Grid (Section 4 Gamification) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
              Álbum de Misiones Principales (Etapas 2 y 3)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {FEATURED_BADGES.map((badge) => {
              const unlocked = isBadgeUnlocked(badge);

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
            Historial de Sellos Estampados ({stamps.length})
          </h3>

          {stamps.length === 0 ? (
            <div className="text-center py-8 bg-rose-50/50 dark:bg-slate-800/40 rounded-3xl border-2 border-dashed border-rose-200 dark:border-slate-700 p-6 space-y-2">
              <span className="text-4xl block animate-bounce">💮</span>
              <h3 className="text-sm font-black text-slate-700 dark:text-slate-300">
                ¡Tu Pasaporte Goshuin está esperando su primer sello!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">
                Abre cualquier ficha &quot;¡Aprender!&quot; en el itinerario para estampártelo automáticamente.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {stamps.map((s) => (
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
