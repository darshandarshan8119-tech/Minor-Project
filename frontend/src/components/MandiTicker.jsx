// src/components/MandiTicker.jsx
import React from 'react';
import { TrendingUp, TrendingDown, Activity, ArrowRight } from 'lucide-react';
import { LIVE_MANDI_COMMODITIES } from '../data/mockData';

export default function MandiTicker({ onOpenMandiTerminal }) {
  return (
    <div className="bg-[#17191C] text-white border-b border-[#2A2E33] overflow-hidden py-2 px-4 sm:px-8 select-none">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        
        {/* Ticker Lead Label: Amber pill matching reference */}
        <button 
          onClick={onOpenMandiTerminal}
          className="flex items-center gap-1.5 bg-[#C47A37] hover:bg-[#b06a2e] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase font-mono shrink-0 transition-colors shadow-2xs">
          <Activity className="w-3 h-3 stroke-[2.5]" />
          <span>APMC Mandi Live</span>
        </button>

        {/* Scrolling/Flex Ticker Items */}
        <div className="flex-1 min-w-0 flex items-center gap-6 text-xs font-mono overflow-hidden sm:overflow-x-auto no-scrollbar py-0.5">
          {LIVE_MANDI_COMMODITIES.slice(0, 4).map((item) => (
            <div 
              key={item.id}
              onClick={onOpenMandiTerminal}
              className="flex items-center gap-1.5 cursor-pointer shrink-0 hover:text-white/90 transition-colors">
              <span className="text-white/80 font-sans font-medium text-[11px]">{item.name.split('(')[0].trim()}:</span>
              <span className="font-bold text-white text-[11px]">₹{item.price.toLocaleString()}</span>
              
              <span className={`inline-flex items-center text-[10px] font-bold ${
                item.isUp ? 'text-[#16845B]' : 'text-[#D94D4D]'
              }`}>
                {item.isUp ? (
                  <TrendingUp className="w-3 h-3 mr-0.5 stroke-[2.5]" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-0.5 stroke-[2.5]" />
                )}
                {item.change}
              </span>
              
              <span className="text-[#92979D] text-[10px] font-sans">({item.mandi.split(',')[0]})</span>
            </div>
          ))}
        </div>

        {/* View Terminal Action */}
        <button
          onClick={onOpenMandiTerminal}
          className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-medium text-[#92979D] hover:text-white transition-colors shrink-0 font-sans">
          <span>Full Market Radar</span>
          <ArrowRight className="w-3 h-3" />
        </button>

      </div>
    </div>
  );
}
