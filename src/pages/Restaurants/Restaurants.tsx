// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import FilterPanel from "../../components/FilterPanel/FilterPanel";
// import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
// import Navbar from "../../components/Navbar/Navbar";
// import RestaurantList from "../../components/RestaurantList/RestaurantList";
// import Wrapper from "../../components/Wrapper/Wrapper";
// import filters from "../../data/filters.json"
// import styles from "./Restaurants.module.css"
// import { faCutlery } from "@fortawesome/free-solid-svg-icons";
// import RestaurantSearchPanel from "../../components/RestaurantSearchPanel/RestaurantSearchPanel";
// import React, { useState } from "react";
// import Restaurant from "../../components/Restaurant/Restaurant";

// const Restaurants: React.FC = () => {
//   const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
//   const restaurantFilters = filters.restaurants

//   const handleSearch = async (city: string) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/restaurants?location=${city}`);
//       const data: Restaurant[] = await response.json();
//       setRestaurants(data);
//     } catch (error) {
//       console.error('Error fetching restaurants:', error);
//     }
//   };

//   return (
//     <div className={styles.restaurants}>
//       <Navbar background="#007bff" />
//         <Wrapper>
//         <div className={styles.flex}>
//             <div>
//               <HeaderIcon icon={<FontAwesomeIcon icon={faCutlery} />} title="Restaurants" />
//               <div className={styles.displayMobile}>
//                   <RestaurantSearchPanel onSearch={handleSearch}/>
//               </div>
//               <FilterPanel sections={restaurantFilters}/>
//             </div>
//             <div>
//               <div className={styles.displayDesktop}>
//                 <RestaurantSearchPanel onSearch={handleSearch}/>
//               </div>
//               <RestaurantList restaurants={restaurants} />
//             </div>
//             </div>
//         </Wrapper>
//     </div>
//   )
// }

// export default Restaurants
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import FilterPanel from "../../components/FilterPanel/FilterPanel";
// import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
// import Navbar from "../../components/Navbar/Navbar";
// import RestaurantList from "../../components/RestaurantList/RestaurantList";
// import Wrapper from "../../components/Wrapper/Wrapper";
// import filters from "../../data/filters.json";
// import styles from "./Restaurants.module.css";
// import { faCutlery } from "@fortawesome/free-solid-svg-icons";
// import RestaurantSearchPanel from "../../components/RestaurantSearchPanel/RestaurantSearchPanel";
// import React, { useState } from "react";

// interface Restaurant {
//   title: string;
//   rating: number;
//   reviews_original: string;
//   reviews: number;
//   price: string;
//   type: string;
//   address: string;
//   description: string;
//   thumbnail: string;
// }

// const Restaurants: React.FC = () => {
//   const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
//   const restaurantFilters = filters.restaurants;

//   const processRestaurants = (restaurants: Restaurant[]) => {
//     return restaurants
//       .filter((restaurant) =>
//         /lh[3-6]\.googleusercontent\.com/.test(restaurant.thumbnail)
//       )
//       .map((restaurant) => ({
//         ...restaurant,
//         thumbnail: restaurant.thumbnail.replace(/w\d+-h\d+/, "w250-h250"),
//       }));
//   };
  

//   const handleSearch = async (city: string) => {
//     try {
//       const resultsPerPage = 20; // Liczba restauracji zwracanych przez API na jedno zapytanie
//       let currentPage = 0;
//       const filteredRestaurants: Restaurant[] = [];
  
//       while (filteredRestaurants.length < resultsPerPage) {
//         // Pobieranie kolejnej strony wyników
//         const response = await fetch(`http://localhost:5000/api/restaurants?location=${city}&start=${currentPage * resultsPerPage}`);
//         const data: Restaurant[] = await response.json();
  
//         // Filtruj restauracje z odpowiednimi obrazkami
//         const validRestaurants = data.filter(restaurant => {
//           const thumbnail = restaurant.thumbnail;
//           return thumbnail.includes('lh3.googleusercontent.com') || thumbnail.includes('lh5.googleusercontent.com');
//         });
  
//         // Dodaj tylko te z poprawnymi obrazkami
//         filteredRestaurants.push(...validRestaurants);
  
//         // Jeśli API zwróciło mniej wyników niż `resultsPerPage`, kończymy iterację
//         if (data.length < resultsPerPage) break;
  
//         // Zwiększamy stronę
//         currentPage++;
//       }
  
//       // Ustawienie filtrowanych restauracji
//       setRestaurants(filteredRestaurants.slice(0, resultsPerPage)); // Ustaw pierwsze `resultsPerPage` restauracji
//     } catch (error) {
//       console.error('Error fetching restaurants:', error);
//     }
//   };
  

//   return (
//     <div className={styles.restaurants}>
//       <Navbar background="#007bff" />
//       <Wrapper>
//         <div className={styles.flex}>
//           <div>
//             <HeaderIcon icon={<FontAwesomeIcon icon={faCutlery} />} title="Restaurants" />
//             <div className={styles.displayMobile}>
//               <RestaurantSearchPanel onSearch={handleSearch} />
//             </div>
//             <FilterPanel sections={restaurantFilters} />
//           </div>
//           <div>
//             <div className={styles.displayDesktop}>
//               <RestaurantSearchPanel onSearch={handleSearch} />
//             </div>
//             <RestaurantList restaurants={restaurants} />
//           </div>
//         </div>
//       </Wrapper>
//     </div>
//   );
// };

// export default Restaurants;
import React, { useState } from "react";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import Navbar from "../../components/Navbar/Navbar";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import Wrapper from "../../components/Wrapper/Wrapper";
import filters from "../../data/filters.json";
import { faCutlery } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Restaurants.module.css";
import RestaurantSearchPanel from "../../components/RestaurantSearchPanel/RestaurantSearchPanel";
import Restaurant from "../../components/Restaurant/Restaurant";

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const restaurantFilters = filters.restaurants;

  // const handleSearch = async (city: string) => {
  //   try {
  //     const resultsPerPage = 20;
  //     let currentPage = 0;
  //     const filteredRestaurants: Restaurant[] = [];
  
  //     while (filteredRestaurants.length < resultsPerPage) {
  //       const response = await fetch(
  //         `http://localhost:5000/api/restaurants?location=${city}&start=${currentPage * resultsPerPage}`
  //       );
  //       const data = await response.json();
  
  //       // Sprawdź, czy `data` jest tablicą
  //       if (!Array.isArray(data)) {
  //         console.error('Invalid data format:', data);
  //         break;
  //       }
  
  //       const validRestaurants = data.filter((restaurant) =>
  //         /lh[3-6]\.googleusercontent\.com/.test(restaurant.thumbnail)
  //       );
  
  //       const processedRestaurants = validRestaurants.map((restaurant) => ({
  //         ...restaurant,
  //         thumbnail: restaurant.thumbnail.replace(/w\d+-h\d+/, 'w250-h250'),
  //       }));
  
  //       filteredRestaurants.push(...processedRestaurants);
  
  //       if (data.length < resultsPerPage) break;
  //       currentPage++;
  //     }
  
  //     setRestaurants(filteredRestaurants.slice(0, resultsPerPage));
  //   } catch (error) {
  //     console.error('Error fetching restaurants:', error);
  //   }
  // };
  const handleSearch = async (city: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurants?location=${city}`);
      const data: Restaurant[] = await response.json();
      setRestaurants(data); // Ustawiamy dane z API
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  return (
    <div className={styles.restaurants}>
      <Navbar background="#007bff" />
      <Wrapper>
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
            <RestaurantList restaurants={restaurants} />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Restaurants;
