import React from 'react';
import styles from './FlightSearchPanel.module.css';

interface FlightSearchPanelProps {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  setDepartureCity: (value: string) => void;
  setArrivalCity: (value: string) => void;
  setDepartureDate: (date: string) => void;
  setReturnDate: (date: string) => void;
  setPassengers: (count: number) => void;
  onSearch: () => void; // Funkcja wyszukiwania po kliknięciu "Szukaj"
}

const FlightSearchPanel: React.FC<FlightSearchPanelProps> = ({
  departureCity,
  arrivalCity,
  departureDate,
  returnDate,
  passengers,
  setDepartureCity,
  setArrivalCity,
  setDepartureDate,
  setReturnDate,
  setPassengers,
  onSearch,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();  // Wywołanie funkcji wyszukiwania po kliknięciu "Szukaj"
      }}
      className={styles.form}
    >
      <div className={styles.inputWrapper}>
        <label htmlFor="departureCity" className={styles.label}>Departure City</label>
        <input
          id="departureCity"
          type="text"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}  // Zmiana miasta wylotu
          placeholder="Enter departure city"
          className={styles.input}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="arrivalCity" className={styles.label}>Arrival City</label>
        <input
          id="arrivalCity"
          type="text"
          value={arrivalCity}
          onChange={(e) => setArrivalCity(e.target.value)}  // Zmiana miasta przyjazdu
          placeholder="Enter arrival city"
          className={styles.input}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="departureDate" className={styles.label}>Departure Date</label>
        <input
          id="departureDate"
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}  // Zmiana daty wylotu
          className={styles.input}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="returnDate" className={styles.label}>Return Date</label>
        <input
          id="returnDate"
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}  // Zmiana daty powrotu
          className={styles.input}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="passengers" className={styles.label}>Passengers</label>
        <input
          id="passengers"
          type="number"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}  // Zmiana liczby pasażerów
          className={`${styles.input} ${styles.inputNumber}`}
          min="1"
        />
      </div>

      <div className={styles.btn}>
        <button type="submit" className={styles.button}>Search</button>  {/* Kliknięcie przycisku "Szukaj" wywołuje wyszukiwanie */}
      </div>
    </form>
  );
};

export default FlightSearchPanel;
