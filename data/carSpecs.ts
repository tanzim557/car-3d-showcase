export interface CarPartHotspot {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  subtitle: string;
  specs: {
    label: string;
    value: string;
  }[];
  description: string;
  highlights: string[];
}

export const CAR_PARTS: CarPartHotspot[] = [
  {
    id: 'engine',
    name: '4.0L Twin-Turbo V8 (M840T)',
    category: 'Powertrain',
    position: [0, 0.84, -0.72],
    cameraPosition: [-0.35, 1.75, -1.85],
    cameraTarget: [0, 0.75, -0.72],
    subtitle: 'Flat-Plane Crankshaft Mid-Mounted Twin-Scroll Turbo',
    specs: [
      { label: 'Max Output', value: '750 PS (740 HP) @ 7,500 RPM' },
      { label: 'Peak Torque', value: '800 Nm @ 5,500 RPM' },
      { label: '0-100 km/h', value: '2.7 Seconds' },
      { label: 'Top Speed', value: '332 km/h (206 mph)' },
    ],
    description:
      'Mid-mounted 4.0-litre twin-turbo V8 featuring dry-sump racing lubrication, ultra-lightweight titanium pistons, and twin-scroll turbochargers producing 740 hp with instantaneous throttle response.',
    highlights: [
      'Visible through the rear aerodynamic glass deck',
      'Race-derived dry sump lubrication sustaining 2.0G lateral loads',
      'Inconel exhaust manifolds with race-tuned acoustic harmonics',
    ],
  },
  {
    id: 'wheels',
    name: '10-Spoke Ultra-Lightweight Forged Alloys',
    category: 'Chassis & Dynamics',
    position: [-0.88, 0.36, 1.15],
    cameraPosition: [-1.75, 0.45, 1.15],
    cameraTarget: [-0.85, 0.36, 1.15],
    subtitle: 'Stealth Black Forged Rims with Azores Orange Calipers',
    specs: [
      { label: 'Brake Discs', value: '390mm Front / 380mm Rear Carbon-Ceramic' },
      { label: 'Calipers', value: '6-Piston Front / 4-Piston Rear Monobloc' },
      { label: '100-0 km/h', value: '29.7 Meters Braking Distance' },
      { label: 'Tire Compound', value: 'Pirelli P ZERO™ Trofeo R' },
    ],
    description:
      'CNC-milled from aerospace-grade forged aluminum saving 13.8 kg of unsprung mass. Paired with 390mm carbon-ceramic matrix discs and Azores Orange calipers.',
    highlights: [
      'Stops from 200 km/h to zero in just 115 meters',
      'Bespoke spoke aero profile pulls high-velocity cooling air over ceramic discs',
      'Center-lock titanium hub mechanism',
    ],
  },
  {
    id: 'headlights',
    name: 'Eye-Socket Aero Matrix LED Headlights',
    category: 'Optics & Aerodynamics',
    position: [-0.72, 0.58, 1.75],
    cameraPosition: [-1.4, 0.85, 2.5],
    cameraTarget: [-0.65, 0.55, 1.7],
    subtitle: 'Integrated Air Intake Socket with Adaptive Light Blades',
    specs: [
      { label: 'Design', value: 'Deep Eye-Socket Aerodynamic Duct' },
      { label: 'Light Modules', value: 'Adaptive Static & Dynamic LEDs' },
      { label: 'Aero Function', value: 'Feeds Air Directly to Low-Temp Radiators' },
      { label: 'Signature', value: 'Horizontally Sliced Indicator Blades' },
    ],
    description:
      'Iconic eye-socket housings that blend advanced adaptive LED headlights with high-volume aerodynamic intake ducts.',
    highlights: [
      'Feeds cool air directly to high-temperature engine radiators',
      'Adaptive light beam dynamically tracks steering angle into corner apexes',
      'Lightweight carbon composite housing',
    ],
  },
  {
    id: 'cockpit',
    name: 'Carbon MonoCage II & Folding Driver Display',
    category: 'Interior & Monocoque',
    position: [-0.35, 0.85, 0.15],
    cameraPosition: [-0.95, 1.25, -0.25],
    cameraTarget: [-0.25, 0.75, 0.1],
    subtitle: 'Formula 1-Derived Carbon Fiber Tub with Dihedral Doors',
    specs: [
      { label: 'Chassis Tub', value: 'MonoCage II Full Carbon Fiber' },
      { label: 'Chassis Weight', value: 'Under 102 kg Structural Cell' },
      { label: 'Driver Display', value: 'Dual-Mode Folding Driver Cluster' },
      { label: 'Seating', value: 'Carbon Shell Bucket Seats in Jet Black Alcantara' },
    ],
    description:
      'Continuous carbon fiber structural cell delivering unmatched torsional rigidity. Featuring the iconic Folding Driver Display that tucks into Slim Track Mode.',
    highlights: [
      'Dihedral doors feature roof cutouts for effortless ingress and egress',
      'Slim Track Display mode displays RPM, gear, and speed only',
      'Fighter-jet panoramic visibility through ultra-slim carbon A-pillars',
    ],
  },
  {
    id: 'diffuser',
    name: 'Active Longtail Airbrake & Dual Center Exhausts',
    category: 'Active Aerodynamics',
    position: [0, 0.42, -2.05],
    cameraPosition: [0, 0.85, -3.2],
    cameraTarget: [0, 0.42, -1.95],
    subtitle: 'Electro-Hydraulic Rear Wing with Inconel Sport Exhausts',
    specs: [
      { label: 'Airbrake Time', value: '0.45 Seconds Full Deployment' },
      { label: 'Downforce Peak', value: '30% More Downforce Than 720S' },
      { label: 'DRS Mode', value: 'Automatic High-Speed Drag Reduction' },
      { label: 'Exhaust Pipes', value: 'Dual High-Mounted Inconel Center Exits' },
    ],
    description:
      'The active rear wing deploys into a high-angle airbrake in less than half a second under emergency braking, while DRS mode flattens for maximum top speed.',
    highlights: [
      'High-exit center exhaust pipes produce visceral high-RPM harmonics',
      'Underbody Venturi tunnels generate ground-effect suction',
      'Carbon fiber active aerodynamic flap actuation',
    ],
  },
];

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  description: string;
  tag: string;
}

