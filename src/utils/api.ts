import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

interface TravelData {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate: string;
  passengersCount: number;
  tripName: string;
  tripPersons: {
    name: string;
    image: string | null;
  }[];
  flight?: {
    airline: string | null;
    airline_logo: string | null;
    price: number | null;
    departure_airport: string | null;
    arrival_airport: string | null;
    departure_time: string | null;
    arrival_time: string | null;
    total_duration: string | null;
  };
  hotel?: {
    name: string | null;
    description: string | null;
    check_in_time: string | null;
    check_out_time: string | null;
    price: number | null;
    location: string | null;
    check_in_date: string | null;
    check_out_date: string | null;
  };
  restaurants: {
    title: string;
    address: string;
    description: string;
    price: string;
    thumbnail: string | null;
  }[];
  attractions: {
    title: string;
    description: string;
    thumbnail: string | null;
  }[];
}

// Stworzenie podróży
export const createTravel = async (travelData: TravelData, token: string) => {
  if (!token) {
    throw new Error('Authorization token is required');
  }

  try {
    const response = await API.post('/travels', travelData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Error creating travel:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create travel');
  }
};

interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface LoginUserParams {
  email: string;
  password: string;
}

interface FetchFlightsParams {
  departure_city: string;
  arrival_city: string;
  departure_date: string;
  return_date: string;
  passengers: string;
}

// AUTH
export const registerUser = async (name: string, email: string, password: string, phone?: string) => {
  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required');
  }

  const response = await axios.post('http://localhost:5000/api/auth/register', {
    name,
    email,
    password,
    phone,
  });

  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const response = await axios.post('http://localhost:5000/api/auth/login', {
    email,
    password,
  });

  return response.data; // Zwraca token JWT
};


// export const createTravel = async (travelData: any, token: string) => {
//   const response = await axios.post('http://localhost:5000/api/travels/create', travelData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };


// DATA
export const fetchHotels = () => API.get('/data/hotels');

export const fetchFlights = (params: FetchFlightsParams) =>
  API.get('/data/flights', { params });

export const fetchRestaurants = (params: { location: string }) =>
  API.get('/data/restaurants', { params });
