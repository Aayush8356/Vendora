import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Product } from '../models/Product';
import { Category } from '../models/Category';

// Get all products with filtering, sorting, and pagination
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    // Build filter query
    const filter: any = { status: 'published' };

    // Category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Search filter
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search as string, 'i')] } }
      ];
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) {
        filter.price.$gte = parseFloat(req.query.minPrice as string);
      }
      if (req.query.maxPrice) {
        filter.price.$lte = parseFloat(req.query.maxPrice as string);
      }
    }

    // Featured filter
    if (req.query.featured === 'true') {
      filter.featured = true;
    }

    // Build sort query
    let sort: any = { createdAt: -1 };
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    if (sortBy) {
      switch (sortBy) {
        case 'price':
          sort = { price: sortOrder };
          break;
        case 'name':
          sort = { name: sortOrder };
          break;
        case 'rating':
          sort = { 'ratings.average': sortOrder };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        case 'oldest':
          sort = { createdAt: 1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    }

    // Execute queries
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: page,
          pages: totalPages,
          total,
          limit,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching products'
    });
  }
};

// Get single product by ID or slug
export const getProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    
    // Try to find by ID first, then by slug
    const product = await Product.findOne({
      $or: [
        { _id: id },
        { 'seo.slug': id }
      ],
      status: 'published'
    }).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.json({
      success: true,
      data: { product }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching product'
    });
  }
};

// Create new product (admin only)
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const productData = req.body;

    // Check if category exists
    const category = await Category.findById(productData.category);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if SKU already exists
    const existingSku = await Product.findOne({ sku: productData.sku });
    if (existingSku) {
      return res.status(400).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }

    const product = await Product.create(productData);
    await product.populate('category', 'name slug');

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error creating product'
    });
  }
};

// Update product (admin only)
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const updateData = req.body;

    // Check if category exists (if being updated)
    if (updateData.category) {
      const category = await Category.findById(updateData.category);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Category not found'
        });
      }
    }

    // Check if SKU already exists (if being updated)
    if (updateData.sku) {
      const existingSku = await Product.findOne({ 
        sku: updateData.sku,
        _id: { $ne: id }
      });
      if (existingSku) {
        return res.status(400).json({
          success: false,
          message: 'Product with this SKU already exists'
        });
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating product'
    });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting product'
    });
  }
};

// Get featured products
export const getFeaturedProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const limit = parseInt(req.query.limit as string) || 8;

    const products = await Product.find({
      status: 'published',
      featured: true
    })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return res.json({
      success: true,
      data: { products }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching featured products'
    });
  }
};

// Get products by category
export const getProductsByCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { categorySlug } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    // Find category by slug
    const category = await Category.findOne({ slug: categorySlug });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Build filter
    const filter: any = {
      status: 'published',
      category: category._id
    };

    // Build sort
    let sort: any = { createdAt: -1 };
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

    if (sortBy === 'price') {
      sort = { price: sortOrder };
    } else if (sortBy === 'name') {
      sort = { name: sortOrder };
    } else if (sortBy === 'rating') {
      sort = { 'ratings.average': sortOrder };
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        category,
        products,
        pagination: {
          current: page,
          pages: totalPages,
          total,
          limit,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching category products'
    });
  }
};