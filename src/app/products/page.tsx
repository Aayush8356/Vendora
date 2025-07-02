'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import ProductListItem from '@/components/product/ProductListItem';
import ProductFilters from '@/components/product/ProductFilters';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
}

interface Filters {
  category: string;
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  tags: string[];
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;

  const [filters, setFilters] = useState<Filters>({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    inStock: true,
    tags: []
  });

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample products for demo (since backend might not be available)
  const sampleProducts: Product[] = [
    {
      _id: '1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and premium audio quality.',
      price: 299.99,
      originalPrice: 399.99,
      category: 'Electronics',
      images: ['/api/placeholder/400/400'],
      rating: 4.8,
      reviewCount: 156,
      inStock: true,
      tags: ['wireless', 'premium', 'noise-cancelling']
    },
    {
      _id: '2',
      name: 'Luxury Leather Wallet',
      description: 'Handcrafted genuine leather wallet with RFID protection and elegant design.',
      price: 89.99,
      originalPrice: 129.99,
      category: 'Accessories',
      images: ['/api/placeholder/400/400'],
      rating: 4.6,
      reviewCount: 89,
      inStock: true,
      tags: ['leather', 'luxury', 'rfid']
    },
    {
      _id: '3',
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with heart rate monitoring and GPS functionality.',
      price: 249.99,
      category: 'Electronics',
      images: ['/api/placeholder/400/400'],
      rating: 4.7,
      reviewCount: 203,
      inStock: true,
      tags: ['fitness', 'smart', 'gps']
    },
    {
      _id: '4',
      name: 'Organic Cotton T-Shirt',
      description: 'Sustainable organic cotton t-shirt with comfortable fit and eco-friendly materials.',
      price: 34.99,
      category: 'Clothing',
      images: ['/api/placeholder/400/400'],
      rating: 4.4,
      reviewCount: 67,
      inStock: true,
      tags: ['organic', 'sustainable', 'cotton']
    },
    {
      _id: '5',
      name: 'Professional Camera Lens',
      description: 'High-performance camera lens for professional photography with exceptional clarity.',
      price: 899.99,
      category: 'Photography',
      images: ['/api/placeholder/400/400'],
      rating: 4.9,
      reviewCount: 124,
      inStock: false,
      tags: ['professional', 'camera', 'lens']
    },
    {
      _id: '6',
      name: 'Ergonomic Office Chair',
      description: 'Premium office chair with lumbar support and adjustable height for maximum comfort.',
      price: 449.99,
      originalPrice: 599.99,
      category: 'Furniture',
      images: ['/api/placeholder/400/400'],
      rating: 4.5,
      reviewCount: 92,
      inStock: true,
      tags: ['ergonomic', 'office', 'comfort']
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortBy, sortOrder]);

  useEffect(() => {
    applyFilters();
  }, [products, filters, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Try to fetch from backend API first
      const response = await fetch(`/api/products?page=${currentPage}&limit=${productsPerPage}&sort=${sortBy}&order=${sortOrder}`);
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(Math.ceil((data.total || 0) / productsPerPage));
      } else {
        // Fallback to sample data if API is not available
        console.log('API not available, using sample data');
        setProducts(sampleProducts);
        setTotalPages(Math.ceil(sampleProducts.length / productsPerPage));
      }
    } catch (error) {
      console.log('Error fetching products, using sample data:', error);
      setProducts(sampleProducts);
      setTotalPages(Math.ceil(sampleProducts.length / productsPerPage));
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = products.filter(product => {
      // Enhanced search query filter - search in name, description, category, and tags
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          product.name.toLowerCase(),
          product.description.toLowerCase(),
          product.category.toLowerCase(),
          ...product.tags.map(tag => tag.toLowerCase())
        ].join(' ');
        
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (product.rating < filters.rating) {
        return false;
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0 && !filters.tags.some(tag => product.tags.includes(tag))) {
        return false;
      }

      return true;
    });

    // Sort filtered products
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Real-time search is handled by useEffect, this is just for form submission
  };

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Get search suggestions based on current query
  const getSearchSuggestions = () => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const suggestions = new Set<string>();
    
    products.forEach(product => {
      // Product names
      if (product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.add(product.name);
      }
      
      // Categories
      if (product.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.add(product.category);
      }
      
      // Tags
      product.tags.forEach(tag => {
        if (tag.toLowerCase().includes(searchQuery.toLowerCase())) {
          suggestions.add(tag);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 5);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    setShowSearchSuggestions(value.length >= 2);
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Collection</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products designed for those who appreciate quality and style.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products, categories, or tags..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onFocus={() => setShowSearchSuggestions(searchQuery.length >= 2)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                className="w-full px-6 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              
              {/* Search Suggestions */}
              {showSearchSuggestions && getSearchSuggestions().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50"
                >
                  {getSearchSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <span className="text-gray-700">{suggestion}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </form>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              Filters
            </button>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                products={products}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Results Info and View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">View:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Squares2X2Icon className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ListBulletIcon className="w-4 h-4" />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`mb-12 ${
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                : 'space-y-6'
            }`}
          >
            {paginatedProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {viewMode === 'grid' ? (
                  <ProductCard product={product} />
                ) : (
                  <ProductListItem product={product} />
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  category: '',
                  priceRange: [0, 1000],
                  rating: 0,
                  inStock: true,
                  tags: []
                });
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Enhanced Pagination */}
        {filteredProducts.length > productsPerPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            {/* Pagination Info */}
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * productsPerPage) + 1} to {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} results
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* First Page */}
              {currentPage > 2 && (
                <>
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    1
                  </button>
                  {currentPage > 3 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                </>
              )}

              {/* Previous */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {/* Current Page Range */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                
                if (page < 1 || page > totalPages) return null;
                
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              {/* Next */}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>

              {/* Last Page */}
              {currentPage < totalPages - 1 && (
                <>
                  {currentPage < totalPages - 2 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Items per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={productsPerPage}
                onChange={(e) => {
                  setCurrentPage(1);
                  // Note: productsPerPage is const, but we can add this functionality later
                }}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;