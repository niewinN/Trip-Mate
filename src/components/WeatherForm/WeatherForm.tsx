import { useState } from "react"
import styles from "./WeatherForm.module.css"

interface WeatherFormProps {
	city: string
	onCityChange: (newCity: string) => void
}

const WeatherForm: React.FC<WeatherFormProps> = ({ city, onCityChange }) => {
	const [labelValue, setLabelValue] = useState<string>("Warsaw")
	const [inputValue, setInputValue] = useState<string>("")

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault()
			if (inputValue.trim() !== "") {
				setLabelValue(inputValue)
				onCityChange(inputValue) 
				setInputValue("") 
			}
		}
	}

	return (
		<form className={styles.form}>
			<label htmlFor='city-input'>{labelValue}</label>
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
