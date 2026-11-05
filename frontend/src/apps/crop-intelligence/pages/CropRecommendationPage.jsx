// src/apps/crop-intelligence/pages/CropRecommendationPage.jsx
// AI Soil Chemistry & Agronomic Crop Recommendation Matrix
// Powered by verified ICAR agronomic rules and deterministic soil assessment.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, Droplets, Thermometer, Wind, Sparkles, ArrowRight, 
  Layers, CheckCircle2, TrendingUp, Compass, Calendar, Award,
  ChevronRight, RefreshCw, BarChart2, AlertCircle, ShieldCheck,
  ExternalLink, Info, CheckCircle
} from 'lucide-react';
import { apiCropRecommend } from '../../../services/api';

const SOIL_PRESETS = {
  alluvial: {
    id: 'alluvial',
    name: 'Alluvial Loam (Indo-Gangetic Basin)',
    subtitle: 'Rice / Wheat / Maize',
    description: 'High moisture retention, balanced micronutrients, optimal for heavy grain panicles and rabi cycles.',
    values: { N: 130, P: 45, K: 160, ph: 6.8, rainfall: 185, temp: 26, humidity: 80 }
  },
  black: {
    id: 'black',
    name: 'Black Regur Soil (Deccan Plateau)',
    subtitle: 'Cotton / Soybean / Gram',
    description: 'Deep clayey texture rich in calcium, magnesium and potash; high swelling capacity for fiber and oilseeds.',
    values: { N: 110, P: 55, K: 190, ph: 7.6, rainfall: 90, temp: 31, humidity: 55 }
  },
  red: {
    id: 'red',
    name: 'Red Laterite Loam (Peninsular India)',
    subtitle: 'Maize / Pulses / Groundnut',
    description: 'Porous, well-drained soil structure; responds quickly to balanced fertilization and legume rotation.',
    values: { N: 85, P: 32, K: 130, ph: 6.2, rainfall: 115, temp: 28, humidity: 65 }
  },
  arid: {
    id: 'arid',
    name: 'Sandy Arid Loam (Semi-Arid Zone)',
    subtitle: 'Moth Bean / Mustard / Bajra',
    description: 'Fast draining light structure; requires drought-hardy taproots and high potassium tolerance.',
    values: { N: 60, P: 25, K: 110, ph: 7.9, rainfall: 45, temp: 33, humidity: 40 }
  }
};

const CROP_ICONS = {
  rice: '🌾',
  cotton: '☁️',
  maize: '🌽',
  chickpea: '🌱',
  mungbean: '🌿',
  jute: '🌾',
  pigeonpeas: '🌱',
  lentil: '🥣',
  mothbeans: '🌿',
  blackgram: '🌱',
  banana: '🍌',
  kidneybeans: '🫘'
};

