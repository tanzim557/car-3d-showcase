'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CityRoadStage } from './CityRoadStage';
import { CarModel } from './CarModel';
import { Hotspots } from './Hotspots';
import { CameraManager } from './CameraManager';
import {
  DEFAULT_CAMERA,
  type CarPartHotspot,
  type ColorOption,
  type LightingPreset,
  type CameraAnglePreset,
} from '@/data/carSpecs';

interface CarShowcaseCanvasProps {
  color: ColorOption;
  headlightsOn: boolean;
  lightingPreset: LightingPreset;
  engineRunning: boolean;
  activeHotspot: CarPartHotspot | null;
  activeAngle: CameraAnglePreset | null;
  resetSignal: number;
  autoRotate: boolean;
  showHotspots: boolean;
  onSelectHotspot: (hotspot: CarPartHotspot) => void;
  activeModelName?: string;
  orbitAngle?: number | null;
  introTrigger?: number;
  onIntroComplete?: () => void;
  isDayMode?: boolean;
}

export const CarShowcaseCanvas: React.FC<CarShowcaseCanvasProps> = ({
  color,
  headlightsOn,
  lightingPreset,
  engineRunning,
  activeHotspot,
  activeAngle,
  resetSignal,
  autoRotate,
  showHotspots,
  onSelectHotspot,
  activeModelName = '750S',
  orbitAngle = null,
  introTrigger = 0,
  onIntroComplete,
  isDayMode = true,
}) => {
  return (
    // bg changes with day/night: warm sky for day, deep navy for night
    <div className={`w-full h-full relative cursor-grab active:cursor-grabbing transition-colors duration-1000 ${isDayMode ? 'bg-[#6FA8DC]' : 'bg-[#0A1020]'}`}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: DEFAULT_CAMERA.position,
          fov: 32,
          near: 0.1,
          far: 500,
        }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
          powerPreference: 'high-performance',
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
      >
        <Suspense fallback={null}>
          <CityRoadStage
            headlightsOn={headlightsOn}
            lightingPreset={lightingPreset}
            engineRunning={engineRunning}
            isDayMode={isDayMode}
          />
          <CarModel
            color={color}
            headlightsOn={headlightsOn}
            engineRunning={engineRunning}
            introTrigger={introTrigger}
            onIntroComplete={onIntroComplete}
          />
          {showHotspots && (
            <Hotspots
              activeHotspotId={activeHotspot?.id || null}
              onSelectHotspot={onSelectHotspot}
            />
          )}
          <CameraManager
            activeHotspot={activeHotspot}
            activeAngle={activeAngle}
            resetSignal={resetSignal}
            autoRotate={autoRotate}
            orbitAngle={orbitAngle}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
