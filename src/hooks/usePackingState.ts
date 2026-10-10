import { useState, useEffect, useCallback, useRef } from 'react';
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

  const checkedItemsRef = useRef<string[]>(checkedItems);
  useEffect(() => {
    checkedItemsRef.current = checkedItems;
  }, [checkedItems]);

  const [syncError, setSyncError] = useState<string | null>(null);

  // Hydrate state from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    if (!isSupabaseConfigured) return;

    fetchInteractiveItems('packing').then((remoteItems) => {
      if (!isMounted || !remoteItems) return;

      setCheckedItems((localPrev) => {
        const nextSet = new Set(localPrev);

        remoteItems.forEach((item) => {
          if (item.completed) {
            nextSet.add(item.id);
          } else {
            nextSet.delete(item.id);
          }
        });

        const reconciled = Array.from(nextSet);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reconciled));
        } catch (e) {
          console.error('Error saving packing progress to localStorage during hydration:', e);
        }
        return reconciled;
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle item with Optimistic UI, Async Mutation & Rollback on error
  const toggleItem = useCallback(async (itemId: string) => {
    const wasChecked = checkedItemsRef.current.includes(itemId);
    const nextCheckedStatus = !wasChecked;

    // 1. Optimistic UI update
    setCheckedItems((prev) => {
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
