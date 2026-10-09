import React from 'react';
import { Instagram, Facebook, Video, MapPin, ExternalLink, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS, SOCIAL_POSTS, RESTAURANT_INFO } from '../data/restaurantData';

export const SocialSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#080b09] relative border-t border-[#1b3d32]/50 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#0d3f2e]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121915] border border-[#c5a059]/40 text-xs text-[#e5c07b]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-mono tracking-wider uppercase text-[11px]">Social Integration</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading text-white tracking-tight">
              Follow <span className="text-gold-gradient">@tomatoma.manila</span>
            </h2>
            <p className="text-stone-300 text-sm sm:text-base font-light">
              Catch our daily fruitwood skewers, Tanggero mixology masterclasses, weekend guest shifts, and Makati nightlife dispatch. Tag us with <strong className="text-white">#TomaTomaManila</strong> to be featured.
            </p>
          </div>

          {/* Direct Follow Buttons Strip */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={RESTAURANT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#aa8222] text-[#0b0e0d] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow on Instagram</span>
            </a>
            <a
              href={RESTAURANT_INFO.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#121915] text-[#d4af37] border border-[#c5a059]/40 hover:bg-[#1a2520] hover:border-[#d4af37] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>
            <a
              href={RESTAURANT_INFO.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#121915] text-stone-200 border border-stone-800 hover:border-stone-700 hover:text-white text-xs font-medium uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4 text-[#c5a059]" />
              <span>TikTok</span>
            </a>
          </div>
        </div>

        {/* Social Profile Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.platform}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-[#101613] border border-[#1b3d32]/70 hover:border-[#c5a059]/60 hover:bg-[#141d19] transition-all group shadow-lg flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#16241e] border border-[#c5a059]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform">
                    {item.platform === 'instagram' && <Instagram className="w-5 h-5" />}
                    {item.platform === 'facebook' && <Facebook className="w-5 h-5" />}
                    {item.platform === 'tiktok' && <Video className="w-5 h-5" />}
                    {item.platform === 'google-maps' && <MapPin className="w-5 h-5" />}
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-[#d4af37] transition-colors" />
                </div>

                <div>
                  <h3 className="font-heading font-bold text-white group-hover:text-[#d4af37] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xs font-mono text-[#c5a059] block mt-0.5">
                    {item.handle}
                  </span>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                <span className="text-stone-300 font-medium">{item.followers}</span>
                <span className="text-[#c5a059] font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Connect →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Curated Social Feed / Moments Visuals */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Recent Moments Shared with #TomaTomaManila
            </span>
            <a
              href={RESTAURANT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#d4af37] hover:underline flex items-center gap-1 font-medium"
            >
              <span>View Instagram Feed</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SOCIAL_POSTS.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden aspect-square border border-stone-800 hover:border-[#c5a059]/60 shadow-lg block bg-stone-900"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                
                {/* Platform badge */}
                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white flex items-center gap-1 border border-stone-700">
                  {post.platform === 'instagram' ? <Instagram className="w-3 h-3 text-[#d4af37]" /> : <Video className="w-3 h-3 text-[#d4af37]" />}
                  <span className="font-mono">{post.tag}</span>
                </div>

                {/* Hover overlay with likes and caption preview */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d0c] via-[#0a0d0c]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-left">
                  <div className="flex items-center gap-1.5 text-[#d4af37] text-xs font-semibold mb-1">
                    <Heart className="w-3.5 h-3.5 fill-[#d4af37]" />
                    <span>{post.likes}</span>
                  </div>
                  <p className="text-[11px] text-stone-200 line-clamp-2 leading-snug">
                    {post.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
