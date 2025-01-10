import React, { useState, useEffect } from 'react';
import styles from "./RestaurantsBox.module.css";
import RestaurantList from '../RestaurantList/RestaurantList';
import RestaurantSearchPanel from '../RestaurantSearchPanel/RestaurantSearchPanel';
import FilterPanel from '../FilterPanel/FilterPanel';
import HeaderIcon from '../HeaderIcon/HeaderIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCutlery } from '@fortawesome/free-solid-svg-icons';
import filters from "../../data/filters.json";
import PlanButton from '../PlanButton/PlanButton';

interface RestaurantsBoxProps {
  initialCity: string;
  initialDepartureDate: string;
  initialReturnDate: string;
  onRestaurantSelect: (restaurant: any) => void;
  onNext: () => void; // Przycisk Next do przejścia do następnego kroku
  showNextButton?: boolean;
  showAddButton?: boolean;
  showPlanBtn?: boolean;
}

const RestaurantsBox: React.FC<RestaurantsBoxProps> = ({
  initialCity,
  initialDepartureDate,
  initialReturnDate,
  onRestaurantSelect,
  onNext,
  showNextButton = true,
  showAddButton = true,
  showPlanBtn = false
}) => {
  const [city, setCity] = useState<string>(initialCity);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const restaurantFilters = filters.restaurants;
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);


  // useEffect(() => {
  //   fetchRestaurants();
  // }, [city, selectedFilters]);

  // const fetchRestaurants = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/data/restaurants?location=${city}&filters=${selectedFilters.join(",")}`
  //     );
  //     const data = await response.json();
  //     setRestaurants(data);
  //   } catch (err) {
  //     setError("Error fetching restaurants. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleFilterChange = (filters: string[]) => {
  //   setSelectedFilters(filters);
  // };

  // useEffect(() => {
  //   if (city) {
  //     handleSearch(city);
  //   }
  // }, [city]);

  // const handleSearch = async (city: string) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/data/restaurants?location=${city}`);
  //     const data = await response.json();
  //     setRestaurants(data);
  //   } catch (error) {
  //     console.error("❌ Error fetching restaurants:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleAddRestaurant = (restaurant: any) => {
  //   setSelectedRestaurants((prev) => {
  //     const isAlreadySelected = prev.some((r) => r.title === restaurant.title);
  //     if (isAlreadySelected) {
  //       return prev.filter((r) => r.title !== restaurant.title); // Usuń, jeśli już jest zaznaczone
  //     }
  //     return [...prev, restaurant];
  //   });
  // };

  // const handleNext = () => {
  //   selectedRestaurants.forEach((restaurant) => onRestaurantSelect(restaurant));
  //   onNext(); // Przejdź do kolejnego kroku
  // };
  useEffect(() => {
    fetchRestaurants();
  }, [city, selectedFilters]);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/data/restaurants?location=${city}&filters=${selectedFilters.join(",")}`
      );
      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      console.error("❌ Error fetching restaurants:", err);
      setError("Error fetching restaurants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newCity: string) => {
    setCity(newCity); // Aktualizacja miasta
    setRestaurants([]); // Wyczyść listę restauracji przed nowym wyszukiwaniem
    setSelectedFilters([]); // Zresetuj filtry przy zmianie miasta
  };

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const handleAddRestaurant = (restaurant: any) => {
    setSelectedRestaurants((prev) => {
      const isAlreadySelected = prev.some((r) => r.title === restaurant.title);
      return isAlreadySelected
        ? prev.filter((r) => r.title !== restaurant.title) // Usuń, jeśli już jest zaznaczone
        : [...prev, restaurant];
    });
  };

  const handleNext = () => {
    selectedRestaurants.forEach((restaurant) => onRestaurantSelect(restaurant));
    onNext(); // Przejdź do kolejnego kroku
  };

  return (
    <div className={styles.flex}>
      {/* Lewa kolumna */}
      <div className={styles.first}>
        <HeaderIcon icon={<FontAwesomeIcon icon={faCutlery} />} title="Restaurants" />
        <div className={styles.displayMobile}>
          <RestaurantSearchPanel city={city} setCity={setCity} onSearch={handleSearch} />
          {showNextButton && (
            <div className={styles.btnContainer}>
              <button
                className={styles.nextButton}
                onClick={handleNext}
                disabled={selectedRestaurants.length === 0}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <FilterPanel sections={restaurantFilters} onFilterChange={handleFilterChange} />
      </div>

      {/* Prawa kolumna */}
      <div className={styles.second}>
        <div className={styles.displayDesktop}>
          <RestaurantSearchPanel city={city} setCity={setCity} onSearch={handleSearch} />
          {showNextButton && (
            <div className={styles.btnContainer}>
              <button
                className={styles.nextButton}
                onClick={handleNext}
                disabled={selectedRestaurants.length === 0}
              >
                Next
              </button>
            </div>
          )}
        </div>
        {loading && <p>Loading restaurants...</p>}
        <RestaurantList
          restaurants={restaurants}
          onSelect={handleAddRestaurant}
          selectedRestaurants={selectedRestaurants}
          showAddButton={showAddButton}
        />
      </div>
      {showPlanBtn && <PlanButton/>}
    </div>
  );
};

export default RestaurantsBox;
