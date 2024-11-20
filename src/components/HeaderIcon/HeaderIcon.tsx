import React from "react";
import styles from "./HeaderIcon.module.css";

interface HeaderIconProps {
  icon: React.ReactNode; // Ikonka, np. FontAwesome lub inny komponent
  title: string; // Tytuł do wyświetlenia
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ icon, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default HeaderIcon;
