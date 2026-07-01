import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './data';

interface AppState {
  products: Product[];
  cart: CartItem[];
  wishlist: string[]; // array of product ids
  addToCart: (variantId: string, productId: string, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateCartQuantity: (variantId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  // Admin actions
  updateProductVariantPrice: (productId: string, variantId: string, newPrice: number) => void;
  updateProductVariantStock: (productId: string, variantId: string, newStock: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,
      cart: [],
      wishlist: [],
      isCartOpen: false,
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      addToCart: (variantId, productId, quantity = 1) =>
        set((state) => {
          const product = state.products.find(p => p.id === productId);
          const variant = product?.variants.find(v => v.id === variantId);
          
          if (!variant || variant.stock === 0) return state;

          const existing = state.cart.find((item) => item.variantId === variantId);
          if (existing) {
            const newQuantity = Math.min(existing.quantity + quantity, variant.stock);
            return {
              cart: state.cart.map((item) =>
                item.variantId === variantId
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { variantId, productId, quantity: Math.min(quantity, variant.stock) }] };
        }),
      removeFromCart: (variantId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.variantId !== variantId),
        })),
      updateCartQuantity: (variantId, quantity) =>
        set((state) => {
          const item = state.cart.find(i => i.variantId === variantId);
          if (!item) return state;
          
          const product = state.products.find(p => p.id === item.productId);
          const variant = product?.variants.find(v => v.id === variantId);
          if (!variant) return state;

          const newQuantity = Math.min(Math.max(1, quantity), variant.stock);

          return {
            cart: state.cart.map((cartItem) =>
              cartItem.variantId === variantId ? { ...cartItem, quantity: newQuantity } : cartItem
            ),
          };
        }),
      toggleWishlist: (productId) =>
        set((state) => {
          if (state.wishlist.includes(productId)) {
            return { wishlist: state.wishlist.filter((id) => id !== productId) };
          }
          return { wishlist: [...state.wishlist, productId] };
        }),
      clearCart: () => set({ cart: [] }),
      updateProductVariantPrice: (productId, variantId, newPrice) =>
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === productId) {
              return {
                ...p,
                variants: p.variants.map((v) =>
                  v.id === variantId ? { ...v, price: newPrice } : v
                ),
              };
            }
            return p;
          }),
        })),
      updateProductVariantStock: (productId, variantId, newStock) =>
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === productId) {
              return {
                ...p,
                variants: p.variants.map((v) =>
                  v.id === variantId ? { ...v, stock: newStock } : v
                ),
              };
            }
            return p;
          }),
        })),
    }),
    {
      name: 'velor-storage',
    }
  )
);
