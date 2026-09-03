// src/components/CartDrawer.jsx
import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem,
  onClearCart 
}) {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeShippingThreshold = 499;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const discountAmount = couponApplied ? Math.min(150, Math.floor(subtotal * 0.1)) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + (isFreeShipping || subtotal === 0 ? 0 : 50));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'AGRIMART10' || couponCode.trim().toUpperCase() === 'KISAN10') {
      setCouponApplied(true);
    } else {
      alert('Invalid promo code. Use "AGRIMART10" for 10% farmer discount.');
    }
  };

  const handleCheckout = () => {
    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.6 }
    });
    setOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
      setOrderPlaced(false);
      onClose();
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-black/[0.06] animate-in slide-in-from-right duration-300">
          
          {/* Top Header */}
          <div className="p-6 border-b border-black/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#121212] stroke-[1.75]" />
              <h2 className="text-base font-extrabold font-heading text-[#121212] tracking-tight">
                Your Farm Cart
              </h2>
              <span className="text-xs font-bold text-[#8E8E8E] font-sans">
                ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 rounded-full hover:bg-[#F5F4F0] flex items-center justify-center text-[#8E8E8E] hover:text-[#121212] transition-colors">
              <X className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-6 py-3 bg-[#FBFBF9] border-b border-black/[0.06] text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-[#121212] font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#283618]" />
                <span>Free Doorstep Village Delivery unlocked!</span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-[#5A5A5A] font-medium mb-1.5">
                  <span>Add ₹{missingForFreeShipping} more for <b>Free Delivery</b></span>
                  <span className="font-bold text-[#121212] font-heading">{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#EBE8E2] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#121212] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderPlaced ? (
              <div className="text-center py-20 space-y-3 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-[#F5F4F0] text-[#121212] flex items-center justify-center text-2xl mx-auto">
                  🌾
                </div>
                <h3 className="text-xl font-bold font-heading text-[#121212]">Order Confirmed!</h3>
                <p className="text-xs text-[#8E8E8E] max-w-xs mx-auto leading-relaxed font-sans">
                  Thank you! Your seed cultivars and farm inputs are being packed for 48-hour village gate dispatch.
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-24 space-y-3">
                <ShoppingBag className="w-8 h-8 text-[#8E8E8E] mx-auto stroke-[1.25]" />
                <h3 className="text-base font-bold font-heading text-[#121212]">Your cart is empty</h3>
                <p className="text-xs text-[#8E8E8E] max-w-xs mx-auto font-sans">
                  Explore our certified catalog of hybrid seeds, power sprayers, and crop care formulations.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-3 skanvi-pill-btn bg-[#121212] text-white">
                  Explore Catalog
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-3.5 rounded-2xl bg-[#FBFBF9] border border-black/[0.05] transition-colors">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-xl border border-black/[0.06] shrink-0 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-extrabold text-xs text-[#121212] truncate mb-1">
                      {item.name}
                    </h4>
                    <div className="text-xs font-black text-[#121212] font-heading mb-2">
                      ₹{item.price}
                    </div>

                    {/* Stepper & Trash */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-black/[0.1] rounded-full bg-white overflow-hidden text-xs">
                        <button 
                          onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2.5 py-1 text-[#5A5A5A] hover:bg-black/[0.05] font-bold">-</button>
                        <span className="px-2 text-[#121212] font-black font-heading min-w-[20px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-[#5A5A5A] hover:bg-black/[0.05] font-bold">+</button>
                      </div>

                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#8E8E8E] hover:text-rose-600 p-1 transition-colors">
                        <Trash2 className="w-4 h-4 stroke-[1.75]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: Coupon & Checkout */}
          {cartItems.length > 0 && !orderPlaced && (
            <div className="p-6 border-t border-black/[0.06] bg-[#FBFBF9] space-y-4">
              
              {/* Coupon Box */}
              <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo Code (e.g. AGRIMART10)"
                  className="flex-1 px-3.5 py-2 bg-white text-xs rounded-full border border-black/[0.1] uppercase font-semibold focus:outline-none focus:border-[#121212]"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-[#121212] text-white font-bold text-xs rounded-full hover:bg-[#283618] transition-colors font-heading">
                  Apply
                </button>
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5A5A5A] pt-2 border-t border-black/[0.06] font-sans">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#121212] font-heading">₹{subtotal}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[#C26747] font-bold font-heading">
                    <span>Discount (10%):</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Village Delivery:</span>
                  <span className={`font-bold ${isFreeShipping ? 'text-[#283618] font-heading' : 'text-[#121212]'}`}>
                    {isFreeShipping ? 'FREE' : '₹50'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#121212] font-heading pt-2 border-t border-black/[0.06]">
                  <span>Total Payable:</span>
                  <span className="text-base">₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#121212] hover:bg-[#283618] text-white font-extrabold text-xs py-3.5 rounded-full shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 font-heading">
                <span>Place Order (Cash on Delivery / UPI)</span>
                <ArrowRight className="w-4 h-4 stroke-[1.75]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
