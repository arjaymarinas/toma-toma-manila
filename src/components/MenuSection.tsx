import React, { useState } from 'react';
import { FileDown, Calendar, Sparkles, Flame, Wine, Eye } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types/restaurant';
import { generateMenuPdf } from '../utils/pdfGenerator';
import { DishDetailModal } from './DishDetailModal';

interface MenuSectionProps {
  onOpenBooking: () => void;
}

type MenuCategory = 'all' | 'skewers' | 'small-plates' | 'feasts' | 'cocktails' | 'desserts';

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const categories: { key: MenuCategory; label: string }[] = [
    { key: 'all', label: 'All Offerings' },
    { key: 'skewers', label: 'Skewers & Fire Grill' },
    { key: 'small-plates', label: 'Small Plates & Pulutan' },
    { key: 'feasts', label: 'Sharing Feasts' },
    { key: 'cocktails', label: 'Cocktails & Lambanog' },
    { key: 'desserts', label: 'Desserts' },
  ];

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      generateMenuPdf();
      setIsDownloading(false);
    }, 400);
  };

  return (
    <section id="menu" className="py-24 bg-[#0c100e] relative border-t border-[#1b3d32]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] block font-semibold">
              Curated by Chef Stephan Duhesme & Arcadius Rybak
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading text-white tracking-tight">
              Culinary Art & Fire Skewers
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light">
              Rooted in Filipino barbecue traditions, executed with contemporary finesse. Every dish is seasoned by wood embers, heirloom sea salt, and Philippine archipelago harvests.
            </p>
          </div>

          {/* Download Menu PDF Action */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-5 py-3 bg-[#131c17] hover:bg-[#1a2620] text-[#d4af37] border border-[#c5a059]/40 hover:border-[#d4af37] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>{isDownloading ? 'Preparing PDF...' : 'Download Menu PDF'}</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-5 py-3 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Seat</span>
            </button>
          </div>
        </div>

        {/* Category Tabs (Functional buttons with segmented styling) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-800">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#1b3d32] text-[#d4af37] border border-[#c5a059]/50 shadow-md shadow-[#10b981]/15 font-semibold'
                  : 'bg-[#121815] text-stone-400 hover:text-white border border-stone-800/80 hover:border-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Images in Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDish(item)}
              className="group bg-[#111714] border border-[#1b3d32]/60 hover:border-[#c5a059]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#051c14] cursor-pointer flex flex-col justify-between"
            >
              {/* Tile Image */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-900">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111714] via-transparent to-transparent opacity-80" />
                
                {/* Category & Tags */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-[#e5c07b] font-mono uppercase tracking-wider border border-[#c5a059]/30">
                    {item.category.replace('-', ' ')}
                  </span>
                  {item.dietary?.includes('chef-choice') && (
                    <span className="px-2 py-0.5 rounded-full bg-[#1b3d32]/90 backdrop-blur-md text-[10px] text-emerald-300 font-medium">
                      ★ House Specialty
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-sm text-xs text-white px-2.5 py-1 rounded-lg flex items-center gap-1 border border-stone-700">
                  <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>View Details</span>
                </div>
              </div>

              {/* Tile Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="font-heading text-lg text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <span className="font-heading font-bold text-base text-[#d4af37] whitespace-nowrap">
                      ₱{item.price.toLocaleString()}
                    </span>
                  </div>

                  {item.filipinoName && (
                    <p className="text-xs text-[#c5a059]/80 font-serif italic mb-2">
                      {item.filipinoName}
                    </p>
                  )}

                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer of tile: Ingredients list & CTA */}
                <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-400 truncate max-w-[190px]">
                    {item.ingredients.slice(0, 3).join(' · ')}
                  </span>
                  <span className="text-xs text-[#c5a059] font-medium group-hover:translate-x-0.5 transition-transform">
                    Tasting Note →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Menu PDF & Table Reservation */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#081f16] via-[#0d2e22] to-[#081f16] border border-[#c5a059]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-heading text-white">
              Want the full dining & cocktail catalog?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300">
              Download our complete printable PDF menu with complete wine, spirit, and seasonal grill selections.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-5 py-3 bg-[#111815] text-[#d4af37] border border-[#c5a059]/40 hover:bg-[#18231e] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FileDown className="w-4 h-4" />
              <span>{isDownloading ? 'Downloading...' : 'Download Menu PDF'}</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:brightness-110 cursor-pointer"
            >
              Reserve a Seat
            </button>
          </div>
        </div>

      </div>

      {/* Dish Detail Modal */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onOpenBooking={onOpenBooking}
      />
    </section>
  );
};
