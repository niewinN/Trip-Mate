import React, { useState, useEffect } from 'react';
import Hamburger from 'hamburger-react';
import styles from './HamburgerMenu.module.css';

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Zablokowanie przewijania na html i body
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';  // dla html
      document.body.style.overflow = 'hidden';  // dla body
    } else {
      document.documentElement.style.overflow = 'auto'; // przywrócenie przewijania
      document.body.style.overflow = 'auto'; // przywrócenie przewijania
    }

    // Czyszczenie przy odmontowywaniu
    return () => {
      document.documentElement.style.overflow = 'auto'; // przywracamy przewijanie
      document.body.style.overflow = 'auto'; // przywracamy przewijanie
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      {/* Hamburger button */}
      <div className={styles.hamburgerWrapper}>
        <Hamburger toggled={isOpen} toggle={toggleMenu} size={30} color="#fff" />
      </div>

      {/* Fullscreen overlay with nav */}
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
        <nav className={styles.nav}>
          <ul>
            <li><a href="/flights">Flights</a></li>
            <li><a href="/hotels">Hotels</a></li>
            <li><a href="/attractions">Attractions</a></li>
            <li><a href="/restaurants">Restaurants</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
