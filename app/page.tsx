'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  CAR_COLORS,
  CAMERA_ANGLES,
  MCLAREN_MODELS,
  type CarPartHotspot,
  type ColorOption,
  type LightingPreset,
  type CameraAnglePreset,
  type McLarenModelOption,
} from '@/data/carSpecs';
import { McLarenHeader } from '@/components/ui/McLarenHeader';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { HeroOverlay } from '@/components/ui/HeroOverlay';
import { ConfiguratorDrawer } from '@/components/ui/ConfiguratorDrawer';
import { HotspotCard } from '@/components/ui/HotspotCard';
import { MenuModal } from '@/components/ui/MenuModal';
import { ModelsModal } from '@/components/ui/ModelsModal';
import { RacingModal } from '@/components/ui/RacingModal';
import { FeaturesModal } from '@/components/ui/FeaturesModal';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { soundManager } from '@/lib/sound';

// Dynamically import Three.js Canvas to prevent SSR hydration mismatch
const CarShowcaseCanvas = dynamic(
  () =>
    import('@/components/canvas/CarShowcaseCanvas').then(
      (mod) => mod.CarShowcaseCanvas
    ),
  { ssr: false }
);

export default function ShowroomPage() {
  // Current active McLaren Model (Defaults to 750S)
  const [activeModel, setActiveModel] = useState<McLarenModelOption>(MCLAREN_MODELS[0]);
  const [activeColor, setActiveColor] = useState<ColorOption>(CAR_COLORS[0]);
  const [activeHotspot, setActiveHotspot] = useState<CarPartHotspot | null>(null);
  const [activeAngle, setActiveAngle] = useState<CameraAnglePreset | null>(CAMERA_ANGLES[0]);
  const [activeAngleIndex, setActiveAngleIndex] = useState<number>(0);
  const [headlightsOn, setHeadlightsOn] = useState<boolean>(true);
  const [engineRunning, setEngineRunning] = useState<boolean>(false);
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('golden-track');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [resetSignal, setResetSignal] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [orbitAngle, setOrbitAngle] = useState<number | null>(null);
  const [isDayMode, setIsDayMode] = useState<boolean>(true);

  // Cinematic Supercar Entrance / Drive-In State
  const [isIntroPlaying, setIsIntroPlaying] = useState<boolean>(false);
  const [introTrigger, setIntroTrigger] = useState<number>(0);

  // Modals state
  const [isExploreOpen, setIsExploreOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModelsOpen, setIsModelsOpen] = useState<boolean>(false);
  const [isRacingOpen, setIsRacingOpen] = useState<boolean>(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState<boolean>(false);

  // Replay supercar entrance animation
  const handleReplayIntro = useCallback(() => {
    setActiveAngle(CAMERA_ANGLES[0]);
    setActiveAngleIndex(0);
    setActiveHotspot(null);
    setIsIntroPlaying(true);
    setIntroTrigger((prev) => prev + 1);
    soundManager.playDriveIn();
  }, []);

  // When loading screen completes (triggers exactly once)
  const handleLoadingComplete = useCallback(() => {
    setIsIntroPlaying(true);
    setIntroTrigger(1);
    soundManager.playDriveIn();
  }, []);

  // Handle switching model from the hamburger drawer or modal
  const handleSelectModel = useCallback((model: McLarenModelOption) => {
    setActiveModel(model);
    // Find model's matching signature paint
    const matchedColor = CAR_COLORS.find((c) => c.id === model.defaultColorId) || CAR_COLORS[0];
    setActiveColor(matchedColor);
    // Reset angle to hero side profile
    setActiveAngle(CAMERA_ANGLES[0]);
    setActiveAngleIndex(0);
    setActiveHotspot(null);
    // Trigger dynamic drive-in with the new model
    setIsIntroPlaying(true);
    setIntroTrigger((prev) => prev + 1);
    soundManager.playDriveIn();
  }, []);

  const handleSelectHotspot = useCallback((hotspot: CarPartHotspot) => {
    setActiveAngle(null);
    setAutoRotate(false);
    setActiveHotspot(hotspot);
  }, []);

  const handleSelectAngle = useCallback((angle: CameraAnglePreset) => {
    setActiveHotspot(null);
    setAutoRotate(false);
    setActiveAngle(angle);
    const idx = CAMERA_ANGLES.findIndex((a) => a.id === angle.id);
    if (idx !== -1) setActiveAngleIndex(idx);
  }, []);

  const handleSelectAngleIndex = useCallback((index: number) => {
    setActiveAngleIndex(index);
    if (CAMERA_ANGLES[index]) {
      handleSelectAngle(CAMERA_ANGLES[index]);
    }
  }, [handleSelectAngle]);

  const handleFrontViewClick = useCallback(() => {
    const frontAngle = CAMERA_ANGLES.find((a) => a.id === 'front') || CAMERA_ANGLES[2];
    handleSelectAngle(frontAngle);
  }, [handleSelectAngle]);

  const handleToggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  const handleCloseHotspot = useCallback(() => {
    setActiveHotspot(null);
  }, []);

  const handleResetCamera = useCallback(() => {
    setActiveHotspot(null);
    setActiveAngle(CAMERA_ANGLES[0]);
    setActiveAngleIndex(0);
    setAutoRotate(false);
    setResetSignal((prev) => prev + 1);
  }, []);

  const handleToggleHeadlights = useCallback(() => {
    setHeadlightsOn((prev) => !prev);
  }, []);

  const handleToggleEngine = useCallback(() => {
    setEngineRunning((prev) => !prev);
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundManager.enabled = next;
      return next;
    });
  }, []);

  return (
    <main className={`relative w-full h-screen h-[100dvh] max-h-[100dvh] overflow-hidden select-none transition-colors duration-1000 ${isDayMode ? 'bg-[#6FA8DC]' : 'bg-[#0A1020]'}`}>
      {/* Dynamic Loading Screen */}
      <LoadingScreen onLoaded={handleLoadingComplete} />

      {/* LAYER 0: Background Layer (Giant Typography & Sunset Glow - Sits Behind Car) */}
      <HeroBackground heroText={activeModel.heroText} isDayMode={isDayMode} />

      {/* LAYER 10: 3D WebGL Canvas (Complete 3D Road, Trees, Skyscrapers & Sky Environment) */}
      <div className={`absolute inset-0 z-10 transition-colors duration-1000 ${isDayMode ? 'bg-[#6FA8DC]' : 'bg-[#0A1020]'}`}>
        <CarShowcaseCanvas
          color={activeColor}
          headlightsOn={headlightsOn}
          lightingPreset={lightingPreset}
          engineRunning={engineRunning}
          activeHotspot={activeHotspot}
          activeAngle={activeAngle}
          resetSignal={resetSignal}
          autoRotate={autoRotate}
          showHotspots={!isIntroPlaying && (isExploreOpen || activeHotspot !== null)}
          onSelectHotspot={handleSelectHotspot}
          activeModelName={activeModel.heroText}
          orbitAngle={orbitAngle}
          introTrigger={introTrigger}
          onIntroComplete={() => setIsIntroPlaying(false)}
          isDayMode={isDayMode}
        />
      </div>

      {/* LAYER 20: Foreground Overlay (Dots, Stats hp/kmh, Model Title, Front Preview, Explore CTA & Drag-To-Reveal Arc) */}
      <HeroOverlay
        onExploreClick={() => setIsExploreOpen((prev) => !prev)}
        activeAngleIndex={activeAngleIndex}
        onSelectAngleIndex={handleSelectAngleIndex}
        onFrontViewClick={handleFrontViewClick}
        onOrbitAngleChange={setOrbitAngle}
        power={activeModel.power}
        speed={activeModel.speed}
        taglineTitle={activeModel.taglineTitle}
        subtitle={activeModel.subtitle}
        isIntroPlaying={isIntroPlaying}
      />

      {/* LAYER 30: Top Header & Navigation */}
      <McLarenHeader
        headlightsOn={headlightsOn}
        onToggleHeadlights={handleToggleHeadlights}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        engineRunning={engineRunning}
        onToggleEngine={handleToggleEngine}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenModels={() => setIsModelsOpen(true)}
        onOpenRacing={() => setIsRacingOpen(true)}
        onOpenFeatures={() => setIsFeaturesOpen(true)}
        onReplayIntro={handleReplayIntro}
        isDayMode={isDayMode}
        onToggleDayNight={() => setIsDayMode(prev => !prev)}
      />

      {/* LAYER 40: Modals & Drawers */}
      {/* 1. Hamburger Lineup Menu (Actively switches models and mobile navigation) */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeModelId={activeModel.id}
        onSelectModel={handleSelectModel}
        onOpenModels={() => {
          setIsMenuOpen(false);
          setIsModelsOpen(true);
        }}
        onOpenRacing={() => {
          setIsMenuOpen(false);
          setIsRacingOpen(true);
        }}
        onOpenFeatures={() => {
          setIsMenuOpen(false);
          setIsFeaturesOpen(true);
        }}
        onReplayIntro={() => {
          setIsMenuOpen(false);
          handleReplayIntro();
        }}
      />

      {/* 2. Models Lineup Modal */}
      <ModelsModal
        isOpen={isModelsOpen}
        onClose={() => setIsModelsOpen(false)}
      />

      {/* 3. Racing & F1 Heritage Modal */}
      <RacingModal
        isOpen={isRacingOpen}
        onClose={() => setIsRacingOpen(false)}
      />

      {/* 4. Features Breakdown Modal */}
      <FeaturesModal
        isOpen={isFeaturesOpen}
        onClose={() => setIsFeaturesOpen(false)}
        onSelectFeature={handleSelectHotspot}
      />

      {/* 5. Hotspot Specs Card */}
      <HotspotCard
        hotspot={activeHotspot}
        onClose={handleCloseHotspot}
      />

      {/* 6. Interactive Configurator Drawer */}
      <ConfiguratorDrawer
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
        activeColor={activeColor}
        onSelectColor={setActiveColor}
        activeHotspot={activeHotspot}
        onSelectHotspot={handleSelectHotspot}
        activeAngle={activeAngle}
        onSelectAngle={handleSelectAngle}
        autoRotate={autoRotate}
        onToggleAutoRotate={handleToggleAutoRotate}
        lightingPreset={lightingPreset}
        onSelectLighting={setLightingPreset}
      />
    </main>
  );
}
