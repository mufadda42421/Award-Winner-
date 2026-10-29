import React, { useMemo } from 'react';

interface Particle {
  id: number;
  type: 'petal' | 'star' | 'heart';
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation: number;
}

export const FloatingParticlesOverlay: React.FC = () => {
  // Generate a fixed set of floating romantic particles
  const particles = useMemo<Particle[]>(() => {
    const items: Particle[] = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      const type: 'petal' | 'star' | 'heart' =
        typeRand < 0.5 ? 'petal' : typeRand < 0.8 ? 'star' : 'heart';
      items.push({
        id: i,
        type,
        left: Math.random() * 98,
        size: type === 'petal' ? 14 + Math.random() * 12 : 10 + Math.random() * 8,
        duration: 12 + Math.random() * 14,
        delay: Math.random() * 15,
        opacity: 0.25 + Math.random() * 0.45,
        rotation: Math.random() * 360,
      });
    }
    return items;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-50px',
            animation: `driftDown ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          {p.type === 'petal' && (
            <svg
              width={p.size}
              height={p.size * 1.3}
              viewBox="0 0 24 32"
              fill="none"
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
              <path
                d="M12 0C18 8 24 16 22 24C20 30 14 32 12 32C10 32 4 30 2 24C0 16 6 8 12 0Z"
                fill="url(#petalGrad)"
              />
              <defs>
                <linearGradient id="petalGrad" x1="0" y1="0" x2="24" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fda4af" stopOpacity="0.9" />
                  <stop offset="0.6" stopColor="#e11d48" stopOpacity="0.75" />
                  <stop offset="1" stopColor="#881337" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {p.type === 'star' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="none"
              className="animate-pulse"
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
              <polygon
                points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9"
                fill="url(#starGrad)"
              />
              <defs>
                <linearGradient id="starGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" />
                  <stop offset="1" stopColor="#fcd34d" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {p.type === 'heart' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="#fb7185"
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}

      <style>{`
        @keyframes driftDown {
          0% {
            transform: translateY(-40px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(30px) rotate(180deg);
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
