import React from 'react';
import styles from './HotelList.module.css';
import Hotel from '../Hotel/Hotel';

interface HotelListProps {
  hotels: any[];  // Tablica hoteli
  query: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  rooms: number;
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  return (
    <div className={styles.hotelList}>
      {hotels.length === 0 ? (
        <p>Brak wyników wyszukiwania.</p>
      ) : (
        hotels.map((hotel, index) => (
          <Hotel key={index} hotel={hotel} />
        ))
      )}
    </div>
  );
};

export default HotelList;
