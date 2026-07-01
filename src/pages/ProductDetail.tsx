import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { Heart, Minus, Plus, Maximize2 } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, wishlist, toggleWishlist } = useStore();
  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  if (!product) {
    return <div className="p-16 text-center">Product not found. <Link to="/shop" className="underline">Go back to shop</Link></div>;
  }

  // Get unique colors and sizes
  const colors = Array.from(new Set(product.variants.map(v => v.color)));
  
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');
  
  // Available sizes for the selected color
  const availableSizes = Array.from(new Set(
    product.variants.filter(v => v.color === selectedColor).map(v => v.size)
  ));
  
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || '');

  // Ensure selected size is valid for selected color
  React.useEffect(() => {
    if (!availableSizes.includes(selectedSize) && availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    }
  }, [selectedColor, availableSizes, selectedSize]);

  const selectedVariant = product.variants.find(
    v => v.color === selectedColor && v.size === selectedSize
  );

  const price = selectedVariant ? selectedVariant.price : product.basePrice;
  const mainImage = selectedVariant ? selectedVariant.image : product.featuredImage;
  
  // Create a mock gallery by repeating the image or using variants
  const galleryImages = [
    mainImage,
    ...product.variants.filter(v => v.image !== mainImage).map(v => v.image),
    product.featuredImage
  ].slice(0, 4);

  const [activeImage, setActiveImage] = useState(mainImage);

  React.useEffect(() => {
    setActiveImage(mainImage);
  }, [mainImage]);

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(selectedVariant.id, product.id, quantity);
      // Optional: Could trigger cart drawer open here
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    imageRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
        
        {/* Product Gallery (Left) */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 md:gap-6 h-[450px] sm:h-[600px] md:h-[700px]">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 no-scrollbar pb-2 md:pb-0">
            {galleryImages.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`w-16 h-20 sm:w-20 sm:h-24 md:w-full md:h-32 rounded-[16px] md:rounded-[20px] overflow-hidden border-2 transition-all duration-300 shrink-0 ${activeImage === img ? 'border-[#C4A484]' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img referrerPolicy="no-referrer" src={img} className="w-full h-full object-cover" alt={`${product.name} view ${i + 1}`} />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <div 
            className="flex-1 bg-[var(--color-velor-bg-alt)] rounded-[24px] md:rounded-[40px] overflow-hidden relative cursor-crosshair group shadow-sm border border-[var(--color-velor-border)]"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => { setIsZoomed(false); if (imageRef.current) imageRef.current.style.transformOrigin = 'center center'; }}
            onMouseMove={handleMouseMove}
          >
            <AnimatePresence mode="wait">
              <motion.img referrerPolicy="no-referrer"
                key={activeImage}
                ref={imageRef}
                src={activeImage}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`w-full h-full object-cover transition-transform duration-200 ease-out ${isZoomed ? 'scale-[2]' : 'scale-100'}`}
              />
            </AnimatePresence>
            
            <button className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-velor-text)] hover:bg-white transition-colors pointer-events-none opacity-0 group-hover:opacity-100 duration-300">
              <Maximize2 size={16} className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Product Details & Configuration (Right) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-2 md:py-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-[#C4A484]">{product.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif italic tracking-tight mb-3 md:mb-4">{product.name}</h1>
            <div className="text-xl md:text-2xl font-light text-[var(--color-velor-text)] mb-6 md:mb-8">
              {formatPrice(price)}
            </div>
            
            <p className="text-[13px] md:text-[14px] leading-relaxed text-[var(--color-velor-text-light)] mb-8 md:mb-10 max-w-lg">
              {product.description}
            </p>

            <div className="space-y-6 md:space-y-8 bg-white/50 backdrop-blur-sm border border-[var(--color-velor-border)] p-6 md:p-8 rounded-[24px] md:rounded-[32px] mb-8 md:mb-10 shadow-sm">
              {/* Color Selection */}
              <div>
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--color-velor-text-muted)]">Color</span>
                  <span className="text-[11px] md:text-[12px] font-medium">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {colors.map((color) => {
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`h-10 px-4 md:h-12 md:px-6 rounded-full border text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-300 ${
                          isSelected 
                            ? 'border-[#C4A484] bg-[#C4A484] text-white shadow-md' 
                            : 'border-[var(--color-velor-border)] bg-white text-[var(--color-velor-text)] hover:border-[var(--color-velor-text-muted)] hover:bg-[var(--color-velor-bg-alt)]'
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--color-velor-text-muted)]">Size</span>
                  <button className="text-[10px] md:text-[11px] underline text-[var(--color-velor-text-light)] hover:text-[var(--color-velor-text)] transition-colors">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {availableSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[40px] h-10 px-3 md:min-w-[48px] md:h-12 md:px-4 rounded-full border text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center ${
                          isSelected
                            ? 'border-[var(--color-velor-text)] bg-[var(--color-velor-text)] text-white shadow-md'
                            : 'border-[var(--color-velor-border)] bg-white text-[var(--color-velor-text)] hover:border-[var(--color-velor-text-muted)] hover:bg-[var(--color-velor-bg-alt)]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                 <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold block mb-3 md:mb-4 text-[var(--color-velor-text-muted)]">Quantity</span>
                 <div className="flex items-center gap-3 md:gap-4 w-fit bg-white border border-[var(--color-velor-border)] rounded-full p-1 shadow-sm">
                   <button 
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-velor-bg-alt)] transition-colors text-[var(--color-velor-text-light)] hover:text-[var(--color-velor-text)]"
                   >
                     <Minus size={14} className="w-3 h-3 md:w-4 md:h-4" />
                   </button>
                   <span className="w-6 md:w-8 text-center text-xs md:text-sm font-medium">{quantity}</span>
                   <button 
                     onClick={() => setQuantity(quantity + 1)}
                     className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-velor-bg-alt)] transition-colors text-[var(--color-velor-text-light)] hover:text-[var(--color-velor-text)]"
                   >
                     <Plus size={14} className="w-3 h-3 md:w-4 md:h-4" />
                   </button>
                 </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 md:gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className="flex-1 py-4 md:py-5 bg-[var(--color-velor-text)] text-white rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#333] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {selectedVariant && selectedVariant.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                  wishlist.includes(product.id)
                    ? 'border-[#C4A484] bg-[#C4A484]/10 text-[#C4A484]'
                    : 'border-[var(--color-velor-border)] bg-white text-[var(--color-velor-text)] hover:border-[var(--color-velor-text-muted)] hover:bg-[var(--color-velor-bg-alt)]'
                }`}
              >
                <Heart size={20} className={`w-4 h-4 md:w-5 md:h-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
              </button>
            </div>
            
            {selectedVariant && (
              <div className="mt-4 md:mt-6 text-center text-[10px] md:text-[11px] text-[var(--color-velor-text-light)]">
                {selectedVariant.stock > 0 ? `Ships in 1-2 business days.` : 'Currently unavailable.'}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Product Details Tabs (Reviews, etc.) */}
      <div className="mt-20 md:mt-32 pt-10 md:pt-16 border-t border-[var(--color-velor-border)]">
        <h2 className="text-2xl md:text-3xl font-serif italic tracking-tight mb-8 md:mb-12 text-center">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {[
            { id: 1, name: "Alexandra P.", rating: 5, date: "October 12, 2023", text: "Absolutely stunning quality. The craftsmanship is evident in every detail. It has quickly become my daily essential." },
            { id: 2, name: "Marcus T.", rating: 5, date: "September 28, 2023", text: "Exceeded my expectations. The material feels premium and the fit is perfect. Highly recommend Velor Studio." }
          ].map(review => (
            <div key={review.id} className="bg-white/40 backdrop-blur-sm p-6 md:p-8 rounded-[24px] border border-white shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium text-[var(--color-velor-text)]">{review.name}</h4>
                  <p className="text-[10px] text-[var(--color-velor-text-light)] mt-1 uppercase tracking-wider">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-[#C4A484] text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-[var(--color-velor-text-light)]">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20 md:mt-32">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-serif italic tracking-tight">You May Also Like</h2>
          <Link to="/shop" className="text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-[var(--color-velor-text)] hover:text-[#C4A484] transition-colors pb-1 border-b border-[var(--color-velor-text)] hover:border-[#C4A484]">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map((relatedProduct) => (
            <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="group block">
              <div className="relative aspect-[3/4] rounded-[20px] md:rounded-[32px] overflow-hidden mb-4 bg-[var(--color-velor-bg-alt)] shadow-sm">
                <img referrerPolicy="no-referrer" src={relatedProduct.featuredImage} alt={relatedProduct.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" loading="lazy" />
              </div>
              <div className="px-2">
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-[#C4A484] mb-1 md:mb-2">{relatedProduct.category}</div>
                <h3 className="font-serif italic text-base md:text-lg text-[var(--color-velor-text)] group-hover:opacity-70 transition-opacity mb-1">{relatedProduct.name}</h3>
                <div className="text-sm font-light text-[var(--color-velor-text)]">{formatPrice(relatedProduct.basePrice)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
