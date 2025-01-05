import React from "react";
import styles from "./Attraction.module.css";

export interface AttractionProps {
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews_original: string;
  reviews: number;
  address: string;
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
  address,
  onSelect,
  isSelected,
  showAddButton = true,
  disabledSelectedStyle = false
}) => {
  const handleAddToPlan = () => {
    if (onSelect) {
      console.log("🟦 Selected Attraction:", { title, description }); // Debug
      onSelect({ title, description, thumbnail, rating, reviews_original, address });
    }
  };
  

  return (
    <div className={`${styles.attractionCard} ${isSelected && !disabledSelectedStyle ? styles.selected : ""}`}>
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
  );
};

export default Attraction;
