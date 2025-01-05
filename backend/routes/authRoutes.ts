import { Router, Request, Response } from 'express';
import { register, login, getUserProfile, updateUserProfile } from '../controllers/authController';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  await register(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  await login(req, res);
});

router.get('/profile', async (req: Request, res: Response) => {
  await getUserProfile(req, res);
});

router.put('/profile', async (req: Request, res: Response) => {
  await updateUserProfile(req, res);
});


export default router;
