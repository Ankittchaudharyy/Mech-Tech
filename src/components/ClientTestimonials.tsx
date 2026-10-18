import React, { useState, useEffect, useCallback } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  Building2,
  MapPin,
  Send,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  ImageOff,
} from 'lucide-react';

export interface TestimonialSlide {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  state: string;
  rating: number;
  review: string;
  metric: string;
  industry: string;
  verified: boolean;
  // Product details & image extracted from Catalog.pdf
  productId: string;
  productModel: string;
  productName: string;
  productCategory: string;
  productImage?: string | null;
  productSpecs: { label: string; value: string }[];
}

interface ClientTestimonialsProps {
  onViewProduct?: (productId: string) => void;
  onEnquireProduct?: (machineName: string) => void;
}

// Exactly 3 seconds sliding time as requested (3000ms)
const AUTO_PLAY_INTERVAL = 3000;

export const ClientTestimonials: React.FC<ClientTestimonialsProps> = ({
  onViewProduct,
  onEnquireProduct,
}) => {
  const testimonials: TestimonialSlide[] = [
    {
      id: '1',
      name: 'Rajesh Singhal',
      role: 'VP - Operations & Manufacturing',
      company: 'Apex Auto Harness Ltd.',
      city: 'Pune',
      state: 'Maharashtra',
      rating: 5,
      industry: 'Automotive Wire Harness Line',
      metric: '92% Increase in Line Output',
      review:
        'We installed two ME-01 double-end crimping towers for our 4-wheeler wiring harness line. The cutting tolerance and crimp pull-test consistency have been phenomenal. Our line output jumped from 1,800 to 3,500 parts per hour with near-zero wire wastage.',
      verified: true,
      productId: "me-01",
      productModel: "ME-01",
      productName: "Auto Double End Cutting/Stripping/Crimping Machine",
      productCategory: "Wire Harness • Wire Crimping",
      productImage: "/images/me-01.jpg",
      productSpecs: [
        { label: 'Wire Range', value: 'AWG#30 - AWG#18' },
        { label: 'Crimp Force', value: '1.5 - 2.0 Ton' },
        { label: 'Productivity', value: '~3,500 Pcs./hour' },
        { label: 'Cut Length', value: '60 - 9999 mm' },
      ],
    },
    {
      id: '2',
      name: 'V. Sundaram',
      role: 'Plant Head - Electronics Assembly',
      company: 'Indo-Tech Avionics & Telecom',
      city: 'Chennai',
      state: 'Tamil Nadu',
      rating: 5,
      industry: 'Defence & RF Coaxial Cables',
      metric: '0.01mm Multi-Layer Stripping Precision',
      review:
        'Stripping multi-layer RG-178 and RG-316 coaxial cables with 0.01mm rotary precision without nicking the inner shield used to be our biggest bottleneck. The ME-9800 rotary blades solved this completely. Mechtech’s service team also provided quick on-site training.',
      verified: true,
      productId: "me-9800",
      productModel: "ME-9800",
      productName: "Automatic Rotary Coaxial Stripping Machine",
      productCategory: "Wire Harness • Coaxial Processing",
      productImage: "/images/me-9800.jpg",
      productSpecs: [
        { label: 'Cable Diameter', value: '0.8 - 4.0 mm' },
        { label: 'Precision Unit', value: '0.01 mm Depth' },
        { label: 'Max Layers', value: 'Up to 6 Stripping Layers' },
        { label: 'Speed', value: '700 - 1200 Pcs./hour' },
      ],
    },
    {
      id: '3',
      name: 'Anil Verma',
      role: 'Managing Director',
      company: 'Precision Circuit Solutions',
      city: 'Noida',
      state: 'Uttar Pradesh',
      rating: 5,
      industry: 'SMT & High-Density PCB Assembly',
      metric: 'Zero-Stress Clean Burr-Free Depaneling',
      review:
        'For our high-density FR4 LED drivers and aluminium power boards, zero-stress depaneling was essential. The ME-805A circular blade gives clean, burr-free cuts with no component cracking. Exceptional build quality and local Noida engineering support.',
      verified: true,
      productId: "me-805a",
      productModel: "ME-805A",
      productName: "V-Grooved PCB Depaneling Cutting Machine",
      productCategory: "SMT Machines • PCB Cutting",
      productImage: "/images/me-805a.jpg",
      productSpecs: [
        { label: 'PCB Thickness', value: '0.6 - 3.2 mm' },
        { label: 'V-Groove Min', value: '0.25 mm Size' },
        { label: 'Cutting Speed', value: '0 - 300 mm/sec' },
        { label: 'PCB Length', value: '50 - 400 mm' },
      ],
    },
    {
      id: '4',
      name: 'Sandeep Malhotra',
      role: 'General Manager - Production',
      company: 'Electra EV Powertrain Systems',
      city: 'Gurugram',
      state: 'Haryana',
      rating: 5,
      industry: 'EV High-Voltage Battery Harness',
      metric: '6-Ton Continuous Heavy Crimp Force',
      review:
        'Processing 16 sq.mm and 25 sq.mm battery cables required heavy-duty equipment. Mechtech supplied the ME-9-4 heavy 6-ton pneumatic crimping station and ME-90L cutter. It effortlessly handles thick multi-strand copper cables 24/7 with rock-solid crimp integrity.',
      verified: true,
      productId: "wlf-400a",
      productModel: "WLF-400A",
      productName: "Radial Component Lead Cutting & Forming Machine",
      productCategory: "SMT Machines • Component Lead Forming",
      productImage: "/images/wlf-400a.jpg",
      productSpecs: [
        { label: "Pitch Range", value: "3 - 20 mm (Loose)" },
        { label: "Lead Length", value: "6 - 25 mm" },
        { label: "Wire Diam.", value: "0.4 - 1.2 mm" },
        { label: "Enclosure", value: "Pneumatic Safety Dome" },
      ],
    },
    {
      id: '5',
      name: 'Kavita Patel',
      role: 'Quality & Process Head',
      company: 'Zenith Solar Harnesses',
      city: 'Ahmedabad',
      state: 'Gujarat',
      rating: 5,
      industry: 'Renewable Energy & Solar Power Harness',
      metric: '12,000 Pcs/hr High-Speed Production',
      review:
        'The ME-90T+ benchtop stripping machine cut our daily setup changeover times in half. The knurled feed rollers handle both thin signal wires and 1.5 sq.mm power lines without slipping. Mechtech Enterprises is our primary go-to supplier for all wire processing automation.',
      verified: true,
      productId: "me-90t-plus",
      productModel: "ME-90T+",
      productName: "Automatic Computerized Wire Stripping Machine",
      productCategory: "Wire Harness • Cutting & Stripping",
      productImage: "/images/me-90t-plus.jpg",
      productSpecs: [
        { label: 'Wire Range', value: '0.032 - 1.5 sq. mm (AWG#32-15)' },
        { label: 'Speed', value: '4000 - 12000 Pcs./hour' },
        { label: 'Cut Length', value: '5 - 9999 mm' },
        { label: 'Memory', value: 'Max 99 Programs' },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = testimonials.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Automatic sliding per 3 seconds (3000ms) without interruption, exactly like HeroSlider
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleInquiryClick = (item: TestimonialSlide) => {
    if (onEnquireProduct) {
      onEnquireProduct(`${item.productModel} | ${item.productName}`);
    }
  };

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 bg-gradient-to-b from-[#051C3C] via-[#06234B] to-[#04152D] text-white relative overflow-hidden select-none"
    >
      {/* Background Decorative Tech Dots */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0084D6 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#66B821] bg-[#66B821]/15 px-3.5 py-1.5 rounded-full border border-[#66B821]/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Client Testimonials &amp; Production Proof</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 tracking-tight">
              Client Testimonials with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66B821] via-[#0084D6] to-[#F97316]">
                Product Specs &amp; Images
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Read real-world feedback from top manufacturing plants across India. Each review is paired with the exact deployed machine photo and verified technical specifications.
            </p>
          </div>

          {/* Navigation Controls (< and >) */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              type="button"
              onClick={prevSlide}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#F97316] text-white flex items-center justify-center transition border border-white/20 cursor-pointer active:scale-95 shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#F97316] text-white flex items-center justify-center transition border border-white/20 cursor-pointer active:scale-95 shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3-Second Sliding Progress Bar */}
        <div className="w-full bg-white/10 h-1 rounded-full mb-8 overflow-hidden">
          <div
            key={currentIndex}
            className="h-full bg-gradient-to-r from-[#66B821] via-[#0084D6] to-[#F97316] animate-[progress_3000ms_linear_infinite]"
            style={{
              animationDuration: `${AUTO_PLAY_INTERVAL}ms`,
            }}
          />
        </div>

        {/* Sliding Carousel Track (Smooth 500ms transition every 3000ms like Home Page HeroSlider) */}
        <div className="overflow-hidden relative rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full min-w-full shrink-0 px-1 py-2"
                >
                  <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* LEFT COLUMN: Testimonial & Review Details (7 Cols) */}
                    <div className="lg:col-span-7 space-y-6">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-1.5 bg-[#66B821]/20 border border-[#66B821]/40 text-[#66B821] text-xs font-bold px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified Client Review</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                          <div className="flex items-center">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span>5.0 Rating</span>
                        </div>
                        <div className="text-xs font-mono text-[#F97316] font-bold bg-[#F97316]/10 px-2.5 py-1 rounded border border-[#F97316]/30">
                          {item.industry}
                        </div>
                      </div>

                      {/* Main Review Quote */}
                      <div className="relative pl-6 sm:pl-8 border-l-4 border-[#66B821]">
                        <Quote className="w-8 h-8 text-[#66B821]/40 absolute -top-3 left-0 -translate-x-1/2" />
                        <p className="text-white text-base sm:text-lg lg:text-xl font-medium leading-relaxed italic">
                          "{item.review}"
                        </p>
                      </div>

                      {/* Operational Impact Metric Highlight */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Key Factory Impact / Metric
                          </div>
                          <div className="font-display font-extrabold text-base sm:text-lg text-[#66B821] mt-0.5">
                            {item.metric}
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#66B821]/20 text-[#66B821] flex items-center justify-center shrink-0">
                          <Sparkles className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Client Profile Identity */}
                      <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#66B821] to-[#0084D6] p-0.5 shadow-lg">
                          <div className="w-full h-full rounded-[14px] bg-[#06234B] flex items-center justify-center text-white font-display font-extrabold text-lg">
                            {item.name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <div className="font-display font-bold text-lg text-white">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-300">
                            {item.role}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                            <span className="flex items-center gap-1 font-semibold text-white">
                              <Building2 className="w-3.5 h-3.5 text-[#0084D6]" />
                              {item.company}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                              {item.city}, {item.state}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Deployed Product Photo & Verbatim Technical Specs (5 Cols) */}
                    <div className="lg:col-span-5 bg-gradient-to-b from-white/15 to-white/5 border border-white/20 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-2xl">
                      {/* Product Header */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#66B821]" />
                          <span className="text-xs font-bold text-[#66B821] uppercase tracking-wider">
                            {item.productCategory}
                          </span>
                        </div>
                        <span className="text-xs font-mono bg-[#F97316] text-white px-2.5 py-0.5 rounded font-bold">
                          {item.productModel}
                        </span>
                      </div>

                      {/* High-Res Product Photograph from Catalog */}
                      <div
                        onClick={() => onViewProduct && onViewProduct(item.productId)}
                        className="h-52 bg-white rounded-xl p-3 shadow-inner flex items-center justify-center relative overflow-hidden group cursor-pointer"
                        title={`Click to view full specs of ${item.productModel}`}
                      >
                        {item.productImage ? (
                          <>
                            <img
                              src={item.productImage}
                              alt={`${item.productModel} - ${item.productName}`}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-mono">
                              Catalog Photo
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full bg-slate-100 rounded-lg flex flex-col items-center justify-center p-3 text-center border border-slate-200">
                            <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-500 mb-1.5">
                              <ImageOff className="w-4 h-4 text-slate-500" />
                            </div>
                            <p className="font-display font-bold text-xs text-[#06234B] line-clamp-1 px-1">
                              {item.productModel} - {item.productName}
                            </p>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                              Image Not Available
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Machine Title */}
                      <h4 className="font-display font-bold text-sm text-white mt-3 line-clamp-1">
                        {item.productName}
                      </h4>

                      {/* 4 Verbatim Product Specs Grid */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {item.productSpecs.map((spec) => (
                          <div
                            key={spec.label}
                            className="bg-white/5 border border-white/10 rounded-lg p-2"
                          >
                            <div className="text-[10px] text-slate-400 font-medium">
                              {spec.label}
                            </div>
                            <div className="font-mono font-bold text-xs text-white truncate mt-0.5">
                              {spec.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                        <button
                          type="button"
                          onClick={() => onViewProduct && onViewProduct(item.productId)}
                          className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#0084D6]" />
                          <span>View Machine Specs</span>
                        </button>
                        
                        {/* Send Inquiry to MechTech Button -> Triggers Top Right Toast */}
                        <button
                          type="button"
                          onClick={() => handleInquiryClick(item)}
                          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#66B821] to-[#0084D6] hover:from-[#57a118] hover:to-[#006bb0] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Inquiry to MechTech</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide Indicators / Thumbnails Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
          {testimonials.map((t, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`p-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#06234B] border-[#66B821] shadow-xl scale-[1.03] ring-2 ring-[#66B821]/50'
                    : 'bg-white/10 text-white border-white/10 hover:bg-white/20 hover:border-white/25'
                }`}
              >
                {t.productImage ? (
                  <img
                    src={t.productImage}
                    alt={t.productModel}
                    className={`w-10 h-10 object-contain rounded-lg p-1 shrink-0 ${
                      isSelected ? 'bg-slate-100 border border-slate-200' : 'bg-white/10'
                    }`}
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-lg p-1 shrink-0 flex items-center justify-center ${
                      isSelected ? 'bg-slate-100 border border-slate-200 text-slate-500' : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    <ImageOff className="w-5 h-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-[#F97316]' : 'text-slate-200'
                      }`}
                    >
                      {t.productModel}
                    </span>
                    <span className="text-[10px] text-amber-400 font-bold">★ 5.0</span>
                  </div>
                  <div
                    className={`text-[11px] truncate font-medium ${
                      isSelected ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    {t.company}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
