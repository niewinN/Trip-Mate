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


// // export const createTravel = async (req: Request, res: Response) => {
// //   try {
// //     const {
// //       userId,
// //       departureCity,
// //       arrivalCity,
// //       departureDate,
// //       returnDate,
// //       passengersCount,
// //       tripName,
// //       tripPersons,
// //       flight,
// //       hotel,
// //       restaurants,
// //       attractions,
// //     } = req.body;


// //     if (tripName.length > 500) {
// //         return res.status(400).json({ error: 'Trip name exceeds maximum length of 500 characters.' });
// //       }
  
// //       if (departureCity.length > 500 || arrivalCity.length > 500) {
// //         return res.status(400).json({ error: 'City names exceed maximum length of 500 characters.' });
// //       }

// //     // 1. Dodanie podróży do tabeli travels
// //     const travelResult = await pool.query(
// //       `INSERT INTO travels (user_id, departure_city, arrival_city, departure_date, return_date, passengers_count, trip_name)
// //        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
// //       [userId, departureCity, arrivalCity, departureDate, returnDate, passengersCount, tripName]
// //     );

// //     const travelId = travelResult.rows[0].id;

// //     // 2. Dodanie pasażerów
// //     for (const person of tripPersons) {
// //       await pool.query(
// //         `INSERT INTO passengers (travel_id, name, photo_url)
// //          VALUES ($1, $2, $3)`,
// //         [travelId, person.name, person.image]
// //       );
// //     }

// //     // 3. Dodanie lotu
// //     if (flight) {
// //       await pool.query(
// //         `INSERT INTO flights (travel_id, airline, departure_airport, arrival_airport, departure_time, arrival_time, price)
// //          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
// //         [travelId, flight.airline, flight.departure_airport, flight.arrival_airport, flight.departure_time, flight.arrival_time, flight.price]
// //       );
// //     }

// //     // 4. Dodanie hotelu
// //     if (hotel) {
// //       await pool.query(
// //         `INSERT INTO hotels (travel_id, name, location, check_in_date, check_out_date, price)
// //          VALUES ($1, $2, $3, $4, $5, $6)`,
// //         [travelId, hotel.name, hotel.location, hotel.check_in_date, hotel.check_out_date, hotel.price]
// //       );
// //     }

// //     // 5. Dodanie restauracji
// //     for (const restaurant of restaurants) {
// //       await pool.query(
// //         `INSERT INTO restaurants (travel_id, title, address, price_range)
// //          VALUES ($1, $2, $3, $4)`,
// //         [travelId, restaurant.title, restaurant.address, restaurant.price_range]
// //       );
// //     }

// //     // 6. Dodanie atrakcji
// //     for (const attraction of attractions) {
// //       await pool.query(
// //         `INSERT INTO attractions (travel_id, title, description, price)
// //          VALUES ($1, $2, $3, $4)`,
// //         [travelId, attraction.title, attraction.description, attraction.price]
// //       );
// //     }

// //     res.status(201).json({ message: 'Travel created successfully', travelId });
// //   } catch (error: any) {
// //     console.error('❌ Error creating travel:', error.message);
// //     res.status(500).json({ error: 'Failed to create travel', details: error.message });
// //   }
// // };
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
import { Response } from 'express';
import pool from '../config/db';
import { CustomRequest } from '../middleware/authMiddleware';

