// src/components/QuickViewModal.jsx
import React, { useState } from 'react';
import { X, ShoppingBag, Truck, ShieldCheck, Star } from 'lucide-react';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-black/[0.08] max-h-[92vh] flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F5F4F0] hover:bg-[#EBE8E2] text-[#121212] flex items-center justify-center transition-colors z-20 focus:outline-none"
          aria-label="Close modal">
          <X className="w-4 h-4 stroke-[1.75]" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Column: Product Studio Shot */}
            <div className="md:w-1/2 flex flex-col gap-3">
              <div className="aspect-square rounded-2xl bg-[#F5F4F0] border border-black/[0.06] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-[#FBFBF9] rounded-xl p-3 border border-black/[0.06] text-xs text-[#5A5A5A] space-y-1.5 font-sans">
                <div className="flex items-center gap-2 font-bold text-[#121212] font-heading">
                  <ShieldCheck className="w-4 h-4 text-[#C26747]" />
                  <span>100% Certified Lab Purity Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <Truck className="w-3.5 h-3.5 text-[#5A5A5A]" />
                  <span>Free village dispatch directly to your gate</span>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Technical Specs */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-[0.22em] text-[#8E8E8E] uppercase font-sans block mb-1">
                  {product.brand}
                </span>

                <h2 className="text-xl sm:text-2xl font-extrabold text-[#121212] font-heading mb-2 leading-snug">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-4 text-xs">
                  <div className="flex text-[#D4A373]">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-[#D4A373] text-[#D4A373]' : 'text-[#EBE8E2]'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-extrabold text-[#121212] font-heading">{product.rating}</span>
                  <span className="text-[#8E8E8E] font-sans">({product.reviewCount} Verified Farmer Reviews)</span>
                </div>

                <div className="flex items-baseline gap-3 mb-4 p-3 rounded-2xl bg-[#F5F4F0] border border-black/[0.04]">
                  <span className="text-2xl font-black text-[#121212] font-heading">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs font-semibold text-[#8E8E8E] line-through font-sans">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-[10px] text-[#8E8E8E] font-sans">incl. taxes / {product.unit}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans leading-relaxed mb-5">
                  {product.shortDescription}
                </p>

                {/* Technical Specifications */}
                {product.specifications && (
                  <div className="mb-5 bg-[#FBFBF9] rounded-xl p-3.5 border border-black/[0.06] text-xs space-y-1.5">
                    <span className="font-bold text-[#121212] block mb-1 font-heading text-[10px] tracking-wider uppercase">
                      Technical Specifications:
                    </span>
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-0.5 border-b border-black/[0.04] last:border-0">
                        <span className="text-[#8E8E8E]">{key}:</span>
                        <span className="font-bold text-[#121212] font-heading">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quantity Stepper & Add to Bag */}
              <div className="pt-4 border-t border-black/[0.06] flex items-center gap-3">
                <div className="flex items-center border border-black/[0.1] rounded-full bg-[#F5F4F0] overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-[#5A5A5A] hover:bg-black/[0.06] text-sm font-bold">-</button>
                  <span className="px-2 text-xs font-black font-heading text-[#121212] min-w-[28px] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-[#5A5A5A] hover:bg-black/[0.06] text-sm font-bold">+</button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product.id, quantity);
                    onClose();
                  }}
                  className="flex-1 bg-[#121212] hover:bg-[#283618] text-white font-extrabold text-xs py-3 px-5 rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 font-heading">
                  <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                  <span>Add to Cart (₹{product.price * quantity})</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
