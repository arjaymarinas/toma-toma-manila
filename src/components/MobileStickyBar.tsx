import React, { useState } from 'react';
import { Calendar, FileDown, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { generateMenuPdf } from '../utils/pdfGenerator';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = () => {
    setDownloading(true);
    setTimeout(() => {
      generateMenuPdf();
      setDownloading(false);
    }, 400);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#0a0e0c]/95 backdrop-blur-lg border-t border-[#1b3d32] p-2.5 px-4 shadow-2xl flex items-center justify-between gap-2.5">
      
      {/* Quick Call */}
      <a
        href={`tel:${RESTAURANT_INFO.phone}`}
        className="p-2.5 bg-[#121915] text-[#d4af37] border border-stone-800 rounded-xl flex items-center justify-center shrink-0"
        title="Call Toma Toma"
        aria-label="Call Toma Toma"
      >
        <Phone className="w-4 h-4" />
      </a>

      {/* Download PDF Menu */}
      <button
        onClick={handleDownloadPdf}
        disabled={downloading}
        className="px-3 py-2.5 bg-[#121915] text-stone-200 border border-stone-800 rounded-xl text-xs flex items-center gap-1.5 shrink-0"
        title="Menu PDF"
      >
        <FileDown className="w-3.5 h-3.5 text-[#c5a059]" />
        <span className="text-[11px] font-medium">{downloading ? '...' : 'PDF'}</span>
      </button>

      {/* Primary Find A Table CTA */}
      <button
        onClick={onOpenBooking}
        className="flex-1 py-3 px-4 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
      >
        <Calendar className="w-3.5 h-3.5" />
        Find A Table / Reserve
      </button>

    </div>
  );
};
