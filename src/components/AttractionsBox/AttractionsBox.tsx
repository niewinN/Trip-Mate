import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HeaderIcon from "../HeaderIcon/HeaderIcon"
import styles from "./AttractionsBox.module.css"
import { faMuseum } from "@fortawesome/free-solid-svg-icons"
import AttractionSearchPanel from "../AttractionSearchPanel/AttractionSearchPanel"
import FilterPanel from "../FilterPanel/FilterPanel"
import AttractionList from "../AttractionList/AttractionList"
import { useState } from "react"
import filters from "../../data/filters.json"
import { AttractionProps } from "../Attraction/Attraction"

const AttractionsBox = () => {
    const [attractions, setAttractions] = useState<AttractionProps[]>([]);
    const attractionFilters = filters.attractions;
  
    const handleSearch = async (city: string) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/attractions?location=${city}`
        );
        const data = await response.json();
    
        const formattedAttractions = data.map((attraction: any) => ({
          title: attraction.title,
          description: attraction.description || "No description available.",
          thumbnail: attraction.thumbnail || "https://via.placeholder.com/500x500?text=No+Image+Available",
          rating: attraction.rating || 0, // Dodaj domyślne wartości
          reviews_original: attraction.reviews_original || "(0)",
          reviews: attraction.reviews || 0,
          address: attraction.address || "No address provided",
        }));
    
        setAttractions(formattedAttractions); // Ustaw dane zgodne z typem AttractionProps[]
      } catch (error) {
        console.error("Error fetching attractions:", error);
      }
    };
  return (
    <div className={styles.flex}>
          <div>
            <HeaderIcon
              icon={<FontAwesomeIcon icon={faMuseum} />}
              title="Attractions"
            />
            <div className={styles.displayMobile}>
              <AttractionSearchPanel onSearch={handleSearch} />
            </div>
            <FilterPanel sections={attractionFilters} />
          </div>
          <div>
            <div className={styles.displayDesktop}>
              <AttractionSearchPanel onSearch={handleSearch} />
            </div>
            <AttractionList attractions={attractions} />
          </div>
        </div>
  )
}

export default AttractionsBox