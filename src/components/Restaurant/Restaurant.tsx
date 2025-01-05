import React from 'react';
import styles from './Restaurant.module.css';

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
  onSelect: (restaurant: any) => void;
  isSelected: boolean;
  showAddButton?: boolean;
  disabledSelectedStyle?: boolean;
}

const Restaurant: React.FC<RestaurantProps> = ({ restaurant, onSelect, isSelected, showAddButton = true, disabledSelectedStyle = false }) => {
  return (
    <div
      className={`${styles.restaurantCard} ${isSelected && !disabledSelectedStyle ? styles.selected : ''}`}
      onClick={() => onSelect(restaurant)}
    >
      {showAddButton && (
        <button
          className={styles.addToPlan}
          aria-label={`Add ${restaurant.title} to the plan`}
        >
          +
        </button>
      )}
      <div className={styles.thumbnailContainer}>
        <img src={restaurant.thumbnail} alt={restaurant.title} className={styles.thumbnail} />
      </div>
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
