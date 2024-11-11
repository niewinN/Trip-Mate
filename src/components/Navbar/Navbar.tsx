import NavLogo from "../NavLogo/NavLogo"
import NavProfile from "../NavProfile/NavProfile"
import styles from "./Navbar.module.css"

interface NavbarProps {
	background?: "#007bff" | "transparent"; // Allow only "blue" or "transparent"
  }

const Navbar: React.FC<NavbarProps> = ({background = "blue"}) => {
	return (
		<div
		className={styles.navbar}
		style={{ "--background-color": background } as React.CSSProperties}
	  >
			<NavLogo />
			<NavProfile />
		</div>
	)
}

export default Navbar
