// src/components/AgriMartLandingPage.jsx
import React, { useState, useRef } from 'react';
import { 
  Tractor, Scale, Sprout, ArrowRight, ArrowUpRight, 
  ShieldCheck, Lock, Truck, TrendingUp, TrendingDown, 
  Building2, Landmark, CheckCircle2, Cpu, X
} from 'lucide-react';
import AGMonogram from './AGMonogram';

// 3D Tilt Card Component with pointer physics, glare & layered depth
function ApplicationTiltCard({ 
  number,
  badge,
  title, 
  description, 
  highlights, 
  imageSrc, 
  accentColor, 
  accentRgb,
  ctaText, 
  targetRoute,
  icon: Icon,
  onClick 
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle luxury tilt: max 5.5 degrees
    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
      opacity: 0.22
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  };

  return (
    <div 
      ref={cardRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(${isHovered ? 1.018 : 1}, ${isHovered ? 1.018 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform'
      }}
      className="group relative flex flex-col justify-between rounded-3xl overflow-hidden bg-white border border-black/[0.08] shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer min-h-[580px]"
    >
      {/* Dynamic Accent Border Glow */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-30"
        style={{
          boxShadow: `inset 0 0 0 1.5px ${accentColor}, 0 20px 40px -15px rgba(${accentRgb}, 0.25)`
        }}
      />

      {/* 16:9 Cinematic Artwork Frame */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#1A1A1A]">
        <picture>
          <source srcSet={imageSrc} type="image/webp" />
          <img 
            src={imageSrc} 
            alt={`${title} Master Artwork`} 
            loading="lazy"
            className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
          />
        </picture>

        {/* Deep Vignette Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />

        {/* Glare lighting layer following cursor */}
        <div 
          className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 z-15"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 65%)`
          }}
        />

        {/* Top Floating Badge & App Identifier */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase text-white shadow-md backdrop-blur-md border border-white/20"
            style={{ backgroundColor: `rgba(${accentRgb}, 0.85)` }}
          >
            <Icon className="w-3 h-3" />
            <span>{badge}</span>
          </span>

          <span className="text-xs font-mono font-black text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
            {number}
          </span>
        </div>

        {/* Bottom Title inside Image Frame */}
        <div className="absolute bottom-4 left-5 right-5 z-20">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight drop-shadow-md">
            {title}
          </h3>
          <span className="text-[11px] font-mono tracking-widest uppercase text-white/70 block mt-0.5">
            Route: {targetRoute}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-[#4A4A4A] font-sans leading-relaxed">
            {description}
          </p>

          {/* Feature Highlights Pills */}
          <div className="space-y-2 pt-2">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#2A2A2A] font-medium font-sans">
                <div 
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: accentColor }}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive CTA Bar */}
        <div className="pt-5 border-t border-black/[0.06] flex items-center justify-between">
          <span className="text-xs font-mono text-[#8E8E8E] group-hover:text-[#121212] transition-colors">
            Launch Module &rarr;
          </span>

          <button 
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-heading text-white shadow-sm transition-all duration-300 group-hover:shadow-md active:scale-95"
            style={{ backgroundColor: accentColor }}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AgriMartLandingPage({ onEnterPlatform, onNavigateRoute }) {
  // Active modal state for previews or route placeholders
  const [activeModal, setActiveModal] = useState(null); // 'crop' | null

  const liveTickers = [
    { name: 'Wheat (Sharbati)', mandi: 'Ludhiana APMC, PB', price: 2480, change: '+₹60 (2.4%)', isUp: true, high: 2510 },
    { name: 'Mustard Seed (Sarson)', mandi: 'Alwar APMC, RJ', price: 5740, change: '+₹110 (1.9%)', isUp: true, high: 5790 },
    { name: 'Basmati Paddy 1121', mandi: 'Karnal APMC, HR', price: 4450, change: '+₹140 (3.2%)', isUp: true, high: 4490 },
    { name: 'Cotton (Shankar-6)', mandi: 'Rajkot APMC, GJ', price: 7120, change: '-₹40 (0.6%)', isUp: false, high: 7200 },
    { name: 'Soybean (Yellow)', mandi: 'Indore APMC, MP', price: 4850, change: '+₹50 (1.0%)', isUp: true, high: 4890 },
    { name: 'Red Chilli (Teja)', mandi: 'Guntur APMC, AP', price: 18700, change: '+₹800 (4.4%)', isUp: true, high: 19100 },
  ];

  const handleRouteClick = (appKey, defaultRoute) => {
    if (onNavigateRoute) {
      onNavigateRoute(defaultRoute, appKey);
      return;
    }
    if (onEnterPlatform) {
      onEnterPlatform(appKey);
      return;
    }

    if (appKey === 'crop') {
      setActiveModal('crop');
      if (typeof window !== 'undefined' && window.history && window.history.pushState) {
        window.history.pushState(null, '', '#crop-intelligence/login');
      }
      return;
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#121212] flex flex-col font-sans selection:bg-[#EBE8E2] selection:text-[#121212] overflow-x-hidden">
      
      {/* Top Architectural Announcement Strip */}
      <div className="bg-[#121212] text-[#FBFBF9] text-[11px] py-2 px-4 tracking-wide font-medium text-center flex items-center justify-center gap-2 border-b border-white/10">
        <Truck className="w-3.5 h-3.5 text-[#D4A373]" />
        <span>Bharat's Premier Architectural AgriTech Operating System &bull; Store, Mandi &amp; Crop Intelligence</span>
      </div>

      {/* Minimal Premium Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#FBFBF9]/92 backdrop-blur-md border-b border-black/[0.06] transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Mark with Official AgriMart Parent Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              src="/assets/logos/agrimart-parent-logo.png" 
              alt="AgriMart Official Parent Logo" 
              className="h-10 w-auto object-contain max-w-[160px] group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-[0.16em] text-[#121212] uppercase font-heading">
                AGRI<span className="text-[#C26747]">MART</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#8E8E8E] uppercase font-mono -mt-0.5">
                Architectural Platform
              </span>
            </div>
          </div>

          {/* Minimal Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#5A5A5A] font-heading">
            <button 
              onClick={() => scrollToSection('applications')} 
              className="hover:text-[#121212] transition-colors cursor-pointer"
            >
              Applications
            </button>
            <button 
              onClick={() => scrollToSection('philosophy')} 
              className="hover:text-[#121212] transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('mandi-exchange')} 
              className="hover:text-[#121212] text-[#C26747] font-black transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              <span>AgriStock Exchange</span>
            </button>
          </nav>

          {/* Restrained Navigation Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleRouteClick('store', '/store-rental/login')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] hover:bg-[#283618] text-white font-extrabold text-xs font-heading shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 stroke-[2]" />
              <span className="hidden sm:inline">Member Portal /</span>
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          HERO SECTION: CINEMATIC ULTRA-WIDE AGRICULTURAL LANDSCAPE
          ========================================================================= */}
      <section className="relative max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-16">
        
        {/* Editorial Eyebrow & Brand Introduction */}
        <div className="max-w-3xl mb-8 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#F5F4F0] border border-black/[0.08] text-[11px] font-bold tracking-[0.22em] text-[#C26747] uppercase font-mono">
            <AGMonogram className="w-4 h-4" variant="terracotta" />
            <span>AGRIMART PLATFORM 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-[1.08] text-[#121212]">
            Empowering Every Step of Agriculture.
          </h1>

          <p className="text-sm sm:text-base text-[#5A5A5A] font-sans leading-relaxed max-w-2xl">
            One unified architectural operating system connecting agricultural commerce, real-time APMC commodity trading, and autonomous crop intelligence.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => scrollToSection('applications')}
              className="skanvi-pill-btn bg-[#121212] hover:bg-[#283618] text-white shadow-lg text-xs cursor-pointer"
            >
              <span>Explore Applications</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              onClick={() => scrollToSection('mandi-exchange')}
              className="skanvi-pill-btn bg-white hover:bg-[#F5F4F0] text-[#121212] border border-black/[0.1] text-xs cursor-pointer"
            >
              <span>View Mandi Exchange Rates</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ULTRA-WIDE MASTER ARTWORK SHOWCASE FRAME */}
        <div className="group relative w-full aspect-[16/9] max-h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-black/[0.08] bg-[#121212]">
          <picture>
            <source srcSet="/assets/web/agrimart-hero.webp" type="image/webp" />
            <img 
              src="/assets/master/agrimart-hero-master.png" 
              alt="AgriMart Architectural Golden Hour Agricultural Terraces" 
              className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-103"
            />
          </picture>

          {/* Deep Cinematic Contrast Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light bg-radial from-amber-400/30 via-transparent to-transparent z-10" />

          {/* Hero Bottom Floating Layer */}
          <div className="absolute inset-x-6 sm:inset-x-10 bottom-6 sm:bottom-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white z-20">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4A373] uppercase font-bold">
                  AgriMart Central Gateway &bull; Live Network
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                Architectural Agritech Infrastructure
              </h2>
              <p className="text-xs text-white/80 font-sans leading-relaxed">
                Seamless coordination between certified farm machinery fleets, 2,400+ APMC mandis, and satellite-guided agronomic advisory.
              </p>
            </div>

            {/* Quick Launch Pill Tag */}
            <button
              onClick={() => scrollToSection('applications')}
              className="flex items-center gap-3 bg-black/60 hover:bg-black/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-xl transition-all cursor-pointer group/btn"
            >
              <div>
                <span className="text-[9px] text-white/60 uppercase font-mono block">3 Unified Portals</span>
                <span className="text-sm font-bold font-heading text-white">Explore Ecosystem</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white text-[#121212] flex items-center justify-center group-hover/btn:bg-[#C26747] group-hover/btn:text-white transition-colors">
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </div>
            </button>
          </div>
        </div>

        {/* 4 Architectural Scale Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#121212] block">2,400+</span>
            <span className="text-xs text-[#5A5A5A] font-heading mt-1 block">Connected APMC Mandis</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#C26747] block">1.42 L</span>
            <span className="text-xs text-[#5A5A5A] font-heading mt-1 block">Quintals Daily Liquidity</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#10B981] block">98%</span>
            <span className="text-xs text-[#5A5A5A] font-heading mt-1 block">Certified Seed Germination</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#121212] block">0%</span>
            <span className="text-xs text-[#5A5A5A] font-heading mt-1 block">Brokerage for Farmers</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          PHASE 4: THREE APPLICATION ENTRY CARDS (AG STORE, AG MARKET, AG CROP)
          ========================================================================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 border-t border-black/[0.06]" id="applications">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2">
          <p className="text-[11px] font-bold tracking-[0.22em] text-[#8E8E8E] uppercase font-mono">
            Ecosystem Portals
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#121212]">
            Three Independent Applications. One Gateway.
          </h2>
          <p className="text-sm text-[#5A5A5A] font-sans">
            Choose your dedicated workspace tailored for commercial machinery rentals, live commodity market trading, or advanced agronomic crop intelligence.
          </p>
        </div>

        {/* 3 Prominent Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 01 — AG STORE */}
          <ApplicationTiltCard 
            number="01"
            badge="Commerce & Rentals"
            title="AG Store"
            targetRoute="/store-rental/login"
            description="Discover agricultural products, certified inputs, machinery and heavy equipment rentals."
            highlights={[
              "4WD Commercial Tractors & Combine Harvesters on demand",
              "98% Germination hybrid seeds & NPOP organic bio-NPK",
              "Free doorstep village delivery with Cash on Delivery (COD)"
            ]}
            imageSrc="/assets/web/ag-store.webp"
            accentColor="#C26747"
            accentRgb="194, 103, 71"
            ctaText="Explore Store"
            icon={Tractor}
            onClick={() => handleRouteClick('store', '/store-rental/login')}
          />

          {/* CARD 02 — AG MARKET */}
          <ApplicationTiltCard 
            number="02"
            badge="Mandi & Market Copilot"
            title="AG Market"
            targetRoute="/market-mandi/login"
            description="Explore mandi markets, commodity trading and intelligent market insights."
            highlights={[
              "Live price feeds from 2,400+ national APMC mandis",
              "AI Market Copilot with predictive modal rate forecasts",
              "Direct trading floor with 1,840+ verified millers and buyers"
            ]}
            imageSrc="/assets/web/ag-market.webp"
            accentColor="#10B981"
            accentRgb="16, 185, 129"
            ctaText="Explore Market"
            icon={Scale}
            onClick={() => handleRouteClick('mandi', '/market-mandi/login')}
          />

          {/* CARD 03 — AG CROP */}
          <ApplicationTiltCard 
            number="03"
            badge="Crop Intelligence"
            title="AG Crop"
            targetRoute="/crop-intelligence/login"
            description="Discover crop recommendations, disease intelligence and smarter farming guidance."
            highlights={[
              "Computer vision leaf pathology scanner & disease diagnosis",
              "Soil NPK deficiency analysis & micro-nutrient scheduling",
              "Dynamic harvest yield forecasting & satellite weather telemetry"
            ]}
            imageSrc="/assets/web/ag-crop.webp"
            accentColor="#65A30D"
            accentRgb="101, 163, 13"
            ctaText="Explore Crop Intelligence"
            icon={Sprout}
            onClick={() => handleRouteClick('crop', '/crop-intelligence/login')}
          />

        </div>

      </section>

      {/* =========================================================================
          PHILOSOPHY & ARCHITECTURAL AGRITECH VALUES
          ========================================================================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16" id="philosophy">
        <div className="rounded-3xl bg-[#121212] text-white p-8 sm:p-14 border border-black/[0.1] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <AGMonogram className="w-6 h-6" variant="white" />
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#D4A373] uppercase font-bold">
                The AgriMart Standard
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-snug">
              "Agriculture deserves the exact same engineering dignity as aerospace or luxury architecture."
            </h2>
            
            <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
              We eliminate intermediaries and market asymmetry. AgriMart delivers verified laboratory-tested agricultural inputs, industrial field equipment, transparent APMC market spot rates, and agronomic AI intelligence directly to rural farm gates across Bharat.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => handleRouteClick('store', '/store-rental/login')}
                className="skanvi-pill-btn bg-[#C26747] hover:bg-[#A85536] text-white font-extrabold text-xs shadow-md cursor-pointer"
              >
                <span>Launch AG Store</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>

              <button
                onClick={() => handleRouteClick('mandi', '/market-mandi/login')}
                className="skanvi-pill-btn bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 cursor-pointer"
              >
                <span>Launch AG Market</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3 font-sans">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D4A373] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Laboratory Certified Quality</h4>
                <p className="text-xs text-white/60 mt-1">Every seed lot, bio-fertilizer, and mechanical implement is verified against national quality standards.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#10B981] shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Direct Mandi Settlement</h4>
                <p className="text-xs text-white/60 mt-1">Digital weighbridge records and instant bank payout upon delivery slot confirmation.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#65A30D] shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Autonomous Copilot Reasoning</h4>
                <p className="text-xs text-white/60 mt-1">Agentic AI tools synthesize price trends, weather models, and logistics costs for clear decisions.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          GRAND FINALE: LIVE APMC COMMODITY TRADING FLOOR & STOCK MARKET
          ========================================================================= */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16" id="mandi-exchange">
        <div className="rounded-3xl bg-[#F5F4F0] p-8 sm:p-14 border border-black/[0.08] shadow-xl space-y-10">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/[0.08]">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                <span>AgriStock Mandi Exchange &bull; AGMARKNET Verified</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#121212] tracking-tight leading-tight">
                The Real-Time Stock Market for Bharat's Harvest.
              </h2>
              <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans leading-relaxed">
                Experience transparent price discovery across 2,400+ government APMC mandis. Compare inter-state modal rates, view real-time arrivals, and trade directly with verified institutional buyers.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => handleRouteClick('mandi', '/market-mandi/login')}
                className="skanvi-pill-btn bg-[#121212] hover:bg-[#C26747] text-white font-extrabold text-xs shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Enter Live Trading Floor</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Live Commodity Ticker Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {liveTickers.map((t, idx) => (
              <div 
                key={idx}
                onClick={() => handleRouteClick('mandi', '/market-mandi/login')}
                className="group cursor-pointer bg-white rounded-2xl p-5 border border-black/[0.06] hover:border-[#121212] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
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

          {/* 4 Financial Guarantees */}
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
                <span className="text-[#5A5A5A] text-[11px]">ITC, Adani Wilmar, Patanjali &amp; APMC traders.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#D4A373] shadow-xs shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#121212] block font-heading">Village Gate Pickup</span>
                <span className="text-[#5A5A5A] text-[11px]">Buyer trucks dispatched directly to your storage godown.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          MINIMALIST LUXURY FOOTER
          ========================================================================= */}
      <footer className="border-t border-black/[0.06] bg-[#F5F4F0] py-14 px-4 sm:px-8 text-xs text-[#5A5A5A]">
        <div className="max-w-[1400px] mx-auto space-y-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-black/[0.08]">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/logos/agrimart-parent-logo.png" 
                alt="AgriMart Parent Logo" 
                className="h-10 w-auto object-contain max-w-[150px]"
              />
              <div>
                <span className="font-heading font-bold text-base text-[#121212] tracking-wider uppercase block">
                  AGRI<span className="text-[#C26747]">MART</span>
                </span>
                <span className="text-[10px] text-[#8E8E8E] font-mono tracking-widest uppercase">
                  Architectural Agricultural Operating System &bull; Bharat
                </span>
              </div>
            </div>

            {/* Application Quick Jump Links */}
            <div className="flex flex-wrap items-center gap-6 font-heading font-semibold text-xs text-[#2A2A2A]">
              <button 
                onClick={() => handleRouteClick('store', '/store-rental/login')} 
                className="hover:text-[#C26747] transition-colors cursor-pointer"
              >
                AG Store &amp; Machinery
              </button>
              <button 
                onClick={() => handleRouteClick('mandi', '/market-mandi/login')} 
                className="hover:text-[#10B981] transition-colors cursor-pointer"
              >
                AG Market &amp; Copilot
              </button>
              <button 
                onClick={() => handleRouteClick('crop', '/crop-intelligence/login')} 
                className="hover:text-[#65A30D] transition-colors cursor-pointer"
              >
                AG Crop Intelligence
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E8E8E]">
            <span>&copy; {new Date().getFullYear()} AgriMart Technologies Inc. All rights reserved.</span>
            <span>Free Doorstep Village Delivery on Inputs &bull; Cash on Delivery (COD)</span>
            <span>Certified by NPOP, ICAR &amp; APMC AGMARKNET</span>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          PREVIEW MODAL FOR AG CROP INTELLIGENCE (PRESERVATION SAFEGUARD)
          ========================================================================= */}
      {activeModal === 'crop' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-white p-7 sm:p-9 shadow-2xl border border-black/[0.08] space-y-6">
            
            {/* Close Button */}
            <button 
              onClick={() => {
                setActiveModal(null);
                if (typeof window !== 'undefined' && window.history && window.history.pushState) {
                  window.history.pushState(null, '', window.location.pathname);
                }
              }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F4F0] hover:bg-[#E5E5E5] text-[#121212] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#65A30D]/10 text-[#65A30D] text-[10px] font-mono font-bold uppercase tracking-wider">
                <Sprout className="w-3 h-3" />
                <span>AG Crop &bull; Autonomous Agronomy Suite</span>
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-[#121212]">
                Crop Intelligence &amp; Disease Detection
              </h3>
              <p className="text-xs text-[#5A5A5A] font-sans leading-relaxed">
                Currently running in closed pilot across 12 State Agricultural Universities and 450 precision test plots in Punjab, Haryana, and Karnataka.
              </p>
            </div>

            {/* Key Capabilities Preview */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-black/[0.05] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs text-[#121212] block">Hyperspectral Leaf Scanner</span>
                  <span className="text-[11px] text-[#5A5A5A]">Real-time detection of yellow rust, blight, and fungal pathogens with 98.4% diagnostic accuracy.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-black/[0.05] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs text-[#121212] block">Soil Micro-Nutrient Balancer</span>
                  <span className="text-[11px] text-[#5A5A5A]">Custom N-P-K recommendation schedules based on seasonal rainfall models and soil tests.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-black/[0.05] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs text-[#121212] block">Sowing &amp; Harvest Yield Telemetry</span>
                  <span className="text-[11px] text-[#5A5A5A]">Predictive moisture and yield forecasting connected directly to the AG Market terminal.</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-[#8E8E8E]">
                Target Release: Q3 2026
              </span>
              <button
                onClick={() => {
                  setActiveModal(null);
                  if (typeof window !== 'undefined' && window.history && window.history.pushState) {
                    window.history.pushState(null, '', window.location.pathname);
                  }
                }}
                className="px-5 py-2.5 rounded-full bg-[#121212] text-white text-xs font-bold font-heading hover:bg-[#65A30D] transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
