// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './HotelList.module.css';
// import Hotel from '../Hotel/Hotel';
// import HotelSearchPanel from '../HotelSearchPanel/HotelSearchPanel';

// interface Hotel {
//   name: string;
//   description: string;
//   rate_per_night: { lowest: string };
//   hotel_class: string | null;
//   overall_rating: number;
//   reviews: number;
//   check_in_time: string | null;
//   check_out_time: string | null;
//   amenities: string[];
//   nearby_places: string[];
//   images: { thumbnail: string }[];
// }

// const HotelList: React.FC = () => {
//   const [hotels, setHotels] = useState<Hotel[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Calculate today's date and tomorrow's date
//   const today = new Date();
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);

//   const [query, setQuery] = useState<string>('Warsaw');
//   const [checkInDate, setCheckInDate] = useState<string>(today.toISOString().split('T')[0]);
//   const [checkOutDate, setCheckOutDate] = useState<string>(tomorrow.toISOString().split('T')[0]);
//   const [guests, setGuests] = useState<number>(2);
//   const [rooms, setRooms] = useState<number>(1);

//   // Fetch hotels based on the search params
//   const fetchHotels = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:5000/api/hotels', {
//         params: {
//           q: query,
//           check_in_date: checkInDate,
//           check_out_date: checkOutDate,
//           guests,
//           rooms,
//         },
//       });
//       setHotels(response.data);
//     } catch (error) {
//       setError('Błąd podczas pobierania hoteli');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle search click
//   const handleSearch = () => {
//     fetchHotels();
//   };

//   // Initial load on first render
//   useEffect(() => {
//     fetchHotels(); // Fetch hotels when component mounts
//   }, []); // Empty dependency array means it will run only once

//   return (
//     <div className={styles.container}>
//       {/* Search Panel */}
//       <HotelSearchPanel
//         query={query}
//         checkInDate={checkInDate}
//         checkOutDate={checkOutDate}
//         guests={guests}
//         rooms={rooms}
//         setQuery={setQuery}
//         setCheckInDate={setCheckInDate}
//         setCheckOutDate={setCheckOutDate}
//         setGuests={setGuests}
//         setRooms={setRooms}
//         onSearch={handleSearch} // Trigger search on button click
//       />

//       {/* Loading and Error States */}
//       {loading && <p className={styles.loading}>Ładowanie danych...</p>}
//       {error && <p className={styles.error}>{error}</p>}

//       {/* List of Hotels */}
//       <div className={styles.hotelList}>
//         {hotels.map((hotel, index) => (
//           <Hotel key={index} hotel={hotel} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HotelList;
import React from 'react';
import styles from './HotelList.module.css';
import Hotel from '../Hotel/Hotel';

interface HotelListProps {
  hotels: any[];  // Tablica hoteli
  query: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  rooms: number;
}

const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
  return (
    <div className={styles.hotelList}>
      {hotels.length === 0 ? (
        <p>Brak wyników wyszukiwania.</p>
      ) : (
        hotels.map((hotel, index) => (
          <Hotel key={index} hotel={hotel} />
        ))
      )}
    </div>
  );
};

export default HotelList;
