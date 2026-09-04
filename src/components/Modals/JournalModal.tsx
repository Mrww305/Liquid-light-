import React, { useState } from 'react';
import { X, BookOpen, Clock, ArrowRight } from 'lucide-react';

interface JournalModalProps {
  onClose: () => void;
}

interface Article {
  id: string;
  issue: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  content: string[];
}

const ARTICLES: Article[] = [
  {
    id: 'art-0',
    issue: 'Dispatches · No. 10',
    date: 'March 2026',
    readTime: '4 min read',
    title: 'Inside Pakistan’s 10-Million-Yard Rotary Printing Lines',
    excerpt: 'How Reshmatex achieves continuous color repeatability and microscopic pattern precision across 10 million yards per month.',
    content: [
      'At Reshmatex’s Lahore processing facility along the Manga-Raiwind corridor, textile printing is executed at a continuous industrial velocity rarely matched in vertical manufacturing.',
      'Our rotary printing lines utilize automated computerized paste kitchens where dispersion and reactive dye viscosities are metered with sub-gram tolerance. This prevents the microscopic shade drifts that typically plague large production runs.',
      'From delicate botanical sheer florals on HMC Chiffon to bold contemporary motifs on 110-inch seamless bed linen, high-temperature loop steamers lock pigments permanently into the fiber core, achieving international Grade 4-5 colorfastness ratings under demanding commercial laundering standards.',
    ],
  },
  {
    id: 'art-khushboo',
    issue: 'Dispatches · No. 09',
    date: 'February 2026',
    readTime: '3 min read',
    title: 'The Tactile Alchemy of Peach Khushboo Scented Finish',
    excerpt: 'Combining micro-encapsulated aroma release with mechanical emerald sanding on 100% polyester fabric.',
    content: [
      'Fabric is inherently multisensory, yet aroma remains one of the most overlooked dimensions in global textile design. Reshmatex pioneered "Peach Khushboo" to engage both touch and olfaction simultaneously.',
      'The process begins with mechanical emery rolls rotating at high velocity to raise an ultra-soft peach fuzz on high-denier microfiber polyester. In the secondary finishing bath, micro-encapsulated floral aromas are thermally fixed onto the fiber matrix.',
      'With natural fabric friction and movement, microscopic capsules burst gently over time, releasing an ethereal clean fragrance that persists through repeated garment wears and bedding cycles.',
    ],
  },
  {
    id: 'art-1',
    issue: 'Dispatches · No. 08',
    date: 'January 2026',
    readTime: '4 min read',
    title: 'The Mathematics of Digital Pearlescence in WebGL 2.0',
    excerpt: 'Why standard Phong or PBR shaders fail to capture the living, shifting luster of real nacre and structural minerals.',
    content: [
      'In natural pearls and nacreous shells, luster does not emerge from a single reflective surface. Instead, incoming photons penetrate micro-laminations of calcium carbonate alternating with organic conchiolin biopolymers.',
      'As rays reflect from multiple stratified layers at slightly distinct phases, destructive interference cancels specific wavelengths while constructive interference amplifies complimentary hues. As the spectator tilts the angle of incidence, the dominant amplified wavelength shifts smoothly across cyan, magenta, and gold.',
      'In our custom GLSL fragment shader, we approximate this multi-pass physical interference through a non-linear Fresnel power law coupled with sinusoidal chromatic phase blends. The result is zero texture asset weight and 120 FPS fluid refraction directly on the user’s GPU.',
    ],
  },
  {
    id: 'art-2',
    issue: 'Dispatches · No. 07',
    date: 'December 2025',
    readTime: '5 min read',
    title: 'High-Performance Activewear: The Architecture of Polyester Terry',
    excerpt: 'How loop-backed French Terry structures pull perspiration away from athlete skin during endurance training.',
    content: [
      'Athletic comfort requires high-speed capillary moisture management. At Reshmatex’s activewear division, circular-knitted polyester terry balances soft reverse loop insulation with smooth face aerodynamics.',
      'By utilizing hydrophilic post-treatment baths, the synthetic yarn sheds the natural hydrophobic reluctance of standard polyester, drawing body sweat directly into the outer atmosphere where it evaporates in seconds.',
      'Over 250,000 performance and casual western articles are tailored each year and exported to competitive sports brands across North America and Europe.',
    ],
  },
];

export const JournalModal: React.FC<JournalModalProps> = ({ onClose }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(ARTICLES[0].id);
  const active = ARTICLES.find((a) => a.id === selectedArticleId) || ARTICLES[0];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-8 bg-black/20 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[88vh] flex flex-col bg-[#fcfbfa] border border-[rgba(26,25,23,0.12)] shadow-2xl rounded-2xl overflow-hidden pointer-events-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[rgba(26,25,23,0.08)] bg-white/60">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[rgba(26,25,23,0.45)]">
              Reshmatex Journal
            </span>
            <h3 className="serif text-xl sm:text-2xl text-[#1a1917] italic font-normal">
              Essays on Optical Materials & Spatial Computing
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
          {/* Article List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[rgba(26,25,23,0.4)] font-medium">
              Published Papers
            </span>
            <div className="space-y-2">
              {ARTICLES.map((art) => {
                const isSelected = art.id === selectedArticleId;
                return (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArticleId(art.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-white border-[#1a1917] shadow-sm'
                        : 'bg-black/[0.015] border-[rgba(26,25,23,0.08)] hover:bg-black/[0.03]'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-[rgba(26,25,23,0.4)]">
                      <span>{art.issue}</span>
                      <span>{art.date}</span>
                    </div>
                    <h5 className="text-xs font-semibold text-[#1a1917] leading-snug mt-1">
                      {art.title}
                    </h5>
                    <p className="text-[11px] text-[rgba(26,25,23,0.6)] line-clamp-2 mt-0.5">
                      {art.excerpt}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Article Reading Pane */}
          <div className="lg:col-span-7 bg-white/80 border border-[rgba(26,25,23,0.08)] rounded-xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.45)] mb-3">
              <span>{active.issue}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {active.readTime}
              </span>
            </div>

            <h4 className="serif text-2xl sm:text-3xl text-[#1a1917] italic font-normal leading-tight mb-5">
              {active.title}
            </h4>

            <div className="space-y-4 text-xs sm:text-sm text-[rgba(26,25,23,0.75)] leading-relaxed flex-1">
              {active.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-[rgba(26,25,23,0.08)] flex justify-between items-center text-[11px] text-[rgba(26,25,23,0.45)]">
              <span>Authored by Reshmatex Research Lab</span>
              <span className="font-mono">ISSN 2894-9102</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
