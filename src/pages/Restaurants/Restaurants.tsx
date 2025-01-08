import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Restaurants.module.css";
import RestaurantsBox from "../../components/RestaurantsBox/RestaurantsBox";

const Restaurants: React.FC = () => {
  // Domyślne wartości dla parametrów
  const defaultCity = "London";
  const defaultDepartureDate = new Date().toISOString().split("T")[0];
  const defaultReturnDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const handleRestaurantSelect = (restaurant: any) => {
    console.log("🍽️ Selected Restaurant:", restaurant);
  };

  return (
    <div className={styles.restaurants}>
      <Navbar background="#007bff" />
      <Wrapper>
        <RestaurantsBox
          initialCity={defaultCity}
          initialDepartureDate={defaultDepartureDate}
          initialReturnDate={defaultReturnDate}
          onRestaurantSelect={handleRestaurantSelect}
          showNextButton={false}
          showAddButton={false}
          showPlanBtn={true}
        />
      </Wrapper>
    </div>
  );
};

export default Restaurants;
