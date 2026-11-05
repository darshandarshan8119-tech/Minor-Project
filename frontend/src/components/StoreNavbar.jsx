// src/components/StoreNavbar.jsx
// Isolated navigation header strictly for AG Store & Equipment Rental.
// Contains zero Mandi, APMC, or commodity trading UI.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Heart, ShoppingBag, User, ArrowLeft,
  Tractor, ShieldCheck
} from 'lucide-react';
// AGMonogram replaced by official logo PNG

export default function StoreNavbar({ 
  user,
  onOpenLogin,
  cartCount = 0, 
  wishlistCount = 0, 
  onOpenCart, 
  onOpenSearch, 
  currentCategory = 'all', 
  onSelectCategory,
  onScrollToRentals
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF4ED]/95 backdrop-blur-md border-b border-[#E8D2C2] transition-all">
      {/* Main Header Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-18 gap-4 sm:gap-8">

          {/* Brandmark + Portal Return */}
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
              onClick={() => navigate('/store-rental/app')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <img src="/assets/logos/ag-store-logo-transparent.png" alt="AG Store" className="w-8 h-8 object-contain" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight font-heading leading-tight" style={{color: '#A85C39'}}>
                  AG Store
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono -mt-0.5 text-stone-500">
                  Store &amp; Equipment Rental &bull; Bharat
                </span>
              </div>
            </div>
          </div>

          {/* Store Search Input */}
          <div className="hidden lg:flex flex-1 max-w-sm">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2 bg-[#F6F5F2] hover:bg-[#EFECE5] text-[#787774] text-xs rounded-full border border-black/[0.05] hover:border-black/15 transition-all">
              <div className="flex items-center gap-2 min-w-0">
                <Search className="w-3.5 h-3.5 text-[#888681] shrink-0" />
                <span className="truncate text-xs text-[#787774]">Search seeds, bio-NPK, tractors...</span>
              </div>
              <kbd className="text-[10px] font-mono text-[#888681] bg-white px-1.5 py-0.5 rounded border border-black/[0.06]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* User + Wishlist + Cart Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* User Account */}
            <button 
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#1A1A1A] hover:bg-black/[0.04] rounded-full transition-colors font-medium"
              aria-label="User Account">
              <User className="w-4 h-4 text-[#6B6A66]" />
              <span className="hidden sm:inline">
                {user ? (user.name ? user.name.split(' ')[0] : 'Member') : 'Sign In'}
              </span>
            </button>

            {/* Wishlist */}
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-[#6B6A66] hover:text-[#1A1A1A] rounded-full hover:bg-black/[0.04] transition-colors"
              aria-label="Wishlist">
              <Heart className="w-4 h-4 stroke-[1.75]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#B45309]" />
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors text-xs font-semibold shadow-xs"
              aria-label="Cart">
              <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
              <span className="font-mono text-xs">{cartCount}</span>
            </button>
          </div>

        </div>

        {/* Store Sub-Navigation Bar */}
        <div className="flex items-center justify-between border-t border-black/[0.06] py-2.5 text-xs overflow-x-auto no-scrollbar gap-6">
          <div className="flex items-center gap-6 sm:gap-7 shrink-0 font-medium">
            <button
              onClick={() => onSelectCategory('all')}
              className={`transition-colors py-1 relative ${
                currentCategory === 'all' 
                  ? 'text-[#1A1A1A] font-bold' 
                  : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}>
              <span>All Certified Inputs</span>
              {currentCategory === 'all' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#1A1A1A] rounded-full" />
              )}
            </button>

            <button
              onClick={onScrollToRentals}
              className="text-[#A85C39] hover:text-[#8E4828] font-medium flex items-center gap-1.5 py-1">
              <Tractor className="w-3.5 h-3.5" />
              <span>Machinery &amp; Fleet Rentals</span>
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

          <div className="hidden md:flex items-center gap-3 text-[11px] text-[#787774] shrink-0">
            <span className="flex items-center gap-1 text-[#059669]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Seeds</span>
            </span>
            <span>&bull;</span>
            <span>48-Hour Rural Dispatch</span>
          </div>
        </div>

      </div>
    </header>
  );
}
