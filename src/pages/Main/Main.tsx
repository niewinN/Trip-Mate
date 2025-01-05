import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import MainQuote from "../../components/MainQuote/MainQuote";
import WeatherBox from "../../components/WeatherBox/WeatherBox";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import FlightSearchPanel from "../../components/FlightSearchPanel/FlightSearchPanel";
import loginImg from '../../assets/login/loginImg.png'
import { useFlightSearchContext } from "../../contexts/FlightSearchContext";
import Toast from "../../components/Toast/Toast";

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

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // ✅ Sprawdzenie flagi sukcesu logowania
    if (localStorage.getItem('loginSuccess') === 'true') {
      setShowToast(true);
      localStorage.removeItem('loginSuccess'); // Usunięcie flagi po wyświetleniu Toast
    }
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.overlay}>
      <Navbar background="transparent" showNavLinks={false} />
        <Wrapper>
          <div className={styles.flex}>
            <div className={styles.left}>
              <MainQuote />
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
              <WeatherBox />
            </div>
            <VerticalNav />
          </div>
        </Wrapper>
      </div>
      {showToast && (
        <Toast
          message="Login successful! Start planning your dream trip!"
          imageSrc={loginImg}
          onClose={() => setShowToast(false)}
        />
      )}

    </div>
  );
};

export default Main;
