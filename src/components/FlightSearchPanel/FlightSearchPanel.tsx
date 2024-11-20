import React, { useState } from "react";
import styles from "./FlightSearchPanel.module.css";

interface FlightSearchPanelProps {
  onSearch: (departure: string, arrival: string, departDate: string, returnDate: string) => void;
}

const FlightSearchPanel: React.FC<FlightSearchPanelProps> = ({ onSearch }) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(departure, arrival, departDate, returnDate);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchPanel}>
      <div className={styles.field}>
        <label htmlFor="departure">From</label>
        <input
          type="text"
          id="departure"
          placeholder="Country, city or airport"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="arrival">To</label>
        <input
          type="text"
          id="arrival"
          placeholder="Country, city or airport"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="departDate">Depart</label>
        <input
          type="date"
          id="departDate"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="returnDate">Return</label>
        <input
          type="date"
          id="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default FlightSearchPanel;
