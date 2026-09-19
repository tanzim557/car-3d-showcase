'use client';

import React from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import type { LightingPreset } from '@/data/carSpecs';
import { soundManager } from '@/lib/sound';

interface LightingModeBarProps {
  currentPreset: LightingPreset;
  onSelectPreset: (preset: LightingPreset) => void;
}

export const LightingModeBar: React.FC<LightingModeBarProps> = ({
  currentPreset,
  onSelectPreset,
}) => {
  const modes: { id: LightingPreset; label: string; icon: React.ReactNode }[] = [
    {
      id: 'golden-track',
      label: 'TRACK SUNSET',
      icon: <Sun className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      id: 'apex-neon',
      label: 'APEX STUDIO',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#FF5800]" />,
    },
    {
      id: 'cyber-midnight',
      label: 'STEALTH NIGHT',
      icon: <Moon className="w-3.5 h-3.5 text-cyan-400" />,
    },
  ];

  return (
    <div className="fixed top-36 right-6 z-30 pointer-events-auto hidden lg:flex flex-col items-end gap-1.5 animate-in fade-in slide-in-from-right-4">
      <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase pr-1">
        ATMOSPHERE
      </div>
      <div className="glass-panel rounded-xl p-1 flex items-center gap-1">
        {modes.map((mode) => {
          const isActive = currentPreset === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => {
                soundManager.playClick();
                onSelectPreset(mode.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                isActive
                  ? 'bg-white/15 text-white font-bold shadow-sm border border-white/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {mode.icon}
              <span className="text-[11px]">{mode.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
