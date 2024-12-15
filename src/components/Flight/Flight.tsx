import React from "react";
import styles from "./Flight.module.css";

interface FlightProps {
  flight: {
    airline: string;
    airline_logo: string;
    segments: {
      departure: { airport: string; time: string };
      arrival: { airport: string; time: string };
      duration: string;
      stops: string;
    }[];
    price: number;
    currency: string;
  };
  onSelect: (flight: any) => void; // Dodanie prop dla obsługi "Select"
}

const Flight: React.FC<FlightProps> = ({ flight, onSelect }) => {
  return (
    <div className={styles.flightCard}>
      {/* Logo i nazwa linii lotniczej */}
      <div className={styles.airline}>
        <img src={flight.airline_logo} alt={flight.airline} className={styles.logo} />
        <span className={styles.airlineName}>{flight.airline}</span>
      </div>

      {/* Szczegóły lotów */}
      <div className={styles.flightDetails}>
        {flight.segments.map((segment, index) => (
          <div key={index} className={styles.segment}>
            <div className={styles.flightInfo}>
              <p className={styles.airport}>{segment.departure.airport}</p>
              <p className={styles.time}>{segment.departure.time.split(" ")[1]}</p>
            </div>
            <div className={styles.arrow}>
              <div className={styles.line}></div>
              <span className={styles.duration}>{segment.duration} min</span>
            </div>
            <div className={styles.flightInfo}>
              <p className={styles.airport}>{segment.arrival.airport}</p>
              <p className={styles.time}>{segment.arrival.time.split(" ")[1]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cena i przycisk */}
      <div className={styles.priceSection}>
        <div className={styles.price}>
          <span>{flight.currency} {flight.price} zł</span>
        </div>
        <button className={styles.selectButton} onClick={() => onSelect(flight)}>Select →</button>
      </div>
    </div>
  );
};

export default Flight;
