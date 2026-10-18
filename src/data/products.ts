import { HeroSlide } from '../types/index.ts';

export const HERO_SLIDES: HeroSlide[] = [
  {
    productId: 'me-01',
    badge: 'CATALOG PAGE 02 • ITEM #01',
    model: 'ME-01',
    title: 'Auto Double End Cutting/Stripping/Crimping Machine',
    description:
      'Cut, Strip & Crimp single core round wire both side (AWG#30 - AWG#18) with 1.5 - 2.0 Ton crimp force and approx. 3500 Pcs./hour speed.',
    highlights: [
      { label: 'Core Cross-Section', value: 'AWG#30 - AWG#18' },
      { label: 'Speed', value: 'Approx. 3500 Pcs./hr' },
      { label: 'Crimp Force', value: '1.5 - 2.0 Ton' },
      { label: 'Cutting Length', value: '60 - 9999 mm' },
    ],
    category: 'Wire Crimping',
    svgType: 'crimper-tower',
    accent: 'from-[#66B821] to-[#0084D6]',
    bgGradient: 'from-[#06234B] via-[#09316B] to-[#041833]',
    image: '/images/me-01.jpg',
  },
  {
    productId: 'me-90t-plus',
    badge: 'CATALOG PAGE 03 • ITEM #04',
    model: 'ME-90T+',
    title: 'Cutting & Strip Two Wires Machine',
    description:
      'Cut & Strip Both End Single Core Round Wire (0.032 - 1.5 sq. mm / AWG#32 - AWG#15) with Max 99 Programs memory and 4000 - 12000 Pcs./hour speed.',
    highlights: [
      { label: 'Core Cross-Section', value: 'AWG#32 - AWG#15' },
      { label: 'Speed', value: '4000 - 12000 Pcs./hr' },
      { label: 'Memory', value: 'Max 99 Programs' },
      { label: 'Conduit Diameter', value: 'Φ 3.5 mm' },
    ],
    category: 'Wire Cutting & Stripping',
    svgType: 'benchtop-stripper',
    accent: 'from-amber-400 to-[#0084D6]',
    bgGradient: 'from-[#082855] via-[#0d3f82] to-[#041a3a]',
    image: '/images/me-90t-plus.jpg',
  },
  {
    productId: 'me-9800',
    badge: 'CATALOG PAGE 09 • ITEM #28',
    model: 'ME-9800',
    title: 'Automatic Rotary Coaxial Stripping Machine',
    description:
      'Cut & Strip Coaxial Cable (0.8 - 4.0 mm diameter) up to 6 stripping layers with 0.01 mm setting precision and 153mm X 85mm LCD Display Interface.',
    highlights: [
      { label: 'Diameter Range', value: '0.8 - 4.0 mm' },
      { label: 'Max. Strip Layers', value: '6 Layers' },
      { label: 'Depth Setting', value: '0.01 mm' },
      { label: 'Speed', value: '700 - 1200 Pcs./hr' },
    ],
    category: 'Coaxial Cable Processing',
    svgType: 'coaxial-machine',
    accent: 'from-[#66B821] to-emerald-400',
    bgGradient: 'from-[#052952] via-[#094182] to-[#031c38]',
    image: '/images/me-9800.jpg',
  },
  {
    productId: 'wlf-400a',
    badge: 'CATALOG PAGE 11 • ITEM #03',
    model: 'WLF-400A',
    title: 'Radial Component Lead Cutting & Forming Machine',
    description:
      'High-speed loose radial component lead cutting & forming machine for 3 - 20 mm pitch with safety enclosure dome, 115kg heavy-duty chassis and automatic feeding.',
    highlights: [
      { label: 'Component Pitch (A)', value: '3 - 20 mm' },
      { label: 'Lead Length (L)', value: '6 - 25 mm' },
      { label: 'Min Height (H)', value: '3 mm (Min.)' },
      { label: 'Lead Wire (W)', value: '0.4 - 1.2 mm' },
    ],
    category: 'Component Lead Forming',
    svgType: 'pcb-forming',
    accent: 'from-emerald-400 to-[#0084D6]',
    bgGradient: 'from-[#041d40] via-[#073674] to-[#03152c]',
    image: '/images/wlf-400a.jpg',
  },
  {
    productId: 'me-805a',
    badge: 'CATALOG PAGE 13 • ITEM #02',
    model: 'ME-805A',
    title: 'V-Grooved PCB Depaneling Cutting Machine',
    description:
      'Auto PCB Cutting Machine for 50 - 400 mm PCB length and 0.6 - 3.2 mm cutting thickness with 0.25 mm minimum V-groove size and 0 - 300 mm/sec cutting speed.',
    highlights: [
      { label: 'PCB Length', value: '50 - 400 mm' },
      { label: 'PCB Thickness', value: '0.6 - 3.2 mm' },
      { label: 'Min. V-Groove', value: '0.25 mm' },
      { label: 'Cutting Speed', value: '0 - 300 mm/sec' },
    ],
    category: 'PCB Cutting & Depaneling',
    svgType: 'pcb-cutter',
    accent: 'from-[#0084D6] to-cyan-400',
    bgGradient: 'from-[#06254e] via-[#083b78] to-[#031b39]',
    image: '/images/me-805a.jpg',
  },
];

export const INDUSTRY_SECTORS: { name: string; tag: string }[] = [
  { name: 'Automotive Wire Harness', tag: 'ME-01 / ME-02B' },
  { name: 'Home Appliance Cabling', tag: 'ME-90T+ / ME-90AS' },
  { name: 'EV Battery & Power Cables', tag: 'ME-90L / ME-9-4' },
  { name: 'PCB & SMT Electronics Assembly', tag: 'ME-805A / ME-3' },
  { name: 'Aerospace & RF Coaxial Processing', tag: 'ME-9800 / ME-9600S' },
  { name: 'Control Panel & Switchgear', tag: 'IC-90K / ME-6-4' },
  { name: 'Component Lead Forming', tag: 'WLF-400A / ME-507' },
  { name: 'Ribbon & Flat Cable Processing', tag: 'ME-650 / ME-90E+S' },
];
