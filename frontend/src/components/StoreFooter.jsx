// src/components/StoreFooter.jsx
// Dedicated footer for AG Store & Equipment Rental.
// Contains zero Mandi, APMC, or commodity trading UI.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Tractor, ArrowLeft } from 'lucide-react';
import AGMonogram from './AGMonogram';

export default function StoreFooter({ onSelectCategory, onScrollToRentals }) {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#121212] text-[#8E8E8E] pt-16 pb-12 border-t border-black/[0.1]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand & Mission (Col 1 to 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <AGMonogram className="w-7 h-7 shadow-xs" variant="amber" />
              <span className="text-2xl font-black tracking-[0.16em] text-[#FBFBF9] uppercase font-heading">
                AGRI<span className="text-[#C26747]">STORE</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#8E8E8E] font-sans leading-relaxed max-w-sm">
              Certified seed cultivars, bioactive crop nutrition, and mechanized equipment rental fleet dispatched directly to rural farm gates across India.
            </p>
            <div className="pt-2 text-[11px] text-[#D4A373] font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              <span>100% Certified Lab Purity &amp; Batch Telemetry</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors pt-2 font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to AgriMart Portal</span>
            </button>
          </div>

          {/* Catalog Categories (Col 5 to 7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FBFBF9] tracking-wider uppercase font-heading">
              Certified Inputs
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('seeds')} 
                  className="hover:text-white transition-colors"
                >
                  Hybrid &amp; Certified Seeds
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('care')} 
                  className="hover:text-white transition-colors"
                >
                  Crop Care &amp; Bio-NPK Tonics
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('tools')} 
                  className="hover:text-white transition-colors"
                >
                  Forged Carbon Hand Tools
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory && onSelectCategory('irrigation')} 
                  className="hover:text-white transition-colors"
                >
                  Precision Micro-Irrigation Kits
                </button>
              </li>
              <li>
                <button 
                  onClick={onScrollToRentals} 
                  className="hover:text-[#D4A373] text-[#B45309] font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Tractor className="w-3.5 h-3.5" />
                  <span>Heavy Tractor &amp; Harvester Fleet</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Equipment & Dispatch (Col 8 to 9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#FBFBF9] tracking-wider uppercase font-heading">
              Farm Logistics
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><span className="hover:text-white transition-colors cursor-pointer">Doorstep Delivery Tracking</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Machinery Dispatch Stations</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Implement Attachment Service</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Certified Agronomist Helpline</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Bulk FPO Procurement</span></li>
            </ul>
          </div>

          {/* Newsletter Box (Col 10 to 12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#FBFBF9] tracking-wider uppercase font-heading">
              Agronomy Dispatch
            </h4>
            <p className="text-xs text-[#8E8E8E] leading-relaxed">
              Receive seasonal sowing calendars, certified cultivar arrival alerts, and rental equipment availability.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <input 
                type="email" 
                placeholder="Enter email or mobile number"
                className="w-full bg-white/10 text-white text-xs px-3.5 py-2.5 rounded-full border border-white/15 focus:outline-none focus:border-[#D4A373] placeholder:text-white/40"
              />
              <button 
                type="button"
                className="p-2.5 rounded-full bg-white text-[#121212] hover:bg-[#D4A373] transition-colors shrink-0"
              >
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8E8E8E]">
          <div>
            <span>&copy; 2026 AgriMart AG Store &bull; Agricultural Inputs &amp; Fleet Rental Systems.</span>
          </div>

          <div className="flex items-center gap-4 text-[#8E8E8E]">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Free Doorstep Village Dispatch over ₹499</span>
            </span>
            <span>&bull;</span>
            <span>Cash on Delivery (COD), UPI &amp; RuPay</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

