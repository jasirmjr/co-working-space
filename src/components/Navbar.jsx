import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION_LINKS, COMPANY_INFO } from '../data/mockData';
import { Building2, Calendar, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-2 left-0 right-0 z-50 px-3 sm:px-4 flex justify-center pointer-events-none">
        <div className="w-full max-w-4xl pointer-events-auto">
          <nav
            className="flex items-center justify-between px-3 py-1 sm:px-4 sm:py-1 rounded-full border bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-sm text-slate-900"
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 group pl-1">
              <span className="font-extrabold tracking-tight text-xs leading-none font-sans text-slate-900">
                NEXUS
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAVIGATION_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-tight transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => onOpenBooking()}
                className="group flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight transition-all duration-300 shadow-xs hover:shadow-sm active:scale-95 bg-slate-900 hover:bg-slate-800 text-white"
              >
                <Calendar className="w-3 h-3" />
                <span>Book a Tour</span>
                <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 rounded-full transition-colors text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-slate-950/60 backdrop-blur-md transition-opacity">
          <div className="fixed inset-x-4 top-20 bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-white">
            <div className="flex flex-col gap-2">
              {NAVIGATION_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-brand-500 text-slate-950 font-bold rounded-xl text-center text-sm flex items-center justify-center gap-2 hover:bg-brand-400"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Private Tour</span>
              </button>
              <div className="text-center text-xs text-slate-400">
                Direct concierge: {COMPANY_INFO.phone}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
