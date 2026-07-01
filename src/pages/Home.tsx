import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { ArrowRight, Star, ShieldCheck, Truck, RefreshCw, Instagram, Heart } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ProductSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-md rounded-[20px] md:rounded-[32px] p-2 md:p-4 shadow-sm animate-pulse h-full flex flex-col">
    <div className="w-full aspect-[4/5] rounded-[16px] md:rounded-[24px] bg-[var(--color-velor-bg-alt)] mb-4 md:mb-6 shrink-0"></div>
    <div className="px-2 pb-2 md:px-2 md:pb-3 flex flex-col justify-end flex-1">
      <div className="h-4 bg-[var(--color-velor-bg-alt)] rounded w-3/4 mx-auto mb-2 md:mb-3"></div>
      <div className="h-4 bg-[var(--color-velor-bg-alt)] rounded w-1/2 mx-auto"></div>
    </div>
  </div>
);

export default function Home() {
  const { products, wishlist, toggleWishlist } = useStore();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate luxury loading state
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto w-full bg-[var(--color-velor-bg)]">
      <div className="max-w-[1440px] mx-auto pb-20 md:pb-24">
        
        {/* 1. Luxury Hero (Parallax & Overlapping Cards) */}
        <section className="relative px-0 lg:px-6 pt-0 lg:pt-12 pb-16 md:pb-32 flex flex-col lg:flex-row items-center gap-0 lg:gap-20 overflow-hidden">
          
          <div className="w-full lg:w-1/2 z-30 text-center lg:text-left order-2 lg:order-1 relative px-6 lg:px-0 mt-8 lg:mt-0">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <span className="inline-block py-1.5 md:py-2 px-4 md:px-5 rounded-full border border-[var(--color-velor-border)] bg-transparent text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8 shadow-sm">
                Velor Studio Collection
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic tracking-tight leading-[1.05] mb-4 md:mb-6 text-[var(--color-velor-text)]">
                Redefining <br className="hidden md:block" />Modern Elegance
              </h1>
              <p className="text-[13px] sm:text-sm md:text-base text-[var(--color-velor-text-light)] max-w-md mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed">
                Discover an uncompromising approach to luxury. Precision-engineered timepieces, fine jewelry, and tailored apparel designed for the modern connoisseur.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 lg:gap-4">
                <Link to="/shop" className="px-8 py-4 bg-[var(--color-velor-text)] text-white rounded-full text-[10px] md:text-[11px] uppercase tracking-widest font-bold hover:bg-[#C4A484] hover:text-white transition-all duration-300 hover:shadow-2xl hover:shadow-[#C4A484]/20 flex items-center justify-center gap-2 group w-full sm:w-auto">
                  Discover Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/shop" className="px-8 py-4 bg-transparent border border-[var(--color-velor-border)] text-[var(--color-velor-text)] rounded-full text-[10px] md:text-[11px] uppercase tracking-widest font-bold hover:bg-[var(--color-velor-bg-alt)] transition-all duration-300 flex items-center justify-center w-full sm:w-auto">
                  View Lookbook
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 relative h-[450px] sm:h-[550px] md:h-[700px] flex items-center justify-center order-1 lg:order-2 mt-0 lg:mt-0">
            {/* Parallax Background Card */}
            <motion.div 
              style={{ y: heroY }}
              className="absolute right-0 top-0 w-full lg:w-3/4 h-[85%] md:h-[80%] rounded-b-[40px] lg:rounded-[40px] overflow-hidden shadow-2xl"
            >
              <motion.img referrerPolicy="no-referrer" 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                alt="Luxury Fashion"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-velor-bg)] via-black/10 to-transparent lg:bg-black/10 lg:bg-none"></div>
            </motion.div>
            
            {/* Overlapping Foreground Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-4 lg:left-0 bottom-4 lg:bottom-10 w-[60%] sm:w-[50%] lg:w-2/3 h-[55%] lg:h-[60%] rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl border-[2px] md:border-[6px] border-[var(--color-velor-bg)] group"
            >
              <img referrerPolicy="no-referrer" 
                src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2000&auto=format&fit=crop" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Watch Collection"
              />
            </motion.div>
            
            {/* Floating Glass Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="absolute top-1/2 left-[55%] lg:left-1/4 -translate-y-1/2 -translate-x-1/2 lg:translate-x-0 bg-white/80 backdrop-blur-xl border border-white/40 p-3 md:p-4 rounded-[20px] md:rounded-3xl shadow-xl flex items-center gap-3 md:gap-4 z-20 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop" className="w-full h-full object-cover" alt="New Arrival" />
              </div>
              <div className="pr-1 md:pr-2 whitespace-nowrap">
                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-[#C4A484] mb-0.5 md:mb-1">Just Landed</p>
                <p className="font-serif italic text-sm md:text-base">Chronos Noir</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. Trust Section */}
        <section className="px-4 md:px-6 py-8 md:py-10 mb-16 md:mb-20 max-w-6xl mx-auto">
          <FadeUp>
            <div className="bg-white/50 backdrop-blur-lg border border-[var(--color-velor-border)] rounded-[24px] md:rounded-[32px] p-6 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 shadow-sm">
              <div className="flex items-center gap-4 text-[var(--color-velor-text)] w-full md:w-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--color-velor-bg-alt)] flex items-center justify-center text-[#C4A484] shrink-0">
                  <Truck size={20} strokeWidth={1.5} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold mb-1">Complimentary Shipping</h4>
                  <p className="text-[11px] md:text-[12px] text-[var(--color-velor-text-light)]">On all orders over $500</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-[var(--color-velor-border)]"></div>
              <div className="w-full h-px bg-[var(--color-velor-border)] md:hidden"></div>
              <div className="flex items-center gap-4 text-[var(--color-velor-text)] w-full md:w-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--color-velor-bg-alt)] flex items-center justify-center text-[#C4A484] shrink-0">
                  <RefreshCw size={20} strokeWidth={1.5} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold mb-1">Complimentary Returns</h4>
                  <p className="text-[11px] md:text-[12px] text-[var(--color-velor-text-light)]">Within 30 days of purchase</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-[var(--color-velor-border)]"></div>
              <div className="w-full h-px bg-[var(--color-velor-border)] md:hidden"></div>
              <div className="flex items-center gap-4 text-[var(--color-velor-text)] w-full md:w-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--color-velor-bg-alt)] flex items-center justify-center text-[#C4A484] shrink-0">
                  <ShieldCheck size={20} strokeWidth={1.5} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold mb-1">Secure Checkout</h4>
                  <p className="text-[11px] md:text-[12px] text-[var(--color-velor-text-light)]">Encrypted & protected</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* 3. Categories (Circular Cards) */}
        <section className="px-4 md:px-6 py-16 md:py-24 bg-white rounded-[32px] md:rounded-[40px] mx-4 mb-16 md:mb-24 shadow-sm border border-[var(--color-velor-border)] overflow-hidden">
          <FadeUp>
            <div className="text-center mb-12 md:mb-20">
              <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-[#C4A484] mb-3 md:mb-4">The Essentials</span>
              <h2 className="text-3xl md:text-5xl font-serif italic mb-3 md:mb-4">Shop by Category</h2>
              <p className="text-[13px] md:text-sm text-[var(--color-velor-text-light)] max-w-md mx-auto">Curated collections designed for the discerning individual.</p>
            </div>
          </FadeUp>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Watches', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2000&auto=format&fit=crop' },
              { name: 'Rings', img: 'https://images.unsplash.com/photo-1605100804763-247f66156553?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Apparel', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2000&auto=format&fit=crop' },
              { name: 'Accessories', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2000&auto=format&fit=crop' }
            ].map((cat, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <Link to="/shop" className="group flex flex-col items-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full overflow-hidden mb-4 md:mb-8 shadow-md group-hover:shadow-2xl transition-all duration-700 relative border border-[var(--color-velor-border)]">
                    <img referrerPolicy="no-referrer" src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-700"></div>
                  </div>
                  <span className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-bold group-hover:text-[#C4A484] transition-colors">{cat.name}</span>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* 4. Best Sellers (Rounded Glass Cards) */}
        <section className="px-4 md:px-6 py-8 md:py-12 mb-16 md:mb-24 max-w-7xl mx-auto">
          <FadeUp>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-16 gap-6">
              <div>
                <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-[#C4A484] mb-3 md:mb-4">Curated Selection</span>
                <h2 className="text-3xl md:text-5xl font-serif italic mb-2">Iconic Pieces</h2>
                <p className="text-[13px] md:text-sm text-[var(--color-velor-text-light)]">Our most sought-after designs, timeless and elegant.</p>
              </div>
              <Link to="/shop" className="flex text-[10px] md:text-[11px] uppercase tracking-widest font-bold items-center gap-2 hover:text-[#C4A484] transition-colors group border-b border-current pb-1 sm:border-0 sm:pb-0">
                View Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeUp>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence>
              {isLoading ? (
                Array(4).fill(0).map((_, i) => <ProductSkeleton key={`skel-${i}`} />)
              ) : (
                products.slice(0, 4).map((product, i) => (
                  <FadeUp key={product.id} delay={i * 0.1}>
                    <Link to={`/product/${product.id}`} className="group block h-full">
                      <div className="bg-white/80 backdrop-blur-md rounded-[20px] md:rounded-[32px] p-2 md:p-4 shadow-sm hover:shadow-2xl transition-all duration-700 group-hover:-translate-y-1 md:group-hover:-translate-y-2 h-full flex flex-col">
                        <div className="w-full aspect-[4/5] rounded-[16px] md:rounded-[24px] overflow-hidden relative mb-4 md:mb-6 bg-[var(--color-velor-bg-alt)] shrink-0">
                          <img referrerPolicy="no-referrer" src={product.featuredImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" loading="lazy" />
                          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/80 backdrop-blur-md px-2 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold shadow-sm">
                            {product.category}
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              toggleWishlist(product.id);
                            }}
                            className="absolute top-2 right-2 md:top-4 md:right-4 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 hover:bg-white transition-all duration-300 z-10"
                          >
                            <Heart size={14} className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-[var(--color-velor-text)]'}`} />
                          </button>
                          
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700"></div>
                        </div>
                        <div className="px-2 pb-2 md:px-2 md:pb-3 text-center flex flex-col justify-end flex-1">
                          <h3 className="font-serif italic text-base md:text-xl mb-1 md:mb-2 group-hover:text-[#C4A484] transition-colors line-clamp-1">{product.name}</h3>
                          <p className="text-[12px] md:text-sm font-medium text-[var(--color-velor-text-light)]">{formatPrice(product.basePrice)}</p>
                        </div>
                      </div>
                    </Link>
                  </FadeUp>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 5. Featured Collection / Lookbook (Full Width Rounded) */}
        <section className="px-4 md:px-6 mb-16 md:mb-24">
          <FadeUp>
            <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden h-[500px] md:h-[700px] flex items-center shadow-2xl group">
              <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-1000"></div>
              
              <div className="relative z-10 p-8 md:p-24 max-w-2xl text-white">
                <FadeUp delay={0.2}>
                  <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8 font-bold">The Ivory Collection</span>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <h2 className="text-4xl md:text-7xl font-serif italic mb-4 md:mb-6 leading-tight">Sublime <br/>Details</h2>
                </FadeUp>
                <FadeUp delay={0.4}>
                  <p className="text-white/90 text-[13px] md:text-base mb-8 md:mb-10 leading-relaxed max-w-sm md:max-w-md font-light">
                    Our new collection embraces the raw beauty of natural materials, elevated through meticulous craftsmanship and avant-garde silhouettes.
                  </p>
                </FadeUp>
                <FadeUp delay={0.5}>
                  <Link to="/collections" className="inline-block px-8 py-4 md:px-10 md:py-5 bg-white text-black rounded-full text-[10px] md:text-[11px] uppercase tracking-widest font-bold hover:bg-[#C4A484] hover:text-white transition-colors duration-300 shadow-xl">
                    Explore Editorial
                  </Link>
                </FadeUp>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* New Arrivals */}
        <section className="px-4 md:px-6 py-8 md:py-12 mb-16 md:mb-24 max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-10 md:mb-16">
              <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-[#C4A484] mb-3 md:mb-4">Latest Additions</span>
              <h2 className="text-3xl md:text-5xl font-serif italic mb-3 md:mb-4">New Arrivals</h2>
              <p className="text-[13px] md:text-sm text-[var(--color-velor-text-light)]">Discover the newest pieces in our collection.</p>
            </div>
          </FadeUp>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <AnimatePresence>
              {isLoading ? (
                Array(3).fill(0).map((_, i) => <div className={`${i === 2 ? 'hidden md:block' : ''}`} key={`new-skel-${i}`}><ProductSkeleton /></div>)
              ) : (
                products.slice(1, 4).map((product, i) => (
                  <FadeUp key={`new-${product.id}`} delay={i * 0.1} className={`${i === 2 ? 'hidden md:block' : ''}`}>
                    <Link to={`/product/${product.id}`} className="group block h-full">
                      <div className="bg-white/80 backdrop-blur-md rounded-[20px] md:rounded-[32px] p-2 md:p-4 shadow-sm hover:shadow-2xl transition-all duration-700 group-hover:-translate-y-1 md:group-hover:-translate-y-2 h-full flex flex-col">
                        <div className="w-full aspect-square rounded-[16px] md:rounded-[24px] overflow-hidden relative mb-4 md:mb-6 shrink-0">
                          <img referrerPolicy="no-referrer" src={product.featuredImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" loading="lazy" />
                          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#C4A484] text-white px-2 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold shadow-sm">
                            New
                          </div>
                        </div>
                        <div className="px-2 pb-2 md:px-2 md:pb-3 text-center flex flex-col justify-end flex-1">
                          <h3 className="font-serif italic text-base md:text-lg mb-1 md:mb-2 group-hover:text-[#C4A484] transition-colors line-clamp-1">{product.name}</h3>
                          <p className="text-[12px] md:text-sm font-medium text-[var(--color-velor-text-light)]">{formatPrice(product.basePrice)}</p>
                        </div>
                      </div>
                    </Link>
                  </FadeUp>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* 6. Testimonials (Glass Cards) */}
        <section className="py-16 md:py-24 bg-[var(--color-velor-bg-alt)] rounded-[32px] md:rounded-[40px] mx-4 mb-16 md:mb-24 px-6 relative overflow-hidden shadow-sm border border-[var(--color-velor-border)]">
          {/* Abstract Background Elements */}
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/60 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#C4A484]/20 rounded-full blur-[60px] md:blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <FadeUp>
              <div className="text-center mb-12 md:mb-20">
                <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-[#C4A484] mb-3 md:mb-4">Client Reverie</span>
                <h2 className="text-3xl md:text-5xl font-serif italic mb-4">Distinguished Patrons</h2>
              </div>
            </FadeUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { text: "The Chronos Noir exceeds all expectations. The weight, the brushed finish, and the subtle elegance make it my daily essential.", author: "Alexander M.", role: "Architect" },
                { text: "Impeccable craftsmanship. The Aurelia Band catches the light beautifully. A true testament to minimalist luxury.", author: "Sophia L.", role: "Art Director" },
                { text: "The Cashmere Overcoat drapes perfectly. It is rare to find such attention to detail and fabric quality in modern menswear.", author: "Julian H.", role: "Creative Director" }
              ].map((review, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[24px] md:rounded-[32px] border border-white/80 shadow-lg flex flex-col justify-between h-full hover:-translate-y-2 transition-transform duration-500">
                    <div>
                      <div className="flex gap-1 mb-6 md:mb-8 text-[#C4A484]">
                        {[...Array(5)].map((_, j) => <Star key={j} size={14} className="md:w-4 md:h-4" fill="currentColor" />)}
                      </div>
                      <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--color-velor-text)] font-serif italic mb-8 md:mb-10">"{review.text}"</p>
                    </div>
                    <div>
                      <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--color-velor-text)]">{review.author}</div>
                      <div className="text-[9px] md:text-[10px] text-[var(--color-velor-text-light)] mt-1">{review.role}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Instagram Gallery */}
        <section className="px-4 md:px-6 mb-16 md:mb-24 max-w-7xl mx-auto">
          <FadeUp>
            <div className="flex flex-col items-center mb-10 md:mb-16">
              <Instagram size={24} strokeWidth={1} className="mb-4 md:mb-6 md:w-8 md:h-8 text-[var(--color-velor-text-light)]" />
              <h2 className="text-2xl md:text-4xl font-serif italic mb-2">@velorstudio</h2>
              <p className="text-[13px] md:text-sm text-[var(--color-velor-text-light)]">Follow our journey on Instagram</p>
            </div>
          </FadeUp>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {[
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1550614000-4b95d4ebf5eb?q=80&w=1964&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2193&auto=format&fit=crop"
            ].map((img, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <a href="#" className="block w-full aspect-square rounded-[16px] md:rounded-[24px] overflow-hidden relative group shadow-sm">
                  <img referrerPolicy="no-referrer" src={img} alt="Instagram post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* 7. Newsletter */}
        <section className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <FadeUp>
            <div className="bg-white p-8 sm:p-12 md:p-24 rounded-[32px] md:rounded-[40px] shadow-2xl border border-[var(--color-velor-border)] relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 md:w-96 md:h-96 bg-[#C4A484]/10 rounded-full blur-[60px] md:blur-[80px]"></div>
              <div className="relative z-10">
                <span className="block text-4xl md:text-6xl font-serif italic text-[#C4A484] opacity-30 mb-6 md:mb-8">V</span>
                <h2 className="text-3xl md:text-5xl font-serif italic mb-4 md:mb-6">Join the Inner Circle</h2>
                <p className="text-[13px] md:text-sm text-[var(--color-velor-text-light)] mb-8 md:mb-12 max-w-md mx-auto leading-relaxed">
                  Subscribe to receive exclusive access to new releases, private sales, and curated editorial content.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto w-full">
                  <input type="email" placeholder="Enter your email address" className="flex-1 bg-[var(--color-velor-bg-alt)] border border-[var(--color-velor-border)] rounded-full px-6 py-4 md:px-8 md:py-5 text-[13px] md:text-sm focus:outline-none focus:border-[var(--color-velor-text)] transition-colors shadow-inner" />
                  <button className="px-8 py-4 md:px-10 md:py-5 bg-[var(--color-velor-text)] text-white rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#C4A484] transition-colors duration-300 whitespace-nowrap shadow-xl">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </FadeUp>
        </section>

      </div>
    </div>
  );
}
