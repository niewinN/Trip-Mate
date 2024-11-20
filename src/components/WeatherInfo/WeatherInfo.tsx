// import React from "react"
// import styles from "./WeatherInfo.module.css"

// interface WeatherInfoProps {
// 	weather: string
// 	temperature: number
// 	humidity: number
// }

// const WeatherInfo: React.FC<WeatherInfoProps> = ({
// 	weather,
// 	temperature,
// 	humidity,
// }) => {
// 	return (
// 		<div className={styles.container}>
// 			<div>
// 				<span className={styles.item}>WEATHER</span>
// 				<div>{weather}Clear</div>
// 			</div>
// 			<div>
// 				<span className={styles.item}>TEMPERATURE</span>
// 				<div>{temperature}12</div>
// 			</div>
// 			<div>
// 				<span className={styles.item}>HUMIDITY</span>
// 				<div>{humidity}98</div>
// 			</div>
// 		</div>
// 	)
// }

// export default WeatherInfo
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
			<div className={styles.headers}>
				<div>WEATHER</div>
				<div>TEMPERATURE</div>
				<div>HUMIDITY</div>
			</div>
			<div className={styles.values}>
				<div>{weather}</div>
				<div>{temperature}°C</div>
				<div>{humidity}%</div>
			</div>
		</div>
	)
}

export default WeatherInfo
