// src/apps/crop-intelligence/pages/CropLoginPage.jsx
// Pixel-perfect AG Crop Intelligence login page matching approved design reference.
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Leaf, FileText, Sparkles } from 'lucide-react';
import ApplicationLoginLayout from '../../../components/ApplicationLoginLayout';

export default function CropLoginPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Target destination after login (query param `?redirect=...` or route state `from`)
  const destination = searchParams.get('redirect') || location.state?.from || '/crop-intelligence/app';

  const cropTheme = {
    canvasBg: '#F4FAF5',
    primary: '#155B43',
    primaryHover: '#0E402E',
    accent: '#27966F',
    badgeBg: '#E9F5EC',
    badgeBorder: '#C8E6D0',
    badgeText: '#155B43',
    inputBorder: '#CFE6D5',
    textDark: '#173B2D',
    textMuted: '#4E6B5E',
    hillLayer1: '#D2EBD7',
    hillLayer2: '#C2E2C8',
    sproutColor: '#529668',
    waveColor: 'rgba(215, 240, 222, 0.45)',
  };

  const cropFeatures = [
    {
      icon: Leaf,
      title: 'Disease Detection',
      subtitle: 'Multi-spectral AI diagnosis',
    },
    {
      icon: FileText,
      title: 'Soil Health Analysis',
      subtitle: 'Lab OCR and NPK scoring',
    },
    {
      icon: Sparkles,
      title: 'Crop Recommendation',
      subtitle: 'Zone-calibrated agronomy',
    },
  ];

  return (
    <ApplicationLoginLayout
      appKey="crop"
      brandName="AG Crop"
      subBrandText="CROP INTELLIGENCE & AGRONOMY • BHARAT"
      headerCropSrc="/assets/logos/header-crop-crop-transparent.png"
      theme={cropTheme}
      badgeIcon={Leaf}
      badgeText="CROP INTELLIGENCE"
      titlePrefix="Welcome to"
      description="Understand your soil, protect your crops and make smarter cultivation decisions."
      registerPrompt="New to AgriMart?"
      registerRoute="/crop-intelligence/register"
      heroImageSrc="/assets/web/ag-crop-hero-clean.png"
      heroAlt="AG Crop Diagnostics and Soil Intelligence"
      features={cropFeatures}
      destinationRoute={destination}
      portalRoute="/"
    />
  );
}
