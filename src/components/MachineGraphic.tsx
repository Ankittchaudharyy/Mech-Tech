import React from 'react';

interface MachineGraphicProps {
  type: string;
  model: string;
  className?: string;
}

export const MachineGraphic: React.FC<MachineGraphicProps> = ({ type, model, className = 'w-full h-full' }) => {
  switch (type) {
    case 'crimper-tower':
      return (
        <svg viewBox="0 0 280 220" className={className}>
          <defs>
            <linearGradient id="bodyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="steelGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          {/* Wire Spools */}
          <circle cx="90" cy="38" r="26" fill="#f59e0b" opacity="0.8" stroke="#334155" strokeWidth="2.5" />
          <circle cx="90" cy="38" r="8" fill="#1e293b" />
          <circle cx="190" cy="38" r="26" fill="#f59e0b" opacity="0.8" stroke="#334155" strokeWidth="2.5" />
          <circle cx="190" cy="38" r="8" fill="#1e293b" />

          {/* Guide Arms */}
          <line x1="90" y1="38" x2="90" y2="85" stroke="#64748b" strokeWidth="4" />
          <line x1="190" y1="38" x2="190" y2="85" stroke="#64748b" strokeWidth="4" />

          {/* Left & Right Crimping Heads */}
          <rect x="72" y="80" width="38" height="46" rx="4" fill="url(#steelGrad1)" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="170" y="80" width="38" height="46" rx="4" fill="url(#steelGrad1)" stroke="#1e293b" strokeWidth="1.5" />

          {/* PLC Touch Screen */}
          <rect x="120" y="90" width="40" height="30" rx="3" fill="#06234B" stroke="#0084D6" strokeWidth="2" />
          <line x1="125" y1="98" x2="155" y2="98" stroke="#66B821" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="125" y1="104" x2="148" y2="104" stroke="#0084D6" strokeWidth="2" />
          <circle cx="154" cy="113" r="2" fill="#ef4444" />

          {/* Main Heavy Machine Base */}
          <rect x="52" y="126" width="176" height="74" rx="6" fill="url(#bodyGrad1)" stroke="#334155" strokeWidth="2" />
          <rect x="52" y="126" width="176" height="12" fill="#06234B" />

          {/* Wire Feed Tracks */}
          <path d="M228,148 L265,158" stroke="#66B821" strokeWidth="4" strokeLinecap="round" />
          <path d="M228,158 L265,168" stroke="#0084D6" strokeWidth="4" strokeLinecap="round" />

          {/* Rotary Control Knobs / Casters */}
          <circle cx="95" cy="178" r="9" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          <circle cx="140" cy="178" r="9" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          <circle cx="185" cy="178" r="9" fill="#1e293b" stroke="#64748b" strokeWidth="2" />

          <text x="140" y="152" textAnchor="middle" fill="#06234B" fontSize="11" fontWeight="bold" fontFamily="monospace">
            {model}
          </text>
        </svg>
      );

    case 'tinning-cabin':
      return (
        <svg viewBox="0 0 280 220" className={className}>
          {/* Enclosure */}
          <rect x="48" y="38" width="184" height="85" rx="8" fill="#e2e8f0" stroke="#0084D6" strokeWidth="2.5" />
          {/* Clear Safety Viewing Window */}
          <rect x="62" y="50" width="112" height="60" rx="4" fill="#06234B" opacity="0.9" stroke="#64748b" />
          <line x1="72" y1="80" x2="162" y2="80" stroke="#66B821" strokeWidth="3" strokeDasharray="6 4" />
          <circle cx="117" cy="80" r="10" fill="#f59e0b" opacity="0.8" />
          {/* Solder Pot & Control */}
          <rect x="182" y="52" width="38" height="56" rx="4" fill="#1e293b" />
          <rect x="188" y="60" width="26" height="14" rx="2" fill="#0084D6" />
          <circle cx="195" cy="88" r="4" fill="#22c55e" />
          <circle cx="207" cy="88" r="4" fill="#ef4444" />
          {/* Machine Body */}
          <rect x="48" y="123" width="184" height="75" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          <text x="140" y="162" textAnchor="middle" fill="#06234B" fontSize="12" fontWeight="bold" fontFamily="monospace">
            {model}
          </text>
          <text x="140" y="180" textAnchor="middle" fill="#66B821" fontSize="9" fontWeight="bold">
            DUAL WIRE FLUX TINNING
          </text>
        </svg>
      );

    case 'coaxial-machine':
      return (
        <svg viewBox="0 0 280 220" className={className}>
          <rect x="42" y="62" width="196" height="110" rx="8" fill="#f1f5f9" stroke="#06234B" strokeWidth="2.5" />
          <rect x="42" y="62" width="196" height="24" fill="#06234B" rx="6" />
          {/* Touch Display */}
          <rect x="156" y="96" width="70" height="48" rx="4" fill="#06234B" stroke="#0084D6" strokeWidth="2" />
          <text x="191" y="118" textAnchor="middle" fill="#66B821" fontSize="9" fontWeight="bold" fontFamily="monospace">
            0.01mm
          </text>
          <text x="191" y="132" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">
            6 LAYERS
          </text>
          {/* Rotary Head */}
          <circle cx="95" cy="120" r="32" fill="#0084D6" opacity="0.15" stroke="#0084D6" strokeWidth="2.5" />
          <circle cx="95" cy="120" r="22" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
          <circle cx="95" cy="120" r="10" fill="#06234B" />
          <line x1="73" y1="120" x2="117" y2="120" stroke="#f59e0b" strokeWidth="3" />
          {/* Coaxial Wire in feed */}
          <path d="M15,120 L73,120" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
          <text x="140" y="78" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
            {model} • COAXIAL ROTARY
          </text>
        </svg>
      );

    case 'pcb-cutter':
      return (
        <svg viewBox="0 0 280 220" className={className}>
          <rect x="25" y="105" width="230" height="65" rx="6" fill="#f8fafc" stroke="#06234B" strokeWidth="2.5" />
          <rect x="35" y="85" width="210" height="20" rx="3" fill="#0084D6" />
          <rect x="55" y="100" width="170" height="8" fill="#66B821" />
          {/* Circular Depaneling Blade */}
          <circle cx="140" cy="98" r="18" fill="#e2e8f0" stroke="#1e293b" strokeWidth="3" />
          <circle cx="140" cy="98" r="6" fill="#ef4444" />
          {/* V-Groove Guide Table */}
          <line x1="40" y1="125" x2="240" y2="125" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
          <text x="140" y="150" textAnchor="middle" fill="#06234B" fontSize="11" fontWeight="bold">
            {model} • V-GROOVE PCB
          </text>
        </svg>
      );

    case 'terminal-press':
      return (
        <svg viewBox="0 0 280 220" className={className}>
          <rect x="80" y="35" width="120" height="150" rx="8" fill="#f1f5f9" stroke="#1e293b" strokeWidth="2.5" />
          <rect x="95" y="45" width="90" height="45" rx="4" fill="#06234B" />
          <text x="140" y="72" textAnchor="middle" fill="#66B821" fontSize="12" fontWeight="bold">
            TON CRIMP
          </text>
          {/* Ram Shaft */}
          <rect x="128" y="90" width="24" height="40" fill="#64748b" stroke="#334155" strokeWidth="2" />
          {/* Terminal Die Bed */}
          <rect x="105" y="130" width="70" height="30" rx="3" fill="#0084D6" stroke="#06234B" strokeWidth="2" />
          <text x="140" y="172" textAnchor="middle" fill="#06234B" fontSize="11" fontWeight="bold">
            {model}
          </text>
        </svg>
      );

    case 'pneumatic-crimper':
    case 'pneumatic-stripper':
      return (
        <svg viewBox="0 0 280 220" className={className}>
          <rect x="65" y="70" width="150" height="95" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          <rect x="65" y="70" width="150" height="20" fill="#0084D6" />
          <circle cx="100" cy="118" r="16" fill="#06234B" stroke="#66B821" strokeWidth="2" />
          <line x1="100" y1="106" x2="100" y2="128" stroke="#66B821" strokeWidth="2" />
          <rect x="145" y="105" width="55" height="28" rx="3" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
          <text x="140" y="84" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
            PNEUMATIC
          </text>
          <text x="140" y="152" textAnchor="middle" fill="#06234B" fontSize="11" fontWeight="bold">
            {model}
          </text>
        </svg>
      );

    case 'twister-machine':
      return (
        <svg viewBox="0 0 280 220" className={className}>
          <rect x="55" y="65" width="170" height="100" rx="8" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
          <circle cx="140" cy="115" r="30" fill="#06234B" stroke="#0084D6" strokeWidth="3" />
          <circle cx="140" cy="115" r="18" fill="none" stroke="#66B821" strokeWidth="3" strokeDasharray="8 4" />
          <circle cx="140" cy="115" r="6" fill="#f59e0b" />
          <text x="140" y="155" textAnchor="middle" fill="#06234B" fontSize="11" fontWeight="bold">
            {model}
          </text>
        </svg>
      );

    case 'pcb-forming':
      return (
        <svg viewBox="0 0 280 220" className={className}>
          <circle cx="140" cy="85" r="45" fill="#f8fafc" stroke="#06234B" strokeWidth="2.5" />
          <circle cx="140" cy="85" r="28" fill="#06234B" />
          <rect x="70" y="130" width="140" height="48" rx="6" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
          <text x="140" y="89" textAnchor="middle" fill="#66B821" fontSize="10" fontWeight="bold">
            BOWL FEED
          </text>
          <text x="140" y="158" textAnchor="middle" fill="#06234B" fontSize="11" fontWeight="bold">
            {model}
          </text>
        </svg>
      );

    default: // benchtop-stripper & fallback
      return (
        <svg viewBox="0 0 280 220" className={className}>
          <rect x="50" y="65" width="180" height="110" rx="8" fill="#f8fafc" stroke="#475569" strokeWidth="2.5" />
          <rect x="50" y="65" width="180" height="26" rx="6" fill="#0084D6" />
          {/* Digital Screen */}
          <rect x="70" y="102" width="60" height="32" rx="4" fill="#06234B" stroke="#334155" strokeWidth="1.5" />
          <text x="100" y="122" textAnchor="middle" fill="#66B821" fontSize="9" fontWeight="bold" fontFamily="monospace">
            99 PROG
          </text>
          {/* Wire Drive Rollers */}
          <circle cx="160" cy="144" r="15" fill="#334155" stroke="#66B821" strokeWidth="3" />
          <circle cx="196" cy="144" r="15" fill="#334155" stroke="#0084D6" strokeWidth="3" />
          <line x1="20" y1="144" x2="260" y2="144" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 3" />
          <text x="140" y="82" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
            {model}
          </text>
        </svg>
      );
  }
};
