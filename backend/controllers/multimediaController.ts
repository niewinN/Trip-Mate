import { Request, Response } from 'express';
import Multimedia from '../models/Multimedia';
import { Op } from 'sequelize';
import fs from 'fs'
import path from 'path'

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

// 🟢 Pobierz multimedia dla wycieczki
export const getMultimediaByTravelId = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { travelId } = req.params;
    const multimedia = await Multimedia.findAll({
      where: { travel_id: travelId },
    });

    res.status(200).json(multimedia);
  } catch (error) {
    console.error('❌ Error fetching multimedia:', error);
    res.status(500).json({ error: 'Failed to fetch multimedia' });
  }
};

// 🟢 Dodaj multimedia
export const addMultimedia = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
      const { travelId } = req.params; // 🟢 Zmień na travelId
      console.log('🔍 Received travel ID:', travelId); // Logowanie dla debugowania
      
      if (!travelId || isNaN(Number(travelId))) {
        return res.status(400).json({ error: 'Invalid travel ID provided' });
      }
  
      const { url, type } = req.body;
  
      if (!url) {
        return res.status(400).json({ error: 'No URL provided for multimedia' });
      }
  
      const multimedia = await Multimedia.create({
        travel_id: parseInt(travelId, 10),
        url,
        type: type || 'unknown',
      });
  
      return res.status(201).json({
        message: 'Multimedia added successfully',
        multimedia,
      });
    } catch (error) {
      console.error('❌ Error adding multimedia:', error);
      return res.status(500).json({ error: 'Failed to add multimedia' });
    }
  };
  
/** 🗑️ Usuń multimedia */
export const deleteMultimedia = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
        const { travelId, multimediaId } = req.params;
    
        console.log(`🔄 Deleting multimedia with travelId: ${travelId}, multimediaId: ${multimediaId}`);
    
        if (!travelId || !multimediaId) {
          return res.status(400).json({ error: 'Missing travelId or multimediaId' });
        }
    
        // Znajdź rekord multimediów w bazie danych
        const multimedia = await Multimedia.findOne({
          where: {
            id: multimediaId,
            travel_id: travelId,
          },
        });
    
        if (!multimedia) {
          return res.status(404).json({ error: 'Multimedia not found' });
        }
    
        // Ścieżka do pliku
        const filePath = path.join(__dirname, '..', 'uploads', path.basename(multimedia.url));
    
        // Usuń plik z serwera, jeśli istnieje
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`🗑️ File deleted from uploads: ${filePath}`);
        } else {
          console.warn(`⚠️ File not found on disk: ${filePath}`);
        }
    
        // Usuń rekord z bazy danych
        await Multimedia.destroy({
          where: {
            id: multimediaId,
            travel_id: travelId,
          },
        });
    
        console.log('✅ Multimedia deleted successfully');
        return res.status(200).json({ message: 'Multimedia deleted successfully' });
      } catch (error) {
        console.error('❌ Error deleting multimedia:', error);
        return res.status(500).json({ error: 'Failed to delete multimedia' });
      }
    };