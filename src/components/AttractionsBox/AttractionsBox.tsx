// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import HeaderIcon from "../HeaderIcon/HeaderIcon"
// import styles from "./AttractionsBox.module.css"
// import { faMuseum } from "@fortawesome/free-solid-svg-icons"
// import AttractionSearchPanel from "../AttractionSearchPanel/AttractionSearchPanel"
// import FilterPanel from "../FilterPanel/FilterPanel"
// import AttractionList from "../AttractionList/AttractionList"
// import { useState } from "react"
// import filters from "../../data/filters.json"
// import { AttractionProps } from "../Attraction/Attraction"

// const AttractionsBox = () => {
//     const [attractions, setAttractions] = useState<AttractionProps[]>([]);
//     const attractionFilters = filters.attractions;
  
//     const handleSearch = async (city: string) => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/attractions?location=${city}`
//         );
//         const data = await response.json();
    
//         const formattedAttractions = data.map((attraction: any) => ({
//           title: attraction.title,
//           description: attraction.description || "No description available.",
//           thumbnail: attraction.thumbnail || "https://via.placeholder.com/500x500?text=No+Image+Available",
//           rating: attraction.rating || 0, // Dodaj domyślne wartości
//           reviews_original: attraction.reviews_original || "(0)",
//           reviews: attraction.reviews || 0,
//           address: attraction.address || "No address provided",
//         }));
    
//         setAttractions(formattedAttractions); // Ustaw dane zgodne z typem AttractionProps[]
//       } catch (error) {
//         console.error("Error fetching attractions:", error);
//       }
//     };
//   return (
//     <div className={styles.flex}>
//           <div>
//             <HeaderIcon
//               icon={<FontAwesomeIcon icon={faMuseum} />}
//               title="Attractions"
//             />
//             <div className={styles.displayMobile}>
//               <AttractionSearchPanel onSearch={handleSearch} />
//             </div>
//             <FilterPanel sections={attractionFilters} />
//           </div>
//           <div>
//             <div className={styles.displayDesktop}>
//               <AttractionSearchPanel onSearch={handleSearch} />
//             </div>
//             <AttractionList attractions={attractions} />
//           </div>
//         </div>
//   )
// }

// export default AttractionsBox
import React, { useState, useEffect } from "react";
import styles from "./AttractionsBox.module.css";
import AttractionList from "../AttractionList/AttractionList";
import AttractionSearchPanel from "../AttractionSearchPanel/AttractionSearchPanel";
import FilterPanel from "../FilterPanel/FilterPanel";
import HeaderIcon from "../HeaderIcon/HeaderIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMuseum } from "@fortawesome/free-solid-svg-icons";
import filters from "../../data/filters.json";

interface AttractionsBoxProps {
  initialCity: string;
  onAttractionSelect: (attractions: any[]) => void;
  onFinish: () => void;
  showFinishButton?: boolean;
}

const AttractionsBox: React.FC<AttractionsBoxProps> = ({
  initialCity,
  onAttractionSelect,
  onFinish,
  showFinishButton = true,
}) => {
  const [city, setCity] = useState<string>(initialCity);
  const [attractions, setAttractions] = useState<any[]>([]);
  const [selectedAttractions, setSelectedAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (city) {
      handleSearch(city);
    }
  }, [city]);

  const handleSearch = async (searchCity: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/attractions?location=${searchCity}`
      );
      const data = await response.json();
      setAttractions(data);
    } catch (error) {
      console.error("❌ Error fetching attractions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAttraction = (attraction: any) => {
    setSelectedAttractions((prev) => {
      const isAlreadySelected = prev.some((a) => a.title === attraction.title);
      if (isAlreadySelected) {
        return prev.filter((a) => a.title !== attraction.title);
      }
      return [...prev, attraction];
    });
  };

  // const handleFinish = () => {
  //   onAttractionSelect(selectedAttractions); // Przekazanie wybranych atrakcji do Plan
  //   onFinish();
  // };
  const handleFinish = () => {
    console.log("🏁 Final Selected Attractions:", selectedAttractions); // Debug
    onAttractionSelect([...selectedAttractions]); // Upewnij się, że przekazujemy kopię tablicy
    onFinish();
  };
  

  return (
    <div className={styles.flex}>
      {/* Lewa Kolumna */}
      <div className={styles.first}>
        <HeaderIcon icon={<FontAwesomeIcon icon={faMuseum} />} title="Attractions" />
        <div className={styles.displayMobile}>
          <AttractionSearchPanel city={city} setCity={setCity} onSearch={handleSearch} />
          {showFinishButton && (
          <div className={styles.btnContainer}>
            <button
              className={styles.finishButton}
              onClick={handleFinish}
              disabled={selectedAttractions.length === 0}
            >
              Finish
            </button>
          </div>
        )}
        </div>
        <FilterPanel sections={filters.attractions} />
      </div>

      {/* Prawa Kolumna */}
      <div className={styles.second}>
        <div className={styles.displayDesktop}>
          <AttractionSearchPanel city={city} setCity={setCity} onSearch={handleSearch} />
          {showFinishButton && (
          <div className={styles.btnContainer}>
            <button
              className={styles.finishButton}
              onClick={handleFinish}
              disabled={selectedAttractions.length === 0}
            >
              Finish
            </button>
          </div>
        )}
        </div>
        {loading && <p>Loading attractions...</p>}
        <AttractionList
          attractions={attractions}
          onSelect={handleAddAttraction}
          selectedAttractions={selectedAttractions}
        />
      </div>
    </div>
  );
};

export default AttractionsBox;

