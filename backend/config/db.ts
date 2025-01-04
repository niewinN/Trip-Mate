// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// });

// // Testowanie połączenia
// pool.connect()
//   .then(() => console.log('✅ Database connected successfully'))
//   .catch((err) => console.error('❌ Database connection error:', err));

// export default pool;
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Inicjalizacja Sequelize z odpowiednimi opcjami
const sequelize = new Sequelize(
  process.env.DB_NAME || 'database',
  process.env.DB_USER || 'user',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres', // Ważne, żeby określić odpowiedni dialekt
    logging: false, // Wyłącz logowanie SQL, jeśli nie jest potrzebne
    pool: {
      max: 5, // Maksymalna liczba połączeń
      min: 0, // Minimalna liczba połączeń
      acquire: 30000, // Maksymalny czas oczekiwania na połączenie (ms)
      idle: 10000, // Czas bezczynności połączenia przed zamknięciem (ms)
    },
    dialectOptions: {
      useUTC: false, // Używaj lokalnego czasu
      dateStrings: true, // Konwertuj daty na stringi
      typeCast: true, // Automatyczne parsowanie dat
    },
    timezone: '+00:00', // Ustaw strefę czasową UTC
    
  }
);

// Testowanie połączenia
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
})();

export default sequelize;
