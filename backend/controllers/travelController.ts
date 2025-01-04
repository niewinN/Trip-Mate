// import { Request, Response } from 'express';
// import pool from '../config/db';

// interface CustomRequest extends Request {
//     user?: { id: number };
//   }

// export const getTravelById = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
  
//       const travelResult = await pool.query('SELECT * FROM travels WHERE id = $1', [id]);
//       if (travelResult.rows.length === 0) {
//         return res.status(404).json({ error: 'Travel not found' });
//       }
  
//       const travel = travelResult.rows[0];
  
//       const passengers = await pool.query('SELECT * FROM passengers WHERE travel_id = $1', [id]);
//       const flight = await pool.query('SELECT * FROM flights WHERE travel_id = $1', [id]);
//       const hotel = await pool.query('SELECT * FROM hotels WHERE travel_id = $1', [id]);
//       const restaurants = await pool.query('SELECT * FROM restaurants WHERE travel_id = $1', [id]);
//       const attractions = await pool.query('SELECT * FROM attractions WHERE travel_id = $1', [id]);
  
//       res.json({
//         travel,
//         passengers: passengers.rows,
//         flight: flight.rows[0] || null,
//         hotel: hotel.rows[0] || null,
//         restaurants: restaurants.rows,
//         attractions: attractions.rows,
//       });
//     } catch (error) {
//       console.error('❌ Error fetching travel:', error.message);
//       res.status(500).json({ error: 'Failed to fetch travel details', details: error.message });
//     }
//   };


// export const createTravel = async (req: Request, res: Response) => {
//   try {
//     const {
//       userId,
//       departureCity,
//       arrivalCity,
//       departureDate,
//       returnDate,
//       passengersCount,
//       tripName,
//       tripPersons,
//       flight,
//       hotel,
//       restaurants,
//       attractions,
//     } = req.body;


//     if (tripName.length > 500) {
//         return res.status(400).json({ error: 'Trip name exceeds maximum length of 500 characters.' });
//       }
  
//       if (departureCity.length > 500 || arrivalCity.length > 500) {
//         return res.status(400).json({ error: 'City names exceed maximum length of 500 characters.' });
//       }

//     // 1. Dodanie podróży do tabeli travels
//     const travelResult = await pool.query(
//       `INSERT INTO travels (user_id, departure_city, arrival_city, departure_date, return_date, passengers_count, trip_name)
//        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
//       [userId, departureCity, arrivalCity, departureDate, returnDate, passengersCount, tripName]
//     );

//     const travelId = travelResult.rows[0].id;

//     // 2. Dodanie pasażerów
//     for (const person of tripPersons) {
//       await pool.query(
//         `INSERT INTO passengers (travel_id, name, photo_url)
//          VALUES ($1, $2, $3)`,
//         [travelId, person.name, person.image]
//       );
//     }

//     // 3. Dodanie lotu
//     if (flight) {
//       await pool.query(
//         `INSERT INTO flights (travel_id, airline, departure_airport, arrival_airport, departure_time, arrival_time, price)
//          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
//         [travelId, flight.airline, flight.departure_airport, flight.arrival_airport, flight.departure_time, flight.arrival_time, flight.price]
//       );
//     }

//     // 4. Dodanie hotelu
//     if (hotel) {
//       await pool.query(
//         `INSERT INTO hotels (travel_id, name, location, check_in_date, check_out_date, price)
//          VALUES ($1, $2, $3, $4, $5, $6)`,
//         [travelId, hotel.name, hotel.location, hotel.check_in_date, hotel.check_out_date, hotel.price]
//       );
//     }

//     // 5. Dodanie restauracji
//     for (const restaurant of restaurants) {
//       await pool.query(
//         `INSERT INTO restaurants (travel_id, title, address, price_range)
//          VALUES ($1, $2, $3, $4)`,
//         [travelId, restaurant.title, restaurant.address, restaurant.price_range]
//       );
//     }

//     // 6. Dodanie atrakcji
//     for (const attraction of attractions) {
//       await pool.query(
//         `INSERT INTO attractions (travel_id, title, description, price)
//          VALUES ($1, $2, $3, $4)`,
//         [travelId, attraction.title, attraction.description, attraction.price]
//       );
//     }

