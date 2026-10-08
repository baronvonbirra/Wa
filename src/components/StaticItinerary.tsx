import React, { useState } from 'react';
import { TRIP_DATA } from '../data/tripData';
import { useTripState } from '../hooks/useTripState';
import { ActivityItem } from './ActivityItem';
import { HeaderProgress } from './HeaderProgress';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

export const StaticItinerary: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(0);
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { completed, toggleActivity, customOrders, reorderActivities } = useTripState();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const currentStage = TRIP_DATA.stages.find((s) => s.stage_id === activeStageId) || TRIP_DATA.stages[0];

  // Calculate total and completed count overall
  let totalActivitiesCount = 0;
  let completedActivitiesCount = 0;

  TRIP_DATA.stages.forEach((stage) => {
    stage.days.forEach((day) => {
      day.activities.forEach((act) => {
        totalActivitiesCount++;
        const key = `${day.date}-${act}`;
        if (completed.includes(key)) {
          completedActivitiesCount++;
        }
      });
    });
  });

  const handleDragEnd = (date: string, activitiesList: string[], event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = activitiesList.indexOf(active.id as string);
      const newIndex = activitiesList.indexOf(over.id as string);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(activitiesList, oldIndex, newIndex);
        reorderActivities(date, newOrder);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pt-44 font-sans text-slate-800 dark:text-slate-100">
      <header className="mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-rose-600 dark:text-rose-400">{TRIP_DATA.title}</h1>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
              {TRIP_DATA.start_date} — {TRIP_DATA.end_date} (Modo Estático / Offline)
            </p>
          </div>
          <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            ⚡ 100% Offline
          </span>
        </div>
      </header>

      {/* Progress & Search / Filter Controls */}
      <HeaderProgress
        totalActivities={totalActivitiesCount}
        completedCount={completedActivitiesCount}
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Stage Navigation Tabs */}
      <nav className="flex space-x-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {TRIP_DATA.stages.map((stage) => (
          <button
            key={stage.stage_id}
            onClick={() => setActiveStageId(stage.stage_id)}
            className={`px-4 py-2 text-xs rounded-xl whitespace-nowrap font-black transition-all ${
              activeStageId === stage.stage_id
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Etapa {stage.stage_id + 1}: {stage.name}
          </button>
        ))}
      </nav>

      {/* Stage Accommodations */}
      <section className="bg-amber-50 dark:bg-slate-800/80 p-4 rounded-2xl mb-6 border-2 border-amber-200 dark:border-amber-800/50 shadow-xs">
        <h3 className="text-xs uppercase font-black text-amber-800 dark:text-amber-300 tracking-wider mb-2 flex items-center gap-1.5">
          🏨 Alojamientos de la Etapa
        </h3>
        <div className="space-y-1.5">
          {currentStage.accommodations.map((acc, idx) => (
            <div key={idx} className="text-xs text-amber-950 dark:text-amber-100 font-semibold flex items-start gap-1">
              <span className="text-amber-500">•</span>
              <div>
                <strong className="font-bold">{acc.name}</strong> ({acc.location}): Check-in {acc.check_in} al {acc.check_out}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Days & Activities */}
      <main className="space-y-6">
        {currentStage.days.map((day) => {
          const rawActivities = day.activities;
          const order = customOrders[day.date] || rawActivities;
          // Preserve custom order and include any newly added ones
          const orderedActivities = order
            .filter((act) => rawActivities.includes(act))
            .concat(rawActivities.filter((act) => !order.includes(act)));

          // Filter by search query & state filter
          const filteredActivities = orderedActivities.filter((act) => {
            const key = `${day.date}-${act}`;
            const isDone = completed.includes(key);

            if (filter === 'pending' && isDone) return false;
            if (filter === 'done' && !isDone) return false;

            if (searchQuery.trim()) {
              const q = searchQuery.toLowerCase();
              const matchesTitle = day.title.toLowerCase().includes(q);
              const matchesActivity = act.toLowerCase().includes(q);
              return matchesTitle || matchesActivity;
            }

            return true;
          });

          if (searchQuery.trim() && filteredActivities.length === 0 && !day.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return null;
          }

          return (
            <div key={day.date} className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 bg-white dark:bg-slate-800 shadow-xs">
              <div className="mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
                <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{day.title}</span>
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                    {day.date}
                  </span>
                </h2>
              </div>

              {filteredActivities.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2">No hay actividades que coincidan con el filtro.</p>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(e) => handleDragEnd(day.date, orderedActivities, e)}
                >
                  <SortableContext items={filteredActivities} strategy={verticalListSortingStrategy}>
                    <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                      {filteredActivities.map((act) => {
                        const activityKey = `${day.date}-${act}`;
                        return (
                          <ActivityItem
                            key={act}
                            id={act}
                            date={day.date}
                            activity={act}
                            isCompleted={completed.includes(activityKey)}
                            onToggle={() => toggleActivity(activityKey)}
                          />
                        );
                      })}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
};
