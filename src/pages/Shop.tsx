import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { Category } from '../types';
import { Heart, Search } from 'lucide-react';

export default function Shop() {
  const { products, wishlist, toggleWishlist } = useStore();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: (Category | 'All')[] = ['All', 'Watches', 'Rings', 'Bracelets', 'Necklaces', 'Sunglasses'];

  const filteredProducts = useMemo(() => {
    let filtered = activeCategory === 'All' 
      ? products 
      : products.filter(p => p.category === activeCategory);
      
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
      );
    }
    
    return filtered;
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 md:px-16 md:py-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-6 md:gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full lg:w-auto">
          <h1 className="text-4xl md:text-6xl font-serif italic tracking-tight mb-4 text-[var(--color-velor-text)]">Collection</h1>
          <p className="text-[13px] md:text-[14px] text-[var(--color-velor-text-light)] max-w-md leading-relaxed">
            Explore our curated selection of luxury items, designed for the modern aesthetic with uncompromising quality.
          </p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full lg:w-auto flex flex-col gap-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-velor-text-muted)]" />
            <input 
              type="text" 
              placeholder="Search collection..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/50 backdrop-blur-md border border-[var(--color-velor-border)] rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-[#C4A484] focus:ring-1 focus:ring-[#C4A484] transition-all shadow-sm"
            />
          </div>
          <div className="w-full overflow-hidden">
            <div className="flex overflow-x-auto gap-5 md:gap-6 bg-white/50 backdrop-blur-md px-6 py-4 rounded-full border border-[var(--color-velor-border)] shadow-sm [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap shrink-0 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'text-[#C4A484]' 
                      : 'text-[var(--color-velor-text-muted)] hover:text-[var(--color-velor-text)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link to={`/product/${product.id}`} className="group block h-full">
                <div className="bg-white/80 backdrop-blur-md rounded-[20px] md:rounded-[32px] p-2 md:p-4 shadow-sm hover:shadow-2xl transition-all duration-700 group-hover:-translate-y-1 md:group-hover:-translate-y-2 h-full flex flex-col">
                  <div className="w-full aspect-[4/5] rounded-[16px] md:rounded-[24px] overflow-hidden relative mb-4 md:mb-6 bg-[var(--color-velor-bg-alt)] shrink-0">
                    <img referrerPolicy="no-referrer" 
                      src={product.featuredImage} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/80 backdrop-blur-md px-2 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold shadow-sm">
                      {product.category}
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 md:top-4 md:right-4 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 hover:bg-white transition-all duration-300 z-10"
                    >
                      <Heart size={14} className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-[var(--color-velor-text)]'}`} />
                    </button>
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700"></div>
                  </div>
                  <div className="px-2 pb-2 md:px-2 md:pb-3 flex-1 flex flex-col justify-between">
                    <div className="mb-2 md:mb-4">
                      <h3 className="font-serif italic text-lg md:text-2xl mb-1 group-hover:text-[#C4A484] transition-colors line-clamp-1">{product.name}</h3>
                      <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-velor-text-light)]">
                        {product.variants.length} Var
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] md:text-[14px] font-medium text-[var(--color-velor-text-light)]">
                        {formatPrice(product.basePrice)}
                      </span>
                      <span className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[var(--color-velor-border)] flex items-center justify-center text-[var(--color-velor-text-muted)] group-hover:bg-[var(--color-velor-text)] group-hover:text-white group-hover:border-[var(--color-velor-text)] transition-all duration-300">
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
