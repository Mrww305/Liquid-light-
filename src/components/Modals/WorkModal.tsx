import React, { useState } from 'react';
import { X, ArrowUpRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { ColorwayId } from '../../types';

interface WorkModalProps {
  onClose: () => void;
  onApplyColorway: (id: ColorwayId) => void;
}

interface MaterialProject {
  id: string;
  title: string;
  subtitle: string;
  colorwayId: ColorwayId;
  year: string;
  description: string;
  specs: {
    refractiveIndex: string;
    fiberStructure: string;
    weight: string;
    lightTransmission: string;
  };
  tags: string[];
}

const PROJECTS: MaterialProject[] = [
  {
    id: 'aether-04',
    title: 'Aether Silk No. 04',
    subtitle: 'Photonic biomimetic yarn with multi-angle diffraction',
    colorwayId: 'opal',
    year: '2026',
    description: 'Engineered through nanoscale grooving directly onto structural silk proteins. Produces vivid spectral color shifts without artificial chemical pigments, echoing the wing scales of Morpho butterflies.',
    specs: {
      refractiveIndex: '1.58 nD',
      fiberStructure: 'Nanocrystalline bio-composite',
      weight: '42 g/m²',
      lightTransmission: '86% at 550nm',
    },
    tags: ['Bio-Photonic', 'Structural Color', 'Paris Haute Couture'],
  },
  {
    id: 'liquid-pearl',
    title: 'Liquid Pearl Veil',
    subtitle: 'Non-Newtonian fluid organza for architectural installations',
    colorwayId: 'champagne',
    year: '2025',
    description: 'A tactile membrane suspended with microscopic silica colloids that flow like liquid light when at rest, but instantly absorb vibrational stress when perturbed.',
    specs: {
      refractiveIndex: '1.49 nD',
      fiberStructure: 'Colloidal suspension membrane',
      weight: '68 g/m²',
      lightTransmission: '72% diffuse',
    },
    tags: ['Kinetic Responsive', 'Spatial Architecture', 'Venice Biennale'],
  },
  {
    id: 'celestial-mesh',
    title: 'Celestial Glass Weave',
    subtitle: 'Ultra-pure borosilicate filaments interlaced with recycled polyamide',
    colorwayId: 'celestial',
    year: '2026',
    description: 'A diaphanous glass fabric pliable as soft cotton yet resistant to extreme thermal gradients. Reflects cool ambient moonlight into subtle periwinkle and frost hues.',
    specs: {
      refractiveIndex: '1.62 nD',
      fiberStructure: 'Drawn borosilicate fiber (4µm)',
      weight: '54 g/m²',
      lightTransmission: '91% specular',
    },
    tags: ['Extreme Materials', 'Borosilicate Microfiber', 'Tokyo Design Week'],
  },
  {
    id: 'obsidian-velvet',
    title: 'Smoked Obsidian Felt',
    subtitle: 'Acoustic absorption monolith with metallic prism fringe',
    colorwayId: 'obsidian',
    year: '2025',
    description: 'Deep light-trapping charcoal carbon fibers treated with sub-micron titanium oxide coating that scatters low-frequency reverberations into pristine warmth.',
    specs: {
      refractiveIndex: '1.92 nD (edge)',
      fiberStructure: 'Carded merino & carbon matrix',
      weight: '320 g/m²',
      lightTransmission: '0% opaque (98% sound abs)',
    },
    tags: ['Acoustic Engineering', 'Spatial Audio', 'Private Collections'],
  },
];

export const WorkModal: React.FC<WorkModalProps> = ({ onClose, onApplyColorway }) => {
  const [selectedId, setSelectedId] = useState<string>(PROJECTS[0].id);
  const active = PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-8 bg-black/20 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[88vh] flex flex-col bg-[#fcfbfa] border border-[rgba(26,25,23,0.12)] shadow-2xl rounded-2xl overflow-hidden pointer-events-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[rgba(26,25,23,0.08)] bg-white/60">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[rgba(26,25,23,0.45)]">
              Reshmatex Archives · 2025–2026
            </span>
            <h3 className="serif text-xl sm:text-2xl text-[#1a1917] italic font-normal">
              Material Innovations & Spatial Works
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
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Project List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[rgba(26,25,23,0.4)] font-medium">
              Select Material Prototype
            </span>
            <div className="space-y-2">
              {PROJECTS.map((proj) => {
                const isSelected = proj.id === selectedId;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedId(proj.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-white border-[#1a1917] shadow-sm'
                        : 'bg-black/[0.015] border-[rgba(26,25,23,0.08)] hover:bg-black/[0.03]'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold tracking-wider text-[#1a1917]">
                        {proj.title}
                      </span>
                      <span className="text-[10px] tracking-widest text-[rgba(26,25,23,0.4)]">
                        {proj.year}
                      </span>
                    </div>
                    <span className="text-[11px] text-[rgba(26,25,23,0.6)] line-clamp-1">
                      {proj.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Detail Pane */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white/80 border border-[rgba(26,25,23,0.08)] rounded-xl p-6 sm:p-7">
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-emerald-800 font-semibold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60">
                  Specification Sheet
                </span>
                <button
                  onClick={() => onApplyColorway(active.colorwayId)}
                  className="btn btn-primary text-[10px] py-2 px-3.5 rounded-full flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Simulate in Canvas</span>
                </button>
              </div>

              <div>
                <h4 className="serif text-2xl sm:text-3xl text-[#1a1917] italic font-normal">
                  {active.title}
                </h4>
                <p className="text-xs text-[rgba(26,25,23,0.55)] tracking-wide mt-1">
                  {active.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[rgba(26,25,23,0.75)] leading-relaxed">
                {active.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-[#fcfbfa] border border-[rgba(26,25,23,0.06)]">
                  <span className="text-[9px] uppercase tracking-wider text-[rgba(26,25,23,0.4)] block">
                    Refractive Index
                  </span>
                  <span className="text-xs font-mono font-medium text-[#1a1917] mt-0.5 block">
                    {active.specs.refractiveIndex}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#fcfbfa] border border-[rgba(26,25,23,0.06)]">
                  <span className="text-[9px] uppercase tracking-wider text-[rgba(26,25,23,0.4)] block">
                    Areal Density
                  </span>
                  <span className="text-xs font-mono font-medium text-[#1a1917] mt-0.5 block">
                    {active.specs.weight}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#fcfbfa] border border-[rgba(26,25,23,0.06)]">
                  <span className="text-[9px] uppercase tracking-wider text-[rgba(26,25,23,0.4)] block">
                    Microstructure
                  </span>
                  <span className="text-xs font-medium text-[#1a1917] mt-0.5 block line-clamp-1">
                    {active.specs.fiberStructure}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#fcfbfa] border border-[rgba(26,25,23,0.06)]">
                  <span className="text-[9px] uppercase tracking-wider text-[rgba(26,25,23,0.4)] block">
                    Spectral Transmission
                  </span>
                  <span className="text-xs font-mono font-medium text-[#1a1917] mt-0.5 block">
                    {active.specs.lightTransmission}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {active.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] tracking-wider uppercase text-[rgba(26,25,23,0.6)] bg-black/[0.04] px-2.5 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
