import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchInteractiveItems, upsertInteractiveItem, checkIsSupabaseConfigured } from '../lib/supabase';

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

  const completedRef = useRef<string[]>(completed);
  useEffect(() => {
    completedRef.current = completed;
  }, [completed]);

  const [syncError, setSyncError] = useState<string | null>(null);
  const [isDbConnected, setIsDbConnected] = useState(() => checkIsSupabaseConfigured());

  const hydrateFromSupabase = useCallback(() => {
    const isConfigured = checkIsSupabaseConfigured();
    setIsDbConnected(isConfigured);
    if (!isConfigured) return;

    fetchInteractiveItems('itinerary').then((remoteItems) => {
      const dbCompleted = remoteItems
        .filter((item) => Boolean(item.completed))
        .map((item) => item.id);

      setCompleted(dbCompleted);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dbCompleted));
      } catch (e) {
        console.error('Error saving activity progress to localStorage during hydration:', e);
      }
    });
  }, []);

  // Hydrate state from Supabase on mount and on config change
  useEffect(() => {
    hydrateFromSupabase();

    const handleConfigChange = () => {
      hydrateFromSupabase();
    };

    window.addEventListener('supabase-config-changed', handleConfigChange);
    return () => {
      window.removeEventListener('supabase-config-changed', handleConfigChange);
    };
  }, [hydrateFromSupabase]);

  // Toggle activity with Optimistic UI, Async Mutation & Rollback on error
  const toggleActivity = useCallback(async (activityId: string) => {
    const wasCompleted = completedRef.current.includes(activityId);
    const nextCompletedStatus = !wasCompleted;

    // 1. Optimistic UI update
    setCompleted((prev) => {
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

    // 2. Async mutation to Supabase
    if (checkIsSupabaseConfigured()) {
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
    }
  }, []);

  const isActivityCompleted = useCallback(
    (activityId: string) => {
      return completed.includes(activityId);
    },
    [completed]
  );

  return { completed, toggleActivity, isActivityCompleted, syncError, isSupabaseConfigured: isDbConnected };
};
