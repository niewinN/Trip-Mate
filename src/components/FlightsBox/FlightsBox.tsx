import React, { useEffect, useRef } from "react";
import FlightSearchPanel from "../FlightSearchPanel/FlightSearchPanel";
import HeaderIcon from "../HeaderIcon/HeaderIcon";
import styles from "./FlightsBox.module.css";
import FilterPanel from "../FilterPanel/FilterPanel";
import FlightList from "../FlightList/FlightList";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFlightSearchContext } from "../../contexts/FlightSearchContext";
import filters from "../../data/filters.json";

interface FlightsBoxProps {
  onFlightSelect: (flight: any) => void;
  initialDepartureCity: string;
  initialArrivalCity: string;
  initialDepartureDate: string;
  initialReturnDate: string;
  initialPassengers: number;
  isRedirectEnabled?: boolean;
}

const FlightsBox: React.FC<FlightsBoxProps> = ({
  onFlightSelect,
  initialDepartureCity,
  initialArrivalCity,
  initialDepartureDate,
  initialReturnDate,
  initialPassengers,
  isRedirectEnabled = false,
}) => {
  const {
    departureCity,
    setDepartureCity,
    arrivalCity,
    setArrivalCity,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    passengers,
    setPassengers,
    flights,
    loading,
    error,
    fetchFlights,
  } = useFlightSearchContext();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      setDepartureCity(initialDepartureCity);
      setArrivalCity(initialArrivalCity);
      setDepartureDate(initialDepartureDate);
      setReturnDate(initialReturnDate);
      setPassengers(initialPassengers);
      fetchFlights();
      hasFetched.current = true;
    }
  }, [
    initialDepartureCity,
    initialArrivalCity,
    initialDepartureDate,
    initialReturnDate,
    initialPassengers,
    setDepartureCity,
    setArrivalCity,
    setDepartureDate,
    setReturnDate,
    setPassengers,
    fetchFlights,
  ]);

  const handleSearch = () => {
    fetchFlights();
  };

  const handleSelectFlight = (flight: any) => {
    if (onFlightSelect) {
      onFlightSelect(flight);
    } else {
      console.warn("onFlightSelect is not defined");
    }
  };

  return (
    <div className={styles.flex}>
      {/* Lewa kolumna z panelem wyszukiwania i filtrami */}
      <div className={styles.first}>
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
        <FilterPanel sections={filters.flights} />
      </div>

      {/* Prawa kolumna z wynikami wyszukiwania */}
      <div className={styles.second}>
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
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <FlightList flights={flights} onSelect={handleSelectFlight} isRedirectEnabled={isRedirectEnabled} />
      </div>
    </div>
  );
};

export default FlightsBox;
