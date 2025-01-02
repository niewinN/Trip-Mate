// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Flight from "../../components/Flight/Flight";
// import Hotel from "../../components/Hotel/Hotel";
// import Restaurant from "../../components/Restaurant/Restaurant";
// import Attraction from "../../components/Attraction/Attraction";
// import styles from "./Summary.module.css";
// import Navbar from "../../components/Navbar/Navbar";
// import Wrapper from "../../components/Wrapper/Wrapper";
// import MultimediaCard from "../../components/MultimediaCard/MultimediaCard";

// const Summary: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { flight, hotel, restaurants, attractions, tripName, tripPersons, departureCity, arrivalCity, departureDate, returnDate } = location.state || {};

//   console.log("📝 Summary Data:", { flight, hotel, restaurants, attractions, tripName, tripPersons, departureCity, arrivalCity, departureDate, returnDate });

//   const [multimediaCards, setMultimediaCards] = useState<number>(4); // Początkowa liczba kart

//   const handleMediaUpload = (file: File) => {
//     console.log('🖼️ Uploaded File:', file.name);
//   };

//   const addMoreCards = () => {
//     setMultimediaCards((prev) => prev + 4); // Dodaje 4 kolejne karty
//   };

//   const handleArrowClick = () => {
//     navigate('/profile');
//   };

//   return (
//     <div className={styles.summary}>
//       <Navbar background="#007bff" />
//       <Wrapper>
//       {/* Tytuł Wycieczki */}
//       <div className={styles.container}>
//       <div className={styles.details}>
//       <div className={styles.titleContainer}>
//               <h1 className={styles.title}>📋 {tripName || "Trip Summary"}</h1>
//               <span className={styles.arrowMobile} onClick={handleArrowClick}>➔</span>
//             </div>
//       {/* Sekcja trasy i dat */}
//       <div className={styles.routeDetails}>
//         <p>
//           <strong>From:</strong> {departureCity} <br />
//           <strong>To:</strong> {arrivalCity} <br />
//           <strong>Departure Date:</strong> {departureDate} <br />
//           <strong>Return Date:</strong> {returnDate}
//         </p>
//       </div>

//       {/* Sekcja Uczestników */}
//       <section className={styles.section}>
//         {tripPersons && tripPersons.length > 0 ? (
//           <div className={styles.cardContainer}>
//             {tripPersons.map((person: TripPersonProps, index: number) => (
//               <div key={index} className={styles.participantCard}>
//                 <p className={styles.participantName}>{person.name}</p>
//                 <img
//                   src={person.image || "https://via.placeholder.com/150"}
//                   alt={person.name}
//                   className={styles.participantImage}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No participants added.</p>
//         )}
//       </section>
//       </div>
//       <div className={styles.cards}>
//       {/* Sekcja Lotu */}
//       <section className={styles.section}>
//       <div className={styles.flightHeader}>
//                 <h2>✈️ Flight</h2>
//                 <span className={styles.arrowDesktop} onClick={handleArrowClick}>➔</span>
//               </div>
//         {flight ? (
//           <div className={styles.card}>
//             <Flight flight={flight} onSelect={() => {}} />
//           </div>
//         ) : (
//           <p>No flight selected.</p>
//         )}
//       </section>

//       {/* Sekcja Hotelu */}
//       <section className={styles.section}>
//             <h2>🏨 Hotel</h2>
//             {hotel ? (
//               <Hotel
//                 hotel={{
//                   name: hotel.name || 'Unknown Hotel',
//                   description: hotel.description || 'No description available',
//                   rate_per_night: hotel.rate_per_night || { lowest: 'N/A' },
//                   hotel_class: hotel.hotel_class || 'N/A',
//                   overall_rating: hotel.overall_rating || 0,
//                   reviews: hotel.reviews || 0,
//                   check_in_time: hotel.check_in_time || null,
//                   check_out_time: hotel.check_out_time || null,
//                   amenities: hotel.amenities || [],
//                   nearby_places: hotel.nearby_places || [],
//                   images: hotel.images || [],
//                 }}
//                 onSelect={() => {}}
//               />
//             ) : (
//               <p>No hotel selected.</p>
//             )}
//           </section>

//       {/* Sekcja Restauracji */}
//       <section className={styles.section}>
//         <h2>🍽️ Restaurants</h2>
//         {restaurants && restaurants.length > 0 ? (
//           <div className={styles.cardContainer}>
//             {restaurants.map((restaurant: any, index: number) => (
//               <div key={index} className={styles.card}>
//                 <Restaurant restaurant={restaurant} onSelect={() => {}} isSelected={true} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No restaurants selected.</p>
//         )}
//       </section>

//       {/* Sekcja Atrakcji */}
//       <section className={styles.section}>
//         <h2>🎢 Attractions</h2>
//         {attractions && attractions.length > 0 ? (
//           <div className={styles.cardContainer}>
//             {attractions.map((attraction: any, index: number) => (
//               <div key={index} className={styles.card}>
//                 <Attraction
//                   title={attraction.title}
//                   description={attraction.description}
//                   thumbnail={attraction.thumbnail}
//                   rating={attraction.rating}
//                   reviews_original={attraction.reviews_original}
//                   reviews={attraction.reviews}
//                   address={attraction.address}
//                   onSelect={() => {}}
//                   isSelected={true}
//                 />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No attractions selected.</p>
//         )}
//       </section>
//       </div>
      
//       </div>
//       {/* <MultimediaCard onUpload={handleMediaUpload} /> */}
//       {/* Kontener dla MultimediaCard */}
//       <section className={styles.multimediaSection}>
//             <h2>📹 Multimedia</h2>
//             <div className={styles.multimediaContainer}>
//               {Array.from({ length: multimediaCards }).map((_, index) => (
//                 <MultimediaCard key={index} onUpload={handleMediaUpload} />
//               ))}
//             </div>
//             <div className={styles.btnContainer}>
//               <button className={styles.addMoreButton} onClick={addMoreCards}>
//                 ➕ Dodaj więcej
//               </button>
//             </div>
//           </section>
//       </Wrapper>
//     </div>
//   );
// };

