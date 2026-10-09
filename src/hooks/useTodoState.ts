import { useState, useEffect, useCallback } from 'react';
import { fetchInteractiveItems, upsertInteractiveItem } from '../lib/supabase';

export const useTodoState = () => {
  const STORAGE_KEY = 'japan_2026_todos_completed';

  const [completedTodos, setCompletedTodos] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [syncError, setSyncError] = useState<string | null>(null);

  // Hydrate state from Supabase on mount (authoritative remote state sync)
  useEffect(() => {
    let isMounted = true;
    fetchInteractiveItems('todo').then((remoteItems) => {
      if (!isMounted || remoteItems.length === 0) return;

      const remoteCompletedIds = remoteItems
        .filter((item) => item.completed)
        .map((item) => item.id);

      setCompletedTodos(remoteCompletedIds);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteCompletedIds));
      } catch (e) {
        console.error('Error saving todo progress to localStorage during hydration:', e);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle todo with Optimistic UI, Async Mutation & Rollback on error
  const toggleTodo = useCallback(async (todoId: string) => {
    let wasCompleted = false;

    // 1. Optimistic UI update
    setCompletedTodos((prev) => {
      wasCompleted = prev.includes(todoId);
      const nextCompletedStatus = !wasCompleted;
      const updated = nextCompletedStatus
        ? [...prev.filter((id) => id !== todoId), todoId]
        : prev.filter((id) => id !== todoId);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving todo progress to localStorage:', e);
      }
      return updated;
    });

    const nextCompletedStatus = !wasCompleted;

    // 2. Async mutation to Supabase
    const success = await upsertInteractiveItem(todoId, 'todo', nextCompletedStatus);

    // 3. Rollback if mutation failed
    if (!success) {
      console.warn(`[useTodoState] Remote sync failed for todo ${todoId}. Rolling back...`);
      setCompletedTodos((prev) => {
        const rolledBack = wasCompleted
          ? [...prev.filter((id) => id !== todoId), todoId]
          : prev.filter((id) => id !== todoId);

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(rolledBack));
        } catch (e) {
          console.error('Error rolling back localStorage:', e);
        }
        return rolledBack;
      });

      setSyncError('No se pudo guardar el cambio en la nube. Operación revertida.');
      setTimeout(() => setSyncError(null), 3500);
    }
  }, []);

  return { completedTodos, toggleTodo, syncError };
};
