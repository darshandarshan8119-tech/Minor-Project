// src/data/mockData.js
// AgriMart Master Data: Store Products, Heavy Machinery Rentals, APMC Mandi Commodities & Infrastructure

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
    sparkline: [2380, 2395, 2410, 2400, 2430, 2445, 2450],
    image: '/images/mandi-wheat-sacks.jpg',
    cropImage: '/images/seeds-sharbati-wheat.jpg',
    grade: 'Grade-A Sharbati',
    moisture: '11.2%'
  },
  {
    id: 'mustard-alwar',
    name: 'Mustard Seed (Pusa Bold Black)',
    mandi: 'Alwar APMC, Rajasthan',
    price: 5680,
    prevPrice: 5580,
    change: '+1.8%',
    isUp: true,
    dayHigh: 5720,
    dayLow: 5550,
    volume: '2,800 Qtl',
    sparkline: [5500, 5540, 5580, 5610, 5590, 5650, 5680],
    image: '/images/seeds-mustard-sarson.jpg',
    cropImage: '/images/seeds-mustard-sarson.jpg',
    grade: 'High-Oil 42%',
    moisture: '7.8%'
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
    sparkline: [7250, 7220, 7200, 7180, 7190, 7160, 7140],
    image: '/images/mandi-cotton-bales.jpg',
    cropImage: '/images/seeds-cotton-shankar.jpg',
    grade: '29mm Micronaire',
    moisture: '8.4%'
  },
  {
    id: 'paddy-karnal',
    name: 'Basmati Paddy 1121 Extra Long',
    mandi: 'Karnal APMC, Haryana',
    price: 4420,
    prevPrice: 4290,
    change: '+3.1%',
    isUp: true,
    dayHigh: 4460,
    dayLow: 4280,
    volume: '5,100 Qtl',
    sparkline: [4220, 4260, 4290, 4320, 4360, 4400, 4420],
    image: '/images/seeds-basmati-paddy.jpg',
    cropImage: '/images/seeds-basmati-paddy.jpg',
    grade: 'Export Grade 8.35mm',
    moisture: '12.0%'
  },
  {
    id: 'soybean-indore',
    name: 'Soybean (Yellow High Protein)',
    mandi: 'Indore APMC, Madhya Pradesh',
    price: 4820,
    prevPrice: 4780,
    change: '+0.9%',
    isUp: true,
    dayHigh: 4850,
    dayLow: 4760,
    volume: '3,700 Qtl',
    sparkline: [4720, 4750, 4780, 4760, 4790, 4810, 4820],
    image: '/images/seeds-soybean-yellow.jpg',
    cropImage: '/images/seeds-soybean-yellow.jpg',
    grade: 'Yellow Food-Grade',
    moisture: '10.5%'
  },
  {
    id: 'maize-davangere',
    name: 'Hybrid Maize / Corn Feed Grade',
    mandi: 'Davangere APMC, Karnataka',
    price: 2280,
    prevPrice: 2210,
    change: '+3.2%',
    isUp: true,
    dayHigh: 2310,
    dayLow: 2190,
    volume: '6,100 Qtl',
    sparkline: [2190, 2210, 2240, 2230, 2260, 2275, 2280],
    image: '/images/seeds-hybrid-maize.jpg',
    cropImage: '/images/seeds-hybrid-maize.jpg',
    grade: 'Starch > 68%',
    moisture: '11.8%'
  }
];

export const MANDI_INFRASTRUCTURE = [
  {
    id: 'silo-terminal',
    title: 'Automated Grain Silo Terminal',
    description: 'Bulk moisture-controlled vertical storage with 50,000 MT capacity, nitrogen-blanketed silos and digital truck discharge.',
    image: '/images/mandi-silo-terminal.jpg',
    tag: 'National APMC Terminal'
  },
  {
    id: 'weighbridge',
    title: 'Electronic Inflow Weighbridge Station',
    description: 'Direct gross & tare axle scale with automated weighment slip generation linked directly to e-NAM digital clearing.',
    image: '/images/mandi-weighbridge-station.jpg',
    tag: 'High-Precision Scales'
  },
  {
    id: 'auction-yard',
    title: 'Regulated Open Pavilion Auction Floor',
    description: 'Licensed commission agent pits with electronic open-outcry bidding and digital live commodity ticker screens.',
    image: '/images/mandi-auction-yard.jpg',
    tag: 'Regulated Market Yard'
  },
  {
    id: 'moisture-lab',
    title: 'Digital NIR Grain Moisture & Assay Lab',
    description: 'Instant NIR spectroscopy testing providing certified Grade A/B laboratory reports before trade escrow settlement.',
    image: '/images/mandi-moisture-meter.jpg',
    tag: 'AGMARK / NCDEX Certified'
  },
  {
    id: 'cotton-depot',
    title: 'Wholesale Baled Cotton Staging Depot',
    description: 'Climate-monitored asphalt staging yard with hydraulic bale clamps, steel banding and fire-safe staging logistics.',
    image: '/images/mandi-cotton-bales.jpg',
    tag: 'Commodity Staging Hub'
  },
  {
    id: 'grain-godown',
    title: 'Tier-1 Ventilated Grain Storage Godown',
    description: 'Multi-layer dunnage burlap jute stacking preserving natural grain quality and grain dust control without chemical fumigants.',
    image: '/images/mandi-wheat-sacks.jpg',
    tag: 'CWC Accredited Storage'
  }
];

