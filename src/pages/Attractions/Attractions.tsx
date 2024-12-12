// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import HeaderIcon from "../../components/HeaderIcon/HeaderIcon"
// import Navbar from "../../components/Navbar/Navbar"
// import Wrapper from "../../components/Wrapper/Wrapper"
// import styles from "./Attractions.module.css"
// import { faMuseum } from "@fortawesome/free-solid-svg-icons"
// import AttractionSearchPanel from "../../components/AttractionSearchPanel/AttractionSearchPanel"
// import FilterPanel from "../../components/FilterPanel/FilterPanel"
// import filters from "../../data/filters.json"

// const Attractions = () => {
//     const attractionFilters = filters.attractions;

//   return (
//     <div className={styles.attractions}>
//         <Navbar background="#007bff" />
//         <Wrapper>
//         <div className={styles.flex}>
//             <div>
//                 <HeaderIcon icon={<FontAwesomeIcon icon={faMuseum} />} title="Attractions" />
//                 <div className={styles.displayMobile}>
//                     <AttractionSearchPanel/>
//                 </div>
//                 <FilterPanel sections={attractionFilters} />
//             </div>
//             <div>
//                 <div className={styles.displayDesktop}>
//                     <AttractionSearchPanel/>
//                 </div>
                
//             </div>
//             </div>
//         </Wrapper>
//     </div>
//   )
// }

// export default Attractions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderIcon from "../../components/HeaderIcon/HeaderIcon";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Attractions.module.css";
import { faMuseum } from "@fortawesome/free-solid-svg-icons";
import AttractionSearchPanel from "../../components/AttractionSearchPanel/AttractionSearchPanel";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import filters from "../../data/filters.json";
import { useState } from "react";
import AttractionList from "../../components/AttractionList/AttractionList";
import { AttractionProps } from "../../components/Attraction/Attraction";


const Attractions = () => {
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
    <div className={styles.attractions}>
      <Navbar background="#007bff" />
      <Wrapper>
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
      </Wrapper>
    </div>
  );
};

export default Attractions;
