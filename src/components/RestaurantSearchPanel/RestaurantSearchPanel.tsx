// import styles from "./RestaurantSearchPanel.module.css"

// const RestaurantSearchPanel = () => {
//   return (
//     <div className={styles.box}>
//         <input className={styles.input} type="text" placeholder="Enter city"/>
//     </div>  
//   )
// }

// export default RestaurantSearchPanel
import React, { useState } from 'react';
import styles from './RestaurantSearchPanel.module.css';

const RestaurantSearchPanel: React.FC<{ onSearch: (city: string) => void }> = ({ onSearch }) => {
  const [city, setCity] = React.useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && city.trim() !== '') {
      onSearch(city);
    }
  };

  return (
    <div className={styles.box}>
      <input
      className={styles.input}
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default RestaurantSearchPanel;

