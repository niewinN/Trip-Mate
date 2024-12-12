const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const API_KEY = process.env.SERPAPI_KEY;

app.get('/api/hotels', async (req, res) => {
  try {
    const { q = 'Warsaw', check_in_date = '2024-11-20', check_out_date = '2024-11-25' } = req.query;

    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_hotels',
        q,
        check_in_date,
        check_out_date,
        api_key: API_KEY,
      },
    });

    const hotels = (response.data.properties || []).map((hotel) => ({
      name: hotel.name,
      description: hotel.description,
      logo: hotel.logo || null,
      images: hotel.images || [],
      rate_per_night: hotel.rate_per_night || {},
      hotel_class: hotel.hotel_class || null,
      overall_rating: hotel.overall_rating || 0,
      reviews: hotel.reviews || 0,
      check_in_time: hotel.check_in_time || null,
      check_out_time: hotel.check_out_time || null,
      amenities: hotel.amenities || [],
      nearby_places: hotel.nearby_places || [],
      deal: hotel.deal || null,
    }));

    res.json(hotels);
  } catch (error) {
    handleError(res, error, 'Błąd podczas pobierania hoteli');
  }
});


app.get('/api/flights', async (req, res) => {
  const { departure_id, arrival_id, outbound_date, return_date } = req.query;

  // Sprawdzanie wymaganych parametrów
  if (!departure_id || !arrival_id || !outbound_date || !return_date) {
    return res.status(400).json({ error: 'Brak wymaganych parametrów' });
  }

  try {
    console.log('Zapytanie do API z parametrami:', { departure_id, arrival_id, outbound_date, return_date });

    // Zapytanie do zewnętrznego API
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_flights',
        departure_id,
        arrival_id,
        outbound_date,
        return_date,
        api_key: process.env.SERPAPI_KEY,
      },
    });

    console.log('Odpowiedź API:', response.data);

    if (!response.data.best_flights) {
      return res.status(404).json({ error: 'Nie znaleziono lotów' });
    }

    // Przetwarzanie wyników
    const flights = response.data.best_flights.map((flight) => ({
      airline: flight.flights[0].airline,
      airline_logo: flight.flights[0].airline_logo,
      departure: {
        airport: flight.flights[0].departure_airport.name,
        time: flight.flights[0].departure_airport.time,
      },
      arrival: {
        airport: flight.flights[flight.flights.length - 1].arrival_airport.name,
        time: flight.flights[flight.flights.length - 1].arrival_airport.time,
      },
      stops: flight.flights.length - 1,
      totalDuration: flight.total_duration,
      price: flight.price,
    }));

    res.json(flights);
  } catch (error) {
    console.error('Błąd podczas pobierania lotów:', error.message);
    res.status(500).json({ error: 'Błąd podczas pobierania lotów' });
  }
});


// // Endpoint do wyszukiwania restauracji
// app.get('/api/restaurants', async (req, res) => {
//   const { location = 'Warsaw' } = req.query;

//   try {
//     const response = await axios.get('https://serpapi.com/search', {
//       params: {
//         engine: 'google_local',
//         q: 'restaurant',
//         location,
//         api_key: process.env.SERPAPI_KEY,
//       },
//     });

//     // Mapowanie danych restauracji
//     const restaurants = (response.data.local_results || []).map((restaurant) => ({
//       title: restaurant.title,
//       rating: restaurant.rating,
//       reviews_original: restaurant.reviews_original,
//       reviews: restaurant.reviews,
//       price: restaurant.price || 'No price data',
//       type: restaurant.type || 'No type specified',
//       address: restaurant.address || 'No address provided',
//       description: restaurant.description || 'No description available.',
//       thumbnail: extractGoogleImage(restaurant),
//     }));

//     res.json(restaurants);
//   } catch (error) {
//     console.error('Error fetching restaurants:', error.message);
//     res.status(500).json({ error: 'Failed to fetch restaurants' });
//   }
// });

// // Funkcja do wyboru najlepszego obrazu
// function extractGoogleImage(restaurant) {
//   const serpapiThumbnail = restaurant.thumbnail || null;

//   // Sprawdź, czy istnieją linki do `lh3.googleusercontent.com`
//   if (serpapiThumbnail && serpapiThumbnail.includes('googleusercontent.com')) {
//     return adjustGoogleImageSize(serpapiThumbnail, 500, 500); // Zwiększamy rozdzielczość
//   }

//   // Jeśli brak linku do `googleusercontent.com`, użyj domyślnego thumbnail
//   return serpapiThumbnail || 'https://via.placeholder.com/500x500?text=No+Image+Available';
// }

