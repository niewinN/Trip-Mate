import React, { useEffect, useState } from 'react';
import styles from './RestaurantSearchPanel.module.css';

interface RestaurantSearchPanelProps {
  city: string;
  setCity: (value: string) => void;
  onSearch: (city: string) => void;
}

const RestaurantSearchPanel: React.FC<RestaurantSearchPanelProps> = ({ city, setCity, onSearch }) => {
  const [inputValue, setInputValue] = useState<string>(city); // Lokalny stan inputu

  // Synchronizacja wartości inputu z miastem początkowym
  useEffect(() => {
    setInputValue(city);
  }, [city]);

  // Obsługa zmiany wartości inputu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Obsługa klawisza Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setCity(inputValue); // Ustawienie wartości miasta w głównym stanie
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

export default RestaurantSearchPanel;

