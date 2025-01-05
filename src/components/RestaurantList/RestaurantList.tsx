import React from "react";
import Restaurant from "../Restaurant/Restaurant";
import styles from "./RestaurantList.module.css";

interface RestaurantProps {
  title: string;
  rating: number;
  reviews_original: string;
  reviews: number;
  price: string;
  type: string;
  address: string;
  description: string;
  thumbnail: string;
}

interface RestaurantListProps {
  restaurants: RestaurantProps[];
  onSelect: (restaurant: any) => void;
  selectedRestaurants: RestaurantProps[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onSelect,
  selectedRestaurants,
}) => {
  return (
    <div className={styles.restaurantList}>
      {restaurants.map((restaurant, index) => (
        <Restaurant
          key={index}
          restaurant={restaurant}
          onSelect={onSelect}
          isSelected={selectedRestaurants.some((r) => r.title === restaurant.title)}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
