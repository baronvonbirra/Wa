import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  emoji: string;
  duration: number;
  delay: number;
}

interface SakuraConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const SakuraConfetti: React.FC<SakuraConfettiProps> = ({ trigger, onComplete }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (trigger) {
      const emojis = ['🌸', '✨', '🌸', '💫', '🌸', '💖'];
      const newPetals: Petal[] = Array.from({ length: 28 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100, // percentage x position
        y: -10,
        size: Math.random() * 14 + 14,
        rotation: Math.random() * 360,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        duration: Math.random() * 1.5 + 1.5,
        delay: Math.random() * 0.4
      }));

      setPetals(newPetals);

      const timer = setTimeout(() => {
        setPetals([]);
        if (onComplete) onComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-bounce"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            transform: `rotate(${p.rotation}deg)`,
            animation: `sakuraFall ${p.duration}s linear ${p.delay}s forwards`
          }}
        >
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes sakuraFall {
          0% {
            top: -10%;
            transform: translateX(0px) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateX(25px) rotate(180deg);
            opacity: 0.9;
          }
          100% {
            top: 105%;
            transform: translateX(-20px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
