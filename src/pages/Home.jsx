import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView, motion } from 'framer-motion';
import ScrollHero from '../components/ScrollHero';
import InfrastructureExplorer from '../components/InfrastructureExplorer';
import InteractiveCurvedFeatureShowcase from '../components/InteractiveCurvedFeatureShowcase';
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

      {/* 5. Pricing Plans Preview (Transparent, High-Velocity Workspaces) */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        {/* Subtle radial ambient backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/5 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            
            {/* High-speed falling down text drop animation with dynamic bounce settle */}
            <motion.div
              initial={{ opacity: 0, y: -90, scale: 1.08, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                type: 'spring',
                damping: 18,
                stiffness: 140,
                mass: 0.8
              }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] drop-shadow-sm">
                Transparent, High-Velocity Workspaces
              </h2>
            </motion.div>

            {/* Monthly / Annual Billing Toggle with quick upward snap */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 inline-flex items-center p-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-md"
            >
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 text-white">
                  Save 20%
                </span>
              </button>
            </motion.div>
          </div>

          {/* Interactive Pricing Cards Grid - Expanded Width & Ultra-Smooth Horizontal Glide */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {PRICING_PLANS.map((plan, idx) => {
              const isSelected = selectedPlanId === plan.id;
              const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

              // Ultra-smooth horizontal glide from sides:
              // Left cards (0 & 1) glide smoothly from left (-180px, -90px)
              // Right cards (2 & 3) glide smoothly from right (+90px, +180px)
              const isLeft = idx < 2;
              const startX = idx === 0 ? -180 : idx === 1 ? -90 : idx === 2 ? 90 : 180;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ 
                    opacity: 0, 
                    x: startX
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0
                  }}
                  viewport={{ once: false, amount: "some" }}
                  transition={{ 
                    duration: 0.95,
                    ease: [0.22, 1, 0.36, 1], // silky-smooth natural deceleration curve
                    delay: (isLeft ? idx : 3 - idx) * 0.1
                  }}
                  whileHover={{ 
                    y: isSelected ? -8 : -5,
                    transition: { duration: 0.25 }
                  }}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer relative border transition-shadow duration-300 group ${
                    isSelected
                      ? 'bg-slate-900/95 border-white ring-2 ring-white/20 shadow-[0_16px_45px_rgba(255,255,255,0.12)]'
                      : 'bg-slate-900/40 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div>
                    {/* Category Architectural Image Banner - Increased Height */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                          isSelected ? 'scale-108 brightness-105' : 'scale-100 brightness-85 group-hover:scale-105 group-hover:brightness-95'
                        }`}
                      />
                     
                      {/* Category Label Pill floating on top */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md ${
                          isSelected 
                            ? 'bg-white text-slate-950 shadow-md' 
                            : 'bg-slate-950/70 text-slate-200 border border-white/10'
                        }`}>
                          {plan.name}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 pb-2">
                      {/* Price in Indian Rupees */}
                      <div className="mb-4">
                        {price ? (
                          <div className="flex items-baseline">
                            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                              ₹{price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-slate-400 ml-1.5 font-medium">/ seat / mo</span>
                          </div>
                        ) : (
                          <div className="text-3xl font-black text-white">
                            Custom Quote
                          </div>
                        )}
                      </div>

                      {/* Concise Feature Checklist */}
                      <ul className="space-y-2.5 text-xs text-slate-300 mb-6 border-t border-slate-800/80 pt-4">
                        {plan.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <Check className={`w-3.5 h-3.5 shrink-0 ${
                              isSelected ? 'text-white' : 'text-slate-500 group-hover:text-white'
                            }`} />
                            <span className="truncate">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-5 sm:p-6 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlanId(plan.id);
                        onOpenBooking(plan.workspaceType);
                      }}
                      className={`w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-white hover:bg-slate-100 text-slate-950 shadow-md active:scale-95'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
                      }`}
                    >
                      <span>{plan.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-emerald-400 transition-colors group"
            >
              <span>Compare all features & annual 20% discounts</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Interactive Workspace Journey & Infrastructure Explorer */}
      <InfrastructureExplorer onOpenBooking={onOpenBooking} />

      {/* 6. Featured Member Testimonial */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs font-bold text-slate-900 ml-2">
                5.0 • Verified Enterprise Tenant
              </span>
            </div>
            <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              "{TESTIMONIALS[0].quote}"
            </blockquote>
            <div className="flex items-center gap-4 pt-2">
              <img
                src={TESTIMONIALS[0].image}
                alt={TESTIMONIALS[0].name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
              />
              <div>
                <div className="font-extrabold text-slate-900 text-sm">
                  {TESTIMONIALS[0].name}
                </div>
                <div className="text-xs text-slate-500">
                  {TESTIMONIALS[0].role}, <span className="font-semibold text-slate-800">{TESTIMONIALS[0].company}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 space-y-4">
            <div className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">
              Quantified Impact
            </div>
            <div className="text-3xl font-black text-emerald-600">
              {TESTIMONIALS[0].metrics}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {TESTIMONIALS[0].highlight}
            </p>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-brand-600 transition-colors pt-2"
            >
              <span>Read Full Case Study</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Bottom Conversion Banner */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold uppercase tracking-wider">
            Ready to upgrade your company's headquarters?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Schedule a Private Executive Walkthrough Today
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Tour the architectural suites, test our 10 Gbps redundant fiber speeds in person, and enjoy specialty single-origin espresso on us.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold rounded-2xl text-sm tracking-wide shadow-glow transition-all flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Consultation / Tour</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/tour"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl text-sm transition-all"
            >
              Explore 4K Virtual Tour First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
