import React from 'react';
import { X, RotateCcw, Box, Waves, Sparkles, Sliders, Layers, ZoomIn, Activity, Palette } from 'lucide-react';
import { ShaderSettings, ColorwayId, GeometryType, BackdropThemeId } from '../../types';
import { COLORWAY_PRESETS } from '../../data/colorways';
import { FABRIC_TACTILE_PRESETS, FabricTactilePreset } from '../../data/fabricPresets';
import { BACKDROP_THEMES } from '../../data/backdropThemes';

interface MaterialControlsDrawerProps {
  settings: ShaderSettings;
  onChange: (newSettings: ShaderSettings) => void;
  onClose: () => void;
}

export const MaterialControlsDrawer: React.FC<MaterialControlsDrawerProps> = ({
  settings,
  onChange,
  onClose,
}) => {
  const handleReset = () => {
    onChange({
      colorway: 'opal',
      geometry: 'silkDrape',
      fabricWeave: 'plainWeave',
      waveSpeed: 1.4,
      displacementScale: 1.2,
      mouseSensitivity: 1.0,
      roughness: 0.2,
      weaveDensity: 90,
      sheerness: 0.45,
      luster: 1.3,
      macroZoom: 1.0,
      activeFabricPresetId: 'zbm-chiffon',
      wireframe: false,
      loomActive: true,
      loomSpeed: 1.0,
      loomShedDepth: 1.0,
      threadContrast: 1.0,
      backdropTheme: 'studioDark',
    });
  };

  const applyFabricPreset = (preset: FabricTactilePreset) => {
    onChange({
      ...settings,
      fabricWeave: preset.fabricWeave,
      geometry: preset.recommendedGeometry,
      colorway: preset.colorway,
      weaveDensity: preset.weaveDensity,
      sheerness: preset.sheerness,
      luster: preset.luster,
      displacementScale: preset.displacementScale,
      waveSpeed: preset.waveSpeed,
      roughness: preset.roughness,
      activeFabricPresetId: preset.id,
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[440px] p-4 sm:p-6 flex flex-col justify-end pointer-events-none">
      <div className="glass-panel w-full rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/70 pointer-events-auto flex flex-col max-h-[92vh] overflow-y-auto space-y-5 animate-slideInRight">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(26,25,23,0.08)]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#1a1917]" />
            <div>
              <h4 className="hud-label-strong text-xs">Tactile Textile & Loom Engine</h4>
              <p className="text-[10px] text-[rgba(26,25,23,0.5)]">Automated weave shifts & contrast calibration</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              title="Reset parameters"
              className="p-1.5 rounded-full hover:bg-black/5 text-[rgba(26,25,23,0.5)] hover:text-[#1a1917] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/5 text-[rgba(26,25,23,0.5)] hover:text-[#1a1917] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. Automated Loom Simulation & Weave Depth Section */}
        <div className="p-3.5 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-600/20 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1a1917]">
                Automated Loom Simulation
              </span>
            </div>
            <button
              onClick={() => onChange({ ...settings, loomActive: !settings.loomActive })}
              className={`px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                settings.loomActive
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-black/10 text-[#1a1917]/60 hover:bg-black/15'
              }`}
            >
              {settings.loomActive ? 'Loom Running' : 'Loom Paused'}
            </button>
          </div>
          <p className="text-[9.5px] text-[rgba(26,25,23,0.6)] leading-relaxed">
            Continuously shifts warp & weft interlacing, alternating heddle harness elevation to reveal 3D material depth and yarn shadows.
          </p>

          <div className="space-y-2 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.6)] font-medium">
                <span>Weave Shift & Take-Up Speed</span>
                <span className="font-mono font-bold text-[#1a1917]">{(settings.loomSpeed || 1.0).toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={2.5}
                step={0.1}
                value={settings.loomSpeed || 1.0}
                onChange={(e) => onChange({ ...settings, loomSpeed: parseFloat(e.target.value) })}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.6)] font-medium">
                <span>Heddle Shedding Depth (3D Float)</span>
                <span className="font-mono font-bold text-[#1a1917]">{(settings.loomShedDepth || 1.0).toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={2.0}
                step={0.1}
                value={settings.loomShedDepth || 1.0}
                onChange={(e) => onChange({ ...settings, loomShedDepth: parseFloat(e.target.value) })}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.6)] font-medium">
                <span>Thread Crevice Shadow Contrast</span>
                <span className="font-mono font-bold text-[#1a1917]">{(settings.threadContrast || 1.0).toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2.0}
                step={0.1}
                value={settings.threadContrast || 1.0}
                onChange={(e) => onChange({ ...settings, threadContrast: parseFloat(e.target.value) })}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 2. Studio Backdrop & Contrast Atmosphere */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] font-medium flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Palette className="w-3 h-3 text-[#1a1917]" />
              <span>Studio Backdrop (Weave Contrast)</span>
            </span>
            <span className="text-[9px] text-amber-700 font-semibold">Resolves fabric camouflage</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.values(BACKDROP_THEMES).map((theme) => {
              const isSelected = settings.backdropTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => onChange({ ...settings, backdropTheme: theme.id as BackdropThemeId })}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1a1917] text-white border-[#1a1917] shadow-md ring-2 ring-amber-500/30'
                      : 'bg-white/40 border-[rgba(26,25,23,0.08)] text-[#1a1917] hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[11px] font-semibold">{theme.name}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: theme.isDark ? '#1a1a1c' : '#ede9e1' }}
                    />
                  </div>
                  <span className={`text-[9px] line-clamp-1 ${isSelected ? 'text-amber-300' : 'text-[rgba(26,25,23,0.5)]'}`}>
                    {theme.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reshmatex Authentic Fabric Presets */}
        <div className="space-y-2 pt-1 border-t border-[rgba(26,25,23,0.08)]">
          <label className="text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] font-medium flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#1a1917]" />
            <span>Mill Fabric Tactile Presets</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.values(FABRIC_TACTILE_PRESETS).map((p) => {
              const isSelected = settings.activeFabricPresetId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => applyFabricPreset(p)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a1917] text-white border-[#1a1917] shadow-sm'
                      : 'bg-white/40 border-[rgba(26,25,23,0.08)] text-[#1a1917] hover:bg-white/70'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold block leading-tight">{p.name}</span>
                    <span className={`text-[9px] font-mono ${isSelected ? 'text-amber-300' : 'text-[rgba(26,25,23,0.5)]'}`}>
                      {p.weightGsm}
                    </span>
                  </div>
                  <span className={`text-[9.5px] block mt-0.5 ${isSelected ? 'text-white/70' : 'text-[rgba(26,25,23,0.5)]'}`}>
                    {p.weaveStructure}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Geometry Topology */}
        <div className="space-y-2 pt-1 border-t border-[rgba(26,25,23,0.08)]">
          <label className="text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] font-medium flex items-center gap-1.5">
            <Box className="w-3 h-3 text-[#1a1917]" />
            <span>3D Fabric Topology</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'silkDrape', label: 'Floating Silk Cloth', desc: 'Gravity Drape & Wind' },
              { id: 'satinRibbon', label: 'Couture Ribbon Sash', desc: 'Twisted Silk Band' },
              { id: 'tactileSwatch', label: 'Swatch Specimen', desc: 'Tilted Macro Board' },
              { id: 'torusKnot', label: 'Woven Fiber Knot', desc: 'Continuous Spindle' },
            ].map((g) => {
              const isSelected = settings.geometry === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => onChange({ ...settings, geometry: g.id as GeometryType })}
                  className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#1a1917] shadow-sm font-semibold'
                      : 'bg-white/40 border-[rgba(26,25,23,0.08)] hover:bg-white/70'
                  }`}
                >
                  <span className="text-[11px] block text-[#1a1917] leading-tight">{g.label}</span>
                  <span className="text-[9px] text-[rgba(26,25,23,0.5)] block">{g.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Macro Weave Inspection & Zoom Slider */}
        <div className="p-3 bg-white/60 border border-[rgba(26,25,23,0.08)] rounded-xl space-y-2">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.7)] font-medium">
            <span className="flex items-center gap-1.5 text-[#1a1917]">
              <ZoomIn className="w-3.5 h-3.5" />
              Macro Thread Inspection Zoom
            </span>
            <span className="font-mono font-bold text-xs">{(settings.macroZoom || 1.0).toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min={1.0}
            max={3.2}
            step={0.1}
            value={settings.macroZoom || 1.0}
            onChange={(e) => onChange({ ...settings, macroZoom: parseFloat(e.target.value) })}
            className="w-full accent-[#1a1917] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-[rgba(26,25,23,0.4)]">
            <span>1.0x Full Drape</span>
            <span>2.0x Fabric Fold</span>
            <span>3.2x Micro Yarn Filaments</span>
          </div>
        </div>

        {/* Tactile Micro-Physics Sliders */}
        <div className="space-y-3 pt-1">
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] font-medium">
              <span>Warp & Weft Thread Density</span>
              <span className="font-mono">{Math.round(settings.weaveDensity || 90)} th/cm</span>
            </div>
            <input
              type="range"
              min={30}
              max={150}
              step={5}
              value={settings.weaveDensity || 90}
              onChange={(e) => onChange({ ...settings, weaveDensity: parseFloat(e.target.value) })}
              className="w-full accent-[#1a1917] cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] font-medium">
              <span>Optical Sheerness & Translucency</span>
              <span className="font-mono">{Math.round((settings.sheerness ?? 0.45) * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.0}
              max={0.85}
              step={0.05}
              value={settings.sheerness ?? 0.45}
              onChange={(e) => onChange({ ...settings, sheerness: parseFloat(e.target.value) })}
              className="w-full accent-[#1a1917] cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] font-medium">
              <span>Fiber Surface Luster & Sheen</span>
              <span className="font-mono">{(settings.luster ?? 1.3).toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0.3}
              max={3.0}
              step={0.1}
              value={settings.luster ?? 1.3}
              onChange={(e) => onChange({ ...settings, luster: parseFloat(e.target.value) })}
              className="w-full accent-[#1a1917] cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] font-medium">
              <span className="flex items-center gap-1">
                <Waves className="w-3 h-3" />
                Wind Velocity & Breeze
              </span>
              <span className="font-mono">{settings.waveSpeed.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={3.0}
              step={0.1}
              value={settings.waveSpeed}
              onChange={(e) => onChange({ ...settings, waveSpeed: parseFloat(e.target.value) })}
              className="w-full accent-[#1a1917] cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] font-medium">
              <span>Gravitational Drape Shear</span>
              <span className="font-mono">{settings.displacementScale.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={2.5}
              step={0.1}
              value={settings.displacementScale}
              onChange={(e) => onChange({ ...settings, displacementScale: parseFloat(e.target.value) })}
              className="w-full accent-[#1a1917] cursor-pointer"
            />
          </div>
        </div>

        {/* Colorway Palette Selector */}
        <div className="space-y-2 pt-2 border-t border-[rgba(26,25,23,0.08)]">
          <label className="text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] font-medium flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#1a1917]" />
            <span>Refractive Colorway</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.values(COLORWAY_PRESETS).map((cw) => {
              const isSelected = settings.colorway === cw.id;
              return (
                <button
                  key={cw.id}
                  onClick={() => onChange({ ...settings, colorway: cw.id as ColorwayId })}
                  className={`text-left p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#1a1917] shadow-sm'
                      : 'bg-white/40 border-[rgba(26,25,23,0.08)] hover:bg-white/70'
                  }`}
                >
                  <span className="text-xs font-medium text-[#1a1917]">{cw.name}</span>
                  <div className="flex items-center gap-0.5">
                    <span
                      style={{
                        backgroundColor: `rgb(${cw.color1.map((c) => Math.round(c * 255)).join(',')})`,
                      }}
                      className="w-2 h-2 rounded-full border border-black/10"
                    />
                    <span
                      style={{
                        backgroundColor: `rgb(${cw.color2.map((c) => Math.round(c * 255)).join(',')})`,
                      }}
                      className="w-2 h-2 rounded-full border border-black/10"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wireframe toggle */}
        <div className="pt-2 border-t border-[rgba(26,25,23,0.08)] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] font-medium block">
              Weave Mesh Wireframe
            </span>
            <span className="text-[9px] text-[rgba(26,25,23,0.4)]">Visualize 130x130 cloth topology</span>
          </div>
          <button
            onClick={() => onChange({ ...settings, wireframe: !settings.wireframe })}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              settings.wireframe ? 'bg-[#1a1917]' : 'bg-black/10'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                settings.wireframe ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
