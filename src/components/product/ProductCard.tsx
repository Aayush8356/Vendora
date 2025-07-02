'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Button from '../ui/Button';

interface ProductCardProps {
  product?: {
    _id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewCount: number;
    description: string;
    category: string;
    inStock: boolean;
  };
  // Template mode props for demo purposes
  templateMode?: boolean;
}

const ProductCard = ({ product, templateMode = false }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Template data for demo purposes
  const templateProduct = {
    _id: 'template-id',
    name: 'Product Name',
    price: 99.99,
    originalPrice: 129.99,
    image: '/api/placeholder/400/400',
    rating: 4.5,
    reviewCount: 124,
    description: 'This is where your detailed product description would appear, highlighting key features and benefits.',
    category: 'Category',
    inStock: true,
  };

  // Use template data when in template mode or when no product is provided
  const displayProduct = templateMode || !product ? templateProduct : product;

  const handleAddToCart = async () => {
    // In template mode, just show loading state without actual cart functionality
    if (templateMode) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
      return;
    }

    setIsLoading(true);
    try {
      await addToCart({
        _id: displayProduct._id,
        name: displayProduct.name,
        price: displayProduct.price,
        image: displayProduct.image,
        quantity: 1,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    if (templateMode) {
      // In template mode, just show visual feedback
      return;
    }

    const productForWishlist = {
      _id: displayProduct._id,
      name: displayProduct.name,
      description: displayProduct.description,
      price: displayProduct.price,
      originalPrice: displayProduct.originalPrice,
      category: displayProduct.category,
      images: [displayProduct.image],
      rating: displayProduct.rating,
      reviewCount: displayProduct.reviewCount,
      inStock: displayProduct.inStock,
      tags: [] // ProductCard doesn't have tags, so we'll add empty array
    };

    if (isInWishlist(displayProduct._id)) {
      removeFromWishlist(displayProduct._id);
    } else {
      addToWishlist(productForWishlist);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = index < Math.floor(rating);
      return filled ? (
        <StarIconSolid key={index} className="h-4 w-4 text-yellow-400" />
      ) : (
        <StarIcon key={index} className="h-4 w-4 text-gray-300" />
      );
    });
  };

  const discountPercentage = displayProduct.originalPrice 
    ? Math.round(((displayProduct.originalPrice - displayProduct.price) / displayProduct.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={templateMode ? '#' : `/products/${displayProduct._id}`}>
          <Image
            src={displayProduct.image || '/api/placeholder/400/400'}
            alt={displayProduct.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges - Mobile optimized */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex flex-col gap-1 sm:gap-2">
          {!displayProduct.inStock && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button - Larger touch target on mobile */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 p-2.5 sm:p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200 min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto flex items-center justify-center"
        >
          {templateMode || !isInWishlist(displayProduct._id) ? (
            <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors duration-200" />
          ) : (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          )}
        </button>

        {/* Quick Actions - Always visible on mobile, hover on desktop */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleAddToCart}
            disabled={!displayProduct.inStock}
            isLoading={isLoading}
            variant="primary"
            size="sm"
            fullWidth
            className="backdrop-blur-sm bg-white/95 text-gray-900 hover:bg-white shadow-md min-h-[44px] text-sm"
            leftIcon={<ShoppingCartIcon className="h-4 w-4" />}
          >
            {displayProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        {/* Category */}
        <div className="mb-2">
          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            {displayProduct.category}
          </span>
        </div>

        {/* Product Name */}
        <Link href={templateMode ? '#' : `/products/${displayProduct._id}`}>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-amber-700 transition-colors duration-200 min-h-[48px] sm:min-h-auto">
            {displayProduct.name}
          </h3>
        </Link>

        {/* Description - Hidden on mobile for cleaner look */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 hidden sm:block">
          {displayProduct.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <div className="flex items-center">
            {renderStars(displayProduct.rating)}
          </div>
          <span className="text-xs sm:text-sm text-gray-600">
            {displayProduct.rating} ({displayProduct.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              ${displayProduct.price}
            </span>
            {displayProduct.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${displayProduct.originalPrice}
              </span>
            )}
          </div>
          
          {/* Quick Add Button - Hidden on mobile since we have overlay button */}
          <Button
            onClick={handleAddToCart}
            disabled={!displayProduct.inStock}
            isLoading={isLoading}
            variant="outline"
            size="sm"
            className="hidden sm:block md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-h-[40px] min-w-[40px]"
          >
            <ShoppingCartIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;