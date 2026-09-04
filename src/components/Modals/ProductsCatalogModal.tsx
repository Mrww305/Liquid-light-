import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Sparkles,
  Sliders,
  Send,
  Layers,
  Factory,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { FabricProduct, FabricCategory, ColorwayId, ShaderSettings } from '../../types';
import {
  RESHMATEX_FABRIC_PRODUCTS,
  RESHMATEX_MILL_CAPABILITIES,
  RESHMATEX_COMPANY_INFO,
} from '../../data/reshmatexProducts';

interface ProductsCatalogModalProps {
  onClose: () => void;
  onSimulateFabric: (product: FabricProduct) => void;
  onRequestInquiry: (productName: string) => void;
}

const CATEGORIES: { id: FabricCategory; label: string }[] = [
  { id: 'all', label: 'All Fabrics' },
  { id: 'chiffon', label: 'Chiffon' },
  { id: 'crepe', label: 'Crepe & Georgette' },
  { id: 'satin', label: 'Satin & Sheen' },
  { id: 'specialty', label: 'Specialty & Nets' },
  { id: 'cotton-lawn', label: 'Cotton Lawn' },
  { id: 'home-textiles', label: 'Home Textiles' },
  { id: 'apparel', label: 'Apparel & Garments' },
];

export const ProductsCatalogModal: React.FC<ProductsCatalogModalProps> = ({
  onClose,
  onSimulateFabric,
  onRequestInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'fabrics' | 'processing'>('fabrics');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FabricCategory>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    RESHMATEX_FABRIC_PRODUCTS[0]?.id || ''
  );
  const [justSimulated, setJustSimulated] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return RESHMATEX_FABRIC_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.material.toLowerCase().includes(q) ||
        product.weaveStructure.toLowerCase().includes(q) ||
        product.finishType.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.applications.some((app) => app.toLowerCase().includes(q)) ||
        product.highlights.some((h) => h.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const activeProduct = useMemo(() => {
    return (
      filteredProducts.find((p) => p.id === selectedProductId) ||
      filteredProducts[0] ||
      RESHMATEX_FABRIC_PRODUCTS[0]
    );
  }, [filteredProducts, selectedProductId]);

  const handleSimulateClick = (product: FabricProduct) => {
    onSimulateFabric(product);
    setJustSimulated(product.id);
    setTimeout(() => {
      setJustSimulated(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/30 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-6xl h-[92vh] flex flex-col bg-[#fcfbfa] border border-[rgba(26,25,23,0.12)] shadow-2xl rounded-2xl overflow-hidden pointer-events-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b border-[rgba(26,25,23,0.08)] bg-white/70 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[rgba(26,25,23,0.5)] font-medium">
                Reshmatex Limited · Official Products & Fabric Index
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            </div>
            <h3 className="serif text-xl sm:text-2xl text-[#1a1917] italic font-normal flex items-center gap-3 mt-0.5">
              <span>Textile Collections & Vertical Processing</span>
              <span className="text-[10px] font-sans not-italic font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#1a1917]/5 text-[#1a1917]/70 border border-[#1a1917]/10">
                10M Yds/Mo Printing Mill
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher Tabs */}
            <div className="flex items-center p-1 rounded-full bg-[#1a1917]/5 border border-[#1a1917]/10 text-xs">
              <button
                onClick={() => setActiveTab('fabrics')}
                className={`px-3.5 py-1 rounded-full font-medium tracking-wide transition-all cursor-pointer ${
                  activeTab === 'fabrics'
                    ? 'bg-white text-[#1a1917] shadow-sm'
                    : 'text-[#1a1917]/60 hover:text-[#1a1917]'
                }`}
              >
                Fabrics ({RESHMATEX_FABRIC_PRODUCTS.length})
              </button>
              <button
                onClick={() => setActiveTab('processing')}
                className={`px-3.5 py-1 rounded-full font-medium tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'processing'
                    ? 'bg-white text-[#1a1917] shadow-sm'
                    : 'text-[#1a1917]/60 hover:text-[#1a1917]'
                }`}
              >
                <Factory className="w-3 h-3" />
                <span>Mill Infrastructure</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[rgba(26,25,23,0.5)] hover:text-[#1a1917] hover:bg-black/5 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Fabrics Catalogue */}
        {activeTab === 'fabrics' && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search and Category Filter Bar */}
            <div className="px-6 sm:px-8 py-3.5 bg-white/40 border-b border-[rgba(26,25,23,0.06)] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#1a1917]/40" />
                <input
                  type="text"
                  placeholder="Search fabric name, weave, 100% polyester, width..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-1.5 text-xs bg-white border border-[rgba(26,25,23,0.14)] rounded-full text-[#1a1917] focus:outline-none focus:border-[#1a1917] transition-all placeholder:text-[#1a1917]/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#1a1917]/40 hover:text-[#1a1917]"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium tracking-wider transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1a1917] text-white shadow-sm'
                          : 'bg-white/80 border border-[rgba(26,25,23,0.1)] text-[#1a1917]/70 hover:text-[#1a1917] hover:border-[#1a1917]/30'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split Content: Left Product List, Right Product Detail Sheet */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
              {/* Left Column: List of Fabric Cards (5 cols) */}
              <div className="lg:col-span-5 border-r border-[rgba(26,25,23,0.08)] overflow-y-auto p-4 sm:p-5 space-y-2.5 bg-[#fcfbfa]">
                <div className="flex items-center justify-between pb-1 px-1">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(26,25,23,0.4)]">
                    Showing {filteredProducts.length} Reshmatex fabrics
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(26,25,23,0.4)]">
                    Direct Mill Mill-Run
                  </span>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="py-16 text-center text-[rgba(26,25,23,0.5)] text-xs">
                    No fabrics matched &ldquo;{searchQuery}&rdquo;. Try another term like &ldquo;chiffon&rdquo;, &ldquo;satin&rdquo;, or &ldquo;crepe&rdquo;.
                  </div>
                ) : (
                  filteredProducts.map((product) => {
                    const isSelected = product.id === activeProduct?.id;
                    return (
                      <div
                        key={product.id}
                        onClick={() => setSelectedProductId(product.id)}
                        className={`p-3.5 rounded-xl transition-all cursor-pointer border text-left relative ${
                          isSelected
                            ? 'bg-white border-[#1a1917] shadow-sm'
                            : 'bg-white/60 hover:bg-white border-[rgba(26,25,23,0.08)] hover:border-[rgba(26,25,23,0.2)]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#1a1917]/5 text-[#1a1917]/70">
                                {product.categoryLabel}
                              </span>
                              {product.featured && (
                                <span className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                                  Flagship
                                </span>
                              )}
                            </div>
                            <h4 className="serif text-base text-[#1a1917] font-medium leading-snug">
                              {product.name}
                            </h4>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="text-[10px] font-mono text-[#1a1917]/60 block">
                              {product.width}
                            </span>
                            {product.weightGsm && (
                              <span className="text-[9px] text-[#1a1917]/40 block">
                                {product.weightGsm}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-[11px] text-[rgba(26,25,23,0.65)] line-clamp-2 mt-1.5 leading-relaxed">
                          {product.tagline}
                        </p>

                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[rgba(26,25,23,0.05)] text-[10px] text-[rgba(26,25,23,0.5)]">
                          <span className="truncate max-w-[200px]">{product.material}</span>
                          <span className="flex items-center gap-0.5 text-[#1a1917] font-medium">
                            Details <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Column: Detailed Product Sheet (7 cols) */}
              <div className="lg:col-span-7 overflow-y-auto p-6 sm:p-8 bg-white flex flex-col justify-between">
                {activeProduct && (
                  <div className="space-y-6">
                    {/* Top Identity */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#1a1917]/60">
                          {activeProduct.categoryLabel}
                        </span>
                        <span className="text-[10px] text-[#1a1917]/30">·</span>
                        <span className="text-[10px] tracking-wider uppercase text-emerald-800 font-medium">
                          In Production at Raiwind Mill
                        </span>
                      </div>

                      <h2 className="serif text-2xl sm:text-3xl text-[#1a1917] italic font-normal">
                        {activeProduct.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-[rgba(26,25,23,0.7)] mt-1 leading-relaxed font-light">
                        {activeProduct.tagline}
                      </p>
                    </div>

                    {/* Action Bar: 3D Simulation & Inquiry */}
                    <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-xl bg-[#fcfbfa] border border-[rgba(26,25,23,0.08)]">
                      <button
                        onClick={() => handleSimulateClick(activeProduct)}
                        className="px-4 py-2 rounded-full text-xs font-medium tracking-wide bg-[#1a1917] text-white hover:bg-black transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>
                          {justSimulated === activeProduct.id
                            ? 'Simulating Texture…'
                            : 'Simulate in 3D Light'}
                        </span>
                      </button>

                      <button
                        onClick={() => onRequestInquiry(activeProduct.name)}
                        className="px-4 py-2 rounded-full text-xs font-medium tracking-wide border border-[#1a1917]/20 text-[#1a1917] hover:bg-[#1a1917]/5 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-[#1a1917]/60" />
                        <span>Request Swatch & Quote</span>
                      </button>

                      <span className="text-[10px] text-[rgba(26,25,23,0.45)] ml-auto font-mono">
                        Preset: {activeProduct.colorwayPreset.toUpperCase()}
                      </span>
                    </div>

                    {/* Description Copy */}
                    <div>
                      <h5 className="text-[10px] tracking-[0.2em] uppercase text-[rgba(26,25,23,0.45)] mb-2 font-semibold">
                        Fabric Description & Character
                      </h5>
                      <p className="text-xs sm:text-sm text-[rgba(26,25,23,0.8)] leading-relaxed">
                        {activeProduct.description}
                      </p>
                    </div>

                    {/* Technical Specifications Grid */}
                    <div>
                      <h5 className="text-[10px] tracking-[0.2em] uppercase text-[rgba(26,25,23,0.45)] mb-3 font-semibold">
                        Technical Mill Specifications
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg bg-[#fcfbfa] border border-[rgba(26,25,23,0.06)]">
                          <span className="text-[9px] uppercase tracking-wider text-[rgba(26,25,23,0.4)] block">
                            Composition
                          </span>
                          <span className="text-xs font-medium text-[#1a1917] mt-0.5 block">
                            {activeProduct.material}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-[#fcfbfa] border border-[rgba(26,25,23,0.06)]">
                          <span className="text-[9px] uppercase tracking-wider text-[rgba(26,25,23,0.4)] block">
                            Standard Width
                          </span>
                          <span className="text-xs font-medium text-[#1a1917] mt-0.5 block font-mono">
                            {activeProduct.width}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-[#fcfbfa] border border-[rgba(26,25,23,0.06)]">
                          <span className="text-[9px] uppercase tracking-wider text-[rgba(26,25,23,0.4)] block">
                            Areal Weight
                          </span>
                          <span className="text-xs font-medium text-[#1a1917] mt-0.5 block font-mono">
                            {activeProduct.weightGsm || 'Custom Weight'}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-[#fcfbfa] border border-[rgba(26,25,23,0.06)]">
                          <span className="text-[9px] uppercase tracking-wider text-[rgba(26,25,23,0.4)] block">
                            Weave Structure
                          </span>
                          <span className="text-xs font-medium text-[#1a1917] mt-0.5 block">
                            {activeProduct.weaveStructure}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-[#fcfbfa] border border-[rgba(26,25,23,0.06)] sm:col-span-2">
                          <span className="text-[9px] uppercase tracking-wider text-[rgba(26,25,23,0.4)] block">
                            Applied Finish & Processing
                          </span>
                          <span className="text-xs font-medium text-[#1a1917] mt-0.5 block">
                            {activeProduct.finishType}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h5 className="text-[10px] tracking-[0.2em] uppercase text-[rgba(26,25,23,0.45)] mb-2 font-semibold">
                        Manufacturing Benchmarks
                      </h5>
                      <div className="space-y-1.5">
                        {activeProduct.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[rgba(26,25,23,0.75)]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applications */}
                    <div>
                      <h5 className="text-[10px] tracking-[0.2em] uppercase text-[rgba(26,25,23,0.45)] mb-2 font-semibold">
                        Recommended Applications
                      </h5>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProduct.applications.map((app, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-[11px] bg-[#1a1917]/5 text-[#1a1917]/80 font-medium"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vertical Mill Infrastructure & Processing */}
        {activeTab === 'processing' && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#fcfbfa]">
            {/* Top Overview Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[rgba(26,25,23,0.1)] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-emerald-800 font-semibold">
                    Vertical Textile Manufacturing Facility
                  </span>
                  <h3 className="serif text-2xl sm:text-3xl text-[#1a1917] italic font-normal mt-1">
                    {RESHMATEX_COMPANY_INFO.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[rgba(26,25,23,0.7)] mt-2 max-w-2xl leading-relaxed">
                    {RESHMATEX_COMPANY_INFO.tagline}. {RESHMATEX_COMPANY_INFO.history} Operating full vertical preparation, high-speed weaving, continuous pad-steam dyeing, 10 million yards/month rotary printing, and complete cut-to-pack stitching.
                  </p>
                </div>

                {/* Key Capacity Stats */}
                <div className="grid grid-cols-2 gap-3 flex-shrink-0">
                  <div className="p-3.5 rounded-xl bg-[#fcfbfa] border border-[#1a1917]/10 text-center">
                    <span className="text-[9px] uppercase tracking-wider text-[#1a1917]/50 block">
                      Printing Output
                    </span>
                    <span className="text-lg font-semibold text-[#1a1917] font-mono">
                      10M Yds/Mo
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#fcfbfa] border border-[#1a1917]/10 text-center">
                    <span className="text-[9px] uppercase tracking-wider text-[#1a1917]/50 block">
                      Western Apparel
                    </span>
                    <span className="text-lg font-semibold text-[#1a1917] font-mono">
                      250K+ / Year
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Capabilities Cards */}
            <div>
              <div className="mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(26,25,23,0.45)] font-semibold">
                  End-to-End Vertical Stages
                </span>
                <h4 className="serif text-xl sm:text-2xl text-[#1a1917] italic font-normal">
                  Manufacturing Divisions & Quality Control
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {RESHMATEX_MILL_CAPABILITIES.map((cap) => (
                  <div
                    key={cap.id}
                    className="p-5 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {cap.metric}
                        </span>
                        <Factory className="w-4 h-4 text-[#1a1917]/30" />
                      </div>

                      <h5 className="serif text-lg text-[#1a1917] font-medium">
                        {cap.title}
                      </h5>
                      <span className="text-[11px] text-[rgba(26,25,23,0.5)] block mb-2 font-light">
                        {cap.subheading}
                      </span>
                      <p className="text-xs text-[rgba(26,25,23,0.7)] leading-relaxed">
                        {cap.description}
                      </p>
                    </div>

                    <div className="border-t border-[rgba(26,25,23,0.06)] pt-3 space-y-1.5">
                      {cap.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[rgba(26,25,23,0.65)]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sourcing & Logistics Footprint */}
            <div className="p-6 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] space-y-4">
              <h4 className="serif text-xl text-[#1a1917] italic font-normal">
                Global Sourcing, Customs Clearance & Export Reach
              </h4>
              <p className="text-xs sm:text-sm text-[rgba(26,25,23,0.7)] leading-relaxed">
                In addition to vertical manufacturing, Reshmatex acts as a premier sourcing partner for greige fabrics, combed cotton lawns, and industrial yarns. We manage customs clearance, international logistics, and containerized dispatch directly from Karachi ports to global markets including:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {RESHMATEX_COMPANY_INFO.globalMarkets.map((market, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs bg-[#fcfbfa] border border-[rgba(26,25,23,0.1)] text-[#1a1917]/80 font-medium"
                  >
                    {market}
                  </span>
                ))}
              </div>

              {/* Contact strip */}
              <div className="mt-4 pt-4 border-t border-[rgba(26,25,23,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#1a1917]/70 gap-2">
                <div>
                  <strong className="text-[#1a1917]">Main Plant:</strong> {RESHMATEX_COMPANY_INFO.address}
                </div>
                <div className="flex items-center gap-4">
                  <span><strong>Tel:</strong> {RESHMATEX_COMPANY_INFO.phone}</span>
                  <span><strong>Email:</strong> {RESHMATEX_COMPANY_INFO.emails.supplyChain}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-3.5 border-t border-[rgba(26,25,23,0.08)] bg-white/80 flex flex-col sm:flex-row items-center justify-between text-xs text-[rgba(26,25,23,0.5)] gap-2">
          <div className="flex items-center gap-3">
            <span>Reshmatex Limited · 4 km Manga - Raiwind Rd, Lahore</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Supplychain@reshmatex.com</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onRequestInquiry('General Fabric Inquiry')}
              className="text-xs font-semibold text-[#1a1917] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Contact Sourcing Concierge</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
