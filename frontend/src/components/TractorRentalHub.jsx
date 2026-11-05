// src/components/TractorRentalHub.jsx
import React, { useState } from 'react';
import { 
  Tractor, Calendar, MapPin, UserCheck, ShieldCheck, 
  ArrowRight, Check, X, Sparkles, Fuel, Zap 
} from 'lucide-react';
import { RENTAL_FLEET } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function TractorRentalHub() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [pricingMode, setPricingMode] = useState('day'); // 'day' or 'acre'
  const [includeDriver, setIncludeDriver] = useState(true);
  const [units, setUnits] = useState(2); // 2 days or 2 acres
  const [pincode, setPincode] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const calculateTotal = (eq) => {
    if (!eq) return 0;
    const baseRate = pricingMode === 'day' ? eq.ratePerDay : eq.ratePerAcre;
    const driverFee = includeDriver && pricingMode === 'day' ? eq.driverChargePerDay : 0;
    return (baseRate + driverFee) * units;
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedEquipment(null);
    }, 3500);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12" id="rentals-section">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A85C39]/15 border border-[#A85C39]/30 text-[#A85C39] text-[11px] font-mono font-bold uppercase mb-2">
            <Tractor className="w-3.5 h-3.5" />
            <span>Heavy Machinery &amp; Tractor Fleet</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-[#121212]">
            Rent Tractors, Harvesters &amp; Drones
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans mt-1 max-w-xl">
            Save capital investment. Book commercial-grade 4WD tractors, rice combine harvesters, and spray drones by the day or per acre with certified field operators.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#121212] bg-[#F5EDE4] px-4 py-2 rounded-full border border-[#E8D2C2]/60 self-start md:self-auto">
          <ShieldCheck className="w-4 h-4 text-[#A85C39]" />
          <span>Full Transit Insurance &amp; Field Replacement Guarantee</span>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RENTAL_FLEET.map((eq) => (
          <div 
            key={eq.id}
            className="skanvi-card rounded-3xl p-5 flex flex-col justify-between group transition-all duration-300">
            
            <div>
              {/* Media Frame */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F4F0] mb-4">
                <img 
                  src={eq.image} 
                  alt={eq.name}
                  onError={(e) => { e.target.src = eq.fallbackImage; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#121212] text-white font-heading">
                  {eq.category}
                </span>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/90 backdrop-blur-sm text-[#121212]">
                  {eq.horsePower}
                </span>
              </div>

              {/* Title & Features */}
              <h3 className="font-heading font-extrabold text-base text-[#121212] leading-snug mb-2">
                {eq.name}
              </h3>

              {/* Feature Tags */}
              <ul className="space-y-1 mb-4 text-xs text-[#5A5A5A] font-sans">
                {eq.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing & Booking Trigger */}
            <div className="pt-4 border-t border-black/[0.06]">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className="text-xl font-black font-mono text-[#121212]">
                    ₹{eq.ratePerDay.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#8E8E8E] font-sans"> / day</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-mono text-[#5A5A5A]">
                    ₹{eq.ratePerAcre}
                  </span>
                  <span className="text-xs text-[#8E8E8E] font-sans"> / acre</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedEquipment(eq)}
                className="w-full py-3 rounded-full bg-[#121212] hover:bg-[#D97706] text-white font-extrabold text-xs font-heading transition-all duration-200 flex items-center justify-center gap-2 shadow-xs active:scale-95">
                <span>Configure &amp; Rent</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Interactive Booking Drawer Modal */}
      {selectedEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-black/[0.08] shadow-2xl relative animate-in zoom-in-95">
            
            <button 
              onClick={() => setSelectedEquipment(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F4F0] hover:bg-black/10 flex items-center justify-center text-[#121212]">
              <X className="w-4 h-4" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <h3 className="text-xl font-bold font-heading text-[#121212]">Machinery Reserved!</h3>
                <p className="text-xs text-[#5A5A5A] max-w-sm mx-auto leading-relaxed">
                  Your reservation for <b>{selectedEquipment.name}</b> is confirmed. Our village logistics hub will dispatch the equipment to your field.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-mono text-[#D97706] uppercase tracking-wider font-bold block mb-1">
                  Machinery Rental Dispatch
                </span>
                <h3 className="text-xl font-bold font-heading text-[#121212] mb-1">
                  {selectedEquipment.name}
                </h3>
                <p className="text-xs text-[#8E8E8E] mb-5 font-sans">
                  {selectedEquipment.category} &bull; {selectedEquipment.horsePower}
                </p>

                <form onSubmit={handleBookNow} className="space-y-4 text-xs">
                  
                  {/* Pricing Mode Toggle */}
                  <div>
                    <label className="block text-[#5A5A5A] font-semibold mb-1.5 font-heading">Rental Basis:</label>
                    <div className="grid grid-cols-2 gap-2 bg-[#F5F4F0] p-1 rounded-xl border border-black/[0.05]">
                      <button
                        type="button"
                        onClick={() => setPricingMode('day')}
                        className={`py-2 text-xs font-bold rounded-lg transition-all ${
                          pricingMode === 'day' ? 'bg-[#121212] text-white shadow-xs' : 'text-[#5A5A5A]'
                        }`}>
                        By Day (₹{selectedEquipment.ratePerDay}/day)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPricingMode('acre')}
                        className={`py-2 text-xs font-bold rounded-lg transition-all ${
                          pricingMode === 'acre' ? 'bg-[#121212] text-white shadow-xs' : 'text-[#5A5A5A]'
                        }`}>
                        By Acre (₹{selectedEquipment.ratePerAcre}/acre)
                      </button>
                    </div>
                  </div>

                  {/* Units Count */}
                  <div>
                    <label className="block text-[#5A5A5A] font-semibold mb-1 font-heading">
                      {pricingMode === 'day' ? 'Number of Days Needed:' : 'Estimated Acreage:'}
                    </label>
                    <div className="flex items-center border border-black/[0.1] rounded-xl bg-white overflow-hidden">
                      <button 
                        type="button"
                        onClick={() => setUnits(Math.max(1, units - 1))}
                        className="px-4 py-2 bg-[#F5F4F0] hover:bg-black/10 font-bold text-sm">-</button>
                      <span className="flex-1 text-center font-mono font-bold text-sm text-[#121212]">{units} {pricingMode === 'day' ? 'Days' : 'Acres'}</span>
                      <button 
                        type="button"
                        onClick={() => setUnits(units + 1)}
                        className="px-4 py-2 bg-[#F5F4F0] hover:bg-black/10 font-bold text-sm">+</button>
                    </div>
                  </div>

                  {/* Certified Driver Toggle */}
                  {pricingMode === 'day' && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#FBFBF9] border border-black/[0.06]">
                      <div>
                        <span className="font-heading font-bold text-xs text-[#121212] block">Include Certified Operator</span>
                        <span className="text-[11px] text-[#8E8E8E] font-sans">+₹{selectedEquipment.driverChargePerDay}/day (skilled driver included)</span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={includeDriver}
                        onChange={(e) => setIncludeDriver(e.target.checked)}
                        className="w-4 h-4 accent-[#121212]"
                      />
                    </div>
                  )}

                  {/* Pincode Input */}
                  <div>
                    <label className="block text-[#5A5A5A] font-semibold mb-1 font-heading">Farm Field Pincode:</label>
                    <input 
                      type="text"
                      required
                      maxLength={6}
                      placeholder="Enter 6-digit village pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-black/[0.1] rounded-xl font-mono text-xs focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  {/* Cost Calculation Summary */}
                  <div className="p-3.5 rounded-xl bg-[#F5F4F0] border border-black/[0.05] space-y-1 text-xs">
                    <div className="flex justify-between text-[#5A5A5A]">
                      <span>Equipment Rental:</span>
                      <span className="font-mono font-bold">₹{((pricingMode === 'day' ? selectedEquipment.ratePerDay : selectedEquipment.ratePerAcre) * units).toLocaleString()}</span>
                    </div>
                    {includeDriver && pricingMode === 'day' && (
                      <div className="flex justify-between text-[#5A5A5A]">
                        <span>Operator Charge:</span>
                        <span className="font-mono font-bold">₹{(selectedEquipment.driverChargePerDay * units).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-black text-[#121212] pt-2 border-t border-black/[0.08]">
                      <span>Estimated Total:</span>
                      <span className="text-base text-[#D97706]">₹{calculateTotal(selectedEquipment).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#121212] hover:bg-[#D97706] text-white font-extrabold text-xs transition-all shadow-md active:scale-95 font-heading">
                    Confirm Machinery Booking (Pay upon Field Delivery)
                  </button>

                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
