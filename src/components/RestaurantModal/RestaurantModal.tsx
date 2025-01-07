import React from 'react';
import styles from './RestaurantModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faMapMarkerAlt,
  faStar,
  faInfoCircle,
  faMoneyBill,
  faPhoneAlt,
  faClock,
  faLink,
} from '@fortawesome/free-solid-svg-icons';

interface RestaurantModalProps {
  restaurant: {
    title: string;
    rating: number | string;
    reviews_original: string;
    reviews: number;
    price: string;
    type: string;
    address: string;
    description: string;
    thumbnail: string;
    phone: string;
    hours: string;
    links: {
      website?: string;
      directions?: string;
    };
    gps_coordinates: {
      latitude: number;
      longitude: number;
    } | null;
  };
  onClose: () => void;
}

const RestaurantModal: React.FC<RestaurantModalProps> = ({ restaurant, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        {/* Zamknięcie */}
        <button onClick={onClose} className={styles.closeButton}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Nagłówek */}
        <div className={styles.header}>
          <img src={restaurant.thumbnail} alt={restaurant.title} className={styles.thumbnail} />
          <h2 className={styles.title}>{restaurant.title}</h2>
          <p className={styles.type}>{restaurant.type}</p>
        </div>

        {/* Szczegóły */}
        <div className={styles.section}>
          <h3>
            <FontAwesomeIcon icon={faInfoCircle} /> Details
          </h3>
          <p>
            <FontAwesomeIcon icon={faStar} /> Rating: {restaurant.rating} ({restaurant.reviews_original})
          </p>
          <p>
            <FontAwesomeIcon icon={faMoneyBill} /> Price Range: {restaurant.price}
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Address: {restaurant.address}
          </p>
          <p>
            <FontAwesomeIcon icon={faPhoneAlt} /> Phone: {restaurant.phone}
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} /> Hours: {restaurant.hours}
          </p>
          <p className={styles.description}>{restaurant.description}</p>
        </div>

        {/* Linki */}
        {restaurant.links && (
          <div className={styles.section}>
            <h3>
              <FontAwesomeIcon icon={faLink} /> Links
            </h3>
            {restaurant.links.website && (
              <p>
                <a
                  href={restaurant.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Visit Website
                </a>
              </p>
            )}
            {restaurant.links.directions && (
              <p>
                <a
                  href={restaurant.links.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Get Directions
                </a>
              </p>
            )}
          </div>
        )}

        {/* Współrzędne GPS */}
        {restaurant.gps_coordinates && (
          <div className={styles.section}>
            <h3>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> GPS Coordinates
            </h3>
            <p>Latitude: {restaurant.gps_coordinates.latitude}</p>
            <p>Longitude: {restaurant.gps_coordinates.longitude}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantModal;
