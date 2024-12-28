import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Typ dla niestandardowego żądania z użytkownikiem
export interface CustomRequest extends Request {
  user?: { id: number };
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    (req as CustomRequest).user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('❌ Token validation error:', error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};
