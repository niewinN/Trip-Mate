import React from 'react';
import styles from './HotelSearchPanel.module.css';

interface HotelSearchPanelProps {
  query: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  rooms: number;
  setQuery: (value: string) => void;
  setCheckInDate: (date: string) => void;
  setCheckOutDate: (date: string) => void;
  setGuests: (count: number) => void;
  setRooms: (count: number) => void;
  onSearch: () => void; // Funkcja wyszukiwania będzie wywoływana tylko po naciśnięciu przycisku
}

const HotelSearchPanel: React.FC<HotelSearchPanelProps> = ({
  query,
  checkInDate,
  checkOutDate,
  guests,
  rooms,
  setQuery,
  setCheckInDate,
  setCheckOutDate,
  setGuests,
  setRooms,
  onSearch,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();  // Zatrzymanie domyślnej akcji formularza
        onSearch();  // Wywołanie funkcji wyszukiwania po kliknięciu "Szukaj"
      }}
      className={styles.form}
    >
      <div className={styles.inputWrapper}>
        <label htmlFor="query" className={styles.label}>City</label>
        <input
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}  // Zmiana wartości miasta
          placeholder="Wpisz miasto"
          className={styles.input}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="checkInDate" className={styles.label}>Check in</label>
        <input
          id="checkInDate"
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}  // Zmiana daty przyjazdu
          className={styles.input}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="checkOutDate" className={styles.label}>Check out</label>
        <input
          id="checkOutDate"
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}  // Zmiana daty wyjazdu
          className={styles.input}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="guests" className={styles.label}>Guests</label>
        <input
          id="guests"
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}  // Zmiana liczby gości
          className={`${styles.input} ${styles.inputNumber}`}
          min="1"
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="rooms" className={styles.label}>Rooms</label>
        <input
          id="rooms"
          type="number"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}  // Zmiana liczby pokoi
          className={`${styles.input} ${styles.inputNumber}`}
          min="1"
        />
      </div>

      <div className={styles.btn}>
        <button type="submit" className={styles.button}>Szukaj</button>  {/* Kliknięcie przycisku "Szukaj" wywołuje wyszukiwanie */}
      </div>
    </form>
  );
};

export default HotelSearchPanel;
