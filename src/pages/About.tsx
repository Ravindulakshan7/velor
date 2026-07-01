import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 h-[400px] md:h-[600px] rounded-[24px] md:rounded-[40px] overflow-hidden relative shadow-2xl"
        >
          <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1596489389945-8f7d98344445?q=80&w=2070&auto=format&fit=crop" alt="VELOR Atelier" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-1 md:mb-2">Our Atelier</p>
            <p className="font-serif italic text-xl md:text-2xl">Milan, Italy</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 space-y-6 md:space-y-8"
        >
          <h1 className="text-4xl md:text-7xl font-serif italic tracking-tight text-[var(--color-velor-text)]">Our Story</h1>
          <div className="w-12 md:w-16 h-px bg-[#C4A484]"></div>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--color-velor-text)]">
            VELOR was born from a singular vision: to create objects of enduring beauty that transcend seasonal trends. Our design philosophy is rooted in the interplay between architectural minimalism and timeless elegance.
          </p>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--color-velor-text-light)]">
            Every piece in our collection is meticulously crafted by master artisans who have dedicated their lives to the pursuit of perfection. We source only the finest materials, ensuring that each creation not only looks extraordinary but feels profound.
          </p>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--color-velor-text-light)]">
            We believe that true luxury is quiet. It doesn't shout; it resonates. It is found in the weight of solid gold, the drape of pure cashmere, and the precision of a master watchmaker's hands. Welcome to the world of VELOR.
          </p>
          
          <div className="pt-4 md:pt-8">
            <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-4 md:mb-6 text-[var(--color-velor-text)]">Our Core Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h4 className="font-serif italic text-base md:text-lg mb-1 md:mb-2">Craftsmanship</h4>
                <p className="text-[12px] md:text-[13px] text-[var(--color-velor-text-light)]">Uncompromising attention to detail in every stitch and setting.</p>
              </div>
              <div>
                <h4 className="font-serif italic text-base md:text-lg mb-1 md:mb-2">Heritage</h4>
                <p className="text-[12px] md:text-[13px] text-[var(--color-velor-text-light)]">Honoring traditional techniques while embracing modern design.</p>
              </div>
              <div>
                <h4 className="font-serif italic text-base md:text-lg mb-1 md:mb-2">Sustainability</h4>
                <p className="text-[12px] md:text-[13px] text-[var(--color-velor-text-light)]">Ethically sourced materials and responsible production methods.</p>
              </div>
              <div>
                <h4 className="font-serif italic text-base md:text-lg mb-1 md:mb-2">Exclusivity</h4>
                <p className="text-[12px] md:text-[13px] text-[var(--color-velor-text-light)]">Limited production runs ensuring the uniqueness of each piece.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
