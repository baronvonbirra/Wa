import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ExternalLink } from 'lucide-react';

interface Props {
  id: string;
  date: string;
  activity: string;
  isCompleted: boolean;
  onToggle: () => void;
}

export const ActivityItem: React.FC<Props> = ({ id, activity, isCompleted, onToggle }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity)}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 border-b border-gray-100 bg-white dark:bg-slate-800 transition-colors ${
        isDragging ? 'shadow-lg rounded-lg border border-blue-200 z-10' : ''
      }`}
    >
      <div className="flex items-center space-x-2 flex-1 min-w-0 pr-2">
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 p-1 flex-shrink-0"
          {...attributes}
          {...listeners}
          title="Arrastrar para reordenar"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <label className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={onToggle}
            className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
          />
          <span className={`text-sm font-medium truncate ${isCompleted ? 'line-through text-gray-400 dark:text-slate-500' : 'text-gray-800 dark:text-slate-200'}`}>
            {activity}
          </span>
        </label>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-500 dark:text-blue-400 hover:underline ml-2 flex-shrink-0 flex items-center gap-0.5 bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded-md font-semibold"
      >
        <span>Maps</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
};
