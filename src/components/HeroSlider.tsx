import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Send, Activity, ImageOff } from 'lucide-react';
import { HERO_SLIDES } from '../data/products.ts';

interface HeroSliderProps {
  onViewProduct: (productId: string) => void;
  onEnquireProduct: (modelAndTitle: string) => void;
}

// Exactly 3 seconds per slide as requested (3000ms)
const AUTO_PLAY_INTERVAL = 4000;

export const HeroSlider: React.FC<HeroSliderProps> = ({ onViewProduct, onEnquireProduct }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Automatic movement per 3 seconds without manual intervention
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-[#06234B] via-[#09316B] to-[#041833] text-white py-10 lg:py-16 select-none"
    >
      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0084D6 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Slider Bar */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#66B821]">
            <Activity className="w-3.5 h-3.5 text-[#66B821]" />
            <span className="text-slate-200">
              MECHTECH ENTERPRISES • OFFICIAL 2025 PRODUCT CATALOG
            </span>
          </div>
        </div>

        {/* Sliding Carousel Track (Smooth 500ms transition every 3000ms) */}
        <div className="overflow-hidden relative rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {HERO_SLIDES.map((slide) => {
              return (
                <div
                  key={slide.productId}
                  className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-1 py-2"
                >
                  {/* Left Slide Copy */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-white/10 border border-white/15 text-[#66B821] text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                      <span>{slide.badge}</span>
                    </div>

                    <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[42px] leading-[1.12] tracking-tight">
                      <span
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.accent}`}
                      >
                        {slide.model}
                      </span>{' '}
                      — {slide.title}
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                      {slide.description}
                    </p>

                    {/* 4 Verbatim Technical Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      {slide.highlights.map((h) => (
                        <div
                          key={h.label}
                          className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm hover:border-[#0084D6]/50 transition"
                        >
                          <div className="text-[11px] text-slate-400 uppercase font-medium">
                            {h.label}
                          </div>
                          <div className="font-display font-bold text-sm text-white mt-0.5">
                            {h.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => onViewProduct(slide.productId)}
                        className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#ea580c] hover:opacity-95 text-white font-display font-bold text-sm shadow-lg hover:shadow-xl transition flex items-center gap-2 active:scale-95 cursor-pointer"
                      >
                        <span>View Product Specs</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEnquireProduct(`${slide.model} | ${slide.title}`)}
                        className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm transition flex items-center gap-2 active:scale-95 cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-[#F97316]" />
                        <span>Enquire Now / Get Quote</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Product Photograph Card */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="w-full max-w-md bg-gradient-to-b from-white/15 to-white/5 border border-white/20 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative group">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <span className="text-xs font-bold text-[#66B821] uppercase tracking-wider">
                          {slide.category}
                        </span>
                        <span className="text-xs font-mono bg-[#F97316] text-white px-3 py-0.5 rounded font-bold">
                          {slide.model}
                        </span>
                      </div>

                      {/* Machine Photograph or Neutral Placeholder */}
                      <div
                        onClick={() => onViewProduct(slide.productId)}
                        className="h-64 bg-white rounded-2xl p-3 shadow-inner flex items-center justify-center relative overflow-hidden cursor-pointer"
                      >
                        {slide.image ? (
                          <img
                            src={slide.image}
                            alt={`${slide.model} - ${slide.title}`}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 rounded-xl flex flex-col items-center justify-center p-4 text-center select-none border border-slate-200">
                            <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 mb-2">
                              <ImageOff className="w-5 h-5 text-slate-500" />
                            </div>
                            <p className="font-display font-bold text-xs text-[#06234B] line-clamp-2 px-3 leading-snug">
                              {slide.model} - {slide.title}
                            </p>
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                              Image Not Available
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
                        <span className="font-semibold text-slate-300">
                          PRECISION | INNOVATION | RELIABILITY
                        </span>
                        <button
                          type="button"
                          onClick={() => onViewProduct(slide.productId)}
                          className="text-[#66B821] hover:text-white font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <span>Full Specs</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Carousel Navigation Indicators */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {HERO_SLIDES.map((s, i) => {
              const isActive = i === currentIndex;
              return (
                <div
                  key={s.productId}
                  className={`relative overflow-hidden px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 border text-left ${isActive
                    ? 'bg-gradient-to-r from-[#66B821]/30 to-[#0084D6]/30 text-white border-[#66B821] shadow-lg scale-105'
                    : 'bg-white/5 text-slate-400 border-white/10'
                    }`}
                >
                  <span className="font-mono text-[11px] opacity-70">0{i + 1}</span>
                  <span>{s.model}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#66B821]" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <span>2025 Flagship Machine Series</span>
          </div>
        </div>
      </div>
    </section>
  );
};
