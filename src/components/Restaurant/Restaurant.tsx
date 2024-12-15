import React from "react";
import styles from "./Restaurant.module.css";

interface RestaurantProps {
  restaurant: {
    title: string;
    rating: number;
    reviews_original: string;
    reviews: number;
    price: string;
    type: string;
    address: string;
    description: string;
    thumbnail: string;
  };
  onSelect: (restaurant: any) => void; // Dodanie prop dla obsługi "Add"
}

const Restaurant: React.FC<RestaurantProps> = ({ restaurant, onSelect }) => {

  return (
    <div className={styles.restaurantCard}>
      {/* Dodaj przycisk */}
      <button
        className={styles.addToPlan}
        onClick={() => onSelect(restaurant)} 
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
