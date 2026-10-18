import React from 'react';
import { Cpu, CircuitBoard, Package, Disc3, ArrowRight } from 'lucide-react';
import { CATALOG_CATEGORIES } from '../data/catalogData.ts';

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const categoryMeta: Record<string, { icon: React.ReactNode; desc: string }> = {
    'wire-harness-machines': {
      icon: <Cpu className="w-6 h-6 text-[#F97316]" />,
      desc: 'Wire cutting, stripping, terminal crimping, twisting, taping, and pull testing systems.',
    },
    'smt-machines': {
      icon: <CircuitBoard className="w-6 h-6 text-[#0084D6]" />,
      desc: 'Pick & place, stencil printing, PCB depaneling, and radial/axial component lead forming.',
    },
    'packaging-machines': {
      icon: <Package className="w-6 h-6 text-[#66B821]" />,
      desc: 'Tape rewinding, label counting, slitting, cutting, and automatic dispensers.',
    },
    'glue-dispensing-screw-feeding': {
      icon: <Disc3 className="w-6 h-6 text-[#F97316]" />,
      desc: 'Automated high-precision glue dispensing and robotic screw feeder stations.',
    },
  };

  const handleCardClick = (catId: string) => {
    onSelectCategory(catId);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-14 bg-[#F4F8FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-9">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F97316] bg-[#F97316]/10 px-3.5 py-1.5 rounded-full inline-block">
              Machine Categories (mechtech-catalog.json)
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#06234B] mt-2.5">
              Explore Our Equipment Divisions
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Click any division below to filter our complete 2025 lineup across wire processing, electronics assembly, and packaging automation.
          </p>
        </div>

        {/* 4 Official Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATALOG_CATEGORIES.map((cat) => {
            const count = cat.subcategories.reduce((sum, s) => sum + s.products.length, 0);
            const meta = categoryMeta[cat.id] || {
              icon: <Cpu className="w-6 h-6 text-[#F97316]" />,
              desc: `${cat.subcategories.length} sub-categories`,
            };

            return (
              <div
                key={cat.id}
                onClick={() => handleCardClick(cat.id)}
                className="cursor-pointer group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#F97316] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-[#06234B] flex items-center justify-center transition-all duration-300 shadow-sm">
                      {meta.icon}
                    </div>
                    <span className="text-xs font-mono font-bold bg-[#06234B] text-white px-2.5 py-1 rounded-full group-hover:bg-[#F97316] transition">
                      {count} Models
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-[#06234B] group-hover:text-[#F97316] transition mt-4">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {meta.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#F97316]">
                  <span>{cat.subcategories.length} Sub-categories</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
