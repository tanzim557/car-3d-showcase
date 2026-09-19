'use client';

import React from 'react';
import { Power, Flame } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface EngineStartButtonProps {
  engineRunning: boolean;
  onToggleEngine: () => void;
  onRevEngine: () => void;
}

export const EngineStartButton: React.FC<EngineStartButtonProps> = ({
  engineRunning,
  onToggleEngine,
  onRevEngine,
}) => {
  return (
    <div className="fixed top-24 right-6 z-30 pointer-events-auto flex items-center gap-2">
      {/* Rev Throttle Button (Only shown when engine is ON) */}
      {engineRunning && (
        <button
          onClick={() => {
            soundManager.playRev();
            onRevEngine();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl glass-button text-xs font-mono text-[#FFA866] hover:text-white border-[#FF5800]/40 hover:bg-[#FF5800]/20 transition-all shadow-[0_0_15px_rgba(255,88,0,0.3)] animate-in fade-in zoom-in-95"
        >
          <Flame className="w-4 h-4 text-[#FF5800] animate-bounce" />
          <span className="font-bold tracking-wider">REV THROTTLE</span>
        </button>
      )}

      {/* Main Ignition Push Button */}
      <button
        onClick={() => {
          if (!engineRunning) {
            soundManager.playEngineStart();
          } else {
            soundManager.playClick();
          }
          onToggleEngine();
        }}
        className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-mono text-xs font-bold ${
          engineRunning
            ? 'bg-gradient-to-r from-[#FF5800] to-rose-600 text-white shadow-[0_0_25px_rgba(255,88,0,0.6)] ring-2 ring-[#FF7722]'
            : 'glass-panel text-neutral-300 hover:text-white border-white/10 hover:border-[#FF5800]/50 hover:shadow-[0_0_20px_rgba(255,88,0,0.3)]'
        }`}
      >
        <span
          className={`w-2.5 h-2.5 rounded-full transition-all ${
            engineRunning
              ? 'bg-white animate-ping'
              : 'bg-rose-500/80 group-hover:bg-rose-400'
          }`}
        />
        <Power className="w-4 h-4" />
        <span className="tracking-widest">
          {engineRunning ? 'ENGINE RUNNING' : 'START ENGINE'}
        </span>
      </button>
    </div>
  );
};