export default function CropRecommendationPage({ 
  initialValues = null, 
  fromReportId = null,
  onNavigateToMarket = null,
  onOpenCopilot = null
}) {
  const navigate = useNavigate();

  const [activePreset, setActivePreset] = useState('alluvial');
  const [inputs, setInputs] = useState(() => {
    if (initialValues) {
      return {
        N: initialValues.N ?? initialValues.nitrogen ?? 130,
        P: initialValues.P ?? initialValues.phosphorus ?? 45,
        K: initialValues.K ?? initialValues.potassium ?? 160,
        ph: initialValues.ph ?? 6.8,
        rainfall: initialValues.rainfall ?? 185,
        temp: initialValues.temp ?? initialValues.temperature ?? 26,
        humidity: initialValues.humidity ?? 80
      };
    }
    return SOIL_PRESETS.alluvial.values;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [reportReference, setReportReference] = useState(fromReportId);

  // Field change handler
  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: Number(value) }));
    setActivePreset(null); // Farmer entered custom values
  };

  // Preset selector
  const handleSelectPreset = (key) => {
    const preset = SOIL_PRESETS[key];
    if (!preset) return;
    setActivePreset(key);
    setInputs(preset.values);
  };

  // Run calculation via target backend API
  const runRecommendation = async (paramsToUse = inputs) => {
    setIsLoading(true);
    setApiError(null);

    const payload = {
      nitrogen: Number(paramsToUse.N),
      phosphorus: Number(paramsToUse.P),
      potassium: Number(paramsToUse.K),
      ph: Number(paramsToUse.ph),
      rainfall: Number(paramsToUse.rainfall),
      temperature: Number(paramsToUse.temp),
      humidity: Number(paramsToUse.humidity),
      from_soil_report_id: reportReference || undefined
    };

    try {
      const response = await apiCropRecommend(payload);
      setRecommendationResult(response);
    } catch (err) {
      console.error('Crop Recommendation API Error:', err);
      setApiError(err.message || 'Unable to compute agronomic recommendation. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Compute recommendation on initial mount or when preset is clicked
  useEffect(() => {
    runRecommendation(inputs);
  }, [activePreset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    runRecommendation(inputs);
  };

  const soilAssessment = recommendationResult?.soil_assessment || {};
  const agronomicAdvisory = recommendationResult?.agronomic_advisory || {};
  const marketLinkage = recommendationResult?.market_linkage || {};
  const primaryCropKey = recommendationResult?.primary_crop || 'rice';
  const cropEmoji = CROP_ICONS[primaryCropKey] || '🌱';

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#283618]/10 border border-[#283618]/20 text-[#283618] text-[11px] font-mono font-bold uppercase mb-2.5">
              <Sprout className="w-3.5 h-3.5" />
              <span>Agronomic Intelligence &bull; Soil &amp; Climate Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#121212] tracking-tight">
              Soil Chemistry &amp; Crop Recommendation
            </h1>
            <p className="text-sm text-[#5A5A5A] font-sans mt-1 max-w-2xl">
              Deterministic agronomic matching evaluating laboratory soil macronutrients (N-P-K), pH, and regional climatic precipitation vectors to determine the highest yielding and most commercially viable cash crops.
            </p>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {Object.keys(SOIL_PRESETS).map(key => (
              <button
                key={key}
                onClick={() => handleSelectPreset(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all border cursor-pointer ${
                  activePreset === key
                    ? 'bg-[#121212] text-white border-[#121212]'
                    : 'bg-[#F5F4F0] text-[#121212] border-black/[0.06] hover:bg-[#EBE8E2]'
                }`}
              >
                {SOIL_PRESETS[key].name.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: SOIL & CLIMATE INPUT PARAMETERS (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl p-6 border border-black/[0.08] bg-white space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <span className="text-xs font-mono font-bold text-[#787774] uppercase tracking-wider">
                Laboratory Soil &amp; Climate Assay
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Deterministic ICAR Engine
              </span>
            </div>

            {/* Quick Presets Strip */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold text-[#787774] uppercase">
                Agro-Climatic Soil Profiles:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(SOIL_PRESETS).map((key) => {
                  const p = SOIL_PRESETS[key];
                  const isSelected = activePreset === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectPreset(key)}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#121212] text-white border-[#121212] shadow-xs'
                          : 'bg-[#FBFBF9] hover:bg-[#F2F0EB] text-[#121212] border-black/[0.06]'
                      }`}
                    >
                      <p className="text-xs font-bold truncate leading-tight">{p.name.split('(')[0]}</p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-white/70' : 'text-[#787774]'}`}>
                        {p.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              
              {/* NPK Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-2xl bg-[#FBFBF9] border border-black/[0.06]">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774] block mb-1">
                    Nitrogen (N)
                  </label>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number"
                      value={inputs.N}
                      onChange={(e) => handleInputChange('N', e.target.value)}
                      className="w-full text-base font-extrabold font-heading text-[#121212] bg-transparent focus:outline-none"
                    />
                    <span className="text-[10px] font-mono text-[#8E8E8E]">mg/kg</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FBFBF9] border border-black/[0.06]">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774] block mb-1">
                    Phosphorus (P)
                  </label>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number"
                      value={inputs.P}
                      onChange={(e) => handleInputChange('P', e.target.value)}
                      className="w-full text-base font-extrabold font-heading text-[#121212] bg-transparent focus:outline-none"
                    />
                    <span className="text-[10px] font-mono text-[#8E8E8E]">mg/kg</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FBFBF9] border border-black/[0.06]">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774] block mb-1">
                    Potassium (K)
                  </label>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number"
                      value={inputs.K}
                      onChange={(e) => handleInputChange('K', e.target.value)}
                      className="w-full text-base font-extrabold font-heading text-[#121212] bg-transparent focus:outline-none"
                    />
                    <span className="text-[10px] font-mono text-[#8E8E8E]">mg/kg</span>
                  </div>
                </div>
              </div>

              {/* pH & Rainfall */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-[#FBFBF9] border border-black/[0.06]">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774] block mb-1">
                    Soil pH Level
                  </label>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number"
                      step="0.1"
                      value={inputs.ph}
                      onChange={(e) => handleInputChange('ph', e.target.value)}
                      className="w-full text-base font-extrabold font-heading text-[#121212] bg-transparent focus:outline-none"
                    />
                    <span className="text-[10px] font-mono text-[#8E8E8E]">
                      {inputs.ph > 7.5 ? 'Alkaline' : inputs.ph < 6.0 ? 'Acidic' : 'Optimal'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FBFBF9] border border-black/[0.06]">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774] block mb-1 flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-sky-600" />
                    <span>Annual Rainfall</span>
                  </label>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number"
                      value={inputs.rainfall}
                      onChange={(e) => handleInputChange('rainfall', e.target.value)}
                      className="w-full text-base font-extrabold font-heading text-[#121212] bg-transparent focus:outline-none"
                    />
                    <span className="text-[10px] font-mono text-[#8E8E8E]">mm</span>
                  </div>
                </div>
              </div>

              {/* Temperature & Humidity */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-[#FBFBF9] border border-black/[0.06]">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774] block mb-1 flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-[#C26747]" />
                    <span>Temperature</span>
                  </label>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number"
                      step="0.5"
                      value={inputs.temp}
                      onChange={(e) => handleInputChange('temp', e.target.value)}
                      className="w-full text-base font-extrabold font-heading text-[#121212] bg-transparent focus:outline-none"
                    />
                    <span className="text-[10px] font-mono text-[#8E8E8E]">°C</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#FBFBF9] border border-black/[0.06]">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774] block mb-1 flex items-center gap-1">
                    <Wind className="w-3 h-3 text-emerald-600" />
                    <span>Relative Humidity</span>
                  </label>
                  <div className="flex items-center gap-1">
                    <input 
                      type="number"
                      value={inputs.humidity}
                      onChange={(e) => handleInputChange('humidity', e.target.value)}
                      className="w-full text-base font-extrabold font-heading text-[#121212] bg-transparent focus:outline-none"
                    />
                    <span className="text-[10px] font-mono text-[#8E8E8E]">%</span>
                  </div>
                </div>
              </div>

              {/* Compute Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#121212] hover:bg-[#252525] text-white text-xs font-extrabold font-heading shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#C26747]" />
                    <span>Evaluating Agronomic Matrix...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D4A373]" />
                    <span>Compute Agronomic Recommendations</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Soil Chemistry Score Card */}
          {recommendationResult && (
            <div className="rounded-3xl p-5 border border-black/[0.08] bg-[#FBFBF9] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#787774] uppercase">
                  Soil Chemistry Assessment
                </span>
                <span className="text-xs font-mono font-bold text-[#121212] bg-white px-2.5 py-1 rounded-full border border-black/[0.06]">
                  SHI: {soilAssessment.soil_health_index ?? 75}/100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-black/[0.05]">
                  <span className="text-[10px] font-mono text-[#787774] block">Nitrogen Status</span>
                  <span className="font-bold text-[#121212]">{soilAssessment.nitrogen_status || 'Adequate'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-black/[0.05]">
                  <span className="text-[10px] font-mono text-[#787774] block">Phosphorus Status</span>
                  <span className="font-bold text-[#121212]">{soilAssessment.phosphorus_status || 'Balanced'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-black/[0.05]">
                  <span className="text-[10px] font-mono text-[#787774] block">Potassium Status</span>
                  <span className="font-bold text-[#121212]">{soilAssessment.potassium_status || 'Optimal'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-black/[0.05]">
                  <span className="text-[10px] font-mono text-[#787774] block">Soil Reaction</span>
                  <span className="font-bold text-[#121212]">{soilAssessment.ph_status || 'Neutral'}</span>
                </div>
              </div>

              {/* Fertilizer Suggestions */}
              {agronomicAdvisory.suggested_fertilizer_adjustment && agronomicAdvisory.suggested_fertilizer_adjustment.length > 0 && (
                <div className="pt-2 border-t border-black/[0.06]">
                  <span className="text-[10px] font-mono font-bold text-[#787774] uppercase block mb-1.5">
                    Suggested Nutrient Balancing:
                  </span>
                  <ul className="space-y-1 text-xs text-[#55534E]">
                    {agronomicAdvisory.suggested_fertilizer_adjustment.map((adj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#C26747] font-bold">&bull;</span>
                        <span>{adj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Engine Disclaimer */}
          <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-black/[0.05] text-[11px] text-[#787774] leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#C26747] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#121212]">Engine Transparency Notice:</strong> Recommendations are derived from deterministic agronomic models calibrated against ICAR soil-fertility standards.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RECOMMENDED CROP SHOWCASE (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {apiError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}

          {recommendationResult && (
            <>
              {/* #1 PRIME RECOMMENDATION HERO CARD */}
              <div className="rounded-3xl p-6 sm:p-8 border-2 border-[#C26747]/30 bg-gradient-to-br from-white via-white to-[#FAF6F0] relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 bg-[#C26747] text-white text-[10px] font-mono font-black uppercase px-4 py-1 rounded-bl-2xl">
                  #1 Prime Agro-Match
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#C26747]/10 border border-[#C26747]/20 flex items-center justify-center text-3xl shrink-0 shadow-xs">
                    {cropEmoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[#C26747]">
                        Agronomic Prime Recommendation
                      </span>
                      <span>&bull;</span>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {Math.round((recommendationResult.confidence || 0.95) * 100)}% Compatibility
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-[#121212]">
                      {recommendationResult.display_name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed mb-6 font-sans">
                  Optimal agro-climatic match based on precipitation ({inputs.rainfall}mm) and available nitrogen reserves ({inputs.N} mg/kg).
                </p>

                {/* Metrics 3-Col Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FBFBF9] border border-black/[0.06] mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#787774] block">Sowing Window</span>
                    <strong className="text-xs sm:text-sm font-black font-heading text-[#121212]">
                      {agronomicAdvisory.ideal_sowing_window || 'June - July (Kharif)'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#787774] block">Water Requirement</span>
                    <strong className="text-xs sm:text-sm font-black font-heading text-[#121212]">
                      {agronomicAdvisory.water_requirement || 'Optimal Controlled Irrigation'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#787774] block">Indicative Mandi Modal</span>
                    <strong className="text-xs sm:text-sm font-black font-heading text-[#C26747]">
                      {marketLinkage.indicative_mandi_modal_price || '₹4,420/Qtl'}
                    </strong>
                  </div>
                </div>

                {/* Agronomic Fertilizer Plan */}
                {agronomicAdvisory.fertilizer_plan && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-6 flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-950 font-sans">
                      <strong>Agronomic Protocol:</strong> {agronomicAdvisory.fertilizer_plan}
                    </p>
                  </div>
                )}

                {/* Card Action Buttons linking to AG Market */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-black/[0.06]">
                  <span className="text-[11px] font-mono text-[#787774]">
                    Cross-Application Mandi Connection:
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate('/market-mandi/copilot')}
                      className="px-4 py-2 rounded-full bg-[#FAF9F5] hover:bg-[#EFECE5] text-[#121212] text-xs font-bold border border-black/[0.08] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C26747]" />
                      <span>Ask Market Copilot</span>
                    </button>

                    <button
                      onClick={() => {
                        const q = marketLinkage.terminal_query || primaryCropKey;
                        navigate(`/market-mandi/terminal?q=${encodeURIComponent(q)}`);
                      }}
                      className="px-4 py-2 rounded-full bg-[#121212] text-white hover:bg-[#252525] text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>Check Mandi Depth</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* SECONDARY ALTERNATIVES GRID */}
              {recommendationResult.alternatives && recommendationResult.alternatives.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#787774] tracking-wider">
                    Secondary Crop Alternatives
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recommendationResult.alternatives.slice(0, 2).map((alt, idx) => (
                      <div key={idx} className="rounded-3xl p-5 border border-black/[0.07] bg-white space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase text-[#787774]">
                            #{idx + 2} Alternative
                          </span>
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            {Math.round((alt.confidence || 0.85) * 100)}%
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{CROP_ICONS[alt.crop] || '🌱'}</span>
                          <div>
                            <h4 className="text-sm font-bold font-heading text-[#121212]">
                              {alt.display_name || alt.crop}
                            </h4>
                            <p className="text-[11px] text-[#787774] font-mono capitalize">{alt.crop} agronomic tier</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-black/[0.05] flex items-center justify-between text-xs">
                          <span className="font-mono text-[11px] text-[#787774]">Market Query:</span>
                          <button
                            onClick={() => navigate(`/market-mandi/terminal?q=${encodeURIComponent(alt.crop)}`)}
                            className="font-bold text-[#C26747] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Inspect Mandi</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
}

