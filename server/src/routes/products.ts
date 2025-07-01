import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getProductsByCategory
} from '../controllers/productController';

const router = express.Router();

// Product validation
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('sku')
    .trim()
    .isLength({ min: 1 })
    .withMessage('SKU is required'),
  body('category')
    .isMongoId()
    .withMessage('Valid category ID is required'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required'),
  body('inventory.stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('shipping.weight')
    .isFloat({ min: 0 })
    .withMessage('Weight must be a positive number')
];

// Public routes
router.get('/', (req: Request, res: Response) => getProducts(req, res));
router.get('/featured', (req: Request, res: Response) => getFeaturedProducts(req, res));
router.get('/category/:categorySlug', (req: Request, res: Response) => getProductsByCategory(req, res));
router.get('/:id', (req: Request, res: Response) => getProduct(req, res));

// Admin routes
router.post('/', protect, authorize('admin'), productValidation, (req: Request, res: Response) => createProduct(req, res));
router.put('/:id', protect, authorize('admin'), productValidation, (req: Request, res: Response) => updateProduct(req, res));
router.delete('/:id', protect, authorize('admin'), (req: Request, res: Response) => deleteProduct(req, res));

export default router;