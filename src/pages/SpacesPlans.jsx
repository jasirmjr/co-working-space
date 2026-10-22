import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, X, Sparkles, Shield, ArrowRight, Calendar, HelpCircle, PhoneCall } from 'lucide-react';

export default function SpacesPlans({ onOpenBooking }) {
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'

  const comparisonFeatures = [
    { name: 'Building Access', hotDesk: '8:00 AM – 8:00 PM', dedicated: '24/7/365 Biometric', suite: '24/7/365 Biometric', enterprise: '24/7 Exclusive Floor Lockout' },
    { name: 'Guaranteed Bandwidth', hotDesk: '1 Gbps Symmetric', dedicated: '2.5 Gbps Redundant', suite: '10 Gbps Redundant', enterprise: '10 Gbps Dark Fiber Direct' },
    { name: 'Private VLAN / IPsec', hotDesk: '—', dedicated: 'Add-on ($50/mo)', suite: 'Included', enterprise: 'Custom Enterprise Subnet' },
    { name: 'Conference Room Credits', hotDesk: '2 hrs / mo', dedicated: '8 hrs / mo', suite: '25 hrs / mo', enterprise: 'Unlimited Executive Boardroom' },
    { name: 'Mail & Package Handling', hotDesk: '—', dedicated: 'Included', suite: 'White-glove Suite Delivery', enterprise: 'Dedicated Corporate Mailroom' },
    { name: 'Barista & Nutrition Bar', hotDesk: 'Included', dedicated: 'Included', suite: 'Included', enterprise: 'Private Catering & Refrigerator' },
    { name: 'Acoustic Phone Booths', hotDesk: 'First-come basis', dedicated: 'Priority Access', suite: 'Dedicated in-suite + Commons', enterprise: 'Bespoke Executive Phone Suites' },
    { name: 'Contract Flexibility', hotDesk: 'Day-to-day or Month', dedicated: 'Month-to-month', suite: '3 to 24 Months', enterprise: 'Custom Multi-Year Enterprise SLA' },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise Space Agreements</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Flexible Plans Tailored For High-Performance Scale
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Select the tier that matches your team’s expansion goals. All memberships feature ultra-fast fiber, Herman Miller seating, and white-glove hospitality.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-white border border-slate-200/90 shadow-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-brand-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 text-white">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 border ${
                  plan.popular
                    ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-xl relative'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-brand-500 text-slate-950 text-[10px] font-black tracking-widest uppercase shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {plan.name}
                    </span>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="mb-6 pt-2 pb-4 border-y border-slate-100">
                    {price ? (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-black text-slate-900 tracking-tight">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-500 ml-1.5 font-medium">
                          / month
                        </span>
                      </div>
                    ) : (
                      <div className="text-3xl font-black text-slate-900">
                        Custom Quote
                      </div>
                    )}
                    <p className="text-[11px] text-slate-500 mt-1">
                      {billingCycle === 'yearly' && price
                        ? 'Billed annually with 20% savings'
                        : plan.periodNote}
                    </p>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-700 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onOpenBooking(plan.workspaceType)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-sm ${
                      plan.popular
                        ? 'bg-brand-500 hover:bg-brand-400 text-slate-950 hover:shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Enterprise Feature Comparison Matrix */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm overflow-hidden mb-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Technical Audit
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Side-by-Side Enterprise Feature Comparison
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Every detail verified by our infrastructure and IT operations team.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 pr-4 font-extrabold text-slate-900 uppercase tracking-wider">Features</th>
                  <th className="py-4 px-4 font-bold text-slate-900">Day Pass</th>
                  <th className="py-4 px-4 font-bold text-slate-900">Dedicated Desk</th>
                  <th className="py-4 px-4 font-bold text-slate-900">Private Suite</th>
                  <th className="py-4 pl-4 font-bold text-brand-600">Enterprise Floor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 pr-4 font-bold text-slate-800">{row.name}</td>
                    <td className="py-4 px-4 text-slate-600">{row.hotDesk}</td>
                    <td className="py-4 px-4 text-slate-600">{row.dedicated}</td>
                    <td className="py-4 px-4 font-semibold text-slate-900">{row.suite}</td>
                    <td className="py-4 pl-4 font-bold text-brand-700">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enterprise Bespoke Consultation Banner */}
        <div className="bg-slate-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-400 uppercase tracking-widest">
              <Shield className="w-4 h-4" />
              <span>Dedicated Enterprise Account Executive</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Planning for a 20+ Member Organization?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We provide tailored proposals with multi-site roaming passes, custom architectural buildouts, and dedicated IT colocation racks.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => onOpenBooking('Enterprise Floor')}
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <span>Schedule Enterprise RFP Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
