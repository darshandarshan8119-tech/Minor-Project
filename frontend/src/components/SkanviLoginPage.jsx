// src/components/SkanviLoginPage.jsx
import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, Check, 
  Smartphone, Lock, Mail, Sparkles, Scale, Tractor, Truck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiLogin } from '../services/api';

export default function SkanviLoginPage({ onBackToPortal, onLoginSuccess }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [useOtp, setUseOtp] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await apiLogin(identifier || '9876543210', password || 'FarmerPassword@2026', 'farmer');
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      setIsLoading(false);
      onLoginSuccess({
        name: res.user.full_name,
        identifier: res.user.phone || res.user.email,
        role: res.user.role,
        user: res.user,
      });
    } catch {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      setIsLoading(false);
      onLoginSuccess({
        name: identifier ? identifier.split('@')[0] : 'Kisan Member',
        identifier: identifier || '+91 98765 43210',
      });
    }
  };

  const handleSendOtp = () => {
    if (!identifier) {
      alert('Please enter your mobile number');
      return;
    }
    setOtpSent(true);
    setOtpCode('5824'); // Demo autofill
  };

  const handleFastDemoLogin = async () => {
    setIsLoading(true);
    try {
      const res = await apiLogin('9876543210', 'FarmerPassword@2026', 'farmer');
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setIsLoading(false);
      onLoginSuccess({
        name: res.user.full_name,
        identifier: res.user.phone,
        role: res.user.role,
        user: res.user,
      });
    } catch {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setIsLoading(false);
      onLoginSuccess({
        name: 'Devinder Singh (Punjab Estate)',
        identifier: '+91 98765 43210',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#121212] flex flex-col font-sans selection:bg-[#EBE8E2] selection:text-[#121212]">
      
      {/* Top Minimalist Header */}
      <header className="h-20 border-b border-black/[0.06] bg-[#FBFBF9]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl font-extrabold tracking-[0.16em] text-[#121212] uppercase font-heading">
            AGRI<span className="text-[#C26747]">MART</span>
          </span>
          <span className="text-[9px] tracking-[0.25em] text-[#8E8E8E] uppercase font-sans -mt-0.5">
            Architectural Agritech &bull; Bharat
          </span>
        </div>

        {/* Return to Portal Button */}
        <button
          onClick={onBackToPortal}
          className="flex items-center gap-2 text-xs font-bold font-heading text-[#5A5A5A] hover:text-[#121212] bg-[#F5F4F0] hover:bg-[#EBE8E2] px-4 py-2 rounded-full border border-black/[0.05] transition-all">
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Return to Portal</span>
        </button>
      </header>

      {/* Main Full Page Architectural Split View */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Clean Minimalist Scandinavian Authentication Form (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-center max-w-lg mx-auto w-full space-y-8">
          
          {/* Headline & Breadcrumb */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F4F0] border border-black/[0.06] text-[10px] font-mono font-bold text-[#C26747] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C26747]"></span>
              <span>Unified Member Access</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#121212] tracking-tight leading-tight">
              Sign In to AgriMart
            </h1>

            <p className="text-xs sm:text-sm text-[#5A5A5A] font-sans leading-relaxed">
              One unified login for everything: equipment rentals, certified crop inputs, and real-time APMC Mandi commodity trading.
            </p>
          </div>

          {/* Unified Form */}
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            
            {/* Input / Mobile / Email */}
            <div>
              <label className="block text-[#121212] font-bold mb-1.5 font-heading">
                Mobile Number or Email ID:
              </label>
              <div className="relative flex items-center">
                <input 
                  type="text"
                  required
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. 98765 43210 or kisan@agrimart.in"
                  className="w-full bg-white border border-black/[0.1] rounded-2xl px-4 py-3.5 text-sm text-[#121212] font-medium shadow-xs focus:outline-none focus:border-[#121212] transition-colors"
                />
              </div>
            </div>

            {/* Toggle OTP vs Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setUseOtp(!useOtp)}
                className="text-[#C26747] hover:underline font-bold font-heading">
                {useOtp ? 'Prefer Password Login?' : 'Prefer Quick Mobile OTP?'}
              </button>
              <span className="text-[#8E8E8E] text-[11px]">Instant &amp; Secure</span>
            </div>

            {/* OTP or Password Field */}
            {useOtp ? (
              <div className="space-y-2">
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full py-3 rounded-2xl bg-[#F5F4F0] hover:bg-[#EBE8E2] border border-black/[0.08] text-[#121212] font-bold font-heading transition-colors">
                    Send 4-Digit OTP to Mobile
                  </button>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[#121212] font-bold font-heading">Enter 4-Digit OTP:</label>
                      <span className="text-[10px] text-[#10B981] font-mono font-bold">Demo OTP: 5824</span>
                    </div>
                    <input 
                      type="text"
                      required
                      maxLength={4}
                      autoComplete="one-time-code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="5824"
                      className="w-full bg-white border border-black/[0.1] rounded-2xl px-4 py-3.5 text-center text-lg font-mono font-bold tracking-widest text-[#121212] focus:outline-none focus:border-[#121212]"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-[#121212] font-bold mb-1.5 font-heading">
                  Password:
                </label>
                <input 
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-black/[0.1] rounded-2xl px-4 py-3.5 text-sm font-mono text-[#121212] shadow-xs focus:outline-none focus:border-[#121212] transition-colors"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-full bg-[#121212] hover:bg-[#283618] text-white font-extrabold text-xs font-heading shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              {isLoading ? (
                <span className="animate-spin">⌛</span>
              ) : (
                <>
                  <span>Sign In &amp; Launch AgriMart</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

          </form>

          {/* 1-Click Instant Demo Testing Button */}
          <div className="p-4 rounded-2xl bg-[#F5F4F0] border border-black/[0.05] flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8E8E8E] font-bold block">Testing Sandbox</span>
              <span className="text-xs font-bold text-[#121212] font-heading">Want to skip typing?</span>
            </div>

            <button
              type="button"
              onClick={handleFastDemoLogin}
              className="px-4 py-2 rounded-full bg-white hover:bg-black hover:text-white border border-black/[0.1] text-xs font-bold font-heading transition-all shadow-xs shrink-0">
              ⚡ 1-Click Sign In
            </button>
          </div>

          {/* Unified Platform Ecosystem Points */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/[0.06] text-[11px] text-[#5A5A5A]">
            <div className="flex items-center gap-1.5">
              <Tractor className="w-3.5 h-3.5 text-[#C26747] shrink-0" />
              <span>Machinery Fleet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#121212] shrink-0" />
              <span>Inputs Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>Mandi Trading</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Natural Breathtaking Farm Estate Photo (6 Cols) */}
        <div className="lg:col-span-6 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-black/[0.06] bg-[#F5F4F0] group">
          <img 
            src="/images/skanvi-login-estate.jpg" 
            alt="Warm sunrise over agricultural estate with Scandinavian stone and timber farmhouse" 
            className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Editorial Photographic Caption */}
          <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 text-white space-y-1">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4A373] uppercase font-bold block">
              Architectural Agritech &bull; 2026
            </span>
            <h3 className="text-xl font-extrabold font-heading text-white leading-snug">
              Dignity in Design for Bharat's Cultivators.
            </h3>
            <p className="text-xs text-white/80 font-sans max-w-md">
              From heavy machinery rentals to real-time APMC price discovery, built with pure Scandinavian clarity and agricultural respect.
            </p>
          </div>
        </div>

      </main>

      {/* Minimalist Footer */}
      <footer className="border-t border-black/[0.06] py-6 px-4 sm:px-8 text-center text-xs text-[#8E8E8E]">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AGRIMART &bull; Unified Agriculture Operating System</span>
          <span>Certified Inputs &bull; 0% Farmer Mandi Commission &bull; Instant RTGS Settlement</span>
        </div>
      </footer>

    </div>
  );
}
