import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'
import authRoutes from './routes/authRoutes';
import dataRoutes from './routes/dataRoutes';
import travelRoutes from './routes/travelRoutes';
import multimediaRoutes from "./routes/multimediaRoutes"
import uploadRoutes from "./routes/uploadRoutes"
// import protectedRoutes from "./routes/protectedRoutes"

// Konfiguracja zmiennych środowiskowych
dotenv.config();

// Inicjalizacja aplikacji Express
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ **1. Middleware**

// CORS – Zezwól na żądania z innych domen
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // Możesz ustawić na konkretne domeny w zmiennych środowiskowych
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parsowanie JSON i URL-encoded danych
app.use(express.json({ limit: '10mb' })); // Maksymalny rozmiar JSON: 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Parsowanie URL-encoded

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('uploads'));
// ✅ **2. Trasy (Routes)**

// Trasy autoryzacyjne
app.use('/api/auth', authRoutes);

// Trasy związane z danymi
app.use('/api/data', dataRoutes);

// Trasy związane z podróżami
app.use('/api/travels', travelRoutes);

app.use('/api/upload', uploadRoutes)

app.use('/api/multimedia', multimediaRoutes)


// Przykład trasy chronionej
// app.use('/api/protected', protectedRoutes);

// ✅ **3. Obsługa nieistniejących tras (404)**
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
  });
});

// ✅ **4. Obsługa błędów globalnych**
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err.stack || err.message);

  res.status(err.status || 500).json({
    error: 'Something went wrong!',
    details: err.message || 'Unknown error occurred',
  });
});

// ✅ **5. Start serwera**
app.listen(PORT, () => {
  console.log(`🚀 Backend działa na http://localhost:${PORT}`);
});
