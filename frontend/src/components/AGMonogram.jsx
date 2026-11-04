// src/components/AGMonogram.jsx
import React from 'react';

export default function AGMonogram({ className = 'w-10 h-10', variant = 'terracotta' }) {
  // Color themes
  const colorMap = {
    terracotta: {
      bg: '#121212',
      primary: '#C26747',
      secondary: '#D4A373',
      accent: '#FFFFFF'
    },
    emerald: {
      bg: '#0F291E',
      primary: '#10B981',
      secondary: '#34D399',
      accent: '#FFFFFF'
    },
    amber: {
      bg: '#1C1917',
      primary: '#D97706',
      secondary: '#F59E0B',
      accent: '#FFFFFF'
    },
    white: {
      bg: 'rgba(255, 255, 255, 0.12)',
      primary: '#FFFFFF',
      secondary: '#E5E5E5',
      accent: '#FFFFFF'
    }
  };

  const colors = colorMap[variant] || colorMap.terracotta;

  return (
    <div className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`ag-grad-bg-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.bg} />
            <stop offset="100%" stopColor="#0A0A0A" />
          </linearGradient>
          <linearGradient id={`ag-grad-accent-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
          <filter id={`ag-glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={colors.primary} floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Outer Architectural Framing */}
        <rect width="100" height="100" rx="22" fill={`url(#ag-grad-bg-${variant})`} />
        <rect x="1.5" y="1.5" width="97" height="97" rx="20.5" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

        {/* Precision Grid Tick Marks (Architectural Agritech Motif) */}
        <line x1="50" y1="6" x2="50" y2="12" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="50" y1="88" x2="50" y2="94" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="6" y1="50" x2="12" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <line x1="88" y1="50" x2="94" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {/* 'A' Geometric Glyph: Left Leg, Apex, Right Leg */}
        <path 
          d="M26 74 L44 26 C44.8 23.8 47.2 23.8 48 26 L66 74" 
          stroke={`url(#ag-grad-accent-${variant})`} 
          strokeWidth="6.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          filter={`url(#ag-glow-${variant})`}
        />

        {/* 'A' Crossbar (Architectural Cantilever Beam) */}
        <line 
          x1="34" 
          y1="56" 
          x2="58" 
          y2="56" 
          stroke={colors.accent} 
          strokeWidth="5" 
          strokeLinecap="round" 
        />

        {/* 'G' Interlocking Sweeping Arc (Mandi & Harvest Circle) */}
        <path 
          d="M72 38 C68 29 59 23 48 23 C33 23 22 34 22 50 C22 66 33 77 48 77 C62 77 73 67 75 53 L58 53" 
          stroke={colors.accent} 
          strokeWidth="5.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.95"
        />

        {/* Center Seed / Sprout Pivot Dot */}
        <circle cx="48" cy="46" r="3" fill={`url(#ag-grad-accent-${variant})`} />
      </svg>
    </div>
  );
}

