import React from 'react';
import styles from './FlightModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faClock, faDollarSign, faInfoCircle, faTimes, faLeaf, faLink } from '@fortawesome/free-solid-svg-icons';

interface FlightModalProps {
  flight: any;
  onClose: () => void;
  googleFlightsUrl?: string;
}

const FlightModal: React.FC<FlightModalProps> = ({ flight, onClose, googleFlightsUrl }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Zamknij modal po kliknięciu poza obszarem
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        {/* Przycisk Zamknięcia */}
        <button onClick={onClose} className={styles.closeButton}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Nagłówek */}
        <div className={styles.header}>
          <img src={flight.airline_logo} alt={flight.airline} className={styles.logo} />
          <h2 className={styles.title}>{flight.airline || 'No airline information'}</h2>
        </div>

        {/* Szczegóły Ogólne */}
        <div className={styles.section}>
          <h3><FontAwesomeIcon icon={faInfoCircle} /> General Flight Details</h3>
          <p> <strong>Price:</strong> {flight.price} PLN</p>
          <p> <strong>Total Travel Time:</strong> {flight.total_duration} min</p>
          <p><strong>Flight Type:</strong> {flight.type || 'N/A'}</p>
        </div>

        {/* Segmenty Lotu */}
        <div className={styles.section}>
          <h3><FontAwesomeIcon icon={faPlane} /> Flight Segments</h3>
          {flight.flights?.map((segment: any, index: number) => (
            <div key={index} className={styles.segment}>
              <p><strong>Airplane:</strong> {segment.airplane}</p>
              <p><strong>Flight Number:</strong> {segment.flight_number}</p>
              <p><strong>Class:</strong> {segment.travel_class}</p>
              <p><strong>Departure:</strong> {segment.departure_airport.name} ({segment.departure_airport.id})</p>
              <p><strong>Departure Time:</strong> {segment.departure_airport.time}</p>
              <p><strong>Arrival:</strong> {segment.arrival_airport.name} ({segment.arrival_airport.id})</p>
              <p><strong>Arrival Time:</strong> {segment.arrival_airport.time}</p>
              <p><strong>Segment Duration:</strong> {segment.duration} min</p>
              <p><strong>Legroom:</strong> {segment.legroom}</p>
              <p><strong>Extras:</strong></p>
              <ul>
                {segment.extensions?.map((ext: string, i: number) => (
                  <li key={i}>{ext}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Przesiadki */}
        {flight.layovers?.length > 0 && (
          <div className={styles.section}>
            <h3><FontAwesomeIcon icon={faClock} /> Layovers</h3>
            {flight.layovers.map((layover: any, index: number) => (
              <p key={index}>
                <strong>Airport:</strong> {layover.name} ({layover.id}) — <strong>Duration:</strong> {layover.duration} min
              </p>
            ))}
          </div>
        )}

        {/* Emisje CO2 */}
        {flight.carbon_emissions && (
          <div className={styles.section}>
            <h3><FontAwesomeIcon icon={faLeaf} /> Carbon Emissions</h3>
            <p><strong>Total Emissions:</strong> {flight.carbon_emissions.this_flight} kg</p>
            <p><strong>Typical for Route:</strong> {flight.carbon_emissions.typical_for_this_route} kg</p>
            <p><strong>Difference:</strong> {flight.carbon_emissions.difference_percent}%</p>
          </div>
        )}

        {/* Link do Google Flights */}
        {googleFlightsUrl && (
          <div className={styles.section}>
            <h3><FontAwesomeIcon icon={faLink} /> Book on Google Flights</h3>
            <a href={googleFlightsUrl} target="_blank" rel="noopener noreferrer" className={styles.bookingLink}>
              Book flight
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightModal;
