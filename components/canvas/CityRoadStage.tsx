'use client';

import React, { useMemo } from 'react';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import type { LightingPreset } from '@/data/carSpecs';

interface CityRoadStageProps {
  headlightsOn: boolean;
  lightingPreset: LightingPreset;
  engineRunning: boolean;
  isDayMode: boolean;
}

// 1. Procedural High-Detail Asphalt Highway Road Texture with Lane Markings & Tarmac Grain
function createDetailedAsphaltTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d')!;

  // Weathered dark asphalt tarmac base
  ctx.fillStyle = '#1D1F25';
  ctx.fillRect(0, 0, 1024, 2048);

  // Realistic tarmac gravel / pebble noise
  const imgData = ctx.getImageData(0, 0, 1024, 2048);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 26;
    data[i] = Math.max(0, Math.min(255, data[i] + grain));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + grain));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + grain + 2));
  }
  ctx.putImageData(imgData, 0, 0);

  // Darker tire wear tracks down the lanes
  ctx.fillStyle = 'rgba(10, 12, 16, 0.25)';
  ctx.fillRect(200, 0, 180, 2048);
  ctx.fillRect(640, 0, 180, 2048);

  // Double Solid Yellow Center Line (McLaren signature racing amber/yellow)
  ctx.fillStyle = '#FFAA00';
  ctx.shadowColor = 'rgba(255, 170, 0, 0.4)';
  ctx.shadowBlur = 4;
  ctx.fillRect(505, 0, 6, 2048);
  ctx.fillRect(516, 0, 6, 2048);
  ctx.shadowBlur = 0;

  // Crisp White Dashed Lane Dividing Lines
  ctx.fillStyle = '#E8ECF2';
  for (let y = 0; y < 2048; y += 170) {
    ctx.fillRect(270, y, 6, 95);
    ctx.fillRect(750, y, 6, 95);
  }

  // Solid White Shoulder Lines
  ctx.fillRect(60, 0, 8, 2048);
  ctx.fillRect(956, 0, 8, 2048);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 6);
  return texture;
}

// 2. Procedural Concrete Sidewalk Paving Texture
function createSidewalkPavingTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#3A3F4A';
  ctx.fillRect(0, 0, 512, 512);

  // Concrete texture noise
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 18;
    data[i] = Math.max(0, Math.min(255, data[i] + grain));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + grain));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + grain));
  }
  ctx.putImageData(imgData, 0, 0);

  // Tile seams
  ctx.strokeStyle = '#282C34';
  ctx.lineWidth = 4;
  for (let i = 64; i < 512; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 24);
  return texture;
}

// 3. Cutout Alpha-Transparent Realistic Tree Texture from Image
function createCutoutTreeTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const texture = new THREE.CanvasTexture(canvas);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = '/images/realistic_tree.jpg';
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 512, 512);
    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const maxVal = Math.max(r, g, b);
      if (maxVal < 24) {
        data[i + 3] = 0; // Pure black isolated to transparent
      } else if (maxVal < 50) {
        data[i + 3] = Math.floor(((maxVal - 24) / 26) * 255); // Soft antialiased edge
      }
    }
    ctx.putImageData(imgData, 0, 0);
    texture.needsUpdate = true;
  };

  return texture;
}

// Realistic 3D Tree Component (Cross-Quad Photographic Foliage + Planter & Trunk)
const RealisticRoadTree: React.FC<{
  position: [number, number, number];
  treeTexture: THREE.CanvasTexture | null;
  scale?: number;
}> = ({ position, treeTexture, scale = 1 }) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Concrete Planter Surround */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[1.0, 1.06, 0.16, 16]} />
        <meshStandardMaterial color="#2B303A" roughness={0.7} />
      </mesh>
      {/* Rich Soil Bed */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.02, 16]} />
        <meshStandardMaterial color="#1B1713" roughness={0.95} />
      </mesh>

      {/* 3D Solid Tree Trunk */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.26, 3.2, 10]} />
        <meshStandardMaterial color="#35281D" roughness={0.88} />
      </mesh>

      {/* Photorealistic Cross-Quad Canopy (Visually volumetric and realistic from every angle) */}
      {treeTexture && (
        <group position={[0, 3.8, 0]}>
          {/* Plane 1 (Facing Z) */}
          <mesh castShadow receiveShadow>
            <planeGeometry args={[4.8, 5.2]} />
            <meshStandardMaterial
              map={treeTexture}
              transparent
              alphaTest={0.12}
              roughness={0.75}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Plane 2 (Facing X, 90 deg rotated) */}
          <mesh rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
            <planeGeometry args={[4.8, 5.2]} />
            <meshStandardMaterial
              map={treeTexture}
              transparent
              alphaTest={0.12}
              roughness={0.75}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Plane 3 (45 deg diagonal for rich volume) */}
          <mesh rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
            <planeGeometry args={[4.4, 4.8]} />
            <meshStandardMaterial
              map={treeTexture}
              transparent
              alphaTest={0.12}
              roughness={0.75}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};

