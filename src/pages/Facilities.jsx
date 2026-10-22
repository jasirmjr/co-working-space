import React, { useState } from 'react';
import { FACILITIES } from '../data/mockData';
import { 
  Wifi, 
  ShieldCheck, 
  Armchair, 
  Headphones, 
  Coffee, 
  Server, 
  Download, 
  Check, 
  Sparkles, 
  Layers, 
  FileText, 
  Maximize2, 
  X,
  Calendar,
  ArrowRight
} from 'lucide-react';

export default function Facilities({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false);
  const [activeFloorLevel, setActiveFloorLevel] = useState('Level 24 (Executive Suites & Boardrooms)');

  const iconMap = {
    Wifi,
    ShieldCheck,
    Armchair,
    Headphones,
    Coffee,
    Server,
  };

  const categories = ['All', 'Network & Infrastructure', 'Access & Governance', 'Physical Well-Being', 'Focus & Media', 'Culinary & Wellness', 'Hardware & Edge Compute'];

  const filteredFacilities = activeCategory === 'All'
    ? FACILITIES
    : FACILITIES.filter(f => f.category === activeCategory);

  const handleDownloadFloorPlan = () => {
    // Generate dummy floor plan text or SVG trigger
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#0F172A"/>
      <text x="400" y="80" fill="#10B981" font-size="24" font-family="sans-serif" text-anchor="middle" font-weight="bold">NEXUS WORKSPACES - ARCHITECTURAL BLUEPRINT</text>
      <text x="400" y="115" fill="#94A3B8" font-size="14" font-family="sans-serif" text-anchor="middle">Level 24 Executive Suite & Soundproof Boardrooms (1:100 Scale)</text>
      <rect x="50" y="150" width="700" height="400" fill="none" stroke="#334155" stroke-width="2"/>
      <rect x="80" y="180" width="180" height="150" fill="#1E293B" stroke="#10B981" stroke-width="1.5"/>
      <text x="170" y="260" fill="#E2E8F0" font-size="14" text-anchor="middle">Executive Suite A</text>
      <rect x="290" y="180" width="220" height="150" fill="#1E293B" stroke="#2563EB" stroke-width="1.5"/>
      <text x="400" y="260" fill="#E2E8F0" font-size="14" text-anchor="middle">Acoustic Boardroom</text>
      <rect x="540" y="180" width="180" height="150" fill="#1E293B" stroke="#10B981" stroke-width="1.5"/>
      <text x="630" y="260" fill="#E2E8F0" font-size="14" text-anchor="middle">Executive Suite B</text>
      <rect x="80" y="360" width="640" height="160" fill="#1E293B" stroke="#64748B" stroke-width="1.5"/>
      <text x="400" y="445" fill="#E2E8F0" font-size="14" text-anchor="middle">Open Collaborative Commons & La Marzocco Barista Hub</text>
    </svg>`;

    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NEXUS-Architectural-Floor-Plan-L24.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-28 pb-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Infrastructure & Specifications</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Engineered For Zero Friction, Maximum Focus
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Examine our high-density network architecture, acoustic engineering standards, and medical-grade indoor air systems designed to support top-tier corporate tenants.
          </p>

          {/* Action Row: Floor Plan & Consultation */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowFloorPlanModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <FileText className="w-4 h-4 text-brand-400" />
              <span>Inspect Floor Plans & Blueprints</span>
            </button>
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Architecture Walkthrough</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility) => {
            const Icon = iconMap[facility.icon] || Wifi;
            return (
              <div
                key={facility.id}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 text-brand-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                      {facility.badge}
                    </span>
                  </div>

                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
                    {facility.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                    {facility.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {facility.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Technical Specifications:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {facility.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floor Plan Banner */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-400">
              Turnkey Space Planning
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Need a Custom 1:100 Architectural Layout for Your Team?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our workplace architects can configure private acoustic pods, dedicated IT server racks, and internal executive breakout spaces tailored to your team size.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setShowFloorPlanModal(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Maximize2 className="w-4 h-4 text-brand-400" />
              <span>Open Blueprint Viewer</span>
            </button>
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Consult an Architect</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Floor Plan Modal */}
      {showFloorPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setShowFloorPlanModal(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 z-10 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Architectural Blueprint Viewer
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  NEXUS Level 24 & Level 25 Floor Plans
                </h3>
              </div>
              <button
                onClick={() => setShowFloorPlanModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Level Selector */}
            <div className="flex gap-2 my-4">
              {[
                'Level 24 (Executive Suites & Boardrooms)',
                'Level 25 (Open Collaboration & Event Lounge)',
                'Level 26 (Enterprise 50-Seat Custom Campus)'
              ].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveFloorLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeFloorLevel === lvl
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Blueprint Visual Rendering */}
            <div className="bg-slate-950 rounded-2xl p-6 text-white my-4 relative overflow-hidden border border-slate-800 aspect-[16/9] flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              
              <div className="relative z-10 text-center space-y-3 p-4">
                <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono">
                  SCALE: 1:100 • REV 4.2 COMPLIANT
                </div>
                <div className="text-lg font-bold text-white">
                  {activeFloorLevel}
                </div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Featuring dual core elevator access, independent server colocation, soundproof STC-48 glass partition wings, and fire suppression system.
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-[11px] text-slate-300 border border-slate-800">
                    Gross Area: 14,800 sq.ft
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-[11px] text-slate-300 border border-slate-800">
                    Max Capacity: 140 Desks
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Official CAD/BIM architectural package available upon signing NDA.
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDownloadFloorPlan}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-brand-400" />
                  <span>Download Blueprint (.SVG / Vector)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
