import React from 'react';
import { Flame, Wine, Compass, Sparkles, Calendar } from 'lucide-react';

interface StorySectionProps {
  onOpenBooking: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="story" className="py-24 bg-[#090d0b] relative overflow-hidden border-t border-[#1b3d32]/50">
      
      {/* Decorative Emerald Glows */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#0e3b2b]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Images Collage (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-xl h-56">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=700&q=80"
                  alt="Inasal Skewers over Coals"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 rounded-xl bg-[#111714] border border-[#1b3d32] text-xs space-y-1">
                <span className="text-[#c5a059] font-mono uppercase tracking-widest text-[10px] block">Ritual of Fire</span>
                <p className="text-stone-300">Native fruitwood charcoal imparting subtle sweetness to every skewer.</p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-xl bg-[#111714] border border-[#1b3d32] text-xs space-y-1">
                <span className="text-[#c5a059] font-mono uppercase tracking-widest text-[10px] block">The Tanggero Spirit</span>
                <p className="text-stone-300">The Filipino custom of tagay, elevated with distilled provincial lambanog.</p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-xl h-56">
                <img
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=700&q=80"
                  alt="Cocktail Artistry at Toma Toma"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Text Story (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] block font-semibold">
                Our Genesis & Philosophy
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading text-white tracking-tight leading-tight">
                The Heritage of the <span className="text-gold-gradient">Tanggero</span> & Fire
              </h2>
            </div>

            <div className="space-y-4 text-stone-300 text-sm leading-relaxed font-light">
              <p>
                In Filipino culture, <strong>“Toma”</strong> is the colloquial anthem for raising a glass—a call to slow down, share laughter, and gather over honest food and good spirits.
              </p>
              <p>
                Conceived by cocktail visionary <strong>Arcadius Rybak</strong> alongside culinary director <strong>Stephan Duhesme</strong>, Toma Toma bridges the warmth of Filipino street barbecue with modern fine-dining sensibilities.
              </p>
              <p>
                Rather than western spirits, our bar celebrates the centuries-old tradition of the <em>tanggero</em>—the trusted pourer of drinks. Here, Quezon coconut lambanog is distilled with sampaguita flowers, wild honey from Sagada, and finished with flakes of heirloom <em>Asin Tultul</em> from Guimaras.
              </p>
            </div>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-[#121815] border border-stone-800 rounded-xl">
                <Flame className="w-4 h-4 text-[#d4af37] mb-1.5" />
                <h4 className="text-xs font-bold text-white uppercase font-heading">Wood Coals</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Direct fire cooking with local timber</p>
              </div>
              <div className="p-3.5 bg-[#121815] border border-stone-800 rounded-xl">
                <Wine className="w-4 h-4 text-[#d4af37] mb-1.5" />
                <h4 className="text-xs font-bold text-white uppercase font-heading">Lambanog</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Artisanal coconut nectar spirits</p>
              </div>
              <div className="p-3.5 bg-[#121815] border border-stone-800 rounded-xl">
                <Compass className="w-4 h-4 text-[#d4af37] mb-1.5" />
                <h4 className="text-xs font-bold text-white uppercase font-heading">Green Sun</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Industrial chic sanctuary in Makati</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Reserve Your Table
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
