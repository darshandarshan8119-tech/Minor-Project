// src/components/TrustBento.jsx
import React from 'react';
import { Award, Truck, BadgeDollarSign, Headphones, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function TrustBento() {
  const features = [
    {
      icon: Award,
      title: '100% Genuine Brand Guarantee',
      description: 'Zero adulteration. Every seed packet and pesticide bottle comes with authentic manufacturer QR verification.',
      badge: 'Certified Quality',
      color: 'from-emerald-500/20 text-emerald-600',
    },
    {
      icon: Truck,
      title: 'Direct-to-Village Logistics',
      description: 'Doorstep dispatch to over 20,000+ rural pin codes. No need to spend travel money going to far-off district towns.',
      badge: 'Pan-India Reach',
      color: 'from-amber-500/20 text-amber-600',
    },
    {
      icon: BadgeDollarSign,
      title: 'Fair Wholesale Farmer Rates',
      description: 'Direct procurement from manufacturers passes maximum margins back to the farmer. Bulk seasonal discounts.',
      badge: 'Honest Pricing',
      color: 'from-blue-500/20 text-blue-600',
    },
    {
      icon: Headphones,
      title: 'Free Agronomist Phone Advisory',
      description: 'Talk directly to agricultural scientists on weather planning, pest remedies, and fertilizer application schedules.',
      badge: 'Crop Doctors',
      color: 'from-purple-500/20 text-purple-600',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-3xl bg-emerald-950 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-emerald-800/40">
        
        {/*  Header  */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-accent-light uppercase tracking-wider font-heading">The AgriMart Difference</span>
          <h2 className="text-2xl sm:text-4xl font-black font-heading text-white mt-1 mb-3">
            Why Over 15,000+ Farmers Trust Us
          </h2>
          <p className="text-emerald-100/70 text-xs sm:text-sm font-sans leading-relaxed">
            We eliminate local black marketing, high commission middlemen, and spurious agri-inputs from the rural supply chain.
          </p>
        </div>

        {/*  4 Bento Cards  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-emerald-300" />
                    </div>
                    <span className="text-[10px] font-bold text-accent-light bg-white/5 px-2 py-0.5 rounded-md border border-white/10 font-heading">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-base text-white mb-2 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-emerald-100/70 font-sans leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
