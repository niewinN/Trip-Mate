import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import filters from "../../data/filters.json"
import styles from "./Hotels.module.css"

const Hotels = () => {
    const hotelFilters = filters.hotels;

  return (
    <div className={styles.hotels}>
        <Wrapper>
            <Navbar background="#007bff"/>
            <FilterPanel sections={hotelFilters}/>
        </Wrapper>
    </div>
  )
}

export default Hotels