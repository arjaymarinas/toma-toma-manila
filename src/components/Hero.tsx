import React, { useState } from 'react';
import { Calendar, FileDown, Star, MapPin, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { generateMenuPdf } from '../utils/pdfGenerator';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = () => {
    setDownloading(true);
    setTimeout(() => {
      generateMenuPdf();
      setDownloading(false);
    }, 400);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0d0c] py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Ambience with Deep Emerald & Gold Glows */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="Toma Toma Fire Grill"
          className="w-full h-full object-cover opacity-20 filter saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d0c] via-[#0a0d0c]/80 to-[#06231a]/60" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#0d4734]/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Subtle Location & Google Rating Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-1.5 rounded-full bg-[#121a16]/80 border border-[#c5a059]/40 backdrop-blur-md shadow-xl text-xs">
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#e5c07b] hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Green Sun · Makati</span>
          </a>
          <span className="text-stone-600 hidden sm:inline">|</span>
          <div className="flex items-center gap-1 text-amber-300 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9</span>
            <span className="text-stone-400 text-[11px] font-normal">(320+ Reviews)</span>
          </div>
          <span className="text-stone-600 hidden sm:inline">|</span>
          <a
            href={RESTAURANT_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c5a059] hover:text-white font-mono text-[11px] transition-colors"
          >
            {RESTAURANT_INFO.instagramHandle}
          </a>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <span className="font-heading tracking-[0.35em] text-[#c5a059] text-xs sm:text-sm uppercase block font-semibold">
            Contemporary Filipino Grill & Cocktail Bar
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.08]">
            Where Fire Meets the Soul of the <span className="text-gold-gradient">Archipelago</span>
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-base sm:text-lg leading-relaxed font-light">
            Cooked over hot Philippine fruitwood coals, paired with seasonal Quezon lambanog elixirs, and served in the industrial-chic sanctuary of Green Sun Makati.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Find a Table / Reserve a Seat CTA */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#aa8222] text-[#0b0e0d] font-bold text-sm uppercase tracking-wider rounded-xl shadow-2xl shadow-[#c5a059]/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer ring-1 ring-[#f3e5ab]/50 group"
          >
            <Calendar className="w-4 h-4 text-[#0b0e0d]" />
            Find A Table
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Reserve a Seat secondary trigger */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 py-4 bg-[#0e2119] text-[#e5c07b] border border-[#c5a059]/50 hover:bg-[#143226] hover:border-[#d4af37] text-sm uppercase tracking-wider font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            Reserve a Seat
          </button>

          {/* Download Menu PDF */}
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="w-full sm:w-auto px-6 py-4 bg-[#121715] hover:bg-[#18201d] text-stone-200 border border-stone-800 hover:border-stone-700 text-sm tracking-wider font-medium rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <FileDown className="w-4 h-4 text-[#c5a059]" />
            {downloading ? 'Preparing PDF...' : 'Download Menu PDF'}
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10 max-w-4xl mx-auto border-t border-[#1b3d32]/60 text-left">
          <div className="p-3.5 rounded-xl bg-[#0e1411]/80 border border-stone-800/80">
            <span className="text-[11px] text-[#c5a059] uppercase tracking-wider font-mono block mb-1">Wood Fire Grill</span>
            <p className="text-xs text-stone-300 font-medium">Native fruitwood charcoal & skewers</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0e1411]/80 border border-stone-800/80">
            <span className="text-[11px] text-[#c5a059] uppercase tracking-wider font-mono block mb-1">Tanggero Bar</span>
            <p className="text-xs text-stone-300 font-medium">Artisanal Lambanog & botanical spirits</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0e1411]/80 border border-stone-800/80">
            <span className="text-[11px] text-[#c5a059] uppercase tracking-wider font-mono block mb-1">Culinary Heritage</span>
            <p className="text-xs text-stone-300 font-medium">Heirloom salt & archipelago harvests</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0e1411]/80 border border-stone-800/80">
            <span className="text-[11px] text-[#c5a059] uppercase tracking-wider font-mono block mb-1">Hours</span>
            <p className="text-xs text-stone-300 font-medium">Tue – Sat: 5:00 PM – Midnight</p>
          </div>
        </div>

      </div>
    </section>
  );
};
