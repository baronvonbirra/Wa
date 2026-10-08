import { useState, useEffect } from 'react';

export const useTripState = () => {
  const [completed, setCompleted] = useState<string[]>(() => {
    const saved = localStorage.getItem('japan_completed');
    return saved ? JSON.parse(saved) : [];
  });

  const [customOrders, setCustomOrders] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('japan_orders');
    return saved ? JSON.parse(saved) : {};
  });

  // Guardar estado en LocalStorage
  useEffect(() => {
    localStorage.setItem('japan_completed', JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    localStorage.setItem('japan_orders', JSON.stringify(customOrders));
  }, [customOrders]);

  const toggleActivity = (key: string) => {
    setCompleted((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
    );
  };

  const reorderActivities = (date: string, newOrder: string[]) => {
    setCustomOrders((prev) => ({ ...prev, [date]: newOrder }));
  };

  return { completed, toggleActivity, customOrders, reorderActivities };
};
