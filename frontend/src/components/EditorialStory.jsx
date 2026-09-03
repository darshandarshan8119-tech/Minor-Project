// src/components/EditorialStory.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { EDITORIAL_FEATURES } from '../data/mockData';

export default function EditorialStory() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16">
      <div className="rounded-3xl bg-[#F5F4F0] p-8 sm:p-14 border border-black/[0.05] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Editorial Feature Image */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="/images/hero-campaign.jpg" 
              alt="The AgriMart Agricultural Philosophy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>

        {/* Right Column: Editorial Pillars */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.25em] text-[#8E8E8E] uppercase font-sans mb-1">
              The Philosophy
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#121212] leading-tight">
              Purity, Performance &amp; Sustainable Yield.
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans leading-relaxed mt-2 max-w-lg">
              We reject spurious chemicals, uncertified seed lots, and supply-chain middlemen. AgriMart delivers authenticated, laboratory-certified agricultural inputs engineered for superior farm productivity and soil health.
            </p>
          </div>

          {/* 3 Numbered Pillars */}
          <div className="space-y-4 pt-2 border-t border-black/[0.08]">
            {EDITORIAL_FEATURES.map((feat) => (
              <div key={feat.number} className="flex items-start gap-4">
                <span className="text-xs font-black font-heading text-[#C26747] pt-0.5">
                  {feat.number}
                </span>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#121212]">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-[#5A5A5A] font-sans leading-relaxed mt-0.5">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button className="skanvi-pill-btn bg-[#121212] hover:bg-[#283618] text-white">
              <span>Learn About Our Testing Protocol</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
