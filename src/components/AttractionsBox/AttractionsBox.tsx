import React, { useState, useEffect } from "react";
import styles from "./AttractionsBox.module.css";
import AttractionList from "../AttractionList/AttractionList";
import AttractionSearchPanel from "../AttractionSearchPanel/AttractionSearchPanel";
import FilterPanel from "../FilterPanel/FilterPanel";
import HeaderIcon from "../HeaderIcon/HeaderIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMuseum } from "@fortawesome/free-solid-svg-icons";
import filters from "../../data/filters.json";
import PlanButton from "../PlanButton/PlanButton";

interface AttractionsBoxProps {
  initialCity: string;
  onAttractionSelect: (attractions: any[]) => void;
  onFinish: () => void;
  showFinishButton?: boolean;
  showAddButton?: boolean;
  showPlanBtn?: boolean;
}

const AttractionsBox: React.FC<AttractionsBoxProps> = ({
  initialCity,
  onAttractionSelect,
  onFinish,
  showFinishButton = true,
  showAddButton = true,
  showPlanBtn = false
}) => {
  const [city, setCity] = useState<string>(initialCity);
  const [attractions, setAttractions] = useState<any[]>([]);
  const [selectedAttractions, setSelectedAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // useEffect(() => {
  //   if (city) {
  //     handleSearch(city);
  //   }
  // }, [city]);

  // const handleSearch = async (searchCity: string) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/data/attractions?location=${searchCity}`
  //     );
  //     const data = await response.json();
  //     setAttractions(data);
  //   } catch (error) {
  //     console.error("❌ Error fetching attractions:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleAddAttraction = (attraction: any) => {
  //   console.log("🎢 Selected Attraction:", attraction); // Debug
  
  //   setSelectedAttractions((prev) => {
  //     const isAlreadySelected = prev.some((a) => a.title === attraction.title);
  //     let updatedAttractions;
  
  //     if (isAlreadySelected) {
  //       updatedAttractions = prev.filter((a) => a.title !== attraction.title);
  //     } else {
  //       updatedAttractions = [...prev, attraction];
  //     }
  
  //     // Natychmiast aktualizujemy rodzica przez onAttractionSelect
  //     onAttractionSelect(updatedAttractions);
  
  //     return updatedAttractions;
  //   });
  // };
  
  // const handleFinish = () => {
  //   console.log("🏁 Final Selected Attractions (AttractionsBox.tsx):", selectedAttractions);
  
  //   const sanitizedAttractions = selectedAttractions.map((attraction) => ({
  //     title: attraction.title || "No title",
  //     description: attraction.description || "No description",
  //     thumbnail: attraction.thumbnail || null,
  //     rating: attraction.rating || 0,
  //     reviews_original: attraction.reviews_original || "0",
  //     reviews: attraction.reviews || 0,
  //     address: attraction.address || "Unknown",
  //   }));
  
  //   console.log("✅ Sanitized Attractions:", sanitizedAttractions);
  
  //   onAttractionSelect(sanitizedAttractions);
  //   onFinish()
  // };
  useEffect(() => {
    fetchAttractions();
  }, [city, selectedFilters]);

  const fetchAttractions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/data/attractions?location=${city}&filters=${selectedFilters.join(",")}`
      );
      const data = await response.json();
      setAttractions(data);
    } catch (err) {
      console.error("❌ Error fetching attractions:", err);
      setError("Error fetching attractions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newCity: string) => {
    setCity(newCity);
    setAttractions([]);
    setSelectedFilters([]); // Reset filters on new city search
  };

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  // const handleAddAttraction = (attraction: any) => {
  //   setSelectedAttractions((prev) => {
  //     const isAlreadySelected = prev.some((a) => a.title === attraction.title);
  //     return isAlreadySelected
  //       ? prev.filter((a) => a.title !== attraction.title) // Remove if already selected
  //       : [...prev, attraction];
  //   });
  // };
    const handleAddAttraction = (attraction: any) => {
    console.log("🎢 Selected Attraction:", attraction); // Debug
  
    setSelectedAttractions((prev) => {
      const isAlreadySelected = prev.some((a) => a.title === attraction.title);
      let updatedAttractions;
  
      if (isAlreadySelected) {
        updatedAttractions = prev.filter((a) => a.title !== attraction.title);
      } else {
        updatedAttractions = [...prev, attraction];
      }
  
      // Natychmiast aktualizujemy rodzica przez onAttractionSelect
      onAttractionSelect(updatedAttractions);
  
      return updatedAttractions;
    });
  };

  const handleFinish = () => {
    const sanitizedAttractions = selectedAttractions.map((attraction) => ({
      title: attraction.title || "No title",
      description: attraction.description || "No description",
      thumbnail: attraction.thumbnail || null,
      rating: attraction.rating || 0,
      reviews_original: attraction.reviews_original || "0",
      reviews: attraction.reviews || 0,
      address: attraction.address || "Unknown",
    }));

    onAttractionSelect(sanitizedAttractions);
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
        <FilterPanel sections={filters.attractions} onFilterChange={handleFilterChange} />
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
          showAddButton={showAddButton}
        />
      </div>
      {showPlanBtn && <PlanButton/>}
    </div>
  );
};

export default AttractionsBox;

