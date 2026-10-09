import { useState, useEffect, useCallback } from 'react';
import {
  fetchInteractiveItems,
  upsertInteractiveItem,
  bulkUpdateInteractiveItems
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

  // Hydrate state from Supabase on mount (authoritative remote state sync)
  useEffect(() => {
    let isMounted = true;
    fetchInteractiveItems('packing').then((remoteItems) => {
      if (!isMounted || remoteItems.length === 0) return;

      const remoteCheckedIds = remoteItems
        .filter((item) => item.completed)
        .map((item) => item.id);

      setCheckedItems(remoteCheckedIds);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteCheckedIds));
      } catch (e) {
        console.error('Error saving packing progress to localStorage during hydration:', e);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync to localStorage whenever checkedItems changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    } catch (e) {
      console.error('Error saving packing progress to localStorage:', e);
    }
  }, [checkedItems]);

  const toggleItem = useCallback((itemId: string) => {
    setCheckedItems((prev) => {
      const isCurrentlyChecked = prev.includes(itemId);
      const nextCheckedStatus = !isCurrentlyChecked;

      // Remote write to Supabase
      upsertInteractiveItem(itemId, 'packing', nextCheckedStatus);

      if (nextCheckedStatus) {
        return prev.includes(itemId) ? prev : [...prev, itemId];
      } else {
        return prev.filter((id) => id !== itemId);
      }
    });
  }, []);

  const resetPacking = useCallback(() => {
    setCheckedItems([]);
    bulkUpdateInteractiveItems('packing', false);
  }, []);

  return { checkedItems, toggleItem, resetPacking };
};
