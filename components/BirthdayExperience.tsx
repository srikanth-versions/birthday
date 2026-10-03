"use client";

import React, { useState } from "react";
import { Heart, Sparkles, Gift, Star, Calendar, Mail, RefreshCw, X } from "lucide-react";
import confetti from "canvas-confetti";

interface BirthdayExperienceProps {
  herName: string;
  onReturnToHero: () => void;
}

export const BirthdayExperience: React.FC<BirthdayExperienceProps> = ({
  herName,
  onReturnToHero,
}) => {
  const [wishMade, setWishMade] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Photos loaded directly from the images folder
  const [photos] = useState<string[]>([
    "/photos/img1.png",
    "/photos/img2.jpeg",
    "/photos/img3.jpeg",
    "/photos/img4.jpeg",
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleMakeWish = () => {
    setWishMade(true);

    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#C77C8A", "#E8A6B5", "#D9B88F", "#641A35"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#C77C8A", "#E8A6B5", "#D9B88F", "#641A35"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const loveReasons = [
    {
      title: "Your Electric Smile",
      description: "When you smile at me, everything else disappears — it's the most beautiful thing I've ever seen.",
      icon: "✨",
    },
    {
      title: "Your Kind Heart",
      description: "I don't know how you are with your friends and family, but with me, you've always been so kind and caring.",
      icon: "💖",
    },
    {
      title: "Our Shared Dreams",
      description: "Building memories, laughing until our stomachs hurt, and growing together side by side.",
      icon: "🌌",
    },
    {
      title: "Your Unique Grace",
      description: "You get angry and possessive quickly, but after every fight or argument, you're always the first to say sorry — without any ego. That takes real love.",
      icon: "🌹",
    },
  ];

  const memories = [
    {
      date: "CHAPTER I",
      title: "The First Spark",
      text: "I still remember the first time we met. The way our eyes met for the first time is a moment I'll always remember.",
    },
    {
      date: "CHAPTER II",
      title: "Unforgettable Adventures",
      text: "Late night conversations, endless laughter, and discovering new corners of the world together.",
    },
    {
      date: "CHAPTER III",
      title: "Today & Forever",
      text: "Celebrating the incredible, beautiful person you are on your special day.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#12080D] text-[#FFF1F4] py-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#641A35]/20 rounded-full blur-[120px] pointer-events-none animate-subtle-pulse"></div>
      <div className="absolute bottom-1/3 right-10 w-[30rem] h-[30rem] bg-[#3B0D1E]/30 rounded-full blur-[150px] pointer-events-none animate-subtle-pulse"></div>

      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        
        {/* Experience Header */}
        <div className="text-center space-y-4 pt-10">
          <div className="inline-flex items-center gap-2 glass-romantic-badge px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-[#E8A6B5] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HAPPY BIRTHDAY, {herName}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif-editorial text-[#FFF1F4] font-light tracking-tight max-w-3xl mx-auto leading-tight">
            A Celebration of You & Everything You Mean To Me
          </h1>
          <p className="text-sm sm:text-base text-[#FFF1F4]/70 max-w-xl mx-auto leading-relaxed">
            Every day with you is a gift, but today is dedicated entirely to honouring your laughter, your heart, and your wonderful spirit.
          </p>
        </div>

        {/* PHOTO GALLERY (Sourced directly from your uploaded images, upload button removed) */}
        <div className="space-y-8 glass-romantic-card p-8 sm:p-12 rounded-3xl border border-[#C77C8A]/30">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-[#D9B88F] font-semibold">
              MEMORIES & MOMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial text-[#FFF1F4] mt-1">
              Captured Moments of Joy
            </h2>
          </div>

          {/* Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {photos.map((src, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(src)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#C77C8A]/30 cursor-pointer shadow-xl hover:border-[#E8A6B5] transition-all duration-500 hover:-translate-y-1"
              >
                <img
                  src={src}
                  alt={`Memory ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-xs text-[#FFF1F4] font-medium flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#E8A6B5] fill-[#E8A6B5]" /> Memory #{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Reasons Why You Are Loved Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-[#D9B88F] font-semibold">
              INTIMATE REFLECTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial text-[#FFF1F4] mt-1">
              Just A Few Reasons Why You Are Loved
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loveReasons.map((reason, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                className={`glass-romantic-card p-8 rounded-2xl transition-all duration-500 cursor-pointer border ${
                  activeCard === idx
                    ? "border-[#E8A6B5]/60 -translate-y-1 bg-[#3B0D1E]/40"
                    : "border-[#C77C8A]/20"
                }`}
              >
                <div className="text-3xl mb-4">{reason.icon}</div>
                <h3 className="text-2xl font-serif-editorial text-[#FFF1F4] mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-[#FFF1F4]/70 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Chapter Timeline */}
        <div className="glass-romantic-card p-8 sm:p-12 rounded-3xl border border-[#C77C8A]/30 relative overflow-hidden">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#E8A6B5] font-semibold">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-editorial text-[#FFF1F4] mt-1">
              Moments Written in the Stars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {memories.map((mem, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#12080D]/60 border border-[#C77C8A]/20 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#D9B88F] uppercase">
                    {mem.date}
                  </span>
                  <h4 className="text-xl font-serif-editorial text-[#FFF1F4] mt-2 mb-3">
                    {mem.title}
                  </h4>
                  <p className="text-xs text-[#FFF1F4]/70 leading-relaxed">
                    {mem.text}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#C77C8A]/15 flex items-center justify-between text-[#E8A6B5]/60 text-xs">
                  <span>Forever Cherished</span>
                  <Heart className="w-3.5 h-3.5 fill-[#C77C8A]/40" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Make A Wish Interactive Candle / Star */}
        <div className="text-center space-y-6 glass-romantic-card p-10 sm:p-16 rounded-3xl border border-[#D9B88F]/40 shadow-2xl relative">
          <div className="inline-flex p-4 rounded-full bg-[#641A35]/40 text-[#D9B88F] mb-2">
            <Star className="w-8 h-8 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-editorial text-[#FFF1F4] font-light">
            Make A Birthday Wish
          </h2>
          <p className="text-sm text-[#FFF1F4]/70 max-w-md mx-auto">
            Close your eyes, think of something beautiful you want for this coming year, and release your wish into the night.
          </p>

          {!wishMade ? (
            <button
              onClick={handleMakeWish}
              className="btn-rose-wine px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase text-[#FFF1F4] inline-flex items-center gap-3 group"
            >
              <Sparkles className="w-4 h-4 text-[#D9B88F] group-hover:rotate-45 transition-transform" />
              <span>Release Your Wish ✨</span>
            </button>
          ) : (
            <div className="p-6 rounded-2xl bg-[#3B0D1E]/60 border border-[#E8A6B5]/50 inline-block animate-float-slow">
              <p className="text-lg font-serif-editorial text-[#E8A6B5]">
                "May all your wildest dreams, softest desires, and happiest moments come true." ❤️
              </p>
              <span className="text-xs text-[#D9B88F] mt-2 block">
                ✨ Your wish has been sent to the cosmos!
              </span>
            </div>
          )}
        </div>

        {/* Section 4: Sealed Letter Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => setLetterOpen(true)}
            className="glass-romantic-badge px-6 py-3.5 rounded-full text-xs font-semibold tracking-widest text-[#FFF1F4] uppercase inline-flex items-center gap-2 hover:border-[#E8A6B5] transition-all"
          >
            <Mail className="w-4 h-4 text-[#C77C8A]" />
            <span>Open Secret Birthday Letter 💌</span>
          </button>
        </div>

        {/* Return to Top / Hero */}
        <div className="text-center pt-8 border-t border-[#C77C8A]/20">
          <button
            onClick={onReturnToHero}
            className="text-xs text-[#FFF1F4]/60 hover:text-[#FFF1F4] inline-flex items-center gap-2 uppercase tracking-widest transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#E8A6B5]" />
            <span>Return to Hero View</span>
          </button>
        </div>

      </div>

      {/* Photo Lightbox Popup */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden border border-[#E8A6B5]/40 shadow-2xl">
            <img src={selectedPhoto} alt="Enlarged Memory" className="max-w-full max-h-[85vh] object-contain" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-black/60 text-[#FFF1F4] p-2 rounded-full hover:bg-black/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Secret Personal Letter Modal */}
      {letterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-romantic-card p-6 sm:p-8 rounded-3xl w-full max-w-xl relative border border-[#D9B88F]/50 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setLetterOpen(false)}
              className="absolute top-4 right-4 text-[#FFF1F4]/60 hover:text-[#FFF1F4] p-1 text-lg rounded-full hover:bg-[#641A35]/40 transition-colors"
            >
              ✕
            </button>

            <div className="text-center space-y-3 pt-1">
              <div className="inline-flex p-2.5 rounded-full bg-[#641A35]/50 text-[#E8A6B5]">
                <Heart className="w-5 h-5 fill-[#E8A6B5]" />
              </div>

              <span className="block text-xs uppercase tracking-widest text-[#D9B88F] font-bold">
                PERSONAL LETTER
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif-editorial text-[#FFF1F4] font-normal">
                To My Dearest {herName},
              </h3>

              <div className="text-left text-sm text-[#FFF1F4]/90 leading-relaxed font-serif-editorial space-y-3 pt-3 border-t border-[#C77C8A]/20">
                <p>
                  Every year we feel more happy and more excited for that one day! Today is yours — make it well and be happy with your friends and families. 🎂
                </p>
                <p>
                  Aprm Summa Summa Kova Padaama, Samandhamey Illaama Depress Aagaama, Posukku Posukkunu Sanda Podaama, Theva Illadha Dhaa Nenachi Odambaiyum Seri, Manasaiyum Seri Keduthukkaadha Lekha… Puriyum Nu Namburen. ❤️
                </p>
                <p>
                  Enakku Kadavul Nambikkai Laam Illa, But Oruvela Irundharu Naa! Avaroda Aasirvaadham Yeppodhum Irukkum. Indha Year Unakku Nalla Badiya Amaiya Ennudaiya Vazhthukkal. And By The Way, Happy Birthday Lekha! Konjam 3 Hours Late Aachi… Paravaala, Vachikko! ❤️
                </p>
                <p className="text-right text-[#D9B88F] pt-2 font-semibold text-base">
                  With all my love, always ❤️
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setLetterOpen(false)}
                  className="btn-rose-wine px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#FFF1F4]"
                >
                  Close Letter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
