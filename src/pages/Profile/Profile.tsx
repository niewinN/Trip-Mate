import styles from "./Profile.module.css"
import Navbar from '../../components/Navbar/Navbar'
import Wrapper from '../../components/Wrapper/Wrapper'
import TripCard from "../../components/TripCard/TripCard";
import TripStats from "../../components/TripStats/TripStats";
import AccountData from "../../components/AccountData/AccountData";


const trips = [
  {
    tripName: 'Trip to Paris',
    arrivalCity: 'Paris',
  },
  {
    tripName: 'Trip to New York',
    arrivalCity: 'New York',
  },
  {
    tripName: 'Trip to London',
    arrivalCity: 'London',
  },
  {
    tripName: 'Trip to Barcelona',
    arrivalCity: 'Barcelona',
  },
  {
    tripName: 'Trip to Rome',
    arrivalCity: 'Rome',
  },
  {
    tripName: 'Trip to Tokyo',
    arrivalCity: 'Tokyo',
  },
];

const Profile = () => {
  return (
    <div className={styles.profile}>
        <Navbar background="#007bff" />
        <Wrapper>
          <div className={styles.profileBox}>
            <div className={styles.tripContainer}>
              <h1 className={styles.title}>📚 My Trips</h1>
              <div className={styles.tripGrid}>
                {trips.map((trip, index) => (
                  <TripCard
                    key={index}
                    tripName={trip.tripName}
                    arrivalCity={trip.arrivalCity}
                  />
                ))}
            </div>
          </div>
          <div className={styles.secondContainer}>
            <TripStats
              numberOfTrips={12}
              numberOfCountries={8}
              numberOfCities={18}
              daysInTrip={54}
              numberOfPhotos={21}
            />
            <AccountData/>
          </div>
      </div>
        </Wrapper>
    </div>
  )
}

export default Profile