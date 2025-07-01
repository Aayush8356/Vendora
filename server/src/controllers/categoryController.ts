import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Category } from '../models/Category';

// Get all categories
export const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('parent', 'name slug')
      .sort({ sortOrder: 1, name: 1 })
      .lean();

    return res.json({
      success: true,
      data: { categories }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching categories'
    });
  }
};

// Get single category
export const getCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    
    const category = await Category.findOne({
      $or: [
        { _id: id },
        { slug: id }
      ],
      isActive: true
    }).populate('parent', 'name slug');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    return res.json({
      success: true,
      data: { category }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching category'
    });
  }
};

// Create new category (admin only)
export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const categoryData = req.body;

    // Check if parent category exists (if provided)
    if (categoryData.parent) {
      const parentCategory = await Category.findById(categoryData.parent);
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          message: 'Parent category not found'
        });
      }
    }

    const category = await Category.create(categoryData);
    await category.populate('parent', 'name slug');

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error creating category'
    });
  }
};

// Update category (admin only)
export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
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

    // Check if parent category exists (if being updated)
    if (updateData.parent) {
      const parentCategory = await Category.findById(updateData.parent);
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          message: 'Parent category not found'
        });
      }

      // Prevent setting self as parent
      if (updateData.parent === id) {
        return res.status(400).json({
          success: false,
          message: 'Category cannot be its own parent'
        });
      }
    }

    const category = await Category.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('parent', 'name slug');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    return res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error updating category'
    });
  }
};

// Delete category (admin only)
export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    // Check if category has child categories
    const childCategories = await Category.findOne({ parent: id });
    if (childCategories) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with child categories'
      });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    return res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting category'
    });
  }
};