import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { useAuthStore } from '../authStore';
import { formatPrice } from '../lib/utils';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export default function Checkout() {
  const { cart, products, clearCart, setCartOpen } = useStore();
  const { addOrder } = useAuthStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    const variant = product?.variants.find(v => v.id === item.variantId);
    return { ...item, product, variant };
  }).filter(item => item.product && item.variant);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.variant!.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      addOrder({
        id: `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        date: new Date().toLocaleDateString(),
        total: subtotal,
        status: 'Processing',
        items: cartItems.map(item => ({
          name: item.product!.name,
          variant: `${item.variant!.color} / ${item.variant!.size}`,
          quantity: item.quantity,
          price: item.variant!.price
        }))
      });
      clearCart();
      setIsProcessing(false);
      navigate('/success');
    }, 2000);
  };

  React.useEffect(() => {
    if (cartItems.length === 0 && !isProcessing) {
      setCartOpen(true);
      navigate('/');
    }
  }, [cartItems.length, navigate, setCartOpen, isProcessing]);

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl md:text-5xl font-serif italic tracking-tight mb-2 md:mb-4">Checkout</h1>
        <p className="text-[13px] md:text-[14px] text-[var(--color-velor-text-light)] mb-8 md:mb-12">Complete your luxury purchase.</p>
      </motion.div>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10 bg-white/50 backdrop-blur-md border border-[var(--color-velor-border)] p-6 md:p-12 rounded-[24px] md:rounded-[32px] shadow-sm">
            {/* Shipping Info */}
            <div>
              <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
                <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[var(--color-velor-text)] text-white flex items-center justify-center text-[8px] md:text-[9px]">1</span>
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <input required type="email" placeholder="Email Address" className="w-full bg-white/50 border border-[var(--color-velor-border)] rounded-xl py-3 px-4 md:py-4 md:px-5 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] focus:ring-1 focus:ring-[#C4A484] transition-all shadow-sm" />
                </div>
                <div>
                  <input required type="text" placeholder="First Name" className="w-full bg-white/50 border border-[var(--color-velor-border)] rounded-xl py-3 px-4 md:py-4 md:px-5 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] focus:ring-1 focus:ring-[#C4A484] transition-all shadow-sm" />
                </div>
                <div>
                  <input required type="text" placeholder="Last Name" className="w-full bg-white/50 border border-[var(--color-velor-border)] rounded-xl py-3 px-4 md:py-4 md:px-5 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] focus:ring-1 focus:ring-[#C4A484] transition-all shadow-sm" />
                </div>
                <div className="md:col-span-2">
                  <input required type="text" placeholder="Address" className="w-full bg-white/50 border border-[var(--color-velor-border)] rounded-xl py-3 px-4 md:py-4 md:px-5 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] focus:ring-1 focus:ring-[#C4A484] transition-all shadow-sm" />
                </div>
                <div>
                  <input required type="text" placeholder="City" className="w-full bg-white/50 border border-[var(--color-velor-border)] rounded-xl py-3 px-4 md:py-4 md:px-5 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] focus:ring-1 focus:ring-[#C4A484] transition-all shadow-sm" />
                </div>
                <div>
                  <input required type="text" placeholder="Postal Code" className="w-full bg-white/50 border border-[var(--color-velor-border)] rounded-xl py-3 px-4 md:py-4 md:px-5 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] focus:ring-1 focus:ring-[#C4A484] transition-all shadow-sm" />
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-[var(--color-velor-border)] my-8 md:my-10"></div>

            {/* Payment Info */}
            <div>
              <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
                <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[var(--color-velor-text)] text-white flex items-center justify-center text-[8px] md:text-[9px]">2</span>
                Payment Details
              </h2>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <input required type="text" placeholder="Card Number" className="w-full bg-white/50 border border-[var(--color-velor-border)] rounded-xl py-3 px-4 md:py-4 md:px-5 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] focus:ring-1 focus:ring-[#C4A484] transition-all shadow-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <input required type="text" placeholder="MM/YY" className="w-full bg-white/50 border border-[var(--color-velor-border)] rounded-xl py-3 px-4 md:py-4 md:px-5 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] focus:ring-1 focus:ring-[#C4A484] transition-all shadow-sm" />
                  <input required type="text" placeholder="CVC" className="w-full bg-white/50 border border-[var(--color-velor-border)] rounded-xl py-3 px-4 md:py-4 md:px-5 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] focus:ring-1 focus:ring-[#C4A484] transition-all shadow-sm" />
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-8">
              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full py-4 md:py-5 bg-[var(--color-velor-text)] text-white rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold hover:bg-[#333] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2 md:gap-3"
              >
                {isProcessing ? 'Processing...' : (
                  <>
                    <ShoppingBag size={14} className="w-3 h-3 md:w-4 md:h-4" />
                    Pay {formatPrice(subtotal)}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
        
        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full lg:w-[450px]"
        >
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-[var(--color-velor-border)] shadow-xl sticky top-32">
            <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-4 md:mb-6 flex items-center justify-between md:justify-start gap-3">
              Order Summary
              <span className="bg-[var(--color-velor-bg-alt)] px-2 py-1 rounded-full text-[8px] md:text-[9px]">{cartItems.length} Items</span>
            </h3>
            
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8 max-h-[40vh] md:max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.variantId} className="flex gap-3 md:gap-4 p-2 md:p-3 hover:bg-[var(--color-velor-bg-alt)] rounded-xl md:rounded-2xl transition-colors">
                  <div className="w-16 h-20 md:w-20 md:h-24 bg-[var(--color-velor-bg-alt)] rounded-lg md:rounded-xl overflow-hidden shrink-0 border border-[var(--color-velor-border)]">
                    <img referrerPolicy="no-referrer" src={item.variant!.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-serif italic text-base md:text-lg text-[var(--color-velor-text)]">{item.product!.name}</h4>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[var(--color-velor-text-muted)] mt-1">{item.variant!.color} / {item.variant!.size} <span className="lowercase">x{item.quantity}</span></p>
                    <p className="text-[12px] md:text-[13px] font-medium mt-1 md:mt-2">{formatPrice(item.variant!.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 pt-4 md:pt-6 border-t border-[var(--color-velor-border)]">
              <div className="flex justify-between text-[12px] md:text-[13px]">
                <span className="text-[var(--color-velor-text-light)]">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[12px] md:text-[13px]">
                <span className="text-[var(--color-velor-text-light)]">Shipping</span>
                <span className="text-[#C4A484] uppercase tracking-widest text-[9px] md:text-[10px] font-bold">Complimentary</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end pt-4 md:pt-6 border-t border-[var(--color-velor-border)] bg-[var(--color-velor-bg-alt)] -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-6 md:p-8 rounded-b-[24px] md:rounded-b-[32px]">
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-velor-text)]">Total</span>
              <span className="text-2xl md:text-3xl font-serif italic">{formatPrice(subtotal)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
