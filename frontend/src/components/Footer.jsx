// src/components/Footer.jsx
import React from 'react';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="bg-[#121212] text-[#8E8E8E] pt-16 pb-12 border-t border-black/[0.1]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand & Mission (Col 1 to 4) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-2xl font-black tracking-[0.16em] text-[#FBFBF9] uppercase font-heading block">
              AGRI<span className="text-[#C26747]">MART</span>
            </span>
            <p className="text-xs sm:text-sm text-[#8E8E8E] font-sans leading-relaxed max-w-sm">
              Design-conscious agricultural inputs, certified seed cultivars, and bioactive crop care delivered directly to rural farm gates across India.
            </p>
            <div className="pt-2 text-[11px] text-[#D4A373] font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              <span>100% Certified Lab Purity &amp; Batch Analytics</span>
            </div>
          </div>

          {/* Catalog Categories (Col 5 to 7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FBFBF9] tracking-wider uppercase font-heading">
              Collections
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => onSelectCategory('seeds')} className="hover:text-white transition-colors">Heirloom &amp; Hybrid Seeds</button></li>
              <li><button onClick={() => onSelectCategory('machines')} className="hover:text-white transition-colors">Electric Power Sprayers</button></li>
              <li><button onClick={() => onSelectCategory('care')} className="hover:text-white transition-colors">Botanical Crop Tonics</button></li>
              <li><button onClick={() => onSelectCategory('tools')} className="hover:text-white transition-colors">Forged Carbon Hand Tools</button></li>
              <li><button onClick={() => onSelectCategory('irrigation')} className="hover:text-white transition-colors">Micro-Irrigation Systems</button></li>
            </ul>
          </div>

          {/* Services & Support (Col 8 to 9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#FBFBF9] tracking-wider uppercase font-heading">
              Farmer Service
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Village Delivery Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Agronomist Helpline</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seed Quality Certificates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bulk Estate Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Soil Testing Program</a></li>
            </ul>
          </div>

          {/* Newsletter Box (Col 10 to 12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FBFBF9] tracking-wider uppercase font-heading">
              Farm Journal
            </h4>
            <p className="text-xs text-[#8E8E8E] leading-relaxed">
              Receive seasonal sowing calendars, pest advisories, and harvest market rates.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-white/10 text-white text-xs px-3.5 py-2.5 rounded-full border border-white/15 focus:outline-none focus:border-[#D4A373] placeholder:text-white/40"
              />
              <button className="p-2.5 rounded-full bg-white text-[#121212] hover:bg-[#D4A373] transition-colors shrink-0">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E8E8E]">
          <div>
            <span>&copy; 2026 AgriMart. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[#8E8E8E]">
            <span>Free Doorstep Village Shipping over ₹499</span>
            <span>•</span>
            <span>Secure Payments via UPI, RuPay, NetBanking &amp; COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