export const CAR_COLORS: ColorOption[] = [
  {
    id: 'papaya-spark',
    name: 'McLaren Papaya Spark',
    hex: '#FF5A00',
    roughness: 0.14,
    metalness: 0.88,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    description: 'Signature McLaren racing orange with intense pearl sparkle',
    tag: 'HERITAGE SIGNATURE',
  },
  {
    id: 'volcano-red',
    name: 'Volcano Red Metallic',
    hex: '#B80018',
    roughness: 0.14,
    metalness: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    description: 'Deep candy crimson with fiery metallic flake in sunlight',
    tag: 'ELITE METALLIC',
  },
  {
    id: 'curacao-blue',
    name: 'Curaçao Blue',
    hex: '#007DFE',
    roughness: 0.15,
    metalness: 0.88,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    description: 'High-voltage electric hypercar azure capturing vibrant reflections',
    tag: 'SPECIAL SERIES',
  },
  {
    id: 'saros-grey',
    name: 'Saros Gunmetal',
    hex: '#5A606A',
    roughness: 0.22,
    metalness: 0.96,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    description: 'Aerospace satin liquid metal finish highlighting aerodynamic lines',
    tag: 'TECHNICAL SPEC',
  },
  {
    id: 'silica-white',
    name: 'Silica White Pearl',
    hex: '#E8ECEF',
    roughness: 0.18,
    metalness: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    description: 'Triple-coat iridescent crystal white with cool pearlescence',
    tag: 'PURE LUXURY',
  },
  {
    id: 'onyx-black',
    name: 'Onyx Noir Carbon',
    hex: '#0C0D10',
    roughness: 0.2,
    metalness: 0.98,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    description: 'Deep midnight obsidian stealth finish with exposed carbon accents',
    tag: 'STEALTH SPEC',
  },
];

export interface McLarenModelOption {
  id: string;
  name: string;
  heroText: string;
  taglineTitle: string;
  subtitle: string;
  power: string;
  speed: string;
  zeroToHundred: string;
  defaultColorId: string;
  desc: string;
  specsSummary: string;
}

