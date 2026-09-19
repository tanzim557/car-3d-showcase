'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import { CAR_PARTS, type CarPartHotspot } from '@/data/carSpecs';
import { soundManager } from '@/lib/sound';

interface HotspotsProps {
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: CarPartHotspot) => void;
}

export const Hotspots: React.FC<HotspotsProps> = ({
  activeHotspotId,
  onSelectHotspot,
}) => {
  return (
    <group>
      {CAR_PARTS.map((hotspot) => {
        const isActive = activeHotspotId === hotspot.id;

        return (
          <group key={hotspot.id} position={hotspot.position}>
            <Html
              center
              distanceFactor={6}
              zIndexRange={[10, 0]}
              style={{
                transition: 'all 0.3s ease',
                pointerEvents: 'auto',
              }}
            >
              <div className="relative group cursor-pointer select-none">
                {/* Outer pulsing ring in McLaren Papaya */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#FF5800]/30 ring-2 ring-[#FF5800] scale-125 shadow-[0_0_20px_rgba(255,88,0,0.6)]'
                      : 'bg-black/65 ring-1 ring-[#FF5800]/70 hover:ring-[#FF7722] hover:scale-115 shadow-[0_0_12px_rgba(255,88,0,0.35)]'
                  } backdrop-blur-md`}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playTransition();
                    onSelectHotspot(hotspot);
                  }}
                >
                  {/* Center glowing core dot */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isActive
                        ? 'bg-white scale-125'
                        : 'bg-[#FF5800] group-hover:bg-white'
                    }`}
                  />
                </div>

                {/* Tooltip on hover */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 whitespace-nowrap">
                  <div className="glass-panel px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider text-[#FFA866] uppercase shadow-xl border border-[#FF5800]/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5800]" />
                    <span>{hotspot.name}</span>
                  </div>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
