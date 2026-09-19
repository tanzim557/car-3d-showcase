'use client';

import React from 'react';
import { Volume2, VolumeX, Lightbulb, RotateCcw, Power } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface HeaderProps {
  headlightsOn: boolean;
  onToggleHeadlights: () => void;
  onResetCamera: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  engineRunning: boolean;
  onToggleEngine: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  headlightsOn,
  onToggleHeadlights,
  onResetCamera,
  soundEnabled,
  onToggleSound,
  engineRunning,
  onToggleEngine,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 pointer-events-none">
      {/* McLaren Brand Header */}
      <div className="pointer-events-auto flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5800]" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#FFA866] font-bold uppercase">
              SUPER SERIES // MSO
            </span>
          </div>
          <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            <span>MCLAREN</span>
            <span className="text-neutral-500 font-light">/</span>
            <span className="text-[#FF5800]">720S</span>
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="pointer-events-auto flex items-center gap-2">
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
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
            engineRunning
              ? 'bg-[#FF5800] text-black shadow-[0_0_20px_rgba(255,88,0,0.5)]'
              : 'glass-panel text-neutral-300 hover:text-white border-white/10 hover:border-[#FF5800]/40'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {engineRunning ? 'V8 RUNNING' : 'START V8'}
          </span>
        </button>

        {/* Headlights Toggle */}
        <button
          onClick={() => {
            soundManager.playHeadlights(!headlightsOn);
            onToggleHeadlights();
          }}
          title="Toggle Headlights"
          className={`p-2 rounded-xl transition-all ${
            headlightsOn
              ? 'bg-white/15 text-[#FFA866] border border-[#FF5800]/40'
              : 'glass-button text-neutral-400 hover:text-white'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          title="Toggle Audio"
          className="p-2 rounded-xl glass-button text-neutral-400 hover:text-white"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-[#FF5800]" />
          ) : (
            <VolumeX className="w-4 h-4 text-neutral-500" />
          )}
        </button>

        {/* Reset Camera */}
        <button
          onClick={() => {
            soundManager.playClick();
            onResetCamera();
          }}
          title="Reset Showroom View"
          className="p-2 rounded-xl glass-button text-neutral-400 hover:text-white"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
