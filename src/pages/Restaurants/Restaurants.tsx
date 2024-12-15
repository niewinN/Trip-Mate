import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Restaurants.module.css";
import RestaurantsBox from "../../components/RestaurantsBox/RestaurantsBox";

const Restaurants: React.FC = () => {

  return (
    <div className={styles.restaurants}>
      <Navbar background="#007bff" />
      <Wrapper>
        <RestaurantsBox/>
      </Wrapper>
    </div>
  );
};

export default Restaurants;
