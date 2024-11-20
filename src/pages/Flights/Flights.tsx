import FilterPanel from "../../components/FilterPanel/FilterPanel";
import FlightList from "../../components/FlightList/FlightList";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import filters from "../../data/filters.json"
import styles from "./Flights.module.css"

const Flights = () => {
    const flightFilters = filters.flights;

  return (
    <div className={styles.flights}>
        <Wrapper>
            <Navbar background="#007bff"/>
            <FilterPanel sections={flightFilters}/>
            <FlightList/>
        </Wrapper>
    </div>
  )
}

export default Flights