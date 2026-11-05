// src/pages/LandingWrapper.jsx
// Thin wrapper around AgriMartLandingPage providing react-router navigation.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AgriMartLandingPage from '../components/AgriMartLandingPage';

export default function LandingWrapper() {
  const navigate = useNavigate();

  const handleNavigateRoute = (route, appKey) => {
    if (appKey === 'store') {
      navigate('/store-rental/login');
    } else if (appKey === 'mandi') {
      navigate('/market-mandi/login');
    } else if (appKey === 'crop') {
      navigate('/crop-intelligence/login');
    } else if (route) {
      navigate(route);
    }
  };

  const handleEnterPlatform = (appKey) => {
    if (appKey === 'store') {
      navigate('/store-rental/login');
    } else if (appKey === 'mandi') {
      navigate('/market-mandi/login');
    } else if (appKey === 'crop') {
      navigate('/crop-intelligence/login');
    }
  };

  return (
    <AgriMartLandingPage 
      onNavigateRoute={handleNavigateRoute}
      onEnterPlatform={handleEnterPlatform}
    />
  );
}

