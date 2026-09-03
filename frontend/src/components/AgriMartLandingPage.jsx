// src/components/AgriMartLandingPage.jsx
import React, { useState, useRef } from 'react';
import { 
  Tractor, Scale, ShoppingBag, ArrowRight, 
  ShieldCheck, Check, Sparkles, Lock, ArrowUpRight, Truck,
  TrendingUp, TrendingDown, Building2, Landmark, CheckCircle2 
} from 'lucide-react';

export default function AgriMartLandingPage({ onEnterPlatform }) {
  // 3D Mouse Parallax Tilt Physics
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // Max tilt 7deg
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransformStyle(`perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`);
    setGlarePosition({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100)
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const liveTickers = [
    { name: 'Wheat (Sharbati)', mandi: 'Ludhiana APMC', price: 2450, change: '+₹60 (2.4%)', isUp: true, high: 2480, low: 2410 },
    { name: 'Mustard Seed', mandi: 'Alwar APMC', price: 5680, change: '+₹100 (1.8%)', isUp: true, high: 5720, low: 5550 },
    { name: 'Cotton (Shankar-6)', mandi: 'Rajkot APMC', price: 7140, change: '-₹40 (0.6%)', isUp: false, high: 7220, low: 7110 },
    { name: 'Basmati Paddy 1121', mandi: 'Karnal APMC', price: 4420, change: '+₹130 (3.1%)', isUp: true, high: 4460, low: 4280 },
    { name: 'Soybean (Yellow)', mandi: 'Indore APMC', price: 4820, change: '+₹40 (0.9%)', isUp: true, high: 4850, low: 4760 },
    { name: 'Red Chilli (Teja)', mandi: 'Guntur APMC', price: 18500, change: '+₹750 (4.2%)', isUp: true, high: 18900, low: 17600 },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#121212] flex flex-col font-sans selection:bg-[#EBE8E2] selection:text-[#121212] overflow-x-hidden">
      
      {/* Top Skanvi Announcement Strip */}
      <div className="bg-[#121212] text-[#FBFBF9] text-[11px] py-2 px-4 tracking-wide font-medium text-center flex items-center justify-center gap-2">
        <Truck className="w-3.5 h-3.5 text-[#D4A373]" />
        <span>Bharat's Architectural Agricultural Platform &bull; Certified Inputs, Machinery Fleet &amp; Live Mandi</span>
      </div>

      {/* Skanvi Minimalist Header */}
      <header className="sticky top-0 z-40 bg-[#FBFBF9]/90 backdrop-blur-md border-b border-black/[0.06] transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Mark */}
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-[0.16em] text-[#121212] uppercase font-heading">
              AGRI<span className="text-[#C26747]">MART</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#8E8E8E] uppercase font-sans -mt-0.5">
              Architectural Agritech &bull; Bharat
            </span>
          </div>

          {/* Skanvi Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#5A5A5A] font-heading">
            <a href="#flagship" className="hover:text-[#121212] transition-colors">Flagship Fleet</a>
            <a href="#capabilities" className="hover:text-[#121212] transition-colors">Core Capabilities</a>
            <a href="#philosophy" className="hover:text-[#121212] transition-colors">The Philosophy</a>
            <a href="#mandi-stock-exchange" className="hover:text-[#121212] text-[#C26747] font-black transition-colors">AgriStock Exchange &bull;</a>
          </nav>

          {/* Primary Action Button */}
          <button
            onClick={() => onEnterPlatform('store')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] hover:bg-[#283618] text-white font-extrabold text-xs font-heading shadow-md transition-all active:scale-95">
            <Lock className="w-3.5 h-3.5 stroke-[2]" />
            <span>Enter Platform / Farmer Login</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>

        </div>
      </header>

      {/* MAIN HERO: Skanvi Travertine Architectural Canvas with Interactive 3D Parallax Sculpture */}
      <section className="relative max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 pb-16" id="flagship">
        
        {/* Editorial Eyebrow & Headline Block */}
        <div className="max-w-3xl mb-8 space-y-3">
          <div className="text-[11px] font-bold tracking-[0.25em] text-[#C26747] uppercase font-sans flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C26747]"></span>
            <span>AGRIMART ARCHITECTURAL AGRITECH 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-[1.06] text-[#121212]">
            Heavy Field Machinery.<br />
            Crafted for the Modern Agricultural Estate.
          </h1>

          <p className="text-sm sm:text-base text-[#5A5A5A] font-sans leading-relaxed max-w-2xl">
            Rent high-horsepower 4WD tractors, combine harvesters, and spray drones on demand. Source verified laboratory-tested seeds and trade crop commodities on live APMC mandi wholesale auctions.
          </p>

          {/* Dual Skanvi Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
            <button
              onClick={() => onEnterPlatform('store')}
              className="skanvi-pill-btn bg-[#121212] hover:bg-[#283618] text-white shadow-lg">
              <span>Launch AgriMart Platform</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              onClick={() => onEnterPlatform('mandi')}
              className="skanvi-pill-btn bg-white hover:bg-[#F5F4F0] text-[#121212] border border-black/[0.1]">
              <span>View Mandi Exchange Rates</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D INTERACTIVE MONUMENTAL PARALLAX SHOWCASE CARD */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => onEnterPlatform('store')}
          style={{ transform: transformStyle, transition: 'transform 0.15s ease-out' }}
          className="group relative w-full aspect-[16/9] max-h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-black/[0.08] cursor-pointer bg-[#F5F4F0]">
          
          {/* 8K Bespoke Architectural Sculpture Photograph */}
          <img 
            src="/images/skanvi-3d-tractor.jpg" 
            alt="AgriMart Sculptural Tractor inside Scandinavian Travertine Pavilion" 
            className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
          />

          {/* Subtle Contrast Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* 3D Glare Lighting Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`
            }}
          />

          {/* Floating 3D Depth Layer Badges */}
          <div className="absolute inset-x-6 sm:inset-x-10 bottom-6 sm:bottom-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white z-20">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4A373] uppercase font-bold block">
                Flagship Machinery &bull; On Demand
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                Fendt 900 Vario High-Torque 4WD
              </h3>
              <p className="text-xs text-white/80 font-sans max-w-md">
                Precision soil preparation, GPS autosteer telemetry &amp; certified field operators delivered to your village gate.
              </p>
            </div>

            {/* Price Pill Tag */}
            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-xl">
              <div>
                <span className="text-[10px] text-white/50 uppercase font-sans block">Starting At</span>
                <span className="text-lg font-black font-mono text-white">₹1,900 / Day</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-white text-[#121212] flex items-center justify-center group-hover:bg-[#C26747] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 3 Numbered Architectural Pillars (Skanvi Signature Layout) */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 border-t border-black/[0.06]" id="capabilities">
        
        <div className="mb-10">
          <p className="text-[11px] font-bold tracking-[0.22em] text-[#8E8E8E] uppercase font-sans mb-1">
            Platform Pillars
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#121212]">
            An Operating System for High-Yield Agriculture.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 01 */}
          <div 
            onClick={() => onEnterPlatform('store')}
            className="group cursor-pointer rounded-3xl p-8 bg-[#F5F4F0] border border-black/[0.05] hover:border-black/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black font-heading text-[#C26747]">01</span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#121212] shadow-xs">
                  <Tractor className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-lg text-[#121212] mb-2">
                Heavy Machinery &amp; Tractor Rentals
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans leading-relaxed">
                Eliminate capital depreciation. Rent 4WD commercial tractors, combine harvesters, and autonomous spray drones by day or acre with certified field drivers.
              </p>
            </div>

            <div className="pt-6 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold font-heading text-[#121212] group-hover:text-[#C26747] transition-colors mt-6">
              <span>View Fleet Availability</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 02 */}
          <div 
            onClick={() => onEnterPlatform('store')}
            className="group cursor-pointer rounded-3xl p-8 bg-[#F5F4F0] border border-black/[0.05] hover:border-black/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black font-heading text-[#C26747]">02</span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#121212] shadow-xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-lg text-[#121212] mb-2">
                Certified Crop Inputs Store
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans leading-relaxed">
                98% germination hybrid seeds, NPOP organic bio-NPK, hand-forged Japanese SK-5 tools, and brass micro-irrigation systems delivered directly to village gates.
              </p>
            </div>

            <div className="pt-6 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold font-heading text-[#121212] group-hover:text-[#C26747] transition-colors mt-6">
              <span>Explore Inputs Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Pillar 03 */}
          <div 
            onClick={() => onEnterPlatform('mandi')}
            className="group cursor-pointer rounded-3xl p-8 bg-[#F5F4F0] border border-black/[0.05] hover:border-black/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black font-heading text-[#C26747]">03</span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#121212] shadow-xs">
                  <Scale className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-lg text-[#121212] mb-2">
                Live Mandi Exchange &amp; Auctions
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans leading-relaxed">
                Real-time price tickers across 2,400+ government APMC mandis. Broadcast your harvested crop lots directly to verified institutional buyers with 0% brokerage fees.
              </p>
            </div>

            <div className="pt-6 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold font-heading text-[#121212] group-hover:text-[#C26747] transition-colors mt-6">
              <span>Enter Trading Floor</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </section>

      {/* Skanvi Editorial Philosophy Section */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16" id="philosophy">
        <div className="rounded-3xl bg-[#121212] text-white p-8 sm:p-14 border border-black/[0.1] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#D4A373] uppercase font-bold block">
              The AgriMart Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-snug">
              "Agriculture deserves the exact same engineering dignity as aerospace or luxury architecture."
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
              We reject adulterated pesticides, fake seed batches, and unfair village monopolies. AgriMart gives farmers transparent pricing, laboratory verification, and cutting-edge industrial machinery at the touch of a button.
            </p>

            <div className="pt-4">
              <button
                onClick={() => onEnterPlatform('store')}
                className="skanvi-pill-btn bg-[#C26747] hover:bg-[#A85536] text-white font-extrabold text-xs shadow-md">
                <span>Enter Platform / Farmer Login</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-2xl font-black text-white block">1.42 L</span>
              <span className="text-white/50 font-sans mt-1 block">Quintals Traded Daily</span>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-2xl font-black text-[#D4A373] block">2,400+</span>
              <span className="text-white/50 font-sans mt-1 block">Connected APMC Mandis</span>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-2xl font-black text-[#10B981] block">1,840</span>
              <span className="text-white/50 font-sans mt-1 block">Verified Grain Merchants</span>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-2xl font-black text-white block">0%</span>
              <span className="text-white/50 font-sans mt-1 block">Brokerage for Farmers</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          GRAND FINALE SECTION: LIVE APMC COMMODITY TRADING FLOOR & STOCK MARKET
          (HIGHLIGHTED AT THE VERY END OF THE PAGE AS REQUESTED!)
          ========================================================================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-20" id="mandi-stock-exchange">
        <div className="rounded-3xl bg-[#F5F4F0] p-8 sm:p-14 border border-black/[0.08] shadow-xl space-y-10">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/[0.08]">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping"></span>
                <span>AgriStock Mandi Exchange &bull; AGMARKNET Verified</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#121212] tracking-tight leading-tight">
                The Real-Time Stock Market for Bharat's Agricultural Harvest.
              </h2>
              <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans leading-relaxed">
                Experience transparent price discovery across 2,400+ government APMC mandis. Compare inter-state modal rates, view real-time weighbridge arrivals, and broadcast your crop lots directly to verified institutional buyers.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => onEnterPlatform('mandi')}
                className="skanvi-pill-btn bg-[#121212] hover:bg-[#C26747] text-white font-extrabold text-xs shadow-lg flex items-center gap-2">
                <span>Enter Live Trading Floor</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Live Groww-Style Stock Market Ticker Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {liveTickers.map((t, idx) => (
              <div 
                key={idx}
                onClick={() => onEnterPlatform('mandi')}
                className="group cursor-pointer bg-white rounded-2xl p-5 border border-black/[0.06] hover:border-[#121212] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#121212] group-hover:text-[#C26747] transition-colors">
                        {t.name}
                      </h4>
                      <span className="text-[11px] text-[#8E8E8E] font-sans block mt-0.5">
                        {t.mandi}
                      </span>
                    </div>

                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      t.isUp ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#EF4444]/15 text-[#EF4444]'
                    }`}>
                      {t.isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {t.change}
                    </span>
                  </div>

                  <div className="my-3">
                    <span className="text-2xl font-black font-mono text-[#121212]">
                      ₹{t.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#8E8E8E] font-sans"> / Quintal</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-[11px] text-[#5A5A5A] font-mono">
                  <span>Day High: ₹{t.high}</span>
                  <span className="text-[#121212] font-bold group-hover:underline flex items-center gap-1 font-sans">
                    <span>Trade</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Financial Market Assurances */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-black/[0.08] text-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#10B981] shadow-xs shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#121212] block font-heading">0% Farmer Brokerage</span>
                <span className="text-[#5A5A5A] text-[11px]">Direct trade with certified millers and exporters.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#121212] shadow-xs shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#121212] block font-heading">Direct Bank Settlement</span>
                <span className="text-[#5A5A5A] text-[11px]">Instant NEFT/RTGS payment upon weight slip generation.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C26747] shadow-xs shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#121212] block font-heading">1,840+ Verified Buyers</span>
                <span className="text-[#5A5A5A] text-[11px]">ITC, Adani Wilmar, Patanjali &amp; registered APMC traders.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D4A373] shadow-xs shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#121212] block font-heading">Free Village Farm Gate Pickup</span>
                <span className="text-[#5A5A5A] text-[11px]">Buyer trucks dispatched directly to your storage godown.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Skanvi Minimalist Footer */}
      <footer className="border-t border-black/[0.06] py-12 px-4 sm:px-8 text-center text-xs text-[#8E8E8E]">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading font-bold text-[#121212] tracking-wider uppercase">
            AGRI<span className="text-[#C26747]">MART</span> &bull; 2026
          </span>
          <span>Architectural Agricultural Operating System &bull; Bharat</span>
          <span>Free Village Gate Delivery on Inputs &bull; COD Available</span>
        </div>
      </footer>

    </div>
  );
}
