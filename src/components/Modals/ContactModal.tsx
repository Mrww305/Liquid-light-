import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Mail, MapPin, Phone, Building2 } from 'lucide-react';
import { RESHMATEX_COMPANY_INFO } from '../../data/reshmatexProducts';

interface ContactModalProps {
  onClose: () => void;
  prefilledProduct?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose, prefilledProduct }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    inquiryType: prefilledProduct ? 'Fabric Swatch & Mill Run' : 'Fabric Sourcing & Export',
    message: prefilledProduct
      ? `Inquiry regarding fabric specifications, wholesale price yardage, and sample swatches for: ${prefilledProduct}.`
      : '',
  });

  useEffect(() => {
    if (prefilledProduct) {
      setForm((prev) => ({
        ...prev,
        inquiryType: 'Fabric Swatch & Mill Run',
        message: `Inquiry regarding fabric specifications, wholesale price yardage, and sample swatches for: ${prefilledProduct}.`,
      }));
    }
  }, [prefilledProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-8 bg-black/20 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#fcfbfa] border border-[rgba(26,25,23,0.12)] shadow-2xl rounded-2xl overflow-hidden pointer-events-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[rgba(26,25,23,0.08)] bg-white/60">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[rgba(26,25,23,0.45)]">
              Supply Chain & Commercial Desk
            </span>
            <h3 className="serif text-xl sm:text-2xl text-[#1a1917] italic font-normal">
              Reshmatex Direct Mill Inquiries
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
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="serif text-2xl text-[#1a1917] italic font-normal">
                Inquiry Logged with Reshmatex Supply Chain
              </h4>
              <p className="text-xs sm:text-sm text-[rgba(26,25,23,0.6)] max-w-md leading-relaxed">
                Thank you, {form.name || 'valued partner'}. Our supply chain and merchandising team in Lahore will review your fabric requirements and contact you at {form.email} with pricing and laboratory swatch dispatches.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="btn btn-primary mt-3 rounded-full text-[10px] py-2.5 px-6"
              >
                Return to Canvas
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {prefilledProduct && (
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <span>Selected Fabric Swatch: <strong>{prefilledProduct}</strong></span>
                  <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    Direct Mill Swatch
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] block mb-1.5 font-medium">
                    Name / Merchandiser
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full text-xs p-3 rounded-xl bg-white border border-[rgba(26,25,23,0.12)] text-[#1a1917] focus:outline-none focus:border-[#1a1917] transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] block mb-1.5 font-medium">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="sourcing@brand.com"
                    className="w-full text-xs p-3 rounded-xl bg-white border border-[rgba(26,25,23,0.12)] text-[#1a1917] focus:outline-none focus:border-[#1a1917] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] block mb-1.5 font-medium">
                    Company / Brand / Importer
                  </label>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder="Company or Mill Name"
                    className="w-full text-xs p-3 rounded-xl bg-white border border-[rgba(26,25,23,0.12)] text-[#1a1917] focus:outline-none focus:border-[#1a1917] transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] block mb-1.5 font-medium">
                    Inquiry Division
                  </label>
                  <select
                    value={form.inquiryType}
                    onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-white border border-[rgba(26,25,23,0.12)] text-[#1a1917] focus:outline-none focus:border-[#1a1917] transition-all cursor-pointer"
                  >
                    <option value="Fabric Swatch & Mill Run">Fabric Swatch & Mill Run</option>
                    <option value="Chiffon & Crepe Volume Procurement">Chiffon & Crepe Volume (ZBM, LAJ, IHC)</option>
                    <option value="Peach Khushboo & Specialty">Peach Khushboo / Organza / Massori Net</option>
                    <option value="Home Textiles (Bed Linen, Hotel)">Home Textiles (Sheets, Bed Sets, Towels)</option>
                    <option value="Activewear & Western Apparel Export">Activewear & Western Garment Exports</option>
                    <option value="Greige Fabric Sourcing & Customs">Greige Fabric Sourcing & Customs Clearance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[rgba(26,25,23,0.5)] block mb-1.5 font-medium">
                  Requirement Specifications & Volume
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Detail desired yardage, fabric width, print repeat, delivery port, or custom finishing requirements..."
                  className="w-full text-xs p-3 rounded-xl bg-white border border-[rgba(26,25,23,0.12)] text-[#1a1917] focus:outline-none focus:border-[#1a1917] transition-all resize-none"
                />
              </div>

              {/* Direct Plant Details Bar */}
              <div className="p-3 rounded-xl bg-white border border-[rgba(26,25,23,0.08)] space-y-1.5 text-[11px] text-[rgba(26,25,23,0.7)]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#1a1917]" />
                  <span><strong>Plant:</strong> {RESHMATEX_COMPANY_INFO.address}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[10px] text-[rgba(26,25,23,0.6)]">
                  <span><strong>Tel:</strong> {RESHMATEX_COMPANY_INFO.phone}</span>
                  <span><strong>Alt:</strong> {RESHMATEX_COMPANY_INFO.altPhone}</span>
                  <span><strong>Direct:</strong> {RESHMATEX_COMPANY_INFO.emails.supplyChain}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 text-[10px] text-[rgba(26,25,23,0.45)]">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Supplychain@reshmatex.com
                  </span>
                  <span>•</span>
                  <span>Hours: Mon-Fri 09:00 - 17:00 PKT</span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto text-[10px] py-2.5 px-6 rounded-full flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3 h-3" />
                  <span>Submit to Supply Chain</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