//     res.status(201).json({ message: 'Travel created successfully', travelId });
//   } catch (error: any) {
//     console.error('❌ Error creating travel:', error.message);
//     res.status(500).json({ error: 'Failed to create travel', details: error.message });
//   }
// };
// import { Request, Response } from 'express';
// import pool from '../config/db';

// interface CustomRequest extends Request {
//   user?: { id: number };
// }

// export const createTravel = async (req: CustomRequest, res: Response) => {
//   try {
//     const {
//       departureCity,
//       arrivalCity,
//       departureDate,
//       returnDate,
//       passengersCount,
//       tripName,
//       tripPersons,
//       flight,
//       hotel,
//       restaurants,
//       attractions,
//     } = req.body;

//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ error: 'Unauthorized - No user ID found' });
//     }

//     const userId = req.user.id; // Pobieranie userId z middleware

//     // 1. Dodanie podróży do tabeli travels
//     const travelResult = await pool.query(
//       `INSERT INTO travels (user_id, departure_city, arrival_city, departure_date, return_date, passengers_count, trip_name)
//        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
//       [userId, departureCity, arrivalCity, departureDate, returnDate, passengersCount, tripName]
//     );

//     const travelId = travelResult.rows[0].id;

//     // 2. Dodanie pasażerów
//     for (const person of tripPersons) {
//       await pool.query(
//         `INSERT INTO passengers (travel_id, name, photo_url)
//          VALUES ($1, $2, $3)`,
//         [travelId, person.name, person.image]
//       );
//     }

//     // 3. Dodanie lotu
//     if (flight) {
//       await pool.query(
//         `INSERT INTO flights (travel_id, airline, departure_airport, arrival_airport, departure_time, arrival_time, price)
//          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
//         [travelId, flight.airline, flight.departure_airport, flight.arrival_airport, flight.departure_time, flight.arrival_time, flight.price]
//       );
//     }

//     // 4. Dodanie hotelu
//     if (hotel) {
//       await pool.query(
//         `INSERT INTO hotels (travel_id, name, location, check_in_date, check_out_date, price)
//          VALUES ($1, $2, $3, $4, $5, $6)`,
//         [travelId, hotel.name, arrivalCity, departureDate, returnDate, hotel.price]
//       );
//     }

//     // 5. Dodanie restauracji
//     for (const restaurant of restaurants) {
//       await pool.query(
//         `INSERT INTO restaurants (travel_id, title, address, price_range)
//          VALUES ($1, $2, $3, $4)`,
//         [travelId, restaurant.title, restaurant.address, restaurant.price]
//       );
//     }

//     // 6. Dodanie atrakcji
//     for (const attraction of attractions) {
//       await pool.query(
//         `INSERT INTO attractions (travel_id, title, description, price)
//          VALUES ($1, $2, $3, $4)`,
//         [travelId, attraction.title, attraction.description, attraction.price]
//       );
//     }

//     res.status(201).json({ message: 'Travel created successfully', travelId });
//   } catch (error: any) {
//     console.error('❌ Error creating travel:', error.message);
//     res.status(500).json({ error: 'Failed to create travel', details: error.message });
//   }
// };
// import { Response } from 'express';
// import pool from '../config/db';
// import { CustomRequest } from '../middleware/authMiddleware';

// export const createTravel = async (req: CustomRequest, res: Response): Promise<void> => {
//   try {
//     const {
//       departureCity,
//       arrivalCity,
//       departureDate,
//       returnDate,
//       passengersCount,
//       tripName,
//       tripPersons,
//       flight,
//       hotel,
//       restaurants,
//       attractions,
//     } = req.body;

//     console.log('📥 Incoming Travel Data:', {
//         departureCity,
//         arrivalCity,
//         departureDate,
//         returnDate,
//         passengersCount,
//         tripName,
//         tripPersons,
//         flight,
//         hotel,
//         restaurants,
//         attractions,
//       });
  
//       // 🛡️ Logujemy tylko atrakcje, aby upewnić się, że nie są puste
//       console.log('🎢 Incoming Attractions Data:', attractions);
  

//     if (!req.user || !req.user.id) {
//       res.status(401).json({ error: 'Unauthorized - No user ID found' });
//       return;
//     }

//     const userId = req.user.id;

//     const travelResult = await pool.query(
//       `INSERT INTO travels (user_id, departure_city, arrival_city, departure_date, return_date, passengers_count, trip_name)
//        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
//       [userId, departureCity, arrivalCity, departureDate, returnDate, passengersCount, tripName]
//     );

