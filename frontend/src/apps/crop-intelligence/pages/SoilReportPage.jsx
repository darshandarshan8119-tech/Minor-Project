// src/apps/crop-intelligence/pages/SoilReportPage.jsx
// Soil Health Card (SHC) OCR & Parameter Extraction Page
// Allows farmers to upload lab soil reports (PDF/JPG/PNG), review extracted nutrients,
// correct any OCR readings, confirm them, and transfer them into the Crop Recommendation matrix.

import React, { useState, useRef } from 'react';
import { 
  FileText, Upload, CheckCircle2, AlertCircle, RefreshCw, 
  ArrowRight, ShieldCheck, Sparkles, Edit3, Check, FileCheck,
  HelpCircle, Eye
} from 'lucide-react';
import { apiParseSoilReport, apiConfirmSoilReport } from '../../../services/api';

export default function SoilReportPage({ onTransferToRecommendation }) {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successNotice, setSuccessNotice] = useState(null);

  // Parsed report response from backend
  const [reportData, setReportData] = useState(null);

  // Editable parameters for farmer verification
  const [parameters, setParameters] = useState({
    nitrogen: 120,
    phosphorus: 35,
    potassium: 150,
    ph: 6.8,
    organic_carbon: 0.55,
    electrical_conductivity: 0.42
  });

  const [isConfirmed, setIsConfirmed] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit. Please upload a smaller scan or PDF.');
      return;
    }

    setSelectedFile(file);
    setErrorMessage(null);
    setSuccessNotice(null);
    setReportData(null);
    setIsConfirmed(false);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  // Upload and Parse
  const handleParseReport = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a Soil Health Card file (PDF or Image) to parse.');
      return;
    }

    setIsParsing(true);
    setErrorMessage(null);
    setSuccessNotice(null);

    try {
      const response = await apiParseSoilReport(selectedFile);
      setReportData(response);
      
      const extracted = response.extracted_parameters || {};
      setParameters({
        nitrogen: extracted.nitrogen ?? 120,
        phosphorus: extracted.phosphorus ?? 35,
        potassium: extracted.potassium ?? 150,
        ph: extracted.ph ?? 6.8,
        organic_carbon: extracted.organic_carbon ?? 0.55,
        electrical_conductivity: extracted.electrical_conductivity ?? 0.42
      });

      setIsConfirmed(false);
      setSuccessNotice('Soil Health Card parsed successfully. Please review and confirm the extracted values.');
    } catch (err) {
      console.error('Soil Report OCR Error:', err);
      setErrorMessage(err.message || 'Failed to parse soil report. You can manually enter values below.');
    } finally {
      setIsParsing(false);
    }
  };

  // Save / Confirm Parameters
  const handleConfirmReport = async () => {
    if (!reportData?.report_id) {
      setErrorMessage('No report active to confirm. Please upload and parse a report first.');
      return;
    }

    setIsConfirming(true);
    setErrorMessage(null);

    try {
      await apiConfirmSoilReport(reportData.report_id, parameters);
      setIsConfirmed(true);
      setSuccessNotice('Parameters confirmed and verified! You can now transfer them to the recommendation matrix.');
    } catch (err) {
      console.error('Soil Report Confirmation Error:', err);
      setErrorMessage(err.message || 'Failed to record verification. Please try again.');
    } finally {
      setIsConfirming(false);
    }
  };

  // Transfer parameters to recommendation matrix
  const handleTransfer = () => {
    if (onTransferToRecommendation) {
      onTransferToRecommendation({
        N: parameters.nitrogen,
        P: parameters.phosphorus,
        K: parameters.potassium,
        ph: parameters.ph,
        reportId: reportData?.report_id
      });
    }
  };

  const getConfidenceBadge = (key) => {
    const score = reportData?.confidence_scores?.[key] ?? 0.8;
    if (score >= 0.85) {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          High Confidence ({Math.round(score * 100)}%)
        </span>
      );
    }
    if (score >= 0.65) {
      return (
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          Medium Confidence ({Math.round(score * 100)}%)
        </span>
      );
    }
    return (
      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
        Review Needed
      </span>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Top Banner Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/20 text-[#0284C7] text-[11px] font-mono font-bold uppercase mb-2.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Diagnostic Intake &bull; Soil Health Card OCR</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#121212] tracking-tight">
              Soil Health Card Parser &amp; Assayer
            </h1>
            <p className="text-sm text-[#5A5A5A] font-sans mt-1 max-w-2xl">
              Upload your official Government Soil Health Card (SHC) or private laboratory assay report. Our parser extracts primary macronutrients and organic carbon metrics for farmer verification.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-[#787774] bg-[#F5F4F0] px-3 py-1.5 rounded-full border border-black/[0.05]">
              Formats: PDF, PNG, JPG, WebP (Max 10MB)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: UPLOAD & DOCUMENT VIEWER (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="rounded-3xl p-6 border border-black/[0.08] bg-white space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <span className="text-xs font-mono font-bold text-[#787774] uppercase tracking-wider">
                Upload Document
              </span>
              <span className="text-[10px] font-mono text-[#787774]">
                SHC Format Compliant
              </span>
            </div>

            {/* Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-black/[0.12] hover:border-[#0284C7] rounded-2xl p-8 text-center transition-all cursor-pointer bg-[#FBFBF9] hover:bg-sky-50/20 group flex flex-col items-center justify-center min-h-[220px]"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/png,image/jpeg,image/webp,text/plain"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-14 h-14 rounded-2xl bg-[#0284C7]/10 group-hover:bg-[#0284C7]/20 border border-[#0284C7]/20 flex items-center justify-center text-[#0284C7] mb-3 transition-transform group-hover:scale-105">
                <Upload className="w-6 h-6 stroke-[2]" />
              </div>

              <p className="text-sm font-bold font-heading text-[#121212] mb-1">
                {selectedFile ? selectedFile.name : 'Click or drop Soil Health Card here'}
              </p>
              <p className="text-xs text-[#787774] font-sans">
                {selectedFile 
                  ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Ready to Parse`
                  : 'PDF documents or clear smartphone photos of lab sheets'}
              </p>
            </div>

            {/* Parse Action Button */}
            <button
              onClick={handleParseReport}
              disabled={!selectedFile || isParsing}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#121212] hover:bg-[#252525] text-white text-xs font-extrabold font-heading shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isParsing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#0284C7]" />
                  <span>Extracting Nutrients via OCR...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#0284C7]" />
                  <span>Parse &amp; Extract Soil Metrics</span>
                </>
              )}
            </button>
          </div>

          {/* Guidelines Card */}
          <div className="p-5 rounded-3xl bg-[#FBFBF9] border border-black/[0.08] space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-[#787774] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Farmer Data Quality Protocol</span>
            </h4>
            <p className="text-xs text-[#55534E] leading-relaxed">
              Optical recognition requires clear lighting without shadows or creased text. You retain complete control to audit and override any scanned value before saving to your farm profile.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: EXTRACTED PARAMETERS & VERIFICATION FORM (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Notifications */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successNotice && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Parameters Review & Confirmation Form */}
          <div className="rounded-3xl p-6 sm:p-8 border border-black/[0.08] bg-white space-y-6 shadow-sm">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/[0.06] gap-2">
              <div>
                <h3 className="text-lg font-black font-heading text-[#121212] flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#0284C7]" />
                  <span>Soil Metric Verification Sheet</span>
                </h3>
                <p className="text-xs text-[#787774] font-sans mt-0.5">
                  Card Ref: {reportData?.card_reference_number || 'Pending Upload / Manual Entry'}
                </p>
              </div>

              {isConfirmed ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  <span>Farmer Verified</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Verification Required</span>
                </span>
              )}
            </div>

            {/* Editable Parameter Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Nitrogen */}
              <div className="p-4 rounded-2xl bg-[#FBFBF9] border border-black/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774]">
                    Available Nitrogen (N)
                  </label>
                  {reportData && getConfidenceBadge('nitrogen')}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={parameters.nitrogen}
                    onChange={(e) => setParameters(prev => ({ ...prev, nitrogen: Number(e.target.value) }))}
                    className="w-full text-base font-extrabold font-heading text-[#121212] bg-white px-3 py-2 rounded-xl border border-black/[0.1] focus:outline-none focus:border-[#0284C7]"
                  />
                  <span className="text-xs font-mono text-[#787774] shrink-0">kg/ha</span>
                </div>
              </div>

              {/* Phosphorus */}
              <div className="p-4 rounded-2xl bg-[#FBFBF9] border border-black/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774]">
                    Available Phosphorus (P)
                  </label>
                  {reportData && getConfidenceBadge('phosphorus')}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={parameters.phosphorus}
                    onChange={(e) => setParameters(prev => ({ ...prev, phosphorus: Number(e.target.value) }))}
                    className="w-full text-base font-extrabold font-heading text-[#121212] bg-white px-3 py-2 rounded-xl border border-black/[0.1] focus:outline-none focus:border-[#0284C7]"
                  />
                  <span className="text-xs font-mono text-[#787774] shrink-0">kg/ha</span>
                </div>
              </div>

              {/* Potassium */}
              <div className="p-4 rounded-2xl bg-[#FBFBF9] border border-black/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774]">
                    Available Potassium (K)
                  </label>
                  {reportData && getConfidenceBadge('potassium')}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={parameters.potassium}
                    onChange={(e) => setParameters(prev => ({ ...prev, potassium: Number(e.target.value) }))}
                    className="w-full text-base font-extrabold font-heading text-[#121212] bg-white px-3 py-2 rounded-xl border border-black/[0.1] focus:outline-none focus:border-[#0284C7]"
                  />
                  <span className="text-xs font-mono text-[#787774] shrink-0">kg/ha</span>
                </div>
              </div>

              {/* pH Level */}
              <div className="p-4 rounded-2xl bg-[#FBFBF9] border border-black/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774]">
                    Soil Reaction (pH)
                  </label>
                  {reportData && getConfidenceBadge('ph')}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={parameters.ph}
                    onChange={(e) => setParameters(prev => ({ ...prev, ph: Number(e.target.value) }))}
                    className="w-full text-base font-extrabold font-heading text-[#121212] bg-white px-3 py-2 rounded-xl border border-black/[0.1] focus:outline-none focus:border-[#0284C7]"
                  />
                  <span className="text-xs font-mono text-[#787774] shrink-0">scale</span>
                </div>
              </div>

              {/* Organic Carbon */}
              <div className="p-4 rounded-2xl bg-[#FBFBF9] border border-black/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774]">
                    Organic Carbon (OC)
                  </label>
                  {reportData && getConfidenceBadge('organic_carbon')}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={parameters.organic_carbon}
                    onChange={(e) => setParameters(prev => ({ ...prev, organic_carbon: Number(e.target.value) }))}
                    className="w-full text-base font-extrabold font-heading text-[#121212] bg-white px-3 py-2 rounded-xl border border-black/[0.1] focus:outline-none focus:border-[#0284C7]"
                  />
                  <span className="text-xs font-mono text-[#787774] shrink-0">%</span>
                </div>
              </div>

              {/* Electrical Conductivity */}
              <div className="p-4 rounded-2xl bg-[#FBFBF9] border border-black/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono uppercase font-bold text-[#787774]">
                    Conductivity (EC)
                  </label>
                  {reportData && getConfidenceBadge('electrical_conductivity')}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={parameters.electrical_conductivity}
                    onChange={(e) => setParameters(prev => ({ ...prev, electrical_conductivity: Number(e.target.value) }))}
                    className="w-full text-base font-extrabold font-heading text-[#121212] bg-white px-3 py-2 rounded-xl border border-black/[0.1] focus:outline-none focus:border-[#0284C7]"
                  />
                  <span className="text-xs font-mono text-[#787774] shrink-0">dS/m</span>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleConfirmReport}
                disabled={!reportData || isConfirming}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isConfirming ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Confirming Parameters...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm &amp; Record Verification</span>
                  </>
                )}
              </button>

              <button
                onClick={handleTransfer}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#121212] hover:bg-[#252525] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4A373]" />
                <span>Transfer to Crop Recommendation Matrix</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

