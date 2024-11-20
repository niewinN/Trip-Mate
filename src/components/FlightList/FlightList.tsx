import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FlightList.module.css';

interface Flight {
  flights: {
    departure_airport: { name: string; time: string };
    arrival_airport: { name: string; time: string };
    duration: number;
    airline: string;
    travel_class: string;
    price?: number;
  }[];
  total_duration: number;
  price: number;
}

const FlightList: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [departure, setDeparture] = useState<string>('PEK');
  const [arrival, setArrival] = useState<string>('AUS');
  const [outboundDate, setOutboundDate] = useState<string>('2024-11-20');
  const [returnDate, setReturnDate] = useState<string>('2024-11-25');

  const fetchFlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/flights', {
        params: { departure_id: departure, arrival_id: arrival, outbound_date: outboundDate, return_date: returnDate },
      });
      setFlights(response.data);
    } catch {
      setError('Błąd podczas pobierania lotów');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFlights();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista Lotów</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          placeholder="Kod lotniska wylotu"
          className={styles.input}
        />
        <input
          type="text"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          placeholder="Kod lotniska przylotu"
          className={styles.input}
        />
        <input
          type="date"
          value={outboundDate}
          onChange={(e) => setOutboundDate(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Szukaj
        </button>
      </form>

      {loading && <p className={styles.loading}>Ładowanie danych...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.flightList}>
        {flights.map((flight, index) => (
          <div key={index} className={styles.flightCard}>
            <h3 className={styles.flightTitle}>Cena: {flight.price} USD</h3>
            <p className={styles.flightInfo}>
              Wylot: {flight.flights[0].departure_airport.name} ({flight.flights[0].departure_airport.time})
            </p>
            <p className={styles.flightInfo}>
              Przylot: {flight.flights[flight.flights.length - 1].arrival_airport.name} ({flight.flights[flight.flights.length - 1].arrival_airport.time})
            </p>
            <p className={styles.flightInfo}>Czas trwania: {flight.total_duration} min</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightList;
