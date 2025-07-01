'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRightIcon, PlayIcon, StarIcon } from '@heroicons/react/24/solid';
import { ShoppingBagIcon, SparklesIcon, TruckIcon, ShieldCheckIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist: addToWishlistContext } = useWishlist();

  // Demo product data
  const demoProduct = {
    id: 'demo-template',
    name: 'Premium Template',
    price: 99,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    description: 'Professional eCommerce solution with modern design'
  };

  const handleAddToCart = () => {
    addToCart({
      id: demoProduct.id,
      name: demoProduct.name,
      price: demoProduct.price,
      image: demoProduct.image,
      quantity: 1
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddToWishlist = () => {
    addToWishlistContext(demoProduct);
    setAddedToWishlist(true);
    setTimeout(() => setAddedToWishlist(false), 2000);
  };

  const handleVideoDemo = () => {
    setIsVideoPlaying(true);
    // In a real app, this would open a video modal or navigate to a demo page
    alert('Live demo would open here! This showcases the template functionality.');
    setTimeout(() => setIsVideoPlaying(false), 1000);
  };

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 overflow-hidden">
      {/* Premium Geometric Background Design */}
      <div className="absolute inset-0">
        {/* Main diagonal sweep - Professional navy */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-indigo-900/70 to-slate-900/50"
          style={{
            clipPath: "polygon(0 0, 65% 0, 45% 100%, 0 100%)"
          }}
        />
        
        {/* Secondary elegant curve - Luxurious flow */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-bl from-blue-800/60 via-indigo-800/40 to-transparent"
          style={{
            clipPath: "polygon(25% 0, 75% 0, 55% 50%, 35% 100%, 0 100%, 0 30%)"
          }}
        />

        {/* Sophisticated accent shape - Golden highlight */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-tr from-amber-200/20 via-yellow-100/15 to-transparent"
          style={{
            clipPath: "polygon(50% 0, 100% 0, 100% 60%, 70% 100%, 40% 70%)"
          }}
        />
        
        {/* Dynamic geometric overlays */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-bl from-slate-100/25 via-blue-50/15 to-transparent"
          style={{
            clipPath: "polygon(60% 0, 100% 0, 100% 100%, 80% 100%, 40% 50%)"
          }}
        />
        
        {/* Floating premium elements */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.0, delay: 0.5, ease: "easeOut" }}
          className="absolute top-16 right-20 w-80 h-80 bg-gradient-to-br from-blue-300/15 to-indigo-400/10 rounded-full blur-3xl"
        />
        
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.7, ease: "easeOut" }}
          className="absolute bottom-20 left-12 w-72 h-72 bg-gradient-to-tr from-amber-300/12 to-yellow-300/8 rounded-full blur-2xl"
        />
        
        {/* Sophisticated geometric accents */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-blue-400/20"
          style={{
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
          }}
        />
        
        <motion.div
          animate={{ 
            rotate: [180, -180],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-amber-400/25"
          style={{
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
          }}
        />
        
        {/* Elegant floating particles */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-1/3 w-6 h-6 bg-blue-500/40 rounded-full shadow-xl"
        />
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            x: [0, 15, 0],
            scale: [1, 0.8, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-80 right-1/2 w-4 h-4 bg-amber-500/35 rounded-full shadow-lg"
        />
        
        <motion.div
          animate={{ 
            y: [0, -35, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-40 left-1/5 w-3 h-3 bg-indigo-600/50 rounded-full shadow-md"
        />
        
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-2/3 right-1/6 w-8 h-8 border-2 border-blue-400/20 rounded-full"
        />
        
        {/* Premium text contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/8 to-transparent z-[1]" 
             style={{
               clipPath: "polygon(0 0, 70% 0, 50% 100%, 0 100%)"
             }} />
        
        {/* Additional text readability overlay for trust indicators */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 z-[1]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-6 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[85vh]">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-left space-y-4 lg:space-y-6 relative z-10 order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/90 backdrop-blur-md border border-white/60 text-gray-800 rounded-full text-sm font-semibold shadow-lg"
            >
              <SparklesIcon className="w-4 h-4 text-amber-600" />
              <span>Demo Template</span>
            </motion.div>

            {/* Main Heading - Improved contrast and readability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-4">
                <span className="text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>Vendora</span>
                <span className="block text-white drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>Deserves</span>
                <span className="block bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
                  Excellence
                </span>
              </h1>
            </motion.div>

            {/* Subtitle - Better readability */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base lg:text-lg text-white/95 leading-relaxed max-w-xl"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
            >
              Transform your business with this stunning eCommerce template. 
              Designed for brands that value quality, elegance, and customer experience.
            </motion.p>

            {/* CTA Buttons - Enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Link href="/products">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-500/30 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
                  <span>EXPLORE TEMPLATE</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.div>
              </Link>

              <motion.button
                onClick={handleVideoDemo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-md border border-white/60 text-gray-800 font-semibold rounded-2xl hover:bg-white transition-all duration-300 shadow-lg"
                disabled={isVideoPlaying}
              >
                <PlayIcon className={`w-5 h-5 text-blue-600 ${isVideoPlaying ? 'animate-pulse' : ''}`} />
                <span>{isVideoPlaying ? 'Loading...' : 'Live Preview'}</span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators - Compact 3-column layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="pt-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <TruckIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-white text-sm mb-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Fast Loading</div>
                  <div className="text-white/80 text-xs leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Optimized code</div>
                </div>
                
                <div className="text-center p-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-white text-sm mb-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Mobile Ready</div>
                  <div className="text-white/80 text-xs leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Responsive design</div>
                </div>
                
                <div className="text-center p-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <StarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-white text-sm mb-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Premium Code</div>
                  <div className="text-white/80 text-xs leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>Clean & modern</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Luxury Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative order-1 lg:order-2 h-full"
          >
            {/* Optimized Grid Layout - Fits viewport perfectly */}
            <div className="relative h-full flex flex-col justify-center p-4">
              
              {/* Grid Container - Proper space utilization */}
              <div className="grid grid-cols-12 grid-rows-8 gap-3 h-full max-h-[550px]">
                
                {/* Main Featured Product Card - Top section */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="col-span-8 row-span-5 bg-white rounded-3xl shadow-2xl p-5 relative overflow-hidden border border-gray-100/50"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div className="h-full flex flex-col">
                    {/* Product Image - Compact */}
                    <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-full flex items-center justify-center shadow-xl border-2 border-white/40"
                        >
                          <span className="text-white text-lg font-bold">V</span>
                        </motion.div>
                      </div>
                      <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs font-bold rounded-full">
                        PREMIUM
                      </div>
                    </div>
                    
                    {/* Product Info - Compact */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Premium Template</h3>
                      <p className="text-gray-600 text-xs mb-3 flex-1">Professional eCommerce solution</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className="w-3 h-3 text-yellow-400" />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">(5.0)</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900">$99</div>
                      </div>
                      
                      <motion.button 
                        onClick={handleAddToCart}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-2.5 font-bold rounded-xl transition-all duration-300 shadow-lg text-sm ${
                          addedToCart 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                        } text-white`}
                        disabled={addedToCart}
                      >
                        {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Card 1 - Top right */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => alert('Customer satisfaction: 99% of users rate this template 5 stars! Join thousands of satisfied customers.')}
                  className="col-span-4 row-span-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-4 text-white shadow-xl relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>
                  <div className="relative z-10 text-center h-full flex flex-col justify-center">
                    <div className="text-2xl font-bold mb-1">99%</div>
                    <div className="text-xs opacity-90">Satisfaction</div>
                  </div>
                </motion.div>

                {/* Stats Card 2 - Middle right */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => window.location.href = '/products'}
                  className="col-span-4 row-span-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white shadow-xl relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-10 h-10 bg-white/10 rounded-full -translate-y-3 translate-x-3"></div>
                  <div className="relative z-10 text-center h-full flex flex-col justify-center">
                    <div className="text-2xl font-bold mb-1">50+</div>
                    <div className="text-xs opacity-90">Components</div>
                  </div>
                </motion.div>

                {/* Quality Badge - Bottom right */}
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleAddToWishlist}
                  className={`col-span-4 row-span-1 rounded-xl p-3 text-white shadow-xl flex items-center justify-center relative overflow-hidden cursor-pointer transition-all duration-300 ${
                    addedToWishlist 
                      ? 'bg-gradient-to-br from-red-500 to-pink-600' 
                      : 'bg-gradient-to-br from-amber-500 to-orange-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm font-bold">
                      {addedToWishlist ? '💖 LOVED' : '✨ PREMIUM'}
                    </div>
                  </div>
                </motion.div>

                {/* Feature Cards - Bottom section */}
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => alert('📱 Mobile Responsive: This template looks perfect on all devices - phone, tablet, and desktop!')}
                  className="col-span-6 row-span-3 bg-white rounded-xl shadow-xl p-4 border border-gray-100/50 relative overflow-hidden cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'
                  }}
                >
                  <div className="flex flex-col items-center text-center h-full justify-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                      <span className="text-white text-lg">📱</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900 mb-1">Mobile Ready</div>
                    <div className="text-xs text-gray-600">Responsive Design</div>
                  </div>
                </motion.div>

                {/* Additional Feature */}
                <motion.div
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => alert('⚡ Lightning Fast: Optimized code ensures your site loads in under 2 seconds!')}
                  className="col-span-6 row-span-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-4 text-white shadow-xl relative overflow-hidden cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center h-full justify-center">
                    <div className="text-lg mb-2">⚡</div>
                    <div className="text-sm font-bold mb-1">Fast Loading</div>
                    <div className="text-xs opacity-90">Optimized Code</div>
                  </div>
                </motion.div>
              </div>
            </div>


            {/* Background Decorative Elements - Subtle and clean */}
            <div className="absolute inset-0 -z-10">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.02, 1],
                    opacity: [0.05, 0.1, 0.05]
                  }}
                  transition={{ 
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 1.2
                  }}
                  className="absolute w-40 h-40 border border-gray-200/30 rounded-full"
                  style={{
                    top: `${20 + (i * 25)}%`,
                    right: `${8 + (i * 10)}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;