export const createTravel = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const {
      departureCity,
      arrivalCity,
      departureDate,
      returnDate,
      passengersCount,
      tripName,
      tripPersons,
      flight,
      hotel,
      restaurants,
      attractions,
    } = req.body;

    console.log('📥 Incoming Travel Data:', {
        departureCity,
        arrivalCity,
        departureDate,
        returnDate,
        passengersCount,
        tripName,
        tripPersons,
        flight,
        hotel,
        restaurants,
        attractions,
      });
  
      // 🛡️ Logujemy tylko atrakcje, aby upewnić się, że nie są puste
      console.log('🎢 Incoming Attractions Data:', attractions);
  

    if (!req.user || !req.user.id) {
      res.status(401).json({ error: 'Unauthorized - No user ID found' });
      return;
    }

    const userId = req.user.id;

    const travelResult = await pool.query(
      `INSERT INTO travels (user_id, departure_city, arrival_city, departure_date, return_date, passengers_count, trip_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [userId, departureCity, arrivalCity, departureDate, returnDate, passengersCount, tripName]
    );

    const travelId = travelResult.rows[0].id;

    for (const person of tripPersons) {
      await pool.query(
        `INSERT INTO passengers (travel_id, name, photo_url)
         VALUES ($1, $2, $3)`,
        [travelId, person.name, person.image]
      );
    }

    // Przykład zapisu pełnych danych lotu
if (flight) {
    await pool.query(
      `INSERT INTO flights (
        travel_id, airline, airline_logo, departure_airport, arrival_airport,
        departure_time, arrival_time, price, currency, segments
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        travelId,
        flight.airline,
        flight.airline_logo,
        flight.segments[0]?.departure.airport || null,
        flight.segments[flight.segments.length - 1]?.arrival.airport || null,
        flight.segments[0]?.departure.time || null,
        flight.segments[flight.segments.length - 1]?.arrival.time || null,
        flight.price,
        flight.currency || "USD",
        JSON.stringify(flight.segments) // Przechowywanie segmentów jako JSON
      ]
    );
  }
  

  if (hotel) {
    await pool.query(
      `INSERT INTO hotels (
        travel_id, name, description, rate_per_night, hotel_class,
        overall_rating, reviews, check_in_time, check_out_time, amenities, images
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        travelId,
        hotel.name,
        hotel.description || "No description",
        hotel.rate_per_night?.lowest || "N/A",
        hotel.hotel_class || "N/A",
        hotel.overall_rating || 0,
        hotel.reviews || 0,
        hotel.check_in_time || null,
        hotel.check_out_time || null,
        JSON.stringify(hotel.amenities || []),
        JSON.stringify(hotel.images || [])
      ]
    );
  }
  

    for (const restaurant of restaurants) {
      await pool.query(
        `INSERT INTO restaurants (travel_id, title, address, price_range)
         VALUES ($1, $2, $3, $4)`,
        [travelId, restaurant.title, restaurant.address, restaurant.price]
      );
    }

    for (const attraction of attractions) {
        await pool.query(
          `INSERT INTO attractions (travel_id, title, description, price, thumbnail)
           VALUES ($1, $2, $3, $4, $5)`,
          [travelId, attraction.title, attraction.description, attraction.price, attraction.thumbnail]
        );
      }

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
      
      

    res.status(201).json({ message: 'Travel created successfully', travelId });
  } catch (error: any) {
    console.error('❌ Error creating travel:', error.message);
    res.status(500).json({ error: 'Failed to create travel', details: error.message });
  }
};

export const getTravelById = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user || !req.user.id) {
      res.status(401).json({ error: 'Unauthorized - No user ID found' });
      return;
    }

    const travelResult = await pool.query('SELECT * FROM travels WHERE id = $1 AND user_id = $2', [id, req.user.id]);

    if (travelResult.rows.length === 0) {
      res.status(404).json({ error: 'Travel not found' });
      return;
    }

    const travel = travelResult.rows[0];

    const passengers = await pool.query('SELECT * FROM passengers WHERE travel_id = $1', [id]);
    const flight = await pool.query('SELECT * FROM flights WHERE travel_id = $1', [id]);
const hotel = await pool.query('SELECT * FROM hotels WHERE travel_id = $1', [id]);
const restaurants = await pool.query('SELECT * FROM restaurants WHERE travel_id = $1', [id]);
const attractions = await pool.query('SELECT * FROM attractions WHERE travel_id = $1', [id]);

res.json({
  travel,
  passengers: passengers.rows,
  flight: flight.rows[0]
    ? {
        ...flight.rows[0],
        segments: JSON.parse(flight.rows[0]?.segments || "[]"),
      }
    : null,
  hotel: hotel.rows[0]
    ? {
        ...hotel.rows[0],
        amenities: JSON.parse(hotel.rows[0]?.amenities || "[]"),
        images: JSON.parse(hotel.rows[0]?.images || "[]"),
      }
    : null,
  restaurants: restaurants.rows,
  attractions: attractions.rows,
});

  } catch (error: any) {
    console.error('❌ Error fetching travel:', error.message);
    res.status(500).json({ error: 'Failed to fetch travel details', details: error.message });
  }
};
