import { HeroSlide } from '../types/index.ts';
import {
  IMG_BENCHTOP_STRIPPER,
  IMG_COAXIAL_STRIPPER,
  IMG_CRIMPER_TOWER,
  IMG_PCB_CUTTER_FORMING,
} from './catalogImages.ts';

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
    image: IMG_CRIMPER_TOWER,
  },
  {
    productId: 'me-03e',
    badge: 'CATALOG PAGE 02 • ITEM #03',
    model: 'ME-03E',
    title: 'Automatic Crimping & Tinning Machine (Two Wire Feeding)',
    description:
      'Cut, both end stripping, both end twist, both ends tinning. AWG20~AWG32 supports cutting 8 pcs at same time; AWG16~AWG20 supports cutting 3 pcs.',
    highlights: [
      { label: 'Available Cable', value: 'AWG24~18, AWG24~32' },
      { label: 'Cutting Length', value: '30~800 mm' },
      { label: 'Tinning Length', value: '1 - 9 mm' },
      { label: 'Twisting Length', value: '3 - 9 mm' },
    ],
    category: 'Wire Crimping',
    svgType: 'tinning-cabin',
    accent: 'from-[#0084D6] to-[#66B821]',
    bgGradient: 'from-[#041d40] via-[#073674] to-[#03152c]',
    image: IMG_CRIMPER_TOWER,
  },
  {
    productId: 'me-9800',
    badge: 'CATALOG PAGE 09 • ITEM #28',
    model: 'ME-9800',
    title: 'Automatic Coaxial Stripping Machine',
    description:
      'Cut & Strip Coaxial Cable (0.8 - 4.0 mm diameter) up to 6 stripping layers with 0.01 mm setting precision and 153mm X 85mm LCD Display Interface.',
    highlights: [
      { label: 'Diameter Range', value: '0.8 - 4.0 mm' },
      { label: 'Max. Strip Layers', value: '6 Layers' },
      { label: 'Depth Setting', value: '0.01 mm' },
      { label: 'Speed', value: '700 - 1200 Pcs./hr' },
    ],
    category: 'Wire Cutting & Stripping',
    svgType: 'coaxial-machine',
    accent: 'from-[#66B821] to-emerald-400',
    bgGradient: 'from-[#052952] via-[#094182] to-[#031c38]',
    image: IMG_COAXIAL_STRIPPER,
  },
  {
    productId: 'me-90t-plus',
    badge: 'CATALOG PAGE 03 • ITEM #04',
    model: 'ME-90T+',
    title: 'Cutting & Strip Two Wires',
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
    image: IMG_BENCHTOP_STRIPPER,
  },
  {
    productId: 'me-805a',
    badge: 'CATALOG PAGE 11 • ITEM #02',
    model: 'ME-805A',
    title: 'V-Grooved PCB Cutting Machine',
    description:
      'Auto PCB Cutting Machine for 50 - 400 mm PCB length and 0.6 - 3.2 mm cutting thickness with 0.25 mm minimum V-groove size and 0 - 300 mm/sec cutting speed.',
    highlights: [
      { label: 'PCB Length', value: '50 - 400 mm' },
      { label: 'PCB Thickness', value: '0.6 - 3.2 mm' },
      { label: 'Min. V-Groove', value: '0.25 mm' },
      { label: 'Cutting Speed', value: '0 - 300 mm/sec' },
    ],
    category: 'PCB & Component Processing',
    svgType: 'pcb-cutter',
    accent: 'from-[#0084D6] to-cyan-400',
    bgGradient: 'from-[#06254e] via-[#083b78] to-[#031b39]',
    image: IMG_PCB_CUTTER_FORMING,
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
