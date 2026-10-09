import React, { useState } from 'react';
import { Wine, Menu as MenuIcon, X, Phone, FileDown, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { generateMenuPdf } from '../utils/pdfGenerator';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => {
      generateMenuPdf();
      setIsDownloading(false);
    }, 400);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0b0e0d]/90 backdrop-blur-md border-b border-[#1b3d32]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#123828] to-[#081812] border border-[#c5a059]/40 flex items-center justify-center text-[#d4af37] shadow-md group-hover:border-[#d4af37] transition-all">
            <span className="font-heading font-black text-xl tracking-tighter">TT</span>
          </div>
          <div>
            <span className="font-heading text-lg sm:text-xl font-bold tracking-[0.2em] text-[#e8ece9] group-hover:text-[#d4af37] transition-colors block leading-tight">
              TOMA TOMA
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#c5a059] uppercase block font-sans">
              Makati · Grill & Bar
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-stone-300 font-medium">
          <a href="#menu" className="hover:text-[#d4af37] transition-colors">Menu</a>
          <a href="#story" className="hover:text-[#d4af37] transition-colors">Our Story</a>
          <a href="#reviews" className="hover:text-[#d4af37] transition-colors">Google Reviews</a>
          <a href="#location" className="hover:text-[#d4af37] transition-colors">Location & Map</a>
          <a href="#contact" className="hover:text-[#d4af37] transition-colors">Inquiries</a>
        </nav>

        {/* Header Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Download PDF button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            title="Download PDF Menu"
            className="px-3.5 py-2 text-xs text-[#c5a059] hover:text-[#f3e5ab] bg-[#121915] hover:bg-[#1a2520] border border-[#c5a059]/30 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{isDownloading ? 'Generating...' : 'Menu PDF'}</span>
          </button>

          {/* Direct Phone */}
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="px-3 py-2 text-xs text-stone-300 hover:text-white rounded-xl transition-colors flex items-center gap-1.5"
            title="Call Toma Toma"
          >
            <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="font-mono">{RESTAURANT_INFO.phoneDisplay}</span>
          </a>

          {/* Reserve a Seat CTA */}
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-[#c5a059]/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer ring-1 ring-[#f3e5ab]/30"
          >
            <Calendar className="w-3.5 h-3.5" />
            Reserve a Seat
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 bg-[#c5a059] text-[#0b0e0d] font-bold text-xs uppercase rounded-lg shadow-sm"
          >
            Reserve
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-white rounded-lg border border-stone-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c100e] border-b border-[#1b3d32] px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col gap-3 text-sm tracking-wider uppercase text-stone-200">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 hover:text-[#d4af37]"
            >
              Menu & Specialties
            </a>
            <a 
              href="#story" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 hover:text-[#d4af37]"
            >
              Our Story & Tanggero Craft
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 hover:text-[#d4af37]"
            >
              Google Reviews (4.9 ★)
            </a>
            <a 
              href="#location" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 hover:text-[#d4af37]"
            >
              Location & Map
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="py-1 hover:text-[#d4af37]"
            >
              Contact & Inquiries
            </a>
          </nav>

          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownloadPdf();
              }}
              className="w-full py-2.5 px-4 bg-[#121915] text-[#c5a059] border border-[#c5a059]/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              Download Menu PDF
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Find A Table / Reserve Now
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="w-full py-2 text-center text-xs text-stone-300 font-mono"
            >
              Direct Call: {RESTAURANT_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

