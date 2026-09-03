// src/components/MandiMarketTerminal.jsx
import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, ArrowUpRight, Search, 
  Sparkles, ShieldCheck, Scale, CheckCircle2, X 
} from 'lucide-react';
import { LIVE_MANDI_COMMODITIES } from '../data/mockData';

export default function MandiMarketTerminal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState(LIVE_MANDI_COMMODITIES[0]);
  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState(false);
  
  // Auction Form State
  const [auctionData, setAuctionData] = useState({
    crop: 'Wheat (Sharbati)',
    quantity: 50,
    reservePrice: 2450,
    pincode: ''
  });
  const [auctionListed, setAuctionListed] = useState(false);

  const filtered = LIVE_MANDI_COMMODITIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mandi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateAuction = (e) => {
    e.preventDefault();
    setAuctionListed(true);
    setTimeout(() => {
      setAuctionListed(false);
      setIsAuctionModalOpen(false);
    }, 3200);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-12" id="mandi-terminal">
      
      {/* Section Header */}
      <div className="rounded-3xl bg-[#111315] text-white p-6 sm:p-10 border border-white/[0.08] shadow-2xl">
        
        {/* Terminal Title Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-white/[0.1]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E67E22]/20 border border-[#E67E22]/40 text-[#E67E22] text-[11px] font-mono font-bold uppercase mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>APMC Live Mandi &amp; Wholesale Auction Radar</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-white">
              Real-Time Crop Commodity Exchange
            </h2>
            <p className="text-white/60 text-xs sm:text-sm font-sans mt-1 max-w-xl">
              Track live mandi prices across key Indian APMCs. Compare daily fluctuations, volume arrivals, or list your harvest lot for verified merchant auctions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuctionModalOpen(true)}
              className="skanvi-pill-btn bg-[#E67E22] hover:bg-[#D35400] text-[#111315] font-black text-xs shadow-glow transition-all">
              <span>List Harvest Lot for Auction</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Search & Commodity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Left Column: Ticker Table (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by crop name or APMC Mandi (e.g. Wheat, Ludhiana, Karnal)..."
                className="w-full bg-white/5 text-white placeholder:text-white/30 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#E67E22]"
              />
            </div>

            {/* List of Commodities */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto no-scrollbar pr-1">
              {filtered.map((item) => {
                const isSelected = selectedCommodity.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCommodity(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected 
                        ? 'bg-white/10 border-[#E67E22] shadow-md' 
                        : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]'
                    }`}>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-extrabold text-sm text-white">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-mono text-white/40 font-semibold bg-white/5 px-2 py-0.5 rounded">
                          {item.mandi.split(',')[0]}
                        </span>
                      </div>
                      <span className="text-[11px] text-white/50 font-sans block mt-0.5">
                        Volume Arrival: {item.volume}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-black font-mono text-white">
                        ₹{item.price.toLocaleString()} <span className="text-[10px] text-white/40 font-sans">/ Qtl</span>
                      </div>
                      <div className={`inline-flex items-center text-[11px] font-mono font-bold ${
                        item.isUp ? 'text-[#10B981]' : 'text-[#EF4444]'
                      }`}>
                        {item.isUp ? <TrendingUp className="w-3 h-3 mr-1 stroke-[2.5]" /> : <TrendingDown className="w-3 h-3 mr-1 stroke-[2.5]" />}
                        {item.change}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Selected Commodity Deep Dive & Sparkline (5 Cols) */}
          <div className="lg:col-span-5 bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-[11px] font-mono font-bold text-[#E67E22] uppercase tracking-wider">
                  Mandi Detailed Analytics
                </span>
                <span className="text-[10px] text-white/40 font-sans">Updated 12 mins ago</span>
              </div>

              <h3 className="text-xl font-bold font-heading text-white">
                {selectedCommodity.name}
              </h3>
              <p className="text-xs text-white/50 font-sans mt-0.5">
                {selectedCommodity.mandi}
              </p>

              {/* Price Callout */}
              <div className="my-5 p-4 rounded-xl bg-white/5 border border-white/5 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 block">Current Modal Rate</span>
                  <span className="text-3xl font-black font-mono text-white">
                    ₹{selectedCommodity.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-white/50 font-sans"> per Quintal</span>
                </div>

                <div className={`text-right font-mono font-bold text-sm ${
                  selectedCommodity.isUp ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`}>
                  <div>{selectedCommodity.change}</div>
                  <span className="text-[10px] text-white/40 font-sans block">vs yesterday</span>
                </div>
              </div>

              {/* Day High / Low / Volume Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono mb-5">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-white/40 text-[10px] uppercase block font-sans">Day High</span>
                  <span className="font-bold text-white">₹{selectedCommodity.dayHigh.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-white/40 text-[10px] uppercase block font-sans">Day Low</span>
                  <span className="font-bold text-white">₹{selectedCommodity.dayLow.toLocaleString()}</span>
                </div>
              </div>

              {/* 7-Day Trajectory Visual Bar */}
              <div className="space-y-1.5 mb-5">
                <span className="text-[10px] font-mono text-white/40 uppercase block font-sans">7-Day Trajectory Index</span>
                <div className="flex items-end gap-1.5 h-12 pt-2">
                  {selectedCommodity.sparkline.map((val, idx) => {
                    const min = Math.min(...selectedCommodity.sparkline);
                    const max = Math.max(...selectedCommodity.sparkline);
                    const pct = Math.max(20, Math.min(100, Math.round(((val - min) / (max - min || 1)) * 100)));
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className={`w-full rounded-t transition-all ${
                            idx === selectedCommodity.sparkline.length - 1 ? 'bg-[#E67E22]' : 'bg-white/20'
                          }`}
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            <button
              onClick={() => setIsAuctionModalOpen(true)}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs font-heading border border-white/20 transition-all flex items-center justify-center gap-2">
              <span>Sell {selectedCommodity.name.split('(')[0]} on AgriMart Auction</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Kisan Auction Listing Modal */}
      {isAuctionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#181B1E] text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-white/10 shadow-2xl relative animate-in zoom-in-95">
            <button 
              onClick={() => setIsAuctionModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white p-2">
              <X className="w-4 h-4" />
            </button>

            {auctionListed ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Harvest Lot Listed for Auction!</h3>
                <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                  Your lot of <b>{auctionData.quantity} Quintals</b> ({auctionData.crop}) is broadcast to 120+ verified wholesale APMC merchants. Bids will arrive via SMS within 2 hours.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-mono text-[#E67E22] uppercase tracking-wider font-bold block mb-1">
                  Kisan Digital Mandi
                </span>
                <h3 className="text-xl font-bold font-heading text-white mb-2">
                  List Harvest Lot for Wholesale Auction
                </h3>
                <p className="text-xs text-white/60 mb-5 font-sans">
                  Direct merchant procurement at transparent market rates. Zero commission middlemen.
                </p>

                <form onSubmit={handleCreateAuction} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-white/60 mb-1">Crop Commodity:</label>
                    <select 
                      value={auctionData.crop}
                      onChange={(e) => setAuctionData({...auctionData, crop: e.target.value})}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#E67E22]">
                      <option value="Wheat (Sharbati)">Wheat (Sharbati / Desi)</option>
                      <option value="Mustard Seed">Mustard Seed (Sarson)</option>
                      <option value="Cotton (Shankar-6)">Cotton (Kapas)</option>
                      <option value="Basmati Paddy 1121">Basmati Paddy 1121</option>
                      <option value="Soybean (Yellow)">Soybean (Yellow Seed)</option>
                      <option value="Red Chilli (Teja)">Red Chilli (Guntur Teja)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/60 mb-1">Quantity (Quintals):</label>
                      <input 
                        type="number"
                        min={5}
                        max={1000}
                        value={auctionData.quantity}
                        onChange={(e) => setAuctionData({...auctionData, quantity: Number(e.target.value)})}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-[#E67E22]"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 mb-1">Reserve Rate (₹/Qtl):</label>
                      <input 
                        type="number"
                        value={auctionData.reservePrice}
                        onChange={(e) => setAuctionData({...auctionData, reservePrice: Number(e.target.value)})}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-[#E67E22]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 mb-1">Village Farm Pincode:</label>
                    <input 
                      type="text"
                      maxLength={6}
                      required
                      placeholder="Enter 6-digit Pincode (e.g. 141001)"
                      value={auctionData.pincode}
                      onChange={(e) => setAuctionData({...auctionData, pincode: e.target.value})}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#E67E22]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#E67E22] hover:bg-[#D35400] text-[#111315] font-black text-xs rounded-xl transition-all shadow-md mt-2 font-heading">
                    Broadcast Lot to Verified Buyers
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
