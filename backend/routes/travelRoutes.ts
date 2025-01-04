// import { Router } from 'express';
// import { protect } from '../middleware/authMiddleware';
// import { createTravel, deleteTravel, getAllTravels, getTravelById, updateTravel } from '../controllers/travelController';

// const router = Router();

// // router.post('/create', protect, (req, res) => createTravel(req as any, res));
// // router.get('/:id', protect, (req, res) => getTravelById(req as any, res));
// // Ścieżki dla podróży
// router.post('/travels', createTravel);
// router.get('/travels', getAllTravels);
// router.get('/travels/:id', getTravelById);
// router.put('/travels/:id', updateTravel);
// router.delete('/travels/:id', deleteTravel);

// export default router;
import { Router, Request, Response, NextFunction } from 'express';
import {
  getAllTravels,
  getTravelById,
  updateTravel,
  deleteTravel,
  createTravel,
} from '../controllers/travelController';
import { protect } from '../middleware/authMiddleware';

// Middleware obsługujący funkcje async
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const router = Router();

router.use(protect);

// Tworzenie nowej podróży
router.post('/', asyncHandler(createTravel));

// Pobierz wszystkie podróże
router.get('/', asyncHandler(getAllTravels));

// Pobierz podróż po ID
router.get('/:id', asyncHandler(getTravelById));

// Aktualizuj podróż
router.put('/:id', asyncHandler(updateTravel));

// Usuń podróż
router.delete('/:id', asyncHandler(deleteTravel));

export default router;