//     const travelId = travelResult.rows[0].id;

//     for (const person of tripPersons) {
//       await pool.query(
//         `INSERT INTO passengers (travel_id, name, photo_url)
//          VALUES ($1, $2, $3)`,
//         [travelId, person.name, person.image]
//       );
//     }

//     // Przykład zapisu pełnych danych lotu
// if (flight) {
//     await pool.query(
//       `INSERT INTO flights (
//         travel_id, airline, airline_logo, departure_airport, arrival_airport,
//         departure_time, arrival_time, price, currency, segments
//       )
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
//       [
//         travelId,
//         flight.airline,
//         flight.airline_logo,
//         flight.segments[0]?.departure.airport || null,
//         flight.segments[flight.segments.length - 1]?.arrival.airport || null,
//         flight.segments[0]?.departure.time || null,
//         flight.segments[flight.segments.length - 1]?.arrival.time || null,
//         flight.price,
//         flight.currency || "USD",
//         JSON.stringify(flight.segments) // Przechowywanie segmentów jako JSON
//       ]
//     );
//   }
  

//   if (hotel) {
//     await pool.query(
//       `INSERT INTO hotels (
//         travel_id, name, description, rate_per_night, hotel_class,
//         overall_rating, reviews, check_in_time, check_out_time, amenities, images
//       )
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
//       [
//         travelId,
//         hotel.name,
//         hotel.description || "No description",
//         hotel.rate_per_night?.lowest || "N/A",
//         hotel.hotel_class || "N/A",
//         hotel.overall_rating || 0,
//         hotel.reviews || 0,
//         hotel.check_in_time || null,
//         hotel.check_out_time || null,
//         JSON.stringify(hotel.amenities || []),
//         JSON.stringify(hotel.images || [])
//       ]
//     );
//   }
  

//     for (const restaurant of restaurants) {
//       await pool.query(
//         `INSERT INTO restaurants (travel_id, title, address, price_range)
//          VALUES ($1, $2, $3, $4)`,
//         [travelId, restaurant.title, restaurant.address, restaurant.price]
//       );
//     }

//     for (const attraction of attractions) {
//         await pool.query(
//           `INSERT INTO attractions (travel_id, title, description, price, thumbnail)
//            VALUES ($1, $2, $3, $4, $5)`,
//           [travelId, attraction.title, attraction.description, attraction.price, attraction.thumbnail]
//         );
//       }

    // Zapisywanie atrakcji
    // if (attractions && attractions.length > 0) {
    //     for (const attraction of attractions) {
    //       if (!attraction || !attraction.title || !attraction.description) {
    //         console.warn('⚠️ Skipped invalid attraction:', attraction);
    //         continue; // Pomijamy niekompletne atrakcje
    //       }
      
    //       await pool.query(
    //         `INSERT INTO attractions (
    //           travel_id, title, description, thumbnail, rating,
    //           reviews_original, reviews, address
    //         )
    //         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    //         [
    //           travelId,
    //           attraction.title,
    //           attraction.description,
    //           attraction.thumbnail || 'N/A',
    //           attraction.rating || 0,
    //           attraction.reviews_original || '0',
    //           attraction.reviews || 0,
    //           attraction.address || 'Unknown',
    //         ]
    //       );
    //     }
    //   } else {
    //     console.log('⚠️ No attractions provided, skipping attractions insertion.');
    //   }
      
    // if (attractions && Array.isArray(attractions) && attractions.length > 0) {
    //     for (const attraction of attractions) {
    //       if (
    //         !attraction ||
    //         typeof attraction !== 'object' ||
    //         !attraction.title ||
    //         !attraction.description
    //       ) {
    //         console.warn('⚠️ Skipped invalid attraction:', attraction);
    //         continue; // Pomijamy niekompletne atrakcje
    //       }
      
    //       const {
    //         title = 'No title',
    //         description = 'No description',
    //         thumbnail = 'N/A',
    //         rating = 0,
    //         reviews_original = '0',
    //         reviews = 0,
    //         address = 'Unknown',
    //       } = attraction;
      
    //       try {
    //         await pool.query(
    //           `INSERT INTO attractions (
    //             travel_id, title, description, thumbnail, rating,
    //             reviews_original, reviews, address
    //           )
    //           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    //           [
    //             travelId,
    //             title,
    //             description,
    //             thumbnail,
    //             rating,
    //             reviews_original,
    //             reviews,
    //             address,
    //           ]
    //         );
    //       } catch (err) {
    //         if (err instanceof Error) {
    //           console.error('❌ Error inserting attraction:', attraction, err.message);
    //         } else {
    //           console.error('❌ Unknown error inserting attraction:', attraction, err);
    //         }
    //       }
    //     }
    //   } else {
    //     console.log('⚠️ No attractions provided or attractions array is empty.');
    //   }
      
      

