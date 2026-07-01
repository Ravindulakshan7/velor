import React from 'react';
import { motion } from 'motion/react';

export default function Terms() {
  return (
    <div className="flex-1 w-full bg-[var(--color-velor-bg)] min-h-screen pb-24">
      <div className="pt-12 md:pt-20 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1.5 md:py-2 px-4 md:px-5 rounded-full border border-[var(--color-velor-border)] text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight mb-4 text-[var(--color-velor-text)]">
            Terms of Service
          </h1>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[24px] shadow-sm border border-white/50 space-y-8 text-sm text-[var(--color-velor-text-light)] leading-relaxed"
        >
          <section>
            <h2 className="text-xl font-serif italic text-[var(--color-velor-text)] mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the Velor Studio website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif italic text-[var(--color-velor-text)] mb-4">2. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Velor Studio and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif italic text-[var(--color-velor-text)] mb-4">3. Purchases and Payment</h2>
            <p>If you wish to purchase any product made available through the Service, you may be asked to supply certain information relevant to your Purchase including your credit card number, expiration date, and billing address. We reserve the right to refuse or cancel your order at any time for certain reasons including product availability or errors in pricing.</p>
          </section>

          <section>
            <h2 className="text-xl font-serif italic text-[var(--color-velor-text)] mb-4">4. Limitation of Liability</h2>
            <p>In no event shall Velor Studio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
