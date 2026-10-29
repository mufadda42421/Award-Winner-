import React, { useEffect, useState } from 'react';

interface SparklePoint {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const SparkleCursorTrail: React.FC = () => {
  const [sparkles, setSparkles] = useState<SparklePoint[]>([]);

  useEffect(() => {
    // Only enable on pointer-fine desktop devices to save battery on mobile
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let lastTime = 0;
    const colors = ['#f472b6', '#fbbf24', '#fecdd3', '#ffffff'];

    const handlePointerMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 45) return; // limit emission rate
      lastTime = now;

      const newPoint: SparklePoint = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setSparkles((prev) => [...prev.slice(-18), newPoint]);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Decay interval
    const interval = setInterval(() => {
      setSparkles((prev) => (prev.length > 0 ? prev.slice(1) : prev));
    }, 90);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full transition-all duration-500 ease-out animate-ping"
          style={{
            left: s.x - s.size / 2,
            top: s.y - s.size / 2,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 10px ${s.color}`,
            opacity: 0.75,
            animationDuration: '0.8s',
          }}
        />
      ))}
    </div>
  );
};
