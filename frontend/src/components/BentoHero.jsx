// src/components/BentoHero.jsx
import React, { useState, useEffect } from 'react';
import { 
  Zap, Clock, ArrowRight, Truck, CheckCircle2, 
  MapPin, PhoneCall, ShieldCheck, Sparkles, Search 
} from 'lucide-react';

export default function BentoHero({ onAddToCart, onQuickView, onSearchTag }) {
  // Flash Deal Countdown Timer (Hours, Mins, Secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });
  
  // Village Pincode Checker State
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus({
        success: true,
        message: `Pincode ${pincode} eligible for Free Village Dispatch within 36 Hours!`
      });
    } else {
      setPincodeStatus({
        success: false,
        message: 'Please enter a valid 6-digit rural Indian pincode.'
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/*  CARD 1: MAIN BENTO HERO (Span 8)  */}
        <div className="lg:col-span-8 rounded-bento bg-mesh-green text-white p-7 sm:p-10 relative overflow-hidden flex flex-col justify-between shadow-2xl border border-emerald-500/25">
          {/*  Ambient Glow Blurs  */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary-light/20 blur-3xl pointer-events-none"></div>
          <div className="absolute right-10 bottom-0 w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none"></div>

          <div>
            {/*  Live Badge  */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300 mb-6 font-heading shadow-xs">
              <span class="flex h-2 w-2 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Direct-from-Factory Agriculture Marketplace</span>
            </div>

            {/*  Bold Value Prop Headline  */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black font-heading tracking-tight leading-[1.12] mb-4 text-white max-w-2xl">
              High-Yield Certified Seeds &amp; Modern Agri-Tech, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-accent-light">
                Delivered Directly to Your Farm.
              </span>
            </h1>

            {/*  Subtitle  */}
            <p className="text-emerald-100/80 text-sm sm:text-base max-w-xl font-sans mb-7 leading-relaxed">
              Order tested hybrid seeds, electric power sprayers, organic bio-fertilizers, and field machinery with guaranteed germination and doorstep village dispatch.
            </p>

            {/*  Popular Quick-Search Tag Pills  */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-200/90 font-sans mb-8">
              <span className="text-emerald-400 font-bold font-heading">Popular Searches:</span>
              <button onClick={() => onSearchTag('maize')} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-xs active:scale-95">🌽 Hybrid Maize</button>
              <button onClick={() => onSearchTag('sprayer')} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-xs active:scale-95">⚡ Power Sprayer</button>
              <button onClick={() => onSearchTag('fungicide')} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-xs active:scale-95">🛡️ Sheath Blight</button>
              <button onClick={() => onSearchTag('drip')} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-xs active:scale-95">💧 Drip Irrigation</button>
            </div>
          </div>

          {/*  Bottom Stats Counter  */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-heading">15,000+</div>
              <div className="text-xs text-emerald-200/70 font-medium">Registered Farmers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-accent-light font-heading">98.4%</div>
              <div className="text-xs text-emerald-200/70 font-medium">Certified Germination</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-heading">48 Hours</div>
              <div className="text-xs text-emerald-200/70 font-medium">Village Dispatch</div>
            </div>
          </div>
        </div>

        {/*  SIDE BENTO COLUMN (Span 4)  */}
        <div className="lg:col-span-4 flex flex-col gap-5">

          {/*  BENTO CARD 2: FLASH HARVEST DEAL  */}
          <div className="rounded-bento bg-gradient-to-br from-amber-500/10 via-white to-emerald-50/40 p-6 border border-amber-200/80 shadow-bento relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-amber-500 text-white font-heading shadow-xs">
                  <Zap className="w-3.5 h-3.5 fill-white" /> Kisan Flash Deal
                </span>

                {/*  Animated Countdown Clock  */}
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-800 bg-amber-100/90 px-2.5 py-1 rounded-xl font-heading shadow-inner">
                  <Clock className="w-3 h-3 text-amber-700" />
                  <span>
                    {String(timeLeft.hours).padStart(2, '0')}:
                    {String(timeLeft.minutes).padStart(2, '0')}:
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 my-3">
                <img 
                  src="https://images.unsplash.com/photo-1592417817098-8f3d691023c9?auto=format&fit=crop&w=300&q=80" 
                  alt="Electric Sprayer" 
                  className="w-16 h-16 object-cover rounded-xl border border-amber-200 shadow-sm shrink-0" 
                />
                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">
                    AgroShakti 20L Double Motor Sprayer
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-black text-primary font-heading">₹3,899</span>
                    <span className="text-xs text-slate-400 line-through">₹4,799</span>
                    <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">-19%</span>
                  </div>
                </div>
              </div>

              {/*  Claimed Progress Bar  */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                  <span>Claimed: 84%</span>
                  <span className="text-rose-600 font-bold">Only 4 left in stock</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full w-[84%]"></div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onAddToCart(2)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all active:scale-95 font-heading">
              <span>Claim Flash Deal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/*  BENTO CARD 3: VILLAGE LOGISTICS & PINCODE CHECKER  */}
          <div className="rounded-bento bg-gradient-to-br from-emerald-950 via-primary-deep to-emerald-950 text-white p-6 border border-emerald-600/30 shadow-bento relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-extrabold text-sm text-white">Village Delivery Checker</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded-full border border-emerald-700">Pan-India</span>
              </div>

              <p className="text-xs text-emerald-100/70 mb-3.5 font-sans leading-relaxed">
                Check whether your village farm qualifies for free doorstep delivery &amp; Cash on Delivery (COD).
              </p>

              {/*  Pincode Form  */}
              <form onSubmit={handleCheckPincode} className="flex items-center gap-2 mb-2">
                <div className="relative flex-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    className="w-full pl-8 pr-3 py-2 bg-white/10 text-white placeholder:text-emerald-200/50 text-xs rounded-xl border border-white/20 focus:outline-none focus:border-accent"
                  />
                </div>
                <button type="submit" className="px-3.5 py-2 bg-accent hover:bg-accent-dark text-slate-900 font-extrabold text-xs rounded-xl transition-all font-heading">
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <div className={`text-[11px] p-2 rounded-lg font-medium ${pincodeStatus.success ? 'bg-emerald-800/60 text-emerald-200 border border-emerald-600/60' : 'bg-rose-900/60 text-rose-200 border border-rose-700/60'}`}>
                  {pincodeStatus.message}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs mt-3">
              <span className="text-emerald-300 font-medium">Free Agronomist Advice:</span>
              <a href="tel:18002474627" className="font-bold text-accent-light hover:underline flex items-center gap-1">
                <PhoneCall className="w-3 h-3" /> Call Free
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
