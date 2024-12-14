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
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => {
  return (
    <div className={styles.flightList}>
      {flights.length === 0 ? (
        <p>Brak wyników wyszukiwania.</p>
      ) : (
        flights.map((flight, index) => (
          <Flight key={index} flight={flight} />
        ))
      )}
    </div>
  );
};

export default FlightList;
