import { useState, useEffect, useCallback } from 'react';
import { fetchInteractiveItems, upsertInteractiveItem } from '../lib/supabase';

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

  // Hydrate state from Supabase on mount (authoritative remote state sync)
  useEffect(() => {
    let isMounted = true;
    fetchInteractiveItems('itinerary').then((remoteItems) => {
      if (!isMounted || remoteItems.length === 0) return;

      const remoteCompletedIds = remoteItems
        .filter((item) => item.completed)
        .map((item) => item.id);

      setCompleted(remoteCompletedIds);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteCompletedIds));
      } catch (e) {
        console.error('Error saving activity progress to localStorage during hydration:', e);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync to localStorage whenever completed changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch (e) {
      console.error('Error saving activity progress to localStorage:', e);
    }
  }, [completed]);

  const toggleActivity = useCallback((activityId: string) => {
    setCompleted((prev) => {
      const isCurrentlyCompleted = prev.includes(activityId);
      const nextCompletedStatus = !isCurrentlyCompleted;

      // Remote write to Supabase
      upsertInteractiveItem(activityId, 'itinerary', nextCompletedStatus);

      if (nextCompletedStatus) {
        return prev.includes(activityId) ? prev : [...prev, activityId];
      } else {
        return prev.filter((id) => id !== activityId);
      }
    });
  }, []);

  const isActivityCompleted = useCallback(
    (activityId: string) => {
      return completed.includes(activityId);
    },
    [completed]
  );

  return { completed, toggleActivity, isActivityCompleted };
};
