import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [email, setEmail] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setIsTracking(true);
    }
  };

  const steps = [
    { icon: Package, title: 'Order Placed', date: 'Oct 12, 2023', time: '09:41 AM', status: 'completed', description: 'We have received your order.' },
    { icon: Clock, title: 'Processing', date: 'Oct 13, 2023', time: '02:20 PM', status: 'completed', description: 'Your items are being carefully prepared and packaged.' },
    { icon: Truck, title: 'Shipped', date: 'Oct 14, 2023', time: '08:15 AM', status: 'current', description: 'Your package is on its way with our premium courier.' },
    { icon: MapPin, title: 'Out for Delivery', date: 'Estimated: Oct 16', time: '', status: 'upcoming', description: 'Your package will arrive soon.' },
    { icon: CheckCircle, title: 'Delivered', date: '', time: '', status: 'upcoming', description: '' },
  ];

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
            Concierge Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight mb-4 text-[var(--color-velor-text)]">
            Track Your Order
          </h1>
          <p className="text-[13px] md:text-sm text-[var(--color-velor-text-light)] max-w-md mx-auto leading-relaxed">
            Enter your order number and email address to follow the journey of your Velor Studio piece.
          </p>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8">
        
        {/* Tracking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/60 backdrop-blur-xl p-6 md:p-10 rounded-[24px] shadow-sm border border-white/50 mb-12"
        >
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold block mb-2 text-[var(--color-velor-text-light)]">Order Number</label>
              <input 
                type="text" 
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--color-velor-border)] py-3 text-[14px] md:text-base focus:outline-none focus:border-[var(--color-velor-text)] transition-colors"
                placeholder="e.g. VL-9824"
              />
            </div>
            <div className="flex-1">
              <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold block mb-2 text-[var(--color-velor-text-light)]">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[var(--color-velor-border)] py-3 text-[14px] md:text-base focus:outline-none focus:border-[var(--color-velor-text)] transition-colors"
                placeholder="Associated with order"
              />
            </div>
            <div className="flex items-end mt-4 md:mt-0">
              <button 
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-[var(--color-velor-text)] text-white text-[10px] md:text-[11px] uppercase tracking-widest font-bold hover:bg-[#C4A484] transition-colors rounded-full flex items-center justify-center gap-2 shadow-xl shadow-black/5"
              >
                Track <Search size={14} />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Tracking Results */}
        <AnimatePresence>
          {isTracking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/50">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-[var(--color-velor-border)]">
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif italic mb-1">Order {orderId || 'VL-9824'}</h2>
                    <p className="text-[11px] md:text-[12px] uppercase tracking-widest text-[var(--color-velor-text-light)]">Expected Delivery: Oct 16, 2023</p>
                  </div>
                  <div className="mt-4 md:mt-0 bg-[var(--color-velor-bg-alt)] px-4 py-2 rounded-full border border-[var(--color-velor-border)]">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C4A484]">In Transit</span>
                  </div>
                </div>

                <div className="relative pl-6 md:pl-8 border-l border-[var(--color-velor-border)] space-y-12">
                  {steps.map((step, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="relative"
                    >
                      {/* Timeline Dot / Icon */}
                      <div className={`absolute -left-[39px] md:-left-[49px] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-[3px] border-white
                        ${step.status === 'completed' ? 'bg-[#C4A484] text-white shadow-md' : 
                          step.status === 'current' ? 'bg-[var(--color-velor-text)] text-white shadow-xl scale-110' : 
                          'bg-gray-100 text-gray-400'}`}
                      >
                        <step.icon size={14} className={step.status === 'current' ? 'md:w-4 md:h-4 animate-pulse' : 'md:w-4 md:h-4'} />
                      </div>
                      
                      <div className={`pl-4 ${step.status === 'upcoming' ? 'opacity-50' : 'opacity-100'}`}>
                        <div className="flex flex-col md:flex-row md:items-end gap-1 md:gap-4 mb-2">
                          <h3 className={`text-lg md:text-xl font-serif italic ${step.status === 'current' ? 'text-[var(--color-velor-text)] font-medium' : ''}`}>
                            {step.title}
                          </h3>
                          {step.date && (
                            <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-[var(--color-velor-text-light)] md:pb-1">
                              {step.date} {step.time && `• ${step.time}`}
                            </span>
                          )}
                        </div>
                        {step.description && (
                          <p className="text-[13px] text-[var(--color-velor-text-light)] max-w-md">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-[var(--color-velor-border)] flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 py-4 bg-transparent border border-[var(--color-velor-border)] text-[var(--color-velor-text)] rounded-full text-[10px] md:text-[11px] uppercase tracking-widest font-bold hover:bg-[var(--color-velor-bg-alt)] transition-colors">
                    Need Help?
                  </button>
                  <button className="flex-1 py-4 bg-transparent border border-[var(--color-velor-border)] text-[var(--color-velor-text)] rounded-full text-[10px] md:text-[11px] uppercase tracking-widest font-bold hover:bg-[var(--color-velor-bg-alt)] transition-colors">
                    View Receipt
                  </button>
                </div>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
