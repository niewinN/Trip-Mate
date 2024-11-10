import React from "react"
import styles from "./WeatherInfo.module.css"

interface WeatherInfoProps {
	weather: string
	temperature: number
	humidity: number
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
	weather,
	temperature,
	humidity,
}) => {
	return (
		<div className={styles.container}>
			<div>
				<span>WEATHER</span>
				<span>{weather}</span>
			</div>
			<div>
				<span>TEMPERATURE</span>
				<span>{temperature}</span>
			</div>
			<div>
				<span>HUMIDITY</span>
				<span>{humidity}</span>
			</div>
		</div>
	)
}

export default WeatherInfo
