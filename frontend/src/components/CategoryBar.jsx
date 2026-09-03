// src/components/CategoryBar.jsx
import React from 'react';
import { 
  Sprout, ShieldAlert, Hammer, Tractor, FlaskConical, Droplets, ArrowRight, Sparkles 
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

const iconMap = {
  Sprout,
  ShieldAlert,
  Hammer,
  Tractor,
  FlaskConical,
  Droplets,
};

export default function CategoryBar({ currentCategory, onSelectCategory }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-end justify-between mb-5">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider font-heading flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent" /> Complete Agricultural Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Browse by Farming Category
          </h2>
        </div>
        <button 
          onClick={() => onSelectCategory('all')}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors font-heading">
          <span>View All 200+ Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/*  Bento Grid of Categories  */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {CATEGORIES.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Sprout;
          const isActive = currentCategory === cat.slug;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-300 shadow-soft hover:shadow-hover hover:-translate-y-1 text-left ${
                isActive 
                  ? 'border-primary ring-2 ring-primary/20 bg-emerald-50/40' 
                  : 'border-emerald-100/80 hover:border-primary/40'
              }`}>
              
              {/*  Icon Frame with dynamic gradient  */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 mb-3 shadow-sm ${
                isActive
                  ? 'bg-primary text-white scale-105'
                  : 'bg-emerald-50 group-hover:bg-primary text-primary group-hover:text-white group-hover:scale-105'
              }`}>
                <IconComponent className="w-7 h-7" />
              </div>

              {/*  Title  */}
              <span className={`font-heading font-extrabold text-sm transition-colors ${
                isActive ? 'text-primary font-black' : 'text-slate-800 group-hover:text-primary'
              }`}>
                {{
                  seeds: 'Seeds',
                  pesticides: 'Crop Protection',
                  tools: 'Tools',
                  machines: 'Machinery',
                  fertilizers: 'Fertilizers',
                  irrigation: 'Irrigation'
                }[cat.slug] || cat.name}
              </span>

              {/*  Count Tag  */}
              <span className="text-[10px] font-bold text-slate-400 mt-1 font-sans">
                {cat.itemCount} Items Available
              </span>

              {isActive && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
