// src/components/CategoryCarousel.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function CategoryCarousel({ currentCategory, onSelectCategory }) {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex items-end justify-between mb-7">
        <div>
          <p className="text-[11px] font-bold tracking-[0.22em] text-[#8E8E8E] uppercase font-sans mb-1">
            Direct Discovery
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#121212]">
            What is your farm looking for?
          </h2>
        </div>

        <button 
          onClick={() => onSelectCategory('all')}
          className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#121212] hover:text-[#C26747] transition-colors font-heading">
          <span>All Categories</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[1.75]" />
        </button>
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.slug;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group cursor-pointer flex flex-col">
              
              {/* Media Container */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F5F4F0] border border-black/[0.06] mb-3.5 shadow-xs transition-all duration-500 group-hover:shadow-md">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive ? 'bg-[#121212]/20' : 'bg-black/0 group-hover:bg-black/10'
                }`}></div>
              </div>

              {/* Typography */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-heading font-extrabold text-sm sm:text-base leading-tight transition-colors ${
                    isActive ? 'text-[#C26747]' : 'text-[#121212] group-hover:text-[#C26747]'
                  }`}>
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#8E8E8E] font-sans mt-0.5">
                    {cat.itemCount}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 stroke-[1.75] text-[#8E8E8E] group-hover:text-[#121212] group-hover:translate-x-1 transition-all" />
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
