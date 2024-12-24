import React from "react";
import styles from "./Main.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import MainQuote from "../../components/MainQuote/MainQuote";
import WeatherBox from "../../components/WeatherBox/WeatherBox";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import FlightSearchPanel from "../../components/FlightSearchPanel/FlightSearchPanel";
import { useFlightSearch } from "../../hooks/useFlightSearch";
import { useFlightSearchContext } from "../../contexts/FlightSearchContext";

const Main: React.FC = () => {
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
  } = useFlightSearchContext();

  return (
    <div className={styles.main}>
      <div className={styles.overlay}>
      <Navbar background="transparent" showNavLinks={false} />
        <Wrapper>
          <div className={styles.flex}>
            <div className={styles.left}>
              <MainQuote />
              {/* <div className={styles.searchPanel}> */}
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
                  onSearch={() => {}}
                  redirectToPlan={true}
                />
              {/* </div> */}
              <WeatherBox />
            </div>
            <VerticalNav />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Main;
