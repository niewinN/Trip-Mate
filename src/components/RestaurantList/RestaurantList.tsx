import React from "react";
import Restaurant from "../Restaurant/Restaurant";

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

const RestaurantList: React.FC<{
  restaurants: RestaurantProps[];
  onSelect: (restaurant: any) => void;
}> = ({ restaurants, onSelect }) => {
  return (
    <div>
      {restaurants.map((restaurant, index) => (
        <Restaurant key={index} restaurant={restaurant} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default RestaurantList;
