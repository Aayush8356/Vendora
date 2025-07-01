'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { 
  PlayIcon,
  EyeIcon,
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState('desktop');

  const demoFeatures = [
    {
      id: 'shopping',
      title: 'Shopping Experience',
      description: 'Complete shopping flow from browse to checkout',
      icon: <ShoppingBagIcon className="w-6 h-6" />,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'mobile',
      title: 'Mobile Responsive',
      description: 'Perfect mobile experience on all devices',
      icon: <DevicePhoneMobileIcon className="w-6 h-6" />,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'admin',
      title: 'Admin Dashboard',
      description: 'Powerful admin panel for managing your store',
      icon: <CodeBracketIcon className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const handleLiveDemo = () => {
    alert('🚀 Live Demo: This would open an interactive demo of the Vendora template with full functionality!');
  };

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
            Live Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience the full power of Vendora with our interactive demo
          </p>
          
          <motion.button
            onClick={handleLiveDemo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <PlayIcon className="w-6 h-6" />
            <span>Launch Interactive Demo</span>
          </motion.button>
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-16 border border-gray-100/50"
        >
          {/* Device Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-2xl p-2 flex gap-2">
              <button
                onClick={() => setActiveDemo('desktop')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeDemo === 'desktop' 
                    ? 'bg-white shadow-md text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ComputerDesktopIcon className="w-5 h-5" />
                Desktop
              </button>
              <button
                onClick={() => setActiveDemo('mobile')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeDemo === 'mobile' 
                    ? 'bg-white shadow-md text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <DevicePhoneMobileIcon className="w-5 h-5" />
                Mobile
              </button>
            </div>
          </div>

          {/* Demo Frame */}
          <div className="relative">
            <div className={`bg-gray-900 rounded-2xl p-6 mx-auto transition-all duration-500 ${
              activeDemo === 'mobile' ? 'max-w-sm' : 'max-w-5xl'
            }`}>
              <div className="bg-white rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <span className="text-white text-2xl font-bold">V</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Vendora Demo</h3>
                  <p className="text-gray-600 mb-4">Interactive {activeDemo} preview</p>
                  <button
                    onClick={handleLiveDemo}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <EyeIcon className="w-5 h-5" />
                    View Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Demo Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {demoFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100/50 relative overflow-hidden group cursor-pointer"
              onClick={handleLiveDemo}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span className="text-sm font-medium">Try Demo</span>
                  <PlayIcon className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the full potential of Vendora with our premium eCommerce template
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                View Products
              </motion.button>
            </Link>
            <motion.button
              onClick={handleLiveDemo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-400 transition-all duration-300 shadow-lg border-2 border-blue-400"
            >
              Full Demo Access
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}