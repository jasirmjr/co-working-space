import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Laptop, 
  Building2, 
  Sparkles, 
  Coffee
} from 'lucide-react';

const FEATURES = [
  {
    id: 'boardroom',
    index: '01',
    zone: 'GOVERNANCE & PITCH',
    title: 'High-Tech Boardroom Hall',
    shortDesc: 'Acoustically isolated high-stakes pitch boardroom with electronic smart privacy glass, Cisco 4K PTZ, and dual 85” UHD displays.',
    subDetails: [
      { no: '01', title: 'Cisco 4K Webex Room Kit Telepresence', spec: 'Dual 85” UHD Displays' },
      { no: '02', title: 'Electronic Switchable Smart Privacy Glass', spec: 'Instant Push-Button Frost' },
      { no: '03', title: 'Acoustic Soundproofing Isolation', spec: 'STC-52 Certified Walls' }
    ],
    image: '/boardroom.jpg',
    icon: Video
  },
  {
    id: 'hotdesks',
    index: '02',
    zone: 'AGILE WORKSPACE',
    title: 'Flexible Hot Desks & Day Passes',
    shortDesc: 'Frictionless drop-in ergonomic seating with Herman Miller Aeron posture chairs and 10 Gbps symmetric enterprise fiber.',
    subDetails: [
      { no: '01', title: 'Herman Miller Aeron & Embody Chairs', spec: 'BIFMA Ergonomic Certified' },
      { no: '02', title: 'LINAK Motorized Sit-Stand Workstations', spec: 'Millimeter Height Presets' },
      { no: '03', title: '10 Gbps Redundant Symmetrical Wi-Fi', spec: 'Dual Multi-Homed Fiber' }
    ],
    image: '/working-desk.jpg',
    icon: Laptop
  },
  {
    id: 'privatecabins',
    index: '03',
    zone: 'ENTERPRISE SUITES',
    title: 'Dedicated Private Cabins',
    shortDesc: 'Fully enclosed soundproof modular corporate suites customizable with company branding and dedicated lockable 42U server racks.',
    subDetails: [
      { no: '01', title: 'Custom Corporate Logo Entry Wall', spec: 'Branded Suite Ingress' },
      { no: '02', title: 'Dedicated Lockable 42U Server Rack', spec: 'Private VLAN Colocation' },
      { no: '03', title: 'Biometric Smart Credential Entry', spec: '24/7 RFID & Facial ID' }
    ],
    image: '/private-cabin.jpg',
    icon: Building2
  },
  {
    id: 'reception',
    index: '04',
    zone: 'HOSPITALITY SALON',
    title: 'Executive Reception & Concierge',
    shortDesc: 'White-glove arrival hospitality with double-height terrazzo atrium, digital guest badging, and secure concierge parcel vaults.',
    subDetails: [
      { no: '01', title: 'Double-Height Terrazzo Arrival Desk', spec: 'Concierge Greeting' },
      { no: '02', title: 'Digital QR Guest Badging System', spec: 'Fast VIP Onboarding' },
      { no: '03', title: 'Secure Package Vault & Daily Mail Sorting', spec: 'End-to-End Handling' }
    ],
    image: '/reception.jpg',
    icon: Sparkles
  },
  {
    id: 'pantry',
    index: '05',
    zone: 'WELLNESS & CAFE',
    title: 'Smart Vending & Artisan Pantry',
    shortDesc: 'Nutritional craft roasts on demand with nitro cold brew on tap alongside touchless RFID coolers stocked with fresh organic fare.',
    subDetails: [
      { no: '01', title: 'La Marzocco Linea PB Barista Machine', spec: 'Specialty Espresso' },
      { no: '02', title: 'Nitro Cold Brew & Kombucha on Tap', spec: 'Continuous Fresh Pour' },
      { no: '03', title: 'Touchless RFID Smart Cooler Micro-Market', spec: 'Organic Nutritional Fuel' }
    ],
    image: '/food-court.jpg',
    icon: Coffee
  }
];

// Card height (175px) + gap = 191px per slot
const CARD_HEIGHT = 191;

