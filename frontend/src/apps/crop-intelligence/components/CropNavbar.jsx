// src/apps/crop-intelligence/components/CropNavbar.jsx
// Dedicated navbar for AG Crop Intelligence application.
// Completely isolated from AG Store and AG Market.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, Sprout, FileText, History, ArrowLeft, User 
} from 'lucide-react';
// AGMonogram replaced by official logo PNG

export default function CropNavbar({ 
  user,
  activeTab = 'clinic',
  onSelectTab,
  onOpenLogin,
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#F4FAF5]/95 backdrop-blur-md border-b border-[#C8E6D4] transition-all">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Main Header Bar */}
        <div className="flex items-center justify-between h-18 gap-4 sm:gap-8">
          
          {/* Brand & Portal Return */}
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F4F0] hover:bg-[#EBE8E2] text-[#55534E] hover:text-[#121212] text-xs font-semibold font-heading transition-colors border border-black/[0.05] cursor-pointer"
              title="Return to AgriMart Central Portal"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Portal</span>
            </button>

            <div 
              onClick={() => onSelectTab('clinic')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <img src="/assets/logos/official-ag-crop-icon.png" alt="AG Crop Official Logo" className="h-9 w-9 sm:h-10 sm:w-10 object-contain drop-shadow-2xs group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight font-heading leading-tight" style={{color: '#155B43'}}>
                  AG Crop
                </span>
                <span className="text-[9px] tracking-wider text-[#27966F] uppercase font-mono font-bold -mt-0.5">
                  Crop Health &bull; Soil &bull; Recommendation
                </span>
              </div>
            </div>
          </div>

          {/* Radar Status Badge */}
          <div className="hidden md:flex items-center bg-[#E8F5E9] px-3.5 py-1.5 rounded-full border border-[#C8E6D4] shrink-0 gap-2">
            <span className="w-2 h-2 rounded-full bg-[#27966F] animate-pulse" />
            <span className="text-xs font-semibold text-[#155B43] font-heading">
              ICAR Pathology Calibration Active
            </span>
          </div>

          {/* User Account */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#1A1A1A] hover:bg-black/[0.04] rounded-full transition-colors font-medium cursor-pointer"
            >
              <User className="w-4 h-4 text-[#6B6A66]" />
              <span className="hidden sm:inline">
                {user ? (user.name || user.full_name || 'Farmer Account') : 'Sign In'}
              </span>
            </button>
          </div>

        </div>

        {/* Sub-Navigation Strip */}
        <div className="flex items-center justify-between border-t border-black/[0.06] py-2.5 text-xs overflow-x-auto no-scrollbar gap-6">
          <div className="flex items-center gap-6 sm:gap-7 shrink-0 font-medium">
            <button
              onClick={() => onSelectTab('clinic')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'clinic' ? 'text-[#155B43] font-bold' : 'text-[#6B6A66] hover:text-[#155B43]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-[#155B43]" />
              <span>Disease Clinic &bull; Leaf Scanner</span>
              {activeTab === 'clinic' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#155B43] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('recommendation')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'recommendation' ? 'text-[#155B43] font-bold' : 'text-[#6B6A66] hover:text-[#155B43]'
              }`}
            >
              <Sprout className="w-3.5 h-3.5 text-[#27966F]" />
              <span>Soil Chemistry &bull; Crop Matrix</span>
              {activeTab === 'recommendation' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#27966F] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('ocr')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'ocr' ? 'text-[#155B43] font-bold' : 'text-[#6B6A66] hover:text-[#155B43]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#155B43]" />
              <span>Soil Health Card OCR</span>
              {activeTab === 'ocr' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#155B43] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('history')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'history' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}
            >
              <History className="w-3.5 h-3.5 text-[#787774]" />
              <span>My Diagnostic History</span>
              {activeTab === 'history' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#121212] rounded-full" />
              )}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#787774] shrink-0">
            <span>Agronomic Advisory: Active</span>
            <span>&bull;</span>
            <span className="text-[#65A30D] font-semibold">ICAR Protocol Compliant</span>
          </div>
        </div>

      </div>
    </header>
  );
}

