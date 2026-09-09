// src/components/Navbar.jsx
import React from 'react';
import { 
  Search, Heart, ShoppingBag, User, ArrowRight, 
  Layers, Tractor, TrendingUp, Scale, Package, Gavel
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
  mandiTab,
  onSelectMandiTab
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-black/[0.06] transition-all">
      {/* Main Header Bar */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-18 gap-4 sm:gap-8">

          {/* Clean Brandmark */}
          <div className="flex items-center gap-4 shrink-0">
            <a href="#" className="flex flex-col group focus:outline-none shrink-0">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] font-heading">
                Agri<span className="text-[#B45309]">mart</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#787774] uppercase font-mono -mt-0.5">
                Inputs &bull; Mandi Exchange
              </span>
            </a>
          </div>

          {/* Minimal Mode Toggle (Store vs Mandi) */}
          <div className="flex items-center bg-[#F2F0EB] p-1 rounded-full border border-black/[0.05] shrink-0">
            <button
              onClick={() => onSwitchMode('store')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeMode === 'store'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}>
              <Tractor className="w-3.5 h-3.5" />
              <span>Store &amp; Rentals</span>
            </button>

            <button
              onClick={() => onSwitchMode('mandi')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeMode === 'mandi'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}>
              <TrendingUp className="w-3.5 h-3.5" />
              <span>AgriStock Mandi</span>
            </button>
          </div>

          {/* Quiet, Minimal Search Input */}
          <div className="hidden lg:flex flex-1 max-w-sm">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-[#F6F5F2] hover:bg-[#EFECE5] text-[#787774] text-xs rounded-full border border-black/[0.05] hover:border-black/15 transition-all">
              <div className="flex items-center gap-2 min-w-0">
                <Search className="w-3.5 h-3.5 text-[#888681] shrink-0" />
                <span className="truncate text-xs text-[#787774]">Search seeds, tools, mandi...</span>
              </div>
              <kbd className="text-[10px] font-mono text-[#888681] bg-white px-1.5 py-0.5 rounded border border-black/[0.06]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* User + Wishlist + Cart Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* User Profile */}
            <button 
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#1A1A1A] hover:bg-black/[0.04] rounded-full transition-colors font-medium"
              aria-label="User Account">
              <User className="w-4 h-4 text-[#6B6A66]" />
              <span className="hidden sm:inline">
                {user ? user.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => onOpenCart()}
              className="relative p-2 text-[#6B6A66] hover:text-[#1A1A1A] rounded-full hover:bg-black/[0.04] transition-colors"
              aria-label="Wishlist">
              <Heart className="w-4 h-4 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#B45309]" />
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors text-xs font-semibold shadow-xs"
              aria-label="Cart">
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
              <span className="font-mono text-xs">{cartCount}</span>
            </button>
          </div>

        </div>

        {/* Clean Editorial Sub-Navigation Bar */}
        <div className="flex items-center justify-between border-t border-black/[0.06] py-2.5 text-xs overflow-x-auto no-scrollbar gap-6">
          {activeMode === 'store' ? (
            <div className="flex items-center gap-6 sm:gap-7 shrink-0 font-medium">
              <button
                onClick={() => onSelectCategory('all')}
                className={`transition-colors py-1 relative ${
                  currentCategory === 'all' 
                    ? 'text-[#1A1A1A] font-bold' 
                    : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                }`}>
                <span>All Inputs</span>
                {currentCategory === 'all' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
                )}
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('rentals-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#B45309] hover:text-[#92400E] font-medium flex items-center gap-1.5 py-1">
                <Tractor className="w-3.5 h-3.5" />
                <span>Rentals Fleet</span>
              </button>

              <button
                onClick={() => onSelectCategory('seeds')}
                className={`transition-colors py-1 relative ${
                  currentCategory === 'seeds' 
                    ? 'text-[#1A1A1A] font-bold' 
                    : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                }`}>
                <span>Hybrid Seeds</span>
                {currentCategory === 'seeds' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onSelectCategory('care')}
                className={`transition-colors py-1 relative ${
                  currentCategory === 'care' 
                    ? 'text-[#1A1A1A] font-bold' 
                    : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                }`}>
                <span>Crop Care &amp; Bio-NPK</span>
                {currentCategory === 'care' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onSelectCategory('tools')}
                className={`transition-colors py-1 relative ${
                  currentCategory === 'tools' 
                    ? 'text-[#1A1A1A] font-bold' 
                    : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                }`}>
                <span>Hand Tools</span>
                {currentCategory === 'tools' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onSelectCategory('irrigation')}
                className={`transition-colors py-1 relative ${
                  currentCategory === 'irrigation' 
                    ? 'text-[#1A1A1A] font-bold' 
                    : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                }`}>
                <span>Micro-Irrigation</span>
                {currentCategory === 'irrigation' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
                )}
              </button>
            </div>
          ) : (
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
                className={`py-1 relative transition-colors ${
                  mandiTab === 'arrivals' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                }`}>
                <span>Real-Time Arrivals</span>
                {mandiTab === 'arrivals' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onSelectMandiTab('lots')}
                className={`py-1 relative transition-colors ${
                  mandiTab === 'lots' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                }`}>
                <span>Wholesale Lots</span>
                {mandiTab === 'lots' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onSelectMandiTab('bids')}
                className={`py-1 relative transition-colors ${
                  mandiTab === 'bids' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                }`}>
                <span>Merchant Bids</span>
                {mandiTab === 'bids' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onSelectMandiTab('auction')}
                className={`py-1 relative flex items-center gap-1.5 transition-colors ${
                  mandiTab === 'auction' ? 'text-[#B45309] font-bold' : 'text-[#B45309]/80 hover:text-[#B45309]'
                }`}>
                <Gavel className="w-3.5 h-3.5" />
                <span>Kisan Auction Desk</span>
                {mandiTab === 'auction' && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#B45309] rounded-full" />
                )}
              </button>
            </div>
          )}

          {/* Subtle Right Note */}
          <span className="hidden sm:inline-block text-[11px] text-[#888681] font-sans shrink-0">
            Pan-India Village Delivery &bull; Verified Escrow
          </span>
        </div>
      </div>
    </header>
  );
}
