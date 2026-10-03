"use client";

import React, { useState } from "react";
import { Heart, Sparkles, ArrowRight, Music, Edit3 } from "lucide-react";
import { Hero3DScene } from "./Hero3DScene";

interface HeroSectionProps {
  herName: string;
  onOpenSurprise: () => void;
  onOpenNameModal: () => void;
  isPlayingMusic: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  herName,
  onOpenSurprise,
  onOpenNameModal,
  isPlayingMusic,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#12080D]">
      
      {/* 3D WebGL Background Scene */}
      <Hero3DScene />

      {/* Atmospheric Radial Gradients for Romantic Depth */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#12080D] via-[#12080D]/50 to-transparent pointer-events-none z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#12080D] via-[#12080D]/60 to-transparent pointer-events-none z-10"></div>
      <div className="absolute -left-20 top-1/3 w-96 h-96 bg-[#641A35]/25 rounded-full blur-[130px] pointer-events-none z-10 animate-subtle-pulse"></div>

      {/* TOP EDITORIAL NAVIGATION HEADER */}
      <header className="relative z-20 w-full px-6 sm:px-12 lg:px-20 py-8 flex items-center justify-between">
        
        {/* Brand Logo / Symbol */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full glass-romantic-badge flex items-center justify-center border border-[#C77C8A]/40 text-[#E8A6B5] shadow-lg">
            <Heart className="w-4 h-4 fill-[#E8A6B5]" />
          </div>
          <span className="font-serif-editorial text-xl font-medium tracking-widest text-[#FFF1F4] uppercase">
            CELESTE
          </span>
        </div>

        {/* Navigation Links (Editorial Style matching reference) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-[#FFF1F4]/70">
          <a href="#memories" className="hover:text-[#E8A6B5] transition-colors relative group py-1">
            MEMORIES
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C77C8A] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#story" className="hover:text-[#E8A6B5] transition-colors relative group py-1">
            OUR STORY
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C77C8A] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#notes" className="hover:text-[#E8A6B5] transition-colors relative group py-1">
            LOVE NOTES
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C77C8A] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#surprise" className="hover:text-[#E8A6B5] transition-colors relative group py-1">
            SURPRISE
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C77C8A] group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        {/* Top Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNameModal}
            className="glass-romantic-badge px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider text-[#D9B88F] hover:text-[#FFF1F4] hover:border-[#D9B88F] transition-all flex items-center gap-1.5"
            title="Edit Her Name"
          >
            <Edit3 className="w-3 h-3 text-[#D9B88F]" />
            <span className="hidden sm:inline">FOR: {herName}</span>
          </button>
        </div>

      </header>

      {/* MAIN HERO EDITORIAL CONTENT CONTAINER */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-10 my-auto flex flex-col justify-center">
        
        {/* Left Column Content Layout (Matching exact hierarchy in prompt) */}
        <div className="max-w-2xl text-left space-y-6">
          
          {/* 1. SMALL ELEGANT BADGE */}
          <div className="inline-flex items-center gap-2.5 glass-romantic-badge px-4 py-2 rounded-full shadow-lg border border-[#C77C8A]/30">
            <span className="w-2 h-2 rounded-full bg-[#E8A6B5] animate-ping"></span>
            <span className="text-xs font-bold tracking-widest text-[#FFF1F4] uppercase">
              MADE JUST FOR YOU ❤️
            </span>
          </div>

          {/* 2. SHORT ROMANTIC HEADLINE */}
          <h2 className="text-lg sm:text-2xl text-[#E8A6B5] font-serif-editorial tracking-wide font-normal leading-snug">
            Today is a little more special because it's your day.
          </h2>

          {/* 3. HUGE OVERSIZED BRAND TEXT ("HER NAME") */}
          <div className="py-2">
            <h1 className="text-6xl sm:text-8xl md:text-[7rem] lg:text-[8.5rem] font-serif-editorial font-light tracking-tight text-oversized-brand leading-[0.9] select-none uppercase">
              {herName}
            </h1>
          </div>

          {/* 4. CONCISE SUPPORTING DESCRIPTION */}
          <p className="text-sm sm:text-base text-[#FFF1F4]/80 font-light max-w-md leading-relaxed tracking-wide pt-1">
            I made this little corner of the internet just to make you smile and remind you how special you are to me.
          </p>

          {/* 5. PREMIUM CTA BUTTON */}
          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={onOpenSurprise}
              className="btn-rose-wine group relative px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-[#FFF1F4] flex items-center gap-3 overflow-hidden cursor-pointer"
            >
              {/* Subtle inner light shine sweep */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              
              <span className="relative z-10 flex items-center gap-2">
                Open Your Surprise ✨
              </span>
              <div className="w-7 h-7 rounded-full bg-[#FFF1F4]/10 group-hover:bg-[#FFF1F4]/20 flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-[#FFF1F4] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>

        </div>

      </div>

      {/* SCROLL INDICATOR (Bottom Left matching EOSAI reference layout) */}
      <footer className="relative z-20 w-full px-6 sm:px-12 lg:px-20 py-8 flex items-center justify-between text-xs tracking-widest text-[#FFF1F4]/50">
        <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={onOpenSurprise}>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#E8A6B5]/80">
            SCROLL
          </span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-[#C77C8A] to-transparent relative overflow-hidden">
            <div className="w-full h-1/2 bg-[#FFF1F4] absolute top-0 animate-bounce"></div>
          </div>
        </div>

        <div className="hidden sm:block text-[11px] text-[#FFF1F4]/40 tracking-wider">
          CELESTE • EDITORIAL EXPERIENCE
        </div>
      </footer>

    </section>
  );
};
