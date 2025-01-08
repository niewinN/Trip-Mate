import React from 'react';
import styles from './NoTripsBanner.module.css';
import { useNavigate } from 'react-router-dom';

const NoTripsBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/plan');
  };

  return (
    <div className={styles.banner}>
      <h2 className={styles.title}>You don't have any planned trips yet!</h2>
      <p className={styles.description}>
        Start planning your next adventure now and create unforgettable memories.
      </p>
      <button onClick={handleNavigate} className={styles.button}>
        Start Planning
      </button>
    </div>
  );
};

export default NoTripsBanner;
