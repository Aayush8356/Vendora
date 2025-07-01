import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { protect, authorize } from '../middleware/auth';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController';

const router = express.Router();

// Category validation
const categoryValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters'),
  body('parent')
    .optional()
    .isMongoId()
    .withMessage('Parent must be a valid category ID'),
  body('sortOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Sort order must be a non-negative integer')
];

// Public routes
router.get('/', (req: Request, res: Response) => getCategories(req, res));
router.get('/:id', (req: Request, res: Response) => getCategory(req, res));

// Admin routes
router.post('/', protect, authorize('admin'), categoryValidation, (req: Request, res: Response) => createCategory(req, res));
router.put('/:id', protect, authorize('admin'), categoryValidation, (req: Request, res: Response) => updateCategory(req, res));
router.delete('/:id', protect, authorize('admin'), (req: Request, res: Response) => deleteCategory(req, res));

export default router;