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


// Mapa miast na kody lotnisk
const cityToAirportCode = {
  Warsaw: "WAW",
  London: "LHR",
  Paris: "CDG",
  NewYork: "JFK",
  Barcelona: "BCN",
  // Add more cities as needed
};

const getAirportCode = async (city) => {
  if (cityToAirportCode[city]) {
    return cityToAirportCode[city];
  }
  throw new Error(`Nie znaleziono kodu lotniska dla miasta: ${city}`);
};

// Endpoint do wyszukiwania lotów
app.get("/api/flights", async (req, res) => {
  const { departure_city, arrival_city, departure_date, return_date, passengers } = req.query;

  if (!departure_city || !arrival_city || !departure_date || !return_date || !passengers) {
    return res.status(400).json({ error: "Brak wymaganych parametrów" });
  }

  try {
    const departure_id = await getAirportCode(departure_city);
    const arrival_id = await getAirportCode(arrival_city);

    const flightsResponse = await axios.get("https://serpapi.com/search.json", {
      params: {
        engine: "google_flights",
        departure_id,
        arrival_id,
        outbound_date: departure_date,
        return_date,
        passengers,
        currency: "PLN",
        hl: "en",
        api_key: process.env.SERPAPI_KEY,
      },
    });

    const bestFlights = flightsResponse.data.best_flights?.map((flight) => ({
      airline: flight.flights[0]?.airline || "Unknown",
      airline_logo: flight.airline_logo,
      totalDuration: flight.total_duration,
      price: flight.price,
      segments: flight.flights.map((segment) => ({
        departure: {
          airport: segment.departure_airport.name,
          time: segment.departure_airport.time,
        },
        arrival: {
          airport: segment.arrival_airport.name,
          time: segment.arrival_airport.time,
        },
        duration: segment.duration,
      })),
    }));

    if (!bestFlights || bestFlights.length === 0) {
      return res.status(404).json({ error: "Brak wyników dla podanych parametrów." });
    }

    res.json(bestFlights);
  } catch (error) {
    console.error("Błąd podczas przetwarzania lotów:", error.message);
    res.status(500).json({ error: "Nie udało się pobrać lotów." });
  }
});




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
