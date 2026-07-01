import React from 'react';
import { motion } from 'motion/react';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../authStore';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex-1 w-full bg-[var(--color-velor-bg)] min-h-screen pb-24">
      <div className="pt-12 md:pt-20 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1.5 md:py-2 px-4 md:px-5 rounded-full border border-[var(--color-velor-border)] text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm">
            Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight mb-4 text-[var(--color-velor-text)]">
            My Account
          </h1>
          <p className="text-[13px] md:text-sm text-[var(--color-velor-text-light)] max-w-md mx-auto leading-relaxed">
            Welcome back, {user.name}.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white/60 backdrop-blur-xl p-6 rounded-[24px] shadow-sm border border-white/50"
            >
              <nav className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-velor-bg-alt)] text-[var(--color-velor-text)] font-medium text-sm">
                  <User size={16} /> Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-velor-text-light)] hover:bg-[var(--color-velor-bg-alt)] hover:text-[var(--color-velor-text)] transition-colors text-sm">
                  <Package size={16} /> Orders
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-velor-text-light)] hover:bg-[var(--color-velor-bg-alt)] hover:text-[var(--color-velor-text)] transition-colors text-sm">
                  <Heart size={16} /> Wishlist
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-velor-text-light)] hover:bg-[var(--color-velor-bg-alt)] hover:text-[var(--color-velor-text)] transition-colors text-sm">
                  <Settings size={16} /> Settings
                </button>
                <div className="h-px bg-[var(--color-velor-border)] my-4"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[24px] shadow-sm border border-white/50"
            >
              <h2 className="text-2xl font-serif italic mb-8">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold block mb-2 text-[var(--color-velor-text-light)]">Full Name</label>
                  <p className="text-sm font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold block mb-2 text-[var(--color-velor-text-light)]">Email Address</label>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>

              <h2 className="text-2xl font-serif italic mb-6 mt-12 border-t border-[var(--color-velor-border)] pt-12">Recent Orders</h2>
              {user.orders?.length > 0 ? (
                <div className="space-y-6">
                  {user.orders.map(order => (
                    <div key={order.id} className="border border-[var(--color-velor-border)] rounded-2xl p-6 bg-[var(--color-velor-bg-alt)]">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b border-[var(--color-velor-border)]">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-velor-text-light)]">Order #{order.id}</p>
                          <p className="text-sm font-medium mt-1">{order.date}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-left md:text-right">
                          <p className="text-lg font-serif italic">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total)}</p>
                          <span className="inline-block px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold bg-[#C4A484]/10 text-[#C4A484] mt-2">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {order.items.map((item: any, i: number) => (
                          <div key={i} className="flex justify-between items-center text-sm">
                            <div className="flex gap-4">
                              <span className="text-[var(--color-velor-text-light)]">{item.quantity}x</span>
                              <span>{item.name} <span className="text-[var(--color-velor-text-light)] text-xs">({item.variant})</span></span>
                            </div>
                            <span className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[var(--color-velor-bg-alt)] rounded-2xl border border-[var(--color-velor-border)] border-dashed">
                  <Package className="w-10 h-10 mx-auto text-[#C4A484] mb-4 opacity-50" />
                  <p className="text-sm text-[var(--color-velor-text-light)]">You haven't placed any orders yet.</p>
                  <button onClick={() => navigate('/shop')} className="mt-4 text-[10px] uppercase tracking-widest font-bold border-b border-[var(--color-velor-text)] pb-1 hover:text-[#C4A484] hover:border-[#C4A484] transition-colors">
                    Start Shopping
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
