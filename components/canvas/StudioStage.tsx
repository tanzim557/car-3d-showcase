'use client';

import React, { useMemo } from 'react';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import type { LightingPreset } from '@/data/carSpecs';

interface StudioStageProps {
  headlightsOn: boolean;
  lightingPreset: LightingPreset;
  engineRunning: boolean;
  activeModelName?: string;
}

// Procedural luxury showroom floor with subtle porcelain tile seams and smooth outer perimeter fade
function createFadedShowroomFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // 1. Base radial gradient: solid dark architectural epoxy in center, smoothly dissolving to transparent at perimeter
  const radGrad = ctx.createRadialGradient(512, 512, 160, 512, 512, 510);
  radGrad.addColorStop(0, '#101217');
  radGrad.addColorStop(0.55, '#0D0E13');
  radGrad.addColorStop(0.82, '#090B0F');
  radGrad.addColorStop(1, 'rgba(9, 11, 15, 0)');

  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Subtle luxury showroom tile grid lines (2x2 tiles in center)
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
  ctx.lineWidth = 2;

  for (let i = 128; i < 1024; i += 256) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 1024);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(1024, i);
    ctx.stroke();
  }
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export const StudioStage: React.FC<StudioStageProps> = ({
  headlightsOn,
  lightingPreset,
  engineRunning,
}) => {
  const isMidnight = lightingPreset === 'cyber-midnight';

  const floorTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    return createFadedShowroomFloorTexture();
  }, []);

  return (
    <group>
      {/* 1. Cinematic Environment Reflections (Sunset / Golden Hypercar Lighting) */}
      <Environment
        preset={isMidnight ? 'night' : 'sunset'}
        background={false}
      />

      {/* 2. Primary Automotive Key Light (Warm sunlight catching Papaya orange curves) */}
      <directionalLight
        position={[-6, 6, -3]}
        intensity={isMidnight ? 1.5 : 3.6}
        color={isMidnight ? '#38BDF8' : '#FFA852'}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* 3. Rear Silhouette & Active Airbrake Rim Light */}
      <directionalLight
        position={[6, 5, 4]}
        intensity={isMidnight ? 2.0 : 2.8}
        color={isMidnight ? '#FF5800' : '#FF6E00'}
      />

      {/* 4. Soft Fill Light (Illuminates wheels, door scoops, and side air intakes) */}
      <directionalLight
        position={[-5, 2, 4]}
        intensity={1.5}
        color={isMidnight ? '#E2E8F0' : '#FFE0BD'}
      />

      {/* 5. Front Stance Fill */}
      <directionalLight
        position={[-2, 3, -5]}
        intensity={1.4}
        color="#FFF2E2"
      />

      {/* 6. Balanced Showroom Ambient Fill */}
      <ambientLight intensity={isMidnight ? 0.35 : 0.65} color="#FFEEDB" />

      {/* 7. Overhead Automotive Studio Softbox Panel */}
      <group position={[0, 4.6, 0]}>
        {/* Softbox Diffuser */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.6, 8.0]} />
          <meshBasicMaterial
            color={isMidnight ? '#80D8FF' : '#FFE8D6'}
            toneMapped={false}
          />
        </mesh>
        {/* Outer dark bezel */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.01]}>
          <planeGeometry args={[3.8, 8.2]} />
          <meshBasicMaterial color="#0A0B0F" />
        </mesh>
      </group>

      {/* 9. Rear Taillight Glow on Floor */}
      <pointLight
        position={[0, 0.6, -2.3]}
        intensity={engineRunning || headlightsOn ? 6.0 : 2.5}
        distance={4.5}
        color="#FF0033"
      />

      {/* 10. Underbody Glow when V8 is Running */}
      {engineRunning && (
        <pointLight
          position={[0, 0.12, 0]}
          intensity={5.5}
          distance={3.8}
          color="#FF5800"
        />
      )}

      {/* 11. REALISTIC TIRE CONTACT SHADOWS (Baked once at showroom stage center) */}
      <ContactShadows
        position={[0, 0.002, 0]}
        opacity={0.92}
        scale={13}
        blur={1.6}
        far={3.0}
        resolution={256}
        color="#000000"
        frames={1}
      />

      {/* 13. POLISHED LUXURY SHOWROOM FLOOR (With smooth perimeter fade into backdrop) */}
      <mesh position={[0, -0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[22, 64]} />
        <meshStandardMaterial
          map={floorTexture || undefined}
          color="#12151B"
          roughness={0.2}
          metalness={0.85}
          transparent
        />
      </mesh>

      {/* 14. CIRCULAR PRESENTATION TURNTABLE STAGE */}
      <mesh position={[0, -0.008, 0]} receiveShadow>
        <cylinderGeometry args={[5.8, 6.0, 0.03, 64]} />
        <meshStandardMaterial
          color="#151821"
          roughness={0.18}
          metalness={0.9}
        />
      </mesh>

      {/* 15. EMBEDDED SHOWROOM LED PERIMETER GLOW RING */}
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.76, 5.84, 64]} />
        <meshBasicMaterial
          color={isMidnight ? '#38BDF8' : '#FF5800'}
          transparent
          opacity={engineRunning ? 0.95 : 0.65}
        />
      </mesh>
    </group>
  );
};
