import { useState } from "react"
import FlightSearchPanel from "../../components/FlightSearchPanel/FlightSearchPanel"
import Navbar from "../../components/Navbar/Navbar"
import PlanAxis from "../../components/PlanAxis/PlanAxis"
import Wrapper from "../../components/Wrapper/Wrapper"
import styles from "./Plan.module.css"
import axios from "axios"
import TripName from "../../components/TripName/TripName"
import TripPerson from "../../components/TripPerson/TripPerson"

const Plan = () => {
    const [departureCity, setDepartureCity] = useState<string>("Warsaw");
  const [arrivalCity, setArrivalCity] = useState<string>("London");
  const [departureDate, setDepartureDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().split("T")[0]);
  const [passengers, setPassengers] = useState<number>(1);

    // Stan dla wyników wyszukiwania i stanu ładowania
    const [flights, setFlights] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

  const fetchFlights = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/api/flights", {
        params: {
          departure_city: departureCity,
          arrival_city: arrivalCity,
          departure_date: departureDate,
          return_date: returnDate,
          passengers,
        },
      });
      setFlights(response.data); // Zapisujemy wyniki w stanie
    } catch (err) {
      setError("Błąd podczas pobierania lotów");
    } finally {
      setLoading(false);
    }
  };

  // Funkcja wywoływana po kliknięciu przycisku "Search"
  const handleSearch = () => {
    fetchFlights();
  };

  return (
    <div className={styles.plan}>
        <Navbar background="#007bff"/>
        <Wrapper>
            <PlanAxis/>
            <FlightSearchPanel
                departureCity={departureCity}
                arrivalCity={arrivalCity}
                departureDate={departureDate}
                returnDate={returnDate}
                passengers={passengers}
                setDepartureCity={setDepartureCity}
                setArrivalCity={setArrivalCity}
                setDepartureDate={setDepartureDate}
                setReturnDate={setReturnDate}
                setPassengers={setPassengers}
                onSearch={handleSearch}
                showButton={false}
              />
              <TripName/>
              <TripPerson />
              <TripPerson/>
        </Wrapper>
    </div>
  )
}

export default Plan