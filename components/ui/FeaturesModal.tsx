'use client';

import React from 'react';
import { X, Cpu, Gauge, Wind, Shield, Crosshair, ArrowUpRight } from 'lucide-react';
import { CAR_PARTS, type CarPartHotspot } from '@/data/carSpecs';
import { soundManager } from '@/lib/sound';

interface FeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeature: (part: CarPartHotspot) => void;
}

export const FeaturesModal: React.FC<FeaturesModalProps> = ({
  isOpen,
  onClose,
  onSelectFeature,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-auto animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={() => {
          soundManager.playClick();
          onClose();
        }}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl glass-panel border border-white/15 bg-[#090B10]/95 shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-[#FF5800]" />
            <span className="text-xl font-black italic tracking-widest text-white uppercase font-sans">
              750S INNOVATION & FEATURES
            </span>
            <span className="text-xs font-mono font-bold text-[#FFA866] bg-[#FF5800]/20 px-2.5 py-0.5 rounded-full border border-[#FF5800]/40">
              5 BENCHMARKS
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Features List */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs font-mono text-neutral-400">
            CLICK "INSPECT IN 3D" ON ANY FEATURE TO DIRECTLY ZOOM THE CAMERA AND EXPLORE:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CAR_PARTS.map((part) => (
              <div
                key={part.id}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF5800]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono tracking-widest text-[#FF5800] uppercase font-bold">
                      {part.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      BENCHMARK
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#FFA866] transition-colors mb-1 font-sans">
                    {part.name}
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans mb-3">
                    {part.subtitle}
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-4">
                    {part.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundManager.playTransition();
                    onSelectFeature(part);
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-[#FF5800] text-neutral-300 hover:text-black font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-transparent"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>INSPECT IN 3D</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono text-neutral-400 shrink-0">
          <span>THE LIGHTEST & MOST POWERFUL SERIES-PRODUCTION MCLAREN</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-[#FF5800] text-black font-bold text-xs hover:bg-[#FF6E00] transition-colors"
          >
            CLOSE & RETURN →
          </button>
        </div>
      </div>
    </div>
  );
};
