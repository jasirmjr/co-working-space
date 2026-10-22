import React, { useState } from 'react';
import { LOCATIONS, FAQS, COMPANY_INFO } from '../data/mockData';
import { MapPin, Phone, Mail, Clock, ChevronDown, ChevronUp, Send, CheckCircle2, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export default function Contact({ onOpenBooking }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    location: LOCATIONS[0].city,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        location: LOCATIONS[0].city,
        message: '',
      });
    }, 5000);
  };

  return (
    <div className="pt-28 pb-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Global Concierge & Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Connect With Our Enterprise Workplace Advisory
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Have questions regarding custom architectural fit-outs, enterprise multi-city agreements, or private server rack colocation? We are here to assist.
          </p>
        </div>

        {/* Form & Contact Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Direct Corporate Inquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                All submissions reviewed by an enterprise managing director within 2 business hours.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Inquiry Received Successfully
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, {formData.name || 'Executive'}. Our corporate team is reviewing your requirements and will reach out shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Acme Technologies"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                        Target City
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-500 bg-white"
                      >
                        {LOCATIONS.map((loc) => (
                          <option key={loc.city} value={loc.city}>
                            {loc.city} ({loc.name})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Direct Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Message & Technical Scope
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Outline your team size, move-in horizon, or custom network architecture specifications..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-500 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Encrypted SSL & NDA Protected</span>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Quick Contact & Operating Hours Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Global Headquarters
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">NEXUS Manhattan Flagship</p>
                    <p className="text-slate-400 text-xs mt-0.5">375 Park Avenue, 24th Floor, New York, NY 10152</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Direct Enterprise Concierge</p>
                    <p className="text-slate-400 text-xs mt-0.5">{COMPANY_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Corporate Communications</p>
                    <p className="text-slate-400 text-xs mt-0.5">{COMPANY_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Access & Staffing</p>
                    <p className="text-slate-400 text-xs mt-0.5">Members: 24/7/365 Biometric Entry</p>
                    <p className="text-slate-400 text-xs">Concierge & Barista: Mon–Fri, 7:30 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full py-3 bg-white text-slate-950 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Schedule Private Tour Directly
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Locations Grid */}
        <div className="mb-20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              International Footprint
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Prime Tier-1 Metropool Locations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((loc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all group"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6">
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-600">
                    {loc.city}
                  </span>
                  <h4 className="font-bold text-slate-900 text-base mt-1 mb-2">
                    {loc.name}
                  </h4>
                  <div className="space-y-1.5 text-xs text-slate-500">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{loc.address}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{loc.phone}</span>
                    </p>
                    <p className="text-[11px] font-semibold text-slate-700 pt-1">
                      Available: {loc.spaces}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Frequently Asked Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Enterprise Lease & Facility Inquiries
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed pr-8 animate-fadeIn">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
