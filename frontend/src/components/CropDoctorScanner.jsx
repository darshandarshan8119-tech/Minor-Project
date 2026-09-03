// src/components/CropDoctorScanner.jsx
import React, { useState } from 'react';
import { 
  Scan, AlertTriangle, ShieldCheck, CheckCircle2, 
  Sparkles, ArrowRight, Activity, Microscope 
} from 'lucide-react';
import { CROP_DISEASES } from '../data/mockData';

export default function CropDoctorScanner({ onAddToCart }) {
  const [selectedDisease, setSelectedDisease] = useState(CROP_DISEASES[0]);
  const [isScanning, setIsScanning] = useState(false);

  const handleSelectSample = (disease) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedDisease(disease);
      setIsScanning(false);
    }, 600);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
        
        {/*  Ambient Decorative Background Glow  */}
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>

        {/*  Section Header  */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2 font-heading">
              <Microscope className="w-3.5 h-3.5" />
              <span>Smart Agritech AI Engine</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-heading text-white tracking-tight">
              AI Crop Doctor &amp; Disease Diagnosis
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1 max-w-xl leading-relaxed">
              Detect leaf blights, fungal rusts, and bollworm attacks. Select a sample below to simulate instant plant pathology and get verified chemical remedies.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 font-heading bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>98.4% Agronomist Accuracy</span>
          </div>
        </div>

        {/*  Interactive Playground Grid  */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/*  Left: Sample Selector Pills (Cols 1 to 5)  */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-heading block mb-2">
              Select Field Infection Sample:
            </span>

            {CROP_DISEASES.map((disease) => {
              const isSelected = selectedDisease.id === disease.id;
              return (
                <button
                  key={disease.id}
                  onClick={() => handleSelectSample(disease)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                    isSelected 
                      ? 'bg-emerald-950/80 border-emerald-500 shadow-glow' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}>
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold font-heading ${
                      isSelected ? 'bg-primary text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Scan className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-white">{disease.name}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{disease.symptoms}</p>
                    </div>
                  </div>
                  <div className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${disease.urgencyColor} font-heading shrink-0`}>
                    {disease.urgency}
                  </div>
                </button>
              );
            })}
          </div>

          {/*  Right: Interactive Diagnosis Display (Cols 6 to 12)  */}
          <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl p-6 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden">
            
            {isScanning ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3">
                <Scan className="w-10 h-10 text-primary-light animate-spin" />
                <span className="text-xs font-bold text-emerald-300 font-heading">Analyzing leaf cellular pattern...</span>
              </div>
            ) : (
              <div>
                {/*  Status & Confidence Bar  */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-heading">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Pathogen Identified: {selectedDisease.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-accent-light bg-accent/20 px-2 py-0.5 rounded border border-accent/40 font-bold">
                    98.2% Confidence
                  </span>
                </div>

                {/*  Symptoms Diagnosis  */}
                <div className="space-y-3 text-xs mb-6 font-sans">
                  <div>
                    <span className="text-slate-400 block font-heading uppercase text-[10px] tracking-wider mb-0.5">Observed Symptoms:</span>
                    <p className="text-slate-200 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                      {selectedDisease.symptoms}
                    </p>
                  </div>

                  <div>
                    <span className="text-emerald-400 block font-heading uppercase text-[10px] tracking-wider mb-0.5">Agronomist Prescribed Treatment:</span>
                    <p className="text-emerald-100/90 leading-relaxed bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/60 font-medium">
                      {selectedDisease.remedy}
                    </p>
                  </div>
                </div>

                {/*  Recommended Remedy Product CTA  */}
                <div className="bg-gradient-to-r from-emerald-900/60 via-slate-900 to-emerald-900/60 p-4 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider font-heading block">Prescribed Remedy:</span>
                    <span className="font-heading font-extrabold text-sm text-white">{selectedDisease.recommendedProductName}</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(selectedDisease.recommendedProductId)}
                    className="w-full sm:w-auto bg-primary hover:bg-primary-light text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-glow transition-all active:scale-95 flex items-center justify-center gap-2 font-heading shrink-0">
                    <span>Add Remedy to Cart</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
