// src/components/AppHeaderBrand.jsx
// Dedicated individual application brand identity.
// Renders exclusively the official individual application logo (AG Store, AG Market, or AG Crop).
// Does not duplicate or place parent brand alongside individual application brand.
import React from 'react';

export default function AppHeaderBrand({
  appKey = 'market', // 'store' | 'market' | 'crop'
  brandName,
  subBrandText,
  onClick,
}) {
  const configs = {
    store: {
      moduleIconSrc: '/assets/logos/official-ag-store-icon.png',
      defaultTitle: 'AG Store',
      defaultSubtitle: 'Inputs • Machinery • Rental',
      accentColor: '#A85C39',
    },
    market: {
      moduleIconSrc: '/assets/logos/official-ag-market-icon.png',
      defaultTitle: 'AG Market',
      defaultSubtitle: 'Mandi • Trade • Market Intelligence',
      accentColor: '#155E91',
    },
    crop: {
      moduleIconSrc: '/assets/logos/official-ag-crop-icon.png',
      defaultTitle: 'AG Crop',
      defaultSubtitle: 'Crop Health • Soil • Recommendation',
      accentColor: '#155B43',
    },
  };

  const config = configs[appKey] || configs.market;
  const title = brandName || config.defaultTitle;
  const subtitle = subBrandText || config.defaultSubtitle;

  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-2.5 sm:gap-3 select-none ${onClick ? 'cursor-pointer group' : ''}`}
    >
      <img 
        src={config.moduleIconSrc} 
        alt={`${title} Official Logo`} 
        className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0 group-hover:scale-105 transition-transform drop-shadow-2xs" 
      />
      <div className="flex flex-col">
        <span 
          className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight leading-tight"
          style={{ color: '#17191C' }}
        >
          {title}
        </span>
        <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold tracking-wider uppercase text-stone-500 leading-tight -mt-0.5 whitespace-nowrap">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
