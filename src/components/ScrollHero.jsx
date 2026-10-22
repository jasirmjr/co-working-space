import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Calendar, Sparkles, Eye, ShieldCheck, ChevronRight, Compass } from 'lucide-react';
import { OFFICE_ZONES } from '../data/mockData';

const TOTAL_FRAMES = 240;

export default function ScrollHero({ onOpenBooking }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloading, setIsPreloading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const animationFrameIdRef = useRef(null);
  const lastDrawnFrameRef = useRef(-1);

  // Draw frame on canvas with aspect ratio cover and Retina DPR scaling
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use current frame or search for closest loaded frame across the entire array
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const bIdx = frameIdx - offset;
        if (bIdx >= 0) {
          const before = imagesRef.current[bIdx];
          if (before && before.complete && before.naturalWidth > 0) {
            img = before;
            break;
          }
        }
        const aIdx = frameIdx + offset;
        if (aIdx < TOTAL_FRAMES) {
          const after = imagesRef.current[aIdx];
          if (after && after.complete && after.naturalWidth > 0) {
            img = after;
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || window.innerHeight;

    const targetWidth = Math.floor(width * dpr);
    const targetHeight = Math.floor(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth, renderHeight, offsetX, offsetY;

    // Cover logic
    if (canvasRatio > imgRatio) {
      renderWidth = canvasWidth;
      renderHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - renderHeight) / 2;
    } else {
      renderWidth = canvasHeight * imgRatio;
      renderHeight = canvasHeight;
      offsetX = (canvasWidth - renderWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);

    lastDrawnFrameRef.current = frameIdx;
  }, []);

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    const images = imagesRef.current;
    let loaded = 0;

    const tryLoadFrame = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNum3 = String(index).padStart(3, '0');
        img.src = `/frames/frame_${frameNum3}.jpg`;

        img.onload = () => {
          if (!isCancelled) {
            images[index - 1] = img;
            loaded++;
            setLoadedCount(loaded);

            // Draw initial frame as soon as frame 1 arrives
            if (index === 1 || lastDrawnFrameRef.current === -1) {
              drawFrame(0);
            }

            // Dismiss preloader once initial smooth buffer is ready (20 frames)
            if (loaded >= 20 && isPreloading) {
              setIsPreloading(false);
            }
          }
          resolve(img);
        };

        img.onerror = () => {
          if (!isCancelled) {
            loaded++;
            setLoadedCount(loaded);
            if (loaded >= 20 && isPreloading) {
              setIsPreloading(false);
            }
          }
          resolve(null);
        };
      });
    };

    const loadAll = async () => {
      // Prioritize the first 40 frames for immediate display
      const initialBatch = [];
      for (let i = 1; i <= Math.min(40, TOTAL_FRAMES); i++) {
        initialBatch.push(tryLoadFrame(i));
      }
      await Promise.all(initialBatch);

      if (!isCancelled) {
        setIsPreloading(false);
        drawFrame(0);
      }

      // Then load remaining in parallel batches of 25 to prevent network clogging
      for (let start = 41; start <= TOTAL_FRAMES; start += 25) {
        if (isCancelled) break;
        const chunk = [];
        for (let i = start; i < Math.min(start + 25, TOTAL_FRAMES + 1); i++) {
          chunk.push(tryLoadFrame(i));
        }
        await Promise.all(chunk);
      }
    };

    loadAll();

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Handle scroll calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const totalScrollable = containerHeight - windowHeight;
      const scrolled = -rect.top;

      let progress = scrolled / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);

      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * (TOTAL_FRAMES - 1))
      );

      setCurrentFrameIndex(targetFrame);

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }

      animationFrameIdRef.current = requestAnimationFrame(() => {
        drawFrame(targetFrame);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      drawFrame(lastDrawnFrameRef.current >= 0 ? lastDrawnFrameRef.current : 0);
    });

    if (!isPreloading) {
      handleScroll();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPreloading, drawFrame]);

  // Jump to specific zone
  const scrollToZone = (zoneIndex) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollable = containerHeight - windowHeight;

    const targets = [0.0, 0.32, 0.62, 0.90];
    const targetProgress = targets[zoneIndex] ?? zoneIndex * 0.28;
    const targetScrollY = containerTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  const ZONES_DATA = [
    {
      title: "Welcome to Workspace Reimagined",
      subtitle: "Where world-class enterprises and high-growth startups thrive in biometric-secured, concierge-serviced architectural elegance.",
      features: [
        { no: '01', title: '24/7 Biometric Smart Credential Ingress', spec: 'Encrypted RFID & Facial ID' },
        { no: '02', title: 'Dedicated White-Glove Executive Concierge', spec: 'Priority Guest Onboarding' },
        { no: '03', title: 'Artisan Barista & Specialty Espresso Lounge', spec: 'La Marzocco Linea PB' },
        { no: '04', title: 'Architectural Reception & Terrazzo Salon', spec: 'Double-Height Atrium' },
      ]
    },
    {
      title: "Adaptive Workspaces for Dynamic Teams",
      subtitle: "Ergonomic designs, ultra-fast fiber, and acoustic-treated focus zones engineered to eliminate cognitive fatigue.",
      features: [
        { no: '01', title: '10 Gbps Redundant Enterprise Fiber Backbone', spec: 'Dual Multi-Homed ISPs' },
        { no: '02', title: 'Herman Miller Embody & Aeron Task Seating', spec: 'BIFMA Ergonomic Certified' },
        { no: '03', title: 'LINAK Motorized Sit-Stand Workstations', spec: 'Millimeter Height Presets' },
        { no: '04', title: 'Dual 4K Monitor Arm Docks & USB-C Power', spec: 'Single-Cable 90W PD' },
      ]
    },
    {
      title: "Collaborative Lounges & Wellness Cafés",
      subtitle: "Spark natural connections over artisan coffee, breakout collaboration pods, and biophilic wellness areas.",
      features: [
        { no: '01', title: 'Acoustic Collaborative Breakout Focus Pods', spec: 'Quiet Team Agile Scrums' },
        { no: '02', title: 'Sound-Isolated Private Phone Booths', spec: 'STC-45 Acoustic Rated' },
        { no: '03', title: 'Artisan Cold Brew & Kombucha on Tap', spec: 'Continuous Fresh Dispense' },
        { no: '04', title: 'Biophilic Living Air Wall & Oxygen Scrubbing', spec: 'HEPA H14 Air Scrubbed' },
      ]
    },
    {
      title: "Executive Boardrooms & Confidential Suites",
      subtitle: "Soundproofed enterprise privacy engineered for high-stakes board decisions, VC investor presentations, and M&A summits.",
      features: [
        { no: '01', title: 'Soundproofed Class-A Privacy Boardrooms', spec: 'Triple-Glazed Acoustic Glass' },
        { no: '02', title: 'Cisco 4K Webex Room Kit Telepresence', spec: 'Dual 85” UHD Displays' },
        { no: '03', title: 'Electronic Switchable Smart Privacy Glass', spec: 'Instant Push-Button Frost' },
        { no: '04', title: 'Dedicated On-Premise 42U Server Rack Enclosures', spec: 'Private VLAN Colocation' },
      ]
    }
  ];

  // Dedicated time & scroll gap in between zones (clean breathing room between texts):
  let activeZone = -1;
  if (scrollProgress >= 0 && scrollProgress < 0.21) {
    activeZone = 0;
  } else if (scrollProgress >= 0.27 && scrollProgress < 0.47) {
    activeZone = 1;
  } else if (scrollProgress >= 0.53 && scrollProgress < 0.73) {
    activeZone = 2;
  } else if (scrollProgress >= 0.79 && scrollProgress <= 1.0) {
    activeZone = 3;
  }

  // Animation variants with distinct rhythmic time gaps between headline, subheadline, and features
  const containerVariants = {
    initial: {
      opacity: 0,
      y: -14,
      x: -10,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
        delayChildren: 0.28, // distinct time gap before feature rows start cascading
      }
    },
    exit: {
      opacity: 0,
      y: -14,
      x: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      }
    }
  };

  const headlineVariants = {
    initial: {
      opacity: 0,
      x: -50,
      y: -8,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: {
      opacity: 0,
      y: -12,
      x: -10,
      transition: {
        duration: 0.18,
        ease: "easeInOut",
      }
    }
  };

  const subheadlineVariants = {
    initial: {
      opacity: 0,
      y: 14,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.32,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.16, // distinct time gap after the headline appears
      }
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.16,
        ease: "easeInOut",
      }
    }
  };

  const categoryTagVariants = {
    initial: {
      opacity: 0,
      letterSpacing: "0.06em",
    },
    animate: {
      opacity: 1,
      letterSpacing: "0.14em",
      transition: {
        duration: 0.26,
        ease: "easeOut",
        delay: 0.24, // distinct time gap after the subtitle appears
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.14,
      }
    }
  };

  const featureRowVariants = {
    initial: {
      opacity: 0,
      x: -24,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.24,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: {
      opacity: 0,
      x: -8,
      transition: {
        duration: 0.14,
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[500vh] bg-slate-950"
    >
      {/* Sticky Canvas & Text Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Soft, minimal gradient for contrast without dark black background blocking the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/25 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/35 via-transparent to-transparent pointer-events-none z-10 hidden md:block" />

        {/* MIDDLE CONTENT: Synchronized Staggered Cinematic Zone Overlay */}
        <div className="relative z-20 flex-1 flex items-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full pointer-events-none">
          <AnimatePresence mode="popLayout">
            {activeZone !== -1 && (
              <motion.div
                key={activeZone}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="max-w-3xl text-left pointer-events-none"
              >
              <motion.h1
                variants={headlineVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-[1.08] mb-3"
              >
                {ZONES_DATA[activeZone].title}
              </motion.h1>

              <motion.p
                variants={subheadlineVariants}
                className="text-slate-200 max-w-xl text-base md:text-lg font-normal leading-relaxed mb-6 drop-shadow-sm"
              >
                {ZONES_DATA[activeZone].subtitle}
              </motion.p>

              {/* Table of Contents Features with narrow line dividers */}
              <div className="max-w-xl">
               

                <div className="border-t border-b border-white/20 divide-y divide-white/20">
                  {ZONES_DATA[activeZone].features.map((feat, idx) => (
                    <motion.div
                      key={idx}
                      variants={featureRowVariants}
                      className="py-2.5 flex items-center justify-between text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-3">
                        
                        <span className="font-medium text-white">{feat.title}</span>
                      </div>
                      <span className="text-[11px] text-white/75 font-normal tracking-wide hidden sm:inline">
                        {feat.spec}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


        {/* BOTTOM FLOATING CONTROLS: Exactly aligned with the text grid */}
        <div className="relative z-20 pb-8 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full pointer-events-auto flex items-center justify-start">
          <button
            onClick={() => onOpenBooking()}
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm tracking-wide shadow-xl border border-slate-200/90 hover:border-slate-300 transition-all flex items-center justify-center gap-2.5 group active:scale-95"
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Book Your Slot</span>
            <ChevronRight className="w-4 h-4 text-slate-500 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Preloader Screen */}
      {isPreloading && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="max-w-md w-full space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-brand-500 text-slate-950 flex items-center justify-center font-bold text-2xl mx-auto shadow-glow animate-pulse">
              N
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                NEXUS WORKSPACES
              </h2>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
                Calibrating All 240 Ultra-HD Walkthrough Frames
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${Math.min(100, Math.max(5, loadPercentage))}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Rendering High-Dynamic Frame Stream</span>
                <span className="text-brand-400 font-bold">{loadedCount}/{TOTAL_FRAMES} frames</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Complete 240-Frame Architectural Sequence • Apple Retina & 4K Ready
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
