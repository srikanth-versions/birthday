"use client";

import React, { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { BirthdayExperience } from "@/components/BirthdayExperience";
import { MusicController } from "@/components/MusicController";
import { NameModal } from "@/components/NameModal";
import { romanticAudio } from "@/components/AudioEngine";

export default function Home() {
  const [herName, setHerName] = useState("SWATHI");
  const [showExperience, setShowExperience] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  // Load custom name from localStorage & Auto-play music on enter/first interaction
  useEffect(() => {
    const savedName = localStorage.getItem("celeste_her_name");
    if (savedName) {
      setHerName(savedName);
    } else {
      localStorage.setItem("celeste_her_name", "SWATHI");
    }

    // Auto-start music attempt on enter
    const startAudio = () => {
      romanticAudio.play();
      setIsPlayingMusic(true);
    };

    startAudio();

    // Browser interaction listener to guarantee autoplay works on first touch/click
    const handleFirstInteraction = () => {
      startAudio();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const handleSaveName = (newName: string) => {
    setHerName(newName);
    localStorage.setItem("celeste_her_name", newName);
  };

  // Triggered when user clicks "Open Your Surprise ✨"
  const handleOpenSurprise = () => {
    // Ensure audio is playing
    romanticAudio.play();
    setIsPlayingMusic(true);

    // Cinematic transition effect
    setIsTransitioning(true);
    setTimeout(() => {
      setShowExperience(true);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  const handleToggleMusic = () => {
    const playing = romanticAudio.togglePlay();
    setIsPlayingMusic(playing);
  };

  const handleReturnToHero = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowExperience(false);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  return (
    <main className="relative min-h-screen bg-[#12080D] text-[#FFF1F4] overflow-x-hidden selection:bg-[#641A35] selection:text-[#FFF1F4]">
      
      {/* Cinematic Transition Container */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          isTransitioning ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"
        }`}
      >
        {!showExperience ? (
          <HeroSection
            herName={herName}
            onOpenSurprise={handleOpenSurprise}
            onOpenNameModal={() => setIsNameModalOpen(true)}
            isPlayingMusic={isPlayingMusic}
          />
        ) : (
          <BirthdayExperience
            herName={herName}
            onReturnToHero={handleReturnToHero}
          />
        )}
      </div>

      {/* Floating Corner Music Controller (Stays persistent) */}
      <MusicController
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
      />

      {/* Her Name Personalization Modal */}
      <NameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        currentName={herName}
        onSaveName={handleSaveName}
      />

    </main>
  );
}
