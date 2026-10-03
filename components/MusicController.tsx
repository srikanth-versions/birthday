"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Music, Pause, Play } from "lucide-react";
import { romanticAudio } from "./AudioEngine";

interface MusicControllerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const MusicController: React.FC<MusicControllerProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    romanticAudio.setMute(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      romanticAudio.setMute(true);
    } else if (isMuted) {
      setIsMuted(false);
      romanticAudio.setMute(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Expanded Audio Bar */}
      <div className="glass-romantic-badge px-4 py-2.5 rounded-full flex items-center gap-3 shadow-2xl border border-[#C77C8A]/30 transition-all duration-300 hover:border-[#E8A6B5]/50 group">
        
        {/* Equalizer animation when playing */}
        <div className="flex items-end gap-0.5 h-4 w-5 cursor-pointer" onClick={onTogglePlay} title={isPlaying ? "Pause Music" : "Play Music"}>
          {isPlaying ? (
            <>
              <span className="w-1 bg-[#E8A6B5] rounded-full animate-eq-1"></span>
              <span className="w-1 bg-[#D9B88F] rounded-full animate-eq-2"></span>
              <span className="w-1 bg-[#C77C8A] rounded-full animate-eq-3"></span>
              <span className="w-1 bg-[#E8A6B5] rounded-full animate-eq-4"></span>
            </>
          ) : (
            <>
              <span className="w-1 h-1.5 bg-[#C77C8A]/60 rounded-full"></span>
              <span className="w-1 h-2.5 bg-[#C77C8A]/60 rounded-full"></span>
              <span className="w-1 h-1.5 bg-[#C77C8A]/60 rounded-full"></span>
              <span className="w-1 h-2 bg-[#C77C8A]/60 rounded-full"></span>
            </>
          )}
        </div>

        {/* Track Title */}
        <div className="flex flex-col text-left hidden sm:flex">
          <span className="text-[10px] uppercase tracking-widest text-[#E8A6B5]/70 font-semibold">
            Birthday Serenade
          </span>
          <span className="text-xs text-[#FFF1F4] font-medium tracking-wide">
            {isPlaying ? "♪ Playing For You" : "♪ Paused"}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className="p-1.5 rounded-full hover:bg-[#641A35]/50 text-[#FFF1F4] transition-colors"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-[#E8A6B5]" />
          ) : (
            <Play className="w-4 h-4 text-[#D9B88F] fill-[#D9B88F]" />
          )}
        </button>

        {/* Mute Button */}
        <button
          onClick={handleToggleMute}
          className="p-1.5 rounded-full hover:bg-[#641A35]/50 text-[#FFF1F4] transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-red-300" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#E8A6B5]" />
          )}
        </button>

        {/* Hover Volume Slider */}
        <div className="relative flex items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 accent-[#C77C8A] bg-[#3B0D1E] h-1 rounded-lg cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            title="Volume"
          />
        </div>

      </div>
    </div>
  );
};
