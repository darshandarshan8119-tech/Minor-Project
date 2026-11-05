// src/apps/crop-intelligence/CropIntelligenceApp.jsx
// Dedicated application shell for AG Crop Intelligence (AgriCrop).
// Operates as an independent module isolated from AG Store and AG Market.
// Integrates Disease Clinic, Crop Recommendation Matrix, Soil Health Card OCR, and Diagnostic History.

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CropNavbar from './components/CropNavbar';
import CropFooter from './components/CropFooter';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import CropRecommendationPage from './pages/CropRecommendationPage';
import SoilReportPage from './pages/SoilReportPage';
import CropHistoryPage from './pages/CropHistoryPage';

export default function CropIntelligenceApp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Recover user session from localStorage
  const [user] = useState(() => {
    try {
      const session = localStorage.getItem('agrimart_user_session') || localStorage.getItem('agrimart_user');
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  // Redirect to AG Crop login if no session, preserving requested destination
  useEffect(() => {
    const hasToken = localStorage.getItem('agrimart_access_token') || localStorage.getItem('agrimart_user_session');
    if (!hasToken) {
      navigate(`/crop-intelligence/login?redirect=${encodeURIComponent(location.pathname)}`, {
        replace: true,
        state: { from: location.pathname }
      });
    }
  }, [navigate, location.pathname]);

  // Transferred parameters between Soil Report OCR, History, and Crop Recommendation
  const [transferredSoilValues, setTransferredSoilValues] = useState(null);
  const [transferredReportId, setTransferredReportId] = useState(null);

  // Derive active tab from current URL pathname
  const getTabFromPath = (path) => {
    if (path.includes('/recommendation') || path.includes('/matrix') || path.includes('/soil-chemistry')) {
      return 'recommendation';
    }
    if (path.includes('/ocr') || path.includes('/soil-report') || path.includes('/shc')) {
      return 'ocr';
    }
    if (path.includes('/history') || path.includes('/timeline') || path.includes('/archive')) {
      return 'history';
    }
    return 'clinic'; // Default tab is Plant Pathology & Leaf Scanner
  };

  const activeTab = getTabFromPath(location.pathname);

  // Tab navigation handler syncing with URL
  const handleTabChange = (newTab) => {
    const tabRouteMap = {
      clinic: '/crop-intelligence/clinic',
      recommendation: '/crop-intelligence/recommendation',
      ocr: '/crop-intelligence/ocr',
      history: '/crop-intelligence/history'
    };
    navigate(tabRouteMap[newTab] || '/crop-intelligence/app');
  };

  // Handler for transferring parsed SHC values into Recommendation Matrix
  const handleTransferToRecommendation = (params) => {
    setTransferredSoilValues({
      N: params.N,
      P: params.P,
      K: params.K,
      ph: params.ph
    });
    if (params.reportId) {
      setTransferredReportId(params.reportId);
    }
    navigate('/crop-intelligence/recommendation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#121212] selection:bg-[#EBE8E2] selection:text-[#121212] font-sans">
      
      {/* Dedicated AG Crop Top Navigation Bar */}
      <CropNavbar
        user={user}
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        onOpenLogin={() => navigate('/crop-intelligence/login')}
      />

      {/* Main Agronomic Intelligence Content */}
      <main className="flex-1 pb-16">
        {activeTab === 'clinic' && (
          <DiseaseDetectionPage
            onOpenCopilot={() => navigate('/market-mandi/copilot')}
          />
        )}

        {activeTab === 'recommendation' && (
          <CropRecommendationPage
            initialValues={transferredSoilValues}
            fromReportId={transferredReportId}
            onNavigateToMarket={(q) => navigate(`/market-mandi/terminal?q=${encodeURIComponent(q)}`)}
            onOpenCopilot={() => navigate('/market-mandi/copilot')}
          />
        )}

        {activeTab === 'ocr' && (
          <SoilReportPage
            onTransferToRecommendation={handleTransferToRecommendation}
          />
        )}

        {activeTab === 'history' && (
          <CropHistoryPage
            user={user}
            onOpenLogin={() => navigate('/crop-intelligence/login')}
            onNavigateToTab={handleTabChange}
            onLoadRecommendation={(params) => {
              setTransferredSoilValues(params);
              if (params.reportId) setTransferredReportId(params.reportId);
              navigate('/crop-intelligence/recommendation');
            }}
          />
        )}
      </main>

      {/* Dedicated AG Crop Footer */}
      <CropFooter onSelectTab={handleTabChange} />

    </div>
  );
}

