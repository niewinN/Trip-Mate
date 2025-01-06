import React from "react";
import styles from "./FlightList.module.css";
import Flight from "../Flight/Flight";

interface FlightListProps {
  flights: {
    airline: string;
    airline_logo: string;
    totalDuration: number;
    price: number;
    segments: {
      departure: { airport: string; time: string };
      arrival: { airport: string; time: string };
      duration: number;
    }[];
  }[];
  onSelect: (flight: any) => void; // Prop do obsługi wybranego lotu
  isRedirectEnabled?: boolean;
  googleFlightsUrl?: string; // Dodano właściwość
}

const FlightList: React.FC<FlightListProps> = ({ flights, onSelect, isRedirectEnabled = false, googleFlightsUrl }) => {
  return (
    <div className={styles.flightList}>
      {flights.length === 0 ? (
        <p>Brak wyników wyszukiwania.</p>
      ) : (
        flights.map((flight, index) => (
          <Flight key={index} flight={flight} onSelect={onSelect} isRedirectEnabled={isRedirectEnabled} googleFlightsUrl={googleFlightsUrl} />
        ))
      )}
    </div>
  );
};

export default FlightList;