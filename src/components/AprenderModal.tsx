import React, { useEffect } from 'react';
import { LearnInfo } from '../types/itinerary';
import { X, Lightbulb, Compass, Sparkles, BookOpen, Landmark, Info, Smile } from 'lucide-react';

interface AprenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnInfo: LearnInfo | null;
}

export const AprenderModal: React.FC<AprenderModalProps> = ({ isOpen, onClose, learnInfo }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
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

  if (!isOpen || !learnInfo) return null;

  const getPillBadgeStyle = (label: string, type?: string) => {
    const l = label.toLowerCase();
    if (l.includes('históric') || type === 'historical') {
      return { bg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-900', icon: Landmark };
    }
    if (l.includes('cultur') || type === 'cultural') {
      return { bg: 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-900', icon: Compass };
    }
    if (l.includes('gracios') || l.includes('divertid') || type === 'funFact') {
      return { bg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-900', icon: Smile };
    }
    if (l.includes('geogr') || type === 'geography') {
      return { bg: 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-900', icon: BookOpen };
    }
    return { bg: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-900', icon: Sparkles };
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white dark:bg-slate-900 border-2 border-rose-500/40 rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl relative overflow-hidden text-slate-900 dark:text-slate-100 space-y-5 max-h-[90vh] overflow-y-auto transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Glow */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5" />
                ¡Aprender! • Saber Más
              </span>
            </div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-snug">
              {learnInfo.title}
            </h2>
            {learnInfo.subtitle && (
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400">
                {learnInfo.subtitle}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center shrink-0 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ¿Qué estamos viendo? - Synthesis */}
        <div className="bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent dark:from-rose-950/40 dark:to-slate-900/40 border-2 border-rose-500/30 p-4 rounded-2xl space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-rose-600 dark:text-rose-400">
            <Info className="w-4 h-4 shrink-0" />
            <span>¿Qué estamos viendo?</span>
          </div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed">
            {learnInfo.summary}
          </p>
        </div>

        {/* Píldoras de Sabiduría */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Píldoras de Sabiduría ({learnInfo.pills.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {learnInfo.pills.map((pill, idx) => {
              const style = getPillBadgeStyle(pill.label, pill.type);
              const PillIcon = style.icon;

              return (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 p-3.5 rounded-2xl space-y-1 transition-all hover:border-slate-300 dark:hover:border-slate-600"
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${style.bg}`}>
                      <PillIcon className="w-3 h-3" />
                      {pill.label}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
                    {pill.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-lg shadow-rose-900/30 transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>¡Entendido! Volver al Itinerario</span>
          </button>
        </div>
      </div>
    </div>
  );
};
