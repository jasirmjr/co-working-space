import React, { useState } from 'react';
import { VIRTUAL_TOUR_ZONES } from '../data/mockData';
import { Sparkles, Eye, Info, Check, Calendar, ArrowRight, Maximize2, Compass, Shield } from 'lucide-react';

export default function VirtualTour({ onOpenBooking }) {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const currentZone = VIRTUAL_TOUR_ZONES[activeZoneIndex];

  return (
    <div className="pt-28 pb-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Space Explorer</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Virtual 4K Architectural Tour
            </h1>
            <p className="text-slate-600 text-base mt-2">
              Explore key functional zones across our flagship headquarters. Click the pulsing interactive hotspots to inspect acoustic, technological, and architectural details.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all self-start md:self-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Real-Life In-Person Tour</span>
          </button>
        </div>

        {/* Zone Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {VIRTUAL_TOUR_ZONES.map((zone, idx) => (
            <button
              key={zone.id}
              onClick={() => {
                setActiveZoneIndex(idx);
                setActiveHotspot(null);
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-bold tracking-wide whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeZoneIndex === idx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activeZoneIndex === idx ? 'bg-brand-400' : 'bg-slate-300'}`} />
              <span>{zone.name}</span>
            </button>
          ))}
        </div>

        {/* Interactive Viewport Canvas / Image */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl mb-8 group aspect-[16/10] sm:aspect-[16/9]">
          {/* Background Zone Image */}
          <img
            src={currentZone.image}
            alt={currentZone.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />

          {/* Dark Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

          {/* Interactive Hotspots */}
          {currentZone.hotspots.map((hotspot, hIdx) => {
            const isSelected = activeHotspot === hIdx;
            return (
              <div
                key={hIdx}
                style={{ left: hotspot.x, top: hotspot.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Pulsing Pin */}
                <button
                  onClick={() => setActiveHotspot(isSelected ? null : hIdx)}
                  className={`relative p-3 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-brand-500 text-slate-950 scale-125 ring-4 ring-brand-500/40'
                      : 'bg-slate-900/90 text-white hover:bg-brand-500 hover:text-slate-950 shadow-lg border border-white/20'
                  }`}
                  aria-label={hotspot.title}
                >
                  <span className="absolute -inset-1 rounded-full bg-brand-400/30 animate-ping pointer-events-none" />
                  <Info className="w-4 h-4" />
                </button>

                {/* Hotspot Popover Tooltip */}
                {isSelected && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-700 text-white p-4 rounded-2xl shadow-2xl z-30 animate-fadeIn">
                    <div className="text-[10px] font-black uppercase tracking-wider text-brand-400 mb-1">
                      Engineered Spec
                    </div>
                    <div className="font-bold text-sm text-white mb-1">
                      {hotspot.title}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {hotspot.desc}
                    </p>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-900" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom Bar Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
            <div className="max-w-xl bg-slate-950/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 pointer-events-auto">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {currentZone.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-brand-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                {currentZone.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentZone.description}
              </p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs text-slate-300 pointer-events-auto flex items-center gap-2">
              <Eye className="w-4 h-4 text-brand-400" />
              <span>Tap glowing pins to inspect amenities</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {VIRTUAL_TOUR_ZONES.map((zone, idx) => (
            <button
              key={zone.id}
              onClick={() => {
                setActiveZoneIndex(idx);
                setActiveHotspot(null);
              }}
              className={`rounded-2xl overflow-hidden border text-left transition-all p-2 bg-white ${
                activeZoneIndex === idx
                  ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <img
                src={zone.image}
                alt={zone.name}
                className="w-full h-24 object-cover rounded-xl mb-2"
              />
              <div className="font-bold text-xs text-slate-900 truncate">
                {zone.name}
              </div>
              <div className="text-[10px] text-slate-500">
                {zone.tags[0]}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
