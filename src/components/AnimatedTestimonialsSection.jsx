import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export default function AnimatedTestimonialsSection() {
  const [isPlaying] = useState(true);

  // Duplicate items for continuous seamless infinite loop
  const loopItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-[#F8F9FA]">
      <style>{`
        @keyframes scrollTestimonialsLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        .testimonials-track {
          animation: scrollTestimonialsLeft 38s linear infinite;
        }
        .testimonials-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* SECTION HEADER: CENTER ALIGNED WITH SCROLL ANIMATION (RE-TRIGGERS EACH SCROLL) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 45, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity, filter' }}
          className="space-y-3"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.1] max-w-3xl mx-auto"
          >
            Trusted by Leaders, Proven by Impact
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Real feedback and quantified outcomes from engineering executives, venture partners, and high-growth teams at NEXUS.
          </motion.p>
        </motion.div>
      </div>

      {/* CONTINUOUS MOVING CAROUSEL TRACK */}
      <div className="relative w-full overflow-hidden">
        
        {/* Soft edge gradient fades for seamless entry & exit */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 bg-gradient-to-r from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 lg:w-40 bg-gradient-to-l from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent z-10 pointer-events-none" />

        {/* The Animated Ribbon */}
        <div
          className="testimonials-track flex gap-5 sm:gap-6 w-max py-4 px-4"
          style={{
            animationPlayState: isPlaying ? 'running' : 'paused'
          }}
        >
          {loopItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[300px] sm:w-[380px] md:w-[420px] shrink-0 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Rating & Verified Tenant Badge */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-[11px] font-bold text-slate-800 ml-1">5.0</span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold text-slate-700">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified Tenant</span>
                  </span>
                </div>

                {/* Quote Text: Reduced and refined size */}
                <blockquote className="text-xs sm:text-[13px] md:text-sm font-medium text-slate-800 leading-relaxed">
                  "{item.quote}"
                </blockquote>
              </div>

              {/* Middle: Quantified Impact Card (compact & clear) */}
              <div className="my-4 bg-slate-50/90 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-slate-200/70">
                <div className="text-[9px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                  Quantified Impact
                </div>
                <div className="text-base sm:text-lg font-black text-slate-950 mt-0.5 tracking-tight">
                  {item.metrics}
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-normal">
                  {item.highlight}
                </p>
              </div>

              {/* Bottom: Tenant Profile & Case Study link */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 shadow-sm shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-slate-950 text-xs truncate">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {item.role}, <span className="font-semibold text-slate-700">{item.company}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-900 hover:text-brand-600 transition-colors shrink-0 group"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
