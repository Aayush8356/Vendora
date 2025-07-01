'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ShoppingBagIcon, 
  SparklesIcon, 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TagIcon 
} from '@heroicons/react/24/outline';

export default function CategoriesPage() {
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Latest gadgets and tech accessories',
      icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
      gradient: 'from-blue-500 to-indigo-600',
      count: 24
    },
    {
      id: 'computers',
      name: 'Computers',
      description: 'Laptops, desktops, and accessories',
      icon: <ComputerDesktopIcon className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-600',
      count: 18
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Premium accessories and add-ons',
      icon: <SparklesIcon className="w-8 h-8" />,
      gradient: 'from-emerald-500 to-teal-600',
      count: 32
    },
    {
      id: 'featured',
      name: 'Featured',
      description: 'Hand-picked premium products',
      icon: <TagIcon className="w-8 h-8" />,
      gradient: 'from-amber-500 to-orange-600',
      count: 12
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Product Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated categories of premium products
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100/50 relative overflow-hidden group cursor-pointer"
            >
              <Link href={`/products?category=${category.id}`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {category.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.count} products</span>
                    <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span className="text-sm font-medium">Explore</span>
                      <ShoppingBagIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span>View All Products</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}