import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Success() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-[url('https://images.unsplash.com/photo-1549421263-6064833b071b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center relative min-h-[calc(100vh-64px)] md:min-h-0">
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-[var(--color-velor-border)] p-8 md:p-20 text-center rounded-[24px] md:rounded-[40px] shadow-2xl relative z-10"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
          className="w-20 h-20 md:w-24 md:h-24 bg-[#C4A484]/10 border border-[#C4A484] rounded-full flex items-center justify-center mx-auto mb-8 md:mb-10 shadow-inner"
        >
          <Check size={40} className="w-8 h-8 md:w-10 md:h-10 text-[#C4A484]" />
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-serif italic tracking-tight mb-4 md:mb-6 text-[var(--color-velor-text)]">Order Confirmed</h1>
        
        <div className="w-12 h-px bg-[var(--color-velor-border)] mx-auto mb-6"></div>
        
        <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--color-velor-text-light)] mb-10 md:mb-12 max-w-md mx-auto">
          Thank you for your purchase. Your order has been placed successfully and will be curated for dispatch shortly. A receipt has been sent to your email.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/shop" className="px-8 py-4 md:px-10 md:py-5 bg-[var(--color-velor-text)] text-white text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-full">
            Continue Shopping
          </Link>
          <Link to="/" className="px-8 py-4 md:px-10 md:py-5 bg-white border border-[var(--color-velor-border)] text-[var(--color-velor-text)] text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[var(--color-velor-bg-alt)] transition-all duration-300 rounded-full">
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
