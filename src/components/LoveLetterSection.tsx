import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RefreshCw, Feather } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';
import { romanticAudio } from '../utils/romanticAudio';

export const LoveLetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; scale: number }>>([]);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      romanticAudio.playSealBreak();

      // Trigger floating burst of little hearts and rose petals
      const newHearts = Array.from({ length: 16 }, (_, i) => ({
        id: Date.now() + i,
        left: 15 + Math.random() * 70,
        delay: Math.random() * 0.4,
        scale: 0.8 + Math.random() * 0.6,
      }));
      setHearts(newHearts);
      setTimeout(() => setHearts([]), 3500);
    }
    setIsOpen(true);
  };

  const handleReset = () => {
    romanticAudio.playChime(0.9);
    setIsOpen(false);
  };

  return (
    <section id="love-letter" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-rose-950/25 blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-rose-300/80 font-medium mb-3">
            <Feather className="w-3.5 h-3.5 text-amber-300" />
            <span>Handwritten For Khadija</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-romance text-white">
            The Sealed Letter
          </h2>
          <p className="mt-3 text-sm text-rose-200/60 max-w-md mx-auto font-light leading-relaxed font-sans-romance">
            {isOpen
              ? "Words written with sincere reverence, preserved for you."
              : "Click upon the royal wax seal to break the seal and unfold the handwritten letter inside."}
          </p>
        </div>

        {/* Floating hearts container when opened */}
        <div className="relative w-full flex justify-center">
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, y: 0, scale: 0.5, rotate: 0 }}
              animate={{ opacity: 0, y: -220, scale: h.scale, rotate: (Math.random() - 0.5) * 60 }}
              transition={{ duration: 2.8, delay: h.delay, ease: "easeOut" }}
              className="absolute text-rose-400 pointer-events-none z-30"
              style={{ left: `${h.left}%` }}
            >
              <Heart className="w-5 h-5 fill-rose-500/70" />
            </motion.div>
          ))}

          {/* Interactive Envelope & Letter Container */}
          <div className="w-full max-w-2xl min-h-[480px] flex items-center justify-center relative perspective-[1400px]">
            <AnimatePresence mode="wait">
              {!isOpen ? (
                /* Closed Envelope State */
                <motion.div
                  key="closed-envelope"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5 }}
                  onClick={handleOpenEnvelope}
                  className="group cursor-pointer relative w-full max-w-lg bg-gradient-to-br from-[#240612] via-[#1a040d] to-[#100208] rounded-3xl p-8 sm:p-12 border border-rose-500/30 shadow-[0_25px_70px_-15px_rgba(225,29,72,0.4)] transition-all duration-500 hover:scale-[1.02] hover:border-rose-400/60"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleOpenEnvelope();
                  }}
                  aria-label="Open sealed envelope for Khadija"
                >
                  {/* Envelope geometric diagonal folds */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 320">
                      <polygon points="0,0 250,170 500,0" fill="#380a1c" opacity="0.45" />
                      <line x1="0" y1="0" x2="250" y2="170" stroke="#f472b6" strokeWidth="1.2" opacity="0.35" />
                      <line x1="500" y1="0" x2="250" y2="170" stroke="#f472b6" strokeWidth="1.2" opacity="0.35" />
                      <line x1="0" y1="320" x2="200" y2="140" stroke="#f472b6" strokeWidth="1" opacity="0.2" />
                      <line x1="500" y1="320" x2="300" y2="140" stroke="#f472b6" strokeWidth="1" opacity="0.2" />
                    </svg>
                  </div>

                  {/* Envelope Front Typography */}
                  <div className="relative z-10 text-center py-10 space-y-3">
                    <span className="text-[11px] tracking-[0.3em] text-amber-200/80 uppercase font-cinzel font-medium">
                      Private Dedication
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-serif-romance text-white tracking-wide">
                      For Khadija
                    </h3>
                    <p className="text-xs text-rose-200/60 max-w-xs mx-auto font-light">
                      Carefully penned, sealed with eternal warmth.
                    </p>
                  </div>

                  {/* Embossed Wax Seal Button */}
                  <div className="relative z-20 flex justify-center -mb-6">
                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                      {/* Wax Seal Outer Rim */}
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-amber-950 border-2 border-amber-300/70 flex items-center justify-center shadow-[0_0_35px_rgba(225,29,72,0.65)]">
                        {/* Inner imprint with monogram */}
                        <div className="w-14 h-14 rounded-full border border-amber-200/50 flex items-center justify-center bg-radial from-rose-800/80 to-red-950">
                          <span className="font-serif-romance text-3xl font-bold text-amber-100 drop-shadow-md">
                            {romanticConfig.loveLetter.envelopeSealLetter}
                          </span>
                        </div>
                      </div>
                      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-sans-romance text-amber-200 font-medium tracking-widest uppercase">
                        Break Wax Seal
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Unfolded Letter State (Antiqued Luxury Parchment) */
                <motion.div
                  key="opened-letter"
                  initial={{ opacity: 0, y: 35, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -25, scale: 0.94 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full bg-[#180510] border border-rose-500/35 rounded-3xl p-8 sm:p-14 shadow-[0_30px_90px_-15px_rgba(225,29,72,0.4)] relative"
                >
                  {/* Subtle parchment border & corner flourishes */}
                  <div className="absolute inset-3 border border-rose-500/15 rounded-2xl pointer-events-none" />

                  {/* Top Letter Header */}
                  <div className="flex items-center justify-between border-b border-rose-500/20 pb-4 mb-8">
                    <div className="flex items-center gap-2">
                      <Feather className="w-4 h-4 text-amber-300" />
                      <span className="text-xs uppercase tracking-[0.25em] text-rose-300/80 font-medium">
                        Personal Letter
                      </span>
                    </div>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 text-xs text-rose-300/70 hover:text-white transition-colors cursor-pointer px-3 py-1 rounded-full border border-rose-500/20 hover:border-rose-400/40"
                      title="Fold back into envelope"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Fold Envelope</span>
                    </button>
                  </div>

                  {/* Letter Salutation */}
                  <h3 className="text-3xl sm:text-4xl font-serif-romance text-rose-100 mb-6 italic">
                    {romanticConfig.loveLetter.salutation}
                  </h3>

                  {/* Letter Paragraphs with graceful staggered entrance */}
                  <div className="space-y-5 text-sm sm:text-base leading-relaxed text-rose-100/90 font-light font-sans-romance">
                    {romanticConfig.loveLetter.paragraphs.map((paragraph, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + idx * 0.18 }}
                        className={idx === 0 ? "first-letter:text-4xl first-letter:font-serif-romance first-letter:text-amber-200 first-letter:mr-1 first-letter:float-left" : ""}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  {/* Letter Closing & Signature */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="mt-10 pt-6 border-t border-rose-500/20 flex flex-col items-end"
                  >
                    <p className="text-xs text-rose-300/70 uppercase tracking-widest font-sans-romance">
                      {romanticConfig.loveLetter.closing}
                    </p>
                    <p className="text-2xl sm:text-3xl font-serif-romance text-amber-200 mt-1 italic">
                      {romanticConfig.loveLetter.signature}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
