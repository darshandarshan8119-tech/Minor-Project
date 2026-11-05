// src/components/AGMonogram.jsx
// Premium AG Monogram supporting 4 distinct design concepts and module-specific color variants.
import React from 'react';

export default function AGMonogram({ 
  className = 'w-10 h-10', 
  variant = 'terracotta',
  concept = 'architectural' // 'architectural' | 'furrow_leaf' | 'hex_cell' | 'golden_sprout'
}) {
  // Color themes calibrated to AgriMart, AG Store, AG Market, and AG Crop
  const colorMap = {
    terracotta: {
      bg: '#18120F',
      primary: '#A85C39',
      secondary: '#C47B54',
      accent: '#FFFFFF',
      ring: 'rgba(196, 123, 84, 0.25)'
    },
    blue: {
      bg: '#0A1826',
      primary: '#073B61',
      secondary: '#1587B1',
      accent: '#FFFFFF',
      ring: 'rgba(21, 135, 177, 0.25)'
    },
    emerald: {
      bg: '#0A1F16',
      primary: '#155B43',
      secondary: '#27966F',
      accent: '#FFFFFF',
      ring: 'rgba(39, 150, 111, 0.25)'
    },
    amber: {
      bg: '#1C1917',
      primary: '#D97706',
      secondary: '#F59E0B',
      accent: '#FFFFFF',
      ring: 'rgba(245, 158, 11, 0.25)'
    },
    white: {
      bg: 'rgba(255, 255, 255, 0.12)',
      primary: '#FFFFFF',
      secondary: '#E5E5E5',
      accent: '#FFFFFF',
      ring: 'rgba(255, 255, 255, 0.2)'
    }
  };

  const colors = colorMap[variant] || colorMap.terracotta;
  const gradId = `ag-grad-${variant}-${concept}`;

  return (
    <div className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`${gradId}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.bg} />
            <stop offset="100%" stopColor="#080808" />
          </linearGradient>
          <linearGradient id={`${gradId}-accent`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} />
          </linearGradient>
          <linearGradient id={`${gradId}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBD38D" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id={`${gradId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={colors.secondary} floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Architectural Framing */}
        <rect width="100" height="100" rx="22" fill={`url(#${gradId}-bg)`} />
        <rect x="1.5" y="1.5" width="97" height="97" rx="20.5" stroke={colors.ring} strokeWidth="1.5" />

        {/* ---------------- CONCEPT 1: ARCHITECTURAL MONOLINE ---------------- */}
        {concept === 'architectural' && (
          <g>
            {/* Precision Grid Tick Marks */}
            <line x1="50" y1="6" x2="50" y2="12" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="50" y1="88" x2="50" y2="94" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="6" y1="50" x2="12" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <line x1="88" y1="50" x2="94" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

            {/* 'A' Geometric Glyph */}
            <path 
              d="M26 74 L44 26 C44.8 23.8 47.2 23.8 48 26 L66 74" 
              stroke={`url(#${gradId}-accent)`} 
              strokeWidth="6.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              filter={`url(#${gradId}-glow)`}
            />

            {/* 'A' Cantilever Crossbar */}
            <line 
              x1="34" 
              y1="56" 
              x2="58" 
              y2="56" 
              stroke={colors.accent} 
              strokeWidth="5" 
              strokeLinecap="round" 
            />

            {/* 'G' Interlocking Sweeping Arc */}
            <path 
              d="M72 38 C68 29 59 23 48 23 C33 23 22 34 22 50 C22 66 33 77 48 77 C62 77 73 67 75 53 L58 53" 
              stroke={colors.accent} 
              strokeWidth="5.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              opacity="0.95"
            />

            {/* Center Seed Pivot Dot */}
            <circle cx="48" cy="46" r="3.2" fill={`url(#${gradId}-gold)`} />
          </g>
        )}

        {/* ---------------- CONCEPT 2: FURROW & LEAF INTERLOCK ---------------- */}
        {concept === 'furrow_leaf' && (
          <g>
            {/* Furrow contour arcs (Left leg of A) */}
            <path 
              d="M24 74 Q32 50 44 25" 
              stroke={`url(#${gradId}-accent)`} 
              strokeWidth="6" 
              strokeLinecap="round"
            />
            {/* Leaf sculpted blade (Right leg of A) */}
            <path 
              d="M44 25 C52 35 68 52 66 74 C58 70 52 62 48 48" 
              fill={`url(#${gradId}-accent)`} 
              opacity="0.85"
            />
            {/* Leaf central spine */}
            <path 
              d="M44 25 Q54 50 66 74" 
              stroke="#FFFFFF" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
            {/* Solar harvest G arc */}
            <path 
              d="M72 36 C66 25 54 22 46 22 C30 22 20 34 20 50 C20 66 32 78 48 78 C64 78 76 66 76 52 L56 52" 
              stroke={colors.accent} 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
            />
            {/* Dewdrop golden sprout nucleus */}
            <circle cx="56" cy="52" r="3.5" fill={`url(#${gradId}-gold)`} />
          </g>
        )}

        {/* ---------------- CONCEPT 3: HEX-BIO CELL (HIGH-TECH AGRONOMY) ---------------- */}
        {concept === 'hex_cell' && (
          <g>
            {/* Isometric inner hex badge */}
            <polygon 
              points="50,16 78,32 78,68 50,84 22,68 22,32" 
              stroke="rgba(255,255,255,0.18)" 
              strokeWidth="1.5" 
              fill="none" 
            />
            {/* Angular High-Tech 'A' Frame */}
            <path 
              d="M32 68 L50 28 L68 68" 
              stroke={`url(#${gradId}-accent)`} 
              strokeWidth="6" 
              strokeLinecap="square" 
              strokeLinejoin="miter" 
              filter={`url(#${gradId}-glow)`}
            />
            {/* Cross tie */}
            <line x1="38" y1="52" x2="62" y2="52" stroke="#FFFFFF" strokeWidth="4" />
            {/* Cyber 'G' wrapper */}
            <path 
              d="M74 44 L74 34 L50 20 L26 34 L26 66 L50 80 L74 66 L74 52 L52 52" 
              stroke={colors.accent} 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
              opacity="0.9"
            />
            <circle cx="50" cy="40" r="3" fill={`url(#${gradId}-gold)`} />
          </g>
        )}

        {/* ---------------- CONCEPT 4: GOLDEN RATIO SPROUT MONOGRAM ---------------- */}
        {concept === 'golden_sprout' && (
          <g>
            {/* Ultra-clean Luxury Bauhaus A */}
            <path 
              d="M28 72 L47 24 C48.5 20.5 51.5 20.5 53 24 L72 72" 
              stroke={`url(#${gradId}-accent)`} 
              strokeWidth="5" 
              strokeLinecap="round" 
            />
            {/* Minimalist horizon bar */}
            <line x1="36" y1="56" x2="64" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="2 3" />
            
            {/* Sprouting 'G' Golden Spiral */}
            <path 
              d="M74 40 C70 28 58 22 47 23 C31 24 22 36 22 50 C22 65 33 76 48 76 C63 76 75 66 75 50 L50 50" 
              stroke="#FFFFFF" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            {/* Fresh sprout bud on the cross point */}
            <path 
              d="M50 50 C50 42 56 36 62 36 C62 44 56 50 50 50 Z" 
              fill={`url(#${gradId}-gold)`} 
            />
          </g>
        )}
      </svg>
    </div>
  );
}
