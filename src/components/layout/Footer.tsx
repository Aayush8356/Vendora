'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNewsletter } from '@/context/NewsletterContext';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const { subscribe } = useNewsletter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const result = await subscribe(email);
      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      });
      
      if (result.success) {
        setEmail('');
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/products' },
      { name: 'Categories', href: '/categories' },
      { name: 'Featured', href: '/featured' },
      { name: 'Sale', href: '/sale' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: '📷', gradient: 'from-pink-500 to-rose-500' },
    { name: 'Twitter', href: '#', icon: '🐦', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Facebook', href: '#', icon: '📘', gradient: 'from-blue-600 to-blue-800' },
    { name: 'LinkedIn', href: '#', icon: '💼', gradient: 'from-blue-700 to-blue-900' },
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-stone-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-amber-400 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-orange-400 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 border border-amber-300 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border border-orange-300 rounded-full"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl border border-amber-500/30"
                >
                  <span className="text-white font-bold text-xl drop-shadow-lg">V</span>
                </motion.div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">Vendora</div>
                  <div className="text-xs text-amber-300 font-medium -mt-1">Demo Template</div>
                </div>
              </Link>
              
              <p className="text-neutral-300 mb-8 max-w-md leading-relaxed">
                This premium eCommerce template showcases modern design and functionality. 
                Perfect for brands that want to create exceptional online shopping experiences.
              </p>

              <div className="space-y-4 text-sm text-neutral-300">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center group-hover:bg-amber-600/30 transition-colors">
                    <MapPinIcon className="h-4 w-4 text-amber-400" />
                  </div>
                  <span>123 Commerce Street, Business District</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center group-hover:bg-amber-600/30 transition-colors">
                    <PhoneIcon className="h-4 w-4 text-amber-400" />
                  </div>
                  <span>+1 (555) VENDORA</span>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center group-hover:bg-amber-600/30 transition-colors">
                    <EnvelopeIcon className="h-4 w-4 text-amber-400" />
                  </div>
                  <span>hello@vendora.com</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-amber-200">Template Pages</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-amber-200 transition-all duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-amber-200">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-amber-200 transition-all duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-amber-200">Template Info</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-amber-200 transition-all duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-gradient-to-r from-transparent via-amber-800/50 to-transparent"
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              whileInView={{ scale: 1.02 }}
              className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 p-8 rounded-3xl border border-blue-600/20 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">Stay Updated</h3>
              <p className="text-neutral-300 mb-6 leading-relaxed">
                Subscribe to receive the latest updates, exclusive offers, 
                and insider tips for your premium shopping experience.
              </p>
              
              {/* Success/Error Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                    message.type === 'success' 
                      ? 'bg-green-500/20 border border-green-500/30 text-green-200' 
                      : 'bg-red-500/20 border border-red-500/30 text-red-200'
                  }`}
                >
                  {message.type === 'success' ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <ExclamationTriangleIcon className="w-5 h-5" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </motion.div>
              )}

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-neutral-800/50 border border-blue-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-neutral-400 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <motion.button
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Subscribing...
                    </div>
                  ) : (
                    'Subscribe'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-neutral-800/50"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-neutral-400">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-amber-300 transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10`}
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-neutral-500">
            <p>&copy; 2024 Vendora. All rights reserved. Crafted with ✨ for luxury experiences.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;