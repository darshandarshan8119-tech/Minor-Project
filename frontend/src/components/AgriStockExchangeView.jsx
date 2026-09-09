// src/components/AgriStockExchangeView.jsx
import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Scale, Truck, Package, 
  Gavel, Users, Search, ArrowUpRight, ArrowLeft, ShieldCheck, 
  CheckCircle2, Clock, Filter, ArrowRight, DollarSign, 
  Sparkles, X, Check, Activity, BarChart2, Info, 
  FileText, Download, ChevronRight, AlertCircle, RefreshCw, Printer,
  Share2, MapPin, Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AgriStockExchangeView({ activeTab, onTabChange }) {
  // Search & Navigation States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropModal, setSelectedCropModal] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);

  // Dedicated Stock Terminal Page Interactive States
  const [timeframe, setTimeframe] = useState('1D');
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);
  const [orderType, setOrderType] = useState('BUY');
  const [deliveryMode, setDeliveryMode] = useState('MANDI_SPOT');
  const [orderQty, setOrderQty] = useState(50);
  const [simulatedMoisture, setSimulatedMoisture] = useState(11.0);
  const [contractNote, setContractNote] = useState(null);

  // Real-time Arrivals Data with Interactive Modal
  const mandiArrivals = [
    {
      id: 'arr-1',
      mandi: 'Ludhiana APMC, Punjab',
      crop: 'Wheat (Sharbati)',
      image: '/images/mandi-wheat-sacks.jpg',
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
      image: '/images/seeds-mustard-sarson.jpg',
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
      image: '/images/mandi-cotton-bales.jpg',
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
      image: '/images/seeds-basmati-paddy.jpg',
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
      image: '/images/seeds-soybean-yellow.jpg',
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

  // Dynamic Wholesale Lots
  const [wholesaleLots, setWholesaleLots] = useState([
    {
      lotId: 'LOT-9821',
      farmer: 'Harpreet Singh',
      location: 'Khanna, Punjab',
      crop: 'Wheat (Sharbati Grade-A)',
      image: '/images/seeds-sharbati-wheat.jpg',
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
      image: '/images/mandi-cotton-bales.jpg',
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
      image: '/images/seeds-mustard-sarson.jpg',
      quantity: '90 Quintals',
      moisture: '9.1%',
      askingRate: 5650,
      highestBid: 5710,
      bidsReceived: 12,
      timer: '48m left',
      verifiedMoisture: true
    }
  ]);

  // Dynamic Merchant Bids
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

  // Bidding Modal State (Wholesale Lots)
  const [biddingLot, setBiddingLot] = useState(null);
  const [bidBuyerName, setBidBuyerName] = useState('Patanjali Agro Sourcing');
  const [bidOfferAmount, setBidOfferAmount] = useState(2480);
  const [bidSubmitted, setBidSubmitted] = useState(false);

  // Accept Deal State (Order Book)
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

  // Upgraded Institutional Exchange Crops Dataset (NCDEX & e-NAM Spec)
  const exchangeCrops = [
    { 
      id: 'WHT-SHAR-G1',
      name: 'Wheat (Sharbati Grade-A)',
      ticker: 'WHT-SHAR-G1',
      variety: 'C-306 Sharbati Golden',
      unit: 'Quintal',
      mandi: 'Ludhiana APMC, Punjab', 
      price: 2450, 
      prevClose: 2390,
      change: '+₹60 (+2.45%)', 
      isUp: true, 
      high: 2480, 
      low: 2410, 
      volume: '4,250 Qtl', 
      turnover: '₹1.04 Cr',
      arrivalTime: '10 mins ago', 
      grade: 'Grade-A Premium',
      agmarknetModal: 2420,
      benchmarkDiff: '+₹30 vs Modal Rate',
      image: '/images/seeds-sharbati-wheat.jpg',
      warehouseImage: '/images/mandi-wheat-sacks.jpg',
      assaySpecs: {
        basisMoisture: 11.0,
        tolerance: 0.5,
        maxRejectionMoisture: 14.0,
        deductionRatePerPct: 30,
        purity: '99.2%',
        foreignMatter: '0.8%'
      },
      charts: {
        '1D': [2395, 2405, 2410, 2425, 2418, 2430, 2445, 2440, 2455, 2450, 2465, 2450],
        '1W': [2360, 2380, 2390, 2410, 2420, 2435, 2450],
        '1M': [2280, 2310, 2330, 2350, 2340, 2380, 2410, 2400, 2430, 2450],
        '1Y': [2100, 2140, 2180, 2220, 2260, 2300, 2320, 2350, 2370, 2400, 2420, 2450]
      },
      marketDepth: {
        bids: [
          { price: 2448, qty: 150, orders: 4 },
          { price: 2445, qty: 320, orders: 8 },
          { price: 2440, qty: 540, orders: 12 },
          { price: 2435, qty: 280, orders: 6 },
          { price: 2430, qty: 410, orders: 9 }
        ],
        asks: [
          { price: 2452, qty: 120, orders: 3 },
          { price: 2455, qty: 250, orders: 5 },
          { price: 2458, qty: 430, orders: 11 },
          { price: 2462, qty: 380, orders: 7 },
          { price: 2465, qty: 600, orders: 15 }
        ],
        totalBuyQty: 1700,
        totalSellQty: 1780
      }
    },
    { 
      id: 'MUST-RAJ-O42',
      name: 'Mustard (Sarson High-Oil)', 
      ticker: 'MUST-RAJ-O42',
      variety: 'Giriraj 42% Oil Content',
      unit: 'Quintal',
      mandi: 'Alwar APMC, Rajasthan', 
      price: 5680, 
      prevClose: 5580,
      change: '+₹100 (+1.79%)', 
      isUp: true, 
      high: 5720, 
      low: 5550, 
      volume: '2,890 Qtl', 
      turnover: '₹1.64 Cr',
      arrivalTime: '4 mins ago', 
      grade: '42% Oil Guaranteed',
      agmarknetModal: 5620,
      benchmarkDiff: '+₹60 vs Modal Rate',
      image: '/images/seeds-mustard-sarson.jpg',
      warehouseImage: '/images/mandi-auction-yard.jpg',
      assaySpecs: {
        basisMoisture: 8.0,
        tolerance: 0.5,
        maxRejectionMoisture: 10.0,
        deductionRatePerPct: 45,
        purity: '98.8%',
        foreignMatter: '1.2%'
      },
      charts: {
        '1D': [5580, 5600, 5620, 5610, 5640, 5660, 5650, 5670, 5685, 5680],
        '1W': [5450, 5490, 5530, 5580, 5610, 5650, 5680],
        '1M': [5300, 5350, 5410, 5480, 5520, 5580, 5620, 5680],
        '1Y': [4900, 5020, 5150, 5280, 5390, 5480, 5580, 5680]
      },
      marketDepth: {
        bids: [
          { price: 5675, qty: 80, orders: 3 },
          { price: 5670, qty: 190, orders: 6 },
          { price: 5665, qty: 310, orders: 9 },
          { price: 5660, qty: 150, orders: 4 },
          { price: 5650, qty: 220, orders: 5 }
        ],
        asks: [
          { price: 5685, qty: 95, orders: 2 },
          { price: 5690, qty: 140, orders: 4 },
          { price: 5695, qty: 280, orders: 8 },
          { price: 5700, qty: 350, orders: 10 },
          { price: 5710, qty: 180, orders: 4 }
        ],
        totalBuyQty: 950,
        totalSellQty: 1045
      }
    },
    { 
      id: 'COTN-GUJ-S6',
      name: 'Cotton (Shankar-6 29mm)', 
      ticker: 'COTN-GUJ-S6',
      variety: 'Shankar-6 Long Staple',
      unit: 'Bale',
      mandi: 'Rajkot APMC, Gujarat', 
      price: 7140, 
      prevClose: 7180,
      change: '-₹40 (-0.56%)', 
      isUp: false, 
      high: 7220, 
      low: 7110, 
      volume: '6,400 Bales', 
      turnover: '₹4.56 Cr',
      arrivalTime: '15 mins ago', 
      grade: '29mm Long Staple',
      agmarknetModal: 7160,
      benchmarkDiff: '-₹20 vs Modal Rate',
      image: '/images/mandi-cotton-bales.jpg',
      warehouseImage: '/images/mandi-cotton-bales.jpg',
      assaySpecs: {
        basisMoisture: 8.5,
        tolerance: 0.5,
        maxRejectionMoisture: 10.5,
        deductionRatePerPct: 50,
        purity: '99.0%',
        foreignMatter: '1.0%'
      },
      charts: {
        '1D': [7190, 7180, 7175, 7160, 7150, 7135, 7140, 7145, 7135, 7140],
        '1W': [7250, 7220, 7200, 7190, 7170, 7150, 7140],
        '1M': [7400, 7350, 7300, 7250, 7210, 7180, 7160, 7140],
        '1Y': [6800, 6920, 7050, 7180, 7300, 7420, 7350, 7220, 7140]
      },
      marketDepth: {
        bids: [
          { price: 7135, qty: 220, orders: 5 },
          { price: 7130, qty: 340, orders: 8 },
          { price: 7125, qty: 410, orders: 9 },
          { price: 7120, qty: 500, orders: 11 },
          { price: 7110, qty: 620, orders: 14 }
        ],
        asks: [
          { price: 7145, qty: 180, orders: 4 },
          { price: 7150, qty: 290, orders: 7 },
          { price: 7155, qty: 360, orders: 9 },
          { price: 7160, qty: 420, orders: 10 },
          { price: 7170, qty: 510, orders: 12 }
        ],
        totalBuyQty: 2090,
        totalSellQty: 1760
      }
    },
    { 
      id: 'PDY-BAS-1121',
      name: 'Basmati Paddy 1121', 
      ticker: 'PDY-BAS-1121',
      variety: 'Pusa 1121 Traditional',
      unit: 'Quintal',
      mandi: 'Karnal APMC, Haryana', 
      price: 4420, 
      prevClose: 4290,
      change: '+₹130 (+3.03%)', 
      isUp: true, 
      high: 4460, 
      low: 4280, 
      volume: '5,120 Qtl', 
      turnover: '₹2.26 Cr',
      arrivalTime: '2 mins ago', 
      grade: 'Traditional Aromatic',
      agmarknetModal: 4350,
      benchmarkDiff: '+₹70 vs Modal Rate',
      image: '/images/seeds-basmati-paddy.jpg',
      warehouseImage: '/images/mandi-weighbridge-station.jpg',
      assaySpecs: {
        basisMoisture: 12.0,
        tolerance: 0.5,
        maxRejectionMoisture: 14.5,
        deductionRatePerPct: 35,
        purity: '98.5%',
        foreignMatter: '1.5%'
      },
      charts: {
        '1D': [4290, 4310, 4340, 4360, 4380, 4400, 4410, 4430, 4415, 4420],
        '1W': [4180, 4220, 4260, 4300, 4350, 4390, 4420],
        '1M': [3980, 4050, 4120, 4190, 4250, 4320, 4380, 4420],
        '1Y': [3600, 3750, 3900, 4050, 4150, 4280, 4350, 4420]
      },
      marketDepth: {
        bids: [
          { price: 4415, qty: 180, orders: 4 },
          { price: 4410, qty: 320, orders: 7 },
          { price: 4400, qty: 450, orders: 11 },
          { price: 4390, qty: 290, orders: 6 },
          { price: 4380, qty: 380, orders: 8 }
        ],
        asks: [
          { price: 4425, qty: 150, orders: 3 },
          { price: 4430, qty: 260, orders: 6 },
          { price: 4435, qty: 390, orders: 9 },
          { price: 4440, qty: 410, orders: 10 },
          { price: 4450, qty: 520, orders: 13 }
        ],
        totalBuyQty: 1620,
        totalSellQty: 1730
      }
    },
    { 
      id: 'SOY-MP-Y1',
      name: 'Soybean (Yellow Grade-1)', 
      ticker: 'SOY-MP-Y1',
      variety: 'JS-335 Yellow High-Oil',
      unit: 'Quintal',
      mandi: 'Indore APMC, Madhya Pradesh', 
      price: 4820, 
      prevClose: 4780,
      change: '+₹40 (+0.84%)', 
      isUp: true, 
      high: 4850, 
      low: 4760, 
      volume: '3,780 Qtl', 
      turnover: '₹1.82 Cr',
      arrivalTime: '8 mins ago', 
      grade: 'High Protein',
      agmarknetModal: 4800,
      benchmarkDiff: '+₹20 vs Modal Rate',
      image: '/images/seeds-soybean-yellow.jpg',
      warehouseImage: '/images/mandi-auction-yard.jpg',
      assaySpecs: {
        basisMoisture: 10.0,
        tolerance: 0.5,
        maxRejectionMoisture: 12.5,
        deductionRatePerPct: 35,
        purity: '98.9%',
        foreignMatter: '1.1%'
      },
      charts: {
        '1D': [4780, 4790, 4800, 4810, 4805, 4815, 4825, 4820, 4830, 4820],
        '1W': [4710, 4730, 4750, 4770, 4790, 4810, 4820],
        '1M': [4550, 4600, 4650, 4710, 4750, 4790, 4820],
        '1Y': [4200, 4320, 4450, 4580, 4680, 4750, 4820]
      },
      marketDepth: {
        bids: [
          { price: 4815, qty: 110, orders: 3 },
          { price: 4810, qty: 240, orders: 6 },
          { price: 4805, qty: 380, orders: 8 },
          { price: 4800, qty: 450, orders: 10 },
          { price: 4790, qty: 300, orders: 7 }
        ],
        asks: [
          { price: 4825, qty: 130, orders: 3 },
          { price: 4830, qty: 210, orders: 5 },
          { price: 4835, qty: 340, orders: 7 },
          { price: 4840, qty: 400, orders: 9 },
          { price: 4850, qty: 480, orders: 11 }
        ],
        totalBuyQty: 1480,
        totalSellQty: 1560
      }
    },
    { 
      id: 'CHLI-AP-T1',
      name: 'Red Chilli (Guntur Teja)', 
      ticker: 'CHLI-AP-T1',
      variety: 'Teja S17 Export Grade',
      unit: 'Quintal',
      mandi: 'Guntur APMC, Andhra Pradesh', 
      price: 18500, 
      prevClose: 17750,
      change: '+₹750 (+4.22%)', 
      isUp: true, 
      high: 18900, 
      low: 17600, 
      volume: '8,900 Bags', 
      turnover: '₹16.4 Cr',
      arrivalTime: 'Just now', 
      grade: 'Hot Export Quality',
      agmarknetModal: 18100,
      benchmarkDiff: '+₹400 vs Modal Rate',
      image: '/images/mandi-auction-yard.jpg',
      warehouseImage: '/images/mandi-auction-yard.jpg',
      assaySpecs: {
        basisMoisture: 10.0,
        tolerance: 0.5,
        maxRejectionMoisture: 13.0,
        deductionRatePerPct: 80,
        purity: '99.5%',
        foreignMatter: '0.5%'
      },
      charts: {
        '1D': [17750, 17850, 18000, 18200, 18350, 18450, 18600, 18500],
        '1W': [17100, 17350, 17600, 17900, 18200, 18400, 18500],
        '1M': [16200, 16600, 17100, 17500, 17900, 18250, 18500],
        '1Y': [14500, 15200, 16000, 16800, 17500, 18100, 18500]
      },
      marketDepth: {
        bids: [
          { price: 18450, qty: 50, orders: 2 },
          { price: 18400, qty: 120, orders: 4 },
          { price: 18350, qty: 210, orders: 6 },
          { price: 18300, qty: 340, orders: 9 },
          { price: 18250, qty: 450, orders: 12 }
        ],
        asks: [
          { price: 18550, qty: 60, orders: 2 },
          { price: 18600, qty: 140, orders: 4 },
          { price: 18650, qty: 230, orders: 6 },
          { price: 18700, qty: 310, orders: 8 },
          { price: 18750, qty: 490, orders: 11 }
        ],
        totalBuyQty: 1170,
        totalSellQty: 1230
      }
    }
  ];

  const filteredCrops = exchangeCrops.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.mandi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // SVG Chart Path Helper
  const generateChartPath = (data, width = 760, height = 220, padding = 25) => {
    if (!data || data.length === 0) return { path: '', area: '', min: 0, max: 0, points: [] };
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const points = data.map((val, idx) => {
      const x = padding + (idx / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((val - min) / range) * (height - 2 * padding);
      return { x, y, val };
    });

    const path = points.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');

    const area = `${path} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

    return { path, area, min, max, points };
  };

  // Moisture Deduction Simulator Calculations
  const calculateMoistureDeduction = (crop, moisture) => {
    if (!crop || !crop.assaySpecs) return { deductionPerQtl: 0, isRejected: false, status: 'Optimal' };
    const { basisMoisture, tolerance, maxRejectionMoisture, deductionRatePerPct } = crop.assaySpecs;
    const allowableMoisture = basisMoisture + tolerance;

    if (moisture > maxRejectionMoisture) {
      return {
        deductionPerQtl: 0,
        isRejected: true,
        status: 'Hard Reject (> Safe APMC Limit)',
        effectivePrice: 0
      };
    }

    if (moisture <= allowableMoisture) {
      return {
        deductionPerQtl: 0,
        isRejected: false,
        status: 'Certified Optimal (No Deduction)',
        effectivePrice: crop.price
      };
    }

    const excessPct = moisture - allowableMoisture;
    const deductionPerQtl = Math.round(excessPct * deductionRatePerPct);
    const effectivePrice = Math.max(0, crop.price - deductionPerQtl);

    return {
      deductionPerQtl,
      isRejected: false,
      status: `Deduction Applied (-₹${deductionPerQtl}/Qtl)`,
      effectivePrice
    };
  };

  // Landed Cost Calculations
  const calculateLandedCost = (crop, qty) => {
    if (!crop) return { base: 0, apmcTax: 0, escrowFee: 0, freight: 0, total: 0 };
    const base = crop.price * qty;
    const apmcTax = Math.round(base * 0.015); // 1.5% Mandi Tax
    const escrowFee = Math.round(base * 0.005); // 0.5% Escrow Guarantee
    const freight = Math.round(qty * 18); // ~₹18/Qtl for 100km farm-to-mandi transit
    const total = base + apmcTax + escrowFee + freight;
    return { base, apmcTax, escrowFee, freight, total };
  };

  // Execute Trade Handler (Groww/Zerodha Style)
  const handleExecuteTrade = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    const landed = calculateLandedCost(selectedCropModal, orderQty);
    const contract = {
      contractId: `AGX-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      escrowId: `ESC-AXIS-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      crop: selectedCropModal.name,
      ticker: selectedCropModal.ticker,
      mandi: selectedCropModal.mandi,
      quantity: `${orderQty} ${selectedCropModal.unit}s`,
      strikeRate: selectedCropModal.price,
      landedTotal: landed.total,
      breakdown: landed,
      orderType: orderType,
      deliveryMode: deliveryMode === 'MANDI_SPOT' ? 'Mandi Spot Physical Transit' : 'e-NWR Electronic Warehouse Receipt',
      settlementMode: 'T+0 Escrow Guarantee (RTGS Instant)',
      assayCertified: selectedCropModal.grade
    };
    setContractNote(contract);
  };

  // Open Full Dedicated Instrument Terminal Page
  const handleOpenTerminal = (crop) => {
    setSelectedCropModal(crop);
    setSimulatedMoisture(crop.assaySpecs.basisMoisture);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return from Terminal Page to Exchange Floor
  const handleCloseTerminal = () => {
    setSelectedCropModal(null);
    setHoveredDataPoint(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // VIEW A: DEDICATED FULL CLEAN INSTRUMENT TERMINAL PAGE (NOT A POPUP MODAL)
  // =========================================================================
  if (selectedCropModal) {
    const chartData = selectedCropModal.charts[timeframe] || selectedCropModal.charts['1D'];
    const { path, area, points } = generateChartPath(chartData, 760, 220, 25);
    const isPositive = chartData[chartData.length - 1] >= chartData[0];
    const strokeColor = isPositive ? '#10B981' : '#EF4444';
    const fillColor = isPositive ? '#10B981' : '#EF4444';
    const landed = calculateLandedCost(selectedCropModal, orderQty);

    return (
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300">
        
        {/* Sleek Breadcrumb & Back Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCloseTerminal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.08] hover:border-black/25 text-xs font-bold text-[#1A1A1A] hover:bg-[#F7F6F2] transition-all shadow-xs group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Exchange Floor</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#787774]">
              <span>AgriStock Mandi</span>
              <span>/</span>
              <span>Terminal</span>
              <span>/</span>
              <span className="font-bold text-[#1A1A1A]">{selectedCropModal.ticker}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#166534] font-bold border border-[#10B981]/20">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Live APMC Session Active</span>
            </span>
            <span className="text-[#787774] hidden sm:inline">&bull;</span>
            <span className="text-[#787774] hidden sm:inline">e-NAM &amp; NCDEX Cleared</span>
          </div>
        </div>

        {/* Dedicated Instrument Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-md bg-[#F2F0EB] text-[#1A1A1A] font-mono font-bold text-xs tracking-wide">
                {selectedCropModal.ticker}
              </span>
              <span className="text-xs text-[#787774] font-medium">
                {selectedCropModal.variety}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/10 text-[#166534] font-mono font-bold text-[10px]">
                {selectedCropModal.grade}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F7F6F2] text-[#787774] font-mono text-[10px]">
                Arrival: {selectedCropModal.arrivalTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#1A1A1A] tracking-tight">
              {selectedCropModal.name}
            </h1>
            
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#787774] mt-1.5">
              <MapPin className="w-4 h-4 text-[#B45309]" />
              <span className="font-semibold text-[#1A1A1A]">{selectedCropModal.mandi}</span>
              <span>&bull;</span>
              <span>Electronic Weighbridge Calibrated</span>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <div className="text-3xl sm:text-5xl font-black font-mono text-[#1A1A1A] tracking-tight">
              ₹{selectedCropModal.price.toLocaleString()}
              <span className="text-sm sm:text-base font-normal text-[#787774] font-sans"> / {selectedCropModal.unit}</span>
            </div>
            
            <div className="flex items-center lg:justify-end gap-2 text-xs sm:text-sm font-mono mt-1.5">
              <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                selectedCropModal.isUp ? 'bg-[#10B981]/15 text-[#166534]' : 'bg-[#EF4444]/15 text-[#B91C1C]'
              }`}>
                {selectedCropModal.change}
              </span>
              <span className="text-[#787774]">
                ({selectedCropModal.benchmarkDiff})
              </span>
            </div>
          </div>
        </div>

        {/* 2-COLUMN INSTITUTIONAL TERMINAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: CHARTS, MARKET DEPTH, ASSAY SPECS, MOISTURE SIMULATOR (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. GROWW-STYLE INTERACTIVE FULL SVG PRICE CHART */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#1A1A1A]">
                    Live Mandi Spot Price Trend
                  </h3>
                  <span className="text-xs text-[#787774] font-sans">
                    Real-time APMC auction ticks &bull; Tick latency: &lt; 200ms
                  </span>
                </div>

                {/* Timeframe Toggles */}
                <div className="flex items-center gap-1.5 bg-[#F2F0EB] p-1 rounded-full border border-black/[0.04]">
                  {['1D', '1W', '1M', '1Y'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-4 py-1 rounded-full text-xs font-bold font-mono transition-all ${
                        timeframe === tf
                          ? 'bg-[#1A1A1A] text-white shadow-xs'
                          : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                      }`}>
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive SVG Chart Viewport */}
              <div className="relative pt-2">
                <svg 
                  viewBox="0 0 760 220" 
                  className="w-full h-56 sm:h-64 overflow-visible"
                  onMouseLeave={() => setHoveredDataPoint(null)}>
                  
                  <defs>
                    <linearGradient id={`grad-terminal-${selectedCropModal.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={fillColor} stopOpacity="0.22" />
                      <stop offset="100%" stopColor={fillColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guideline Grids */}
                  <line x1="25" y1="40" x2="735" y2="40" stroke="#000000" strokeOpacity="0.04" strokeDasharray="3 3" />
                  <line x1="25" y1="110" x2="735" y2="110" stroke="#000000" strokeOpacity="0.04" strokeDasharray="3 3" />
                  <line x1="25" y1="180" x2="735" y2="180" stroke="#000000" strokeOpacity="0.04" strokeDasharray="3 3" />

                  {/* Gradient Area Fill */}
                  <path d={area} fill={`url(#grad-terminal-${selectedCropModal.id})`} />

                  {/* Bezier Line Stroke */}
                  <path 
                    d={path} 
                    fill="none" 
                    stroke={strokeColor} 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* Interactive Crosshair Circles */}
                  {points.map((pt, idx) => (
                    <circle
                      key={idx}
                      cx={pt.x}
                      cy={pt.y}
                      r={hoveredDataPoint?.idx === idx ? 6 : 3.5}
                      className="transition-all cursor-pointer"
                      fill={hoveredDataPoint?.idx === idx ? strokeColor : '#FFFFFF'}
                      stroke={strokeColor}
                      strokeWidth="2.5"
                      onMouseEnter={() => setHoveredDataPoint({ ...pt, idx })}
                    />
                  ))}
                </svg>

                {/* Dynamic Floating Tooltip */}
                {hoveredDataPoint && (
                  <div 
                    className="absolute top-2 px-3 py-1.5 rounded-xl bg-[#1A1A1A] text-white text-xs font-mono shadow-xl pointer-events-none transition-all"
                    style={{ left: `${Math.max(8, Math.min(78, (hoveredDataPoint.x / 760) * 100))}%` }}>
                    <span className="text-[10px] text-white/70 block">Mandi Spot Tick</span>
                    <span className="font-bold text-sm">₹{hoveredDataPoint.val}</span>
                  </div>
                )}
              </div>

              {/* Zerodha Kite-Style Day Low to Day High Range Bar */}
              <div className="pt-3 border-t border-black/[0.05] space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-[#787774]">
                  <span>24h Low: <b className="text-[#1A1A1A]">₹{selectedCropModal.low}</b></span>
                  <span className="font-medium text-[#1A1A1A]">Current Spot: ₹{selectedCropModal.price}</span>
                  <span>24h High: <b className="text-[#1A1A1A]">₹{selectedCropModal.high}</b></span>
                </div>
                <div className="w-full h-2 bg-[#F2F0EB] rounded-full relative">
                  <div 
                    className="absolute top-0 bottom-0 bg-[#1A1A1A] rounded-full"
                    style={{ 
                      left: '0%', 
                      width: `${Math.min(100, Math.max(5, ((selectedCropModal.price - selectedCropModal.low) / (selectedCropModal.high - selectedCropModal.low || 1)) * 100))}%` 
                    }}
                  />
                  <div 
                    className="absolute -top-1 w-4 h-4 bg-white border-2 border-[#1A1A1A] rounded-full shadow-xs -ml-2"
                    style={{ 
                      left: `${Math.min(100, Math.max(0, ((selectedCropModal.price - selectedCropModal.low) / (selectedCropModal.high - selectedCropModal.low || 1)) * 100))}%` 
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[#787774] pt-1">
                  <span>Physical Traded: <b className="text-[#1A1A1A]">{selectedCropModal.volume}</b></span>
                  <span>Turnover: <b className="text-[#1A1A1A]">{selectedCropModal.turnover}</b></span>
                </div>
              </div>
            </div>

            {/* 2. ZERODHA KITE 5-LEVEL MARKET DEPTH ORDER BOOK */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#1A1A1A]">
                    Live APMC Market Depth (5-Depth Order Book)
                  </h3>
                  <span className="text-xs text-[#787774]">
                    Real-time liquidity queue from flour millers, state agencies, and verified wholesale traders
                  </span>
                </div>
                <span className="text-xs font-mono text-[#166534] bg-[#10B981]/10 px-3 py-1 rounded-full font-bold shrink-0">
                  Total Buy: {selectedCropModal.marketDepth.totalBuyQty} Qtl &bull; Total Sell: {selectedCropModal.marketDepth.totalSellQty} Qtl
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                {/* Buy Orders (Bids Ladder) */}
                <div className="border border-black/[0.06] rounded-2xl overflow-hidden">
                  <div className="bg-[#F7F6F2] px-3.5 py-2.5 text-[10px] font-bold text-[#166534] uppercase flex justify-between border-b border-black/[0.05]">
                    <span>Bid Rate (₹/Qtl)</span>
                    <span>Orders</span>
                    <span>Qty ({selectedCropModal.unit})</span>
                  </div>
                  <div className="divide-y divide-black/[0.04]">
                    {selectedCropModal.marketDepth.bids.map((bid, i) => (
                      <div key={i} className="px-3.5 py-2.5 flex justify-between items-center relative overflow-hidden">
                        <div 
                          className="absolute inset-y-0 right-0 bg-[#10B981]/10 pointer-events-none transition-all"
                          style={{ width: `${(bid.qty / 600) * 100}%` }}
                        />
                        <span className="font-bold text-[#166534] z-10">₹{bid.price}</span>
                        <span className="text-[#787774] z-10">{bid.orders}</span>
                        <span className="font-bold text-[#1A1A1A] z-10">{bid.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sell Orders (Asks Ladder) */}
                <div className="border border-black/[0.06] rounded-2xl overflow-hidden">
                  <div className="bg-[#F7F6F2] px-3.5 py-2.5 text-[10px] font-bold text-[#B91C1C] uppercase flex justify-between border-b border-black/[0.05]">
                    <span>Ask Rate (₹/Qtl)</span>
                    <span>Orders</span>
                    <span>Qty ({selectedCropModal.unit})</span>
                  </div>
                  <div className="divide-y divide-black/[0.04]">
                    {selectedCropModal.marketDepth.asks.map((ask, i) => (
                      <div key={i} className="px-3.5 py-2.5 flex justify-between items-center relative overflow-hidden">
                        <div 
                          className="absolute inset-y-0 right-0 bg-[#EF4444]/10 pointer-events-none transition-all"
                          style={{ width: `${(ask.qty / 600) * 100}%` }}
                        />
                        <span className="font-bold text-[#B91C1C] z-10">₹{ask.price}</span>
                        <span className="text-[#787774] z-10">{ask.orders}</span>
                        <span className="font-bold text-[#1A1A1A] z-10">{ask.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. ASSAY QUALITY STANDARDS & DYNAMIC MOISTURE SIMULATOR */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#1A1A1A]">
                    Assay Quality Specifications &amp; Moisture Engine
                  </h3>
                  <p className="text-xs text-[#787774] font-sans">
                    Formulated under e-NAM &amp; NCDEX certified contract parameters.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#B45309] bg-[#B45309]/10 px-3 py-1 rounded-full font-bold shrink-0">
                  Deduction Rule: ₹{selectedCropModal.assaySpecs.deductionRatePerPct}/Qtl per 1.0% excess
                </span>
              </div>

              {/* Lab Specification Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-[#F7F6F2] p-3.5 rounded-2xl border border-black/[0.04]">
                  <span className="text-[10px] text-[#787774] block font-sans uppercase">Basis Moisture</span>
                  <span className="font-bold text-[#1A1A1A] text-base">{selectedCropModal.assaySpecs.basisMoisture}%</span>
                </div>
                <div className="bg-[#F7F6F2] p-3.5 rounded-2xl border border-black/[0.04]">
                  <span className="text-[10px] text-[#787774] block font-sans uppercase">Tolerance Band</span>
                  <span className="font-bold text-[#166534] text-base">±{selectedCropModal.assaySpecs.tolerance}%</span>
                </div>
                <div className="bg-[#F7F6F2] p-3.5 rounded-2xl border border-black/[0.04]">
                  <span className="text-[10px] text-[#787774] block font-sans uppercase">Rejection Limit</span>
                  <span className="font-bold text-[#B91C1C] text-base">&gt; {selectedCropModal.assaySpecs.maxRejectionMoisture}%</span>
                </div>
                <div className="bg-[#F7F6F2] p-3.5 rounded-2xl border border-black/[0.04]">
                  <span className="text-[10px] text-[#787774] block font-sans uppercase">Foreign Matter</span>
                  <span className="font-bold text-[#1A1A1A] text-base">{selectedCropModal.assaySpecs.foreignMatter} Max</span>
                </div>
              </div>

              {/* Interactive Moisture Slider Simulator */}
              <div className="bg-[#FBFBF9] p-5 rounded-2xl border border-black/[0.06] space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-heading font-bold text-[#1A1A1A]">
                    Simulate Lab Tested Moisture Content:
                  </span>
                  <span className="font-mono font-bold text-sm text-[#1A1A1A] bg-white px-3.5 py-1 rounded-full border border-black/[0.08]">
                    {simulatedMoisture.toFixed(1)}% Moisture
                  </span>
                </div>

                <input 
                  type="range"
                  min="8.0"
                  max="16.0"
                  step="0.1"
                  value={simulatedMoisture}
                  onChange={(e) => setSimulatedMoisture(parseFloat(e.target.value))}
                  className="w-full accent-[#1A1A1A] cursor-pointer h-2 bg-[#EFECE5] rounded-lg"
                />

                {/* Calculation Output Pill */}
                {(() => {
                  const result = calculateMoistureDeduction(selectedCropModal, simulatedMoisture);
                  return (
                    <div className={`p-4 rounded-xl text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3 border ${
                      result.isRejected 
                        ? 'bg-[#EF4444]/10 border-[#EF4444]/20 text-[#B91C1C]'
                        : result.deductionPerQtl > 0 
                          ? 'bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#B45309]'
                          : 'bg-[#10B981]/10 border-[#10B981]/20 text-[#166534]'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        {result.isRejected ? (
                          <AlertCircle className="w-5 h-5 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 shrink-0" />
                        )}
                        <div>
                          <span className="font-bold block text-sm">{result.status}</span>
                          <span className="text-[11px] text-[#787774] font-sans">
                            {result.isRejected 
                              ? 'Moisture exceeds maximum permissible limit. 100% escrow refunded to buyer.'
                              : result.deductionPerQtl > 0
                                ? 'Excess moisture formula deduction applied at final settlement.'
                                : 'Optimal safe storage condition with zero price discount.'}
                          </span>
                        </div>
                      </div>
                      
                      {!result.isRejected && (
                        <div className="text-left sm:text-right shrink-0">
                          <span className="text-[10px] block text-[#787774] font-sans">Effective Settlement Rate</span>
                          <span className="font-bold text-base text-[#1A1A1A]">
                            ₹{result.effectivePrice.toFixed(0)} / Quintal
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* 4. MANDI WAREHOUSE & WEIGHBRIDGE FACILITY CARD */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-xs space-y-4">
              <h3 className="font-heading font-extrabold text-base text-[#1A1A1A]">
                Certified APMC Mandi Storage Facility &amp; Yard
              </h3>

              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-black/[0.08]">
                <img 
                  src={selectedCropModal.warehouseImage} 
                  alt={selectedCropModal.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#10B981] uppercase block">
                      Audited e-NWR Warehouse Facility
                    </span>
                    <span className="text-base font-extrabold font-heading">
                      {selectedCropModal.mandi}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    WDRA Registration Active &bull; Grade-A Storage
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: DIRECT PROCUREMENT DESK (ORDER EXECUTION) (4 Cols, Sticky) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* ORDER EXECUTION DESK */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.08] shadow-sm space-y-5">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-[#1A1A1A]">
                  Direct Mandi Procurement Desk
                </h3>
                <span className="text-xs text-[#787774]">
                  T+0 direct clearing via Axis Escrow Guarantee
                </span>
              </div>

              {/* Buy vs Sell Order Toggle */}
              <div className="grid grid-cols-2 gap-1 bg-[#F2F0EB] p-1 rounded-full border border-black/[0.04]">
                <button
                  onClick={() => setOrderType('BUY')}
                  className={`py-2 rounded-full text-xs font-bold font-heading transition-all ${
                    orderType === 'BUY'
                      ? 'bg-[#166534] text-white shadow-xs'
                      : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                  }`}>
                  Procure (Buy)
                </button>
                <button
                  onClick={() => setOrderType('SELL')}
                  className={`py-2 rounded-full text-xs font-bold font-heading transition-all ${
                    orderType === 'SELL'
                      ? 'bg-[#B91C1C] text-white shadow-xs'
                      : 'text-[#6B6A66] hover:text-[#1A1A1A]'
                  }`}>
                  Liquidate (Sell)
                </button>
              </div>

              {/* Delivery Mode Selector */}
              <div className="space-y-1.5 text-xs">
                <label className="font-bold text-[#1A1A1A] block font-heading">
                  Settlement &amp; Delivery Mode:
                </label>
                <div className="grid grid-cols-2 gap-2 font-mono">
                  <button
                    onClick={() => setDeliveryMode('MANDI_SPOT')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      deliveryMode === 'MANDI_SPOT'
                        ? 'border-[#1A1A1A] bg-[#F7F6F2] font-bold text-[#1A1A1A]'
                        : 'border-black/[0.08] text-[#787774] hover:border-black/20'
                    }`}>
                    <span className="block text-[11px]">Physical Spot</span>
                    <span className="text-[10px] text-[#787774]">Gate Pickup</span>
                  </button>

                  <button
                    onClick={() => setDeliveryMode('E_NWR')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      deliveryMode === 'E_NWR'
                        ? 'border-[#1A1A1A] bg-[#F7F6F2] font-bold text-[#1A1A1A]'
                        : 'border-black/[0.08] text-[#787774] hover:border-black/20'
                    }`}>
                    <span className="block text-[11px]">e-NWR Receipt</span>
                    <span className="text-[10px] text-[#787774]">Digital Transfer</span>
                  </button>
                </div>
              </div>

              {/* Quantity Selectors */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-[#1A1A1A] font-heading">
                    Quantity ({selectedCropModal.unit}s):
                  </label>
                  <div className="flex items-center gap-1">
                    {[25, 50, 100, 250].map((q) => (
                      <button
                        key={q}
                        onClick={() => setOrderQty(q)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border transition-all ${
                          orderQty === q
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-[#787774] border-black/[0.08] hover:border-black/20'
                        }`}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <input 
                  type="number" 
                  min={5}
                  max={2000}
                  value={orderQty}
                  onChange={(e) => setOrderQty(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#F7F6F2] border border-black/[0.08] rounded-2xl px-4 py-3 font-mono font-bold text-base text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              {/* Itemized Landed Cost Breakdown */}
              <div className="bg-[#F7F6F2] rounded-2xl p-4 space-y-2 text-xs font-mono border border-black/[0.04]">
                <div className="flex justify-between text-[#787774]">
                  <span>Produce Subtotal ({orderQty} &times; ₹{selectedCropModal.price}):</span>
                  <span className="text-[#1A1A1A] font-bold">₹{landed.base.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#787774]">
                  <span>APMC Mandi Cess (1.5%):</span>
                  <span className="text-[#1A1A1A]">₹{landed.apmcTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#787774]">
                  <span>Escrow Guarantee Protection (0.5%):</span>
                  <span className="text-[#1A1A1A]">₹{landed.escrowFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#787774]">
                  <span>Est. Farm-to-Gate Freight:</span>
                  <span className="text-[#1A1A1A]">₹{landed.freight.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-black/[0.08] flex justify-between items-baseline text-sm font-bold">
                  <span className="text-[#1A1A1A] font-heading font-extrabold">Total Landed Payable:</span>
                  <span className="text-xl font-mono text-[#166534]">
                    ₹{landed.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Prominent Action Button */}
              <button
                onClick={handleExecuteTrade}
                className="w-full py-4 rounded-full bg-[#1A1A1A] hover:bg-[#B45309] text-white font-extrabold text-xs font-heading transition-all shadow-md active:scale-98 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Lock Order in AgriMart Escrow</span>
              </button>

              {/* Settlement Guarantee Checkmarks */}
              <div className="space-y-1.5 pt-1 text-[11px] text-[#787774]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#166534]" />
                  <span>Instant Axis Bank Escrow Vault Locking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#166534]" />
                  <span>Assay lab moisture guarantee with auto-refund</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#166534]" />
                  <span>Electronic APMC Gate-pass generated instantly</span>
                </div>
              </div>
            </div>

            {/* QUICK MANDI CONTACT CARD */}
            <div className="bg-[#F7F6F2] rounded-3xl p-5 border border-black/[0.05] space-y-2 text-xs">
              <span className="text-[10px] font-mono text-[#B45309] font-bold uppercase tracking-wider block">
                Yard Superintendent Desk
              </span>
              <p className="font-heading font-bold text-[#1A1A1A]">
                {selectedCropModal.mandi}
              </p>
              <p className="text-[#787774] text-[11px]">
                Gate Inflow: 06:00 AM - 08:00 PM &bull; Real-time electronic gross-axle weighbridge operational.
              </p>
            </div>

          </div>

        </div>

        {/* DIGITAL TRADE CONTRACT NOTE MODAL (POST-EXECUTION) */}
        {contractNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-black/[0.08] shadow-2xl space-y-4 relative animate-in zoom-in-95">
              
              <div className="text-center space-y-2 pb-3 border-b border-black/[0.06]">
                <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#166534] flex items-center justify-center text-2xl mx-auto font-bold">
                  ✓
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#166534] text-[10px] font-mono font-bold uppercase">
                  <span>Escrow Secured &bull; T+0 RTGS Active</span>
                </div>
                <h3 className="text-2xl font-extrabold font-heading text-[#1A1A1A]">
                  Digital Mandi Contract Note
                </h3>
                <p className="text-xs text-[#787774]">
                  Legal electronic procurement deed generated under e-NAM &amp; APMC guidelines.
                </p>
              </div>

              {/* Note Details Box */}
              <div className="bg-[#F7F6F2] p-4 rounded-2xl text-xs space-y-2 font-mono border border-black/[0.05]">
                <div className="flex justify-between">
                  <span className="text-[#787774]">Contract Note No:</span>
                  <span className="font-bold text-[#1A1A1A]">{contractNote.contractId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787774]">Escrow Vault Ref:</span>
                  <span className="font-bold text-[#B45309]">{contractNote.escrowId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787774]">Execution Timestamp:</span>
                  <span className="text-[#1A1A1A]">{contractNote.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787774]">Commodity &amp; Grade:</span>
                  <span className="font-bold text-[#1A1A1A]">{contractNote.crop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787774]">Delivery Mode:</span>
                  <span className="font-bold text-[#1A1A1A]">{contractNote.deliveryMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787774]">Procured Quantity:</span>
                  <span className="font-bold text-[#1A1A1A]">{contractNote.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#787774]">Strike Rate:</span>
                  <span className="font-bold text-[#1A1A1A]">₹{contractNote.strikeRate} / Qtl</span>
                </div>
                <div className="pt-2 border-t border-black/[0.08] flex justify-between items-baseline">
                  <span className="font-sans font-bold text-[#1A1A1A]">Total Escrow Deposited:</span>
                  <span className="text-base font-bold text-[#166534]">
                    ₹{contractNote.landedTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={() => alert(`Contract Note ${contractNote.contractId} sent to registered mail and APMC gateway.`)}
                  className="py-3 rounded-full border border-black/[0.1] text-xs font-bold text-[#1A1A1A] hover:bg-[#F2F0EB] transition-colors flex items-center justify-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  <span>Save PDF Note</span>
                </button>
                
                <button
                  onClick={() => {
                    setContractNote(null);
                  }}
                  className="py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-bold font-heading hover:bg-[#B45309] transition-all">
                  Close &bull; Stay on Terminal
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // VIEW B: MAIN COMMODITY EXCHANGE FLOOR (CARS GRID & APMC MODULES)
  // =========================================================================
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* 1. MINIMAL SCANDINAVIAN TOP HEADER BAR (LIGHT & AESTHETIC) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.06] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-[#166534] text-[11px] font-mono font-bold uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>Live APMC Mandi Market Radar &bull; AGMARKNET Connected</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#1A1A1A] tracking-tight">
            AgriStock Commodity Exchange
          </h1>
          <p className="text-[#787774] text-xs sm:text-sm font-sans mt-1 max-w-2xl leading-relaxed">
            Institutional spot terminal and digital trading floor connecting farmers, flour mills, and wholesale processors with direct e-NAM settlement.
          </p>
        </div>

        {/* Minimal High-Trust Stat Pills */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs shrink-0">
          <div className="px-4 py-2.5 rounded-2xl bg-[#F7F6F2] border border-black/[0.05]">
            <span className="text-[10px] text-[#787774] block font-sans uppercase font-medium">Composite Mandi Index</span>
            <span className="text-base font-bold text-[#166534] flex items-center gap-1">
              <span>1,428.50</span>
              <span className="text-xs font-normal">▲ +1.4%</span>
            </span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-[#F7F6F2] border border-black/[0.05]">
            <span className="text-[10px] text-[#787774] block font-sans uppercase font-medium">24h Physical Volume</span>
            <span className="text-base font-bold text-[#1A1A1A]">38,420 Qtl</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-[#F7F6F2] border border-black/[0.05]">
            <span className="text-[10px] text-[#787774] block font-sans uppercase font-medium">Escrow Guaranteed</span>
            <span className="text-base font-bold text-[#B45309]">₹9.24 Cr Locked</span>
          </div>
        </div>
      </div>

      {/* DYNAMIC MODULE CONTENT */}
      
      {/* TAB 1: LIVE APMC EXCHANGE FLOOR */}
      {activeTab === 'exchange' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Search Bar & Quick Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#888681] absolute left-3.5 top-3" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ticker, crop, or APMC mandi (e.g. WHT, Ludhiana, Mustard)..."
                className="w-full bg-white text-xs pl-10 pr-4 py-2.5 rounded-full border border-black/[0.08] focus:outline-none focus:border-[#1A1A1A] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-medium text-[#787774]">
              <span className="text-[#A19F9A] uppercase tracking-wider font-mono text-[10px]">Benchmark:</span>
              <span className="px-2.5 py-1 rounded-full bg-white border border-black/[0.06] text-[#1A1A1A]">AGMARKNET Daily Modal</span>
              <span className="px-2.5 py-1 rounded-full bg-white border border-black/[0.06] text-[#1A1A1A]">NCDEX Grade-A Specs</span>
            </div>
          </div>

          {/* Commodity Cards Grid (Groww / Zerodha Clean Light Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCrops.map((crop) => (
              <div 
                key={crop.id}
                onClick={() => handleOpenTerminal(crop)}
                className="group cursor-pointer bg-white rounded-3xl p-5 sm:p-6 border border-black/[0.06] hover:border-black/20 hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
                
                <div>
                  {/* Top Bar: Ticker + Live Delta Pill */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#F2F0EB] text-[#1A1A1A] text-[10px] font-mono font-bold uppercase tracking-wide">
                        {crop.ticker}
                      </span>
                      <span className="text-[10px] text-[#787774] font-medium">
                        {crop.grade}
                      </span>
                    </div>

                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      crop.isUp ? 'bg-[#10B981]/15 text-[#166534]' : 'bg-[#EF4444]/15 text-[#B91C1C]'
                    }`}>
                      {crop.change}
                    </span>
                  </div>

                  {/* Commodity Name & APMC Mandi */}
                  <h3 className="font-heading font-extrabold text-base text-[#1A1A1A] group-hover:text-[#B45309] transition-colors leading-tight">
                    {crop.name}
                  </h3>
                  <span className="text-xs text-[#787774] font-sans block mt-0.5">
                    {crop.mandi}
                  </span>

                  {/* Spot Price Display */}
                  <div className="my-4 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#1A1A1A] tracking-tight">
                      ₹{crop.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#787774] font-sans">
                      / {crop.unit}
                    </span>
                  </div>

                  {/* Mini High / Low Range Indicator Bar */}
                  <div className="space-y-1.5 py-2 border-t border-black/[0.04]">
                    <div className="flex justify-between text-[10px] font-mono text-[#787774]">
                      <span>L: ₹{crop.low}</span>
                      <span className="text-[#1A1A1A] font-medium font-sans">Day Range</span>
                      <span>H: ₹{crop.high}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F2F0EB] rounded-full overflow-hidden relative">
                      <div 
                        className="h-full bg-[#1A1A1A] rounded-full"
                        style={{ 
                          width: `${Math.min(100, Math.max(10, ((crop.price - crop.low) / (crop.high - crop.low || 1)) * 100))}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Footer: Volume & Inspect CTA */}
                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#787774]">Vol: {crop.volume}</span>
                  <span className="text-[#1A1A1A] font-bold group-hover:text-[#B45309] flex items-center gap-1 font-sans">
                    <span>Trade &amp; Depth</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* Minimal Kisan Auction Banner */}
          <div className="rounded-3xl bg-[#F7F6F2] p-6 sm:p-8 border border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#B45309] font-bold uppercase tracking-wider block mb-1">
                Direct Procurement Floor
              </span>
              <h3 className="font-heading font-extrabold text-lg text-[#1A1A1A]">
                Have a Harvest to Sell at Today's Peak Rates?
              </h3>
              <p className="text-xs text-[#787774] font-sans mt-0.5">
                List your crop on the Kisan Auction Desk. Verified institutional millers bid directly with zero commission.
              </p>
            </div>
            <button
              onClick={() => onTabChange('auction')}
              className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#B45309] text-white text-xs font-bold transition-all shrink-0 flex items-center gap-2">
              <span>List Harvest Lot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: REAL-TIME ARRIVALS TRACKER */}
      {activeTab === 'arrivals' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#1A1A1A]">
                Live APMC Mandi Gate &amp; Weighbridge Inflow
              </h3>
              <p className="text-xs text-[#787774] font-sans mt-0.5">
                Click any Mandi yard to inspect electronic gross-axle weighbridge queues and live moisture assay readings.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#166534] font-bold flex items-center gap-1.5 bg-[#10B981]/10 px-3.5 py-1.5 rounded-full shrink-0 border border-[#10B981]/20">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Weighbridge Grid Online</span>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {mandiArrivals.map((arr) => (
              <div 
                key={arr.id}
                onClick={() => setSelectedArrival(arr)}
                className="group cursor-pointer bg-white rounded-2xl p-5 border border-black/[0.06] hover:border-black/20 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#F7F6F2] border border-black/[0.06] shrink-0">
                    <img 
                      src={arr.image} 
                      alt={arr.crop} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#B45309] transition-colors">
                        {arr.mandi}
                      </h4>
                      <span className="text-[10px] font-mono bg-[#F7F6F2] text-[#1A1A1A] px-2 py-0.5 rounded font-semibold border border-black/[0.05]">
                        {arr.crop}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#787774] font-sans mt-1">
                      <span>Total Today: <b className="text-[#1A1A1A] font-mono">{arr.todayArrival}</b></span>
                      <span>&bull;</span>
                      <span>Transport Inflow: <b className="text-[#1A1A1A] font-mono">{arr.vehicleCount}</b></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-0 border-black/[0.05]">
                  <div className="text-left md:text-right font-mono">
                    <div className="text-base font-bold text-[#1A1A1A]">
                      ₹{arr.currentRate.toLocaleString()} <span className="text-[10px] text-[#787774] font-sans">/ Qtl</span>
                    </div>
                    <span className={`text-[11px] font-bold ${arr.isUp ? 'text-[#166534]' : 'text-[#B91C1C]'}`}>
                      {arr.trend}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#1A1A1A] bg-[#F7F6F2] px-2.5 py-1 rounded-md block border border-black/[0.05]">
                      {arr.gateStatus}
                    </span>
                    <span className="text-[10px] text-[#787774] font-sans block mt-1">
                      {arr.updatedAt}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WHOLESALE LOTS */}
      {activeTab === 'lots' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] flex items-center justify-between shadow-xs">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#1A1A1A]">
                Active Farmer Harvest Lots Under Auction
              </h3>
              <p className="text-xs text-[#787774] font-sans mt-0.5">
                Direct procurement lots with certified moisture and grain purity assay reports.
              </p>
            </div>
            <button
              onClick={() => onTabChange('auction')}
              className="px-4 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#B45309] text-white text-xs font-bold transition-all">
              <span>+ Create My Lot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {wholesaleLots.map((lot) => (
              <div 
                key={lot.lotId}
                className="bg-white rounded-3xl p-5 border border-black/[0.06] hover:border-black/20 hover:shadow-xs transition-all flex flex-col justify-between">
                
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-black/[0.05]">
                    <span className="text-[10px] font-mono font-bold text-[#B45309] bg-[#B45309]/10 px-2 py-0.5 rounded">
                      {lot.lotId}
                    </span>
                    <span className="text-[11px] font-mono text-[#B91C1C] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{lot.timer}</span>
                    </span>
                  </div>

                  {lot.image && (
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-3 bg-[#F7F6F2] border border-black/[0.05]">
                      <img 
                        src={lot.image} 
                        alt={lot.crop} 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-black/70 backdrop-blur-sm text-white">
                        {lot.quantity}
                      </span>
                    </div>
                  )}

                  <h4 className="font-heading font-extrabold text-base text-[#1A1A1A] mb-1">
                    {lot.crop}
                  </h4>
                  <p className="text-xs text-[#787774] font-sans mb-3">
                    Farmer: <b className="text-[#1A1A1A]">{lot.farmer}</b> &bull; {lot.location}
                  </p>

                  <div className="bg-[#F7F6F2] p-3 rounded-2xl space-y-1.5 text-xs font-mono mb-4 border border-black/[0.04]">
                    <div className="flex justify-between">
                      <span className="text-[#787774] font-sans">Available Lot:</span>
                      <span className="font-bold text-[#1A1A1A]">{lot.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#787774] font-sans">Moisture Content:</span>
                      <span className="font-bold text-[#166534]">{lot.moisture}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#787774] font-sans">Reserve Price:</span>
                      <span className="font-bold text-[#1A1A1A]">₹{lot.askingRate}/Qtl</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#787774] block font-sans">Highest Bid:</span>
                    <span className="text-lg font-bold font-mono text-[#166534]">
                      ₹{lot.highestBid}
                    </span>
                    <span className="text-[10px] text-[#787774] block font-sans">({lot.bidsReceived} bids placed)</span>
                  </div>

                  <button
                    onClick={() => {
                      setBiddingLot(lot);
                      setBidOfferAmount(lot.highestBid + 15);
                    }}
                    className="px-4 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#B45309] text-white text-xs font-bold font-heading transition-all shadow-xs">
                    Place Bid
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MERCHANT BIDS (ORDER BOOK) */}
      {activeTab === 'bids' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 border border-black/[0.06] flex items-center justify-between shadow-xs">
            <div>
              <h3 className="font-heading font-extrabold text-base text-[#1A1A1A]">
                Live Merchant Order Book &amp; Bid Depth
              </h3>
              <p className="text-xs text-[#787774] font-sans mt-0.5">
                Real-time purchase bids placed by institutional millers. Farmers can click "Accept Offer" to lock instant deals.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#166534] bg-[#10B981]/10 px-3.5 py-1.5 rounded-full border border-[#10B981]/20">
              Direct Escrow Settlement Guaranteed
            </span>
          </div>

          <div className="space-y-2.5">
            {merchantBids.map((bid) => (
              <div 
                key={bid.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-black/[0.06] hover:border-black/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-sm sm:text-base text-[#1A1A1A]">
                      {bid.buyer}
                    </span>
                    <span className="text-[10px] font-mono text-[#787774] bg-[#F7F6F2] px-2 py-0.5 rounded border border-black/[0.04]">
                      {bid.buyerType}
                    </span>
                  </div>
                  <p className="text-xs text-[#787774] font-sans mt-0.5">
                    Targeting: <b className="text-[#1A1A1A]">{bid.lotTarget}</b> &bull; Placed {bid.time}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5">
                  <div className="text-left sm:text-right font-mono">
                    <span className="text-[10px] text-[#787774] block font-sans">Bid Price / Qtl</span>
                    <span className="text-lg font-bold text-[#166534]">
                      ₹{bid.bidAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#1A1A1A] font-semibold block">
                      (+₹{bid.bidAmount - bid.marketRate} above market)
                    </span>
                  </div>

                  {bid.status === 'Deal Locked ✓' ? (
                    <span className="text-[11px] font-bold font-heading bg-[#166534] text-white px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                      <span>Deal Locked</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAcceptBid(bid)}
                      className="px-4 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#166534] text-white text-xs font-bold font-heading transition-colors shadow-xs">
                      Accept Offer
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: KISAN AUCTION DESK */}
      {activeTab === 'auction' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.08] shadow-md animate-in zoom-in-95 duration-200">
          {auctionSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#166534] flex items-center justify-center text-3xl mx-auto font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-[#1A1A1A]">
                Your Harvest Lot is Now Live on Auction!
              </h3>
              <p className="text-xs text-[#787774] max-w-md mx-auto leading-relaxed">
                Lot broadcasted to <b>1,840+ verified grain buyers &amp; flour mills</b> across North and Central India. Incoming bids are now populating in Wholesale Lots.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => onTabChange('lots')}
                  className="px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-xs font-bold hover:bg-[#B45309] transition-all flex items-center gap-2 mx-auto">
                  <span>View in Wholesale Lots Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="pb-4 mb-6 border-b border-black/[0.06]">
                <span className="text-[11px] font-mono text-[#B45309] uppercase tracking-wider font-bold block mb-1">
                  Kisan Digital Auction Studio
                </span>
                <h2 className="text-2xl font-extrabold font-heading text-[#1A1A1A]">
                  Sell Your Harvest Directly to Wholesale Merchants
                </h2>
                <p className="text-xs text-[#787774] font-sans mt-1">
                  Zero commission middlemen. Set your reserve rate and let multiple buyers compete for your harvest lot.
                </p>
              </div>

              <form onSubmit={handleCreateAuction} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#1A1A1A] font-bold mb-1.5 font-heading">
                    Farmer / FPO Name:
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="Enter Farmer or Farm Producer Org name"
                    value={auctionFarmerName}
                    onChange={(e) => setAuctionFarmerName(e.target.value)}
                    className="w-full bg-[#F7F6F2] border border-black/[0.08] rounded-xl px-4 py-3 text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[#1A1A1A] font-bold mb-1.5 font-heading">
                    Select Crop Commodity:
                  </label>
                  <select 
                    value={auctionCrop}
                    onChange={(e) => setAuctionCrop(e.target.value)}
                    className="w-full bg-[#F7F6F2] border border-black/[0.08] rounded-xl px-4 py-3 text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#1A1A1A]">
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
                    <label className="block text-[#1A1A1A] font-bold mb-1.5 font-heading">
                      Available Harvest Quantity (Quintals):
                    </label>
                    <input 
                      type="number"
                      min={10}
                      max={1000}
                      value={auctionQuantity}
                      onChange={(e) => setAuctionQuantity(Number(e.target.value))}
                      className="w-full bg-[#F7F6F2] border border-black/[0.08] rounded-xl px-4 py-3 text-[#1A1A1A] font-mono font-bold text-sm focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-bold mb-1.5 font-heading">
                      Minimum Reserve Rate (₹ / Quintal):
                    </label>
                    <input 
                      type="number"
                      value={auctionReserveRate}
                      onChange={(e) => setAuctionReserveRate(Number(e.target.value))}
                      className="w-full bg-[#F7F6F2] border border-black/[0.08] rounded-xl px-4 py-3 text-[#1A1A1A] font-mono font-bold text-sm focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1A1A1A] font-bold mb-1.5 font-heading">
                    Farm Location Pincode (For Free Merchant Truck Pickup):
                  </label>
                  <input 
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit village pincode"
                    value={auctionPincode}
                    onChange={(e) => setAuctionPincode(e.target.value)}
                    className="w-full bg-[#F7F6F2] border border-black/[0.08] rounded-xl px-4 py-3 text-[#1A1A1A] font-mono text-sm focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#F7F6F2] border border-black/[0.05] space-y-1">
                  <div className="flex justify-between text-[#787774]">
                    <span>Expected Minimum Gross:</span>
                    <span className="font-mono font-bold text-[#1A1A1A]">₹{(auctionQuantity * auctionReserveRate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#166534] font-semibold">
                    <span>AgriMart Commission:</span>
                    <span>0% (Free for Farmers)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#1A1A1A] hover:bg-[#B45309] text-white font-bold text-xs transition-all shadow-md font-heading flex items-center justify-center gap-2">
                  <Gavel className="w-4 h-4" />
                  <span>Broadcast Lot to 1,840+ Buyers</span>
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* MODAL: WEIGHBRIDGE QUEUE INSPECTION */}
      {selectedArrival && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-black/[0.08] shadow-2xl relative animate-in zoom-in-95">
            <button 
              onClick={() => setSelectedArrival(null)}
              className="absolute top-4 right-4 text-[#787774] hover:text-[#1A1A1A] p-2">
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold text-[#166534] uppercase">Live Weighbridge Queue</span>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-black/[0.08] shadow-xs">
              <img 
                src="/images/mandi-weighbridge-station.jpg" 
                alt="APMC Electronic Weighbridge Station" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-black/70 backdrop-blur-sm text-[#10B981] border border-[#10B981]/30">
                Gross Axle Scale Active
              </span>
              <div className="absolute bottom-2.5 left-3 right-3 text-white flex justify-between items-end">
                <span className="text-xs font-heading font-extrabold">{selectedArrival.mandi}</span>
                <span className="text-[10px] font-mono bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-white">{selectedArrival.gateStatus}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold font-heading text-[#1A1A1A] mb-1">
              {selectedArrival.mandi}
            </h3>
            <p className="text-xs text-[#787774] mb-4">
              Total Today: {selectedArrival.todayArrival} &bull; Modal Rate: ₹{selectedArrival.currentRate}/Qtl
            </p>

            <div className="space-y-2 mb-5">
              <span className="text-[10px] font-mono text-[#787774] uppercase font-bold block">Vehicles in Weighing Bay:</span>
              {selectedArrival.weighbridgeQueue.map((v, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#F7F6F2] text-xs flex justify-between items-center font-mono border border-black/[0.04]">
                  <div>
                    <span className="font-bold text-[#1A1A1A] block font-sans">{v.vehicle}</span>
                    <span className="text-[11px] text-[#787774]">Moisture Content: <b className="text-[#166534]">{v.moisture}</b></span>
                  </div>
                  <span className="font-bold text-[#1A1A1A]">{v.weight}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedArrival(null)}
              className="w-full py-3 rounded-full bg-[#1A1A1A] text-white font-bold text-xs hover:bg-[#B45309] transition-all">
              Close Weighbridge Monitor
            </button>
          </div>
        </div>
      )}

      {/* MODAL: PLACE A MERCHANT BID ON WHOLESALE LOT */}
      {biddingLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-black/[0.08] shadow-2xl relative animate-in zoom-in-95">
            <button 
              onClick={() => setBiddingLot(null)}
              className="absolute top-4 right-4 text-[#787774] hover:text-[#1A1A1A] p-2">
              <X className="w-4 h-4" />
            </button>

            {bidSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#10B981]/15 text-[#166534] flex items-center justify-center text-2xl mx-auto font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold font-heading text-[#1A1A1A]">Bid Submitted to Farmer!</h3>
                <p className="text-xs text-[#787774]">
                  Your purchase offer of <b>₹{bidOfferAmount}/Qtl</b> on {biddingLot.lotId} has been added to the Order Book.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-mono text-[#B45309] uppercase tracking-wider font-bold block mb-1">
                  Merchant Bidding Portal
                </span>
                <h3 className="text-xl font-bold font-heading text-[#1A1A1A]">
                  Place Purchase Bid on {biddingLot.lotId}
                </h3>
                <p className="text-xs text-[#787774] mb-4">
                  {biddingLot.crop} &bull; {biddingLot.quantity} &bull; Farmer: {biddingLot.farmer}
                </p>

                <form onSubmit={handlePlaceBidSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#1A1A1A] font-bold mb-1">Buyer Organization:</label>
                    <input 
                      type="text"
                      required
                      value={bidBuyerName}
                      onChange={(e) => setBidBuyerName(e.target.value)}
                      className="w-full bg-[#F7F6F2] border border-black/[0.08] rounded-xl px-3.5 py-2.5 font-semibold text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1A1A] font-bold mb-1">
                      Your Offer Rate (₹ / Quintal):
                    </label>
                    <input 
                      type="number"
                      required
                      min={biddingLot.askingRate}
                      value={bidOfferAmount}
                      onChange={(e) => setBidOfferAmount(e.target.value)}
                      className="w-full bg-[#F7F6F2] border border-black/[0.08] rounded-xl px-3.5 py-2.5 font-mono font-bold text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                    <span className="text-[10px] text-[#787774] block mt-1">
                      Farmer Reserve: ₹{biddingLot.askingRate} &bull; Current Highest: ₹{biddingLot.highestBid}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#166534] text-white font-bold text-xs transition-all shadow-md font-heading">
                    Submit Binding Purchase Offer
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: DEAL LOCKED CELEBRATION RECEIPT */}
      {acceptedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-black/[0.08] shadow-2xl text-center space-y-4 relative animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#10B981]/15 text-[#166534] flex items-center justify-center text-3xl mx-auto font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-extrabold font-heading text-[#1A1A1A]">
              Deal Locked &amp; Confirmed!
            </h3>
            <div className="bg-[#F7F6F2] p-4 rounded-2xl text-xs text-left space-y-2 font-mono border border-black/[0.05]">
              <div className="flex justify-between">
                <span className="text-[#787774]">Buyer:</span>
                <span className="font-bold text-[#1A1A1A]">{acceptedDeal.buyer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#787774]">Target Lot:</span>
                <span className="font-bold text-[#1A1A1A]">{acceptedDeal.lotTarget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#787774]">Settlement Rate:</span>
                <span className="font-bold text-[#166534]">₹{acceptedDeal.bidAmount}/Quintal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#787774]">Payment Mode:</span>
                <span className="font-bold text-[#1A1A1A]">Direct RTGS within 2h</span>
              </div>
            </div>
            <p className="text-xs text-[#787774]">
              Digital sale contract dispatched to farmer SMS. Buyer truck will arrive at farm gate for pickup.
            </p>
            <button
              onClick={() => setAcceptedDeal(null)}
              className="w-full py-3.5 rounded-full bg-[#1A1A1A] text-white font-bold text-xs font-heading hover:bg-[#B45309] transition-all">
              Close Confirmation Receipt
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
