import React from 'react';
import styles from './AttractionModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faStar,
  faMapMarkerAlt,
  faClock,
  faDirections,
  faLocationArrow,
} from '@fortawesome/free-solid-svg-icons';

interface AttractionModalProps {
  attraction: {
    title: string;
    description: string;
    thumbnail: string;
    rating: number;
    reviews_original: string;
    reviews: number;
    address: string;
    hours: string;
    place_id: string;
    gps_coordinates: { latitude: number; longitude: number };
    place_id_search: string;
  };
  onClose: () => void;
}

const AttractionModal: React.FC<AttractionModalProps> = ({ attraction, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        {/* Zamknięcie */}
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Nagłówek */}
        <div className={styles.header}>
          <img src={attraction.thumbnail} alt={attraction.title} className={styles.thumbnail} />
          <h2>{attraction.title}</h2>
        </div>

        {/* Szczegóły */}
        <div className={styles.section}>
          <p>
            <FontAwesomeIcon icon={faStar} /> <strong>Rating:</strong> {attraction.rating} ({attraction.reviews_original})
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Address:</strong> {attraction.address}
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} /> <strong>Hours:</strong> {attraction.hours}
          </p>
          <p>{attraction.description}</p>
          <p>
            <FontAwesomeIcon icon={faLocationArrow} /> <strong>Coordinates:</strong> Latitude: {attraction.gps_coordinates.latitude}, Longitude: {attraction.gps_coordinates.longitude}
          </p>
        </div>

        {/* Link do Mapy */}
        {attraction.place_id_search && (
          <div>
            <a
              href={attraction.place_id_search}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsLink}
            >
              <FontAwesomeIcon icon={faDirections} /> Get Directions
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttractionModal;
