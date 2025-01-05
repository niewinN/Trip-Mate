import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Flights.module.css";
import FlightsBox from "../../components/FlightsBox/FlightsBox";

const Flights = () => {
  // Domyślne wartości dla parametrów
  const defaultDepartureCity = "Warsaw";
  const defaultArrivalCity = "London";
  const defaultDepartureDate = new Date().toISOString().split("T")[0];
  const defaultReturnDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const defaultPassengers = 1;

  const handleFlightSelect = (flight: any) => {
    console.log("Selected flight:", flight);
  };

  return (
    <div className={styles.flights}>
      <Navbar background="#007bff" />
      <Wrapper>
        <FlightsBox
          initialDepartureCity={defaultDepartureCity}
          initialArrivalCity={defaultArrivalCity}
          initialDepartureDate={defaultDepartureDate}
          initialReturnDate={defaultReturnDate}
          initialPassengers={defaultPassengers}
          onFlightSelect={handleFlightSelect}
          isRedirectEnabled={true}
        />
      </Wrapper>
    </div>
  );
};

export default Flights;
