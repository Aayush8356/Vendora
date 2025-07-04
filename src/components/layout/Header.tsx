'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBagIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Features', href: '/features' },
    { name: 'Demo', href: '/demo' },
  ];

  const searchSuggestions = [
    'Wireless Headphones', 'Smartphone', 'Laptop', 'Gaming Mouse', 'Keyboard',
    'Monitor', 'Tablet', 'Smart Watch', 'Camera', 'Speaker'
  ];

  const filteredSuggestions = searchQuery.length > 1 
    ? searchSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchQuery(''); // Clear search after submission
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    window.location.href = `/products?search=${encodeURIComponent(suggestion)}`;
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 z-50 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl border border-amber-500/30">
                  <span className="text-white font-bold text-lg sm:text-xl drop-shadow-lg">V</span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden xs:block">
                <div className="text-lg sm:text-2xl font-bold text-neutral-900">Vendora</div>
                <div className="text-xs text-neutral-500 font-medium -mt-1 hidden sm:block">Demo Template</div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden sm:flex items-center flex-1 max-w-sm lg:max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <form onSubmit={handleSearch} className="relative w-full group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 lg:px-5 lg:py-3 pl-10 lg:pl-12 pr-12 lg:pr-16 text-sm bg-white/80 backdrop-blur-sm border-2 border-neutral-200 rounded-xl lg:rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-all duration-200 hover:border-amber-300"
                />
                <MagnifyingGlassIcon className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 h-4 lg:h-5 w-4 lg:w-5 text-neutral-400 group-focus-within:text-amber-600 transition-colors duration-200" />
                <button 
                  type="submit"
                  className="absolute right-1.5 lg:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-600 to-orange-700 text-white p-2 lg:p-2.5 rounded-lg lg:rounded-xl hover:from-amber-700 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
                  disabled={!searchQuery.trim()}
                >
                  <MagnifyingGlassIcon className="h-3.5 lg:h-4 w-3.5 lg:w-4" />
                </button>
              </form>
              
              {/* Search Suggestions */}
              {filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-3 lg:px-4 py-2.5 lg:py-3 text-left text-sm text-neutral-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-150 flex items-center space-x-2 lg:space-x-3"
                    >
                      <MagnifyingGlassIcon className="h-4 w-4 text-neutral-400" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Search Button */}
          <div className="flex sm:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-neutral-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all duration-200"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Notifications - Hidden on mobile for space */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative hidden md:flex p-2.5 lg:p-3 text-neutral-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all duration-200 min-h-[44px] min-w-[44px] items-center justify-center"
            >
              <BellIcon className="h-5 lg:h-6 w-5 lg:w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 lg:h-5 w-4 lg:w-5 flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 lg:p-3 text-neutral-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <HeartIcon className="h-5 lg:h-6 w-5 lg:w-6" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 lg:h-6 w-5 lg:w-6 flex items-center justify-center shadow-lg"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Shopping Cart */}
            <Link href="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2.5 lg:p-3 text-neutral-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ShoppingBagIcon className="h-5 lg:h-6 w-5 lg:w-6" />
                {getCartItemsCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-600 to-orange-700 text-white text-xs font-bold rounded-full h-5 lg:h-6 w-5 lg:w-6 flex items-center justify-center shadow-lg"
                  >
                    {getCartItemsCount()}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center border border-amber-500/30">
                    <span className="text-white font-semibold text-sm drop-shadow">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-semibold text-neutral-900">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-xs text-neutral-500 capitalize">
                      {user?.role}
                    </div>
                  </div>
                </motion.div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-4">
                    <div className="flex items-center space-x-3 pb-4 border-b border-neutral-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center border border-amber-500/30">
                        <span className="text-white font-semibold drop-shadow">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-sm text-neutral-500">{user?.email}</div>
                      </div>
                    </div>
                    
                    <div className="py-3 space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
                      >
                        <UserIcon className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
                      >
                        <ShoppingBagIcon className="h-4 w-4" />
                        <span>My Orders</span>
                      </Link>
                      <Link
                        href="/wishlist"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
                      >
                        <HeartIcon className="h-4 w-4" />
                        <span>Wishlist</span>
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 px-3 py-2 text-sm text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <span className="w-4 h-4 text-center">⚡</span>
                          <span>Admin Panel</span>
                        </Link>
                      )}
                    </div>
                    
                    <div className="border-t border-neutral-100 pt-3">
                      <button
                        onClick={logout}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <span className="w-4 h-4 text-center">🚪</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-ghost btn-sm"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary btn-sm"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-neutral-600 hover:text-amber-700 hover:bg-amber-50 rounded-xl transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-200 mt-4 bg-white/95 backdrop-blur-sm"
            >
              <div className="py-4 space-y-4">
                {/* Mobile Search - Always visible when menu is open */}
                <div className="px-4">
                  <form onSubmit={handleSearch} className="relative group">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-3.5 pl-12 pr-16 text-base bg-white border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 hover:border-amber-300"
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400 group-focus-within:text-amber-600 transition-colors duration-200" />
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-600 to-orange-700 text-white p-2.5 rounded-lg hover:from-amber-700 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      disabled={!searchQuery.trim()}
                    >
                      <MagnifyingGlassIcon className="h-4 w-4" />
                    </button>
                  </form>
                </div>

                {/* Mobile Navigation */}
                <div className="px-4 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-4 py-4 rounded-xl transition-all duration-200 font-medium text-base min-h-[48px] flex items-center ${
                          isActive 
                            ? 'text-amber-700 bg-amber-50 font-semibold border-l-4 border-amber-600' 
                            : 'text-neutral-700 hover:text-amber-700 hover:bg-amber-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Quick Actions */}
                <div className="px-4 pt-2 border-t border-neutral-200">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Notifications - Now visible on mobile */}
                    <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-neutral-100 hover:bg-amber-50 rounded-xl transition-all duration-200 min-h-[48px]">
                      <BellIcon className="h-5 w-5 text-neutral-600" />
                      <span className="text-sm font-medium text-neutral-700">Alerts</span>
                      <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
                    </button>
                    
                    {/* Wishlist Mobile */}
                    <Link href="/wishlist" onClick={() => setIsMenuOpen(false)}>
                      <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-neutral-100 hover:bg-red-50 rounded-xl transition-all duration-200 min-h-[48px]">
                        <HeartIcon className="h-5 w-5 text-neutral-600" />
                        <span className="text-sm font-medium text-neutral-700">Wishlist</span>
                        {wishlistCount > 0 && (
                          <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {wishlistCount}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
                
                {/* Mobile Auth Buttons */}
                {!isAuthenticated && (
                  <div className="px-4 pt-4 border-t border-neutral-200">
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full btn btn-outline btn-md min-h-[48px] text-base"
                        >
                          Login
                        </motion.button>
                      </Link>
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full btn btn-primary btn-md min-h-[48px] text-base"
                        >
                          Sign Up
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;