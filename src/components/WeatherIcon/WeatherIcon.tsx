import sun from "../../assets/weather/sun.png";
import cloud from "../../assets/weather/cloud.png";
import rain from "../../assets/weather/rain.png";
import snow from "../../assets/weather/ice.png";
import thunder from "../../assets/weather/thunderstorm.png";
import unknown from "../../assets/weather/unknown.png";
import fog from "../../assets/weather/fog.png"
import styles from "./WeatherIcon.module.css";

type WeatherIconProps = {
  weather: string | undefined;
};

const weatherImages: { [key: string]: string } = {
  "Sunny": sun,
  "Clear": sun,
  "Partly cloudy": cloud,
  "Cloudy": cloud,
  "Overcast": cloud,
  "Rainy": rain,
  "Showers": rain,
  "Thunderstorm": thunder,
  "Snowy": snow,
  "Snow": snow,
  "Mist": fog,
};

const WeatherIcon = ({ weather }: WeatherIconProps) => {
  const iconSrc = weather && weatherImages[weather] ? weatherImages[weather] : unknown;

  return (
    <div className={styles.icon}>
      <img src={iconSrc} alt={weather || 'Unknown weather'} />
    </div>
  );
};

export default WeatherIcon;
