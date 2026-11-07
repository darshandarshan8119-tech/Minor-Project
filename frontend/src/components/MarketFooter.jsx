// src/components/MarketFooter.jsx
// Dedicated footer strictly for AG Market & Mandi Commodity Exchange.
// Contains zero Store, shopping cart, or equipment rental UI.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';
// AGMonogram replaced by official logo PNG

export default function MarketFooter({ onSelectMandiTab }) {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#121212] text-[#8E8E8E] pt-16 pb-12 border-t border-black/[0.1] font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand & Market Mission (Col 1 to 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/assets/logos/official-ag-market-icon.png" alt="AG Market" className="w-8 h-8 object-contain drop-shadow-2xs" />
              <span className="text-2xl font-black tracking-[0.0em] text-white uppercase font-heading">
                AG <span className="text-[#79A9C8]">MARKET</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans leading-relaxed max-w-sm">
              Autonomous agricultural commodity exchange and APMC wholesale trading terminal connecting verified farmers and merchant buyers across national regulated mandis.
            </p>
            <div className="pt-2 text-[11px] text-[#16845B] font-semibold flex items-center gap-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#16845B]" />
              <span>e-NAM Integrated &bull; AGMARKNET Certified Telemetry</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors pt-2 font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to AgriMart Portal</span>
            </button>
          </div>

          {/* Market Navigation (Col 5 to 7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-heading">
              Exchange Operations
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button 
                  onClick={() => onSelectMandiTab && onSelectMandiTab('exchange')} 
                  className="hover:text-white transition-colors"
                >
                  Live APMC Price Terminal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectMandiTab && onSelectMandiTab('arrivals')} 
                  className="hover:text-white transition-colors"
                >
                  Mandi Gate Inward Arrivals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectMandiTab && onSelectMandiTab('lots')} 
                  className="hover:text-white transition-colors"
                >
                  Bulk Commodity Lots
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectMandiTab && onSelectMandiTab('bids')} 
                  className="hover:text-white transition-colors"
                >
                  Merchant Bidding &amp; Auctions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectMandiTab && onSelectMandiTab('contracts')} 
                  className="hover:text-[#16845B] text-[#16845B] font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Contract Notes &amp; Escrow Settlement</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectMandiTab && onSelectMandiTab('copilot')} 
                  className="hover:text-[#C47A37] text-[#C47A37] font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C47A37] animate-pulse" />
                  <span>AgriMart AI Market Copilot</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Regulated APMC Networks (Col 8 to 9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-heading">
              APMC Mandi Boards
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><span className="hover:text-white transition-colors cursor-pointer">Punjab Mandi Board (Ludhiana/Khanna)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Haryana HSAMB (Karnal/Kurukshetra)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Rajasthan RSAMB (Kota/Alwar)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Madhya Pradesh Mandi Board (Indore)</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Karnataka APMC (Bengaluru/Hubballi)</span></li>
            </ul>
          </div>

          {/* Settlement & Escrow Info (Col 10 to 12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-heading">
              Settlement &amp; Compliance
            </h4>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              All transactions executed on AG Market are backed by institutional escrow accounts with T+0 direct bank transfer (DBT) upon electronic weighment and assay verification.
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-[11px] font-mono">
              <div className="flex items-center justify-between text-white/80">
                <span>Trading Hours:</span>
                <span className="text-[#10B981]">09:00 - 17:30 IST</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Settlement Cycle:</span>
                <span className="text-white">Same-Day DBT</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9CA3AF]">
          <div>
            <span>&copy; 2026 AgriMart AG Market &bull; National Commodity Mandi Terminal &amp; Settlement System.</span>
          </div>

          <div className="flex items-center gap-4 text-[#9CA3AF]">
            <span>e-NAM Inter-Mandi Trading Protocol</span>
            <span>&bull;</span>
            <span>APMC Cess &amp; GST Compliant Invoicing</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
