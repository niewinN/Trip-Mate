import styles from "./DateField.module.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface DateFieldProps {
	label: string
	value: string
	onChange: (date: Date) => void
}

const DateField: React.FC<DateFieldProps> = ({ label, value, onChange }) => {
	const selectedDate = value ? new Date(value) : null

	return (
		<div className={styles.dateField}>
			<label>{label}</label>
			<DatePicker
				selected={selectedDate}
				onChange={(date: Date) => onChange(date)}
				dateFormat='dd.MM.yyyy'
				className={styles.dateInput}
				placeholderText='dd.mm.rrrr'
			/>
		</div>
	)
}

export default DateField
