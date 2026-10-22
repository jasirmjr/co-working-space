import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    id: 'boardroom',
    name: 'Boardroom',
    category: 'GOVERNANCE & PITCH',
    title: 'High-Tech Boardroom Hall',
    shortDesc: 'Acoustically isolated high-stakes pitch boardroom with electronic switchable smart privacy glass, Cisco 4K PTZ telepresence, and dual 85” UHD displays.',
    subDetails: [
      { label: 'Telepresence', value: 'Cisco 4K Webex Room Kit' },
      { label: 'Privacy Glass', value: 'Instant Push-Button Frost' },
      { label: 'Acoustics', value: 'STC-52 Soundproofed Walls' },
      { label: 'Capacity', value: '18 Executive Seats' }
    ],
    image: '/boardroom.jpg'
  },
  {
    id: 'hotdesks',
    name: 'Hot Desks',
    category: 'AGILE WORKSPACE',
    title: 'Flexible Hot Desks & Day Passes',
    shortDesc: 'Frictionless drop-in ergonomic seating with Herman Miller Aeron posture chairs, LINAK motorized sit-stand workstations, and dual multi-homed 10 Gbps fiber.',
    subDetails: [
      { label: 'Ergonomics', value: 'Aeron & Embody Seating' },
      { label: 'Desks', value: 'LINAK Motorized Sit-Stand' },
      { label: 'Bandwidth', value: '10 Gbps Redundant Symmetrical' },
      { label: 'Power', value: 'Integrated AC & Dual USB-C PD' }
    ],
    image: '/working-desk.jpg'
  },
  {
    id: 'privatecabins',
    name: 'Suites',
    category: 'ENTERPRISE SUITES',
    title: 'Dedicated Private Cabins',
    shortDesc: 'Fully enclosed soundproof modular corporate suites customizable with company branding, 24/7 biometric keycard access, and dedicated lockable 42U server racks.',
    subDetails: [
      { label: 'Hardware', value: 'Dedicated Lockable 42U Server Rack' },
      { label: 'Access Control', value: 'Biometric 24/7 RFID Entry' },
      { label: 'Identity', value: 'Custom Corporate Logo Wall' },
      { label: 'Isolation', value: 'Double-Glazed Acoustic Glass' }
    ],
    image: '/private-cabin.jpg'
  },
  {
    id: 'reception',
    name: 'Reception',
    category: 'HOSPITALITY SALON',
    title: 'Executive Reception & Concierge',
    shortDesc: 'Double-height terrazzo arrival lounge with contactless QR guest badging, on-site barista greeting, and secure parcel vaults with instant SMS alerts.',
    subDetails: [
      { label: 'Arrival Desk', value: 'Double-Height Terrazzo Atrium' },
      { label: 'Guest Badging', value: 'Contactless QR VIP Badging' },
      { label: 'Logistics', value: 'Daily Mail Sorting & Secure Vault' },
      { label: 'Service', value: '24/7 Executive Concierge' }
    ],
    image: '/reception.jpg'
  },
  {
    id: 'pantry',
    name: 'Pantry',
    category: 'WELLNESS & CAFE',
    title: 'Smart Vending & Artisan Pantry',
    shortDesc: 'Specialty single-origin espresso on demand with nitro cold brew and kombucha on tap, alongside touchless RFID micro-market coolers stocked daily.',
    subDetails: [
      { label: 'Espresso Bar', value: 'La Marzocco Linea PB Machine' },
      { label: 'Taps', value: 'Nitro Cold Brew & Kombucha' },
      { label: 'Micro-Market', value: 'Touchless RFID Smart Coolers' },
      { label: 'Hydration', value: 'BWT Alkaline & Sparkling Water' }
    ],
    image: '/food-court.jpg'
  }
];

