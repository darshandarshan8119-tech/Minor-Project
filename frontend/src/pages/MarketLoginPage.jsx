// src/pages/MarketLoginPage.jsx
// Pixel-perfect AG Market & Mandi login page matching approved design reference.
import React from 'react';
import { Scale, TrendingUp, Sparkles } from 'lucide-react';
import ApplicationLoginLayout from '../components/ApplicationLoginLayout';

export default function MarketLoginPage() {
  const marketTheme = {
    canvasBg: '#F1F7FD',
    primary: '#073B61',
    primaryHover: '#052A47',
    accent: '#1587B1',
    badgeBg: '#E9F3FA',
    badgeBorder: '#C9DDF0',
    badgeText: '#073B61',
    inputBorder: '#D2E3F1',
    textDark: '#112B40',
    textMuted: '#50687E',
    hillLayer1: '#D6E7F5',
    hillLayer2: '#C7DEF0',
    sproutColor: '#5B87A8',
    waveColor: 'rgba(215, 233, 247, 0.45)',
  };

  const marketFeatures = [
    {
      icon: Scale,
      title: 'Commodity Trading',
      subtitle: 'Transparent wholesale auctions',
    },
    {
      icon: TrendingUp,
      title: 'Mandi Insights',
      subtitle: 'Live arrivals and mandi trends',
    },
    {
      icon: Sparkles,
      title: 'AI Market Copilot',
      subtitle: 'Smart trade intelligence',
    },
  ];

  return (
    <ApplicationLoginLayout
      appKey="market"
      brandName="AG Market"
      subBrandText="APMC MANDI TRADING & COPILOT • BHARAT"
      headerCropSrc="/assets/logos/header-market-crop-transparent.png"
      theme={marketTheme}
      badgeIcon={Scale}
      badgeText="APMC MARKET INTELLIGENCE"
      titlePrefix="Welcome to"
      description="Explore mandi opportunities, commodity intelligence and smarter agricultural trading."
      registerPrompt="New to AgriMart?"
      registerRoute="/market-mandi/register"
      heroImageSrc="/assets/web/ag-market-hero-clean.png"
      heroAlt="AG Market APMC Trading Engine"
      features={marketFeatures}
      destinationRoute="/market-mandi/app"
      portalRoute="/"
    />
  );
}
