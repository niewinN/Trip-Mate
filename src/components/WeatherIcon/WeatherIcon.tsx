import sun from "../../assets/weather/sun.png"
import styles from "./WeatherIcon.module.css"

const WeatherIcon = () => {
	return (
		<div className={styles.icon}>
			<img src={sun} alt='Weather icon' />
		</div>
	)
}

export default WeatherIcon
