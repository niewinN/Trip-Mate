import React, { useEffect, useRef, useState } from 'react';
import styles from "./HotelsBox.module.css";
import HotelList from '../HotelList/HotelList';
import HotelSearchPanel from '../HotelSearchPanel/HotelSearchPanel';
import FilterPanel from '../FilterPanel/FilterPanel';
import HeaderIcon from '../HeaderIcon/HeaderIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import filters from "../../data/filters.json";

interface HotelsBoxProps {
  arrivalCity: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  onHotelSelect: (hotel: any) => void;
}

const HotelsBox: React.FC<HotelsBoxProps> = ({
  arrivalCity,
  departureDate,
  returnDate,
  passengers,
  onHotelSelect,
}) => {
  const hotelFilters = filters.hotels;

  // Stan dla formularza wyszukiwania
  const [query, setQuery] = useState<string>(arrivalCity);
  const [checkInDate, setCheckInDate] = useState<string>(departureDate);
  const [checkOutDate, setCheckOutDate] = useState<string>(returnDate);
  const [guests, setGuests] = useState<number>(passengers);
  const [rooms, setRooms] = useState<number>(1);

  // Stan dla wyników wyszukiwania i stanu ładowania
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const hasFetched = useRef(false);

  // Ustaw wartości tylko raz przy pierwszym renderze
  useEffect(() => {
    if (!hasFetched.current) {
      setQuery(arrivalCity);
      setCheckInDate(departureDate);
      setCheckOutDate(returnDate);
      setGuests(passengers);
      fetchHotels();
      hasFetched.current = true;
    }
  }, [arrivalCity, departureDate, returnDate, passengers]);

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
      setHotels(response.data);
    } catch (err) {
      setError('Błąd podczas pobierania hoteli');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchHotels();
  };

  const handleSelectHotel = (hotel: any) => {
    console.log("🏨 Selected hotel:", hotel);
    onHotelSelect(hotel);
  };

  return (
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
            onSearch={handleSearch}
          />
        </div>
        {loading && <p>Ładowanie...</p>}
        {error && <p>{error}</p>}
        <HotelList
          hotels={hotels}
          query={query}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guests={guests}
          rooms={rooms}
          onSelect={handleSelectHotel}
        />
      </div>
    </div>
  );
};

export default HotelsBox;
