// src/components/ProductCard.jsx
import React from 'react';
import { Heart, Plus, ArrowRight } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onQuickView, 
  onToggleWishlist, 
  isWishlisted 
}) {
  return (
    <div className="group relative flex flex-col skanvi-card rounded-2xl p-3.5 transition-all duration-300">
      
      {/* Media Frame with Hover Depth */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#F5F4F0] mb-3.5 cursor-pointer">
        
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Top Tag */}
        {product.tag && (
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#121212] text-white font-heading shadow-xs">
            {product.tag}
          </span>
        )}

        {/* Wishlist Heart Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 shadow-xs hover:scale-105 ${
            isWishlisted ? 'text-[#C26747]' : 'text-[#8E8E8E] hover:text-[#121212]'
          }`}
          aria-label="Wishlist">
          <Heart className={`w-4 h-4 stroke-[1.75] ${isWishlisted ? 'fill-[#C26747]' : ''}`} />
        </button>

        {/* Hover Quick-Add Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.id);
            }}
            className="w-full py-2.5 rounded-full bg-[#121212] hover:bg-[#283618] text-white text-xs font-bold font-heading flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95">
            <span>Add to Cart</span>
            <Plus className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          {/* Brand */}
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#8E8E8E] uppercase font-sans block mb-1">
            {product.brand}
          </span>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-heading font-extrabold text-sm sm:text-base text-[#121212] hover:text-[#C26747] transition-colors leading-snug line-clamp-2 cursor-pointer mb-2">
            {product.name}
          </h3>
        </div>

        {/* Price & Mobile Add Button */}
        <div className="pt-2 border-t border-black/[0.05] flex items-center justify-between mt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-[#121212] font-heading">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#8E8E8E] line-through font-sans">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#8E8E8E] font-sans">incl. taxes / {product.unit}</span>
          </div>

          {/* Mobile Instant Add */}
          <button
            onClick={() => onAddToCart(product.id)}
            className="sm:hidden p-2 rounded-full bg-[#121212] text-white text-xs active:scale-90"
            aria-label="Add to cart">
            <Plus className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

    </div>
  );
}
