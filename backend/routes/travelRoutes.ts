import { Router, Request, Response, NextFunction } from 'express';
import {
  getAllTravels,
  getTravelById,
  updateTravel,
  deleteTravel,
  createTravel,
  getUserTrips,
} from '../controllers/travelController';
import { protect } from '../middleware/authMiddleware';

// Middleware obsługujący funkcje async
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const router = Router();

router.use(protect);

router.get('/user-trips', asyncHandler(getUserTrips))

// Tworzenie nowej podróży
router.post('/', asyncHandler(createTravel));

// Pobierz wszystkie podróże
router.get('/', asyncHandler(getAllTravels));

// Pobierz podróż po ID
router.get('/:id', asyncHandler(getTravelById));

// Aktualizuj podróż
router.put('/:id', asyncHandler(updateTravel));

// Usuń podróż
router.delete('/:travelId/multimediaId', asyncHandler(deleteTravel));


export default router;
