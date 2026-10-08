import React, { useEffect } from 'react';
import { GoshuinStamp } from '../hooks/useGoshuinPassport';
import { X, Award, Sparkles, BookOpen } from 'lucide-react';

interface GoshuinPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stamps: GoshuinStamp[];
}

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#FFFDF9] dark:bg-slate-900 border-4 border-rose-600/60 rounded-3xl p-5 sm:p-6 max-w-xl w-full shadow-2xl relative overflow-hidden text-slate-900 dark:text-slate-100 space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Japanese Stamp Booklet Header */}
        <div className="flex items-start justify-between border-b-2 border-dashed border-rose-300 dark:border-slate-700 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950 px-3 py-1 rounded-full border border-rose-300 flex items-center gap-1.5 w-fit">
              <Award className="w-3.5 h-3.5" />
              御朱印帳 • Pasaporte Kawaii de Sellos
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Colección Digital de Goshuin (御朱印)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">
              Sellos conmemorativos estampado en cada hito aprendido durante la aventura.
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
        <div className="bg-gradient-to-r from-rose-500 to-amber-500 text-white p-3 rounded-2xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-200" />
            <span className="text-xs font-black uppercase tracking-wider">
              Total de Sellos Coleccionados:
            </span>
          </div>
          <span className="bg-white text-rose-700 font-black text-sm px-3 py-0.5 rounded-full shadow-xs">
            {stamps.length} Sellos 💮
          </span>
        </div>

        {/* Stamps Grid */}
        <div className="space-y-3">
          {stamps.length === 0 ? (
            <div className="text-center py-10 bg-rose-50/50 dark:bg-slate-800/40 rounded-3xl border-2 border-dashed border-rose-200 dark:border-slate-700 p-6 space-y-2">
              <span className="text-4xl block animate-bounce">💮</span>
              <h3 className="text-sm font-black text-slate-700 dark:text-slate-300">
                ¡Tu Pasaporte Goshuin está esperando su primer sello!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">
                Abre cualquier ficha &quot;¡Aprender!&quot; en el itinerario para estampártelo automáticamente.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stamps.map((s) => (
                <div
                  key={s.id}
                  className="bg-white dark:bg-slate-850 border-2 border-rose-200 dark:border-slate-700 p-3.5 rounded-2xl relative overflow-hidden shadow-sm flex items-center gap-3"
                >
                  {/* Traditional Red Ink Goshuin Seal Circle */}
                  <div className="w-14 h-14 rounded-full border-4 border-rose-600 dark:border-rose-500 bg-rose-50 dark:bg-rose-950/60 flex flex-col items-center justify-center shrink-0 shadow-inner transform -rotate-6">
                    <span className="text-lg leading-none">{s.icon || '💮'}</span>
                    <span className="text-[8px] font-black uppercase text-rose-700 dark:text-rose-300 mt-0.5 tracking-tighter">
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
        <div className="pt-2 text-center">
          <p className="text-[11px] font-bold text-slate-400">
            ¡Sigue explorando el itinerario para completar los sellos Goshuin de todo Japón!
          </p>
        </div>
      </div>
    </div>
  );
};
