import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { romanticConfig, ReasonCard } from '../config/romanticConfig';
import { romanticAudio } from '../utils/romanticAudio';

interface CardTiltState {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

export const ReasonsSection: React.FC = () => {
  const { heading, subheading, cards } = romanticConfig.reasons;
  const [likes, setLikes] = useState<Record<number, number>>({
    1: 14, 2: 18, 3: 25, 4: 16, 5: 22, 6: 30
  });
  const [tilts, setTilts] = useState<Record<number, CardTiltState>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilts((prev) => ({
      ...prev,
      [id]: { rotateX, rotateY, glareX, glareY },
    }));
  };

  const handleMouseLeave = (id: number) => {
    setTilts((prev) => ({
      ...prev,
      [id]: { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 },
    }));
  };

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    romanticAudio.playHeartPop();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="reasons" className="relative py-32 px-6 bg-[#050104] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[800px] bg-rose-950/20 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-rose-300/80 font-medium mb-3">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/30" />
            <span>Unspoken Truths</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-romance text-white leading-tight">
            {heading}
          </h2>
          <p className="mt-4 text-sm text-rose-200/60 leading-relaxed font-sans-romance font-light">
            {subheading}
          </p>
        </div>

        {/* 6 Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card: ReasonCard, index: number) => {
            const tilt = tilts[card.id] || { rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 };

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                onMouseMove={(e) => handleMouseMove(e, card.id)}
                onMouseLeave={() => handleMouseLeave(card.id)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="group relative cursor-pointer rounded-3xl p-8 bg-gradient-to-br from-[#1c0613] via-[#12030b] to-[#0a0106] border border-rose-500/20 hover:border-rose-400/50 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_-10px_rgba(225,29,72,0.3)] flex flex-col justify-between overflow-hidden"
              >
                {/* Dynamic Specular Light Glare that follows pointer */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
                  }}
                />

                {/* Glow aura on hover */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${card.accentGlow} 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Top Symbol & Editorial Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                      {card.symbol}
                    </span>
                    <span className="text-xs font-mono text-rose-300/40">
                      0{card.id}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-2xl font-serif-romance text-white group-hover:text-amber-200 transition-colors mb-1.5">
                    {card.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs uppercase tracking-wider text-rose-300/70 font-medium mb-4 font-sans-romance">
                    {card.subtitle}
                  </p>

                  {/* Card Description */}
                  <p className="text-sm text-rose-100/80 leading-relaxed font-light font-sans-romance">
                    {card.description}
                  </p>
                </div>

                {/* Interactive Heart Affinity Affordance */}
                <div className="relative z-10 mt-8 pt-4 border-t border-rose-500/15 flex items-center justify-between text-xs text-rose-300/60 font-sans-romance">
                  <span className="flex items-center gap-1.5 font-light">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Forever adored
                  </span>

                  <button
                    onClick={(e) => handleLike(e, card.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/40 border border-rose-500/20 hover:border-rose-400/50 text-rose-300 hover:text-white transition-all cursor-pointer active:scale-90"
                    title="Send a heart mark to this reason"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500" />
                    <span className="font-mono text-[11px]">{likes[card.id]}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
