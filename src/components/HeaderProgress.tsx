import React from 'react';

interface Props {
  totalActivities: number;
  completedCount: number;
  filter: 'all' | 'pending' | 'done';
  setFilter: (f: 'all' | 'pending' | 'done') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const HeaderProgress: React.FC<Props> = ({
  totalActivities,
  completedCount,
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
}) => {
  const percentage = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6 space-y-4">
      {/* Progreso */}
      <div>
        <div className="flex justify-between text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
          <span>Progreso del viaje</span>
          <span>{percentage}% ({completedCount}/{totalActivities})</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-2.5 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Controles de búsqueda y filtro */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Buscar templo, ciudad, atracción..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 border dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex rounded-lg border dark:border-slate-700 overflow-hidden text-xs font-medium">
          {(['all', 'pending', 'done'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 flex-1 capitalize transition-colors ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Hechas'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
