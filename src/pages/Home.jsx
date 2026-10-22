import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView, motion } from 'framer-motion';
import ScrollHero from '../components/ScrollHero';
import InfrastructureExplorer from '../components/InfrastructureExplorer';
import InteractiveCurvedFeatureShowcase from '../components/InteractiveCurvedFeatureShowcase';
import BentoPricingSection from '../components/BentoPricingSection';
import AnimatedTestimonialsSection from '../components/AnimatedTestimonialsSection';
import { STATS, PARTNERS, FACILITIES, PRICING_PLANS, TESTIMONIALS } from '../data/mockData';
import { 
  Wifi, 
  ShieldCheck, 
  Armchair, 
  Headphones, 
  Coffee, 
  Server, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Calendar, 
  TrendingUp, 
  Lock, 
  Star 
} from 'lucide-react';

function AnimatedCounter({ target = 0, decimals = 0, duration = 1800, trigger = false }) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCurrentValue(0);
      return;
    }

    let startTime = null;
    let animationFrameId;

    // Smooth exponential ease-out for an executive, ultra-clean feel
    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const val = easedProgress * target;
      setCurrentValue(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [trigger, target, duration]);

  if (decimals > 0) {
    return <span>{currentValue.toFixed(decimals)}</span>;
  }

  return <span>{Math.round(currentValue).toLocaleString()}</span>;
}

export default function Home({ onOpenBooking }) {
  const [selectedPlanId, setSelectedPlanId] = useState('dedicated-desk');
  const [billingCycle, setBillingCycle] = useState('yearly');
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.25 });

  const iconMap = {
    Wifi,
    ShieldCheck,
    Armchair,
    Headphones,
    Coffee,
    Server,
  };

  return (
    <div className="w-full bg-[#F8F9FA]">
      {/* 1. Flagship Canvas Scroll Walkthrough */}
      <ScrollHero onOpenBooking={onOpenBooking} />

      {/* 2. Enterprise Performance & Reliability Metrics Bar */}
      <section 
        ref={statsRef}
        className="relative z-30 bg-slate-900 text-white py-14 border-y border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight flex items-baseline">
                  <AnimatedCounter 
                    target={stat.numericValue ?? parseFloat(stat.value)} 
                    decimals={stat.decimals || 0} 
                    trigger={isStatsInView} 
                  />
                  <span className="text-emerald-400 text-2xl ml-0.5 font-bold">{stat.suffix}</span>
                  {stat.indicator && (
                    <span className="text-emerald-400 text-xl ml-1 font-bold">{stat.indicator}</span>
                  )}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200">
                  {stat.label}
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Enterprise Partner Logo Wall */}
      <section className="py-16 bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <p className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
            Trusted By Leading Companies
          </p>
        </div>

        {/* Continuous Horizontal Motion Marquee */}
        <div className="relative w-full overflow-hidden">
          {/* Edge fade gradients for seamless visual entry/exit */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          <motion.div
            className="flex gap-6 min-w-max items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              ease: 'linear',
              duration: 28,
              repeat: Infinity,
            }}
          >
            {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
              <div
                key={idx}
                className="w-52 sm:w-60 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-slate-100/60 transition-all duration-300 flex flex-col items-center justify-center flex-shrink-0 group cursor-default select-none shadow-xs"
              >
                <span className="font-black text-base sm:text-lg tracking-wider text-slate-700 group-hover:text-slate-950 transition-colors font-sans">
                  {partner.logo}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                  {partner.industry}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Interactive Curved Feature Showcase with Common LED Wall & Pinned Scroll Progress */}
      <InteractiveCurvedFeatureShowcase onOpenBooking={onOpenBooking} />

      {/* 5. Pricing Plans Preview (Transparent, High-Velocity Workspaces) - Modern Bento Grid Redesign */}
      <BentoPricingSection onOpenBooking={onOpenBooking} />

      {/* 5. Interactive Workspace Journey & Infrastructure Explorer */}
      <InfrastructureExplorer onOpenBooking={onOpenBooking} />

      {/* 6. Continuous Animated Enterprise Testimonials */}
      <AnimatedTestimonialsSection />

      {/* 7. Bottom Conversion Banner */}
      <section className="py-20 lg:py-24 bg-white text-slate-900 relative overflow-hidden border-t border-slate-200/80">
        {/* Subtle Decorative Ambient Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-slate-100/70 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 45, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <motion.h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Schedule a Private Executive Walkthrough Today
            </motion.h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Tour the architectural suites, test our 10 Gbps redundant fiber speeds in person, and enjoy specialty single-origin espresso on us.
          </motion.p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-2xl text-sm tracking-wide shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Consultation / Tour</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/tour"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 font-bold rounded-2xl text-sm transition-all shadow-xs hover:shadow-sm"
            >
              Explore 4K Virtual Tour First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
