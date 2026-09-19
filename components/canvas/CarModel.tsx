'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import type { ColorOption } from '@/data/carSpecs';

interface CarModelProps {
  color: ColorOption;
  headlightsOn: boolean;
  engineRunning: boolean;
  introTrigger?: number;
  onIntroComplete?: () => void;
}

export const CarModel: React.FC<CarModelProps> = ({
  color,
  headlightsOn,
  engineRunning,
  introTrigger = 0,
  onIntroComplete,
}) => {
  const { scene } = useGLTF('/models/car.glb');
  const carGroupRef = useRef<THREE.Group>(null);
  const wheelMeshesRef = useRef<THREE.Mesh[]>([]);

  // Multi-layer PBR automotive paint with clearcoat and metallic pearl reflections
  const materials = useMemo(() => {
    // 1. Primary Car Body: Multi-layer McLaren Papaya Orange (or user-selected color)
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color.hex),
      metalness: color.metalness,
      roughness: color.roughness,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
      envMapIntensity: 2.8,
    });

    // 2. Gloss Piano Black (Roof canopy, A-pillars, mirrors)
    const glossBlackMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#08090C'),
      metalness: 0.85,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      envMapIntensity: 2.4,
    });

    // 3. Stealth Satin Forged Rims (Gunmetal dark alloy matching the reference photo)
    const rimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#14161A'),
      metalness: 0.95,
      roughness: 0.16,
      envMapIntensity: 2.4,
    });

    // 4. Multi-Layer Automotive Glass (Windshield, side windows, rear engine cover)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F0F7FC'),
      metalness: 0.1,
      roughness: 0.02,
      transmission: 0.94,
      transparent: true,
      opacity: 0.35,
      ior: 1.54,
      envMapIntensity: 2.6,
    });

    // 5. Azores Orange Brake Calipers (Iconic McLaren racing caliper finish)
    const brakeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FF5800'),
      metalness: 0.85,
      roughness: 0.15,
      envMapIntensity: 2.0,
    });

    // 6. Adaptive Matrix LED Headlights
    const headlightMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F4F9FF'),
      emissive: new THREE.Color(headlightsOn ? '#A5E5FF' : '#142230'),
      emissiveIntensity: headlightsOn ? 6.0 : 0.3,
      toneMapped: false,
    });

    // 7. Horizontal LED Blade Taillights
    const taillightMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FF0033'),
      emissive: new THREE.Color('#FF0033'),
      emissiveIntensity: headlightsOn || engineRunning ? 4.5 : 1.2,
      toneMapped: false,
    });

    // 8. Track Rubber Tires (Pirelli P ZERO Trofeo R)
    const tireMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#121315'),
      roughness: 0.92,
      metalness: 0.04,
    });

    // 9. High-Gloss Carbon Fiber Aero (Front splitter, side skirts, rear active diffuser)
    const carbonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0E1012'),
      roughness: 0.28,
      metalness: 0.72,
      envMapIntensity: 1.8,
    });

    return {
      bodyMat,
      glossBlackMat,
      rimMat,
      glassMat,
      brakeMat,
      headlightMat,
      taillightMat,
      tireMat,
      carbonMat,
    };
  }, [color, headlightsOn, engineRunning]);

  // Dynamically update body color
  useEffect(() => {
    materials.bodyMat.color.set(color.hex);
    materials.bodyMat.roughness = color.roughness;
    materials.bodyMat.metalness = color.metalness;
    materials.bodyMat.clearcoat = color.clearcoat;
    materials.bodyMat.clearcoatRoughness = color.clearcoatRoughness;
    materials.bodyMat.needsUpdate = true;
  }, [color, materials]);

  // Dynamically update lights
  useEffect(() => {
    materials.headlightMat.emissive.set(headlightsOn ? '#A5E5FF' : '#142230');
    materials.headlightMat.emissiveIntensity = headlightsOn ? 6.0 : 0.3;
    materials.headlightMat.needsUpdate = true;

    materials.taillightMat.emissiveIntensity =
      headlightsOn || engineRunning ? 4.5 : 1.2;
    materials.taillightMat.needsUpdate = true;
  }, [headlightsOn, engineRunning, materials]);

  // Traverse and apply PBR materials & collect ONLY true road wheel meshes
  useEffect(() => {
    wheelMeshesRef.current = [];

    const wheelParentNames = ['wheel_fl', 'wheel_fr', 'wheel_rl', 'wheel_rr'];

    // 1. Reset any previously rotated non-wheel meshes to pristine 0 rotation
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.rotation.set(0, 0, 0);
      }
    });

    // 2. Identify ONLY the road wheel meshes inside the 4 wheel axle groups
    scene.traverse((child) => {
      if (wheelParentNames.includes(child.name)) {
        child.traverse((wheelChild) => {
          if ((wheelChild as THREE.Mesh).isMesh) {
            const wName = wheelChild.name.toLowerCase();
            // Collect wheel, rim, tire, centre, nuts - NEVER brake calipers or body panels!
            if (!wName.includes('brake')) {
              wheelMeshesRef.current.push(wheelChild as THREE.Mesh);
            }
          }
        });
      }

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const name = mesh.name.toLowerCase();

        // 3. Strict Material Assignment (Match trim before rim!)
        if (name === 'body') {
          mesh.material = materials.bodyMat;
        } else if (name.includes('trim')) {
          // trim, steering_trim, yellow_trim, carbon_fibre_trim
          mesh.material = name.includes('carbon')
            ? materials.carbonMat
            : materials.glossBlackMat;
        } else if (name.includes('glass')) {
          mesh.material = materials.glassMat;
        } else if (name.includes('brake')) {
          mesh.material = materials.brakeMat;
        } else if (name === 'lights' || name === 'leds') {
          mesh.material = materials.headlightMat;
        } else if (name.includes('lights_red') || name.includes('steering_red_lights')) {
          mesh.material = materials.taillightMat;
        } else if (name.includes('tire')) {
          mesh.material = materials.tireMat;
        } else if (name.includes('carbon') || name === 'grills') {
          mesh.material = materials.carbonMat;
        } else if (
          name === 'wheel' ||
          name.startsWith('rim_') ||
          name === 'centre' ||
          name === 'nuts'
        ) {
          mesh.material = materials.rimMat;
        } else if (name.includes('metal') || name === 'chrome') {
          mesh.material = materials.rimMat;
        } else if (
          name.includes('leather') ||
          name.includes('interior') ||
          name === 'carpet' ||
          name === 'plastic_gray' ||
          name === 'wipers'
        ) {
          mesh.material = materials.glossBlackMat;
        }
      }
    });
  }, [scene, materials]);

  const lastAnimatedTrigger = useRef<number>(0);

  // Cinematic Supercar Drive-In & Braking Entrance
  useEffect(() => {
    if (!carGroupRef.current) return;

    // If trigger is 0 (initial state), park vehicle at center without animation
    if (introTrigger === 0) {
      carGroupRef.current.position.set(0, 0, 0);
      carGroupRef.current.rotation.set(0, Math.PI, 0);
      return;
    }

    // Guard: guarantee animation runs strictly once per trigger
    if (lastAnimatedTrigger.current === introTrigger) return;
    lastAnimatedTrigger.current = introTrigger;

    // Reset car position to down the avenue on the asphalt road
    const proxy = {
      x: 0,
      y: 0,
      z: -14,
      angle: Math.PI,
      pitch: 0,
    };

    let lastZ = proxy.z;
    carGroupRef.current.position.set(proxy.x, proxy.y, proxy.z);
    carGroupRef.current.rotation.set(proxy.pitch, proxy.angle, 0);

    const tl = gsap.timeline({
      onUpdate: () => {
        if (!carGroupRef.current) return;
        carGroupRef.current.position.set(proxy.x, proxy.y, proxy.z);
        carGroupRef.current.rotation.set(proxy.pitch, proxy.angle, 0);

        const deltaZ = proxy.z - lastZ;
        lastZ = proxy.z;

        // Realistic wheel roll: Δθ = ΔZ / R (wheel radius 0.282m)
        const rollDelta = deltaZ / 0.282;
        for (const mesh of wheelMeshesRef.current) {
          mesh.rotation.x += rollDelta;
        }
      },
      onComplete: () => {
        if (onIntroComplete) onIntroComplete();
      },
    });

    // 1. Deceleration drive down the 3D highway into hero position
    tl.to(
      proxy,
      {
        z: 0,
        x: 0,
        angle: Math.PI,
        duration: 2.5,
        ease: 'power2.out',
      },
      0
    );

    // 2. Realistic suspension dive (braking force pitches nose down ~1.5°)
    tl.to(
      proxy,
      {
        pitch: -0.026,
        duration: 1.1,
        ease: 'power1.inOut',
      },
      0.4
    );

    // 3. Suspension rebound bounce as the car halts
    tl.to(
      proxy,
      {
        pitch: 0.008,
        duration: 0.45,
        ease: 'power1.out',
      },
      1.5
    );

    // 4. Settle rock-solid and level on showroom turntable
    tl.to(
      proxy,
      {
        pitch: 0,
        duration: 0.35,
        ease: 'power1.inOut',
      },
      1.95
    );

    return () => {
      tl.kill();
    };
  }, [introTrigger, onIntroComplete]);

  return (
    <group ref={carGroupRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <primitive
        object={scene}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />

      {/* Dynamic Headlight Projections (travels directly with the car) */}
      {headlightsOn && (
        <group position={[0, 0.55, -1.8]}>
          <spotLight
            position={[-0.68, 0, 0]}
            target-position={[-0.9, -0.55, -8]}
            angle={0.48}
            penumbra={0.85}
            intensity={28}
            color="#D8F3FF"
            distance={15}
          />
          <spotLight
            position={[0.68, 0, 0]}
            target-position={[0.9, -0.55, -8]}
            angle={0.48}
            penumbra={0.85}
            intensity={28}
            color="#D8F3FF"
            distance={15}
          />
        </group>
      )}
    </group>
  );
};

useGLTF.preload('/models/car.glb');
