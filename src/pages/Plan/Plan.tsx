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
import { useLocation, useNavigate } from "react-router-dom";
import errorToast from "../../assets/plan/errorToast.png"
import ErrorToast from "../../components/Toast/Toast";
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
  const isFirstRender = useRef(true)
  const navigate = useNavigate();
  const location = useLocation()

  // Aktualizacja osób w podróży
  const updateTripPerson = (index: number, field: "name" | "image", value: any) => {
    const updatedPersons = [...tripPersons];
    updatedPersons[index] = { ...updatedPersons[index], [field]: value };
    setTripPersons(updatedPersons);
  };

   // 🕹️ Obsługa nawigacji przeglądarki
   useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.step !== undefined) {
        setCurrentStep(event.state.step);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Ustaw stan początkowy historii tylko raz
    if (isFirstRender.current) {
      window.history.replaceState({ step: currentStep }, "", location.pathname);
      isFirstRender.current = false;
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Aktualizuj historię tylko przy zmianie currentStep (nie na każdym renderze)
    if (!isFirstRender.current) {
      window.history.pushState({ step: currentStep }, "", location.pathname);
    }
  }, [currentStep, location.pathname]);

  useEffect(() => {
    setTripPersons((prev) => {
      const updatedPersons = [...prev];

      if (passengers > updatedPersons.length) {
        // Dodanie brakujących kart
        for (let i = updatedPersons.length; i < passengers; i++) {
          updatedPersons.push({ name: "", image: null });
        }
      } else if (passengers < updatedPersons.length) {
        // Usunięcie nadmiarowych kart
        updatedPersons.splice(passengers);
      }

      console.log('🔄 Updated TripPersons:', updatedPersons); // Sprawdź aktualizację tablicy

      return updatedPersons;
    });
  }, [passengers]);

  useEffect(() => {
    setTripPersons((prev) => {
      const updatedPersons = Array.from({ length: passengers }, (_, i) => ({
        name: prev[i]?.name || "",
        image: prev[i]?.image || null,
      }));
      console.log('🔄 Forced Update TripPersons after passengers change:', updatedPersons);
      return updatedPersons;
    });
  }, [passengers]);
  
  

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

  // const handleNextStep = () => {
  //   if (isFormComplete()) {
  //     setCurrentStep(2);
  //     fetchFlights();
  //     hasFetchedInitial.current = true;
  //   } else {
  //     setShowErrorToast(true)
  //   }
  // };
  // 🟢 Funkcja przejścia do następnego kroku
  const handleNextStep = () => {
    if (!isFormComplete()) {
      setShowErrorToast(true);
      return;
    }

    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;
      window.history.pushState({ step: nextStep }, "", location.pathname);
      return nextStep;
    });

    if (currentStep === 2 && !hasFetchedInitial.current) {
      fetchFlights();
      hasFetchedInitial.current = true;
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
    // setPassengers(flight.passengers || 1);
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
    console.log("🎡 Attractions received from AttractionsBox:", attractions);
    setSelectedAttractions([...attractions]);
  };
  
  
  
 
  const handleRestaurantNext = () => {
    setCurrentStep(5); // Przejście do AttractionsBox
  };
  
  
const handleFinish = async () => {
  console.log('🛠️ TripPersons State (Before API Call):', tripPersons);
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }

  // Wymuś pełną synchronizację stanu
  const attractionsCopy = [...selectedAttractions];
  console.log("🎢 Final Selected Attractions (Before API Call):", attractionsCopy);

  const travelData = {
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    passengersCount: passengers || 1,
    tripName,
    tripPersons,
    flight: selectedFlight
  ? [{
      airline: selectedFlight?.airline || null,
      airline_logo: selectedFlight?.airline_logo || null,
      price: selectedFlight?.price || null,
      departure_airport: selectedFlight?.segments?.[0]?.departure?.airport || null,
      arrival_airport: selectedFlight?.segments?.[selectedFlight?.segments.length - 1]?.arrival?.airport || null,
      departure_time: selectedFlight?.segments?.[0]?.departure?.time || null,
      arrival_time: selectedFlight?.segments?.[selectedFlight?.segments.length - 1]?.arrival?.time || null,
      total_duration: selectedFlight?.totalDuration || null,
      segments: selectedFlight?.segments || [],
    }]
  : [],

      hotel: selectedHotel
      ? [{
          name: selectedHotel?.name || null,
          location: arrivalCity || null,
          check_in_date: departureDate || null,
          check_out_date: returnDate || null,
          price: selectedHotel?.rate_per_night?.extracted_lowest || null,
          description: selectedHotel?.description || null,
          hotel_class: selectedHotel?.hotel_class || null,
          overall_rating: selectedHotel?.overall_rating || null,
          reviews: selectedHotel?.reviews || null,
          amenities: selectedHotel?.amenities || [],
          nearby_places: selectedHotel?.nearby_places || [],
          thumbnail: selectedHotel?.images?.[0]?.thumbnail || null,
        }]
      : [],
      restaurants: selectedRestaurants.map((restaurant) => ({
        title: restaurant.title,
        address: restaurant.address,
        price_range: restaurant.price,
        description: restaurant.description,
        thumbnail: restaurant.thumbnail,
        rating: restaurant.rating,
        reviews_original: restaurant.reviews_original,
        reviews: restaurant.reviews,
        type: restaurant.type,
      })),
    attractions: selectedAttractions.map((attraction) => ({
      title: attraction.title || 'No title',
      description: attraction.description || 'No description',
      thumbnail: attraction.thumbnail || null,
    })),
  };

  console.log('🚀 Final Travel Data (Before API Call):', travelData);

  try {
    const response = await createTravel(travelData, token);
    console.log('✅ Travel created successfully:', response);
    console.log('🆔 Travel ID from Response:', response.travelId);

  if (response && response.travelId) {
    navigate(`/summary/${response.travelId}`);
  } else {
    console.error('❌ Travel ID is missing in the response!');
    setShowErrorToast(true);
  }
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
            isRedirectEnabled={false}
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
            isRedirectEnabled={false}
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
