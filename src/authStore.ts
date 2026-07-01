import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: any[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
  login: (userData: Omit<User, 'id'>) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      orders: [],
      login: (userData) => 
        set({ 
          user: { ...userData, id: Math.random().toString(36).substr(2, 9) }, 
          isAuthenticated: true 
        }),
      logout: () => set({ user: null, isAuthenticated: false, orders: [] }),
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: 'velor-auth',
    }
  )
);
