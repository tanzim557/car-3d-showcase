'use client';

import React from 'react';
import { CAR_PARTS, type CarPartHotspot } from '@/data/carSpecs';
import { soundManager } from '@/lib/sound';
import { Crosshair } from 'lucide-react';

interface HotspotNavigationProps {
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: CarPartHotspot) => void;
}

export const HotspotNavigation: React.FC<HotspotNavigationProps> = ({
  activeHotspotId,
  onSelectHotspot,
}) => {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-30 flex justify-center px-4 pointer-events-none">
      <div className="glass-panel rounded-2xl p-1.5 flex items-center gap-1.5 overflow-x-auto max-w-full pointer-events-auto shadow-2xl backdrop-blur-2xl border border-white/10">
        <div className="px-3.5 py-1.5 text-[11px] font-mono tracking-wider text-neutral-300 hidden md:flex items-center gap-1.5 border-r border-white/10 shrink-0 font-bold">
          <Crosshair className="w-3.5 h-3.5 text-[#FF5800]" />
          <span>INSPECT 720S</span>
        </div>

        {CAR_PARTS.map((part) => {
          const isActive = activeHotspotId === part.id;
          return (
            <button
              key={part.id}
              onClick={() => {
                soundManager.playTransition();
                onSelectHotspot(part);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF5800] to-[#FF7700] text-black font-extrabold shadow-[0_0_18px_rgba(255,88,0,0.5)] scale-100'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? 'bg-black' : 'bg-[#FF5800]'
                }`}
              />
              <span>{part.name.split(' ')[0]} {part.name.split(' ')[1] || ''}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
