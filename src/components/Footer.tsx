import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { CATALOG_CATEGORIES } from '../data/catalogData.ts';

interface FooterProps {
  onCategorySelect: (catId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onCategorySelect }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04162F] text-slate-400 text-xs border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-2xl tracking-wider text-white italic">
                MECH<span className="text-[#0084D6]">TECH</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#F97316] uppercase">
                ENTERPRISES
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Premier industrial equipment supplier in India specialized in automated wire cutting, stripping, terminal crimping, radial/axial component forming, and PCB depaneling machinery.
            </p>
            <div className="font-mono text-[11px] text-slate-300 bg-white/5 p-2.5 rounded-lg border border-white/10">
              GSTIN: <strong>09PUNPS9784M1ZS</strong>
            </div>
          </div>

          {/* Catalog Categories (mechtech-catalog.json) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Product Categories
            </h4>
            <ul className="space-y-2">
              {CATALOG_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onCategorySelect(c.id);
                      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#F97316] transition text-left cursor-pointer"
                  >
                    • {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white transition">Categories</a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-white transition">2025 Catalog</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">About Mechtech</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition">Why Choose Us</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition">Client Testimonials</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Noida Headquarters
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  S N 56 First Floor, Jagat Plaza 2, Near Amritpuram, NOIDA, Uttar Pradesh - 201308
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0084D6] shrink-0" />
                <a href="tel:+919149158815" className="text-white hover:text-[#F97316] transition">
                  +91 9149158815
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#66B821] shrink-0" />
                <a href="mailto:info@mechtechenterprises.com" className="text-white hover:text-[#0084D6] transition">
                  info@mechtechenterprises.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">MECHTECH ENTERPRISES</strong>. All rights reserved. 2025 Industrial Machine Edition.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#F97316]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
