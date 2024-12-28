import express, { Request, Response } from 'express';
import { getHotels, getFlights, getRestaurants, getCityImage, getAttractions } from '../controllers/dataController';

const router = express.Router();

// 🏨 Hotele
router.get('/hotels', (req: Request, res: Response) => {
  getHotels(req, res).catch((error) => {
    console.error('Error in getHotels route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

// ✈️ Loty
router.get('/flights', (req: Request, res: Response) => {
  getFlights(req, res).catch((error) => {
    console.error('Error in getFlights route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

// 🍽️ Restauracje
router.get('/restaurants', (req: Request, res: Response) => {
  getRestaurants(req, res).catch((error) => {
    console.error('Error in getRestaurants route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

// 🏙️ Atrakcji
router.get('/attractions', (req: Request, res: Response) => {
  getAttractions(req, res).catch((error) => {
    console.error('Error in getAttractions route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

// 🏙️ Zdjęcia Miast
router.get('/city-image', (req: Request, res: Response) => {
  getCityImage(req, res).catch((error) => {
    console.error('Error in getCityImage route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

export default router;
