import React from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';

interface FloatingActionsProps {
  onQuickQuote: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onQuickQuote }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* WhatsApp / Quick Inquiry Button */}
      <a
        href="https://wa.me/918048250260?text=Hello%20Mechtech%20Enterprises%2C%20I%20am%20interested%20in%20your%20wire%20processing%20machines."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-bold"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">WhatsApp Sales</span>
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:+918048250260"
        className="flex items-center gap-2 bg-[#0084D6] hover:bg-[#0062a3] text-white px-4 py-2.5 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-bold"
        title="Call Helpline"
      >
        <Phone className="w-4 h-4" />
        <span className="hidden sm:inline">+91 918048250260</span>
      </a>
    </div>
  );
};
