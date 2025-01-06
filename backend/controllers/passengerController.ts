import { Request, Response, NextFunction } from 'express';
import Passenger from '../models/Passenger';

export const uploadPassengerPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const { travelId, name } = req.body;

    if (!travelId || !name) {
      res.status(400).json({ error: 'Missing required fields: travelId or name' });
      return;
    }

    const photoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    

    const passenger = await Passenger.create({
      travel_id: travelId,
      name,
      photo_url: photoUrl,
    });

    res.status(201).json({
      message: 'Passenger photo uploaded successfully',
      passenger,
    });
  } catch (error) {
    console.error('❌ Error uploading passenger photo:', error);
    next(error); // Przekazanie błędu do middleware błędów Express
  }
};
