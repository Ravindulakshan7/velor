import React from 'react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, cart, products, updateCartQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    return {
      ...item,
      product,
      variant,
    };
  }).filter(item => item.product && item.variant);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.variant?.price || 0) * item.quantity,
    0
  );

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-[var(--color-velor-border)]">
              <h2 className="text-xl md:text-2xl font-serif italic tracking-tight">Your Bag ({cartItems.length})</h2>
              <button 
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full bg-[var(--color-velor-bg-alt)] flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[var(--color-velor-text-light)] space-y-4">
                  <p>Your bag is currently empty.</p>
                  <button onClick={() => { setCartOpen(false); navigate('/shop'); }} className="text-[11px] uppercase tracking-widest border-b border-current pb-1 hover:text-black transition-colors">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="w-20 h-28 md:w-24 md:h-32 rounded-[12px] md:rounded-[16px] overflow-hidden bg-[var(--color-velor-bg-alt)] shrink-0">
                      <img referrerPolicy="no-referrer" src={item.variant?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <Link 
                            to={`/product/${item.productId}`} 
                            onClick={() => setCartOpen(false)}
                            className="font-serif italic text-base md:text-lg hover:text-[#C4A484] transition-colors"
                          >
                            {item.product?.name}
                          </Link>
                          <button onClick={() => removeFromCart(item.variantId)} className="text-[var(--color-velor-text-light)] hover:text-red-500 transition-colors p-1 -mt-1 -mr-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-[var(--color-velor-text-muted)]">
                          {item.variant?.color} / {item.variant?.size}
                        </div>
                        <div className="text-[12px] md:text-[13px] font-medium mt-1">
                          {formatPrice(item.variant?.price || 0)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 md:gap-4 w-fit bg-[var(--color-velor-bg-alt)] rounded-full p-1 border border-[var(--color-velor-border)] mt-2">
                         <button 
                           onClick={() => updateCartQuantity(item.variantId, Math.max(1, item.quantity - 1))}
                           className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                         >
                           <Minus size={10} />
                         </button>
                         <span className="w-4 text-center text-[10px] md:text-xs">{item.quantity}</span>
                         <button 
                           onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                           className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                         >
                           <Plus size={10} />
                         </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 md:p-6 border-t border-[var(--color-velor-border)] bg-[var(--color-velor-bg-alt)]">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <span className="text-[10px] md:text-[12px] uppercase tracking-widest font-bold">Subtotal</span>
                  <span className="text-lg md:text-xl font-medium">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-[9px] md:text-[10px] text-[var(--color-velor-text-light)] mb-4 md:mb-6 text-center">Shipping & taxes calculated at checkout.</p>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 md:py-5 bg-[var(--color-velor-text)] text-white rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] transition-colors shadow-xl hover:shadow-2xl"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
