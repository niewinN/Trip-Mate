import { useState, useEffect } from 'react';
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import HotelList from "../../components/HotelList/HotelList";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import filters from "../../data/filters.json";
import styles from "./Hotels.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import HotelSearchPanel from '../../components/HotelSearchPanel/HotelSearchPanel';
import axios from 'axios';

const Hotels = () => {
  const hotelFilters = filters.hotels;

  // Stan dla formularza wyszukiwania
  const [query, setQuery] = useState<string>('Warsaw');
  const [checkInDate, setCheckInDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [guests, setGuests] = useState<number>(2);
  const [rooms, setRooms] = useState<number>(1);

  // Stan dla wyników wyszukiwania i stanu ładowania
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Funkcja do pobierania danych hoteli
  const fetchHotels = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:5000/api/hotels', {
        params: {
          q: query,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
          guests,
          rooms,
        },
      });
      setHotels(response.data); // Zapisujemy wyniki w stanie
    } catch (err) {
      setError('Błąd podczas pobierania hoteli');
    } finally {
      setLoading(false);
    }
  };

  // Funkcja wywoływana po kliknięciu przycisku "Szukaj"
  const handleSearch = () => {
    fetchHotels();
  };

  // Wywołanie wyszukiwania po załadowaniu komponentu z domyślnymi parametrami
  useEffect(() => {
    fetchHotels();  // Automatyczne wyszukiwanie przy początkowym załadowaniu
  }, []);  // Pusty array oznacza, że to wykona się tylko raz, przy pierwszym załadowaniu

  return (
    <div className={styles.hotels}>
      <Navbar background="#007bff" />
      <Wrapper>
        <div className={styles.flex}>
          <div className={styles.first}>
            <HeaderIcon icon={<FontAwesomeIcon icon={faHotel} />} title="Hotels" />
            <div className={styles.displayMobile}>
              <HotelSearchPanel
                query={query}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                guests={guests}
                rooms={rooms}
                setQuery={setQuery}
                setCheckInDate={setCheckInDate}
                setCheckOutDate={setCheckOutDate}
                setGuests={setGuests}
                setRooms={setRooms}
                onSearch={handleSearch} 
              />
            </div>
            <FilterPanel sections={hotelFilters} />
          </div>
          <div className={styles.second}>
            <div className={styles.displayDesktop}>
              <HotelSearchPanel
                query={query}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                guests={guests}
                rooms={rooms}
                setQuery={setQuery}
                setCheckInDate={setCheckInDate}
                setCheckOutDate={setCheckOutDate}
                setGuests={setGuests}
                setRooms={setRooms}
                onSearch={handleSearch}  // Wywołanie funkcji po kliknięciu przycisku
              />
            </div>
            {/* Wyszukiwanie zakończone - lista hoteli */}
            {loading && <p>Ładowanie...</p>}
            {error && <p>{error}</p>}
            <HotelList
              hotels={hotels}  // Przekazanie danych hoteli
              query={query}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guests={guests}
              rooms={rooms}
            />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Hotels;
