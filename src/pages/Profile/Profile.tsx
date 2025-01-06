import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import Wrapper from '../../components/Wrapper/Wrapper';
import TripCard from "../../components/TripCard/TripCard";
import TripStats from "../../components/TripStats/TripStats";
import AccountData from "../../components/AccountData/AccountData";
import styles from "./Profile.module.css";

interface Trip {
  id: number;
  tripName: string;
  arrivalCity: string;
}

interface Stats {
  numberOfTrips: number;
  daysInTrip: number;
  numberOfPhotos: number;
}

const Profile = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [stats, setStats] = useState<Stats>({ numberOfTrips: 0, daysInTrip: 0, numberOfPhotos: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTripsAndStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Pobierz podróże
        const tripsResponse = await axios.get('http://localhost:5000/api/travels/user-trips', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrips(tripsResponse.data);

        // Pobierz statystyki
        const statsResponse = await axios.get('http://localhost:5000/api/travels/user-stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsResponse.data);
      } catch (error) {
        console.error('❌ Error fetching trips or stats:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchTripsAndStats();
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
              numberOfTrips={stats.numberOfTrips}
              daysInTrip={stats.daysInTrip}
              numberOfPhotos={stats.numberOfPhotos}
            />
            <AccountData />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Profile;
