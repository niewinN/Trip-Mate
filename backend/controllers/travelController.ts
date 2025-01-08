import { Request, Response, NextFunction } from 'express';
import sequelize from '../config/db';
import { Op } from 'sequelize';
import Travel from '../models/Travel';
import Passenger from '../models/Passenger';
import Flight from '../models/Flight';
import Hotel from '../models/Hotel';
import Restaurant from '../models/Restaurant';
import Attraction from '../models/Attraction';
import Multimedia from '../models/Multimedia';

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

export const getUserTrips = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized - User ID is missing' });
    }

    const userId = req.user.id;

    const trips = await Travel.findAll({
      where: { user_id: userId },
      attributes: ['id', 'tripName', 'arrivalCity'],
    });

    res.status(200).json(trips);
  } catch (error) {
    console.error('❌ Error fetching user trips:', error);
    res.status(500).json({ error: 'Failed to fetch user trips' });
  }
};


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

    // 🛠️ Mapowanie pasażerów
    // 🛠️ Mapowanie pasażerów
      const passengers = travel.passengers?.map((passenger: Passenger) => ({
        id: passenger.id,
        name: passenger.name,
        image: passenger.photo_url, // <-- Upewnij się, że przekazujesz 'photo_url' jako 'image'
      })) || [];


    return res.status(200).json({
      message: `Travel with ID ${id} fetched successfully`,
      travel: {
        ...travel.toJSON(),
        passengers,
      },
    });
  } catch (error) {
    console.error('❌ Error fetching travel by ID:', error);
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

// 🛠️ **Pobierz statystyki użytkownika**
export const getUserStats = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized - User ID is missing' });
    }

    const userId = req.user.id;

    // 🔢 **1. Liczba podróży użytkownika**
    const numberOfTrips = await Travel.count({
      where: { user_id: userId },
    });

    // 📅 **2. Suma dni podróży użytkownika**
    const travels = await Travel.findAll({
      where: { user_id: userId },
      attributes: ['id', 'departureDate', 'returnDate'],
    });

    const daysInTrip = travels.reduce((total, trip) => {
      const departureDate = new Date(trip.departureDate);
      const returnDate = new Date(trip.returnDate);
      const tripDays = Math.ceil(
        (returnDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return total + tripDays;
    }, 0);

    // 🖼️ **3. Liczba multimediów użytkownika**
    const travelIds = travels.map(trip => trip.id);

    let numberOfPhotos = 0;

    if (travelIds.length > 0) {
      numberOfPhotos = await Multimedia.count({
        where: {
          travel_id: {
            [Op.in]: travelIds, // Sprawdź czy travel_id znajduje się na liście
          },
        },
      });
    }

    return res.status(200).json({
      numberOfTrips,
      daysInTrip,
      numberOfPhotos,
    });
  } catch (error) {
    console.error('❌ Error fetching user stats:', error);
    next(error);
  }
};