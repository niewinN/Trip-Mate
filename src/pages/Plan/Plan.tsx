import { useState, useEffect, useRef } from "react";
import FlightSearchPanel from "../../components/FlightSearchPanel/FlightSearchPanel";
import Navbar from "../../components/Navbar/Navbar";
import PlanAxis from "../../components/PlanAxis/PlanAxis";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Plan.module.css";
import TripName from "../../components/TripName/TripName";
import TripPerson from "../../components/TripPerson/TripPerson";
import FlightsBox from "../../components/FlightsBox/FlightsBox";
import HotelsBox from "../../components/HotelsBox/HotelsBox";
import RestaurantsBox from "../../components/RestaurantsBox/RestaurantsBox";
import AttractionsBox from "../../components/AttractionsBox/AttractionsBox";
import { useFlightSearchContext } from "../../contexts/FlightSearchContext";
import { useNavigate } from "react-router-dom";
import errorToast from "../../assets/plan/errorToast.png"
import ErrorToast from "../../components/ErrorToast/ErrorToast";
import { createTravel } from "../../utils/api";

interface TripPersonData {
  name: string;
  image: string | null;
}

const Plan = () => {
  const {
    departureCity,
    setDepartureCity,
    arrivalCity,
    setArrivalCity,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    passengers,
    setPassengers,
    fetchFlights,
  } = useFlightSearchContext();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [tripName, setTripName] = useState<string>("");
  const [tripPersons, setTripPersons] = useState<TripPersonData[]>(
    Array(passengers).fill({ name: "", image: null })
  );
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState<any[]>([]);
  const [selectedAttractions, setSelectedAttractions] = useState<any[]>([]);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const hasFetchedInitial = useRef(false);
  const navigate = useNavigate();
  const attractionsRef = useRef<any[]>([]);

  // Aktualizacja osób w podróży
  const updateTripPerson = (index: number, field: "name" | "image", value: any) => {
    const updatedPersons = [...tripPersons];
    updatedPersons[index] = { ...updatedPersons[index], [field]: value };
    setTripPersons(updatedPersons);
  };

  // Sprawdzanie kompletności formularza
  const isFormComplete = () => {
    return (
      departureCity &&
      arrivalCity &&
      departureDate &&
      returnDate &&
      passengers > 0 &&
      tripName.trim() !== "" &&
      tripPersons.every((person) => person.name.trim() !== "" && person.image)
    );
  };

  const handleNextStep = () => {
    if (isFormComplete()) {
      setCurrentStep(2);
      fetchFlights();
      hasFetchedInitial.current = true;
    } else {
      setShowErrorToast(true)
    }
  };

  useEffect(() => {
    if (currentStep === 2 && !hasFetchedInitial.current) {
      fetchFlights();
      hasFetchedInitial.current = true;
    }
  }, [currentStep, fetchFlights]);

  useEffect(() => {
  console.log("📝 Selected Attractions State Updated:", selectedAttractions);
}, [selectedAttractions]);


  const handleFlightSelect = (flight: any) => {
    console.log("✈️ Selected Flight:", flight); // Dodaj logowanie tutaj
    setSelectedFlight(flight);
    setArrivalCity(flight.segments?.[flight.segments.length - 1]?.arrival?.city || arrivalCity);
    setDepartureDate(flight.segments?.[0]?.departure?.time.split(" ")[0] || departureDate);
    setReturnDate(flight.return_date || returnDate);
    setPassengers(flight.passengers || 1);
    setCurrentStep(3);
  };

  const handleHotelSelect = (hotel: any) => {
    setSelectedHotel(hotel);
    setCurrentStep(4);
  };

  const handleRestaurantSelect = (restaurant: any) => {
    console.log("Selected Restaurants:", restaurant)
    setSelectedRestaurants((prev) => {
      const isAlreadySelected = prev.some((r) => r.title === restaurant.title);
      if (isAlreadySelected) {
        return prev.filter((r) => r.title !== restaurant.title);
      }
      return [...prev, restaurant];
    });
  };

  

  const handleAttractionSelect = (attractions: any[]) => {
    console.log("🎢 Selected Attractions:", attractions);
    setSelectedAttractions(attractions);
  };
 
  const handleRestaurantNext = () => {
    setCurrentStep(5); // Przejście do AttractionsBox
  };
  


useEffect(() => {
  attractionsRef.current = selectedAttractions;
  console.log("📝 Attractions Ref Updated:", attractionsRef.current);
}, [selectedAttractions]);
  
const handleFinish = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }

  console.log("🎢 Final Selected Attractions (Before API Call):", selectedAttractions);

  const travelData = {
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    passengersCount: passengers || 1,
    tripName,
    tripPersons,
    flight: {
      airline: selectedFlight?.airline || null,
      airline_logo: selectedFlight?.airline_logo || null,
      price: selectedFlight?.price || null,
      departure_airport: selectedFlight?.segments?.[0]?.departure?.airport || null,
      arrival_airport: selectedFlight?.segments?.[selectedFlight?.segments.length - 1]?.arrival?.airport || null,
      departure_time: selectedFlight?.segments?.[0]?.departure?.time || null,
      arrival_time: selectedFlight?.segments?.[selectedFlight?.segments.length - 1]?.arrival?.time || null,
      total_duration: selectedFlight?.totalDuration || null,
    },
    hotel: {
      name: selectedHotel?.name || null,
      description: selectedHotel?.description || null,
      check_in_time: selectedHotel?.check_in_time || null,
      check_out_time: selectedHotel?.check_out_time || null,
      price: selectedHotel?.rate_per_night?.extracted_lowest || null,
      location: arrivalCity || null,
      check_in_date: departureDate || null,
      check_out_date: returnDate || null,
    },
    restaurants: selectedRestaurants.map((restaurant) => ({
      title: restaurant.title || 'No title',
      address: restaurant.address || 'No address',
      description: restaurant.description || 'No description',
      price: restaurant.price || 'No price',
      thumbnail: restaurant.thumbnail || null,
    })),
    attractions: selectedAttractions
    ? selectedAttractions.map((attraction) => ({
        title: attraction.title || 'No title',
        description: attraction.description || 'No description',
        thumbnail: attraction.thumbnail || null,
      }))
    : [],
};

  console.log('🚀 Final Travel Data (Before API Call):', travelData);

  try {
    const response = await createTravel(travelData, token);
    console.log('✅ Travel created successfully:', response);
    navigate(`/summary/${response.travelId}`);
  } catch (error) {
    console.error('❌ Error creating travel:', error);
    setShowErrorToast(true);
  }
};
  

  return (
    <div className={styles.plan}>
      <Navbar background="#007bff" />
      <Wrapper>
        <PlanAxis currentStep={currentStep} />

        {/* Krok 1: Dane ogólne */}
        {currentStep === 1 && (
          <>
            <FlightSearchPanel
              departureCity={departureCity}
              arrivalCity={arrivalCity}
              departureDate={departureDate}
              returnDate={returnDate}
              passengers={passengers}
              setDepartureCity={setDepartureCity}
              setArrivalCity={setArrivalCity}
              setDepartureDate={setDepartureDate}
              setReturnDate={setReturnDate}
              setPassengers={setPassengers}
              onSearch={() => setCurrentStep(2)}
              showButton={false}
            />
            <TripName tripName={tripName} setTripName={setTripName} onNext={handleNextStep} />
            <div className={styles.flex}>
              {tripPersons.map((person, index) => (
                <TripPerson
                  key={index}
                  initialName={person.name}
                  onNameChange={(name) => updateTripPerson(index, "name", name)}
                  onImageChange={(image) => updateTripPerson(index, "image", image)}
                />
              ))}
            </div>
            <button className={styles.btn} onClick={handleNextStep}>
              Next
            </button>
          </>
        )}

        {/* Krok 2: Loty */}
        {currentStep === 2 && (
          <FlightsBox
            onFlightSelect={handleFlightSelect}
            initialDepartureCity={departureCity}
            initialArrivalCity={arrivalCity}
            initialDepartureDate={departureDate}
            initialReturnDate={returnDate}
            initialPassengers={passengers}
          />
        )}

        {/* Krok 3: Hotele */}
        {currentStep === 3 && (
          <HotelsBox
            arrivalCity={arrivalCity}
            departureDate={departureDate}
            returnDate={returnDate}
            passengers={passengers}
            onHotelSelect={handleHotelSelect}
          />
        )}

        {/* Krok 4: Restauracje */}
        {currentStep === 4 && (
          <RestaurantsBox
            initialCity={arrivalCity}
            initialDepartureDate={departureDate}
            initialReturnDate={returnDate}
            onRestaurantSelect={handleRestaurantSelect}
            onNext={handleRestaurantNext}
            showNextButton={true}
          />
        )}

        {/* Krok 5: Atrakcje */}
        {currentStep === 5 && (
          <AttractionsBox
            initialCity={arrivalCity}
            onAttractionSelect={handleAttractionSelect}
            onFinish={handleFinish}
            showFinishButton={true}
          />
        )}

        {/* Error Toast */}
        {showErrorToast && (
          <ErrorToast
            message="Please complete all fields, including trip name and passenger details!"
            imageSrc={errorToast}
            onClose={() => setShowErrorToast(false)}
          />
        )}
      </Wrapper>
    </div>
  );
};

export default Plan;
