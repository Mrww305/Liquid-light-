export type ColorwayId = 'opal' | 'champagne' | 'obsidian' | 'celestial' | 'aurora';

export interface ColorwayConfig {
  id: ColorwayId;
  name: string;
  paletteDescription: string;
  cream: [number, number, number];
  color1: [number, number, number];
  color2: [number, number, number];
  color3: [number, number, number];
  fresnelPower: number;
  specular: number;
}

export type FabricWeaveType =
  | 'plainWeave'
  | 'satinAnisotropic'
  | 'crepeCrinkle'
  | 'peachFuzz'
  | 'metallicMesh';

export type GeometryType =
  | 'silkDrape'
  | 'satinRibbon'
  | 'tactileSwatch'
  | 'torusKnot'
  | 'mobius'
  | 'sphere'
  | 'cylinder';

export type BackdropThemeId = 'studioDark' | 'neutralSlate' | 'warmUmber' | 'lightAtelier';

export interface ShaderSettings {
  colorway: ColorwayId;
  geometry: GeometryType;
  fabricWeave: FabricWeaveType;
  waveSpeed: number;
  displacementScale: number;
  mouseSensitivity: number;
  roughness: number;
  weaveDensity: number;
  sheerness: number;
  luster: number;
  macroZoom: number;
  activeFabricPresetId?: string;
  wireframe: boolean;
  // Automated Loom Simulation & Weave Shift
  loomActive: boolean;
  loomSpeed: number;
  loomShedDepth: number;
  threadContrast: number;
  // Studio backdrop for high weave pattern contrast
  backdropTheme: BackdropThemeId;
}

export type ActiveModal = 'none' | 'work' | 'products' | 'studio' | 'journal' | 'contact' | 'controls';

export type FabricCategory = 
  | 'all'
  | 'chiffon'
  | 'crepe'
  | 'satin'
  | 'specialty'
  | 'cotton-lawn'
  | 'home-textiles'
  | 'apparel';

export interface FabricProduct {
  id: string;
  name: string;
  category: FabricCategory;
  categoryLabel: string;
  tagline: string;
  material: string;
  width: string;
  weightGsm?: string;
  weaveStructure: string;
  finishType: string;
  description: string;
  highlights: string[];
  applications: string[];
  colorwayPreset: ColorwayId;
  recommendedDisplacement: number;
  recommendedRoughness: number;
  featured?: boolean;
}

export interface MillProcessingCapability {
  id: string;
  title: string;
  metric: string;
  subheading: string;
  description: string;
  features: string[];
}
