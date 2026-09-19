'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { DragToRevealArc } from './DragToRevealArc';
import { soundManager } from '@/lib/sound';

interface HeroOverlayProps {
  onExploreClick: () => void;
  activeAngleIndex: number;
  onSelectAngleIndex: (index: number) => void;
  onFrontViewClick: () => void;
  onOrbitAngleChange?: (angle: number) => void;
  power?: string;
  speed?: string;
  taglineTitle?: string;
  subtitle?: string;
  isIntroPlaying?: boolean;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  onExploreClick,
  activeAngleIndex,
  onSelectAngleIndex,
  onFrontViewClick,
  onOrbitAngleChange,
  power = '740',
  speed = '332',
  taglineTitle = '750S SPIDER',
  subtitle = 'The 750S embodies pure focus: lighter, faster, and more connected to the road than ever.',
  isIntroPlaying = false,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between overflow-hidden">
      {/* 1. TOP-CENTER FLOATING BADGE — Mobile View */}
      <div
        className={`w-full flex justify-center pt-16 sm:pt-20 px-4 pointer-events-auto transition-all duration-700 md:hidden ${
          isIntroPlaying ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md shadow-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5800] animate-pulse" />
          <span className="text-[11px] font-black tracking-widest text-white uppercase font-sans">
            {taglineTitle}
          </span>
          <span className="text-[9px] font-mono text-[#FFA866] font-bold border-l border-white/20 pl-2">
            V8 TWIN-TURBO
          </span>
        </div>
      </div>

      {/* 2. LEFT SIDEBAR: VERTICAL DOT PAGINATION — Desktop Only */}
      <div
        className={`absolute left-8 top-1/2 -translate-y-1/2 pointer-events-auto hidden md:flex flex-col items-center gap-3.5 z-30 transition-all duration-700 ${
          isIntroPlaying ? 'opacity-0 -translate-x-6' : 'opacity-100 translate-x-0'
        }`}
      >
        {[0, 1, 2, 3, 4].map((idx) => {
          const isActive = activeAngleIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                soundManager.playClick();
                onSelectAngleIndex(idx);
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? 'w-2 h-2 bg-white ring-4 ring-white/30'
                  : 'w-1.5 h-1.5 bg-neutral-500 hover:bg-white'
              }`}
              aria-label={`View angle ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* 3. MIDDLE-RIGHT: INTERACTIVE "DRAG TO REVEAL" ARC SLIDER — Desktop & Tablet */}
      <div
        className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 pointer-events-auto z-30 hidden sm:block transition-all duration-700 delay-200 ${
          isIntroPlaying ? 'opacity-0 translate-x-8 pointer-events-none' : 'opacity-100 translate-x-0'
        }`}
      >
        <DragToRevealArc
          onAngleChange={(angle) => {
            if (onOrbitAngleChange) onOrbitAngleChange(angle);
          }}
        />
      </div>

      {/* Spacer for Top Header on Desktop */}
      <div className="hidden md:block h-24" />

      {/* 4. BOTTOM SECTION CONTAINER */}
      <div className="w-full flex flex-col relative z-30">
        {/* Mobile Quick Angle Selector Pill Bar */}
        <div
          className={`md:hidden flex justify-center pb-2.5 px-4 pointer-events-auto transition-all duration-700 ${
            isIntroPlaying ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl shadow-xl">
            {['Side', 'Apex', 'Front', 'Rear', 'Top'].map((name, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundManager.playClick();
                  onSelectAngleIndex(idx);
                }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  activeAngleIndex === idx
                    ? 'bg-[#FF5800] text-black shadow-[0_0_10px_rgba(255,88,0,0.5)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Hero HUD Bar */}
        <div className="w-full px-4 sm:px-12 pb-4 sm:pb-8 flex items-end justify-between transition-all duration-500 ease-out">
          {/* Bottom Left: Supercar Performance Metrics */}
          <div className="pointer-events-auto shrink-0 flex flex-col gap-2.5 sm:gap-5 text-white font-sans drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {/* Power */}
            <div>
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white font-sans">
                  {power}
                </span>
                <span className="text-[10px] sm:text-sm font-bold lowercase text-[#FFA866]">
                  hp
                </span>
              </div>
              <span className="text-[9px] sm:text-xs text-neutral-400 font-medium tracking-wider block mt-0.5 sm:mt-1 uppercase font-mono">
                Power
              </span>
            </div>

            {/* Top Speed */}
            <div>
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white font-sans">
                  {speed}
                </span>
                <span className="text-[10px] sm:text-sm font-bold lowercase text-[#FFA866]">
                  km/h
                </span>
              </div>
              <span className="text-[9px] sm:text-xs text-neutral-400 font-medium tracking-wider block mt-0.5 sm:mt-1 uppercase font-mono">
                Top Speed
              </span>
            </div>
          </div>

          {/* Bottom Center: Sleek Supercar Model Badge (Desktop Only) */}
          <div className="pointer-events-auto hidden md:flex flex-col items-center text-center max-w-xs sm:max-w-sm mx-2 sm:mx-4 shrink-0 pb-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md mb-2 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-[#FF5800] animate-pulse" />
              <span className="text-xs sm:text-sm font-black tracking-widest text-white uppercase font-sans">
                {taglineTitle}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-300 font-medium leading-relaxed max-w-xs drop-shadow-md">
              {subtitle}
            </p>
          </div>

          {/* Bottom Right: Mini Preview Card & Primary Explore CTA */}
          <div className="pointer-events-auto shrink-0 flex items-end sm:flex-col sm:items-end gap-2 sm:gap-3">
            {/* Front Stance Thumbnail Card — Visible on BOTH Mobile & Desktop, NEVER DROPPED! */}
            <button
              onClick={() => {
                soundManager.playTransition();
                onFrontViewClick();
              }}
              className="w-16 h-11 sm:w-40 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden glass-panel border border-white/20 hover:border-[#FF5800]/80 transition-all duration-300 shadow-2xl relative group focus:outline-hidden p-0.5 sm:p-1 bg-neutral-900/80 cursor-pointer"
              title="Inspect Front Aero View"
            >
              <div className="relative w-full h-full rounded-[10px] sm:rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center">
                <Image
                  src="/images/mclaren_front_thumb.jpg"
                  alt="McLaren Front Stance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 64px, 160px"
                  priority
                />
                {/* Mobile / Desktop Badge Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-0.5 sm:pb-1">
                  <span className="text-[8px] sm:text-[10px] font-mono font-bold text-white tracking-widest uppercase drop-shadow">
                    FRONT
                  </span>
                </div>
              </div>
            </button>

            {/* Primary Explore CTA Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onExploreClick();
              }}
              className="h-11 sm:h-auto py-2 sm:py-3 px-3.5 sm:px-4 rounded-xl font-sans font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF7A00] via-[#FF5800] to-[#E64500] hover:from-[#FF8800] hover:to-[#FF5500] shadow-[0_6px_20px_rgba(255,88,0,0.5)] hover:shadow-[0_12px_32px_rgba(255,88,0,0.7)] transition-all flex items-center justify-center gap-1 sm:gap-2 group active:scale-95 cursor-pointer"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
