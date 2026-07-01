import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-7xl font-serif italic tracking-tight mb-4 md:mb-6 text-[var(--color-velor-text)]">Contact Us</h1>
        <p className="text-[13px] md:text-[14px] text-[var(--color-velor-text-light)] max-w-lg mx-auto">We invite you to reach out with any inquiries regarding our collections, bespoke services, or aftercare.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-1/3 space-y-6 md:space-y-10"
        >
          <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-[var(--color-velor-border)] shadow-sm">
            <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-4 md:mb-6 text-[var(--color-velor-text)]">Client Services</h3>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-4">
                <Phone size={18} className="text-[#C4A484] shrink-0 mt-1" />
                <div>
                  <p className="font-serif italic text-base md:text-lg">+1 (800) 123-4567</p>
                  <p className="text-[11px] md:text-[12px] text-[var(--color-velor-text-light)] mt-1">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={18} className="text-[#C4A484] shrink-0 mt-1" />
                <div>
                  <p className="font-serif italic text-base md:text-lg">concierge@velor.com</p>
                  <p className="text-[11px] md:text-[12px] text-[var(--color-velor-text-light)] mt-1">We aim to reply within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-[var(--color-velor-border)] shadow-sm">
            <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-4 md:mb-6 text-[var(--color-velor-text)]">Flagship Boutique</h3>
            <div className="flex items-start gap-4">
              <MapPin size={18} className="text-[#C4A484] shrink-0 mt-1" />
              <div>
                <p className="font-serif italic text-base md:text-lg">150 Avenue des Champs-Élysées</p>
                <p className="text-[13px] md:text-[14px] text-[var(--color-velor-text)] mt-1">75008 Paris, France</p>
                <button className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mt-4 border-b border-[var(--color-velor-text)] pb-1 hover:text-[#C4A484] hover:border-[#C4A484] transition-colors flex items-center gap-2">
                  Get Directions <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full lg:w-2/3"
        >
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-16 rounded-[24px] md:rounded-[40px] border border-[var(--color-velor-border)] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4A484]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            {isSubmitted ? (
              <div className="text-center py-12 md:py-20">
                <h3 className="text-2xl md:text-3xl font-serif italic mb-4">Message Sent</h3>
                <p className="text-[13px] md:text-[14px] text-[var(--color-velor-text-light)]">Our concierge team will be in touch with you shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 md:mt-8 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold border-b border-current pb-1"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
                <h3 className="text-xl md:text-2xl font-serif italic mb-6 md:mb-8">Send an Inquiry</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <label className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-2 md:mb-3 text-[var(--color-velor-text-muted)]">First Name</label>
                    <input required type="text" className="w-full bg-white/50 border-b border-[var(--color-velor-border)] py-2 md:py-3 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-2 md:mb-3 text-[var(--color-velor-text-muted)]">Last Name</label>
                    <input required type="text" className="w-full bg-white/50 border-b border-[var(--color-velor-border)] py-2 md:py-3 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-2 md:mb-3 text-[var(--color-velor-text-muted)]">Email Address</label>
                  <input required type="email" className="w-full bg-white/50 border-b border-[var(--color-velor-border)] py-2 md:py-3 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] transition-colors" />
                </div>
                <div>
                  <label className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-2 md:mb-3 text-[var(--color-velor-text-muted)]">Inquiry Type</label>
                  <select className="w-full bg-white/50 border-b border-[var(--color-velor-border)] py-2 md:py-3 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] transition-colors appearance-none">
                    <option>Product Information</option>
                    <option>Order Status</option>
                    <option>Returns & Exchanges</option>
                    <option>Bespoke Services</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mb-2 md:mb-3 text-[var(--color-velor-text-muted)]">Message</label>
                  <textarea required rows={4} className="w-full bg-white/50 border border-[var(--color-velor-border)] rounded-2xl p-3 md:p-4 text-[13px] md:text-sm focus:outline-none focus:border-[#C4A484] transition-colors resize-none shadow-sm"></textarea>
                </div>
                <button type="submit" className="w-full py-4 md:py-5 bg-[var(--color-velor-text)] text-white rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold hover:bg-[#333] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
