// src/pages/CropPlaceholder.jsx
// Reserved placeholder for AG Crop Intelligence — future implementation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ArrowLeft, CheckCircle2 } from 'lucide-react';
import AGMonogram from '../components/AGMonogram';

export default function CropPlaceholder() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#121212] flex flex-col font-sans selection:bg-[#EBE8E2] selection:text-[#121212]">
      
      {/* Header */}
      <header className="h-20 border-b border-black/[0.06] bg-[#FBFBF9]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <AGMonogram className="w-9 h-9 shadow-sm" variant="terracotta" />
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-[0.16em] text-[#121212] uppercase font-heading">
              AGRI<span className="text-[#C26747]">MART</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#8E8E8E] uppercase font-mono -mt-0.5">
              Crop Intelligence
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-bold font-heading text-[#5A5A5A] hover:text-[#121212] bg-[#F5F4F0] hover:bg-[#EBE8E2] px-4 py-2 rounded-full border border-black/[0.05] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Return to Portal</span>
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-xl rounded-3xl bg-white p-7 sm:p-10 shadow-lg border border-black/[0.08] space-y-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#65A30D]/10 text-[#65A30D] text-[10px] font-mono font-bold uppercase tracking-wider mx-auto">
            <Sprout className="w-3 h-3" />
            <span>AG Crop &bull; Autonomous Agronomy Suite</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#121212]">
            Crop Intelligence &amp; Disease Detection
          </h1>

          <p className="text-sm text-[#5A5A5A] font-sans leading-relaxed">
            Currently running in closed pilot across 12 State Agricultural Universities and 450 precision test plots in Punjab, Haryana, and Karnataka.
          </p>

          {/* Key Capabilities Preview */}
          <div className="space-y-3 pt-2 text-left">
            <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-black/[0.05] flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-[#121212] block">Hyperspectral Leaf Scanner</span>
                <span className="text-[11px] text-[#5A5A5A]">Real-time detection of yellow rust, blight, and fungal pathogens with 98.4% diagnostic accuracy.</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-black/[0.05] flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-[#121212] block">Soil Micro-Nutrient Balancer</span>
                <span className="text-[11px] text-[#5A5A5A]">Custom N-P-K recommendation schedules based on seasonal rainfall models and soil tests.</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-black/[0.05] flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#65A30D] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs text-[#121212] block">Sowing &amp; Harvest Yield Telemetry</span>
                <span className="text-[11px] text-[#5A5A5A]">Predictive moisture and yield forecasting connected directly to the AG Market terminal.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-[11px] font-mono text-[#8E8E8E]">
              Target Release: Q3 2026
            </span>
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 rounded-full bg-[#121212] text-white text-xs font-bold font-heading hover:bg-[#65A30D] transition-colors cursor-pointer"
            >
              Return to Platform
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

