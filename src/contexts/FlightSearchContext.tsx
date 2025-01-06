import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface FlightSearchContextProps {
  departureCity: string;
  setDepartureCity: (value: string) => void;
  arrivalCity: string;
  setArrivalCity: (value: string) => void;
  departureDate: string;
  setDepartureDate: (value: string) => void;
  returnDate: string;
  setReturnDate: (value: string) => void;
  passengers: number;
  setPassengers: (value: number) => void;
  flights: any[];
  googleFlightsUrl: string | null;
  loading: boolean;
  error: string | null;
  fetchFlights: () => void;
}

const FlightSearchContext = createContext<FlightSearchContextProps | undefined>(undefined);

export const FlightSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departureCity, setDepartureCity] = useState<string>("Warsaw");
  const [arrivalCity, setArrivalCity] = useState<string>("London");
  const [departureDate, setDepartureDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().split("T")[0]);
  const [passengers, setPassengers] = useState<number>(1);
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [googleFlightsUrl, setGoogleFlightsUrl] = useState<string | null>(null);

  const fetchFlights = async () => {
    console.log("Fetching flights with:", {
      departureCity,
      arrivalCity,
      departureDate,
      returnDate,
      passengers,
    });
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get("http://localhost:5000/api/data/flights", {
        params: {
          departure_city: departureCity,
          arrival_city: arrivalCity,
          departure_date: departureDate,
          return_date: returnDate,
          passengers,
        },
      });
  
      console.log("API Response:", response.data);
  
      // 🛠️ Ustawiamy flights oraz googleFlightsUrl poprawnie
      setFlights(response.data.flights || []); // Tylko tablica flights
      setGoogleFlightsUrl(response.data.googleFlightsUrl || null); // URL Google Flights
    } catch (error) {
      console.error("Error fetching flights:", error);
      setError("Error fetching flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlightSearchContext.Provider
      value={{
        departureCity,
        setDepartureCity,
        arrivalCity,
        setArrivalCity,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        passengers,
        setPassengers,
        flights,
        googleFlightsUrl,
        loading,
        error,
        fetchFlights,
      }}
    >
      {children}
    </FlightSearchContext.Provider>
  );
};

export const useFlightSearchContext = () => {
  const context = useContext(FlightSearchContext);
  if (!context) {
    throw new Error("useFlightSearchContext must be used within a FlightSearchProvider");
  }
  return context;
};