export const RENTAL_FLEET = [
  {
    id: 'jd-5310',
    name: 'John Deere 5310 4WD Heavy Tractor (55 HP)',
    category: 'Heavy Tractor',
    horsePower: '55 HP Turbo',
    ratePerDay: 2400,
    ratePerAcre: 750,
    driverChargePerDay: 500,
    image: '/images/vehicle-tractor-4wd.jpg',
    fallbackImage: '/images/vehicle-tractor-4wd.jpg',
    features: ['4-Wheel Drive Deep Lug Traction', 'Power Reverser Transmission', 'Heavy Plowing & Hydraulic Trolley Capable'],
    fuelPolicy: 'Delivered with full tank; return with full tank',
    availableLocations: ['Punjab', 'Haryana', 'Western UP', 'Rajasthan'],
    isAvailable: true
  },
  {
    id: 'mahindra-575',
    name: 'Mahindra 575 DI High-Torque Tractor (45 HP)',
    category: 'Medium Tractor',
    horsePower: '45 HP DI',
    ratePerDay: 1900,
    ratePerAcre: 650,
    driverChargePerDay: 450,
    image: '/images/vehicle-tractor-2wd.jpg',
    fallbackImage: '/images/vehicle-tractor-2wd.jpg',
    features: ['Fuel-Efficient mBoost Engine', 'High Hydraulic Lift 1600 kg', 'Ideal for Rotavator & Seed Sowing'],
    fuelPolicy: 'Delivered with full tank; return with full tank',
    availableLocations: ['Maharashtra', 'Gujarat', 'Madhya Pradesh', 'Andhra Pradesh'],
    isAvailable: true
  },
  {
    id: 'kubota-combine',
    name: 'Kubota DC-68G Self-Propelled Grain Harvester',
    category: 'Harvest Combine',
    horsePower: '68 HP Diesel',
    ratePerDay: 5800,
    ratePerAcre: 1400,
    driverChargePerDay: 800,
    image: '/images/vehicle-combine-harvester.jpg',
    fallbackImage: '/images/vehicle-combine-harvester.jpg',
    features: ['Wide Rubber Track for Wet Marshy Fields', 'Grain Threshing, Cleaning & Auto-Bagging', 'Zero Grain Loss Guarantee'],
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
    image: '/images/vehicle-spray-drone.jpg',
    fallbackImage: '/images/vehicle-spray-drone.jpg',
    features: ['1 Acre Covered in 7 Minutes', 'Centrifugal Micron Nozzle Atomization', 'Includes DGCA Certified Drone Pilot'],
    fuelPolicy: 'Includes 4 Quick-Swap Lithium Batteries & Portable Solar Inverter',
    availableLocations: ['Pan-India Booking'],
    isAvailable: true
  },
  {
    id: 'shaktiman-rotavator',
    name: 'Shaktiman Regular Series 6ft Rotary Tiller (Rotavator)',
    category: 'Tillage Implement',
    horsePower: 'Requires 40+ HP Tractor',
    ratePerDay: 950,
    ratePerAcre: 300,
    driverChargePerDay: 0,
    image: '/images/vehicle-rotavator.jpg',
    fallbackImage: '/images/vehicle-rotavator.jpg',
    features: ['Multi-Speed Heavy Duty Gearbox', 'Curved Boron Steel Tilling Blades', 'Single Pass Seedbed Preparation'],
    fuelPolicy: 'Implement only; hitch to your tractor',
    availableLocations: ['Pan-India Booking'],
    isAvailable: true
  },
  {
    id: 'hydraulic-trolley',
    name: 'Dual-Axle Hydraulic Tipping Farm Trolley',
    category: 'Haulage Implement',
    horsePower: '12-Tonne Payload',
    ratePerDay: 850,
    ratePerAcre: 250,
    driverChargePerDay: 0,
    image: '/images/vehicle-hydraulic-trolley.jpg',
    fallbackImage: '/images/vehicle-hydraulic-trolley.jpg',
    features: ['Twin Heavy-Duty Axles with Leaf Springs', 'High-Pressure Hydraulic Ram Tipping', 'Heavy Off-Road Commercial Tires'],
    fuelPolicy: 'Trailer implement; hitch to any standard tractor hook',
    availableLocations: ['Pan-India Booking'],
    isAvailable: true
  },
  {
    id: 'precision-seed-drill',
    name: 'Precision Automatic Multi-Row Seed Drill & Planter',
    category: 'Planting Implement',
    horsePower: 'Requires 45+ HP Tractor',
    ratePerDay: 1100,
    ratePerAcre: 320,
    driverChargePerDay: 0,
    image: '/images/vehicle-seed-drill.jpg',
    fallbackImage: '/images/vehicle-seed-drill.jpg',
    features: ['Dual Fertilizer & Seed Fluted Hoppers', 'Uniform Depth Disc Openers', 'Calibrated Seed Spacing Telemetry'],
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
    image: '/images/seeds-sharbati-wheat.jpg',
    description: 'Certified 98% germination rate heirloom, non-GMO and hybrid cultivars.'
  },
  {
    id: 'machines',
    slug: 'machines',
    name: 'Field Machinery & Sprayers',
    itemCount: '19 Models',
    image: '/images/vehicle-tractor-4wd.jpg',
    description: 'Electric dual-pressure knapsack sprayers, cordless cultivators & machinery.'
  },
  {
    id: 'care',
    slug: 'care',
    name: 'Botanical Crop Care',
    itemCount: '62 Formulations',
    image: '/images/care-bio-npk-elixir.jpg',
    description: 'Bio-stimulants, systemic fungal remedies, and organic soil tonics.'
  },
  {
    id: 'tools',
    slug: 'tools',
    name: 'Crafted Hand Tools',
    itemCount: '34 Implements',
    image: '/images/tools-pruning-shears.jpg',
    description: 'Hand-forged carbon-steel harvesting sickles, shears, and ergonomic aerators.'
  },
  {
    id: 'irrigation',
    slug: 'irrigation',
    name: 'Micro-Irrigation Systems',
    itemCount: '27 Systems',
    image: '/images/irrigation-drip-nozzles.jpg',
    description: 'Gravity drip manifolds, brass misting arrays, and solar pump valves.'
  }
];

