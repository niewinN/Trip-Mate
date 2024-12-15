import { useState } from "react";
import FlightSearchPanel from "../../components/FlightSearchPanel/FlightSearchPanel";
import Navbar from "../../components/Navbar/Navbar";
import PlanAxis from "../../components/PlanAxis/PlanAxis";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Plan.module.css";
import TripName from "../../components/TripName/TripName";
import TripPerson from "../../components/TripPerson/TripPerson";
import FlightsBox from "../../components/FlightsBox/FlightsBox";
import HotelsBox from "../../components/HotelsBox/HotelsBox";

interface TripPersonData {
  name: string;
  image: string | null;
}

const Plan = () => {
  const [departureCity, setDepartureCity] = useState<string>("Warsaw");
  const [arrivalCity, setArrivalCity] = useState<string>("London");
  const [departureDate, setDepartureDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [passengers, setPassengers] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [tripName, setTripName] = useState<string>(""); // Stan dla TripName
  const [tripPersons, setTripPersons] = useState<TripPersonData[]>(
    Array(passengers).fill({ name: "", image: null })
  );
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  // Funkcja do aktualizacji danych TripPerson
  const updateTripPerson = (index: number, field: "name" | "image", value: any) => {
    const updatedPersons = [...tripPersons];
    updatedPersons[index] = { ...updatedPersons[index], [field]: value };
    setTripPersons(updatedPersons);
  };

  // Funkcja do sprawdzenia, czy wszystkie dane są wypełnione
  const isFormComplete = () => {
    console.log("departureCity:", departureCity);
    console.log("arrivalCity:", arrivalCity);
    console.log("departureDate:", departureDate);
    console.log("returnDate:", returnDate);
    console.log("passengers:", passengers);
    console.log("tripName:", tripName);
    console.log("tripPersons:", tripPersons);
  
    return (
      departureCity &&
      arrivalCity &&
      departureDate &&
      returnDate &&
      passengers > 0 &&
      tripName.trim() !== "" &&
      tripPersons.every((person) => {
        console.log("Person name:", person.name);
        console.log("Person image:", person.image);
        return person.name.trim() !== "" && person.image;
      })
    );
  };
  

  // Przejście do kolejnego kroku
  const handleNextStep = () => {
    if (isFormComplete()) {
      setCurrentStep(2); // Zmiana etapu na drugi
    } else {
      alert("Please complete all fields, including trip name and passenger details.");
    }
  };

  const handleFlightSelect = (flight: any) => {
    setSelectedFlight(flight); // Zapisanie wybranego lotu
    setCurrentStep(3); // Przejście do kroku 3 (HotelsBox)
  };

  return (
    <div className={styles.plan}>
      <Navbar background="#007bff" />
      <Wrapper>
        <PlanAxis currentStep={currentStep} />
        {currentStep === 1 && (
          <>
            {/* Etap 1 - Formularze */}
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
              setPassengers={(count) => {
                setPassengers(count);
                setTripPersons(Array(count).fill({ name: "", image: null })); // Reset TripPerson przy zmianie pasażerów
              }}
              onSearch={() => {}}
              showButton={false}
            />
            <TripName tripName={tripName} setTripName={setTripName} />
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
        {currentStep === 2 && (
        <FlightsBox onFlightSelect={handleFlightSelect} />
      )}
        {currentStep === 3 && (
          <HotelsBox />
        )}
      </Wrapper>
    </div>
  );
};

export default Plan;
