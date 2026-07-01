import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { Heart, X } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, products, toggleWishlist } = useStore();

  const wishlistProducts = wishlist
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-16 h-[70vh]">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="w-24 h-24 md:w-32 md:h-32 bg-white/50 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center mb-6 md:mb-8 border border-[var(--color-velor-border)]">
          <Heart size={48} className="w-8 h-8 md:w-12 md:h-12 text-[#C4A484]/50" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-serif italic mb-3 md:mb-4 text-center">Your Wishlist is Empty</h2>
        <p className="text-[13px] md:text-[14px] text-[var(--color-velor-text-light)] mb-8 md:mb-10 max-w-md text-center">Save items you love to revisit them later. Your curated selection awaits.</p>
        <Link to="/shop" className="px-8 py-4 md:px-10 md:py-5 bg-[var(--color-velor-text)] text-white text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold hover:bg-[#333] hover:shadow-xl hover:-translate-y-1 rounded-full transition-all duration-300">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-4xl md:text-6xl font-serif italic tracking-tight mb-2 md:mb-4 text-[var(--color-velor-text)]">Wishlist</h1>
        <p className="text-[13px] md:text-[14px] text-[var(--color-velor-text-light)] mb-8 md:mb-12 max-w-md">Your curated selection of luxury items.</p>
      </motion.div>
      
      <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <AnimatePresence>
          {wishlistProducts.map((product, index) => (
            <motion.div
              layout
              key={product!.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group h-full"
            >
              <button 
                onClick={(e) => { e.preventDefault(); toggleWishlist(product!.id); }}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 hover:bg-white hover:text-red-500 transition-all duration-300 border border-white"
              >
                <X size={16} className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              
              <Link to={`/product/${product!.id}`} className="block h-full">
                <div className="bg-white/80 backdrop-blur-md rounded-[20px] md:rounded-[32px] p-2 md:p-4 shadow-sm hover:shadow-2xl transition-all duration-700 border border-[var(--color-velor-border)] group-hover:-translate-y-1 md:group-hover:-translate-y-2 h-full flex flex-col">
                  <div className="w-full aspect-[4/5] rounded-[16px] md:rounded-[24px] overflow-hidden relative mb-4 md:mb-6 bg-[var(--color-velor-bg-alt)] shrink-0">
                    <img referrerPolicy="no-referrer" 
                      src={product!.featuredImage} 
                      alt={product!.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700"></div>
                  </div>
                  <div className="px-2 pb-2 md:px-4 md:pb-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif italic text-base md:text-2xl mb-1 md:mb-2 group-hover:text-[#C4A484] transition-colors line-clamp-1">{product!.name}</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 md:mt-4 gap-2 sm:gap-0">
                      <span className="text-[12px] md:text-[14px] font-medium text-[var(--color-velor-text-light)]">
                        {formatPrice(product!.basePrice)}
                      </span>
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--color-velor-text-muted)] underline underline-offset-4 group-hover:text-[var(--color-velor-text)] transition-colors">
                        View Details
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