export const PRODUCTS = [
  // --- SEEDS CATEGORY ---
  {
    id: 1,
    name: 'Pioneer Heritage Hybrid Maize Seeds (5kg)',
    brand: 'PIONEER AGRONOMY',
    category: 'seeds',
    categoryName: 'Heirloom Seeds',
    price: 540,
    originalPrice: 650,
    unit: '5 kg seed sack',
    rating: 4.9,
    reviewCount: 142,
    image: '/images/seeds-hybrid-maize.jpg',
    inStock: true,
    stockLeft: 38,
    isFeatured: true,
    tag: 'Pure Cultivar',
    shortDescription: 'High-starch organic hybrid maize seed with deep drought tolerance and certified 94% lab germination.',
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
    name: 'Sharbati Golden Desi Wheat Grain Seeds (10kg)',
    brand: 'VEDIC CULTIVARS',
    category: 'seeds',
    categoryName: 'Heirloom Seeds',
    price: 780,
    originalPrice: 920,
    unit: '10 kg burlap sack',
    rating: 5.0,
    reviewCount: 189,
    image: '/images/seeds-sharbati-wheat.jpg',
    inStock: true,
    stockLeft: 52,
    isFeatured: true,
    tag: 'GI Tag Heritage',
    shortDescription: 'Unpolished golden Sharbati wheat grain with sweet palate, high grain protein and high gluten strength.',
    specifications: {
      'Grain Hardness': 'Vitreous Amber',
      'Protein Content': '13.8% Dry Basis',
      'Germination Rate': '≥ 96%',
      'Sowing Window': 'Late October to Mid November'
    },
    applicationInstructions: 'Broadcast or drill sow with 20 cm row spacing. Irrigate at crown root initiation.'
  },
  {
    id: 3,
    name: 'Pusa Basmati 1121 Traditional Paddy Seeds (5kg)',
    brand: 'IARI SELECT',
    category: 'seeds',
    categoryName: 'Heirloom Seeds',
    price: 890,
    originalPrice: 1050,
    unit: '5 kg seed sack',
    rating: 4.9,
    reviewCount: 215,
    image: '/images/seeds-basmati-paddy.jpg',
    inStock: true,
    stockLeft: 44,
    isFeatured: false,
    tag: 'Export Grade',
    shortDescription: 'World-renowned extra-long slender grain basmati paddy seeds with legendary elongation on cooking.',
    specifications: {
      'Milled Rice Length': '8.35 mm Average',
      'Aroma Profile': 'High 2-AP Natural Aroma',
      'Maturity Duration': '140 - 145 Days',
      'Certification': 'National Seeds Corporation'
    },
    applicationInstructions: 'Prepare nursery bed in June. Transplant 25-day old seedlings with 20x15 cm spacing.'
  },
  {
    id: 4,
    name: 'Pusa Bold High-Oil Mustard (Sarson) Seeds (2kg)',
    brand: 'SOLUM AGRONOMY',
    category: 'seeds',
    categoryName: 'Heirloom Seeds',
    price: 320,
    originalPrice: 380,
    unit: '2 kg tin pack',
    rating: 4.8,
    reviewCount: 94,
    image: '/images/seeds-mustard-sarson.jpg',
    inStock: true,
    stockLeft: 60,
    isFeatured: false,
    tag: 'High Oil 42%',
    shortDescription: 'Bold black mustard cultivar with rich pungent essential oil, aphid tolerance and heavy siliqua branching.',
    specifications: {
      'Oil Percentage': '41.5% - 42.8%',
      'Test Weight (1000 grains)': '5.8 - 6.2 grams',
      'Disease Tolerance': 'White Rust & Alternaria Blight Resilient'
    },
    applicationInstructions: 'Line sowing behind plough in October. Requires one pre-flowering irrigation.'
  },
  {
    id: 5,
    name: 'Shankar-6 Certified Hybrid Cotton Seeds (1kg)',
    brand: 'GUJARAT AGRI-SEED',
    category: 'seeds',
    categoryName: 'Heirloom Seeds',
    price: 950,
    originalPrice: 1150,
    unit: '1 kg sealed pouch',
    rating: 4.9,
    reviewCount: 167,
    image: '/images/seeds-cotton-shankar.jpg',
    inStock: true,
    stockLeft: 29,
    isFeatured: false,
    tag: 'Long Staple',
    shortDescription: 'Premium long staple hybrid cotton seed producing exceptionally white lint and superior micronaire spinning index.',
    specifications: {
      'Staple Length': '28 - 29 mm',
      'Micronaire Value': '3.8 - 4.2',
      'Ginning Outturn': '34 - 35%'
    },
    applicationInstructions: 'Dibble 2 seeds per hill on ridges at 90x60 cm spacing under irrigated conditions.'
  },
  {
    id: 6,
    name: 'Yellow Food-Grade High-Protein Soybean Seeds (5kg)',
    brand: 'MALWA SEEDS',
    category: 'seeds',
    categoryName: 'Heirloom Seeds',
    price: 490,
    originalPrice: 580,
    unit: '5 kg sack',
    rating: 4.7,
    reviewCount: 88,
    image: '/images/seeds-soybean-yellow.jpg',
    inStock: true,
    stockLeft: 70,
    isFeatured: false,
    tag: 'High Protein',
    shortDescription: 'Uniform round yellow soybean seeds with light hilum, high protein density and quick nodulation.',
    specifications: {
      'Protein Ratio': '≥ 40% Crude Protein',
      'Oil Content': '20% Cold Extractable',
      'Germination Index': '≥ 92%'
    },
    applicationInstructions: 'Treat with Rhizobium culture before sowing. Maintain 45 cm row spacing in monsoon.'
  },

  // --- BOTANICAL CROP CARE & MEDICINE ---
  {
    id: 7,
    name: 'Bio-NPK Liquid Microbial Soil Activator (500ml)',
    brand: 'BOTANICAL LABS',
    category: 'care',
    categoryName: 'Botanical Crop Care',
    price: 890,
    originalPrice: 1100,
    unit: 'amber glass bottle',
    rating: 4.9,
    reviewCount: 142,
    image: '/images/care-bio-npk-elixir.jpg',
    inStock: true,
    stockLeft: 45,
    isFeatured: true,
    tag: 'Bio-Certified',
    shortDescription: 'Cold-pressed bioactive seaweed and microbial elixir activating soil nutrient uptake and rhizosphere immunity.',
    specifications: {
      'Active Ingredients': 'Azotobacter, PSB, KMB Consortium',
      'Organic Certification': 'NPOP & USDA Organic',
      'PH Value': '6.2 - 6.8 Balanced',
      'Dilution Ratio': '2 ml per Liter Water'
    },
    applicationInstructions: 'Foliar spray during early dawn or inject through drip irrigation. Safe for pollinators.'
  },
  {
    id: 8,
    name: 'Cold-Pressed Organic Neem Bio-Pesticide (1L)',
    brand: 'NEEM SHIELD',
    category: 'care',
    categoryName: 'Botanical Crop Care',
    price: 620,
    originalPrice: 750,
    unit: '1000 ml spray bottle',
    rating: 4.8,
    reviewCount: 178,
    image: '/images/care-neem-pesticide.jpg',
    inStock: true,
    stockLeft: 82,
    isFeatured: true,
    tag: 'Zero Residue',
    shortDescription: 'Pure cold-pressed neem kernel extract with 10,000 PPM Azadirachtin repelling chewing and sucking crop pests.',
    specifications: {
      'Azadirachtin Potency': '10,000 PPM (1.0% EC)',
      'Target Pests': 'Aphids, Whiteflies, Thrips, Bollworms',
      'Pre-Harvest Interval': '0 Days (Completely Food-Safe)'
    },
    applicationInstructions: 'Dilute 3-4 ml per liter water. Spray thoroughly on both upper and lower leaf surfaces.'
  },
  {
    id: 9,
    name: 'Chelated Micronutrient Zinc & Boron Spray (1L)',
    brand: 'AGRI-CHEM LABS',
    category: 'care',
    categoryName: 'Botanical Crop Care',
    price: 530,
    originalPrice: 640,
    unit: '1 Liter canister',
    rating: 4.8,
    reviewCount: 96,
    image: '/images/care-micronutrient-spray.jpg',
    inStock: true,
    stockLeft: 54,
    isFeatured: false,
    tag: '100% Chelated',
    shortDescription: 'Laboratory-formulated EDTA chelated zinc, boron, and iron restoring leaf chlorophyll and fruit-set vitality.',
    specifications: {
      'Chelation Base': 'EDTA Di-Sodium Matrix',
      'Composition': 'Zn 12%, B 5%, Fe 2.5%, Mn 1%',
      'Absorption Rate': 'Rapid 4-Hour Stomatal Uptake'
    },
    applicationInstructions: 'Apply at vegetative spurt and pre-flowering stage for maximum bud retention.'
  },
  {
    id: 10,
    name: 'Trichoderma Viride Organic Bio-Fungicide (1kg)',
    brand: 'ECO-SHIELD BIOTECH',
    category: 'care',
    categoryName: 'Botanical Crop Care',
    price: 340,
    originalPrice: 420,
    unit: '1 kg kraft pouch',
    rating: 4.9,
    reviewCount: 130,
    image: '/images/care-trichoderma-fungicide.jpg',
    inStock: true,
    stockLeft: 67,
    isFeatured: false,
    tag: 'Bio-Fungicide',
    shortDescription: 'Antagonistic fungal spores eradicating root rot, damping-off, wilt and collar rot pathogens naturally.',
    specifications: {
      'Spore Count': '2 × 10⁸ CFU / gram',
      'Carrier': 'Sterilized Talc Base',
      'Target Diseases': 'Fusarium, Rhizoctonia, Pythium'
    },
    applicationInstructions: 'Mix 10g per kg seed for seed treatment, or mix 2.5kg per acre in enriched farmyard manure.'
  },
  {
    id: 11,
    name: 'Concentrated Deep-Sea Kelp Root Booster (500ml)',
    brand: 'SOLUM HYDRAULICS',
    category: 'care',
    categoryName: 'Botanical Crop Care',
    price: 760,
    originalPrice: 900,
    unit: '500 ml ceramic bottle',
    rating: 5.0,
    reviewCount: 84,
    image: '/images/care-seaweed-booster.jpg',
    inStock: true,
    stockLeft: 31,
    isFeatured: false,
    tag: 'Root Hormone',
    shortDescription: 'Pure Norwegian Ascophyllum Nodosum kelp extract rich in natural cytokinins and auxins for root elongation.',
    specifications: {
      'Extraction Method': 'Cold Cryogenic Disruption',
      'Auxin/Cytokinin Ratio': 'Naturally Balanced 1:350',
      'Organic Matter': '≥ 45% Bio-Solids'
    },
    applicationInstructions: 'Apply 1.5 ml per liter water at nursery transplanting to eliminate seedling transplant shock.'
  },
  {
    id: 12,
    name: 'Endomycorrhizal Granular Soil Inoculant (1kg)',
    brand: 'BOTANICAL LABS',
    category: 'care',
    categoryName: 'Botanical Crop Care',
    price: 480,
    originalPrice: 580,
    unit: '1 kg granular pack',
    rating: 4.9,
    reviewCount: 112,
    image: '/images/care-mycorrhiza-granules.jpg',
    inStock: true,
    stockLeft: 58,
    isFeatured: false,
    tag: 'Microbiome',
    shortDescription: 'VAM mycorrhizal root-colonizing bio-fertilizer multiplying root surface area by up to 700% for drought resilience.',
    specifications: {
      'Infective Propagules': '100 IP / gram minimum',
      'Glomus Species': 'Glomus intraradices, G. mosseae',
      'Phosphorus Efficiency': '+40% Uptake Boost'
    },
    applicationInstructions: 'Place in direct root contact during sowing or tree sapling planting.'
  },

  // --- HAND-FORGED TOOLS & FIELD IMPLEMENTS ---
  {
    id: 13,
    name: 'Hand-Forged Japanese SK-5 Pruning Shears',
    brand: 'FORGE & SOIL',
    category: 'tools',
    categoryName: 'Crafted Hand Tools',
    price: 1250,
    originalPrice: 1480,
    unit: 'hand-crafted piece',
    rating: 5.0,
    reviewCount: 165,
    image: '/images/tools-pruning-shears.jpg',
    inStock: true,
    stockLeft: 22,
    isFeatured: true,
    tag: 'Artisan Forged',
    shortDescription: 'High-carbon Japanese SK-5 tool steel blade with hand-hammered finish, brass locking pivot and leather grips.',
    specifications: {
      'Blade Hardness': '58 - 60 HRC',
      'Blade Material': 'SK-5 High-Carbon Steel',
      'Handle': 'Leather-Wrapped Ergonomic Steel',
      'Max Cut Diameter': 'Up to 25 mm fresh branch'
    },
    applicationInstructions: 'Wipe blade dry after pruning sap-heavy plants. Lightly coat pivot with mineral oil.'
  },
  {
    id: 14,
    name: 'Manganese-Steel Heavy Curved Weeding Sickle',
    brand: 'FORGE & SOIL',
    category: 'tools',
    categoryName: 'Crafted Hand Tools',
    price: 420,
    originalPrice: 520,
    unit: 'artisan piece',
    rating: 4.8,
    reviewCount: 92,
    image: '/images/tools-weeding-sickle.jpg',
    inStock: true,
    stockLeft: 40,
    isFeatured: false,
    tag: 'Razor Sharp',
    shortDescription: 'Traditional hand-hammered black manganese-steel harvesting sickle with carved rosewood handle and serrated edge.',
    specifications: {
      'Steel Grade': '65Mn Manganese Tempered Steel',
      'Handle Wood': 'Aged Indian Rosewood',
      'Total Weight': '280 grams (Perfect Balance)'
    },
    applicationInstructions: 'Ideal for wheat, paddy, and fodder grass harvesting with zero wrist fatigue.'
  },
  {
    id: 15,
    name: 'Tempered Steel Heavy Digging Spade & Shovel',
    brand: 'TERRA FORGE',
    category: 'tools',
    categoryName: 'Crafted Hand Tools',
    price: 890,
    originalPrice: 1050,
    unit: 'complete tool',
    rating: 4.9,
    reviewCount: 74,
    image: '/images/tools-digging-shovel.jpg',
    inStock: true,
    stockLeft: 35,
    isFeatured: false,
    tag: 'Heavy Duty',
    shortDescription: 'Industrial ash-wood D-grip spade with heat-treated manganese head cutting effortlessly through tough clay and roots.',
    specifications: {
      'Blade Material': 'Forged Hardened Steel Head',
      'Shaft': 'Seasoned White Ash Wood',
      'Foot Pegs': 'Non-Slip Folded Tread'
    },
    applicationInstructions: 'Engineered for nursery bed digging, trenching irrigation ditches, and root ball extraction.'
  },
  {
    id: 16,
    name: 'Two-Stroke Motorized Backpack Knapsack Sprayer (25L)',
    brand: 'AGRO-PRO NORDIC',
    category: 'tools',
    categoryName: 'Crafted Hand Tools',
    price: 5290,
    originalPrice: 6200,
    unit: 'motorized kit',
    rating: 4.9,
    reviewCount: 118,
    image: '/images/tools-backpack-sprayer.jpg',
    inStock: true,
    stockLeft: 12,
    isFeatured: true,
    tag: 'Power Sprayer',
    shortDescription: 'High-torque 2-stroke petrol engine driving a brass dual-piston pump for fine chemical atomization up to 10 meters.',
    specifications: {
      'Engine Displacement': '26cc 2-Stroke Air-Cooled',
      'Tank Volume': '25 Liters Chemical Grade Polyethylene',
      'Discharge Pressure': '1.5 - 3.5 MPa Variable',
      'Lance Fitting': 'Solid Brass 3-Nozzle Cluster'
    },
    applicationInstructions: 'Mix 2T engine oil in petrol at 1:25 ratio. Flush tank with fresh water after fungicide use.'
  },
  {
    id: 17,
    name: 'Forged Steel Dual-Head Pickaxe & Trenching Mattock',
    brand: 'TERRA FORGE',
    category: 'tools',
    categoryName: 'Crafted Hand Tools',
    price: 740,
    originalPrice: 880,
    unit: 'complete tool',
    rating: 4.8,
    reviewCount: 63,
    image: '/images/tools-pickaxe-mattock.jpg',
    inStock: true,
    stockLeft: 28,
    isFeatured: false,
    tag: 'Soil Breaker',
    shortDescription: 'Dual-ended tool featuring a sharp pointed pick for breaking rocky earth and a broad chisel mattock for cutting roots.',
    specifications: {
      'Head Weight': '2.5 kg Solid Carbon Steel',
      'Handle': 'Fiberglass Core with Shock-Absorbing Grip',
      'Eye Fitting': 'Drop-Forged Tapered Socket'
    },
    applicationInstructions: 'Essential for orchard trenching, hardpan soil loosening, and stone removal.'
  },
  {
    id: 18,
    name: 'Stainless Steel Core Soil Testing Auger (30cm)',
    brand: 'AGRI-TECH SCIENTIFIC',
    category: 'tools',
    categoryName: 'Crafted Hand Tools',
    price: 1150,
    originalPrice: 1350,
    unit: 'scientific implement',
    rating: 5.0,
    reviewCount: 45,
    image: '/images/tools-soil-auger.jpg',
    inStock: true,
    stockLeft: 19,
    isFeatured: false,
    tag: 'Agronomy Tested',
    shortDescription: 'T-handle stainless-steel soil sampling probe extracting undisturbed 30cm core samples for laboratory fertility tests.',
    specifications: {
      'Material': 'Medical Grade 304 Stainless Steel',
      'Sampling Depth': '300 mm (12 Inches)',
      'Slot Width': 'Open Window Inspection Slot'
    },
    applicationInstructions: 'Push vertically into moist soil, rotate 90 degrees, and withdraw to extract clean soil profile.'
  },

  // --- MICRO-IRRIGATION SYSTEMS ---
  {
    id: 19,
    name: 'Brass Micro-Drip Emitter Nozzles & Tubing Kit (0.5 Acre)',
    brand: 'SOLUM HYDRAULICS',
    category: 'irrigation',
    categoryName: 'Micro-Irrigation Systems',
    price: 6800,
    originalPrice: 7950,
    unit: 'complete 0.5 acre kit',
    rating: 4.9,
    reviewCount: 56,
    image: '/images/irrigation-drip-nozzles.jpg',
    inStock: true,
    stockLeft: 15,
    isFeatured: true,
    tag: 'Water Saver',
    shortDescription: 'Solid brass adjustable micro-drip emitters and UV-resistant lateral tubing delivering pinpoint root moisture.',
    specifications: {
      'Acreage Coverage': '0.5 Acre (2000 m²)',
      'Water Savings': 'Up to 65% vs Flood Irrigation',
      'Working Pressure': '1.5 - 3.0 Bar Gravity or Pumped',
      'Included Fittings': '200 Brass Emitters, 300m LDPE Pipe'
    },
    applicationInstructions: 'Connect to garden tap or farm storage tank with minimum 1.5 bar line pressure.'
  },
  {
    id: 20,
    name: 'High-Pressure Solar DC Submersible Borewell Pump (3HP)',
    brand: 'SOLUM HYDRAULICS',
    category: 'irrigation',
    categoryName: 'Micro-Irrigation Systems',
    price: 24500,
    originalPrice: 28900,
    unit: 'complete pump set',
    rating: 5.0,
    reviewCount: 89,
    image: '/images/irrigation-solar-pump.jpg',
    inStock: true,
    stockLeft: 8,
    isFeatured: true,
    tag: 'Zero Electricity',
    shortDescription: 'Stainless-steel multi-stage deep-well solar pump with MPPT controller delivering 18,000 liters per hour at zero grid cost.',
    specifications: {
      'Motor Power': '3.0 HP Brushless DC (BLDC)',
      'Max Head': '120 Meters (400 Feet)',
      'Flow Rate': '18,000 Liters / Hour at peak sun',
      'Warranty': '5-Year Manufacturer Warranty'
    },
    applicationInstructions: 'Requires 3000W PV solar panel array (not included). Compatible with all standard borewells.'
  },
  {
    id: 21,
    name: 'Twin Hydrocyclone Sand Separator & Disc Filter Station',
    brand: 'SOLUM HYDRAULICS',
    category: 'irrigation',
    categoryName: 'Micro-Irrigation Systems',
    price: 9400,
    originalPrice: 11200,
    unit: 'filtration station',
    rating: 4.9,
    reviewCount: 42,
    image: '/images/irrigation-disc-filter.jpg',
    inStock: true,
    stockLeft: 11,
    isFeatured: false,
    tag: 'Anti-Clogging',
    shortDescription: 'Twin cast-iron hydrocyclone centrifugal sand separators with secondary 120-mesh disc filtration for river/canal water.',
    specifications: {
      'Capacity': '35 m³ / Hour Flow Rate',
      'Filtration Media': 'Centrifugal Vortex + Disc Cartridge',
      'Pressure Gauges': 'Twin Glycerine-Filled Stainless Meters'
    },
    applicationInstructions: 'Install between main pump outlet and drip distribution manifold to prevent dripper blockage.'
  },
  {
    id: 22,
    name: '360-Degree Heavy Solid-Brass Impact Field Sprinkler',
    brand: 'SOLUM HYDRAULICS',
    category: 'irrigation',
    categoryName: 'Micro-Irrigation Systems',
    price: 1150,
    originalPrice: 1380,
    unit: 'commercial unit',
    rating: 4.8,
    reviewCount: 71,
    image: '/images/irrigation-impact-sprinkler.jpg',
    inStock: true,
    stockLeft: 42,
    isFeatured: false,
    tag: 'Full 360 Arc',
    shortDescription: 'Heavy-duty solid cast-brass impact sprinkler throwing a shimmering 28-meter diameter rainfall arc over crops.',
    specifications: {
      'Throw Radius': '14 - 18 Meters (28-36m Diameter)',
      'Operating Pressure': '2.0 - 4.5 Bar',
      'Inlet Thread': '3/4 Inch BSP Male Brass Thread'
    },
    applicationInstructions: 'Mount on riser pipe. Adjustable diffuser pin allows fine droplet breakup for fragile vegetables.'
  },
  {
    id: 23,
    name: 'Reinforced Flexible PVC Lay-Flat Delivery Hose (50m)',
    brand: 'SOLUM HYDRAULICS',
    category: 'irrigation',
    categoryName: 'Micro-Irrigation Systems',
    price: 2650,
    originalPrice: 3100,
    unit: '50-meter coil',
    rating: 4.8,
    reviewCount: 65,
    image: '/images/irrigation-layflat-hose.jpg',
    inStock: true,
    stockLeft: 33,
    isFeatured: false,
    tag: 'Cross-Woven',
    shortDescription: 'Durable polyester-reinforced flexible PVC lay-flat water discharge hose with aluminum quick-connect camlock couplings.',
    specifications: {
      'Internal Diameter': '2.5 Inch (63 mm)',
      'Burst Pressure': '12 Bar (175 PSI)',
      'Reinforcement': 'High-Tenacity Synthetic Fiber Braid'
    },
    applicationInstructions: 'Rolls flat for compact storage. Drive-over capable when unpressurized.'
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

// Programmatic Financials Calculation for Mandi Escrow Contracts
export const computeTransactionFinancials = (quantity, rate, freightPerUnit = 18) => {
  const q = Number(quantity) || 0;
  const r = Number(rate) || 0;
  const produceSubtotal = Math.round(q * r);
  const mandiCess = Math.round(produceSubtotal * 0.015); // 1.5% APMC Mandi Cess
  const escrowFee = Math.round(produceSubtotal * 0.005); // 0.5% Escrow Protection Guarantee
  const freight = Math.round(q * freightPerUnit); // Transit freight
  const totalEscrow = produceSubtotal + mandiCess + escrowFee + freight;
  return {
    produceSubtotal,
    mandiCess,
    escrowFee,
    freight,
    totalEscrow
  };
};

// Standardized 6-Step Transaction Lifecycle Timeline
export const TRANSACTION_LIFECYCLE_STEPS = [
  { id: 1, label: 'Order Created', key: 'ORDER_CREATED', desc: 'Trade matched & agreement registered' },
  { id: 2, label: 'Buyer Funds Secured', key: 'ESCROW_SECURED', desc: 'Funds quarantined in Axis Escrow Simulation' },
  { id: 3, label: 'Delivery / Verification', key: 'DELIVERY_VERIFICATION', desc: 'e-NWR electronic transfer or vehicle dispatch' },
  { id: 4, label: 'Gate Weighment', key: 'GATE_WEIGHMENT', desc: 'Gross axle certified at APMC electronic scale' },
  { id: 5, label: 'Final Settlement', key: 'SETTLEMENT_PENDING', desc: 'Assay specs & moisture deductions reconciled' },
  { id: 6, label: 'Payment Released', key: 'PAYMENT_RELEASED', desc: 'T+0 RTGS bank credit released to farmer' }
];

// Distinct, Programmatically Consistent Contract Transactions
export const SAMPLE_CONTRACT_TRANSACTIONS = [
  {
    contractNumber: 'AGX-2026-74741',
    orderId: 'ORD-AGX-48291',
    escrowReference: 'ESC-AXIS-683553',
    commodity: 'Wheat',
    cropFullName: 'Wheat (Sharbati Grade-A)',
    grade: 'Sharbati Grade-A Premium',
    variety: 'C-306 Sharbati Golden',
    mandi: 'Ludhiana APMC, Punjab',
    quantity: 120,
    unit: 'Quintals',
    rate: 2450,
    deliveryMode: 'e-NWR Electronic Warehouse Receipt',
    deliveryCode: 'E_NWR',
    buyer: 'ITC Agri Business Division',
    seller: 'Harpreet Singh (Khanna FPO)',
    lotRef: 'LOT-9821',
    timestamp: '11:51:57 AM',
    date: '17 Sep 2026',
    status: 'Escrow Secured',
    currentStep: 3, // Delivery / Verification
    financials: computeTransactionFinancials(120, 2450, 18),
    disclaimer: 'Electronic transaction record generated by the AgriMart prototype. This prototype demonstrates the proposed transaction workflow and does not constitute a legally binding electronic contract.'
  },
  {
    contractNumber: 'AGX-2026-33965',
    orderId: 'ORD-AGX-39120',
    escrowReference: 'ESC-AXIS-219401',
    commodity: 'Maize',
    cropFullName: 'Maize (Hybrid Grain)',
    grade: 'Hybrid Grade-A',
    variety: 'Pioneer P3302 Yellow',
    mandi: 'Karnal APMC, Haryana',
    quantity: 80,
    unit: 'Quintals',
    rate: 2280,
    deliveryMode: 'Physical Spot / Gate Pickup',
    deliveryCode: 'PHYSICAL_SPOT',
    buyer: 'Cargill Animal Nutrition',
    seller: 'Rajeshwar Tyagi (Karnal FPO)',
    lotRef: 'LOT-9714',
    timestamp: '09:15:20 AM',
    date: '17 Sep 2026',
    status: 'Awaiting Gate Weighment',
    currentStep: 4, // Gate Weighment
    financials: computeTransactionFinancials(80, 2280, 18),
    disclaimer: 'Electronic transaction record generated by the AgriMart prototype. This prototype demonstrates the proposed transaction workflow and does not constitute a legally binding electronic contract.'
  },
  {
    contractNumber: 'AGX-2026-51823',
    orderId: 'ORD-AGX-82194',
    escrowReference: 'ESC-AXIS-554109',
    commodity: 'Rice (Paddy)',
    cropFullName: 'Basmati Paddy 1121',
    grade: 'Export Grade Sona / Basmati',
    variety: 'Pusa 1121 Traditional',
    mandi: 'Karnal APMC, Haryana',
    quantity: 50,
    unit: 'Quintals',
    rate: 3150,
    deliveryMode: 'e-NWR Electronic Warehouse Receipt',
    deliveryCode: 'E_NWR',
    buyer: 'KRBL Limited (India Gate)',
    seller: 'Gurmail Singh Sandhu',
    lotRef: 'LOT-9650',
    timestamp: '04:30:12 PM',
    date: '16 Sep 2026',
    status: 'Settlement Pending',
    currentStep: 5, // Final Settlement
    financials: computeTransactionFinancials(50, 3150, 18),
    disclaimer: 'Electronic transaction record generated by the AgriMart prototype. This prototype demonstrates the proposed transaction workflow and does not constitute a legally binding electronic contract.'
  },
  {
    contractNumber: 'AGX-2026-92410',
    orderId: 'ORD-AGX-11048',
    escrowReference: 'ESC-AXIS-882193',
    commodity: 'Mustard Seed',
    cropFullName: 'Mustard (Sarson High-Oil)',
    grade: 'Sarson Giriraj 42% Oil',
    variety: 'Giriraj High Oil Cultivar',
    mandi: 'Alwar APMC, Rajasthan',
    quantity: 90,
    unit: 'Quintals',
    rate: 5680,
    deliveryMode: 'Physical Spot / Gate Pickup',
    deliveryCode: 'PHYSICAL_SPOT',
    buyer: 'Adani Wilmar Ltd',
    seller: 'Ramavtar Sharma (Bharatpur Lot)',
    lotRef: 'LOT-9823',
    timestamp: '11:20:00 AM',
    date: '15 Sep 2026',
    status: 'Payment Released',
    currentStep: 6, // Payment Released
    financials: computeTransactionFinancials(90, 5680, 18),
    disclaimer: 'Electronic transaction record generated by the AgriMart prototype. This prototype demonstrates the proposed transaction workflow and does not constitute a legally binding electronic contract.'
  },
  {
    contractNumber: 'AGX-2026-18492',
    orderId: 'ORD-AGX-66710',
    escrowReference: 'ESC-AXIS-330198',
    commodity: 'Cotton',
    cropFullName: 'Cotton (Shankar-6 29mm)',
    grade: 'Shankar-6 29mm Long Staple',
    variety: 'Shankar-6 Certified Ginned',
    mandi: 'Rajkot APMC, Gujarat',
    quantity: 85,
    unit: 'Bales',
    rate: 7100,
    deliveryMode: 'e-NWR Electronic Warehouse Receipt',
    deliveryCode: 'E_NWR',
    buyer: 'Vardhman Textiles Procurement',
    seller: 'Bhikhabhai Patel (Gondal Lot)',
    lotRef: 'LOT-9822',
    timestamp: '02:15:45 PM',
    date: '14 Sep 2026',
    status: 'Escrow Secured',
    currentStep: 2, // Buyer Funds Secured
    financials: computeTransactionFinancials(85, 7100, 18),
    disclaimer: 'Electronic transaction record generated by the AgriMart prototype. This prototype demonstrates the proposed transaction workflow and does not constitute a legally binding electronic contract.'
  }
];

