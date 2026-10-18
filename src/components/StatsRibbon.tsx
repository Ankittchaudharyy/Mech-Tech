import React from 'react';
import { Layers, Gauge, Cpu, MapPin } from 'lucide-react';

export const StatsRibbon: React.FC = () => {
  return (
    <section className="bg-white border-b border-slate-200 py-6 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#66B821]/10 text-[#66B821] flex items-center justify-center font-display font-bold text-xl">
            <Layers className="w-6 h-6 text-[#66B821]" />
          </div>
          <div className="text-left">
            <div className="font-bold text-slate-800 text-sm">34+ Machines</div>
            <div className="text-xs text-slate-500">2025 Product Lineup</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#0084D6]/10 text-[#0084D6] flex items-center justify-center font-display font-bold text-xl">
            <Gauge className="w-6 h-6 text-[#0084D6]" />
          </div>
          <div className="text-left">
            <div className="font-bold text-slate-800 text-sm">12K Pcs / Hour</div>
            <div className="text-xs text-slate-500">High-Speed Processing</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#66B821]/10 text-[#66B821] flex items-center justify-center font-display font-bold text-xl">
            <Cpu className="w-6 h-6 text-[#66B821]" />
          </div>
          <div className="text-left">
            <div className="font-bold text-slate-800 text-sm">0.01 mm</div>
            <div className="text-xs text-slate-500">Coaxial &amp; Strip Tolerance</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#0084D6]/10 text-[#0084D6] flex items-center justify-center font-display font-bold text-xl">
            <MapPin className="w-6 h-6 text-[#0084D6]" />
          </div>
          <div className="text-left">
            <div className="font-bold text-slate-800 text-sm">PAN India</div>
            <div className="text-xs text-slate-500">Noida HQ &amp; Field Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};
