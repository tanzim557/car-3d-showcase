'use client';

import React from 'react';
import { CAMERA_ANGLES, type CameraAnglePreset } from '@/data/carSpecs';
import { Camera, Orbit } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface CameraAngleBarProps {
  activeAngleId: string | null;
  autoRotate: boolean;
  onSelectAngle: (angle: CameraAnglePreset) => void;
  onToggleAutoRotate: () => void;
}

export const CameraAngleBar: React.FC<CameraAngleBarProps> = ({
  activeAngleId,
  autoRotate,
  onSelectAngle,
  onToggleAutoRotate,
}) => {
  return (
    <div className="fixed top-48 right-6 z-30 pointer-events-auto hidden lg:flex flex-col items-end gap-1.5 animate-in fade-in slide-in-from-right-4">
      <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase pr-1">
        CINEMATIC VANTAGE
      </div>
      <div className="glass-panel rounded-xl p-1 flex flex-col gap-1 w-44">
        {/* Auto Rotate Toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            onToggleAutoRotate();
          }}
          className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            autoRotate
              ? 'bg-[#FF5800]/20 text-[#FFA866] border border-[#FF5800]/40 font-bold'
              : 'text-neutral-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Orbit className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            <span>360° ROTATE</span>
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              autoRotate ? 'bg-[#FF5800]' : 'bg-neutral-600'
            }`}
          />
        </button>

        <div className="h-[1px] bg-white/10 my-0.5" />

        {/* Preset Angles */}
        {CAMERA_ANGLES.map((angle) => {
          const isActive = activeAngleId === angle.id;
          return (
            <button
              key={angle.id}
              onClick={() => {
                soundManager.playTransition();
                onSelectAngle(angle);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all text-left ${
                isActive
                  ? 'bg-white/15 text-white font-bold border border-white/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Camera className="w-3 h-3 text-[#FF5800]" />
              <span className="text-[11px]">{angle.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
