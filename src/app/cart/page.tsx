'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  TrashIcon, 
  MinusIcon, 
  PlusIcon, 
  ShoppingBagIcon,
  ArrowLeftIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityUpdate = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setUpdatingItems(prev => new Set(prev).add(productId));
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBagIcon className="w-16 h-16 text-amber-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Shopping Cart</h1>
            <p className="text-sm sm:text-base text-gray-600">
              {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 font-medium px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors duration-200 min-h-[44px] w-full sm:w-auto"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-3 sm:space-y-4"
          >
            {cart.items.map((item, index) => (
              <motion.div
                key={item.product?.id || item.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6"
              >
                <div className="flex gap-4 sm:gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden">
                      <Image
                        src={item.product?.images?.[0] || '/images/placeholder.jpg'}
                        alt={item.product?.name || 'Product'}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-xl font-bold text-gray-900 truncate pr-2">{item.product?.name || 'Product'}</h3>
                        {item.variant && Object.keys(item.variant).length > 0 && (
                          <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2">
                            {Object.entries(item.variant).map(([key, value]) => (
                              <span key={key} className="text-xs sm:text-sm text-gray-600 capitalize">
                                {key}: {String(value)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.product?.id || item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-start gap-3">
                        <span className="text-sm font-medium text-gray-700">Qty:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityUpdate(item.product?.id || item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || updatingItems.has(item.product?.id || item.id)}
                            className="p-3 sm:p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          
                          <span className="px-4 py-3 sm:py-2 border-x border-gray-300 min-w-[60px] text-center font-medium">
                            {updatingItems.has(item.product?.id || item.id) ? '...' : item.quantity}
                          </span>
                          
                          <button
                            onClick={() => handleQuantityUpdate(item.product?.id || item.id, item.quantity + 1)}
                            disabled={updatingItems.has(item.product?.id || item.id)}
                            className="p-3 sm:p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right sm:text-right">
                        <div className="text-lg sm:text-2xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Clear Cart Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-end pt-4"
            >
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Clear Cart
              </button>
            </motion.div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-amber-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 btn btn-primary flex items-center justify-center gap-2"
                onClick={() => {
                  if (!isAuthenticated) {
                    alert('Please log in to proceed with checkout');
                    return;
                  }
                  // Navigate to checkout
                  window.location.href = '/checkout';
                }}
              >
                <CreditCardIcon className="w-5 h-5" />
                Proceed to Checkout
              </motion.button>

              {/* Login Prompt */}
              {!isAuthenticated && (
                <div className="mt-4 p-4 bg-amber-50 rounded-xl">
                  <p className="text-sm text-amber-700 text-center">
                    <Link href="/login" className="font-medium hover:underline">
                      Sign in
                    </Link>
                    {' '}to save your cart and get a faster checkout experience
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why shop with us?</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <TruckIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Free Shipping</div>
                    <div className="text-sm text-gray-600">On orders over $100</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Secure Payment</div>
                    <div className="text-sm text-gray-600">Your data is protected</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingBagIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Easy Returns</div>
                    <div className="text-sm text-gray-600">30-day return policy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Notice */}
            {shipping > 0 && (
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-700">
                  <TruckIcon className="w-5 h-5" />
                  <span className="font-medium">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;