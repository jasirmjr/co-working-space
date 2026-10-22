import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Cpu
} from 'lucide-react';

const FEATURES = [
  {
    id: 'boardroom',
    indexNum: 1,
    tag: 'ZONE 01',
    brandBadge: 'CISCO & CRESTRON',
    title: 'High-Tech Boardroom',
    tagline: 'High-Stakes Deliberations',
    shortHeadline: 'Acoustic Soundproofing & 4K Global Telepresence',
    description: 'Acoustically isolated high-stakes pitch boardroom with electronic switchable smart privacy glass, Cisco 4K PTZ telepresence, and dual 85” UHD displays.',
    specs: [
      { label: 'Telepresence', value: 'Cisco 4K Webex Room Kit' },
      { label: 'Privacy Glass', value: 'Instant Push-Button Frost' },
      { label: 'Acoustics', value: 'STC-52 Soundproofed Walls' },
      { label: 'Capacity', value: '18 Executive Seats' }
    ],
    image: '/boardroom.jpg'
  },
  {
    id: 'hotdesks',
    indexNum: 2,
    tag: 'ZONE 02',
    brandBadge: 'HERMAN MILLER',
    title: 'Flexible Hot Desks',
    tagline: 'High-Velocity Focus',
    shortHeadline: '10 Gbps Symmetrical Fiber & Motorized Sit-Stand Desks',
    description: 'Frictionless drop-in ergonomic seating with Herman Miller Aeron posture chairs, LINAK motorized sit-stand workstations, and dual multi-homed 10 Gbps fiber.',
    specs: [
      { label: 'Ergonomics', value: 'Aeron & Embody Seating' },
      { label: 'Desks', value: 'LINAK Motorized Sit-Stand' },
      { label: 'Bandwidth', value: '10 Gbps Redundant Symmetrical' },
      { label: 'Power', value: 'Integrated AC & Dual USB-C PD' }
    ],
    image: '/working-desk.jpg'
  },
  {
    id: 'privatecabins',
    indexNum: 3,
    tag: 'ZONE 03',
    brandBadge: 'ENTERPRISE HQ',
    title: 'Dedicated Private Cabins',
    tagline: 'Turnkey Soundproof Suites',
    shortHeadline: 'Biometric RFID Access & Dedicated 42U Server Colocation',
    description: 'Fully enclosed soundproof modular corporate suites customizable with company branding, 24/7 biometric keycard access, and dedicated lockable 42U server racks.',
    specs: [
      { label: 'Hardware', value: 'Dedicated Lockable 42U Server Rack' },
      { label: 'Access Control', value: 'Biometric 24/7 RFID Entry' },
      { label: 'Identity', value: 'Custom Corporate Logo Wall' },
      { label: 'Isolation', value: 'Double-Glazed Acoustic Glass' }
    ],
    image: '/private-cabin.jpg'
  },
  {
    id: 'reception',
    indexNum: 4,
    tag: 'ZONE 04',
    brandBadge: 'WHITE-GLOVE CONCIERGE',
    title: 'Executive Reception',
    tagline: 'Arrival & Guest Hospitality',
    shortHeadline: 'Double-Height Terrazzo Atrium & Digital VIP Check-In',
    description: 'Double-height terrazzo arrival lounge with contactless QR guest badging, on-site barista greeting, and secure parcel vaults with instant SMS alerts.',
    specs: [
      { label: 'Arrival Desk', value: 'Double-Height Terrazzo Atrium' },
      { label: 'Guest Badging', value: 'Contactless QR VIP Badging' },
      { label: 'Logistics', value: 'Daily Mail Sorting & Secure Vault' },
      { label: 'Service', value: '24/7 Executive Concierge' }
    ],
    image: '/reception.jpg'
  },
  {
    id: 'pantry',
    indexNum: 5,
    tag: 'ZONE 05',
    brandBadge: 'LA MARZOCCO PB',
    title: 'Artisan Micro-Pantry',
    tagline: 'Nutritional Fuel & Cold Brew',
    shortHeadline: 'Specialty Espresso on Tap & Touchless Smart Coolers',
    description: 'Specialty single-origin espresso on demand with nitro cold brew and kombucha on tap, alongside touchless RFID micro-market coolers stocked daily.',
    specs: [
      { label: 'Espresso Bar', value: 'La Marzocco Linea PB Machine' },
      { label: 'Taps', value: 'Nitro Cold Brew & Kombucha' },
      { label: 'Micro-Market', value: 'Touchless RFID Smart Coolers' },
      { label: 'Hydration', value: 'BWT Alkaline & Sparkling Water' }
    ],
    image: '/food-court.jpg'
  }
];

