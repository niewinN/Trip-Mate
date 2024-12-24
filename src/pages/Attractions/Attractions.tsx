import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Attractions.module.css";
import AttractionsBox from "../../components/AttractionsBox/AttractionsBox";


const Attractions = () => {
  const defaultCity = "London";
  const defaultDepartureDate = new Date().toISOString().split("T")[0];
  const defaultReturnDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  return (
    <div className={styles.attractions}>
      <Navbar background="#007bff" />
      <Wrapper>
        <AttractionsBox 
          showFinishButton={false} 
          initialCity={defaultCity}
          initialDepartureDate={defaultDepartureDate}
          initialReturnDate={defaultReturnDate}
          />
      </Wrapper>
    </div>
  );
};

export default Attractions;
