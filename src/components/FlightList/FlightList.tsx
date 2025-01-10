// import React from "react";
// import styles from "./FlightList.module.css";
// import Flight from "../Flight/Flight";

// interface FlightListProps {
//   flights: {
//     airline: string;
//     airline_logo: string;
//     totalDuration: number;
//     price: number;
//     segments: {
//       departure: { airport: string; time: string };
//       arrival: { airport: string; time: string };
//       duration: number;
//     }[];
//   }[];
//   onSelect: (flight: any) => void; // Prop do obsługi wybranego lotu
//   isRedirectEnabled?: boolean;
//   googleFlightsUrl?: string; // Dodano właściwość
// }

// const FlightList: React.FC<FlightListProps> = ({ flights, onSelect, isRedirectEnabled = false, googleFlightsUrl }) => {
//   return (
//     <div className={styles.flightList}>
//       {flights.length === 0 ? (
//         <p>Brak wyników wyszukiwania.</p>
//       ) : (
//         flights.map((flight, index) => (
//           <Flight key={index} flight={flight} onSelect={onSelect} isRedirectEnabled={isRedirectEnabled} googleFlightsUrl={googleFlightsUrl} />
//         ))
//       )}
//     </div>
//   );
// };

// export default FlightList;
import React from "react";
import Flight from "../Flight/Flight";

interface FlightListProps {
  outboundFlights: any[];
  returnFlights: any[];
  onSelectOutbound: (flight: any) => void;
  onSelectReturn: (flight: any) => void;
  selectedOutboundFlight: any;
  selectedReturnFlight: any;
}


const FlightList: React.FC<FlightListProps> = ({ outboundFlights, returnFlights, onSelectOutbound, onSelectReturn, selectedOutboundFlight, selectedReturnFlight }) => (
  <div>
    <h3>🛫 Loty w tamtą stronę</h3>
    {outboundFlights.length > 0 ? (
      outboundFlights.map((flight, index) => (
        <Flight
          key={`outbound-${index}`}
          flight={flight}
          onSelect={onSelectOutbound}
          isReturnFlight={false}
          isSelected={selectedOutboundFlight?.segments === flight.segments}
        />

      ))
    ) : (
      <p>Brak dostępnych lotów wychodzących.</p>
    )}

    <h3>🛬 Loty powrotne</h3>
    {returnFlights.length > 0 ? (
      returnFlights.map((flight, index) => (
        <Flight
          key={`return-${index}`}
          flight={flight}
          onSelect={onSelectReturn}
          isReturnFlight={true}
          isSelected={selectedReturnFlight?.segments === flight.segments}
        />

      ))
    ) : (
      <p>Brak dostępnych lotów powrotnych.</p>
    )}
  </div>
);

export default FlightList;
