import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Hotels.module.css";
import HotelsBox from "../../components/HotelsBox/HotelsBox";

const Hotels = () => {
  // Domyślne wartości dla parametrów
  const defaultArrivalCity = "London";
  const defaultDepartureDate = new Date().toISOString().split("T")[0];
  const defaultReturnDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const defaultPassengers = 1;

  const handleHotelSelect = (hotel: any) => {
    console.log("🏨 Selected Hotel:", hotel);
  };

  return (
    <div className={styles.hotels}>
      <Navbar background="#007bff" />
      <Wrapper>
        <HotelsBox
          arrivalCity={defaultArrivalCity}
          departureDate={defaultDepartureDate}
          returnDate={defaultReturnDate}
          passengers={defaultPassengers}
          onHotelSelect={handleHotelSelect}
          isRedirectEnabled={true}
        />
      </Wrapper>
    </div>
  );
};

export default Hotels;
