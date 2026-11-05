// src/router/AppRouter.jsx
// Main route definitions for the AgriMart platform.
// Connects the central landing page, isolated AG Store, isolated AG Market, and AG Crop placeholder.
// Enforces strict cross-boundary route redirects between Store and Market domains.
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingWrapper from '../pages/LandingWrapper';
import StoreLoginPage from '../pages/StoreLoginPage';
import MarketLoginPage from '../pages/MarketLoginPage';
import StoreRentalApp from '../pages/StoreRentalApp';
import MarketMandiApp from '../pages/MarketMandiApp';
import CropIntelligenceApp from '../apps/crop-intelligence/CropIntelligenceApp';
import CropLoginPage from '../apps/crop-intelligence/pages/CropLoginPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* Central Landing Page */}
      <Route path="/" element={<LandingWrapper />} />

      {/* ==========================================================
          AG STORE & RENTALS MODULE (/store-rental/*)
          ========================================================== */}
      <Route path="/store-rental" element={<Navigate to="/store-rental/app" replace />} />
      <Route path="/store-rental/login" element={<StoreLoginPage />} />
      <Route path="/store-rental/register" element={<StoreLoginPage />} />
      <Route path="/store-rental/app" element={<StoreRentalApp />} />
      <Route path="/store-rental/store" element={<StoreRentalApp />} />
      <Route path="/store-rental/products" element={<StoreRentalApp />} />
      <Route path="/store-rental/cart" element={<StoreRentalApp />} />
      <Route path="/store-rental/orders" element={<StoreRentalApp />} />
      <Route path="/store-rental/rentals" element={<StoreRentalApp />} />
      <Route path="/store-rental/rental-bookings" element={<StoreRentalApp />} />

      {/* Cross-domain protection: redirect Market paths requested under /store-rental */}
      <Route path="/store-rental/terminal" element={<Navigate to="/market-mandi/terminal" replace />} />
      <Route path="/store-rental/commodities" element={<Navigate to="/market-mandi/commodities" replace />} />
      <Route path="/store-rental/apmc" element={<Navigate to="/market-mandi/apmc" replace />} />
      <Route path="/store-rental/auctions" element={<Navigate to="/market-mandi/auctions" replace />} />
      <Route path="/store-rental/bids" element={<Navigate to="/market-mandi/bids" replace />} />
      <Route path="/store-rental/transactions" element={<Navigate to="/market-mandi/transactions" replace />} />
      <Route path="/store-rental/copilot" element={<Navigate to="/market-mandi/copilot" replace />} />
      <Route path="/store-rental/mandi" element={<Navigate to="/market-mandi/app" replace />} />

      {/* ==========================================================
          AG MARKET & MANDI MODULE (/market-mandi/*)
          ========================================================== */}
      <Route path="/market-mandi" element={<Navigate to="/market-mandi/app" replace />} />
      <Route path="/market-mandi/login" element={<MarketLoginPage />} />
      <Route path="/market-mandi/register" element={<MarketLoginPage />} />
      <Route path="/market-mandi/app" element={<MarketMandiApp />} />
      <Route path="/market-mandi/terminal" element={<MarketMandiApp />} />
      <Route path="/market-mandi/commodities" element={<MarketMandiApp />} />
      <Route path="/market-mandi/apmc" element={<MarketMandiApp />} />
      <Route path="/market-mandi/auctions" element={<MarketMandiApp />} />
      <Route path="/market-mandi/bids" element={<MarketMandiApp />} />
      <Route path="/market-mandi/transactions" element={<MarketMandiApp />} />
      <Route path="/market-mandi/copilot" element={<MarketMandiApp />} />

      {/* Cross-domain protection: redirect Store paths requested under /market-mandi */}
      <Route path="/market-mandi/store" element={<Navigate to="/store-rental/store" replace />} />
      <Route path="/market-mandi/products" element={<Navigate to="/store-rental/products" replace />} />
      <Route path="/market-mandi/cart" element={<Navigate to="/store-rental/cart" replace />} />
      <Route path="/market-mandi/orders" element={<Navigate to="/store-rental/orders" replace />} />
      <Route path="/market-mandi/rentals" element={<Navigate to="/store-rental/rentals" replace />} />
      <Route path="/market-mandi/rental-bookings" element={<Navigate to="/store-rental/rental-bookings" replace />} />

      {/* ==========================================================
          AG CROP INTELLIGENCE MODULE (/crop-intelligence/*)
          ========================================================== */}
      <Route path="/crop-intelligence" element={<Navigate to="/crop-intelligence/app" replace />} />
      <Route path="/crop-intelligence/login" element={<CropLoginPage />} />
      <Route path="/crop-intelligence/register" element={<CropLoginPage />} />
      <Route path="/crop-intelligence/app" element={<CropIntelligenceApp />} />
      <Route path="/crop-intelligence/clinic" element={<CropIntelligenceApp />} />
      <Route path="/crop-intelligence/recommendation" element={<CropIntelligenceApp />} />
      <Route path="/crop-intelligence/ocr" element={<CropIntelligenceApp />} />
      <Route path="/crop-intelligence/history" element={<CropIntelligenceApp />} />

      {/* Cross-domain protection: redirect Store & Market paths requested under /crop-intelligence */}
      <Route path="/crop-intelligence/store" element={<Navigate to="/store-rental/store" replace />} />
      <Route path="/crop-intelligence/products" element={<Navigate to="/store-rental/products" replace />} />
      <Route path="/crop-intelligence/cart" element={<Navigate to="/store-rental/cart" replace />} />
      <Route path="/crop-intelligence/terminal" element={<Navigate to="/market-mandi/terminal" replace />} />
      <Route path="/crop-intelligence/commodities" element={<Navigate to="/market-mandi/commodities" replace />} />
      <Route path="/crop-intelligence/apmc" element={<Navigate to="/market-mandi/apmc" replace />} />
      <Route path="/crop-intelligence/copilot" element={<Navigate to="/market-mandi/copilot" replace />} />
      <Route path="/crop-intelligence/*" element={<CropIntelligenceApp />} />

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
