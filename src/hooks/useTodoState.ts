import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchInteractiveItems, upsertInteractiveItem, checkIsSupabaseConfigured } from '../lib/supabase';

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

  const completedTodosRef = useRef<string[]>(completedTodos);
  useEffect(() => {
    completedTodosRef.current = completedTodos;
  }, [completedTodos]);

  const [syncError, setSyncError] = useState<string | null>(null);
  const [isDbConnected, setIsDbConnected] = useState(() => checkIsSupabaseConfigured());

  const hydrateFromSupabase = useCallback(() => {
    const isConfigured = checkIsSupabaseConfigured();
    setIsDbConnected(isConfigured);
    if (!isConfigured) return;

    fetchInteractiveItems('todo').then((remoteItems) => {
      const dbCompleted = remoteItems
        .filter((item) => Boolean(item.completed))
        .map((item) => item.id);

      setCompletedTodos(dbCompleted);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dbCompleted));
      } catch (e) {
        console.error('Error saving todo progress to localStorage during hydration:', e);
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

  // Toggle todo with Optimistic UI, Async Mutation & Rollback on error
  const toggleTodo = useCallback(async (todoId: string) => {
    const wasCompleted = completedTodosRef.current.includes(todoId);
    const nextCompletedStatus = !wasCompleted;

    // 1. Optimistic UI update
    setCompletedTodos((prev) => {
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

    // 2. Async mutation to Supabase
    if (checkIsSupabaseConfigured()) {
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

        setSyncError('No se pudo guardar el cambio en la base de datos. Operación revertida.');
        setTimeout(() => setSyncError(null), 3500);
      }
    }
  }, []);

  return { completedTodos, toggleTodo, syncError, isSupabaseConfigured: isDbConnected };
};
