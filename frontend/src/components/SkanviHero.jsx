// src/components/SkanviHero.jsx
import React from 'react';
import { ArrowRight, Tractor, ShoppingBag } from 'lucide-react';

export default function SkanviHero({ onExploreRentals, onExploreStore }) {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-8 pt-4 pb-8">
      <div className="relative w-full min-h-[600px] md:min-h-[660px] rounded-3xl overflow-hidden shadow-2xl flex items-end sm:items-center p-6 sm:p-14">
        
        {/* Cinematic Full-Bleed Background Photography */}
        <img 
          src="/images/hero-campaign.jpg" 
          alt="AgriMart Industrial Agriculture" 
          className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-1000 ease-out"
        />

        {/* Sophisticated Architectural Scrim for 100% WCAG AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#111315]/90 via-[#111315]/55 to-transparent"></div>

        {/* Floating Editorial Copy Box */}
        <div className="relative z-10 max-w-xl text-white">
          
          {/* Eyebrow */}
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#D4A373] uppercase font-sans mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
            <span>AGRIMART CULTIVATE &amp; EQUIP 2026</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-[1.08] text-white mb-4">
            Industrial Power &amp; Certified Agricultural Inputs.
          </h1>

          {/* Subtext */}
          <p className="text-white/80 text-sm sm:text-base font-sans leading-relaxed mb-8 max-w-lg">
            Rent commercial 4WD tractors, spray drones &amp; combine harvesters by the day or acre. Source verified hybrid seeds, bio-NPK, and live APMC Mandi rates.
          </p>

          {/* Dual Action Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onExploreRentals}
              className="skanvi-pill-btn bg-[#D97706] hover:bg-[#B45309] text-[#111315] font-black shadow-md">
              <Tractor className="w-4 h-4 stroke-[2]" />
              <span>Rent Heavy Machinery</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              onClick={onExploreStore}
              className="skanvi-pill-btn bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30">
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              <span>Shop Certified Inputs</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
