import React from 'react';
import styles from './Hotel.module.css';

interface HotelProps {
  hotel: {
    name: string;
    type: string;
    overall_rating: number;
    reviews: number;
    rate_per_night: { lowest: string };
    amenities: string[];
    essential_info: string[];
    images: { thumbnail: string }[];
  };
}

const Hotel: React.FC<HotelProps> = ({ hotel }) => {
  return (
    <div className={styles.hotelCard}>
      <div className={styles.hotelHeader}>
        {hotel.images[0]?.thumbnail && (
          <img
            src={hotel.images[0].thumbnail}
            alt={hotel.name}
            className={styles.thumbnail}
          />
        )}
        <div className={styles.hotelDetails}>
          <h3 className={styles.hotelTitle}>{hotel.name}</h3>
          <p className={styles.hotelInfo}>
            {hotel.type} • Ocena: {hotel.overall_rating || 'Brak danych'} ⭐️ • Recenzje: {hotel.reviews || 0}
          </p>
          <p className={styles.hotelPrice}>
            Cena za noc: {hotel.rate_per_night?.lowest || 'Brak danych'}
          </p>
        </div>
      </div>
      <div className={styles.amenities}>
        {hotel.amenities.slice(0, 5).map((amenity, i) => (
          <span key={i} className={styles.amenity}>
            {amenity}
          </span>
        ))}
      </div>
      <button className={styles.pricesButton}>Zobacz ceny</button>
    </div>
  );
};

export default Hotel;
