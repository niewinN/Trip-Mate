import React from "react";
import styles from "./TripName.module.css"

interface TripNameProps {
  tripName: string;
  setTripName: (name: string) => void;
  onNext: () => void;
}

const TripName: React.FC<TripNameProps> = ({tripName, setTripName, onNext}) => {
  return (
    <div className={styles.tripName}>
        <input type="text" placeholder='Name your trip' value={tripName} onChange={(e) => setTripName(e.target.value)} />
        <button className={styles.btn} onClick={onNext}>Next</button>
    </div>
  )
}

export default TripName