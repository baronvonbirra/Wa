import React, { useState } from 'react';
import todoDataRaw from '../data/todoData.json';
import { TodoData } from '../types/todo';
import { useTodoState } from '../hooks/useTodoState';

const todoData = todoDataRaw as TodoData;

export const TodoList: React.FC = () => {
  const { completedTodos, toggleTodo } = useTodoState();
  const [activeTab, setActiveTab] = useState<string>(todoData.categories[0].id);

  const totalItems = todoData.categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedCount = completedTodos.length;
  const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const currentCategory = todoData.categories.find((c) => c.id === activeTab) || todoData.categories[0];

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans text-slate-800 dark:text-slate-100">
      {/* Progreso */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Tareas Pre-Viaje</h2>
        <div className="flex justify-between text-sm text-gray-600 dark:text-slate-300 mb-1">
          <span>Progreso de preparativos</span>
          <span className="font-semibold">{progressPercentage}% ({completedCount}/{totalItems})</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-2.5 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 mb-4 scrollbar-thin">
        {todoData.categories.map((cat) => {
          const categoryDoneCount = cat.items.filter((item) =>
            completedTodos.includes(`${cat.id}-${item}`)
          ).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-2 text-xs rounded-lg whitespace-nowrap font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeTab === cat.id ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {categoryDoneCount}/{cat.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lista de tareas */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm space-y-2">
        <h3 className="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
          {currentCategory.name}
        </h3>
        {currentCategory.items.map((item) => {
          const itemKey = `${currentCategory.id}-${item}`;
          const isChecked = completedTodos.includes(itemKey);

          return (
            <label
              key={itemKey}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleTodo(itemKey)}
                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className={`text-sm ${isChecked ? 'line-through text-gray-400 dark:text-slate-500' : 'text-gray-800 dark:text-slate-200'}`}>
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