// Photorealistic Glass & Steel Skyscraper Component
const RealisticSkyscraper: React.FC<{
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
  facadeTexture: THREE.Texture | null;
  roofAccentColor?: string;
}> = ({ position, width, depth, height, facadeTexture, roofAccentColor = '#FF5800' }) => {
  return (
    <group position={position}>
      {/* Ground Floor Entrance / Commercial Retail Lobby */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[width + 0.4, 5.0, depth + 0.4]} />
        <meshStandardMaterial
          color="#0F1218"
          metalness={0.9}
          roughness={0.1}
          emissive="#FFAA55"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Main Glass Facade Mass */}
      <mesh position={[0, (height - 5) / 2 + 5, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height - 5, depth]} />
        <meshStandardMaterial
          map={facadeTexture || undefined}
          color="#E8F0F8"
          metalness={0.82}
          roughness={0.16}
          emissive="#FFAA66"
          emissiveIntensity={0.28}
        />
      </mesh>

      {/* Architectural Rooftop Mechanical Structure */}
      <mesh position={[0, height + 1.4, 0]}>
        <boxGeometry args={[width * 0.72, 2.8, depth * 0.72]} />
        <meshStandardMaterial color="#0B0D13" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Rooftop Glowing Accent Rim */}
      <mesh position={[0, height + 2.85, 0]}>
        <boxGeometry args={[width * 0.74, 0.15, depth * 0.74]} />
        <meshBasicMaterial color={roofAccentColor} toneMapped={false} />
      </mesh>

      {/* Telecommunications Antenna Spire */}
      <mesh position={[0, height + 5.5, 0]}>
        <cylinderGeometry args={[0.05, 0.14, 6.0, 8]} />
        <meshStandardMaterial color="#8892A0" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Red aircraft warning beacon */}
      <mesh position={[0, height + 8.6, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial color="#FF0033" toneMapped={false} />
      </mesh>
    </group>
  );
};