//     res.status(201).json({ message: 'Travel created successfully', travelId });
//   } catch (error: any) {
//     console.error('❌ Error creating travel:', error.message);
//     res.status(500).json({ error: 'Failed to create travel', details: error.message });
//   }
// };

// export const getTravelById = async (req: CustomRequest, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;

//     if (!req.user || !req.user.id) {
//       res.status(401).json({ error: 'Unauthorized - No user ID found' });
//       return;
//     }

//     const travelResult = await pool.query('SELECT * FROM travels WHERE id = $1 AND user_id = $2', [id, req.user.id]);

//     if (travelResult.rows.length === 0) {
//       res.status(404).json({ error: 'Travel not found' });
//       return;
//     }

//     const travel = travelResult.rows[0];

//     const passengers = await pool.query('SELECT * FROM passengers WHERE travel_id = $1', [id]);
//     const flight = await pool.query('SELECT * FROM flights WHERE travel_id = $1', [id]);
// const hotel = await pool.query('SELECT * FROM hotels WHERE travel_id = $1', [id]);
// const restaurants = await pool.query('SELECT * FROM restaurants WHERE travel_id = $1', [id]);
// const attractions = await pool.query('SELECT * FROM attractions WHERE travel_id = $1', [id]);

// res.json({
//   travel,
//   passengers: passengers.rows,
//   flight: flight.rows[0]
//     ? {
//         ...flight.rows[0],
//         segments: JSON.parse(flight.rows[0]?.segments || "[]"),
//       }
//     : null,
//   hotel: hotel.rows[0]
//     ? {
//         ...hotel.rows[0],
//         amenities: JSON.parse(hotel.rows[0]?.amenities || "[]"),
//         images: JSON.parse(hotel.rows[0]?.images || "[]"),
//       }
//     : null,
//   restaurants: restaurants.rows,
//   attractions: attractions.rows,
// });

//   } catch (error: any) {
//     console.error('❌ Error fetching travel:', error.message);
//     res.status(500).json({ error: 'Failed to fetch travel details', details: error.message });
//   }
// };
// import { Request, Response, NextFunction } from 'express';
// import sequelize from '../config/db'
// import Travel from '../models/Travel';
// import Passenger from '../models/Passenger';
// import Flight from '../models/Flight';
// import Hotel from '../models/Hotel';
// import Restaurant from '../models/Restaurant';
// import Attraction from '../models/Attraction';

// // 🛠️ **Pobierz wszystkie podróże**
// export const getAllTravels = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//   try {
//     const travels = await Travel.findAll({
//       include: [Passenger, Flight, Hotel, Restaurant, Attraction],
//     });
//     return res.status(200).json({ message: 'All travels fetched successfully', travels });
//   } catch (error) {
//     next(error);
//   }
// };

// // 🛠️ **Pobierz podróż po ID**
// export const getTravelById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//   try {
//     const { id } = req.params;
//     const travel = await Travel.findByPk(id, {
//       include: [Passenger, Flight, Hotel, Restaurant, Attraction],
//     });

//     if (!travel) {
//       return res.status(404).json({ error: `Travel with ID ${id} not found` });
//     }

//     return res.status(200).json({ message: `Travel with ID ${id} fetched successfully`, travel });
//   } catch (error) {
//     next(error);
//   }
// };

// // 🛠️ **Aktualizuj podróż**
// export const updateTravel = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//   try {
//     const { id } = req.params;
//     const updated = await Travel.update(req.body, {
//       where: { id },
//     });

//     if (updated[0] === 0) {
//       return res.status(404).json({ error: `Travel with ID ${id} not found` });
//     }

//     return res.status(200).json({ message: `Travel with ID ${id} updated successfully` });
//   } catch (error) {
//     next(error);
//   }
// };

