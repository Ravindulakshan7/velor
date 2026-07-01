import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { motion } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { Minus, Plus, X } from 'lucide-react';

export default function Cart() {
  const { cart, products, updateCartQuantity, removeFromCart } = useStore();

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    const variant = product?.variants.find(v => v.id === item.variantId);
    return { ...item, product, variant };
  }).filter(item => item.product && item.variant);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.variant!.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-16">
        <h2 className="text-3xl font-serif italic mb-6">Your Bag is Empty</h2>
        <Link to="/shop" className="px-10 py-5 bg-[var(--color-velor-text)] text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#333] transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-16 max-w-6xl mx-auto w-full">
      <h1 className="text-3xl md:text-5xl font-serif italic tracking-tight mb-8 md:mb-12">Your Bag</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="flex-1">
          <div className="border-t border-[var(--color-velor-border)]">
            {cartItems.map((item, index) => (
              <motion.div 
                key={item.variantId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="py-6 md:py-8 border-b border-[var(--color-velor-border)] flex gap-4 md:gap-8"
              >
                <div className="w-24 h-32 md:w-32 md:h-40 bg-[var(--color-velor-bg-alt)] border border-[var(--color-velor-border)] rounded-xl md:rounded-none overflow-hidden shrink-0">
                  <img referrerPolicy="no-referrer" src={item.variant!.image} alt={item.product!.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-serif italic text-base md:text-xl mb-1 line-clamp-1">{item.product!.name}</h3>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-widest text-[var(--color-velor-text-muted)] mb-0.5 md:mb-1">
                        Color: {item.variant!.color}
                      </p>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-widest text-[var(--color-velor-text-muted)]">
                        Size: {item.variant!.size}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-[var(--color-velor-text-muted)] hover:text-[var(--color-velor-text)] transition-colors p-1 md:p-2 -mt-1 -mr-1 md:mt-0 md:mr-0 self-start"
                    >
                      <X size={16} className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4 md:mt-0">
                    <div className="flex items-center border border-[var(--color-velor-border)] rounded-full md:rounded-none overflow-hidden">
                      <button 
                        onClick={() => updateCartQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-[var(--color-velor-bg-alt)] transition-colors"
                      >
                        <Minus size={14} className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <span className="w-8 md:w-10 text-center text-[11px] md:text-[12px] font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-[var(--color-velor-bg-alt)] transition-colors"
                      >
                        <Plus size={14} className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                    <span className="text-sm md:text-lg font-medium">{formatPrice(item.variant!.price * item.quantity)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-[400px]">
          <div className="bg-[var(--color-velor-bg-alt)] p-6 md:p-8 border border-[var(--color-velor-border)] rounded-2xl md:rounded-none sticky top-24">
            <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-4 md:mb-6 border-b border-[var(--color-velor-border)] pb-3 md:pb-4">Order Summary</h3>
            
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <div className="flex justify-between text-[12px] md:text-[13px]">
                <span className="text-[var(--color-velor-text-muted)]">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[12px] md:text-[13px]">
                <span className="text-[var(--color-velor-text-muted)]">Shipping</span>
                <span className="text-[var(--color-velor-accent)] uppercase tracking-widest text-[9px] md:text-[10px] font-bold">Complimentary</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-6 md:mb-8 pt-4 md:pt-6 border-t border-[var(--color-velor-border)]">
              <span className="text-[11px] md:text-[13px] font-bold uppercase tracking-widest">Total</span>
              <span className="text-xl md:text-2xl font-serif italic">{formatPrice(subtotal)}</span>
            </div>
            
            <Link to="/checkout" className="w-full block text-center py-4 md:py-5 bg-[var(--color-velor-text)] text-white rounded-full md:rounded-none text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold hover:bg-[#333] transition-colors shadow-lg md:shadow-none">
              Checkout Securely
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
