import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

export default function BentoPricingSection({ onOpenBooking }) {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activePlanId, setActivePlanId] = useState('dedicated-desk');

  const plans = {
    dayPass: PRICING_PLANS.find(p => p.id === 'day-pass'),
    dedicated: PRICING_PLANS.find(p => p.id === 'dedicated-desk'),
    teamSuite: PRICING_PLANS.find(p => p.id === 'team-suite'),
    enterprise: PRICING_PLANS.find(p => p.id === 'enterprise-floor')
  };

  const getPrice = (plan) => {
    if (!plan || plan.monthlyPrice === null) return 'Custom Quote';
    const val = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="py-10 lg:py-14 bg-white text-slate-900 relative overflow-hidden border-y border-slate-100 min-h-screen flex flex-col justify-center">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* CENTER-ALIGNED HEADER & BILLING TOGGLE */}
        <div className="text-center mb-8 sm:mb-10 overflow-hidden">
          {/* Smooth hardware-accelerated masked entrance animation */}
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity, filter' }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.08] max-w-3xl mx-auto"
            >
              Transparent, High-Velocity Workspaces
            </motion.h2>
          </div>

          {/* Monthly / Annual Billing Toggle Switch directly below heading with smooth upward snap */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 shadow-inner"
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                billingCycle === 'yearly'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-white text-slate-950 shadow-sm border border-slate-200">
                Save 20%
              </span>
            </button>
          </motion.div>
        </div>

        {/* BENTO GRID (Optimized compact heights to fit within single screen viewport) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* ================= CARD 1: TALL LEFT CARD (Day Pass & Hot Desk) ================= */}
          <div
            onClick={() => setActivePlanId('day-pass')}
            className={`lg:col-span-4 relative rounded-[28px] overflow-hidden min-h-[380px] lg:min-h-full flex flex-col justify-between p-6 sm:p-7 text-white cursor-pointer group shadow-lg transition-all duration-500 ${
              activePlanId === 'day-pass' ? 'ring-2 ring-slate-950 shadow-2xl' : 'hover:shadow-xl'
            }`}
          >
            {/* Background Image with Dark Scrim */}
            <img 
              src={plans.dayPass.image} 
              alt={plans.dayPass.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-slate-950/70" />

            {/* Top Area: Title & Arrow */}
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <motion.h3 
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xl sm:text-2xl font-black text-white tracking-tight"
                >
                  {plans.dayPass.name}
                </motion.h3>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-slate-950 flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Features Checklist with staggered text reveal */}
            <div className="relative z-10 space-y-2.5 my-auto py-3">
              {plans.dayPass.features.map((feat, fIdx) => (
                <motion.div 
                  key={fIdx}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: 0.15 + fIdx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-200"
                >
                  <div className="w-3.5 h-3.5 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <span className="font-medium">{feat}</span>
                </motion.div>
              ))}
            </div>

            {/* Bottom: Pricing & CTA Button */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-end justify-between">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {getPrice(plans.dayPass)}
                </div>
                <div className="text-[10px] text-slate-300 font-mono mt-0.5">
                  / seat / month
                </div>
              </motion.div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenBooking && onOpenBooking(plans.dayPass.workspaceType);
                }}
                className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95"
              >
                {plans.dayPass.cta}
              </button>
            </div>
          </div>

          {/* ================= RIGHT CLUSTER: 1 WIDE TOP CARD + 2 BOTTOM CARDS ================= */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* ----- CARD 2: WIDE TOP CARD (Dedicated Desk) ----- */}
            <div
              onClick={() => setActivePlanId('dedicated-desk')}
              className={`relative rounded-[28px] overflow-hidden text-white p-6 sm:p-7 cursor-pointer group shadow-lg transition-all duration-500 border border-slate-900 min-h-[200px] flex flex-col justify-between ${
                activePlanId === 'dedicated-desk' ? 'ring-2 ring-slate-950 shadow-2xl' : 'hover:shadow-xl'
              }`}
            >
              {/* Background Dedicated Desk Image with Rich Dark Gradient Scrim */}
              <img 
                src={plans.dedicated.image} 
                alt={plans.dedicated.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/70" />

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <motion.h3 
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl sm:text-2xl font-black text-white tracking-tight"
                  >
                    {plans.dedicated.name}
                  </motion.h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-slate-950 flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* 4 Feature Checklist Items */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 py-2.5 my-1">
                {plans.dedicated.features.map((feat, fIdx) => (
                  <motion.div 
                    key={fIdx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.12 + fIdx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-200"
                  >
                    <div className="w-3.5 h-3.5 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                      <div className="w-1 rounded-full bg-white h-1" />
                    </div>
                    <span className="truncate">{feat}</span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom: Price & Button */}
              <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-end justify-between">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {getPrice(plans.dedicated)}
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono mt-0.5">
                    / seat / month
                  </div>
                </motion.div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenBooking && onOpenBooking(plans.dedicated.workspaceType);
                  }}
                  className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95"
                >
                  {plans.dedicated.cta}
                </button>
              </div>
            </div>

            {/* ----- BOTTOM TWO CARDS (Private Team Suite & Enterprise Custom Floor) ----- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* CARD 3: Private Team Suite */}
              <div
                onClick={() => setActivePlanId('team-suite')}
                className={`relative rounded-[28px] overflow-hidden text-white p-5 sm:p-6 cursor-pointer group transition-all duration-500 flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-xl border border-slate-900 ${
                  activePlanId === 'team-suite' ? 'ring-2 ring-slate-950 shadow-2xl' : ''
                }`}
              >
                {/* Background Image */}
                <img 
                  src={plans.teamSuite.image} 
                  alt={plans.teamSuite.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-slate-950/70" />

                <div className="flex items-start justify-between relative z-10">
                  <motion.h4 
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight"
                  >
                    {plans.teamSuite.name}
                  </motion.h4>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-slate-950 flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors shrink-0 ml-2">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Features Mini Checklist */}
                <div className="relative z-10 space-y-1.5 py-1 my-1">
                  {plans.teamSuite.features.slice(0, 2).map((feat, fIdx) => (
                    <motion.div 
                      key={fIdx}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: 0.15 + fIdx * 0.05 }}
                      className="flex items-center gap-2 text-xs text-slate-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      <span className="truncate">{feat}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-2.5 border-t border-white/10 flex items-end justify-between relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                  >
                    <div className="text-xl sm:text-2xl font-black text-white">
                      {getPrice(plans.teamSuite)}
                    </div>
                    <div className="text-[9px] text-slate-300 font-mono">
                      starting base (4 seats)
                    </div>
                  </motion.div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking && onOpenBooking(plans.teamSuite.workspaceType);
                    }}
                    className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    {plans.teamSuite.cta}
                  </button>
                </div>
              </div>

              {/* CARD 4: Enterprise Custom Floor */}
              <div
                onClick={() => setActivePlanId('enterprise-floor')}
                className={`relative rounded-[28px] overflow-hidden text-white p-5 sm:p-6 cursor-pointer group transition-all duration-500 flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-xl border border-slate-900 ${
                  activePlanId === 'enterprise-floor' ? 'ring-2 ring-slate-950 shadow-2xl' : ''
                }`}
              >
                {/* Background Image */}
                <img 
                  src={plans.enterprise.image} 
                  alt={plans.enterprise.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-slate-950/70" />

                <div className="flex items-start justify-between relative z-10">
                  <motion.h4 
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight"
                  >
                    {plans.enterprise.name}
                  </motion.h4>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-slate-950 flex items-center justify-center backdrop-blur-md border border-white/20 transition-colors shrink-0 ml-2">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Features Mini Checklist */}
                <div className="relative z-10 space-y-1.5 py-1 my-1">
                  {plans.enterprise.features.slice(0, 2).map((feat, fIdx) => (
                    <motion.div 
                      key={fIdx}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: 0.15 + fIdx * 0.05 }}
                      className="flex items-center gap-2 text-xs text-slate-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                      <span className="truncate">{feat}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-2.5 border-t border-white/10 flex items-end justify-between relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                  >
                    <div className="text-xl sm:text-2xl font-black text-white">
                      Custom Quote
                    </div>
                    <div className="text-[9px] text-slate-300 font-mono">
                      25–200+ personnel
                    </div>
                  </motion.div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBooking && onOpenBooking(plans.enterprise.workspaceType);
                    }}
                    className="bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    {plans.enterprise.cta}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
