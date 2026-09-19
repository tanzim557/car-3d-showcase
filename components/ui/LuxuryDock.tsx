'use client';

import React, { useState } from 'react';
import {
  CAR_COLORS,
  CAR_PARTS,
  CAMERA_ANGLES,
  type ColorOption,
  type CarPartHotspot,
  type CameraAnglePreset,
  type LightingPreset,
} from '@/data/carSpecs';
import {
  Palette,
  Crosshair,
  Camera,
  Gauge,
  Sun,
  Orbit,
  ChevronUp,
  ChevronDown,
  X,
} from 'lucide-react';
import { soundManager } from '@/lib/sound';

type DockTab = 'livery' | 'parts' | 'vantage' | 'specs' | 'studio' | null;

interface LuxuryDockProps {
  activeColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
  activeHotspot: CarPartHotspot | null;
  onSelectHotspot: (hotspot: CarPartHotspot) => void;
  activeAngle: CameraAnglePreset | null;
  onSelectAngle: (angle: CameraAnglePreset) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  lightingPreset: LightingPreset;
  onSelectLighting: (preset: LightingPreset) => void;
}

export const LuxuryDock: React.FC<LuxuryDockProps> = ({
  activeColor,
  onSelectColor,
  activeHotspot,
  onSelectHotspot,
  activeAngle,
  onSelectAngle,
  autoRotate,
  onToggleAutoRotate,
  lightingPreset,
  onSelectLighting,
}) => {
  const [activeTab, setActiveTab] = useState<DockTab>('livery');

  const handleTabClick = (tab: DockTab) => {
    soundManager.playClick();
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex flex-col items-center px-4 pointer-events-none">
      {/* EXPANDABLE CONTEXT DRAWER */}
      {activeTab && (
        <div className="mb-3 pointer-events-auto max-w-xl w-full animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="glass-panel rounded-2xl p-4 border border-white/10 shadow-2xl backdrop-blur-2xl relative">
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-3 right-3 p-1 rounded-full text-neutral-400 hover:text-white bg-white/5 transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* TAB 1: LIVERY */}
            {activeTab === 'livery' && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF5800] uppercase font-bold">
                    MSO BESPOKE PAINTWORK
                  </span>
                  <span className="text-xs font-bold text-white pr-6">
                    {activeColor.name}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {CAR_COLORS.map((color) => {
                    const isSelected = activeColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => {
                          soundManager.playColorSelect();
                          onSelectColor(color);
                        }}
                        className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
                          isSelected
                            ? 'bg-white/10 ring-1 ring-[#FF5800]'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full transition-transform ${
                            isSelected ? 'scale-110' : 'group-hover:scale-105'
                          }`}
                          style={{
                            backgroundColor: color.hex,
                            boxShadow: isSelected
                              ? `0 0 14px ${color.hex}`
                              : '0 2px 6px rgba(0,0,0,0.5)',
                          }}
                        />
                        <span className="text-[9px] font-mono text-neutral-400 group-hover:text-white truncate max-w-full">
                          {color.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: PARTS */}
            {activeTab === 'parts' && (
              <div>
                <div className="text-[10px] font-mono tracking-widest text-[#FF5800] uppercase font-bold mb-2.5">
                  EXPLORE KEY AERODYNAMICS & MECHANICS
                </div>
                <div className="flex flex-wrap gap-2">
                  {CAR_PARTS.map((part) => {
                    const isSelected = activeHotspot?.id === part.id;
                    return (
                      <button
                        key={part.id}
                        onClick={() => {
                          soundManager.playTransition();
                          onSelectHotspot(part);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#FF5800] text-black font-extrabold shadow-[0_0_15px_rgba(255,88,0,0.4)]'
                            : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-black' : 'bg-[#FF5800]'
                          }`}
                        />
                        <span>{part.name.split('(')[0].trim()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: VANTAGE */}
            {activeTab === 'vantage' && (
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF5800] uppercase font-bold">
                    CINEMATIC CAMERA ANGLES
                  </span>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onToggleAutoRotate();
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all pr-6 ${
                      autoRotate
                        ? 'bg-[#FF5800] text-black font-bold'
                        : 'bg-white/5 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <Orbit
                      className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`}
                    />
                    <span>360° ROTATE</span>
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {CAMERA_ANGLES.map((angle) => {
                    const isSelected = activeAngle?.id === angle.id;
                    return (
                      <button
                        key={angle.id}
                        onClick={() => {
                          soundManager.playTransition();
                          onSelectAngle(angle);
                        }}
                        className={`px-2 py-2 rounded-xl text-center text-xs font-mono transition-all ${
                          isSelected
                            ? 'bg-white/20 text-white font-bold border border-white/20'
                            : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {angle.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: SPECS */}
            {activeTab === 'specs' && (
              <div>
                <div className="text-[10px] font-mono tracking-widest text-[#FF5800] uppercase font-bold mb-2.5">
                  MCLAREN 720S TECHNICAL BENCHMARKS
                </div>
                <div className="grid grid-cols-4 gap-2 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-white/[0.04]">
                    <span className="text-[9px] text-neutral-400 block mb-0.5">
                      POWER
                    </span>
                    <span className="text-base font-extrabold text-white">
                      720 PS
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04]">
                    <span className="text-[9px] text-neutral-400 block mb-0.5">
                      0-100 KM/H
                    </span>
                    <span className="text-base font-extrabold text-[#FF5800]">
                      2.7s
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04]">
                    <span className="text-[9px] text-neutral-400 block mb-0.5">
                      MAX SPEED
                    </span>
                    <span className="text-base font-extrabold text-white">
                      341 KM/H
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.04]">
                    <span className="text-[9px] text-neutral-400 block mb-0.5">
                      WEIGHT
                    </span>
                    <span className="text-base font-extrabold text-neutral-200">
                      1,283 KG
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: STUDIO */}
            {activeTab === 'studio' && (
              <div>
                <div className="text-[10px] font-mono tracking-widest text-[#FF5800] uppercase font-bold mb-2.5">
                  SHOWROOM LIGHTING ATMOSPHERE
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'golden-track', label: 'TRACK SUNSET', desc: 'Warm Amber Horizon' },
                    { id: 'apex-neon', label: 'APEX STUDIO', desc: 'Pure Automotive Key' },
                    { id: 'cyber-midnight', label: 'STEALTH NIGHT', desc: 'Nocturnal Underglow' },
                  ].map((mode) => {
                    const isSelected = lightingPreset === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => {
                          soundManager.playClick();
                          onSelectLighting(mode.id as LightingPreset);
                        }}
                        className={`p-2.5 rounded-xl text-left font-mono transition-all ${
                          isSelected
                            ? 'bg-[#FF5800]/20 border border-[#FF5800]/50 text-white'
                            : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs font-bold block">{mode.label}</span>
                        <span className="text-[9px] text-neutral-400 block mt-0.5">
                          {mode.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PRIMARY FLOATING LUXURY PILL BAR */}
      <div className="glass-panel rounded-full px-2 py-1.5 flex items-center gap-1 pointer-events-auto border border-white/12 shadow-2xl backdrop-blur-2xl">
        <button
          onClick={() => handleTabClick('livery')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'livery'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-[#FF5800]" />
          <span>LIVERY</span>
        </button>

        <button
          onClick={() => handleTabClick('parts')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'parts'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Crosshair className="w-3.5 h-3.5 text-[#FF5800]" />
          <span>HOTSPOTS</span>
        </button>

        <button
          onClick={() => handleTabClick('vantage')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'vantage'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Camera className="w-3.5 h-3.5 text-[#FF5800]" />
          <span>ANGLES</span>
        </button>

        <button
          onClick={() => handleTabClick('specs')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'specs'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Gauge className="w-3.5 h-3.5 text-[#FF5800]" />
          <span>SPECS</span>
        </button>

        <button
          onClick={() => handleTabClick('studio')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'studio'
              ? 'bg-white text-black font-bold shadow-md'
              : 'text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sun className="w-3.5 h-3.5 text-[#FF5800]" />
          <span>STUDIO</span>
        </button>
      </div>
    </div>
  );
};
