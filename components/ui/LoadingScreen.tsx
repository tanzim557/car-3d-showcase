'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useProgress } from '@react-three/drei';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [subStatus, setSubStatus] = useState('CALIBRATING M840T TWIN-TURBO V8');
  const hasCalledOnLoaded = useRef(false);

  useEffect(() => {
    if (progress < 30) {
      setSubStatus('DOWNLOADING MONOCAGE II CARBON FIBER MESHES');
    } else if (progress < 70) {
      setSubStatus('CALIBRATING PAPAYA SPARK CLEARCOAT REFLECTIONS');
    } else if (progress < 100) {
      setSubStatus('PREPARING SHOWROOM TURNTABLE & TELEMETRY');
    } else {
      setSubStatus('MCLAREN 750S APEX READY');
      const timer = setTimeout(() => {
        setVisible(false);
        if (onLoaded && !hasCalledOnLoaded.current) {
          hasCalledOnLoaded.current = true;
          onLoaded();
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoaded]);

  if (!visible && !active) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080B] transition-opacity duration-700 ease-out ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient McLaren Papaya glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#FF5800]/12 rounded-full blur-3xl pointer-events-none" />

      {/* Brand logo / title */}
      <div className="relative flex flex-col items-center max-w-sm w-full px-6 text-center">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-2.5 h-2.5 bg-[#FF5800] rounded-full animate-ping" />
          <span className="text-xs tracking-[0.3em] font-bold text-[#FFA866] uppercase">
            MCLAREN SPECIAL OPERATIONS
          </span>
        </div>

        <h1 className="text-3xl font-extralight tracking-widest text-white mb-2 uppercase">
          720S <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF5800] via-[#FF8800] to-amber-300">APEX</span>
        </h1>

        <p className="text-xs text-neutral-400 font-mono tracking-wider mb-8">
          {subStatus}
        </p>

        {/* Custom Progress Bar in McLaren Papaya */}
        <div className="w-full bg-neutral-900 border border-neutral-800 rounded-full h-2 p-0.5 overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#FF5800] via-amber-400 to-[#FF8800] rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${Math.max(5, Math.min(100, Math.round(progress)))}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-xs rounded-full" />
          </div>
        </div>

        {/* Numerical Percentage */}
        <div className="flex justify-between w-full mt-3 text-xs font-mono text-neutral-500">
          <span>PBR RAYTRACING</span>
          <span className="text-[#FFA866] font-bold">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};
