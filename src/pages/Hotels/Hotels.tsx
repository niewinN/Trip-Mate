import FilterPanel from "../../components/FilterPanel/FilterPanel";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import HotelList from "../../components/HotelList/HotelList";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import filters from "../../data/filters.json"
import styles from "./Hotels.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

const Hotels = () => {
    const hotelFilters = filters.hotels;

  return (
    <div className={styles.hotels}>
        <Wrapper>
            <Navbar background="#007bff"/>
            <div className={styles.flex}>
              <div>
                <HeaderIcon icon={<FontAwesomeIcon icon={faHotel} />} title="Hotels" />
                <FilterPanel sections={hotelFilters}/>
              </div>
              <HotelList/>
            </div>
        </Wrapper>
    </div>
  )
}

export default Hotels