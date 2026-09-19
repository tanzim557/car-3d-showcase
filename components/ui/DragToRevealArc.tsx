'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { soundManager } from '@/lib/sound';

interface DragToRevealArcProps {
  onAngleChange: (angleRadians: number) => void;
  currentAngle?: number;
}

export const DragToRevealArc: React.FC<DragToRevealArcProps> = ({
  onAngleChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0.2); // 0 to 1
  const containerRef = useRef<HTMLDivElement>(null);

  // Arc parameters
  const size = 180;
  const strokeWidth = 2;
  const radius = 70;
  const center = size / 2;
  const startAngle = -65; // degrees
  const endAngle = 65; // degrees
  const totalAngle = endAngle - startAngle;

  const getCoordinatesForAngle = useCallback(
    (degrees: number) => {
      const radians = (degrees * Math.PI) / 180;
      // Arc on the right side: x = center - radius * cos, y = center + radius * sin
      const x = center - radius * Math.cos(radians);
      const y = center + radius * Math.sin(radians);
      return { x, y };
    },
    [center, radius]
  );

  const startCoord = getCoordinatesForAngle(startAngle);
  const endCoord = getCoordinatesForAngle(endAngle);

  // Current handle position based on progress
  const currentDegrees = startAngle + progress * totalAngle;
  const handleCoord = getCoordinatesForAngle(currentDegrees);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    soundManager.playClick();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    // Map vertical mouse movement to progress (0 at top, 1 at bottom)
    const newProgress = Math.max(0, Math.min(1, relativeY / size));
    setProgress(newProgress);

    // Map progress to camera orbit angle: sweeps from front (-PI * 0.7) to side (-PI * 0.5) to rear (0)
    const targetOrbitAngle = -Math.PI * 0.95 + newProgress * Math.PI * 1.8;
    onAngleChange(targetOrbitAngle);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="pointer-events-auto relative flex items-center select-none"
    >
      <div className="relative w-[180px] h-[180px] flex items-center justify-center">
        {/* SVG Circular Arc */}
        <svg
          width={size}
          height={size}
          className="overflow-visible pointer-events-none"
        >
          {/* Background Dotted Arc */}
          <path
            d={`M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 0 1 ${endCoord.x} ${endCoord.y}`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={strokeWidth}
            strokeDasharray="3 4"
          />

          {/* Active Highlighted Arc */}
          <path
            d={`M ${startCoord.x} ${startCoord.y} A ${radius} ${radius} 0 0 1 ${handleCoord.x} ${handleCoord.y}`}
            fill="none"
            stroke="#FF5800"
            strokeWidth={strokeWidth + 0.5}
          />
        </svg>

        {/* Draggable Handle Node */}
        <div
          onPointerDown={handlePointerDown}
          style={{
            left: `${handleCoord.x}px`,
            top: `${handleCoord.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          className={`absolute w-6 h-6 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center transition-shadow duration-200 ${
            isDragging
              ? 'ring-4 ring-[#FF5800]/50 shadow-[0_0_20px_#FF5800]'
              : 'hover:ring-4 hover:ring-white/30 shadow-[0_0_12px_rgba(255,255,255,0.6)]'
          }`}
          title="Drag to Orbit & Reveal 360°"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-white transition-transform" />
        </div>

        {/* Label next to handle */}
        <div
          style={{
            left: `${handleCoord.x + 22}px`,
            top: `${handleCoord.y}px`,
            transform: 'translateY(-50%)',
          }}
          className="absolute pointer-events-none whitespace-nowrap"
        >
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-white/90 font-bold uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5800] animate-pulse" />
            DRAG TO REVEAL
          </span>
        </div>
      </div>
    </div>
  );
};
