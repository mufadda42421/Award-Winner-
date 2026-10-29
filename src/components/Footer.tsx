import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { romanticConfig } from '../config/romanticConfig';
import { romanticAudio } from '../utils/romanticAudio';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const [showWhisper, setShowWhisper] = useState(false);

  const handleHeartClick = () => {
    romanticAudio.playHeartPop();
    setShowWhisper(true);
    setTimeout(() => setShowWhisper(false), 4500);
  };

  return (
    <footer className="relative border-t border-rose-950/40 bg-[#040103] py-14 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <p className="text-base font-serif-romance text-rose-200">
              Made Exclusively For {romanticConfig.recipient.name}
            </p>
            <button
              onClick={handleHeartClick}
              className="text-rose-400 font-script-romance text-2xl hover:scale-125 transition-transform cursor-pointer"
              title="Click for a tiny whisper"
            >
              ♡
            </button>
          </div>
          <p className="text-xs text-rose-300/40 mt-1 font-light font-sans-romance">
            A private universe of love, appreciation, and eternal starlight.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-rose-300/60 font-sans-romance">
          <a href="#love-letter" className="hover:text-rose-100 transition-colors">Letter</a>
          <a href="#our-universe" className="hover:text-rose-100 transition-colors">Constellation</a>
          <a href="#timeline" className="hover:text-rose-100 transition-colors">Moments</a>
          <a href="#gallery" className="hover:text-rose-100 transition-colors">Gallery</a>
          <button
            onClick={onScrollToTop}
            className="hover:text-amber-300 transition-colors cursor-pointer text-xs"
          >
            Back To Top ↑
          </button>
        </div>
      </div>

      {/* Floating Footer Secret Whisper */}
      <AnimatePresence>
        {showWhisper && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-6 text-center text-xs font-serif-romance text-amber-200 italic"
          >
            "You found another secret: You will always be my favorite thought in the quiet of the night, Khadija."
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
