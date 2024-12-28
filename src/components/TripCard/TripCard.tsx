import React, { useEffect, useState } from 'react';
import styles from './TripCard.module.css';

interface TripCardProps {
  tripName: string;
  arrivalCity: string;
}

const TripCard: React.FC<TripCardProps> = ({ tripName, arrivalCity }) => {
  const [cityImage, setCityImage] = useState<string>('https://via.placeholder.com/800x600?text=Loading+Image');

  useEffect(() => {
    const fetchCityImage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/data/city-image?q=${encodeURIComponent(arrivalCity)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('🎯 City Image URL:', data.image);

        setCityImage(data.image || 'https://via.placeholder.com/800x600?text=No+Image+Available');
      } catch (error) {
        console.error('Error fetching city image:', error);
        setCityImage('https://via.placeholder.com/800x600?text=No+Image+Available');
      }
    };

    fetchCityImage();
  }, [arrivalCity]);

  return (
    <div
      className={styles.tripCard}
      style={{
        backgroundImage: `url(${cityImage})`,
      }}
    >
      <div className={styles.overlay}>
        <h2 className={styles.tripName}>{tripName}</h2>
      </div>
    </div>
  );
};

export default TripCard;
