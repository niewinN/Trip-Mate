import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Navbar from "../../components/Navbar/Navbar";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import Wrapper from "../../components/Wrapper/Wrapper";
import filters from "../../data/filters.json"
import styles from "./Restaurants.module.css"

const Restaurants = () => {
    const hotelFilters = filters.flights;

  return (
    <div className={styles.flights}>
        <Wrapper>
            <Navbar background="#007bff"/>
            <FilterPanel sections={hotelFilters}/>
            <RestaurantList/>
        </Wrapper>
    </div>
  )
}

export default Restaurants