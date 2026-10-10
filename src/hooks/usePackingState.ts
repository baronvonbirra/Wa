import { useState, useEffect, useCallback } from 'react';
import {
  fetchInteractiveItems,
  upsertInteractiveItem,
  bulkUpdateInteractiveItems,
  isSupabaseConfigured
} from '../lib/supabase';

export const usePackingState = () => {
  const STORAGE_KEY = 'japan_2026_packing_checked';

  const [checkedItems, setCheckedItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
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

    fetchInteractiveItems('packing').then((remoteItems) => {
      if (!isMounted) return;

      const remoteCheckedIds = remoteItems
        .filter((item) => item.completed)
        .map((item) => item.id);

      setCheckedItems((localPrev) => {
        const merged = Array.from(new Set([...localPrev, ...remoteCheckedIds]));
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch (e) {
          console.error('Error saving packing progress to localStorage during hydration:', e);
        }
        return merged;
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle item with Optimistic UI, Async Mutation & Rollback on error
  const toggleItem = useCallback(async (itemId: string) => {
    let wasChecked = false;

    // 1. Optimistic UI update
    setCheckedItems((prev) => {
      wasChecked = prev.includes(itemId);
      const nextCheckedStatus = !wasChecked;
      const updated = nextCheckedStatus
        ? [...prev.filter((id) => id !== itemId), itemId]
        : prev.filter((id) => id !== itemId);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving packing progress to localStorage:', e);
      }
      return updated;
    });

    const nextCheckedStatus = !wasChecked;

    // 2. Async mutation to Supabase
    const success = await upsertInteractiveItem(itemId, 'packing', nextCheckedStatus);

    // 3. Rollback if mutation failed
    if (!success) {
      console.warn(`[usePackingState] Remote sync failed for packing item ${itemId}. Rolling back...`);
      setCheckedItems((prev) => {
        const rolledBack = wasChecked
          ? [...prev.filter((id) => id !== itemId), itemId]
          : prev.filter((id) => id !== itemId);

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

  const resetPacking = useCallback(() => {
    setCheckedItems([]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch (e) {
      console.error('Error resetting packing in localStorage:', e);
    }
    bulkUpdateInteractiveItems('packing', false);
  }, []);

  return { checkedItems, toggleItem, resetPacking, syncError, isSupabaseConfigured };
};
