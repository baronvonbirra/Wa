import { useState, useEffect, useCallback } from 'react';

export interface GoshuinStamp {
  id: string; // activity or learn title
  title: string;
  subtitle: string;
  stampedAt: string; // ISO or date string
  icon?: string;
  stageName?: string;
}

const STORAGE_KEY = 'japan_2026_goshuin_stamps';

export function useGoshuinPassport() {
  const [stamps, setStamps] = useState<GoshuinStamp[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stamps));
    } catch (e) {
      console.error('Error persisting goshuin stamps:', e);
    }
  }, [stamps]);

  const addStamp = useCallback((title: string, subtitle?: string, icon?: string, stageName?: string) => {
    const stampId = title.trim().toLowerCase();
    setStamps((prev) => {
      if (prev.some((s) => s.id === stampId)) {
        return prev; // Already collected
      }
      const newStamp: GoshuinStamp = {
        id: stampId,
        title,
        subtitle: subtitle || 'Hito Descubierto',
        stampedAt: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        icon: icon || '⛩️',
        stageName: stageName || 'Japón 2026-2027'
      };
      return [newStamp, ...prev];
    });
  }, []);

  const isStamped = useCallback((title: string) => {
    const stampId = title.trim().toLowerCase();
    return stamps.some((s) => s.id === stampId);
  }, [stamps]);

  return { stamps, addStamp, isStamped };
}
