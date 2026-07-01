import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-4 pb-4 mt-auto relative z-10">
      <div className="bg-white rounded-[32px] md:rounded-[40px] border border-[var(--color-velor-border)] pt-12 md:pt-16 pb-6 md:pb-8 px-6 md:px-20 shadow-sm flex flex-col">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="sm:col-span-2">
            <h3 className="text-2xl md:text-3xl font-serif tracking-[0.2em] mb-4 md:mb-6">VELOR</h3>
            <p className="text-[12px] md:text-[13px] text-[var(--color-velor-text-light)] max-w-xs leading-relaxed mb-6 md:mb-8">
              Redefining modern luxury through minimal design and uncompromising quality.
            </p>
            <div className="flex gap-3 md:gap-4">
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[var(--color-velor-border)] flex items-center justify-center hover:bg-[var(--color-velor-bg-alt)] transition-colors"><Instagram size={14} className="md:w-4 md:h-4" strokeWidth={1.5} /></a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[var(--color-velor-border)] flex items-center justify-center hover:bg-[var(--color-velor-bg-alt)] transition-colors"><Twitter size={14} className="md:w-4 md:h-4" strokeWidth={1.5} /></a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[var(--color-velor-border)] flex items-center justify-center hover:bg-[var(--color-velor-bg-alt)] transition-colors"><Facebook size={14} className="md:w-4 md:h-4" strokeWidth={1.5} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-4 md:mb-6 text-[var(--color-velor-text-muted)]">Shop</h4>
            <ul className="space-y-3 md:space-y-4 text-[12px] md:text-[13px]">
              <li><Link to="/shop" className="hover:opacity-50 transition-opacity">All Products</Link></li>
              <li><Link to="/shop" className="hover:opacity-50 transition-opacity">Watches</Link></li>
              <li><Link to="/shop" className="hover:opacity-50 transition-opacity">Jewelry</Link></li>
              <li><Link to="/shop" className="hover:opacity-50 transition-opacity">Apparel</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-4 md:mb-6 text-[var(--color-velor-text-muted)]">Support</h4>
            <ul className="space-y-3 md:space-y-4 text-[12px] md:text-[13px]">
              <li><Link to="/contact" className="hover:opacity-50 transition-opacity">Contact Us</Link></li>
              <li><Link to="/track" className="hover:opacity-50 transition-opacity">Track Order</Link></li>
              <li><Link to="/faq" className="hover:opacity-50 transition-opacity">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:opacity-50 transition-opacity">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="hover:opacity-50 transition-opacity">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 md:pt-8 border-t border-[var(--color-velor-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] md:text-[10px] uppercase tracking-widest text-[var(--color-velor-text-muted)] text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} VELOR Studio. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span>All Systems Operational</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
