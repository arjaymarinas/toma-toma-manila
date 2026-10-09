import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Sparkles, Instagram, Facebook } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Dining & Buyout',
    eventDate: '',
    guestCount: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0d0c] relative border-t border-[#1b3d32]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] block font-semibold">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading text-white tracking-tight">
            Contact & Private Inquiries
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light">
            Planning a private dinner, corporate celebration, cocktail masterclass, or media inquiry? Our hospitality team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Contact Direct Info (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#111714] border border-[#1b3d32] space-y-6">
              <h3 className="font-heading text-lg text-white">Direct Information</h3>

              <div className="space-y-4 text-xs text-stone-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1b3d32] text-[#d4af37] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase">Reservations Line</span>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-white font-mono font-semibold text-sm hover:text-[#d4af37]">
                      {RESTAURANT_INFO.phoneDisplay}
                    </a>
                    <span className="text-stone-500 block text-[11px]">Tue–Sat from 2:00 PM to midnight</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1b3d32] text-[#d4af37] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase">Email Inquiries</span>
                    <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-white hover:text-[#d4af37] font-medium">
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1b3d32] text-[#d4af37] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase">Address</span>
                    <p className="text-white">
                      Green Sun Building, 2285 Chino Roces Ave Ext, Makati City
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1b3d32] text-[#d4af37] flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px] uppercase">Social Media</span>
                    <div className="flex items-center gap-3 mt-0.5">
                      <a href={RESTAURANT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline font-mono">
                        {RESTAURANT_INFO.instagramHandle}
                      </a>
                      <span className="text-stone-600">·</span>
                      <a href={RESTAURANT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline font-mono">
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Private Buyout Notice */}
              <div className="p-3.5 bg-[#081712] border border-[#1b3d32] rounded-xl text-xs space-y-1">
                <span className="text-[#c5a059] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Mezzanine & Bar Buyouts
                </span>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  Available for up to 60 seated guests or 100 standing cocktail receptions, with tailored skewer flights and custom cocktail bars.
                </p>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#111714] border border-[#c5a059]/40 rounded-2xl p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-[#1b3d32] text-[#d4af37] rounded-full flex items-center justify-center mx-auto border border-[#d4af37]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl text-white">Thank You for Reaching Out</h3>
                <p className="text-stone-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Your inquiry has been received by our host manager. We will review your request and reply to <strong>{formData.email}</strong> within 12 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      inquiryType: 'Private Dining & Buyout',
                      eventDate: '',
                      guestCount: '',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 bg-[#1b3d32] text-[#d4af37] hover:bg-[#255747] border border-[#c5a059]/40 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sofia Zobel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sofia@example.ph"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +63 917 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Inquiry Purpose</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none transition-colors"
                    >
                      <option value="Private Dining & Buyout" className="bg-[#121915]">Private Dining & Full Buyout</option>
                      <option value="Large Party (Above 8)" className="bg-[#121915]">Large Party Reservation (&gt; 8 guests)</option>
                      <option value="Corporate Event / Workshop" className="bg-[#121915]">Corporate Dinner / Workshop</option>
                      <option value="Cocktail Masterclass" className="bg-[#121915]">Tanggero Cocktail Masterclass</option>
                      <option value="Press / Media Inquiry" className="bg-[#121915]">Press / Media / Collaboration</option>
                      <option value="General Question" className="bg-[#121915]">General Question</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Preferred Event Date (Optional)</label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Estimated Guests (Optional)</label>
                    <input
                      type="number"
                      placeholder="e.g. 15"
                      min={1}
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Message / Event Specifications *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your event, preferred culinary pairings, special dietary needs, or inquiries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#121915] border border-stone-700 focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-white text-xs outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#c5a059]/20"
                >
                  {isSending ? (
                    'Transmitting Inquiry...'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
