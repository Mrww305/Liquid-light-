import React, { useState, useEffect, useCallback } from 'react';
import { WebGLCanvas } from './components/WebGLCanvas';
import { AudioGateway } from './components/AudioGateway';
import { Header } from './components/Header';
import { HeroOverlay } from './components/HeroOverlay';
import { Footer } from './components/Footer';
import { WorkModal } from './components/Modals/WorkModal';
import { StudioModal } from './components/Modals/StudioModal';
import { JournalModal } from './components/Modals/JournalModal';
import { ContactModal } from './components/Modals/ContactModal';
import { ProductsCatalogModal } from './components/Modals/ProductsCatalogModal';
import { MaterialControlsDrawer } from './components/Modals/MaterialControlsDrawer';
import { ambientSound } from './audio/ambientSynth';
import { ShaderSettings, ActiveModal, ColorwayId, BackdropThemeId, FabricProduct } from './types';
import { COLORWAY_PRESETS } from './data/colorways';
import { FABRIC_TACTILE_PRESETS, FabricTactilePreset } from './data/fabricPresets';
import { BACKDROP_THEMES } from './data/backdropThemes';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [selectedInquiryFabric, setSelectedInquiryFabric] = useState<string | undefined>(undefined);
  const [fps, setFps] = useState<number>(60);
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [shaderSettings, setShaderSettings] = useState<ShaderSettings>({
    colorway: 'opal',
    geometry: 'silkDrape',
    fabricWeave: 'plainWeave',
    waveSpeed: 1.4,
    displacementScale: 1.2,
    mouseSensitivity: 1.0,
    roughness: 0.2,
    weaveDensity: 92,
    sheerness: 0.65,
    luster: 1.4,
    macroZoom: 1.0,
    activeFabricPresetId: 'zbm-chiffon',
    wireframe: false,
    loomActive: true,
    loomSpeed: 1.0,
    loomShedDepth: 1.0,
    threadContrast: 1.0,
    backdropTheme: 'studioDark',
  });

  // Mobile Viewport Height standard handler
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Initial loader timeout to simulate asset cache and ensure smooth GPU upload
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
      clearTimeout(timer);
    };
  }, []);

  const handleEnterGateway = useCallback((withSound: boolean) => {
    setHasEntered(true);
    if (withSound) {
      const success = ambientSound.initAndPlay();
      setIsSoundEnabled(success);
    } else {
      setIsSoundEnabled(false);
    }
  }, []);

  const handleToggleSound = useCallback(() => {
    const isMuted = ambientSound.toggleMute();
    setIsSoundEnabled(!isMuted);
  }, []);

  // Cycle through colorways
  const handleCycleColorway = useCallback(() => {
    const keys = Object.keys(COLORWAY_PRESETS) as ColorwayId[];
    const currentIndex = keys.indexOf(shaderSettings.colorway);
    const nextKey = keys[(currentIndex + 1) % keys.length];
    setShaderSettings((prev) => ({ ...prev, colorway: nextKey }));
  }, [shaderSettings.colorway]);

  // Apply specific colorway from Work modal
  const handleApplyColorway = useCallback((id: ColorwayId) => {
    setShaderSettings((prev) => ({ ...prev, colorway: id }));
    setActiveModal('none');
  }, []);

  // Apply tactile preset from Hero or Drawer
  const handleSelectFabricPreset = useCallback((preset: FabricTactilePreset) => {
    setShaderSettings((prev) => ({
      ...prev,
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
    }));
  }, []);

  // Toggle Macro Thread Inspection Zoom
  const handleToggleMacroZoom = useCallback(() => {
    setShaderSettings((prev) => ({
      ...prev,
      macroZoom: (prev.macroZoom || 1.0) > 1.8 ? 1.0 : 2.8,
    }));
  }, []);

  // Toggle Automated Loom Simulation
  const handleToggleLoom = useCallback(() => {
    setShaderSettings((prev) => ({
      ...prev,
      loomActive: !prev.loomActive,
    }));
  }, []);

  // Cycle Studio Backdrop to guarantee high weave contrast
  const handleCycleBackdrop = useCallback(() => {
    const keys = Object.keys(BACKDROP_THEMES) as BackdropThemeId[];
    const currentIndex = keys.indexOf(shaderSettings.backdropTheme);
    const nextKey = keys[(currentIndex + 1) % keys.length];
    setShaderSettings((prev) => ({
      ...prev,
      backdropTheme: nextKey,
    }));
  }, [shaderSettings.backdropTheme]);

  // Apply fabric product from catalog
  const handleSimulateFabricProduct = useCallback((product: FabricProduct) => {
    const preset = FABRIC_TACTILE_PRESETS[product.id];
    if (preset) {
      handleSelectFabricPreset(preset);
    } else {
      let weave: ShaderSettings['fabricWeave'] = 'plainWeave';
      let sheerness = 0.3;
      let luster = 1.2;
      let density = 90;

      if (product.category === 'satin') {
        weave = 'satinAnisotropic';
        sheerness = 0.05;
        luster = 2.4;
        density = 120;
      } else if (product.category === 'chiffon') {
        weave = 'plainWeave';
        sheerness = 0.7;
        luster = 1.3;
        density = 95;
      } else if (product.category === 'crepe') {
        weave = 'crepeCrinkle';
        sheerness = 0.15;
        luster = 0.8;
        density = 80;
      } else if (product.id.includes('peach')) {
        weave = 'peachFuzz';
        sheerness = 0.1;
        luster = 0.9;
        density = 100;
      } else if (product.category === 'specialty' || product.id.includes('net') || product.id.includes('mesh')) {
        weave = 'metallicMesh';
        sheerness = 0.75;
        luster = 2.6;
        density = 60;
      }

      setShaderSettings((prev) => ({
        ...prev,
        fabricWeave: weave,
        colorway: product.colorwayPreset,
        sheerness,
        luster,
        weaveDensity: density,
        geometry: 'silkDrape',
        activeFabricPresetId: product.id,
      }));
    }
    setActiveModal('none');
  }, [handleSelectFabricPreset]);

  // Trigger brief wave pulse deform
  const handleTriggerDeform = useCallback(() => {
    setShaderSettings((prev) => ({
      ...prev,
      displacementScale: prev.displacementScale > 1.4 ? 1.0 : 1.8,
    }));
    setTimeout(() => {
      setShaderSettings((prev) => ({ ...prev, displacementScale: 1.0 }));
    }, 1800);
  }, []);

  const currentColorwayConfig = COLORWAY_PRESETS[shaderSettings.colorway] || COLORWAY_PRESETS.opal;
  const currentBackdrop = BACKDROP_THEMES[shaderSettings.backdropTheme] || BACKDROP_THEMES.studioDark;

  return (
    <div
      data-theme={currentBackdrop.isDark ? 'dark' : 'light'}
      className="relative w-full h-[calc(var(--vh,1vh)*100)] overflow-hidden transition-colors duration-700 select-none"
      style={{
        background: currentBackdrop.backgroundCss,
      }}
    >
      {/* 1. Initial Loading Screen */}
      {isLoading && (
        <div
          id="loader"
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#121214] text-white z-[100] transition-opacity duration-700"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="spinner" />
            <span className="hud-label tracking-[0.25em] text-white/70">Calibrating Loom & Shaders…</span>
          </div>
        </div>
      )}

      {/* 2. Audio Gateway Overlay */}
      {!isLoading && !hasEntered && (
        <AudioGateway isVisible={!hasEntered} onEnter={handleEnterGateway} />
      )}

      {/* 3. Main Scene */}
      <main
        id="scene"
        className={`relative w-full h-[calc(var(--vh,1vh)*100)] overflow-hidden transition-opacity duration-1000 ${
          hasEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* WebGL 3D Canvas */}
        {hasEntered && (
          <WebGLCanvas
            settings={shaderSettings}
            onFpsUpdate={setFps}
            onMouseCoordinates={setMouseCoords}
          />
        )}

        {/* DOM Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-12 z-10 pointer-events-none">
          {/* Header */}
          <Header
            onOpenModal={setActiveModal}
            activeModal={activeModal}
            isSoundEnabled={isSoundEnabled}
            onToggleSound={handleToggleSound}
          />

          {/* Center Typography & Interactive Dock */}
          <HeroOverlay
            currentColorway={currentColorwayConfig}
            settings={shaderSettings}
            onCycleColorway={handleCycleColorway}
            onOpenControls={() => setActiveModal('controls')}
            onOpenProducts={() => setActiveModal('products')}
            onSelectFabricPreset={handleSelectFabricPreset}
            onToggleMacroZoom={handleToggleMacroZoom}
            onToggleLoom={handleToggleLoom}
            onCycleBackdrop={handleCycleBackdrop}
          />

          {/* Footer */}
          <Footer
            fps={fps}
            mouseCoords={mouseCoords}
            onTriggerDeform={handleTriggerDeform}
          />
        </div>

        {/* Interactive Modals */}
        {activeModal === 'products' && (
          <ProductsCatalogModal
            onClose={() => setActiveModal('none')}
            onSimulateFabric={handleSimulateFabricProduct}
            onRequestInquiry={(fabricName) => {
              setSelectedInquiryFabric(fabricName);
              setActiveModal('contact');
            }}
          />
        )}

        {activeModal === 'work' && (
          <WorkModal
            onClose={() => setActiveModal('none')}
            onApplyColorway={handleApplyColorway}
          />
        )}

        {activeModal === 'studio' && (
          <StudioModal onClose={() => setActiveModal('none')} />
        )}

        {activeModal === 'journal' && (
          <JournalModal onClose={() => setActiveModal('none')} />
        )}

        {activeModal === 'contact' && (
          <ContactModal
            onClose={() => {
              setSelectedInquiryFabric(undefined);
              setActiveModal('none');
            }}
            prefilledProduct={selectedInquiryFabric}
          />
        )}

        {activeModal === 'controls' && (
          <MaterialControlsDrawer
            settings={shaderSettings}
            onChange={setShaderSettings}
            onClose={() => setActiveModal('none')}
          />
        )}
      </main>
    </div>
  );
}
