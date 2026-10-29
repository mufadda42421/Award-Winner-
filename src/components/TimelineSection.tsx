import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, HeartHandshake, Heart, Compass, BookOpen } from 'lucide-react';
import { romanticConfig, TimelineEntry } from '../config/romanticConfig';
import { romanticAudio } from '../utils/romanticAudio';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-amber-300" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-rose-300" />,
  Heart: <Heart className="w-5 h-5 text-pink-400 fill-pink-500/30" />,
  Compass: <Compass className="w-5 h-5 text-amber-200" />,
};

export const TimelineSection: React.FC = () => {
  const { title, subtitle, cards } = romanticConfig.timeline;

  return (
    <section id="timeline" className="relative py-32 px-6 bg-[#070105] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-950/15 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-rose-300/80 font-medium mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Chronicles Of Us</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-romance text-white leading-tight">
            {title}
          </h2>
          <p className="mt-4 text-sm text-rose-200/60 leading-relaxed font-sans-romance font-light">
            {subtitle}
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Central Glowing Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-6 bottom-6 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-500/20 via-pink-400/50 to-amber-500/20 shadow-[0_0_15px_rgba(244,63,94,0.3)]" />

          {/* Cards List */}
          <div className="space-y-16 md:space-y-20">
            {cards.map((card: TimelineEntry, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={card.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#18040f] border-2 border-rose-400/70 flex items-center justify-center shadow-[0_0_25px_rgba(244,63,94,0.5)]">
                      {iconMap[card.iconName] || <Heart className="w-4 h-4 text-rose-400" />}
                    </div>
                  </div>

                  {/* Card Content Container */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isEven ? 'md:pl-14' : 'md:pr-14'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-70px" }}
                      transition={{ duration: 0.8, delay: index * 0.12 }}
                      onMouseEnter={() => romanticAudio.playChime(0.9)}
                      className="group p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1d0612] via-[#12030a] to-[#0a0106] border border-rose-500/20 hover:border-rose-400/50 transition-all duration-500 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(225,29,72,0.25)] relative overflow-hidden"
                    >
                      {/* Subtle corner aura */}
                      <div className="absolute -top-16 -right-16 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl group-hover:bg-rose-600/20 transition-all duration-500 pointer-events-none" />

                      {/* Chapter Indicator (Anti-slop: clean text with separator) */}
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-medium mb-3">
                        <span className="font-cinzel">{card.phase}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-rose-300/70">{card.tagline}</span>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-2xl sm:text-3xl font-serif-romance text-white mb-3 group-hover:text-rose-100 transition-colors">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-rose-100/85 leading-relaxed font-light mb-5 font-sans-romance">
                        {card.description}
                      </p>

                      {/* Highlight Quote */}
                      <div className="pt-4 border-t border-rose-500/15 flex items-start gap-2 text-sm text-rose-200/95 italic font-serif-romance leading-relaxed">
                        <span className="text-amber-300 font-bold text-lg leading-none">“</span>
                        <span>{card.highlight}</span>
                        <span className="text-amber-300 font-bold text-lg leading-none">”</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
