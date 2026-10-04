"use client";

import React, { useState } from "react";
import { Heart, X, Check } from "lucide-react";

interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSaveName: (newName: string) => void;
}

export const NameModal: React.FC<NameModalProps> = ({
  isOpen,
  onClose,
  currentName,
  onSaveName,
}) => {
  const [inputName, setInputName] = useState(currentName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      onSaveName(inputName.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div className="glass-romantic-card p-6 sm:p-8 rounded-2xl w-full max-w-md relative border border-[#C77C8A]/40 shadow-2xl animate-float-slow">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#FFF1F4]/60 hover:text-[#FFF1F4] p-1 rounded-full hover:bg-[#641A35]/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3 text-[#E8A6B5]">
          <Heart className="w-5 h-5 fill-[#E8A6B5]" />
          <span className="text-xs uppercase tracking-widest font-medium">Personalize Surprise</span>
        </div>

        <h3 className="text-2xl font-serif-editorial font-normal text-[#FFF1F4] mb-2">
          Enter Her Special Name
        </h3>
        <p className="text-xs text-[#FFF1F4]/70 mb-6 leading-relaxed">
          Customize the oversized editorial title on the website to her real name.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D9B88F] font-semibold mb-2">
              Lekha
            </label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="e.g., SOPHIA, ARIA, MY LOVE"
              className="w-full bg-[#12080D]/80 border border-[#C77C8A]/40 rounded-xl px-4 py-3 text-[#FFF1F4] placeholder-[#FFF1F4]/30 focus:outline-none focus:border-[#E8A6B5] transition-colors font-serif-editorial text-xl tracking-wide uppercase"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onSaveName("LEKHA");
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl border border-[#C77C8A]/30 text-xs text-[#FFF1F4]/70 hover:text-[#FFF1F4] hover:border-[#C77C8A]/60 transition-colors"
            >
              Reset Default
            </button>
            
            <button
              type="submit"
              className="flex-1 btn-rose-wine py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#FFF1F4] flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Save Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
