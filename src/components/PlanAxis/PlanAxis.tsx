import React from "react";
import styles from "./PlanAxis.module.css";

const PlanAxis: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>PLAN YOUR TRIP</h2>
      <div className={styles.axis}>
        <div className={`${styles.segment} ${styles.active}`}>
          <span className={styles.label}>Trip details</span>
        </div>
        <div className={styles.segment}>
          <span className={styles.label}>Flights</span>
        </div>
        <div className={styles.segment}>
          <span className={styles.label}>Hotels</span>
        </div>
        <div className={styles.segment}>
          <span className={styles.label}>Restaurants</span>
        </div>
        <div className={styles.segment}>
          <span className={styles.label}>Attractions</span>
        </div>
      </div>
    </div>
  );
};

export default PlanAxis;
