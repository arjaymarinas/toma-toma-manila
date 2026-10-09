import React from 'react';
import { X, Sparkles, Utensils, Wine, Calendar } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onOpenBooking,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0e1411] border border-[#c5a059]/40 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-stone-300 hover:text-white border border-stone-700/60 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1411] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <span className="text-xs text-[#c5a059] font-mono uppercase tracking-wider">
                {item.category.replace('-', ' ').toUpperCase()}
              </span>
              <h3 className="text-xl sm:text-2xl font-heading text-white">
                {item.name}
              </h3>
              {item.filipinoName && (
                <p className="text-xs text-stone-300 italic">{item.filipinoName}</p>
              )}
            </div>
            <div className="text-right">
              <span className="text-lg sm:text-xl font-heading text-[#d4af37] font-bold">
                ₱{item.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Dish Info */}
        <div className="p-6 space-y-4 text-xs sm:text-sm text-stone-300">
          <p className="leading-relaxed text-stone-200">
            {item.description}
          </p>

          {/* Ingredients */}
          <div>
            <h4 className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5" /> Key Ingredients
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-[#16221c] border border-stone-800 text-stone-300 text-xs"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Pairing Note */}
          {item.pairingNote && (
            <div className="p-3 bg-[#081712] border border-[#1b3d32] rounded-xl flex items-start gap-2.5">
              <Wine className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider block">
                  Tanggero Pairing Recommendation
                </span>
                <p className="text-xs text-stone-300">{item.pairingNote}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-800">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-stone-400 hover:text-white"
            >
              Back to Menu
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 hover:brightness-110 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              Reserve a Table for This Dish
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
