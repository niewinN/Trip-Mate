// import React from "react";
// import styles from "./Flight.module.css";

// interface FlightProps {
//   flight: {
//     airline: string;
//     departure: { airport: string; time: string };
//     arrival: { airport: string; time: string };
//     stops: string;
//     duration: string;
//     price: number;
//   };
// }

// const Flight: React.FC<FlightProps> = ({ flight }) => {
//   return (
//     <div className={styles.flightCard}>
//       <div className={styles.details}>
//         <div className={styles.airline}>{flight.airline}</div>
//         <div className={styles.segment}>
//           <span className={styles.time}>{flight.departure.time}</span>
//           <span className={styles.airport}>{flight.departure.airport}</span>
//         </div>
//         <div className={styles.info}>
//           <span>{flight.stops}</span>
//           <span>{flight.duration}</span>
//         </div>
//         <div className={styles.segment}>
//           <span className={styles.time}>{flight.arrival.time}</span>
//           <span className={styles.airport}>{flight.arrival.airport}</span>
//         </div>
//       </div>
//       <div className={styles.actions}>
//         <div className={styles.price}>{flight.price} zł</div>
//         <button className={styles.selectButton}>Select</button>
//       </div>
//     </div>
//   );
// };

// export default Flight;
import React from "react";
import styles from "./Flight.module.css";

interface FlightProps {
  flight: {
    airline: string;
    airline_logo: string;
    departure: { airport: string; time: string };
    arrival: { airport: string; time: string };
    stops: number;
    totalDuration: number;
    price: number;
  };
}

const Flight: React.FC<FlightProps> = ({ flight }) => {
  return (
    <div className={styles.flightCard}>
      <div className={styles.airline}>
        <img src={flight.airline_logo} alt={flight.airline} className={styles.logo} />
        <span>{flight.airline}</span>
      </div>
      <div className={styles.details}>
        <div className={styles.segment}>
          <span className={styles.time}>{flight.departure.time}</span>
          <span className={styles.airport}>{flight.departure.airport}</span>
        </div>
        <div className={styles.info}>
          <span>{flight.stops > 0 ? `${flight.stops} stop(s)` : "Direct"}</span>
          <span>{flight.totalDuration} min</span>
        </div>
        <div className={styles.segment}>
          <span className={styles.time}>{flight.arrival.time}</span>
          <span className={styles.airport}>{flight.arrival.airport}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.price}>{flight.price} zł</div>
        <button className={styles.selectButton}>Select</button>
      </div>
    </div>
  );
};

export default Flight;
