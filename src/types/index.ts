export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
  phone?: string;
  addresses: Address[];
  isEmailVerified: boolean;
  createdAt: string;
}

export interface Address {
  type: 'shipping' | 'billing';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  category: Category;
  brand?: string;
  images: string[];
  tags: string[];
  variants: ProductVariant[];
  inventory: {
    stock: number;
    lowStockThreshold: number;
    trackQuantity: boolean;
  };
  shipping: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    shippingClass?: string;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    slug: string;
  };
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  ratings: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  name: string;
  value: string;
  price?: number;
  sku?: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  parent?: string;
  image?: string;
  icon?: string;
  isActive: boolean;
  sortOrder: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant?: {
    name: string;
    value: string;
  };
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  user: string;
  items: Array<{
    product: Product;
    quantity: number;
    price: number;
    variant?: {
      name: string;
      value: string;
    };
  }>;
  shippingAddress: Address;
  billingAddress: Address;
  payment: {
    method: 'credit_card' | 'paypal' | 'stripe' | 'cash_on_delivery';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transactionId?: string;
    amount: number;
  };
  pricing: {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  };
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  tracking: {
    carrier?: string;
    trackingNumber?: string;
    trackingUrl?: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}