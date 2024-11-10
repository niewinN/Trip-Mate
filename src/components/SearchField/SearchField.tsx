import styles from "./SearchField.module.css"

interface SearchFieldProps {
	label: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchField: React.FC<SearchFieldProps> = ({
	label,
	value,
	onChange,
}) => {
	return (
		<div className={styles.searchField}>
			<label>{label}</label>
			<input type='text' value={value} onChange={onChange} />
		</div>
	)
}

export default SearchField
