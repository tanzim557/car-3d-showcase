'use client';

import React from 'react';
import { Menu, Volume2, VolumeX, Lightbulb, Power, RotateCcw, Sun, Moon } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface McLarenHeaderProps {
  headlightsOn: boolean;
  onToggleHeadlights: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  engineRunning: boolean;
  onToggleEngine: () => void;
  onOpenMenu: () => void;
  onOpenModels: () => void;
  onOpenRacing: () => void;
  onOpenFeatures: () => void;
  onReplayIntro?: () => void;
  isDayMode: boolean;
  onToggleDayNight: () => void;
}

export const McLarenHeader: React.FC<McLarenHeaderProps> = ({
  headlightsOn,
  onToggleHeadlights,
  soundEnabled,
  onToggleSound,
  engineRunning,
  onToggleEngine,
  onOpenMenu,
  onOpenModels,
  onOpenRacing,
  onOpenFeatures,
  onReplayIntro,
  isDayMode,
  onToggleDayNight,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-3 sm:px-8 py-3 sm:py-5 pointer-events-none">
      {/* Left: Minimalist Hamburger Menu */}
      <div className="pointer-events-auto flex items-center">
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenMenu();
          }}
          className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-full text-white hover:text-[#FF5800] bg-black/50 backdrop-blur-xl transition-all border border-white/15 hover:border-[#FF5800]/50 shadow-2xl group cursor-pointer"
          aria-label="Toggle Menu"
          title="Supercar Lineup & Navigation"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2] group-hover:scale-105 transition-transform" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold hidden sm:inline text-neutral-200 group-hover:text-white">
            LINEUP
          </span>
        </button>
      </div>

      {/* Center: Official McLaren Wordmark Logo with Speedmark */}
      <div className="pointer-events-auto flex items-center justify-center">
        <button
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer bg-black/50 backdrop-blur-xl border border-white/15 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full shadow-2xl hover:border-[#FF5800]/60 transition-all group"
          onClick={() => {
            soundManager.playClick();
            if (onReplayIntro) onReplayIntro();
          }}
          title="Replay Supercar Drive-In Entrance"
        >
          <span className="text-sm sm:text-lg md:text-xl font-black italic tracking-widest text-white uppercase select-none font-sans drop-shadow-md">
            MCLAREN
          </span>
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5800] -mt-0.5 sm:-mt-1 fill-current transform rotate-6 drop-shadow-[0_0_8px_rgba(255,88,0,0.8)] group-hover:scale-110 transition-transform"
            viewBox="0 0 24 24"
          >
            <path d="M2.5 14.5C6.5 7.5 13 4 21.5 3C15 6.5 10 11.5 7.5 19.5C6.5 16 4.5 15 2.5 14.5Z" />
          </svg>
        </button>
      </div>

      {/* Right: High-Contrast Navigation & Controls Capsule */}
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 bg-black/50 backdrop-blur-xl border border-white/15 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-2xl shrink-0">
        {/* Navigation Links — Desktop & Tablet only (Available in Hamburger on mobile) */}
        <nav className="hidden md:flex items-center gap-1 text-xs tracking-wider text-white font-semibold font-sans">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenModels();
            }}
            className="px-2.5 py-1 rounded-lg hover:text-[#FFA866] hover:bg-white/10 transition-all cursor-pointer"
            title="Browse McLaren Models"
          >
            Models
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenRacing();
            }}
            className="px-2.5 py-1 rounded-lg hover:text-[#FFA866] hover:bg-white/10 transition-all cursor-pointer"
            title="McLaren Formula 1 & Racing"
          >
            Racing
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenFeatures();
            }}
            className="px-2.5 py-1 rounded-lg hover:text-[#FFA866] hover:bg-white/10 transition-all cursor-pointer"
            title="750S Technical Features"
          >
            Features
          </button>
        </nav>

        <div className="hidden md:block w-[1px] h-4 bg-white/20 mx-0.5" />

        {/* Replay Drive-In Button — Large screens */}
        {onReplayIntro && (
          <button
            onClick={() => {
              soundManager.playClick();
              onReplayIntro();
            }}
            title="Replay Supercar Drive-In Entrance"
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold bg-white/10 text-neutral-200 hover:text-[#FFA866] hover:bg-[#FF5800]/20 border border-white/10 hover:border-[#FF5800]/40 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden xl:inline">DRIVE IN</span>
          </button>
        )}

        {/* Engine Start / Stop Button */}
        <button
          onClick={() => {
            if (!engineRunning) {
              soundManager.playEngineStart();
            } else {
              soundManager.playClick();
            }
            onToggleEngine();
          }}
          className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] font-bold transition-all ${
            engineRunning
              ? 'bg-[#FF5800] text-black shadow-[0_0_15px_rgba(255,88,0,0.6)] animate-pulse'
              : 'bg-white/10 text-white hover:bg-[#FF5800]/20 hover:text-[#FFA866] border border-white/10 hover:border-[#FF5800]/40'
          }`}
          title={engineRunning ? 'Stop Engine' : 'Ignite 4.0L Twin-Turbo V8'}
        >
          <Power className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">
            {engineRunning ? 'V8 RUNNING' : 'START V8'}
          </span>
        </button>

        {/* Day / Night Mode Toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            onToggleDayNight();
          }}
          title={isDayMode ? 'Switch to Night Mode 🌙' : 'Switch to Day Mode ☀️'}
          className={`relative p-1.5 rounded-full transition-all duration-500 cursor-pointer ${
            isDayMode
              ? 'text-yellow-300 bg-yellow-400/20 shadow-[0_0_12px_rgba(250,204,21,0.5)]'
              : 'text-blue-300 bg-blue-400/15 shadow-[0_0_12px_rgba(147,197,253,0.4)]'
          }`}
        >
          {isDayMode ? (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" style={{ animationDuration: '8s' }} />
          ) : (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </button>

        {/* Headlight Toggle */}
        <button
          onClick={() => {
            soundManager.playHeadlights(!headlightsOn);
            onToggleHeadlights();
          }}
          title={headlightsOn ? 'Headlights: ON' : 'Headlights: OFF'}
          className={`p-1.5 rounded-full transition-all cursor-pointer ${
            headlightsOn
              ? 'text-[#FFA866] bg-[#FF5800]/20'
              : 'text-neutral-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          className={`p-1.5 rounded-full transition-all cursor-pointer ${
            soundEnabled
              ? 'text-[#FF5800] hover:bg-white/10'
              : 'text-neutral-400 hover:text-white hover:bg-white/10'
          }`}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5800]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500" />
          )}
        </button>
      </div>
    </header>
  );
};
