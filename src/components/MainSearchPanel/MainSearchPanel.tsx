import React, { useState } from "react"
import DateField from "../DateField/DateField"
import SearchField from "../SearchField/SearchField"
import styles from "./MainSearchPanel.module.css"
import StartButton from "../StartButton/StartButton"

const MainSearchPanel: React.FC = () => {
	// Stany dla SearchField
	const [flyingFrom, setFlyingFrom] = useState("Warsaw")
	const [flyingTo, setFlyingTo] = useState("London")

	// Stany dla DateField (początkowe wartości są pustymi datami)
	const [departDate, setDepartDate] = useState<Date | null>(null)
	const [returnDate, setReturnDate] = useState<Date | null>(null)

	return (
		<div className={styles.searchPanel}>
			<div className={styles.box}>
				<SearchField
					label='Flying from'
					value={flyingFrom}
					onChange={e => setFlyingFrom(e.target.value)}
				/>
				<SearchField
					label='Flying to'
					value={flyingTo}
					onChange={e => setFlyingTo(e.target.value)} 
				/>
				<DateField
					label='Depart'
					value={departDate ? departDate.toISOString().split("T")[0] : ""} 
					onChange={(date: Date) => setDepartDate(date)} 
				/>
				<DateField
					label='Return'
					value={returnDate ? returnDate.toISOString().split("T")[0] : ""}
					onChange={(date: Date) => setReturnDate(date)} 
				/>
				<StartButton />
			</div>
		</div>
	)
}

export default MainSearchPanel
