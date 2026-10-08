import React, { useState } from 'react';
import { TODO_CATEGORIES } from '../data/todoData';
import { useTodoState } from '../hooks/useTodoState';
import { CheckCircle2, Circle, FileText, Ticket, Landmark, Sparkles } from 'lucide-react';

export const TodoModule: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<'tramites' | 'reservas' | 'logistica'>('tramites');
  const { completedTodos, toggleTodo } = useTodoState();

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'tramites':
        return FileText;
      case 'reservas':
        return Ticket;
      case 'logistica':
        return Landmark;
      default:
        return FileText;
    }
  };

  const allTodos = TODO_CATEGORIES.flatMap((cat) => cat.items);
  const totalCount = allTodos.length;
  const completedCount = allTodos.filter((item) => completedTodos.includes(item.id)).length;
  const overallPercentage = Math.round((completedCount / (totalCount || 1)) * 100);

  const activeCategory = TODO_CATEGORIES.find((cat) => cat.id === activeCategoryId) || TODO_CATEGORIES[0];

  return (
    <div className="max-w-3xl mx-auto px-4 pt-4 pb-28 font-sans text-slate-800 dark:text-slate-100">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white p-5 rounded-3xl mb-6 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-900">
              Módulo Pre-Viaje
            </span>
            <h1 className="text-xl font-black text-white tracking-tight mt-1">
              Preparativos y Tareas Pendientes
            </h1>
          </div>
          <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-2xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black text-amber-300">{completedCount} / {totalCount} ({overallPercentage}%)</span>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <nav className="grid grid-cols-3 gap-2 mb-6">
        {TODO_CATEGORIES.map((cat) => {
          const Icon = getCategoryIcon(cat.id);
          const isSelected = cat.id === activeCategoryId;
          const catCompleted = cat.items.filter((i) => completedTodos.includes(i.id)).length;
          const catTotal = cat.items.length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`p-3 rounded-2xl flex flex-col items-center text-center justify-between min-h-[64px] transition-all active:scale-95 ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'scale-110' : ''}`} />
              <span className="text-[11px] font-black leading-tight line-clamp-1">{cat.name}</span>
              <span className={`text-[10px] font-bold mt-1 ${isSelected ? 'text-rose-200' : 'text-slate-400'}`}>
                {catCompleted}/{catTotal}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Active Category Tasks Card */}
      <article className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              {activeCategory.name}
            </h2>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {activeCategory.description}
            </p>
          </div>
          <span className="text-xs font-black bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
            {activeCategory.items.filter((i) => completedTodos.includes(i.id)).length} / {activeCategory.items.length} completadas
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
          {activeCategory.items.map((item) => {
            const isDone = completedTodos.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => toggleTodo(item.id)}
                className="w-full py-3.5 px-2 flex items-center gap-3 text-left min-h-[48px] rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 active:scale-98 transition-all"
              >
                {isDone ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-rose-500 shrink-0 transition-colors" />
                )}
                <span
                  className={`text-sm font-bold leading-snug ${
                    isDone
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
    </div>
  );
};
