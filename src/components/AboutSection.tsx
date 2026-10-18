import React from 'react';
import { Quote, CheckCircle, Shield, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gradient-to-b from-[#F4F8FB] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#66B821] bg-[#66B821]/10 px-3.5 py-1.5 rounded-full">
              <span>Precision • Innovation • Reliability</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#06234B] leading-tight">
              What Sets <span className="text-[#0084D6]">Mechtech Enterprises</span> Apart in Electronics &amp; Wire Harnessing?
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Headquartered in <strong>Noida, Uttar Pradesh</strong>, <strong>Mechtech Enterprises</strong> serves as a premier supplier of high-speed wire processing machines, terminal crimping solutions, radial/axial component forming systems, and precision PCB cutting equipment across India.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              From high-speed micro-wire stripping (AWG#32) to heavy-duty power cable cut-and-strip systems (up to 25 sq.mm), our machines are engineered with Japanese micro-stepping motors, PLC touchscreen control systems, and carbide tooling for demanding 24/7 industrial production environments.
            </p>

            {/* 3 Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 border-l-4 border-l-[#66B821]">
                <div className="font-display font-bold text-[#06234B] text-lg">Precision</div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Servo &amp; PLC controlled tolerances down to 0.01mm for coaxial &amp; aerospace cabling.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 border-l-4 border-l-[#0084D6]">
                <div className="font-display font-bold text-[#06234B] text-lg">Innovation</div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  99-program memory banks, intuitive touchscreen HMIs &amp; dual-wire simultaneous processing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 border-l-4 border-l-[#06234B]">
                <div className="font-display font-bold text-[#06234B] text-lg">Reliability</div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Heavy-duty cast steel frames engineered for zero-vibration 24/7 factory shifts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Leadership Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#06234B] text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl border border-white/10">
              {/* Background gradient orb */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#0084D6]/20 blur-2xl pointer-events-none" />

              <Quote className="w-10 h-10 text-[#66B821] opacity-80 mb-4" />

              <h3 className="font-display font-bold text-xl text-white mb-3">
                Words From Our Leadership
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed italic">
                "We appreciate your interest in Mechtech Enterprises. Your trust motivates us to deliver precision, innovation, and reliability in every wire processing, component forming, and PCB cutting solution we deliver."
              </p>

              <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-white text-sm">Mechtech Enterprises</div>
                  <div className="text-xs text-[#66B821]">Noida, Uttar Pradesh • India</div>
                </div>
                <a
                  href="tel:+918043809518"
                  className="inline-flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full font-mono text-white transition border border-white/15"
                  title="Direct Call Helpline"
                >
                  <span className="w-2 h-2 rounded-full bg-[#66B821] animate-pulse" />
                  <span>+91 8043809518</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