export default function InfrastructureExplorer({ onOpenBooking }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const tickingRef = useRef(false);

  // Preload all 5 images into memory for instant rendering
  useEffect(() => {
    FEATURES.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  // RAF-throttled high-performance scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        if (!containerRef.current) {
          tickingRef.current = false;
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        const totalScrollable = containerHeight - windowHeight;
        const scrolled = -rect.top;

        if (totalScrollable > 0) {
          const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
          const targetIdx = Math.min(FEATURES.length - 1, Math.floor(progress * FEATURES.length));
          if (targetIdx !== activeIndexRef.current) {
            activeIndexRef.current = targetIdx;
            setActiveIndex(targetIdx);
          }
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToIndex = (index) => {
    if (!containerRef.current) return;
    const clampedIndex = Math.max(0, Math.min(FEATURES.length - 1, index));
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollable = containerHeight - windowHeight;

    const targetProgress = (clampedIndex + 0.3) / FEATURES.length;
    const targetY = containerTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  const active = FEATURES[activeIndex];

  // Dynamic vertical translation centering the active card in the right queue
  const listOffset = -(activeIndex * CARD_HEIGHT) + (CARD_HEIGHT * 0.95);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[500vh] bg-slate-950 text-white select-none overflow-clip"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center px-6 sm:px-10 lg:px-16 z-20">
        
        {/* MAIN STAGE GRID: 
            Left side: Content texts placed completely outside of the image (on deep slate-950 canvas)
            Right side (70%): The featured image frame + right-side floating queue
        */}
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">

          {/* LEFT 30-35% FLANK: TEXTS SET COMPLETELY OUTSIDE THE IMAGE */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-center text-left z-30 pr-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                

                {/* Clean Headline with NO SHADOW, completely outside image */}
                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white tracking-tight leading-[1.08]">
                  {active.title}
                </h2>

                {/* Clean, concise 2-line description */}
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                  {active.shortDesc}
                </p>

                {/* Animated Table Form with Narrow Hairline Dividers */}
                <div className="pt-2">
                  <div className="border-t border-b border-white/15 divide-y divide-white/15">
                    {active.subDetails.map((detail, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.08 + (idx * 0.05), 
                          ease: [0.22, 1, 0.36, 1] 
                        }}
                        className="py-2.5 flex items-center justify-between text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-medium text-white">
                            {detail.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-white/60 font-normal tracking-wide whitespace-nowrap ml-4 hidden sm:inline">
                          {detail.spec}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT 65-70% STAGE: 70% SIZED IMAGE CONTAINER WITH EXPANDING ZOOM ANIMATION + QUEUE */}
          <div className="lg:col-span-8 xl:col-span-8 relative flex items-center justify-between h-[75vh] min-h-[500px]">

            {/* 70% SIZED ARCHITECTURAL IMAGE CANVAS */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.35, 
                    x: '45%', 
                    y: '0%',
                    borderRadius: '24px'
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: '0%', 
                    y: '0%',
                    borderRadius: '0px'
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 1.03,
                    transition: { duration: 0.4, ease: 'easeOut' }
                  }}
                  transition={{ 
                    duration: 0.65, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  style={{
                    transformOrigin: 'right center',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={active.image}
                    alt={active.title}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover brightness-[0.98] contrast-[1.04]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT FLANK: FLOATING UP/DOWN QUEUE OVERLAPPING THE RIGHT EDGE */}
            <div className="absolute right-4 xl:right-6 top-1/2 -translate-y-1/2 z-30">
              {/* Right Side Column Wrapper */}
              <div className="relative w-[260px] sm:w-[280px] h-[520px] overflow-hidden">

                {/* Smooth Animated Queue: Shifts Up/Down in sync with scroll */}
                <motion.div
                  animate={{ y: listOffset }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                  className="space-y-3.5 pr-2 pt-3"
                >
                  {FEATURES.map((item, idx) => {
                    const isActive = activeIndex === idx;

                    return (
                      <motion.div
                        key={item.id}
                        onClick={() => goToIndex(idx)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                          isActive 
                            ? 'border-white/90 ring-1 ring-white/60 shadow-2xl scale-[1.02]' 
                            : 'border-white/15 hover:border-white/35 opacity-60 hover:opacity-100'
                        }`}
                      >
                        {/* TALLER CARD HEIGHT (165px) & NARROW WIDTH */}
                        <div className="relative h-[165px] w-full overflow-hidden bg-slate-900 flex items-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="eager"
                            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                              isActive ? 'scale-105 brightness-105' : 'scale-100 brightness-85'
                            }`}
                          />

                          {/* Scrim Overlay */}
                          <div className={`absolute inset-0 transition-opacity duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent' 
                              : 'bg-slate-950/60'
                          }`} />

                          {/* Card Text Content */}
                          <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
                            <h4 className="text-sm font-bold text-white tracking-tight leading-tight mt-1 line-clamp-2">
                              {item.title}
                            </h4>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
