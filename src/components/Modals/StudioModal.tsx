import React from 'react';
import { X, MapPin, Compass, Cpu, Feather, Factory, Globe2, ShieldCheck } from 'lucide-react';
import { RESHMATEX_COMPANY_INFO } from '../../data/reshmatexProducts';

interface StudioModalProps {
  onClose: () => void;
}

export const StudioModal: React.FC<StudioModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-8 bg-black/20 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-[#fcfbfa] border border-[rgba(26,25,23,0.12)] shadow-2xl rounded-2xl overflow-hidden pointer-events-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[rgba(26,25,23,0.08)] bg-white/60">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[rgba(26,25,23,0.45)]">
              Heritage & Vertical Mill Infrastructure
            </span>
            <h3 className="serif text-xl sm:text-2xl text-[#1a1917] italic font-normal">
              About Reshmatex Limited
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[rgba(26,25,23,0.5)] hover:text-[#1a1917] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7">
          <div>
            <h4 className="serif text-2xl text-[#1a1917] italic font-normal mb-3">
              Vertical Textile Manufacturing & Modern Fabric Engineering
            </h4>
            <p className="text-xs sm:text-sm text-[rgba(26,25,23,0.75)] leading-relaxed">
              Reshmatex Limited is a prominent textile manufacturing group specializing in cotton and polyester processing. Initially established in <strong>Singapore in 1968</strong>, Reshmatex commenced vertical textile manufacturing operations in Pakistan in <strong>1992</strong>. Today, Reshmatex is recognized as the largest vertical cotton lawn, polyester, and cotton processing facility in the country.
            </p>
          </div>

          {/* Key Industrial Milestones */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] text-center">
              <span className="text-[9px] uppercase tracking-wider text-[#1a1917]/50 block">Established</span>
              <span className="text-sm font-semibold text-[#1a1917] font-mono mt-0.5 block">1968 / 1992</span>
              <span className="text-[10px] text-[#1a1917]/60 block mt-0.5">Singapore / Lahore</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] text-center">
              <span className="text-[9px] uppercase tracking-wider text-[#1a1917]/50 block">Printing Capacity</span>
              <span className="text-sm font-semibold text-[#1a1917] font-mono mt-0.5 block">10M Yds / Mo</span>
              <span className="text-[10px] text-[#1a1917]/60 block mt-0.5">Rotary & Digital</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] text-center">
              <span className="text-[9px] uppercase tracking-wider text-[#1a1917]/50 block">Western Apparel</span>
              <span className="text-sm font-semibold text-[#1a1917] font-mono mt-0.5 block">250K+ / Year</span>
              <span className="text-[10px] text-[#1a1917]/60 block mt-0.5">Global Exports</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] text-center">
              <span className="text-[9px] uppercase tracking-wider text-[#1a1917]/50 block">Global Reach</span>
              <span className="text-sm font-semibold text-[#1a1917] font-mono mt-0.5 block">15+ Nations</span>
              <span className="text-[10px] text-[#1a1917]/60 block mt-0.5">Asia, EU & US</span>
            </div>
          </div>

          {/* Three Vertical Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] flex flex-col gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1a1917]/5 flex items-center justify-center text-[#1a1917]">
                <Factory className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-semibold tracking-wider text-[#1a1917]">
                Vertical Processing
              </h5>
              <p className="text-[11px] text-[rgba(26,25,23,0.6)] leading-normal">
                Complete vertical chain spanning yarn twisting, sizing, air-jet weaving, continuous pad-steam dyeing, and rotary printing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] flex flex-col gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1a1917]/5 flex items-center justify-center text-[#1a1917]">
                <Cpu className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-semibold tracking-wider text-[#1a1917]">
                Digital Light Simulation
              </h5>
              <p className="text-[11px] text-[rgba(26,25,23,0.6)] leading-normal">
                Translating physical fabric refractivity—from ZBM Chiffon to Shamuses Satin—into real-time GLSL WebGL shaders for designers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] flex flex-col gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1a1917]/5 flex items-center justify-center text-[#1a1917]">
                <Globe2 className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-semibold tracking-wider text-[#1a1917]">
                Worldwide Export
              </h5>
              <p className="text-[11px] text-[rgba(26,25,23,0.6)] leading-normal">
                Trusted vendor and partner across China, Korea, Indonesia, India, Iran, Egypt, Vietnam, Europe, and North America.
              </p>
            </div>
          </div>

          {/* Locations & Factory Details */}
          <div className="border-t border-[rgba(26,25,23,0.08)] pt-6 space-y-4">
            <h5 className="text-[10px] tracking-[0.2em] uppercase text-[rgba(26,25,23,0.45)] font-semibold">
              Operating Headquarters & Vertical Mill
            </h5>
            <div className="p-4 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#1a1917] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#1a1917]">
                  Reshmatex Limited — Lahore Manufacturing Plant
                </p>
                <p className="text-xs text-[rgba(26,25,23,0.7)] mt-0.5">
                  4 km Manga - Raiwind Road, Raiwind, Lahore, Punjab 54782, Pakistan
                </p>
                <p className="text-[11px] text-[rgba(26,25,23,0.55)] mt-1">
                  Weaving sheds, rotary printing units (10M yds/mo), dyeing plant, and cut-to-pack garmenting facilities.
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-4 text-[11px] text-[#1a1917]/70">
                  <span><strong>Tel:</strong> +92 311 999 9978 / 042-35393544</span>
                  <span><strong>Supply Chain:</strong> Supplychain@reshmatex.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