export const MCLAREN_MODELS: McLarenModelOption[] = [
  {
    id: '750s',
    name: '750S Spider & Coupe',
    heroText: '750S',
    taglineTitle: '750S SPIDER',
    subtitle: 'The 750S embodies pure focus: lighter, faster, and more connected to the road than ever.',
    power: '740',
    speed: '332',
    zeroToHundred: '2.7s',
    defaultColorId: 'papaya-spark',
    desc: 'V8 Twin-Turbo • 740 hp • Benchmarking Supercars',
    specsSummary: '4.0L Twin-Turbo V8 • 740 hp • 800 Nm Torque',
  },
  {
    id: '765lt',
    name: '765LT Longtail',
    heroText: '765LT',
    taglineTitle: '765LT LONGTAIL',
    subtitle: 'Radical track focus: elongated carbon longtail airbrake, quad titanium exhausts, and relentless 755 hp downforce.',
    power: '755',
    speed: '330',
    zeroToHundred: '2.7s',
    defaultColorId: 'volcano-red',
    desc: 'Limited Production • Track Extreme Downforce',
    specsSummary: '4.0L Twin-Turbo V8 • 755 hp • Quad Titanium Exhausts',
  },
  {
    id: 'artura',
    name: 'Artura Hybrid',
    heroText: 'ARTURA',
    taglineTitle: 'ARTURA HYBRID',
    subtitle: 'The full-force hybrid: 120-degree twin-turbo V6 coupled with an axial-flux e-motor for instantaneous electric torque.',
    power: '671',
    speed: '330',
    zeroToHundred: '3.0s',
    defaultColorId: 'curacao-blue',
    desc: 'High-Performance Hybrid V6 Twin-Turbo',
    specsSummary: '3.0L Twin-Turbo V6 Hybrid • 671 hp • MCLA Carbon Tub',
  },
  {
    id: 'gt',
    name: 'McLaren GT',
    heroText: 'MCLAREN GT',
    taglineTitle: 'GRAND TOURER',
    subtitle: 'Classic Grand Tourer redefined: panoramic electrochromic roof, bespoke luggage space, and effortless cross-continent pace.',
    power: '626',
    speed: '326',
    zeroToHundred: '3.2s',
    defaultColorId: 'silica-white',
    desc: 'Grand Touring Redefined • Ultra-Refined Luxury',
    specsSummary: '4.0L Twin-Turbo V8 • 626 hp • 570L Luggage Space',
  },
  {
    id: 'senna',
    name: 'Senna & P1 Ultimate',
    heroText: 'SENNA',
    taglineTitle: 'SENNA GTR',
    subtitle: 'Ultimate Series racing DNA: 800 kg downforce, active Formula 1 DRS, and unrestricted track-honed fury.',
    power: '903',
    speed: '350',
    zeroToHundred: '2.8s',
    defaultColorId: 'onyx-black',
    desc: 'Formula 1 Racing DNA for Road & Circuit',
    specsSummary: 'IPAS Hybrid V8 • 903 hp • 800 kg Aero Downforce',
  },
];

export type LightingPreset = 'golden-track' | 'apex-neon' | 'cyber-midnight';

export interface CameraAnglePreset {
  id: string;
  name: string;
  position: [number, number, number];
  target: [number, number, number];
}

export const CAMERA_ANGLES: CameraAnglePreset[] = [
  {
    id: 'profile',
    name: 'Side Profile',
    position: [-4.6, 0.85, 0.2],
    target: [0, 0.42, 0],
  },
  {
    id: 'apex',
    name: 'Apex 3/4',
    position: [-3.8, 1.05, 2.6],
    target: [0, 0.42, 0],
  },
  {
    id: 'front',
    name: 'Front Stance',
    position: [0, 0.75, 4.5],
    target: [0, 0.42, 0.8],
  },
  {
    id: 'rear',
    name: 'Active Airbrake',
    position: [0, 0.9, -4.4],
    target: [0, 0.42, -1.2],
  },
  {
    id: 'drone',
    name: 'Aero Top-Down',
    position: [0.1, 5.0, 0.1],
    target: [0, 0.4, 0],
  },
];

// Grounded 3D Road Stance: Wheels placed at Y = 0 on the 3D asphalt highway
export const DEFAULT_CAMERA = {
  position: [-4.6, 0.85, 0.2] as [number, number, number],
  target: [0, 0.42, 0] as [number, number, number],
};


