import styles from "./TripName.module.css"

const TripName = () => {
  return (
    <div className={styles.tripName}>
        <input type="text" placeholder='Name your trip' />
    </div>
  )
}

export default TripName