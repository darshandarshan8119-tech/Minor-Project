// src/pages/MarketMandiApp.jsx
// Post-login Market & Mandi application shell.
// Restored to the authentic Scandinavian clean light background (bg-[#FBFBF9]).
// Displays strictly APMC Mandi commodity trading, price charts, order books, copilot, and transactions.
// Contains ZERO Store, shopping cart, or equipment rental UI.
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MandiTicker from '../components/MandiTicker';
import MarketNavbar from '../components/MarketNavbar';
import AgriStockExchangeView from '../components/AgriStockExchangeView';
import MarketFooter from '../components/MarketFooter';
import MarketCopilotLauncher from '../components/MarketCopilotLauncher';
import MarketCopilotPage from './MarketCopilotPage';
import TransactionsPage from './TransactionsPage';

export default function MarketMandiApp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Recover user session from localStorage
  const [user] = useState(() => {
    try {
      const session = localStorage.getItem('agrimart_user_session') || localStorage.getItem('agrimart_user');
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  // Redirect to login if no session
  useEffect(() => {
    const hasToken = localStorage.getItem('agrimart_access_token') || localStorage.getItem('agrimart_user_session');
    if (!hasToken) {
      navigate('/market-mandi/login');
    }
  }, [navigate]);

  // Derive active tab directly from URL path (URL is single source of truth)
  const getTabFromPath = (path) => {
    if (path.includes('/arrivals') || path.includes('/apmc')) return 'arrivals';
    if (path.includes('/lots') || path.includes('/commodities')) return 'lots';
    if (path.includes('/bids') || path.includes('/auctions')) return 'bids';
    if (path.includes('/transactions') || path.includes('/contracts')) return 'contracts';
    if (path.includes('/copilot')) return 'copilot';
    return 'exchange';
  };

  const mandiTab = getTabFromPath(location.pathname);
  const isCopilotRoute = location.pathname.includes('/copilot');
  const isTransactionsRoute = location.pathname.includes('/transactions') || location.pathname.includes('/contracts');

  const handleTabChange = (newTab) => {
    const tabRouteMap = {
      exchange: '/market-mandi/terminal',
      arrivals: '/market-mandi/apmc',
      lots: '/market-mandi/commodities',
      bids: '/market-mandi/bids',
      contracts: '/market-mandi/transactions',
      copilot: '/market-mandi/copilot',
    };
    navigate(tabRouteMap[newTab] || '/market-mandi/app');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#121212] selection:bg-blue-100 selection:text-[#121212] font-sans">
      
      {/* TOP STRIP: APMC Mandi Stock Ticker */}
      <MandiTicker onOpenMandiTerminal={() => handleTabChange('exchange')} />

      {/* Dedicated Light Market Navbar */}
      <MarketNavbar 
        user={user}
        onOpenLogin={() => navigate('/market-mandi/login')}
        mandiTab={mandiTab}
        onSelectMandiTab={handleTabChange}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 pb-16">
        {isCopilotRoute ? (
          <MarketCopilotPage 
            user={user} 
            onNavigateTab={handleTabChange} 
          />
        ) : isTransactionsRoute ? (
          <TransactionsPage 
            onReturnToAssistant={() => navigate('/market-mandi/copilot')} 
          />
        ) : (
          <AgriStockExchangeView 
            activeTab={mandiTab} 
            onTabChange={handleTabChange} 
          />
        )}
      </main>

      {/* FLOATING COPILOT LAUNCHER: Visible on all Market routes except Copilot itself */}
      {!isCopilotRoute && (
        <MarketCopilotLauncher />
      )}

      {/* Dedicated Market Footer */}
      <MarketFooter 
        onSelectMandiTab={handleTabChange} 
      />

    </div>
  );
}
