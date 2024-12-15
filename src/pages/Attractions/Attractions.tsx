import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Attractions.module.css";
import AttractionsBox from "../../components/AttractionsBox/AttractionsBox";


const Attractions = () => {
  return (
    <div className={styles.attractions}>
      <Navbar background="#007bff" />
      <Wrapper>
        <AttractionsBox/>
      </Wrapper>
    </div>
  );
};

export default Attractions;
