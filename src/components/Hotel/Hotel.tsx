// import React from 'react';
// import styles from './Hotel.module.css';

// interface HotelProps {
//   hotel: {
//     name: string;
//     description: string;
//     rate_per_night: { lowest: string };
//     hotel_class: string | null;
//     overall_rating: number;
//     reviews: number;
//     check_in_time: string | null;
//     check_out_time: string | null;
//     amenities: string[];
//     nearby_places: string[];
//     images: { thumbnail: string }[];
//   };
// }

// const Hotel: React.FC<HotelProps> = ({ hotel }) => {
//   return (
//     <div className={styles.hotelCard}>
//       <div className={styles.hotelHeader}>
//         {hotel.images[0]?.thumbnail && (
//           <img
//             src={hotel.images[0].thumbnail}
//             alt={hotel.name}
//             className={styles.thumbnail}
//           />
//         )}
//         <div className={styles.hotelDetails}>
//           <h3 className={styles.hotelTitle}>{hotel.name}</h3>
//           <p className={styles.hotelInfo}>
//             {hotel.hotel_class} • Ocena: {hotel.overall_rating || 'Brak danych'} ⭐️ • Recenzje: {hotel.reviews || 0}
//           </p>
//           <p className={styles.hotelPrice}>
//             Cena za noc: {hotel.rate_per_night?.lowest || 'Brak danych'}
//           </p>
//         </div>
//       </div>
//       <div className={styles.amenities}>
//         {hotel.amenities.slice(0, 5).map((amenity, i) => (
//           <span key={i} className={styles.amenity}>
//             {amenity}
//           </span>
//         ))}
//       </div>
//       <button className={styles.pricesButton}>Zobacz ceny</button>
//     </div>
//   );
// };

// export default Hotel;
import React from 'react';
import styles from './Hotel.module.css';

interface HotelProps {
  hotel: {
    name: string;
    description: string;
    rate_per_night: { lowest: string };
    hotel_class: string | null;
    overall_rating: number;
    reviews: number;
    check_in_time: string | null;
    check_out_time: string | null;
    amenities: string[];
    nearby_places: string[];
    images: { thumbnail: string }[];
  };
}

const Hotel: React.FC<HotelProps> = ({ hotel }) => {
  return (
    <div className={styles.hotelCard}>
      {/* Obrazek hotelu */}
      <div className={styles.hotelImage}>
        {hotel.images[0]?.thumbnail && (
          <img
            src={hotel.images[0].thumbnail}
            alt={hotel.name}
            className={styles.thumbnail}
          />
        )}
      </div>

      {/* Szczegóły hotelu */}
      <div className={styles.hotelDetails}>
        <h3 className={styles.hotelTitle}>{hotel.name}</h3>
        <p className={styles.hotelInfo}>
          {hotel.hotel_class} • Ocena: {hotel.overall_rating || 'Brak danych'} ⭐️ • Recenzje: {hotel.reviews || 0}
        </p>
        <p className={styles.hotelPrice}>
          Cena za noc: {hotel.rate_per_night?.lowest || 'Brak danych'}
        </p>

        {/* Udogodnienia */}
        <div className={styles.amenities}>
          {hotel.amenities.slice(0, 5).map((amenity, i) => (
            <span key={i} className={styles.amenity}>
              {amenity}
            </span>
          ))}
        </div>

        {/* Przycisk "Zobacz ceny" */}
        <button className={styles.pricesButton}>Zobacz ceny</button>
      </div>
    </div>
  );
};

export default Hotel;
