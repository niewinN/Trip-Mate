import React, { useState } from 'react';
import styles from './Restaurant.module.css';
import RestaurantModal from '../RestaurantModal/RestaurantModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div
      onClick={handleOpenModal}
      className={`${styles.restaurantCard} ${isSelected && !disabledSelectedStyle ? styles.selected : ''}`}
    >
      {showAddButton && (
        <button
          className={styles.addToPlan}
          aria-label={`Add ${restaurant.title} to the plan`}
          onClick={(event) => {
            event.stopPropagation(); // Zapobiega otwarciu modala
            onSelect(restaurant); // Wywołuje tylko onSelect
          }}
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
    {isModalOpen && <RestaurantModal restaurant={restaurant} onClose={handleCloseModal} />}
    </>
  );
};

export default Restaurant;
