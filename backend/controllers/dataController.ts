import { Request, Response } from 'express';
import { handleError } from '../utils/handleError';
import axios from 'axios';

// 🔑 **Klucz API SerpAPI**
const API_KEY = process.env.SERPAPI_KEY;

// 🏨 **Pobieranie Hoteli**
export const getHotels = async (req: Request, res: Response) => {
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

    console.log('🔍 Full Hotel Response from SerpAPI:', JSON.stringify(response.data, null, 2));

    const hotels = (response.data.properties || []).map((hotel: any) => ({
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
  } catch (error: any) {
    handleError(res, error, 'Błąd podczas pobierania hoteli');
  }
};

// ✈️ **Mapa miast na kody lotnisk**
const cityToAirportCode: Record<string, string> = {
  Warsaw: 'WAW',
  London: 'LHR',
  Paris: 'CDG',
  NewYork: 'JFK',
  Barcelona: 'BCN',
};

// ✈️ **Pobieranie kodu lotniska**
export const getAirportCode = async (city: string): Promise<string> => {
  if (cityToAirportCode[city]) {
    return cityToAirportCode[city];
  }
  throw new Error(`Nie znaleziono kodu lotniska dla miasta: ${city}`);
};

// ✈️ **Pobieranie Lotów**
export const getFlights = async (req: Request, res: Response) => {
  try {
    const { departure_city, arrival_city, departure_date, return_date, passengers } = req.query;

    if (!departure_city || !arrival_city || !departure_date || !return_date || !passengers) {
      return res.status(400).json({ error: 'Brak wymaganych parametrów' });
    }

    const departure_id = await getAirportCode(departure_city as string);
    const arrival_id = await getAirportCode(arrival_city as string);

    const flightsResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_flights',
        departure_id,
        arrival_id,
        outbound_date: departure_date,
        return_date,
        passengers,
        currency: 'PLN',
        hl: 'en',
        api_key: API_KEY,
      },
    });

    // console.log('🔍 Full Flight Response from SerpAPI:', JSON.stringify(flightsResponse.data, null, 2));

    const bestFlights = flightsResponse.data.best_flights?.map((flight: any) => ({
      ...flight,
      airline: flight.flights[0]?.airline || 'Unknown',
      airline_logo: flight.airline_logo || 'Unknown',
      totalDuration: flight.total_duration || 0,
      price: flight.price || 'N/A',
      segments: flight.flights.map((segment: any) => ({
        departure: {
          airport: segment.departure_airport?.name || 'Unknown Airport',
          time: segment.departure_airport?.time || 'N/A',
        },
        arrival: {
          airport: segment.arrival_airport?.name || 'Unknown Airport',
          time: segment.arrival_airport?.time || 'N/A',
        },
        duration: segment.duration || 0,
      })),
    }));

    const googleFlightsUrl = flightsResponse.data.search_metadata?.google_flights_url || null;

    if (!bestFlights || bestFlights.length === 0) {
      return res.status(404).json({ error: 'Brak wyników dla podanych parametrów.' });
    }

    // 🛫 Zwracamy loty i link do Google Flights
    res.json({
      flights: bestFlights,
      googleFlightsUrl, // 🔗 Dodany link do Google Flights
    });
  } catch (error: any) {
    handleError(res, error, 'Błąd podczas pobierania lotów');
  }
};

//     if (!bestFlights || bestFlights.length === 0) {
//       return res.status(404).json({ error: 'Brak wyników dla podanych parametrów.' });
//     }

//     res.json(bestFlights);
//   } catch (error: any) {
//     handleError(res, error, 'Błąd podczas pobierania lotów');
//   }
// };

// 🍽️ **Pobieranie Restauracji**
export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const { location = 'Warsaw', start = 0 } = req.query;

    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_local',
        q: 'restaurant',
        location,
        start,
        api_key: API_KEY,
      },
    });

    const restaurants = (response.data.local_results || []).map((restaurant: any) => ({
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
  } catch (error: any) {
    handleError(res, error, 'Błąd podczas pobierania restauracji');
  }
};

// 🏙️ **Pobieranie Atrakcji**
export const getAttractions = async (req: Request, res: Response) => {
  try {
    const { location = 'New York' } = req.query;

    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_local',
        q: 'attractions',
        location,
        api_key: API_KEY,
      },
    });

    const attractions = (response.data.local_results || []).map((attraction: any) => ({
      title: attraction.title,
      description: attraction.description || 'No description available.',
      thumbnail: attraction.thumbnail || 'https://via.placeholder.com/500x500?text=No+Image+Available',
    }));

    res.json(attractions);
  } catch (error: any) {
    handleError(res, error, 'Błąd podczas pobierania atrakcji');
  }
};

// 🏙️ **Pobieranie Obrazka Miasta**
export const getCityImage = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_images',
        q,
        ijn: '0',
        api_key: API_KEY,
      },
    });

    const imageResults = response.data.images_results;
    const imageUrl = imageResults?.[0]?.original || 'https://via.placeholder.com/800x600?text=No+Image+Available';

    res.json({ image: imageUrl });
  } catch (error: any) {
    handleError(res, error, 'Błąd podczas pobierania obrazka miasta');
  }
};
