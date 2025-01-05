import React from 'react';
import styles from './Hotel.module.css';
import { useNavigate } from 'react-router-dom';

interface HotelProps {
  hotel: {
    name: string;
    description?: string;
    rate_per_night?: { lowest: string };
    hotel_class?: string | null;
    overall_rating?: number;
    reviews?: number;
    check_in_time?: string | null;
    check_out_time?: string | null;
    amenities?: string[];
    nearby_places?: string[];
    images?: { thumbnail: string }[]; // Dla danych z Serp API
    thumbnail?: string; // Dla danych z bazy danych
    price?: number; // Dla danych z bazy danych
  };
  onSelect: (hotel: any) => void;
  buttonLabel?: string;
  isRedirectEnabled?: boolean;
}

const Hotel: React.FC<HotelProps> = ({ hotel, onSelect, buttonLabel = 'Select', isRedirectEnabled = false, }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    if (isRedirectEnabled) {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/plan');
      } else {
        navigate('/login');
      }
    } else {
      onSelect(hotel);
    }
  };

  if (!hotel) {
    return <div className={styles.hotelCard}>No hotel data available.</div>;
  }

    // Normalizacja danych z różnych źródeł
    const thumbnail = hotel.images?.[0]?.thumbnail || hotel.thumbnail || 'https://via.placeholder.com/150';
    const price = hotel.rate_per_night?.lowest || hotel.price || 'N/A';

  return (
    <div className={styles.hotelCard}>
      {/* Obrazek hotelu */}
      <div className={styles.hotelImage}>
        {hotel.images?.[0]?.thumbnail ? (
          <img
            src={thumbnail}
            alt={hotel.name || 'Hotel Image'}
            className={styles.thumbnail}
          />
        ) : (
          <div className={styles.placeholder}>No image available</div>
        )}
      </div>

      {/* Szczegóły hotelu */}
      <div className={styles.hotelDetails}>
        <h3 className={styles.hotelTitle}>{hotel.name || 'Unknown Hotel'}</h3>
        <p className={styles.hotelInfo}>
          {hotel.hotel_class || 'N/A'} • Ocena: {hotel.overall_rating || 'Brak danych'} ⭐️ • Recenzje: {hotel.reviews || 0}
        </p>
        <p className={styles.hotelPrice}>
          Cena za noc: {price} zł
        </p>

        {/* Udogodnienia */}
        <div className={styles.amenities}>
          {hotel.amenities?.slice(0, 5).map((amenity, i) => (
            <span key={i} className={styles.amenity}>
              {amenity}
            </span>
          )) || <p>No amenities available.</p>}
        </div>

        {/* Przycisk "Zobacz ceny" */}
        <button className={styles.pricesButton} onClick={handleSelect}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Hotel;
