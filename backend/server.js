const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const API_KEY = process.env.SERPAPI_KEY;

// Endpoint do wyszukiwania hoteli
app.get('/api/hotels', async (req, res) => {
  try {
    const { q = 'Warsaw', check_in_date = '2024-11-20', check_out_date = '2024-11-25' } = req.query;

    console.log('Parametry zapytania:', { q, check_in_date, check_out_date });

    // Wysłanie zapytania do SerpApi
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_hotels',
        q,
        check_in_date,
        check_out_date,
        api_key: API_KEY, // Zamień na swój rzeczywisty klucz API
      },
    });

    console.log('Odpowiedź API:', response.data); // Logowanie odpowiedzi API

    // Pobranie listy hoteli z `properties`
    const hotels = response.data.properties || [];
    res.json(hotels);
  } catch (error) {
    console.error('Błąd podczas pobierania hoteli:');

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Dane błędu:', error.response.data);
      res.status(500).json({
        error: 'Błąd API SerpApi',
        details: error.response.data,
      });
    } else {
      console.error('Wiadomość błędu:', error.message);
      res.status(500).json({
        error: 'Błąd serwera',
        details: error.message,
      });
    }
  }
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Backend działa na http://localhost:${PORT}`);
});
