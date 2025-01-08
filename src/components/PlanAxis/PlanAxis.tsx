import React from "react";
import styles from "./PlanAxis.module.css";

interface PlanAxisProps {
  currentStep: number;
}

const PlanAxis: React.FC<PlanAxisProps> = ({currentStep}) => {
  return (
    <div className={styles.container}>
      {currentStep === 1 && <h2 className={styles.title}>PLAN YOUR TRIP</h2>}
      <div className={styles.axis}>
        <div
          className={`${styles.segment} ${
            currentStep >= 1 ? styles.active : ""
          }`}
        >
          <span className={styles.label}>Trip details</span>
        </div>
        <div
          className={`${styles.segment} ${
            currentStep >= 2 ? styles.active : ""
          }`}
        >
          <span className={styles.label}>Flights</span>
        </div>
        <div
          className={`${styles.segment} ${
            currentStep >= 3 ? styles.active : ""
          }`}
        >
          <span className={styles.label}>Hotels</span>
        </div>
        <div
          className={`${styles.segment} ${
            currentStep >= 4 ? styles.active : ""
          }`}
        >
          <span className={styles.label}>Restaurants</span>
        </div>
        <div
          className={`${styles.segment} ${
            currentStep >= 5 ? styles.active : ""
          }`}
        >
          <span className={styles.label}>Attractions</span>
        </div>
      </div>
    </div>
  );
};

export default PlanAxis;
