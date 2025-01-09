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

    // console.log('🔍 Full Hotel Response from SerpAPI:', JSON.stringify(response.data, null, 2));

    const hotels = (response.data.properties || []).map((hotel: any) => ({
      name: hotel.name,
      description: hotel.description,
      logo: hotel.logo || null,
      images: hotel.images || [],
      rate_per_night: hotel.rate_per_night || {},
      total_rate: hotel.total_rate || {},
      hotel_class: hotel.hotel_class || null,
      overall_rating: hotel.overall_rating || 0,
      reviews: hotel.reviews || 0,
      check_in_time: hotel.check_in_time || null,
      check_out_time: hotel.check_out_time || null,
      amenities: hotel.amenities || [],
      nearby_places: hotel.nearby_places || [],
      reviews_breakdown: hotel.reviews_breakdown || [],
      deal: hotel.deal || null,
      deal_description: hotel.deal_description || null,
      gps_coordinates: hotel.gps_coordinates || {},
      eco_certified: hotel.eco_certified || false,
      property_token: hotel.property_token || null,
      serpapi_property_details_link: hotel.serpapi_property_details_link || null,
      link: hotel.link || null,
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
// export const getFlights = async (req: Request, res: Response) => {
//   try {
//     const { departure_city, arrival_city, departure_date, return_date, passengers } = req.query;

//     if (!departure_city || !arrival_city || !departure_date || !return_date || !passengers) {
//       return res.status(400).json({ error: 'Brak wymaganych parametrów' });
//     }

//     const departure_id = await getAirportCode(departure_city as string);
//     const arrival_id = await getAirportCode(arrival_city as string);

//     const flightsResponse = await axios.get('https://serpapi.com/search.json', {
//       params: {
//         engine: 'google_flights',
//         departure_id,
//         arrival_id,
//         outbound_date: departure_date,
//         return_date,
//         passengers,
//         currency: 'PLN',
//         hl: 'en',
//         api_key: API_KEY,
//       },
//     });

//     // console.log('🔍 Full Flight Response from SerpAPI:', JSON.stringify(flightsResponse.data, null, 2));

//     const bestFlights = flightsResponse.data.best_flights?.map((flight: any) => ({
//       ...flight,
//       airline: flight.flights[0]?.airline || 'Unknown',
//       airline_logo: flight.airline_logo || 'Unknown',
//       totalDuration: flight.total_duration || 0,
//       price: flight.price || 'N/A',
//       segments: flight.flights.map((segment: any) => ({
//         departure: {
//           airport: segment.departure_airport?.name || 'Unknown Airport',
//           time: segment.departure_airport?.time || 'N/A',
//         },
//         arrival: {
//           airport: segment.arrival_airport?.name || 'Unknown Airport',
//           time: segment.arrival_airport?.time || 'N/A',
//         },
//         duration: segment.duration || 0,
//       })),
//     }));

//     const googleFlightsUrl = flightsResponse.data.search_metadata?.google_flights_url || null;

//     if (!bestFlights || bestFlights.length === 0) {
//       return res.status(404).json({ error: 'Brak wyników dla podanych parametrów.' });
//     }

//     // 🛫 Zwracamy loty i link do Google Flights
//     res.json({
//       flights: bestFlights,
//       googleFlightsUrl, // 🔗 Dodany link do Google Flights
//     });
//   } catch (error: any) {
//     handleError(res, error, 'Błąd podczas pobierania lotów');
//   }
// };
export const getFlights = async (req: Request, res: Response) => {
  try {
    const { departure_city, arrival_city, departure_date, return_date, passengers } = req.query;

    if (!departure_city || !arrival_city || !departure_date || !return_date || !passengers) {
      return res.status(400).json({ error: 'Brak wymaganych parametrów' });
    }

    const departure_id = await getAirportCode(departure_city as string);
    const arrival_id = await getAirportCode(arrival_city as string);

    // 🛫 Lot wychodzący (One-way)
    const outboundResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_flights',
        departure_id,
        arrival_id,
        outbound_date: departure_date,
        return_date: departure_date, // Dodanie return_date jako departure_date
        passengers,
        currency: 'PLN',
        hl: 'en',
        api_key: API_KEY,
      },
    });

    const outboundFlights = outboundResponse.data.best_flights?.map((flight: any) => ({
      airline: flight.flights[0]?.airline || 'Unknown',
      airline_logo: flight.airline_logo || '',
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
    })) || [];

    // 🛬 Lot powrotny (One-way)
    const returnResponse = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_flights',
        departure_id: arrival_id, // Zamiana miast
        arrival_id: departure_id,
        outbound_date: return_date, // Data powrotu jako outbound
        return_date: return_date, // Dodanie return_date jako outbound_date
        passengers,
        currency: 'PLN',
        hl: 'en',
        api_key: API_KEY,
      },
    });

    const returnFlights = returnResponse.data.best_flights?.map((flight: any) => ({
      airline: flight.flights[0]?.airline || 'Unknown',
      airline_logo: flight.airline_logo || '',
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
    })) || [];

    // Zwracamy oba zestawy lotów
    res.json({
      outboundFlights,
      returnFlights,
      googleFlightsUrl: outboundResponse.data.search_metadata?.google_flights_url || null,
    });
  } catch (error: any) {
    console.error('❌ Error fetching flights:', error.response?.data || error.message);
    res.status(500).json({ error: 'Błąd podczas pobierania lotów' });
  }
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const { location = 'London', start = 0 } = req.query;

    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_local',
        q: 'restaurant',
        location,
        start,
        api_key: API_KEY,
      },
    });

    // console.log('🔍 Full Restaurant Response from SerpAPI:', JSON.stringify(response.data, null, 2));

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
      phone: restaurant.phone || 'No phone number available',
      hours: restaurant.hours || 'No opening hours',
      links: restaurant.links || {},
      gps_coordinates: restaurant.gps_coordinates || null,
      place_id_search: restaurant.place_id_search || null,
    }));

    res.json(restaurants);
  } catch (error: any) {
    handleError(res, error, 'Błąd podczas pobierania restauracji');
  }
};