export default function InteractiveCurvedFeatureShowcase({ onOpenBooking }) {
  // Default selected is index 1 (Flexible Hot Desks)
  const [selectedIndex, setSelectedIndex] = useState(1);
  const activeFeature = FEATURES[selectedIndex];

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] bg-white/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP SECTION HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400">
                Nexus Infrastructure Intelligence
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Curated Workplace Features
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span>HOVER CARD TO INSPECT</span>
            <span className="text-slate-600">•</span>
            <span className="text-white font-bold">{selectedIndex + 1} / {FEATURES.length}</span>
          </div>
        </div>

        {/* TWO-SIDED SPLIT SCREEN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: DYNAMIC TEXT & SPECIFICATIONS PANEL (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 15, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Zone Tag & Badge */}
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-white text-slate-950 text-[10px] font-mono font-black tracking-wider uppercase shadow-sm">
                    {activeFeature.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeFeature.brandBadge}
                  </span>
                </div>

                {/* Main Titles */}
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.1]">
                    {activeFeature.title}
                  </h3>
                  <div className="w-12 h-1 bg-white mt-3 mb-2" />
                  <p className="text-sm font-semibold text-slate-300">
                    {activeFeature.shortHeadline}
                  </p>
                </div>

                {/* Paragraph Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {activeFeature.description}
                </p>

                {/* Structured Specifications Table */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {activeFeature.specs.map((item, sIdx) => (
                    <div 
                      key={sIdx}
                      className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl backdrop-blur-sm"
                    >
                      <div className="text-[9px] font-mono font-bold uppercase text-slate-400">
                        {item.label}
                      </div>
                      <div className="text-xs font-black text-white mt-0.5 truncate">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenBooking && onOpenBooking('Tour')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 group"
                  >
                    <span>Reserve Private Walkthrough</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Reference Progress Line & Numbers Indicator */}
            <div className="mt-8 pt-6 border-t border-slate-900/80 flex items-center justify-between">
              {/* Dynamic Progress Bar */}
              <div className="relative w-36 sm:w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 bottom-0 left-0 bg-white rounded-full transition-all duration-300"
                  style={{
                    width: `${((selectedIndex + 1) / FEATURES.length) * 100}%`
                  }}
                />
              </div>

              {/* Numbered Selectors: 1 2 3 4 5 */}
              <div className="flex items-center gap-3 font-mono">
                {FEATURES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`transition-all duration-200 ${
                      i === selectedIndex
                        ? 'text-white font-black text-xl scale-125'
                        : 'text-slate-600 hover:text-slate-400 text-xs'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: HORIZONTAL HOVER-ENLARGED CARDS ROW (7 Cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center overflow-x-auto lg:overflow-visible py-8 px-2 scrollbar-none">
            <div className="flex items-center gap-3 sm:gap-3.5 select-none">
              {FEATURES.map((item, index) => {
                const isSelected = index === selectedIndex;

                return (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => setSelectedIndex(index)}
                    layout
                    className={`relative cursor-pointer shrink-0 rounded-2xl overflow-hidden transition-all duration-500 ${
                      isSelected
                        ? 'w-[200px] sm:w-[240px] lg:w-[270px] h-[340px] sm:h-[400px] lg:h-[450px] z-30 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.18)] ring-2 ring-white -translate-y-4'
                        : 'w-[100px] sm:w-[125px] lg:w-[135px] h-[240px] sm:h-[290px] lg:h-[330px] z-10 opacity-60 hover:opacity-90 hover:-translate-y-1.5 border border-slate-800 shadow-xl'
                    }`}
                  >
                    {/* Card Background Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                        isSelected ? 'scale-105 brightness-95' : 'scale-100 brightness-70 grayscale-[35%]'
                      }`}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${
                      isSelected 
                        ? 'bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20' 
                        : 'bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-black/50'
                    }`} />

                    {/* Badge on Card Top */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className={`text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md truncate max-w-[85%] ${
                        isSelected 
                          ? 'bg-white text-slate-950 shadow-md' 
                          : 'bg-slate-950/80 text-slate-300 border border-white/10'
                      }`}>
                        {item.brandBadge}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-white/70">
                        0{item.indexNum}
                      </span>
                    </div>

                    {/* Card Bottom Content (Shown only on larger cards or active) */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 pointer-events-none">
                      <div className="w-4 h-0.5 bg-white/60 mb-1.5" />
                      <h4 className={`font-black text-white leading-tight ${
                        isSelected ? 'text-base sm:text-xl' : 'text-xs truncate'
                      }`}>
                        {item.title}
                      </h4>
                      {isSelected && (
                        <p className="text-[11px] font-medium text-slate-300 mt-1 truncate">
                          {item.tagline}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
