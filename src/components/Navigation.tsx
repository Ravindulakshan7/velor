import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store';
import { useAuthStore } from '../authStore';
import { Heart, Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function Navigation() {
  const { cart, wishlist, setCartOpen } = useStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 md:px-6 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between px-6 md:px-8 py-4 bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 rounded-full md:rounded-[32px]">
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden hover:text-[#C4A484] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--color-velor-text)]">
          <Link to="/shop" className="hover:text-[#C4A484] transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-[#C4A484] transition-colors">About</Link>
        </div>
        
        {/* Logo */}
        <div className="text-xl md:text-2xl font-serif tracking-[0.4em] text-[var(--color-velor-text)] md:translate-x-3 text-center flex-1 md:flex-none">
          <Link to="/">VELOR</Link>
        </div>
        
        {/* Actions */}
        <div className="flex gap-4 md:gap-6 items-center text-[var(--color-velor-text)]">
          <button className="hover:text-[#C4A484] transition-colors hidden sm:block"><Search size={18} strokeWidth={1.5} /></button>
          
          <Link to="/wishlist" className="hover:text-[#C4A484] transition-colors relative hidden sm:block">
            <Heart size={18} strokeWidth={1.5} className={wishlist.length > 0 ? "fill-current text-red-500" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-[var(--color-velor-text)] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlist.length}</span>
            )}
          </Link>
          
          <button onClick={() => setCartOpen(true)} className="hover:text-[#C4A484] transition-colors relative">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[var(--color-velor-accent)] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartItemCount}</span>
            )}
          </button>
          
          <div className="hidden sm:block">
            {isAuthenticated ? (
              <div className="group relative">
                <button className="hover:text-[#C4A484] transition-colors"><User size={18} strokeWidth={1.5} /></button>
                <div className="absolute top-full right-0 mt-4 bg-white rounded-2xl shadow-xl border border-[var(--color-velor-border)] w-48 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/account" className="block px-4 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-[var(--color-velor-bg-alt)] rounded-xl transition-colors">My Account</Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-[var(--color-velor-bg-alt)] rounded-xl transition-colors">Admin Dashboard</Link>
                  )}
                  <button onClick={logout} className="w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-[var(--color-velor-bg-alt)] rounded-xl transition-colors text-red-500">Sign Out</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hover:text-[#C4A484] transition-colors"><User size={18} strokeWidth={1.5} /></Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-[var(--color-velor-border)] shadow-2xl rounded-3xl p-6 md:hidden flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4 text-[13px] uppercase tracking-[0.2em] font-bold text-[var(--color-velor-text)]">
              <Link to="/" className="py-2 border-b border-[var(--color-velor-border)]">Home</Link>
              <Link to="/shop" className="py-2 border-b border-[var(--color-velor-border)]">Shop Collection</Link>
              <Link to="/about" className="py-2 border-b border-[var(--color-velor-border)]">Our Story</Link>
              <Link to="/wishlist" className="py-2 border-b border-[var(--color-velor-border)] flex justify-between">
                Wishlist
                {wishlist.length > 0 && <span className="bg-[var(--color-velor-text)] text-white text-[10px] px-2 py-0.5 rounded-full">{wishlist.length}</span>}
              </Link>
              <Link to="/contact" className="py-2 border-b border-[var(--color-velor-border)]">Contact</Link>
              <Link to="/faq" className="py-2 border-b border-[var(--color-velor-border)]">FAQ</Link>
            </div>
            
            <div className="pt-2">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link to="/account" className="w-full text-center py-3 bg-[var(--color-velor-bg-alt)] text-[11px] uppercase tracking-widest font-bold rounded-xl transition-colors">My Account</Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="w-full text-center py-3 bg-[var(--color-velor-bg-alt)] text-[11px] uppercase tracking-widest font-bold rounded-xl transition-colors">Admin Dashboard</Link>
                  )}
                  <button onClick={logout} className="w-full text-center py-3 bg-red-50 text-red-600 text-[11px] uppercase tracking-widest font-bold rounded-xl transition-colors">Sign Out</button>
                </div>
              ) : (
                <Link to="/login" className="block w-full text-center py-3 bg-[var(--color-velor-text)] text-white text-[11px] uppercase tracking-widest font-bold rounded-xl transition-colors">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
