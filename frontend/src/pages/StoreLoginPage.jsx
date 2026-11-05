// src/pages/StoreLoginPage.jsx
// Pixel-perfect AG Store & Equipment Rental login page matching Image 2 design reference.
import React from 'react';
import { Wheat, Tractor, Sprout, ShieldCheck } from 'lucide-react';
import ApplicationLoginLayout from '../components/ApplicationLoginLayout';

export default function StoreLoginPage() {
  const storeTheme = {
    canvasBg: '#FAF4ED',
    primary: '#A85C39',
    primaryHover: '#8E4828',
    accent: '#C47B54',
    badgeBg: '#FDF5ED',
    badgeBorder: '#E8D2C2',
    badgeText: '#A85C39',
    inputBorder: '#E5DDD2',
    textDark: '#1F1A16',
    textMuted: '#6E645A',
    hillLayer1: '#E8EEDB',
    hillLayer2: '#DCE4CC',
    sproutColor: '#8C9E74',
    waveColor: 'rgba(235, 222, 208, 0.45)',
  };

  const storeFeatures = [
    {
      icon: Tractor,
      title: 'Machinery Fleet',
      subtitle: 'Tractors, implements and more',
    },
    {
      icon: Sprout,
      title: 'Agricultural Inputs',
      subtitle: 'Seeds, fertilizers and crop care',
    },
    {
      icon: ShieldCheck,
      title: 'Equipment Rentals',
      subtitle: 'Flexible and reliable rental options',
    },
  ];

  return (
    <ApplicationLoginLayout
      appKey="store"
      brandName="AG Store"
      subBrandText="STORE & EQUIPMENT RENTAL • BHARAT"
      headerCropSrc="/assets/logos/header-store-crop-transparent.png"
      theme={storeTheme}
      badgeIcon={Wheat}
      badgeText="SEED & FLEET ACCESS"
      titlePrefix="Welcome to"
      description="Everything your farm needs. From trusted agricultural inputs to dependable equipment rentals."
      registerPrompt="New to AgriMart?"
      registerRoute="/store-rental/register"
      heroImageSrc="/assets/web/ag-store-hero-clean.png"
      heroAlt="AG Store Seed, Fleet & Equipment at Scale"
      features={storeFeatures}
      destinationRoute="/store-rental/app"
      portalRoute="/"
    />
  );
}
