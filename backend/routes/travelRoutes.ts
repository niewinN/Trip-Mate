import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { createTravel, getTravelById } from '../controllers/travelController';

const router = Router();

router.post('/create', protect, (req, res) => createTravel(req as any, res));
router.get('/:id', protect, (req, res) => getTravelById(req as any, res));

export default router;