// // 🛠️ **Usuń podróż**
// export const deleteTravel = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//   try {
//     const { id } = req.params;
//     const deleted = await Travel.destroy({
//       where: { id },
//     });

//     if (!deleted) {
//       return res.status(404).json({ error: `Travel with ID ${id} not found` });
//     }

//     return res.status(200).json({ message: `Travel with ID ${id} deleted successfully` });
//   } catch (error) {
//     next(error);
//   }
// };

// // 🛠️ **Utwórz nową podróż**
// export const createTravel = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//   const transaction = await sequelize.transaction();

//   try {
//     const {
//       departureCity,
//       arrivalCity,
//       departureDate,
//       returnDate,
//       passengersCount,
//       tripName,
//       tripPersons,
//       flight,
//       hotel,
//       restaurants,
//       attractions,
//     } = req.body;

//     if (!departureCity || !arrivalCity || !departureDate || !returnDate || !tripName) {
//       await transaction.rollback();
//       return res.status(400).json({ error: 'Missing required fields for travel creation' });
//     }

//     // 1️⃣ **Utwórz główny rekord podróży**
//     const newTravel = await Travel.create(
//       {
//         departureCity,
//         arrivalCity,
//         departureDate,
//         returnDate,
//         passengersCount,
//         tripName,
//       },
//       { transaction }
//     );

//     // 2️⃣ **Zapisz pasażerów**
//     if (tripPersons && Array.isArray(tripPersons)) {
//       for (const person of tripPersons) {
//         await Passenger.create(
//           {
//             travelId: newTravel.id,
//             name: person.name,
//             image: person.image,
//           },
//           { transaction }
//         );
//       }
//     }

//     // 3️⃣ **Zapisz lot**
//     if (flight) {
//       await Flight.create(
//         {
//           travelId: newTravel.id,
//           airline: flight.airline,
//           airline_logo: flight.airline_logo,
//           price: flight.price,
//           departure_airport: flight.departure_airport,
//           arrival_airport: flight.arrival_airport,
//           departure_time: flight.departure_time,
//           arrival_time: flight.arrival_time,
//           total_duration: flight.total_duration,
//         },
//         { transaction }
//       );
//     }

//     // 4️⃣ **Zapisz hotel**
//     if (hotel) {
//       await Hotel.create(
//         {
//           travelId: newTravel.id,
//           name: hotel.name,
//           description: hotel.description,
//           check_in_time: hotel.check_in_time,
//           check_out_time: hotel.check_out_time,
//           price: hotel.price,
//           location: hotel.location,
//           check_in_date: hotel.check_in_date,
//           check_out_date: hotel.check_out_date,
//         },
//         { transaction }
//       );
//     }

//     // 5️⃣ **Zapisz restauracje**
//     if (restaurants && Array.isArray(restaurants)) {
//       for (const restaurant of restaurants) {
//         await Restaurant.create(
//           {
//             travelId: newTravel.id,
//             title: restaurant.title,
//             address: restaurant.address,
//             description: restaurant.description,
//             price: restaurant.price,
//             thumbnail: restaurant.thumbnail,
//           },
//           { transaction }
//         );
//       }
//     }

//     // 6️⃣ **Zapisz atrakcje**
//     if (attractions && Array.isArray(attractions)) {
//       for (const attraction of attractions) {
//         await Attraction.create(
//           {
//             travelId: newTravel.id,
//             title: attraction.title,
//             description: attraction.description,
//             thumbnail: attraction.thumbnail,
//           },
//           { transaction }
//         );
//       }
//     }

//     await transaction.commit();

//     return res.status(201).json({ message: 'Travel created successfully', travel: newTravel });
//   } catch (error) {
//     await transaction.rollback();
//     next(error);
//   }
// };
import { Request, Response, NextFunction } from 'express';
import sequelize from '../config/db';
import Travel from '../models/Travel';
import Passenger from '../models/Passenger';
import Flight from '../models/Flight';
import Hotel from '../models/Hotel';
import Restaurant from '../models/Restaurant';
import Attraction from '../models/Attraction';

// 🛠️ **Typowanie interfejsów dla danych wejściowych**
interface TripPerson {
  name: string;
  image?: string;
}

interface Segment {
  departure: { airport: string; time: string };
  arrival: { airport: string; time: string };
  duration: number;
}


