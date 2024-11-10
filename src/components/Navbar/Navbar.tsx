import NavLogo from "../NavLogo/NavLogo"
import NavProfile from "../NavProfile/NavProfile"
import styles from "./Navbar.module.css"

const Navbar: React.FC = () => {
	return (
		<div className={styles.navbar}>
			<NavLogo />
			<NavProfile />
		</div>
	)
}

export default Navbar
