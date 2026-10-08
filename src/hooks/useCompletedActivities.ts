import { useState } from 'react';

export const useCompletedActivities = () => {
  const STORAGE_KEY = 'japan_2026_completed_activities';

  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleActivity = (activityKey: string) => {
    setCompleted((prev) => {
      const next = prev.includes(activityKey)
        ? prev.filter((id) => id !== activityKey)
        : [...prev, activityKey];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { completed, toggleActivity };
};
