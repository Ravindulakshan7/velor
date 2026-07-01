import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, RotateCcw, HelpCircle } from 'lucide-react';

export default function Shipping() {
  return (
    <div className="flex-1 w-full bg-[var(--color-velor-bg)] min-h-screen pb-24">
      {/* Header section */}
      <div className="pt-12 md:pt-20 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1.5 md:py-2 px-4 md:px-5 rounded-full border border-[var(--color-velor-border)] text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm">
            Customer Care
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight mb-4 text-[var(--color-velor-text)]">
            Shipping & Returns
          </h1>
          <p className="text-[13px] md:text-sm text-[var(--color-velor-text-light)] max-w-md mx-auto leading-relaxed">
            Everything you need to know about receiving and returning your Velor Studio pieces.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Shipping Info */}
          <div className="bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[24px] shadow-sm border border-white/50">
            <Truck className="w-8 h-8 mb-6 text-[#C4A484]" />
            <h2 className="text-2xl font-serif italic mb-6">Shipping Information</h2>
            
            <div className="space-y-6 text-sm text-[var(--color-velor-text-light)] leading-relaxed">
              <div>
                <h3 className="font-bold text-[var(--color-velor-text)] mb-2 uppercase tracking-wider text-[10px]">Standard Delivery</h3>
                <p>Complimentary on all orders. Delivery within 3-5 business days.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-[var(--color-velor-text)] mb-2 uppercase tracking-wider text-[10px]">Express Delivery</h3>
                <p>$25 flat rate. Delivery within 1-2 business days when ordered before 2 PM EST.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-[var(--color-velor-text)] mb-2 uppercase tracking-wider text-[10px]">International Shipping</h3>
                <p>We ship globally. Delivery times and duties vary by destination.</p>
              </div>
            </div>
          </div>

          {/* Returns Info */}
          <div className="bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[24px] shadow-sm border border-white/50">
            <RotateCcw className="w-8 h-8 mb-6 text-[#C4A484]" />
            <h2 className="text-2xl font-serif italic mb-6">Return Policy</h2>
            
            <div className="space-y-6 text-sm text-[var(--color-velor-text-light)] leading-relaxed">
              <div>
                <h3 className="font-bold text-[var(--color-velor-text)] mb-2 uppercase tracking-wider text-[10px]">30-Day Window</h3>
                <p>Items may be returned within 30 days of receipt in their original, unused condition.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-[var(--color-velor-text)] mb-2 uppercase tracking-wider text-[10px]">Complimentary Returns</h3>
                <p>A pre-paid return label is included with every order for domestic returns.</p>
              </div>
              
              <div>
                <h3 className="font-bold text-[var(--color-velor-text)] mb-2 uppercase tracking-wider text-[10px]">Refund Processing</h3>
                <p>Refunds are processed to the original payment method within 5-7 business days of receipt.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
