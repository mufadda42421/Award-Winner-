import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart, RotateCcw, Bookmark, Share2 } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';
import { romanticAudio } from '../utils/romanticAudio';

export const BigSurpriseSection: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [hasCopiedVow, setHasCopiedVow] = useState(false);
  const { teaserHeading, teaserSubheading, boxLabel, revealedTitle, messageBody, dedicationFooter, replayButtonText } =
    romanticConfig.surprise;

  const triggerConfettiBurst = () => {
    // 3-Stage Golden & Rose Heart Confetti Burst
    const end = Date.now() + 3.0 * 1000;
    const colors = ['#f43f5e', '#fb7185', '#fbbf24', '#f59e0b', '#ffffff', '#fda4af'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 80,
        origin: { x: 0.15, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 80,
        origin: { x: 0.85, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 8,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleOpenBox = () => {
    romanticAudio.playSurpriseFanfare();
    setIsOpened(true);
    triggerConfettiBurst();
  };

  const handleReplay = () => {
    romanticAudio.playChime(1.0);
    setIsOpened(false);
  };

  const handleCopyKeepsake = () => {
    romanticAudio.playHeartPop();
    const text = `${messageBody.join('\n\n')}\n\n${dedicationFooter}`;
    navigator.clipboard?.writeText(text);
    setHasCopiedVow(true);
    setTimeout(() => setHasCopiedVow(false), 2800);
  };

  return (
    <section id="the-surprise" className="relative py-36 px-6 overflow-hidden min-h-[92vh] flex items-center justify-center">
      {/* Dynamic atmospheric aura when opened vs unopened */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isOpened ? 'opacity-100' : 'opacity-25'
        }`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-rose-600/30 via-pink-600/25 to-amber-500/30 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300 font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>The Heart of Everything</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-romance text-white leading-tight">
            {teaserHeading}
          </h2>
          <p className="mt-4 text-sm text-rose-200/60 max-w-md mx-auto leading-relaxed font-sans-romance font-light">
            {isOpened ? "Revealed with all my heart, exclusively for you." : teaserSubheading}
          </p>
        </div>

        {/* Center Surprise Interactive Container */}
        <div className="w-full relative flex flex-col items-center min-h-[440px] justify-center">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              /* The Glowing 3D Gift Box */
              <motion.div
                key="gift-box"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.15, opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleOpenBox}
                className="group cursor-pointer relative flex flex-col items-center"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleOpenBox();
                }}
                aria-label="Open romantic surprise gift box"
              >
                {/* Radial Glow under box */}
                <div className="absolute -inset-10 bg-gradient-to-r from-rose-600/40 via-amber-500/30 to-pink-600/40 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

                {/* Box Container */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-[#9f1239] via-[#881337] to-[#4c0519] rounded-3xl p-1.5 shadow-[0_30px_70px_rgba(225,29,72,0.55)] border-2 border-amber-300/50 group-hover:border-amber-200 transition-all duration-300 group-hover:-translate-y-2 flex items-center justify-center">
                  {/* Gold Satin Ribbon Cross */}
                  <div className="absolute inset-x-0 h-10 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 shadow-lg" />
                  <div className="absolute inset-y-0 w-10 left-1/2 -translate-x-1/2 bg-gradient-to-b from-amber-400 via-amber-200 to-amber-500 shadow-lg" />

                  {/* Gold Bow on top */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-200 to-amber-400 border border-white/70 shadow-[0_0_25px_rgba(251,191,36,0.9)] flex items-center justify-center animate-bounce">
                      <Gift className="w-7 h-7 text-rose-950" />
                    </div>
                  </div>

                  {/* Center Emblem */}
                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#280715] border border-amber-300/70 flex items-center justify-center shadow-xl">
                    <Heart className="w-9 h-9 text-rose-400 fill-rose-500/70" />
                  </div>
                </div>

                {/* Box Label CTA */}
                <div className="mt-10 flex flex-col items-center gap-2">
                  <span className="text-lg font-serif-romance text-amber-200 font-medium tracking-wide">
                    {boxLabel}
                  </span>
                  <span className="text-xs text-rose-300/80 uppercase tracking-widest flex items-center gap-2 font-medium font-sans-romance">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Click to reveal what's inside
                  </span>
                </div>
              </motion.div>
            ) : (
              /* Revealed Magical Surprise Message */
              <motion.div
                key="revealed-surprise"
                initial={{ scale: 0.92, opacity: 0, y: 35 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-gradient-to-b from-[#280717] via-[#1a040f] to-[#0d0107] border-2 border-rose-500/40 rounded-3xl p-8 sm:p-14 shadow-[0_35px_100px_rgba(225,29,72,0.5)] relative overflow-hidden"
              >
                {/* Background Shimmer & Floating Glow */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-72 h-72 bg-radial from-amber-400/35 to-transparent blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  {/* Top Heart Emblem */}
                  <div className="w-14 h-14 rounded-full bg-rose-600/30 border border-rose-400/60 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(244,63,94,0.6)]">
                    <Heart className="w-7 h-7 text-rose-400 fill-rose-500" />
                  </div>

                  {/* Revealed Title */}
                  <h3 className="text-2xl sm:text-3xl font-serif-romance text-amber-200 uppercase tracking-widest font-normal">
                    {revealedTitle}
                  </h3>

                  {/* Message Body as strictly specified in prompt */}
                  <div className="space-y-4 max-w-xl mx-auto text-base sm:text-lg md:text-xl font-light text-rose-100 leading-relaxed font-sans-romance">
                    <p className="text-rose-200 italic font-serif-romance text-2xl sm:text-3xl leading-snug">
                      "{messageBody[0]}"
                    </p>

                    <div className="py-3 space-y-2 font-medium text-white text-2xl sm:text-3xl font-serif-romance">
                      <p className="text-rose-300 drop-shadow">{messageBody[1]}</p>
                      <p className="text-pink-200 drop-shadow">{messageBody[2]}</p>
                      <p className="text-amber-200 drop-shadow">{messageBody[3]}</p>
                    </div>

                    <p className="text-base sm:text-lg text-rose-100/90 leading-relaxed pt-2 font-light">
                      {messageBody[4]}
                    </p>

                    <p className="text-2xl sm:text-3xl font-serif-romance text-rose-300 font-semibold pt-3 leading-snug">
                      {messageBody[5]}
                    </p>
                  </div>

                  {/* Dedication Footer */}
                  <div className="pt-8 border-t border-rose-500/20">
                    <p className="text-lg sm:text-xl font-serif-romance text-amber-200/95 italic">
                      {dedicationFooter}
                    </p>
                  </div>

                  {/* Interactive Keepsake & Replay Buttons */}
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleCopyKeepsake}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-amber-200 border border-amber-400/30 bg-amber-950/30 hover:bg-amber-900/40 hover:text-white hover:border-amber-300 transition-colors cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-amber-300" />
                      <span>{hasCopiedVow ? "Keepsake Saved to Clipboard!" : "Save Love Keepsake"}</span>
                    </button>

                    <button
                      onClick={handleReplay}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-rose-200 border border-rose-500/30 bg-rose-950/40 hover:bg-rose-900/50 hover:text-white hover:border-rose-400 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{replayButtonText}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
