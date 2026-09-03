// src/data/mockData.js
// AgriMart Master Data: Store, Heavy Equipment Rentals & Live Mandi Commodities

export const LIVE_MANDI_COMMODITIES = [
  {
    id: 'wheat-ludhiana',
    name: 'Wheat (Sharbati/Kharif)',
    mandi: 'Ludhiana APMC, Punjab',
    price: 2450,
    prevPrice: 2390,
    change: '+2.4%',
    isUp: true,
    dayHigh: 2480,
    dayLow: 2410,
    volume: '4,200 Qtl',
    sparkline: [2380, 2395, 2410, 2400, 2430, 2445, 2450]
  },
  {
    id: 'mustard-alwar',
    name: 'Mustard Seed (Black)',
    mandi: 'Alwar APMC, Rajasthan',
    price: 5680,
    prevPrice: 5580,
    change: '+1.8%',
    isUp: true,
    dayHigh: 5720,
    dayLow: 5550,
    volume: '2,800 Qtl',
    sparkline: [5500, 5540, 5580, 5610, 5590, 5650, 5680]
  },
  {
    id: 'cotton-rajkot',
    name: 'Cotton (Shankar-6 Long Staple)',
    mandi: 'Rajkot APMC, Gujarat',
    price: 7140,
    prevPrice: 7180,
    change: '-0.6%',
    isUp: false,
    dayHigh: 7220,
    dayLow: 7110,
    volume: '6,400 Bales',
    sparkline: [7250, 7220, 7200, 7180, 7190, 7160, 7140]
  },
  {
    id: 'paddy-karnal',
    name: 'Basmati Paddy 1121',
    mandi: 'Karnal APMC, Haryana',
    price: 4420,
    prevPrice: 4290,
    change: '+3.1%',
    isUp: true,
    dayHigh: 4460,
    dayLow: 4280,
    volume: '5,100 Qtl',
    sparkline: [4220, 4260, 4290, 4320, 4360, 4400, 4420]
  },
  {
    id: 'soybean-indore',
    name: 'Soybean (Yellow Seed)',
    mandi: 'Indore APMC, Madhya Pradesh',
    price: 4820,
    prevPrice: 4780,
    change: '+0.9%',
    isUp: true,
    dayHigh: 4850,
    dayLow: 4760,
    volume: '3,700 Qtl',
    sparkline: [4720, 4750, 4780, 4760, 4790, 4810, 4820]
  },
  {
    id: 'chilli-guntur',
    name: 'Red Chilli (Teja Variety)',
    mandi: 'Guntur APMC, Andhra Pradesh',
    price: 18500,
    prevPrice: 17750,
    change: '+4.2%',
    isUp: true,
    dayHigh: 18900,
    dayLow: 17600,
    volume: '8,900 Bags',
    sparkline: [17200, 17400, 17750, 17900, 18100, 18350, 18500]
  }
];

export const RENTAL_FLEET = [
  {
    id: 'jd-5310',
    name: 'John Deere 5310 4WD Heavy Tractor (55 HP)',
    category: 'Heavy Tractor',
    horsePower: '55 HP',
    ratePerDay: 2400,
    ratePerAcre: 750,
    driverChargePerDay: 500,
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/category-machinery.jpg',
    features: ['4-Wheel Drive Traction', 'Power Reverser Transmission', 'Heavy Plowing & Trolley Capable'],
    fuelPolicy: 'Delivered with full tank; return with full tank',
    availableLocations: ['Punjab', 'Haryana', 'Western UP', 'Rajasthan'],
    isAvailable: true
  },
  {
    id: 'mahindra-575',
    name: 'Mahindra 575 DI High-Torque Tractor (45 HP)',
    category: 'Medium Tractor',
    horsePower: '45 HP',
    ratePerDay: 1900,
    ratePerAcre: 650,
    driverChargePerDay: 450,
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/category-machinery.jpg',
    features: ['Fuel-Efficient mBoost Engine', 'High Hydraulic Lift 1600 kg', 'Ideal for Rotavator & Sowing'],
    fuelPolicy: 'Delivered with full tank; return with full tank',
    availableLocations: ['Maharashtra', 'Gujarat', 'Madhya Pradesh', 'Andhra Pradesh'],
    isAvailable: true
  },
  {
    id: 'kubota-combine',
    name: 'Kubota DC-68G Self-Propelled Paddy Harvester',
    category: 'Harvest Combine',
    horsePower: '68 HP Diesel',
    ratePerDay: 5800,
    ratePerAcre: 1400,
    driverChargePerDay: 800,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/category-machinery.jpg',
    features: ['Rubber Track for Wet Marshy Fields', 'Grain Threshing & Bagging', 'Zero Grain Loss Guarantee'],
    fuelPolicy: 'Diesel billed per acre at current Mandi depot rate',
    availableLocations: ['Punjab', 'Haryana', 'Andhra Pradesh', 'Telangana', 'West Bengal'],
    isAvailable: true
  },
  {
    id: 'agroflyer-drone',
    name: 'AgroFlyer Pro 16L Autonomous Crop Spray Drone',
    category: 'Drone Aviation',
    horsePower: 'Electric Hexacopter',
    ratePerDay: 3200,
    ratePerAcre: 350,
    driverChargePerDay: 600,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/category-machinery.jpg',
    features: ['1 Acre Covered in 7 Minutes', 'Centrifugal Nozzle Atomization', 'Includes DGCA Certified Drone Pilot'],
    fuelPolicy: 'Includes 4 Quick-Swap Lithium Batteries & Portable Solar Inverter',
    availableLocations: ['Pan-India Booking'],
    isAvailable: true
  },
  {
    id: 'shaktiman-rotavator',
    name: 'Shaktiman Regular Series 6ft Rotary Tiller',
    category: 'Tillage Implement',
    horsePower: 'Requires 40+ HP Tractor',
    ratePerDay: 950,
    ratePerAcre: 300,
    driverChargePerDay: 0,
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    fallbackImage: '/images/category-tools.jpg',
    features: ['Multi-Speed Heavy Duty Gearbox', 'Boron Steel Curved Blades', 'Single Pass Seedbed Prep'],
    fuelPolicy: 'Implement only; hitch to your tractor',
    availableLocations: ['Pan-India Booking'],
    isAvailable: true
  }
];

