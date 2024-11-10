import React from 'react'
import styles from "./QuoteBox.module.css"

const QuoteBox = () => {
  return (
    <div className={styles.box}>
        <div className={styles.overlay}>
            <h2>Trip Mate</h2>
            <p>"Whereever you go, go with all your heart."</p>
            <p className={styles.second}>- Confucius</p>
        </div>
    </div>
  )
}

export default QuoteBox