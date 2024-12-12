// import styles from "./AttractionSearchPanel.module.css"

// const AttractionSearchPanel = () => {
//   return (
//     <div className={styles.box}>
//         <input className={styles.input} type="text" placeholder="Enter city"/>
//     </div>
//   )
// }

// export default AttractionSearchPanel
import React, { useState } from "react";
import styles from "./AttractionSearchPanel.module.css";

interface AttractionSearchPanelProps {
  onSearch: (city: string) => void;
}

const AttractionSearchPanel: React.FC<AttractionSearchPanelProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(city); // Wywołanie onSearch z wprowadzonym miastem
    }
  };

  return (
    <div className={styles.box}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)} // Aktualizowanie stanu miasta
        onKeyDown={handleKeyDown} // Obsługa klawisza Enter
      />
    </div>
  );
};

export default AttractionSearchPanel;

