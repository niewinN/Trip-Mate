import React from "react";
import styles from "./Flight.module.css";
import { useNavigate } from "react-router-dom";

interface FlightProps {
  flight: {
    airline: string;
    airline_logo: string;
    departure_airport: string;
    arrival_airport: string;
    departure_time: string;
    arrival_time: string;
    total_duration: number;
    price: number;
    segments?: string | {
      departure: { airport: string; time: string };
      arrival: { airport: string; time: string };
      duration: number;
    }[];
  };
  onSelect: (flight: any) => void;
  buttonLabel?: string;
  isRedirectEnabled?: boolean;
}

const Flight: React.FC<FlightProps> = ({ flight, onSelect, buttonLabel = 'Select', isRedirectEnabled = false }) => {

  const navigate = useNavigate()

  const handleSelect = () => {
    if (isRedirectEnabled) {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/plan");
      } else {
        navigate("/login");
      }
    } else {
      onSelect(flight);
    }
  };

  // Parsowanie segmentów, jeśli są zapisane jako string
  let segments: {
    departure: { airport: string; time: string };
    arrival: { airport: string; time: string };
    duration: number;
  }[] = [];

  if (typeof flight.segments === "string") {
    try {
      segments = JSON.parse(flight.segments);
    } catch (error) {
      console.error("❌ Error parsing flight segments:", error);
    }
  } else if (Array.isArray(flight.segments)) {
    segments = flight.segments;
  }

  // Funkcja do wyciągania godziny z pełnej daty i czasu
  const formatTime = (dateTime: string) => {
    if (!dateTime) return "N/A";
    return dateTime.split(" ")[1] || new Date(dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={styles.flightCard}>
      {/* Logo i nazwa linii lotniczej */}
      <div className={styles.airline}>
        <img src={flight.airline_logo} alt={flight.airline} className={styles.logo} />
        <span className={styles.airlineName}>{flight.airline}</span>
      </div>

      {/* Szczegóły lotów */}
      <div className={styles.flightDetails}>
        {segments.length > 0 ? (
          segments.map((segment, index) => (
            <div key={index} className={styles.segment}>
              <div className={styles.flightInfo}>
                <p className={styles.airport}>{segment.departure.airport}</p>
                <p className={styles.time}>{formatTime(segment.departure.time)}</p>
              </div>
              <div className={styles.arrow}>
                <div className={styles.line}></div>
                <span className={styles.duration}>{segment.duration} min</span>
              </div>
              <div className={styles.flightInfo}>
                <p className={styles.airport}>{segment.arrival.airport}</p>
                <p className={styles.time}>{formatTime(segment.arrival.time)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No flight segments available</p>
        )}
      </div>

      {/* Cena i przycisk */}
      <div className={styles.priceSection}>
        <div className={styles.price}>
          <span>{flight.price} zł</span>
        </div>
        <button className={styles.selectButton} onClick={handleSelect}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Flight;
