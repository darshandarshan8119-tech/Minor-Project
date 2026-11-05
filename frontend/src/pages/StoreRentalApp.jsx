// src/pages/StoreRentalApp.jsx
// Post-login Store & Rental application shell.
// Displays strictly Store & Rental functionality (Catalog, Machinery Rentals, Cart, Wishlist).
// Contains ZERO APMC Mandi, commodity trading, or market terminal UI.
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MovingOfferBanners from '../components/MovingOfferBanners';
import StoreNavbar from '../components/StoreNavbar';
import TractorRentalHub from '../components/TractorRentalHub';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductCard from '../components/ProductCard';
import EditorialStory from '../components/EditorialStory';
import QuickViewModal from '../components/QuickViewModal';
import CartDrawer from '../components/CartDrawer';
import SearchModal from '../components/SearchModal';
import StoreFooter from '../components/StoreFooter';
import { PRODUCTS } from '../data/mockData';
import { SlidersHorizontal, CheckCircle2, Truck, ShieldCheck } from 'lucide-react';

export default function StoreRentalApp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Recover user session from localStorage
  const [user] = useState(() => {
    try {
      const session = localStorage.getItem('agrimart_user_session');
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  // Redirect to login if no session
  useEffect(() => {
    const hasToken = localStorage.getItem('agrimart_access_token') || localStorage.getItem('agrimart_user_session');
    if (!hasToken) {
      navigate('/store-rental/login');
    }
  }, [navigate]);

  const [products] = useState(PRODUCTS);
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
  const [isCartOpen, setIsCartOpen] = useState(() => location.pathname.includes('/cart'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Route-based scrolling triggers (e.g. /store-rental/rentals, /store-rental/products)
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/rentals')) {
      const timer = setTimeout(() => {
        const el = document.getElementById('rentals-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return () => clearTimeout(timer);
    } else if (path.includes('/products') || path.includes('/store')) {
      const timer = setTimeout(() => {
        const el = document.getElementById('catalog-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF4ED] text-[#121212] selection:bg-[#EADBCE] selection:text-[#121212] font-sans">
      
      {/* TOP STRIP: Store village delivery and lab purity banner */}
      <div className="bg-[#F5EDE4] border-b border-[#E8D2C2]/60 text-[#55534E] text-xs py-2 px-4 sm:px-8 font-sans flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-[#A85C39] shrink-0" />
          <span>Free doorstep village delivery on orders over ₹499 &bull; Cash on Delivery (COD) available across rural India</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#787774]">
          <span className="flex items-center gap-1 text-[#059669]">
            <ShieldCheck className="w-3 h-3" />
            <span>Certified Cultivars</span>
          </span>
          <span>&bull;</span>
          <span>ISO 9001 Batch Testing</span>
        </div>
      </div>

      {/* Dedicated Store Navbar */}
      <StoreNavbar 
        user={user}
        onOpenLogin={() => navigate('/store-rental/login')}
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          scrollToSection('catalog-section');
        }}
        onScrollToRentals={() => scrollToSection('rentals-section')}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-[#121212] text-white text-xs font-semibold shadow-xl border border-white/10 animate-in slide-in-from-top-3 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* MAIN STORE CONTENT */}
      <main className="flex-1 pb-16">
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Moving Offer Deals Banner */}
          <MovingOfferBanners 
            onExploreRentals={() => scrollToSection('rentals-section')}
            onExploreCategory={(cat) => {
              setCurrentCategory(cat);
              scrollToSection('catalog-section');
            }}
          />

          {/* Heavy Machinery & Tractor Rental Fleet */}
          <div id="rentals-section">
            <TractorRentalHub />
          </div>

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

      {/* Store Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
      />

      {/* Dedicated Store Footer */}
      <StoreFooter 
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          scrollToSection('catalog-section');
        }}
        onScrollToRentals={() => scrollToSection('rentals-section')}
      />

    </div>
  );
}
