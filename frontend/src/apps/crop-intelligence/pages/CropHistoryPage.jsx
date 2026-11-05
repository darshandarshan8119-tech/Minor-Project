// src/apps/crop-intelligence/pages/CropHistoryPage.jsx
// Displays the authenticated farmer's past leaf diagnostic scans,
// Soil Health Card records, and agronomic crop recommendations.

import React, { useState, useEffect } from 'react';
import { 
  History, Leaf, FileText, Sprout, Calendar, Clock, 
  ShieldCheck, AlertCircle, RefreshCw, ChevronRight, User, 
  ExternalLink, ArrowRight, CheckCircle2
} from 'lucide-react';
import { apiGetCropHistory } from '../../../services/api';

export default function CropHistoryPage({ 
  user, 
  onOpenLogin, 
  onNavigateToTab,
  onLoadRecommendation
}) {
  const [historyTab, setHistoryTab] = useState('all'); // all, scans, soil, recs
  const [historyData, setHistoryData] = useState({
    scans: [],
    soil_reports: [],
    recommendations: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);

  const fetchHistory = async () => {
    setIsLoading(true);
    setErrorNotice(null);

    try {
      const data = await apiGetCropHistory();
      setHistoryData({
        scans: data.scans || [],
        soil_reports: data.soil_reports || [],
        recommendations: data.recommendations || []
      });
    } catch (err) {
      console.warn('History fetch notice:', err.message);
      // In unauthenticated mode, DRF returns 401
      setErrorNotice(err.message || 'Please sign in to view your diagnostic history.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const totalRecords = 
    historyData.scans.length + 
    historyData.soil_reports.length + 
    historyData.recommendations.length;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-8 animate-in fade-in duration-300">
      
      {/* Top Banner Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-black/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212]/5 border border-black/[0.1] text-[#121212] text-[11px] font-mono font-bold uppercase mb-2.5">
              <History className="w-3.5 h-3.5" />
              <span>Agronomic Archive &bull; Farm Timeline</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#121212] tracking-tight">
              Diagnostic &amp; Soil History
            </h1>
            <p className="text-sm text-[#5A5A5A] font-sans mt-1 max-w-2xl">
              Audit past leaf scans, verified soil health cards, and crop suitability assessments linked to your AgriMart account.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={fetchHistory}
              disabled={isLoading}
              className="px-4 py-2 rounded-full bg-[#F5F4F0] hover:bg-[#EBE8E2] text-xs font-mono font-bold border border-black/[0.06] text-[#121212] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh History</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unauthenticated Banner */}
      {!user && (
        <div className="mb-8 p-6 rounded-3xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold font-heading text-amber-950">
                Sign in to sync your farm profile
              </h3>
              <p className="text-xs text-amber-900/80 mt-0.5">
                Saved scans, soil health metrics, and recommendation records are secured per farmer account.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenLogin}
            className="px-5 py-2.5 rounded-full bg-[#121212] hover:bg-[#252525] text-white text-xs font-bold font-heading shadow-xs transition-all cursor-pointer shrink-0"
          >
            Sign In / Register
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setHistoryTab('all')}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border cursor-pointer ${
            historyTab === 'all'
              ? 'bg-[#121212] text-white border-[#121212]'
              : 'bg-[#FBFBF9] hover:bg-[#F2F0EB] text-[#121212] border-black/[0.06]'
          }`}
        >
          All Activity ({totalRecords})
        </button>

        <button
          onClick={() => setHistoryTab('scans')}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
            historyTab === 'scans'
              ? 'bg-[#C26747] text-white border-[#C26747]'
              : 'bg-[#FBFBF9] hover:bg-[#F2F0EB] text-[#121212] border-black/[0.06]'
          }`}
        >
          <Leaf className="w-3.5 h-3.5" />
          <span>Leaf Scans ({historyData.scans.length})</span>
        </button>

        <button
          onClick={() => setHistoryTab('soil')}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
            historyTab === 'soil'
              ? 'bg-[#0284C7] text-white border-[#0284C7]'
              : 'bg-[#FBFBF9] hover:bg-[#F2F0EB] text-[#121212] border-black/[0.06]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Soil Reports ({historyData.soil_reports.length})</span>
        </button>

        <button
          onClick={() => setHistoryTab('recs')}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
            historyTab === 'recs'
              ? 'bg-[#65A30D] text-white border-[#65A30D]'
              : 'bg-[#FBFBF9] hover:bg-[#F2F0EB] text-[#121212] border-black/[0.06]'
          }`}
        >
          <Sprout className="w-3.5 h-3.5" />
          <span>Recommendations ({historyData.recommendations.length})</span>
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="p-12 text-center text-[#787774] space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#C26747]" />
          <p className="text-xs font-mono">Fetching diagnostic records...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && totalRecords === 0 && (
        <div className="rounded-3xl p-12 text-center border border-black/[0.08] bg-white space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F5F4F0] flex items-center justify-center mx-auto text-[#787774]">
            <History className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-base font-bold font-heading text-[#121212]">
            No records found
          </h3>
          <p className="text-xs text-[#787774] leading-relaxed">
            Run a plant foliage scan or upload a soil health card to begin tracking your agronomic diagnosis history.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => onNavigateToTab('clinic')}
              className="px-4 py-2 rounded-full bg-[#C26747] hover:bg-[#AD5B3E] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Scan Plant Leaf
            </button>
            <button
              onClick={() => onNavigateToTab('recommendation')}
              className="px-4 py-2 rounded-full bg-[#121212] hover:bg-[#252525] text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Run Soil Matrix
            </button>
          </div>
        </div>
      )}

      {/* Records Feed */}
      {!isLoading && totalRecords > 0 && (
        <div className="space-y-4">
          
          {/* LEAF SCANS */}
          {(historyTab === 'all' || historyTab === 'scans') && historyData.scans.map((scan) => (
            <div 
              key={scan.id} 
              className="rounded-3xl p-5 border border-black/[0.08] bg-white hover:border-[#C26747]/40 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C26747]/10 border border-[#C26747]/20 flex items-center justify-center text-[#C26747] shrink-0">
                  <Leaf className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#C26747] bg-[#C26747]/10 px-2 py-0.5 rounded-full">
                      Leaf Diagnostic Scan
                    </span>
                    <span className="text-[11px] font-mono text-[#787774] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(scan.created_at).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-heading text-[#121212]">
                    {scan.crop_name}: {scan.diagnosed_disease}
                  </h4>
                  <p className="text-xs text-[#787774] mt-0.5">
                    Pathogen: <strong className="text-[#121212]">{scan.pathogen_type}</strong> &bull; Severity: <strong className="text-[#121212]">{scan.severity}</strong> &bull; Confidence: {Math.round(Number(scan.confidence) * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigateToTab('clinic')}
                  className="px-4 py-2 rounded-full bg-[#F5F4F0] hover:bg-[#EBE8E2] text-xs font-bold text-[#121212] border border-black/[0.06] transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Re-examine in Clinic</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* SOIL HEALTH CARDS */}
          {(historyTab === 'all' || historyTab === 'soil') && historyData.soil_reports.map((report) => (
            <div 
              key={report.id} 
              className="rounded-3xl p-5 border border-black/[0.08] bg-white hover:border-[#0284C7]/40 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0284C7]/10 border border-[#0284C7]/20 flex items-center justify-center text-[#0284C7] shrink-0">
                  <FileText className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#0284C7] bg-[#0284C7]/10 px-2 py-0.5 rounded-full">
                      Soil Health Card
                    </span>
                    {report.is_verified_by_user && (
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Farmer Verified
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-[#787774] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(report.created_at).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-heading text-[#121212]">
                    {report.file_name || 'Soil Health Lab Record'}
                  </h4>
                  <p className="text-xs text-[#787774] mt-0.5">
                    N: {report.parsed_data?.nitrogen ?? '—'} &bull; P: {report.parsed_data?.phosphorus ?? '—'} &bull; K: {report.parsed_data?.potassium ?? '—'} &bull; pH: {report.parsed_data?.ph ?? '—'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    if (onLoadRecommendation) {
                      onLoadRecommendation({
                        N: report.parsed_data?.nitrogen,
                        P: report.parsed_data?.phosphorus,
                        K: report.parsed_data?.potassium,
                        ph: report.parsed_data?.ph,
                        reportId: report.id
                      });
                    }
                  }}
                  className="px-4 py-2 rounded-full bg-[#121212] hover:bg-[#252525] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Apply to Crop Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* RECOMMENDATIONS */}
          {(historyTab === 'all' || historyTab === 'recs') && historyData.recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="rounded-3xl p-5 border border-black/[0.08] bg-white hover:border-[#65A30D]/40 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#65A30D]/10 border border-[#65A30D]/20 flex items-center justify-center text-[#65A30D] shrink-0">
                  <Sprout className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#65A30D] bg-[#65A30D]/10 px-2 py-0.5 rounded-full">
                      Crop Recommendation
                    </span>
                    <span className="text-[11px] font-mono text-[#787774] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(rec.created_at).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-heading text-[#121212]">
                    Recommended: {rec.recommended_crop}
                  </h4>
                  <p className="text-xs text-[#787774] mt-0.5">
                    Compatibility: {Math.round(Number(rec.confidence) * 100)}% &bull; Soil Health Index: {rec.soil_analysis?.soil_health_index ?? 75}/100
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    if (onLoadRecommendation) {
                      onLoadRecommendation({
                        N: rec.nitrogen,
                        P: rec.phosphorus,
                        K: rec.potassium,
                        ph: rec.ph,
                        rainfall: rec.rainfall,
                        temp: rec.temperature,
                        humidity: rec.humidity
                      });
                    }
                  }}
                  className="px-4 py-2 rounded-full bg-[#F5F4F0] hover:bg-[#EBE8E2] text-xs font-bold text-[#121212] border border-black/[0.06] transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>Re-open in Matrix</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

