import React, { useState } from 'react';
import { TESTIMONIALS, CASE_STUDY, PARTNERS } from '../data/mockData';
import { Star, ShieldCheck, TrendingUp, Building, ArrowRight, Quote, Sparkles, CheckCircle2, Calendar } from 'lucide-react';

export default function CommunityReviews({ onOpenBooking }) {
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const industries = ['All', 'Generative AI Infrastructure', 'Venture Capital & Growth Equity', 'Enterprise B2B Cloud', 'Banking Technology'];

  const filteredReviews = selectedIndustry === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.industry === selectedIndustry);

  return (
    <div className="pt-28 pb-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Member Intelligence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Loved By High-Growth Scale-Ups & Global Enterprises
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Read verified reviews and quantitative impact reports from CXOs, Engineering Leaders, and Managing Partners operating out of NEXUS Workspaces.
          </p>
        </div>

        {/* Partner Logo Wall */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm mb-16">
          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-6 text-center">
            Prominent Anchor Tenants Across Our Global Hubs
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {PARTNERS.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors text-center"
              >
                <div className="font-black text-base tracking-wider text-slate-800">
                  {p.logo}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  {p.industry}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagship Case Study Showcase */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-20 border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Featured Enterprise Migration Case Study</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {CASE_STUDY.clientName}
              </h2>
              <div className="text-sm font-semibold text-brand-400">
                Scale: {CASE_STUDY.scale}
              </div>

              <div className="space-y-3 pt-2 text-sm text-slate-300 leading-relaxed">
                <div>
                  <span className="font-bold text-white">The Challenge: </span>
                  {CASE_STUDY.challenge}
                </div>
                <div>
                  <span className="font-bold text-white">The NEXUS Solution: </span>
                  {CASE_STUDY.solution}
                </div>
              </div>

              <blockquote className="pt-4 border-t border-slate-800 text-base italic text-slate-200">
                "{CASE_STUDY.quote}"
              </blockquote>
              <div className="text-xs font-bold text-slate-400">
                — {CASE_STUDY.author}
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {CASE_STUDY.results.map((res, rIdx) => (
                <div
                  key={rIdx}
                  className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 hover:border-brand-500/50 transition-colors"
                >
                  <div className="text-2xl font-black text-brand-400 mb-1">
                    {res.metric}
                  </div>
                  <div className="text-xs text-slate-300">
                    {res.detail}
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <button
                  onClick={() => onOpenBooking('Private Suite')}
                  className="w-full py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Similar Custom Suite Migration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Verified Member Testimonials
          </h3>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedIndustry === ind
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        {review.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {review.role}, <span className="font-semibold text-slate-800">{review.company}</span>
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    {review.industry}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">
                    5.0 Verified
                  </span>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Quantified Result</span>
                  <span className="font-extrabold text-emerald-600">{review.metrics}</span>
                </div>
                <div className="text-right text-slate-500 text-[11px]">
                  {review.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-20 text-center bg-white rounded-3xl p-10 border border-slate-200/80 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Ready to join over 450+ forward-thinking organizations?
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            Book an executive consultation and walkthrough with our hospitality directors.
          </p>
          <button
            onClick={() => onOpenBooking()}
            className="px-6 py-3.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Your Team’s Private Walkthrough</span>
          </button>
        </div>
      </div>
    </div>
  );
}
