// import { Router, Response } from 'express';
// import { protect, CustomRequest } from '../middleware/authMiddleware';

// const router = Router();

// router.get('/profile', protect, (req: CustomRequest, res: Response) => {
//   if (!req.user) {
//     return res.status(401).json({ error: 'User not authenticated' });
//   }

//   res.json({ message: 'You are authorized!', userId: req.user.id });
// });

// export default router;
