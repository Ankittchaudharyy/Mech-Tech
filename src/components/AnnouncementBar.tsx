import React from 'react';
import { PhoneCall, Mail } from 'lucide-react';

interface AnnouncementBarProps {
  onInquireClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onInquireClick }) => {
  return (
    <div className="bg-[#06234B] text-white text-xs sm:text-sm py-2 px-4 border-b border-white/10 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#66B821] animate-ping" />
          <span className="font-medium tracking-wide text-slate-200">
            Top Industrial Wire Processing &amp; PCB Equipment Supplier in India
          </span>
          <span className="hidden md:inline text-white/30">•</span>
          <button
            onClick={onInquireClick}
            className="hidden md:inline text-[#66B821] hover:text-white hover:underline font-semibold transition"
          >
            Click here for inquiry →
          </button>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-5 text-xs">
          <a
            href="tel:+919149158815"
            className="flex items-center gap-1.5 hover:text-[#66B821] transition font-medium"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#66B821]" />
            <span>+91 9149158815</span>
          </a>
          <a
            href="mailto:info@mechtechenterprises.com"
            className="hidden sm:flex items-center gap-1.5 hover:text-[#0084D6] transition"
          >
            <Mail className="w-3.5 h-3.5 text-[#0084D6]" />
            <span>info@mechtechenterprises.com</span>
          </a>
          <span className="hidden lg:inline-block bg-white/10 px-2.5 py-0.5 rounded text-[11px] font-mono text-slate-300">
            GST: 09PUNPS9784M1ZS
          </span>
        </div>
      </div>
    </div>
  );
};
