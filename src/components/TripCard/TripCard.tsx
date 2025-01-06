import React, { useState, useEffect } from 'react';
import styles from './TripCard.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface TripCardProps {
  id: number;
  tripName: string;
  arrivalCity: string;
}

const TripCard: React.FC<TripCardProps> = ({ id, tripName, arrivalCity }) => {
  const [cityImage, setCityImage] = useState<string>('https://via.placeholder.com/800x600?text=Loading+Image');
  const navigate = useNavigate();

  // Funkcja pobierająca obrazek z API i zapisująca go w LocalStorage
  const fetchCityImage = async (city: string) => {
    try {
      const localStorageKey = `cityImage_${city}`;
      const cachedImage = localStorage.getItem(localStorageKey);

      if (cachedImage) {
        setCityImage(cachedImage);
        console.log(`✅ Loaded from LocalStorage: ${localStorageKey}`);
        return;
      }

      console.log(`🔄 Fetching image for city: ${city}`);
      const response = await axios.get('http://localhost:5000/api/data/city-image', {
        params: { q: city },
      });

      const imageUrl = response.data.image || 'https://via.placeholder.com/800x600?text=No+Image+Available';
      setCityImage(imageUrl);

      // Buforowanie obrazka w LocalStorage
      localStorage.setItem(localStorageKey, imageUrl);
      console.log(`✅ Saved to LocalStorage: ${localStorageKey}`);
    } catch (error) {
      console.error('❌ Error fetching city image:', error);
    }
  };

  useEffect(() => {
    fetchCityImage(arrivalCity);
  }, [arrivalCity]);

  const handleClick = () => {
    navigate(`/summary/${id}`);
  };

  return (
    <div
      className={styles.tripCard}
      style={{
        backgroundImage: `url(${cityImage})`,
      }}
      onClick={handleClick}
    >
      <div className={styles.overlay}>
        <h2 className={styles.tripName}>{tripName}</h2>
        {/* <p className={styles.cityName}>{arrivalCity}</p> */}
      </div>
    </div>
  );
};

export default TripCard;
