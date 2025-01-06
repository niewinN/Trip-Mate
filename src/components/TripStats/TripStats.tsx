import React from 'react';
import styles from './TripStats.module.css';

interface TripStatsProps {
  numberOfTrips: number;
  daysInTrip: number;
  numberOfPhotos: number;
}

const TripStats: React.FC<TripStatsProps> = ({
  numberOfTrips,
  daysInTrip,
  numberOfPhotos,
}) => {
  return (
    <div className={styles.statsCard}>
      <h2 className={styles.title}>Stats</h2>
      <ul className={styles.statsList}>
        <li>
          <span>Number of trips:</span> <strong>{numberOfTrips}</strong>
        </li>
        <li>
          <span>Days in trip:</span> <strong>{daysInTrip}</strong>
        </li>
        <li>
          <span>Number of photos:</span> <strong>{numberOfPhotos}</strong>
        </li>
      </ul>
    </div>
  );
};

export default TripStats;
