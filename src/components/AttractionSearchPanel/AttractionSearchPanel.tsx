// import React, { useState } from "react";
// import styles from "./AttractionSearchPanel.module.css";

// interface AttractionSearchPanelProps {
//   onSearch: (city: string) => void;
// }

// const AttractionSearchPanel: React.FC<AttractionSearchPanelProps> = ({ onSearch }) => {
//   const [city, setCity] = useState("");

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//       onSearch(city); // Wywołanie onSearch z wprowadzonym miastem
//     }
//   };

//   return (
//     <div className={styles.box}>
//       <input
//         className={styles.input}
//         type="text"
//         placeholder="Enter city"
//         value={city}
//         onChange={(e) => setCity(e.target.value)} // Aktualizowanie stanu miasta
//         onKeyDown={handleKeyDown} // Obsługa klawisza Enter
//       />
//     </div>
//   );
// };

// export default AttractionSearchPanel;
import React, { useEffect, useState } from "react";
import styles from "./AttractionSearchPanel.module.css";

interface AttractionSearchPanelProps {
  city: string;
  setCity: (value: string) => void;
  onSearch: (city: string) => void;
}

const AttractionSearchPanel: React.FC<AttractionSearchPanelProps> = ({
  city,
  setCity,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState<string>(city); // Lokalny stan dla inputu

  // Synchronizacja inputValue z wartością `city` początkową
  useEffect(() => {
    setInputValue(city);
  }, [city]);

  // Obsługa zmiany wartości inputu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Aktualizacja lokalnego stanu
  };

  // Obsługa klawisza Enter do zatwierdzenia wyszukiwania
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setCity(inputValue); // Aktualizacja globalnego stanu miasta
      onSearch(inputValue); // Wykonanie wyszukiwania
    }
  };

  return (
    <div className={styles.box}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter city"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default AttractionSearchPanel;

