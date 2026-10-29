import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Star, Compass, Award, Heart } from 'lucide-react';
import { romanticConfig, StarMessage } from '../config/romanticConfig';
import { romanticAudio } from '../utils/romanticAudio';

export const ConstellationUniverse: React.FC = () => {
  const [selectedStar, setSelectedStar] = useState<StarMessage | null>(null);
  const [discoveredStars, setDiscoveredStars] = useState<number[]>([]);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [unlockedSecretStar, setUnlockedSecretStar] = useState(false);

  const stars = romanticConfig.universe.stars;
  const secretStar = romanticConfig.universe.secretStar;

  const handleStarClick = (star: StarMessage) => {
    romanticAudio.playChime(1 + star.id * 0.12);
    setSelectedStar(star);
    if (!discoveredStars.includes(star.id)) {
      const nextDiscovered = [...discoveredStars, star.id];
      setDiscoveredStars(nextDiscovered);
      if (nextDiscovered.length === 5) {
        setUnlockedSecretStar(true);
        setTimeout(() => {
          romanticAudio.playSurpriseFanfare();
        }, 600);
      }
    }
  };

  const handleSecretMeridianClick = () => {
    romanticAudio.playSurpriseFanfare();
    setUnlockedSecretStar(true);
    setSelectedStar(secretStar);
    if (!discoveredStars.includes(6)) {
      setDiscoveredStars((prev) => [...prev, 6]);
    }
  };

  const isAllDiscovered = discoveredStars.length >= 5;

  return (
    <section id="our-universe" className="relative py-32 px-6 bg-[#060105] overflow-hidden">
      {/* Background Star field & Atmospheric Nebula */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-rose-950/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-950/20 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:36px_36px] opacity-15" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300 font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Celestial Chart</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-romance text-white leading-tight">
            "{romanticConfig.universe.heading}"
          </h2>
          <p className="mt-4 text-sm text-rose-200/60 leading-relaxed font-sans-romance font-light">
            {romanticConfig.universe.subheading}
          </p>

          {/* Clean Discovered Progress */}
          <div className="mt-5 flex items-center justify-center gap-3 text-xs text-rose-300/80">
            <span>Constellation Progress</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-amber-300 font-semibold">{discoveredStars.filter(id => id <= 5).length} of 5 stars revealed</span>
            <span aria-hidden="true">·</span>
            <span className={isAllDiscovered ? "text-amber-300 font-medium flex items-center gap-1" : "text-rose-300/60"}>
              {unlockedSecretStar ? (
                <>
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Secret Polaris Star Unlocked ✨</span>
                </>
              ) : (
                "Tap stars to unlock"
              )}
            </span>
          </div>
        </div>

        {/* Interactive Celestial Constellation Chart */}
        <div className="w-full max-w-4xl h-[460px] sm:h-[520px] bg-gradient-to-b from-[#16050e] via-[#0d0208] to-[#070104] rounded-3xl border border-rose-500/25 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          {/* Subtle grid lines & celestial rings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            {/* Concentric Celestial Rings */}
            <circle cx="50%" cy="50%" r="160" stroke="#f472b6" strokeWidth="1" strokeDasharray="3 6" opacity="0.1" />
            <circle cx="50%" cy="50%" r="300" stroke="#f472b6" strokeWidth="1" strokeDasharray="3 7" opacity="0.06" />

            {/* Glowing Constellation Connecting Lines */}
            <polyline
              points={`${stars[0].x}%,${stars[0].y}% ${stars[1].x}%,${stars[1].y}% ${stars[2].x}%,${stars[2].y}% ${stars[3].x}%,${stars[3].y}% ${stars[4].x}%,${stars[4].y}%`}
              fill="none"
              stroke="#fb7185"
              strokeWidth="1.8"
              strokeDasharray="4 6"
              opacity="0.4"
            />
            <line
              x1={`${stars[0].x}%`}
              y1={`${stars[0].y}%`}
              x2={`${stars[2].x}%`}
              y2={`${stars[2].y}%`}
              stroke="#fbbf24"
              strokeWidth="1.2"
              strokeDasharray="2 4"
              opacity="0.3"
            />
            <line
              x1={`${stars[2].x}%`}
              y1={`${stars[2].y}%`}
              x2={`${stars[4].x}%`}
              y2={`${stars[4].y}%`}
              stroke="#fbbf24"
              strokeWidth="1.2"
              strokeDasharray="2 4"
              opacity="0.3"
            />

            {/* Secret Polaris Line */}
            {unlockedSecretStar && (
              <line
                x1={`${stars[2].x}%`}
                y1={`${stars[2].y}%`}
                x2={`${secretStar.x}%`}
                y2={`${secretStar.y}%`}
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.6"
              />
            )}
          </svg>

          {/* Render The 5 Interactive Star Nodes */}
          {stars.map((star) => {
            const isDiscovered = discoveredStars.includes(star.id);
            const isHovered = hoveredStar === star.id;

            return (
              <div
                key={star.id}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => {
                    setHoveredStar(star.id);
                    romanticAudio.playChime(0.85);
                  }}
                  onMouseLeave={() => setHoveredStar(null)}
                  className="relative group p-4 cursor-pointer focus:outline-none"
                  aria-label={`Explore star ${star.name}: ${star.constellation}`}
                >
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      isHovered ? 'scale-175 opacity-100' : 'scale-100 opacity-60'
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${star.color}50 0%, transparent 70%)`,
                    }}
                  />

                  <div
                    className="absolute inset-2 rounded-full border border-pink-300/40 animate-ping opacity-35"
                    style={{ animationDuration: '3.5s' }}
                  />

                  <div
                    className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDiscovered
                        ? 'bg-amber-400 text-slate-950 shadow-[0_0_25px_rgba(251,191,36,0.9)] scale-110'
                        : 'bg-rose-950/90 text-rose-200 border border-rose-400/50 hover:scale-125 hover:border-amber-300'
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isHovered ? 'rotate-45 scale-110' : ''
                      } ${isDiscovered ? 'fill-current' : ''}`}
                    />
                  </div>

                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-14 whitespace-nowrap text-xs transition-all duration-300 pointer-events-none ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                    }`}
                  >
                    <div className="bg-[#1e0714]/95 border border-rose-500/40 px-3 py-1.5 rounded-lg text-amber-200 shadow-xl text-[11px] font-sans-romance flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>{star.name} · {star.constellation}</span>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}

          {/* Secret 6th Star: Polaris */}
          {unlockedSecretStar && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ left: `${secretStar.x}%`, top: `${secretStar.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
            >
              <button
                onClick={() => {
                  romanticAudio.playSurpriseFanfare();
                  setSelectedStar(secretStar);
                }}
                className="relative group p-4 cursor-pointer focus:outline-none"
                aria-label="Secret Polaris Star"
              >
                <div className="absolute inset-0 rounded-full bg-white/30 blur-md animate-pulse" />
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-200 via-white to-pink-200 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,1)]">
                  <Heart className="w-5 h-5 text-rose-600 fill-rose-600 animate-bounce" />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase font-cinzel text-amber-200 font-bold tracking-widest bg-black/70 px-2 py-0.5 rounded-full border border-amber-300/40">
                  Secret Polaris
                </div>
              </button>
            </motion.div>
          )}

          {/* Interactive Constellation Coordinates Watermark with secret trigger */}
          <button
            onClick={handleSecretMeridianClick}
            className="absolute bottom-4 right-6 text-rose-300/40 hover:text-amber-200 transition-colors flex items-center gap-2 text-xs font-cinzel cursor-pointer group"
            title="Click to reveal a secret constellation coordinate"
          >
            <Compass className="w-4 h-4 text-amber-300/60 group-hover:rotate-180 transition-transform duration-700" />
            <span className="tracking-widest">KHADIJA CELESTIAL MERIDIAN 24°N</span>
            <Sparkles className="w-3 h-3 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Selected Star Modal / Expanded Card */}
        <AnimatePresence>
          {selectedStar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
              onClick={() => setSelectedStar(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 25 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 25 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg bg-gradient-to-b from-[#250816] via-[#1a0510] to-[#11030a] border border-rose-500/40 rounded-3xl p-8 sm:p-10 shadow-[0_25px_80px_rgba(244,63,94,0.4)] overflow-hidden"
              >
                <div
                  className="absolute -top-24 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full blur-2xl pointer-events-none"
                  style={{ background: selectedStar.color, opacity: 0.35 }}
                />

                <button
                  onClick={() => setSelectedStar(null)}
                  className="absolute top-5 right-5 p-2 rounded-full text-rose-300/70 hover:text-white hover:bg-rose-900/40 transition-colors cursor-pointer"
                  aria-label="Close star message"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-300 font-medium mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedStar.id === 6 ? "Hidden Star" : `Star ${selectedStar.id} of 5`} · {selectedStar.name}</span>
                </div>

                <h3 className="text-xs font-sans-romance text-rose-300/60 uppercase tracking-widest mb-2 font-medium">
                  {selectedStar.constellation}
                </h3>

                <blockquote className="text-2xl sm:text-3xl font-serif-romance text-white italic leading-snug my-5 border-l-2 border-rose-400 pl-4 py-1">
                  "{selectedStar.message}"
                </blockquote>

                <p className="text-sm sm:text-base text-rose-100/85 leading-relaxed font-light mt-4 font-sans-romance">
                  {selectedStar.detail}
                </p>

                <div className="mt-8 pt-5 border-t border-rose-500/20 flex justify-end">
                  <button
                    onClick={() => setSelectedStar(null)}
                    className="px-6 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-rose-600 to-pink-600 rounded-full hover:from-rose-500 hover:to-pink-500 transition-colors cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                  >
                    Continue Journey
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
