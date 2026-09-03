// src/components/FarmerTestimonials.jsx
import React from 'react';
import { Star, CheckCircle, MapPin, Quote } from 'lucide-react';
import { FARMER_REVIEWS } from '../data/mockData';

export default function FarmerTestimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider font-heading">Ground Reality</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Stories from Bharat's Farmlands
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>100% Verified Farmer Purchases</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FARMER_REVIEWS.map((rev) => (
          <div 
            key={rev.id}
            className="bg-white rounded-3xl p-6 border border-emerald-100/80 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            
            <div>
              {/*  Stars & Boost Badge  */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full font-heading border border-emerald-200">
                  {rev.yieldBoost}
                </span>
              </div>

              {/*  Review Text  */}
              <p className="text-xs sm:text-sm text-slate-700 font-sans italic leading-relaxed mb-6">
                "{rev.quote}"
              </p>
            </div>

            {/*  Farmer Profile Card  */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
              <img 
                src={rev.avatar} 
                alt={rev.name} 
                className="w-11 h-11 rounded-full object-cover border-2 border-emerald-200 shrink-0" 
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h4 className="font-heading font-extrabold text-xs text-slate-900 truncate">{rev.name}</h4>
                  <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 font-sans">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{rev.location}</span>
                  <span>•</span>
                  <span className="text-primary font-medium">{rev.crop}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
