import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavLinks.module.css';

const NavLinks: React.FC = () => {
  return (
    <div className={styles.navLinks}>
      <Link to="/flights" className={styles.link}>Flights</Link>
      <Link to="/hotels" className={styles.link}>Hotels</Link>
      <Link to="/attractions" className={styles.link}>Attractions</Link>
      <Link to="/restaurants" className={styles.link}>Restaurants</Link>
    </div>
  );
};

export default NavLinks;
