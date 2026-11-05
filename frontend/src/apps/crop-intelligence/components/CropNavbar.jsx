// src/apps/crop-intelligence/components/CropNavbar.jsx
// Dedicated navbar for AG Crop Intelligence application.
// Completely isolated from AG Store and AG Market.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, Sprout, FileText, History, ArrowLeft, User 
} from 'lucide-react';
import AGMonogram from '../../../components/AGMonogram';

export default function CropNavbar({ 
  user,
  activeTab = 'clinic',
  onSelectTab,
  onOpenLogin,
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-black/[0.06] transition-all">
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
              <AGMonogram className="w-8 h-8 shadow-xs" variant="terracotta" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] font-heading leading-tight">
                  Agri<span className="text-[#C26747]">Crop</span>
                </span>
                <span className="text-[10px] tracking-widest text-[#787774] uppercase font-mono -mt-0.5">
                  Agronomy Suite &bull; Plant Pathology
                </span>
              </div>
            </div>
          </div>

          {/* Radar Status Badge */}
          <div className="hidden md:flex items-center bg-[#F2F0EB] px-3.5 py-1.5 rounded-full border border-black/[0.05] shrink-0 gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C26747] animate-pulse" />
            <span className="text-xs font-semibold text-[#1A1A1A] font-heading">
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
                activeTab === 'clinic' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-[#C26747]" />
              <span>Disease Clinic &bull; Leaf Scanner</span>
              {activeTab === 'clinic' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#C26747] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('recommendation')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'recommendation' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}
            >
              <Sprout className="w-3.5 h-3.5 text-[#65A30D]" />
              <span>Soil Chemistry &bull; Crop Matrix</span>
              {activeTab === 'recommendation' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#65A30D] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onSelectTab('ocr')}
              className={`py-1 relative flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'ocr' ? 'text-[#1A1A1A] font-bold' : 'text-[#6B6A66] hover:text-[#1A1A1A]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Soil Health Card OCR</span>
              {activeTab === 'ocr' && (
                <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#0284C7] rounded-full" />
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

