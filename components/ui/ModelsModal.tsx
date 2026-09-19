'use client';

import React, { useState } from 'react';
import { X, ChevronRight, Zap, Gauge, Flame, Check } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface ModelsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelsModal: React.FC<ModelsModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<'super' | 'ultimate' | 'hybrid' | 'gt'>('super');

  if (!isOpen) return null;

  const categories = [
    { id: 'super', label: 'SUPER SERIES' },
    { id: 'ultimate', label: 'ULTIMATE SERIES' },
    { id: 'hybrid', label: 'HIGH-PERFORMANCE HYBRID' },
    { id: 'gt', label: 'GRAND TOURER' },
  ];

  const modelsData = {
    super: [
      {
        name: 'McLaren 750S Coupe',
        power: '740 hp',
        zeroToHundred: '2.7s',
        topSpeed: '332 km/h',
        engine: '4.0L Twin-Turbo V8',
        tag: 'ACTIVE BENCHMARK',
        desc: 'The benchmark supercar: lighter, more powerful, and purer than ever.',
      },
      {
        name: 'McLaren 750S Spider',
        power: '740 hp',
        zeroToHundred: '2.8s',
        topSpeed: '332 km/h',
        engine: '4.0L Twin-Turbo V8',
        tag: 'RETRACTABLE HARDTOP',
        desc: 'Open-air visceral acoustic thrill with 11-second roof operation.',
      },
      {
        name: 'McLaren 765LT',
        power: '755 hp',
        zeroToHundred: '2.7s',
        topSpeed: '330 km/h',
        engine: '4.0L Twin-Turbo V8',
        tag: 'LONGTAIL LIMITED',
        desc: 'Radical track-honed aerodynamics, titanium quad exhausts, extreme downforce.',
      },
    ],
    ultimate: [
      {
        name: 'McLaren P1™',
        power: '903 hp',
        zeroToHundred: '2.8s',
        topSpeed: '350 km/h',
        engine: '3.8L Twin-Turbo V8 + E-Motor',
        tag: 'THE HYPERCAR PIONEER',
        desc: 'The defining hypercar of a generation with Formula 1 IPAS and DRS.',
      },
      {
        name: 'McLaren Senna',
        power: '789 hp',
        zeroToHundred: '2.8s',
        topSpeed: '340 km/h',
        engine: '4.0L Twin-Turbo V8',
        tag: 'TRACK FOCUSED',
        desc: '800 kg downforce at 250 km/h: pure race-car performance for the road.',
      },
      {
        name: 'McLaren Speedtail',
        power: '1,055 hp',
        zeroToHundred: '12.8s (0-300)',
        topSpeed: '403 km/h',
        engine: '4.0L V8 Hybrid Hyper-GT',
        tag: '403 KM/H HYPER-GT',
        desc: 'Central driving position, flexible carbon ailerons, streamlined aerodynamic purity.',
      },
    ],
    hybrid: [
      {
        name: 'McLaren Artura',
        power: '671 hp',
        zeroToHundred: '3.0s',
        topSpeed: '330 km/h',
        engine: '3.0L Twin-Turbo V6 + Axial Flux E-Motor',
        tag: 'NEXT-GEN PHEV',
        desc: 'Ultra-light McLaren Carbon Lightweight Architecture (MCLA) with pure EV mode.',
      },
      {
        name: 'McLaren Artura Spider',
        power: '690 hp',
        zeroToHundred: '3.0s',
        topSpeed: '330 km/h',
        engine: '3.0L Twin-Turbo V6 Hybrid',
        tag: 'OPEN COCKPIT HYBRID',
        desc: 'Electro-chromatic glass roof, visceral 8,500 RPM soundtrack.',
      },
    ],
    gt: [
      {
        name: 'McLaren GTS',
        power: '626 hp',
        zeroToHundred: '3.2s',
        topSpeed: '326 km/h',
        engine: '4.0L Twin-Turbo V8',
        tag: 'REFINED PERFORMANCE',
        desc: 'Luggage space for cross-continent touring paired with true supercar agility.',
      },
    ],
  };

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
      <div className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl glass-panel border border-white/15 bg-[#0B0D13]/95 shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black italic tracking-widest text-white uppercase font-sans">
              MCLAREN
            </span>
            <span className="text-xs font-mono font-bold text-[#FFA866] bg-[#FF5800]/20 px-2.5 py-0.5 rounded-full border border-[#FF5800]/40">
              VEHICLE SHOWCASE
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

        {/* Category Tabs */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/10 overflow-x-auto shrink-0 bg-white/[0.02]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat.id as typeof selectedCategory);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#FF5800] text-black shadow-[0_0_15px_rgba(255,88,0,0.4)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Models Grid */}
        <div className="p-6 overflow-y-auto space-y-4">
          {modelsData[selectedCategory].map((model, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF5800]/50 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-black text-white group-hover:text-[#FFA866] transition-colors font-sans">
                    {model.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#FFA866] border border-white/10 font-semibold">
                    {model.tag}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 font-sans mb-3 leading-relaxed">
                  {model.desc}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                  <Flame className="w-3 h-3 text-[#FF5800]" />
                  <span>{model.engine}</span>
                </div>
              </div>

              {/* Performance Specs */}
              <div className="flex items-center gap-4 shrink-0 font-mono">
                <div className="text-center px-3 py-2 rounded-xl bg-white/[0.04]">
                  <span className="text-[9px] text-neutral-400 block">OUTPUT</span>
                  <span className="text-sm font-bold text-white">{model.power}</span>
                </div>
                <div className="text-center px-3 py-2 rounded-xl bg-white/[0.04]">
                  <span className="text-[9px] text-neutral-400 block">0-100 KM/H</span>
                  <span className="text-sm font-bold text-[#FF5800]">{model.zeroToHundred}</span>
                </div>
                <div className="text-center px-3 py-2 rounded-xl bg-white/[0.04]">
                  <span className="text-[9px] text-neutral-400 block">TOP SPEED</span>
                  <span className="text-sm font-bold text-white">{model.topSpeed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono text-neutral-400 shrink-0">
          <span>CURRENT FOCUS: MCLAREN 750S APEX</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-[#FF5800] text-black font-bold text-xs hover:bg-[#FF6E00] transition-colors"
          >
            EXPERIENCE 750S IN 3D →
          </button>
        </div>
      </div>
    </div>
  );
};
