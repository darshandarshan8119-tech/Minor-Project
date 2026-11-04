// src/pages/NotFoundPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#121212] flex flex-col items-center justify-center font-sans px-4">
      <div className="text-center space-y-6 max-w-md">
        <span className="text-8xl font-black font-mono text-[#C26747]/20">404</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-[#5A5A5A] leading-relaxed">
          The page you're looking for doesn't exist or has been moved to a different location within the AgriMart platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] hover:bg-[#283618] text-white font-bold text-xs font-heading shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to AgriMart</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#F5F4F0] text-[#121212] font-bold text-xs font-heading border border-black/[0.1] transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

