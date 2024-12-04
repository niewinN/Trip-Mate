import { useState, useEffect } from "react";
import WeatherForm from "../WeatherForm/WeatherForm";
import styles from "./WeatherBox.module.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import axios from "axios";

const WeatherBox = () => {
	const [city, setCity] = useState<string>("Warsaw");
	const [weatherData, setWeatherData] = useState<any>(null);
	const [error, setError] = useState<string>("");
  
	// Pobranie klucza API z .env
	const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  
	const fetchWeather = async (city: string) => {
	  try {
		const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
		  params: {
			key: API_KEY,
			q: city,
		  },
		});
  
		const { temp_c, humidity, condition } = response.data.current;
		const weather = condition.text;
		const temperature = Math.round(temp_c);
  
		setWeatherData({ weather, temperature, humidity });
		setError(""); // Resetujemy błąd, jeśli wszystko jest OK
	  } catch (error) {
		console.error("Błąd pobierania danych o pogodzie:", error);
		setError("Nie udało się pobrać danych pogodowych. Sprawdź nazwę miasta.");
	  }
	};
  
	const handleCityChange = (newCity: string) => {
	  setCity(newCity);
	};
  
	useEffect(() => {
	  fetchWeather(city);
	}, [city]);
  
	return (
	  <div className={styles.box}>
		<div>
		  <WeatherForm city={city} onCityChange={handleCityChange} />
		  {error && <div className={styles.error}>{error}</div>} {/* Komunikat o błędzie */}
		  <div className={styles.icon}>
			{/* Pass the weather description as a prop */}
			<WeatherIcon weather={weatherData?.weather} />
		  </div>
		  {weatherData && (
			<WeatherInfo
			  weather={weatherData.weather}
			  temperature={weatherData.temperature}
			  humidity={weatherData.humidity}
			/>
		  )}
		</div>
		<div className={styles.secondIcon}>
		  <WeatherIcon weather={weatherData?.weather} />
		</div>
	  </div>
	);
  };
  
  export default WeatherBox;
