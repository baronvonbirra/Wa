import { useState, useEffect, useCallback } from 'react';
import { fetchInteractiveItems, upsertInteractiveItem, isSupabaseConfigured } from '../lib/supabase';

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

  const [syncError, setSyncError] = useState<string | null>(null);

  // Hydrate state from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    if (!isSupabaseConfigured) return;

    fetchInteractiveItems('itinerary').then((remoteItems) => {
      if (!isMounted) return;

      const remoteCompletedIds = remoteItems
        .filter((item) => item.completed)
        .map((item) => item.id);

      setCompleted((localPrev) => {
        // Merge local and remote completed IDs to prevent losing offline state
        const merged = Array.from(new Set([...localPrev, ...remoteCompletedIds]));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch (e) {
          console.error('Error saving activity progress to localStorage during hydration:', e);
        }
        return merged;
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle activity with Optimistic UI, Async Mutation & Rollback on error
  const toggleActivity = useCallback(async (activityId: string) => {
    let wasCompleted = false;

    // 1. Optimistic UI update
    setCompleted((prev) => {
      wasCompleted = prev.includes(activityId);
      const nextCompletedStatus = !wasCompleted;
      const updated = nextCompletedStatus
        ? [...prev.filter((id) => id !== activityId), activityId]
        : prev.filter((id) => id !== activityId);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving activity progress to localStorage:', e);
      }
      return updated;
    });

    const nextCompletedStatus = !wasCompleted;

    // 2. Async mutation to Supabase
    const success = await upsertInteractiveItem(activityId, 'itinerary', nextCompletedStatus);

    // 3. Rollback if mutation failed
    if (!success) {
      console.warn(`[useTripState] Remote sync failed for activity ${activityId}. Rolling back...`);
      setCompleted((prev) => {
        const rolledBack = wasCompleted
          ? [...prev.filter((id) => id !== activityId), activityId]
          : prev.filter((id) => id !== activityId);

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(rolledBack));
        } catch (e) {
          console.error('Error rolling back localStorage:', e);
        }
        return rolledBack;
      });

      setSyncError('No se pudo guardar el cambio en la base de datos. Operación revertida.');
      setTimeout(() => setSyncError(null), 3500);
    }
  }, []);

  const isActivityCompleted = useCallback(
    (activityId: string) => {
      return completed.includes(activityId);
    },
    [completed]
  );

  return { completed, toggleActivity, isActivityCompleted, syncError, isSupabaseConfigured };
};