export const CityRoadStage: React.FC<CityRoadStageProps> = ({
  headlightsOn,
  lightingPreset,
  engineRunning,
  isDayMode = true,
}) => {
  const isMidnight = !isDayMode;

  // 1. Procedural Asphalt Highway Texture
  const roadTexture = useMemo(() => createDetailedAsphaltTexture(), []);

  // 2. Procedural Sidewalk Texture
  const sidewalkTexture = useMemo(() => createSidewalkPavingTexture(), []);

  // 3. Photorealistic Tree Texture
  const treeTexture = useMemo(() => createCutoutTreeTexture(), []);

  // 4. Skyscraper Facade Texture
  const facadeTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/images/skyscraper_facade.jpg');
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 10);
    return tex;
  }, []);



  // Tree positions along left and right sidewalks
  const treeZPositions = useMemo(
    () => [-52, -40, -28, -16, -4, 8, 20, 32, 44],
    []
  );

  return (
    <group>
      {/* 1. PBR Environment for realistic car paint & glass reflections */}
      <Environment preset={isMidnight ? 'night' : 'sunset'} background={false} />

      {/* 2. SUN — Visible glowing sphere in daytime sky */}
      {!isMidnight && (
        <group position={[-35, 38, -80]}>
          {/* Core sun disc */}
          <mesh>
            <sphereGeometry args={[4.5, 32, 32]} />
            <meshBasicMaterial color="#FFFBE6" toneMapped={false} />
          </mesh>
          {/* Outer corona glow layer 1 */}
          <mesh>
            <sphereGeometry args={[6.0, 32, 32]} />
            <meshBasicMaterial color="#FFE066" transparent opacity={0.25} toneMapped={false} />
          </mesh>
          {/* Outer corona glow layer 2 */}
          <mesh>
            <sphereGeometry args={[8.5, 32, 32]} />
            <meshBasicMaterial color="#FFA500" transparent opacity={0.10} toneMapped={false} />
          </mesh>
          {/* Point light from sun position */}
          <pointLight color="#FFF5D6" intensity={4.0} distance={300} />
        </group>
      )}

      {/* 2. MOON — Visible glowing sphere in night sky */}
      {isMidnight && (
        <group position={[30, 42, -85]}>
          {/* Moon body */}
          <mesh>
            <sphereGeometry args={[3.5, 32, 32]} />
            <meshStandardMaterial
              color="#D8E8F0"
              emissive="#B0CDE8"
              emissiveIntensity={1.2}
              roughness={0.85}
              metalness={0.0}
            />
          </mesh>
          {/* Soft silver moonlight glow */}
          <mesh>
            <sphereGeometry args={[5.0, 32, 32]} />
            <meshBasicMaterial color="#C0D8F0" transparent opacity={0.18} toneMapped={false} />
          </mesh>
          <mesh>
            <sphereGeometry args={[7.0, 32, 32]} />
            <meshBasicMaterial color="#8AB4D8" transparent opacity={0.07} toneMapped={false} />
          </mesh>
          {/* Cool blue moonlight point */}
          <pointLight color="#B0D0FF" intensity={2.5} distance={280} />
        </group>
      )}

      {/* 3. DAY — Bright warm sunshine directional lighting */}
      {!isMidnight && (
        <>
          {/* Primary sun directional light with strong shadows */}
          <directionalLight
            position={[-35, 38, -80]}
            intensity={4.5}
            color="#FFF5D6"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          {/* Sky bounce fill */}
          <directionalLight position={[20, 15, 25]} intensity={1.8} color="#87CEEB" />
          {/* Warm ground bounce */}
          <ambientLight intensity={0.9} color="#FFF0D0" />
        </>
      )}

      {/* 3. NIGHT — Cool blue moonlight directional lighting */}
      {isMidnight && (
        <>
          {/* Primary moonlight directional */}
          <directionalLight
            position={[30, 42, -85]}
            intensity={1.8}
            color="#B0D0FF"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          {/* Cool cyan fill light */}
          <directionalLight position={[-15, 10, 20]} intensity={0.8} color="#38BDF8" />
          {/* Dark night ambient */}
          <ambientLight intensity={0.35} color="#1A2A4A" />
        </>
      )}

      {/* 4a. MASSIVE GROUND COVER — Fills the entire world floor so no black void is visible from any camera angle */}
      <mesh position={[0, -0.02, -10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#1A1D22" roughness={0.92} metalness={0.06} />
      </mesh>

      {/* 4b. PHYSICAL 3D ASPHALT HIGHWAY ROAD (Car tires sit directly at Y = 0 on this surface!) */}
      <mesh
        position={[0, 0, -10]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[12, 140]} />
        <meshStandardMaterial
          map={roadTexture || undefined}
          roughness={0.55}
          metalness={0.2}
        />
      </mesh>

      {/* 5. 3D CONCRETE CURBS */}
      {/* Left Curb */}
      <mesh position={[-6.1, 0.08, -10]}>
        <boxGeometry args={[0.24, 0.16, 140]} />
        <meshStandardMaterial color="#404652" roughness={0.65} />
      </mesh>
      {/* Right Curb */}
      <mesh position={[6.1, 0.08, -10]}>
        <boxGeometry args={[0.24, 0.16, 140]} />
        <meshStandardMaterial color="#404652" roughness={0.65} />
      </mesh>

      {/* 6. 3D PAVED PEDESTRIAN SIDEWALKS */}
      {/* Left Sidewalk */}
      <mesh
        position={[-9.2, 0.14, -10]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6.0, 140]} />
        <meshStandardMaterial
          map={sidewalkTexture || undefined}
          roughness={0.7}
          metalness={0.12}
        />
      </mesh>
      {/* Right Sidewalk */}
      <mesh
        position={[9.2, 0.14, -10]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6.0, 140]} />
        <meshStandardMaterial
          map={sidewalkTexture || undefined}
          roughness={0.7}
          metalness={0.12}
        />
      </mesh>

      {/* 7. REALISTIC 3D ROADSIDE TREES (Lining both left and right sidewalks) */}
      {treeZPositions.map((z, idx) => (
        <React.Fragment key={`tree-${idx}`}>
          {/* Left Sidewalk Tree */}
          <RealisticRoadTree
            position={[-8.0, 0.14, z]}
            treeTexture={treeTexture}
            scale={1.05}
          />
          {/* Right Sidewalk Tree */}
          <RealisticRoadTree
            position={[8.0, 0.14, z + 6]}
            treeTexture={treeTexture}
            scale={1.02}
          />
        </React.Fragment>
      ))}

      {/* 8. MODERN GLASS SKYSCRAPERS (Flanking both sides of the boulevard) */}
      {/* Left City Skyline */}
      <RealisticSkyscraper
        position={[-19, 0, -36]}
        width={10}
        depth={14}
        height={42}
        facadeTexture={facadeTexture}
        roofAccentColor="#FF5800"
      />
      <RealisticSkyscraper
        position={[-20, 0, -14]}
        width={12}
        depth={15}
        height={50}
        facadeTexture={facadeTexture}
        roofAccentColor="#FFA800"
      />
      <RealisticSkyscraper
        position={[-18, 0, 8]}
        width={9.5}
        depth={12}
        height={36}
        facadeTexture={facadeTexture}
        roofAccentColor="#FF3300"
      />
      <RealisticSkyscraper
        position={[-21, 0, 30]}
        width={11}
        depth={14}
        height={46}
        facadeTexture={facadeTexture}
        roofAccentColor="#FF7700"
      />

      {/* Right City Skyline */}
      <RealisticSkyscraper
        position={[19, 0, -40]}
        width={10.5}
        depth={13}
        height={45}
        facadeTexture={facadeTexture}
        roofAccentColor="#FF7700"
      />
      <RealisticSkyscraper
        position={[18, 0, -18]}
        width={9}
        depth={12}
        height={38}
        facadeTexture={facadeTexture}
        roofAccentColor="#FF5800"
      />
      <RealisticSkyscraper
        position={[20, 0, 4]}
        width={12.5}
        depth={15}
        height={52}
        facadeTexture={facadeTexture}
        roofAccentColor="#FFA800"
      />
      <RealisticSkyscraper
        position={[19, 0, 26]}
        width={9.5}
        depth={13}
        height={40}
        facadeTexture={facadeTexture}
        roofAccentColor="#FF3300"
      />

      {/* 9. DEEP CONTACT SHADOW (Physically grounds all 4 tires onto the asphalt road) */}
      <ContactShadows
        position={[0, 0.003, 0]}
        opacity={0.98}
        scale={13}
        blur={1.4}
        far={3.0}
        resolution={512}
        color="#040507"
        frames={1}
      />

      {/* 10. Active LED Headlight Beams on the Road */}
      {headlightsOn && (
        <group position={[0, 0.45, 1.8]}>
          <spotLight
            position={[-0.68, 0, 0]}
            target-position={[-0.68, -0.45, 18]}
            angle={0.42}
            penumbra={0.75}
            intensity={20}
            color="#E4F1FF"
            distance={26}
          />
          <spotLight
            position={[0.68, 0, 0]}
            target-position={[0.68, -0.45, 18]}
            angle={0.42}
            penumbra={0.75}
            intensity={20}
            color="#E4F1FF"
            distance={26}
          />
        </group>
      )}

      {/* 11. Taillight Red Reflection on Road */}
      {(headlightsOn || engineRunning) && (
        <pointLight
          position={[0, 0.35, -2.1]}
          intensity={3.5}
          distance={4.0}
          color="#FF0022"
        />
      )}

      {/* 12. Exhaust & Engine Underglow */}
      {engineRunning && (
        <pointLight
          position={[0, 0.25, -1.2]}
          intensity={4.5}
          distance={3.5}
          color="#FF6200"
        />
      )}
    </group>
  );
};
