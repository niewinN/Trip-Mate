import React, { useState } from "react";
import styles from "./Flight.module.css";
import { useNavigate } from "react-router-dom";
import FlightModal from "../FlightModal/FlightModal";

interface FlightProps {
  flight: {
    airline: string;
    airline_logo: string;
    totalDuration: number;
    price: number;
    segments: {
      departure: { airport: string; time: string };
      arrival: { airport: string; time: string };
      duration: number;
    }[];
  };
  onSelect: (flight: any) => void;
  isReturnFlight?: boolean;
  isSelected?: boolean;
}


const Flight: React.FC<FlightProps> = ({ flight, onSelect, isReturnFlight = false, isSelected }) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("🔍 Full Flight Data:", flight);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatTime = (dateTime: string) => {
    if (!dateTime) return "N/A";
    return dateTime.split(" ")[1] || new Date(dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <div className={`${styles.flightCard} ${isSelected ? styles.selected : ""}`} onClick={handleOpenModal}>
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
        <p className={styles.airport}>
          {segment.departure.airport}
        </p>
        <p className={styles.time}>{formatTime(segment.departure.time)}</p>
      </div>
      <div className={styles.arrow}>
        <div className={styles.line}></div>
        <span className={styles.duration}>{segment.duration} min</span>
      </div>
      <div className={styles.flightInfo}>
        <p className={styles.airport}>
          {segment.arrival.airport}
        </p>
        <p className={styles.time}>{formatTime(segment.arrival.time)}</p>
      </div>
    </div>
  ))}
</div>


        {/* Cena i przycisk */}
        <div className={styles.priceSection}>
          <div className={styles.price}>
            <span>{flight.price} zł</span>
          </div>
          <button className={styles.selectButton} onClick={() => onSelect(flight)}>
            {isReturnFlight ? "Select Return" : "Select"}
          </button>
        </div>
      </div>
      {isModalOpen && <FlightModal flight={flight} onClose={handleCloseModal} />}
    </>
  );
};

export default Flight;
