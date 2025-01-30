import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Flight from "../../components/Flight/Flight";
import Hotel from "../../components/Hotel/Hotel";
import Restaurant from "../../components/Restaurant/Restaurant";
import Attraction from "../../components/Attraction/Attraction";
import styles from "./Summary.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import MultimediaCard from "../../components/MultimediaCard/MultimediaCard";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface TripPersonProps {
  name: string;
  image: string | null;
}

const Summary: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pobieranie ID podróży z URL

  const [data, setData] = useState<any>(null);
  const [multimediaCards, setMultimediaCards] = useState<number>(4);
  // const [multimedia, setMultimedia] = useState<any[]>([]);
  const [multimediaList, setMultimediaList] = useState<any[]>([]);
  // const [multimediaFiles, setMultimediaFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false); // Flaga stanu

  const generatePDF = async () => {
    const content = document.getElementById("summaryContent");
    if (!content) {
      console.error("Nie znaleziono elementu o ID 'summaryContent'.");
      return;
    }

    try {
      // Tworzenie obrazu canvas z HTML
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL("image/png");
      
      // Generowanie PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${tripName || "Summary"}.pdf`);
    } catch (error) {
      console.error("❌ Błąd generowania PDF:", error);
    }
  };


  useEffect(() => {
    const fetchMultimedia = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/multimedia/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMultimediaList(response.data);
      } catch (error) {
        console.error('❌ Error fetching multimedia:', error);
      }
    };
  
    fetchMultimedia();
  }, [id]);
  
