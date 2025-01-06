import { Router } from 'express';
import { getMultimediaByTravelId, addMultimedia, deleteMultimedia } from '../controllers/multimediaController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

// Pobierz multimedia dla danej podróży
router.get('/:travelId', getMultimediaByTravelId as any);

// Dodaj multimedia do danej podróży
router.post('/:travelId', addMultimedia as any);

router.delete("/:travelId/:multimediaId", deleteMultimedia as any)

export default router;
