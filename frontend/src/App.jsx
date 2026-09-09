// src/App.jsx
import React, { useState, useEffect } from 'react';
import AgriMartLandingPage from './components/AgriMartLandingPage';
import SkanviLoginPage from './components/SkanviLoginPage';
import MovingOfferBanners from './components/MovingOfferBanners';
import MandiTicker from './components/MandiTicker';
import Navbar from './components/Navbar';
import TractorRentalHub from './components/TractorRentalHub';
import AgriStockExchangeView from './components/AgriStockExchangeView';
import CategoryCarousel from './components/CategoryCarousel';
import ProductCard from './components/ProductCard';
import EditorialStory from './components/EditorialStory';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';
import AestheticTransitionLoader from './components/AestheticTransitionLoader';
import { PRODUCTS } from './data/mockData';
import { SlidersHorizontal, CheckCircle2, Truck } from 'lucide-react';

export default function App() {
  // Current View: 'landing' (Flagship Portal) | 'login' (Dedicated Skanvi Login Page) | 'app' (Post-Login Dashboard)
  const [currentView, setCurrentView] = useState('landing');

  // Master Executive Mode inside 'app': 'store' (Store & Rentals) or 'mandi' (AgriStock Terminal)
  const [activeMode, setActiveMode] = useState('store');
  const [mandiTab, setMandiTab] = useState('exchange'); // 'exchange' | 'arrivals' | 'lots' | 'bids' | 'auction'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState('');

  // Authentication State
  const [user, setUser] = useState(null);

  const [products, setProducts] = useState(PRODUCTS);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Pioneer Heritage Hybrid Maize Seeds (5kg)',
      price: 540,
      image: '/images/seeds-hybrid-maize.jpg',
      quantity: 1
    }
  ]);
  const [wishlist, setWishlist] = useState([2]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Successful Login Handler (From Skanvi Dedicated Login Page)
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsTransitioning(true);
    setTransitionMessage(`Authenticating Member Session for ${userData.name}...`);

    setTimeout(() => {
      setActiveMode('store');
      setCurrentView('app');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 650);

    triggerToast(`Welcome back, ${userData.name}!`);
  };

  // Exit from App back to Public Landing Page
  const handleExitToLanding = () => {
    setIsTransitioning(true);
    setTransitionMessage('Returning to Public Portal...');
    setTimeout(() => {
      setCurrentView('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 500);
  };

  // Mode Switch Handler inside 'app' (Store vs Mandi)
  const handleSwitchMode = (newMode) => {
    if (newMode === activeMode) return;
    setIsTransitioning(true);
    setTransitionMessage(
      newMode === 'mandi'
        ? 'Synchronizing APMC National Mandi Feeds...'
        : 'Connecting to Regional Tractor & Equipment Fleet...'
    );

    setTimeout(() => {
      setActiveMode(newMode);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 650);
  };

  // Global Toast Trigger
  const triggerToast = (message) => {
    const id = Date.now();
    setToast({ id, message });
    setTimeout(() => {
      setToast(current => (current?.id === id ? null : current));
    }, 3200);
  };

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart operations
  const handleAddToCart = (productId, quantity = 1) => {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === productId);
      if (existing) {
        return prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        quantity: quantity
      }];
    });

    triggerToast(`Added ${prod.name} to cart`);
  };

  const handleUpdateQty = (productId, newQty) => {
    setCart(prevCart => 
      prevCart.map(item => item.id === productId ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    triggerToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId) => {
    const isPresent = wishlist.includes(productId);
    if (isPresent) {
      setWishlist(wishlist.filter(id => id !== productId));
      triggerToast('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      triggerToast('Added to your farmer wishlist');
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter & Sort
  const filteredProducts = products.filter(p => {
    if (currentCategory === 'all') return true;
    return p.category === currentCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.isFeatured ? 1 : -1;
  });

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // VIEW 1: DEDICATED FULL-PAGE SKANVI LOGIN VIEW
  if (currentView === 'login') {
    return (
      <>
        {isTransitioning && (
          <AestheticTransitionLoader 
            targetMode="store" 
            message={transitionMessage} 
          />
        )}

        <SkanviLoginPage 
          onBackToPortal={() => {
            setIsTransitioning(true);
            setTransitionMessage('Returning to Portal...');
            setTimeout(() => {
              setCurrentView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => setIsTransitioning(false), 200);
            }, 400);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  // VIEW 2: FLAGSHIP PUBLIC LANDING PORTAL
  if (currentView === 'landing') {
    return (
      <>
        {isTransitioning && (
          <AestheticTransitionLoader 
            targetMode="store" 
            message={transitionMessage} 
          />
        )}

        <AgriMartLandingPage 
          onEnterPlatform={() => {
            setIsTransitioning(true);
            setTransitionMessage('Opening Secure Member Access...');
            setTimeout(() => {
              setCurrentView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => setIsTransitioning(false), 200);
            }, 400);
          }} 
        />
      </>
    );
  }

  // VIEW 3: FULL POST-LOGIN AGRIMART PLATFORM
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#121212] selection:bg-[#EBE8E2] selection:text-[#121212] font-sans">
      
      {/* Aesthetic Transition Loader Screen */}
      {isTransitioning && (
        <AestheticTransitionLoader 
          targetMode={activeMode === 'store' ? 'mandi' : 'store'} 
          message={transitionMessage} 
        />
      )}

      {/* TOP STRIP: ONLY show Mandi Stock Ticker when in Mandi mode; in Store mode show sleek executive dispatch strip */}
      {activeMode === 'mandi' ? (
        <MandiTicker onOpenMandiTerminal={() => {}} />
      ) : (
        <div className="bg-[#F5F4F0] border-b border-black/[0.05] text-[#55534E] text-xs py-2 px-4 sm:px-8 font-sans flex items-center justify-center gap-2">
          <Truck className="w-3.5 h-3.5 text-[#B45309] shrink-0" />
          <span>Free doorstep village delivery on orders over ₹499 &bull; Cash on Delivery (COD) available across rural India</span>
        </div>
      )}

      {/* Sticky Header with Executive Mode Switcher & Portal Exit */}
      <Navbar 
        user={user}
        onOpenLogin={() => setCurrentView('login')}
        activeMode={activeMode}
        onSwitchMode={handleSwitchMode}
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          if (activeMode !== 'store') setActiveMode('store');
          setCurrentCategory(cat);
          scrollToSection('catalog-section');
        }}
        mandiTab={mandiTab}
        onSelectMandiTab={(tab) => {
          if (activeMode !== 'mandi') setActiveMode('mandi');
          setMandiTab(tab);
        }}
      />

      {/* Floating Toast */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-[#121212] text-white text-xs font-semibold shadow-xl border border-white/10 animate-in slide-in-from-top-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* MAIN DYNAMIC CONTENT: RENDERED BASED ON ACTIVE MODE */}
      <main className="flex-1 pb-16">
        
        {activeMode === 'store' ? (
          /* =======================================
             MODE 1: AGRIMART STORE & RENTALS
             ======================================= */
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* MOVING AMAZON/FLIPKART-STYLE OFFER DEALS BANNER */}
            <MovingOfferBanners 
              onExploreRentals={() => scrollToSection('rentals-section')}
              onExploreCategory={(cat) => {
                setCurrentCategory(cat);
                scrollToSection('catalog-section');
              }}
            />

            {/* Heavy Machinery & Tractor Rental Fleet */}
            <TractorRentalHub />

            {/* Direct Discovery Category Carousel */}
            <CategoryCarousel 
              currentCategory={currentCategory}
              onSelectCategory={(cat) => {
                setCurrentCategory(cat);
                scrollToSection('catalog-section');
              }}
            />

            {/* Certified Agricultural Inputs Store */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10" id="catalog-section">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-black/[0.06]">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.22em] text-[#8E8E8E] uppercase font-sans mb-1">
                    Inputs Store 2026
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-[#121212]">
                    {currentCategory === 'all' 
                      ? 'Certified Agricultural Inputs' 
                      : `Selected: ${currentCategory.toUpperCase()}`}
                  </h2>
                </div>

                {/* Sort Selector */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#8E8E8E] flex items-center gap-1.5 font-heading">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Sort by:</span>
                  </span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-black/[0.1] text-[#121212] text-xs font-semibold rounded-full py-2 px-4 focus:outline-none focus:border-[#121212] transition-colors cursor-pointer font-heading">
                    <option value="featured">Featured Recommendations</option>
                    <option value="rating">Highest Lab Rating</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            </section>

            {/* Editorial Story Section */}
            <EditorialStory />
          </div>
        ) : (
          /* =======================================
             MODE 2: AGRISTOCK MANDI COMMODITY EXCHANGE
             ======================================= */
          <AgriStockExchangeView 
            activeTab={mandiTab} 
            onTabChange={setMandiTab} 
          />
        )}

      </main>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Global Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
      />

      {/* Footer */}
      <Footer 
        onSelectCategory={(cat) => {
          if (activeMode !== 'store') setActiveMode('store');
          setCurrentCategory(cat);
          scrollToSection('catalog-section');
        }} 
      />

    </div>
  );
}