const handleMediaUpload = async (file: File) => {
  if (isUploading) {
    console.warn('🚫 Upload already in progress');
    return;
  }

  try {
    setIsUploading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ No authentication token found');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    console.log('🔄 Uploading file...');
    const uploadResponse = await axios.post(
      'http://localhost:5000/api/upload',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log('✅ File uploaded successfully:', uploadResponse.data);

    if (!uploadResponse.data.fileUrl) {
      console.error('❌ No file URL returned from upload');
      return;
    }

    const travelId = parseInt(id!, 10);
    if (isNaN(travelId)) {
      console.error('❌ Invalid travel ID:', id);
      return;
    }

    console.log('🔄 Saving multimedia...');
    const multimediaResponse = await axios.post(
      `http://localhost:5000/api/multimedia/${travelId}`,
      {
        url: uploadResponse.data.fileUrl,
        type: file.type.startsWith('video') ? 'video' : 'image',
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log('✅ Multimedia added successfully:', multimediaResponse.data);

    // ✅ Dodaj nowe multimedia do multimediaList
    setMultimediaList((prevList) => [
      ...prevList,
      {
        id: multimediaResponse.data.multimedia.id,
        url: uploadResponse.data.fileUrl,
        type: file.type.startsWith('video') ? 'video' : 'image',
      }
    ]);

    // ✅ Usuń jedną kartę dynamiczną (tylko jedną)
    setMultimediaCards((prev) => (prev > 0 ? prev - 1 : 0));
  } catch (error: any) {
    console.error('❌ Error uploading media:', error.response?.data || error.message);
  } finally {
    setIsUploading(false);
  }
};





  useEffect(() => {
    const fetchTravelDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/travels/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📝 Travel Details:", response.data);
        setData(response.data.travel); // Upewnij się, że dane są przypisane z odpowiedniego obiektu
      } catch (error) {
        console.error("❌ Error fetching travel details:", error);
      }
    };

    fetchTravelDetails();
  }, [id, navigate]);

  const handleArrowClick = () => {
    navigate("/profile");
  };

  const addMoreCards = () => {
    setMultimediaCards((prev) => prev + 4);
  };

  const handleMediaDelete = async (deletedMediaId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('❌ No authentication token found');
        return;
      }
  
      console.log(`🔄 Deleting multimedia with ID: ${deletedMediaId}`);
  
      await axios.delete(`http://localhost:5000/api/multimedia/${id}/${deletedMediaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log('✅ Multimedia deleted successfully');
  
      setMultimediaList((prevList) => 
        prevList.filter((media) => media.id !== deletedMediaId)
      );
    } catch (error: any) {
      console.error('❌ Error deleting multimedia:', error.response?.data || error.message);
    }
  };
  
  
  
  
  

  if (!data) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const {
    tripName,
    departureCity,
    arrivalCity,
    departureDate,
    returnDate,
    passengers,
    flights,
    hotels,
    restaurants,
    attractions,
  } = data;

  return (
    <div className={styles.summary}>
      <Navbar background="#007bff" />
      <Wrapper>
        {/* Tytuł Wycieczki */}
        <div className={styles.container}>
          <div className={styles.details}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>📋 {tripName || "Trip Summary"}</h1>
              <span className={styles.arrowMobile} onClick={handleArrowClick}>
                ➔
              </span>
            </div>

            {/* Sekcja trasy i dat */}
            <div className={styles.routeDetails}>
              <p>
                <strong>From:</strong> {departureCity || "Unknown"} <br />
                <strong>To:</strong> {arrivalCity || "Unknown"} <br />
                <strong>Departure Date:</strong> {departureDate || "Unknown"} <br />
                <strong>Return Date:</strong> {returnDate || "Unknown"}
              </p>
            </div>

          <section className={styles.section}>
            {passengers && passengers.length > 0 ? (
              <div className={styles.cardContainer}>
                {passengers.map((person: TripPersonProps, index: number) => (
                  <div key={index} className={styles.participantCard}>
                    <p className={styles.participantName}>{person.name || "Unnamed"}</p>
                    <img
                      src={
                        person.image
                          ? person.image
                          : "https://via.placeholder.com/150"
                      }
                      alt={person.name || "Participant"}
                      className={styles.participantImage}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No participants added.</p>
            )}
          </section>
          </div>
          {/* Sekcja Kart */}
          <div className={styles.cards}>
            {/* Sekcja Lotu */}
            {/* <section className={styles.section}>
              <div className={styles.flightHeader}>
                <h2>✈️ Flight</h2>
                <span className={styles.arrowDesktop} onClick={handleArrowClick}>
                  ➔
                </span>
              </div>
              {flights && flights.length > 0 ? (
                flights.map((flight: any, index: number) => (
                  <div key={index} className={styles.card}>
                    <Flight flight={flight} buttonLabel = 'Show' onSelect={() => {}} />
                  </div>
                ))
              ) : (
                <p>No flight selected.</p>
              )}
            </section> */}
            <section className={styles.section}>
  <div className={styles.flightHeader}>
    <h2>✈️ Flights</h2>
    <span className={styles.arrowDesktop} onClick={handleArrowClick}>
      ➔
    </span>
  </div>
  {flights && flights.length > 0 ? (
    flights.map((flight: any, index: number) => (
      <div key={index} className={styles.card}>
        <Flight
          flight={{
            airline: flight.airline || 'Unknown Airline',
            airline_logo: flight.airline_logo || null,
            price: flight.price || 'N/A',
            departure_airport: flight.departure_airport || 'Unknown Airport',
            arrival_airport: flight.arrival_airport || 'Unknown Airport',
            departure_time: flight.departure_time,
            arrival_time: flight.arrival_time,
            total_duration: flight.total_duration,
            segments: flight.segments ? JSON.parse(flight.segments) : [],
          }}
          buttonLabel="Show"
          onSelect={() => {}}
        />
      </div>
    ))
  ) : (
    <p>No flights selected.</p>
  )}
</section>


            {/* Sekcja Hotelu */}
            <section className={styles.section}>
              <h2>🏨 Hotel</h2>
              {hotels && hotels.length > 0 ? (
                hotels.map((hotel: any, index: number) => (
                  <div key={index} className={styles.card}>
                    <Hotel
                      hotel={{
                        name: hotel.name || 'Unknown Hotel',
                        description: hotel.description || 'No description available',
                        rate_per_night: hotel.price ? { lowest: `${hotel.price}` } : undefined,
                        hotel_class: hotel.hotel_class || 'N/A',
                        overall_rating: hotel.overall_rating || 0,
                        reviews: hotel.reviews || 0,
                        check_in_time: hotel.check_in_date || null,
                        check_out_time: hotel.check_out_date || null,
                        amenities: hotel.amenities || [],
                        nearby_places: hotel.nearby_places || [],
                        images: hotel.thumbnail ? [{ thumbnail: hotel.thumbnail }] : [],
                        thumbnail: hotel.thumbnail || null,
                      }}
                      onSelect={() => {}}
                      buttonLabel="Show"
                    />
                  </div>
                ))
              ) : (
                <p>No hotel selected.</p>
              )}
            </section>

            {/* Sekcja Restauracji */}
            <section className={styles.section}>
              <h2>🍽️ Restaurants</h2>
              {restaurants && restaurants.length > 0 ? (
                restaurants.map((restaurant: any, index: number) => (
                  <div key={index} className={styles.card}>
                    <Restaurant restaurant={restaurant} disabledSelectedStyle={true}  showAddButton = {false} onSelect={() => {}} isSelected={true} />
                  </div>
                ))
              ) : (
                <p>No restaurants selected.</p>
              )}
            </section>

            {/* Sekcja Atrakcji */}
            <section className={styles.section}>
              <h2>🎢 Attractions</h2>
              {attractions && attractions.length > 0 ? (
                attractions.map((attraction: any, index: number) => (
                  <div key={index} className={styles.card}>
                    <Attraction
                      {...attraction}
                      onSelect={() => {}}
                      isSelected={true}
                      showAddButton={false}
                      disabledSelectedStyle={true}
                    />
                  </div>
                ))
              ) : (
                <p>No attractions selected.</p>
              )}
            </section>
          </div>
        </div>
        {/* Sekcja Multimedia */}
        <section className={styles.multimediaSection}>
          <h2>📹 Multimedia</h2>
          <div className={styles.multimediaContainer}>
            {/* Renderowanie istniejących multimediów */}
            {multimediaList.map((media) => (
              <MultimediaCard 
                key={`existing-${media.id}`} 
                mediaUrl={media.url} 
                onUpload={handleMediaUpload} 
                isUploading={isUploading} 
                mediaType={media.type} 
                travelId={id} 
                multimediaId={media.id} 
                onDelete={() => handleMediaDelete(media.id)}
              />
            ))}

            {/* Renderowanie pustych kart na nowe multimedia */}
            {Array.from({ length: multimediaCards }).map((_, index) => (
              <MultimediaCard 
                key={`new-${index}`} 
                travelId={id} 
                onUpload={handleMediaUpload}
              />
            ))}
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.addMoreButton} onClick={addMoreCards}>
              ➕ Dodaj więcej
            </button>
          </div>
          {/* <button className={styles.pdfButton} onClick={generatePDF}>
          📄 Pobierz PDF
        </button> */}
        </section>
      </Wrapper>
    </div>
  );
};

export default Summary;
