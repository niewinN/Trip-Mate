import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Hotels.module.css";
import HotelsBox from '../../components/HotelsBox/HotelsBox';

const Hotels = () => {
  
  return (
    <div className={styles.hotels}>
      <Navbar background="#007bff" />
      <Wrapper>
        <HotelsBox/>
      </Wrapper>
    </div>
  );
};

export default Hotels;
