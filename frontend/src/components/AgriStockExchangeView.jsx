// src/components/AgriStockExchangeView.jsx
import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Scale, Truck, Package, 
  Gavel, Users, Search, ArrowUpRight, ShieldCheck, 
  CheckCircle2, Clock, Filter, ArrowRight, DollarSign, Sparkles, X, Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AgriStockExchangeView({ activeTab, onTabChange }) {
  // Crop filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropModal, setSelectedCropModal] = useState(null);

  // Real-time Arrivals Data with Interactive Modal
  const [selectedArrival, setSelectedArrival] = useState(null);
  const mandiArrivals = [
    {
      id: 'arr-1',
      mandi: 'Ludhiana APMC, Punjab',
      crop: 'Wheat (Sharbati)',
      todayArrival: '4,250 Quintals',
      vehicleCount: '142 Tractors & Trucks',
      currentRate: 2450,
      prevRate: 2390,
      trend: '+2.4%',
      isUp: true,
      gateStatus: 'Gate 2 & 4 Open (Smooth Transit)',
      updatedAt: 'Just now',
      weighbridgeQueue: [
        { vehicle: 'PB-10-DT-4821 (Tractor Trolley)', weight: '42 Quintals', moisture: '11.2%' },
        { vehicle: 'PB-08-AX-9912 (12-Wheeler Truck)', weight: '180 Quintals', moisture: '11.6%' },
        { vehicle: 'PB-11-K-3341 (Tractor Trolley)', weight: '38 Quintals', moisture: '11.0%' }
      ]
    },
    {
      id: 'arr-2',
      mandi: 'Alwar APMC, Rajasthan',
      crop: 'Mustard (Sarson)',
      todayArrival: '2,890 Quintals',
      vehicleCount: '98 Pickups & Trolleys',
      currentRate: 5680,
      prevRate: 5580,
      trend: '+1.8%',
      isUp: true,
      gateStatus: 'Gate 1 Heavy Inflow',
      updatedAt: '4 mins ago',
      weighbridgeQueue: [
        { vehicle: 'RJ-02-GB-1102 (Mahindra Bolero Pickup)', weight: '22 Quintals', moisture: '9.0%' },
        { vehicle: 'RJ-02-TA-8419 (Tractor Trolley)', weight: '54 Quintals', moisture: '9.4%' }
      ]
    },
    {
      id: 'arr-3',
      mandi: 'Rajkot APMC, Gujarat',
      crop: 'Cotton (Shankar-6)',
      todayArrival: '6,400 Bales',
      vehicleCount: '210 Trucks',
      currentRate: 7140,
      prevRate: 7180,
      trend: '-0.6%',
      isUp: false,
      gateStatus: 'Normal Inflow',
      updatedAt: '12 mins ago',
      weighbridgeQueue: [
        { vehicle: 'GJ-03-BW-7781 (Trailer Truck)', weight: '120 Bales', moisture: '8.2%' }
      ]
    },
    {
      id: 'arr-4',
      mandi: 'Karnal APMC, Haryana',
      crop: 'Basmati Paddy 1121',
      todayArrival: '5,120 Quintals',
      vehicleCount: '165 Trolleys',
      currentRate: 4420,
      prevRate: 4290,
      trend: '+3.1%',
      isUp: true,
      gateStatus: 'All Gates Operational',
      updatedAt: '2 mins ago',
      weighbridgeQueue: [
        { vehicle: 'HR-05-AB-5519 (Tractor Trolley)', weight: '65 Quintals', moisture: '12.1%' }
      ]
    },
    {
      id: 'arr-5',
      mandi: 'Indore APMC, Madhya Pradesh',
      crop: 'Soybean (Yellow)',
      todayArrival: '3,780 Quintals',
      vehicleCount: '120 Trucks',
      currentRate: 4820,
      prevRate: 4780,
      trend: '+0.9%',
      isUp: true,
      gateStatus: 'Auction Yard 3 Active',
      updatedAt: '8 mins ago',
      weighbridgeQueue: [
        { vehicle: 'MP-09-KA-2311 (Eicher 10-Tonne)', weight: '95 Quintals', moisture: '10.5%' }
      ]
    }
  ];

  // Dynamic Wholesale Lots (Supports new lots added from Kisan Auction Desk)
  const [wholesaleLots, setWholesaleLots] = useState([
    {
      lotId: 'LOT-9821',
      farmer: 'Harpreet Singh',
      location: 'Khanna, Punjab',
      crop: 'Wheat (Sharbati Grade-A)',
      quantity: '120 Quintals',
      moisture: '11.4% (Optimal)',
      askingRate: 2460,
      highestBid: 2475,
      bidsReceived: 6,
      timer: '01h 45m left',
      verifiedMoisture: true
    },
    {
      lotId: 'LOT-9822',
      farmer: 'Bhikhabhai Patel',
      location: 'Gondal, Gujarat',
      crop: 'Cotton (Medium Staple)',
      quantity: '85 Bales',
      moisture: '8.2% (Dry)',
      askingRate: 7100,
      highestBid: 7150,
      bidsReceived: 8,
      timer: '02h 10m left',
      verifiedMoisture: true
    },
    {
      lotId: 'LOT-9823',
      farmer: 'Ramavtar Sharma',
      location: 'Bharatpur, Rajasthan',
      crop: 'Mustard (High Oil 42%)',
      quantity: '90 Quintals',
      moisture: '9.1%',
      askingRate: 5650,
      highestBid: 5710,
      bidsReceived: 12,
      timer: '48m left',
      verifiedMoisture: true
    }
  ]);

  // Dynamic Merchant Bids (Order Book)
  const [merchantBids, setMerchantBids] = useState([
    {
      id: 'bid-1',
      buyer: 'ITC Agri Business Division',
      buyerType: 'Institutional Processor',
      lotTarget: 'LOT-9821 (Wheat 120 Qtl)',
      bidAmount: 2475,
      marketRate: 2450,
      time: '30 secs ago',
      status: 'Leading Bid'
    },
    {
      id: 'bid-2',
      buyer: 'Adani Wilmar Ltd',
      buyerType: 'National Edible Oils',
      lotTarget: 'LOT-9823 (Mustard 90 Qtl)',
      bidAmount: 5710,
      marketRate: 5680,
      time: '1 min ago',
      status: 'Leading Bid'
    },
    {
      id: 'bid-3',
      buyer: 'Vardhman Textiles Procurement',
      buyerType: 'Spinning Mill Buyer',
      lotTarget: 'LOT-9822 (Cotton 85 Bales)',
      bidAmount: 7150,
      marketRate: 7140,
      time: '3 mins ago',
      status: 'Leading Bid'
    },
    {
      id: 'bid-4',
      buyer: 'Karnal Rice Exporters Consortium',
      buyerType: 'Export House',
      lotTarget: 'LOT-9819 (Paddy 200 Qtl)',
      bidAmount: 4450,
      marketRate: 4420,
      time: '5 mins ago',
      status: 'Leading Bid'
    }
  ]);

  // Bidding Modal State (For Buyers on Wholesale Lots)
  const [biddingLot, setBiddingLot] = useState(null);
  const [bidBuyerName, setBidBuyerName] = useState('Patanjali Agro Sourcing');
  const [bidOfferAmount, setBidOfferAmount] = useState(2480);
  const [bidSubmitted, setBidSubmitted] = useState(false);

  // Accept Deal State (For Farmers / Order Book)
  const [acceptedDeal, setAcceptedDeal] = useState(null);

  // Kisan Auction Form State
  const [auctionCrop, setAuctionCrop] = useState('Wheat (Sharbati)');
  const [auctionFarmerName, setAuctionFarmerName] = useState('');
  const [auctionQuantity, setAuctionQuantity] = useState(50);
  const [auctionReserveRate, setAuctionReserveRate] = useState(2450);
  const [auctionPincode, setAuctionPincode] = useState('');
  const [auctionSuccess, setAuctionSuccess] = useState(false);

  // Place a Bid Handler
  const handlePlaceBidSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    
    // Add to Merchant Bids
    const newBid = {
      id: `bid-${Date.now()}`,
      buyer: bidBuyerName,
      buyerType: 'Verified Grain Buyer',
      lotTarget: `${biddingLot.lotId} (${biddingLot.crop} ${biddingLot.quantity})`,
      bidAmount: Number(bidOfferAmount),
      marketRate: biddingLot.askingRate,
      time: 'Just now',
      status: 'Leading Bid'
    };

    setMerchantBids([newBid, ...merchantBids]);

    // Update the lot's highest bid
    setWholesaleLots(lots => lots.map(l => 
      l.lotId === biddingLot.lotId 
        ? { ...l, highestBid: Math.max(l.highestBid, Number(bidOfferAmount)), bidsReceived: l.bidsReceived + 1 }
        : l
    ));

    setBidSubmitted(true);
    setTimeout(() => {
      setBidSubmitted(false);
      setBiddingLot(null);
      onTabChange('bids');
    }, 1800);
  };

  // Farmer Accepts Bid Handler
  const handleAcceptBid = (bid) => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setAcceptedDeal(bid);
    setMerchantBids(bids => bids.map(b => b.id === bid.id ? { ...b, status: 'Deal Locked ✓' } : b));
  };

  // Farmer Creates Auction Lot Handler
  const handleCreateAuction = (e) => {
    e.preventDefault();
    confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });

    const newLot = {
      lotId: `LOT-${Math.floor(1000 + Math.random() * 9000)}`,
      farmer: auctionFarmerName || 'Kisan Producer',
      location: `Pincode: ${auctionPincode}`,
      crop: auctionCrop,
      quantity: `${auctionQuantity} Quintals`,
      moisture: '11.0% (Certified)',
      askingRate: Number(auctionReserveRate),
      highestBid: Number(auctionReserveRate) + 20,
      bidsReceived: 1,
      timer: '02h 59m left',
      verifiedMoisture: true
    };

    setWholesaleLots([newLot, ...wholesaleLots]);
    setAuctionSuccess(true);

    setTimeout(() => {
      setAuctionSuccess(false);
      onTabChange('lots');
    }, 2400);
  };

  const exchangeCrops = [
    { name: 'Wheat (Sharbati)', mandi: 'Ludhiana APMC', price: 2450, change: '+₹60 (2.4%)', isUp: true, high: 2480, low: 2410, volume: '4,250 Qtl', arrivalTime: '10 mins ago', grade: 'Grade-A Premium' },
    { name: 'Mustard (Sarson)', mandi: 'Alwar APMC', price: 5680, change: '+₹100 (1.8%)', isUp: true, high: 5720, low: 5550, volume: '2,890 Qtl', arrivalTime: '4 mins ago', grade: '42% Oil Guaranteed' },
    { name: 'Cotton (Shankar-6)', mandi: 'Rajkot APMC', price: 7140, change: '-₹40 (0.6%)', isUp: false, high: 7220, low: 7110, volume: '6,400 Bales', arrivalTime: '15 mins ago', grade: '29mm Long Staple' },
    { name: 'Basmati Paddy 1121', mandi: 'Karnal APMC', price: 4420, change: '+₹130 (3.1%)', isUp: true, high: 4460, low: 4280, volume: '5,120 Qtl', arrivalTime: '2 mins ago', grade: 'Traditional Aromatic' },
    { name: 'Soybean (Yellow)', mandi: 'Indore APMC', price: 4820, change: '+₹40 (0.9%)', isUp: true, high: 4850, low: 4760, volume: '3,780 Qtl', arrivalTime: '8 mins ago', grade: 'High Protein' },
    { name: 'Red Chilli (Teja)', mandi: 'Guntur APMC', price: 18500, change: '+₹750 (4.2%)', isUp: true, high: 18900, low: 17600, volume: '8,900 Bags', arrivalTime: 'Just now', grade: 'Hot Export Quality' },
  ];

  const filteredCrops = exchangeCrops.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.mandi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Groww-Style Clean Top Header Bar */}
      <div className="bg-[#111315] text-white rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-[11px] font-mono font-bold uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
            <span>Live APMC Mandi Market Radar &bull; AGMARKNET Connected</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            AgriStock Commodity Exchange
          </h1>
          <p className="text-white/60 text-xs sm:text-sm font-sans mt-0.5">
            Transparent crop trading floor for farmers, mandi merchants, and wholesale processors.
          </p>
        </div>

        {/* Quick Summary Pill Metrics */}
        <div className="flex items-center gap-3 font-mono text-xs shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-white/40 block font-sans">Market Trend</span>
            <span className="text-base font-bold text-[#10B981]">▲ Bullish (+1.4%)</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-white/40 block font-sans">Active Buyers</span>
            <span className="text-base font-bold text-[#D4A373]">1,840 Verified</span>
          </div>
        </div>
      </div>

      {/* DYNAMIC MODULE CONTENT */}
      
      {/* 1. MODULE: LIVE APMC EXCHANGE FLOOR */}
      {activeTab === 'exchange' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#8E8E8E] absolute left-3.5 top-3" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search commodity or APMC mandi (e.g. Wheat, Ludhiana, Mustard)..."
              className="w-full bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-black/[0.08] focus:outline-none focus:border-[#121212]"
            />
          </div>

          {/* Top Commodity Cards (Groww Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCrops.map((crop, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedCropModal(crop)}
                className="group cursor-pointer skanvi-card rounded-2xl p-5 flex flex-col justify-between hover:border-[#D97706]/50 shadow-xs hover:shadow-md transition-all">
                
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-heading font-extrabold text-base text-[#121212] group-hover:text-[#D97706] transition-colors">
                        {crop.name}
                      </h3>
                      <span className="text-[11px] text-[#8E8E8E] font-sans">
                        {crop.mandi}
                      </span>
                    </div>

                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      crop.isUp ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#EF4444]/15 text-[#EF4444]'
                    }`}>
                      {crop.change}
                    </span>
                  </div>

                  <div className="my-3">
                    <span className="text-2xl font-black font-mono text-[#121212]">
                      ₹{crop.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#8E8E8E] font-sans"> / Quintal</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#5A5A5A] font-mono">
                  <span>Day High: ₹{crop.high}</span>
                  <span className="text-[#121212] font-bold group-hover:underline flex items-center gap-1 font-sans">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* Kisan Action CTA Banner */}
          <div className="rounded-3xl bg-[#F5F4F0] p-6 sm:p-8 border border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-extrabold text-lg text-[#121212]">
                Have a Harvest to Sell at Today's Peak Rates?
              </h3>
              <p className="text-xs text-[#5A5A5A] font-sans mt-0.5">
                List your crop on the Kisan Auction Desk. Verified buyers bid directly with 0% brokerage fees.
              </p>
            </div>
            <button
              onClick={() => onTabChange('auction')}
              className="skanvi-pill-btn bg-[#121212] hover:bg-[#D97706] text-white shrink-0">
              <span>List My Harvest Lot</span>
              <ArrowRight className="w-4 h-4 stroke-[1.75]" />
            </button>
          </div>

        </div>
      )}

      {/* 2. MODULE: REAL-TIME ARRIVALS TRACKER (Interactive Weighbridge Inspection) */}
      {activeTab === 'arrivals' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          <div className="bg-white rounded-2xl p-5 border border-black/[0.06] flex items-center justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#121212]">
                Live Mandi Gate &amp; Vehicle Arrivals
              </h3>
              <p className="text-xs text-[#8E8E8E] font-sans">
                Click any Mandi to view live electronic weighbridge queue and moisture inspection reports.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#10B981] font-bold flex items-center gap-1.5 bg-[#10B981]/10 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
              Live Weighbridge Active
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {mandiArrivals.map((arr) => (
              <div 
                key={arr.id}
                onClick={() => setSelectedArrival(arr)}
                className="group cursor-pointer bg-white rounded-2xl p-5 border border-black/[0.06] hover:border-black/20 hover:shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F4F0] group-hover:bg-[#121212] group-hover:text-white transition-colors flex items-center justify-center text-[#121212] shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#121212] group-hover:text-[#D97706] transition-colors">
                        {arr.mandi}
                      </h4>
                      <span className="text-[10px] font-mono bg-[#F5F4F0] text-[#5A5A5A] px-2 py-0.5 rounded font-semibold">
                        {arr.crop}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#8E8E8E] font-sans mt-1">
                      <span>Arrival: <b className="text-[#121212] font-mono">{arr.todayArrival}</b></span>
                      <span>&bull;</span>
                      <span>Vehicles: <b className="text-[#121212] font-mono">{arr.vehicleCount}</b></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-0 border-black/[0.05]">
                  <div className="text-left md:text-right font-mono">
                    <div className="text-base font-black text-[#121212]">
                      ₹{arr.currentRate.toLocaleString()} <span className="text-[10px] text-[#8E8E8E] font-sans">/ Qtl</span>
                    </div>
                    <span className={`text-[11px] font-bold ${arr.isUp ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                      {arr.trend}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#5A5A5A] bg-[#F5F4F0] px-2.5 py-1 rounded-md block">
                      {arr.gateStatus}
                    </span>
                    <span className="text-[10px] text-[#8E8E8E] font-sans block mt-1">
                      {arr.updatedAt}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* 3. MODULE: WHOLESALE LOTS (Farmer Lots with Interactive Bidding) */}
      {activeTab === 'lots' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          <div className="bg-white rounded-2xl p-5 border border-black/[0.06] flex items-center justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#121212]">
                Active Farmer Harvest Lots Under Auction
              </h3>
              <p className="text-xs text-[#8E8E8E] font-sans">
                Direct procurement lots with certified moisture and grain purity reports.
              </p>
            </div>
            <button
              onClick={() => onTabChange('auction')}
              className="skanvi-pill-btn bg-[#D97706] text-[#111315] font-black text-xs">
              <span>+ Create My Lot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {wholesaleLots.map((lot) => (
              <div 
                key={lot.lotId}
                className="skanvi-card rounded-2xl p-5 flex flex-col justify-between">
                
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-black/[0.06]">
                    <span className="text-[10px] font-mono font-bold text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded">
                      {lot.lotId}
                    </span>
                    <span className="text-[11px] font-mono text-[#EF4444] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{lot.timer}</span>
                    </span>
                  </div>

                  <h4 className="font-heading font-extrabold text-base text-[#121212] mb-1">
                    {lot.crop}
                  </h4>
                  <p className="text-xs text-[#8E8E8E] font-sans mb-3">
                    Farmer: <b className="text-[#121212]">{lot.farmer}</b> &bull; {lot.location}
                  </p>

                  <div className="bg-[#F5F4F0] p-3 rounded-xl space-y-1.5 text-xs font-mono mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#5A5A5A] font-sans">Available Lot Size:</span>
                      <span className="font-bold text-[#121212]">{lot.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A5A5A] font-sans">Moisture Content:</span>
                      <span className="font-bold text-[#10B981]">{lot.moisture}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A5A5A] font-sans">Farmer Reserve Price:</span>
                      <span className="font-bold text-[#121212]">₹{lot.askingRate}/Qtl</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8E8E8E] block font-sans">Highest Merchant Bid:</span>
                    <span className="text-lg font-black font-mono text-[#10B981]">
                      ₹{lot.highestBid}
                    </span>
                    <span className="text-[10px] text-[#5A5A5A] block font-sans">({lot.bidsReceived} bids placed)</span>
                  </div>

                  {/* Fully Functional Bid Button */}
                  <button
                    onClick={() => {
                      setBiddingLot(lot);
                      setBidOfferAmount(lot.highestBid + 15);
                    }}
                    className="px-4 py-2 rounded-full bg-[#121212] hover:bg-[#D97706] text-white text-xs font-bold font-heading transition-colors active:scale-95 shadow-xs">
                    Place Bid
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* 4. MODULE: MERCHANT BIDS (Order Book with Accept Deal Action) */}
      {activeTab === 'bids' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          <div className="bg-white rounded-2xl p-5 border border-black/[0.06] flex items-center justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#121212]">
                Live Merchant Order Book &amp; Bid Depth
              </h3>
              <p className="text-xs text-[#8E8E8E] font-sans">
                Real-time purchase bids placed by institutional millers. Farmers can click "Accept Offer" to lock instant deals.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#121212] bg-[#F5F4F0] px-3 py-1.5 rounded-full border border-black/[0.06]">
              Instant Bank Settlement Guaranteed
            </span>
          </div>

          <div className="space-y-2.5">
            {merchantBids.map((bid) => (
              <div 
                key={bid.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-black/[0.06] hover:border-black/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-sm sm:text-base text-[#121212]">
                      {bid.buyer}
                    </span>
                    <span className="text-[10px] font-mono text-[#8E8E8E] bg-[#F5F4F0] px-2 py-0.5 rounded">
                      {bid.buyerType}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5A5A] font-sans mt-0.5">
                    Targeting: <b className="text-[#121212]">{bid.lotTarget}</b> &bull; Placed {bid.time}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5">
                  <div className="text-left sm:text-right font-mono">
                    <span className="text-[10px] text-[#8E8E8E] block font-sans">Bid Price / Qtl</span>
                    <span className="text-lg font-black text-[#10B981]">
                      ₹{bid.bidAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#121212] font-semibold block">
                      (+₹{bid.bidAmount - bid.marketRate} above MSP)
                    </span>
                  </div>

                  {/* Fully Functional Accept Bid Button */}
                  {bid.status === 'Deal Locked ✓' ? (
                    <span className="text-[11px] font-bold font-heading bg-[#10B981] text-white px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                      <span>Deal Locked</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAcceptBid(bid)}
                      className="px-4 py-2 rounded-full bg-[#121212] hover:bg-[#10B981] text-white text-xs font-bold font-heading transition-colors active:scale-95 shadow-xs">
                      Accept Offer
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* 5. MODULE: KISAN AUCTION DESK (Farmer Broadcast Studio) */}
      {activeTab === 'auction' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.08] shadow-xl animate-in zoom-in-95 duration-200">
          
          {auctionSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-3xl mx-auto">
                ✓
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-[#121212]">
                Your Harvest Lot is Now Live on Auction!
              </h3>
              <p className="text-xs text-[#5A5A5A] max-w-md mx-auto leading-relaxed">
                Lot broadcasted to <b>1,840+ verified grain buyers &amp; flour mills</b> across North and Central India. Incoming bids are now populating in Wholesale Lots.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => onTabChange('lots')}
                  className="skanvi-pill-btn bg-[#121212] text-white">
                  <span>View in Wholesale Lots Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="pb-4 mb-6 border-b border-black/[0.06]">
                <span className="text-[11px] font-mono text-[#D97706] uppercase tracking-wider font-bold block mb-1">
                  Kisan Digital Auction Studio
                </span>
                <h2 className="text-2xl font-extrabold font-heading text-[#121212]">
                  Sell Your Harvest Directly to Wholesale Merchants
                </h2>
                <p className="text-xs text-[#8E8E8E] font-sans mt-1">
                  Zero commission middlemen. Set your reserve rate and let multiple buyers compete for your harvest lot.
                </p>
              </div>

              <form onSubmit={handleCreateAuction} className="space-y-4 text-xs">
                
                <div>
                  <label className="block text-[#5A5A5A] font-bold mb-1.5 font-heading">
                    Farmer / FPO Name:
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter Farmer or Farm Producer Org name"
                    value={auctionFarmerName}
                    onChange={(e) => setAuctionFarmerName(e.target.value)}
                    className="w-full bg-[#F5F4F0] border border-black/[0.1] rounded-xl px-4 py-3 text-[#121212] font-semibold focus:outline-none focus:border-[#121212]"
                  />
                </div>

                <div>
                  <label className="block text-[#5A5A5A] font-bold mb-1.5 font-heading">
                    Select Crop Commodity:
                  </label>
                  <select 
                    value={auctionCrop}
                    onChange={(e) => setAuctionCrop(e.target.value)}
                    className="w-full bg-[#F5F4F0] border border-black/[0.1] rounded-xl px-4 py-3 text-[#121212] font-semibold focus:outline-none focus:border-[#121212]">
                    <option value="Wheat (Sharbati)">Wheat (Sharbati / Desi Grade-A)</option>
                    <option value="Mustard (Sarson)">Mustard Seed (Sarson High-Oil)</option>
                    <option value="Cotton (Kapas)">Cotton (Shankar-6 Long Staple)</option>
                    <option value="Basmati Paddy 1121">Basmati Paddy 1121</option>
                    <option value="Soybean (Yellow)">Soybean (Yellow Grain)</option>
                    <option value="Red Chilli (Teja)">Red Chilli (Guntur Teja)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#5A5A5A] font-bold mb-1.5 font-heading">
                      Available Harvest Quantity (Quintals):
                    </label>
                    <input 
                      type="number"
                      min={10}
                      max={1000}
                      value={auctionQuantity}
                      onChange={(e) => setAuctionQuantity(Number(e.target.value))}
                      className="w-full bg-[#F5F4F0] border border-black/[0.1] rounded-xl px-4 py-3 text-[#121212] font-mono font-bold text-sm focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5A5A5A] font-bold mb-1.5 font-heading">
                      Minimum Reserve Rate (₹ / Quintal):
                    </label>
                    <input 
                      type="number"
                      value={auctionReserveRate}
                      onChange={(e) => setAuctionReserveRate(Number(e.target.value))}
                      className="w-full bg-[#F5F4F0] border border-black/[0.1] rounded-xl px-4 py-3 text-[#121212] font-mono font-bold text-sm focus:outline-none focus:border-[#121212]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5A5A5A] font-bold mb-1.5 font-heading">
                    Farm Location Pincode (For Free Merchant Truck Pickup):
                  </label>
                  <input 
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit village pincode"
                    value={auctionPincode}
                    onChange={(e) => setAuctionPincode(e.target.value)}
                    className="w-full bg-[#F5F4F0] border border-black/[0.1] rounded-xl px-4 py-3 text-[#121212] font-mono text-sm focus:outline-none focus:border-[#121212]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#F5F4F0] border border-black/[0.05] space-y-1">
                  <div className="flex justify-between text-[#5A5A5A]">
                    <span>Expected Minimum Gross:</span>
                    <span className="font-mono font-bold text-[#121212]">₹{(auctionQuantity * auctionReserveRate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#10B981] font-semibold">
                    <span>AgriMart Commission:</span>
                    <span>0% (Free for Farmers)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#121212] hover:bg-[#D97706] text-white font-extrabold text-xs transition-all shadow-md active:scale-95 font-heading flex items-center justify-center gap-2">
                  <Gavel className="w-4 h-4" />
                  <span>Broadcast Lot to 1,840+ Buyers</span>
                </button>

              </form>
            </div>
          )}

        </div>
      )}

      {/* MODAL 1: PLACE A MERCHANT BID ON A WHOLESALE LOT */}
      {biddingLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-black/[0.08] shadow-2xl relative animate-in zoom-in-95">
            <button 
              onClick={() => setBiddingLot(null)}
              className="absolute top-4 right-4 text-[#8E8E8E] hover:text-[#121212] p-2">
              <X className="w-4 h-4" />
            </button>

            {bidSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-2xl mx-auto">
                  ✓
                </div>
                <h3 className="text-xl font-bold font-heading text-[#121212]">Bid Submitted to Farmer!</h3>
                <p className="text-xs text-[#5A5A5A]">
                  Your purchase offer of <b>₹{bidOfferAmount}/Qtl</b> on {biddingLot.lotId} has been added to the Order Book.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-mono text-[#D97706] uppercase tracking-wider font-bold block mb-1">
                  Merchant Bidding Portal
                </span>
                <h3 className="text-xl font-bold font-heading text-[#121212]">
                  Place Purchase Bid on {biddingLot.lotId}
                </h3>
                <p className="text-xs text-[#8E8E8E] mb-4">
                  {biddingLot.crop} &bull; {biddingLot.quantity} &bull; Farmer: {biddingLot.farmer}
                </p>

                <form onSubmit={handlePlaceBidSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#5A5A5A] font-bold mb-1">Buyer Organization:</label>
                    <input 
                      type="text"
                      required
                      value={bidBuyerName}
                      onChange={(e) => setBidBuyerName(e.target.value)}
                      className="w-full bg-[#F5F4F0] border border-black/[0.1] rounded-xl px-3.5 py-2.5 font-semibold text-[#121212]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5A5A5A] font-bold mb-1">
                      Your Offer Rate (₹ / Quintal):
                    </label>
                    <input 
                      type="number"
                      required
                      min={biddingLot.askingRate}
                      value={bidOfferAmount}
                      onChange={(e) => setBidOfferAmount(e.target.value)}
                      className="w-full bg-[#F5F4F0] border border-black/[0.1] rounded-xl px-3.5 py-2.5 font-mono font-bold text-sm text-[#121212]"
                    />
                    <span className="text-[10px] text-[#8E8E8E] block mt-1">
                      Farmer Reserve Rate: ₹{biddingLot.askingRate} &bull; Highest Bid so far: ₹{biddingLot.highestBid}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#121212] hover:bg-[#10B981] text-white font-extrabold text-xs transition-all shadow-md active:scale-95 font-heading">
                    Submit Binding Purchase Offer
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: WEIGHBRIDGE QUEUE INSPECTION (FOR REAL-TIME ARRIVALS) */}
      {selectedArrival && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-black/[0.08] shadow-2xl relative animate-in zoom-in-95">
            <button 
              onClick={() => setSelectedArrival(null)}
              className="absolute top-4 right-4 text-[#8E8E8E] hover:text-[#121212] p-2">
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
              <span className="text-[10px] font-mono font-bold text-[#10B981] uppercase">Live Weighbridge Queue</span>
            </div>
            <h3 className="text-xl font-bold font-heading text-[#121212] mb-1">
              {selectedArrival.mandi}
            </h3>
            <p className="text-xs text-[#8E8E8E] mb-4">
              Total Today: {selectedArrival.todayArrival} &bull; Modal Rate: ₹{selectedArrival.currentRate}/Qtl
            </p>

            <div className="space-y-2 mb-5">
              <span className="text-[10px] font-mono text-[#5A5A5A] uppercase font-bold block">Vehicles in Weighing Bay:</span>
              {selectedArrival.weighbridgeQueue.map((v, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#F5F4F0] text-xs flex justify-between items-center font-mono">
                  <div>
                    <span className="font-bold text-[#121212] block font-sans">{v.vehicle}</span>
                    <span className="text-[11px] text-[#8E8E8E]">Moisture Content: <b className="text-[#10B981]">{v.moisture}</b></span>
                  </div>
                  <span className="font-bold text-[#121212]">{v.weight}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedArrival(null)}
              className="w-full py-3 rounded-full bg-[#121212] text-white font-bold text-xs">
              Close Weighbridge Monitor
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: DEAL LOCKED CELEBRATION RECEIPT */}
      {acceptedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-black/[0.08] shadow-2xl text-center space-y-4 relative animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>
            <h3 className="text-2xl font-extrabold font-heading text-[#121212]">
              Deal Locked &amp; Confirmed!
            </h3>
            <div className="bg-[#F5F4F0] p-4 rounded-2xl text-xs text-left space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-[#5A5A5A]">Buyer:</span>
                <span className="font-bold text-[#121212]">{acceptedDeal.buyer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A5A5A]">Target Lot:</span>
                <span className="font-bold text-[#121212]">{acceptedDeal.lotTarget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A5A5A]">Settlement Rate:</span>
                <span className="font-bold text-[#10B981]">₹{acceptedDeal.bidAmount}/Quintal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A5A5A]">Payment Mode:</span>
                <span className="font-bold text-[#121212]">Direct RTGS within 2h</span>
              </div>
            </div>
            <p className="text-xs text-[#8E8E8E]">
              Digital sale contract dispatched to farmer SMS. Buyer truck will arrive at farm gate for pickup.
            </p>
            <button
              onClick={() => setAcceptedDeal(null)}
              className="w-full py-3.5 rounded-full bg-[#121212] text-white font-bold text-xs font-heading">
              Close Confirmation Receipt
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
