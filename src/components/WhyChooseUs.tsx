import React from 'react';
import { Wrench, Headphones, Layers, ShieldCheck, Truck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Wrench className="w-6 h-6 text-[#66B821]" />,
      title: 'Application Assistance',
      desc: 'Complimentary wire sample testing & cutting trials to ensure exact machine match prior to dispatch.',
      bg: 'bg-[#66B821]/15',
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#0084D6]" />,
      title: 'Customer Service & Helpline',
      desc: 'Factory-trained technicians providing on-site commissioning, operator training, spares & direct helpline (+91 8043809518).',
      bg: 'bg-[#0084D6]/15',
    },
    {
      icon: <Layers className="w-6 h-6 text-[#66B821]" />,
      title: 'Diverse Product Range',
      desc: 'Complete portfolio spanning micro-AWG#32 strippers up to 25 sq.mm power cable cutters and V-groove PCB routers.',
      bg: 'bg-[#66B821]/15',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0084D6]" />,
      title: 'Quality & Calibration',
      desc: 'All machines calibrated and verified with ME-50A/50D digital crimp pull testers for zero-defect production.',
      bg: 'bg-[#0084D6]/15',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#66B821]" />,
      title: 'Pan-India Delivery',
      desc: 'Robust shock-proof wooden crating and rapid dispatch across all industrial manufacturing hubs in India.',
      bg: 'bg-[#66B821]/15',
    },
  ];

  return (
    <section id="why-us" className="py-16 bg-[#06234B] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#66B821] bg-white/10 px-3.5 py-1 rounded-full inline-block">
            The Mechtech Advantage
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl mt-3">
            Why Choose Mechtech Enterprises?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Engineered for high volume reliability, operator ease, and rapid return on investment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={p.title}
              className="bg-white/5 border border-white/10 hover:border-white/25 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <div className={`w-12 h-12 mx-auto rounded-2xl ${p.bg} flex items-center justify-center mb-4`}>
                {p.icon}
              </div>
              <h3 className="font-display font-bold text-base mb-2 text-white">{p.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
