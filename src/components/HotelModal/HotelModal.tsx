import React, { useState } from 'react';
import styles from './HotelModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faMapMarkerAlt,
  faStar,
  faInfoCircle,
  faMoneyBill,
  faCalendarAlt,
  faList,
  faLink,
  faImage,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

interface HotelModalProps {
  hotel: any;
  onClose: () => void;
}

const HotelModal: React.FC<HotelModalProps> = ({ hotel, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1
    );
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
          <h2 className={styles.title}>{hotel.name}</h2>
          <p className={styles.description}>{hotel.description}</p>
          {hotel.hotel_class && (
            <p>
              <FontAwesomeIcon icon={faStar} /> Class: {hotel.hotel_class}
            </p>
          )}
        </div>
        <div className={styles.flex}>
        {/* Galeria zdjęć */}
        {hotel.images && hotel.images.length > 0 ? (
            <div className={styles.gallery}>
              <button className={styles.arrowButton} onClick={prevImage}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <img
                src={hotel.images[currentImageIndex]?.thumbnail || 'https://via.placeholder.com/300'}
                alt={`Hotel image ${currentImageIndex + 1}`}
                className={styles.galleryImage}
              />
              <button className={styles.arrowButton} onClick={nextImage}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          ) : (
            <p>No images available.</p>
          )}
        {/* Szczegóły Ogólne */}
        <div>
          <h3>
            <FontAwesomeIcon icon={faInfoCircle} /> General Details
          </h3>
          <p>
            <FontAwesomeIcon icon={faCalendarAlt} /> Check-in: {hotel.check_in_time || 'N/A'}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendarAlt} /> Check-out: {hotel.check_out_time || 'N/A'}
          </p>
          <p>
            <FontAwesomeIcon icon={faMoneyBill} /> Price per Night: {hotel.rate_per_night?.lowest || 'N/A'} USD
          </p>
          <p>
            <FontAwesomeIcon icon={faMoneyBill} /> Total Price: {hotel.total_rate?.lowest || 'N/A'} USD
          </p>
          {hotel.deal && <p>💥 Deal: {hotel.deal}</p>}
        </div>
        </div>
        

        {/* Opinie */}
        {hotel.reviews_breakdown ? (
          <div className={styles.section}>
            <h3>
              <FontAwesomeIcon icon={faStar} /> Reviews Breakdown
            </h3>
            {hotel.reviews_breakdown.map((review: any, index: number) => (
              <p key={index}>
                <strong>{review.name}:</strong> {review.total_mentioned} mentions, {review.positive} positive, {review.negative} negative
              </p>
            ))}
          </div>
        ) : (
          <p>No reviews available.</p>
        )}

        {/* Udogodnienia */}
        {hotel.amenities && hotel.amenities.length > 0 ? (
          <div className={styles.section}>
            <h3>
              <FontAwesomeIcon icon={faList} /> Amenities
            </h3>
            <ul>
              {hotel.amenities.map((amenity: string, index: number) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No amenities available.</p>
        )}

        {/* Miejsca w pobliżu */}
        {hotel.nearby_places && hotel.nearby_places.length > 0 ? (
  <div className={styles.section}>
    <h3>
      <FontAwesomeIcon icon={faMapMarkerAlt} /> Nearby Places
    </h3>
    {hotel.nearby_places.map((place: any, index: number) => (
      <div key={index} className={styles.nearbyItem}>
        <p><strong>{place.name || 'Unknown Place'}</strong></p>
        {place.transportations && place.transportations.length > 0 ? (
          <ul>
            {place.transportations.map((transport: any, tIndex: number) => (
              <li key={tIndex}>
                {transport.type || 'Unknown Type'}: {transport.duration || 'Unknown Duration'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No transportations available.</p>
        )}
      </div>
    ))}
  </div>
) : (
  <p>No nearby places available.</p>
)}

        {/* Link do rezerwacji */}
        {hotel.link && (
          <div>
            <h3>
              <FontAwesomeIcon icon={faLink} /> Booking Link
            </h3>
            <a
              href={hotel.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookingLink}
            >
              Book Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelModal;
