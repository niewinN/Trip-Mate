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
//   onSelect: (hotel: any) => void;
// }

// const Hotel: React.FC<HotelProps> = ({ hotel, onSelect }) => {
//   return (
//     <div className={styles.hotelCard}>
//       {/* Obrazek hotelu */}
//       <div className={styles.hotelImage}>
//         {hotel.images[0]?.thumbnail && (
//           <img
//             src={hotel.images[0].thumbnail}
//             alt={hotel.name}
//             className={styles.thumbnail}
//           />
//         )}
//       </div>

//       {/* Szczegóły hotelu */}
//       <div className={styles.hotelDetails}>
//         <h3 className={styles.hotelTitle}>{hotel.name}</h3>
//         <p className={styles.hotelInfo}>
//           {hotel.hotel_class} • Ocena: {hotel.overall_rating || 'Brak danych'} ⭐️ • Recenzje: {hotel.reviews || 0}
//         </p>
//         <p className={styles.hotelPrice}>
//           Cena za noc: {hotel.rate_per_night?.lowest || 'Brak danych'}
//         </p>

//         {/* Udogodnienia */}
//         <div className={styles.amenities}>
//           {hotel.amenities.slice(0, 5).map((amenity, i) => (
//             <span key={i} className={styles.amenity}>
//               {amenity}
//             </span>
//           ))}
//         </div>

//         {/* Przycisk "Zobacz ceny" */}
//         <button className={styles.pricesButton} onClick={() => onSelect(hotel)}>Select</button>
//       </div>
//     </div>
//   );
// };

// export default Hotel;
import React from 'react';
import styles from './Hotel.module.css';

interface HotelProps {
  hotel: {
    name: string;
    description?: string;
    rate_per_night?: { lowest: string };
    hotel_class?: string | null;
    overall_rating?: number;
    reviews?: number;
    check_in_time?: string | null;
    check_out_time?: string | null;
    amenities?: string[];
    nearby_places?: string[];
    images?: { thumbnail: string }[];
  };
  onSelect: (hotel: any) => void;
}

const Hotel: React.FC<HotelProps> = ({ hotel, onSelect }) => {
  if (!hotel) {
    return <div className={styles.hotelCard}>No hotel data available.</div>;
  }

  return (
    <div className={styles.hotelCard}>
      {/* Obrazek hotelu */}
      <div className={styles.hotelImage}>
        {hotel.images?.[0]?.thumbnail ? (
          <img
            src={hotel.images[0].thumbnail}
            alt={hotel.name || 'Hotel Image'}
            className={styles.thumbnail}
          />
        ) : (
          <div className={styles.placeholder}>No image available</div>
        )}
      </div>

      {/* Szczegóły hotelu */}
      <div className={styles.hotelDetails}>
        <h3 className={styles.hotelTitle}>{hotel.name || 'Unknown Hotel'}</h3>
        <p className={styles.hotelInfo}>
          {hotel.hotel_class || 'N/A'} • Ocena: {hotel.overall_rating || 'Brak danych'} ⭐️ • Recenzje: {hotel.reviews || 0}
        </p>
        <p className={styles.hotelPrice}>
          Cena za noc: {hotel.rate_per_night?.lowest || 'Brak danych'}
        </p>

        {/* Udogodnienia */}
        <div className={styles.amenities}>
          {hotel.amenities?.slice(0, 5).map((amenity, i) => (
            <span key={i} className={styles.amenity}>
              {amenity}
            </span>
          )) || <p>No amenities available.</p>}
        </div>

        {/* Przycisk "Zobacz ceny" */}
        <button className={styles.pricesButton} onClick={() => onSelect(hotel)}>
          Select
        </button>
      </div>
    </div>
  );
};

export default Hotel;
