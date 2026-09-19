'use client';

import React from 'react';
import { X, Cpu, CheckCircle2, Gauge, ShieldAlert } from 'lucide-react';
import type { CarPartHotspot } from '@/data/carSpecs';
import { soundManager } from '@/lib/sound';

interface HotspotCardProps {
  hotspot: CarPartHotspot | null;
  onClose: () => void;
}

export const HotspotCard: React.FC<HotspotCardProps> = ({ hotspot, onClose }) => {
  if (!hotspot) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-24 left-3 right-3 sm:left-6 sm:right-6 md:left-auto md:right-8 md:top-24 md:bottom-auto md:w-[420px] z-40 pointer-events-auto transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-right-6">
      <div className="glass-panel rounded-2xl p-4 sm:p-6 relative overflow-hidden backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-h-[76vh] overflow-y-auto">
        {/* Ambient Papaya glow in corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5800]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          aria-label="Close part details"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category Pill */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-bold uppercase bg-[#FF5800]/20 text-[#FFA866] border border-[#FF5800]/30">
            {hotspot.category}
          </span>
          <span className="text-neutral-500 text-xs">•</span>
          <span className="text-[11px] font-mono text-neutral-400 tracking-wider">
            TECHNICAL BREAKDOWN
          </span>
        </div>

        {/* Title and Subtitle */}
        <h3 className="text-xl font-extrabold tracking-tight text-white mb-1">
          {hotspot.name}
        </h3>
        <p className="text-xs text-[#FFA866] font-mono mb-4">
          {hotspot.subtitle}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {hotspot.specs.map((spec, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col"
            >
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 mb-0.5 flex items-center gap-1">
                <Gauge className="w-2.5 h-2.5 text-[#FF5800]" />
                {spec.label}
              </span>
              <span className="text-xs font-bold text-white tracking-tight">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Technical Description */}
        <p className="text-xs text-neutral-300 leading-relaxed mb-4">
          {hotspot.description}
        </p>

        {/* Highlights */}
        <div className="border-t border-white/[0.08] pt-3.5 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-[#FF5800]" />
            AERODYNAMIC & CHASSIS HIGHLIGHTS
          </span>
          <ul className="space-y-1.5">
            {hotspot.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5800] shrink-0 mt-0.5" />
                <span className="leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
