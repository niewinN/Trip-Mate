import React, { useState } from 'react';
import styles from './TripCard.module.css';
import { useNavigate } from 'react-router-dom';

interface TripCardProps {
  id: number;
  tripName: string;
  arrivalCity: string;
}

const TripCard: React.FC<TripCardProps> = ({ id, tripName, arrivalCity }) => {
  const [cityImage, setCityImage] = useState<string>('https://via.placeholder.com/800x600?text=Loading+Image');
  const navigate = useNavigate();

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
      </div>
    </div>
  );
};

export default TripCard;
