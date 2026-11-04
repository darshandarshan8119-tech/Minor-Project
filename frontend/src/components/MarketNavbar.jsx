// src/components/MarketNavbar.jsx
// Restored to the original clean Scandinavian light aesthetic.
// Matches the original Navbar styling exactly while remaining strictly isolated to Market & Mandi.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, FileText, ArrowLeft, User, Search, ShieldCheck,
  TrendingUp, Activity, Landmark, Sparkles
} from 'lucide-react';
import AGMonogram from './AGMonogram';

export default function MarketNavbar({ 
  user,
  onOpenLogin,
  mandiTab = 'exchange',
  onSelectMandiTab
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-black/[0.06] transition-all">
      {/* Main Header Bar */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-18 gap-4 sm:gap-8">

          {/* Clean Brandmark + Portal Return */}
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F4F0] hover:bg-[#EBE8E2] text-[#55534E] hover:text-[#121212] text-xs font-semibold font-heading transition-colors border border-black/[0.05]"
              title="Return to AgriMart Central Portal"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Portal</span>
            </button>

            <div 
              onClick={() => onSelectMandiTab('exchange')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <AGMonogram className="w-8 h-8 shadow-xs" variant="emerald" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] font-heading leading-tight">
                  Agri<span className="text-[#10B981]">Market</span>
                </span>
                <span className="text-[10px] tracking-widest text-[#787774] uppercase font-mono -mt-0.5">
                  APMC Mandi &bull; Commodity Terminal
                </span>
              </div>
            </div>
          </div>

          {/* Minimal Live Radar Pill */}
          <div className="flex items-center bg-[#F2F0EB] px-3.5 py-1.5 rounded-full border border-black/[0.05] shrink-0 gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-semibold text-[#1A1A1A] font-heading">
              APMC Live Exchange Radar
            </span>
            <span className="text-[10px] text-[#787774] font-mono hidden sm:inline">&bull; AGMARKNET Verified</span>
          </div>

          {/* Quiet, Minimal Search Input */}
          <div className="hidden lg:flex flex-1 max-w-sm">
            <div className="w-full flex items-center justify-between px-3.5 py-2 bg-[#F6F5F2] hover:bg-[#EFECE5] text-[#787774] text-xs rounded-full border border-black/[0.05] transition-all">
              <div className="flex items-center gap-2 min-w-0">
                <Search className="w-3.5 h-3.5 text-[#888681] shrink-0" />
                <span className="truncate text-xs text-[#787774]">Search ticker, crop, or APMC mandi...</span>
              </div>
              <kbd className="text-[10px] font-mono text-[#888681] bg-white px-1.5 py-0.5 rounded border border-black/[0.06]">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* User Account & Escrow Telemetry */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#166534] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20 font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Escrow Active</span>
            </div>

            {/* Trader Profile */}
            <button 
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#1A1A1A] hover:bg-black/[0.04] rounded-full transition-colors font-medium"
              aria-label="Trader Account">
              <User className="w-4 h-4 text-[#6B6A66]" />
              <span className="hidden sm:inline">
                {user ? (user.name ? user.name.split(' ')[0] : 'Trader') : 'Trader Sign In'}
              </span>
            </button>
          </div>

        </div>

        {/* Clean Editorial Sub-Navigation Bar (Identical to Original Mandi Subnav) */}
        <div className="flex items-center justify-between border-t border-black/[0.06] py-2.5 text-xs overflow-x-auto no-scrollbar gap-6">
          <div className="flex items-center gap-6 sm:gap-7 shrink-0 text-xs font-medium">
            <button
              onClick={() => onSelectMandiTab('exchange')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors ${
                mandiTab === 'exchange' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}>
              <Scale className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Live APMC Exchange</span>
              {mandiTab === 'exchange' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectMandiTab('arrivals')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors ${
                mandiTab === 'arrivals' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}>
              <Activity className="w-3.5 h-3.5 text-[#787774]" />
              <span>Real-Time Arrivals</span>
              {mandiTab === 'arrivals' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectMandiTab('lots')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors ${
                mandiTab === 'lots' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}>
              <TrendingUp className="w-3.5 h-3.5 text-[#787774]" />
              <span>Wholesale Lots</span>
              {mandiTab === 'lots' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectMandiTab('bids')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors ${
                mandiTab === 'bids' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}>
              <Landmark className="w-3.5 h-3.5 text-[#787774]" />
              <span>Merchant Bids</span>
              {mandiTab === 'bids' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectMandiTab('contracts')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors ${
                mandiTab === 'contracts' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}>
              <FileText className="w-3.5 h-3.5 text-[#166534]" />
              <span>Contract Notes &amp; Escrow</span>
              {mandiTab === 'contracts' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectMandiTab('copilot')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors ${
                mandiTab === 'copilot' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#C26747]" />
              <span className="font-semibold">AI Copilot</span>
              {mandiTab === 'copilot' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#C26747] rounded-full" />
              )}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#787774] shrink-0">
            <span>Trading Hours: 09:00 - 17:30 IST</span>
            <span>&bull;</span>
            <span className="text-[#166534] font-semibold">T+0 Spot Settlement</span>
          </div>
        </div>

      </div>
    </header>
  );
}
