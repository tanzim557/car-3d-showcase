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
  Sun,
  Orbit,
  X,
  Sparkles,
} from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface ConfiguratorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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

export const ConfiguratorDrawer: React.FC<ConfiguratorDrawerProps> = ({
  isOpen,
  onClose,
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
  const [tab, setTab] = useState<'paint' | 'parts' | 'angles' | 'studio'>('paint');

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-2 sm:bottom-6 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 max-w-2xl w-full pointer-events-auto border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl relative max-h-[82vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors z-10"
          aria-label="Close Configurator"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tab Headers */}
        <div className="flex items-center gap-1.5 sm:gap-2 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/10 overflow-x-auto scrollbar-none pr-8">
          <button
            onClick={() => {
              soundManager.playClick();
              setTab('paint');
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold whitespace-nowrap transition-all ${
              tab === 'paint'
                ? 'bg-[#FF5800] text-black shadow-[0_0_12px_rgba(255,88,0,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>MSO PAINT</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setTab('parts');
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold whitespace-nowrap transition-all ${
              tab === 'parts'
                ? 'bg-[#FF5800] text-black shadow-[0_0_12px_rgba(255,88,0,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>HOTSPOTS</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setTab('angles');
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold whitespace-nowrap transition-all ${
              tab === 'angles'
                ? 'bg-[#FF5800] text-black shadow-[0_0_12px_rgba(255,88,0,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>ANGLES</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setTab('studio');
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold whitespace-nowrap transition-all ${
              tab === 'studio'
                ? 'bg-[#FF5800] text-black shadow-[0_0_12px_rgba(255,88,0,0.4)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>STUDIO</span>
          </button>
        </div>

        {/* Tab 1: Paint Customizer */}
        {tab === 'paint' && (
          <div>
            <div className="flex items-center justify-between mb-2.5 text-xs font-mono">
              <span className="text-white font-bold">{activeColor.name}</span>
              <span className="text-[#FFA866] text-[10px] bg-[#FF5800]/15 px-2 py-0.5 rounded border border-[#FF5800]/30 font-bold">
                {activeColor.tag}
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {CAR_COLORS.map((c) => {
                const isSelected = activeColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      soundManager.playColorSelect();
                      onSelectColor(c);
                    }}
                    className={`group flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-all ${
                      isSelected
                        ? 'bg-white/10 ring-2 ring-[#FF5800]'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-transform ${
                        isSelected ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: c.hex,
                        boxShadow: isSelected
                          ? `0 0 16px ${c.hex}`
                          : '0 2px 8px rgba(0,0,0,0.6)',
                      }}
                    />
                    <span className="text-[9px] sm:text-[10px] font-mono text-neutral-300 truncate max-w-full font-medium">
                      {c.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Hotspots */}
        {tab === 'parts' && (
          <div>
            <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400 mb-2 sm:mb-3">
              TAP ANY COMPONENT TO ZOOM CAMERA AND VIEW RACE SPECS:
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {CAR_PARTS.map((p) => {
                const isSelected = activeHotspot?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      soundManager.playTransition();
                      onSelectHotspot(p);
                    }}
                    className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono font-medium transition-all flex items-center gap-1.5 sm:gap-2 ${
                      isSelected
                        ? 'bg-[#FF5800] text-black font-extrabold shadow-[0_0_15px_rgba(255,88,0,0.5)]'
                        : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-black' : 'bg-[#FF5800]'
                      }`}
                    />
                    <span>{p.name.split('(')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Angles & 360 Spin */}
        {tab === 'angles' && (
          <div>
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
                CINEMATIC PERSPECTIVE:
              </span>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onToggleAutoRotate();
                }}
                className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-mono transition-all ${
                  autoRotate
                    ? 'bg-[#FF5800] text-black font-bold'
                    : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Orbit className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                <span>360° SPIN</span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
              {CAMERA_ANGLES.map((a) => {
                const isSelected = activeAngle?.id === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => {
                      soundManager.playTransition();
                      onSelectAngle(a);
                    }}
                    className={`py-2 px-1.5 sm:py-2.5 sm:px-2 rounded-xl text-center text-[11px] sm:text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-white/20 text-white font-bold border border-white/30 shadow-md'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {a.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Studio Lighting */}
        {tab === 'studio' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {[
              { id: 'golden-track', label: 'TRACK SUNSET', desc: 'Warm Amber Horizon' },
              { id: 'apex-neon', label: 'APEX STUDIO', desc: 'Pure Automotive Key' },
              { id: 'cyber-midnight', label: 'STEALTH NIGHT', desc: 'Nocturnal Underglow' },
            ].map((m) => {
              const isSelected = lightingPreset === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    soundManager.playClick();
                    onSelectLighting(m.id as LightingPreset);
                  }}
                  className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-left font-mono transition-all ${
                    isSelected
                      ? 'bg-[#FF5800]/20 border border-[#FF5800]/50 text-white shadow-lg'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-xs font-bold block">{m.label}</span>
                  <span className="text-[10px] text-neutral-400 block mt-0.5 sm:mt-1">
                    {m.desc}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
