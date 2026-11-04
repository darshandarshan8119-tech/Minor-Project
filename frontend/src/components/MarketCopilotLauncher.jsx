// src/components/MarketCopilotLauncher.jsx
// Floating action button docked at bottom-right of AG Market.
// Navigates directly to the dedicated full-page Copilot view at /market-mandi/copilot.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';

export default function MarketCopilotLauncher() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/market-mandi/copilot')}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl bg-[#121212] hover:bg-[#252525] text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/10 group focus:outline-none focus:ring-2 focus:ring-[#C26747]/40"
      title="Launch AgriMart AI Copilot"
      aria-label="Open AgriMart AI Market Copilot"
    >
      {/* Pulsing Warm Amber/Orange Status Indicator */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C26747] opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C26747]" />
      </span>

      {/* Bot Icon */}
      <Bot className="w-4 h-4 text-[#D4A373] group-hover:rotate-6 transition-transform duration-200 shrink-0" />

      {/* Label */}
      <span className="text-xs font-heading font-extrabold tracking-tight text-white select-none whitespace-nowrap">
        AgriMart AI Copilot
      </span>
    </button>
  );
}

