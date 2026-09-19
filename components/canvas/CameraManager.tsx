'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { PerspectiveCamera } from 'three';
import * as THREE from 'three';
import { transitionCamera } from '@/lib/gsapUtils';
import { DEFAULT_CAMERA, type CarPartHotspot, type CameraAnglePreset } from '@/data/carSpecs';

interface CameraManagerProps {
  activeHotspot: CarPartHotspot | null;
  activeAngle: CameraAnglePreset | null;
  resetSignal: number;
  autoRotate: boolean;
  orbitAngle?: number | null;
}

export const CameraManager: React.FC<CameraManagerProps> = ({
  activeHotspot,
  activeAngle,
  resetSignal,
  autoRotate,
  orbitAngle,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera, size } = useThree();
  const isFirstMount = useRef(true);

  const aspect = size.width / Math.max(1, size.height);
  const isMobile = aspect < 1.15;

  // Responsive camera positioning so the full car and road fit perfectly on mobile screens
  const getResponsivePosition = useCallback(
    (pos: [number, number, number], target: [number, number, number]): [number, number, number] => {
      if (aspect >= 1.35) return pos;
      // On narrow mobile viewports, move camera back along the line of sight to frame the whole vehicle
      const factor = Math.min(2.1, 1.48 / Math.max(0.44, aspect));
      return [
        target[0] + (pos[0] - target[0]) * factor,
        target[1] + (pos[1] - target[1]) * factor,
        target[2] + (pos[2] - target[2]) * factor,
      ];
    },
    [aspect]
  );

  // Set responsive FOV and initial camera placement on mount or resize
  useEffect(() => {
    const persCamera = camera as PerspectiveCamera;
    if (persCamera.isPerspectiveCamera) {
      const targetFov = isMobile ? 38 : 32;
      if (persCamera.fov !== targetFov) {
        persCamera.fov = targetFov;
        persCamera.updateProjectionMatrix();
      }
    }

    if (isFirstMount.current) {
      const initialPos = getResponsivePosition(DEFAULT_CAMERA.position, DEFAULT_CAMERA.target);
      camera.position.set(...initialPos);
      camera.lookAt(...DEFAULT_CAMERA.target);
      if (controlsRef.current) {
        controlsRef.current.target.set(...DEFAULT_CAMERA.target);
        controlsRef.current.update();
      }
    }
  }, [camera, isMobile, getResponsivePosition]);

  // When drag-to-reveal slider updates the orbit angle
  useEffect(() => {
    if (orbitAngle !== undefined && orbitAngle !== null && controlsRef.current) {
      const baseRadius = 4.8;
      const radiusFactor = isMobile ? Math.min(2.1, 1.48 / Math.max(0.44, aspect)) : 1.0;
      const radius = baseRadius * radiusFactor;
      const height = 0.85;
      const x = radius * Math.cos(orbitAngle);
      const z = radius * Math.sin(orbitAngle);
      camera.position.set(x, height, z);
      camera.lookAt(0, 0.42, 0);
      controlsRef.current.target.set(0, 0.42, 0);
      controlsRef.current.update();
    }
  }, [orbitAngle, camera, isMobile, aspect]);

  // Transition when activeHotspot changes
  useEffect(() => {
    if (isFirstMount.current) return;

    if (activeHotspot && controlsRef.current) {
      const targetPos = getResponsivePosition(
        activeHotspot.cameraPosition,
        activeHotspot.cameraTarget
      );
      transitionCamera({
        camera: camera as PerspectiveCamera,
        controls: controlsRef.current,
        targetPosition: targetPos,
        targetLookAt: activeHotspot.cameraTarget,
        duration: 1.4,
      });
    }
  }, [activeHotspot, camera, getResponsivePosition]);

  // Transition when a camera angle preset is selected
  useEffect(() => {
    if (isFirstMount.current) return;

    if (activeAngle && controlsRef.current) {
      const targetPos = getResponsivePosition(activeAngle.position, activeAngle.target);
      transitionCamera({
        camera: camera as PerspectiveCamera,
        controls: controlsRef.current,
        targetPosition: targetPos,
        targetLookAt: activeAngle.target,
        duration: 1.3,
      });
    }
  }, [activeAngle, camera, getResponsivePosition]);

  // Transition back to default showroom camera when resetSignal triggers
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (controlsRef.current) {
      const targetPos = getResponsivePosition(DEFAULT_CAMERA.position, DEFAULT_CAMERA.target);
      transitionCamera({
        camera: camera as PerspectiveCamera,
        controls: controlsRef.current,
        targetPosition: targetPos,
        targetLookAt: DEFAULT_CAMERA.target,
        duration: 1.5,
      });
    }
  }, [resetSignal, camera, getResponsivePosition]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={[0, 0.42, 0]}
      enablePan={false}
      minDistance={isMobile ? 3.0 : 2.3}
      maxDistance={isMobile ? 18.0 : 8.8}
      maxPolarAngle={Math.PI / 2 - 0.04}
      minPolarAngle={0.15}
      dampingFactor={0.06}
      enableDamping
      rotateSpeed={isMobile ? 0.65 : 0.8}
      zoomSpeed={0.85}
      autoRotate={autoRotate}
      autoRotateSpeed={0.8}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
    />
  );
};

