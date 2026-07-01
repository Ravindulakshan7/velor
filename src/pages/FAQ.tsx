import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long will my order take to arrive?",
        a: "All VELOR pieces are dispatched via complimentary express shipping. Delivery typically takes 2-4 business days for domestic orders and 4-7 business days for international shipments. Bespoke or made-to-order items require additional time, which will be communicated during consultation."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship globally to over 100 countries. Please note that international orders may be subject to local customs duties and taxes, which are the responsibility of the recipient."
      },
      {
        q: "Can I track my order?",
        a: "Once your order has been dispatched from our atelier, you will receive a tracking number via email. You can also view the status of your order in your VELOR account."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer complimentary returns and exchanges within 30 days of delivery. Items must be returned in their original, unworn condition with all tags and packaging intact. Bespoke and personalized items are final sale."
      },
      {
        q: "How do I initiate a return?",
        a: "To initiate a return, please log into your account and request a return authorization, or contact our Concierge team. We will provide a pre-paid return shipping label."
      }
    ]
  },
  {
    category: "Product Care & Warranty",
    questions: [
      {
        q: "How should I care for my VELOR leather goods?",
        a: "Store your leather goods in the provided dust bag away from direct sunlight and heat. Avoid contact with water, cosmetics, and abrasive surfaces. We recommend professional cleaning for stubborn stains."
      },
      {
        q: "Do your products come with a warranty?",
        a: "All VELOR timepieces and fine jewelry are accompanied by a 5-year international warranty covering manufacturing defects. Leather goods and apparel are covered for 2 years."
      }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>("Orders & Shipping-0");

  const toggleOpen = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 py-6 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif italic tracking-tight mb-4 md:mb-6 text-[var(--color-velor-text)]">Frequently Asked</h1>
        <p className="text-[13px] md:text-[14px] text-[var(--color-velor-text-light)] max-w-lg mx-auto">Find answers to common questions about our products, services, and policies.</p>
      </motion.div>

      <div className="space-y-12 md:space-y-16">
        {faqs.map((section, sIndex) => (
          <motion.div 
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: sIndex * 0.1 }}
          >
            <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-6 md:mb-8 text-[var(--color-velor-text-muted)] border-b border-[var(--color-velor-border)] pb-3 md:pb-4">{section.category}</h2>
            <div className="space-y-3 md:space-y-4">
              {section.questions.map((faq, qIndex) => {
                const id = `${section.category}-${qIndex}`;
                const isOpen = openIndex === id;
                return (
                  <div key={id} className="bg-white/60 backdrop-blur-md border border-[var(--color-velor-border)] rounded-[20px] md:rounded-[24px] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                    <button 
                      onClick={() => toggleOpen(id)}
                      className="w-full text-left px-5 md:px-8 py-5 md:py-6 flex justify-between items-center focus:outline-none"
                    >
                      <span className="font-serif italic text-lg md:text-xl text-[var(--color-velor-text)] pr-4">{faq.q}</span>
                      <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-velor-bg-alt)] flex items-center justify-center text-[var(--color-velor-text)]">
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 md:px-8 pb-5 md:pb-8 text-[13px] md:text-[14px] leading-relaxed text-[var(--color-velor-text-light)]">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 md:mt-20 text-center bg-white/60 backdrop-blur-md border border-[var(--color-velor-border)] rounded-[24px] md:rounded-[32px] p-8 md:p-12 shadow-sm">
        <h3 className="text-xl md:text-2xl font-serif italic mb-3 md:mb-4">Still have questions?</h3>
        <p className="text-[13px] md:text-[14px] text-[var(--color-velor-text-light)] mb-6 md:mb-8">Our Concierge team is available to assist you with any inquiries.</p>
        <a href="/contact" className="inline-block px-8 py-4 md:px-10 md:py-5 bg-[var(--color-velor-text)] text-white text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-full">
          Contact Concierge
        </a>
      </div>
    </div>
  );
}
