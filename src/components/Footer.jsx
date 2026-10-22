import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/mockData';
import { Building2, Mail, Phone, MapPin, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand & Vision */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 text-slate-950 flex items-center justify-center font-bold text-lg shadow-sm">
                <Building2 className="w-5 h-5 text-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-white text-lg leading-none font-sans">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-brand-400">
                  Enterprise Workspaces
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Architectural luxury, soundproof executive suites, and 10 Gbps redundant fiber infrastructure designed for high-performance scale-ups and Fortune 500 regional headquarters.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-brand-400" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>28 Global Hubs</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Global HQ: 375 Park Avenue, 24th Floor, New York, NY 10152</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Concierge: {COMPANY_INFO.phone} (24/7 Enterprise Priority)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Corporate Inquiries: {COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Workspace Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/plans" className="hover:text-brand-400 transition-colors">
                  Day Passes & Hot Desks
                </Link>
              </li>
              <li>
                <Link to="/plans" className="hover:text-brand-400 transition-colors">
                  Dedicated Desks
                </Link>
              </li>
              <li>
                <Link to="/plans" className="hover:text-brand-400 transition-colors">
                  Private Team Suites (4-20)
                </Link>
              </li>
              <li>
                <Link to="/plans" className="hover:text-brand-400 transition-colors">
                  Enterprise Custom Floors
                </Link>
              </li>
              <li>
                <Link to="/tour" className="hover:text-brand-400 transition-colors">
                  4K Virtual Room Tour
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-brand-400 transition-colors">
                  Acoustic Boardrooms
                </Link>
              </li>
            </ul>
          </div>

          {/* Infrastructure & Compliance */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Enterprise Tech & Specs
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/facilities" className="hover:text-brand-400 transition-colors">
                  10 Gbps Redundant Wi-Fi
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-brand-400 transition-colors">
                  Biometric Access Protocols
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-brand-400 transition-colors">
                  Herman Miller Ergonomics
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-brand-400 transition-colors">
                  Climate-Controlled Server Colocation
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-brand-400 transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking()}
                  className="hover:text-brand-400 transition-colors text-left"
                >
                  Schedule Private Walkthrough
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Operating Hours */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Enterprise Advisory
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Receive quarterly workplace intelligence reports and exclusive executive suite availability.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="corporate.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 pr-10 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-2 bg-brand-500 hover:bg-brand-400 text-slate-950 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs mt-1 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed! Check your inbox soon.</span>
                </div>
              )}
            </form>

            <div className="mt-6 pt-5 border-t border-slate-900 text-xs text-slate-400">
              <p className="font-semibold text-slate-300 mb-1">Operational Hours</p>
              <p>Keycard Members: 24/7/365 Unlimited Access</p>
              <p>Concierge & Barista: Mon–Fri, 7:30 AM – 7:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name} Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Privacy Shield Policy
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Enterprise Terms of Service
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              SOC 2 Type II Report
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Security & Compliance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
