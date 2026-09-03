// src/components/MovingOfferBanners.jsx
import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Sparkles, Clock, 
  ArrowRight, Tag, Tractor, ShoppingBag, ShieldCheck, Zap 
} from 'lucide-react';

export default function MovingOfferBanners({ onExploreRentals, onExploreCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      badge: 'MEGA KHARIF SOWING SALE',
      title: 'Flat 35% OFF on Certified Hybrid Seeds',
      subtitle: 'Pioneer 3302 Maize, Basmati Paddy & High-Yield Cotton Seeds with 98% Lab Germination Guarantee.',
      code: 'KHARIF35',
      accentColor: 'from-[#1E3A1E] via-[#142314] to-[#0D150D]',
      tagColor: 'bg-[#D97706] text-[#111315]',
      buttonText: 'Shop Hybrid Seeds',
      buttonAction: () => onExploreCategory('seeds'),
      image: '/images/category-seeds.jpg',
      timer: 'Ends in 08h : 42m : 15s'
    },
    {
      id: 2,
      badge: 'HEAVY MACHINERY FESTIVAL',
      title: 'Flat ₹1,000 OFF on 3+ Days Tractor Rentals',
      subtitle: 'Book John Deere 4WD & Mahindra High-Torque tractors with certified operators & village field delivery.',
      code: 'RENTPRO1000',
      accentColor: 'from-[#2A1D0D] via-[#1C1308] to-[#110B04]',
      tagColor: 'bg-[#D97706] text-[#111315]',
      buttonText: 'Rent Heavy Tractors',
      buttonAction: onExploreRentals,
      image: '/images/category-machinery.jpg',
      timer: 'Limited Fleet Slots'
    },
    {
      id: 3,
      badge: 'ORGANIC BIO-NPK BUNDLE',
      title: 'Buy 2 Bio-Nutrients, Get 1 Seaweed Elixir Free',
      subtitle: 'Activate root immunity & boost tillering. Zero harmful residues, 100% NPOP certified organic formulation.',
      code: 'ORGANIC3',
      accentColor: 'from-[#13222B] via-[#0E171D] to-[#080D11]',
      tagColor: 'bg-[#10B981] text-[#111315]',
      buttonText: 'Claim Free Elixir',
      buttonAction: () => onExploreCategory('care'),
      image: '/images/category-care.jpg',
      timer: 'Valid till Sunday midnight'
    }
  ];

  // Auto-sliding interval (every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const current = banners[currentSlide];

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-4 pb-4">
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/[0.08] min-h-[300px] sm:min-h-[360px] flex items-center">
        
        {/* Dynamic Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-r ${current.accentColor} transition-all duration-700 ease-in-out`}></div>

        {/* Ambient Subtle Grid & Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

        {/* Banner Content Split Layout */}
        <div className="relative z-10 w-full p-6 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          
          {/* Left: Headline & Offer Copy */}
          <div className="max-w-xl space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase tracking-wider ${current.tagColor}`}>
                {current.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D4A373] bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>{current.timer}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight leading-tight text-white">
              {current.title}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              {current.subtitle}
            </p>

            {/* Promo Code & Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={current.buttonAction}
                className="skanvi-pill-btn bg-[#D97706] hover:bg-[#B45309] text-[#111315] font-black text-xs shadow-md">
                <span>{current.buttonText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20">
                <Tag className="w-3.5 h-3.5 text-[#D4A373]" />
                <span className="text-white/60">Use Code:</span>
                <span className="font-bold text-white tracking-widest">{current.code}</span>
              </div>
            </div>
          </div>

          {/* Right: Studio Product Thumbnail Showcase */}
          <div className="hidden md:flex relative shrink-0">
            <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15 bg-white/5 backdrop-blur-xs transform hover:rotate-1 transition-transform duration-500">
              <img 
                src={current.image} 
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <span className="absolute bottom-3 left-3 right-3 text-center text-[10px] font-mono font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md py-1 rounded-lg">
                Verified Lab Standard
              </span>
            </div>
          </div>

        </div>

        {/* Prev / Next Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none"
          aria-label="Previous Offer">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all focus:outline-none"
          aria-label="Next Offer">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-[#D97706]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
