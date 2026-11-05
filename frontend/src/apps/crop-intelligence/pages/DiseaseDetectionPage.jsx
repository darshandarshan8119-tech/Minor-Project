// src/apps/crop-intelligence/pages/DiseaseDetectionPage.jsx
// Plant pathology diagnostic scanner and agronomic clinic.
// Connects to target Django backend API for leaf validation and ICAR-approved treatments.
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, Camera, Sparkles, AlertTriangle, 
  ShieldAlert, Activity, ArrowRight, RefreshCw,
  Leaf, HelpCircle, ShoppingCart, CheckCircle2, Stethoscope, X
} from 'lucide-react';
import { apiDetectDisease, apiSymptomLookup } from '../../../services/api';

export default function DiseaseDetectionPage({ onOpenCopilot }) {
  const navigate = useNavigate();

  const [customFile, setCustomFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [diagnosticResult, setDiagnosticResult] = useState(null);
  const [activeTab, setActiveTab] = useState('chemical'); // 'chemical' | 'organic' | 'store'
  const [isSymptomModalOpen, setIsSymptomModalOpen] = useState(false);

  // Symptom Questionnaire State
  const [symptomCrop, setSymptomCrop] = useState('Tomato');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['brown_spots', 'concentric_rings']);

  const fileInputRef = useRef(null);

  // Handle Custom User Image Upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomFile(file);
    setErrorMessage('');

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result);
      setDiagnosticResult(null); // Clear previous result until user clicks analyze
    };
    reader.readAsDataURL(file);
  };

  // Run the Real AI Diagnostic Scan against Django Backend
  const handleRunScan = async () => {
    if (!imagePreview && !customFile) return;
    setIsScanning(true);
    setErrorMessage('');

    try {
      const imageFile = customFile;
      if (imageFile) {
        const res = await apiDetectDisease(imageFile);
        if (res.status === 'rejected' || res.status === 'low_confidence') {
          setDiagnosticResult({
            isRejected: true,
            message: res.message || 'Unable to detect a crop leaf in the uploaded image.',
            recommendation: res.recommendation || 'Please capture a clear, well-lit photo of the affected plant foliage.',
          });
        } else if (res.status === 'model_unavailable') {
          setErrorMessage(res.message || 'The local crop vision model is unavailable.');
        } else {
          const chemical = res.treatment_plan?.chemical_control;
          const treatments = [
            chemical?.active_ingredient && chemical?.dosage
              ? `Apply ${chemical.active_ingredient} (${chemical.dosage}). ${chemical.spray_interval || ''}`.trim()
              : null,
            chemical?.withholding_period_days != null
              ? `Pre-harvest interval: ${chemical.withholding_period_days} days.`
              : null,
            ...(res.treatment_plan?.preventive_measures || []),
          ].filter(Boolean);
          setDiagnosticResult({
            crop: res.crop,
            disease: res.disease_name,
            pathogenType: res.pathogen_type,
            severity: res.severity_level,
            confidence: res.confidence == null ? null : `${(res.confidence * 100).toFixed(1)}%`,
            symptoms: res.symptoms,
            source: 'image',
            treatments,
            organicAlt: res.treatment_plan?.organic_biological_control?.remedy 
              ? `${res.treatment_plan.organic_biological_control.remedy}${res.treatment_plan.organic_biological_control.frequency ? ` (${res.treatment_plan.organic_biological_control.frequency}).` : ''}`
              : null,
            storeRecommendations: res.treatment_plan?.store_recommendations || [],
          });
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to complete disease diagnosis. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  // Run Clinical Symptom Fallback Lookup
  const handleSymptomLookup = async () => {
    setIsScanning(true);
    setErrorMessage('');
    try {
      const res = await apiSymptomLookup(symptomCrop, selectedSymptoms);
      setIsSymptomModalOpen(false);

      if (res.status === 'no_match') {
        setDiagnosticResult({
          isRejected: true,
          message: 'No definitive pathology match found for the selected symptoms.',
          recommendation: 'Try selecting additional symptom markers or consult your local KVK center.',
        });
      } else {
        setDiagnosticResult({
          crop: res.crop,
          disease: res.disease,
          pathogenType: res.pathogen,
          severity: null,
          confidence: null,
          source: 'symptoms',
          symptoms: res.clinical_symptoms,
          treatments: [
            ...(res.treatment?.chemical?.active_ingredient && res.treatment?.chemical?.dosage
              ? [`Active Control: ${res.treatment.chemical.active_ingredient} (@ ${res.treatment.chemical.dosage}).`]
              : []),
            ...(res.treatment?.chemical?.spray_interval ? [`Application Protocol: ${res.treatment.chemical.spray_interval}`] : []),
            ...(res.treatment?.cultural_practices || []),
          ],
          organicAlt: res.treatment?.organic?.remedy
            ? `${res.treatment.organic.remedy}${res.treatment.organic.frequency ? ` (${res.treatment.organic.frequency}).` : ''}`
            : null,
          storeRecommendations: res.store_recommendations || [],
        });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Symptom matching query failed.');
    } finally {
      setIsScanning(false);
    }
  };

  const toggleSymptom = (sym) => {
    setSelectedSymptoms(prev => 
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Page Header Banner */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C26747]/10 border border-[#C26747]/20 text-[#C26747] text-[11px] font-mono font-bold uppercase mb-2.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>AI Crop Pathology &bull; Leaf Health Scanner</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#121212] tracking-tight">
              Crop Disease Detection &amp; Agronomic Clinic
            </h1>
            <p className="text-sm text-[#5A5A5A] font-sans mt-1 max-w-2xl">
              Upload a crop leaf image for assessment by your configured local vision model. Results are limited to supported disease classes and existing agronomic guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setIsSymptomModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#FAF9F5] hover:bg-[#EFECE5] text-[#121212] border border-black/[0.1] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Stethoscope className="w-3.5 h-3.5 text-[#C26747]" />
              <span>Symptom Questionnaire</span>
            </button>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-sans flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main 2-Column Clinical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: UPLOAD & SPECIMEN SELECTOR (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* File Upload & Viewport Card */}
          <div className="rounded-3xl p-6 border border-black/[0.08] relative overflow-hidden bg-white shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#787774] uppercase tracking-wider">
                Specimen Image Feed
              </span>
              {customFile && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#121212] text-white">
                  Custom Upload
                </span>
              )}
            </div>

            {/* Image Preview Box with Active Scanning Effect */}
            <div className="relative aspect-4/3 rounded-2xl bg-[#F5F4F0] overflow-hidden border border-black/[0.06] group mb-4">
              {imagePreview ? (
                <>
                  <img 
                    src={imagePreview} 
                    alt="Crop Specimen Preview" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Active Scan Laser Beam Animation */}
                  {isScanning && (
                    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#C26747] to-transparent shadow-[0_0_15px_#C26747] animate-bounce" />
                      <div className="absolute inset-0 bg-[#C26747]/10 backdrop-blur-[1px]" />
                    </div>
                  )}

                  {/* Bottom Overlay Label */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
                    <span className="font-mono text-[11px] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 truncate max-w-[200px]">
                      {customFile ? customFile.name : (diagnosticResult?.crop || 'Leaf Specimen')}
                    </span>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-[11px] font-bold border border-white/20 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Retake</span>
                    </button>
                  </div>
                </>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center h-full p-8 text-center cursor-pointer hover:bg-[#EFECE5] transition-colors"
                >
                  <UploadCloud className="w-10 h-10 text-[#C26747] mb-2" />
                  <p className="font-heading font-bold text-sm text-[#121212]">Click to upload leaf image</p>
                  <p className="text-xs text-[#787774] mt-1">JPEG, PNG, WebP up to 10MB</p>
                </div>
              )}
            </div>

            {/* Hidden File Input */}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#F5F4F0] hover:bg-[#EBE8E2] text-xs font-bold text-[#121212] border border-black/[0.06] transition-all cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 text-[#C26747]" />
                <span>Upload Leaf Photo</span>
              </button>

              <button
                onClick={handleRunScan}
                disabled={isScanning || !customFile}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#121212] hover:bg-[#252525] text-xs font-extrabold text-white shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#C26747]" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#D4A373]" />
                    <span>Run Diagnostic</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: DIAGNOSTIC REPORT CARD (7 COLS) */}
        <div className="lg:col-span-7">
          {diagnosticResult?.isRejected ? (
            <div className="rounded-3xl p-8 border border-amber-300 bg-amber-50/70 text-amber-950 space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                <h3 className="font-heading font-extrabold text-lg text-amber-900">
                  Honest Quality Filter: Specimen Unrecognized
                </h3>
              </div>
              <p className="text-xs font-sans leading-relaxed text-amber-800">
                {diagnosticResult.message}
              </p>
              <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200 text-xs space-y-1">
                <strong className="block text-amber-900">Recommendation:</strong>
                <p className="text-amber-800">{diagnosticResult.recommendation}</p>
              </div>
              <button
                onClick={() => setIsSymptomModalOpen(true)}
                className="mt-2 px-4 py-2 rounded-full bg-[#121212] text-white text-xs font-bold font-heading hover:bg-[#252525] transition-colors cursor-pointer"
              >
                Use Symptom Questionnaire Instead
              </button>
            </div>
          ) : diagnosticResult ? (
            <div className="rounded-3xl p-6 sm:p-8 border border-black/[0.08] bg-white space-y-6 shadow-xs">
              
              {/* Report Header & Severity Status */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-black/[0.06]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#121212] text-white">
                      {diagnosticResult.source === 'symptoms' ? 'Symptom-based assessment' : 'Local vision model assessment'}
                    </span>
                    {diagnosticResult.severity && (
                      <span className="text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                        {diagnosticResult.severity}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-heading text-[#121212]">
                    {diagnosticResult.disease}
                  </h3>
                  <p className="text-xs font-mono text-[#787774] mt-0.5">
                    Host: <span className="font-bold text-[#121212]">{diagnosticResult.crop}</span> &bull; {diagnosticResult.pathogenType}
                  </p>
                </div>

                {/* Confidence Badge */}
                {diagnosticResult.confidence && (
                  <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between p-3 rounded-2xl bg-[#FAF9F5] border border-black/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-[#787774]">Assessment match</span>
                    <span className="text-lg sm:text-2xl font-black font-heading text-[#C26747]">
                      {diagnosticResult.confidence}
                    </span>
                  </div>
                )}
              </div>

              {diagnosticResult.source === 'image' && (
                <p className="text-xs leading-relaxed text-[#5A5A5A]">
                  This is an AI screening result, not a confirmed diagnosis. Verify the plant condition with a qualified local agronomist before treatment.
                </p>
              )}

              {/* Pathological Symptoms */}
              {diagnosticResult.symptoms && (
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/[0.05] space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#787774] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#C26747]" />
                    <span>{diagnosticResult.source === 'symptoms' ? 'Selected symptoms and assessment' : 'Model-described visible signs'}</span>
                  </span>
                  <p className="text-xs text-[#2A2A2A] font-sans leading-relaxed">
                    {diagnosticResult.symptoms}
                  </p>
                </div>
              )}

              {/* Treatment Protocol Segment (Chemical vs Organic Tabs) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-2">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveTab('chemical')}
                      className={`text-xs font-heading font-bold pb-2 -mb-2 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'chemical'
                          ? 'border-[#C26747] text-[#121212]'
                          : 'border-transparent text-[#787774] hover:text-[#121212]'
                      }`}
                    >
                      Prescribed Agronomic Treatment
                    </button>
                    <button
                      onClick={() => setActiveTab('organic')}
                      className={`text-xs font-heading font-bold pb-2 -mb-2 border-b-2 transition-all cursor-pointer ${
                        activeTab === 'organic'
                          ? 'border-emerald-600 text-[#121212]'
                          : 'border-transparent text-[#787774] hover:text-[#121212]'
                      }`}
                    >
                      Organic &amp; Biological Alternatives
                    </button>
                  </div>
                </div>

                {activeTab === 'chemical' ? (
                  <div className="space-y-2.5">
                    {diagnosticResult.treatments?.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-[#FBFBF9] border border-black/[0.05]">
                        <span className="w-5 h-5 rounded-full bg-[#121212] text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-[#121212] leading-relaxed font-sans font-medium">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : diagnosticResult.organicAlt ? (
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-emerald-950 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                      <ShieldAlert className="w-4 h-4 text-emerald-600" />
                      <span>Zero-Residue Bio-Fungicide &amp; Botanical Defense</span>
                    </div>
                    <p className="text-xs leading-relaxed font-sans text-emerald-900">
                      {diagnosticResult.organicAlt}
                    </p>
                  </div>
                ) : <p className="text-xs text-[#5A5A5A]">No organic alternative was provided for this assessment.</p>}
              </div>

              {/* AG Store Cross-Domain Product Linkage */}
              {diagnosticResult.storeRecommendations && diagnosticResult.storeRecommendations.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-heading text-[#121212] flex items-center gap-1.5">
                      <ShoppingCart className="w-4 h-4 text-[#C26747]" />
                      <span>Available on AG Store &bull; Fast Delivery</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#787774] uppercase">Verified Inventory</span>
                  </div>
                  {diagnosticResult.storeRecommendations.map((prod, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-black/[0.05]">
                      <div>
                        <h5 className="font-bold text-xs text-[#121212]">{prod.display_name}</h5>
                        <span className="text-[10px] font-mono text-[#787774]">{prod.category}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/store-rental/products?q=${encodeURIComponent(prod.search_term || prod.display_name)}`)}
                        className="px-3 py-1.5 rounded-full bg-[#121212] hover:bg-[#252525] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>View in Store</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Action Strip */}
              <div className="pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-[#787774] text-center sm:text-left">
                  Need personalized advice on spray timing or market price impact?
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
                    onClick={() => navigate('/market-mandi/terminal')}
                    className="px-4 py-2 rounded-full bg-[#121212] text-white hover:bg-[#252525] text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Mandi Terminal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="rounded-3xl p-12 text-center border border-black/[0.06] bg-white space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] text-[#787774] flex items-center justify-center mx-auto border border-black/[0.06]">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-lg text-[#121212]">Ready for Leaf Analysis</h3>
              <p className="text-xs text-[#5A5A5A] max-w-sm mx-auto">
                Upload a crop image to request an assessment from your configured local vision model, or use the symptom questionnaire for a separate symptom-based assessment.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Symptom Questionnaire Modal */}
      {isSymptomModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-black/[0.1] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#C26747]" />
                <h3 className="font-heading font-extrabold text-base text-[#121212]">
                  Clinical Symptom Questionnaire
                </h3>
              </div>
              <button 
                onClick={() => setIsSymptomModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-black/[0.05] text-[#787774] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold font-mono uppercase text-[#787774] block mb-1">
                  Select Host Crop:
                </label>
                <select
                  value={symptomCrop}
                  onChange={(e) => setSymptomCrop(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[#F5F4F0] border border-black/[0.06] text-xs font-bold text-[#121212]"
                >
                  <option value="Tomato">Tomato</option>
                  <option value="Rice">Rice (Paddy)</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Potato">Potato</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold font-mono uppercase text-[#787774] block mb-2">
                  Observed Foliar Symptoms:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'brown_spots', label: 'Brown Spots / Lesions' },
                    { id: 'concentric_rings', label: 'Concentric Target Rings' },
                    { id: 'yellowing_lower_leaves', label: 'Yellowing Lower Leaves' },
                    { id: 'oval_lesions', label: 'Oval Lesions with Grey Centers' },
                    { id: 'yellow_pustules', label: 'Yellow Pustules on Veins' },
                    { id: 'leaf_curling', label: 'Upward Leaf Curling' },
                    { id: 'water_soaked_spots', label: 'Water-soaked Pale Spots' },
                    { id: 'white_cottony_mildew', label: 'White Cottony Underside' },
                  ].map(sym => (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() => toggleSymptom(sym.id)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                        selectedSymptoms.includes(sym.id)
                          ? 'bg-[#121212] text-white border-[#121212]'
                          : 'bg-[#FBFBF9] hover:bg-[#F2F0EB] text-[#121212] border-black/[0.06]'
                      }`}
                    >
                      {sym.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsSymptomModalOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-bold text-[#787774] hover:bg-black/[0.04] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSymptomLookup}
                className="px-5 py-2.5 rounded-full bg-[#121212] hover:bg-[#252525] text-white text-xs font-bold font-heading shadow-sm cursor-pointer"
              >
                Match Clinical Symptoms
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

