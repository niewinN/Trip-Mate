import { Request, Response } from 'express';
import { handleError } from '../utils/handleError';
import axios from 'axios';
import { getAirportCode } from '../utils/airportCodes';

// 🔑 **Klucz API SerpAPI**
const API_KEY = process.env.SERPAPI_KEY;

// // 🏨 **Pobieranie Hoteli**
// export const getHotels = async (req: Request, res: Response) => {
//   try {
//     const { q = 'Warsaw', check_in_date = '2024-11-20', check_out_date = '2024-11-25' } = req.query;

//     const response = await axios.get('https://serpapi.com/search', {
//       params: {
//         engine: 'google_hotels',
//         q,
//         check_in_date,
//         check_out_date,
//         api_key: API_KEY,
//       },
//     });

//     // console.log('🔍 Full Hotel Response from SerpAPI:', JSON.stringify(response.data, null, 2));

//     const hotels = (response.data.properties || []).map((hotel: any) => ({
//       name: hotel.name,
//       description: hotel.description,
//       logo: hotel.logo || null,
//       images: hotel.images || [],
//       rate_per_night: hotel.rate_per_night || {},
//       total_rate: hotel.total_rate || {},
//       hotel_class: hotel.hotel_class || null,
//       overall_rating: hotel.overall_rating || 0,
//       reviews: hotel.reviews || 0,
//       check_in_time: hotel.check_in_time || null,
//       check_out_time: hotel.check_out_time || null,
//       amenities: hotel.amenities || [],
//       nearby_places: hotel.nearby_places || [],
//       reviews_breakdown: hotel.reviews_breakdown || [],
//       deal: hotel.deal || null,
//       deal_description: hotel.deal_description || null,
//       gps_coordinates: hotel.gps_coordinates || {},
//       eco_certified: hotel.eco_certified || false,
//       property_token: hotel.property_token || null,
//       serpapi_property_details_link: hotel.serpapi_property_details_link || null,
//       link: hotel.link || null,
//     }));

//     res.json(hotels);
//   } catch (error: any) {
//     handleError(res, error, 'Błąd podczas pobierania hoteli');
//   }
// };
export const getHotels = async (req: Request, res: Response) => {
  try {
    const { q = 'Warsaw', check_in_date, check_out_date, guests, rooms, filters = '' } = req.query;

    const filtersArray = (filters as string).split(',').filter(Boolean); // Przekształć string na tablicę

    console.log('🔍 Active Filters:', filtersArray);

    // Pobierz dane hoteli z API (np. SerpAPI)
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_hotels',
        q,
        check_in_date,
        check_out_date,
        guests,
        rooms,
        api_key: API_KEY,
      },
    });

    // Filtrowanie wyników na podstawie filtrów
    const hotels = (response.data.properties || []).filter((hotel: any) => {
      if (!filtersArray.length) return true; // Jeśli brak filtrów, zwróć wszystkie wyniki

      return filtersArray.every((filter) => {
        // Dopasowanie filtrów do właściwości hotelu
        switch (filter) {
          // Udogodnienia
          case 'free_wifi':
            return hotel.amenities?.includes('Free Wi-Fi');
          case 'spa':
            return hotel.amenities?.includes('Spa');
          case 'gym':
            return hotel.amenities?.includes('Fitness centre');
          case 'pets_allowed':
            return hotel.amenities?.includes('Pet-friendly');
          case 'kitchen':
            return hotel.amenities?.some((amenity: string) => amenity.toLowerCase().includes('kitchen'));
          case 'parking':
            return hotel.amenities?.some((amenity: string) => amenity.toLowerCase().includes('parking'));

          // Przedziały cenowe
          case 'price_0_50':
            return hotel.rate_per_night?.extracted_lowest <= 50;
          case 'price_51_100':
            return hotel.rate_per_night?.extracted_lowest > 50 && hotel.rate_per_night?.extracted_lowest <= 100;
          case 'price_101_200':
            return hotel.rate_per_night?.extracted_lowest > 100 && hotel.rate_per_night?.extracted_lowest <= 200;
          case 'price_201_up':
            return hotel.rate_per_night?.extracted_lowest > 200;

          // Klasa hotelu (gwiazdki)
          case '1_star':
            return hotel.extracted_hotel_class === 1;
          case '2_star':
            return hotel.extracted_hotel_class === 2;
          case '3_star':
            return hotel.extracted_hotel_class === 3;
          case '4_star':
            return hotel.extracted_hotel_class === 4;
          case '5_star':
            return hotel.extracted_hotel_class === 5;

          // Ocena ogólna (rating)
          case 'rating_1_2':
            return hotel.overall_rating >= 1 && hotel.overall_rating < 2;
          case 'rating_2_3':
            return hotel.overall_rating >= 2 && hotel.overall_rating < 3;
          case 'rating_3_4':
            return hotel.overall_rating >= 3 && hotel.overall_rating < 4;
          case 'rating_4_5':
            return hotel.overall_rating >= 4 && hotel.overall_rating <= 5;

          default:
            return true; // Ignoruj nieobsługiwane filtry
        }
      });
    });

    // console.log('🏨 Filtered Hotels:', hotels);

    res.json(hotels);
  } catch (error: any) {
    console.error('❌ Error fetching hotels:', error.message || error);
    res.status(500).json({ error: 'Error fetching hotels' });
  }
};


// ✈️ **Mapa miast na kody lotnisk**
// const cityToAirportCode: Record<string, string> = {
//   Warsaw: 'WAW',
//   London: 'LHR',
//   Paris: 'CDG',
//   NewYork: 'JFK',
//   Barcelona: 'BCN',
// };

