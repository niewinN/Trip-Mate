import { useState } from "react"
import WeatherForm from "../WeatherForm/WeatherForm"
import styles from "./WeatherBox.module.css"
import WeatherIcon from "../WeatherIcon/WeatherIcon"
import WeatherInfo from "../WeatherInfo/WeatherInfo"

const WeatherBox = () => {
	const [city, setCity] = useState<string>("")

	const handleCityChange = (newCity: string) => {
		setCity(newCity)
	}

	return (
		<div className={styles.box}>
			<div>
				<WeatherForm city={city} onCityChange={handleCityChange} />
				<div className={styles.icon}>
				    <WeatherIcon />
				</div>
				<WeatherInfo />
			</div>
			<div className={styles.secondIcon}>
			    <WeatherIcon />
			</div>
		</div>
	)
}

export default WeatherBox
