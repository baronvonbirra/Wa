import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { TripTask } from '../../state/wa2Types';

export const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<TripTask[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('Todas');
  const [showCompleted, setShowCompleted] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await supabase
      .from('trip_tasks')
      .select('*')
      .order('due_date', { ascending: true });
    if (data) setTasks(data);
  };

  const toggleCompleted = async (id: string, currentStatus: boolean) => {
    // Actualización optimista
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, is_completed: !currentStatus } : task)
    );

    await supabase
      .from('trip_tasks')
      .update({ is_completed: !currentStatus })
      .eq('id', id);
  };

  const categories = ['Todas', 'Entradas', 'Reservas', 'Documentación', 'Logística'];

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = filterCategory === 'Todas' || task.category === filterCategory;
    const matchesStatus = showCompleted ? true : !task.is_completed;
    return matchesCategory && matchesStatus;
  });

  const completedCount = tasks.filter(t => t.is_completed).length;

  return (
    <div className="p-4 pb-24 max-w-md mx-auto text-slate-800 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>☑️</span>
          <span>Reservas y Tareas</span>
        </h1>
        <span className="text-xs bg-slate-200 dark:bg-gray-800 px-2.5 py-1 rounded-full text-rose-500 font-semibold">
          {completedCount} / {tasks.length} listas
        </span>
      </div>

      {/* Filtros por Categoría */}
      <div className="flex gap-2 overflow-x-auto mb-4 pb-1 scrollbar-thin">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-slate-200 dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Switch Mostrar Completadas */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="text-xs text-slate-500 dark:text-gray-400 underline font-semibold"
        >
          {showCompleted ? 'Ocultar completadas' : 'Mostrar completadas'}
        </button>
      </div>

      {/* Listado de Tareas */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-6 text-center text-xs text-slate-400 dark:text-gray-500 font-semibold">
            No hay tareas pendientes en esta categoría.
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border transition-all ${
                task.is_completed
                  ? 'bg-slate-100 dark:bg-gray-900/50 border-slate-200 dark:border-gray-800 opacity-60'
                  : 'bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => toggleCompleted(task.id, task.is_completed)}
                  className="mt-1 w-5 h-5 accent-rose-500 rounded cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded">
                      📅 {new Date(task.due_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                    {task.due_time && (
                      <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded font-mono font-bold">
                        ⏰ {task.due_time}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500 dark:text-gray-400 bg-slate-100 dark:bg-gray-800 px-2 py-0.5 rounded ml-auto font-bold uppercase">
                      {task.category}
                    </span>
                  </div>

                  <h3 className={`text-sm font-semibold ${task.is_completed ? 'line-through text-slate-400 dark:text-gray-500' : 'text-slate-900 dark:text-white'}`}>
                    {task.title}
                  </h3>

                  {task.details && (
                    <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 leading-relaxed">
                      {task.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
