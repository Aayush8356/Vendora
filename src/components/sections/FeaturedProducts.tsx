'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { StarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Your Premium Product Name',
      price: 299.99,
      salePrice: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      rating: 4.8,
      reviews: 124,
      badge: 'Bestseller',
      category: 'Category A',
      description: 'Showcase your top-tier products with compelling descriptions'
    },
    {
      id: 2,
      name: 'Your Signature Item',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
      rating: 4.9,
      reviews: 87,
      badge: 'New',
      category: 'Category B',
      description: 'Perfect for highlighting your newest arrivals and innovations'
    },
    {
      id: 3,
      name: 'Your Feature Product',
      price: 399.99,
      salePrice: 349.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      rating: 4.7,
      reviews: 203,
      badge: 'Sale',
      category: 'Category C',
      description: 'Ideal for promoting seasonal sales and special offers'
    },
    {
      id: 4,
      name: 'Your Luxury Collection',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
      rating: 4.6,
      reviews: 156,
      badge: 'Premium',
      category: 'Category D',
      description: 'Display your high-end products with premium positioning'
    },
    {
      id: 5,
      name: 'Your Sustainable Line',
      price: 49.99,
      salePrice: 39.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      rating: 4.5,
      reviews: 89,
      badge: 'Eco-Friendly',
      category: 'Category E',
      description: 'Perfect for showcasing eco-conscious and sustainable products'
    },
    {
      id: 6,
      name: 'Your Professional Series',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500',
      rating: 4.9,
      reviews: 67,
      badge: 'Pro',
      category: 'Category F',
      description: 'Highlight your professional-grade products and solutions'
    }
  ];

  const badgeColors = {
    'Bestseller': 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white border border-amber-300',
    'New': 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border border-emerald-300',
    'Sale': 'bg-gradient-to-r from-red-500 to-rose-600 text-white border border-red-300',
    'Premium': 'bg-gradient-to-r from-amber-600 to-orange-700 text-white border border-amber-400',
    'Eco-Friendly': 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border border-emerald-400',
    'Pro': 'bg-gradient-to-r from-slate-600 to-gray-700 text-white border border-slate-400'
  };

  return (
    <section className="section bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6 border border-amber-200"
          >
            <span>✨</span>
            <span>Demo Template</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Showcase Your
            <span className="text-gradient-gold block">Featured Products</span>
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            This template demonstrates how to beautifully display your product collection with 
            elegant cards, interactive elements, and premium styling for maximum impact.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="product-grid max-w-7xl mx-auto">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group card-product"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge */}
                <div className={`absolute top-4 left-4 px-3 py-2 rounded-xl text-xs font-bold shadow-lg ${badgeColors[product.badge as keyof typeof badgeColors]}`}>
                  {product.badge}
                </div>

                {/* Sale Badge */}
                {product.salePrice && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-lg">
                    -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-200"
                  >
                    <HeartIcon className="h-5 w-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-neutral-600 hover:text-amber-600 transition-colors duration-200"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-full shadow-xl flex items-center justify-center hover:from-amber-700 hover:to-orange-800 transition-all duration-200"
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Quick Add Button - Bottom */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn btn-primary btn-md shadow-xl"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {product.category}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-neutral-600 ml-1">
                      {product.rating}
                    </span>
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-amber-700 transition-colors duration-200 line-clamp-2">
                  <Link href={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-neutral-600 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Price & Reviews */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-2xl font-bold text-neutral-900">
                          ${product.salePrice}
                        </span>
                        <span className="text-lg text-neutral-500 line-through">
                          ${product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-neutral-900">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-neutral-500">
                    {product.reviews} reviews
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link href="/products">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 btn btn-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white shadow-2xl hover:shadow-3xl"
            >
              <span className="font-bold">View All Your Products</span>
              <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.div>
          </Link>
          
          <p className="text-neutral-600 mt-4 text-lg">
            Seamlessly connect to your complete product catalog and inventory
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;