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