interface FlightData {
  airline: string;
  airline_logo?: string;
  price: number;
  departure_airport?: string;
  arrival_airport?: string;
  departure_time?: string;
  arrival_time?: string;
  total_duration?: number;
  segments?: Segment[] | string; // Segmenty mogą być tablicą lub JSON stringiem
}


interface HotelData {
  name: string;
  location: string;
  check_in_date: string;
  check_out_date: string;
  price: number;
  description: string;
  hotel_class: string;
  overall_rating: number;
  reviews: number;
  amenities: string[];
  nearby_places: string[];
  thumbnail: string;
}


interface RestaurantData {
  title: string;
  address: string;
  price_range: string;
  description: string;
  price: string;
  thumbnail: string;
  rating: number;
  reviews_original: string;
  reviews: number;
  type: string;
}


interface AttractionData {
  title: string;
  description: string;
  thumbnail?: string;
}

interface AuthenticatedRequest extends Request {
  user?: { id: number };
}

// 🛠️ **Pobierz wszystkie podróże**
export const getAllTravels = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const travels = await Travel.findAll({
      include: [
        { model: Passenger, as: 'passengers' },
        { model: Flight, as: 'flights' },
        { model: Hotel, as: 'hotels' },
        { model: Restaurant, as: 'restaurants' },
        { model: Attraction, as: 'attractions' }
      ],
    });
    return res.status(200).json({ message: 'All travels fetched successfully', travels });
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error fetching travels:', error.message);
    } else {
      console.error('❌ Unknown error fetching travels:', error);
    }
    
    next(error);
  }
};


// 🛠️ **Pobierz podróż po ID**
export const getTravelById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const travel = await Travel.findByPk(id, {
      include: [
        { model: Passenger, as: 'passengers' },
        { model: Flight, as: 'flights' },
        { model: Hotel, as: 'hotels' },
        { model: Restaurant, as: 'restaurants' },
        { model: Attraction, as: 'attractions' }
      ],
    });

    if (!travel) {
      return res.status(404).json({ error: `Travel with ID ${id} not found` });
    }

    return res.status(200).json({ message: `Travel with ID ${id} fetched successfully`, travel });
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error fetching travel by ID:', error.message);
    } else {
      console.error('❌ Unknown error fetching travel by ID:', error);
    }    
    next(error);
  }
};


