import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Volume2, VolumeX } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';
import { romanticAudio } from '../utils/romanticAudio';

interface CinematicIntroProps {
  onEnter: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onEnter,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [stage, setStage] = useState<'lead' | 'reveal' | 'ready'>('lead');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStage('reveal');
    }, 1400);

    const t2 = setTimeout(() => {
      setStage('ready');
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleEnterClick = () => {
    romanticAudio.playChime(1.2);
    if (!isAudioPlaying) {
      romanticAudio.start();
      onToggleAudio();
    }
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050104] text-[#fce7eb] px-6 overflow-hidden select-none"
    >
      {/* Cinematic Aurora Lighting & Deep Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-radial from-rose-900/30 via-pink-950/15 to-transparent blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-radial from-amber-700/15 via-rose-950/10 to-transparent blur-[130px]" />

        {/* Micro-starlight grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:42px_42px] opacity-20" />
      </div>

      {/* Floating Audio Control Pill (Zero-slop clean affordance) */}
      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={onToggleAudio}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-950/30 text-pink-200/90 hover:text-white hover:border-pink-400/40 transition-colors text-xs backdrop-blur-md cursor-pointer shadow-lg"
          aria-label={isAudioPlaying ? "Mute ambient music" : "Play ambient music"}
        >
          {isAudioPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-pink-300/60" />
          )}
          <span className="font-sans-romance text-[11px] tracking-wider uppercase font-medium">
            {isAudioPlaying ? "Music Playing" : "Play Music"}
          </span>
        </button>
      </div>

      {/* Center Cinematic Stage */}
      <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
        {/* Floating Heart with Golden Halo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, filter: 'blur(8px)' }}
          animate={{ scale: [1, 1.06, 1], opacity: 1, filter: 'blur(0px)' }}
          transition={{
            scale: { repeat: Infinity, duration: 3.2, ease: "easeInOut" },
            opacity: { duration: 1.4 },
            filter: { duration: 1.4 }
          }}
          className="mb-10 relative"
        >
          {/* Subtle Outer Halo Rings */}
          <div className="absolute -inset-4 rounded-full border border-rose-500/20 animate-ping opacity-30" style={{ animationDuration: '4s' }} />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600/40 via-pink-600/20 to-amber-500/30 border border-rose-400/40 flex items-center justify-center shadow-[0_0_45px_rgba(244,63,94,0.4)] backdrop-blur-sm">
            <Heart className="w-9 h-9 text-rose-300 fill-rose-500/50" />
          </div>
          <div className="absolute -top-1.5 -right-1.5">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '9s' }} />
          </div>
        </motion.div>

        {/* Phase 1: Poetic Lead Sentence */}
        <motion.p
          initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-base sm:text-xl font-light tracking-widest text-rose-200/80 mb-4 font-serif-romance italic"
        >
          {romanticConfig.intro.leadText}
        </motion.p>

        {/* Phase 2: Grand Reveal Title for Khadija */}
        <AnimatePresence>
          {(stage === 'reveal' || stage === 'ready') && (
            <motion.div
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal font-serif-romance text-shimmer-rose tracking-tight leading-[1.1]">
                {romanticConfig.intro.revealTitle}
              </h1>
              <p className="text-xs sm:text-sm text-pink-200/70 max-w-md mx-auto leading-relaxed font-sans-romance font-light">
                {romanticConfig.intro.subtitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: Enter Button with Royal Glow */}
        <AnimatePresence>
          {stage === 'ready' && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-12"
            >
              <button
                onClick={handleEnterClick}
                className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full text-sm font-medium tracking-wide text-white transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.45)] hover:shadow-[0_0_70px_rgba(244,63,94,0.7)] active:scale-95"
              >
                {/* Button gradient surface */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),transparent_60%)]" />
                
                {/* Border sheen */}
                <div className="absolute inset-0 rounded-full border border-pink-200/40 group-hover:border-white/70 transition-colors" />

                <span className="relative z-10 font-sans-romance text-white drop-shadow-md flex items-center gap-2.5 text-sm sm:text-base font-medium">
                  {romanticConfig.intro.enterButtonText}
                </span>
              </button>

              <p className="text-[11px] text-pink-300/50 mt-4 font-light tracking-widest uppercase">
                Turn sound on for the full cinematic experience
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle bottom note */}
      <div className="absolute bottom-8 text-center text-[10px] text-rose-300/35 tracking-[0.3em] font-cinzel">
        AN EXCLUSIVE UNIVERSE · FOR KHADIJA
      </div>
    </motion.div>
  );
};
