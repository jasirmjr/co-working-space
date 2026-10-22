import React, { useState } from 'react';
import { LOCATIONS, PRICING_PLANS } from '../data/mockData';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Coffee, 
  ArrowRight, 
  Download,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Consultation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceType, setWorkspaceType] = useState('Private Suite');
  const [teamSize, setTeamSize] = useState('6–15 Seats');
  const [targetCity, setTargetCity] = useState(LOCATIONS[0].city);
  const [tourDate, setTourDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [tourTime, setTourTime] = useState('10:00 AM');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    requirements: '',
  });
  const [confirmed, setConfirmed] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:30 AM',
    '01:30 PM', '03:00 PM', '04:30 PM', '05:30 PM'
  ];

  const workspaceOptions = [
    { title: 'Day Pass / Hot Desk', desc: 'Flexible single desks & lounge access', minSeats: '1 seat' },
    { title: 'Dedicated Desk', desc: 'Permanent personal desk in executive wing', minSeats: '1 seat' },
    { title: 'Private Suite', desc: 'Enclosed custom corporate glass suites', minSeats: '4–20 seats' },
    { title: 'Enterprise Floor', desc: 'Full-floor headquarters buildout', minSeats: '25–200+ seats' },
  ];

  const teamSizes = ['1 (Individual)', '2–5 Seats', '6–15 Seats', '16–50 Seats', '50+ Enterprise'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10B981', '#2563EB', '#0F172A', '#34D399']
      });
    } catch {
      // Ignored
    }
  };

  const handleDownloadInvite = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NEXUS Workspaces//Private Consultation//EN
BEGIN:VEVENT
SUMMARY:NEXUS Workspaces Private Consultation (${workspaceType})
DESCRIPTION:VIP walkthrough & architectural onboarding for ${formData.name} at NEXUS ${targetCity}.
LOCATION:NEXUS ${targetCity} Hub
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NEXUS-VIP-Walkthrough-${targetCity}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-28 pb-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Consultation & VIP Onboarding</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Schedule Your Private Executive Walkthrough
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Reserve a dedicated 45-minute architectural tour with our workplace directors. Experience our soundproof suites, verify 10G speeds, and sample single-origin espresso.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Booking Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
              {!confirmed ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Workspace Type */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Step 1: Select Workspace Solution
                      </span>
                      <span className="text-xs font-semibold text-emerald-600">
                        {workspaceType}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {workspaceOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt.title}
                          onClick={() => setWorkspaceType(opt.title)}
                          className={`text-left p-4 rounded-2xl border transition-all ${
                            workspaceType === opt.title
                              ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="font-bold text-sm text-slate-900">{opt.title}</div>
                          <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                          <div className="text-[11px] font-semibold text-slate-400 mt-2">
                            {opt.minSeats}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Team Size & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Step 2: Approximate Team Size
                      </label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:border-brand-500"
                      >
                        {teamSizes.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Step 3: Preferred City Hub
                      </label>
                      <select
                        value={targetCity}
                        onChange={(e) => setTargetCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:border-brand-500"
                      >
                        {LOCATIONS.map((l) => (
                          <option key={l.city} value={l.city}>{l.city} — {l.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 3: Date & Slot Picker */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Step 4: Select Preferred Date & Available Time Slot
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <input
                          type="date"
                          required
                          value={tourDate}
                          onChange={(e) => setTourDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:border-brand-500"
                        />
                      </div>
                      <div className="sm:col-span-2 flex flex-wrap gap-2">
                        {timeSlots.map((time) => (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setTourTime(time)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                              tourTime === time
                                ? 'bg-slate-900 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Contact Details */}
                  <div className="pt-2 border-t border-slate-100 space-y-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Step 5: Executive Contact Information
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Work Email *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Company / Organization *"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Special requirements (e.g., private server rack space, move-in within 30 days, 20+ desks layout)..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500 resize-none"
                    />
                  </div>

                  {/* Submission */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero obligation. Strict corporate confidentiality maintained.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
                    >
                      <span>Confirm Consultation & Tour</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              ) : (
                /* Confirmed State */
                <div className="py-8 text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Consultation Booked for {formData.name}!
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                      Our lead workplace architect has reserved your session. Confirmation details have been sent to <span className="font-bold text-slate-900">{formData.email}</span>.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">
                      Walkthrough Pass
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">Workspace:</span>
                        <span className="font-semibold text-slate-900">{workspaceType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Team Scale:</span>
                        <span className="font-semibold text-slate-900">{teamSize}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Schedule:</span>
                        <span className="font-semibold text-slate-900">{tourDate} @ {tourTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Hub:</span>
                        <span className="font-semibold text-slate-900">NEXUS {targetCity}</span>
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={handleDownloadInvite}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                      >
                        <Download className="w-4 h-4 text-brand-400" />
                        <span>Download Calendar Invite (.ics)</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setConfirmed(false)}
                    className="px-6 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 underline"
                  >
                    Schedule Another Session
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: What to Expect */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
              <div className="text-xs font-extrabold uppercase tracking-widest text-brand-400">
                What to Expect During Your Visit
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400 shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Full Architectural Access</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tour private suites, acoustic focus booths, podcast studios, and executive boardrooms.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">IT & Network Speed Test</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Connect your laptop directly to our 10 Gbps redundant VLAN backbone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400 shrink-0">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Artisan Barista Experience</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Enjoy specialty espresso crafted to order while discussing customized leasing terms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
                Need immediate same-day assistance? Call our enterprise concierge at <span className="text-white font-bold">+1 (800) 482-9020</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
