import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION_LINKS, COMPANY_INFO } from '../data/mockData';
import { Calendar, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Navbar is only visible in the starting section of all pages (top of the page)
      const isAtStartingSection = window.scrollY < 80;
      setIsVisible(isAtStartingSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When changing pages, reset mobile menu and ensure navbar is visible at the starting section
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsVisible(true);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
          isVisible || mobileMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
          <nav className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-black tracking-tight text-base sm:text-lg leading-none font-sans text-slate-950">
                NEXUS
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAVIGATION_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-950 text-white shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/90'
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
                className="group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 shadow-xs hover:shadow-sm active:scale-95 bg-slate-950 hover:bg-slate-800 text-white"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Tour</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl transition-colors text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-slate-950/60 backdrop-blur-md transition-opacity">
          <div className="fixed inset-x-4 top-20 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xl text-slate-900">
            <div className="flex flex-col gap-1.5">
              {NAVIGATION_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-950 text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-slate-950 text-white font-bold rounded-xl text-center text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Private Tour</span>
              </button>
              <div className="text-center text-xs text-slate-500">
                Direct concierge: {COMPANY_INFO.phone}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
