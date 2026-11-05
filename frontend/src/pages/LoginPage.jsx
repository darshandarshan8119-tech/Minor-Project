// src/pages/LoginPage.jsx
// Thin wrapper around existing SkanviLoginPage that provides
// react-router navigation callbacks for each application module.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SkanviLoginPage from '../components/SkanviLoginPage';
import AestheticTransitionLoader from '../components/AestheticTransitionLoader';

export default function LoginPage() {
  const navigate = useNavigate();
  // Determine which app module we're logging into from the URL
  // e.g. /store-rental/login → appModule = 'store-rental'
  //      /market-mandi/login → appModule = 'market-mandi'
  const currentPath = window.location.pathname;
  let appModule = 'store-rental';
  if (currentPath.startsWith('/market-mandi')) {
    appModule = 'market-mandi';
  } else if (currentPath.startsWith('/crop-intelligence')) {
    appModule = 'crop-intelligence';
  }

  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [transitionMessage, setTransitionMessage] = React.useState('');

  const handleBackToPortal = () => {
    setIsTransitioning(true);
    setTransitionMessage('Returning to Portal...');
    setTimeout(() => {
      navigate('/');
    }, 350);
  };

  const handleLoginSuccess = (userData) => {
    setIsTransitioning(true);
    setTransitionMessage(`Authenticating Member Session for ${userData.name}...`);
    
    // Store user data in localStorage for the app shells to read
    try {
      localStorage.setItem('agrimart_user_session', JSON.stringify(userData));
    } catch { /* silent */ }

    setTimeout(() => {
      // Navigate to the correct app based on the module
      if (appModule === 'market-mandi') {
        navigate('/market-mandi/app');
      } else if (appModule === 'crop-intelligence') {
        navigate('/crop-intelligence/app');
      } else {
        navigate('/store-rental/app');
      }
    }, 600);
  };

  return (
    <>
      {isTransitioning && (
        <AestheticTransitionLoader 
          targetMode={appModule === 'market-mandi' ? 'mandi' : appModule === 'crop-intelligence' ? 'crop' : 'store'} 
          message={transitionMessage} 
        />
      )}
      <SkanviLoginPage 
        onBackToPortal={handleBackToPortal}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

