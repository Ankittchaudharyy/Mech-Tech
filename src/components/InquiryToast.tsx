import React, { useEffect, useState } from 'react';
import { CheckCircle2, X, Sparkles, Building2 } from 'lucide-react';

interface InquiryToastProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  duration?: number; // milliseconds (3 to 4 seconds, default 3500ms)
}

export const InquiryToast: React.FC<InquiryToastProps> = ({
  isOpen,
  onClose,
  message = 'Your Inquiry has been send to MECHTECH, Thanks',
  duration = 3500,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) return;

    setProgress(100);
    const startTime = Date.now();
    const interval = 25; // 25ms steps for smooth bar

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remainingPct);

      if (elapsed >= duration) {
        clearInterval(timer);
        onClose();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-5 right-5 z-[9999] max-w-md w-[calc(100vw-2.5rem)] sm:w-[420px] transition-all duration-300 transform translate-y-0 opacity-100 animate-in slide-in-from-top-4 fade-in-0 shadow-2xl"
    >
      <div className="bg-[#06234B] text-white rounded-2xl p-4 sm:p-5 border-2 border-[#66B821] shadow-[0_12px_40px_rgba(6,35,75,0.45)] relative overflow-hidden backdrop-blur-md">
        {/* Glow corner accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#66B821]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#0084D6]/20 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start gap-3.5 relative z-10">
          {/* Mechtech Brand Logo / Success Badge */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-11 h-11 rounded-xl bg-white p-1 border border-white/20 shadow-md flex items-center justify-center">
              <img
                src="/images/mechtech-gears.png"
                alt="Mechtech"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#66B821] text-white flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#66B821] font-bold">
              <Sparkles className="w-3 h-3 text-[#66B821]" />
              <span>Inquiry Dispatched Successfully</span>
            </div>

            {/* Exact Requested Message */}
            <h4 className="font-display font-extrabold text-base sm:text-lg text-white mt-1 leading-snug">
              {message}
            </h4>

            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Our technical engineering sales team has received your specifications and will contact you within 24 hours with catalog pricing and quotation.
            </p>

            <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-300 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1 text-[#66B821] font-bold">
                <Building2 className="w-3 h-3" />
                Mechtech Engineering HQ, Noida
              </span>
              <span className="text-white/40">•</span>
              <a
                href="tel:+918043809518"
                className="font-mono text-slate-300 hover:text-[#66B821] transition"
                title="Call Direct Helpline"
              >
                Direct: +91 8043809518
              </a>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition shrink-0 cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 to 4 Second Countdown Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#66B821] via-[#0084D6] to-[#66B821] transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
