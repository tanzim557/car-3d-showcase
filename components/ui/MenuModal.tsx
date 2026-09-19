'use client';

import React from 'react';
import { X, ChevronRight, Layers, Trophy, Cpu, RotateCcw } from 'lucide-react';
import { MCLAREN_MODELS, type McLarenModelOption } from '@/data/carSpecs';
import { soundManager } from '@/lib/sound';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModelId: string;
  onSelectModel: (model: McLarenModelOption) => void;
  onOpenModels?: () => void;
  onOpenRacing?: () => void;
  onOpenFeatures?: () => void;
  onReplayIntro?: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  activeModelId,
  onSelectModel,
  onOpenModels,
  onOpenRacing,
  onOpenFeatures,
  onReplayIntro,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-start pointer-events-auto animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={() => {
          soundManager.playClick();
          onClose();
        }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Slide-out Menu Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#090B10] border-r border-white/10 p-5 sm:p-8 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300 shadow-2xl overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="text-xl sm:text-2xl font-black italic tracking-widest text-white uppercase font-sans">
                MCLAREN
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF5800]/20 text-[#FFA866] border border-[#FF5800]/40 font-bold uppercase">
                SUPER SERIES
              </span>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2 rounded-full text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Navigation Sections (Crucial for Mobile!) */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-bold block mb-1">
              DISCOVER & EXPLORE
            </span>
            <div className="grid grid-cols-2 gap-2">
              {onOpenModels && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenModels();
                  }}
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5800]/40 transition-all flex items-center gap-2.5 text-left group cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#FF5800] shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold text-white block">All Models</span>
                    <span className="text-[9px] text-neutral-400 font-mono">Lineup Specs</span>
                  </div>
                </button>
              )}

              {onOpenRacing && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenRacing();
                  }}
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5800]/40 transition-all flex items-center gap-2.5 text-left group cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-[#FF5800] shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold text-white block">F1 & Racing</span>
                    <span className="text-[9px] text-neutral-400 font-mono">Heritage</span>
                  </div>
                </button>
              )}

              {onOpenFeatures && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenFeatures();
                  }}
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5800]/40 transition-all flex items-center gap-2.5 text-left group cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-[#FF5800] shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-xs font-bold text-white block">Aero Tech</span>
                    <span className="text-[9px] text-neutral-400 font-mono">Features</span>
                  </div>
                </button>
              )}

              {onReplayIntro && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onReplayIntro();
                  }}
                  className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF5800]/40 transition-all flex items-center gap-2.5 text-left group cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#FF5800] shrink-0 group-hover:-rotate-45 transition-transform" />
                  <div>
                    <span className="text-xs font-bold text-white block">Drive In</span>
                    <span className="text-[9px] text-neutral-400 font-mono">Replay 3D</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Model Lineup List */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono tracking-widest text-[#FF5800] uppercase font-bold block mb-1">
              SWITCH 3D MODEL
            </span>

            {MCLAREN_MODELS.map((model) => {
              const isActive = activeModelId === model.id;
              return (
                <div
                  key={model.id}
                  onClick={() => {
                    soundManager.playTransition();
                    onSelectModel(model);
                    onClose();
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl transition-all cursor-pointer group relative ${
                    isActive
                      ? 'bg-white/[0.08] border border-[#FF5800] shadow-[0_0_20px_rgba(255,88,0,0.25)]'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#FF5800]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm sm:text-base font-bold font-sans transition-colors ${
                          isActive ? 'text-[#FFA866]' : 'text-white group-hover:text-[#FFA866]'
                        }`}
                      >
                        {model.name}
                      </span>
                      {isActive && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FF5800] text-black font-extrabold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-all ${
                        isActive
                          ? 'text-[#FF5800] translate-x-1'
                          : 'text-neutral-500 group-hover:translate-x-1 group-hover:text-white'
                      }`}
                    />
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 font-sans">
                    {model.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-4 sm:pt-6 mt-6 text-[10px] sm:text-[11px] text-neutral-500 font-mono tracking-wider">
          <span>MCLAREN AUTOMOTIVE LIMITED • WOKING, ENGLAND</span>
        </div>
      </div>
    </div>
  );
};

