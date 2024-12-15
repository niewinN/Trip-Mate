import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FilterPanel from "../FilterPanel/FilterPanel"
import RestaurantList from "../RestaurantList/RestaurantList"
import RestaurantSearchPanel from "../RestaurantSearchPanel/RestaurantSearchPanel"
import styles from "./RestaurantsBox.module.css"
import HeaderIcon from "../HeaderIcon/HeaderIcon"
import { faCutlery } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import filters from "../../data/filters.json"

const RestaurantsBox = ({ onRestaurantSelect }: { onRestaurantSelect: (restaurant: any) => void }) => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
    const restaurantFilters = filters.restaurants;

  const handleSearch = async (city: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurants?location=${city}`);
      const data = await response.json();
      setRestaurants(data); // Ustawiamy dane z API
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleSelectRestaurant = (restaurant: any) => {
    onRestaurantSelect(restaurant); // Wywołanie funkcji przekazanej z Plan do zapisania restauracji
  };

  return (
    <div className={styles.flex}>
          <div>
            <HeaderIcon
              icon={<FontAwesomeIcon icon={faCutlery} />}
              title="Restaurants"
            />
            <div className={styles.displayMobile}>
              <RestaurantSearchPanel onSearch={handleSearch} />
            </div>
            <FilterPanel sections={restaurantFilters} />
          </div>
          <div>
            <div className={styles.displayDesktop}>
              <RestaurantSearchPanel onSearch={handleSearch} />
            </div>
            <RestaurantList restaurants={restaurants} onSelect={handleSelectRestaurant} />
          </div>
        </div>
  )
}

export default RestaurantsBox