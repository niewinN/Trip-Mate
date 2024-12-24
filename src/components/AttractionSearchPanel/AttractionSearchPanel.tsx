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
  const [inputValue, setInputValue] = useState<string>(city);

  
  useEffect(() => {
    setInputValue(city);
  }, [city]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setCity(inputValue);
      onSearch(inputValue); 
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

