import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import NavLinks from "../NavLinks/NavLinks";
import NavLogo from "../NavLogo/NavLogo";
import NavProfile from "../NavProfile/NavProfile";
import styles from "./Navbar.module.css";

interface NavbarProps {
  background?: "#007bff" | "transparent";
  showNavLinks?: boolean; 
}

const Navbar: React.FC<NavbarProps> = ({ background = "blue", showNavLinks = true }) => {
  return (
    <div
      className={styles.fullWidth}
      style={{ "--background-color": background } as React.CSSProperties}
    >
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <NavLogo />
          <div className={styles.right}>
            {showNavLinks && <NavLinks />}
            <NavProfile />
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
