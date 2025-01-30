import { useState } from "react";
import styles from "./WeatherForm.module.css";

interface WeatherFormProps {
  city: string;
  labelValue: string; // Nowy prop dla wartości etykiety
  onCityChange: (newCity: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ labelValue, onCityChange }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim() !== "") {
        onCityChange(inputValue);
        setInputValue("");
      }
    }
  };

  return (
    <form className={styles.form}>
      <label htmlFor="city-input">{labelValue}</label>
      <input
        type="text"
        id="city-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search city..."
      />
    </form>
  );
};

export default WeatherForm;
