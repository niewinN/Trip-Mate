// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './RestaurantList.module.css';

// interface Restaurant {
//   title: string;
//   rating: number;
//   reviews: number;
//   price: string;
//   distance: string;
//   address: string;
//   description: string;
//   images: string[];
//   links: {
//     order: string;
//     phone: string;
//     directions: string;
//     website: string;
//   };
// }

// const RestaurantList: React.FC = () => {
//   const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [query, setQuery] = useState<string>('Coffee');
//   const [latitude, setLatitude] = useState<number>(30.267153);
//   const [longitude, setLongitude] = useState<number>(-97.7430608);

//   const fetchRestaurants = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:5000/api/restaurants', {
//         params: { q: query, lat: latitude, lng: longitude },
//       });
//       setRestaurants(response.data);
//     } catch {
//       setError('Błąd podczas pobierania restauracji');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRestaurants();
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     fetchRestaurants();
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Lista Restauracji</h1>
//       <form onSubmit={handleSearch} className={styles.form}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Wpisz typ restauracji (np. kawa)"
//           className={styles.input}
//         />
//         <input
//           type="number"
//           value={latitude}
//           onChange={(e) => setLatitude(parseFloat(e.target.value))}
//           placeholder="Szerokość geograficzna"
//           className={styles.input}
//         />
//         <input
//           type="number"
//           value={longitude}
//           onChange={(e) => setLongitude(parseFloat(e.target.value))}
//           placeholder="Długość geograficzna"
//           className={styles.input}
//         />
//         <button type="submit" className={styles.button}>
//           Szukaj
//         </button>
//       </form>

//       {loading && <p className={styles.loading}>Ładowanie danych...</p>}
//       {error && <p className={styles.error}>{error}</p>}

//       <div className={styles.restaurantList}>
//         {restaurants.map((restaurant, index) => (
//           <div key={index} className={styles.restaurantCard}>
//             <h3 className={styles.restaurantTitle}>{restaurant.title}</h3>
//             <p className={styles.restaurantInfo}>
//               Ocena: {restaurant.rating} ⭐️ • Recenzje: {restaurant.reviews}
//             </p>
//             <p className={styles.restaurantInfo}>
//               Cena: {restaurant.price} • Odległość: {restaurant.distance}
//             </p>
//             <p className={styles.restaurantDescription}>{restaurant.description}</p>
//             <p className={styles.restaurantAddress}>{restaurant.address}</p>
//             <div className={styles.restaurantImages}>
//               {restaurant.images.slice(0, 3).map((image, i) => (
//                 <img key={i} src={image} alt={restaurant.title} className={styles.image} />
//               ))}
//             </div>
//             <div className={styles.restaurantLinks}>
//               <a href={restaurant.links.website} target="_blank" rel="noopener noreferrer">
//                 Strona internetowa
//               </a>
//               <a href={restaurant.links.directions} target="_blank" rel="noopener noreferrer">
//                 Kierunki
//               </a>
//               <a href={restaurant.links.order} target="_blank" rel="noopener noreferrer">
//                 Zamów online
//               </a>
//               <p>Telefon: {restaurant.links.phone}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RestaurantList;
// import  Restaurant  from '../Restaurant/Restaurant'; // Jeśli `Restaurant` jest w innym pliku

// const RestaurantList: React.FC<{ restaurants: Restaurant[] }> = ({ restaurants }) => {
//   return (
//     <div>
//       {restaurants.map((restaurant, index) => (
//         <Restaurant key={index} restaurant={restaurant} />
//       ))}
//     </div>
//   );
// };

// export default RestaurantList;
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

const RestaurantList: React.FC<{ restaurants: RestaurantProps[] }> = ({ restaurants }) => {
  return (
    <div>
      {restaurants.map((restaurant, index) => (
        <Restaurant key={index} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
