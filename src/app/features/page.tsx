'use client';

import { motion } from 'framer-motion';
import { 
  DevicePhoneMobileIcon,
  BoltIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  CogIcon,
  HeartIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function FeaturesPage() {
  const features = [
    {
      icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
      title: 'Mobile Responsive',
      description: 'Perfectly optimized for all devices and screen sizes',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <BoltIcon className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Optimized code ensures loading times under 2 seconds',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: 'Secure & Reliable',
      description: 'Built with security best practices and reliable infrastructure',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: <PaintBrushIcon className="w-8 h-8" />,
      title: 'Modern Design',
      description: 'Clean, contemporary design that converts visitors to customers',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: <CogIcon className="w-8 h-8" />,
      title: 'Easy Customization',
      description: 'Fully customizable components and layouts for your brand',
      gradient: 'from-gray-500 to-slate-600'
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: 'User Experience',
      description: 'Intuitive interface designed for maximum user engagement',
      gradient: 'from-red-500 to-rose-600'
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: 'Analytics Ready',
      description: 'Built-in analytics integration for tracking performance',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: 'SEO Optimized',
      description: 'Search engine optimized to help your business grow',
      gradient: 'from-teal-500 to-cyan-600'
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
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Premium Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the powerful features that make Vendora the perfect choice for your eCommerce business
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100/50 relative overflow-hidden group"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 bg-white rounded-3xl shadow-2xl p-12 border border-gray-100/50"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join the growing community of successful businesses using Vendora
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Premium Components</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2s</div>
              <div className="text-gray-600">Average Load Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Premium Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}