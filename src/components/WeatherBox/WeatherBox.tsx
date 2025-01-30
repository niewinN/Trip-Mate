import { useState, useEffect } from "react";
import WeatherForm from "../WeatherForm/WeatherForm";
import styles from "./WeatherBox.module.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import axios from "axios";

const WeatherBox = () => {
  const [city, setCity] = useState<string>("Warsaw");
  const [labelValue, setLabelValue] = useState<string>("Warsaw"); // Nowy stan dla etykiety
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string>("");

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
      setError("");
    } catch (error) {
      console.error("Błąd pobierania danych o pogodzie:", error);
      setError("Nie udało się pobrać danych pogodowych. Sprawdź nazwę miasta.");
    }
  };

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    setLabelValue(newCity); // Zaktualizuj nazwę w etykiecie
  };

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(`https://api.weatherapi.com/v1/search.json`, {
                params: {
                  key: API_KEY,
                  q: `${latitude},${longitude}`,
                },
              });

              if (response.data.length > 0) {
                const nearestCity = response.data[0].name;
                setCity(nearestCity);
                setLabelValue(nearestCity); // Aktualizacja etykiety na miasto z geolokalizacji
              } else {
                console.warn("Nie znaleziono miasta na podstawie lokalizacji");
              }
            } catch (error) {
              console.error("Błąd podczas wyszukiwania lokalizacji:", error);
              setCity("Warsaw");
              setLabelValue("Warsaw"); // Domyślna wartość etykiety
            }
          },
          (error) => {
            console.error("Brak dostępu do lokalizacji:", error);
            setCity("Warsaw");
            setLabelValue("Warsaw"); // Domyślna wartość etykiety
          }
        );
      } else {
        console.warn("Geolokalizacja nie jest wspierana w tej przeglądarce.");
        setCity("Warsaw");
        setLabelValue("Warsaw"); // Domyślna wartość etykiety
      }
    };

    getUserLocation();
  }, [API_KEY]);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <div className={styles.box}>
      <div>
        <WeatherForm city={city} labelValue={labelValue} onCityChange={handleCityChange} />
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.icon}>
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
