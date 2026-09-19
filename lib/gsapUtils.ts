import gsap from 'gsap';
import type { PerspectiveCamera } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CameraTransitionOptions {
  camera: PerspectiveCamera;
  controls: OrbitControlsImpl;
  targetPosition: [number, number, number];
  targetLookAt: [number, number, number];
  duration?: number;
  onStart?: () => void;
  onComplete?: () => void;
}

let activeTween: gsap.core.Timeline | null = null;

export const transitionCamera = ({
  camera,
  controls,
  targetPosition,
  targetLookAt,
  duration = 1.4,
  onStart,
  onComplete,
}: CameraTransitionOptions) => {
  // Kill any active running tween to prevent conflicts
  if (activeTween) {
    activeTween.kill();
  }

  const [posX, posY, posZ] = targetPosition;
  const [targetX, targetY, targetZ] = targetLookAt;

  activeTween = gsap.timeline({
    defaults: {
      duration,
      ease: 'power3.inOut',
    },
    onStart: () => {
      if (onStart) onStart();
    },
    onUpdate: () => {
      controls.update();
    },
    onComplete: () => {
      controls.update();
      activeTween = null;
      if (onComplete) onComplete();
    },
  });

  // Smoothly tween camera position
  activeTween.to(
    camera.position,
    {
      x: posX,
      y: posY,
      z: posZ,
    },
    0
  );

  // Smoothly tween orbit controls target
  activeTween.to(
    controls.target,
    {
      x: targetX,
      y: targetY,
      z: targetZ,
    },
    0
  );

  return activeTween;
};
