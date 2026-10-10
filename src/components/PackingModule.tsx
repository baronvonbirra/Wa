import React, { useState } from 'react';
import { PACKING_CATEGORIES } from '../data/packingData';
import { usePackingState } from '../hooks/usePackingState';
import {
  CheckCircle2,
  Circle,
  FileCheck,
  Zap,
  Shirt,
  Baby,
  HeartPulse,
  RotateCcw,
  AlertTriangle,
  X,
  Database,
  HardDrive
} from 'lucide-react';

export const PackingModule: React.FC = () => {
  const { checkedItems, toggleItem, resetPacking, syncError, isSupabaseConfigured } = usePackingState();
  const [showResetModal, setShowResetModal] = useState(false);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'docs':
        return FileCheck;
      case 'tech':
        return Zap;
      case 'clothes':
        return Shirt;
      case 'family':
        return Baby;
      case 'toiletries':
        return HeartPulse;
      default:
        return FileCheck;
    }
  };

  const allItems = PACKING_CATEGORIES.flatMap((c) => c.items);
  const totalCount = allItems.length;
  const checkedCount = allItems.filter((i) => checkedItems.includes(i.id)).length;
  const overallPercentage = Math.round((checkedCount / (totalCount || 1)) * 100);

  const handleConfirmReset = () => {
    resetPacking();
    setShowResetModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-4 pb-28 font-sans text-slate-800 dark:text-slate-100">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white p-5 rounded-3xl mb-6 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-900">
              Módulo Equipaje
            </span>
            <h1 className="text-xl font-black text-white tracking-tight mt-1">
              Checklist de Maletas (Invierno & Familia)
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
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

            <button
              onClick={() => setShowResetModal(true)}
              className="min-h-[44px] px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-extrabold text-xs flex items-center gap-1.5 border border-slate-700 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Desmarcar Todo</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
            <span>Progreso General de Maletas</span>
            <span>{checkedCount} / {totalCount} ítems ({overallPercentage}%)</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </section>

      {/* Category List */}
      <main className="space-y-6">
        {PACKING_CATEGORIES.map((category) => {
          const Icon = getCategoryIcon(category.id);
          const catChecked = category.items.filter((i) => checkedItems.includes(i.id)).length;
          const catTotal = category.items.length;
          const catPercentage = Math.round((catChecked / (catTotal || 1)) * 100);

          return (
            <article
              key={category.id}
              className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-3"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0 border border-rose-200/60 dark:border-rose-900">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900 dark:text-white">
                      {category.name}
                    </h2>
                    <p className="text-[11px] font-bold text-slate-400">
                      {catChecked} de {catTotal} guardados
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  {catPercentage}%
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {category.items.map((item) => {
                  const isChecked = checkedItems.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className="w-full py-3 px-2 flex items-center gap-3 text-left min-h-[48px] rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 active:scale-98 transition-all"
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-rose-500 shrink-0 transition-colors" />
                      )}
                      <span
                        className={`text-sm font-bold leading-snug ${
                          isChecked
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-800 dark:text-slate-100'
                        }`}
                      >
                        {item.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </main>

      {/* Confirmation Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
              ¿Desmarcar toda la maleta?
            </h3>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-6">
              Esta acción desmarcará todos los elementos completados en tu lista de equipaje.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="min-h-[48px] px-4 py-2.5 rounded-2xl font-black text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 active:scale-95 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmReset}
                className="min-h-[48px] px-4 py-2.5 rounded-2xl font-black text-xs bg-rose-600 text-white hover:bg-rose-700 active:scale-95 transition-all shadow-md shadow-rose-900/30"
              >
                Sí, Desmarcar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sync Error Toast Notification */}
      {syncError && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-rose-300 border border-rose-500/50 px-4 py-2.5 rounded-2xl text-xs font-black shadow-2xl animate-in fade-in duration-200">
          ⚠️ {syncError}
        </div>
      )}
    </div>
  );
};
