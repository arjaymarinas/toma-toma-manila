import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Video, FileDown, ArrowUp, Calendar, ExternalLink, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO, SOCIAL_LINKS } from '../data/restaurantData';
import { generateMenuPdf } from '../utils/pdfGenerator';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060907] border-t border-[#1b3d32] text-stone-400 text-xs">
      
      {/* PROMINENT SOCIAL MEDIA INTEGRATION BANNER */}
      <div className="border-b border-[#1b3d32]/70 bg-gradient-to-r from-[#09140f] via-[#0d221a] to-[#09140f] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Our Community Online</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading text-white">
              Connect With Toma Toma On Social Media
            </h3>
            <p className="text-xs text-stone-300 max-w-lg">
              Follow along for seasonal cocktail launches, guest tanggero nights, skewer specials, and Makati events.
            </p>
          </div>

          {/* Prominent Social Media Profile Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            {/* Instagram */}
            <a
              href={RESTAURANT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#101713] hover:bg-[#18261f] border border-[#c5a059]/40 hover:border-[#d4af37] transition-all flex items-center gap-3 group shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#833ab4]/30 via-[#fd1d1d]/30 to-[#fcb045]/30 border border-[#c5a059]/40 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform shrink-0">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-semibold text-white group-hover:text-[#d4af37] transition-colors block text-xs">
                  Instagram
                </span>
                <span className="text-[10px] text-stone-400 font-mono block">
                  {RESTAURANT_INFO.instagramHandle}
                </span>
              </div>
            </a>

            {/* Facebook */}
            <a
              href={RESTAURANT_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#101713] hover:bg-[#18261f] border border-[#1b3d32] hover:border-[#d4af37] transition-all flex items-center gap-3 group shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1877f2]/20 border border-[#1877f2]/40 flex items-center justify-center text-[#1877f2] group-hover:scale-105 transition-transform shrink-0">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-semibold text-white group-hover:text-[#d4af37] transition-colors block text-xs">
                  Facebook
                </span>
                <span className="text-[10px] text-stone-400 font-mono block">
                  {RESTAURANT_INFO.facebookHandle}
                </span>
              </div>
            </a>

            {/* TikTok */}
            <a
              href={RESTAURANT_INFO.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#101713] hover:bg-[#18261f] border border-[#1b3d32] hover:border-[#d4af37] transition-all flex items-center gap-3 group shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-semibold text-white group-hover:text-[#d4af37] transition-colors block text-xs">
                  TikTok
                </span>
                <span className="text-[10px] text-stone-400 font-mono block">
                  {RESTAURANT_INFO.tiktokHandle}
                </span>
              </div>
            </a>

            {/* Google Maps */}
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#101713] hover:bg-[#18261f] border border-[#1b3d32] hover:border-[#d4af37] transition-all flex items-center gap-3 group shadow-md"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1b3d32] border border-[#c5a059]/40 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-semibold text-white group-hover:text-[#d4af37] transition-colors block text-xs">
                  Google Maps
                </span>
                <span className="text-[10px] text-emerald-400 font-mono block">
                  4.9 ★ (320+ Reviews)
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand & Social summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1b3d32] border border-[#c5a059]/40 flex items-center justify-center text-[#d4af37]">
              <span className="font-heading font-black text-xl">TT</span>
            </div>
            <div>
              <span className="font-heading text-lg font-bold text-white tracking-widest block leading-tight">
                TOMA TOMA
              </span>
              <span className="text-[10px] tracking-widest text-[#c5a059] uppercase block">
                Contemporary Filipino Grill
              </span>
            </div>
          </div>
          <p className="text-stone-400 text-xs leading-relaxed font-light">
            Celebrated wood-fired skewers and tanggero cocktail artistry at Green Sun Building, Makati.
          </p>

          {/* Social Icons row */}
          <div className="pt-1 flex items-center gap-2">
            <a
              href={RESTAURANT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#121915] border border-stone-800 text-stone-300 hover:text-[#d4af37] hover:border-[#c5a059]/40 transition-colors"
              title="Follow on Instagram"
              aria-label="Instagram @tomatoma.manila"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={RESTAURANT_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#121915] border border-stone-800 text-stone-300 hover:text-[#d4af37] hover:border-[#c5a059]/40 transition-colors"
              title="Follow on Facebook"
              aria-label="Facebook @tomatoma.manila"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={RESTAURANT_INFO.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#121915] border border-stone-800 text-stone-300 hover:text-[#d4af37] hover:border-[#c5a059]/40 transition-colors"
              title="Follow on TikTok"
              aria-label="TikTok @tomatoma.manila"
            >
              <Video className="w-4 h-4" />
            </a>
            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#121915] border border-stone-800 text-stone-300 hover:text-[#d4af37] hover:border-[#c5a059]/40 transition-colors"
              title="Google Maps"
              aria-label="Google Maps Place"
            >
              <MapPin className="w-4 h-4" />
            </a>
            <button
              onClick={generateMenuPdf}
              className="ml-auto px-3 py-2 rounded-lg bg-[#121915] border border-[#c5a059]/40 text-[#c5a059] text-[11px] font-semibold flex items-center gap-1.5 hover:bg-[#1b2620] transition-colors cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              Menu PDF
            </button>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm text-white uppercase tracking-wider">
            Hours of Hospitality
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="flex justify-between border-b border-stone-800/80 pb-1.5">
              <span>Tuesday – Saturday:</span>
              <span className="text-white font-mono">5:00 PM – 12:00 AM</span>
            </li>
            <li className="flex justify-between border-b border-stone-800/80 pb-1.5 text-stone-500">
              <span>Sunday – Monday:</span>
              <span>Closed (Private Buyouts)</span>
            </li>
            <li className="text-[11px] text-[#c5a059] pt-1">
              *Kitchen last order 10:30 PM. Walk-ins welcomed subject to bar availability.
            </li>
          </ul>
        </div>

        {/* Location & Contact */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm text-white uppercase tracking-wider">
            Location & Contact
          </h4>
          <div className="space-y-2 text-xs">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-white hover:text-[#d4af37] font-mono">
                {RESTAURANT_INFO.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
              <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#d4af37]">
                {RESTAURANT_INFO.email}
              </a>
            </p>
          </div>
        </div>

        {/* Quick Reservations */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm text-white uppercase tracking-wider">
            Table Reservations
          </h4>
          <p className="text-xs text-stone-400">
            Secure your table or counter seat at the Cocktail Bar.
          </p>
          <button
            onClick={onOpenBooking}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Find A Table
          </button>
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#c5a059] hover:underline block text-center"
          >
            View on Google Maps
          </a>
        </div>

      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-stone-900 bg-[#040605] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Toma Toma Filipino Grill & Cocktail Bar. All Rights Reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="#menu" className="hover:text-stone-300">Menu</a>
            <a href="#story" className="hover:text-stone-300">Story</a>
            <a href="#reviews" className="hover:text-stone-300">Reviews</a>
            <a href="#location" className="hover:text-stone-300">Directions</a>
            <a 
              href={RESTAURANT_INFO.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#d4af37] hover:underline"
            >
              @tomatoma.manila
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-stone-900 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
