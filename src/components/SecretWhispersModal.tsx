import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, RefreshCw, Feather } from 'lucide-react';
import { romanticConfig } from '../config/romanticConfig';
import { romanticAudio } from '../utils/romanticAudio';

export const SecretWhispersModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whisperIndex, setWhisperIndex] = useState(0);
  const whispers = romanticConfig.secretWhispers;

  const handleOpen = () => {
    romanticAudio.playHeartPop();
    const randomIndex = Math.floor(Math.random() * whispers.length);
    setWhisperIndex(randomIndex);
    setIsOpen(true);
  };

  const handleDrawNext = () => {
    romanticAudio.playChime(1.1);
    setWhisperIndex((prev) => (prev + 1) % whispers.length);
  };

  return (
    <>
      {/* Floating Charm Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#2a0718] via-[#1a0410] to-[#12020a] border border-rose-500/40 text-rose-200 hover:text-white shadow-[0_10px_30px_rgba(225,29,72,0.4)] hover:shadow-[0_12px_40px_rgba(225,29,72,0.6)] transition-all cursor-pointer backdrop-blur-md"
          title="Open Khadija's Jar of Whispers"
          aria-label="Open Khadija's Jar of Whispers"
        >
          {/* Subtle pulse aura */}
          <div className="absolute -inset-1 rounded-full bg-rose-500/20 blur-sm group-hover:bg-rose-500/35 transition-all" />

          <div className="relative z-10 w-7 h-7 rounded-full bg-rose-950/80 border border-amber-300/40 flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500 group-hover:scale-110 transition-transform" />
          </div>

          <span className="relative z-10 text-xs font-serif-romance text-rose-100 group-hover:text-amber-200 transition-colors whitespace-nowrap">
            Khadija's Whispers
          </span>

          <Sparkles className="relative z-10 w-3 h-3 text-amber-300 group-hover:rotate-45 transition-transform" />
        </motion.button>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-gradient-to-b from-[#250716] via-[#1a040f] to-[#100108] border border-rose-500/40 rounded-3xl p-8 sm:p-10 shadow-[0_30px_90px_rgba(244,63,94,0.45)] text-center overflow-hidden"
            >
              {/* Radial glow background */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-600/25 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-rose-300/70 hover:text-white hover:bg-rose-900/40 transition-colors cursor-pointer"
                aria-label="Close whispers modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top Icon */}
              <div className="w-14 h-14 rounded-full bg-rose-950/80 border border-amber-300/50 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(244,63,94,0.4)]">
                <Feather className="w-6 h-6 text-amber-300" />
              </div>

              {/* Header */}
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300 font-medium mb-1 font-cinzel">
                A Secret Whisper
              </p>
              <h3 className="text-xl font-serif-romance text-white mb-6">
                For Khadija's Heart
              </h3>

              {/* The Whisper Note Content */}
              <motion.div
                key={whisperIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-2xl bg-[#14030d] border border-rose-500/20 relative"
              >
                <div className="text-xs font-serif-romance text-amber-300/70 mb-2 italic">
                  Note #{whisperIndex + 1} of {whispers.length}
                </div>
                <p className="text-base sm:text-lg font-serif-romance text-rose-100 italic leading-relaxed">
                  "{whispers[whisperIndex]}"
                </p>
              </motion.div>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={handleDrawNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-amber-200 border border-amber-400/30 bg-amber-950/30 hover:bg-amber-900/40 hover:text-white hover:border-amber-300 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                  <span>Draw Another Whisper</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-medium text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 transition-all cursor-pointer shadow-md"
                >
                  Keep in Heart ♡
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
