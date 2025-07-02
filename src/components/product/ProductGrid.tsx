'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

interface Product {
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
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductGrid = ({ products, loading = false }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
          >
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
              <div className="w-16 sm:w-20 h-3 sm:h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-4 sm:h-5 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-3 sm:h-4 bg-gray-200 rounded hidden sm:block"></div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-3 sm:w-4 h-3 sm:h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="w-12 sm:w-16 h-3 sm:h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-14 sm:w-16 h-5 sm:h-6 bg-gray-200 rounded"></div>
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gray-200 rounded hidden sm:block"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-64 h-64 mb-6 opacity-50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-gray-400"
          >
            <path
              d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 11H19L18 21H6L5 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600 text-center max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-6"
    >
      {products.map((product) => (
        <motion.div key={product._id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;