export const CATEGORIES = [
  {
    id: 'seeds',
    slug: 'seeds',
    name: 'Heirloom & Hybrid Seeds',
    itemCount: '48 Varieties',
    image: '/images/category-seeds.jpg',
    description: 'Certified 98% germination rate heirloom, non-GMO and hybrid cultivars.'
  },
  {
    id: 'machines',
    slug: 'machines',
    name: 'Field Machinery & Sprayers',
    itemCount: '19 Models',
    image: '/images/category-machinery.jpg',
    description: 'Electric dual-pressure knapsack sprayers, cordless cultivators & equipment.'
  },
  {
    id: 'care',
    slug: 'care',
    name: 'Botanical Crop Care',
    itemCount: '62 Formulations',
    image: '/images/category-care.jpg',
    description: 'Bio-stimulants, systemic fungal remedies, and organic soil tonics.'
  },
  {
    id: 'tools',
    slug: 'tools',
    name: 'Crafted Hand Tools',
    itemCount: '34 Implements',
    image: '/images/category-tools.jpg',
    description: 'Hand-forged carbon-steel harvesting sickles, shears, and ergonomic aerators.'
  },
  {
    id: 'irrigation',
    slug: 'irrigation',
    name: 'Micro-Irrigation Systems',
    itemCount: '27 Systems',
    image: '/images/category-irrigation.jpg',
    description: 'Gravity drip manifolds, brass misting arrays, and solar pump valves.'
  }
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Pioneer 3302 Heritage Maize Cultivar',
    brand: 'PIONEER AGRONOMY',
    category: 'seeds',
    categoryName: 'Heirloom Seeds',
    price: 540,
    originalPrice: 650,
    unit: '5 kg seed sack',
    rating: 4.9,
    reviewCount: 142,
    image: '/images/category-seeds.jpg',
    inStock: true,
    stockLeft: 38,
    isFeatured: true,
    tag: 'Pure Cultivar',
    shortDescription: 'High-starch organic maize seed with deep drought tolerance and certified 94% lab germination.',
    specifications: {
      'Germination Guarantee': '≥ 94%',
      'Purity Index': '99.4%',
      'Maturity Period': '105 - 110 Days',
      'Optimal Soil': 'Well-drained Silty Loam',
      'Origin': 'Certified Breeder Seed Farm'
    },
    applicationInstructions: 'Sow at 4-5 cm depth with 60 cm inter-row spacing. Recommended for Kharif and Rabi seasons.'
  },
  {
    id: 2,
    name: 'AgroPro S1 Precision Electric Sprayer (18L)',
    brand: 'AGRO-PRO NORDIC',
    category: 'machines',
    categoryName: 'Field Machinery',
    price: 4290,
    originalPrice: 5190,
    unit: 'complete tool set',
    rating: 4.9,
    reviewCount: 96,
    image: '/images/category-machinery.jpg',
    inStock: true,
    stockLeft: 8,
    isFeatured: true,
    tag: 'Design Award 2026',
    shortDescription: 'Matte-composite ergonomic sprayer with dual-pressure diaphragm pump, telescopic wand and lithium battery.',
    specifications: {
      'Working Pressure': '4.5 - 6.5 Bar Variable',
      'Tank Volume': '18 Liters',
      'Battery Runtime': '8.5 Hours Continuous',
      'Dry Weight': '4.2 kg (Ultra-Lightweight)',
      'Nozzle Fittings': 'Solid Brass & Flat Fan'
    },
    applicationInstructions: 'Flush reservoir with clean ambient water after chemical application. 2-Year warranty.'
  },
  {
    id: 3,
    name: 'Flora Vital Organic Botanical Crop Elixir (500ml)',
    brand: 'BOTANICAL LABS',
    category: 'care',
    categoryName: 'Botanical Crop Care',
    price: 890,
    originalPrice: 1100,
    unit: 'amber glass bottle',
    rating: 4.8,
    reviewCount: 78,
    image: '/images/category-care.jpg',
    inStock: true,
    stockLeft: 50,
    isFeatured: true,
    tag: 'Bio-Certified',
    shortDescription: 'Cold-pressed bioactive seaweed and humic extract formulation activating cellular root immunity against blast and rot.',
    specifications: {
      'Active Ingredients': 'Cold Ascophyllum Nodosum + Potassium Humate',
      'Organic Certification': 'NPOP & USDA Organic',
      'PH Value': '6.2 - 6.8 Balanced',
      'Dilution Ratio': '2 ml per Liter Water'
    },
    applicationInstructions: 'Foliar spray during early dawn or late twilight. Safe for bees and beneficial pollinator insects.'
  },
  {
    id: 4,
    name: 'Hand-Forged Ash-Wood Pruning Shears',
    brand: 'FORGE & SOIL',
    category: 'tools',
    categoryName: 'Crafted Hand Tools',
    price: 1250,
    originalPrice: 1480,
    unit: 'piece',
    rating: 5.0,
    reviewCount: 52,
    image: '/images/category-tools.jpg',
    inStock: true,
    stockLeft: 14,
    isFeatured: false,
    tag: 'Artisan Forged',
    shortDescription: 'High-carbon Japanese SK-5 tool steel blade with hand-turned, linseed-oil treated ash handles and brass rivets.',
    specifications: {
      'Blade Hardness': '58 - 60 HRC',
      'Blade Material': 'High Carbon Tool Steel',
      'Handle': 'European Ash Wood',
      'Cutting Diameter': 'Up to 25 mm fresh branch'
    },
    applicationInstructions: 'Wipe blade dry after wet sap harvesting. Apply a drop of mineral oil on pivot spring monthly.'
  },
  {
    id: 5,
    name: 'Brass Micro-Mist Greenhouse Drip System (0.5 Acre)',
    brand: 'SOLUM HYDRAULICS',
    category: 'irrigation',
    categoryName: 'Micro-Irrigation Systems',
    price: 6800,
    originalPrice: 7950,
    unit: 'complete kit',
    rating: 4.9,
    reviewCount: 34,
    image: '/images/category-irrigation.jpg',
    inStock: true,
    stockLeft: 6,
    isFeatured: true,
    tag: 'Water-Saver',
    shortDescription: 'Architectural-grade brass misting nozzles and UV-resistant lateral tubing engineered for delicate nurseries and orchards.',
    specifications: {
      'Acreage Coverage': '0.5 Acre (2000 m²)',
      'Water Savings': 'Up to 65% vs Flood',
      'Working Pressure': '1.5 - 3.0 Bar',
      'Included Filter': 'Mesh 120 Disc Core'
    },
    applicationInstructions: 'Connects directly to low-pressure farm gravity tank or electric booster pump. Assembly diagram included.'
  },
  {
    id: 6,
    name: 'Solum Bio-NPK Microbial Inoculant (1L)',
    brand: 'BOTANICAL LABS',
    category: 'care',
    categoryName: 'Botanical Crop Care',
    price: 460,
    originalPrice: 550,
    unit: '1000 ml bottle',
    rating: 4.8,
    reviewCount: 110,
    image: '/images/category-care.jpg',
    inStock: true,
    stockLeft: 65,
    isFeatured: false,
    tag: 'Microbiome',
    shortDescription: 'Live symbiotic rhizobacteria solubilizing bound soil phosphorus and fixing atmospheric nitrogen without chemical salts.',
    specifications: {
      'Bacterial Count': '1 × 10⁹ CFU / ml',
      'Species': 'Azotobacter, Bacillus, Frateuria',
      'Shelf Life': '14 Months at room temp',
      'Application': 'Drip or Seed Inoculation'
    },
    applicationInstructions: 'Mix 250ml per 100kg organic compost or inject via drip irrigation lines at first watering.'
  }
];

export const EDITORIAL_FEATURES = [
  {
    title: 'Certified Origin & Lab Purity',
    description: 'Every seed cultivar, bio-formulation, and forged implement is verified with batch laboratory analytics before dispatch.',
    number: '01'
  },
  {
    title: 'Direct Village Gate Logistics',
    description: 'Reliable doorstep freight directly to rural pin codes across India. Safe, zero-middleman transit for your farm.',
    number: '02'
  },
  {
    title: 'Certified Agronomist Helpline',
    description: 'Consult certified plant pathologists for real-time dosage advice, disease diagnosis, and seasonal crop planning.',
    number: '03'
  }
];
