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
  outboundFlights: any[];
  returnFlights: any[];
  googleFlightsUrl: string | null;
  loading: boolean;
  error: string | null;
  fetchFlights: () => void;
}

const FlightSearchContext = createContext<FlightSearchContextProps | undefined>(undefined);

export const FlightSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departureCity, setDepartureCity] = useState("Warsaw");
  const [arrivalCity, setArrivalCity] = useState("London");
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState(new Date(Date.now() + 86400000).toISOString().split("T")[0]);
  const [passengers, setPassengers] = useState(1);
  const [outboundFlights, setOutboundFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [googleFlightsUrl, setGoogleFlightsUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const fetchFlights = async () => {
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

      setOutboundFlights(response.data.outboundFlights || []);
      setReturnFlights(response.data.returnFlights || []);
    } catch (error) {
      console.error("❌ Error fetching flights:", error);
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
        outboundFlights,
        returnFlights,
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