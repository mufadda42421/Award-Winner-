import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';
import { ThreeRomanticScene } from './ThreeRomanticScene';
import { romanticAudio } from '../utils/romanticAudio';

interface HeroSectionProps {
  onDiscoverSurprise: () => void;
  onExploreStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDiscoverSurprise,
  onExploreStory,
}) => {
  const [showHeartSecret, setShowHeartSecret] = useState(false);

  const handleHeartSecretClick = () => {
    romanticAudio.playHeartPop();
    setShowHeartSecret(true);
    setTimeout(() => setShowHeartSecret(false), 5000);
  };

  const handleSurpriseClick = () => {
    romanticAudio.playChime(1.1);
    onDiscoverSurprise();
  };

  const handleStoryClick = () => {
    romanticAudio.playChime(0.95);
    onExploreStory();
  };

  return (
    <section className="relative min-h-[94vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* 3D WebGL Canvas Layer (Three.js Celestial Heart) */}
      <ThreeRomanticScene interactive={true} />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-[#060105]/50 to-[#050104] z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-rose-950/25 blur-[140px] pointer-events-none z-[1]" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-8 pb-16">
        {/* Editorial kicker with secret click */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          onClick={handleHeartSecretClick}
          className="group cursor-pointer flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rose-300/80 mb-6 font-medium hover:text-white transition-colors"
          title="Click to discover a hidden note"
        >
          <span>A Dedication For</span>
          <span className="text-amber-300 font-serif-romance text-sm font-semibold tracking-wider group-hover:scale-110 transition-transform">
            {romanticConfig.recipient.name}
          </span>
          <span aria-hidden="true">·</span>
          <span>With All My Heart</span>
          <Sparkles className="w-3 h-3 text-amber-300/70 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Secret Heart Note Toast */}
        <AnimatePresence>
          {showHeartSecret && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="mb-4 max-w-md p-3.5 rounded-2xl bg-[#220716]/95 border border-rose-400/50 shadow-[0_10px_35px_rgba(225,29,72,0.4)] text-xs text-rose-100 flex items-center gap-2.5 backdrop-blur-md"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-500 shrink-0" />
              <p className="text-left font-serif-romance text-sm italic">{romanticConfig.easterEggs.celestialHeartNote}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-serif-romance text-shimmer-rose tracking-tight leading-[1.12] max-w-3xl"
          style={{ textWrap: 'balance' }}
        >
          {romanticConfig.hero.headline}
        </motion.h1>

        {/* Hero Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-xl md:text-2xl text-rose-100/85 font-light max-w-2xl leading-relaxed font-serif-romance italic"
          style={{ textWrap: 'balance' }}
        >
          "{romanticConfig.hero.subheadline}"
        </motion.p>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <button
            onClick={handleSurpriseClick}
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-medium text-white transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_0_40px_rgba(244,63,94,0.4)] hover:shadow-[0_0_60px_rgba(244,63,94,0.65)] active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_60%)]" />
            <div className="absolute inset-0 rounded-full border border-pink-200/40" />
            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base font-sans-romance">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{romanticConfig.hero.ctaSurprise}</span>
            </span>
          </button>

          <button
            onClick={handleStoryClick}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-medium text-rose-200/95 border border-rose-500/30 bg-rose-950/20 hover:bg-rose-900/30 hover:text-white hover:border-rose-400/50 transition-all duration-300 cursor-pointer active:scale-95 backdrop-blur-md"
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span className="font-sans-romance">{romanticConfig.hero.ctaStory}</span>
          </button>
        </motion.div>
      </div>

      {/* Gentle Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        className="relative z-10 pb-8 flex flex-col items-center cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
        onClick={handleStoryClick}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-rose-300/70 mb-1 font-cinzel">Scroll to Read</span>
        <ChevronDown className="w-4 h-4 text-rose-400" />
      </motion.div>
    </section>
  );
};
