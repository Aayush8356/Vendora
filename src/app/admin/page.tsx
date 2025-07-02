'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  EyeIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const AdminDashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/login');
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Products',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: ShoppingBagIcon,
    },
    {
      name: 'Total Orders',
      value: '854',
      change: '+8%',
      changeType: 'positive',
      icon: ChartBarIcon,
    },
    {
      name: 'Total Revenue',
      value: '$12,345',
      change: '+15%',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
    },
    {
      name: 'Total Users',
      value: '2,456',
      change: '+5%',
      changeType: 'positive',
      icon: UsersIcon,
    },
  ];

  const quickActions = [
    {
      name: 'Add Product',
      description: 'Create a new product listing',
      href: '/admin/products/new',
      icon: PlusIcon,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'View Orders',
      description: 'Manage customer orders',
      href: '/admin/orders',
      icon: EyeIcon,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'Manage Users',
      description: 'View and manage users',
      href: '/admin/users',
      icon: UsersIcon,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      name: 'Analytics',
      description: 'View sales analytics',
      href: '/admin/analytics',
      icon: ChartBarIcon,
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];

  const recentOrders = [
    { id: '1', customer: 'John Doe', total: '$99.99', status: 'Completed', date: '2024-01-15' },
    { id: '2', customer: 'Jane Smith', total: '$149.99', status: 'Processing', date: '2024-01-14' },
    { id: '3', customer: 'Bob Johnson', total: '$79.99', status: 'Shipped', date: '2024-01-13' },
    { id: '4', customer: 'Alice Brown', total: '$199.99', status: 'Pending', date: '2024-01-12' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Welcome back, {user?.firstName}! Here's what's happening with your store.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-6 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-lg sm:text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    className={`${action.color} text-white p-3 sm:p-4 rounded-lg transition-colors group touch-manipulation`}
                  >
                    <div className="flex items-center">
                      <action.icon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base">{action.name}</h4>
                        <p className="text-xs sm:text-sm opacity-90 truncate">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Link
                  href="/admin/orders"
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium touch-manipulation"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{order.customer}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{order.date}</p>
                    </div>
                    <div className="text-right ml-2">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{order.total}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {/* Low Stock Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Low Stock Alert</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-900 text-sm sm:text-base truncate mr-2">Premium Headphones</span>
                <span className="text-red-600 font-medium text-sm sm:text-base flex-shrink-0">2 left</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-900 text-sm sm:text-base truncate mr-2">Leather Wallet</span>
                <span className="text-orange-600 font-medium text-sm sm:text-base flex-shrink-0">5 left</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-900 text-sm sm:text-base truncate mr-2">Smart Watch</span>
                <span className="text-red-600 font-medium text-sm sm:text-base flex-shrink-0">1 left</span>
              </div>
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Top Selling Products</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-900 text-sm sm:text-base truncate mr-2">Premium Headphones</span>
                <span className="text-green-600 font-medium text-sm sm:text-base flex-shrink-0">156 sold</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-900 text-sm sm:text-base truncate mr-2">Smart Watch</span>
                <span className="text-green-600 font-medium text-sm sm:text-base flex-shrink-0">134 sold</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-900 text-sm sm:text-base truncate mr-2">Designer Sunglasses</span>
                <span className="text-green-600 font-medium text-sm sm:text-base flex-shrink-0">98 sold</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;