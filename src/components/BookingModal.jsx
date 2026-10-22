import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Users, CheckCircle2, Building, Sparkles, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LOCATIONS } from '../data/mockData';

export default function BookingModal({ isOpen, onClose, initialWorkspace = 'Private Suite' }) {
  const [step, setStep] = useState(1);
  const [workspaceType, setWorkspaceType] = useState(initialWorkspace);
  const [teamSize, setTeamSize] = useState('6-15');
  const [location, setLocation] = useState(LOCATIONS[0].city);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Sync initialWorkspace when it changes
  useEffect(() => {
    if (initialWorkspace) {
      setWorkspaceType(initialWorkspace);
    }
  }, [initialWorkspace]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Available realistic time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:30 AM',
    '01:30 PM', '03:00 PM', '04:30 PM', '05:30 PM'
  ];

  const workspaceOptions = [
    { id: 'Hot Desk', name: 'Day Pass / Hot Desk', desc: 'Flexible single seats & café access' },
    { id: 'Dedicated Desk', name: 'Dedicated Desk', desc: 'Permanent desk in shared executive wing' },
    { id: 'Private Suite', name: 'Private Team Suite', desc: 'Glass-enclosed 4–20 seat private office' },
    { id: 'Enterprise Floor', name: 'Enterprise Custom Floor', desc: 'Custom bespoke floor (25–200+)' },
  ];

  const teamSizes = ['1 (Individual)', '2–5 Seats', '6–15 Seats', '16–50 Seats', '50+ Enterprise'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Fire confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#2563EB', '#0F172A', '#34D399']
      });
    } catch {
      // Fallback if canvas is not ready
    }
  };

  const handleDownloadCalendarInvite = () => {
    // Generate clean .ics format string
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NEXUS Workspaces//VIP Private Tour//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:NEXUS Workspaces VIP Private Tour (${workspaceType})
DESCRIPTION:VIP walkthrough & architectural onboarding at NEXUS ${location}. Hosted by Lead Concierge.
LOCATION:${location} - NEXUS Enterprise Hub
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `NEXUS-Tour-${location}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 my-8">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-5 sm:px-8 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <p className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                VIP Private Tour & Strategy Session
              </p>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">
              Experience NEXUS Workspaces
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Workspace Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  1. Select Target Workspace Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {workspaceOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setWorkspaceType(opt.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all ${
                        workspaceType === opt.id
                          ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-900">{opt.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Size & Hub Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    2. Approximate Team Size
                  </label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  >
                    {teamSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    3. Target Metropool Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc.city} value={loc.city}>
                        {loc.city} ({loc.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  4. Select Preferred Tour Date & Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-wrap gap-1.5">
                    {timeSlots.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedTime === time
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

              {/* Contact Information */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  5. Point of Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Corporate Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Company Name *"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Direct Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <textarea
                    rows={2}
                    placeholder="Specific technical requirements or questions (e.g. 10G VLAN, server rack space, move-in timeline)..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-brand-500 resize-none"
                  />
                </div>
              </div>

              {/* Guarantees & Submit */}
              <div className="pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complimentary barista coffee during visit. NDA and confidentiality guaranteed.</span>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-sm tracking-wide shadow-md transition-all flex items-center gap-2 group"
                  >
                    <span>Confirm VIP Walkthrough</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Confirmation State with Calendar Preview */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                  Tour Confirmed for {formData.fullName || 'VIP Guest'}!
                </h4>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  A personalized calendar invite and digital security clearance pass have been dispatched to{' '}
                  <span className="font-semibold text-slate-900">{formData.email}</span>.
                </p>
              </div>

              {/* Calendar Pass Card */}
              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    VIP Pass Credentials
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    CONFIRMED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Workspace:</span>
                    <span className="font-semibold text-slate-900">{workspaceType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Team Size:</span>
                    <span className="font-semibold text-slate-900">{teamSize}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date & Time:</span>
                    <span className="font-semibold text-slate-900">{selectedDate} @ {selectedTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Location:</span>
                    <span className="font-semibold text-slate-900">NEXUS {location}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleDownloadCalendarInvite}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-brand-400" />
                    <span>Download Calendar Pass (.ics)</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm transition-colors"
                >
                  Close & Return to Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
