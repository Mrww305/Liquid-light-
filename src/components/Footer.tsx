import React from 'react';
import { Activity, Compass } from 'lucide-react';

interface FooterProps {
  fps: number;
  mouseCoords: { x: number; y: number };
  onTriggerDeform: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  fps,
  mouseCoords,
  onTriggerDeform,
}) => {
  return (
    <footer className="flex justify-between items-center w-full pointer-events-auto flex-wrap gap-4 pt-4 border-t border-[rgba(26,25,23,0.06)] text-[10px] tracking-[0.25em] uppercase text-[rgba(26,25,23,0.4)]">
      <div className="flex items-center gap-3">
        <span className="hud-label">Interactive Glassmorphism</span>
        <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[rgba(26,25,23,0.2)]" />
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[9px] text-[rgba(26,25,23,0.4)]">
          <Activity className="w-2.5 h-2.5 opacity-60" />
          {fps} FPS · WebGL 2.0
        </span>
      </div>

      <button
        onClick={onTriggerDeform}
        className="hud-label hover:text-[#1a1917] cursor-pointer transition-colors flex items-center gap-1.5 group"
      >
        <Compass className="w-3 h-3 opacity-60 group-hover:rotate-90 transition-transform duration-500" />
        <span>Drag mouse to deform glass</span>
      </button>

      <div className="flex items-center gap-4">
        <span className="hidden md:inline-block font-mono text-[9px] text-[rgba(26,25,23,0.35)]">
          {`[X: ${mouseCoords.x.toFixed(2)} Y: ${mouseCoords.y.toFixed(2)}]`}
        </span>
        <span className="hud-label">© 2026 Reshmatex</span>
      </div>
    </footer>
  );
};
