import React from 'react';
import { INDUSTRY_SECTORS } from '../data/products.ts';
import { ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';

export const BrandMarquee: React.FC = () => {
  // Duplicate for seamless infinite loop
  const displayItems = [...INDUSTRY_SECTORS, ...INDUSTRY_SECTORS];

  return (
    <div className="bg-[#04162F] py-3.5 border-y border-white/10 overflow-hidden relative select-none">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#04162F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#04162F] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 pl-6 pr-4 border-r border-white/10 shrink-0">
          <Activity className="w-4 h-4 text-[#66B821] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Industries Powered:
          </span>
        </div>

        <div className="animate-marquee flex items-center gap-6 text-xs font-medium text-slate-300">
          {displayItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#0084D6] hover:bg-white/10 transition cursor-default shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#66B821]" />
              <span className="font-semibold text-white">{item.name}</span>
              <span className="text-[11px] text-slate-400 font-normal">({item.tag})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
