import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Maximize2, MapPin, Calendar, Heart, Camera, Sliders } from 'lucide-react';
import { romanticConfig, GalleryPhoto } from '../config/romanticConfig';
import { romanticAudio } from '../utils/romanticAudio';

export const MemoryGallery: React.FC = () => {
  const { heading, subtitle, photos } = romanticConfig.gallery;
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'normal' | 'warm' | 'rose' | 'monochrome'>('normal');

  const activePhoto = activePhotoIndex !== null ? photos[activePhotoIndex] : null;

  const handleOpenPhoto = (index: number) => {
    romanticAudio.playChime(1.1);
    setActivePhotoIndex(index);
  };

  const handleNext = useCallback(() => {
    if (activePhotoIndex !== null) {
      romanticAudio.playChime(1.2);
      setActivePhotoIndex((prev) => ((prev! + 1) % photos.length));
    }
  }, [activePhotoIndex, photos.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex !== null) {
      romanticAudio.playChime(1.0);
      setActivePhotoIndex((prev) => ((prev! - 1 + photos.length) % photos.length));
    }
  }, [activePhotoIndex, photos.length]);

  const handleClose = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activePhotoIndex, handleNext, handlePrev, handleClose]);

  const getFilterClass = (filter: string) => {
    switch (filter) {
      case 'warm':
        return 'sepia-[0.25] saturate-[1.2] contrast-[1.05]';
      case 'rose':
        return 'hue-rotate-[-10deg] saturate-[1.25] contrast-[1.1] brightness-[1.02]';
      case 'monochrome':
        return 'grayscale contrast-[1.15] brightness-[0.95]';
      default:
        return '';
    }
  };

  return (
    <section id="gallery" className="relative py-32 px-6 bg-[#060105] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-rose-950/20 rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-rose-300/80 font-medium mb-3">
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span>Cinematic Scrapbook</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-romance text-white leading-tight">
            {heading}
          </h2>
          <p className="mt-4 text-sm text-rose-200/60 leading-relaxed font-sans-romance font-light">
            {subtitle}
          </p>
        </div>

        {/* Gallery Grid (Scrapbook film frame layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo: GalleryPhoto, index: number) => {
            const isFeatured = index === 0 || index === 3;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: index * 0.12 }}
                onClick={() => handleOpenPhoto(index)}
                className={`group relative cursor-pointer rounded-3xl overflow-hidden bg-[#160510] border border-rose-500/25 hover:border-rose-400/60 transition-all duration-500 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_25px_60px_-10px_rgba(225,29,72,0.35)] flex flex-col justify-between ${
                  isFeatured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Photo Frame Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-rose-950/40">
                  <img
                    src={photo.imageSrc}
                    alt={photo.altText}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14040d] via-black/25 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                  {/* Film Metadata Header Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] text-amber-200/95 font-medium tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-amber-300/20">
                    <MapPin className="w-3 h-3 text-amber-300" />
                    <span>{photo.location}</span>
                  </div>

                  {/* Expand button on hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-white inline-flex items-center justify-center hover:scale-110 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* 35mm Film Frame Perforation Accent */}
                  <div className="absolute bottom-2 left-3 text-[9px] font-mono text-white/50 tracking-widest uppercase">
                    FILM EXP 0{index + 1} · 35MM
                  </div>
                </div>

                {/* Caption Card below */}
                <div className="p-6 relative z-10 bg-gradient-to-b from-[#180512] to-[#0d0208]">
                  <div className="flex items-center justify-between text-xs text-rose-300/60 mb-2">
                    <span className="flex items-center gap-1.5 font-serif-romance text-sm text-amber-200">
                      <Calendar className="w-3.5 h-3.5 text-amber-300/80" />
                      {photo.dateOrMoment}
                    </span>
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-500/20 group-hover:scale-125 transition-transform" />
                  </div>

                  <h3 className="text-2xl font-serif-romance text-white group-hover:text-rose-100 transition-colors">
                    {photo.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-rose-100/75 leading-relaxed font-light line-clamp-2 font-sans-romance">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note on Personalization */}
        <div className="mt-14 text-center text-xs text-rose-300/50 font-light font-sans-romance">
          Easily customize all photographs and memories inside <code className="text-amber-300 font-mono">src/config/romanticConfig.ts</code>.
        </div>
      </div>

      {/* Cinema Mode Fullscreen Lightbox */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl"
            onClick={handleClose}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close cinema viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors cursor-pointer"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors cursor-pointer"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#160511] border border-rose-500/35 rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(244,63,94,0.35)] flex flex-col max-h-[92vh]"
            >
              {/* Large Image with Interactive Filter Option */}
              <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[320px] max-h-[64vh]">
                <img
                  src={activePhoto.imageSrc}
                  alt={activePhoto.altText}
                  className={`w-full h-full object-contain transition-all duration-500 ${getFilterClass(activeFilter)}`}
                />

                {/* Filter Selector in Lightbox */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/15">
                  <span className="px-2 text-[10px] uppercase font-mono text-rose-300 flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-amber-300" />
                    <span>Grading</span>
                  </span>
                  {(['normal', 'warm', 'rose', 'monochrome'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        romanticAudio.playChime(1.15);
                        setActiveFilter(mode);
                      }}
                      className={`px-2.5 py-0.5 text-[10px] rounded-full capitalize font-medium transition-colors ${
                        activeFilter === mode
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lightbox Footer Details */}
              <div className="p-6 sm:p-8 bg-gradient-to-t from-[#0e0209] to-[#1a0514] border-t border-rose-500/20">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">
                      {activePhoto.location}
                    </span>
                    <span className="text-rose-400">·</span>
                    <span className="text-xs text-rose-300/80 font-serif-romance">
                      {activePhoto.dateOrMoment}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-rose-300/70">
                    {activePhotoIndex! + 1} / {photos.length}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif-romance text-white">
                  {activePhoto.title}
                </h3>

                <p className="mt-2 text-sm sm:text-base text-rose-100/85 font-light leading-relaxed font-sans-romance">
                  {activePhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
