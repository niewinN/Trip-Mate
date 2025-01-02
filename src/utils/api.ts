import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

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


export const createTravel = async (travelData: any, token: string) => {
  const response = await axios.post('http://localhost:5000/api/travels/create', travelData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


// DATA
export const fetchHotels = () => API.get('/data/hotels');

export const fetchFlights = (params: FetchFlightsParams) =>
  API.get('/data/flights', { params });

export const fetchRestaurants = (params: { location: string }) =>
  API.get('/data/restaurants', { params });
