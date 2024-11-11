import React from "react";
import styles from "./VerticalNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faHotel, faLandmark, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface NavItem {
  label: string;
  icon: any; // FontAwesomeIcon type
  link: string;
}

const navItems: NavItem[] = [
  { label: "Flights", icon: faPlane, link: "/flights" },
  { label: "Hotels", icon: faHotel, link: "/hotels" },
  { label: "Attractions", icon: faLandmark, link: "/attractions" },
  { label: "Restaurants", icon: faUtensils, link: "/restaurants" },
];

const VerticalNav: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    navigate(link); // Redirect to the specified route
  };

  return (
    <div className={styles.verticalNav}>
      {navItems.map((item, index) => (
        <div
          key={index}
          className={styles.navItem}
          onClick={() => handleNavigation(item.link)}
        >
          <FontAwesomeIcon icon={item.icon} className={styles.icon} />
          <span className={styles.tooltip}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default VerticalNav;
