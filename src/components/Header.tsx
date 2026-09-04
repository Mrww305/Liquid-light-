import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, SlidersHorizontal } from 'lucide-react';
import { ActiveModal } from '../types';
import { ambientSound } from '../audio/ambientSynth';

interface HeaderProps {
  onOpenModal: (modal: ActiveModal) => void;
  activeModal: ActiveModal;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenModal,
  activeModal,
  isSoundEnabled,
  onToggleSound,
}) => {
  const [waveHeights, setWaveHeights] = useState<number[]>([4, 8, 12, 6]);

  // Gentle waveform animation when sound is active
  useEffect(() => {
    if (!isSoundEnabled) return;

    const interval = setInterval(() => {
      const data = ambientSound.getFrequencyData();
      if (data && data.length > 4) {
        setWaveHeights([
          Math.max(4, Math.min(16, (data[0] / 255) * 16)),
          Math.max(4, Math.min(18, (data[2] / 255) * 18)),
          Math.max(4, Math.min(15, (data[4] / 255) * 15)),
          Math.max(4, Math.min(16, (data[6] / 255) * 16)),
        ]);
      } else {
        setWaveHeights([
          4 + Math.random() * 8,
          6 + Math.random() * 10,
          5 + Math.random() * 9,
          4 + Math.random() * 7,
        ]);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isSoundEnabled]);

  return (
    <header className="flex justify-between items-center w-full pointer-events-auto transition-all duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onOpenModal('none')}
          className="hud-label-strong hover:opacity-75 transition-opacity text-left cursor-pointer"
        >
          RESHMATEX.
        </button>
        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#1a1917]/25" />
        <span className="hidden sm:inline-block text-[9px] tracking-[0.2em] text-[rgba(26,25,23,0.4)] uppercase">
          Lahore Mill · 10M Yds/Mo
        </span>
      </div>

      <div className="flex items-center gap-4 sm:gap-8">
        <nav className="flex gap-3 sm:gap-6 items-center">
          <button
            onClick={() => onOpenModal(activeModal === 'products' ? 'none' : 'products')}
            className={`hud-label cursor-pointer relative py-1 flex items-center gap-1.5 ${
              activeModal === 'products' ? 'text-[#1a1917] font-semibold' : ''
            }`}
          >
            <span>Fabrics & Products</span>
            <span className="text-[9px] font-sans font-semibold px-1.5 py-0.2 rounded-full bg-emerald-700/10 text-emerald-800 border border-emerald-700/20">
              30+
            </span>
            {activeModal === 'products' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1a1917]" />
            )}
          </button>

          <button
            onClick={() => onOpenModal(activeModal === 'work' ? 'none' : 'work')}
            className={`hud-label cursor-pointer relative py-1 ${
              activeModal === 'work' ? 'text-[#1a1917] font-semibold' : ''
            }`}
          >
            Archives
            {activeModal === 'work' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1a1917]" />
            )}
          </button>

          <button
            onClick={() => onOpenModal(activeModal === 'studio' ? 'none' : 'studio')}
            className={`hud-label cursor-pointer relative py-1 ${
              activeModal === 'studio' ? 'text-[#1a1917] font-semibold' : ''
            }`}
          >
            About Mill
            {activeModal === 'studio' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1a1917]" />
            )}
          </button>

          <button
            onClick={() => onOpenModal(activeModal === 'journal' ? 'none' : 'journal')}
            className={`hud-label cursor-pointer relative py-1 ${
              activeModal === 'journal' ? 'text-[#1a1917] font-semibold' : ''
            }`}
          >
            Dispatches
            {activeModal === 'journal' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1a1917]" />
            )}
          </button>

          <button
            onClick={() => onOpenModal(activeModal === 'contact' ? 'none' : 'contact')}
            className={`hud-label cursor-pointer relative py-1 ${
              activeModal === 'contact' ? 'text-[#1a1917] font-semibold' : ''
            }`}
          >
            Contact
            {activeModal === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1a1917]" />
            )}
          </button>
        </nav>

        {/* Tactile Material Control & Audio Toggles */}
        <div className="flex items-center gap-3 border-l border-[rgba(26,25,23,0.12)] pl-5">
          <button
            onClick={() => onOpenModal(activeModal === 'controls' ? 'none' : 'controls')}
            title="Inspect Material & Optical Shaders"
            className={`p-2 rounded-full transition-all cursor-pointer ${
              activeModal === 'controls'
                ? 'bg-[#1a1917] text-white'
                : 'text-[rgba(26,25,23,0.5)] hover:text-[#1a1917] hover:bg-black/5'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleSound}
            title={isSoundEnabled ? 'Mute generative audio' : 'Unmute generative audio'}
            className="flex items-center gap-1.5 p-1.5 px-2 rounded-full text-[rgba(26,25,23,0.6)] hover:text-[#1a1917] hover:bg-black/5 transition-all cursor-pointer"
          >
            {isSoundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#1a1917]" />
                <div className="flex items-center gap-[2px] h-3.5">
                  {waveHeights.map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}px` }}
                      className="w-[1.5px] bg-[#1a1917] transition-all duration-100 rounded-full"
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-50" />
                <span className="text-[9px] uppercase tracking-wider opacity-60">Mute</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
