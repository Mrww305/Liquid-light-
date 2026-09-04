import { ColorwayConfig } from '../types';

export const COLORWAY_PRESETS: Record<string, ColorwayConfig> = {
  opal: {
    id: 'opal',
    name: 'Pearlescent Opal',
    paletteDescription: 'Iridescent crystalline luster with spectral refraction across blue, rose, and mint.',
    cream: [0.98, 0.96, 0.94],
    color1: [0.85, 0.88, 0.98], // lightBlue
    color2: [0.98, 0.85, 0.92], // pink
    color3: [0.88, 0.96, 0.92], // mint
    fresnelPower: 3.0,
    specular: 0.04,
  },
  champagne: {
    id: 'champagne',
    name: 'Champagne Silk',
    paletteDescription: 'Warm gossamer drape illuminated with sunlit gold, raw silk ivory, and rose quartz.',
    cream: [0.99, 0.97, 0.93],
    color1: [0.96, 0.89, 0.78], // gold
    color2: [0.98, 0.88, 0.85], // blush
    color3: [0.92, 0.93, 0.85], // olive-ivory
    fresnelPower: 2.8,
    specular: 0.06,
  },
  celestial: {
    id: 'celestial',
    name: 'Celestial Glass',
    paletteDescription: 'Deep atmospheric twilight shifting through crystalline violet, periwinkle, and pale cyan.',
    cream: [0.96, 0.97, 0.99],
    color1: [0.82, 0.86, 0.98], // icy blue
    color2: [0.91, 0.84, 0.98], // lavender
    color3: [0.84, 0.96, 0.96], // cyan frost
    fresnelPower: 3.2,
    specular: 0.05,
  },
  obsidian: {
    id: 'obsidian',
    name: 'Smoked Obsidian',
    paletteDescription: 'Subtle darkened mineral glass with ethereal prism rims and deep monochromatic sheen.',
    cream: [0.35, 0.34, 0.36],
    color1: [0.55, 0.52, 0.65],
    color2: [0.65, 0.45, 0.55],
    color3: [0.45, 0.60, 0.58],
    fresnelPower: 2.4,
    specular: 0.09,
  },
  aurora: {
    id: 'aurora',
    name: 'Boreal Lumina',
    paletteDescription: 'Vibrant polar refraction weaving electromagnetic greens, orchid pinks, and silver.',
    cream: [0.97, 0.98, 0.96],
    color1: [0.80, 0.98, 0.88], // mint green
    color2: [0.96, 0.80, 0.94], // magenta
    color3: [0.82, 0.92, 0.99], // sky
    fresnelPower: 3.0,
    specular: 0.05,
  },
};
