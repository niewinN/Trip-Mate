import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import FlightList from "../../components/FlightList/FlightList";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import filters from "../../data/filters.json";
import styles from "./Flights.module.css";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import FlightSearchPanel from "../../components/FlightSearchPanel/FlightSearchPanel"; // Import FlightSearchPanel
import axios from "axios";
import { useState, useEffect } from "react";

const Flights = () => {
  const flightFilters = filters.flights;

  // Stan dla formularza wyszukiwania
  const [departureCity, setDepartureCity] = useState<string>("Warsaw");
  const [arrivalCity, setArrivalCity] = useState<string>("London");
  const [departureDate, setDepartureDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().split("T")[0]);
  const [passengers, setPassengers] = useState<number>(1);

  // Stan dla wyników wyszukiwania i stanu ładowania
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Funkcja do pobierania danych lotów
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

  // Wywołanie wyszukiwania po załadowaniu komponentu z domyślnymi parametrami
  useEffect(() => {
    fetchFlights(); // Automatyczne wyszukiwanie przy początkowym załadowaniu
  }, []);

  return (
    <div className={styles.flights}>
      <Navbar background="#007bff" />
      <Wrapper>
        <div className={styles.flex}>
          <div>
            <HeaderIcon icon={<FontAwesomeIcon icon={faPlane} />} title="Flights" />
            <div className={styles.displayMobile}>
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
              />
            </div>
            <FilterPanel sections={flightFilters} />
          </div>
          <div>
            <div className={styles.displayDesktop}>
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
              />
            </div>

            {/* Wyszukiwanie zakończone - lista lotów */}
            {loading && <p>Ładowanie...</p>}
            {error && <p>{error}</p>}
            <FlightList flights={flights} /> {/* Przekazujemy dane lotów */}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Flights;
