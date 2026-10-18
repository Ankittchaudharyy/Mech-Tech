import React, { useState } from 'react';
import { ChevronDown, Menu, X, ArrowRight, Layers, Sparkles, PhoneCall } from 'lucide-react';
import { CATALOG_CATEGORIES } from '../data/catalogData.ts';

interface HeaderProps {
  onCategorySelect: (catId: string) => void;
  onEnquireClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onCategorySelect,
  onEnquireClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const handleCategoryClick = (catId: string) => {
    onCategorySelect(catId);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 md:h-28 gap-4">
          {/* Mechtech Official Brand Logo */}
          <a href="#hero" className="flex items-center group shrink-0 py-1" title="Mechtech Enterprises - Home">
            <img
              src="/images/logo.jpg"
              alt="Mechtech Enterprises"
              className="h-16 sm:h-20 md:h-24 w-auto object-contain rounded-xl transition-transform group-hover:scale-[1.02] duration-200"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 font-medium text-sm text-slate-700">
            <a href="#hero" className="text-[#06234B] font-bold hover:text-[#F97316] transition">
              Home
            </a>

            {/* Products Mega Menu Dropdown (Built from mechtech-catalog.json structure) */}
            <div
              className="relative py-6"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 font-bold text-[#06234B] hover:text-[#F97316] transition cursor-pointer"
              >
                <span>Products Catalog</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-[#F97316]' : ''
                    }`}
                />
              </button>

              {megaMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-[820px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 grid grid-cols-2 gap-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-span-2 pb-3 mb-1 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#06234B]">
                        2025 Industrial Machine Categories
                      </span>
                      <p className="text-[11px] text-slate-500">
                        Wire Processing • SMT Electronics • Packaging • Dispensing
                      </p>
                    </div>
                    <button
                      onClick={() => handleCategoryClick('all')}
                      className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>View All Products (100+)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {CATALOG_CATEGORIES.map((cat) => {
                    const count = cat.subcategories.reduce(
                      (sum, s) => sum + s.products.length,
                      0
                    );
                    return (
                      <div
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="p-3.5 rounded-xl hover:bg-[#F4F8FB] transition border border-transparent hover:border-slate-200 group cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-xs text-[#06234B] group-hover:text-[#F97316] transition">
                            {cat.name}
                          </span>
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                            {count} Models
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {cat.subcategories.map((s) => s.name).join(' • ')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <a href="#catalog-section" className="hover:text-[#F97316] transition">
              All Machines
            </a>
            <a href="#about" className="hover:text-[#F97316] transition">
              About Us
            </a>
            <a href="#why-us" className="hover:text-[#F97316] transition">
              Why Mechtech
            </a>
            <a href="#testimonials" className="hover:text-[#F97316] transition">
              Testimonials
            </a>
          </nav>

          {/* Right Action: Helpline & Enquire Now */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Mobile Quick Call Button */}
            <a
              href="tel:+918043809518"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#66B821]/15 text-[#66B821] hover:bg-[#66B821] hover:text-white transition border border-[#66B821]/30"
              title="Call +91 8043809518"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            {/* Enquire CTA Button */}
            <button
              onClick={onEnquireClick}
              className="hidden sm:inline-flex bg-gradient-to-r from-[#06234B] to-[#F97316] hover:from-[#04162F] hover:to-[#ea580c] text-white font-display font-bold text-xs px-5 py-2.5 rounded-full shadow hover:shadow-md transition cursor-pointer active:scale-95 whitespace-nowrap"
            >
              Enquire Now / Get Quote
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div >

      {/* Mobile Drawer */}
      {
        mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
            {/* Mobile Direct Helpline Banner */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#66B821]/15 text-[#66B821] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Helpline</div>
                  <div className="text-xs font-bold font-mono text-[#06234B]">+91 8043809518</div>
                </div>
              </div>
              <a
                href="tel:+918043809518"
                className="px-3 py-1.5 rounded-lg bg-[#66B821] text-white text-xs font-bold shadow-xs hover:bg-[#58a01c] transition"
              >
                Call Now
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700"
              >
                Home
              </a>
              <a
                href="#catalog-section"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCategorySelect('all');
                }}
                className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700 font-bold"
              >
                All Machines (62)
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700"
              >
                About Us
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700"
              >
                Why Mechtech
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnquireClick();
                }}
                className="col-span-2 p-2.5 rounded-lg bg-gradient-to-r from-[#06234B] to-[#F97316] text-white text-center font-bold"
              >
                Enquire Now / Get Quote
              </button>
            </div>

            {/* Category Selectors In Mobile Drawer */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase text-[#06234B] tracking-wider">
                Browse Categories
              </span>
              <div className="grid grid-cols-1 gap-1.5 mt-2">
                {CATALOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="text-left text-xs p-2 rounded hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
                  >
                    <span>• {cat.name}</span>
                    <span className="text-[10px] text-[#F97316] font-bold">
                      {cat.subcategories.reduce((s, c) => s + c.products.length, 0)} items
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </header >
  );
};