// export default Summary;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Flight from "../../components/Flight/Flight";
import Hotel from "../../components/Hotel/Hotel";
import Restaurant from "../../components/Restaurant/Restaurant";
import Attraction from "../../components/Attraction/Attraction";
import styles from "./Summary.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import MultimediaCard from "../../components/MultimediaCard/MultimediaCard";
import axios from "axios";

interface TripPersonProps {
  name: string;
  image: string | null;
}

const Summary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Pobieranie ID podróży z URL

  const [data, setData] = useState<any>(null);
  const [multimediaCards, setMultimediaCards] = useState<number>(4);

  useEffect(() => {
    const fetchTravelDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/travels/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📝 Travel Details:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("❌ Error fetching travel details:", error);
      }
    };

    fetchTravelDetails();
  }, [id, navigate]);

  const handleArrowClick = () => {
    navigate("/profile");
  };

  const addMoreCards = () => {
    setMultimediaCards((prev) => prev + 4);
  };

  const handleMediaUpload = (file: File) => {
    console.log("🖼️ Uploaded File:", file.name);
  };

  if (!data) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const { travel, passengers, flight, hotel, restaurants, attractions } = data;

  return (
    <div className={styles.summary}>
      <Navbar background="#007bff" />
      <Wrapper>
        {/* Tytuł Wycieczki */}
        <div className={styles.container}>
          <div className={styles.details}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>📋 {travel?.trip_name || "Trip Summary"}</h1>
              <span className={styles.arrowMobile} onClick={handleArrowClick}>
                ➔
              </span>
            </div>

            {/* Sekcja trasy i dat */}
            <div className={styles.routeDetails}>
              <p>
                <strong>From:</strong> {travel?.departure_city || "Unknown"} <br />
                <strong>To:</strong> {travel?.arrival_city || "Unknown"} <br />
                <strong>Departure Date:</strong> {travel?.departure_date || "Unknown"} <br />
                <strong>Return Date:</strong> {travel?.return_date || "Unknown"}
              </p>
            </div>

            {/* Sekcja Uczestników */}
            <section className={styles.section}>
              {passengers && passengers.length > 0 ? (
                <div className={styles.cardContainer}>
                  {passengers.map((person: TripPersonProps, index: number) => (
                    <div key={index} className={styles.participantCard}>
                      <p className={styles.participantName}>{person.name || "Unnamed"}</p>
                      <img
                        src={person.image || "https://via.placeholder.com/150"}
                        alt={person.name || "Participant"}
                        className={styles.participantImage}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No participants added.</p>
              )}
            </section>
          </div>

          {/* Sekcja Kart */}
          <div className={styles.cards}>
            {/* Sekcja Lotu */}
            <section className={styles.section}>
              <div className={styles.flightHeader}>
                <h2>✈️ Flight</h2>
                <span className={styles.arrowDesktop} onClick={handleArrowClick}>
                  ➔
                </span>
              </div>
              {flight ? (
                <div className={styles.card}>
                  <Flight flight={flight} onSelect={() => {}} />
                </div>
              ) : (
                <p>No flight selected.</p>
              )}
            </section>

            {/* Sekcja Hotelu */}
            <section className={styles.section}>
              <h2>🏨 Hotel</h2>
              {hotel ? (
                <Hotel
                  hotel={{
                    name: hotel.name || "Unknown Hotel",
                    description: hotel.description || "No description available",
                    rate_per_night: hotel.rate_per_night || { lowest: "N/A" },
                    hotel_class: hotel.hotel_class || "N/A",
                    overall_rating: hotel.overall_rating || 0,
                    reviews: hotel.reviews || 0,
                    check_in_time: hotel.check_in_time || null,
                    check_out_time: hotel.check_out_time || null,
                    amenities: hotel.amenities || [],
                    nearby_places: hotel.nearby_places || [],
                    images: hotel.images || [],
                  }}
                  onSelect={() => {}}
                />
              ) : (
                <p>No hotel selected.</p>
              )}
            </section>

            {/* Sekcja Restauracji */}
            <section className={styles.section}>
              <h2>🍽️ Restaurants</h2>
              {restaurants && restaurants.length > 0 ? (
                <div className={styles.cardContainer}>
                  {restaurants.map((restaurant: any, index: number) => (
                    <div key={index} className={styles.card}>
                      <Restaurant restaurant={restaurant} onSelect={() => {}} isSelected={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No restaurants selected.</p>
              )}
            </section>

            {/* Sekcja Atrakcji */}
            <section className={styles.section}>
              <h2>🎢 Attractions</h2>
              {attractions && attractions.length > 0 ? (
                <div className={styles.cardContainer}>
                  {attractions.map((attraction: any, index: number) => (
                    <div key={index} className={styles.card}>
                      <Attraction {...attraction} onSelect={() => {}} isSelected={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No attractions selected.</p>
              )}
            </section>
          </div>
        </div>

        {/* Sekcja Multimedia */}
        <section className={styles.multimediaSection}>
          <h2>📹 Multimedia</h2>
          <div className={styles.multimediaContainer}>
            {Array.from({ length: multimediaCards }).map((_, index) => (
              <MultimediaCard key={index} onUpload={handleMediaUpload} />
            ))}
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.addMoreButton} onClick={addMoreCards}>
              ➕ Dodaj więcej
            </button>
          </div>
        </section>
      </Wrapper>
    </div>
  );
};

export default Summary;
