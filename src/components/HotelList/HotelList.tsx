import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './HotelList.module.css';
import Hotel from '../Hotel/Hotel';

interface Hotel {
  name: string;
  type: string;
  overall_rating: number;
  reviews: number;
  rate_per_night: { lowest: string };
  amenities: string[];
  essential_info: string[];
  images: { thumbnail: string }[];
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('Bali');

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/hotels', {
        params: { q: query, check_in_date: '2024-11-20', check_out_date: '2024-11-25' },
      });
      setHotels(response.data);
    } catch {
      setError('Błąd podczas pobierania hoteli');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHotels();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista Hoteli</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Wpisz miasto"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Szukaj
        </button>
      </form>

      {loading && <p className={styles.loading}>Ładowanie danych...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.hotelList}>
        {hotels.map((hotel, index) => (
          <Hotel key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
