import React from "react";
import styles from "./Restaurant.module.css";

interface Restaurant {
  title: string;
  rating: number;
  reviews_original: string;
  reviews: number;
  price: string;
  type: string;
  address: string;
  description: string;
  thumbnail: string; // Link do zdjęcia
}

const Restaurant: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  const handleAddToPlan = () => {
    console.log(`Added ${restaurant.title} to the plan!`);
    // Możesz dodać tutaj logikę do dodawania restauracji do planu
  };

  return (
    <div className={styles.restaurantCard}>
      {/* Dodaj przycisk */}
      <button
        className={styles.addToPlan}
        onClick={handleAddToPlan}
        aria-label={`Add ${restaurant.title} to the plan`}
      >
        +
      </button>

      {/* Obrazek restauracji */}
      <div className={styles.thumbnailContainer}>
        <img
          src={restaurant.thumbnail}
          alt={restaurant.title}
          className={styles.thumbnail}
        />
      </div>

      {/* Szczegóły restauracji */}
      <div className={styles.details}>
        <h3 className={styles.title}>{restaurant.title}</h3>
        <div className={styles.rating}>
          {restaurant.rating} ⭐️ <span>({restaurant.reviews_original})</span>
        </div>
        <p className={styles.type}>{restaurant.type}</p>
        <p className={styles.address}>{restaurant.address}</p>
        <p className={styles.description}>{restaurant.description}</p>
        <p className={styles.price}>{restaurant.price}</p>
      </div>
    </div>
  );
};

export default Restaurant;
