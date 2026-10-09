import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, ExternalLink, MessageSquareQuote } from 'lucide-react';
import { GOOGLE_REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'cocktails' | 'skewers' | 'ambiance'>('all');

  const filteredReviews = filter === 'all'
    ? GOOGLE_REVIEWS
    : GOOGLE_REVIEWS.filter((r) => r.categoryTag === filter || r.categoryTag === 'all');

  return (
    <section id="reviews" className="py-24 bg-[#0a0d0c] relative border-t border-[#1b3d32]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              {/* Google G icon styling */}
              <div className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-white text-stone-900 rounded-full shadow">
                G
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a059] font-semibold">
                Google Maps Verified Reviews
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading text-white tracking-tight">
              Words From Our Diners
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light">
              Diners from across Metro Manila and around the globe share their impressions of Toma Toma’s wood-fire grill, Lambanog craft, and Makati hospitality.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="p-5 bg-[#121915] border border-[#c5a059]/40 rounded-2xl flex items-center gap-5 shadow-xl shrink-0">
            <div className="text-center border-r border-stone-800 pr-5">
              <span className="text-4xl font-heading font-black text-white block">
                {RESTAURANT_INFO.rating}
              </span>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-stone-400 block font-mono">
                {RESTAURANT_INFO.totalReviews} Google Reviews
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs text-emerald-400 font-semibold block flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 100% Authentic Diners
              </span>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] hover:text-[#f3e5ab] font-medium transition-colors"
              >
                <span>Read all on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Controls (Clean Segmented buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-stone-800/80">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#1b3d32] text-[#d4af37] border border-[#c5a059]/50 font-semibold'
                : 'text-stone-400 hover:text-white bg-[#121915]'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setFilter('cocktails')}
            className={`px-4 py-2 text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === 'cocktails'
                ? 'bg-[#1b3d32] text-[#d4af37] border border-[#c5a059]/50 font-semibold'
                : 'text-stone-400 hover:text-white bg-[#121915]'
            }`}
          >
            Cocktails & Lambanog
          </button>
          <button
            onClick={() => setFilter('skewers')}
            className={`px-4 py-2 text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === 'skewers'
                ? 'bg-[#1b3d32] text-[#d4af37] border border-[#c5a059]/50 font-semibold'
                : 'text-stone-400 hover:text-white bg-[#121915]'
            }`}
          >
            Fire Grill & Skewers
          </button>
          <button
            onClick={() => setFilter('ambiance')}
            className={`px-4 py-2 text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              filter === 'ambiance'
                ? 'bg-[#1b3d32] text-[#d4af37] border border-[#c5a059]/50 font-semibold'
                : 'text-stone-400 hover:text-white bg-[#121915]'
            }`}
          >
            Ambiance & Hospitality
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#111714] border border-[#1b3d32]/60 hover:border-[#c5a059]/40 transition-all flex flex-col justify-between space-y-4 shadow-lg hover:shadow-2xl"
            >
              <div className="space-y-3">
                {/* Reviewer Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1b3d32] to-[#0c1c16] border border-[#c5a059]/30 flex items-center justify-center font-heading font-bold text-sm text-[#d4af37]">
                      {rev.authorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {rev.authorName}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                        <span>{rev.relativeTime}</span>
                        <span>·</span>
                        <span className="text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle className="w-2.5 h-2.5" /> Verified Diner
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Highlight Dish & Thumbs up */}
              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                {rev.highlightDish && (
                  <span className="text-[11px] text-[#c5a059] font-mono">
                    Ordered: {rev.highlightDish}
                  </span>
                )}
                <div className="flex items-center gap-1 text-stone-500 text-[11px]">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Google Maps */}
        <div className="text-center pt-4">
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#121915] text-[#d4af37] border border-[#c5a059]/30 hover:border-[#d4af37] hover:bg-[#19241f] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <span>View All Reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
