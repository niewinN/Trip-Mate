import { Link } from "react-router-dom"
import logo from "../../assets/main/logo.png"
import styles from "./NavLogo.module.css"

const NavLogo: React.FC = () => {
	return (
		<div className={styles.logo}>
			<Link to="/" className={styles.link}>
				<img src={logo} alt='Logo Trip Mate' />
				<h1>TRIP MATE</h1>
			</Link>
		</div>
	)
}

export default NavLogo
