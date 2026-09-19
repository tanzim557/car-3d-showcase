'use client';

import React from 'react';
import { CAR_COLORS, type ColorOption } from '@/data/carSpecs';
import { soundManager } from '@/lib/sound';
import { Palette, Sparkles } from 'lucide-react';

interface ColorCustomizerProps {
  activeColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
}

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  activeColor,
  onSelectColor,
}) => {
  return (
    <div className="fixed top-24 left-6 z-30 pointer-events-auto hidden sm:block animate-in fade-in slide-in-from-left-4">
      <div className="glass-panel rounded-2xl p-4 w-60 backdrop-blur-2xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-300">
            <Palette className="w-3.5 h-3.5 text-[#FF5800]" />
            <span className="tracking-wider uppercase font-bold">MSO LIVERY</span>
          </div>
          <span className="text-[9px] font-mono text-[#FFA866] bg-[#FF5800]/15 px-2 py-0.5 rounded border border-[#FF5800]/30 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            CLEARCOAT PBR
          </span>
        </div>

        {/* Selected Color Name & Tag */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white tracking-tight">
              {activeColor.name}
            </span>
          </div>
          <span className="inline-block text-[9px] font-mono tracking-wider font-semibold text-[#FF5800] uppercase mt-0.5">
            {activeColor.tag}
          </span>
          <p className="text-[10px] text-neutral-400 leading-tight mt-1">
            {activeColor.description}
          </p>
        </div>

        {/* Color Swatches */}
        <div className="grid grid-cols-6 gap-2 pt-2.5 border-t border-white/10">
          {CAR_COLORS.map((color) => {
            const isSelected = activeColor.id === color.id;
            return (
              <button
                key={color.id}
                onClick={() => {
                  soundManager.playColorSelect();
                  onSelectColor(color);
                }}
                title={`${color.name} (${color.tag})`}
                className={`w-7 h-7 rounded-full transition-all relative flex items-center justify-center ${
                  isSelected
                    ? 'ring-2 ring-[#FF5800] ring-offset-2 ring-offset-[#08090C] scale-115 shadow-[0_0_15px_rgba(255,88,0,0.6)]'
                    : 'hover:scale-105 opacity-80 hover:opacity-100 hover:ring-1 hover:ring-white/40'
                }`}
                style={{
                  backgroundColor: color.hex,
                  boxShadow: isSelected
                    ? `0 0 16px ${color.hex}`
                    : '0 2px 6px rgba(0,0,0,0.5)',
                }}
              >
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
