'use client';

import React from 'react';
import { X, Trophy, Flag, Award, Zap, ChevronRight } from 'lucide-react';
import { soundManager } from '@/lib/sound';

interface RacingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RacingModal: React.FC<RacingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const milestones = [
    {
      year: '1963',
      title: 'Bruce McLaren Motor Racing Founded',
      desc: 'Formed by 26-year-old New Zealander Bruce McLaren with a relentless passion for speed and aerodynamic innovation.',
    },
    {
      year: '1974 - 2008',
      title: '12 F1 Drivers & 8 Constructors Championships',
      desc: 'Dominated by legends including Ayrton Senna, Alain Prost, Niki Lauda, Mika Häkkinen, and Lewis Hamilton.',
    },
    {
      year: '1981',
      title: 'First Carbon Fiber Formula 1 Chassis (MP4/1)',
      desc: 'Pioneered full carbon composite monocoque chassis in Formula 1—a technology now standard in all McLaren road cars.',
    },
    {
      year: '1995',
      title: '24 Hours of Le Mans Victory on Debut',
      desc: 'The legendary McLaren F1 GTR secured 1st, 3rd, 4th, and 5th on its maiden attempt at the Circuit de la Sarthe.',
    },
    {
      year: 'PRESENT',
      title: 'The Triple Crown Winner',
      desc: 'McLaren remains the only manufacturer in motorsport history to win the Monaco GP, Indianapolis 500, and Le Mans 24H.',
    },
  ];

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
      <div className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl glass-panel border border-white/15 bg-[#0A0C12]/95 shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-[#FF5800]" />
            <span className="text-xl font-black italic tracking-widest text-white uppercase font-sans">
              MCLAREN RACING HERITAGE
            </span>
            <span className="text-xs font-mono font-bold text-[#FFA866] bg-[#FF5800]/20 px-2.5 py-0.5 rounded-full border border-[#FF5800]/40">
              FORMULA 1 & GT
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

        {/* Triple Crown Banner */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#FF5800]/20 via-amber-500/10 to-transparent border-b border-white/10 flex items-center gap-3 shrink-0">
          <Award className="w-6 h-6 text-[#FF5800] shrink-0" />
          <div>
            <span className="text-xs font-mono font-bold text-white uppercase block">
              THE MOTORSPORT TRIPLE CROWN
            </span>
            <p className="text-[11px] text-neutral-300 font-sans">
              Monaco Grand Prix Winner • Indianapolis 500 Champion • 24 Hours of Le Mans Victor
            </p>
          </div>
        </div>

        {/* Milestones Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center font-mono">
              <span className="text-2xl font-black text-[#FF5800] block">183+</span>
              <span className="text-[11px] text-neutral-400">Formula 1 Grand Prix Wins</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center font-mono">
              <span className="text-2xl font-black text-white block">12</span>
              <span className="text-[11px] text-neutral-400">World Drivers' Championships</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center font-mono">
              <span className="text-2xl font-black text-[#FFA866] block">8</span>
              <span className="text-[11px] text-neutral-400">Constructors' Championships</span>
            </div>
          </div>

          <span className="text-[10px] font-mono tracking-widest text-[#FF5800] uppercase font-bold block pt-2">
            RACING MILESTONES
          </span>

          <div className="space-y-3">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#FF5800]/40 transition-all flex items-start gap-4"
              >
                <span className="text-xs font-mono font-black text-[#FF5800] px-2.5 py-1 rounded bg-[#FF5800]/15 border border-[#FF5800]/30 shrink-0">
                  {m.year}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white font-sans">{m.title}</h4>
                  <p className="text-xs text-neutral-300 font-sans mt-1 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono text-neutral-400 shrink-0">
          <span>RACING DNA IN EVERY ROAD CAR</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-[#FF5800] text-black font-bold text-xs hover:bg-[#FF6E00] transition-colors"
          >
            RETURN TO 750S COCKPIT →
          </button>
        </div>
      </div>
    </div>
  );
};
