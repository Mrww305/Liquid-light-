import React, { useState } from 'react';
import { Sparkles, Move, Eye, Layers, ZoomIn, ZoomOut, Check, Activity, Palette } from 'lucide-react';
import { ColorwayConfig, ShaderSettings } from '../types';
import { FABRIC_TACTILE_PRESETS, FabricTactilePreset } from '../data/fabricPresets';
import { BACKDROP_THEMES } from '../data/backdropThemes';

interface HeroOverlayProps {
  currentColorway: ColorwayConfig;
  settings: ShaderSettings;
  onCycleColorway: () => void;
  onOpenControls: () => void;
  onOpenProducts: () => void;
  onSelectFabricPreset: (preset: FabricTactilePreset) => void;
  onToggleMacroZoom: () => void;
  onToggleLoom: () => void;
  onCycleBackdrop: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  currentColorway,
  settings,
  onCycleColorway,
  onOpenControls,
  onOpenProducts,
  onSelectFabricPreset,
  onToggleMacroZoom,
  onToggleLoom,
  onCycleBackdrop,
}) => {
  const text = 'Liquid Light';
  const [hasInteracted, setHasInteracted] = useState(false);

  const activePreset = settings.activeFabricPresetId
    ? FABRIC_TACTILE_PRESETS[settings.activeFabricPresetId]
    : FABRIC_TACTILE_PRESETS['zbm-chiffon'];

  const isMacroZoomed = (settings.macroZoom || 1.0) > 1.8;
  const currentBackdrop = BACKDROP_THEMES[settings.backdropTheme] || BACKDROP_THEMES.studioDark;
  const isDark = currentBackdrop.isDark;

  return (
    <div
      id="hero"
      className="flex flex-col items-center text-center justify-center flex-grow px-4 sm:px-6 pointer-events-none select-none z-10 my-auto"
    >
      {/* Top subtle edition marker */}
      <div className="fade-in-up flex items-center gap-2 mb-2">
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-amber-400' : 'bg-emerald-700/70'}`} />
        <span className={`hud-label text-[10px] tracking-[0.28em] uppercase ${isDark ? 'text-white/60' : 'text-[rgba(26,25,23,0.5)]'}`}>
          Reshmatex Vertical Mill · Automated 3D Loom
        </span>
      </div>

      {/* Main Title with Letter-by-Letter Blur Entrance */}
      <h1
        id="hero-title"
        className={`hero-title serif font-normal italic leading-[0.94] tracking-[-0.02em] transition-colors duration-500 ${
          isDark ? 'text-[#f6f5f1]' : 'text-[#1a1917]'
        }`}
        style={{ fontSize: 'clamp(3.2rem, 9vw, 7.2rem)' }}
      >
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="blur-char inline-block"
            style={{
              animationDelay: `${0.25 + index * 0.055}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <p
        className={`fade-in-up text-[11px] tracking-[0.25em] uppercase mt-4 max-w-[560px] leading-relaxed transition-colors duration-500 ${
          isDark ? 'text-white/60' : 'text-[rgba(26,25,23,0.5)]'
        }`}
        style={{ animationDelay: '1.2s' }}
      >
        Dynamic warp & weft shift on loom · Microscopic yarn depth — reshmatex.com
      </p>

      {/* Interactive Tactile Fabric Selector Pills */}
      <div
        className="fade-in-up flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 max-w-3xl pointer-events-auto"
        style={{ animationDelay: '1.5s' }}
      >
        {Object.values(FABRIC_TACTILE_PRESETS).map((preset) => {
          const isSelected = settings.activeFabricPresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => {
                setHasInteracted(true);
                onSelectFabricPreset(preset);
              }}
              className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.14em] font-medium transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                isSelected
                  ? isDark
                    ? 'bg-amber-400 text-black font-semibold shadow-md ring-2 ring-amber-300/50'
                    : 'bg-[#1a1917] text-white shadow-md ring-2 ring-black/10'
                  : isDark
                  ? 'bg-white/10 text-white/80 border border-white/15 hover:bg-white/20 hover:text-white backdrop-blur-md'
                  : 'glass-pill bg-white/75 text-[#1a1917]/75 hover:bg-white hover:text-[#1a1917]'
              }`}
            >
              {isSelected && <Check className={`w-2.5 h-2.5 ${isDark ? 'text-black' : 'text-amber-300'}`} />}
              <span>{preset.shortLabel}</span>
              <span className={`text-[8.5px] px-1 py-0.2 rounded font-mono ${
                isSelected
                  ? isDark ? 'bg-black/20 text-black' : 'bg-white/20 text-white'
                  : isDark ? 'bg-white/10 text-white/60' : 'bg-black/5 text-[rgba(26,25,23,0.5)]'
              }`}>
                {preset.weightGsm}
              </span>
            </button>
          );
        })}
      </div>

      {/* Core Loom & Contrast Control Bar */}
      <div
        className="fade-in-up flex flex-wrap items-center justify-center gap-2 mt-4 pointer-events-auto"
        style={{ animationDelay: '1.8s' }}
      >
        {/* 1. Automated Loom Weaving Motion Toggle Button */}
        <button
          onClick={() => {
            setHasInteracted(true);
            onToggleLoom();
          }}
          className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
            settings.loomActive
              ? isDark
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30'
                : 'bg-amber-600 text-white shadow-md ring-2 ring-amber-700/20'
              : isDark
              ? 'bg-white/10 text-white/50 border border-white/10 hover:bg-white/15'
              : 'bg-black/5 text-[#1a1917]/60 border border-black/10 hover:bg-black/10'
          }`}
          title="Toggle automated loom weaving motion and weave pattern shifting"
        >
          <Activity className={`w-3.5 h-3.5 ${settings.loomActive ? 'animate-pulse text-amber-400' : 'opacity-40'}`} />
          <span>{settings.loomActive ? 'Loom: Weaving Active' : 'Loom: Paused'}</span>
        </button>

        {/* 2. Studio Backdrop & Contrast Switcher */}
        <button
          onClick={() => {
            setHasInteracted(true);
            onCycleBackdrop();
          }}
          className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-medium transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
            isDark
              ? 'bg-white/10 text-white/90 border border-white/15 hover:bg-white/20 backdrop-blur-md'
              : 'glass-pill bg-white/80 text-[#1a1917] hover:bg-white hover:shadow-md'
          }`}
          title="Cycle studio backdrop to maximize weave contrast and eliminate background blending"
        >
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span>Backdrop: {currentBackdrop.name}</span>
          <span
            className="w-2 h-2 rounded-full border border-white/20 ml-0.5"
            style={{ backgroundColor: currentBackdrop.accentColor }}
          />
        </button>

        {/* 3. Macro Weave Magnifier Button */}
        <button
          onClick={() => {
            setHasInteracted(true);
            onToggleMacroZoom();
          }}
          className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
            isMacroZoomed
              ? 'bg-amber-600 text-white ring-2 ring-amber-700/20'
              : isDark
              ? 'bg-white/10 text-white/90 border border-white/15 hover:bg-white/20 backdrop-blur-md'
              : 'glass-pill bg-white/85 text-[#1a1917] hover:bg-white hover:shadow-md'
          }`}
          title="Zoom camera to microscopic yarn thread level"
        >
          {isMacroZoomed ? (
            <>
              <ZoomOut className="w-3.5 h-3.5" />
              <span>Reset 1X Drape</span>
            </>
          ) : (
            <>
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Inspect Weave (3X)</span>
            </>
          )}
        </button>

        {/* Live Active Fabric Spec Badge */}
        {activePreset && (
          <div className={`px-3 py-1.5 rounded-full text-[10px] tracking-wider hidden md:flex items-center gap-2 border ${
            isDark
              ? 'bg-white/5 text-white/70 border-white/10 backdrop-blur-sm'
              : 'glass-pill text-[#1a1917]/75 bg-white/60 border-[rgba(26,25,23,0.06)]'
          }`}>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#1a1917]'}`}>{activePreset.weaveStructure}</span>
            <span className="opacity-40">·</span>
            <span className="font-mono text-[9px] opacity-75">{activePreset.yarnCount}</span>
          </div>
        )}
      </div>

      {/* Tertiary Dock: Products Catalog, Palette, and Optics Drawer */}
      <div
        className="fade-in-up flex flex-wrap items-center justify-center gap-2 mt-3.5 pointer-events-auto"
        style={{ animationDelay: '2.0s' }}
      >
        <button
          onClick={onOpenProducts}
          className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            isDark
              ? 'bg-white/10 text-white/90 border border-white/15 hover:bg-white/20'
              : 'glass-pill text-[#1a1917] bg-white/80 hover:bg-white hover:shadow-sm'
          }`}
        >
          <Layers className="w-3 h-3 text-emerald-400" />
          <span>Catalog (30+)</span>
        </button>

        <button
          onClick={() => {
            setHasInteracted(true);
            onCycleColorway();
          }}
          className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] transition-all flex items-center gap-1.5 cursor-pointer group ${
            isDark
              ? 'bg-white/10 text-white/80 border border-white/15 hover:bg-white/20 hover:text-white'
              : 'glass-pill text-[#1a1917]/75 hover:text-[#1a1917] hover:bg-white/80'
          }`}
        >
          <Sparkles className="w-3 h-3 transition-transform group-hover:rotate-45 text-amber-400" />
          <span>Color: {currentColorway.name}</span>
        </button>

        <button
          onClick={onOpenControls}
          className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] transition-all flex items-center gap-1.5 cursor-pointer ${
            isDark
              ? 'bg-white/10 text-white/75 border border-white/15 hover:bg-white/20 hover:text-white'
              : 'glass-pill text-[rgba(26,25,23,0.6)] hover:text-[#1a1917] hover:bg-white/80'
          }`}
        >
          <Eye className="w-3 h-3 text-sky-400" />
          <span>Loom & Optics Engine</span>
        </button>

        {!hasInteracted && (
          <span className={`hidden lg:flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] pl-1 ${
            isDark ? 'text-white/40' : 'text-[rgba(26,25,23,0.38)]'
          }`}>
            <Move className="w-2.5 h-2.5 opacity-60" />
            <span>Drag to rotate · Auto-loom shifts weave depth</span>
          </span>
        )}
      </div>
    </div>
  );
};