export default function InteractiveCurvedFeatureShowcase() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section className="py-20 lg:py-24 bg-white text-slate-900 relative overflow-hidden border-y border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SILKY SMOOTH, NON-LAG REALISTIC HEADING REVEAL */}
        <div className="text-center mb-12 sm:mb-14 overflow-hidden">
          

          {/* Clean hardware-accelerated fluid mask slide-up reveal */}
          <div className="overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ 
                duration: 0.85, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              style={{ willChange: 'transform, opacity' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08] max-w-4xl mx-auto"
            >
              Discover the freedom of working on your terms
            </motion.h2>
          </div>

          {/* Underline accent that smoothly expands */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-1 bg-slate-950 mx-auto mt-4 rounded-full origin-center"
          />
        </div>

        {/* ULTRA-SMOOTH TWO-SIDED ENTRANCE MAIN CARDS ROW */}
        <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-3.5 h-auto lg:h-[425px] w-full">
          {FEATURES.map((item, index) => {
            const isSelected = index === selectedIndex;

            // Two-sided entrance animation:
            // Cards 0 & 1 glide in from the left side (-160px, -80px)
            // Card 2 glides in smoothly from center/top
            // Cards 3 & 4 glide in from the right side (+80px, +160px)
            const isLeft = index < 2;
            const startX = index === 0 ? -160 : index === 1 ? -80 : index === 2 ? 0 : index === 3 ? 80 : 160;

            return (
              <motion.div
                key={item.id}
                initial={{ 
                  opacity: 0, 
                  x: startX,
                  scale: 0.96
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  scale: 1
                }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ 
                  duration: 0.95,
                  ease: [0.22, 1, 0.36, 1], // Silky smooth deceleration curve
                  delay: (isLeft ? index : 4 - index) * 0.09
                }}
                layout
                layoutTransition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => setSelectedIndex(index)}
                className={`relative rounded-[28px] lg:rounded-[32px] overflow-hidden cursor-pointer select-none transition-shadow duration-500 min-w-0 ${
                  isSelected
                    ? 'flex-[2.8] min-h-[380px] lg:min-h-full shadow-[0_24px_60px_rgba(0,0,0,0.22)]'
                    : 'flex-1 min-h-[90px] lg:min-h-full shadow-md hover:shadow-xl group'
                }`}
              >
                {/* Background Image with fluid zoom transition */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                    isSelected 
                      ? 'scale-105 brightness-95' 
                      : 'scale-100 brightness-75 group-hover:scale-110 group-hover:brightness-90 grayscale-[20%] group-hover:grayscale-0'
                  }`}
                />

                {/* Scrim Overlay */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-black/35' 
                    : 'bg-slate-950/45 group-hover:bg-slate-950/25'
                }`} />

                {isSelected ? (
                  /* ================= EXPANDED HERO CARD VIEW ================= */
                  <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-8 text-white">
                    {/* Top Text Content with AnimatePresence for content transitions */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-md sm:max-w-lg"
                      >
                        

                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-2.5">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal">
                          {item.shortDesc}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Bottom Floating White Telemetry Widget + Circular Arrow */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 pt-4">
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.35, delay: 0.05 }}
                          className="bg-white/95 backdrop-blur-md text-slate-900 rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-white/40 max-w-md w-full"
                        >
                          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Key Specifications
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {item.subDetails.slice(0, 4).map((spec, sIdx) => (
                              <div key={sIdx} className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <div className="text-[9px] font-mono uppercase text-slate-500 font-semibold">{spec.label}</div>
                                <div className="text-xs font-black text-slate-900 truncate mt-0.5">{spec.value}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      <div className="w-11 h-11 rounded-full bg-slate-950 text-white flex items-center justify-center shadow-xl border border-white/20 shrink-0 transition-transform active:scale-95 hover:scale-105">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ================= VERTICAL PILLAR CARD VIEW ================= */
                  <div className="relative z-10 w-full h-full flex lg:flex-col items-center justify-between p-3 sm:p-4 text-white">
                    <span className="text-[10px] font-mono font-bold text-white/70">
                      0{index + 1}
                    </span>

                    <div className="hidden lg:flex items-center justify-center my-auto">
                      <span className="text-sm xl:text-base font-black text-white tracking-wider uppercase whitespace-nowrap -rotate-90 origin-center drop-shadow-md">
                        {item.name}
                      </span>
                    </div>

                    <span className="lg:hidden text-base font-bold text-white">
                      {item.title}
                    </span>

                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white transition-colors" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
