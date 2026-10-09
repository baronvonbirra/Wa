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

  // Sync to localStorage whenever completedTodos changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTodos));
    } catch (e) {
      console.error('Error saving todo progress to localStorage:', e);
    }
  }, [completedTodos]);

  const toggleTodo = useCallback((todoId: string) => {
    setCompletedTodos((prev) => {
      const isCurrentlyCompleted = prev.includes(todoId);
      const nextCompletedStatus = !isCurrentlyCompleted;

      // Remote write to Supabase
      upsertInteractiveItem(todoId, 'todo', nextCompletedStatus);

      if (nextCompletedStatus) {
        return prev.includes(todoId) ? prev : [...prev, todoId];
      } else {
        return prev.filter((id) => id !== todoId);
      }
    });
  }, []);

  return { completedTodos, toggleTodo };
};
