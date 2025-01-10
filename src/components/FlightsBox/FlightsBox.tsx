import React, { useEffect, useRef, useState } from "react";
import FlightSearchPanel from "../FlightSearchPanel/FlightSearchPanel";
import HeaderIcon from "../HeaderIcon/HeaderIcon";
import styles from "./FlightsBox.module.css";
import FilterPanel from "../FilterPanel/FilterPanel";
import FlightList from "../FlightList/FlightList";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFlightSearchContext } from "../../contexts/FlightSearchContext";
import filters from "../../data/filters.json";
import PlanButton from "../PlanButton/PlanButton";

interface FlightsBoxProps {
  onFlightSelect: (flight: any) => void;
  initialDepartureCity: string;
  initialArrivalCity: string;
  initialDepartureDate: string;
  initialReturnDate: string;
  initialPassengers: number;
  isRedirectEnabled?: boolean;
  googleFlightsUrl?: string;
  showPlanBtn?: boolean;
}

const FlightsBox: React.FC<FlightsBoxProps> = ({
  onOutboundFlightSelect,
  onReturnFlightSelect,
  onFlightSelect,
  initialDepartureCity,
  initialArrivalCity,
  initialDepartureDate,
  initialReturnDate,
  initialPassengers,
  isRedirectEnabled = false,
  showPlanBtn = false
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
    googleFlightsUrl,
    loading,
    error,
    fetchFlights,
    outboundFlights,
    returnFlights
  } = useFlightSearchContext();

  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<any>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<any>(null)

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

  const handleOutboundFlightSelect = (flight: any) => {
    console.log("🛫 Selected Outbound Flight:", flight);
    onOutboundFlightSelect(flight); // Wywołaj funkcję rodzica
  };

  const handleReturnFlightSelect = (flight: any) => {
    console.log("🛬 Selected Return Flight:", flight);
    onReturnFlightSelect(flight); // Wywołaj funkcję rodzica
  };
  // const handleNextStep = () => {
  //   if (selectedOutboundFlight && selectedReturnFlight) {
  //     console.log("✅ Proceeding with selected flights:");
  //     console.log("Outbound:", selectedOutboundFlight);
  //     console.log("Return:", selectedReturnFlight);
  //     onFlightSelect({
  //       outbound: selectedOutboundFlight,
  //       return: selectedReturnFlight,
  //     });
  //   } else {
  //     alert("Wybierz oba loty (wylot i powrót) przed przejściem dalej.");
  //   }
  // };

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
        <FlightList  selectedOutboundFlight={selectedOutboundFlight}
  selectedReturnFlight={selectedReturnFlight} onSelectOutbound={handleOutboundFlightSelect}
  onSelectReturn={handleReturnFlightSelect} outboundFlights={outboundFlights} returnFlights={returnFlights} flights={flights} onSelect={handleSelectFlight} isRedirectEnabled={isRedirectEnabled} googleFlightsUrl={googleFlightsUrl} />
      </div>
      {showPlanBtn && <PlanButton/>}
    </div>
  );
};

export default FlightsBox;
