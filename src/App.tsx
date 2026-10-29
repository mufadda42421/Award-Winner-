/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { ConstellationUniverse } from './components/ConstellationUniverse';
import { TimelineSection } from './components/TimelineSection';
import { MemoryGallery } from './components/MemoryGallery';
import { ReasonsSection } from './components/ReasonsSection';
import { BigSurpriseSection } from './components/BigSurpriseSection';
import { Footer } from './components/Footer';
import { FloatingParticlesOverlay } from './components/FloatingParticlesOverlay';
import { SparkleCursorTrail } from './components/SparkleCursorTrail';
import { SecretWhispersModal } from './components/SecretWhispersModal';
import { romanticAudio } from './utils/romanticAudio';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleToggleAudio = () => {
    const playing = romanticAudio.toggle();
    setIsAudioPlaying(playing);
  };

  const handleEnterExperience = () => {
    setShowIntro(false);
  };

  const handleScrollToSurprise = () => {
    const el = document.getElementById('the-surprise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToStory = () => {
    const el = document.getElementById('love-letter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    romanticAudio.playChime(1.0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050104] text-[#fceeed] font-sans-romance selection:bg-rose-500/30 selection:text-white">
      {/* Delicate Falling Rose Petals & Shimmer Star Overlay */}
      <FloatingParticlesOverlay />

      {/* Subtle Fairy-dust Star Trail on Desktop Cursor */}
      <SparkleCursorTrail />

      {/* Cinematic Full-Screen Intro */}
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro
            onEnter={handleEnterExperience}
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={handleToggleAudio}
          />
        )}
      </AnimatePresence>

      {/* Main Website Flow */}
      <div className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        {/* Navigation Bar adhering to Top Bar Contract */}
        <Navbar
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
          onSurpriseClick={handleScrollToSurprise}
        />

        <main>
          {/* Section 3: Hero with 3D Three.js Heart */}
          <HeroSection
            onDiscoverSurprise={handleScrollToSurprise}
            onExploreStory={handleScrollToStory}
          />

          {/* Section 4: The Interactive Love Letter */}
          <LoveLetterSection />

          {/* Section 5: Our Little Universe (5 Interactive Stars) */}
          <ConstellationUniverse />

          {/* Section 6: A Timeline of Us */}
          <TimelineSection />

          {/* Section 7: Our Memory Gallery */}
          <MemoryGallery />

          {/* Section 8: The Reasons I Choose You */}
          <ReasonsSection />

          {/* Section 9: The Big Surprise */}
          <BigSurpriseSection />
        </main>

        {/* Quiet, Elegant Footer */}
        <Footer onScrollToTop={handleScrollToTop} />

        {/* Khadija's Jar of Whispers Floating Charm & Modal */}
        <SecretWhispersModal />
      </div>
    </div>
  );
}