// 🏙️ **Pobieranie Atrakcji**
// export const getAttractions = async (req: Request, res: Response) => {
//   try {
//     const { location = 'New York' } = req.query;

//     const response = await axios.get('https://serpapi.com/search', {
//       params: {
//         engine: 'google_local',
//         q: 'attractions',
//         location,
//         api_key: API_KEY,
//       },
//     });

//     console.log('🔍 Full Attraction Response from SerpAPI:', JSON.stringify(response.data, null, 2));

//     const attractions = (response.data.local_results || []).map((attraction: any) => ({
//       title: attraction.title,
//       description: attraction.description || 'No description available.',
//       thumbnail: attraction.thumbnail || 'https://via.placeholder.com/500x500?text=No+Image+Available',
//     }));

//     res.json(attractions);
//   } catch (error: any) {
//     handleError(res, error, 'Błąd podczas pobierania atrakcji');
//   }
// };
export const getAttractions = async (req: Request, res: Response) => {
  try {
    const { location = 'London', start = 0 } = req.query;

    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_local',
        q: 'attractions',
        location,
        start,
        api_key: API_KEY,
      },
    });

    // console.log('🔍 Full Attraction Response from SerpAPI:', JSON.stringify(response.data, null, 2));

    const attractions = (response.data.local_results || []).map((attraction: any) => ({
      title: attraction.title || 'No title available',
      description: attraction.description || 'No description available.',
      thumbnail: attraction.thumbnail || 'https://via.placeholder.com/500x500?text=No+Image',
      rating: attraction.rating || 0,
      reviews_original: attraction.reviews_original || 'No reviews',
      reviews: attraction.reviews || 0,
      address: attraction.address || 'No address provided',
      hours: attraction.hours || 'No hours available',
      place_id: attraction.place_id || 'No place ID',
      gps_coordinates: attraction.gps_coordinates || {},
      place_id_search: attraction.place_id_search || null,
    }));

    res.json(attractions);
  } catch (error: any) {
    console.error('Error fetching attractions:', error);
    res.status(500).send('Error fetching attractions');
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
