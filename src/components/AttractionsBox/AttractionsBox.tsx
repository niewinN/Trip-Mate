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
    console.log("🏁 Final Selected Attractions (AttractionsBox.tsx):", selectedAttractions);
    onAttractionSelect([...selectedAttractions]); // Upewnij się, że przekazywana jest kopia tablicy
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

