'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

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

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
  products: Product[];
}

const ProductFilters = ({ filters, onFilterChange, products }: ProductFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['category', 'price', 'rating'])
  );

  // Extract unique categories from products with counts
  const categories = Array.from(new Set(products.map(p => p.category)))
    .sort()
    .map(category => ({
      name: category,
      count: products.filter(p => p.category === category).length,
      inStockCount: products.filter(p => p.category === category && p.inStock).length
    }));
  
  // Extract unique tags from products with counts
  const allTags = Array.from(new Set(products.flatMap(p => p.tags)))
    .sort()
    .map(tag => ({
      name: tag,
      count: products.filter(p => p.tags.includes(tag)).length
    }));
  
  // Price range options with product counts
  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $500', min: 200, max: 500 },
    { label: 'Over $500', min: 500, max: 1000 },
  ].map(range => ({
    ...range,
    count: products.filter(p => p.price >= range.min && p.price <= range.max).length
  }));

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ 
      category: filters.category === category ? '' : category 
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange({ 
      priceRange: [min, max] 
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ 
      rating: filters.rating === rating ? 0 : rating 
    });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ tags: newTags });
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      inStock: true,
      tags: []
    });
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
      />
    ));
  };

  const activeFiltersCount = [
    filters.category ? 1 : 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0,
    filters.rating > 0 ? 1 : 0,
    filters.tags.length,
  ].reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="font-medium text-gray-900">Category</h4>
          <motion.div
            animate={{ rotate: expandedSections.has('category') ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
        
        {expandedSections.has('category') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2"
          >
            {categories.map((category) => (
              <label key={category.name} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === category.name}
                    onChange={() => handleCategoryChange(category.name)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700 font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">({category.count})</span>
                  {category.inStockCount < category.count && (
                    <span className="text-xs text-green-600">✓{category.inStockCount}</span>
                  )}
                </div>
              </label>
            ))}
          </motion.div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="font-medium text-gray-900">Price Range</h4>
          <motion.div
            animate={{ rotate: expandedSections.has('price') ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
        
        {expandedSections.has('price') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2"
          >
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange[0] === range.min && filters.priceRange[1] === range.max}
                    onChange={() => handlePriceRangeChange(range.min, range.max)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700 font-medium">{range.label}</span>
                </div>
                <span className="text-xs text-gray-500">({range.count})</span>
              </label>
            ))}
          </motion.div>
        )}
      </div>

      {/* Rating */}
      <div className="border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="font-medium text-gray-900">Minimum Rating</h4>
          <motion.div
            animate={{ rotate: expandedSections.has('rating') ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
        
        {expandedSections.has('rating') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2"
          >
            {[4, 3, 2, 1].map((rating) => {
              const count = products.filter(p => p.rating >= rating).length;
              return (
                <label key={rating} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleRatingChange(rating)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="ml-3 flex items-center">
                      <div className="flex">
                        {renderStars(rating)}
                      </div>
                      <span className="ml-2 text-sm text-gray-700 font-medium">& up</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">({count})</span>
                </label>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Stock Status */}
      <div className="border-b border-gray-200 pb-4">
        <label className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFilterChange({ inStock: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">In Stock Only</span>
          </div>
          <span className="text-xs text-gray-500">({products.filter(p => p.inStock).length})</span>
        </label>
      </div>

      {/* Tags/Features */}
      {allTags.length > 0 && (
        <div className="border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection('tags')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-gray-900">Features</h4>
            <motion.div
              animate={{ rotate: expandedSections.has('tags') ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </button>
          
          {expandedSections.has('tags') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 space-y-2"
            >
              {allTags.map((tag) => (
                <label key={tag.name} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag.name)}
                      onChange={() => handleTagToggle(tag.name)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium capitalize">{tag.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">({tag.count})</span>
                </label>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="pt-4">
          <h5 className="text-sm font-medium text-gray-900 mb-3">Active Filters:</h5>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {filters.category}
                <button
                  onClick={() => handleCategoryChange(filters.category)}
                  className="ml-2 inline-flex items-center"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
                <button
                  onClick={() => handlePriceRangeChange(0, 1000)}
                  className="ml-2 inline-flex items-center"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.rating > 0 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {filters.rating}+ stars
                <button
                  onClick={() => handleRatingChange(filters.rating)}
                  className="ml-2 inline-flex items-center"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
              >
                {tag}
                <button
                  onClick={() => handleTagToggle(tag)}
                  className="ml-2 inline-flex items-center"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;