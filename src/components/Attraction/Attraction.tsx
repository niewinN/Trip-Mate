import React, { useState } from "react";
import styles from "./Attraction.module.css";
import AttractionModal from "../AttractionModal/AttractionModal";

export interface AttractionProps {
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
  onSelect?: (attraction: any) => void;
  isSelected?: boolean;
  showAddButton?: boolean;
  disabledSelectedStyle?: boolean;
}

const Attraction: React.FC<AttractionProps> = ({
  title,
  description,
  thumbnail,
  rating,
  reviews_original,
  reviews,
  address,
  hours,
  place_id,
  gps_coordinates,
  place_id_search,
  onSelect,
  isSelected,
  showAddButton = true,
  disabledSelectedStyle = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToPlan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect({
        title,
        description,
        thumbnail,
        rating,
        reviews_original,
        reviews,
        address,
        hours,
        place_id,
        gps_coordinates,
        place_id_search,
      });
    }
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className={`${styles.attractionCard} ${
          isSelected && !disabledSelectedStyle ? styles.selected : ""
        }`}
      >
        {/* Przycisk dodawania */}
        {showAddButton && (
          <button
            className={styles.addToPlan}
            onClick={handleAddToPlan}
            aria-label={`Add ${title} to the plan`}
          >
            +
          </button>
        )}
        {/* Obrazek atrakcji */}
        <div className={styles.thumbnailContainer}>
          <img src={thumbnail} alt={title} className={styles.thumbnail} />
        </div>

        {/* Szczegóły atrakcji */}
        <div className={styles.details}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.rating}>
            {rating} ⭐️ <span>({reviews_original})</span>
          </div>
          <p className={styles.address}>{address}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      {isModalOpen && (
        <AttractionModal
          attraction={{
            title,
            description,
            thumbnail,
            rating,
            reviews_original,
            reviews,
            address,
            hours,
            place_id,
            gps_coordinates,
            place_id_search,
          }}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Attraction;
