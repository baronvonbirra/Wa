import { useState, useEffect } from 'react';

export const useTripState = () => {
  const STORAGE_KEY = 'japan_2026_completed_activities';

  const [completed, setCompleted] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('japan_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch (e) {
      console.error('Error saving activity progress to localStorage:', e);
    }
  }, [completed]);

  const toggleActivity = (activityId: string) => {
    setCompleted((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
    );
  };

  const isActivityCompleted = (activityId: string) => {
    return completed.includes(activityId);
  };

  return { completed, toggleActivity, isActivityCompleted };
};
