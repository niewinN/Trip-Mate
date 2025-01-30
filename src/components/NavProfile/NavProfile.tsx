import styles from "./NavProfile.module.css";
import profileLogo from "../../assets/main/profile-logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Sprawdza, czy token istnieje
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.logo} onClick={handleClick}>
      <img src={profileLogo} alt='Konto' />
    </div>
  );
};

export default NavProfile;
