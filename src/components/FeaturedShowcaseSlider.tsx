import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, ImageOff } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/catalogData.ts';
import { Product } from '../types/index.ts';

interface FeaturedShowcaseSliderProps {
  onViewProduct: (product: Product) => void;
  onEnquireProduct: (modelAndTitle: string) => void;
}

export const FeaturedShowcaseSlider: React.FC<FeaturedShowcaseSliderProps> = ({
  onViewProduct,
  onEnquireProduct,
}) => {
  // Highlighted catalog machines using real catalogData.ts entries
  const featuredIds = [
    'me-01',
    'me-03e',
    'me-90t-plus',
    'me-9800',
    'me-805a',
    'me-2t-3t-4t',
    'me-90l',
    'me-381t-plus',
  ];
  const featuredProducts = featuredIds
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, featuredProducts.length - itemsPerView);

  // Auto-move per 3 seconds (3000ms) automatically without customer manual interaction
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className="py-12 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0084D6]">
              <Zap className="w-3.5 h-3.5 text-[#66B821]" />
              <span>Featured Catalog Lineup</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#06234B] mt-1.5">
              Featured Equipment Showcase
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Continuously moving showcase of our wire cutting, stripping, terminal crimping, and PCB processing machines.
            </p>
          </div>

          {/* Machine Count Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded border border-slate-200">
            <span className="font-bold text-[#06234B]">CATALOG LINEUP</span>
            <span className="text-slate-400">·</span>
            <span className="tabular-nums">
              Machine {currentIndex + 1} of {featuredProducts.length}
            </span>
          </div>
        </div>

        {/* Sliding Track (Moves automatically every 3 seconds) */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {featuredProducts.map((item) => {
              const firstSpec = item.specs ? Object.entries(item.specs)[0] : null;
              const secondSpec = item.specs ? Object.entries(item.specs)[1] : null;

              return (
                <div
                  key={item.id}
                  className="shrink-0 p-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-[#F97316] p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#06234B] text-white">
                          {item.catalogPage
                            ? `PG ${String(item.catalogPage).padStart(2, '0')} • #${item.catalogNumber}`
                            : 'CATALOG'}
                        </span>
                        <span className="text-[11px] font-bold text-[#F97316]">
                          {item.model}
                        </span>
                      </div>

                      <div
                        onClick={() => onViewProduct(item)}
                        className="h-44 bg-white rounded-xl p-3 mb-4 flex items-center justify-center overflow-hidden border border-slate-200 cursor-pointer"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={`${item.model} | ${item.name}`}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 rounded-lg flex flex-col items-center justify-center p-3 text-center">
                            <ImageOff className="w-4 h-4 text-slate-400 mb-1" />
                            <span className="font-display font-bold text-xs text-[#06234B] line-clamp-1">
                              {item.model} - {item.name}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                              Image Not Available
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="text-[10px] font-bold uppercase text-[#0084D6]">
                        {(item.subcategoryId || 'Equipment').replace(/-/g, ' ')}
                      </div>
                      <h3 className="font-display font-bold text-base text-[#06234B] mt-0.5 group-hover:text-[#F97316] transition">
                        <span className="text-[#F97316]">{item.model}</span> | {item.name}
                      </h3>

                      <div className="mt-3 space-y-1 text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/70">
                        {firstSpec && (
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#66B821] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">
                              <strong>{firstSpec[0]}:</strong> {String(firstSpec[1])}
                            </span>
                          </div>
                        )}
                        {secondSpec && (
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0084D6] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">
                              <strong>{secondSpec[0]}:</strong> {String(secondSpec[1])}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewProduct(item)}
                        className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-[#06234B] text-[#06234B] hover:text-white border border-slate-200 font-bold text-xs transition cursor-pointer"
                      >
                        Full Specs
                      </button>
                      <button
                        type="button"
                        onClick={() => onEnquireProduct(`${item.model} | ${item.name}`)}
                        className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#06234B] to-[#F97316] hover:opacity-95 text-white font-bold text-xs transition shadow cursor-pointer active:scale-95"
                      >
                        Enquire Now / Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
