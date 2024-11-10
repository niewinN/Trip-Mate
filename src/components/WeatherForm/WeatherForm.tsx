import { useState } from "react"
import styles from "./WeatherForm.module.css"

interface WeatherFormProps {
	city: string
	onCityChange: (newCity: string) => void
}

const WeatherForm: React.FC<WeatherFormProps> = ({ city, onCityChange }) => {
	const [inputValue, setInputValue] = useState<string>(city)

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault()
			onCityChange(inputValue)
			setInputValue("")
		}
	}

	return (
		<form className={styles.form}>
			<label htmlFor='city-input'>{city}</label>
			<input
				type='text'
				id='city-input'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder='Search city...'
			/>
		</form>
	)
}

export default WeatherForm
