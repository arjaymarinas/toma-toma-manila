import React from 'react';
import { MapPin, Navigation, Clock, Phone, Car, Train, ExternalLink, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LocationMapSectionProps {
  onOpenBooking: () => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({ onOpenBooking }) => {
  // Check if open right now based on local time (Tue-Sat, 17:00-24:00)
  const now = new Date();
  const day = now.getDay(); // 0 is Sun, 1 is Mon
  const hours = now.getHours();
  const isOpenToday = day >= 2 && day <= 6; // Tue to Sat
  const isOpenNow = isOpenToday && (hours >= 17 && hours < 24);

  return (
    <section id="location" className="py-24 bg-[#080c0a] relative border-t border-[#1b3d32]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] block font-semibold">
              Green Sun · Chino Roces Extension · Makati
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading text-white tracking-tight">
              Finding Toma Toma
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light">
              Nestled inside the iconic Green Sun complex in Makati. Step through our doors into an intimate haven of glowing embers and botanical libations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-[#121915] text-[#d4af37] border border-[#c5a059]/40 hover:border-[#d4af37] hover:bg-[#1a2520] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps App</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Seat</span>
            </button>
          </div>
        </div>

        {/* Map & Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interactive Google Map Embed (7 cols) */}
          <div className="lg:col-span-7 bg-[#111714] border border-[#1b3d32] rounded-2xl overflow-hidden shadow-2xl relative min-h-[380px] flex flex-col">
            <div className="p-4 bg-[#0d1410] border-b border-stone-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-stone-200">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span className="font-semibold text-white">Toma Toma at Green Sun Makati</span>
              </div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c5a059] hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                14.53658, 121.02104 <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Google Map iframe */}
            <div className="relative flex-1 w-full min-h-[360px]">
              <iframe
                title="Toma Toma Location Map"
                src={`https://maps.google.com/maps?q=14.5365841,121.0210435+(Toma+Toma+Restaurant)&z=16&output=embed`}
                className="w-full h-full border-0 absolute inset-0 filter invert-[90%] hue-rotate-[180deg] contrast-[110%]"
                loading="lazy"
                allowFullScreen
              />
              
              {/* Floating Quick Action overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#0a100e]/90 backdrop-blur-md border border-[#c5a059]/40 p-3 rounded-xl shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1b3d32] text-[#d4af37] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-left text-xs">
                  <p className="font-semibold text-white">Green Sun Building</p>
                  <p className="text-stone-400 text-[11px]">2285 Chino Roces Ave Ext, Makati</p>
                </div>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto px-3 py-1.5 bg-[#c5a059] text-[#0b0e0d] text-[11px] font-bold rounded-lg hover:brightness-110"
                >
                  Directions
                </a>
              </div>
            </div>
          </div>

          {/* Details & Visiting Information (5 cols) */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            
            {/* Hours & Live Status Card */}
            <div className="p-6 rounded-2xl bg-[#111714] border border-[#1b3d32]/80 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <h3 className="font-heading text-base text-white">Operating Hours</h3>
                </div>
                {/* Live Status */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#12281e] text-emerald-300 border border-emerald-600/40">
                  <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span>{isOpenNow ? 'Open Now (5PM – Midnight)' : 'Opens at 5:00 PM'}</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-stone-200">
                  <span className="font-medium">Tuesday – Saturday</span>
                  <span className="font-mono text-[#d4af37] font-semibold">5:00 PM – 12:00 AM</span>
                </div>
                <div className="flex justify-between items-center text-stone-400">
                  <span>Sunday – Monday</span>
                  <span className="italic">Closed (Private Dining Only)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
                <span>Last kitchen order: 10:30 PM</span>
                <span>Bar closes: 12:00 AM</span>
              </div>
            </div>

            {/* Transit & Parking Details */}
            <div className="p-6 rounded-2xl bg-[#111714] border border-[#1b3d32]/80 space-y-4">
              <h3 className="font-heading text-base text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#d4af37]" /> Getting Here & Parking
              </h3>

              <div className="space-y-3 text-xs text-stone-300">
                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Valet & Basement Parking</span>
                    <p className="text-stone-400">
                      Complimentary valet drop-off and secure basement parking available directly at the Green Sun entrance on Chino Roces Ave Ext.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Train className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Nearby Transit</span>
                    <p className="text-stone-400">
                      5-minute walk from MRT-3 Magallanes Station or quick ride from EDSA / South Superhighway interchange.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Direct Host Line</span>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#d4af37] font-mono hover:underline">
                      {RESTAURANT_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
