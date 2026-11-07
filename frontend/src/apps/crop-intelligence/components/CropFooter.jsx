// src/apps/crop-intelligence/components/CropFooter.jsx
// Dedicated footer for AG Crop Intelligence application.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
// AGMonogram replaced by official logo PNG

export default function CropFooter({ onSelectTab }) {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#121212] text-[#8E8E8E] pt-16 pb-12 border-t border-black/[0.1] font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Mission & Brand */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/assets/logos/official-ag-crop-icon.png" alt="AG Crop" className="w-8 h-8 object-contain drop-shadow-2xs" />
              <span className="text-2xl font-black tracking-[0.16em] text-[#FBFBF9] uppercase font-heading">
                AG <span style={{color: '#27966F'}}>CROP</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9CA3AF] font-sans leading-relaxed max-w-sm">
              Autonomous agronomic diagnostics, hyperspectral leaf pathology identification, and soil chemistry matching calibrated for Indian agro-climatic zones.
            </p>
            <div className="pt-2 text-[11px] text-[#65A30D] font-semibold flex items-center gap-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#65A30D]" />
              <span>ICAR &bull; CIB-RC Certified Pathological Protocols</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors pt-2 font-mono cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to AgriMart Central Portal</span>
            </button>
          </div>

          {/* Module Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-heading">
              Agronomy Services
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button 
                  onClick={() => onSelectTab && onSelectTab('clinic')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Plant Pathology &amp; Leaf Scanner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab && onSelectTab('recommendation')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Soil Chemistry &amp; NPK Crop Matrix
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab && onSelectTab('ocr')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Soil Health Card (SHC) Parser
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab && onSelectTab('history')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Diagnostic History &amp; Reports
                </button>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase font-heading">
              AgriMart Ecosystem
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button 
                  onClick={() => navigate('/store-rental/app')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AG Store &amp; Machinery Rentals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/market-mandi/terminal')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AG Market &amp; APMC Terminal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/market-mandi/copilot')} 
                  className="hover:text-[#C26747] text-[#D4A373] transition-colors cursor-pointer"
                >
                  AI Market Copilot
                </button>
              </li>
            </ul>
          </div>

          {/* Agronomic Disclaimer */}
          <div className="lg:col-span-2 space-y-2 text-[10px] text-[#787774] font-mono leading-relaxed">
            <h4 className="text-xs font-bold text-white uppercase font-heading">Notice</h4>
            <p>
              Diagnostic assays and fertilizer recommendations follow certified ICAR guidelines. Local agro-climatic conditions and Krishi Vigyan Kendra (KVK) advisories should be consulted before applying chemical control.
            </p>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#666] font-mono gap-4">
          <span>&copy; 2026 AgriMart Platform &bull; AG Crop Submodule</span>
          <span>Calibrated against 22 Major Agricultural Commodities</span>
        </div>

      </div>
    </footer>
  );
}

