'use client';

import React, { useEffect, useState } from 'react';
import { Gauge, Zap, Wind, Activity } from 'lucide-react';

interface TelemetryHUDProps {
  engineRunning: boolean;
  revTrigger: number;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  engineRunning,
  revTrigger,
}) => {
  const [rpm, setRpm] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [boost, setBoost] = useState<number>(0);
  const [gear, setGear] = useState<string>('P');

  // React to engine state or rev trigger
  useEffect(() => {
    if (!engineRunning) {
      setRpm(0);
      setSpeed(0);
      setBoost(0);
      setGear('P');
      return;
    }

    // Engine running idle
    setGear('N');
    setRpm(1100);
    setBoost(0.1);

    // If rev trigger fired, simulate acceleration burst
    if (revTrigger > 0) {
      setGear('1');
      setRpm(7800);
      setSpeed(68);
      setBoost(1.6);

      const t1 = setTimeout(() => {
        setGear('2');
        setRpm(8200);
        setSpeed(112);
        setBoost(1.8);
      }, 350);

      const t2 = setTimeout(() => {
        setGear('N');
        setRpm(2400);
        setSpeed(45);
        setBoost(0.4);
      }, 1100);

      const t3 = setTimeout(() => {
        setRpm(1100);
        setSpeed(0);
        setBoost(0.1);
      }, 1900);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [engineRunning, revTrigger]);

  const rpmPercent = Math.min(100, Math.round((rpm / 8500) * 100));

  return (
    <div className="fixed bottom-24 left-6 z-30 pointer-events-auto hidden xl:block animate-in fade-in slide-in-from-bottom-4">
      <div className="glass-panel rounded-2xl p-4 w-72 backdrop-blur-2xl border border-white/10 shadow-2xl">
        {/* HUD Top Bar */}
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                engineRunning ? 'bg-[#FF5800] animate-ping' : 'bg-neutral-600'
              }`}
            />
            <span className="text-[10px] font-mono tracking-widest font-bold text-neutral-300">
              TELEMETRY V8 // M840T
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
            {engineRunning ? 'TRACK ENGAGED' : 'STANDBY'}
          </span>
        </div>

        {/* Tachometer Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] font-mono text-neutral-400 mb-1">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#FF5800]" />
              TACHOMETER
            </span>
            <span className="text-white font-bold">{rpm} RPM</span>
          </div>

          <div className="w-full bg-neutral-900/90 h-2 rounded-full overflow-hidden p-0.5 border border-white/10 relative">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                rpm > 7000
                  ? 'bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600'
                  : 'bg-gradient-to-r from-emerald-500 to-[#FF5800]'
              }`}
              style={{ width: `${rpmPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[8px] font-mono text-neutral-500 mt-1">
            <span>0</span>
            <span>2K</span>
            <span>4K</span>
            <span>6K</span>
            <span className="text-rose-400 font-bold">8.5K REDLINE</span>
          </div>
        </div>

        {/* Speed, Gear, Boost Metrics */}
        <div className="grid grid-cols-3 gap-2">
          {/* Speed */}
          <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center">
            <span className="text-[9px] font-mono text-neutral-400 uppercase flex items-center gap-1 mb-0.5">
              <Gauge className="w-2.5 h-2.5 text-cyan-400" /> SPEED
            </span>
            <div className="text-base font-bold text-white tracking-tight">
              {speed}
              <span className="text-[9px] font-mono text-neutral-400 ml-0.5">KM/H</span>
            </div>
          </div>

          {/* Gear */}
          <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center">
            <span className="text-[9px] font-mono text-neutral-400 uppercase flex items-center gap-1 mb-0.5">
              <Zap className="w-2.5 h-2.5 text-[#FF5800]" /> GEAR
            </span>
            <div className="text-base font-bold text-[#FF5800] tracking-tight">
              {gear}
            </div>
          </div>

          {/* Boost */}
          <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col items-center">
            <span className="text-[9px] font-mono text-neutral-400 uppercase flex items-center gap-1 mb-0.5">
              <Wind className="w-2.5 h-2.5 text-blue-400" /> BOOST
            </span>
            <div className="text-base font-bold text-white tracking-tight">
              {boost.toFixed(1)}
              <span className="text-[9px] font-mono text-neutral-400 ml-0.5">BAR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
