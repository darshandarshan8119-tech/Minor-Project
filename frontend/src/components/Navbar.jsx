// src/components/Navbar.jsx
import React from 'react';
import { 
  Search, Heart, ShoppingBag, User, ArrowRight, 
  Truck, Sparkles, Layers, ShieldCheck, Tractor, TrendingUp, LogOut, Scale, Package, Gavel 
} from 'lucide-react';

export default function Navbar({ 
  user,
  onOpenLogin,
  activeMode,
  onSwitchMode,
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenSearch, 
  currentCategory, 
  onSelectCategory,
  onExitToLanding,
  mandiTab,
  onSelectMandiTab
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-black/[0.06] transition-all">
      {/* Main Header Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-6">

          {/* AgriMart Brandmark */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex flex-col group focus:outline-none shrink-0">
              <span className="text-xl sm:text-2xl font-extrabold tracking-[0.16em] text-[#121212] uppercase font-heading transition-opacity group-hover:opacity-80">
                AGRI<span className="text-[#D97706]">MART</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#8E8E8E] uppercase font-sans -mt-0.5">
                Industrial Agri &amp; Exchange
              </span>
            </a>

            {/* Exit to Public Portal / Landing Button */}
            {onExitToLanding && (
              <button
                onClick={onExitToLanding}
                title="Return to Public Landing Portal"
                className="hidden lg:inline-flex items-center gap-1 text-[10px] font-mono text-[#8E8E8E] hover:text-[#121212] bg-[#F5F4F0] px-2.5 py-1 rounded-full border border-black/[0.05] transition-colors">
                <LogOut className="w-3 h-3" />
                <span>Portal View</span>
              </button>
            )}
          </div>

          {/* EXECUTIVE MODULE MODE SWITCHER (Persistent Pill Switch) */}
          <div className="flex items-center bg-[#F0EFEA] p-1 rounded-full border border-black/[0.08] shadow-inner shrink-0">
            <button
              onClick={() => onSwitchMode('store')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold font-heading transition-all duration-300 ${
                activeMode === 'store'
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'text-[#5A5A5A] hover:text-[#121212]'
              }`}>
              <Tractor className={`w-3.5 h-3.5 ${activeMode === 'store' ? 'text-[#D97706]' : ''}`} />
              <span>Store &amp; Rentals</span>
            </button>

            <button
              onClick={() => onSwitchMode('mandi')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold font-heading transition-all duration-300 ${
                activeMode === 'mandi'
                  ? 'bg-[#111315] text-white shadow-md'
                  : 'text-[#5A5A5A] hover:text-[#121212]'
              }`}>
              <TrendingUp className={`w-3.5 h-3.5 ${activeMode === 'mandi' ? 'text-[#10B981]' : ''}`} />
              <span>AgriStock Mandi</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
            </button>
          </div>

          {/* Minimalist Search Shell */}
          <div className="hidden xl:flex flex-1 max-w-xs mx-2">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between pl-3.5 pr-2.5 py-2 bg-white/90 hover:bg-white text-[#8E8E8E] text-xs rounded-full border border-black/[0.08] hover:border-black/20 transition-all shadow-xs group">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#8E8E8E] group-hover:text-[#121212] transition-colors" />
                <span className="font-sans text-[11px] truncate">Search catalog or mandi...</span>
              </div>
              <kbd className="inline-flex items-center px-1.5 py-0.5 text-[8px] font-semibold text-[#8E8E8E] bg-[#F5F4F0] rounded border border-black/[0.06]">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* User + Wishlist + Cart Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* User Account Button with Profile Capsule */}
            <button 
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 text-[#121212] hover:text-[#D97706] transition-colors rounded-full hover:bg-black/[0.04] text-xs font-semibold font-heading"
              aria-label="User Account">
              <User className="w-4 h-4 stroke-[1.75]" />
              {user && (
                <span className="hidden sm:inline-block max-w-[90px] truncate text-[11px] font-mono text-[#121212]">
                  {user.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button 
              className="relative p-2 text-[#121212] hover:text-[#D97706] transition-colors rounded-full hover:bg-black/[0.04]"
              aria-label="Wishlist">
              <Heart className="w-4 h-4 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D97706]"></span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#121212] text-white hover:bg-[#D97706] transition-all duration-200 active:scale-95 shadow-xs"
              aria-label="Cart">
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              <span className="text-xs font-bold font-heading">{cartCount}</span>
            </button>
          </div>

        </div>

        {/* Dynamic Contextual Sub-Nav based on Active Mode */}
        <div className="flex items-center justify-between border-t border-black/[0.06] py-2.5 text-xs font-semibold text-[#5A5A5A] font-heading overflow-x-auto no-scrollbar">
          {activeMode === 'store' ? (
            <div className="flex items-center gap-6 shrink-0">
              <button
                onClick={() => onSelectCategory('all')}
                className={`transition-colors py-1 flex items-center gap-1.5 ${
                  currentCategory === 'all' 
                    ? 'text-[#121212] font-black border-b-2 border-[#121212]' 
                    : 'hover:text-[#121212]'
                }`}>
                <Layers className="w-3.5 h-3.5" />
                <span>All Store Inputs</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('rentals-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#D97706] hover:text-[#B45309] font-bold flex items-center gap-1">
                <Tractor className="w-3.5 h-3.5" />
                <span>Rentals Fleet</span>
              </button>

              <button
                onClick={() => onSelectCategory('seeds')}
                className={`transition-colors py-1 ${
                  currentCategory === 'seeds' 
                    ? 'text-[#121212] font-black border-b-2 border-[#121212]' 
                    : 'hover:text-[#121212]'
                }`}>
                Hybrid Seeds
              </button>

              <button
                onClick={() => onSelectCategory('care')}
                className={`transition-colors py-1 ${
                  currentCategory === 'care' 
                    ? 'text-[#121212] font-black border-b-2 border-[#121212]' 
                    : 'hover:text-[#121212]'
                }`}>
                Crop Care &amp; Bio-NPK
              </button>

              <button
                onClick={() => onSelectCategory('tools')}
                className={`transition-colors py-1 ${
                  currentCategory === 'tools' 
                    ? 'text-[#121212] font-black border-b-2 border-[#121212]' 
                    : 'hover:text-[#121212]'
                }`}>
                Hand Tools
              </button>

              <button
                onClick={() => onSelectCategory('irrigation')}
                className={`transition-colors py-1 ${
                  currentCategory === 'irrigation' 
                    ? 'text-[#121212] font-black border-b-2 border-[#121212]' 
                    : 'hover:text-[#121212]'
                }`}>
                Micro-Irrigation
              </button>
            </div>
          ) : (
            /* ALL 5 MANDI TABS FULLY FUNCTIONAL WITH ONCLICK AND ACTIVE HIGHLIGHT */
            <div className="flex items-center gap-6 shrink-0 text-xs">
              <button
                onClick={() => onSelectMandiTab('exchange')}
                className={`py-1 flex items-center gap-1.5 transition-colors ${
                  mandiTab === 'exchange' ? 'text-[#121212] font-black border-b-2 border-[#121212]' : 'text-[#5A5A5A] hover:text-[#121212]'
                }`}>
                <Scale className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Live APMC Exchange Floor</span>
              </button>

              <button
                onClick={() => onSelectMandiTab('arrivals')}
                className={`py-1 flex items-center gap-1.5 transition-colors ${
                  mandiTab === 'arrivals' ? 'text-[#121212] font-black border-b-2 border-[#121212]' : 'text-[#5A5A5A] hover:text-[#121212]'
                }`}>
                <Truck className="w-3.5 h-3.5" />
                <span>Real-Time Arrivals</span>
              </button>

              <button
                onClick={() => onSelectMandiTab('lots')}
                className={`py-1 flex items-center gap-1.5 transition-colors ${
                  mandiTab === 'lots' ? 'text-[#121212] font-black border-b-2 border-[#121212]' : 'text-[#5A5A5A] hover:text-[#121212]'
                }`}>
                <Package className="w-3.5 h-3.5" />
                <span>Wholesale Lots</span>
              </button>

              <button
                onClick={() => onSelectMandiTab('bids')}
                className={`py-1 flex items-center gap-1.5 transition-colors ${
                  mandiTab === 'bids' ? 'text-[#121212] font-black border-b-2 border-[#121212]' : 'text-[#5A5A5A] hover:text-[#121212]'
                }`}>
                <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Merchant Bids</span>
              </button>

              <button
                onClick={() => onSelectMandiTab('auction')}
                className={`py-1 flex items-center gap-1.5 transition-colors ${
                  mandiTab === 'auction' ? 'text-[#D97706] font-black border-b-2 border-[#D97706]' : 'text-[#D97706] hover:text-[#B45309]'
                }`}>
                <Gavel className="w-3.5 h-3.5" />
                <span>Kisan Auction Desk</span>
              </button>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#5A5A5A] font-medium bg-[#F5F4F0] px-3 py-1 rounded-full border border-black/[0.04]">
            <ShieldCheck className="w-3 h-3 text-[#D97706]" />
            <span>Pan-India Agricultural Logistics &amp; Mandi Trust</span>
          </div>
        </div>
      </div>
    </header>
  );
}