// // Funkcja zmieniająca rozmiar obrazka
// function adjustGoogleImageSize(url, width, height) {
//   return url.replace(/w\d+-h\d+/g, `w${width}-h${height}`);
// }
// app.get('/api/restaurants', async (req, res) => {
//   const { location = 'Warsaw', start = 0 } = req.query;

//   try {
//     const response = await axios.get('https://serpapi.com/search', {
//       params: {
//         engine: 'google_local',
//         q: 'restaurant',
//         location,
//         start,
//         api_key: process.env.SERPAPI_KEY,
//       },
//     });

//     // Sprawdź, czy dane są dostępne
//     if (!response.data || !response.data.local_results) {
//       return res.status(404).json({ error: 'No local results found' });
//     }

//     // Mapowanie danych restauracji
//     const restaurants = response.data.local_results.map((restaurant) => ({
//       title: restaurant.title,
//       rating: restaurant.rating,
//       reviews_original: restaurant.reviews_original,
//       reviews: restaurant.reviews,
//       price: restaurant.price || 'No price data',
//       type: restaurant.type || 'No type specified',
//       address: restaurant.address || 'No address provided',
//       description: restaurant.description || 'No description available.',
//       thumbnail: extractGoogleImage(restaurant),
//     }));

//     res.json(restaurants);
//   } catch (error) {
//     console.error('Error fetching restaurants:', error.message);
//     res.status(500).json({ error: 'Failed to fetch restaurants' });
//   }
// });

// // Funkcja do wyboru najlepszego obrazu
// function extractGoogleImage(restaurant) {
//   const serpapiThumbnail = restaurant.thumbnail || null;

//   // Sprawdź, czy istnieją linki do `lh3.googleusercontent.com` lub `lh5.googleusercontent.com`
//   if (serpapiThumbnail && /lh[3-6]\.googleusercontent\.com/.test(serpapiThumbnail)) {
//     return adjustGoogleImageSize(serpapiThumbnail, 500, 500); // Zwiększamy rozdzielczość
//   }

//   // Jeśli brak linku do `googleusercontent.com`, użyj domyślnego thumbnail
//   return serpapiThumbnail || 'https://via.placeholder.com/500x500?text=No+Image+Available';
// }

// // Funkcja zmieniająca rozmiar obrazka
// function adjustGoogleImageSize(url, width, height) {
//   return url.replace(/w\d+-h\d+/g, `w${width}-h${height}`);
// }
// Endpoint do wyszukiwania restauracji
app.get('/api/restaurants', async (req, res) => {
  const { location = 'Warsaw', start = 0 } = req.query;

  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_local',
        q: 'restaurant',
        location,
        start,
        api_key: process.env.SERPAPI_KEY,
      },
    });

    // Mapowanie danych restauracji
    const restaurants = (response.data.local_results || []).map((restaurant) => ({
      title: restaurant.title || 'No title available',
      rating: restaurant.rating || 'No rating',
      reviews_original: restaurant.reviews_original || 'No reviews',
      reviews: restaurant.reviews || 0,
      price: restaurant.price || 'No price data',
      type: restaurant.type || 'No type specified',
      address: restaurant.address || 'No address provided',
      description: restaurant.description || 'No description available.',
      thumbnail: restaurant.thumbnail || 'https://via.placeholder.com/500x500?text=No+Image',
    }));

    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

app.get('/api/attractions', async (req, res) => {
  const { location = 'New York' } = req.query;

  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_local',
        q: 'attractions',
        location,
        api_key: process.env.SERPAPI_KEY,
      },
    });

    // Mapowanie danych atrakcji
    const attractions = (response.data.local_results || []).map((attraction) => ({
      title: attraction.title,
      description: attraction.description || 'No description available.',
      thumbnail: attraction.thumbnail || 'https://via.placeholder.com/500x500?text=No+Image+Available',
    }));

    res.json(attractions);
  } catch (error) {
    console.error('Error fetching attractions:', error.message);
    res.status(500).json({ error: 'Failed to fetch attractions' });
  }
});





// Funkcja obsługi błędów
function handleError(res, error, defaultMessage) {
  console.error(defaultMessage);

  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Dane błędu:', error.response.data);
    res.status(500).json({
      error: defaultMessage,
      details: error.response.data,
    });
  } else {
    console.error('Wiadomość błędu:', error.message);
    res.status(500).json({
      error: defaultMessage,
      details: error.message,
    });
  }
}

// Start serwera
app.listen(PORT, () => {
  console.log(`Backend działa na http://localhost:${PORT}`);
});
