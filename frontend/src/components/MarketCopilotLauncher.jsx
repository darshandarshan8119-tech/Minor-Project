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
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full shadow-lg bg-[#315F7D] hover:bg-[#244B65] text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#315F7D]/40"
      title="Launch AgriMart AI Copilot"
      aria-label="Open AgriMart AI Market Copilot"
    >
      <Bot className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

