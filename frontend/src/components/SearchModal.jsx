// src/components/SearchModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag, Star, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
    p.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}>
        
        {/*  Search Input Bar  */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input 
            ref={inputRef}
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hybrid seeds, sprayers, pesticides, fertilizers..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors font-heading">
            ESC
          </button>
        </div>

        {/*  Popular Shortcuts when query is empty  */}
        {!query && (
          <div className="p-5 border-b border-slate-100 flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <span className="font-bold text-slate-700 font-heading">Popular:</span>
            {['Maize', 'Sprayer', 'Tomato', 'Bio-NPK', 'Fungicide', 'Drip'].map((tag) => (
              <button 
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-primary rounded-lg text-xs font-semibold transition-colors">
                {tag}
              </button>
            ))}
          </div>
        )}

        {/*  Results List  */}
        <div className="overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No products found matching "{query}". Try another agricultural keyword.
            </div>
          ) : (
            filtered.map((prod) => (
              <div 
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-100 transition-all cursor-pointer group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 bg-white" 
                  />
                  <div className="min-w-0">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-800 group-hover:text-primary truncate">
                      {prod.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{prod.brand}</span>
                      <span>•</span>
                      <span className="text-primary font-medium">{prod.categoryName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="text-sm font-black text-slate-900 font-heading">
                    ₹{prod.price}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-400 flex items-center justify-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
