import styles from "./Profile.module.css"
import Navbar from '../../components/Navbar/Navbar'
import Wrapper from '../../components/Wrapper/Wrapper'
import TripCard from "../../components/TripCard/TripCard";
import TripStats from "../../components/TripStats/TripStats";
import AccountData from "../../components/AccountData/AccountData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Trip {
  id: number;
  tripName: string;
  arrivalCity: string;
}
// const trips = [
//   {
//     tripName: 'Trip to Paris',
//     arrivalCity: 'Paris',
//   },
//   {
//     tripName: 'Trip to New York',
//     arrivalCity: 'New York',
//   },
//   {
//     tripName: 'Trip to London',
//     arrivalCity: 'London',
//   },
//   {
//     tripName: 'Trip to Barcelona',
//     arrivalCity: 'Barcelona',
//   },
//   {
//     tripName: 'Trip to Rome',
//     arrivalCity: 'Rome',
//   },
//   {
//     tripName: 'Trip to Tokyo',
//     arrivalCity: 'Tokyo',
//   },
// ];

const Profile = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/travels/user-trips', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTrips(response.data);
      } catch (error) {
        console.error('❌ Error fetching trips:', error);
        setError('Failed to fetch trips');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [navigate]);

  return (
    <div className={styles.profile}>
    <Navbar background="#007bff" />
    <Wrapper>
      <div className={styles.profileBox}>
        <div className={styles.tripContainer}>
          <h1 className={styles.title}>📚 My Trips</h1>
          {loading ? (
            <p>Loading trips...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className={styles.tripGrid}>
              {trips.map((trip) => (
                <TripCard
                  id={trip.id}
                  key={trip.id}
                  tripName={trip.tripName}
                  arrivalCity={trip.arrivalCity}
                />
              ))}
            </div>
          )}
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