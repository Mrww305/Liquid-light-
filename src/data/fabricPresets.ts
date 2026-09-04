import { FabricWeaveType, GeometryType, ColorwayId } from '../types';

export interface FabricTactilePreset {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  weightGsm: string;
  yarnCount: string;
  weaveStructure: string;
  fabricWeave: FabricWeaveType;
  recommendedGeometry: GeometryType;
  colorway: ColorwayId;
  weaveDensity: number;
  sheerness: number;
  luster: number;
  displacementScale: number;
  waveSpeed: number;
  roughness: number;
  tactileDescription: string;
}

export const FABRIC_TACTILE_PRESETS: Record<string, FabricTactilePreset> = {
  'zbm-chiffon': {
    id: 'zbm-chiffon',
    name: 'ZBM Silk Chiffon',
    shortLabel: 'ZBM Chiffon',
    category: 'Chiffon Series',
    weightGsm: '35 GSM',
    yarnCount: '30D x 30D Filament',
    weaveStructure: 'Diaphanous Sheer Plain Weave',
    fabricWeave: 'plainWeave',
    recommendedGeometry: 'silkDrape',
    colorway: 'opal',
    weaveDensity: 92,
    sheerness: 0.72,
    luster: 1.3,
    displacementScale: 1.45,
    waveSpeed: 1.6,
    roughness: 0.18,
    tactileDescription: 'Featherweight sheer floating drape with subtle micro-porous thread openings and luminous spectral refraction.',
  },
  'shamuses-satin': {
    id: 'shamuses-satin',
    name: 'Shamuses Liquid Satin',
    shortLabel: 'Shamuses Satin',
    category: 'Satin & Luster',
    weightGsm: '85 GSM',
    yarnCount: '50D High-Filament Warp',
    weaveStructure: '5-End Anisotropic Floating Satin',
    fabricWeave: 'satinAnisotropic',
    recommendedGeometry: 'satinRibbon',
    colorway: 'champagne',
    weaveDensity: 120,
    sheerness: 0.06,
    luster: 2.5,
    displacementScale: 0.9,
    waveSpeed: 1.1,
    roughness: 0.12,
    tactileDescription: 'Continuous liquid luster with directional anisotropic streaks gliding across fluid gravitational folds.',
  },
  'peach-khushboo': {
    id: 'peach-khushboo',
    name: 'Peach Khushboo (Aroma Scented)',
    shortLabel: 'Peach Khushboo',
    category: 'Specialty Finishing',
    weightGsm: '95 GSM',
    yarnCount: '75D Emerized Microfiber',
    weaveStructure: 'Sanded Peach Micro-Fuzz',
    fabricWeave: 'peachFuzz',
    recommendedGeometry: 'silkDrape',
    colorway: 'aurora',
    weaveDensity: 86,
    sheerness: 0.12,
    luster: 0.95,
    displacementScale: 1.05,
    waveSpeed: 1.3,
    roughness: 0.28,
    tactileDescription: 'Velvety emerald-sanded micro-fuzz exhibiting soft rim light scattering and micro-encapsulated floral aroma retention.',
  },
  'caina-crepe': {
    id: 'caina-crepe',
    name: 'Caina High-Twist Crepe',
    shortLabel: 'Caina Crepe',
    category: 'Crepe Collection',
    weightGsm: '110 GSM',
    yarnCount: '2/80s S&Z Alternating High Twist',
    weaveStructure: 'Pebble Sandwash Pebble Weave',
    fabricWeave: 'crepeCrinkle',
    recommendedGeometry: 'silkDrape',
    colorway: 'celestial',
    weaveDensity: 74,
    sheerness: 0.18,
    luster: 0.75,
    displacementScale: 1.15,
    waveSpeed: 1.2,
    roughness: 0.35,
    tactileDescription: 'Tactile pebbled crinkle surface engineered through opposing yarn tensions, offering a crisp, non-glossy, elegant fall.',
  },
  'massori-net': {
    id: 'massori-net',
    name: 'Massori Metallic Lurex Net',
    shortLabel: 'Massori Net',
    category: 'Specialty Net Series',
    weightGsm: '48 GSM',
    yarnCount: 'Micro Polyamide + Flat Metallic Lurex',
    weaveStructure: 'Open Diamond Pore Mesh',
    fabricWeave: 'metallicMesh',
    recommendedGeometry: 'tactileSwatch',
    colorway: 'champagne',
    weaveDensity: 42,
    sheerness: 0.82,
    luster: 2.7,
    displacementScale: 0.65,
    waveSpeed: 0.9,
    roughness: 0.15,
    tactileDescription: 'Open diaphanous mesh intermeshed with metallic lurex threads that burst into brilliant specular glints under glancing rays.',
  },
  'combed-lawn': {
    id: 'combed-lawn',
    name: '80s Combed Cotton Lawn',
    shortLabel: 'Combed Lawn',
    category: 'Cotton Lawn & Blends',
    weightGsm: '72 GSM',
    yarnCount: '80s x 80s Long-Staple Cotton',
    weaveStructure: 'Dense 1/1 Balanced Plain Weave',
    fabricWeave: 'plainWeave',
    recommendedGeometry: 'tactileSwatch',
    colorway: 'opal',
    weaveDensity: 110,
    sheerness: 0.28,
    luster: 0.65,
    displacementScale: 0.75,
    waveSpeed: 1.0,
    roughness: 0.22,
    tactileDescription: 'Ultra-pure combed long-staple cotton offering a smooth, crisp hand-feel, breathable permeability, and natural soft sheen.',
  },
};
