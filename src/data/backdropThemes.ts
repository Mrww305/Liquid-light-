import { BackdropThemeId } from '../types';

export interface BackdropThemeConfig {
  id: BackdropThemeId;
  name: string;
  tag: string;
  isDark: boolean;
  bgClass: string;
  backgroundCss: string;
  threeClearColor: number;
  textColor: string;
  accentColor: string;
  description: string;
}

export const BACKDROP_THEMES: Record<BackdropThemeId, BackdropThemeConfig> = {
  studioDark: {
    id: 'studioDark',
    name: 'Atelier Noir',
    tag: 'Max Weave Contrast',
    isDark: true,
    bgClass: 'bg-[#0f1013]',
    backgroundCss: 'radial-gradient(ellipse at 50% 45%, #1f2128 0%, #0d0e12 85%)',
    threeClearColor: 0x0f1013,
    textColor: '#f5f4f0',
    accentColor: '#fbbf24',
    description: 'High-contrast atelier backdrop that makes sheer weave pores, filament luster, and thread relief vividly pop.'
  },
  neutralSlate: {
    id: 'neutralSlate',
    name: 'Textile Slate',
    tag: 'Inspection Neutral',
    isDark: true,
    bgClass: 'bg-[#181c22]',
    backgroundCss: 'radial-gradient(ellipse at 50% 45%, #252b35 0%, #12151a 85%)',
    threeClearColor: 0x181c22,
    textColor: '#f1f3f7',
    accentColor: '#38bdf8',
    description: 'Calibrated laboratory neutral gray for precise fiber colorway and reflection inspection.'
  },
  warmUmber: {
    id: 'warmUmber',
    name: 'Raw Silk Umber',
    tag: 'Warm Loom Shed',
    isDark: true,
    bgClass: 'bg-[#161210]',
    backgroundCss: 'radial-gradient(ellipse at 50% 45%, #251e1a 0%, #0f0c0b 85%)',
    threeClearColor: 0x161210,
    textColor: '#faf6f0',
    accentColor: '#f97316',
    description: 'Warm, earthy heritage mill tone evoking traditional wooden looms and organic silk cocoons.'
  },
  lightAtelier: {
    id: 'lightAtelier',
    name: 'Loom Canvas',
    tag: 'High-Shading Linen',
    isDark: false,
    bgClass: 'bg-[#ede9e1]',
    backgroundCss: 'radial-gradient(ellipse at 50% 45%, #f7f4ee 0%, #ded9cf 85%)',
    threeClearColor: 0xede9e1,
    textColor: '#1a1917',
    accentColor: '#047857',
    description: 'Studio linen canvas with high-contrast thread shadowing and contact depth.'
  }
};
