import React from "react";
import { useLocation } from "react-router-dom";
import Flight from "../../components/Flight/Flight";
import Hotel from "../../components/Hotel/Hotel";
import Restaurant from "../../components/Restaurant/Restaurant";
import Attraction from "../../components/Attraction/Attraction";
import styles from "./Summary.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import MultimediaCard from "../../components/MultimediaCard/MultimediaCard";

const Summary: React.FC = () => {
  const location = useLocation();
  const { flight, hotel, restaurants, attractions, tripName, tripPersons, departureCity, arrivalCity, departureDate, returnDate } = location.state || {};

  console.log("📝 Summary Data:", { flight, hotel, restaurants, attractions, tripName, tripPersons, departureCity, arrivalCity, departureDate, returnDate });

  const handleMediaUpload = (file: File) => {
    console.log('🖼️ Uploaded File:', file.name);
  };

  return (
    <div className={styles.summary}>
      <Navbar background="#007bff" />
      <Wrapper>
      {/* Tytuł Wycieczki */}
      <div className={styles.container}>
      <div className={styles.details}>
      <h1 className={styles.title}>📋 {tripName || "Trip Summary"}</h1>
      
      {/* Sekcja trasy i dat */}
      <div className={styles.routeDetails}>
        <p>
          <strong>From:</strong> {departureCity} <br />
          <strong>To:</strong> {arrivalCity} <br />
          <strong>Departure Date:</strong> {departureDate} <br />
          <strong>Return Date:</strong> {returnDate}
        </p>
      </div>

      {/* Sekcja Uczestników */}
      <section className={styles.section}>
        {tripPersons && tripPersons.length > 0 ? (
          <div className={styles.cardContainer}>
            {tripPersons.map((person: TripPersonProps, index: number) => (
              <div key={index} className={styles.participantCard}>
                <p className={styles.participantName}>{person.name}</p>
                <img
                  src={person.image || "https://via.placeholder.com/150"}
                  alt={person.name}
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
      <div className={styles.cards}>
      {/* Sekcja Lotu */}
      <section className={styles.section}>
        <h2>✈️ Flight</h2>
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
          <div className={styles.card}>
            <Hotel hotel={hotel} onSelect={() => {}} />
          </div>
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
                <Attraction
                  title={attraction.title}
                  description={attraction.description}
                  thumbnail={attraction.thumbnail}
                  rating={attraction.rating}
                  reviews_original={attraction.reviews_original}
                  reviews={attraction.reviews}
                  address={attraction.address}
                  onSelect={() => {}}
                  isSelected={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No attractions selected.</p>
        )}
      </section>
      </div>
      
      </div>
      {/* <MultimediaCard onUpload={handleMediaUpload} /> */}
      {/* <MultimediaCard onUpload={handleMediaUpload} /> */}
      <MultimediaCard onUpload={handleMediaUpload} />
      </Wrapper>
    </div>
  );
};

export default Summary;
