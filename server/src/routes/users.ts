import express, { Request, Response } from 'express';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Placeholder routes - will be implemented later
router.get('/', protect, authorize('admin'), (req: Request, res: Response) => {
  res.json({ message: 'Users route - GET all users (admin only)' });
});

router.get('/:id', protect, authorize('admin'), (req: Request, res: Response) => {
  res.json({ message: `Users route - GET user ${req.params.id} (admin only)` });
});

router.put('/:id', protect, authorize('admin'), (req: Request, res: Response) => {
  res.json({ message: `Users route - UPDATE user ${req.params.id} (admin only)` });
});

router.delete('/:id', protect, authorize('admin'), (req: Request, res: Response) => {
  res.json({ message: `Users route - DELETE user ${req.params.id} (admin only)` });
});

export default router;