// // ✈️ **Pobieranie kodu lotniska**
// export const getAirportCode = async (city: string): Promise<string> => {
//   if (cityToAirportCode[city]) {
//     return cityToAirportCode[city];
//   }
//   throw new Error(`Nie znaleziono kodu lotniska dla miasta: ${city}`);
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

    console.log('🔍 Full Flight Response from SerpAPI:', JSON.stringify(outboundResponse.data, null, 2));

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

    console.log('🔍 Full Flight Response from SerpAPI:', JSON.stringify(returnResponse.data, null, 2));

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

// export const getRestaurants = async (req: Request, res: Response) => {
//   try {
//     const { location = 'London', start = 0 } = req.query;

//     const response = await axios.get('https://serpapi.com/search', {
//       params: {
//         engine: 'google_local',
//         q: 'restaurant',
//         location,
//         start,
//         api_key: API_KEY,
//       },
//     });

//     console.log('🔍 Full Restaurant Response from SerpAPI:', JSON.stringify(response.data, null, 2));

//     const restaurants = (response.data.local_results || []).map((restaurant: any) => ({
//       title: restaurant.title || 'No title available',
//       rating: restaurant.rating || 'No rating',
//       reviews_original: restaurant.reviews_original || 'No reviews',
//       reviews: restaurant.reviews || 0,
//       price: restaurant.price || 'No price data',
//       type: restaurant.type || 'No type specified',
//       address: restaurant.address || 'No address provided',
//       description: restaurant.description || 'No description available.',
//       thumbnail: restaurant.thumbnail || 'https://via.placeholder.com/500x500?text=No+Image',
//       phone: restaurant.phone || 'No phone number available',
//       hours: restaurant.hours || 'No opening hours',
//       links: restaurant.links || {},
//       gps_coordinates: restaurant.gps_coordinates || null,
//       place_id_search: restaurant.place_id_search || null,
//     }));

//     res.json(restaurants);
//   } catch (error: any) {
//     handleError(res, error, 'Błąd podczas pobierania restauracji');
//   }
// };
export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const { location = "London", filters = "" } = req.query;
    const filtersArray = (filters as string).split(",").filter(Boolean);

    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_local",
        q: "restaurant",
        location,
        api_key: API_KEY,
      },
    });

    const restaurants = (response.data.local_results || []).filter((restaurant: any) => {
      if (!filtersArray.length) return true; // Brak filtrów
      return filtersArray.every((filter) => {
        switch (filter) {
          case "italian":
            return restaurant.type?.toLowerCase().includes("italian");
          case "chinese":
            return restaurant.type?.toLowerCase().includes("chinese");
          case "low":
            return restaurant.price === "$";
          case "medium":
            return restaurant.price === "$$";
          case "high":
            return restaurant.price === "$$$";
          case "4_plus":
            return restaurant.rating >= 4;
          case "3_4":
            return restaurant.rating >= 3 && restaurant.rating < 4;
          case "below_3":
            return restaurant.rating < 3;
          default:
            return true;
        }
      });
    });

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Error fetching restaurants" });
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
// export const getAttractions = async (req: Request, res: Response) => {
//   try {
//     const { location = 'London', start = 0 } = req.query;

//     const response = await axios.get('https://serpapi.com/search', {
//       params: {
//         engine: 'google_local',
//         q: 'attractions',
//         location,
//         start,
//         api_key: API_KEY,
//       },
//     });

//     console.log('🔍 Full Attraction Response from SerpAPI:', JSON.stringify(response.data, null, 2));

//     const attractions = (response.data.local_results || []).map((attraction: any) => ({
//       title: attraction.title || 'No title available',
//       description: attraction.description || 'No description available.',
//       thumbnail: attraction.thumbnail || 'https://via.placeholder.com/500x500?text=No+Image',
//       rating: attraction.rating || 0,
//       reviews_original: attraction.reviews_original || 'No reviews',
//       reviews: attraction.reviews || 0,
//       address: attraction.address || 'No address provided',
//       hours: attraction.hours || 'No hours available',
//       place_id: attraction.place_id || 'No place ID',
//       gps_coordinates: attraction.gps_coordinates || {},
//       place_id_search: attraction.place_id_search || null,
//     }));

//     res.json(attractions);
//   } catch (error: any) {
//     console.error('Error fetching attractions:', error);
//     res.status(500).send('Error fetching attractions');
//   }
// };
export const getAttractions = async (req: Request, res: Response) => {
  try {
    const { location = 'London', start = 0, filters = '' } = req.query;

    const filtersArray = (filters as string).split(',').filter(Boolean);

    const response = await axios.get('https://serpapi.com/search', {
      params: {
        engine: 'google_local',
        q: 'attractions',
        location,
        start,
        api_key: API_KEY,
      },
    });

    const attractions = (response.data.local_results || []).filter((attraction: any) => {
      if (!filtersArray.length) return true; // Brak filtrów, zwróć wszystko

      return filtersArray.every((filter) => {
        switch (filter) {
          case 'museums':
            return attraction.type?.toLowerCase().includes('museum');
          case 'parks':
            return attraction.type?.toLowerCase().includes('park');
          case 'beaches':
            return attraction.type?.toLowerCase().includes('beach');
          case 'historical_sites':
            return attraction.type?.toLowerCase().includes('historical');
          case 'adventure':
            return attraction.description?.toLowerCase().includes('adventure');
          case '4_plus':
            return attraction.rating >= 4;
          case '3_4':
            return attraction.rating >= 3 && attraction.rating < 4;
          case 'below_3':
            return attraction.rating < 3;
          case 'family_friendly':
            return attraction.description?.toLowerCase().includes('family');
          case 'wheelchair_accessible':
            return attraction.description?.toLowerCase().includes('accessible');
          case 'guided_tours':
            return attraction.description?.toLowerCase().includes('guided');
          default:
            return true;
        }
      });
    });

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