// 🛠️ **Aktualizuj podróż**
export const updateTravel = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const updated = await Travel.update(req.body, {
      where: { id },
    });

    if (updated[0] === 0) {
      return res.status(404).json({ error: `Travel with ID ${id} not found` });
    }

    return res.status(200).json({ message: `Travel with ID ${id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

// 🛠️ **Usuń podróż**
export const deleteTravel = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { id } = req.params;
    const deleted = await Travel.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({ error: `Travel with ID ${id} not found` });
    }

    return res.status(200).json({ message: `Travel with ID ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
};

// ✅ **Utwórz nową podróż**
// ✅ **Utwórz nową podróż**
export const createTravel = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  const transaction = await sequelize.transaction();

  try {
    const {
      departureCity,
      arrivalCity,
      departureDate,
      returnDate,
      passengersCount,
      tripName,
      tripPersons = [],
      flights = [],
      hotels = [],
      restaurants = [],
      attractions = [],
    } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      await transaction.rollback();
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const newTravel = await Travel.create(
      {
        departureCity,
        arrivalCity,
        departureDate,
        returnDate,
        passengersCount,
        tripName,
        user_id: userId, // upewnij się, że pole nazywa się user_id
      },
      { transaction }
    );

    console.log('✅ Travel ID:', newTravel.id);
    console.log('🛎️ Hotels:', hotels);
    console.log('✈️ Flights:', flights);
    console.log('🏰 Attractions:', attractions);

     // 🟢 **2. Zapisz pasażerów**
     if (tripPersons.length > 0) {
      await Passenger.bulkCreate(
        tripPersons.map((person: TripPerson) => ({
          travel_id: newTravel.id,
          name: person.name,
          photo_url: person.image,
        })),
        { transaction }
      );
    }

    // 🟢 **3. Zapisz loty**
   // ✅ **Zapisz loty**
   if (req.body.flight && req.body.flight.length > 0) {
    console.log('✈️ Flights Data Received:', req.body.flight);
  
    const mappedFlights = req.body.flight.map((flight: FlightData) => {
      const segments = Array.isArray(flight.segments)
        ? flight.segments
        : flight.segments
        ? JSON.parse(flight.segments)
        : [];
  
      const departureTime = flight.departure_time
        ? new Date(flight.departure_time).toISOString()
        : segments[0]?.departure?.time
        ? new Date(segments[0].departure.time).toISOString()
        : null;
  
      const arrivalTime = flight.arrival_time
        ? new Date(flight.arrival_time).toISOString()
        : segments[segments.length - 1]?.arrival?.time
        ? new Date(segments[segments.length - 1].arrival.time).toISOString()
        : null;
  
      if (!departureTime || !arrivalTime) {
        throw new Error('🛑 Missing required departure_time or arrival_time');
      }
  
      console.log('🛠️ Final Mapped Flight Data:', {
        travel_id: newTravel.id,
        airline: flight.airline,
        airline_logo: flight.airline_logo,
        price: flight.price,
        departure_airport: flight.departure_airport || segments[0]?.departure?.airport || 'N/A',
        arrival_airport: flight.arrival_airport || segments[segments.length - 1]?.arrival?.airport || 'N/A',
        departure_time: departureTime,
        arrival_time: arrivalTime,
        total_duration: flight.total_duration || 0,
        segments: JSON.stringify(segments),
      });
  
      return {
        travel_id: newTravel.id,
        airline: flight.airline || 'N/A',
        airline_logo: flight.airline_logo || null,
        price: flight.price || 0,
        departure_airport:
          flight.departure_airport || segments[0]?.departure?.airport || 'N/A',
        arrival_airport:
          flight.arrival_airport || segments[segments.length - 1]?.arrival?.airport || 'N/A',
        departure_time: departureTime,
        arrival_time: arrivalTime,
        total_duration: flight.total_duration || 0,
        segments: JSON.stringify(segments),
      };
    });
  
    console.log('✈️ Flights ready for bulkCreate:', mappedFlights);
  
    await Flight.bulkCreate(mappedFlights, { transaction });
  }
  
  
  
  
  

// 🛠️ Hotels
// 🛠️ Hotels
if (req.body.hotel && req.body.hotel.length > 0) {
  console.log('🏨 Hotels Data Received:', req.body.hotel);
  await Hotel.bulkCreate(
    req.body.hotel.map((hotel: HotelData) => ({
      travel_id: newTravel.id,
      name: hotel.name,
      location: hotel.location,
      check_in_date: hotel.check_in_date,
      check_out_date: hotel.check_out_date,
      price: hotel.price,
      description: hotel.description,
      hotel_class: hotel.hotel_class,
      overall_rating: hotel.overall_rating,
      reviews: hotel.reviews,
      amenities: hotel.amenities,
      nearby_places: hotel.nearby_places
        ? hotel.nearby_places.map((place: any) => place.name || 'Unknown place')
        : [],
      thumbnail: hotel.thumbnail,
    })),
    { transaction }
  );
}


// 🛠️ Attractions
if (req.body.attractions && req.body.attractions.length > 0) {
  console.log('🎡 Attractions Data Received:', req.body.attractions);
  await Attraction.bulkCreate(
    req.body.attractions.map((attraction: AttractionData) => ({
      travel_id: newTravel.id,
      title: attraction.title,
      description: attraction.description,
      thumbnail: attraction.thumbnail,
    })),
    { transaction }
  );
}


  // 🟢 **5. Zapisz restauracje**
if (restaurants.length > 0) {
  await Restaurant.bulkCreate(
    restaurants.map((restaurant: RestaurantData) => ({
      travel_id: newTravel.id,
      title: restaurant.title,
      address: restaurant.address,
      price_range: restaurant.price,
      description: restaurant.description,
      thumbnail: restaurant.thumbnail,
      rating: restaurant.rating,
      reviews_original: restaurant.reviews_original,
      reviews: restaurant.reviews,
      type: restaurant.type,
    })),
    { transaction }
  );
}


    // 🟢 **Zatwierdź transakcję**
    await transaction.commit();

    return res.status(201).json({
      message: 'Travel created successfully',
      travelId: newTravel.id,
    });
  } catch (error) {
    await transaction.rollback();
    console.error('❌ Transaction failed:', error instanceof Error ? error.message : error);
    // console.error('❌ Error creating travel:', error);
    next(error);
  }
};