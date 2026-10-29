import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { romanticConfig } from '../config/romanticConfig';
import { romanticAudio } from '../utils/romanticAudio';

interface NavbarProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onSurpriseClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAudioPlaying,
  onToggleAudio,
  onSurpriseClick,
}) => {
  const [showSecretNote, setShowSecretNote] = useState(false);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    romanticAudio.playHeartPop();
    setShowSecretNote(true);
    setTimeout(() => setShowSecretNote(false), 4500);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#050104]/85 border-b border-rose-950/40 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between gap-8 relative">
        {/* Zone 1: Single text element Brand wordmark with secret easter egg click */}
        <div className="relative">
          <a
            href="#"
            onClick={handleBrandClick}
            className="text-lg md:text-xl font-normal font-serif-romance text-rose-100 hover:text-white transition-colors tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer group"
            title="A secret dedication for Khadija"
          >
            <span>For {romanticConfig.recipient.name}</span>
            <span className="text-rose-400 font-script-romance text-2xl group-hover:scale-125 transition-transform">♡</span>
          </a>

          {/* Secret Tooltip Pop-over */}
          <AnimatePresence>
            {showSecretNote && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                className="absolute top-12 left-0 z-50 w-72 p-3.5 rounded-2xl bg-[#1e0614] border border-rose-400/50 shadow-[0_10px_35px_rgba(225,29,72,0.4)] text-xs text-rose-100 leading-relaxed font-sans-romance"
              >
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-500 shrink-0 mt-0.5" />
                  <p>{romanticConfig.easterEggs.brandWordmarkNote}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Zone 2: 4–5 clean single-line nav links with hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-rose-200/70 font-cinzel">
          <a
            href="#love-letter"
            onClick={() => romanticAudio.playChime(0.95)}
            className="hover:text-rose-100 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            The Letter
          </a>
          <a
            href="#our-universe"
            onClick={() => romanticAudio.playChime(1.0)}
            className="hover:text-rose-100 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Our Universe
          </a>
          <a
            href="#timeline"
            onClick={() => romanticAudio.playChime(1.05)}
            className="hover:text-rose-100 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Moments
          </a>
          <a
            href="#gallery"
            onClick={() => romanticAudio.playChime(1.1)}
            className="hover:text-rose-100 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Gallery
          </a>
          <a
            href="#reasons"
            onClick={() => romanticAudio.playChime(1.15)}
            className="hover:text-rose-100 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Reasons
          </a>
        </nav>

        {/* Zone 3: 1 primary action button and clean audio toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleAudio}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/30 bg-rose-950/30 text-rose-200 hover:text-white hover:border-rose-400 transition-colors text-xs whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            title={isAudioPlaying ? "Mute music" : "Play music"}
            aria-label={isAudioPlaying ? "Mute music" : "Play music"}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span className="hidden sm:inline font-sans-romance text-[11px] uppercase tracking-wider">Melody On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-300/60" />
                <span className="hidden sm:inline font-sans-romance text-[11px] uppercase tracking-wider">Music</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              romanticAudio.playChime(1.2);
              onSurpriseClick();
            }}
            className="flex items-center gap-1.5 px-4.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-rose-600 to-pink-600 rounded-full hover:from-rose-500 hover:to-pink-500 transition-all shadow-[0_0_20px_rgba(244,63,94,0.35)] whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span className="font-sans-romance font-medium">Her Surprise</span>
          </button>
        </div>
      </div>
    </header>
  );
};
